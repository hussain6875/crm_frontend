
import { Users } from "lucide-react";
import { MdAttachMoney, MdWork } from "react-icons/md";

const SummaryCards = () => {
  const cards = [
    {
      title: "Total Leads",
      value: "1,250",
      icon: Users,
      iconBg: "#6366F1",
      iconColor: "white",
    },
    {
      title: "Active Deals",
      value: "136",
      icon: MdWork,
      iconBg: "linear-gradient(135deg, #A7F3D0 0%, #10B981 100%)",
      iconColor: "#059669",
    },
    {
      title: "Closed Deals",
      value: "136",
      icon: MdWork,
      iconBg: "#EF4444",
      iconColor: "white",
    },
    {
      title: "Monthly Revenue",
      value: "45,000",
      icon: MdAttachMoney,
      iconBg: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)",
      iconColor: "#D97706",
    },
  ];
  {
    /* Iterates over the cards array to render each card dynamically
     */
  }
  return (
    <div className="row g-4 mb-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100 bg-white">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6
                      className="text-secondary mb-2"
                      style={{ fontSize: "0.9rem", fontWeight: "500" }}
                    >
                      {card.title}
                    </h6>
                    <h2
                      className="mb-0 fw-bold"
                      style={{ fontSize: "1.75rem" }}
                    >
                      {card.value}
                    </h2>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: card.iconBg,
                    }}
                  >
                    <Icon size={30} color={card.iconColor} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
