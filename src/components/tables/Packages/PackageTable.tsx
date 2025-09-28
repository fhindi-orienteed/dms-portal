import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Package } from "../../../types/packages";
import { useTranslation } from "react-i18next";
import { getStatusColor, getStatusTranslationKey, formatPackageDate } from "../../../utils/packageUtils";

interface PackageTableProps {
  packages: Package[];
  onPackageClick?: (pkg: Package) => void;
}

export default function PackageTable({ packages, onPackageClick }: PackageTableProps) {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {t("packages.trackingNumber")}
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {t("packages.recipient")}
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {t("packages.packageDetails")}
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {t("packages.carrier")}
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {t("status")}
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                {t("packages.createdDate")}
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {packages.map((pkg) => (
              <TableRow 
                key={pkg.id} 
                className={onPackageClick ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50" : ""}
              >
                <TableCell 
                  className="px-5 py-4 sm:px-6 text-start"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {pkg.trackingNumber}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {pkg.packageDetails.category}
                      </span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="px-4 py-3 text-start">
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {pkg.recipient.name}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {pkg.recipient.city}, {pkg.recipient.country}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="px-4 py-3 text-start">
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {pkg.packageDetails.description}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {pkg.packageDetails.weight} • {pkg.packageDetails.value}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {pkg.shippingInfo.carrier}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {pkg.shippingInfo.service}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="px-4 py-3 text-start">
                  <Badge
                    size="sm"
                    color={getStatusColor(pkg.status)}
                  >
                    {t(getStatusTranslationKey(pkg.status))}
                  </Badge>
                </TableCell>
                
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatPackageDate(pkg.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
