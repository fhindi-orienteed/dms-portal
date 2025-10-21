import ComponentCard from "../../../components/common/ComponentCard";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";
import { BoxIcon, UserCircleIcon, TimeIcon, PlugInIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { getStatusColor, getPriorityColor, formatAmount } from "../../../utils/followUpUtils";
import { PackageDetails } from "./mockData";

interface PackageStatsProps {
  packageData: PackageDetails;
}

export default function PackageStats({ packageData }: PackageStatsProps) {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ComponentCard title={`Package ${packageData.packageId}`} desc={`Tracking: ${packageData.trackingNumber}`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <BoxIcon className="size-6 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Package Type</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{packageData.packageType}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <UserCircleIcon className="size-6 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{packageData.weight} kg</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <TimeIcon className="size-6 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Value</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatAmount(packageData.value, packageData.currency)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <PlugInIcon className="size-6 text-orange-600 dark:text-orange-400" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
              <Badge color={getStatusColor(packageData.status)} size="sm">
                {packageData.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Package Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Priority</p>
          <div className="mt-1">
            <Badge color={getPriorityColor(packageData.priority)} size="sm">
              {packageData.priority}
            </Badge>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pickup Date</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{formatDateTime(packageData.pickupDate)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{formatDateTime(packageData.estimatedDelivery)}</p>
        </div>
      </div>

      {/* Special Requirements */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Insurance</p>
          <Badge color={packageData.insurance ? "success" : "light"} size="sm">
            {packageData.insurance ? "Yes" : "No"}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Signature Required</p>
          <Badge color={packageData.signatureRequired ? "warning" : "light"} size="sm">
            {packageData.signatureRequired ? "Yes" : "No"}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fragile</p>
          <Badge color={packageData.fragile ? "error" : "light"} size="sm">
            {packageData.fragile ? "Yes" : "No"}
          </Badge>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="primary" size="sm" startIcon={<PencilIcon className="size-4" />}>
          Edit Package
        </Button>
        <Button variant="danger" size="sm" startIcon={<TrashBinIcon className="size-4" />}>
          Delete Package
        </Button>
      </div>
    </ComponentCard>
  );
}
