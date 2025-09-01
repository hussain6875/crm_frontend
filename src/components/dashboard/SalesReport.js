import { useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SalesReport = () => {
  const {deals} = useSelector((state)=>state.deals);
  const {user} = useSelector((state)=>state.auth);
  const dealsArray = deals?.data || deals || [];


 
  // Calculate monthly revenue for each month
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthlyData = months.map((month, idx) => {
    // Sum amounts for deals closed as 'Closed Won' in this month
    const total = dealsArray
      .filter(
        (deal) =>
          deal.stage === "Closed Won" &&
          deal.closeDate &&
          new Date(deal.closeDate).getMonth() === idx
      )
      .reduce((sum, deal) => sum + (parseFloat(deal.amount) || 0), 0);

    return {
      month,
      total,
      // You can add primary/secondary if you want to show more bars
      primary: total,
      secondary: 0,
    };
  });



  const maxValue = Math.max(...monthlyData.map(item => item.primary), 10000);
  const chartHeight = 500;
  const yAxisValues = [60000, 50000, 40000, 30000, 20000, 10000];

  const formatCurrency = (value) => `$${value.toLocaleString()}`;

  useEffect(() => {
    if (!document.head.querySelector("[data-saleschart-tooltip]")) {
      const style = document.createElement("style");
      style.innerHTML = `
        .bar-with-tooltip {
          position: relative;
        }
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

        .sales-card {
          width: 100%;
          margin: 0;
        }

        @media (max-width: 768px) {
          .bar-inner {
            width: 14px !important;
          }
        }

        @media (max-width: 576px) {
          .bar-inner {
            width: 10px !important;
          }
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
        <select className="form-select form-select-sm w-auto">
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
            className="d-flex flex-column align-items-end pe-8 justify-content-between"
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
            {monthlyData.map((item) => {
              const primaryHeight = (item.primary / maxValue) * chartHeight;
              const secondaryHeight = (item.secondary / maxValue) * chartHeight;

              return (
                <div
                  key={item.month}
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
                  <small className="text-muted mt-2">{item.month}</small>
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
