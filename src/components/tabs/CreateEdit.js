import React, { useState, useEffect } from "react";
import styles from "./createModal.module.css";
import { updateDeal } from "../../redux/dealSlice";
import { useDispatch } from "react-redux";
import UserService from '../../services/UserService';

export default function CreateEdit({ isOpen, onClose, deal }) {
  const dispatch = useDispatch();
   const[users,setUsers] = useState([]);//stores users data from usersAPI
 useEffect(() => {
    if (isOpen) {
      UserService.getUsers()
        .then((data) => {setUsers(data);
          console.log("users:",data);
        })
        .catch((err) => console.error('Error fetching users:', err));
    }
  }, [isOpen]); 
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                required
              />
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
                <option value="">Choose</option>
                <option value="Qualified to Buy">Qualified to Buy</option>
                <option value="Presentation Scheduled">Presentation Scheduled</option>
                <option value="Contract Sent">Contract Sent</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
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
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Deal Owner *</label>
              <select
                className="form-select"
                name="dealOwner"
                value={formData.dealOwner}
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
              <div className="col">
                <label className="form-label">Close Date *</label>
                <input
                  type="date"
                  className="form-control"
                  name="closeDate"
                  value={formData.closeDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">Priority *</label>
                <select
                  className="form-select"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
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
