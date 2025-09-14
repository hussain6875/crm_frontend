import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as bootstrap from "bootstrap";
import UserService from "../../services/UserService";

const CreateLead = ({ onSave }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    contactOwner: "",
    leadStatus: "New",
  });

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    UserService.getUsers()
      .then((res) => setUsers(res))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Validation Function
  const validate = (data) => {
    const newErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!data.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!data.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
    if (!data.contactOwner.trim()) newErrors.contactOwner = "Contact owner is required.";
    if (!data.leadStatus.trim()) newErrors.leadStatus = "Lead status is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // stop submitting if errors
    }
    setErrors({}); // clear old errors

    onSave(formData);

    // Close offcanvas properly
    const offcanvasEl = document.getElementById("createLead");
    let modalInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);

    if (!modalInstance) {
      modalInstance = new bootstrap.Offcanvas(offcanvasEl);
    }
    modalInstance.hide();

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      contactOwner: "",
      leadStatus: "New",
    });
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-backdrop="static"
      tabIndex={-1}
      id="createLead"
      aria-labelledby="staticBackdropLabel"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title" id="staticBackdropLabel">
          Create Lead
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body">
        <form onSubmit={handleSubmit} className="d-grid gap-3">
          
          {/* Email */}
          <div>
            <label className="form-label">Email *</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <div className="text-danger small">{errors.email}</div>}
          </div>

          {/* First Name */}
          <div>
            <label className="form-label">First Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            {errors.firstName && <div className="text-danger small">{errors.firstName}</div>}
          </div>

          {/* Last Name */}
          <div>
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            {errors.lastName && <div className="text-danger small">{errors.lastName}</div>}
          </div>

          {/* Phone */}
          <div>
            <label className="form-label">Phone Number *</label>
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
              inputClass="form-control"
              containerClass="w-100"
              inputStyle={{ width: "100%" }}
            />
            {errors.phone && <div className="text-danger small">{errors.phone}</div>}
          </div>

          {/* Job Title */}
          <div>
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter job title"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
            />
            {errors.jobTitle && <div className="text-danger small">{errors.jobTitle}</div>}
          </div>

          {/* Contact Owner */}
          <div>
            <label className="form-label">Contact Owner *</label>
            <select
              className="form-select"
              value={formData.contactOwner}
              onChange={(e) =>
                setFormData({ ...formData, contactOwner: e.target.value })
              }
            >
              <option value="">Choose owner</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.userName}
                </option>
              ))}
            </select>
            {errors.contactOwner && <div className="text-danger small">{errors.contactOwner}</div>}
          </div>

          {/* Lead Status */}
          <div>
            <label className="form-label">Lead Status *</label>
            <select
              className="form-select"
              value={formData.leadStatus}
              onChange={(e) =>
                setFormData({ ...formData, leadStatus: e.target.value })
              }
            >
              <option value="">Choose status</option>
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="InProgress">InProgress</option>
            </select>
            {errors.leadStatus && <div className="text-danger small">{errors.leadStatus}</div>}
          </div>

          <div className="d-flex justify-content-between border-top pt-3">
            <button
              type="button"
              className="btn btn-light px-4"
              data-bs-dismiss="offcanvas"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLead;
