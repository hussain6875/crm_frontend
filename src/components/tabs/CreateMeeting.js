import React from 'react';
import styles from "../tabs/createModal.module.css"

export default function CreateMeeting({isOpen,onClose}) {
    if (!isOpen) return null;
  return (
    <>
     <div className={styles.modalbackdrop}>
      <div className={styles.modalcontent}>
        <div className={styles.modalheader}>
          <h3>Schedule Meeting</h3>
          <button onClick={onClose} className={styles.closebutton}>&times;</button>
        </div>

        <div className={styles.modalbody}>
          <label>
            Title <span>*</span>
            <input type="text" placeholder="Enter" />
          </label>

          <div className={styles.row}>
            <label>
              Start Date <span>*</span>
              <input type="date" />
            </label>
            <label>
              End Time <span>*</span>
              <input type="time" />
            </label>
          </div>

          <div className={styles.row}>
            <label>
              Start Time <span>*</span>
              <input type="time" />
            </label>
            <label>
              End Time <span>*</span>
              <input type="time" />
            </label>
          </div>

          <label>
            Attendees <span>*</span>
            <select><option>Choose</option></select>
          </label>

          <label>
            Location
            <select><option>Choose</option></select>
          </label>

          <label>
            Reminder
            <select><option>Choose</option></select>
          </label>

          <label>
            Note <span>*</span>
            <textarea placeholder="Enter" rows={4} />
          </label>
        </div>

        <div className={styles.modalfooter}>
          <button className={styles.cancelbtn} onClick={onClose}>Cancel</button>
          <button className={styles.savebtn}>Save</button>
        </div>
      </div>
    </div>
    </>
  )
}
