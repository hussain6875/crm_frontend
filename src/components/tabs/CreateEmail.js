import React from "react";
import { useState } from "react";
import { MdClose, MdArrowDropDown } from "react-icons/md";
import styles from '../tabs/createModal.module.css';

export default function CreateEmail({ isOpen, onClose }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");        

  const handleSendEmail = () => {
    if (!to.trim() || !subject.trim() || !body.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    // TODO: Replace with API request to send email
    alert("Email sent!");
    setTo("");
    setSubject("");
    setBody("");
    onClose();
  };

  if (!isOpen) return null;

 
   
   return(
    
      <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <div className={styles.modalheaderEmail}>
          <span className={styles.modaltitle}>New Email</span>
          <button className={styles.closebutton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalbody}>
          <input
            type="text"
            placeholder="Recipients"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Body Text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea-field"
          />
        </div>

        <div className={styles.modalfooter}>
          <button className={styles.sendbtn} onClick={handleSendEmail}>
            Send
          </button>
          <div className={styles.icons}>
            <span>📎</span>
            <span>🔗</span>
            <span>😊</span>
            <span>🖼️</span>
            <span>🗑️</span>
          </div>
        </div>
      </div>
    </div>
    );
}
