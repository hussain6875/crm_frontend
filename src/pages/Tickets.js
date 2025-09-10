import { useEffect, useRef, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import FilterDropdown from "../components/tickets/FilterDropdown";
import PageHeader from "../components/ui/PageHeader";
import SearchAndPagination from "../components/ui/SearchAndPagination";
import "bootstrap-icons/font/bootstrap-icons.css";
import TicketsRow from "../components/tickets/TicketsRow";
import TicketTable from "../components/tickets/TicketTable";
import CreateTicket from "../components/tickets/CreateTicket";
import { Offcanvas } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketById, fetchTickets } from "../redux/features/ticketSlice";
import { fetchUsers } from "../redux/userSlice";
import EditTicket from "../components/tickets/EditTicket";
import SuccessToast from "../components/tabs/Toast";

const Tickets = () => {
  const dateRef = useRef(null);
  const dispatch = useDispatch();
  const { tickets, ticket } = useSelector((state) => state.tickets);
  const { users = [] } = useSelector((state) => state.users);

  const [selectedTickets, setSelectedTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [filters, setFilters] = useState({
    owner: "",
    status: "",
    source: "",
    priority: "",
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const extractDate = (fullDateStr) => {
    if (!fullDateStr) return "";
    const date = new Date(fullDateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const filteredTickets = tickets.filter((ticket) => {
    let statusMatch = true;
    if (filters.status === "Open") {
      statusMatch = ticket.status === "new";
    } else if (filters.status === "In Progress") {
      statusMatch = ticket.status.startsWith("waiting");
    } else if (filters.status === "Resolved") {
      statusMatch = ticket.status === "closed";
    }
    const dateMatch =
      !selectedDate || extractDate(ticket.createdDate) === selectedDate;

    return (
      statusMatch &&
      (!filters.owner || toTitleCase(ticket.owner) === filters.owner) &&
      (!filters.source || ticket.source === filters.source) &&
      (!filters.priority || ticket.priority === filters.priority) &&
      dateMatch
    );
  });

  const handleCreateClick = () => {
    const offcanvasEl = document.getElementById("createTicket");
    const bsOffcanvas = new Offcanvas(offcanvasEl);
    bsOffcanvas.show();
  };

  const handleCreateDateButton = () => {
    if (dateRef.current) {
      dateRef.current.showPicker();
    }
  };

  const handleEdit = (ticket) => {
    const offcanvasEl = document.getElementById("editTicket");
    const bsOffcanvas = new Offcanvas(offcanvasEl);
    bsOffcanvas.show();
    dispatch(fetchTicketById(ticket.id));
  };

  const onSuccessMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    dispatch(fetchTickets());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <PageWrapper>
        <PageHeader title="Tickets" onCreateClick={handleCreateClick} />
        <CreateTicket
          onTicketCreated={() => dispatch(fetchTickets())}
          onSuccess={() => onSuccessMessage("New Ticket Created.")}
        />
        <SearchAndPagination />
        <div
          className="bg-white rounded-bottom pb-3"
          style={{
            width: "95%",
            margin: "auto",
            marginLeft: "20px",
            marginRight: "10px",
            marginTop: "3px",
            justifyContent: "space-between",
          }}
        >
          <div className="row mx-3">
            <div className="col-lg-9 col-12 row g-2 mb-3">
              <div className="col-md col-4 ps-0">
                <FilterDropdown
                  label="Ticket Owner"
                  value={filters.owner}
                  options={users.map((user) => toTitleCase(user.userName))}
                  onChange={(value) => setFilters({ ...filters, owner: value })}
                />
              </div>
              <div className="col-md col-4">
                <FilterDropdown
                  label="Ticket Status"
                  value={filters.status}
                  options={["Open", "In Progress", "Resolved"]}
                  onChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                />
              </div>
              <div className="col-md col-4">
                <FilterDropdown
                  label="Source"
                  value={filters.source}
                  options={["chat", "email", "phone"]}
                  onChange={(value) =>
                    setFilters({ ...filters, source: value })
                  }
                />
              </div>
              <div className="col-md col-4 ps-0 ps-md-1">
                <FilterDropdown
                  label="Priority"
                  value={filters.priority}
                  options={["low", "medium", "high", "critical"]}
                  onChange={(value) =>
                    setFilters({ ...filters, priority: value })
                  }
                />
              </div>
              <div className="position-relative col-md col-4 pe-0">
                <input
                  type="text"
                  className="form-control form-control-sm border-secondary pe-5"
                  value={selectedDate ? formatDate(selectedDate) : ""}
                  placeholder="Created Date"
                  onClick={handleCreateDateButton}
                  role="button"
                  readOnly
                />
                <i
                  className="bi bi-calendar position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                  role="button"
                  onClick={handleCreateDateButton}
                ></i>
                <input
                  type="date"
                  ref={dateRef}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="position-absolute top-0 start-0 opacity-0 w-100 h-100"
                  style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                />
              </div>
            </div>
          </div>
          <div
            className="table-responsive mx-3 border rounded-3 overflow-auto"
            style={{
              maxHeight: "52vh",
              scrollbarWidth: "none",
            }}
          >
            <table className="table table-sm align-middle m-0">
              <TicketsRow
                tickets={tickets}
                selectedTickets={selectedTickets}
                setSelectedTickets={setSelectedTickets}
              />
              <TicketTable
                tickets={filteredTickets}
                selectedTickets={selectedTickets}
                setSelectedTickets={setSelectedTickets}
                handleEditButton={handleEdit}
              />
            </table>
          </div>
        </div>
      </PageWrapper>
      <SuccessToast
        message={toastMessage}
        setShowToast={setShowToast}
        showToast={showToast}
      />
      <EditTicket
        ticket={ticket}
        onTicketUpdated={() => dispatch(fetchTickets())}
        onSuccess={() => onSuccessMessage("Details Updated.")}
      />
    </>
  );
};
export default Tickets;
