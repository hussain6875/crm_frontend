import TopBar from "../navigation/TopBar";
import SideBar from "../navigation/SideBar";

export default function PageWrapper({ children }) {
  return (
    <>
      <TopBar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SideBar />
        <main
          className="bg-light min-vh-100 flex-grow-1"
          style={{
            marginLeft: "90px",
            paddingTop: "90px",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
