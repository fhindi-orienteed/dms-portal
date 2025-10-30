import { useTranslation } from "react-i18next";
import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Badge from "../../../components/ui/badge/Badge";
import { getStatusColor, getTranslatedStatus, formatLocalizedDate } from "../../../utils/packageUtils";

interface PackagesTabProps {
  packages: any[];
}

export default function PackagesTab({ packages }: PackagesTabProps) {
  const { t, i18n } = useTranslation();

  const columns = [
    {
      header: t("merchants.packages.trackingNumber"),
      accessor: (pkg: any) => (
        <span className="font-medium text-blue-600 dark:text-blue-400">{pkg.trackingNumber}</span>
      )
    },
    {
      header: t("merchants.packages.recipient"),
      accessor: (pkg: any) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">{pkg.recipient}</span>
      )
    },
    {
      header: t("merchants.packages.destination"),
      accessor: (pkg: any) => (
        <span className="text-gray-600 dark:text-gray-400">{pkg.destination}</span>
      )
    },
    {
      header: t("merchants.packages.status"),
      accessor: (pkg: any) => (
        <Badge color={getStatusColor(pkg.status)}>{getTranslatedStatus(pkg.status, t)}</Badge>
      )
    },
    {
      header: t("merchants.packages.date"),
      accessor: (pkg: any) => (
        <span className="text-gray-500 text-theme-sm dark:text-gray-400">{formatLocalizedDate(pkg.date, i18n.language)}</span>
      )
    }
  ];

  return (
    <GenericDataTable
      data={packages}
      columns={columns}
      itemsPerPage={10}
      showPagination={true}
      emptyMessage={t('merchants.packages.noPackages')}
    />
  );
}

