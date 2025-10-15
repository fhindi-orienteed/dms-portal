import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageBreadcrumb, PageMeta } from "../../components/common";
import ReturnsFollowUpStats from "./returns/ReturnsFollowUpStats";
import ReturnsSearchControls from "./returns/ReturnsSearchControls";
import ReturnsFollowUpsTable from "./returns/ReturnsFollowUpsTable";
import { mockReturnsFollowUps, ReturnsFollowUp } from "./returns/mockData";

export default function ReturnsFollowUps() {
  const [followUps] = useState<ReturnsFollowUp[]>(mockReturnsFollowUps);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredFollowUps = useMemo(() => {
    return followUps.filter(followUp => 
      followUp.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.returnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.originalOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [followUps, searchTerm]);

  const handleRowClick = (followUp: ReturnsFollowUp) => {
    navigate(`/follow-ups/returns/${followUp.id}`);
  };

  const handleNewFollowUp = () => {
    // Handle new return follow-up creation
    console.log("Create new return follow-up");
  };

  return (
    <>
      <PageMeta 
        title={`Returns Follow-ups | DMS Portal`} 
        description={`Returns follow-ups management - DMS Portal`}
      />
      <PageBreadcrumb pageTitle="Returns Follow-ups" />

      <div className="space-y-6">
        <ReturnsFollowUpStats followUps={followUps} />
        
        <ReturnsSearchControls 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewFollowUp={handleNewFollowUp}
        />

        <ReturnsFollowUpsTable 
          followUps={filteredFollowUps}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
