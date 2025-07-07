import { BriefcaseBusiness } from "lucide-react";
import { LuUsersRound } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const SummaryCards = () => {
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
      value: "136",
      icon: (color, size) => <BriefcaseBusiness color={color} size={size} />,
      iconBg:
        "linear-gradient(135deg,rgb(205, 248, 237),rgb(175, 229, 211) 100%)",
      iconColor: "#059669",
    },
    {
      title: "Closed Deals",
      value: "136",
      icon: (color, size) => <BriefcaseBusiness color={color} size={size} />,
      iconBg:
        "linear-gradient(135deg,rgb(197, 168, 168) 0%,rgb(241, 173, 173) 100%)",
      iconColor: "rgb(206, 95, 95)",
    },
    {
      title: "Monthly Revenue",
      value: "45,000",
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
