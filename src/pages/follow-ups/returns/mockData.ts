export interface ReturnsFollowUp {
  id: number;
  returnId: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  followUpType: "return_request" | "return_processing" | "refund_processing" | "return_pickup" | "return_verification";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "resolved" | "closed";
  subject: string;
  description: string;
  originalOrderId: string;
  returnReason: string;
  returnAmount: number;
  currency: string;
  itemCondition: string;
  returnAddress: string;
  assignedTo: string;
  createdAt: string;
  lastUpdated: string;
  dueDate: string;
  resolution?: string;
  trackingNumber?: string;
  refundStatus?: string;
}

export const mockReturnsFollowUps: ReturnsFollowUp[] = [
  {
    id: 1,
    returnId: "RET001",
    customerId: "CUST001",
    customerName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    followUpType: "return_request",
    priority: "medium",
    status: "pending",
    subject: "Product Return Request",
    description: "Customer wants to return item due to size issue, requesting size exchange",
    originalOrderId: "ORD123456",
    returnReason: "Wrong Size",
    returnAmount: 89.99,
    currency: "USD",
    itemCondition: "New with tags",
    returnAddress: "123 Main St, New York, NY 10001",
    assignedTo: "Returns Processing Team",
    createdAt: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-15T10:30:00Z",
    dueDate: "2024-01-18T17:00:00Z",
    refundStatus: "pending"
  },
  {
    id: 2,
    returnId: "RET002",
    customerId: "CUST002",
    customerName: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+1 (555) 987-6543",
    followUpType: "return_processing",
    priority: "high",
    status: "in_progress",
    subject: "Return Processing Delayed",
    description: "Return package received but processing is delayed due to item verification",
    originalOrderId: "ORD789012",
    returnReason: "Defective Product",
    returnAmount: 149.50,
    currency: "USD",
    itemCondition: "Defective",
    returnAddress: "456 Oak Ave, Los Angeles, CA 90210",
    assignedTo: "Quality Control Team",
    createdAt: "2024-01-14T14:20:00Z",
    lastUpdated: "2024-01-16T09:15:00Z",
    dueDate: "2024-01-17T18:00:00Z",
    trackingNumber: "TRK987654321",
    refundStatus: "processing"
  },
  {
    id: 3,
    returnId: "RET003",
    customerId: "CUST003",
    customerName: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    followUpType: "refund_processing",
    priority: "urgent",
    status: "in_progress",
    subject: "Refund Processing Issue",
    description: "Refund was processed but customer hasn't received the amount in their account",
    originalOrderId: "ORD345678",
    returnReason: "Not as described",
    returnAmount: 75.25,
    currency: "USD",
    itemCondition: "Used",
    returnAddress: "789 Pine St, Chicago, IL 60601",
    assignedTo: "Finance Team",
    createdAt: "2024-01-15T08:00:00Z",
    lastUpdated: "2024-01-16T15:20:00Z",
    dueDate: "2024-01-17T12:00:00Z",
    trackingNumber: "TRK456789123",
    refundStatus: "failed"
  },
  {
    id: 4,
    returnId: "RET004",
    customerId: "CUST004",
    customerName: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 321-0987",
    followUpType: "return_pickup",
    priority: "medium",
    status: "pending",
    subject: "Return Pickup Scheduled",
    description: "Customer scheduled return pickup but driver hasn't arrived yet",
    originalOrderId: "ORD901234",
    returnReason: "Changed mind",
    returnAmount: 45.00,
    currency: "USD",
    itemCondition: "New with tags",
    returnAddress: "321 Elm St, Miami, FL 33101",
    assignedTo: "Pickup Team",
    createdAt: "2024-01-16T11:15:00Z",
    lastUpdated: "2024-01-16T11:15:00Z",
    dueDate: "2024-01-17T17:00:00Z",
    refundStatus: "pending"
  },
  {
    id: 5,
    returnId: "RET005",
    customerId: "CUST005",
    customerName: "Lisa Brown",
    email: "lisa.brown@example.com",
    phone: "+1 (555) 654-3210",
    followUpType: "return_verification",
    priority: "low",
    status: "resolved",
    subject: "Return Verification Complete",
    description: "Return items verified and approved for full refund",
    originalOrderId: "ORD567890",
    returnReason: "Wrong item received",
    returnAmount: 120.00,
    currency: "USD",
    itemCondition: "New with tags",
    returnAddress: "654 Cedar Rd, Seattle, WA 98101",
    assignedTo: "Verification Team",
    createdAt: "2024-01-13T16:45:00Z",
    lastUpdated: "2024-01-14T11:30:00Z",
    dueDate: "2024-01-16T17:00:00Z",
    resolution: "Return verified and refund processed successfully",
    trackingNumber: "TRK321654987",
    refundStatus: "completed"
  },
  {
    id: 6,
    returnId: "RET006",
    customerId: "CUST006",
    customerName: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+1 (555) 789-0123",
    followUpType: "return_request",
    priority: "high",
    status: "pending",
    subject: "Bulk Return Request",
    description: "Customer requesting return of 5 items from bulk order, citing quality issues",
    originalOrderId: "ORD234567",
    returnReason: "Quality issues",
    returnAmount: 350.75,
    currency: "USD",
    itemCondition: "Used - quality issues",
    returnAddress: "987 Maple Dr, Boston, MA 02101",
    assignedTo: "Returns Management",
    createdAt: "2024-01-15T13:45:00Z",
    lastUpdated: "2024-01-16T13:45:00Z",
    dueDate: "2024-01-18T15:00:00Z",
    refundStatus: "pending"
  }
];
