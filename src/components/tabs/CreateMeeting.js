import React, { useEffect, useState } from "react";
import styles from "../tabs/createModal.module.css";
import { useDispatch } from "react-redux";
import {
  createNewActivity,
  getAllActivities,
} from "../../redux/features/activitySlice";

export default function CreateMeeting({ isOpen, onClose, module, details }) {
  const dispatch = useDispatch();

  const initialState = {
    title: "",
    start_date: "",
    start_time: "",
    end_time: "",
    meeting_attendees: "",
    location: "",
    reminder: "",
    note: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { value, name, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on typing
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.start_date.trim())
      newErrors.start_date = "Start date is required";
    if (!formData.start_time.trim())
      newErrors.start_time = "Start time is required";
    if (!formData.end_time.trim()) newErrors.end_time = "End time is required";
    if (!formData.meeting_attendees || formData.meeting_attendees <= 0)
      newErrors.meeting_attendees = "Attendees is required";
    if (!formData.note.trim()) newErrors.note = "Note is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(
      createNewActivity({
        module,
        id: details.id,
        data: formData,
        type: "Meeting",
      })
    ).then(() => {
      dispatch(getAllActivities({ module, id: details.id }));
    });

    setFormData(initialState);
    setErrors({});
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
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
            {/* Title */}
            <label>
              Title <span>*</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-control ${
                  errors.title ? "border-danger" : ""
                }`}
                placeholder="Enter"
              />
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
              )}
            </label>

            {/* Start Date */}
            <label>
              Start Date <span>*</span>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className={`form-control ${
                  errors.start_date ? "border-danger" : ""
                }`}
              />
              {errors.start_date && (
                <small className="text-danger">{errors.start_date}</small>
              )}
            </label>

            {/* Start & End Time */}
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
                  className={`form-control ${
                    errors.start_time ? "border-danger" : ""
                  }`}
                />
                {errors.start_time && (
                  <small className="text-danger">{errors.start_time}</small>
                )}
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
                  className={`form-control ${
                    errors.end_time ? "border-danger" : ""
                  }`}
                />
                {errors.end_time && (
                  <small className="text-danger">{errors.end_time}</small>
                )}
              </div>
            </div>

            {/* Attendees */}
            <label>
              Attendees <span>*</span>
              <input
                type="number"
                name="meeting_attendees"
                value={formData.meeting_attendees}
                onChange={handleChange}
                className={`form-control ${
                  errors.meeting_attendees ? "border-danger" : ""
                }`}
              />
              {errors.meeting_attendees && (
                <small className="text-danger">
                  {errors.meeting_attendees}
                </small>
              )}
            </label>

            {/* Location */}
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

            {/* Reminder */}
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
              <div
                className={`form-control px-0 ${
                  errors.note ? "border-danger" : ""
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
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter"
                    className={`${styles.emailInput} d-block border-0 w-100 p-0`}
                  ></textarea>
                </div>
              </div>
              {errors.note && (
                <small className="text-danger small">{errors.note}</small>
              )}
            </div>
          </div>

          {/* Buttons */}
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
  );
}
