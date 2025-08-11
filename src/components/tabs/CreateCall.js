import React from "react";
import styles from "./createModal.module.css";

export default function CreateCall({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.modalbackdrop}>
        <div className={`${styles.modalcontent} p-0 rounded-0`}>
          <div className={`${styles.modalheader} mx-3 mb-0`}>
            <h6 className="align-self-end">Log Call</h6>
            <button
              className={`${styles.closebutton} btn text-secondary fs-3 p-0`}
              onClick={onClose}
            >
              ×
            </button>
          </div>
          <hr className="border-secondary-subtle mt-2" />
          <form className={`${styles.drawerform} mx-3`}>
            <label>
              <p className="mb-1">
                Connected <span className={styles.required}>*</span>
              </p>
              <input
                type="text"
                value="Jane Cooper"
                className="form-control border-secondary"
                disabled
              />
            </label>

            <label>
              <p className="mb-1">
                Call Outcome <span className={styles.required}>*</span>
              </p>
              <select className="form-select">
                <option value="">Choose</option>
                <option value="answered">Answered</option>
                <option value="missed">Missed</option>
              </select>
            </label>

            <div className="d-flex justify-content-between gap-3">
              <label className="w-100">
                <p className="mb-1">
                  Date <span className={styles.required}>*</span>
                </p>
                <input type="date" className="form-control" />
              </label>
              <label className="w-100">
                <p className="mb-1">
                  Time <span className={styles.required}>*</span>
                </p>
                <input type="time" className="form-control" />
              </label>
            </div>

            <label>
              <p className="mb-1">
                Note <span className={styles.required}>*</span>
              </p>
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
            </label>
          </form>

          <div className="mt-5 d-flex justify-content-between gap-3 mx-3">
            <button
              type="button"
              className={`${styles.cancelbtn} btn btn-outline-secondary w-100`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={`${styles.savebtn} btn w-100`}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
