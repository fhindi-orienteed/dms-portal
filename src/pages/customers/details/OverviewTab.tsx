import ComponentCard from "../../../components/common/ComponentCard";

interface OverviewTabProps {
  customer: any;
}

export default function OverviewTab({ customer }: OverviewTabProps) {
  return (
    <ComponentCard title="Customer Overview" desc="Detailed customer information">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Address</h4>
          <p className="text-gray-600 dark:text-gray-400">{customer.address}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Join Date</h4>
            <p className="text-gray-600 dark:text-gray-400">{customer.joinDate}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Orders</h4>
            <p className="text-gray-600 dark:text-gray-400">{customer.totalOrders} orders</p>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}

