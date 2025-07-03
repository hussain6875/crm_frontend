
import { FiSearch, FiBell } from "react-icons/fi";

const TopBar = () => {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm position-fixed top-0 start-0 w-100"
      style={{ zIndex: 1000, height: "70px" }}
    >
      {/* Logo */}
      <h5 className="m-0 fw-bold">CRM</h5>

      {/* Right Side */}
      <div className="d-flex align-items-center gap-3">
        {/* Search box */}
        <div className="input-group" style={{ maxWidth: 250 }}>
          <span className="input-group-text bg-transparent border-end-0">
            <FiSearch style={{ color: "#999" }} />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search"
            style={{
              fontSize: "0.9rem",
              backgroundColor: "#f8f8fb",
              borderRadius: "0.5rem",
            }}
          />
        </div>

        {/* Bell icon */}
        <button
          className="btn d-flex align-items-center justify-content-center"
          style={{
            border: "1px solid #eee",
            backgroundColor: "#f8f8fb",
            width: "60px",
            height: "40px",
            borderRadius: "10px",
          }}
        >
          <FiBell style={{ color: "#6c63ff", fontSize: "1.2rem" }} />
        </button>

        {/* Avatar */}
        <div
          className="rounded-circle d-flex justify-content-center align-items-center"
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#6c63ff",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          A
        </div>
      </div>
    </div>
  );
};

export default TopBar;
