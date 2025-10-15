import Tabs, { Tab } from "../../../components/ui/tabs";

interface DriverTabsProps {
  activeTab: string;
  setActiveTab: (tab: "overview" | "performance" | "deliveries" | "vehicle" | "contacts") => void;
}

export default function DriverTabs({ activeTab, setActiveTab }: DriverTabsProps) {
  const tabs: Tab[] = [
    { id: "overview", label: "Overview" },
    { id: "performance", label: "Performance" },
    { id: "deliveries", label: "Deliveries" },
    { id: "vehicle", label: "Vehicle" },
    { id: "contacts", label: "Emergency Contacts" }
  ];

  return <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} />;
}
