// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockMerchantData: any = {
  id: 1,
  merchantName: "Ali Ahmad",
  mainAddress: "Jenin",
  createdDate: "20/3/2025",
  branchCount: 3,
  userCount: 7,
  status: "Delivered",
  totalPackage: 17,
  email: "ali.ahmad@example.com",
  phone: "+970 59 123 4567",
  description: "Leading logistics provider in Jenin region",
  recentPackages: [
    {
      id: 1,
      trackingNumber: "PKG-2024-001",
      recipient: "Ahmed Hassan",
      destination: "Jenin",
      status: "Delivered",
      date: "2024-01-10"
    },
    {
      id: 2,
      trackingNumber: "PKG-2024-002",
      recipient: "Sara Mohammed",
      destination: "Nablus",
      status: "In Transit",
      date: "2024-01-09"
    },
  ],
  branches: [
    { id: 1, name: "Jenin Main Branch", address: "Main Street, Jenin", manager: "Mohammed Ali" },
    { id: 2, name: "Jenin North Branch", address: "North District, Jenin", manager: "Fatima Hassan" },
    { id: 3, name: "Nablus Branch", address: "City Center, Nablus", manager: "Omar Ibrahim" },
  ],
  users: [
    { id: 1, name: "Ahmed Ali", role: "Admin", email: "ahmed@example.com", status: "Active" },
    { id: 2, name: "Sara Hassan", role: "User", email: "sara@example.com", status: "Active" },
    { id: 3, name: "Mohammed Omar", role: "User", email: "mohammed@example.com", status: "Active" },
  ]
};

