
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
{
  /* recharts: For rendering the bar chart
   */
}
const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 3500 },
  { name: "Jun", revenue: 4000 },
  { name: "Jul", revenue: 3000 },
  { name: "Aug", revenue: 4500 },
  { name: "Sep", revenue: 6000 },
  { name: "Oct", revenue: 5000 },
  { name: "Nov", revenue: 5500 },
  { name: "Dec", revenue: 5200 },
];

const SalesReport = () => {
  const [selectedMonth, setSelectedMonth] = useState("Monthly");

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0 fw-bold">Sales Reports</h5>
        {/* Dropdown for selecting month */}
        <select
          className="form-select form-select-sm w-auto"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="Monthly">Monthly</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
          <option value="May">May</option>
          <option value="Jun">June</option>
          <option value="Jul">July</option>
          <option value="Aug">August</option>
          <option value="Sep">September</option>
          <option value="Oct">October</option>
          <option value="Nov">November</option>
          <option value="Dec">December</option>
        </select>
      </div>

      <div className="card-body">
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                contentStyle={{
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(99,102,241,1)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  fontSize: "0.85rem",
                }}
                itemStyle={{ color: "#333" }}
                labelStyle={{ color: "#6B7280", fontSize: "0.75rem" }}
              />
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#645CFF" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6360FF" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <Bar
                dataKey="revenue"
                fill="url(#revenueGradient)"
                radius={[8, 8, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
