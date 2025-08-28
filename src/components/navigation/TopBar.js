import { FiSearch, FiBell } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/AuthSlice"; 
import { useState } from "react";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // dropdown toggle
  const [showDropdown, setShowDropdown] = useState(false);

  // get first letter from username or email
  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "?";
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "40px",
              transform: "translateY(-50%)",
              width: "1px",
              height: "20px",
              backgroundColor: "#d4d4d8",
              zIndex: 1,
            }}
          ></div>
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

        {/* Avatar with dropdown */}
        <div className="position-relative">
          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#6c63ff",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {getInitial()}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div
              className="position-absolute bg-white shadow rounded p-2"
              style={{
                top: "110%",
                right: 0,
                minWidth: "120px",
                zIndex: 1001,
              }}
            >
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;


