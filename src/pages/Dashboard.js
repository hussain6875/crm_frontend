import TopBar from "../components/navigation/TopBar";
import SideBar from "../components/navigation/SideBar";
import SummaryCards from "../components/dashboard/SummaryCards";
import ConversionChart from "../components/dashboard/ConversionChart";
import SalesReport from "../components/dashboard/SalesReport";
import TeamPerformance from "../components/dashboard/TeamPerformance";

const Dashboard = () => {
  return (
    <>
      <TopBar />
      <SideBar />

      <div
        className="bg-light min-vh-100"
        style={{
          marginLeft: "110px",
          paddingTop: "100px",
        }}
      >
        <div className="container-fluid px-4">
          {/* Summary Cards */}
          <SummaryCards />

          {/* Charts Section */}
          <div className="row g-4 mb-4">
            {/* Conversion Chart: 1/3 on xl screens, full width below */}
            <div className="col-12 col-xl-4 mb-4">
              <ConversionChart />
            </div>

            {/* Sales Report: 2/3 on xl screens, full width below */}
            <div className="col-12 col-xl-8 mb-4">
              <SalesReport />
            </div>
          </div>

          {/* Team Performance Table */}
          <div className="mb-4">
            <TeamPerformance />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
