import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Customer } from "../../types/customer";
import { SearchIcon, UserCircleIcon } from "../../icons"; 
import { PageBreadcrumb, PageMeta } from "../../components/common";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";

const customerList: Customer[] = [
  {
    id: 1,
    name: "Ahmed Hassan",
    phone: "+970 59 123 4567",
    email: "ahmed.hassan@example.com",
    city: "Ramallah",
    totalOrders: 45,
    totalSpent: "$2,340",
    status: "Active",
    joinDate: "15/01/2024"
  },
  {
    id: 2,
    name: "Sara Mohammed",
    phone: "+970 59 234 5678",
    email: "sara.mohammed@example.com",
    city: "Nablus",
    totalOrders: 32,
    totalSpent: "$1,890",
    status: "Active",
    joinDate: "20/01/2024"
  },
  {
    id: 3,
    name: "Mohammed Ali",
    phone: "+970 59 345 6789",
    email: "mohammed.ali@example.com",
    city: "Jenin",
    totalOrders: 18,
    totalSpent: "$950",
    status: "Inactive",
    joinDate: "05/02/2024"
  },
  {
    id: 4,
    name: "Fatima Ibrahim",
    phone: "+970 59 456 7890",
    email: "fatima.ibrahim@example.com",
    city: "Hebron",
    totalOrders: 67,
    totalSpent: "$4,120",
    status: "Active",
    joinDate: "10/12/2023"
  },
  {
    id: 5,
    name: "Omar Khaled",
    phone: "+970 59 567 8901",
    email: "omar.khaled@example.com",
    city: "Bethlehem",
    totalOrders: 5,
    totalSpent: "$250",
    status: "Blacklisted",
    joinDate: "25/02/2024"
  }
];

export default function CustomersList() {
  const [customers] = useState<Customer[]>(customerList);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [customers, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "warning";
      case "Blacklisted":
        return "error";
      default:
        return "light";
    }
  };

  const columns = [
    {
      header: "Customer Name",
      accessor: (customer: Customer) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <UserCircleIcon className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
            {customer.name}
          </span>
        </div>
      )
    },
    {
      header: "Phone",
      accessor: (customer: Customer) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {customer.phone}
        </span>
      )
    },
    {
      header: "Email",
      accessor: (customer: Customer) => (
        <span className="text-gray-600 dark:text-gray-400 text-theme-sm">
          {customer.email}
        </span>
      )
    },
    {
      header: "City",
      accessor: (customer: Customer) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {customer.city}
        </span>
      )
    },
    {
      header: "Total Orders",
      accessor: (customer: Customer) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {customer.totalOrders}
        </span>
      )
    },
    {
      header: "Total Spent",
      accessor: (customer: Customer) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {customer.totalSpent}
        </span>
      )
    },
    {
      header: "Status",
      accessor: (customer: Customer) => (
        <Badge color={getStatusColor(customer.status)}>
          {customer.status}
        </Badge>
      )
    },
    {
      header: "Join Date",
      accessor: (customer: Customer) => (
        <span className="text-gray-500 text-theme-sm dark:text-gray-400">
          {customer.joinDate}
        </span>
      )
    }
  ];

  return (
    <>
      <PageMeta 
        title="All Customers | DMS Portal" 
        description="All Customers - DMS Portal"
      />
      <PageBreadcrumb pageTitle="All Customers" />
      
      <div className="space-y-6">
        {/* Search Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <GenericDataTable
          data={filteredCustomers}
          columns={columns}
          itemsPerPage={10}
          showPagination={true}
          emptyMessage="No customers found."
          onRowClick={(customer) => navigate(`/customers/details/${customer.id}`)}
        />
      </div>
    </>
  );
}

