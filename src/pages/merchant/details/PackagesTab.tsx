import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Badge from "../../../components/ui/badge/Badge";
import { getStatusColor } from "../../../utils/packageUtils";

interface PackagesTabProps {
  packages: any[];
}

export default function PackagesTab({ packages }: PackagesTabProps) {
  const columns = [
    {
      header: "Tracking Number",
      accessor: (pkg: any) => (
        <span className="font-medium text-blue-600 dark:text-blue-400">{pkg.trackingNumber}</span>
      )
    },
    {
      header: "Recipient",
      accessor: (pkg: any) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">{pkg.recipient}</span>
      )
    },
    {
      header: "Destination",
      accessor: (pkg: any) => (
        <span className="text-gray-600 dark:text-gray-400">{pkg.destination}</span>
      )
    },
    {
      header: "Status",
      accessor: (pkg: any) => (
        <Badge color={getStatusColor(pkg.status)}>{pkg.status}</Badge>
      )
    },
    {
      header: "Date",
      accessor: (pkg: any) => (
        <span className="text-gray-500 text-theme-sm dark:text-gray-400">{pkg.date}</span>
      )
    }
  ];

  return (
    <GenericDataTable
      data={packages}
      columns={columns}
      itemsPerPage={10}
      showPagination={true}
      emptyMessage="No packages found for this merchant."
    />
  );
}

