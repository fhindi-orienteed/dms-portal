import ComponentCard from "../../../components/common/ComponentCard";
import { UserCircleIcon, MailIcon, TimeIcon } from "../../../icons";
import { PackageDetails } from "./mockData";

interface DriverTabProps {
  packageData: PackageDetails;
}

export default function DriverTab({ packageData }: DriverTabProps) {
  if (!packageData.driver) {
    return (
      <ComponentCard title="Driver Information" desc="Driver assigned to this package">
        <div className="text-center py-8">
          <UserCircleIcon className="size-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No driver assigned yet</p>
        </div>
      </ComponentCard>
    );
  }

  return (
    <ComponentCard title="Driver Information" desc="Driver assigned to this package">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <UserCircleIcon className="size-5 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Driver Name</h4>
            <p className="text-gray-600 dark:text-gray-400">{packageData.driver.name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MailIcon className="size-5 text-green-600 dark:text-green-400 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</h4>
            <p className="text-gray-600 dark:text-gray-400">{packageData.driver.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <TimeIcon className="size-5 text-purple-600 dark:text-purple-400 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</h4>
            <p className="text-gray-600 dark:text-gray-400">{packageData.driver.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <UserCircleIcon className="size-5 text-orange-600 dark:text-orange-400 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Driver ID</h4>
            <p className="text-gray-600 dark:text-gray-400">{packageData.driver.id}</p>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
