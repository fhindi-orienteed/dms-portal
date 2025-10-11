import ComponentCard from "../../../components/common/ComponentCard";
import Badge from "../../../components/ui/badge/Badge";
import { getStatusColor } from "../../../utils/packageUtils";

interface OverviewTabProps {
  merchant: any;
}

export default function OverviewTab({ merchant }: OverviewTabProps) {
  return (
    <ComponentCard title="Merchant Overview" desc="Detailed information about the merchant">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h4>
          <p className="text-gray-600 dark:text-gray-400">{merchant.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Registration Date</h4>
          <p className="text-gray-600 dark:text-gray-400">{merchant.createdDate}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Status</h4>
          <Badge color={getStatusColor(merchant.status)}>{merchant.status}</Badge>
        </div>
      </div>
    </ComponentCard>
  );
}

