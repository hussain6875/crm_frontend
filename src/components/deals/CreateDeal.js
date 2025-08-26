import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createDeal} from '../../redux/dealSlice';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate dd-mm-yyyy format
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!dateRegex.test(deal.closeDate)) {
      alert('Please enter the close date in dd-mm-yyyy format.');
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
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Deal Stage *</label>
              <select
                className="form-select"
                name="stage"
                value={deal.stage}
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
                placeholder="Enter"
                name="amount"
                value={deal.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Deal Owner *</label>
              <select
                className="form-select"
                name="owner"
                value={deal.owner}
                onChange={handleChange}
                required
              >
                <option value="">Choose</option>
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.userName}
                  </option>
                ))}
              </select>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Close Date *</label>
                <div className="position-relative" style={{ width: "100%" }}>
                  <input
                    type="date"
                    className="form-control"
                    value={(() => {
                      if (!deal.closeDate) return '';
                      const parts = deal.closeDate.split('-');
                      if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
                      return '';
                    })()}
                    onChange={e => {
                      const val = e.target.value;
                      if (val) {
                        const [year, month, day] = val.split('-');
                        setDeal(prev => ({ ...prev, closeDate: `${day}-${month}-${year}` }));
                      } else {
                        setDeal(prev => ({ ...prev, closeDate: '' }));
                      }
                    }}
                    style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                  />
                  <div className="form-control d-flex justify-content-between align-items-center bg-white">
                    <span className="text-muted">{deal.closeDate ? formatDate(deal.closeDate) : "Close Date"}</span>
                    <FaRegCalendarAlt color="#6c757d" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Priority *</label>
                <select
                  className="form-select"
                  name="priority"
                  value={deal.priority}
                  onChange={handleChange}
                  required
                >
                  {DEAL_PRIORITY.map((priority) => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
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