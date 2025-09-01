import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../redux/features/activitySlice";
import moment from "moment";

export default function Tasks({ onCreateClick, module, id }) {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector(
    (state) => state.activities
  );

  const [opentask, setOpenTask] = useState(false);

  const toggleTask = (taskId) => {
    setOpenTask((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
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
          <h6>Tasks</h6>
        </div>
        <button
          style={{
            height: "40px",
            width: "125px",
            backgroundColor: "#6c63ff",
            fontSize: "15px",
          }}
          className="btn btn-primary"
          onClick={onCreateClick}
        >
          Create Task
        </button>
      </div>
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
    </>
  );
}
