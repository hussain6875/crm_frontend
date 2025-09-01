import React, { useEffect, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import styles from "../components/leads/leads.module.css";
import { useNavigate, useParams } from "react-router-dom";
import mockData from "../components/leads/mockData";

const LeadDetails = () => {
  const [lead, setLead] = useState({});
  const [leadStatus, setLeadeStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(true);
  const [hasOption, setHasOption] = useState("Activity");

  const navigate = useNavigate();
  const params = useParams();
  const { leadId } = params;
  const leads = mockData;

  useEffect(() => {
    // Convert leadId to string for comparison if needed, or ensure both are same type
    const leadDetails = leads.find((l) => String(l.id) === String(leadId));
    if (leadDetails) {
      setLead(leadDetails);
      setLeadeStatus(leadDetails.status);
    } else {
      console.error("Lead not found with ID:", leadId);
      // Optionally navigate back to leads page if lead not found
      navigate("/leads");
    }
  }, [leadId, leads, navigate]);

  const handleBackToLeads = () => {
    navigate("/leads");
  };

  const handleAboutLead = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleAttachmentButton = () => {
    if (isAttachmentOpen) {
      setIsAttachmentOpen(false);
    } else {
      setIsAttachmentOpen(true);
    }
  };

  // Show loading or error state if lead is not found
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
          style={{
            width: "95%",
            margin: "auto",
            marginLeft: "20px",
            marginRight: "10px",
          }}
        >
          <div className="row gy-4">
            {/* Left panel */}
            <div className="col-12 col-md-3">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <button
                    className="btn btn-link p-0 text-decoration-none text-secondary fw-semibold mb-3"
                    onClick={handleBackToLeads}
                  >
                    <i className="bi bi-chevron-left me-2"></i>Leads
                  </button>
                  <h5 className="mb-0">{lead.firstName} {lead.lastName}</h5>
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
                        {["New", "Waiting on us", "Close"].map(
                          (status, index) => (
                            <li key={index}>
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  setLeadeStatus(status);
                                }}
                              >
                                {status}
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div
                className={`d-flex flex-nowrap rounded justify-content-between gap-3 mb-4 ${styles.buttons}`}
              >
                <section className="text-center pt-2 pb-0 ps-0">
                  <i className="bi bi-pencil-square rounded p-2 border border-secondary"></i>
                  <p className="mt-2 mb-0">Note</p>
                </section>
                <section className="text-center pt-2 pb-0">
                  <i className="bi bi-envelope-fill rounded p-2 border border-secondary"></i>
                  <p className="mt-2 mb-0">Email</p>
                </section>
                <section className="text-center pt-2 pb-0">
                  <i className="bi bi-telephone-fill rounded p-2 border border-secondary"></i>
                  <p className="mt-2 mb-0">Call</p>
                </section>
                <section className="text-center pt-2 pb-0">
                  <i className="bi bi-check2-square rounded p-2 border border-secondary"></i>
                  <p className="mt-2 mb-0">Task</p>
                </section>
                <section className="text-center pt-2 pb-0">
                  <i className="bi bi-calendar2-range-fill rounded p-2 border border-secondary"></i>
                  <p className="mt-2 mb-0">Meet..</p>
                </section>
              </div>
              <hr className="border border-secondary border-opacity-25" />

              {/* Ticket Info */}
              <div className={styles.about}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div
                    onClick={handleAboutLead}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={`bi ${
                        isOpen ? "bi-chevron-down" : "bi-chevron-right"
                      } me-2`}
                    ></i>
                    <span className="fw-medium">About this lead</span>
                  </div>
                  <i className="bi bi-pencil-square ms-auto"></i>
                </div>
                <div className={`${isOpen ? "d-block" : "d-none"}`}>
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
              </div>
            </div>

            {/* Middle panel */}
            <div className="col-12 col-md-6">
              <div
                className={`${styles.search} mb-3 mx-2 d-flex align-items-center border rounded bg-light`}
              >
                <i className="bi bi-search m-2"></i>
                <div className="vr my-2"></div>
                <input
                  type="text"
                  className="form-control border-0 bg-light fw-medium shadow-none"
                  placeholder="Search activities"
                />
              </div>
              <ul className="nav nav-underline gap-0">
                {[
                  "Activity",
                  "Notes",
                  "Emails",
                  "Calls",
                  "Tasks",
                  "Meetings",
                ].map((tab, index) => (
                  <li className={`nav-item`} key={index}>
                    <button
                      className={`nav-link link-dark px-2 ${styles.navHover} ${
                        hasOption === tab ? `${styles.middleNav} active` : ""
                      }`}
                      type="button"
                      onClick={() => setHasOption(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
              <hr className="border mt-0 border-secondary border-opacity-50" />

              {hasOption === "Activity" && (
                <div className="mx-2">
                  <strong className="mb-2 d-block">Upcoming</strong>
                  <div className="border rounded p-3 mb-2">
                    <div className="d-flex justify-content-between">
                      <strong>Task</strong>
                      <div className="text-muted small fw-semibold">
                        June 24, 2025 at 5:30PM
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>Task</strong>
                      <div className="text-muted small fw-semibold">
                        June 24, 2025 at 5:30PM
                      </div>
                    </div>
                    
                    <div className="text-muted small mb-1">
                      <strong>Maria Johnson</strong>  to new
                    </div>

                    <strong className="mb-2 d-block">June 2025</strong>

                  </div>

                  <div className="border rounded p-3 d-flex justify-content-between">
                    <div className="text-muted small">
                      was created by <strong>Maria Johnson</strong>
                    </div>
                    <div className="text-muted small fw-semibold">
                      June 24, 2025 at 5:30PM
                    </div>
                  </div>
                </div>
              )}
              {hasOption === "Notes" && (
                <div className="mx-2">
                  <strong className="mb-2 d-block">Notes</strong>
                </div>
              )}
              {hasOption === "Emails" && (
                <div className="mx-2">
                  <strong className="mb-2 d-block">Emails</strong>
                </div>
              )}
              {hasOption === "Calls" && (
                <div className="mx-2">
                  <strong className="mb-2 d-block">Calls</strong>
                </div>
              )}
              {hasOption === "Tasks" && (
                <div className="mx-2">
                  <strong className="mb-2 d-block">Tasks</strong>
                </div>
              )}
              {hasOption === "Meetings" && (
                <div className="mx-2">
                  <strong className="mb-2 d-block">Meetings</strong>
                </div>
              )}
            </div>

            {/* Right panel */}
            <div className="col-12 col-md-3">
              <div className={`${styles.ai} rounded p-3 mb-3`}>
                <strong className="d-block mb-2">
                  <i className="bi bi-stars me-2"></i>AI Lead Summary
                </strong>
                <p className="text-muted small mb-0 fw-semibold">
                  The lead titled "{lead.firstName} {lead.lastName}" there are no activities associated 
                  with this lead and further details are
                  needed to provide a comprehensive summary.
                </p>
              </div>

              <div className={styles.rightPanel}>
                <div className="d-flex align-items-center">
                  <div
                    onClick={handleAttachmentButton}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={`bi ${
                        isAttachmentOpen
                          ? "bi-chevron-down"
                          : "bi-chevron-right"
                      } me-2 small`}
                    ></i>
                    <strong>Attachments</strong>
                  </div>
                  <a href="/" className="text-decoration-none ms-auto">
                    + Add
                  </a>
                </div>
                {isAttachmentOpen && (
                  <p className="text-muted small">
                    See the files attached to your activities or uploaded to
                    this record.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default LeadDetails;