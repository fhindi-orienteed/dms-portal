import { useState } from "react";
import { PageMeta } from "../../../components/common";
import MerchantHeader from "./MerchantHeader";
import MerchantStats from "./MerchantStats";
import MerchantTabs from "./MerchantTabs";
import OverviewTab from "./OverviewTab";
import PackagesTab from "./PackagesTab";
import BranchesTab from "./BranchesTab";
import UsersTab from "./UsersTab";
import { mockMerchantData } from "./mockData.ts";

export default function MerchantDetails() {
  const [merchant, setMerchant] = useState(mockMerchantData);
  const [activeTab, setActiveTab] = useState<"overview" | "packages" | "branches" | "users">("overview");

  const handleAddUser = (user: any) => {
    const newUser = { id: merchant.users.length + 1, ...user };
    setMerchant((prev: any) => ({
      ...prev,
      users: [...prev.users, newUser],
      userCount: prev.userCount + 1
    }));
  };

  const handleAddBranch = (branch: any) => {
    const newBranch = { id: merchant.branches.length + 1, ...branch };
    setMerchant((prev: any) => ({
      ...prev,
      branches: [...prev.branches, newBranch],
      branchCount: prev.branchCount + 1
    }));
  };

  return (
    <>
      <PageMeta 
        title={`${merchant.merchantName} | DMS Portal`} 
        description={`Merchant details for ${merchant.merchantName}`}
      />

      <MerchantHeader />
      <MerchantStats merchant={merchant} />

      <div className="mt-6">
        <MerchantTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === "overview" && <OverviewTab merchant={merchant} />}
          {activeTab === "packages" && <PackagesTab packages={merchant.recentPackages} />}
          {activeTab === "branches" && <BranchesTab branches={merchant.branches} onAddBranch={handleAddBranch} />}
          {activeTab === "users" && <UsersTab users={merchant.users} onAddUser={handleAddUser} />}
        </div>
      </div>
    </>
  );
}

