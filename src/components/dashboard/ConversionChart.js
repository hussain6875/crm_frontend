import "bootstrap/dist/css/bootstrap.min.css";

const ConversionChart = () => {
  const stages = [
    { name: "Contact", progress: 65, customColor: "#6b4fca" },
    { name: "Qualified Lead", progress: 35, color: "bg-info" },
    { name: "Proposal Sent", progress: 80, color: "bg-warning" },
    { name: "Negotiation", progress: 90, customColor: "#807cba" },
    { name: "Closed Won", progress: 46, customColor: "#2ce054" },
    { name: "Closed Lost", progress: 30, color: "bg-danger" },
  ];

  return (
    <div className="card border-0 shadow-sm h-100 w-100">
      <div className="card-header bg-white border-0 pb-0">
        <h6 className="card-title mb-0 fw-bold">Contact to Deal Conversion</h6>
      </div>
      <div className="card-body">
        {stages.map((stage, index) => (
          <div key={index} className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-medium text-dark">{stage.name}</span>
            </div>
            <div className="progress" style={{ height: "8px" }}>
              <div
                className={`progress-bar ${stage.color || ""}`}
                style={{
                  width: `${stage.progress}%`,
                  backgroundColor: stage.customColor || undefined,
                }}
                role="progressbar"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionChart;
