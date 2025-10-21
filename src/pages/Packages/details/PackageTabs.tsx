import Tabs, { Tab } from "../../../components/ui/tabs";

interface PackageTabsProps {
  activeTab: string;
  setActiveTab: (tab: "overview" | "tracking" | "sender" | "recipient" | "driver") => void;
}

export default function PackageTabs({ activeTab, setActiveTab }: PackageTabsProps) {
  const tabs: Tab[] = [
    { id: "overview", label: "Overview" },
    { id: "tracking", label: "Tracking" },
    { id: "sender", label: "Sender" },
    { id: "recipient", label: "Recipient" },
    { id: "driver", label: "Driver" }
  ];

  return <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} />;
}
