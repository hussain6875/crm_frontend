import { BriefcaseBusiness } from "lucide-react";
import { LuUsersRound } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const SummaryCards = () => {
  const { deals } = useSelector((state) => state.deals);
  const { user } = useSelector((state) => state.auth);

  // Robust deals array extraction (handles array or object shape)
  const dealsArray = Array.isArray(deals?.data)
    ? deals.data
    : Array.isArray(deals)
    ? deals
    : [];
  // Show loading if deals or user is not loaded
  if (!user || !dealsArray.length) {
    return <div>Loading summary cards...</div>;
  }
  // Filter deals for the current user only
  const userDeals = dealsArray.filter(
    (deal) =>
      (deal.owner?.userId === user.userId) ||
      (deal.dealOwner === user.userId)
  );
  // For getting Active Deals
  const activeDeals = userDeals.filter(
    (deal) => deal.stage !== "Closed Won" && deal.stage !== "Closed Lost"
  );
  const totalActiveDeals = activeDeals.length;
  // For getting Closed Deals
  const closedDeals = userDeals.filter(
    (deal) => deal.stage === "Closed Won" || deal.stage === "Closed Lost"
  );
  const totalClosedDeals = closedDeals.length;
  // For getting total revenue
  // Get today's date
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-indexed (0 = January)
  const currentYear = today.getFullYear();

  // Filter deals closed as "Closed Won" in the current month and year
  const monthlyClosedDeals = userDeals.filter((deal) => {
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
      value: "1,250",
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
      title: "Monthly Revenue",
      value: monthlyRevenue,
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
          <div
            className="card border-0 shadow-sm bg-white h-100"
            style={{ minHeight: "180px" }}
          >
            <div className="card-body p-3 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6
                    className="text-secondary mb-4"
                    style={{ fontSize: "1.2rem", fontWeight: "400" }}
                  >
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
