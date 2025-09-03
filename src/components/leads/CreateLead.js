import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import * as bootstrap from "bootstrap";

const CreateLead = ({ onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    contactOwner: "John Smith",
    leadStatus: "New",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);

    const offcanvasEl = document.getElementById("createLead");
    const modalInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (modalInstance) modalInstance.hide();

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      contactOwner: "John Smith",
      leadStatus: "New",
    });
  };

  return (
    <>
      {/* Offcanvas Drawer */}
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
            <div>
              <label className="form-label">Email *</label>
              <input
                type="email"
                required
                className="form-control"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="form-label">First Name *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>

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
            </div>

            <div>
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter job title"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
              />
            </div>

            <div>
              <label className="form-label">Contact Owner</label>
              <select
                className="form-select"
                value={formData.contactOwner}
                onChange={(e) =>
                  setFormData({ ...formData, contactOwner: e.target.value })
                }
              >
                <option value="">Choose owner</option>
                <option value="John Smith">John Smith</option>
                <option value="Jane Doe">Jane Doe</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
            </div>

            <div>
              <label className="form-label">Lead Status</label>
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
    </>
  );
};

export default CreateLead;
