import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Customer } from "../../types/customer";
import { SearchIcon, UserCircleIcon } from "../../icons"; 
import { PageBreadcrumb, PageMeta } from "../../components/common";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";

const blacklistedCustomers: Customer[] = [
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
  },
  {
    id: 12,
    name: "Khalid Saeed",
    phone: "+970 59 678 9012",
    email: "khalid.saeed@example.com",
    city: "Jenin",
    totalOrders: 8,
    totalSpent: "$420",
    status: "Blacklisted",
    joinDate: "10/01/2024"
  },
  {
    id: 23,
    name: "Noor Ahmad",
    phone: "+970 59 789 0123",
    email: "noor.ahmad@example.com",
    city: "Nablus",
    totalOrders: 3,
    totalSpent: "$150",
    status: "Blacklisted",
    joinDate: "18/03/2024"
  }
];

export default function BlacklistCustomers() {
  const [customers] = useState<Customer[]>(blacklistedCustomers);
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

  const columns = [
    {
      header: "Customer Name",
      accessor: (customer: Customer) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <UserCircleIcon className="size-5 text-red-600 dark:text-red-400" />
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
        <Badge color="error">
          {customer.status}
        </Badge>
      )
    },
    {
      header: "Blacklisted Since",
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
        title="Blacklisted Customers | DMS Portal" 
        description="Blacklisted Customers - DMS Portal"
      />
      <PageBreadcrumb pageTitle="Blacklisted Customers" />
      
      <div className="space-y-6">
        {/* Search Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10" />
              <Input
                placeholder="Search blacklisted customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {customers.length} Blacklisted Customers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <GenericDataTable
          data={filteredCustomers}
          columns={columns}
          itemsPerPage={10}
          showPagination={true}
          emptyMessage="No blacklisted customers found."
          onRowClick={(customer) => navigate(`/customers/details/${customer.id}`)}
        />
      </div>
    </>
  );
}

