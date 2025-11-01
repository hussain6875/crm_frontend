import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "bootstrap";

import PageWrapper from "../components/layout/PageWrapper";
import styles from "../components/leads/leads.module.css";

// Redux
import { fetchLeads, updateLead } from "../redux/features/leads/leadsThunks";
import { createNewActivity } from "../redux/features/activitySlice";
import { createDeal } from "../redux/dealSlice";

// Components
import Activity from "../components/tabs/Activity";
import Notes from "../components/tabs/Notes";
import Emails from "../components/tabs/Emails";
import Calls from "../components/tabs/Calls";
import Tasks from "../components/tabs/Tasks";
import Meetings from "../components/tabs/Meetings";
import CreateNote from "../components/tabs/CreateNote";
import CreateEmail from "../components/tabs/CreateEmail";
import CreateCall from "../components/tabs/CreateCall";
import CreateTask from "../components/tabs/CreateTask";
import CreateMeeting from "../components/tabs/CreateMeeting";
import CreateDeal from "../components/deals/CreateDeal";
import EditLead from "../components/leads/EditLead";
import Attachment from "../components/ui/Attachment";
import SuccessToast from "../components/tabs/Toast";

const LeadDetails = () => {
  const [lead, setLead] = useState({});
  const [leadStatus, setLeadStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(true);

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDealDrawer, setShowDealDrawer] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { leadId } = useParams();

  const leads = useSelector((state) => state.leads.list);

  // --- Fetch all leads ---
  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  // --- Find current lead by ID ---
  useEffect(() => {
    const leadDetails = leads.find((l) => String(l.id) === String(leadId));
    if (leadDetails) {
      setLead(leadDetails);
      setLeadStatus(leadDetails.leadStatus);
    } else {
      console.error("Lead not found with ID:", leadId);
      navigate("/leads");
    }
  }, [leadId, leads, navigate]);

  // --- Toast helper ---
  const handleToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  // --- Toggle Sections ---
  const handleAboutLead = () => setIsOpen(!isOpen);
  const handleAttachmentButton = () => setIsAttachmentOpen(!isAttachmentOpen);

  // --- Edit Lead ---
  const handleEdit = () => {
    setShowEditModal(true);
    const offcanvasEl = document.getElementById("editLead");
    const bsOffcanvas = new Offcanvas(offcanvasEl);
    bsOffcanvas.show();
  };

  const handleUpdateLead = (updatedLead) => {
    const mergedLead = {
      ...lead,
      ...updatedLead,
      status: updatedLead.leadStatus,
    };
    setLead(mergedLead);
    setLeadStatus(updatedLead.leadStatus);
    setShowEditModal(false);
  };

  const handleBackToLeads = () => navigate("/leads");

  // --- Handle Tab Navigation ---
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "activity";

  const handleTabChange = (tabName) => navigate(`?tab=${tabName}`);

  const renderTabContent = () => {
    switch (tab) {
      case "activity":
        return <Activity module="lead" id={leadId} />;
      case "notes":
        return <Notes onCreateClick={() => setShowNoteModal(true)} module="lead" id={leadId} />;
      case "emails":
        return <Emails onCreateClick={() => setShowEmailModal(true)} module="lead" id={leadId} />;
      case "calls":
        return <Calls onCreateClick={() => setShowCallModal(true)} module="lead" id={leadId} />;
      case "tasks":
        return <Tasks onCreateClick={() => setShowTaskModal(true)} module="lead" id={leadId} />;
      case "meetings":
        return <Meetings onCreateClick={() => setShowMeetingModal(true)} module="lead" id={leadId} />;
      default:
        return null;
    }
  };

  // --- Deal Creation & Lead Qualification ---
  const handleDealCreated = async (newDeal) => {
    try {
      await dispatch(createDeal(newDeal)).unwrap();
      await dispatch(updateLead({ id: leadId, data: { leadStatus: "Qualified Lead" } })).unwrap();
      setShowDealDrawer(false);
      handleToastMessage("Deal created & Lead qualified successfully!");
    } catch (err) {
      console.error("Lead conversion failed:", err);
      handleToastMessage("Error while converting lead!");
    }
  };

  // --- Loading state ---
  if (!lead.id) {
    return (
      <PageWrapper>
        <div className="text-center p-4">
          <p>Loading lead details...</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <>
      <PageWrapper>
        <div
          className="bg-white p-4 rounded-3 shadow-sm d-flex"
          style={{ width: "95%", margin: "auto", marginLeft: "20px", marginRight: "10px" }}
        >
          <div className="row gy-4">
            {/* ===== LEFT PANEL ===== */}
            <div className="col-12 col-md-3">
              {/* Back to Leads */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <button
                    className="btn btn-link p-0 text-decoration-none text-secondary fw-semibold mb-3"
                    onClick={handleBackToLeads}
                  >
                    <i className="bi bi-chevron-left me-2"></i>Leads
                  </button>
                  <h5 className="mb-0">
                    {lead.firstName} {lead.lastName}
                  </h5>
                  {/* Status Dropdown */}
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">Status:</span>
                    <div className="dropdown">
                      <button
                        className={`btn btn-sm btn-outline-white ${styles.status} dropdown-toggle d-flex align-items-center gap-2`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {leadStatus}
                      </button>
                      <ul className="dropdown-menu">
                        {["New", "Waiting on us", "Close"].map((status, index) => (
                          <li key={index}>
                            <button className="dropdown-item" onClick={() => setLeadStatus(status)}>
                              {status}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border border-secondary border-opacity-25" />

              {/* About Lead */}
              <div className={styles.about}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div onClick={handleAboutLead} style={{ cursor: "pointer" }}>
                    <i className={`bi ${isOpen ? "bi-chevron-down" : "bi-chevron-right"} me-2`}></i>
                    <span className="fw-medium">About this lead</span>
                  </div>
                  <i
                    className="bi bi-pencil-square ms-auto"
                    style={{ cursor: "pointer" }}
                    onClick={handleEdit}
                  />
                </div>

                {isOpen && (
                  <div>
                    <div className="mb-3">
                      <small className="text-muted">Email</small>
                      <div>{lead.email}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">First Name</small>
                      <div>{lead.firstName}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Last Name</small>
                      <div>{lead.lastName}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Phone number</small>
                      <div>{lead.phone}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Lead Status</small>
                      <div>{lead.leadStatus}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Job Title</small>
                      <div>{lead.jobTitle}</div>
                    </div>
                    <div>
                      <small className="text-muted">Created Date</small>
                      <div>{lead.createdAt}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ===== MIDDLE PANEL ===== */}
            <div className="col-12 col-md-6">
              {/* Search + Convert */}
              <div className="d-flex align-items-center justify-content-between rounded p-2 mb-3 mx-2">
                <div className="d-flex align-items-center flex-grow-1 border rounded bg-white px-2">
                  <i className="bi bi-search text-muted"></i>
                  <div className="vr mx-2"></div>
                  <input
                    type="text"
                    className="form-control border-0 bg-white fw-medium shadow-none"
                    placeholder="Search activities"
                  />
                </div>

                <button
                  className="btn btn-primary fw-semibold shadow-sm"
                  style={{ width: "120px", backgroundColor: "#6c63ff", borderColor: "#6c63ff" }}
                  onClick={() => setShowDealDrawer(true)}
                >
                  Convert
                </button>
              </div>

              {/* Tabs */}
              <div style={{ borderBottom: "1px solid #dee2e6" }}>
                <ul className="nav nav-underline">
                  {["activity", "notes", "emails", "calls", "tasks", "meetings"].map((item) => (
                    <li className="nav-item" key={item}>
                      <a
                        className={`nav-link ${tab === item ? "active" : ""}`}
                        onClick={() => handleTabChange(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="tab-content mt-3">{renderTabContent()}</div>
              </div>
            </div>

            {/* ===== RIGHT PANEL ===== */}
            <div className="col-12 col-md-3">
              <div className={`${styles.ai} rounded p-3 mb-3`}>
                <strong className="d-block mb-2">
                  <i className="bi bi-stars me-2"></i>AI Lead Summary
                </strong>
                <p className="text-muted small mb-0 fw-semibold">
                  The lead titled "{lead.firstName} {lead.lastName}" currently has no activities. More details are
                  required for a comprehensive summary.
                </p>
              </div>

              <div className={styles.rightPanel}>
                <Attachment module="deal" id={leadId} />
              </div>
            </div>
          </div>

          {/* ===== MODALS ===== */}
          {showNoteModal && (
            <CreateNote
              isOpen={showNoteModal}
              onClose={() => setShowNoteModal(false)}
              module="deal"
              id={leadId}
              onSuccess={() => handleToastMessage("New Note Created")}
            />
          )}

          {showEmailModal && (
            <CreateEmail
              isOpen={showEmailModal}
              onClose={() => setShowEmailModal(false)}
              module="lead"
              id={leadId}
              onSuccess={() => handleToastMessage("New Email Sent")}
            />
          )}

          {showCallModal && (
            <CreateCall
              isOpen={showCallModal}
              onClose={() => setShowCallModal(false)}
              module="lead"
              details={lead}
              onSuccess={() => handleToastMessage("New Call Logged")}
            />
          )}

          {showTaskModal && (
            <CreateTask
              isOpen={showTaskModal}
              onClose={() => setShowTaskModal(false)}
              module="lead"
              details={lead}
              onSuccess={() => handleToastMessage("New Task Created")}
            />
          )}

          {showMeetingModal && (
            <CreateMeeting
              isOpen={showMeetingModal}
              onClose={() => setShowMeetingModal(false)}
              module="lead"
              details={lead}
              onSuccess={() => handleToastMessage("New Meeting Scheduled")}
            />
          )}

          <SuccessToast setShowToast={setShowToast} showToast={showToast} message={toastMessage} />
        </div>
      </PageWrapper>

      {/* ===== OFFCANVAS DRAWERS ===== */}
      <CreateDeal
        isOpen={showDealDrawer}
        onClose={() => setShowDealDrawer(false)}
        onSave={handleDealCreated}
        onSuccess={() => handleToastMessage("New Deal Created")}
      />

      <EditLead
        onSave={handleUpdateLead}
        initialData={lead}
        onSuccess={() => handleToastMessage("Lead Updated")}
      />
    </>
  );
};

export default LeadDetails;
