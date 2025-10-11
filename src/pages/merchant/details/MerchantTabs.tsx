import Tabs, { Tab } from "../../../components/ui/tabs";

interface MerchantTabsProps {
  activeTab: string;
  setActiveTab: (tab: "overview" | "packages" | "branches" | "users") => void;
}

export default function MerchantTabs({ activeTab, setActiveTab }: MerchantTabsProps) {
  const tabs: Tab[] = [
    { id: "overview", label: "Overview" },
    { id: "packages", label: "Recent Packages" },
    { id: "branches", label: "Branches" },
    { id: "users", label: "Users" }
  ];

  return <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} />;
}
