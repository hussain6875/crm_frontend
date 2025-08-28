import React, { useState , useEffect} from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import * as bootstrap from "bootstrap";
import { updateLead } from "../../redux/features/leads/leadsThunks"; // ✅ Correct path here
import { useDispatch} from "react-redux";

const EditLead = ({ isOpen, onClose, onSave, initialData }) => {
  const defaultData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    lifecycleStage: "Lead",
    leadSource: "Website",
    budget: 0,
    owner: "John Smith",
    status: "New",
  };

  const dispatch = useDispatch();

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     // await dispatch(updateLead(formData)).unwrap();
//     await dispatch(updateLead({ id: formData.id, data: formData }))

//     // Close offcanvas
//     const offcanvasEl = document.getElementById("editLead");
//     const modalInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
//     if (modalInstance) modalInstance.hide();
//   } catch (err) {
//     console.error("Failed to update lead", err);
//     alert("Update failed");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await dispatch(
      updateLead({
        id: formData.id,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          jobTitle: formData.jobTitle,
          contactOwner: formData.contactOwner,
          leadStatus: formData.leadStatus,
        },
      })
    ).unwrap();

    const offcanvasEl = document.getElementById("editLead");
    const modalInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (modalInstance) modalInstance.hide();
  } catch (err) {
    console.error("Failed to update lead", err);
    alert("Update failed");
  }
};


  const [formData, setFormData] = useState( defaultData);
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        jobTitle: initialData.jobTitle || "",
        createdAt: initialData.createdAt || "",
        contactOwner: initialData.contactOwner || "John Smith",
        leadStatus: initialData.leadStatus || "New",
      });
    }
  }, [initialData]);
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSave(formData);

  //   const offcanvasEl = document.getElementById("editLead");
  //   const modalInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
  //   if (modalInstance) modalInstance.hide();

    
  // };

  return (
    <>
      {/* Offcanvas Drawer */}
     <div
      className="offcanvas offcanvas-start"
      data-bs-backdrop="static"
      tabIndex={-1}
      id="editLead"
      aria-labelledby="staticBackdropLabel"
    >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="staticBackdropLabel">
            Edit Lead
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
                <option value="Open">Contacted</option>
                <option value="Inprogress">Qualified</option>
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

export default EditLead;
