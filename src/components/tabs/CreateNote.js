import React from "react";
import { useState } from "react";
import styles from "./createModal.module.css";
import { MdOutlineSave } from "react-icons/md";


export default function CreateNote({ isOpen, onClose, onSave }) {
  const [notes, setNotes] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      notes,
    };
    onSave(notes);

    // TODO: dispatch to Redux, send to backend, etc.

    onClose(); // close after submission
  };

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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Note <span style={{ color: "red" }}> *</span>
              </label>
             
              <textarea
                id="note"
                name="note"
                rows="6"
                placeholder="Enter"
                 onChange={(e) => setNotes(e.target.value)} //  update state
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
             
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
