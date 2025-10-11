import { PageBreadcrumb } from "../../../components/common";

export default function MerchantHeader() {

  return (
    <div className="mb-6">
      <PageBreadcrumb pageTitle="Merchant Details" pageLink="/merchant/list" pageLinkText="Merchants" />
    </div>
  );
}
