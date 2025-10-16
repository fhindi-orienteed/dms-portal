import { useState } from "react";
import { PageMeta } from "../../../components/common";
import PackageHeader from "./PackageHeader";
import PackageStats from "./PackageStats";
import PackageTabs from "./PackageTabs";
import OverviewTab from "./OverviewTab";
import TrackingTab from "./TrackingTab";
import SenderTab from "./SenderTab";
import RecipientTab from "./RecipientTab";
import DriverTab from "./DriverTab";
import { mockPackageData } from "./mockData";

export default function PackageDetails() {
  const [packageData] = useState(mockPackageData);
  const [activeTab, setActiveTab] = useState<"overview" | "tracking" | "sender" | "recipient" | "driver">("overview");

  return (
    <>
      <PageMeta
        title={`${packageData.packageId} | DMS Portal`}
        description={`Package details for ${packageData.packageId}`}
      />
    
      <PackageHeader />
      <PackageStats packageData={packageData} />

      <div className="mt-6">
        <PackageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === "overview" && <OverviewTab packageData={packageData} />}
          {activeTab === "tracking" && <TrackingTab packageData={packageData} />}
          {activeTab === "sender" && <SenderTab packageData={packageData} />}
          {activeTab === "recipient" && <RecipientTab packageData={packageData} />}
          {activeTab === "driver" && <DriverTab packageData={packageData} />}
        </div>
      </div>
    </>
  );
}
