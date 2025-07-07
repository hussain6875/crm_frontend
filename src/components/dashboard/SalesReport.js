import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SalesReport = () => {
  const data = [
    { month: "Jan", primary: 3000, secondary: 4000, total: 3500 },
    { month: "Feb", primary: 1500, secondary: 5000, total: 4200 },
    { month: "Mar", primary: 2200, secondary: 3000, total: 1500 },
    { month: "Apr", primary: 3000, secondary: 3000, total: 6000 },
    { month: "May", primary: 1000, secondary: 4500, total: 4000 },
    { month: "Jun", primary: 1000, secondary: 2500, total: 1800 },
    { month: "Jul", primary: 1500, secondary: 2500, total: 6000 },
    { month: "Aug", primary: 2000, secondary: 4500, total: 4000 },
    { month: "Sep", primary: 4000, secondary: 4000, total: 4800 },
    { month: "Oct", primary: 3000, secondary: 3000, total: 3500 },
    { month: "Nov", primary: 3500, secondary: 4000, total: 3900 },
    { month: "Dec", primary: 3000, secondary: 4000, total: 5000 },
  ];

  const maxValue = 10000;
  const chartHeight = 350;
  const yAxisValues = [10000, 5000, 1000, 500, 200, 0];

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
      `;
      style.setAttribute("data-saleschart-tooltip", "true");
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      className="card shadow-sm h-100"
      style={{ width: "1000px", marginLeft: "-340px" }}
    >
      {/* Header */}
      <div
        className="card-header bg-white border-0 d-flex justify-content-between align-items-center"
        style={{ marginTop: "20px" }}
      >
        <h5 className="mb-0 fw-bold text-dark">Sales Reports</h5>
        <select
          className="form-select form-select-sm"
          style={{ width: "120px" }}
        >
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Chart */}
      <div className="card-body pt-3">
        <div
          className="d-flex"
          style={{ height: chartHeight, marginTop: "30px" }}
        >
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
            {data.map((item) => {
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
                      style={{
                        height: `${secondaryHeight}px`,
                        width: "24px",
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
                      style={{
                        height: `${primaryHeight}px`,
                        width: "24px",
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
