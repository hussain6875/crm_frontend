import React, { useEffect, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import styles from "../components/tickets/details.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import mockTickets from "../components/tickets/Tickets";
import EditTicket from "../components/tickets/EditTicket";
import { Offcanvas } from "bootstrap";
import Activity from "../components/tabs/Activity";
import Notes from "../components/tabs/Notes";
import Emails from "../components/tabs/Emails";
import Calls from "../components/tabs/Calls";
import Tasks from "../components/tabs/Tasks";
import Meetings from "../components/tabs/Meetings";

const TicketDetails = () => {
  const [ticket, setTicket] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(true);
  const [hasOption, setHasOption] = useState("Activity");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  const navigate = useNavigate();
  const paramsId = useParams();
  const location = useLocation();
  const { ticketId } = paramsId;
  const tickets = mockTickets;

  //Saving note content
  const handleSave = (noteContent) => {
    console.log("Note saved:", noteContent);
    setShowNoteModal(false);
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

  // const { tab = "activity" } = queryString.parse(location.search);
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "activity";

  const handleTabChange = (tabName) => {
    navigate(`?tab=${tabName}`);
  };

  const renderTabContent = () => {
    switch (tab) {
      case "activity":
        return <Activity />;
      case "notes":
        return <Notes onCreateClick={openNoteModal} />;
      case "emails":
        return <Emails onCreateClick={openEmailModal} />;
      case "calls":
        return <Calls onCreateClick={openCallModal} />;
      case "tasks":
        return <Tasks onCreateClick={openTaskModal} />;
      case "meetings":
        return <Meetings onCreateClick={openMeetingModal} />;
      default:
        return null;
    }
  };

  const handleBackToTickets = () => {
    navigate("/tickets");
  };

  const handleEdit = () => {
    const offcanvasEl = document.getElementById("editTicket");
    const bsOffcanvas = new Offcanvas(offcanvasEl);
    bsOffcanvas.show();
  };

  const handleAboutTicket = () => {
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

  useEffect(() => {
    const ticketDetails = tickets.find((t) => t.id === ticketId);
    if (ticketDetails) {
      setTicket(ticketDetails);
    }
  }, [ticketId, tickets]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".position-relative")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <PageWrapper>
        <div className="container my-3">
          <div className="container-fluid px-3 px-md-4 py-3 bg-white rounded-3 shadow-sm">
            <div className="row gy-4">
              {/* Left panel */}
              <div className="col-12 col-md-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <button
                      className="btn btn-link p-0 text-decoration-none text-secondary fw-semibold mb-3"
                      onClick={handleBackToTickets}
                    >
                      <i className="bi bi-chevron-left me-2"></i>Tickets
                    </button>
                    <h5 className="mb-0">{ticket.name}</h5>
                    <div className="position-relative d-flex align-items-center gap-2">
                      <span className="text-muted">Status:</span>
                      <button
                        className={`btn btn-sm ${styles.status}`}
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        {ticket.status}{" "}
                        <i className="bi bi-caret-down-fill ms-1"></i>
                      </button>
                      {showDropdown && (
                        <ul
                          className="dropdown-menu show position-absolute mt-1"
                          style={{ display: "block", zIndex: 1000 }}
                        >
                          {[
                            "New",
                            "Waiting on us",
                            "Waiting on contact",
                            "Close",
                          ].map((status, index) => (
                            <li key={index}>
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  setShowDropdown(false);
                                }}
                              >
                                {status}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
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
                      onClick={handleAboutTicket}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={`bi ${
                          isOpen ? "bi-chevron-down" : "bi-chevron-right"
                        } me-2`}
                      ></i>
                      <span className="fw-medium">About this Ticket</span>
                    </div>
                    <i
                      className="bi bi-pencil-square ms-auto"
                      onClick={handleEdit}
                    ></i>
                  </div>
                  <div className={`${isOpen ? "d-block" : "d-none"}`}>
                    <div className="mb-3">
                      <small className="text-muted">Ticket Description</small>
                      <div>{ticket.description}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Ticket Owner</small>
                      <div>{ticket.owner}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Priority</small>
                      <div>{ticket.priority}</div>
                    </div>
                    <div>
                      <small className="text-muted">Created Date</small>
                      <div>{ticket.createdDate}</div>
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
                <div style={{ borderBottom: "1px solid #dee2e6" }}>
                  <ul class="nav nav-underline">
                    <li class="nav-item">
                      <a
                        className={`nav-link ${
                          tab === "activity" ? "active" : ""
                        }`}
                        onClick={() => handleTabChange("activity")}
                      >
                        Activity
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        className={`nav-link ${
                          tab === "notes" ? "active" : ""
                        }`}
                        onClick={() => handleTabChange("notes")}
                      >
                        Notes
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        className={`nav-link ${
                          tab === "emails" ? "active" : ""
                        }`}
                        onClick={() => handleTabChange("emails")}
                      >
                        Emails
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        className={`nav-link ${
                          tab === "calls" ? "active" : ""
                        }`}
                        onClick={() => handleTabChange("calls")}
                      >
                        Calls
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        className={`nav-link ${
                          tab === "tasks" ? "active" : ""
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
                        }`}
                        onClick={() => handleTabChange("meetings")}
                      >
                        Meetings
                      </a>
                    </li>
                  </ul>
                </div>

                <hr className="border mt-0 border-secondary border-opacity-50" />

                {hasOption === "Activity" && (
                  <div className="mx-2">
                    <strong className="mb-2 d-block">Upcoming</strong>
                    <div className="border rounded p-3 mb-2">
                      <div className="d-flex justify-content-between">
                        <strong>Ticket activity</strong>
                        <div className="text-muted small fw-semibold">
                          June 24, 2025 at 5:30PM
                        </div>
                      </div>
                      <div className="text-muted small mb-1">
                        <strong>Maria Johnson</strong> moved ticket to new
                      </div>
                    </div>
                    <div className="border rounded p-3 d-flex justify-content-between">
                      <div className="text-muted small">
                        This ticket was created by{" "}
                        <strong>Maria Johnson</strong>
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
                    <i className="bi bi-stars me-2"></i>AI Ticket Summary
                  </strong>
                  <p className="text-muted small mb-0 fw-semibold">
                    The ticket titled "{ticket.name}" currently has no
                    associated conversation, call, or note transcripts. There
                    are no additional details or properties available for this
                    ticket at this time.
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
        </div>
      </PageWrapper>
      <EditTicket ticket={ticket} onUpdateTicket={setTicket} />
    </>
  );
};

export default TicketDetails;
