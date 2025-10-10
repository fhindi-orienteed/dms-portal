import { useState } from "react";
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
    id: 3,
    trackingNumber: "PKG001234569",
    recipient: {
      name: "Omar Khalil",
      email: "omar.khalil@email.com",
      phone: "+970 59 555 1234",
      address: "Hebron Industrial Zone",
      city: "Hebron",
      country: "Palestine"
    },
    sender: {
      name: "BookWorld Bethlehem",
      email: "orders@bookworld.ps",
      phone: "+970 2 276 5432"
    },
    packageDetails: {
      description: "Educational Books Set - 12 Books",
      weight: "3.5 kg",
      dimensions: "40x30x20 cm",
      value: "₪320 NIS",
      category: "Books"
    },
    status: "Pending",
    timeline: [
      {
        status: "Pending",
        location: "BookWorld Bethlehem",
        timestamp: "2024-01-16T10:00:00Z",
        description: "Package ready for pickup"
      }
    ],
    shippingInfo: {
      service: "Economy Delivery",
      carrier: "PalPost Economy",
      estimatedDelivery: "2024-01-18"
    },
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z"
  }
];

export default function PendingPackages() {
  const [packages] = useState<Package[]>(mockPackages);
  const { filters, searchTerm, clearAllFilters, updateSearchTerm, handleFilterChange, removeFilter } = useFilterManager();

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
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <BoxIcon className="size-5 text-yellow-600 dark:text-yellow-400" />
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
      header: "Created Date",
      accessor: (pkg: Package) => (
        <span className="text-gray-500 text-theme-sm dark:text-gray-400">
          {new Date(pkg.createdAt).toLocaleDateString("en-GB")}
        </span>
      )
    },
  ];

  return (
    <>
      <PageMeta title="Pending Packages | DMS Portal" description="Pending Packages Dashboard" />
      <PageBreadcrumb pageTitle="Pending Packages" />

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
          emptyMessage="No pending packages found."
        />
      </div>
    </>
  );
}
