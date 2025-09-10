import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import styles from "./dealdetails.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchDealsByID } from "../redux/dealSlice";
import { createNewActivity, getAllActivities } from "../redux/features/activitySlice";
import {
  FaSearch,
  FaArrowLeft,
  FaPen,
  FaEnvelope,
  FaPhone,
  FaCheckSquare,
  FaCalendarAlt,
  FaStickyNote,
  FaPlus,
  FaChevronDown,
  FaChevronRight,
  FaStar,
  FaClock,
} from "react-icons/fa";
import queryString from "query-string";
import Activity from "../components/tabs/Activity";
import Calls from "../components/tabs/Calls";
import Emails from "../components/tabs/Emails";
import Meetings from "../components/tabs/Meetings";
import Notes from "../components/tabs/Notes";
import Tasks from "../components/tabs/Tasks";
import CreateNote from "../components/tabs/CreateNote";
import CreateEmail from "../components/tabs/CreateEmail";
import CreateCall from "../components/tabs/CreateCall";
import CreateTask from "../components/tabs/CreateTask";
import CreateMeeting from "../components/tabs/CreateMeeting";
import CreateEdit from "../components/tabs/CreateEdit";
import Attachment from "../components/ui/Attachment";
import SuccessToast from "../components/tabs/Toast";

