import React, { useEffect, useState } from "react";
import styles from "./createModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewActivity,
  getAllActivities,
} from "../../redux/features/activitySlice";

export default function CreateCall({ isOpen, onClose, module, details }) {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.activities);

  const [formData, setFormData] = useState({
    connected: details.owner,
    outcome: "",
    date: "",
    time: "",
    note: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.outcome.trim()) newErrors.outcome = true;
    if (!formData.date.trim()) newErrors.date = true;
    if (!formData.time.trim()) newErrors.time = true;
    if (!formData.note.trim()) newErrors.note = true;
    return newErrors;
  };

  const onSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const data = {
      outcome: formData.outcome,
      call_time: `${formData.date} ${formData.time}`,
      note: formData.note,
    };
    dispatch(
      createNewActivity({
        module,
        id: details.id,
        data: data,
        type: "Call",
      })
    ).then(() => {
      dispatch(getAllActivities({ module, id: details.id }));
    });
    setFormData({
      connected: details.owner,
      outcome: "",
      date: "",
      time: "",
      note: "",
    });
    setErrors({});
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        connected: details.owner,
        outcome: "",
        date: "",
        time: "",
        note: "",
      });
      setErrors({});
    }
  }, [isOpen, details.owner]);

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
                value={details.owner}
                className="form-control border-secondary"
                disabled
              />
            </label>

            <label>
              <p className="mb-1">
                Call Outcome <span className={styles.required}>*</span>
              </p>
              <select
                className={`form-select ${
                  errors.outcome ? "border border-danger" : ""
                } `}
                name="outcome"
                value={formData.outcome}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                <option value="Answered">Answered</option>
                <option value="Missed">Missed</option>
              </select>
              {errors.outcome && (
                <span className="text-danger small">
                  Please select an outcome
                </span>
              )}
            </label>

            <div className="d-flex justify-content-between gap-3">
              <label className="w-100">
                <p className="mb-1">
                  Date <span className={styles.required}>*</span>
                </p>
                <input
                  type="date"
                  name="date"
                  className={`form-control ${
                    errors.date ? "border-danger" : ""
                  }`}
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <span className="text-danger small">Date is required</span>
                )}
              </label>
              <label className="w-100">
                <p className="mb-1">
                  Time <span className={styles.required}>*</span>
                </p>
                <input
                  type="time"
                  name="time"
                  className={`form-control ${
                    errors.time ? "border-danger" : ""
                  }`}
                  value={formData.time}
                  onChange={handleChange}
                />
                {errors.time && (
                  <span className="text-danger small">Time is required</span>
                )}
              </label>
            </div>

            <label>
              <p className="mb-1">
                Note <span className={styles.required}>*</span>
              </p>
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
                    rows={3}
                    placeholder="Enter"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className={`${styles.emailInput} d-block border-0 w-100`}
                  ></textarea>
                </div>
              </div>
              {errors.note && (
                <span className="text-danger small">Note is required</span>
              )}
            </label>
          </form>

          <div className="my-4 d-flex justify-content-between gap-3 mx-3">
            <button
              type="button"
              className={`${styles.cancelbtn} btn btn-outline-secondary w-100`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.savebtn} btn w-100`}
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
