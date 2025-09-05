import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import ResetPassword from "./pages/ResetPassword";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Tickets from "./pages/Tickets";
import DealDetails from "./pages/DealDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TicketDetails from "./pages/TicketDetails";
import LeadDetails from './pages/LeadDetails';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      {/* ToastContainer to show toast messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/dealdetails/:id" element={<DealDetails />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:ticketId/details" element={<TicketDetails />} />
        <Route path="/leads/:leadId/details" element={<LeadDetails />} />
      </Routes>
          <ToastContainer />
    </Router>

  );
}

export default App;
