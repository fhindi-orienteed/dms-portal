import ComponentCard from "../../../components/common/ComponentCard";
import Badge from "../../../components/ui/badge/Badge";
import { TimeIcon, PlugInIcon } from "../../../icons";
import { AssignmentDetails } from "./mockData";

interface TrackingTabProps {
  assignment: AssignmentDetails;
}

export default function TrackingTab({ assignment }: TrackingTabProps) {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "assigned":
        return "info";
      case "picked up":
        return "warning";
      case "in transit":
        return "primary";
      case "delivered":
        return "success";
      case "failed":
        return "error";
      default:
        return "light";
    }
  };

  return (
    <ComponentCard title="Tracking History" desc="Complete tracking timeline for this assignment">
      <div className="space-y-4">
        {assignment.trackingHistory.map((event, index) => (
          <div key={index} className="relative">
            {/* Timeline line */}
            {index < assignment.trackingHistory.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200 dark:bg-gray-700"></div>
            )}
            
            <div className="flex gap-4">
              {/* Status icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  {event.status.toLowerCase() === "delivered" ? (
                    <PlugInIcon className="size-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <TimeIcon className="size-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
              </div>
              
              {/* Event details */}
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {event.status}
                  </h4>
                  <Badge color={getStatusColor(event.status)} size="sm">
                    {event.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                  <TimeIcon className="size-4 text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDateTime(event.timestamp)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <PlugInIcon className="size-4 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.location}
                  </p>
                </div>
                
                {event.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ComponentCard>
  );
}
