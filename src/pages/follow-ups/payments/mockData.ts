export interface PaymentFollowUp {
  id: number;
  paymentId: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  followUpType: "payment_due" | "payment_failed" | "refund_request" | "billing_dispute" | "payment_verification";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "resolved" | "closed";
  subject: string;
  description: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  dueDate: string;
  assignedTo: string;
  createdAt: string;
  lastUpdated: string;
  resolution?: string;
  transactionId?: string;
}

export const mockPaymentFollowUps: PaymentFollowUp[] = [
  {
    id: 1,
    paymentId: "PAY001",
    customerId: "CUST001",
    customerName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    followUpType: "payment_failed",
    priority: "high",
    status: "pending",
    subject: "Credit Card Payment Failed",
    description: "Customer's credit card payment was declined due to insufficient funds",
    amount: 125.50,
    currency: "USD",
    paymentMethod: "Credit Card",
    dueDate: "2024-01-17T18:00:00Z",
    assignedTo: "Payment Support Team",
    createdAt: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-15T10:30:00Z",
    transactionId: "TXN123456789"
  },
  {
    id: 2,
    paymentId: "PAY002",
    customerId: "CUST002",
    customerName: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+1 (555) 987-6543",
    followUpType: "refund_request",
    priority: "medium",
    status: "in_progress",
    subject: "Refund for Canceled Service",
    description: "Customer requesting refund for service that was canceled within 24 hours",
    amount: 89.99,
    currency: "USD",
    paymentMethod: "PayPal",
    dueDate: "2024-01-20T17:00:00Z",
    assignedTo: "Finance Team",
    createdAt: "2024-01-14T14:20:00Z",
    lastUpdated: "2024-01-15T09:15:00Z",
    transactionId: "TXN987654321"
  },
  {
    id: 3,
    paymentId: "PAY003",
    customerId: "CUST003",
    customerName: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    followUpType: "billing_dispute",
    priority: "urgent",
    status: "in_progress",
    subject: "Billing Dispute - Overcharge",
    description: "Customer disputes charge showing $150 instead of agreed $75",
    amount: 150.00,
    currency: "USD",
    paymentMethod: "Bank Transfer",
    dueDate: "2024-01-16T12:00:00Z",
    assignedTo: "Billing Team",
    createdAt: "2024-01-15T08:00:00Z",
    lastUpdated: "2024-01-15T15:20:00Z",
    transactionId: "TXN456789123"
  },
  {
    id: 4,
    paymentId: "PAY004",
    customerId: "CUST004",
    customerName: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 321-0987",
    followUpType: "payment_due",
    priority: "medium",
    status: "pending",
    subject: "Overdue Payment Reminder",
    description: "Customer has an overdue payment of $200 from last month's service",
    amount: 200.00,
    currency: "USD",
    paymentMethod: "Credit Card",
    dueDate: "2024-01-18T17:00:00Z",
    assignedTo: "Collections Team",
    createdAt: "2024-01-15T11:15:00Z",
    lastUpdated: "2024-01-15T11:15:00Z",
    transactionId: "TXN789123456"
  },
  {
    id: 5,
    paymentId: "PAY005",
    customerId: "CUST005",
    customerName: "Lisa Brown",
    email: "lisa.brown@example.com",
    phone: "+1 (555) 654-3210",
    followUpType: "payment_verification",
    priority: "low",
    status: "resolved",
    subject: "Payment Verification Required",
    description: "Customer needs to verify payment method for future transactions",
    amount: 45.00,
    currency: "USD",
    paymentMethod: "Debit Card",
    dueDate: "2024-01-19T17:00:00Z",
    assignedTo: "Verification Team",
    createdAt: "2024-01-13T16:45:00Z",
    lastUpdated: "2024-01-14T11:30:00Z",
    resolution: "Payment method verified successfully via phone call",
    transactionId: "TXN321654987"
  },
  {
    id: 6,
    paymentId: "PAY006",
    customerId: "CUST006",
    customerName: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+1 (555) 789-0123",
    followUpType: "refund_request",
    priority: "high",
    status: "pending",
    subject: "Refund for Damaged Goods",
    description: "Customer requesting full refund for package damaged during delivery",
    amount: 75.25,
    currency: "USD",
    paymentMethod: "Credit Card",
    dueDate: "2024-01-17T15:00:00Z",
    assignedTo: "Claims Team",
    createdAt: "2024-01-15T13:45:00Z",
    lastUpdated: "2024-01-15T13:45:00Z",
    transactionId: "TXN654987321"
  }
];
