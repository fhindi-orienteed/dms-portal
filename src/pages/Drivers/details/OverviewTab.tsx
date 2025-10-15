import ComponentCard from "../../../components/common/ComponentCard";
import { DriverDetails } from "./mockData";

interface OverviewTabProps {
  driver: DriverDetails;
}

export default function OverviewTab({ driver }: OverviewTabProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
    <ComponentCard title="Driver Overview" desc="Detailed information about the driver">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</h4>
          <p className="text-gray-600 dark:text-gray-400">{driver.email}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</h4>
          <p className="text-gray-600 dark:text-gray-400">{driver.phone}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</h4>
          <p className="text-gray-600 dark:text-gray-400">{driver.address}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Join Date</h4>
          <p className="text-gray-600 dark:text-gray-400">{formatDate(driver.joinDate)}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Active</h4>
          <p className="text-gray-600 dark:text-gray-400">{formatDateTime(driver.lastActive)}</p>
        </div>
      </div>
    </ComponentCard>
  );
}
