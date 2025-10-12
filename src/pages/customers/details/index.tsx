import { useState } from "react";
import { PageMeta } from "../../../components/common";
import CustomerHeader from "./CustomerHeader";
import CustomerStats from "./CustomerStats";
import CustomerTabs from "./CustomerTabs";
import OverviewTab from "./OverviewTab";
import OrdersTab from "./OrdersTab";
import AddressesTab from "./AddressesTab";
import ActivityTab from "./ActivityTab";
import { mockCustomerData } from "./mockData";

export default function CustomerDetails() {
  const [customer] = useState(mockCustomerData);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "activity">("overview");

  return (
    <>
      <PageMeta 
        title={`${customer.name} | DMS Portal`} 
        description={`Customer details for ${customer.name}`}
      />

      <CustomerHeader />
      <CustomerStats customer={customer} />

      <div className="mt-6">
        <CustomerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === "overview" && <OverviewTab customer={customer} />}
          {activeTab === "orders" && <OrdersTab orders={customer.orders} />}
          {activeTab === "addresses" && <AddressesTab addresses={customer.addresses} />}
          {activeTab === "activity" && <ActivityTab activities={customer.activityLog} />}
        </div>
      </div>
    </>
  );
}

