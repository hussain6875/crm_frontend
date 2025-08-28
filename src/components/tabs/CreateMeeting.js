import React, { useState } from "react";
import styles from "../tabs/createModal.module.css";
import { useDispatch } from "react-redux";
import { createNewActivity } from "../../redux/features/activitySlice";

export default function CreateMeeting({ isOpen, onClose, module, details }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    start_time: "",
    end_time: "",
    meeting_attendees: 0,
    location: "",
    reminder: "",
    note: "",
  });

  const handleChange = (e) => {
    const { value, name, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createNewActivity({
        module,
        id: details.id,
        data: formData,
        type: "Meeting",
      })
    );

    setFormData({
      title: "",
      start_date: "",
      start_time: "",
      end_time: "",
      meeting_attendees: 0,
      location: "",
      reminder: "",
      note: "",
    });

    onClose();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className={styles.modalbackdrop}>
        <div className={`${styles.modalcontent} p-0 rounded-0`}>
          <div className={`${styles.modalheader} mx-3 mb-0`}>
            <h6 className="align-self-end">Schedule Meeting</h6>
            <button
              type="button"
              className={`${styles.closebutton} text-secondary fs-3`}
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <hr className="border-secondary-subtle mt-2" />

          <form onSubmit={handleSubmit}>
            <div className={`mx-3 mt-0 ${styles.modalbody}`}>
              <label>
                Title <span>*</span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter"
                />
              </label>

              <label>
                Start Date <span>*</span>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </label>

              <div className="d-flex gap-3">
                <div className={`w-100 ${styles.formgroup}`}>
                  <label>
                    Start Time <span>*</span>
                  </label>
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={`w-100 ${styles.formgroup}`}>
                  <label>
                    End Time <span>*</span>
                  </label>
                  <input
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label>
                Attendees <span>*</span>
                <input
                  type="number"
                  name="meeting_attendees"
                  value={formData.meeting_attendees}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </label>

              <label>
                Location
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Location"
                />
              </label>

              <label>
                Reminder
                <select
                  className="form-select"
                  name="reminder"
                  value={formData.reminder}
                  onChange={handleChange}
                >
                  <option value={""}>Choose</option>
                  <option value={"30m before"}>30m before</option>
                  <option value={"1h before"}>1h before</option>
                  <option value={"2h before"}>2h before</option>
                  <option value={"1 day before"}>1 day before</option>
                  <option value={"1 week before"}>1 week before</option>
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
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      required
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
          </form>
        </div>
      </div>
    </>
  );
}
