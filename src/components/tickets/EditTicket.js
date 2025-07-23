import React, { useEffect, useState } from "react";
import mockTickets from "./Tickets";
import styles from "./createTicket.module.css";
import { Offcanvas } from "bootstrap";

const EditTicket = ({ ticket, onUpdateTicket }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [owner, setOwner] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTicket = {
      ...ticket,
      description,
      status: ticketStatus,
      priority,
    };

    const index = mockTickets.findIndex((t) => t.id === ticket.id);
    if (index !== -1) {
      mockTickets[index] = updatedTicket;
    }

    if (onUpdateTicket) {
      onUpdateTicket(updatedTicket);
    }

    const offcanvasElement = document.getElementById("editTicket");
    const bsOffcanvas = Offcanvas.getInstance(offcanvasElement);
    bsOffcanvas?.hide();
  };

  useEffect(() => {
    if (ticket) {
      setName(ticket.name || "");
      setDescription(ticket.description || "");
      setTicketStatus(ticket.status || "");
      setSource(ticket.source || "");
      setPriority(ticket.priority || "");
      setOwner(ticket.owner || "");
    }
  }, [ticket]);

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-backdrop="static"
      tabIndex="-1"
      id="editTicket"
      aria-labelledby="staticBackdropLabel"
    >
      <div className="offcanvas-header">
        <h5
          className={`offcanvas-title ${styles.title}`}
          id="staticBackdropLabel"
        >
          Edit Ticket
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <hr className="border border-secondary border-opacity-25 m-0" />
      <div className="offcanvas-body mx-2 position-relative pb-5">
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
              className="form-control form-control-sm"
              id="ticketNameInput"
              placeholder="Enter"
              value={name}
              disabled
            />
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
              value={description}
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
                className="form-select form-select-sm"
                required
                value={ticketStatus}
                onChange={(e) => setTicketStatus(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="New">New</option>
                <option value="Waiting on us">Waiting on us</option>
                <option value="Waiting on contact">Waiting on contact</option>
                <option value="Closed">Closed</option>
              </select>
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
                className="form-select form-select-sm"
                value={source}
                disabled
              >
                <option value="">Choose</option>
                <option value="Chat">Chat</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </select>
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
              className="form-select form-select-sm"
              required
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div className="my-3">
            <label
              htmlFor="ticketOwnerInput"
              className="form-label form-label-sm fw-semibold"
            >
              Ticket Owner <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="ticketOwnerInput"
              placeholder="Enter"
              value={owner}
              disabled
            />
          </div>
          <div className="d-flex justify-content-between position-absolute bottom-0 start-0 end-0 px-4 pb-3 gap-3">
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTicket;
