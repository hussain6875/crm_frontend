import React from "react";

export default function Activity() {
  return (
    <>
      <h6>Upcoming</h6>
      <div
        style={{
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          padding: "10px",
        }}
      >
        <span>
          <strong>Deal activity</strong>
        </span>
        <span style={{ float: "right", color: "#666666" }}>
          June 24,2025 at 5.30pm
        </span>
        <p style={{ color: "#4B647A" }}>
          <strong>Maria Jhonson</strong> moved to Appointment scheduled.
        </p>
      </div>
      <div
        style={{
          marginTop: "5px",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          padding: "10px",
        }}
      >
        <p style={{ color: "#4B647A" }}>
          This deal was created by <strong>Maria Jhonson</strong> Jun 23,2025 at
          11:22 AM.
        </p>
      </div>
    </>
  );
}
