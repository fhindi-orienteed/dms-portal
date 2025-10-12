import Tabs, { Tab } from "../../../components/ui/tabs";

interface CustomerTabsProps {
  activeTab: string;
  setActiveTab: (tab: "overview" | "orders" | "addresses" | "activity") => void;
}

export default function CustomerTabs({ activeTab, setActiveTab }: CustomerTabsProps) {
  const tabs: Tab[] = [
    { id: "overview", label: "Overview" },
    { id: "orders", label: "Order History" },
    { id: "addresses", label: "Addresses" },
    { id: "activity", label: "Activity Log" }
  ];

  return <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} />;
}

