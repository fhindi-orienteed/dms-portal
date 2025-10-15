import Tabs, { Tab } from "../../../components/ui/tabs";

interface AssignmentTabsProps {
  activeTab: string;
  setActiveTab: (tab: "overview" | "package" | "locations" | "tracking" | "payment") => void;
}

export default function AssignmentTabs({ activeTab, setActiveTab }: AssignmentTabsProps) {
  const tabs: Tab[] = [
    { id: "overview", label: "Overview" },
    { id: "package", label: "Package Details" },
    { id: "locations", label: "Locations" },
    { id: "tracking", label: "Tracking History" },
    { id: "payment", label: "Payment" }
  ];

  return <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} />;
}
