import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../redux/features/activitySlice";

export default function Meetings({ onCreateClick, module, id }) {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector(
    (state) => state.activities
  );

  const [openMeeting, setOpenMeeting] = useState(false);

  const toggleMeeting = (meetingId) => {
    setOpenMeeting((prev) => ({
      ...prev,
      [meetingId]: !prev[meetingId],
    }));
  };

  const getDuration = (start, end) => {
    const parseTime = (timeStr) => {
      const [time, meridian] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (meridian === "PM" && hours !== 12) hours += 12;
      if (meridian === "AM" && hours === 12) hours = 0;

      return hours * 60 + minutes; // total minutes
    };

    const startMinutes = parseTime(start);
    const endMinutes = parseTime(end);
    const diffMinutes = endMinutes - startMinutes;

    if (diffMinutes < 0) return "Invalid time";

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours > 0 ? `${hours} hr ` : ""}${minutes} min`;
  };

  useEffect(() => {
    dispatch(getAllActivities({ module, id }));
  }, [dispatch, module, id]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h6>Meeting</h6>
        </div>
        <button
          style={{
            height: "40px",
            width: "125px",
            backgroundColor: "#6c63ff",
            fontSize: "14px",
          }}
          className="btn btn-primary"
          onClick={onCreateClick}
        >
          Create Meeting
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {activities?.meetings?.map((meeting) => (
        <div
          key={meeting.id}
          style={{
            marginTop: "5px",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          <i
            className={`bi ${
              openMeeting[meeting.id] ? "bi-chevron-down" : "bi-chevron-right"
            } me-2`}
            onClick={() => toggleMeeting(meeting.id)}
            style={{ cursor: "pointer" }}
          ></i>
          <span style={{ color: "#666666" }}>
            <strong>Meeting</strong> {meeting.title}
          </span>
          <span style={{ float: "right", color: "#666666" }}>
            {meeting.createdAt}
          </span>
          <p style={{ color: "#4B647A" }}>{meeting.note}</p>
          {openMeeting[meeting.id] && (
            <div className="border-0 w-100 h-25 rounded-3 bg-primary-subtle d-flex p-2">
              <div className="col-6">
                <p className="mb-0 text-secondary">Date 7 Time</p>
                <h3 className="fs-6">
                  {meeting.start_date} at {meeting.start_time}
                </h3>
              </div>
              <div className="col-3">
                <p className="mb-0 text-secondary">Duration</p>
                <h3 className="fs-6">
                  {getDuration(meeting.start_time, meeting.end_time)}
                </h3>
              </div>
              <div className="col-3">
                <p className="mb-0 text-secondary">Attendees</p>
                <h3 className="fs-6">{meeting.meeting_attendees}</h3>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
