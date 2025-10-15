import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageBreadcrumb, PageMeta } from "../../components/common";
import FollowUpStats from "./customers/FollowUpStats";
import SearchControls from "./customers/SearchControls";
import FollowUpsTable from "./customers/FollowUpsTable";
import { mockCustomerFollowUps, CustomerFollowUp } from "./customers/mockData";


export default function CustomerFollowUps() {
  const [followUps] = useState<CustomerFollowUp[]>(mockCustomerFollowUps);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredFollowUps = useMemo(() => {
    return followUps.filter(followUp => 
      followUp.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [followUps, searchTerm]);

  const handleRowClick = (followUp: CustomerFollowUp) => {
    navigate(`/follow-ups/customers/${followUp.id}`);
  };

  const handleNewFollowUp = () => {
    // Handle new follow-up creation
    console.log("Create new follow-up");
  };

  return (
    <>
      <PageMeta 
        title={`Customer Follow-ups | DMS Portal`} 
        description={`Customer follow-ups management - DMS Portal`}
      />
      <PageBreadcrumb pageTitle="Customer Follow-ups" />

      <div className="space-y-6">
        <FollowUpStats followUps={followUps} />
        
        <SearchControls 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewFollowUp={handleNewFollowUp}
        />

        <FollowUpsTable 
          followUps={filteredFollowUps}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
