import ComponentCard from "../../../components/common/ComponentCard";
import { DriverDetails } from "./mockData";

interface DeliveriesTabProps {
  driver: DriverDetails;
}

export default function DeliveriesTab({ driver }: DeliveriesTabProps) {
  return (
    <ComponentCard title="Delivery Statistics" desc="Driver delivery performance and earnings">
      <div className="space-y-6">
        {/* Delivery Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{driver.weeklyDeliveries}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">deliveries</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{driver.monthlyDeliveries}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">deliveries</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{driver.totalDeliveries}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">deliveries</p>
            </div>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Earnings Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Earnings</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{driver.monthlyEarnings}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{driver.totalEarnings}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg per Delivery</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                ${(parseFloat(driver.totalEarnings.replace('$', '')) / driver.totalDeliveries).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
