import PageWrapper from "../components/layout/PageWrapper";
import PageHeader from "../components/ui/PageHeader";
import SearchAndPagination from "../components/ui/SearchAndPagination";
import Filters from "../components/deals/Filters"
import DealsTable from "../components/deals/DealsTable"
import { useState } from "react";
const Deals = () => {
   const [selectedOwner,setSelectedOwner]=useState("");
  const [selectedStage,setSelectedStage]=useState("");
  const [createdDate,setCreatedDate]=useState("");
  const [closedDate,setClosedDate]=useState("");
  return (
    <>
      <PageWrapper>
        <PageHeader title="Deals" />
       <SearchAndPagination />
        <div
             className="bg-white d-flex flex-column"
             style={{
               width: "95%",
               paddingLeft:"20px",
               marginLeft: "20px",
               marginRight: "10px",
               marginTop: "20px",
               paddingRight:"20px",
               paddingBottom:"20px"
              
             }}
           >
            <Filters 
       selectedOwner={selectedOwner}
       setSelectedOwner={setSelectedOwner}
       selectedStage={selectedStage}
       setSelectedStage={setSelectedStage}
       createdDate={createdDate}
       setCreatedDate={setCreatedDate}
       closedDate={closedDate}
       setClosedDate={setClosedDate}
       />
            <DealsTable />
           </div>


      </PageWrapper>
    </>
  );
};
export default Deals;
