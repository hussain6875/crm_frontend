import PageWrapper from "../components/layout/PageWrapper";
import PageHeader from "../components/ui/PageHeader";
import SearchAndPagination from "../components/ui/SearchAndPagination";
import Filters from "../components/deals/Filters"
import DealsTable from "../components/deals/DealsTable"
import CreateDeal from '../components/deals/CreateDeal'
import { useState } from "react";
const Deals = () => {
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [closedDate, setClosedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [filteredCount, setFilteredCount] = useState(0);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const openModal=()=>setShowModal(true);
  const closeModal = ()=>setShowModal(false);
  return (
    <>
      <PageWrapper>
        <PageHeader title="Deals" onCreateClick={openModal} />
        <SearchAndPagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages} />
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
            <DealsTable 
  selectedOwner={selectedOwner}
  selectedStage={selectedStage}
  createdDate={createdDate}
  closedDate={closedDate}
  activePage={activePage}
  pageSize={pageSize}
  onFilteredCount={setFilteredCount}
/>
            </div>
             <CreateDeal isOpen={showModal} onClose={closeModal} />


      </PageWrapper>
    </>
  );
};
export default Deals;
