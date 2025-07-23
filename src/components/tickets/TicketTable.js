import styles from "./ticket.module.css";
import { Link } from "react-router-dom";

const TicketTable = ({ tickets, selectedTickets, setSelectedTickets }) => {
  const handleSelectTicket = (ticketId, checked) => {
    if (checked) setSelectedTickets([...selectedTickets, ticketId]);
    else setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
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
            <td>{ticket.name}</td>
            <td>{ticket.status}</td>
            <td>{ticket.priority}</td>
            <td>{ticket.source}</td>
            <td>{ticket.owner}</td>
            <td>{ticket.createdDate}</td>
            <td>
              {/* <button
                className="btn btn-sm me-2"
                // onClick={handleEditButton}
              >
                <i className={`bi bi-pencil-fill ${styles.pencil}`}></i>
              </button> */}
              <Link className="btn btn-sm" to={`/tickets/${ticket.id}/details`}>
                <i className="bi bi-eye-fill text-danger"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TicketTable;
