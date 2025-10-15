export interface CustomerFollowUp {
  id: number;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  followUpType: "complaint" | "inquiry" | "feedback" | "issue";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "resolved" | "closed";
  subject: string;
  description: string;
  assignedTo: string;
  createdAt: string;
  lastUpdated: string;
  dueDate: string;
  resolution?: string;
}

export const mockCustomerFollowUps: CustomerFollowUp[] = [
  {
    id: 1,
    customerId: "CUST001",
    customerName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    followUpType: "complaint",
    priority: "high",
    status: "pending",
    subject: "Late Delivery Issue",
    description: "Package was delivered 2 days late, affecting business operations",
    assignedTo: "Customer Support Team",
    createdAt: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-15T10:30:00Z",
    dueDate: "2024-01-17T18:00:00Z"
  },
  {
    id: 2,
    customerId: "CUST002",
    customerName: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+1 (555) 987-6543",
    followUpType: "inquiry",
    priority: "medium",
    status: "in_progress",
    subject: "Bulk Shipping Rates",
    description: "Customer wants to know about discounted rates for bulk shipments",
    assignedTo: "Sales Team",
    createdAt: "2024-01-14T14:20:00Z",
    lastUpdated: "2024-01-15T09:15:00Z",
    dueDate: "2024-01-18T17:00:00Z"
  },
  {
    id: 3,
    customerId: "CUST003",
    customerName: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    followUpType: "feedback",
    priority: "low",
    status: "resolved",
    subject: "Excellent Service",
    description: "Customer praised the delivery driver for exceptional service",
    assignedTo: "Quality Team",
    createdAt: "2024-01-13T16:45:00Z",
    lastUpdated: "2024-01-14T11:30:00Z",
    dueDate: "2024-01-16T17:00:00Z",
    resolution: "Thank you note sent to customer and driver recognition given"
  },
  {
    id: 4,
    customerId: "CUST004",
    customerName: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 321-0987",
    followUpType: "issue",
    priority: "urgent",
    status: "in_progress",
    subject: "Package Damaged in Transit",
    description: "Fragile item arrived damaged, customer requesting immediate replacement",
    assignedTo: "Claims Team",
    createdAt: "2024-01-15T08:00:00Z",
    lastUpdated: "2024-01-15T15:20:00Z",
    dueDate: "2024-01-16T12:00:00Z"
  },
  {
    id: 5,
    customerId: "CUST005",
    customerName: "Lisa Brown",
    email: "lisa.brown@example.com",
    phone: "+1 (555) 654-3210",
    followUpType: "inquiry",
    priority: "medium",
    status: "pending",
    subject: "International Shipping",
    description: "Customer asking about shipping options to international destinations",
    assignedTo: "Customer Support Team",
    createdAt: "2024-01-15T11:15:00Z",
    lastUpdated: "2024-01-15T11:15:00Z",
    dueDate: "2024-01-17T17:00:00Z"
  }
];
