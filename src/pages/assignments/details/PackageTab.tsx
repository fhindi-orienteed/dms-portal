import ComponentCard from "../../../components/common/ComponentCard";
import { AssignmentDetails } from "./mockData";

interface PackageTabProps {
  assignment: AssignmentDetails;
}

export default function PackageTab({ assignment }: PackageTabProps) {
  return (
    <ComponentCard title="Package Details" desc="Detailed information about the package">
      <div className="space-y-6">
        {/* Package Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Package ID</h4>
            <p className="text-gray-600 dark:text-gray-400">{assignment.package.id}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Package Type</h4>
            <p className="text-gray-600 dark:text-gray-400">{assignment.package.packageType}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight</h4>
            <p className="text-gray-600 dark:text-gray-400">{assignment.package.weight}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dimensions</h4>
            <p className="text-gray-600 dark:text-gray-400">{assignment.package.dimensions}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Value</h4>
            <p className="text-gray-600 dark:text-gray-400">{assignment.package.value}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Special Requirements</h4>
            <div className="flex flex-wrap gap-2">
              {assignment.package.fragile && (
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs rounded-full">
                  Fragile
                </span>
              )}
              {assignment.package.requiresSignature && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded-full">
                  Signature Required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</h5>
              <p className="text-gray-600 dark:text-gray-400">{assignment.package.customerName}</p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</h5>
              <p className="text-gray-600 dark:text-gray-400">{assignment.package.customerPhone}</p>
            </div>
            <div className="md:col-span-2">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</h5>
              <p className="text-gray-600 dark:text-gray-400">{assignment.package.customerEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
