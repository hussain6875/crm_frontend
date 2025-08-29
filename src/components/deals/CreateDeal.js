import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createDeal, fetchDeals} from '../../redux/dealSlice';
import { fetchUsers } from '../../redux/userSlice';
import { DEAL_STAGES } from '../../constants/dealStages';
import { DEAL_PRIORITY } from '../../constants/dealPriority';
import { FaRegCalendarAlt } from "react-icons/fa";
import styles from './createDeal.module.css'

export default function CreateDeal({isOpen,onClose}) {
  const [deal, setDeal] = useState({
    name: '',
    stage: '',
    amount: '',
    owner: '',
    closeDate: '',
    priority: ''
  });
  const [errors, setErrors] = useState({});
  const users = useSelector((state) => state.users.users) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUsers());
    }
  }, [isOpen, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeal((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
  };


  // Format date for display (e.g., 2025-08-27 to 27 Aug 2025)
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split('-');
    if (!day || !month || !year) return "";
    const d = new Date(`${year}-${month}-${day}`);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return d.toLocaleDateString("en-GB", options);
  };

  // Validation function for blank fields and business rules
  const validate = () => {
    const newErrors = {};
    if (!deal.name || deal.name.trim() === "") {
      newErrors.name = "Deal name is required.";
    }
    if (!deal.amount || deal.amount.toString().trim() === "") {
      newErrors.amount = "Deal amount is required.";
    } else if (parseFloat(deal.amount) <= 0) {
      newErrors.amount = "Deal amount must be greater than zero.";
    }
    if (!deal.stage || deal.stage === "") {
      newErrors.stage = "Deal stage is required.";
    }
    if (!deal.owner || deal.owner === "") {
      newErrors.owner = "Deal owner is required.";
    }
    if (!deal.priority || deal.priority === "") {
      newErrors.priority = "Priority is required.";
    }
    if (!deal.closeDate || deal.closeDate.trim() === "") {
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
    // Convert dd-mm-yyyy to yyyy-mm-dd for backend
    const [day, month, year] = deal.closeDate.split('-');
    const backendDate = `${year}-${month}-${day}`;
    const newDeal = {
      name: deal.name,
      stage: deal.stage,
      amount: parseFloat(deal.amount),
      dealOwner: parseInt(deal.owner),
      closeDate: backendDate,
      priority: deal.priority,
    };
    try {
      await dispatch(createDeal(newDeal)).unwrap();
      // Refresh the deals list after creating a new deal
      dispatch(fetchDeals());
      alert('Deal created successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to create deal:', error);
      alert('Error creating deal');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.drawerBackdrop} onClick={onClose}></div>

      <div className={styles.drawerContainer}>
        <div className="drawer-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
          <h5 className="mb-0">Create Deal</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="drawer-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Deal Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter"
                name="name"
                value={deal.name}
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
                value={deal.stage}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                {DEAL_STAGES.map((stage) => (
                  <option key={stage.value} value={stage.value}>{stage.label}</option>
                ))}
              </select>
              {errors.stage && (
                <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.stage}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Amount *</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter"
                name="amount"
                value={deal.amount}
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
                name="owner"
                value={deal.owner}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.userName}
                  </option>
                ))}
              </select>
              {errors.owner && (
                <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.owner}</div>
              )}
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
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
                        value={(() => {
                          if (!deal.closeDate) return '';
                          const parts = deal.closeDate.split('-');
                          if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
                          return '';
                        })()}
                        min={todayStr}
                        onChange={e => {
                          const val = e.target.value;
                          if (val) {
                            const [year, month, day] = val.split('-');
                            setDeal(prev => ({ ...prev, closeDate: `${day}-${month}-${year}` }));
                          } else {
                            setDeal(prev => ({ ...prev, closeDate: '' }));
                          }
                          setErrors(prev => ({ ...prev, closeDate: undefined }));
                        }}
                        style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                      />
                    );
                  })()}
                  <div className="form-control d-flex justify-content-between align-items-center bg-white" style={errors.closeDate ? { border: '1px solid red' } : {}}>
                    <span className="text-muted">{deal.closeDate ? formatDate(deal.closeDate) : "Close Date"}</span>
                    <FaRegCalendarAlt color="#6c757d" />
                  </div>
                  {errors.closeDate && (
                    <div style={{ color: 'red', fontSize: '0.9em', marginTop: 2 }}>{errors.closeDate}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Priority *</label>
                <select
                  className="form-select"
                  name="priority"
                  value={deal.priority}
                  onChange={handleChange}
                >
                  <option value="">Choose</option>
                  {DEAL_PRIORITY.map((priority) => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
                {errors.priority && (
                  <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.priority}</div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
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