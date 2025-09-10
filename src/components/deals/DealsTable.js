import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaEdit, FaTrash, FaEye, FaPen } from "react-icons/fa";
import styles from "./deals.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDeals } from "../../redux/dealSlice";
import CreateEdit from "../tabs/CreateEdit";
import { fetchUserProfile } from "../../redux/AuthSlice";
function DealsTable(
  {
    selectedOwner,
    selectedStage,
    createdDate,
    closedDate,
    activePage,
    pageSize,
    onFilteredCount,
  },
)
 {
const dispatch = useDispatch();
  const { deals, loading, error } = useSelector((state) => state.deals || []);
  const  user = useSelector((state) => state.auth.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

   useEffect(() => {
     // Restore user from token
   const token = localStorage.getItem("token");
   if (token) {
     dispatch(fetchUserProfile(token));
   }
 
   // Fetch deals
     dispatch(fetchDeals());
   }, [dispatch]);
  // Robust deals array extraction (handles array or object shape)
  
  const dealsArray = Array.isArray(deals)
    ? deals
    : Array.isArray(deals?.data)
    ? deals.data
    : [];

  // Only show deals for the logged-in user (robust for both deal.owner and deal.dealOwner)
  const filteredDeals = dealsArray.filter((deal) => {
let match = true;
console.log(selectedOwner);
    if (selectedOwner === "All" || !selectedOwner) {
    return true; // Show all deals
  }
  if (selectedOwner || selectedOwner != "All") {
    // If an owner is selected, show their dealss
    match = match && (
      deal.owner?.userId === selectedOwner ||
      deal.dealOwner === selectedOwner
    );
  }
    if (selectedStage && selectedStage !== "All") {
      match = match && deal.stage === selectedStage;
    }
    if (createdDate) {
      match =
        match && deal.createdDate && deal.createdDate.startsWith(createdDate);
    }
    if (closedDate) {
      match = match && deal.closeDate && deal.closeDate.startsWith(closedDate);
    }
    return match;
  });

  // Notify parent of filtered count
  useEffect(() => {
    if (onFilteredCount) {
      onFilteredCount(filteredDeals.length);
    }
  }, [filteredDeals.length, onFilteredCount]);

  // Pagination logic
  const startIndex = (activePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedDeals = filteredDeals.slice(startIndex, endIndex);

  if (!user) return <p>Loading user...</p>;
  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>Error: {error}</p>;

  // Empty state
  if (paginatedDeals.length === 0) {
    return <p className="text-center mt-4">No deals to display.</p>;
  }

  return (
    <>
      <table className={`table table-hover ${styles.tableOutline}`}>
        <thead>
            <tr className={styles.headerRow}> 

            <th scope="col">
              <input type="checkbox" />
            </th>
            <th scope="col">DEAL NAME</th>
            <th scope="col">DEAL STAGE</th>
            <th scope="col">CLOSE DATE</th>
            <th scope="col">DEAL OWNER</th>
            <th scope="col">AMOUNT</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {paginatedDeals.map((deal, index) => (
            <tr key={startIndex + index} className={styles.tableRow}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{deal.name}</td>
              <td>{deal.stage}</td>
              <td>{new Date(deal.closeDate).toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric"
})}</td>
              <td>{deal.owner?.userName}</td>
              <td>${Number(deal.amount).toLocaleString()}</td>
              <td style={{ textAlign: "right" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "24px",
                    height:"40px"
                  }}
                >
                  <button
                    className="btn btn-link text-decoration-none text-secondary fw-semibold p-0"
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => {
                      setSelectedDeal(deal);
                      setShowEditModal(true);
                    }}
                  >
                    <FaPen className="text-primary" />
                  </button>
                  <Link to={`/dealdetails/${deal.dealId}`} state={{ deal }}>
                    <FaEye
                      role="button"
                      className="text-info me-2"
                      title="View Details"
                      style={{ margin: 0 }}
                    />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <CreateEdit
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          deal={selectedDeal} // pass selectedDeal.data
        />
      )}
    </>
  );
};

export default DealsTable;
