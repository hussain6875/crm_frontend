import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SalesReport = () => {
  const { deals } = useSelector((state) => state.deals);
  const { user } = useSelector((state) => state.auth);
  const dealsArray = deals?.data || deals || [];

  // Dropdown state
  const [view, setView] = useState("Monthly");

  // Filter deals for the current user
  const userDeals = user
    ? dealsArray.filter(
        (deal) =>
          deal.owner?.userId === user.userId ||
          deal.dealOwner === user.userId
      )
    : dealsArray;

  // Months for labels
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // --- Data Generators ---
  const getMonthlyData = () =>
    months.map((month, idx) => {
      const total = userDeals
        .filter(
          (deal) =>
            deal.stage === "Closed Won" &&
            deal.closeDate &&
            new Date(deal.closeDate).getMonth() === idx
        )
        .reduce((sum, deal) => sum + (parseFloat(deal.amount) || 0), 0);

      return { label: month, total, primary: total, secondary: 0 };
    });

  const getQuarterlyData = () => {
    const quarters = ["Q1", "Q2", "Q3", "Q4"];
    return quarters.map((q, idx) => {
      const total = userDeals
        .filter(
          (deal) =>
            deal.stage === "Closed Won" &&
            deal.closeDate &&
            Math.floor(new Date(deal.closeDate).getMonth() / 3) === idx
        )
        .reduce((sum, deal) => sum + (parseFloat(deal.amount) || 0), 0);

      return { label: q, total, primary: total, secondary: 0 };
    });
  };

  const getYearlyData = () => {
    const total = userDeals
      .filter((deal) => deal.stage === "Closed Won" && deal.closeDate)
      .reduce((sum, deal) => sum + (parseFloat(deal.amount) || 0), 0);

    return [{ label: new Date().getFullYear(), total, primary: total, secondary: 0 }];
  };

  // Compute chart data based on dropdown
  const chartData =
    view === "Monthly"
      ? getMonthlyData()
      : view === "Quarterly"
      ? getQuarterlyData()
      : getYearlyData();

  // Chart scaling
  const maxValue = Math.max(...chartData.map((item) => item.primary), 10000);
  const chartHeight = 500;
  const yAxisValues = [10000, 5000, 1000, 500, 200, 0];

  const formatCurrency = (value) => `$${value.toLocaleString()}`;

  // Tooltip + responsive bar styling
  useEffect(() => {
    if (!document.head.querySelector("[data-saleschart-tooltip]")) {
      const style = document.createElement("style");
      style.innerHTML = `
        .bar-with-tooltip { position: relative; }
        .bar-with-tooltip .custom-tooltip {
          visibility: hidden;
          opacity: 0;
          min-width: 60px;
          background: #333;
          color: #fff;
          text-align: center;
          border-radius: 4px;
          padding: 4px 8px;
          position: absolute;
          left: 50%;
          top: -35px;
          transform: translateX(-50%);
          z-index: 10;
          font-size: 12px;
          transition: opacity 0.2s;
          pointer-events: none;
          white-space: nowrap;
        }
        .bar-with-tooltip:hover .custom-tooltip {
          visibility: visible;
          opacity: 1;
        }
        .sales-card { width: 100%; margin: 0; }
        @media (max-width: 768px) {
          .bar-inner { width: 14px !important; }
        }
        @media (max-width: 576px) {
          .bar-inner { width: 10px !important; }
        }
      `;
      style.setAttribute("data-saleschart-tooltip", "true");
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="card shadow-sm h-100 sales-card">
      {/* Header */}
      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center mt-3">
        <h5 className="mb-0 fw-bold text-dark">Sales Reports</h5>
        <select
          className="form-select form-select-sm w-auto"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Chart */}
      <div className="card-body pt-3">
        <div className="d-flex" style={{ height: chartHeight }}>
          {/* Y-axis */}
          <div
            className="d-flex flex-column align-items-end pe-2 justify-content-between"
            style={{ width: "60px" }}
          >
            {yAxisValues.map((val) => (
              <div
                key={val}
                style={{
                  height: `${chartHeight / (yAxisValues.length - 1)}px`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <small className="text-muted text-end w-100 d-block">
                  ${val}
                </small>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="flex-grow-1 d-flex align-items-end justify-content-between ps-2">
            {chartData.map((item) => {
              const primaryHeight = (item.primary / maxValue) * chartHeight;
              const secondaryHeight = (item.secondary / maxValue) * chartHeight;

              return (
                <div
                  key={item.label}
                  className="d-flex flex-column align-items-center"
                  style={{ flex: 1, minWidth: 0 }}
                >
                  <div
                    className="position-relative bar-with-tooltip d-flex justify-content-center"
                    style={{ height: chartHeight, width: "100%" }}
                  >
                    {/* Secondary bar */}
                    <div
                      className="bar-inner"
                      style={{
                        height: `${secondaryHeight}px`,
                        width: "18px",
                        borderRadius: "6px",
                        background: "linear-gradient(to top, #EDE9FE, #DDD6FE)",
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1,
                      }}
                    />
                    {/* Primary bar */}
                    <div
                      className="bar-inner"
                      style={{
                        height: `${primaryHeight}px`,
                        width: "18px",
                        borderRadius: "6px",
                        background: "linear-gradient(to top, #7b61ff, #e0d7ff)",
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 2,
                      }}
                    />
                    <div className="custom-tooltip">
                      {formatCurrency(item.total)}
                    </div>
                  </div>
                  <small className="text-muted mt-2">{item.label}</small>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;

