import PageWrapper from "../components/layout/PageWrapper";
import PageHeader from "../components/ui/PageHeader";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchAndPagination from "../components/ui/SearchAndPagination";
import { Offcanvas } from "bootstrap";
import CreateLead from "../components/leads/CreateLead";
import { useDispatch, useSelector } from "react-redux";
import { createLead, fetchLeads } from "../redux/feature/leads/leadsThunks"; // ✅ Correct path here

const Leads = ({ onCreateLead, onViewLead }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const dispatch = useDispatch();
    const leads = useSelector((state) => state.leads.list);
    const loading = useSelector((state) => state.leads.loading);
    const error = useSelector((state) => state.leads.error);

    useEffect(() => {
        dispatch(fetchLeads());
    }, [dispatch]);

    const handleSaveLead = (newLead) => {
        dispatch(createLead(newLead)); // ✅ This will go to backend and update Redux state
    };

    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Open":
                return "badge text-bg-light text-success";
            case "New":
                return "badge bg-blue-100 text-primary ";
            case "In Progress":
                return "badge text-bg-secondary text-danger";
            default:
                return "badge text-bg-secondary";
        }
    };

    const dateRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState("");

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    const handleCreateClick = () => {
        const offcanvasEl = document.getElementById("createLead");
        const bsOffcanvas = new Offcanvas(offcanvasEl);
        bsOffcanvas.show();
    };
    const handleCreateDateButton = () => {
        if (dateRef.current) {
            dateRef.current.showPicker();
        }
    };

    return (
        <>
            <PageWrapper>
                <PageHeader title="Leads" offCanvasId="createLead" onCreateClick={handleCreateClick} />
                <CreateLead onSave={handleSaveLead} />
                <SearchAndPagination />
                {loading && <div className="p-4">Loading leads...</div>}
                {error && <div className="p-4 text-danger">Error: {error}</div>}
                <div className="container-fluid p-4">
                    <div className=" gap-3 d-flex ">
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Lead Status</option>
                                <option value="New">New</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                            </select>
                        </div>
                        <div className="position-relative col-md-3">
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

                    {/* Leads Table */}
                    <div className="card shadow-sm border-light">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>
                                            <input type="checkbox" />
                                        </th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE NUMBER</th>
                                        <th>CREATED DATE</th>
                                        <th>LEAD STATUS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads.map((lead) => (
                                        <tr key={lead.id}>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/leads/${lead.id}/details`}
                                                    className="text-black text-decoration-none"
                                                >
                                                    {lead.firstName} {lead.lastName}
                                                </Link>
                                            </td>
                                            <td>{lead.email}</td>
                                            <td>{lead.phone}</td>
                                            <td>{lead.createdAt}</td>
                                            <td>
                                                <span className={getStatusBadge(lead.status)}>{lead.leadStatus}</span>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm ">
                                                    <Link
                                                        to={`/leads/${lead.id}/details`}
                                                        className="text-black text-decoration-none"
                                                    >
                                                        <i className="bi bi-eye text-primary"></i>
                                                    </Link>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};

export default Leads;
