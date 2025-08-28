import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";

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

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }} className="d-flex gap-md-2 flex-wrap">
      
      {/* Deals Owner Dropdown */}
      <select
        className="form-select"
        style={{ width: "15%" }}
        value={selectedOwner}
        onChange={(e) => setSelectedOwner(e.target.value)}
      >
        <option value="" disabled>
          Deal Owner
        </option>
        <option value="All">All</option>
        <option value="Jane Cooper">Jane Cooper</option>
        <option value="Wade Warren">Wade Warren</option>
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
        <option value="Presentation Scheduled">Presentation Scheduled</option>
        <option value="Qualified to buy">Qualified to buy</option>
        <option value="Contract Sent">Contract Sent</option>
        <option value="Closed Won">Closed Won</option>
        <option value="Appointment Scheduled">Appointment Scheduled</option>
        <option value="Decision Maker Bought In">Decision Maker Bought In</option>
        <option value="Closed Lost">Closed Lost</option>
      </select>

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
          <span className="text-muted">{closedDate ? formatDate(closedDate) : "Closed Date"}</span>
          <FaRegCalendarAlt color="#6c757d" />
        </div>
      </div>
    </div>
  );
}
