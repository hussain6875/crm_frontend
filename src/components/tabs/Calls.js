import React, { useEffect, useState } from "react";
import { getAllActivities } from "../../redux/features/activitySlice";
import { useDispatch, useSelector } from "react-redux";

export default function Calls({ onCreateClick, module, id }) {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector(
    (state) => state.activities
  );

  const [opencall, setOpenCall] = useState({});

  const toggleCall = (callId) => {
    setOpenCall((prev) => ({
      ...prev,
      [callId]: !prev[callId],
    }));
  };

  useEffect(() => {
    dispatch(getAllActivities({ module, id }));
  }, [dispatch, module, id]);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h6>Calls</h6>
          <h6>June 2025</h6>
        </div>
        <button
          style={{
            height: "40px",
            width: "125px",
            backgroundColor: "#6c63ff",
            fontSize: "12px",
          }}
          className="btn btn-primary"
          onClick={onCreateClick}
        >
          Make a Phone Call
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {activities?.calls?.map((call) => (
        <div
          key={call.id}
          style={{
            marginTop: "5px",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          <i
            className={`bi ${
              opencall[call.id] ? "bi-chevron-down" : "bi-chevron-right"
            } me-2`}
            onClick={() => toggleCall(call.id)}
            style={{ cursor: "pointer" }}
          ></i>
          <span style={{ color: "#666666" }}>
            <strong>Call</strong> from {call.connected}
          </span>
          <span style={{ float: "right", color: "#666666" }}>
            {call.createdAt}
          </span>
          <p style={{ color: "#4B647A" }}>{call.note}</p>

          {opencall[call.id] && (
            <div className="border-0 w-100 h-25 rounded-3 bg-primary-subtle d-flex p-2">
              <div className="col-6">
                <p className="mb-0 text-secondary">Outcome</p>
                <h3 className="fs-6">{call.outcome}</h3>
              </div>
              <div>
                <p className="mb-0 text-secondary">Duration</p>
                <h3 className="fs-6">{call.call_time}</h3>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
