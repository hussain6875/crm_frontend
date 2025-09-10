import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { DEAL_STAGES } from "../../constants/dealStages";
import { stageColors } from "../../constants/dealStages";

const ConversionChart = () => {
  const { deals } = useSelector((state) => state.deals);
  const { users } = useSelector((state) => state.users);
  //extracting deals
  const dealsArray = deals?.data || deals || [];

  //extracting users
  const usersArray = users?.data || users || [];
  
   // Show loading if deals or users is not loaded
  if (!usersArray || !dealsArray.length) {
    return <div>Loading Conversion Chart...</div>;
  }

  // Count of deals at each stage for all the users
  const stageCounts = DEAL_STAGES.map((stage) =>
    dealsArray.filter((deal) => deal.stage === stage.value).length

  );

  // progress = (deals at this stage) / (deals at first stage) * 100
  const firstStageCount = dealsArray.length || 1; // avoid division by zero

  const stages = DEAL_STAGES.map((stage, idx) => ({
    name: stage.label,
    progress: Math.round((stageCounts[idx] / firstStageCount) * 100),
    customColor: stageColors?.[stage.label]?.startsWith("#") ? stageColors[stage.label] : undefined,
    color: stageColors?.[stage.label]?.startsWith("bg-") ? stageColors[stage.label] : undefined,
  }));

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
