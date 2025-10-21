import ComponentCard from "../../../components/common/ComponentCard";
import { PackageDetails } from "./mockData";

interface OverviewTabProps {
  packageData: PackageDetails;
}

export default function OverviewTab({ packageData }: OverviewTabProps) {
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
    <ComponentCard title="Package Overview" desc="Detailed information about the package">
      <div className="space-y-6">
        {/* Package Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Package Information</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Package ID:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">{packageData.packageId}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Tracking Number:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">{packageData.trackingNumber}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">{packageData.packageType}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Description:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">{packageData.description}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dimensions & Weight</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Weight:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">{packageData.weight} kg</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Dimensions:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">
                  {packageData.dimensions.length} × {packageData.dimensions.width} × {packageData.dimensions.height} cm
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Declared Value:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">
                  ${packageData.value.toFixed(2)} {packageData.currency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Dates */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Important Dates</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Created:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">{formatDateTime(packageData.createdAt)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Pickup:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">{formatDateTime(packageData.pickupDate)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">{formatDateTime(packageData.estimatedDelivery)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Instructions */}
        {packageData.deliveryInstructions && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Instructions</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              {packageData.deliveryInstructions}
            </p>
          </div>
        )}

        {/* Notes */}
        {packageData.notes && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              {packageData.notes}
            </p>
          </div>
        )}
      </div>
    </ComponentCard>
  );
}