export default function DealDetails() {
  const { id: routeId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  


  const { selectedDeal, loading, error } = useSelector((state) => state.deals);
  useEffect(() => {
    dispatch(fetchDealsByID(routeId));
  }, [dispatch, routeId]);

  // Use dealId from selectedDeal if available, otherwise take route param
  const id = selectedDeal?.data?.dealId || routeId;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!selectedDeal?.data) return <p>No deal found.</p>;

  

  const handleToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  //methods to update notes modal
  const openNoteModal = () => setShowNoteModal(true);
  const closeNoteModal = () => setShowNoteModal(false);

  //methods to update email modal
  const openEmailModal = () => setShowEmailModal(true);
  const closeEmailModal = () => setShowEmailModal(false);

  //methods to update call modal
  const openCallModal = () => setShowCallModal(true);
  const closeCallModal = () => setShowCallModal(false);

  //methods to update Task modal
  const openTaskModal = () => setShowTaskModal(true);
  const closeTaskModal = () => setShowTaskModal(false);

  //methods to update Meeting modal
  const openMeetingModal = () => setShowMeetingModal(true);
  const closeMeetingModal = () => setShowMeetingModal(false);

  const { tab = "activity" } = queryString.parse(location.search);

  const handleTabChange = (tabName) => {
    navigate(`?tab=${tabName}`);
  };
  // const { deal } = location?.state?.deal;
  // const [activeTabs, setActiveTabs] = useState("activity");

  const renderTabContent = () => {
    switch (tab) {
      case "activity":
        return <Activity module="deal" id={id}  />;
      case "notes":
        return <Notes onCreateClick={openNoteModal} module="deal" id={id} />;
      case "emails":
        return <Emails onCreateClick={openEmailModal} module="deal" id={id} />;
      case "calls":
        return <Calls onCreateClick={openCallModal} module="deal" id={id}  />;
      case "tasks":
        return <Tasks onCreateClick={openTaskModal} module="deal" id={id} />;
      case "meetings":
        return <Meetings onCreateClick={openMeetingModal} module="deal" id={id}  />;
      default:
        return null;
    }
  };
  return (
    <>
      <PageWrapper>
        <div
          className="bg-white rounded-top d-flex flex-nowrap align-items-start gap-3"
          style={{
            margin: "auto",
            height: "100%",
            marginLeft: "20px",
            marginRight: "20px",
            justifyContent: "space-between",
            padding: "20px",
            overflow: "hidden",
          }}
        >
          <div className={`${styles.dealPageWrapper}`}>
            {/* Breadcrumb + Title */}
            <div className={`${styles.dealHeader}`}>
              <button
                className="btn btn-link text-decoration-none text-secondary fw-semibold mb-3 p-0"
                onClick={() => navigate("/Deals")}
              >
                <FaArrowLeft className="me-2" />
                Deals
              </button>

              <h2 className={`${styles.dealTitle}`}>
                <strong>{selectedDeal.data.name}</strong>
              </h2>
              <p>
                Amount: <strong>{selectedDeal.data.amount}</strong>
              </p>
              <div
                className="stage-dropdown"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span style={{ marginRight: "5px" }}>
                  <strong>Stage:</strong> {selectedDeal.data.stage}
                </span>
                <span style={{ color: "#5A32EA", fontSize: "14px" }}>▼</span>
              </div>
            </div>
            {/* //panel */}
            <div
              className="d-flex flex-nowrap gap-3 mb-4 bg-light rounded-2"
              style={{ padding: "10px" }}
            >
              {[
                { icon: FaStickyNote, label: "Note",onClick:openNoteModal },
                { icon: FaEnvelope, label: "Email",onClick:openEmailModal },
                { icon: FaPhone, label: "Call",onClick:openCallModal },
                { icon: FaCheckSquare, label: "Task",onClick:openTaskModal },
                { icon: FaCalendarAlt, label: "Meeting",onClick:openMeetingModal },
              ].map(({ icon: Icon, label,onClick }, idx) => (
                <div
                  key={idx}
                  className="text-center"
                  style={{ cursor: "pointer" }}
                  onClick={onClick}
                >
                  <div className="border p-2 rounded text-primary">
                    <Icon />
                  </div>
                  <p className="small mt-2 mb-0">{label}</p>
                </div>
              ))}
            </div>
            <div
              style={{ borderTop: "1px solid #dee2e6", paddingTop: "10px" }}
              className={`${styles.aboutDeal} d-flex flex-column justify-content-around`}
            >
              <div className="d-flex justify-content-between">
                <h4>About this Deal</h4>
                <button
                  className="btn btn-link text-decoration-none text-secondary fw-semibold mb-3 p-0"
                  onClick={() => setShowEditModal(true)}
                >
                  <FaPen className="text-primary" />
                </button>
              </div>
              <span>Deal Owner</span>
              <p>
                <strong>{selectedDeal.data.owner?.userName}</strong>
              </p>
              <span>Priority</span>
              <p>
                <strong>{selectedDeal.data.priority}</strong>
              </p>
              <span>Created Date</span>
              <span>
                <strong>{new Date().toISOString()}</strong>
              </span>
            </div>
          </div>

          {/* Center Panel */}
          <div className={`${styles.centerpanel}`}>
            <div className={`${styles.searchbox}`}>
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search activities"
                className={`${styles.searchInput}`}
              />
            </div>
            <div style={{ borderBottom: "1px solid #dee2e6" }}>
              <ul class="nav nav-underline">
                <li class="nav-item">
                  <a
                    className={`nav-link ${
                      tab === "activity" ? "active" : ""
                    } ${styles.customlink}`}
                    onClick={() => handleTabChange("activity")}
                  >
                    Activity
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${tab === "notes" ? "active" : ""}${
                      styles.customlink
                    }`}
                    onClick={() => handleTabChange("notes")}
                  >
                    Notes
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${tab === "emails" ? "active" : ""} ${
                      styles.customlink
                    }`}
                    onClick={() => handleTabChange("emails")}
                  >
                    Emails
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${tab === "calls" ? "active" : ""} ${
                      styles.customlink
                    }`}
                    onClick={() => handleTabChange("calls")}
                  >
                    Calls
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${tab === "tasks" ? "active" : ""} ${
                      styles.customlink
                    }`}
                    onClick={() => handleTabChange("tasks")}
                  >
                    Tasks
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${
                      tab === "meetings" ? "active" : ""
                    } ${styles.customlink}`}
                    onClick={() => handleTabChange("meetings")}
                  >
                    Meetings
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content mt-3">{renderTabContent()}</div>
          </div>

          {/* Right Panel */}
          <div className={styles.rightpanel}>
            <div className="bg-light p-3 rounded mb-3">
              <strong>
                <FaStar className="text-primary me-2" />
                AI Company Summary
              </strong>
              <p className="text-muted small mt-2">
                There are no activities associated with this company. Further
                details are needed to provide a comprehensive summary.
              </p>
            </div>
           
           
            <div>
              <div className="d-flex align-items-center">
                <div className={styles.rightPanel}>
                      <Attachment module={"deal"} id={id} />
                    </div>
              </div>
            
            </div>
          </div>
          {setShowNoteModal && (
            <CreateNote
              isOpen={showNoteModal}
              onClose={closeNoteModal}
             module={"deal"}
                    id={id}
                    onSuccess={() => handleToastMessage("New Note Created")}
                  />
          )}
          {setShowEmailModal && (
            <CreateEmail isOpen={showEmailModal} onClose={closeEmailModal} 
            module={"deal"}
                    id={id}
                    onSuccess={() => handleToastMessage("New Email Sent")}
                  />
          )}
          {setShowCallModal && (
            <CreateCall
              isOpen={showCallModal}
              onClose={closeCallModal}
              module={"deal"}
              details={selectedDeal?.data}
              onSuccess={() => handleToastMessage("New Call Logged")}

            />
          )}
          {setShowTaskModal && (
            <CreateTask 
            isOpen={showTaskModal} 
            onClose={closeTaskModal}
            module={"deal"}
            details={selectedDeal?.data}
            onSuccess={() => handleToastMessage("New Task Created")}

               />
          )}
          {setShowMeetingModal && (
            <CreateMeeting
              isOpen={showMeetingModal}
              onClose={closeMeetingModal}
              module={"deal"}
              details={selectedDeal?.data}
               onSuccess={() =>
                      handleToastMessage("New Meeting Scheduled")
                    }
            />
          )}
          {showEditModal && (
            <CreateEdit
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              deal={selectedDeal?.data} // pass selectedDeal.data
            />
          )}
           <SuccessToast
        setShowToast={setShowToast}
        showToast={showToast}
        message={toastMessage}
      />
        </div>
      </PageWrapper>
    </>
  );
}
