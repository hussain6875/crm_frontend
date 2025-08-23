import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../redux/features/activitySlice";

export default function Emails({ onCreateClick, module, id }) {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector(
    (state) => state.activities
  );

  const [openEmail, setOpenEmail] = useState({});

  const toggleEmail = (emailId) => {
    setOpenEmail((prev) => ({
      ...prev,
      [emailId]: !prev[emailId],
    }));
  };

  useEffect(() => {
    dispatch(getAllActivities({ module, id }));
  }, [dispatch, module, id]);
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
          onClick={onCreateClick}
        >
          Create Email
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {activities?.emails?.map((email) => (
        <div
          key={email.id}
          style={{
            marginTop: "5px",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          <i
            className={`bi ${
              openEmail[email.id] ? "bi-chevron-down" : "bi-chevron-right"
            } me-2`}
            onClick={() => toggleEmail(email.id)}
            style={{ cursor: "pointer" }}
          ></i>
          <span style={{ float: "right", color: "#666666" }}>
            {email.createdAt}
          </span>
          <span style={{ color: "#666666" }}>
            <strong>Logged Email - </strong>
            {email.subject}
          </span>
          {openEmail[email.id] && (
            <p className="mx-3" style={{ color: "#4B647A" }}>
              {email.body_text}
            </p>
          )}
        </div>
      ))}
    </>
  );
}
