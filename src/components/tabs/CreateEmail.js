import React from "react";
import { useState } from "react";
import { MdClose, MdArrowDropDown } from "react-icons/md";
import styles from "../tabs/createModal.module.css";
import { useDispatch } from "react-redux";
import { createNewActivity } from "../../redux/features/activitySlice";

export default function CreateEmail({ isOpen, onClose, module, id }) {
  const dispatch = useDispatch();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSendEmail = () => {
    if (!to.trim() || !subject.trim() || !body.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    const newData = {
      recipients: to,
      subject,
      body_text: body,
    };

    // TODO: Replace with API request to send email
    dispatch(
      createNewActivity({
        module,
        id,
        data: newData,
        type: "Email",
      })
    );

    setTo("");
    setSubject("");
    setBody("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modaloverlay}>
      <div className={`${styles.modalcontent} p-0`} style={{ width: "500px" }}>
        <div className={`${styles.modalheaderEmail} pe-2 ps-3`}>
          <span className={styles.modaltitle}>New Email</span>
          <button
            className={`btn ${styles.closebutton} text-white`}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={`${styles.modalbody} px-4 mb-3 mt-0 gap-0`}>
          <div className="d-flex justify-content-between align-items-center border-bottom">
            <input
              type="text"
              placeholder="Recipients"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={`input-field border-0 flex-grow-1 ps-0 shadow-0 mt-0 ${styles.emailInput}`}
            />
            <span className="text-secondary m-0">Cc Bcc</span>
          </div>
          <div className="border-bottom">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`input-field border-0 ps-0 mt-0 ${styles.emailInput}`}
            />
          </div>
          <div>
            <p className="mb-0 mt-2">Body Text</p>
            <textarea
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={`textarea-field ps-0 pt-0 mt-0 border-0 w-100 ${styles.emailInput}`}
            />
          </div>
          <div className={`${styles.modalfooter} justify-content-start`}>
            <div
              className={`d-flex justify-content-between rounded ${styles.sendbtn}`}
            >
              <button
                className={`${styles.sendbtn} btn btn-sm rounded-0 rounded-start`}
                onClick={handleSendEmail}
              >
                Send
              </button>
              <button
                className={`${styles.sendbtn} btn btn-sm rounded-0 rounded-end`}
              >
                <i className="bi bi-caret-down-fill"></i>
              </button>
            </div>
            <div className={`${styles.icons} d-flex w-100`}>
              <div className="text-secondary text-decoration-underline mx-2">
                A
              </div>
              <div className="mx-2">
                <i className="bi bi-paperclip"></i>
              </div>
              <div className="mx-2">
                <i className="bi bi-link"></i>
              </div>
              <div className="mx-2">
                <i className="bi bi-emoji-smile"></i>
              </div>
              <div className="mx-2">
                <i className="bi bi-image-fill"></i>
              </div>
              <div className="ms-auto">
                <i className="bi bi-trash-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
