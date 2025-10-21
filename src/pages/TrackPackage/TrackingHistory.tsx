import { useState } from "react";
import { PageMeta, PageBreadcrumb } from "../../components/common";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import { getStatusColor } from "../../utils/packageUtils";
import { SearchIcon } from "../../icons";
import Input from "../../components/form/input/InputField";

export default function TrackingHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [trackingHistory] = useState([
    {
      id: 1,
      trackingNumber: "12345",
      date: "2025-10-20 10:00 AM",
      location: "Gaza City",
      status: "Delivered",
    },
    {
      id: 2,
      trackingNumber: "67890",
      date: "2025-10-19 06:45 PM",
      location: "Rafah",
      status: "In Transit",
    },
    {
      id: 3,
      trackingNumber: "11223",
      date: "2025-10-18 09:00 AM",
      location: "Jerusalem",
      status: "Pending",
    },
    {
      id: 4,
      trackingNumber: "44556",
      date: "2025-10-18 11:30 AM",
      location: "Khan Younis",
      status: "Failed Delivery",
    },
  ]);

  const filteredHistory = trackingHistory.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.trackingNumber.toLowerCase().includes(term) ||
      item.date.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term);

    const itemDate = new Date(item.date.split(" ")[0]); // use only YYYY-MM-DD part

    const isAfterStart = startDate ? itemDate >= new Date(startDate) : true;
    const isBeforeEnd = endDate ? itemDate <= new Date(endDate) : true;

    return matchesSearch && isAfterStart && isBeforeEnd;
  });

  const columns = [
    {
      header: "Tracking Number",
      accessor: (item: any) => (
        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
          {item.trackingNumber}
        </span>
      ),
    },
    {
      header: "Date & Time",
      accessor: (item: any) => (
        <span className="text-gray-700 text-theme-sm dark:text-white/80">
          {item.date}
        </span>
      ),
    },
    {
      header: "Location",
      accessor: (item: any) => (
        <span className="text-gray-700 text-theme-sm dark:text-white/80">
          {item.location}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: any) => (
        <Badge color={getStatusColor(item.status)}>{item.status}</Badge>
      ),
    },
  ];

  return (
    <>
      <PageMeta
        title="Tracking History | DMS Portal"
        description="View all recent package tracking records."
      />
      <PageBreadcrumb pageTitle="Tracking History" />

      <div className="space-y-6">
        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10" />
            <Input
              placeholder="Search by number, date, location or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10"
            />
          </div>

          {/* Date Filters */}
          <div className="flex gap-3">
          
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white text-sm"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <GenericDataTable
            data={filteredHistory}
            columns={columns}
            itemsPerPage={8}
            showPagination={true}
            emptyMessage="No tracking records found."
          />
        </div>
      </div>
    </>
  );
}