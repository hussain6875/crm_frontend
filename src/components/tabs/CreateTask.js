import React, { useEffect, useState } from "react";
import styles from "../tabs/createModal.module.css";
import { useDispatch } from "react-redux";
import {
  createNewActivity,
  getAllActivities,
} from "../../redux/features/activitySlice";

export default function CreateTask({
  isOpen,
  onClose,
  module,
  details,
  onSuccess,
}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    due_date: "",
    time: "",
    task_type: "",
    priority: "",
    assigned: "",
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
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.due_date.trim()) newErrors.due_date = true;
    if (!formData.time.trim()) newErrors.time = true;
    if (!formData.task_type.trim()) newErrors.task_type = true;
    if (!formData.priority.trim()) newErrors.priority = true;
    if (!formData.assigned.trim()) newErrors.assigned = true;
    if (!formData.note.trim()) newErrors.note = true;
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      name: formData.name,
      due_date: `${formData.due_date} ${formData.time}`,
      task_type: formData.task_type,
      priority: formData.priority,
      assigned: formData.assigned,
      note: formData.note,
    };

    dispatch(
      createNewActivity({ 
        module, 
        id:details.dealId || details.id , 
        data, 
        type: "Task" 
      })
    ).then(() => {
      dispatch(getAllActivities({ module, id: details.dealId || details.id }));
    });

    setFormData({
      name: "",
      due_date: "",
      time: "",
      task_type: "",
      priority: "",
      assigned: "",
      note: "",
    });
    setErrors({});
    onClose();
    onSuccess?.();
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        due_date: "",
        time: "",
        task_type: "",
        priority: "",
        assigned: "",
        note: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className={styles.modalbackdrop}>
      <div className={`${styles.modalcontent} p-0 rounded-0`}>
        <div className={`${styles.modalheader} mx-3 mb-0`}>
          <h6 className="align-self-end">Create Task</h6>
          <button
            className={`${styles.closebutton} text-secondary fs-3`}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <hr className="border-secondary-subtle mt-2" />

        <form className={`${styles.drawerform} mx-3`}>
          {/* Task Name */}
          <label className="d-block mb-3">
            <p className="mb-1">
              Task Name <span className={styles.required}>*</span>
            </p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter"
              className={`form-control ${errors.name ? "border-danger" : ""}`}
            />
            {errors.name && (
              <span className="text-danger small">Task name is required</span>
            )}
          </label>

          {/* Date + Time */}
          <div className="d-flex gap-3">
            <label className="w-100">
              <p className="mb-1">
                Due Date <span className={styles.required}>*</span>
              </p>
              <input
                name="due_date"
                type="date"
                className={`form-control ${
                  errors.due_date ? "border-danger" : ""
                }`}
                value={formData.due_date}
                onChange={handleChange}
              />
              {errors.due_date && (
                <span className="text-danger small">Due date is required</span>
              )}
            </label>
            <label className="w-100">
              <p className="mb-1">
                Time <span className={styles.required}>*</span>
              </p>
              <input
                name="time"
                type="time"
                className={`form-control ${errors.time ? "border-danger" : ""}`}
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && (
                <span className="text-danger small">Time is required</span>
              )}
            </label>
          </div>

          {/* Task Type + Priority */}
          <div className="d-flex gap-3 mt-3">
            <label className="w-100">
              <p className="mb-1">
                Task Type <span className={styles.required}>*</span>
              </p>
              <input
                type="text"
                name="task_type"
                value={formData.task_type}
                onChange={handleChange}
                placeholder="Enter"
                className={`form-control ${
                  errors.task_type ? "border-danger" : ""
                }`}
              />
              {errors.task_type && (
                <span className="text-danger small">Task type is required</span>
              )}
            </label>
            <label className="w-100">
              <p className="mb-1">
                Priority <span className={styles.required}>*</span>
              </p>
              <select
                name="priority"
                className={`form-control ${
                  errors.priority ? "border-danger" : ""
                }`}
                value={formData.priority}
                onChange={handleChange}
              >
                <option value={""}>Choose</option>
                <option value={"low"}>Low</option>
                <option value={"medium"}>Medium</option>
                <option value={"high"}>High</option>
                <option value={"critical"}>Critical</option>
              </select>
              {errors.priority && (
                <span className="text-danger small">Priority is required</span>
              )}
            </label>
          </div>

          {/* Assigned */}
          <label className="d-block mt-3">
            <p className="mb-1">
              Assigned to <span className={styles.required}>*</span>
            </p>
            <input
              name="assigned"
              type="text"
              value={formData.assigned}
              onChange={handleChange}
              placeholder="Enter"
              className={`form-control ${
                errors.assigned ? "border-danger" : ""
              }`}
            />
            {errors.assigned && (
              <span className="text-danger small">Assigned is required</span>
            )}
          </label>

          {/* Note */}
          <label className="d-block mt-3">
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
                  value={formData.note}
                  onChange={handleChange}
                  name="note"
                  placeholder="Enter"
                  className={`${styles.emailInput} d-block border-0 w-100`}
                ></textarea>
              </div>
            </div>
            {errors.note && (
              <span className="text-danger small">Note is required</span>
            )}
          </label>
        </form>

        {/* Footer Buttons */}
        <div className="my-4 d-flex justify-content-between gap-3 mx-3">
          <button
            className={`${styles.cancelbtn} btn btn-outline-secondary w-100`}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`${styles.savebtn} btn w-100`}
            type="button"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
