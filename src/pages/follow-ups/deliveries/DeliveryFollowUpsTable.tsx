import { UserCircleIcon, TimeIcon, BoxIcon, PlugInIcon } from "../../../icons";
import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Badge from "../../../components/ui/badge/Badge";
import { DeliveryFollowUp } from "./mockData";
import { 
  getStatusColor, 
  getPriorityColor, 
  getDeliveryFollowUpTypeColor, 
  formatDateTime, 
  isOverdue, 
  getDaysOverdue 
} from "../../../utils/followUpUtils";

interface DeliveryFollowUpsTableProps {
  followUps: DeliveryFollowUp[];
  onRowClick: (followUp: DeliveryFollowUp) => void;
}

export default function DeliveryFollowUpsTable({ followUps, onRowClick }: DeliveryFollowUpsTableProps) {

  const columns = [
    {
      header: "Customer",
      accessor: (followUp: DeliveryFollowUp) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <UserCircleIcon className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {followUp.customerName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {followUp.customerId}
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Delivery Details",
      accessor: (followUp: DeliveryFollowUp) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BoxIcon className="size-3 text-gray-400" />
            <span className="text-sm font-medium text-gray-800 dark:text-white/90">
              {followUp.packageType}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {followUp.deliveryId}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {followUp.trackingNumber}
          </div>
        </div>
      )
    },
    {
      header: "Driver & Address",
      accessor: (followUp: DeliveryFollowUp) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UserCircleIcon className="size-3 text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">{followUp.driverName}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 max-w-48 truncate">
            {followUp.deliveryAddress}
          </div>
        </div>
      )
    },
    {
      header: "Subject",
      accessor: (followUp: DeliveryFollowUp) => (
        <div>
          <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90 max-w-48 truncate">
            {followUp.subject}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 max-w-48 truncate">
            {followUp.description}
          </div>
        </div>
      )
    },
    {
      header: "Type & Priority",
      accessor: (followUp: DeliveryFollowUp) => (
        <div className="space-y-2">
          <Badge color={getDeliveryFollowUpTypeColor(followUp.followUpType)} size="sm">
            {followUp.followUpType.replace('_', ' ')}
          </Badge>
          <div>
            <Badge color={getPriorityColor(followUp.priority)} size="sm">
              {followUp.priority}
            </Badge>
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (followUp: DeliveryFollowUp) => (
        <div>
          <Badge color={getStatusColor(followUp.status)}>
            {followUp.status.replace('_', ' ')}
          </Badge>
        </div>
      )
    },
    {
      header: "Delivery Time",
      accessor: (followUp: DeliveryFollowUp) => (
        <div>
          <div className="flex items-center gap-1 mb-1">
            <TimeIcon className="size-3 text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Est: {formatDateTime(followUp.estimatedDelivery)}
            </span>
          </div>
          {followUp.actualDelivery && (
            <div className="flex items-center gap-1">
              <PlugInIcon className="size-3 text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Act: {formatDateTime(followUp.actualDelivery)}
              </span>
            </div>
          )}
        </div>
      )
    },
    {
      header: "Assigned To",
      accessor: (followUp: DeliveryFollowUp) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {followUp.assignedTo}
        </span>
      )
    },
    {
      header: "Due Date",
      accessor: (followUp: DeliveryFollowUp) => (
        <div>
          <div className="flex items-center gap-1">
            <TimeIcon className="size-3 text-gray-400" />
            <span className="text-gray-800 text-theme-sm dark:text-white/90">
              {formatDateTime(followUp.dueDate)}
            </span>
          </div>
          {isOverdue(followUp.dueDate, followUps) && (
            <div className="text-xs text-red-600 dark:text-red-400">
              {getDaysOverdue(followUp.dueDate)} days overdue
            </div>
          )}
        </div>
      )
    },
  ];

  return (
    <GenericDataTable
      data={followUps}
      columns={columns}
      itemsPerPage={10}
      showPagination={true}
      emptyMessage="No delivery follow-ups found."
      onRowClick={onRowClick}
    />
  );
}
