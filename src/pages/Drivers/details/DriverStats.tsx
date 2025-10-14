import ComponentCard from "../../../components/common/ComponentCard";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";
import { StatsCard } from "../../../components/ui/stats";
import { UserCircleIcon, TimeIcon, CalenderIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { getStatusColor } from "../../../utils/packageUtils";
import { DriverDetails } from "./mockData";

interface DriverStatsProps {
  driver: DriverDetails;
}

export default function DriverStats({ driver }: DriverStatsProps) {
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
    <ComponentCard title={driver.driverName} desc={`Driver ID: ${driver.driverId}`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<UserCircleIcon className="size-6 text-brand-600 dark:text-brand-400" />}
          label="Customer Rating"
          value={`${driver.customerRating}/5`}
          color="primary"
        />
        <StatsCard
          icon={<TimeIcon className="size-6 text-success-600 dark:text-success-400" />}
          label="Success Rate"
          value={`${driver.successRate}%`}
          color="success"
        />
        <StatsCard
          icon={<CalenderIcon className="size-6 text-purple-600 dark:text-purple-400" />}
          label="Total Deliveries"
          value={driver.totalDeliveries}
          color="purple"
        />
        <StatsCard
          icon={<TimeIcon className="size-6 text-orange-600 dark:text-orange-400" />}
          label="Status"
          value={<Badge color={getStatusColor(driver.status)}>{driver.status}</Badge>}
          color="orange"
        />
      </div>

      {/* Contact Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{driver.city}, {driver.region}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Join Date</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{new Date(driver.joinDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last Active</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{formatDateTime(driver.lastActive)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="primary" size="sm" startIcon={<PencilIcon className="size-4" />}>
          Edit Driver
        </Button>
        <Button variant="danger" size="sm" startIcon={<TrashBinIcon className="size-4" />}>
          Delete Driver
        </Button>
      </div>
    </ComponentCard>
  );
}
