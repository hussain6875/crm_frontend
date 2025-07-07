import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </Router>
  );
}

export default App;
