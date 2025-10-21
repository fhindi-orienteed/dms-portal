export interface PackageDetails {
  id: string;
  packageId: string;
  trackingNumber: string;
  status: "pending" | "in_transit" | "delivered" | "failed" | "returned";
  priority: "low" | "medium" | "high" | "urgent";
  packageType: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  value: number;
  currency: string;
  description: string;
  sender: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    country: string;
  };
  recipient: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    country: string;
  };
  driver?: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  estimatedDelivery: string;
  actualDelivery?: string;
  pickupDate: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  insurance: boolean;
  signatureRequired: boolean;
  fragile: boolean;
  deliveryInstructions?: string;
  trackingHistory: TrackingEvent[];
}

export interface TrackingEvent {
  id: string;
  timestamp: string;
  status: string;
  location: string;
  description: string;
  notes?: string;
}

export const mockPackageData: PackageDetails = {
  id: "PKG001",
  packageId: "PKG-2024-001234",
  trackingNumber: "TRK123456789",
  status: "in_transit",
  priority: "high",
  packageType: "Electronics",
  weight: 2.5,
  dimensions: {
    length: 30,
    width: 20,
    height: 15
  },
  value: 899.99,
  currency: "USD",
  description: "Gaming laptop with accessories",
  sender: {
    name: "TechStore Inc.",
    email: "orders@techstore.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave",
    city: "New York",
    region: "NY",
    country: "USA"
  },
  recipient: {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Residential St",
    city: "Los Angeles",
    region: "CA",
    country: "USA"
  },
  driver: {
    id: "DRV001",
    name: "Mike Johnson",
    phone: "+1 (555) 456-7890",
    email: "mike.johnson@dms.com"
  },
  estimatedDelivery: "2024-01-18T17:00:00Z",
  pickupDate: "2024-01-15T10:30:00Z",
  createdAt: "2024-01-15T09:00:00Z",
  updatedAt: "2024-01-16T14:20:00Z",
  notes: "Handle with care - contains fragile electronics",
  insurance: true,
  signatureRequired: true,
  fragile: true,
  deliveryInstructions: "Leave at front door if no answer. Do not leave in direct sunlight.",
  trackingHistory: [
    {
      id: "EVT001",
      timestamp: "2024-01-15T09:00:00Z",
      status: "Package Created",
      location: "TechStore Inc., New York, NY",
      description: "Package created and ready for pickup"
    },
    {
      id: "EVT002",
      timestamp: "2024-01-15T10:30:00Z",
      status: "Picked Up",
      location: "TechStore Inc., New York, NY",
      description: "Package picked up by driver Mike Johnson"
    },
    {
      id: "EVT003",
      timestamp: "2024-01-15T14:20:00Z",
      status: "In Transit",
      location: "Distribution Center, Newark, NJ",
      description: "Package arrived at distribution center"
    },
    {
      id: "EVT004",
      timestamp: "2024-01-16T08:15:00Z",
      status: "Out for Delivery",
      location: "Los Angeles, CA",
      description: "Package out for delivery in Los Angeles area"
    },
    {
      id: "EVT005",
      timestamp: "2024-01-16T14:20:00Z",
      status: "Delivery Attempt",
      location: "456 Residential St, Los Angeles, CA",
      description: "Delivery attempted - recipient not available"
    }
  ]
};
