import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa"; // Or use Bootstrap icon


export default function Filters({
  selectedOwner,
  setSelectedOwner,
  selectedStage,
  setselectedStage,
  createdDate,
  setCreatedDate,
  closedDate,
  setClosedDate,
}) {
   const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };
  return (
   
      <div style={{marginTop:"20px",marginBottom:"20px"}} className="d-flex gap-md-1">
      {/* Deals owner dropdown */}
      <select
        className="form-select "
        style={{width:"15%"}}
        value={selectedOwner}
        onChange={(e) => setSelectedOwner(e.target.value)}
      >
        <option value="" disabled selected>
          Deal Owner
        </option>
        <option value="All">All</option>
        <option value="Jane Cooper">Jane Cooper</option>
        <option value="Wade Warren">Wade Warren</option>
      </select>
      {/* Deal stage dropdown */}
      <select
        className="form-select flex-item"
        style={{ width:"15%" }}
        value={selectedStage}
        onChange={(e) => setselectedStage(e.target.value)}
      >
        <option value="" disabled selected>
          Deal Stage
        </option>
        <option value="Presentation Scheduled">Presentation Scheduled</option>
        <option value="Qualified to buy">Qualified to buy</option>
        <option value="Contract Sent">Contract Sent</option>
        <option value="Close Won">Closed Won</option>
        <option value="Appointment Scheduled">Appointment Scheduled</option>
        <option value="Decision Maker Bought In">Decision Maker Bought In</option>
        <option value="Closed Lost">Closed Lost</option>

      </select>
      {/* datepicker for created date  */}

   <div className="position-relative" style={{ width: "15%" }}>
      {/* Actual invisible date input */}
      <input
        type="date"
        className="form-control invisible-date w-auto"
        value={createdDate}
        onChange={(e)=>setCreatedDate(e.target.value)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          width:'100%',
          height: '100%',
          cursor: 'pointer',
        }}
      />

      {/* Fake styled input box */}
      <div className="form-control d-flex justify-content-between align-items-center bg-white">
        <span className="text-muted">{createdDate ? formatDate(createdDate): "Created Date"}</span>
        <FaRegCalendarAlt color="#6c757d" />
      </div>
    </div>
 

      {/* datepicker for closed date  */}
        <div className="position-relative" style={{ width: "15%" }}>
      {/* Actual invisible date input */}
      <input
        type="date"
        className="form-control invisible-date"
        value={closedDate}
        onChange={(e)=>setClosedDate(e.target.value)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      />

      {/* Fake styled input box */}
      <div className="form-control d-flex justify-content-between align-items-center bg-white">
        <span className="text-muted">{closedDate ? formatDate(closedDate): "Closed Date"}</span>
        <FaRegCalendarAlt color="#6c757d" />
      </div>
    </div>
      </div>
    
  
  );
}
