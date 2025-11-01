import React, { useEffect, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import styles from "../components/tickets/details.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditTicket from "../components/tickets/EditTicket";
import { Offcanvas } from "bootstrap";
import Activity from "../components/tabs/Activity";
import Notes from "../components/tabs/Notes";
import Emails from "../components/tabs/Emails";
import Calls from "../components/tabs/Calls";
import Tasks from "../components/tabs/Tasks";
import Meetings from "../components/tabs/Meetings";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketById } from "../redux/features/ticketSlice";
import CreateNote from "../components/tabs/CreateNote";
import CreateEmail from "../components/tabs/CreateEmail";
import CreateCall from "../components/tabs/CreateCall";
import CreateTask from "../components/tabs/CreateTask";
import CreateMeeting from "../components/tabs/CreateMeeting";
import Attachment from "../components/ui/Attachment";
import SuccessToast from "../components/tabs/Toast";

const TicketDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();
  const paramsId = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { ticketId } = paramsId;
  const { ticket } = useSelector((state) => state.tickets);

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

  // const { tab = "activity" } = queryString.parse(location.search);
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "activity";

  const handleTabChange = (tabName) => {
    navigate(`?tab=${tabName}`);
  };

  const renderTabContent = () => {
    switch (tab) {
      case "activity":
        return <Activity module={"ticket"} id={ticketId} />;
      case "notes":
        return (
          <Notes
            onCreateClick={openNoteModal}
            module={"ticket"}
            id={ticketId}
          />
        );
      case "emails":
        return (
          <Emails
            onCreateClick={openEmailModal}
            module={"ticket"}
            id={ticketId}
          />
        );
      case "calls":
        return (
          <Calls
            onCreateClick={openCallModal}
            module={"ticket"}
            id={ticketId}
          />
        );
      case "tasks":
        return (
          <Tasks
            onCreateClick={openTaskModal}
            module={"ticket"}
            id={ticketId}
          />
        );
      case "meetings":
        return (
          <Meetings
            onCreateClick={openMeetingModal}
            module={"ticket"}
            id={ticketId}
          />
        );
      default:
        return null;
    }
  };

  const handleBackToTickets = () => {
    navigate("/tickets");
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleEdit = () => {
    dispatch(fetchTicketById(ticketId)).then(() => {
      const offcanvasEl = document.getElementById("editTicket");
      const bsOffcanvas = new Offcanvas(offcanvasEl);
      bsOffcanvas.show();
    });
  };

  const handleAboutTicket = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    dispatch(fetchTicketById(ticketId));
  }, [dispatch, ticketId]);

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
            {ticket ? (
              <>
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
                            {ticket.status &&
                              capitalizeFirstLetter(ticket.status)}{" "}
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
                                "Closed",
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
                      <section
                        className="text-center pt-2 pb-0 ps-0"
                        onClick={() => setShowNoteModal(true)}
                      >
                        <i className="bi bi-pencil-square rounded p-2 border border-secondary"></i>
                        <p className="mt-2 mb-0">Note</p>
                      </section>
                      <section
                        className="text-center pt-2 pb-0"
                        onClick={() => setShowEmailModal(true)}
                      >
                        <i className="bi bi-envelope-fill rounded p-2 border border-secondary"></i>
                        <p className="mt-2 mb-0">Email</p>
                      </section>
                      <section
                        className="text-center pt-2 pb-0"
                        onClick={() => setShowCallModal(true)}
                      >
                        <i className="bi bi-telephone-fill rounded p-2 border border-secondary"></i>
                        <p className="mt-2 mb-0">Call</p>
                      </section>
                      <section
                        className="text-center pt-2 pb-0"
                        onClick={() => setShowTaskModal(true)}
                      >
                        <i className="bi bi-check2-square rounded p-2 border border-secondary"></i>
                        <p className="mt-2 mb-0">Task</p>
                      </section>
                      <section
                        className="text-center pt-2 pb-0"
                        onClick={() => setShowMeetingModal(true)}
                      >
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
                          <small className="text-muted">
                            Ticket Description
                          </small>
                          <div>
                            {ticket.description &&
                              capitalizeFirstLetter(ticket.description)}
                          </div>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Ticket Owner</small>
                          <div>
                            {ticket.owner &&
                              capitalizeFirstLetter(ticket.owner)}
                          </div>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Priority</small>
                          <div>
                            {ticket.priority &&
                              capitalizeFirstLetter(ticket.priority)}
                          </div>
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
                      <ul className="nav nav-underline">
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              tab === "activity" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange("activity")}
                          >
                            Activity
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              tab === "notes" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange("notes")}
                          >
                            Notes
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              tab === "emails" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange("emails")}
                          >
                            Emails
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              tab === "calls" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange("calls")}
                          >
                            Calls
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              tab === "tasks" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange("tasks")}
                          >
                            Tasks
                          </a>
                        </li>
                        <li className="nav-item">
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
                    <div className="tab-content mt-3">{renderTabContent()}</div>
                  </div>

                  {/* Right panel */}
                  <div className="col-12 col-md-3">
                    <div className={`${styles.ai} rounded p-3 mb-3`}>
                      <strong className="d-block mb-2">
                        <i className="bi bi-stars me-2"></i>AI Ticket Summary
                      </strong>
                      <p className="text-muted small mb-0 fw-semibold">
                        The ticket titled "{ticket.name}" currently has no
                        associated conversation, call, or note transcripts.
                        There are no additional details or properties available
                        for this ticket at this time.
                      </p>
                    </div>

                    <div className={styles.rightPanel}>
                      <Attachment module={"ticket"} id={ticketId} />
                    </div>
                  </div>
                </div>
                {setShowNoteModal && (
                  <CreateNote
                    isOpen={showNoteModal}
                    onClose={closeNoteModal}
                    module={"ticket"}
                    id={ticketId}
                    onSuccess={() => handleToastMessage("New Note Created")}
                  />
                )}
                {setShowEmailModal && (
                  <CreateEmail
                    isOpen={showEmailModal}
                    onClose={closeEmailModal}
                    module={"ticket"}
                    id={ticketId}
                    onSuccess={() => handleToastMessage("New Email Sent")}
                  />
                )}
                {setShowCallModal && (
                  <CreateCall
                    isOpen={showCallModal}
                    onClose={closeCallModal}
                    module={"ticket"}
                    details={ticket}
                    onSuccess={() => handleToastMessage("New Call Logged")}
                  />
                )}
                {setShowTaskModal && (
                  <CreateTask
                    isOpen={showTaskModal}
                    onClose={closeTaskModal}
                    module={"ticket"}
                    details={ticket}
                    onSuccess={() => handleToastMessage("New Task Created")}
                  />
                )}
                {setShowMeetingModal && (
                  <CreateMeeting
                    isOpen={showMeetingModal}
                    onClose={closeMeetingModal}
                    module={"ticket"}
                    details={ticket}
                    onSuccess={() =>
                      handleToastMessage("New Meeting Scheduled")
                    }
                  />
                )}
              </>
            ) : (
              <h1 className="text-center text-primary">Loading...</h1>
            )}
          </div>
        </div>
      </PageWrapper>
      <SuccessToast
        setShowToast={setShowToast}
        showToast={showToast}
        message={toastMessage}
      />
      <EditTicket
        ticket={ticket}
        onTicketUpdated={() => {
          dispatch(fetchTicketById(ticketId));
        }}
        onSuccess={() => handleToastMessage("Details Updated.")}
      />
    </>
  );
};

export default TicketDetails;
