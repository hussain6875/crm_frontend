import styles from "./ticket.module.css";

const TicketsRow = ({ tickets, selectedTickets, setSelectedTickets }) => {
  const handleSelectAll = (checked) => {
    if (checked) setSelectedTickets(tickets.map((ticket) => ticket.id));
    else setSelectedTickets([]);
  };

  return (
    <>
      <thead className={`${styles.tableHead} align-middle`}>
        <tr>
          <th scope="col" className="px-3 py-2">
            <input
              type="checkbox"
              checked={selectedTickets.length === tickets.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </th>
          <th scope="col" className="fw-normal text-light py-2">
            TICKET NAME
          </th>
          <th scope="col" className="fw-normal text-light py-2">
            TICKET STATUS
          </th>
          <th scope="col" className="fw-normal text-light py-2">
            PRIORITY
          </th>
          <th scope="col" className="fw-normal text-light py-2">
            SOURCE
          </th>
          <th scope="col" className="fw-normal text-light py-2">
            TICKET OWNER
          </th>
          <th scope="col" className="fw-normal text-light py-2">
            CREATED DATE
          </th>
          <th scope="col" className="fw-normal text-light py-2">
            ACTIONS
          </th>
        </tr>
      </thead>
    </>
  );
};

export default TicketsRow;
