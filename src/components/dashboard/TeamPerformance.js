import { useSelector} from "react-redux";
const TeamPerformance = () => {
  const {deals} = useSelector((state)=>state.deals);
  const {users} = useSelector((state)=>state.users);
console.log(deals.data,users);
  // Robust deals array extraction (handles array or object shape)
  const dealsArray = Array.isArray(deals?.data)
    ? deals.data
    : Array.isArray(deals)
    ? deals
    : [];
  const usersArray = users?.data || users || [];
  // Build team data dynamically
  const teamData = usersArray.map((user) => {
    const userDeals = dealsArray.filter(
      (deal) =>
        (deal.owner?.userId === user.userId) ||
        (deal.dealOwner === user.userId)
    );
    const activeDeals = userDeals.filter(
      (deal) => deal.stage !== "Closed Won" && deal.stage !== "Closed Lost"
    );
    const closedDeals = userDeals.filter(
      (deal) => deal.stage === "Closed Won" || deal.stage === "Closed Lost"
    );
    const revenue = closedDeals
      .filter((deal) => deal.stage === "Closed Won")
      .reduce((sum, deal) => sum + (parseFloat(deal.amount) || 0), 0);

    return {
      name: user.userName,
      activeDeals: activeDeals.length,
      closedDeals: closedDeals.length,
      revenue: `$${revenue.toLocaleString()}`,
    
    };
  });

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
