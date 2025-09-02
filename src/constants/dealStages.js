export const DEAL_STAGES = [

  { value: "appointment Scheduled", label: "Appointment Scheduled" }, 
   { value: "Contract Sent", label: "Contract Sent" },
  { value: "Closed Won", label: "Closed Won" },
  { value: "Closed Lost ", label: "Closed Lost" },
  { value: "Decision Maker Bought In", label: "Decision Maker Bought In" },
  {value:"Negotiation",label:"Negotiation"},
    { value: "Presentation Scheduled", label: "Presentation Scheduled" },
  { value: "Qualified to Buy", label: "Qualified to Buy" } 
];

export const stageColors = {
  "appointment Scheduled": "#6b4fca",
  "Qualified to Buy": "bg-info",
  "Contract Sent": "bg-warning",
  "Negotiation": "#807cba",
  "Closed Won": "#2ce054",
  "Closed Lost": "bg-danger",
  "Presentation Scheduled":"bg-info"
};