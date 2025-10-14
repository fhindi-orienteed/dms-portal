import ComponentCard from "../../../components/common/ComponentCard";
import { Rating, SuccessRate } from "../../../components/ui";
import { DriverDetails } from "./mockData";

interface PerformanceTabProps {
  driver: DriverDetails;
}

export default function PerformanceTab({ driver }: PerformanceTabProps) {
  return (
    <ComponentCard title="Performance Metrics" desc="Driver performance statistics and analytics">
      <div className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</p>
              <div className="mt-2">
                <SuccessRate rate={driver.successRate} />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer Rating</p>
              <div className="mt-2">
                <Rating rating={driver.customerRating} />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Delivery Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{driver.averageDeliveryTime}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">On-Time Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {Math.round((driver.onTimeDeliveries / driver.totalDeliveries) * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Successful Deliveries</span>
                <span className="font-medium text-green-600 dark:text-green-400">{driver.successfulDeliveries}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Failed Deliveries</span>
                <span className="font-medium text-red-600 dark:text-red-400">{driver.failedDeliveries}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">On-Time Deliveries</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">{driver.onTimeDeliveries}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Late Deliveries</span>
                <span className="font-medium text-orange-600 dark:text-orange-400">{driver.lateDeliveries}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Feedback</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Customer Praise</span>
                <span className="font-medium text-green-600 dark:text-green-400">{driver.customerPraise}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Customer Complaints</span>
                <span className="font-medium text-red-600 dark:text-red-400">{driver.customerComplaints}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Net Feedback Score</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  +{driver.customerPraise - driver.customerComplaints}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
