// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockCustomerData: any = {
  id: 1,
  name: "Ahmed Hassan",
  phone: "+970 59 123 4567",
  email: "ahmed.hassan@example.com",
  city: "Ramallah",
  address: "Al-Masyoun, Main Street, Building 15",
  totalOrders: 45,
  totalSpent: "$2,340",
  status: "Active",
  joinDate: "15/01/2024",
  orders: [
    {
      id: 1,
      trackingNumber: "PKG-2024-101",
      status: "Delivered",
      amount: "$120",
      date: "2024-03-10",
      items: 3
    },
    {
      id: 2,
      trackingNumber: "PKG-2024-102",
      status: "In Transit",
      amount: "$85",
      date: "2024-03-09",
      items: 2
    },
    {
      id: 3,
      trackingNumber: "PKG-2024-103",
      status: "Delivered",
      amount: "$200",
      date: "2024-03-05",
      items: 5
    }
  ],
  addresses: [
    { id: 1, type: "Home", address: "Al-Masyoun, Main Street, Building 15, Ramallah", isDefault: true },
    { id: 2, type: "Work", address: "City Center, Office Tower 3, Floor 5, Ramallah", isDefault: false },
    { id: 3, type: "Other", address: "North District, Building 22, Nablus", isDefault: false }
  ],
  activityLog: [
    { id: 1, action: "Order Placed", description: "New order PKG-2024-102", date: "2024-03-09 10:30 AM" },
    { id: 2, action: "Order Delivered", description: "Package PKG-2024-101 delivered successfully", date: "2024-03-10 02:15 PM" },
    { id: 3, action: "Profile Updated", description: "Updated contact information", date: "2024-03-08 11:00 AM" },
    { id: 4, action: "Order Placed", description: "New order PKG-2024-103", date: "2024-03-05 09:20 AM" }
  ]
};

