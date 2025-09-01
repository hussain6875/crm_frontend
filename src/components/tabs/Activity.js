import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../redux/features/activitySlice";
import moment from "moment";

export default function Activity({ module, id }) {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector(
    (state) => state.activities
  );

  const [opentask, setOpenTask] = useState(false);
  const [opencall, setOpenCall] = useState({});
  const [openMeeting, setOpenMeeting] = useState({});
  const [openEmail, setOpenEmail] = useState({});
  const [openNote, setOpenNote] = useState({});

  const toggleTask = (taskId) => {
    setOpenTask((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const toggleCall = (callId) => {
    setOpenCall((prev) => ({
      ...prev,
      [callId]: !prev[callId],
    }));
  };

  const toggleMeeting = (meetingId) => {
    setOpenMeeting((prev) => ({
      ...prev,
      [meetingId]: !prev[meetingId],
    }));
  };

  const toggleEmail = (emailId) => {
    setOpenEmail((prev) => ({
      ...prev,
      [emailId]: !prev[emailId],
    }));
  };

  const toggleNote = (noteId) => {
    setOpenNote((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
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

  const formatDateTime = (isoString) => {
    return moment(isoString).format("MMMM D, YYYY [at] h:mm A");
  };

  useEffect(() => {
    dispatch(getAllActivities({ module, id }));
  }, [dispatch, module, id]);
  return (
    <>
      <h6>Upcoming</h6>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {activities?.tasks?.map((task) => (
        <div
          key={task.id}
          style={{
            marginTop: "5px",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          <i
            className={`bi ${
              opentask[task.id] ? "bi-chevron-down" : "bi-chevron-right"
            } me-2`}
            onClick={() => toggleTask(task.id)}
          ></i>
          <span style={{ color: "#666666" }}>
            <strong>Task</strong> assigned to {task.assigned}
          </span>
          <span style={{ float: "right", color: "#666666" }} className="small">
            {formatDateTime(task.due_date)}
          </span>
          <p style={{ color: "#4B647A" }}>{task.note}</p>
          {opentask[task.id] && (
            <div className="border-0 w-100 h-25 rounded-3 bg-primary-subtle d-flex justify-content-between p-2">
              <div>
                <p className="mb-0 text-secondary">Due Date & Time</p>
                <h3 className="fs-6">{moment(task.due_date).format("MMMM D, YYYY [at] h:mm A")}</h3>
              </div>
              <div>
                <p className="mb-0 text-secondary">Priority</p>
                <h3 className="fs-6">{task.priority}</h3>
              </div>
              <div className="col-3">
                <p className="mb-0 text-secondary">Type</p>
                <h3 className="fs-6">{task.task_type}</h3>
              </div>
            </div>
          )}
        </div>
      ))}

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
          <span style={{ float: "right", color: "#666666" }} className="small">
            {formatDateTime(call.createdAt)}
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
                <h3 className="fs-6">{moment(call.call_time).format("h:mm A")}</h3>
              </div>
            </div>
          )}
        </div>
      ))}

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
          <span style={{ float: "right", color: "#666666" }} className="small">
            {formatDateTime(meeting.createdAt)}
          </span>
          <p style={{ color: "#4B647A" }}>{meeting.note}</p>
          {openMeeting[meeting.id] && (
            <div className="border-0 w-100 h-25 rounded-3 bg-primary-subtle d-flex p-2">
              <div className="col-6">
                <p className="mb-0 text-secondary">Date & Time</p>
                <h3 className="fs-6">
                  {moment(
                    `${meeting.start_date} ${meeting.start_time}`,
                    "YYYY-MM-DD HH:mm"
                  ).format("MMMM D, YYYY [at] h:mm A")}
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
          <span style={{ float: "right", color: "#666666" }} className="small">
            {formatDateTime(email.createdAt)}
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
      {activities?.notes
        ?.filter((note) => note && note.id)
        .map((note) => (
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
            <span
              style={{ float: "right", color: "#666666" }}
              className="small"
            >
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
