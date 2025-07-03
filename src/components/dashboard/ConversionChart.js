
const ConversionChart = () => {
  const stages = [
    { name: "Contact", progress: 100, color: "bg-primary" },
    { name: "Qualified Lead", progress: 75, color: "bg-info" },
    { name: "Proposal Sent", progress: 60, color: "bg-warning" },
    { name: "Negotiation", progress: 45, color: "bg-primary" },
    { name: "Closed Won", progress: 30, color: "bg-success" },
    { name: "Closed Lost", progress: 15, color: "bg-danger" },
  ];

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-0 pb-0">
        <h5 className="card-title mb-0 fw-bold">Contact to Deal Conversion</h5>
      </div>
      <div className="card-body">
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-medium text-dark">{stage.name}</span>
              </div>
              {/*progress + progress-bar are used to render each stage’s bar
               */}
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className={`progress-bar ${stage.color}`}
                  style={{ width: `${stage.progress}%` }}
                  role="progressbar"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversionChart;
