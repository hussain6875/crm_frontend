import React from "react";

const Activity = () => {
  return (
    <div>
      <div className="mx-2">
        <strong className="mb-2 d-block">Upcoming</strong>
        <div className="border rounded p-3 mb-2">
          <div className="d-flex justify-content-between">
            <strong>Ticket activity</strong>
            <div className="text-muted small fw-semibold">
              June 24, 2025 at 5:30PM
            </div>
          </div>
          <div className="text-muted small mb-1">
            <strong>Maria Johnson</strong> moved ticket to new
          </div>
        </div>
        <div className="border rounded p-3 d-flex justify-content-between">
          <div className="text-muted small">
            This ticket was created by <strong>Maria Johnson</strong>
          </div>
          <div className="text-muted small fw-semibold">
            June 24, 2025 at 5:30PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
