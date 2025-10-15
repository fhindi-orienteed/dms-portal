import ComponentCard from "../../../components/common/ComponentCard";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";
import { UserCircleIcon, BoxIcon, TimeIcon, PlugInIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { getStatusColor } from "../../../utils/packageUtils";
import { AssignmentDetails } from "./mockData";

interface AssignmentStatsProps {
  assignment: AssignmentDetails;
}

export default function AssignmentStats({ assignment }: AssignmentStatsProps) {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "error";
      case "high":
        return "warning";
      case "medium":
        return "info";
      case "low":
        return "success";
      default:
        return "light";
    }
  };

  return (
    <ComponentCard title={`Assignment ${assignment.assignmentId}`} desc={`Package: ${assignment.package.id}`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <UserCircleIcon className="size-6 text-brand-600 dark:text-brand-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Driver</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{assignment.driver.name}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <BoxIcon className="size-6 text-success-600 dark:text-success-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Package Type</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{assignment.package.packageType}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <TimeIcon className="size-6 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Est. Time</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{assignment.timing.estimatedDeliveryTime}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <PlugInIcon className="size-6 text-orange-600 dark:text-orange-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</p>
              <Badge color={getPriorityColor(assignment.priority)} size="sm">
                {assignment.priority}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
          <div className="mt-1">
            <Badge color={getStatusColor(assignment.status)}>
              {assignment.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Scheduled Date</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
            {formatDateTime(assignment.timing.scheduledDate)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
            {assignment.package.customerName}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="primary" size="sm" startIcon={<PencilIcon className="size-4" />}>
          Edit Assignment
        </Button>
        <Button variant="danger" size="sm" startIcon={<TrashBinIcon className="size-4" />}>
          Cancel Assignment
        </Button>
      </div>
    </ComponentCard>
  );
}
