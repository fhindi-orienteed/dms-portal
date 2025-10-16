import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Package } from "../../types/packages";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import { BoxIcon } from "../../icons";
import { getStatusColor } from "../../utils/packageUtils";
import FilterDropdown, { FilterOption } from "../../components/common/FilterDropdown";
import { useFilterManager, useFilters } from "../../hooks/useFilters";
import Input from "../../components/form/input/InputField";
const mockPackages: Package[] = [
  {
    id: 4,
    trackingNumber: "PKG001234570",
    recipient: {
      name: "Layla Mansour",
      email: "layla.mansour@email.com",
      phone: "+970 59 777 8888",
      address: "Jenin City Center",
      city: "Jenin",
      country: "Palestine",
    },
    sender: {
      name: "HealthPlus Pharmacy",
      email: "orders@healthplus.ps",
      phone: "+970 4 234 5678",
    },
    packageDetails: {
      description: "Medical Supplies - Prescription Package",
      weight: "0.8 kg",
      dimensions: "25x15x10 cm",
      value: "₪180 NIS",
      category: "Medical",
    },
    status: "Failed Delivery",
    timeline: [
      {
        status: "Failed Delivery",
        location: "Jenin City Center",
        timestamp: "2024-01-15T16:00:00Z",
        description: "Recipient not available - delivery attempt failed",
      },
      {
        status: "In Transit",
        location: "Jenin Distribution Center",
        timestamp: "2024-01-15T12:00:00Z",
        description: "Out for delivery",
      },
      {
        status: "Pending",
        location: "HealthPlus Pharmacy",
        timestamp: "2024-01-14T14:00:00Z",
        description: "Package picked up",
      },
    ],
    shippingInfo: {
      service: "Express Delivery",
      carrier: "PalPost Express",
      estimatedDelivery: "2024-01-15",
    },
    createdAt: "2024-01-14T14:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
  },
];

export default function FailedDeliveryPackages() {
  const [packages] = useState<Package[]>(mockPackages);
  const navigate = useNavigate();
  const { filters, searchTerm, clearAllFilters, updateSearchTerm, handleFilterChange, removeFilter } = useFilterManager();

  const handleRowClick = (packageData: Package) => {
    navigate(`/packages/${packageData.id}`);
  };

  const availableFilters: FilterOption[] = [
    {
      key: "shippingInfo.carrier",
      label: "Carrier",
      value: "shippingInfo.carrier",
      options: [
        { value: "PalPost Express", label: "PalPost Express" },
        { value: "PalPost Standard", label: "PalPost Standard" },
        { value: "PalPost Economy", label: "PalPost Economy" },
      ],
    },
    {
      key: "recipient.city",
      label: "City",
      value: "recipient.city",
      options: [
        { value: "Ramallah", label: "Ramallah" },
        { value: "Nablus", label: "Nablus" },
        { value: "Hebron", label: "Hebron" },
        { value: "Jenin", label: "Jenin" },
        { value: "Bethlehem", label: "Bethlehem" },
      ],
    },
  ];

  const filteredPackages = useFilters({
    data: packages,
    filters,
    searchTerm,
    searchFields: ["trackingNumber", "recipient"] as (keyof Package)[],
  });

  const columns = [
    {
      header: "Tracking Number",
      accessor: (pkg: Package) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <BoxIcon className="size-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {pkg.trackingNumber}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {pkg.packageDetails.category}
            </p>
          </div>
        </div>
      )
    },
    {
      header: "Recipient",
      accessor: (pkg: Package) => (
        <div>
          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
            {pkg.recipient.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {pkg.recipient.city}
          </p>
        </div>
      )
    },
    {
      header: "Package Details",
      accessor: (pkg: Package) => (
        <div>
          <p className="text-gray-800 text-theme-sm dark:text-white/90">
            {pkg.packageDetails.description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {pkg.packageDetails.weight} • {pkg.packageDetails.value}
          </p>
        </div>
      )
    },
    {
      header: "Carrier",
      accessor: (pkg: Package) => (
        <div>
          <p className="text-gray-800 text-theme-sm dark:text-white/90">
            {pkg.shippingInfo.carrier}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {pkg.shippingInfo.service}
          </p>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (pkg: Package) => (
        <Badge color={getStatusColor(pkg.status)}>
          {pkg.status}
        </Badge>
      )
    },
    {
      header: "Failed Date",
      accessor: (pkg: Package) => (
        <span className="text-gray-500 text-theme-sm dark:text-gray-400">
          {new Date(pkg.updatedAt).toLocaleDateString("en-GB")}
        </span>
      )
    },
  ];

  return (
    <>
      <PageMeta
        title="Failed Delivery Packages | DMS Portal"
        description="Failed Delivery Packages Dashboard"
      />
      <PageBreadcrumb pageTitle="Failed Delivery Packages" />
      
      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => updateSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-shrink-0">
              <FilterDropdown
                filters={availableFilters}
                activeFilters={filters}
                onFilterChange={handleFilterChange}
                onRemoveFilter={removeFilter}
                onClearAll={clearAllFilters}
                placeholder="Add filter"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <GenericDataTable
          data={filteredPackages}
          columns={columns}
          itemsPerPage={10}
          showPagination={true}
          emptyMessage="No failed delivery packages found."
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
