import React, {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import styles from "./deals.module.css";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {fetchDeals} from "../../redux/dealSlice";
export default function DealsTable() {
 
  const dispatch = useDispatch();
  const {deals,loading,error} = useSelector((state)=>state.deals);

  useEffect(()=>{
    dispatch(fetchDeals());
  },[dispatch]);
    if (loading) return <p>Loading deals...</p>;
    if (error) return <p>Error: {error}</p>;
  return (
    <table className={`table  table-hover`}>
      {" "}
      <thead>
        <tr>
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
        {deals.map((deal, index) => (
          <tr key={index}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{deal.name}</td>
            <td>{deal.stage}</td>
            <td>{deal.closeDate}</td>
            <td>{deal.owner?.userName}</td>
            <td>{deal.amount}</td>
            <td style={{ textAlign: "center" }}>
              <Link to={`/dealdetails/${deal.dealId}`} state={{deal}}>            
                <FaEye
                  role="button"
                  className="text-info me-2"
                  title="View Details"
                />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
