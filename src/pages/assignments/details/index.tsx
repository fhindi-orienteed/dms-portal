import { useState } from "react";
import { PageMeta } from "../../../components/common";
import AssignmentHeader from "./AssignmentHeader";
import AssignmentStats from "./AssignmentStats";
import AssignmentTabs from "./AssignmentTabs";
import OverviewTab from "./OverviewTab";
import PackageTab from "./PackageTab";
import LocationsTab from "./LocationsTab";
import TrackingTab from "./TrackingTab";
import PaymentTab from "./PaymentTab";
import { mockAssignmentData } from "./mockData";

export default function AssignmentDetails() {
  const [assignment] = useState(mockAssignmentData);
  const [activeTab, setActiveTab] = useState<"overview" | "package" | "locations" | "tracking" | "payment">("overview");

  return (
    <>
      <PageMeta 
        title={`Assignment ${assignment.assignmentId} | DMS Portal`} 
        description={`Assignment details for ${assignment.assignmentId}`}
      />

      <AssignmentHeader />
      <AssignmentStats assignment={assignment} />

      <div className="mt-6">
        <AssignmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === "overview" && <OverviewTab assignment={assignment} />}
          {activeTab === "package" && <PackageTab assignment={assignment} />}
          {activeTab === "locations" && <LocationsTab assignment={assignment} />}
          {activeTab === "tracking" && <TrackingTab assignment={assignment} />}
          {activeTab === "payment" && <PaymentTab assignment={assignment} />}
        </div>
      </div>
    </>
  );
}
