import { UserCircleIcon, MailIcon, TimeIcon } from "../../../icons";
import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Badge from "../../../components/ui/badge/Badge";
import { CustomerFollowUp } from "./mockData";
import { 
  getStatusColor, 
  getPriorityColor, 
  getCustomerFollowUpTypeColor, 
  formatDateTime, 
  isOverdue, 
  getDaysOverdue 
} from "../../../utils/followUpUtils";

interface FollowUpsTableProps {
  followUps: CustomerFollowUp[];
  onRowClick: (followUp: CustomerFollowUp) => void;
}

export default function FollowUpsTable({ followUps, onRowClick }: FollowUpsTableProps) {

  const columns = [
    {
      header: "Customer",
      accessor: (followUp: CustomerFollowUp) => (
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
      header: "Contact",
      accessor: (followUp: CustomerFollowUp) => (
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
      accessor: (followUp: CustomerFollowUp) => (
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
      accessor: (followUp: CustomerFollowUp) => (
        <div className="space-y-2">
          <Badge color={getCustomerFollowUpTypeColor(followUp.followUpType)} size="sm">
            {followUp.followUpType}
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
      accessor: (followUp: CustomerFollowUp) => (
        <div>
          <Badge color={getStatusColor(followUp.status)}>
            {followUp.status.replace('_', ' ')}
          </Badge>
          {isOverdue(followUp.dueDate, followUps) && (
            <div className="text-xs text-red-600 dark:text-red-400 mt-1">
              Overdue
            </div>
          )}
        </div>
      )
    },
    {
      header: "Assigned To",
      accessor: (followUp: CustomerFollowUp) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {followUp.assignedTo}
        </span>
      )
    },
    {
      header: "Due Date",
      accessor: (followUp: CustomerFollowUp) => (
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
      emptyMessage="No customer follow-ups found."
      onRowClick={onRowClick}
    />
  );
}
