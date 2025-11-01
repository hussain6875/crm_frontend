import { BriefcaseBusiness } from "lucide-react";
import { LuUsersRound } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const SummaryCards = () => {
  const leadsState = useSelector((state) => state.leads);
const dealsState = useSelector((state) => state.deals);
const usersState = useSelector((state) => state.users);

    // leads count
  const totalLeads = Array.isArray(leadsState.list) ? leadsState.list.length : 0;

  // deals extraction
  const dealsArray = Array.isArray(dealsState.deals) ? dealsState.deals : [];

  
    //users extraction
  const usersArray = Array.isArray(usersState.users) ? usersState.users : [];

 
  // Show loading if deals or users is not loaded
  if (!usersArray || !dealsArray.length) {
    return <div>Loading summary cards...</div>;
  }
  const teamData = usersArray.map((user) => {
    const userDeals = dealsArray.filter(
      (deal) =>
        deal.owner?.userId === user.userId || deal.dealOwner === user.userId
    );
    // For getting Active Deals
    const activeDeals = userDeals.filter(
      (deal) => deal.stage !== "Closed Won" && deal.stage !== "Closed Lost"
    );
    // For getting Closed Deals
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
      revenue: revenue, // keep as number for calculation
    };
  });
  const totalActiveDeals = teamData.reduce(
    (sum, member) => sum + member.activeDeals,
    0
  );
  const totalClosedDeals = teamData.reduce(
    (sum, member) => sum + member.closedDeals,
    0
  );

  const totalRevenue = teamData.reduce(
    (sum, member) => sum + member.revenue,
    0
  );
 

  // For getting total revenue
  // Get today's date
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-indexed (0 = January)
  const currentYear = today.getFullYear();

  // Filter deals closed as "Closed Won" in the current month and year
  const monthlyClosedDeals = dealsArray.filter((deal) => {
    if (deal.stage === "Closed Won" && deal.closeDate) {
      const closeDate = new Date(deal.closeDate);
      return (
        closeDate.getMonth() === currentMonth &&
        closeDate.getFullYear() === currentYear
      );
    }
    return false;
  });
  // Sum the amounts for these deals
  const monthlyRevenue = monthlyClosedDeals.reduce(
    (sum, deal) => sum + (parseFloat(deal.amount) || 0),
    0
  );
  const cards = [
    {
      title: "Total Leads",
      value:totalLeads,
      icon: (color, size) => <LuUsersRound color={color} size={size} />,
      iconBg:
        "linear-gradient(135deg,rgb(210, 205, 248) 0%,rgb(158, 138, 227) 100%)",
      iconColor: "rgb(59, 41, 196)",
    },
    {
      title: "Active Deals",
      value: totalActiveDeals,
      icon: (color, size) => <BriefcaseBusiness color={color} size={size} />,
      iconBg:
        "linear-gradient(135deg,rgb(205, 248, 237),rgb(175, 229, 211) 100%)",
      iconColor: "#059669",
    },
    {
      title: "Closed Deals",
      value: totalClosedDeals,
      icon: (color, size) => <BriefcaseBusiness color={color} size={size} />,
      iconBg:
        "linear-gradient(135deg,rgb(197, 168, 168) 0%,rgb(241, 173, 173) 100%)",
      iconColor: "rgb(206, 95, 95)",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: (color, size) => (
        <FontAwesomeIcon
          icon={faMoneyBill}
          color={color}
          style={{ fontSize: size }}
        />
      ),
      iconBg:
        "linear-gradient(135deg,rgb(231, 209, 129) 0%,rgb(220, 175, 96) 100%)",
      iconColor: "#D97706",
    },
  ];

    return (
        <div className="row g-4 mb-4">
            {cards.map((card, idx) => (
                <div key={idx} className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm bg-white h-100" style={{ minHeight: "180px" }}>
                        <div className="card-body p-3 d-flex flex-column justify-content-between">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-secondary mb-4" style={{ fontSize: "1.2rem", fontWeight: "400" }}>
                                        {card.title}
                                    </h6>
                                    <h2 className="mb-0 fw-bold" style={{ fontSize: "2.5rem" }}>
                                        {card.value}
                                    </h2>
                                </div>
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        background: card.iconBg,
                                    }}
                                >
                                    {/* Render the icon with passed color and size */}
                                    {card.icon(card.iconColor, 30)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
