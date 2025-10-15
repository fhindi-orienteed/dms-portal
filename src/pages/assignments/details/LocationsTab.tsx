import ComponentCard from "../../../components/common/ComponentCard";
import { PlugInIcon, UserIcon, MailIcon } from "../../../icons";
import { AssignmentDetails } from "./mockData";

interface LocationsTabProps {
  assignment: AssignmentDetails;
}

export default function LocationsTab({ assignment }: LocationsTabProps) {
  return (
    <div className="space-y-6">
      {/* Pickup Location */}
      <ComponentCard title="Pickup Location" desc="Package pickup details">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <PlugInIcon className="size-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</h4>
              <p className="text-gray-600 dark:text-gray-400">{assignment.locations.pickup.address}</p>
              <p className="text-gray-600 dark:text-gray-400">{assignment.locations.pickup.city}, {assignment.locations.pickup.region}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <UserIcon className="size-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Person</h4>
              <p className="text-gray-600 dark:text-gray-400">{assignment.locations.pickup.contactPerson}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MailIcon className="size-5 text-purple-600 dark:text-purple-400 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Phone</h4>
              <p className="text-gray-600 dark:text-gray-400">{assignment.locations.pickup.contactPhone}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instructions</h4>
            <p className="text-gray-600 dark:text-gray-400">{assignment.locations.pickup.instructions}</p>
          </div>
        </div>
      </ComponentCard>

      {/* Delivery Location */}
      <ComponentCard title="Delivery Location" desc="Package delivery details">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <PlugInIcon className="size-5 text-red-600 dark:text-red-400 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</h4>
              <p className="text-gray-600 dark:text-gray-400">{assignment.locations.delivery.address}</p>
              <p className="text-gray-600 dark:text-gray-400">{assignment.locations.delivery.city}, {assignment.locations.delivery.region}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <UserIcon className="size-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Person</h4>
              <p className="text-gray-600 dark:text-gray-400">{assignment.locations.delivery.contactPerson}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MailIcon className="size-5 text-purple-600 dark:text-purple-400 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Phone</h4>
              <p className="text-gray-600 dark:text-gray-400">{assignment.locations.delivery.contactPhone}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instructions</h4>
            <p className="text-gray-600 dark:text-gray-400">{assignment.locations.delivery.instructions}</p>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
