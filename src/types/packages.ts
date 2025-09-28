export interface Package {
  id: number;
  trackingNumber: string;
  recipient: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  sender: {
    name: string;
    email: string;
    phone: string;
  };
  packageDetails: {
    description: string;
    weight: string;
    dimensions: string;
    value: string;
    category: string;
  };
  status: "Pending" | "In Transit" | "Delivered" | "Failed Delivery";
  timeline: {
    status: string;
    location: string;
    timestamp: string;
    description: string;
  }[];
  shippingInfo: {
    service: string;
    carrier: string;
    estimatedDelivery: string;
    actualDelivery?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PackageFilters {
  status?: string;
  carrier?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  searchTerm?: string;
}
