import { useState } from "react";
import { PageMeta, PageBreadcrumb } from "../../components/common";
import TrackPackage from "../../components/tracking/TrackPackage";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import { getStatusColor } from "../../utils/packageUtils";
import { useTracking } from "../../hooks/useTracking";

export default function TrackPackagePage() {
  const { trackPackage, trackingResult, isTracking, resetTracking } = useTracking();


  const [trackingHistory] = useState([
    {
      id: 1,
      date: "2025-10-20 10:00 AM",
      location: "Gaza City",
      status: "Delivered",
    },
    {
      id: 2,
      date: "2025-10-19 06:45 PM",
      location: "Rafah",
      status: "In Transit",
    },
    {
      id: 3,
      date: "2025-10-18 09:00 AM",
      location: "Jerusalem",
      status: "Pending",
    },
  ]);

  // Function to trigger tracking
  const handleTrack = (trackingNumber: string) => {
    trackPackage(trackingNumber);
  };

  const handleTrackAnother = () => {
    resetTracking();
  };

  // Define table columns
  const columns = [
    {
      header: "Date & Time",
      accessor: (item: any) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {item.date}
        </span>
      ),
    },
    {
      header: "Location",
      accessor: (item: any) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {item.location}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: any) => (
        <Badge color={getStatusColor(item.status)}>
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <PageMeta
        title="Track Package | DMS Portal"
        description="Track your shipments and view recent tracking updates."
      />
      <PageBreadcrumb pageTitle="Track Package" />

      <div className="space-y-6">
        {/* Track Package input section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <TrackPackage onTrack={handleTrack} isTracking={isTracking} />
        </div>

        {/* Tracking history table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Latest Tracking History
            </h2>
            {trackingResult && (
              <button
                onClick={handleTrackAnother}
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Track another package
              </button>
            )}
          </div>

          <GenericDataTable
            data={
              trackingResult
                ? [trackingResult, ...trackingHistory]
                : trackingHistory
            }
            columns={columns}
            itemsPerPage={5}
            showPagination={false}
            emptyMessage="No tracking history found."
          />
        </div>
      </div>
    </>
  );
}
