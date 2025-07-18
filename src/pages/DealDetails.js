import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import styles from "./dealdetails.module.css";
import { FaSearch } from "react-icons/fa";
import queryString from "query-string";
import Activity from "../components/tabs/Activity";
import Calls from "../components/tabs/Calls";
import Emails from "../components/tabs/Emails";
import Meetings from "../components/tabs/Meetings";
import Notes from "../components/tabs/Notes";
import Tasks from "../components/tabs/Tasks";
import CreateNote from "../components/tabs/CreateNote";
import CreateEmail from "../components/tabs/CreateEmail";
import { useState } from "react";
import CreateCall from "../components/tabs/CreateCall";
import CreateTask from "../components/tabs/CreateTask";
import CreateMeeting from "../components/tabs/CreateMeeting";

export default function DealDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showEmailModal,setShowEmailModal] = useState(false);
  const [showCallModal,setShowCallModal] = useState(false);
  const [showTaskModal,setShowTaskModal] = useState(false);
  const [showMeetingModal,setShowMeetingModal] = useState(false);


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

  const { tab = "activity" } = queryString.parse(location.search);

  const handleTabChange = (tabName) => {
    navigate(`?tab=${tabName}`);
  };
  // const { deal } = location?.state?.deal;
  // const [activeTabs, setActiveTabs] = useState("activity");

  const renderTabContent = () => {
    switch (tab) {
      case "activity":
        return <Activity />;
      case "notes":
        return <Notes onCreateClick={openNoteModal} />;
      case "emails":
        return <Emails onCreateClick={openEmailModal}/>;
      case "calls":
        return <Calls onCreateClick={openCallModal}/>;
      case "tasks":
        return <Tasks onCreateClick={openTaskModal}/>;
      case "meetings":
        return <Meetings onCreateClick={openMeetingModal}/>;
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
              <span className={`${styles.breadCrumb}`}>&lt; Deals</span>
              <h2 className={`${styles.dealTitle}`}>
                <strong>Website Revamp-Atlas corp</strong>
              </h2>
              <p>
                Amount: <strong>$12,500</strong>
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
                  <strong>Stage:</strong> Appointment Scheduled
                </span>
                <span style={{ color: "#5A32EA", fontSize: "14px" }}>▼</span>
              </div>
            </div>

            <div
              style={{ borderTop: "1px solid #dee2e6", paddingTop: "10px" }}
              className={`${styles.aboutDeal} d-flex flex-column justify-content-around`}
            >
              <h4>About this Deal</h4>
              <span>Deal Owner</span>
              <p>
                <strong>Jane Cooper</strong>
              </p>
              <span>Priority</span>
              <p>
                <strong>High</strong>
              </p>
              <span>Created Date</span>
              <span>
                <strong>04/08/2025 2:31 PM GMT+5:30</strong>
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
                    className={`nav-link ${tab === "activity" ? "active" : ""}`}
                    onClick={() => handleTabChange("activity")}
                  >
                    Activity
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${tab === "notes" ? "active" : ""}`}
                    onClick={() => handleTabChange("notes")}
                  >
                    Notes
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${tab === "emails" ? "active" : ""}`}
                    onClick={() => handleTabChange("emails")}
                  >
                    Emails
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${tab === "calls" ? "active" : ""}`}
                    onClick={() => handleTabChange("calls")}
                  >
                    Calls
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${tab === "tasks" ? "active" : ""}`}
                    onClick={() => handleTabChange("tasks")}
                  >
                    Tasks
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    className={`nav-link ${tab === "meetings" ? "active" : ""}`}
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
          <div className="right-panel">
            <div
              style={{ backgroundColor: "" }}
              className={`${styles.summarybox} border rounded p-3`}
            >
              <h5>🧠 AI Deal Summary</h5>
              <p
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                There are no activities .
              </p>
            </div>
            <div className="attachments d-flex">
              <div>
                <strong>📎 Attachments</strong>
                <p>See the files attached</p>
              </div>
              <button style={{ float: "right" }} className="add-attachment">
                + Add
              </button>
            </div>
          </div>
        </div>
        {setShowNoteModal &&  (<CreateNote
          isOpen={showNoteModal}
          onClose={closeNoteModal}
          onSave={handleSave}
        />)}
       {setShowEmailModal &&(<CreateEmail isOpen={showEmailModal} onClose={closeEmailModal} />)}
       {setShowCallModal &&(<CreateCall isOpen={showCallModal} onClose={closeCallModal} />)}
       {setShowTaskModal &&(<CreateTask isOpen={showTaskModal} onClose={closeTaskModal} />)}
       {setShowMeetingModal && (<CreateMeeting isOpen={showMeetingModal} onClose={closeMeetingModal} />)}

      </PageWrapper>
        
    </>
  );
}
