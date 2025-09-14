import PageWrapper from "../components/layout/PageWrapper";
import PageHeader from "../components/ui/PageHeader";
import { useRef, useState, useEffect } from "react";
import { Offcanvas } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createLead, fetchLeads} from "../redux/features/leads/leadsThunks";
import CreateLead from "../components/leads/CreateLead";
import EditLead from "../components/leads/EditLead";
import SearchAndPagination from "../components/ui/SearchAndPagination";
import LeadsFilters from "../components/leads/LeadsFilters";
import LeadsTable from "../components/leads/LeadsTable";
import SuccessToast from "../components/tabs/Toast";

const Leads = () => {
    const [lead, setLead] = useState({});
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedDate, setSelectedDate] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [filteredCount, setFilteredCount] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const dispatch = useDispatch();
    const leads = useSelector((state) => state.leads.list);
    const loading = useSelector((state) => state.leads.loading);
    const error = useSelector((state) => state.leads.error);

    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const dateRef = useRef(null);

    useEffect(() => {
        dispatch(fetchLeads());
    }, [dispatch]);

    const handleSaveLead = (newLead) => {
        dispatch(createLead(newLead));
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB");
    };

    const handleCreateDateButton = () => {
        if (dateRef.current) {
            dateRef.current.showPicker();
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Open":
                return "badge text-bg-light text-success";
            case "New":
                return "badge bg-blue-100 text-primary";
            case "In Progress":
                return "badge text-bg-secondary text-danger";
            default:
                return "badge text-bg-secondary";
        }
    };

    const filteredLeads = leads.filter((lead) => {
        const matchesStatus = statusFilter === "all" || lead.leadStatus === statusFilter;

        let matchesDate = true;
        if (selectedDate) {
            const leadDate = new Date(lead.createdAt).toISOString().split("T")[0];
            const selected = new Date(selectedDate).toISOString().split("T")[0];
            matchesDate = leadDate === selected;
        }

        return matchesStatus && matchesDate;
    });

    const onSuccessMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    useEffect(() => {
        setFilteredCount(filteredLeads.length);
    }, [filteredLeads]);

    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

    const handleEdit = (selectedLead) => {
        setLead(selectedLead);
        const offcanvasEl = document.getElementById("editLead");
        const bsOffcanvas = new Offcanvas(offcanvasEl);
        bsOffcanvas.show();
    };

    return (
        <>
            <PageWrapper>
                <PageHeader
                    title="Leads"
                    offCanvasId="createLead"
                    onCreateClick={() => {
                        const offcanvasEl = document.getElementById("createLead");
                        const bsOffcanvas = new Offcanvas(offcanvasEl);
                        bsOffcanvas.show();
                    }}
                />
                <CreateLead onSave={handleSaveLead} onLeadCreated={() => dispatch(fetchLeads())} onSuccess={() => onSuccessMessage("New Lead Created.")} />

                {/* Search + Pagination */}
                <SearchAndPagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} />

                {/* Create Lead Form */}
                <div
                    className="bg-white d-flex flex-column"
                    style={{
                        width: "95%",
                        paddingLeft: "20px",
                        marginLeft: "20px",
                        marginRight: "10px",
                        marginTop: "10px",
                        paddingRight: "20px",
                        paddingBottom: "20px",
                    }}
                >
                    {/* Filters */}
                    <LeadsFilters
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        formatDate={formatDate}
                        handleCreateDateButton={handleCreateDateButton}
                        dateRef={dateRef}
                    />

                    {/* Loading and Error */}
                    {loading && <div className="p-4">Loading leads...</div>}
                    {error && <div className="p-4 text-danger">Error: {error.message || error}</div>}

                    {/* Table */}
                    <LeadsTable paginatedLeads={paginatedLeads} handleEdit={handleEdit} getStatusBadge={getStatusBadge} />
                </div>
                 <SuccessToast
                        message={toastMessage}
                        setShowToast={setShowToast}
                        showToast={showToast}
                      />

                <EditLead isOpen={false} onClose={() => {}} onSave={() => {}} initialData={lead}  onSuccess={() => onSuccessMessage("Details Updated.")} />
            </PageWrapper>
            <EditLead isOpen={showEditModal} onClose={closeEditModal} onSave={handleUpdateLead} initialData={lead} />
        </>
    );
};

export default Leads;
