import PageWrapper from "../components/layout/PageWrapper";
import PageHeader from "../components/ui/PageHeader";
import SearchAndPagination from "../components/ui/SearchAndPagination";
import Filters from "../components/companies/Filters";
const Companies = () => {
  return (
    <>
      <PageWrapper>
        <PageHeader title="Companies" />
       <SearchAndPagination />
       <Filters />
      </PageWrapper>
    </>
  );
}
export default Companies;