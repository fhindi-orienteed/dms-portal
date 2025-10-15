import { UserCircleIcon, MailIcon, TimeIcon } from "../../../icons";
import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Badge from "../../../components/ui/badge/Badge";
import { PaymentFollowUp } from "./mockData";
import { 
  getStatusColor, 
  getPriorityColor, 
  getPaymentFollowUpTypeColor, 
  formatDateTime, 
  formatAmount, 
} from "../../../utils/followUpUtils";

interface PaymentFollowUpsTableProps {
  followUps: PaymentFollowUp[];
  onRowClick: (followUp: PaymentFollowUp) => void;
}

export default function PaymentFollowUpsTable({ followUps, onRowClick }: PaymentFollowUpsTableProps) {

  const columns = [
    {
      header: "Customer",
      accessor: (followUp: PaymentFollowUp) => (
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
      header: "Payment Details",
      accessor: (followUp: PaymentFollowUp) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-800 dark:text-white/90">
              {formatAmount(followUp.amount, followUp.currency)}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {followUp.paymentMethod}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {followUp.paymentId}
          </div>
        </div>
      )
    },
    {
      header: "Contact",
      accessor: (followUp: PaymentFollowUp) => (
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
      accessor: (followUp: PaymentFollowUp) => (
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
      accessor: (followUp: PaymentFollowUp) => (
        <div className="space-y-2">
          <Badge color={getPaymentFollowUpTypeColor(followUp.followUpType)} size="sm">
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
      accessor: (followUp: PaymentFollowUp) => (
        <div>
          <Badge color={getStatusColor(followUp.status)}>
            {followUp.status.replace('_', ' ')}
          </Badge>          
        </div>
      )
    },
    {
      header: "Assigned To",
      accessor: (followUp: PaymentFollowUp) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {followUp.assignedTo}
        </span>
      )
    },
    {
      header: "Due Date",
      accessor: (followUp: PaymentFollowUp) => (
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
      emptyMessage="No payment follow-ups found."
      onRowClick={onRowClick}
    />
  );
}
