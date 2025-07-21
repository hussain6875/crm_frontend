import React, { useState } from "react";
import styles from "./ticket.module.css";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

const TicketTable = ({
  tickets,
  setTickets,
  selectedTickets,
  setSelectedTickets,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTicketId, setDeleteTicketId] = useState(null);

  const handleSelectTicket = (ticketId, checked) => {
    if (checked) setSelectedTickets([...selectedTickets, ticketId]);
    else setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
  };

  const handleDeleteButton = (id) => {
    setDeleteTicketId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <tbody className={`${styles.tableBody}`}>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td className="px-3 py-2">
              <input
                type="checkbox"
                checked={selectedTickets.includes(ticket.id)}
                onChange={(e) =>
                  handleSelectTicket(ticket.id, e.target.checked)
                }
              />
            </td>
            <td>
              <Link
                to={`/tickets/${ticket.id}/details`}
                className="text-black text-decoration-none"
              >
                {ticket.name}
              </Link>
            </td>
            <td>{ticket.status}</td>
            <td>{ticket.priority}</td>
            <td>{ticket.source}</td>
            <td>{ticket.owner}</td>
            <td>{ticket.createdDate}</td>
            <td>
              <button
                className="btn btn-sm me-2"
                // onClick={handleEditButton}
              >
                <i className={`bi bi-pencil-fill ${styles.pencil}`}></i>
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  handleDeleteButton(ticket.id);
                }}
              >
                <i className="bi bi-trash-fill text-danger"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      <DeleteModal
        setTickets={setTickets}
        deleteTicketId={deleteTicketId}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </>
  );
};

export default TicketTable;
