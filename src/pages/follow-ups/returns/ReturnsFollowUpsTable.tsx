import { UserCircleIcon, MailIcon, TimeIcon,    BoxIcon } from "../../../icons";
import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Badge from "../../../components/ui/badge/Badge";
import { ReturnsFollowUp } from "./mockData";
import { 
  getStatusColor, 
  getPriorityColor, 
  getReturnsFollowUpTypeColor, 
  getRefundStatusColor,
  formatDateTime, 
  formatAmount, 
} from "../../../utils/followUpUtils";

interface ReturnsFollowUpsTableProps {
  followUps: ReturnsFollowUp[];
  onRowClick: (followUp: ReturnsFollowUp) => void;
}

export default function ReturnsFollowUpsTable({ followUps, onRowClick }: ReturnsFollowUpsTableProps) {

  const columns = [
    {
      header: "Customer",
      accessor: (followUp: ReturnsFollowUp) => (
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
      header: "Return Details",
      accessor: (followUp: ReturnsFollowUp) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-800 dark:text-white/90">
              {formatAmount(followUp.returnAmount, followUp.currency)}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {followUp.returnId}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Order: {followUp.originalOrderId}
          </div>
        </div>
      )
    },
    {
      header: "Contact",
      accessor: (followUp: ReturnsFollowUp) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MailIcon className="size-3 text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">{followUp.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <TimeIcon className="size-3 text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">{followUp.phone}</span>
          </div>
        </div>
      )
    },
    {
      header: "Subject",
      accessor: (followUp: ReturnsFollowUp) => (
        <div>
          <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90 max-w-48 truncate">
            {followUp.subject}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 max-w-48 truncate">
            {followUp.description}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Reason: {followUp.returnReason}
          </div>
        </div>
      )
    },
    {
      header: "Type & Priority",
      accessor: (followUp: ReturnsFollowUp) => (
        <div className="space-y-2">
          <Badge color={getReturnsFollowUpTypeColor(followUp.followUpType)} size="sm">
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
      header: "Status & Refund",
      accessor: (followUp: ReturnsFollowUp) => (
        <div>
          <Badge color={getStatusColor(followUp.status)}>
            {followUp.status.replace('_', ' ')}
          </Badge>
          {followUp.refundStatus && (
            <div className="mt-1">
              <Badge color={getRefundStatusColor(followUp.refundStatus)} size="sm">
                {followUp.refundStatus}
              </Badge>
            </div>
          )}          
        </div>
      )
    },
    {
      header: "Item Condition",
      accessor: (followUp: ReturnsFollowUp) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BoxIcon className="size-3 text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">{followUp.itemCondition}</span>
          </div>
          {followUp.trackingNumber && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {followUp.trackingNumber}
            </div>
          )}
        </div>
      )
    },
    {
      header: "Assigned To",
      accessor: (followUp: ReturnsFollowUp) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {followUp.assignedTo}
        </span>
      )
    },
    {
      header: "Due Date",
      accessor: (followUp: ReturnsFollowUp) => (
        <div>
          <div className="flex items-center gap-1">
            <TimeIcon className="size-3 text-gray-400" />
            <span className="text-gray-800 text-theme-sm dark:text-white/90">
              {formatDateTime(followUp.dueDate)}
            </span>
          </div>          
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
      emptyMessage="No return follow-ups found."
      onRowClick={onRowClick}
    />
  );
}
