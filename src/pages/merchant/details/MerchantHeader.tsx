import { PageBreadcrumb } from "../../../components/common";


export default function MerchantHeader() {
  

  return (
    <div className="mb-6">
      <PageBreadcrumb 
        pageTitle="Ali Ahmad"
        subtitle="Registration No: REG-20394"
        pageLink="/merchant/list"
        pageLinkText="Merchants"
      />

    </div>
  );
}