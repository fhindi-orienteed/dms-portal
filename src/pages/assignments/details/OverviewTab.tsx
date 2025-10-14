import ComponentCard from "../../../components/common/ComponentCard";
import { AssignmentDetails } from "./mockData";

interface OverviewTabProps {
  assignment: AssignmentDetails;
}

export default function OverviewTab({ assignment }: OverviewTabProps) {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ComponentCard title="Assignment Overview" desc="General information about the assignment">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assignment ID</h4>
          <p className="text-gray-600 dark:text-gray-400">{assignment.assignmentId}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Driver</h4>
          <p className="text-gray-600 dark:text-gray-400">{assignment.driver.name} ({assignment.driver.id})</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer</h4>
          <p className="text-gray-600 dark:text-gray-400">{assignment.package.customerName}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assigned Date</h4>
          <p className="text-gray-600 dark:text-gray-400">{formatDateTime(assignment.timing.assignedDate)}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scheduled Date</h4>
          <p className="text-gray-600 dark:text-gray-400">{formatDateTime(assignment.timing.scheduledDate)}</p>
        </div>
        {assignment.timing.actualDeliveryTime && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Actual Delivery Time</h4>
            <p className="text-gray-600 dark:text-gray-400">{formatDateTime(assignment.timing.actualDeliveryTime)}</p>
          </div>
        )}
        {assignment.notes && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</h4>
            <p className="text-gray-600 dark:text-gray-400">{assignment.notes}</p>
          </div>
        )}
      </div>
    </ComponentCard>
  );
}
