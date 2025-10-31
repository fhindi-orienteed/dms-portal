import { useTranslation } from "react-i18next";
import Tabs, { Tab } from "../../../components/ui/tabs";

interface MerchantTabsProps {
  activeTab: string;
  setActiveTab: (tab: "overview" | "packages" | "branches" | "users") => void;
}

export default function MerchantTabs({ activeTab, setActiveTab }: MerchantTabsProps) {
  const { t } = useTranslation();

  const tabs: Tab[] = [
    { id: "overview", label: t("merchants.tabs.overview") },
    { id: "packages", label: t("merchants.tabs.recentPackages") },
    { id: "branches", label: t("merchants.tabs.branches") },
    { id: "users", label: t("merchants.tabs.users") }
  ];

  return <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} />;
}
