import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageBreadcrumb, PageMeta } from "../../components/common";
import DeliveryFollowUpStats from "./deliveries/DeliveryFollowUpStats";
import DeliverySearchControls from "./deliveries/DeliverySearchControls";
import DeliveryFollowUpsTable from "./deliveries/DeliveryFollowUpsTable";
import { mockDeliveryFollowUps, DeliveryFollowUp } from "./deliveries/mockData";

export default function DeliveryFollowUps() {
  const [followUps] = useState<DeliveryFollowUp[]>(mockDeliveryFollowUps);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredFollowUps = useMemo(() => {
    return followUps.filter(followUp => 
      followUp.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.deliveryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [followUps, searchTerm]);

  const handleRowClick = (followUp: DeliveryFollowUp) => {
    navigate(`/follow-ups/deliveries/${followUp.id}`);
  };

  const handleNewFollowUp = () => {
    // Handle new delivery follow-up creation
    console.log("Create new delivery follow-up");
  };

  return (
    <>
      <PageMeta 
        title={`Delivery Follow-ups | DMS Portal`} 
        description={`Delivery follow-ups management - DMS Portal`}
      />
      <PageBreadcrumb pageTitle="Delivery Follow-ups" />

      <div className="space-y-6">
        <DeliveryFollowUpStats followUps={followUps} />
        
        <DeliverySearchControls 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewFollowUp={handleNewFollowUp}
        />

        <DeliveryFollowUpsTable 
          followUps={filteredFollowUps}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
