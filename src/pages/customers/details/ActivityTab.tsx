import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";

interface ActivityTabProps {
  activities: any[];
}

export default function ActivityTab({ activities }: ActivityTabProps) {
  const columns = [
    {
      header: "Action",
      accessor: (activity: any) => (
        <span className="font-medium text-gray-800 dark:text-white/90">{activity.action}</span>
      )
    },
    {
      header: "Description",
      accessor: (activity: any) => (
        <span className="text-gray-600 dark:text-gray-400">{activity.description}</span>
      )
    },
    {
      header: "Date & Time",
      accessor: (activity: any) => (
        <span className="text-gray-500 text-theme-sm dark:text-gray-400">{activity.date}</span>
      )
    }
  ];

  return (
    <GenericDataTable
      data={activities}
      columns={columns}
      itemsPerPage={10}
      showPagination={true}
      emptyMessage="No activity found for this customer."
    />
  );
}

