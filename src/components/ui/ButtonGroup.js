import React from "react";

export default function ButtonGroup({ onCreateClick }) {
  return (
    <div
      className="d-flex"
      style={{ justifyContent: "space-between", paddingRight: "20px" }}
    >
      <button
        className={`btn btn-outline-primary me-2`}
        // onclick={onclick}
        style={{ width: "120px", color: "#6c63ff", borderColor: "#6c63ff" }}
      >
        Import
      </button>
      <button
        className={`btn btn-primary me-2`}
        onClick={onCreateClick}
        style={{
          width: "120px",
          backgroundColor: "#6c63ff",
          borderColor: "#6c63ff",
        }}
      >
        Create
      </button>
    </div>
  );
}
