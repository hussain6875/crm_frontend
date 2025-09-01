import React from "react";
import { Offcanvas } from "bootstrap";

export default function ButtonGroup({ createTarget }) {
  const handleCreateClick = () => {
    if (createTarget) {
      const offcanvasEl = document.getElementById(createTarget);
      const bsOffcanvas = new Offcanvas(offcanvasEl);
      bsOffcanvas.show();
    }
  };

<<<<<<< HEAD

export default function ButtonGroup({ onCreateClick }) {
=======
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
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
<<<<<<< HEAD
        onClick={onCreateClick}
=======
        onClick={handleCreateClick}
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
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
