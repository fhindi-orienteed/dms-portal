import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { DataTableOne, DataTableTwo } from "../../components/tables/DataTables";

const DataTables = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Data Tables" />
      
      <div className="space-y-6">
        {/* Data Table 1 - Simple with Actions */}
        <ComponentCard
          title="Data Table 1"
          desc="Simple data table with action buttons and basic pagination"
        >
          <DataTableOne />
        </ComponentCard>

        {/* Data Table 2 - Advanced with Filters */}
        <ComponentCard
          title="Data Table 2"
          desc="Advanced data table with search, filters, sorting, and pagination"
        >
          <DataTableTwo />
        </ComponentCard>
      </div>
    </>
  );
};

export default DataTables; 