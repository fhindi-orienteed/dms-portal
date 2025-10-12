export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  totalOrders: number;
  totalSpent: string;
  status: "Active" | "Inactive" | "Blacklisted";
  joinDate: string;
}

