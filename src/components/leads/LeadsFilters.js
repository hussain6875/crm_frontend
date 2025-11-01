import React from "react";

const LeadsFilters = ({
  statusFilter,
  setStatusFilter,
  selectedDate,
  setSelectedDate,
  formatDate,
  handleCreateDateButton,
  dateRef,
}) => {
  return (
    <div className="gap-2 d-flex pb-3">
      {/* Status Filter */}
      <div className="position-relative">
        <select
          className="form-control form-control-sm border-secondary pe-5"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ minWidth: "150px" }}
        >
          <option value="all">Lead Status</option>
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      {/* Date Filter */}
      <div className="position-relative">
        <input
          type="text"
          className="form-control form-control-sm border-secondary pe-5"
          value={selectedDate ? formatDate(selectedDate) : ""}
          placeholder="Created Date"
          onClick={handleCreateDateButton}
          role="button"
          readOnly
          style={{ minWidth: "150px" }}
        />
        <i
          className="bi bi-calendar position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
          role="button"
          onClick={handleCreateDateButton}
        ></i>
        <input
          type="date"
          ref={dateRef}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="position-absolute top-0 start-0 opacity-0 w-100 h-100"
          style={{ pointerEvents: "none" }}
        />
      </div>
    </div>
  );
};

export default LeadsFilters;
