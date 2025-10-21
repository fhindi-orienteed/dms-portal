import ComponentCard from "../../../components/common/ComponentCard";
import { UserCircleIcon, MailIcon, TimeIcon, PlugInIcon } from "../../../icons";
import { PackageDetails } from "./mockData";

interface RecipientTabProps {
  packageData: PackageDetails;
}

export default function RecipientTab({ packageData }: RecipientTabProps) {
  return (
    <ComponentCard title="Recipient Information" desc="Details about the package recipient">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <UserCircleIcon className="size-5 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</h4>
            <p className="text-gray-600 dark:text-gray-400">{packageData.recipient.name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MailIcon className="size-5 text-green-600 dark:text-green-400 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</h4>
            <p className="text-gray-600 dark:text-gray-400">{packageData.recipient.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <TimeIcon className="size-5 text-purple-600 dark:text-purple-400 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</h4>
            <p className="text-gray-600 dark:text-gray-400">{packageData.recipient.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <PlugInIcon className="size-5 text-orange-600 dark:text-orange-400 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</h4>
            <div className="text-gray-600 dark:text-gray-400">
              <p>{packageData.recipient.address}</p>
              <p>{packageData.recipient.city}, {packageData.recipient.region} {packageData.recipient.country}</p>
            </div>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
