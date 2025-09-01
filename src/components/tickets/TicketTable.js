<<<<<<< HEAD
import styles from "./ticket.module.css";
=======
import React, { useState } from "react";
import styles from "./ticket.module.css";
import DeleteModal from "./DeleteModal";
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
import { Link } from "react-router-dom";

const TicketTable = ({
  tickets,
<<<<<<< HEAD
  selectedTickets,
  setSelectedTickets,
  handleEditButton,
}) => {
=======
  setTickets,
  selectedTickets,
  setSelectedTickets,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTicketId, setDeleteTicketId] = useState(null);

>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
  const handleSelectTicket = (ticketId, checked) => {
    if (checked) setSelectedTickets([...selectedTickets, ticketId]);
    else setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
  };

<<<<<<< HEAD
=======
  const handleDeleteButton = (id) => {
    setDeleteTicketId(id);
    setShowDeleteModal(true);
  };

>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
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
<<<<<<< HEAD
            <td>{ticket.name}</td>
=======
            <td>
              <Link
                to={`/tickets/${ticket.id}/details`}
                className="text-black text-decoration-none"
              >
                {ticket.name}
              </Link>
            </td>
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
            <td>{ticket.status}</td>
            <td>{ticket.priority}</td>
            <td>{ticket.source}</td>
            <td>{ticket.owner}</td>
            <td>{ticket.createdDate}</td>
            <td>
              <button
<<<<<<< HEAD
                className="btn btn-sm"
                onClick={() => {
                  handleEditButton(ticket);
                }}
              >
                <i className={`bi bi-pencil-fill ${styles.pencil}`}></i>
              </button>
              <Link className="btn btn-sm" to={`/tickets/${ticket.id}/details`}>
                <i className="bi bi-eye-fill text-danger mx-2"></i>
              </Link>
=======
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
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
            </td>
          </tr>
        ))}
      </tbody>
<<<<<<< HEAD
=======

      <DeleteModal
        setTickets={setTickets}
        deleteTicketId={deleteTicketId}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
    </>
  );
};

export default TicketTable;
