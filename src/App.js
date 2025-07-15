import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Tickets from "./pages/Tickets";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:ticketId/details" element={<TicketDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
