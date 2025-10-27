import { useTranslation } from "react-i18next";
import ComponentCard from "../../../components/common/ComponentCard";
import Badge from "../../../components/ui/badge/Badge";
import { getStatusColor } from "../../../utils/packageUtils";

interface OverviewTabProps {
  merchant: any;
}

export default function OverviewTab({ merchant }: OverviewTabProps) {
  const { t } = useTranslation();

  return (
    <ComponentCard
      title={t("merchants.overview.title")}
      desc={t("merchants.overview.description")}
    >
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("merchants.overview.descriptionLabel")}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {merchant.description || t("merchants.overview.noDescription")}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("merchants.overview.registrationDate")}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {merchant.createdDate}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("merchants.overview.accountStatus")}
          </h4>
          <Badge color={getStatusColor(merchant.status)}>
            {merchant.status}
          </Badge>
        </div>
      </div>
    </ComponentCard>
  );
}

