import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import styles from "./createModal.module.css";
import { updateDeal } from "../../redux/dealSlice";
import { useSelector,useDispatch } from "react-redux";
import { fetchUsers } from '../../redux/userSlice';
import { DEAL_PRIORITY } from "../../constants/dealPriority";
import { DEAL_STAGES } from "../../constants/dealStages";

export default function CreateEdit({ isOpen, onClose, deal }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    stage: "",
    amount: "",
    closeDate: "",
    priority: "",
    dealOwner: "",
    companyId: "",
    leadId: "",
  });

  // Pre-fill form from the passed deal
  useEffect(() => {
    if (deal && isOpen) {
      setFormData({
        name: deal.name || "",
        stage: deal.stage || "",
        amount: deal.amount || "",
        closeDate: deal.closeDate ? deal.closeDate.split("T")[0] : "",
        priority: deal.priority || "",
        dealOwner: deal.owner?.userId || deal.dealOwner || "",
        companyId: deal.companyId || "",
        leadId: deal.leadId || "",
      });
    }
  }, [deal, isOpen]);


  // Error state for field validation
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
  };


  // Validation function for blank fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Deal name is required.";
    }
    if (!formData.amount || formData.amount.toString().trim() === "") {
      newErrors.amount = "Deal amount is required.";
    } else if (formData.amount <= 0) {
      newErrors.amount = "Deal amount must be greater than zero.";
    }
    if (!formData.closeDate || formData.closeDate.trim() === "") {
      newErrors.closeDate = "Close date is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await dispatch(
        updateDeal({ id: deal.dealId, updatedData: formData })
      ).unwrap();

      alert("Deal updated successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating deal");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.drawerBackdrop} onClick={onClose}></div>

      <div className={styles.drawerContainer}>
        <div className="drawer-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
          <h5 className="mb-0">Edit Deal</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="drawer-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Deal Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.name && (
                <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Deal Stage *</label>
              <select
                className="form-select"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                required
              >
                {DEAL_STAGES.map((stage) => (
                  <option key={stage.value} value={stage.value}>{stage.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Amount *</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                placeholder="Enter"
                value={formData.amount}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.amount && (
                <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.amount}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Deal Owner *</label>
              <select
                className="form-select"
                name="dealOwner"
                value={formData.dealOwner}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                {deal.owner && (
                  <option value={deal.owner.userId}>
                    {deal.owner.userName}
                  </option>
                )}
              </select>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Close Date *</label>
                <div className="position-relative" style={{ width: "100%" }}>
                  {/* Compute today's date in YYYY-MM-DD format for min attribute */}
                  {(() => {
                    const todayObj = new Date();
                    const yyyy = todayObj.getFullYear();
                    const mm = String(todayObj.getMonth() + 1).padStart(2, '0');
                    const dd = String(todayObj.getDate()).padStart(2, '0');
                    const todayStr = `${yyyy}-${mm}-${dd}`;
                    return (
                      <input
                        type="date"
                        className="form-control"
                        value={formData.closeDate || ''}
                        min={todayStr}
                        onChange={e => {
                          const val = e.target.value;
                          setFormData(prev => ({ ...prev, closeDate: val }));
                          // Clear error on change if any
                          setErrors(prev => ({ ...prev, closeDate: undefined }));
                        }}
                        style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                      />
                    );
                  })()}
                  <div 
                    className="form-control d-flex justify-content-between align-items-center bg-white"
                    style={errors.closeDate ? { border: '1px solid red' } : {}}
                  >
                    <span className="text-muted">{formData.closeDate ? (() => {
                      const [year, month, day] = formData.closeDate.split('-');
                      if (!year || !month || !day) return "Close Date";
                      // Format as dd-mm-yyyy
                      return `${day}-${month}-${year}`;
                    })() : "Close Date"}</span>
                    <FaRegCalendarAlt color="#6c757d" />
                  </div>
                  {errors.closeDate && (
                    <div style={{ color: 'red', fontSize: '0.9em', marginTop: 2 }}>{errors.closeDate}</div>
                  )}
                </div>
              </div>
              <div className="col">
                <label className="form-label">Priority *</label>
                <select
                  className="form-select"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  {DEAL_PRIORITY.map((priority) => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
