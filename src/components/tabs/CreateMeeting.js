import React from "react";
import styles from "../tabs/createModal.module.css";

export default function CreateMeeting({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.modalbackdrop}>
        <div className={`${styles.modalcontent} p-0 rounded-0`}>
          <div className={`${styles.modalheader} mx-3 mb-0`}>
            <h6 className="align-self-end">Schedule Meeting</h6>
            <button
              className={`${styles.closebutton} text-secondary fs-3`}
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <hr className="border-secondary-subtle mt-2" />

          <div className={`mx-3 mt-0 ${styles.modalbody}`}>
            <label>
              Title <span>*</span>
              <input type="text" className="form-control" placeholder="Enter" />
            </label>

            <label>
              Start Date <span>*</span>
              <input type="date" className="form-control" />
            </label>

            <div className="d-flex gap-3">
              <div className={`w-100 ${styles.formgroup}`}>
                <label>
                  Start Time <span>*</span>
                </label>
                <input type="time" />
              </div>
              <div className={`w-100 ${styles.formgroup}`}>
                <label>
                  End Time <span>*</span>
                </label>
                <input type="time" />
              </div>
            </div>

            <label>
              Attendees <span>*</span>
              <select className="form-select">
                <option>Choose</option>
              </select>
            </label>

            <label>
              Location
              <select className="form-select">
                <option>Choose</option>
              </select>
            </label>

            <label>
              Reminder
              <select className="form-select">
                <option>Choose</option>
              </select>
            </label>

            <div className={styles.formgroup}>
              <label>
                Note <span>*</span>
              </label>
              <div className="form-control px-0">
                <span className="mx-2">
                  Normal Text <i className="bi bi-chevron-down ms-1"></i>
                </span>
                <span className="mx-2">
                  <i className="bi bi-type-bold"></i>
                </span>
                <span className="mx-2">
                  <i className="bi bi-type-italic"></i>
                </span>
                <span className="mx-2">
                  <i className="bi bi-type-underline"></i>
                </span>
                <span className="mx-2">
                  <i className="bi bi-list-ul"></i>
                </span>
                <span className="mx-2">
                  <i className="bi bi-list-ol"></i>
                </span>
                <span className="mx-2">
                  <i className="bi bi-image"></i>
                </span>
                <hr className="my-1" />
                <div className="mx-2">
                  <textarea
                    rows={3}
                    placeholder="Enter"
                    className={`${styles.emailInput} d-block border-0 w-100`}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 d-flex justify-content-between gap-3 mx-3 mb-4">
            <button
              className={`${styles.cancelbtn} btn btn-outline-secondary w-100`}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button className={`${styles.savebtn} btn w-100`} type="submit">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
