import React from 'react'

export default function Meetings({onCreateClick}) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h6>Meeting</h6>          
        </div>
        <button
          style={{ height: "40px", width: "125px", backgroundColor: "#6c63ff",fontSize:"14px" }}
          className="btn btn-primary"
          onClick={onCreateClick }
          
        >
         Create Meeting
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
          <strong>Meeting Maria and Jane </strong>
        </span>
        <span style={{ float: "right", color: "#666666" }}>
          June 24,2025 at 5.30pm
        </span>
        <p style={{ color: "#4B647A" }}>Tasks are shown here.....</p>
      </div>
    </>

  )
}
