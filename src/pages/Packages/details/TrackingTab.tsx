import ComponentCard from "../../../components/common/ComponentCard";
import Badge from "../../../components/ui/badge/Badge";
import { TimeIcon, PlugInIcon } from "../../../icons";
import { getStatusColor, formatDateTime } from "../../../utils/followUpUtils";
import { PackageDetails } from "./mockData";

interface TrackingTabProps {
  packageData: PackageDetails;
}

export default function TrackingTab({ packageData }: TrackingTabProps) {
  return (
    <ComponentCard title="Tracking History" desc="Complete tracking timeline for this package">
      <div className="space-y-6">
        {/* Current Status */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Current Status</h4>
          </div>
          <div className="flex items-center gap-3">
            <Badge color={getStatusColor(packageData.status)}>
              {packageData.status.replace('_', ' ')}
            </Badge>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatDateTime(packageData.updatedAt)}
            </span>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          {packageData.trackingHistory.map((event, index) => (
            <div key={event.id} className="relative flex gap-4 pb-8">
              {/* Status icon */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                  {index === 0 ? (
                    <PlugInIcon className="size-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <TimeIcon className="size-4 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
              </div>
              
              {/* Event details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h5 className="font-medium text-gray-900 dark:text-white">{event.status}</h5>
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
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {event.description}
                </p>
                
                {event.notes && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                    Note: {event.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Delivery */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <TimeIcon className="size-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Estimated Delivery</h4>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                {formatDateTime(packageData.estimatedDelivery)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
