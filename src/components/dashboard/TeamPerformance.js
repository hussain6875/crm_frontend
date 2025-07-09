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
    <div className="my-5">
      <div
        className="p-4 bg-white rounded-4 shadow-sm"
        style={{
          width: "100%",
          marginLeft: "1px",
          marginTop: "-50px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Team Performance Tracking</h5>
          <button
            className="btn btn-outline-primary btn-sm"
            style={{ color: "#4332c8", borderColor: "#4332c8" }}
          >
            Export CSV
          </button>
        </div>

        <div className="table-responsive">
          <table
            className="table mb-0"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 12px",
            }}
          >
            <thead className="table-light">
              <tr>
                <th className="ps-4 text-dark fw-semibold border-0 bg-transparent">
                  Employee
                </th>
                <th className="text-center text-dark fw-semibold border-0 bg-transparent">
                  Active Deals
                </th>
                <th className="text-center text-dark fw-semibold border-0 bg-transparent">
                  Closed Deals
                </th>
                <th className="text-end pe-4 text-dark fw-semibold border-0 bg-transparent">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member, index) => (
                <tr key={index}>
                  <td colSpan="4" className="border-0 p-0">
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        border: "1px solid #e2e2e2",
                        borderRadius: "12px",
                        padding: "16px 24px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        className="fw-semibold text-dark"
                        style={{ width: "25%" }}
                      >
                        {member.name}
                      </div>
                      <div
                        className="text-center fw-medium"
                        style={{ width: "25%" }}
                      >
                        {member.activeDeals}
                      </div>
                      <div
                        className="text-center fw-medium"
                        style={{ width: "25%" }}
                      >
                        {member.closedDeals}
                      </div>
                      <div
                        className="text-end fw-medium d-flex align-items-center justify-content-end gap-2"
                        style={{ width: "25%" }}
                      >
                        <span>{member.revenue}</span>
                        <span
                          className={`badge bg-opacity-10 ${
                            member.changeType === "positive"
                              ? "bg-success text-success"
                              : "bg-danger text-danger"
                          }`}
                          style={{ fontSize: "0.75rem" }}
                        >
                          {member.change}
                        </span>
                      </div>
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
