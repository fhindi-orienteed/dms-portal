import { PageBreadcrumb } from "../../../components/common";

export default function CustomerHeader() {

  return (
      <div className="mb-6">
          <PageBreadcrumb pageTitle="Customer Details" pageLink="/customers/list" pageLinkText="Customers" />
      </div>
  );
}

