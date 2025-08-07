import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Tickets from "./pages/Tickets";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
import TicketDetails from "./pages/TicketDetails";
import LeadDetails from "./pages/LeadDetails";

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                {/* <Route path="/register" element={<Register />} /> */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/tickets/:ticketId/details" element={<TicketDetails />} />
                <Route path="/leads/:leadId/details" element={<LeadDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
