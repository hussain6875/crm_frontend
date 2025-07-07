import { NavLink } from "react-router-dom";
import { BriefcaseBusiness, TicketMinus } from "lucide-react";
import { LuUsersRound } from "react-icons/lu";
import { FiGrid, FiCheckSquare } from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: <FiGrid />, path: "/" },
  { label: "Leads", icon: <LuUsersRound />, path: "/leads" },
  { label: "Companies", icon: <BriefcaseBusiness />, path: "/companies" },
  { label: "Deals", icon: <FiCheckSquare />, path: "/deals" },
  { label: "Tickets", icon: <TicketMinus />, path: "/tickets" },
];

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column align-items-center bg-white shadow-sm pt-6 position-fixed top-0 start-0"
      style={{
        width: "90px",
        height: "100vh",
        zIndex: 999,
        paddingTop: "80px",
      }}
    >
      {/* Loops through navItems and creates a NavLink for each item.
       */}
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none my-3 ${
              isActive ? "text-primary" : "text-secondary"
            }`
          }
          style={{ fontSize: "0.75rem" }}
        >
          <div
            className={`d-flex align-items-center justify-content-center mb-1 ${
              window.location.pathname === item.path
                ? "bg-primary text-white"
                : "bg-light"
            }`}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              fontSize: "1.2rem",
              border: "1px solid #ddd",
            }}
          >
            {item.icon}
          </div>
          <small>{item.label}</small>
        </NavLink>
      ))}

      <div style={{ height: "600px" }}></div>
    </div>
  );
};

export default Sidebar;
