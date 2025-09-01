import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Tickets from "./pages/Tickets";
import DealDetails from "./pages/DealDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TicketDetails from "./pages/TicketDetails";
<<<<<<< HEAD
=======
import LeadDetails from "./pages/LeadDetails";
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/dealdetails/:id" element={<DealDetails />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:ticketId/details" element={<TicketDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
