import { useRef, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import FilterDropdown from "../components/tickets/FilterDropdown";
import PageHeader from "../components/ui/PageHeader";
import SearchAndPagination from "../components/ui/SearchAndPagination";
import mockTickets from "../components/tickets/Tickets";
import "bootstrap-icons/font/bootstrap-icons.css";
import TicketsRow from "../components/tickets/TicketsRow";
import TicketTable from "../components/tickets/TicketTable";
import CreateTicket from "../components/tickets/CreateTicket";

const Tickets = () => {
  const dateRef = useRef(null);
  const tickets = mockTickets;
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
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
      statusMatch = ticket.status === "New";
    } else if (filters.status === "in Progress") {
      statusMatch = ticket.status.startsWith("Waiting");
    } else if (filters.status === "Resolved") {
      statusMatch = ticket.status === "Closed";
    }
    const formattedDate = formatDate(selectedDate);
    const dateMatch = !selectedDate || ticket.createdDate === formattedDate;
    return (
      statusMatch &&
      (!filters.owner || toTitleCase(ticket.owner) === filters.owner) &&
      (!filters.source || ticket.source === filters.source) &&
      (!filters.priority || ticket.priority === filters.priority) &&
      dateMatch
    );
  });

  const handleCreateDateButton = () => {
    if (dateRef.current) {
      dateRef.current.showPicker();
    }
  };

  return (
    <>
      <PageWrapper>
        <PageHeader title="Tickets" offCanvasId={"createTicket"} />
        <CreateTicket />
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
                  options={[
                    ...new Set(
                      tickets.map((owner) => toTitleCase(owner.owner))
                    ),
                  ]}
                  onChange={(value) => setFilters({ ...filters, owner: value })}
                />
              </div>
              <div className="col-md col-4">
                <FilterDropdown
                  label="Ticket Status"
                  value={filters.status}
                  options={["Open", "in Progress", "Resolved"]}
                  onChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                />
              </div>
              <div className="col-md col-4">
                <FilterDropdown
                  label="Source"
                  value={filters.source}
                  options={["Chat", "Email", "Phone"]}
                  onChange={(value) =>
                    setFilters({ ...filters, source: value })
                  }
                />
              </div>
              <div className="col-md col-4 ps-0 ps-md-1">
                <FilterDropdown
                  label="Priority"
                  value={filters.priority}
                  options={["Low", "Medium", "High", "Critical"]}
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
                  style={{ pointerEvents: "none" }}
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
              />
            </table>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default Tickets;
