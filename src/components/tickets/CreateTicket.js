import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import styles from "./createTicket.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "bootstrap";
import { createTicketAPI } from "../../redux/features/ticketSlice";
import { fetchUsers } from "../../redux/userSlice";

const CreateTicket = ({ onTicketCreated }) => {
  const dispatch = useDispatch();
  const { loading, createMessage, createError } = useSelector(
    (state) => state.tickets
  );
  const { users = [] } = useSelector((state) => state.users || {});

=======
import mockTickets from "./Tickets";
import styles from "./createTicket.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const CreateTicket = () => {
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [owner, setOwner] = useState("");
<<<<<<< HEAD
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Ticket name is required";
    if (!ticketStatus) newErrors.ticketStatus = "Ticket status is required";
    if (!source) newErrors.source = "Source is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!owner) newErrors.owner = "Ticket owner is required";
    return newErrors;
=======

  const createNewTicket = (newTicket) => {
    mockTickets.push(newTicket);
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop if validation fails
    }
    const newTicket = {
      name,
      description,
      ticket_status: ticketStatus,
      priority,
      source,
      owner,
    };
    console.log(newTicket);
    dispatch(createTicketAPI(newTicket));
    setSubmitted(true);
    setErrors({});
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setTicketStatus("");
    setSource("");
    setPriority("");
    setOwner("");
  };

  useEffect(() => {
    if (createMessage && submitted) {
      resetForm();

      const offcanvasElement = document.getElementById("createTicket");
      let bsOffcanvas = Offcanvas.getInstance(offcanvasElement);
      if (!bsOffcanvas) {
        bsOffcanvas = new Offcanvas(offcanvasElement);
      }

      bsOffcanvas?.hide();
      onTicketCreated?.();
      setSubmitted(false);
    }
  }, [createMessage, submitted]);

  useEffect(() => {
    const offcanvasElement = document.getElementById("createTicket");
    const handler = () => {
      setErrors({});
      resetForm();
    };
    offcanvasElement?.addEventListener("shown.bs.offcanvas", handler);

    return () => {
      offcanvasElement?.removeEventListener("shown.bs.offcanvas", handler);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
=======

    const formatDate = () => {
      const date = new Date();
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${dd}-${mm}-${yyyy}`;
    };

    const newTicket = {
      id: Date.now().toString(),
      name,
      description,
      status: ticketStatus,
      priority,
      source,
      owner,
      createdDate: formatDate(),
    };

    createNewTicket(newTicket);
    e.target.reset();

    const offcanvasElement = document.getElementById("createTicket");
    const bsOffcanvas =
      window.bootstrap.Offcanvas.getInstance(offcanvasElement);
    bsOffcanvas?.hide();
  };

  useEffect(() => {
    // optional: reset state when modal opens
    const offcanvasElement = document.getElementById("createTicket");
    offcanvasElement?.addEventListener("shown.bs.offcanvas", () => {
      setName("");
      setDescription("");
      setTicketStatus("");
      setSource("");
      setPriority("");
      setOwner("");
    });
  }, []);
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-backdrop="static"
      tabIndex="-1"
      id="createTicket"
      aria-labelledby="staticBackdropLabel"
    >
      <div className="offcanvas-header">
        <h5
          className={`offcanvas-title ${styles.title}`}
          id="staticBackdropLabel"
        >
          Create Ticket
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <hr className="border border-secondary border-opacity-25 m-0" />
<<<<<<< HEAD
      <div className="offcanvas-body mx-2 position-relative pb-0">
=======
      <div className="offcanvas-body mx-2 position-relative pb-5">
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="ticketNameInput"
              className="form-label form-label-sm fw-semibold"
            >
              Ticket Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
<<<<<<< HEAD
              className={`form-control form-control-sm ${
                errors.name ? "is-invalid" : ""
              }`}
              id="ticketNameInput"
              placeholder="Enter"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
=======
              className="form-control form-control-sm"
              id="ticketNameInput"
              placeholder="Enter"
              required
              onChange={(e) => setName(e.target.value)}
            />
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
          </div>
          <div className="my-3">
            <label
              htmlFor="descriptionInput"
              className="form-label form-label-sm fw-semibold"
            >
              Description
            </label>
            <textarea
              rows={3}
              className="form-control form-control-sm"
              id="descriptionInput"
              placeholder="Enter"
<<<<<<< HEAD
              value={description}
=======
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="row my-3">
            <div className="col">
              <label
                htmlFor="ticketStatus"
                className="form-label form-label-sm fw-semibold"
              >
                Ticket Status <span className="text-danger">*</span>
              </label>
              <select
                id="ticketStatus"
<<<<<<< HEAD
                className={`form-select form-select-sm ${
                  errors.ticketStatus ? "is-invalid" : ""
                }`}
                value={ticketStatus}
                onChange={(e) => setTicketStatus(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="new">New</option>
                <option value="waiting on us">Waiting on us</option>
                <option value="waiting on contact">Waiting on contact</option>
              </select>
              {errors.ticketStatus && (
                <div className="invalid-feedback">{errors.ticketStatus}</div>
              )}
=======
                className="form-select form-select-sm"
                required
                onChange={(e) => setTicketStatus(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="New">New</option>
                <option value="Waiting on us">Waiting on us</option>
              </select>
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
            </div>
            <div className="col">
              <label
                htmlFor="source"
                className="form-label form-label-sm fw-semibold"
              >
                Source <span className="text-danger">*</span>
              </label>
              <select
                id="source"
<<<<<<< HEAD
                className={`form-select form-select-sm ${
                  errors.source ? "is-invalid" : ""
                }`}
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="chat">Chat</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              {errors.source && (
                <div className="invalid-feedback">{errors.source}</div>
              )}
=======
                className="form-select form-select-sm"
                required
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="Chat">Chat</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </select>
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
            </div>
          </div>
          <div className="my-3">
            <label
              htmlFor="priority"
              className="form-label form-label-sm fw-semibold"
            >
              Priority <span className="text-danger">*</span>
            </label>
            <select
              id="priority"
<<<<<<< HEAD
              className={`form-select form-select-sm ${
                errors.priority ? "is-invalid" : ""
              }`}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            {errors.priority && (
              <div className="invalid-feedback">{errors.priority}</div>
            )}
=======
              className="form-select form-select-sm"
              required
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
          </div>
          <div className="my-3">
            <label
              htmlFor="ticketOwnerInput"
              className="form-label form-label-sm fw-semibold"
            >
              Ticket Owner <span className="text-danger">*</span>
            </label>
<<<<<<< HEAD
            <select
              id="ticketOwnerInput"
              className={`form-select form-select-sm ${
                errors.owner ? "is-invalid" : ""
              }`}
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            >
              <option value="">Choose Owner</option>
              {users.map((u) => (
                <option key={u.userId} value={u.userName}>
                  {u.userName}
                </option>
              ))}
            </select>
            {errors.owner && (
              <div className="invalid-feedback">{errors.owner}</div>
            )}
          </div>
          <div
            className={`d-flex justify-content-between gap-3 mb-4 ${
              Object.keys(errors).length === 0
                ? "position-absolute bottom-0 pb-3 start-0 end-0 px-4"
                : ""
            }`}
          >
=======
            <input
              type="text"
              className="form-control form-control-sm"
              id="ticketOwnerInput"
              placeholder="Enter"
              required
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between position-absolute bottom-0 start-0 end-0 px-4 pb-3 gap-3">
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
            <button
              className={`${styles.close} btn w-100`}
              type="button"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              Cancel
            </button>
            <button
              className={`${styles.save} btn text-white w-100`}
              type="submit"
            >
<<<<<<< HEAD
              {loading ? "Saving..." : "Save"}
=======
              Save
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
