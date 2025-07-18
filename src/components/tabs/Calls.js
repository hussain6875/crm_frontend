import React from 'react'

export default function Calls({onCreateClick}) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h6>Calls</h6>
          <h6>June 2025</h6>
        </div>
        <button
          style={{ height: "40px", width: "125px", backgroundColor: "#6c63ff",fontSize:"12px" }}
          className="btn btn-primary"
          onClick={onCreateClick }
          
        >
          Make a Phone Call
        </button>
      </div>
      <div
        style={{
          marginTop: "5px",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          padding: "10px",
        }}
      >
        <span style={{ color: "#666666" }}>
          <strong>Call</strong> from Maria Jhonson
        </span>
        <span style={{ float: "right", color: "#666666" }}>
          June 24,2025 at 5.30pm
        </span>
        <p style={{ color: "#4B647A" }}>Sample Note</p>
      </div>
    </>
  )
}
