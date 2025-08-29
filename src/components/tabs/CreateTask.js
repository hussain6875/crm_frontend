import React, { useState } from "react";
import styles from "../tabs/createModal.module.css";
import { useDispatch } from "react-redux";
import { createNewActivity } from "../../redux/features/activitySlice";

export default function CreateTask({ isOpen, onClose, module, details }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const data = {
      name: formData.name,
      due_date: `${formData.due_date} ${formData.time}`,
      task_type: formData.task_type,
      priority: formData.priority,
      assigned: formData.assigned,
      note: formData.note,
    };

    console.log(data);

    dispatch(createNewActivity({ module, id: details.id, data, type: "Task" }));

    setFormData({
      name: "",
      due_date: "",
      time: "",
      task_type: "",
      priority: "",
      assigned: "",
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
            <div className={styles.formgroup}>
              <label>
                Task Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter"
                className="form-control"
                required
              />
            </div>

            <div className="d-flex gap-3">
              <div className={`w-100 ${styles.formgroup}`}>
                <label>
                  Due Date <span>*</span>
                </label>
                <input
                  name="due_date"
                  type="date"
                  required
                  value={formData.due_date}
                  onChange={handleChange}
                />
              </div>
              <div className={`w-100 ${styles.formgroup}`}>
                <label>
                  Time <span>*</span>
                </label>
                <input
                  name="time"
                  required
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-flex gap-3">
              <div className={`w-100 ${styles.formgroup}`}>
                <label>
                  Task Type <span>*</span>
                </label>
                <input
                  type="text"
                  name="task_type"
                  required
                  value={formData.task_type}
                  onChange={handleChange}
                  placeholder="Enter"
                  className="form-control"
                />
              </div>
              <div className={`w-100 ${styles.formgroup}`}>
                <label>
                  Priority <span>*</span>
                </label>
                <select
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  required
                  onChange={handleChange}
                >
                  <option value={""}>Choose</option>
                  <option value={"low"}>Low</option>
                  <option value={"medium"}>Medium</option>
                  <option value={"high"}>High</option>
                  <option value={"critical"}>Critical</option>
                </select>
              </div>
            </div>

            <div className={styles.formgroup}>
              <label>
                Assigned to <span>*</span>
              </label>
              <input
                required
                name="assigned"
                type="text"
                value={formData.assigned}
                onChange={handleChange}
                placeholder="Enter"
                className="form-control"
              />
            </div>

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
                    value={formData.note}
                    onChange={handleChange}
                    required
                    name="note"
                    placeholder="Enter"
                    className={`${styles.emailInput} d-block border-0 w-100`}
                  ></textarea>
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
              <button
                className={`${styles.savebtn} btn w-100`}
                type="button"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
