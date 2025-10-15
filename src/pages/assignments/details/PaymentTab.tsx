import ComponentCard from "../../../components/common/ComponentCard";
import { DollarLineIcon, DocsIcon, BoxIcon } from "../../../icons";
import { AssignmentDetails } from "./mockData";

interface PaymentTabProps {
  assignment: AssignmentDetails;
}

export default function PaymentTab({ assignment }: PaymentTabProps) {
  return (
    <ComponentCard title="Payment Information" desc="Payment details and breakdown for this assignment">
      <div className="space-y-6">
        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <DollarLineIcon className="size-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Driver Earnings</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{assignment.payment.driverEarnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <DocsIcon className="size-6 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer Charges</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{assignment.payment.customerCharges}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <BoxIcon className="size-6 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tip</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{assignment.payment.tip || "$0.00"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Base Delivery Fee</span>
              <span className="font-medium text-gray-900 dark:text-white">{assignment.payment.deliveryFee}</span>
            </div>
            
            {assignment.payment.tip && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Customer Tip</span>
                <span className="font-medium text-gray-900 dark:text-white">{assignment.payment.tip}</span>
              </div>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">Total Driver Earnings</span>
                <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                  {assignment.payment.driverEarnings}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">Total Customer Charges</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                  {assignment.payment.customerCharges}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Status</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Driver Payment</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
                Paid
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Customer Payment</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
                Paid
              </span>
            </div>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
