import React,{useEffect} from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
import { DEAL_STAGES } from '../../constants/dealStages';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from '../../redux/userSlice';

export default function Filters({
  selectedOwner,
  setSelectedOwner,
  selectedStage,
  setSelectedStage, 
  createdDate,
  setCreatedDate,
  closedDate,
  setClosedDate,
}) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-GB", options);
  };
  const dispatch=useDispatch();
   const users = useSelector((state) => state.users.users) || [];

useEffect(()=>{
  if(!users || users.length ===0){
    dispatch(fetchUsers());
  }
},[dispatch,users]);
  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }} className="d-flex gap-md-2 flex-wrap">
      
      {/* Deals Owner Dropdown */}
      <select
        className="form-select"
        style={{ width: "15%" }}
        value={selectedOwner}
        onChange={(e) => setSelectedOwner(Number(e.target.value))}
      >
        <option value="All">Deal Owner</option>
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.userName}
                  </option>
                ))}
      </select>

      {/* Deal Stage Dropdown */}
      <select
        className="form-select"
        style={{ width: "15%" }}
        value={selectedStage}
        onChange={(e) => setSelectedStage(e.target.value)}
      >
        <option value="" disabled>Deal Stage</option>
        <option value="All">All Stages</option>
        {DEAL_STAGES.filter(stage => stage.value).map(stage => (
          <option key={stage.value} value={stage.value}>{stage.label}</option>
        ))}
      </select>

      {/* Closed Date Picker */}
      <div className="position-relative" style={{ width: "15%" }}>
        <input
          type="date"
          className="form-control"
          value={closedDate}
          onChange={(e) => setClosedDate(e.target.value)}
          style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
        />
        <div className="form-control d-flex justify-content-between align-items-center bg-white">
          <span className="text-muted">{closedDate ? formatDate(closedDate) : "Close Date"}</span>
          <FaRegCalendarAlt color="#6c757d" />
        </div>
      </div>
      
      {/* Created Date Picker */}
      <div className="position-relative" style={{ width: "15%" }}>
        <input
          type="date"
          className="form-control"
          value={createdDate}
          onChange={(e) => setCreatedDate(e.target.value)}
          style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
        />
        <div className="form-control d-flex justify-content-between align-items-center bg-white">
          <span className="text-muted">{createdDate ? formatDate(createdDate) : "Created Date"}</span>
          <FaRegCalendarAlt color="#6c757d" />
        </div>
      </div>

    </div>
  );
}
