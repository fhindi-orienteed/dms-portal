import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Badge from "../../../components/ui/badge/Badge";
import { getStatusColor } from "../../../utils/packageUtils";

interface OrdersTabProps {
  orders: any[];
}

export default function OrdersTab({ orders }: OrdersTabProps) {
  const columns = [
    {
      header: "Tracking Number",
      accessor: (order: any) => (
        <span className="font-medium text-blue-600 dark:text-blue-400">{order.trackingNumber}</span>
      )
    },
    {
      header: "Status",
      accessor: (order: any) => (
        <Badge color={getStatusColor(order.status)}>{order.status}</Badge>
      )
    },
    {
      header: "Items",
      accessor: (order: any) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">{order.items}</span>
      )
    },
    {
      header: "Amount",
      accessor: (order: any) => (
        <span className="font-medium text-gray-900 dark:text-white">{order.amount}</span>
      )
    },
    {
      header: "Date",
      accessor: (order: any) => (
        <span className="text-gray-500 text-theme-sm dark:text-gray-400">{order.date}</span>
      )
    }
  ];

  return (
    <GenericDataTable
      data={orders}
      columns={columns}
      itemsPerPage={10}
      showPagination={true}
      emptyMessage="No orders found for this customer."
    />
  );
}

