
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
          paddingTop: "90px",
        }}
      >
        <div className="container-fluid px-4">
          <SummaryCards />

          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <ConversionChart />
            </div>
            <div className="col-lg-6">
              <SalesReport />
            </div>
          </div>

          <div className="mb-4">
            <TeamPerformance />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
