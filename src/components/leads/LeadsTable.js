import React from "react";
import { Link } from "react-router-dom";
import styles from "../../steyls/table.module.css";
import { FaEye, FaPen } from "react-icons/fa";

const LeadsTable = ({ paginatedLeads, handleEdit, getStatusBadge }) => {
  return (
    <div className="card shadow-sm border-light">
      <div className="table-responsive">
     <table className={`table table-hover ${styles.tableOutline}`}>
  <thead>
    <tr className={styles.headerRow}>
      <th><input type="checkbox" /></th>
      <th>NAME</th>
      <th>EMAIL</th>
      <th>PHONE NUMBER</th>
      <th>CREATED DATE</th>
      <th>LEAD STATUS</th>
      <th style={{ textAlign: "right", paddingRight: "10px" }}>ACTIONS</th>
    </tr>
  </thead>
  <tbody>
    {paginatedLeads
     .filter((lead) => lead.leadStatus !== "Qualified Lead")
    .map((lead) => (
      <tr key={lead.id} className={styles.tableRow}>
        <td><input type="checkbox" /></td>
        <td>
          <Link to={`/leads/${lead.id}/details`} className="text-black text-decoration-none">
            {lead.firstName} {lead.lastName}
          </Link>
        </td>
        <td>{lead.email}</td>
        <td>{lead.phone}</td>
        <td>{lead.createdAt}</td>
        <td>
          <span className={getStatusBadge(lead.status)}>{lead.leadStatus}</span>
        </td>
        <td style={{ textAlign: "right" }}>
          <div className="d-flex justify-content-end align-items-center gap-3">
            <button
              className="btn btn-link p-0"
              onClick={() => handleEdit(lead)}
            >
              <FaPen className="text-primary" />
            </button>
            <Link to={`/leads/${lead.id}/details`}>
              <FaEye className="text-info" />
            </Link>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      </div>
    </div>
  );
};

export default LeadsTable;
