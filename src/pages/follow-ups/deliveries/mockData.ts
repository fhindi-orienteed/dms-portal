export interface DeliveryFollowUp {
  id: number;
  deliveryId: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  followUpType: "delivery_delay" | "failed_delivery" | "damage_report" | "delivery_confirmation" | "route_issue";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "resolved" | "closed";
  subject: string;
  description: string;
  packageType: string;
  deliveryAddress: string;
  driverName: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  assignedTo: string;
  createdAt: string;
  lastUpdated: string;
  dueDate: string;
  resolution?: string;
  trackingNumber: string;
}

export const mockDeliveryFollowUps: DeliveryFollowUp[] = [
  {
    id: 1,
    deliveryId: "DEL001",
    customerId: "CUST001",
    customerName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    followUpType: "delivery_delay",
    priority: "high",
    status: "pending",
    subject: "Package Delivery Delayed",
    description: "Package was scheduled for delivery yesterday but hasn't arrived yet",
    packageType: "Electronics",
    deliveryAddress: "123 Main St, New York, NY 10001",
    driverName: "John Smith",
    estimatedDelivery: "2024-01-15T17:00:00Z",
    assignedTo: "Delivery Support Team",
    createdAt: "2024-01-16T10:30:00Z",
    lastUpdated: "2024-01-16T10:30:00Z",
    dueDate: "2024-01-17T18:00:00Z",
    trackingNumber: "TRK123456789"
  },
  {
    id: 2,
    deliveryId: "DEL002",
    customerId: "CUST002",
    customerName: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+1 (555) 987-6543",
    followUpType: "failed_delivery",
    priority: "medium",
    status: "in_progress",
    subject: "Failed Delivery Attempt",
    description: "Driver attempted delivery but customer was not available",
    packageType: "Clothing",
    deliveryAddress: "456 Oak Ave, Los Angeles, CA 90210",
    driverName: "Jane Doe",
    estimatedDelivery: "2024-01-15T14:00:00Z",
    assignedTo: "Delivery Operations",
    createdAt: "2024-01-15T16:20:00Z",
    lastUpdated: "2024-01-16T09:15:00Z",
    dueDate: "2024-01-18T17:00:00Z",
    trackingNumber: "TRK987654321"
  },
  {
    id: 3,
    deliveryId: "DEL003",
    customerId: "CUST003",
    customerName: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    followUpType: "damage_report",
    priority: "urgent",
    status: "in_progress",
    subject: "Package Damaged During Delivery",
    description: "Customer reports package arrived damaged with visible signs of mishandling",
    packageType: "Fragile Items",
    deliveryAddress: "789 Pine St, Chicago, IL 60601",
    driverName: "Bob Wilson",
    estimatedDelivery: "2024-01-14T15:00:00Z",
    actualDelivery: "2024-01-14T15:30:00Z",
    assignedTo: "Claims Team",
    createdAt: "2024-01-14T16:45:00Z",
    lastUpdated: "2024-01-16T11:30:00Z",
    dueDate: "2024-01-17T12:00:00Z",
    trackingNumber: "TRK456789123"
  },
  {
    id: 4,
    deliveryId: "DEL004",
    customerId: "CUST004",
    customerName: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 321-0987",
    followUpType: "delivery_confirmation",
    priority: "low",
    status: "resolved",
    subject: "Delivery Confirmation Required",
    description: "Customer needs to confirm delivery receipt for insurance purposes",
    packageType: "Documents",
    deliveryAddress: "321 Elm St, Miami, FL 33101",
    driverName: "Alice Brown",
    estimatedDelivery: "2024-01-13T11:00:00Z",
    actualDelivery: "2024-01-13T11:15:00Z",
    assignedTo: "Customer Service",
    createdAt: "2024-01-13T12:00:00Z",
    lastUpdated: "2024-01-14T11:30:00Z",
    dueDate: "2024-01-16T17:00:00Z",
    resolution: "Customer confirmed delivery via email",
    trackingNumber: "TRK789123456"
  },
  {
    id: 5,
    deliveryId: "DEL005",
    customerId: "CUST005",
    customerName: "Lisa Brown",
    email: "lisa.brown@example.com",
    phone: "+1 (555) 654-3210",
    followUpType: "route_issue",
    priority: "medium",
    status: "pending",
    subject: "Delivery Route Access Issue",
    description: "Driver reports difficulty accessing delivery location due to road construction",
    packageType: "Furniture",
    deliveryAddress: "654 Cedar Rd, Seattle, WA 98101",
    driverName: "Charlie Green",
    estimatedDelivery: "2024-01-16T16:00:00Z",
    assignedTo: "Route Planning Team",
    createdAt: "2024-01-16T08:00:00Z",
    lastUpdated: "2024-01-16T08:00:00Z",
    dueDate: "2024-01-18T17:00:00Z",
    trackingNumber: "TRK321654987"
  },
  {
    id: 6,
    deliveryId: "DEL006",
    customerId: "CUST006",
    customerName: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+1 (555) 789-0123",
    followUpType: "failed_delivery",
    priority: "high",
    status: "pending",
    subject: "Multiple Failed Delivery Attempts",
    description: "Package has failed delivery 3 times, customer requesting alternative delivery method",
    packageType: "Electronics",
    deliveryAddress: "987 Maple Dr, Boston, MA 02101",
    driverName: "Diana White",
    estimatedDelivery: "2024-01-14T13:00:00Z",
    assignedTo: "Delivery Management",
    createdAt: "2024-01-15T13:45:00Z",
    lastUpdated: "2024-01-16T13:45:00Z",
    dueDate: "2024-01-17T15:00:00Z",
    trackingNumber: "TRK654987321"
  }
];
