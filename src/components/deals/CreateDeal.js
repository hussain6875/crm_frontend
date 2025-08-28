
import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDeal } from '../../redux/dealSlice';
import { fetchUsers } from '../../redux/userSlice';
import { DEAL_STAGES } from '../../constants/dealStages';
import styles from './createDeal.module.css'

export default function CreateDeal({ isOpen, onClose }) {
  const [dealName, setDealName] = useState('');
  const [dealStage, setDealStage] = useState('');
  const [amount, setAmount] = useState('');
  const [dealOwner, setDealOwner] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const [priority, setPriority] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users) || [];
console.log(users);
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUsers());
    }
  }, [isOpen, dispatch]);
   const handleSubmit = async(e) => {
    e.preventDefault();

    const newDeal = {
      name: dealName,
      stage: dealStage,
      amount: parseFloat(amount),
      dealOwner: parseInt(dealOwner),
      closeDate,
      priority,
    };

      // TODO: dispatch to Redux, send to backend, etc.
       try {
    await dispatch(createDeal(newDeal)).unwrap();
    alert('Deal created successfully!');
    onClose(); // Close the drawer
  } catch (error) {
    console.error('Failed to create deal:', error);
    alert('Error creating deal');
  }

    onClose(); // close after submission
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
                value={dealName}
                onChange={(e) => setDealName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Deal Stage *</label>
              <select
                className="form-select"
                value={dealStage}
                onChange={(e) => setDealStage(e.target.value)}
                required
              >
                {DEAL_STAGES.map((stage)=>(
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Deal Owner *</label>
              <select
                className="form-select"
                value={dealOwner}
                onChange={(e) => setDealOwner(e.target.value)}
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
              <div className="col">
                <label className="form-label">Close Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={closeDate}
                  onChange={(e) => setCloseDate(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">Priority *</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                >
                  <option value="">Choose</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
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