import { useState } from "react";
import { PageMeta } from "../../../components/common";
import MerchantHeader from "./MerchantHeader";
import MerchantStats from "./MerchantStats";
import BranchesTab from "./BranchesTab";
import UsersTab from "./UsersTab";
import { mockMerchantData } from "./mockData.ts";
import PriceListTab from "./PriceListTab"; 
export default function MerchantDetails() {
  const [merchant, setMerchant] = useState(mockMerchantData);
  

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
     
        
        <div className="mt-6">
        <div className="mb-6">
        <BranchesTab branches={merchant.branches} onAddBranch={handleAddBranch} />
        </div>
        <div className="mb-6">
         <UsersTab users={merchant.users} onAddUser={handleAddUser} />
         </div>
         <div className="mb-6">
         <PriceListTab
  prices={merchant.priceList || []} // fallback لو undefined
  onAddPrice={(price) =>
    setMerchant((prev: any) => ({
      ...prev,
      priceList: [...(prev.priceList || []), price],
    }))
  }
/>
</div>
         
        </div>
       
      </div>
    </>
  );
}

