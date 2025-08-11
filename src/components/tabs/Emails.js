import React from 'react'

export default function Emails({onCreateClick }) {
  return (
     <>
      <div className="d-flex justify-content-between">
        <div>
          <h6>Email</h6>
          <h6>June 2025</h6>
        </div>
        <button
          style={{ height: "40px", width: "125px", backgroundColor: "#6c63ff" }}
          className="btn btn-primary"
          onClick={onCreateClick }
        >
          Create Email
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
          <strong>Logged Email-Hello There</strong> by Maria Jhonson
        </span>
        <span style={{ float: "right", color: "#666666" }}>
          June 24,2025 at 5.30pm
        </span>
        <p style={{ color: "#4B647A" }}>Email body comes here......</p>
      </div>
    </>
  )
}
