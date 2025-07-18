import React from 'react';
import styles from "./createModal.module.css";

export default function CreateCall({ isOpen, onClose }) {
    if (!isOpen) return null;
  return (
    <>
     <div className={styles.modalbackdrop}>
      <div className={styles.modalcontent}>
        <div className={styles.modalheader}>
          <h2>Log Call</h2>
          <button className={styles.closebutton} onClick={onClose}>×</button>
        </div>

        <form className={styles.drawerform}>
          <label>
            Connected <span className={styles.required}>*</span>
            <input type="text" value="Jane Cooper" disabled />
          </label>

          <label>
            Call Outcome <span className={styles.required}>*</span>
            <select>
              <option value="">Choose</option>
              <option value="answered">Answered</option>
              <option value="missed">Missed</option>
            </select>
          </label>

          <div className="drawer-row">
            <label>
              Date <span className={styles.required}>*</span>
              <input type="date" />
            </label>
            <label>
              Time <span className={styles.required}>*</span>
              <input type="time" />
            </label>
          </div>

          <label>
            Note <span className={styles.required}>*</span>
            <textarea placeholder="Enter"></textarea>
          </label>

          <div className={styles.drawerfooter}>
            <button type="button" className={styles.cancelbtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.savebtn}>Save</button>
          </div>
        </form>
      </div>
    </div>
    </>
   
  )
}
