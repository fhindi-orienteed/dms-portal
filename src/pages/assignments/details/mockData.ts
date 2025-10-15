export interface AssignmentDetails {
  id: number;
  assignmentId: string;
  driver: {
    id: string;
    name: string;
    phone: string;
    email: string;
    status: "active" | "inactive" | "suspended";
  };
  package: {
    id: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    packageType: string;
    weight: string;
    dimensions: string;
    value: string;
    fragile: boolean;
    requiresSignature: boolean;
  };
  locations: {
    pickup: {
      address: string;
      city: string;
      region: string;
      contactPerson: string;
      contactPhone: string;
      instructions: string;
    };
    delivery: {
      address: string;
      city: string;
      region: string;
      contactPerson: string;
      contactPhone: string;
      instructions: string;
    };
  };
  timing: {
    assignedDate: string;
    scheduledDate: string;
    estimatedDeliveryTime: string;
    actualDeliveryTime?: string;
    pickupTime?: string;
  };
  status: "pending" | "in_progress" | "completed" | "cancelled" | "failed";
  priority: "low" | "medium" | "high" | "urgent";
  notes: string;
  trackingHistory: {
    timestamp: string;
    status: string;
    location: string;
    notes: string;
  }[];
  payment: {
    driverEarnings: string;
    customerCharges: string;
    deliveryFee: string;
    tip?: string;
  };
}

export const mockAssignmentData: AssignmentDetails = {
  id: 1,
  assignmentId: "ASG001",
  driver: {
    id: "DRV001",
    name: "Ahmed Hassan",
    phone: "+1 (555) 123-4567",
    email: "ahmed.hassan@example.com",
    status: "active"
  },
  package: {
    id: "PKG12345",
    customerName: "Sarah Johnson",
    customerPhone: "+1 (555) 987-6543",
    customerEmail: "sarah.johnson@example.com",
    packageType: "Electronics",
    weight: "2.5 kg",
    dimensions: "30x20x15 cm",
    value: "$299.99",
    fragile: true,
    requiresSignature: true
  },
  locations: {
    pickup: {
      address: "123 Main Street, Suite 100",
      city: "New York",
      region: "Downtown",
      contactPerson: "John Warehouse",
      contactPhone: "+1 (555) 111-2222",
      instructions: "Package is in the loading dock. Show ID and sign pickup form."
    },
    delivery: {
      address: "456 Oak Avenue, Apartment 4B",
      city: "Brooklyn",
      region: "Residential",
      contactPerson: "Sarah Johnson",
      contactPhone: "+1 (555) 987-6543",
      instructions: "Ring doorbell. If no answer, call customer. Package requires signature."
    }
  },
  timing: {
    assignedDate: "2024-01-15T09:00:00Z",
    scheduledDate: "2024-01-15T14:00:00Z",
    estimatedDeliveryTime: "30 min",
    actualDeliveryTime: "2024-01-15T14:25:00Z",
    pickupTime: "2024-01-15T13:45:00Z"
  },
  status: "completed",
  priority: "high",
  notes: "Fragile package - handle with care. Customer prefers evening delivery but accepted afternoon delivery.",
  trackingHistory: [
    {
      timestamp: "2024-01-15T09:00:00Z",
      status: "Assigned",
      location: "Dispatch Center",
      notes: "Assignment created and assigned to driver"
    },
    {
      timestamp: "2024-01-15T13:45:00Z",
      status: "Picked Up",
      location: "123 Main Street, Suite 100",
      notes: "Package picked up successfully from warehouse"
    },
    {
      timestamp: "2024-01-15T14:20:00Z",
      status: "In Transit",
      location: "En route to delivery location",
      notes: "Driver en route to delivery address"
    },
    {
      timestamp: "2024-01-15T14:25:00Z",
      status: "Delivered",
      location: "456 Oak Avenue, Apartment 4B",
      notes: "Package delivered successfully. Customer signature obtained."
    }
  ],
  payment: {
    driverEarnings: "$15.50",
    customerCharges: "$25.00",
    deliveryFee: "$20.00",
    tip: "$5.00"
  }
};
