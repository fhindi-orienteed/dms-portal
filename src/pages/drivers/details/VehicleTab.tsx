import ComponentCard from "../../../components/common/ComponentCard";
import { DriverDetails } from "./mockData";

interface VehicleTabProps {
  driver: DriverDetails;
}

export default function VehicleTab({ driver }: VehicleTabProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ComponentCard title="Vehicle Information" desc="Driver vehicle and license details">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vehicle Type</h4>
          <p className="text-gray-600 dark:text-gray-400">{driver.vehicleType}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vehicle Number</h4>
          <p className="text-gray-600 dark:text-gray-400">{driver.vehicleNumber}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">License Number</h4>
          <p className="text-gray-600 dark:text-gray-400">{driver.licenseNumber}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">License Expiry</h4>
          <p className="text-gray-600 dark:text-gray-400">{formatDate(driver.licenseExpiry)}</p>
        </div>
      </div>
    </ComponentCard>
  );
}
