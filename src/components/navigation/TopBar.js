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
        {/* Search box with icon and divider */}
        <div style={{ maxWidth: 250, position: "relative" }}>
          {/* Search Icon */}
          <FiSearch
            style={{
              position: "absolute",
              top: "50%",
              left: "15px",
              transform: "translateY(-50%)",
              color: "#000",
              fontSize: "1.2rem",
              zIndex: 2,
            }}
          />

          {/* Vertical Divider */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "40px",
              transform: "translateY(-50%)",
              width: "1px",
              height: "20px",
              backgroundColor: "#d4d4d8", // light grey line
              zIndex: 1,
            }}
          ></div>

          {/* Input */}
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            style={{
              paddingLeft: "2.8rem",
              fontSize: "0.9rem",
              backgroundColor: "#f8f8fb",
              border: "1px solid #e4e7ec",
              borderRadius: "6px",
              color: "#7f8399",
            }}
          />
        </div>

        {/* Bell Icon */}
        <button
          className="btn d-flex align-items-center justify-content-center"
          style={{
            border: "1px solid #eee",
            backgroundColor: "white",
            width: "50px",
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
