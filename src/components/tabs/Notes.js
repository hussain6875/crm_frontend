<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../redux/features/activitySlice";
import moment from "moment";
export default function Notes({ onCreateClick, module, id }) {
  const dispatch = useDispatch();
  const { loading, error, activities } = useSelector(
    (state) => state.activities
  );

  const [openNote, setOpenNote] = useState({});

  const toggleNote = (noteId) => {
    setOpenNote((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  const formatDateTime = (isoString) => {
    return moment(isoString).format("MMMM D, YYYY [at] h:mm A");
  };

  useEffect(() => {
    dispatch(getAllActivities({ module, id }));
  }, [dispatch, module, id]);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h6>Notes</h6>
        </div>
        <button
          style={{ height: "40px", width: "125px", backgroundColor: "#6c63ff" }}
          className="btn btn-primary"
          onClick={onCreateClick}
        >
          Create Note
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {activities?.notes?.map((note) => (
        <div
          key={note.id}
          style={{
            marginTop: "5px",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          <i
            className={`bi ${
              openNote[note.id] ? "bi-chevron-down" : "bi-chevron-right"
            } me-2`}
            onClick={() => toggleNote(note.id)}
          ></i>
          <span style={{ color: "#666666" }}>
            <strong>Note</strong>
          </span>
          <span style={{ float: "right", color: "#666666" }} className="small">
            {formatDateTime(note.createdAt)}
          </span>
          {openNote[note.id] && (
            <p style={{ color: "#4B647A" }}>{note.content}</p>
          )}
        </div>
      ))}
    </>
  );
}
=======
import React from 'react'

const Notes = () => {
  return (
    <div>Notes hi</div>
  )
}

export default Notes
>>>>>>> dec2b41 (db connected)
