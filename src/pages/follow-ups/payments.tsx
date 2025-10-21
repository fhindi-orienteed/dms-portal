import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageBreadcrumb, PageMeta } from "../../components/common";
import PaymentFollowUpStats from "./payments/PaymentFollowUpStats";
import PaymentSearchControls from "./payments/PaymentSearchControls";
import PaymentFollowUpsTable from "./payments/PaymentFollowUpsTable";
import { mockPaymentFollowUps, PaymentFollowUp } from "./payments/mockData";

export default function PaymentFollowUps() {
  const [followUps] = useState<PaymentFollowUp[]>(mockPaymentFollowUps);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredFollowUps = useMemo(() => {
    return followUps.filter(followUp => 
      followUp.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [followUps, searchTerm]);

  const handleRowClick = (followUp: PaymentFollowUp) => {
    navigate(`/follow-ups/payments/${followUp.id}`);
  };

  const handleNewFollowUp = () => {
    // Handle new payment follow-up creation
    console.log("Create new payment follow-up");
  };

  return (
    <>
      <PageMeta 
        title={`Payment Follow-ups | DMS Portal`} 
        description={`Payment follow-ups management - DMS Portal`}
      />
      <PageBreadcrumb pageTitle="Payment Follow-ups" />

      <div className="space-y-6">
        <PaymentFollowUpStats followUps={followUps} />
        
        <PaymentSearchControls 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewFollowUp={handleNewFollowUp}
        />

        <PaymentFollowUpsTable 
          followUps={filteredFollowUps}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
