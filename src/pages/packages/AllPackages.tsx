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
import { Button } from "../../components/ui";
import { useTranslation } from "react-i18next";
const mockPackages: Package[] = [
  {
    id: 1,
    trackingNumber: "PKG001234567",
    recipient: {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      phone: "+970 59 123 4567",
      address: "Al-Masri Street, Building 15",
      city: "Ramallah",
      country: "Palestine",
    },
    sender: {
      name: "TechStore Ramallah",
      email: "orders@techstore.ps",
      phone: "+970 2 295 1234",
    },
    packageDetails: {
      description: "iPhone 15 Pro Max 256GB",
      weight: "0.5 kg",
      dimensions: "20x15x8 cm",
      value: "₪4,500 NIS",
      category: "Electronics",
    },
    status: "Delivered",
    timeline: [
      {
        status: "Delivered",
        location: "Ramallah, Palestine",
        timestamp: "2024-01-15T14:30:00Z",
        description: "Package delivered to recipient",
      },
      {
        status: "In Transit",
        location: "Ramallah Distribution Center",
        timestamp: "2024-01-15T10:00:00Z",
        description: "Out for delivery",
      },
      {
        status: "In Transit",
        location: "Jerusalem Hub",
        timestamp: "2024-01-14T16:45:00Z",
        description: "Package in transit",
      },
      {
        status: "Pending",
        location: "TechStore Ramallah",
        timestamp: "2024-01-13T09:00:00Z",
        description: "Package picked up",
      },
    ],
    shippingInfo: {
      service: "Express Delivery",
      carrier: "PalPost Express",
      estimatedDelivery: "2024-01-15",
      actualDelivery: "2024-01-15",
    },
    createdAt: "2024-01-13T09:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: 2,
    trackingNumber: "PKG001234568",
    recipient: {
      name: "Fatima Al-Zahra",
      email: "fatima.zahra@email.com",
      phone: "+970 59 987 6543",
      address: "Nablus Old City, Quarter 3",
      city: "Nablus",
      country: "Palestine",
    },
    sender: {
      name: "Fashion Hub Gaza",
      email: "orders@fashionhub.ps",
      phone: "+970 8 123 4567",
    },
    packageDetails: {
      description: "Designer Handbag - Leather",
      weight: "1.2 kg",
      dimensions: "35x25x15 cm",
      value: "₪850 NIS",
      category: "Fashion",
    },
    status: "In Transit",
    timeline: [
      {
        status: "In Transit",
        location: "Nablus Distribution Center",
        timestamp: "2024-01-16T08:00:00Z",
        description: "Package arrived at local facility",
      },
      {
        status: "In Transit",
        location: "Jerusalem Hub",
        timestamp: "2024-01-15T20:30:00Z",
        description: "Package in transit",
      },
      {
        status: "Pending",
        location: "Fashion Hub Gaza",
        timestamp: "2024-01-14T11:00:00Z",
        description: "Package picked up",
      },
    ],
    shippingInfo: {
      service: "Standard Delivery",
      carrier: "PalPost Standard",
      estimatedDelivery: "2024-01-17",
    },
    createdAt: "2024-01-14T11:00:00Z",
    updatedAt: "2024-01-16T08:00:00Z",
  },
  {
    id: 3,
    trackingNumber: "PKG001234569",
    recipient: {
      name: "Omar Khalil",
      email: "omar.khalil@email.com",
      phone: "+970 59 555 1234",
      address: "Hebron Industrial Zone",
      city: "Hebron",
      country: "Palestine",
    },
    sender: {
      name: "BookWorld Bethlehem",
      email: "orders@bookworld.ps",
      phone: "+970 2 276 5432",
    },
    packageDetails: {
      description: "Educational Books Set - 12 Books",
      weight: "3.5 kg",
      dimensions: "40x30x20 cm",
      value: "₪320 NIS",
      category: "Books",
    },
    status: "Pending",
    timeline: [
      {
        status: "Pending",
        location: "BookWorld Bethlehem",
        timestamp: "2024-01-16T10:00:00Z",
        description: "Package ready for pickup",
      },
    ],
    shippingInfo: {
      service: "Economy Delivery",
      carrier: "PalPost Economy",
      estimatedDelivery: "2024-01-18",
    },
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
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

export default function AllPackages() {
  const [packages] = useState<Package[]>(mockPackages);
  const navigate = useNavigate();
  const { filters, searchTerm, clearAllFilters, updateSearchTerm, handleFilterChange, removeFilter } = useFilterManager();

  const handleRowClick = (packageData: Package) => {
    navigate(`/packages/${packageData.id}`);
  };

  const availableFilters: FilterOption[] = [
    {
      key: "status",
      label: "Status",
      value: "status",
      options: [
        { value: "Delivered", label: "Delivered" },
        { value: "In Transit", label: "In Transit" },
        { value: "Pending", label: "Pending" },
        { value: "Failed Delivery", label: "Failed Delivery" },
      ],
    },
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
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <BoxIcon className="size-5 text-blue-600 dark:text-blue-400" />
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
  const { t } = useTranslation();
  return (
    <>
      <PageMeta
        title="All Packages | DMS Portal"
        description="All Packages Dashboard"
      />
      <PageBreadcrumb pageTitle="All Packages" />

      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
         
          <div className="flex flex-row justify-between">
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
            {/* export&import buttons */}
            <div className="items-end">
                  <Button className="mr-4 border border-gray-200 p-2 rounded-lg bg-blue-600 text-white">{t('packages.export')}</Button>
                  <Button className="mr-4 border border-gray-200 p-2 rounded-lg bg-blue-600 text-white">{t('packages.import')}</Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <GenericDataTable
          data={filteredPackages}
          columns={columns}
          itemsPerPage={10}
          showPagination={true}
          emptyMessage="No packages found."
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
