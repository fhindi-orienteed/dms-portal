import { PageBreadcrumb } from "../../../components/common";

export default function PackageHeader() {
  return (
    <div className="mb-6">
      <PageBreadcrumb pageTitle="Package Details" pageLink="/packages" pageLinkText="Packages" />
    </div>
  );
}
