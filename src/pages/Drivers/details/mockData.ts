export interface DriverDetails {
  id: number;
  driverName: string;
  driverId: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastActive: string;
  licenseNumber: string;
  licenseExpiry: string;
  vehicleType: string;
  vehicleNumber: string;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  successRate: number;
  averageDeliveryTime: string;
  customerRating: number;
  totalEarnings: string;
  monthlyEarnings: string;
  weeklyDeliveries: number;
  monthlyDeliveries: number;
  onTimeDeliveries: number;
  lateDeliveries: number;
  customerComplaints: number;
  customerPraise: number;
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
  notes: string;
}

export const mockDriverData: DriverDetails = {
  id: 1,
  driverName: "Ahmed Hassan",
  driverId: "DRV001",
  email: "ahmed.hassan@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street, Apt 4B",
  city: "New York",
  region: "Downtown",
  status: "active",
  joinDate: "2023-01-15",
  lastActive: "2024-01-15 14:30",
  licenseNumber: "DL123456789",
  licenseExpiry: "2025-06-15",
  vehicleType: "Van",
  vehicleNumber: "NY-ABC-123",
  totalDeliveries: 245,
  successfulDeliveries: 238,
  failedDeliveries: 7,
  successRate: 97.1,
  averageDeliveryTime: "28 min",
  customerRating: 4.8,
  totalEarnings: "$2,450",
  monthlyEarnings: "$450",
  weeklyDeliveries: 12,
  monthlyDeliveries: 48,
  onTimeDeliveries: 220,
  lateDeliveries: 18,
  customerComplaints: 2,
  customerPraise: 15,
  emergencyContacts: [
    {
      name: "Fatima Hassan",
      relationship: "Wife",
      phone: "+1 (555) 987-6543"
    },
    {
      name: "Mohamed Hassan",
      relationship: "Brother",
      phone: "+1 (555) 456-7890"
    }
  ],
  notes: "Excellent driver with great customer service skills. Always punctual and professional."
};
