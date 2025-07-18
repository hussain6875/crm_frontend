import React from 'react'
import styles from "../tabs/createModal.module.css";

export default function CreateTask({isOpen, onClose }) {
       if (!isOpen) return null;
  return (
    <>
    <div class={styles.modalbackdrop}>
  <div class={styles.modalcontent}>
    <div class={styles.modalheader}>
      <h2>Create Task</h2>
      <button class={styles.closebutton} onClick={onClose}>&times;</button>
    </div>

    <form class={styles.drawerform}>
      <div class={styles.formgroup}>
        <label>Task Name <span>*</span></label>
        <input type="text" placeholder="Enter" />
      </div>

      <div class={styles.formrow}>
        <div class={styles.formgroup}>
          <label>Due Date <span>*</span></label>
          <input type="date" />
        </div>
        <div class={styles.formgroup}>
          <label>Time <span>*</span></label>
          <input type="time" />
        </div>
      </div>

      <div class={styles.formrow}>
        <div class={styles.formgroup}>
          <label>Task Type <span>*</span></label>
          <select><option>Choose</option></select>
        </div>
        <div class={styles.formgroup}>
          <label>Priority <span>*</span></label>
          <select><option>Choose</option></select>
        </div>
      </div>

      <div class={styles.formgroup}>
        <label>Assigned to <span>*</span></label>
        <select><option>Maria Johnson</option></select>
      </div>

      <div class={styles.formgroup}>
        <label>Note <span>*</span></label>
        <textarea placeholder="Enter"></textarea>
      </div>

      <div class={styles.modalfooter}>
        <button class={styles.cancelbtn} onClick={onClose} type="button">Cancel</button>
        <button class={styles.savebtn} type="submit">Save</button>
      </div>
    </form>
  </div>
</div></>
  )
}
