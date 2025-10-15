import { useState } from "react";
import { PageMeta } from "../../../components/common";
import DriverHeader from "./DriverHeader";
import DriverStats from "./DriverStats";
import DriverTabs from "./DriverTabs";
import OverviewTab from "./OverviewTab";
import PerformanceTab from "./PerformanceTab";
import DeliveriesTab from "./DeliveriesTab";
import VehicleTab from "./VehicleTab";
import ContactsTab from "./ContactsTab";
import { mockDriverData } from "./mockData";

export default function DriverDetails() {
  const [driver] = useState(mockDriverData);
  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "deliveries" | "vehicle" | "contacts">("overview");

  return (
    <>
      <PageMeta 
        title={`${driver.driverName} | DMS Portal`} 
        description={`Driver details for ${driver.driverName}`}
      />

      <DriverHeader />
      <DriverStats driver={driver} />

      <div className="mt-6">
        <DriverTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === "overview" && <OverviewTab driver={driver} />}
          {activeTab === "performance" && <PerformanceTab driver={driver} />}
          {activeTab === "deliveries" && <DeliveriesTab driver={driver} />}
          {activeTab === "vehicle" && <VehicleTab driver={driver} />}
          {activeTab === "contacts" && <ContactsTab driver={driver} />}
        </div>
      </div>
    </>
  );
}
