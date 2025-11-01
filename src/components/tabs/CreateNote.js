import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./createModal.module.css";
import { useDispatch } from "react-redux";
import {
  createNewActivity,
  getAllActivities,
} from "../../redux/features/activitySlice";

export default function CreateNote({ isOpen, onClose, module, id, onSuccess }) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError("Note is required");
      return;
    }
    setError("");
    // onSave(notes);
    dispatch(
      createNewActivity({
        module,
        id,
        data: { content: notes },
        type: "Note",
      })
    ).then(() => {
      dispatch(getAllActivities({ module, id }));
    });
    // TODO: dispatch to Redux, send to backend, etc.
    onClose(); // close after submission
    setNotes("");
    onSuccess?.();
  };

  useEffect(() => {
    if (isOpen) {
      setNotes("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.drawerBackdrop} onClick={onClose}></div>

      <div className={styles.drawerContainer}>
        <div className="drawer-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
          <h5 className="mb-0">Create Note</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="drawer-body p-4">
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-between"
            style={{ height: "80vh" }}
          >
            <div className={styles.formgroup}>
              <label htmlFor="note">
                Note <span>*</span>
              </label>
              <div
                className={`form-control px-0 ${
                  error ? "border border-danger" : ""
                }`}
              >
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
                    id="note"
                    name="note"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)} //  update state
                    rows={6}
                    placeholder="Enter"
                    className={`${styles.emailInput} d-block border-0 w-100`}
                  ></textarea>
                </div>
              </div>
              {error && <small className="text-danger">{error}</small>}
            </div>
            <div className="w-100 d-flex justify-content-between gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary w-100">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
