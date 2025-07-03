
import { Download } from "lucide-react"; //Download icon: Used in the "Export CSV" button.

const TeamPerformance = () => {
  const teamData = [
    {
      name: "Ethan Harper",
      activeDeals: 25,
      closedDeals: 10,
      revenue: "$12,000",
      change: "+3.4%",
      changeType: "positive",
    },
    {
      name: "Olivia Bennett",
      activeDeals: 30,
      closedDeals: 15,
      revenue: "$15,000",
      change: "-0.1%",
      changeType: "negative",
    },
    {
      name: "Liam Carter",
      activeDeals: 22,
      closedDeals: 12,
      revenue: "$10,000",
      change: "+3.4%",
      changeType: "positive",
    },
    {
      name: "Sophia Evans",
      activeDeals: 28,
      closedDeals: 14,
      revenue: "$14,000",
      change: "-0.1%",
      changeType: "negative",
    },
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0 fw-bold">Team Performance Tracking</h5>
        <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2">
          <Download size={16} />
          Export CSV
        </button>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="border-0 fw-semibold text-muted ps-4">
                  Employee
                </th>
                <th className="border-0 fw-semibold text-muted text-center">
                  Active Deals
                </th>
                <th className="border-0 fw-semibold text-muted text-center">
                  Closed Deals
                </th>
                <th className="border-0 fw-semibold text-muted text-end pe-4">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Loops through teamData to render each row*/}
              {teamData.map((member, index) => (
                <tr key={index}>
                  <td className="ps-4 py-3">
                    <div className="fw-medium text-dark">{member.name}</div>
                  </td>
                  <td className="text-center py-3">
                    <span className="fw-medium">{member.activeDeals}</span>
                  </td>
                  <td className="text-center py-3">
                    <span className="fw-medium">{member.closedDeals}</span>
                  </td>
                  <td className="text-end pe-4 py-3">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <span className="fw-medium">{member.revenue}</span>
                      <span
                        className={`badge ${
                          member.changeType === "positive"
                            ? "bg-success"
                            : "bg-danger"
                        } bg-opacity-10 ${
                          member.changeType === "positive"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {member.change}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;
