import Badge from "../ui/badge/Badge";
import { PackageSummary } from "../../types/packagesSummary";
import { 
  BoxIcon, 
  DeliveredPackage, 
  PendingPackage, 
  ReturnedPackage,
  CloseIcon,
  PaperPlaneIcon,
  CalenderIcon,
  BoltIcon,
  BoxCubeIcon,
  CheckCircleIcon,
  AlertIcon,
  TimeIcon,
  ErrorIcon
} from "../../icons";
import { 
  formatAmount, 
  getAmountBadgeColor, 
  getStatusIconName
} from "../../utils/packageUtils";
import { useTranslation } from "../../hooks/useTranslation";

interface PackageCardProps extends PackageSummary {
  className?: string;
  onClick?: () => void;
}

export default function PackageCard({ 
  code, 
  collectionAmount, 
  count,
  className = "",
  onClick
}: PackageCardProps) {
  const { t } = useTranslation();
  const getStatusIcon = (status: string) => {
    const iconName = getStatusIconName(status);
    
    switch (iconName) {
      case 'PendingPackage':
        return PendingPackage;
      case 'CalenderIcon':
        return CalenderIcon;
      case 'BoltIcon':
        return BoltIcon;
      case 'BoxCubeIcon':
        return BoxCubeIcon;
      case 'CheckCircleIcon':
        return CheckCircleIcon;
      case 'AlertIcon':
        return AlertIcon;
      case 'CloseIcon':
        return CloseIcon;
      case 'TimeIcon':
        return TimeIcon;
      case 'ErrorIcon':
        return ErrorIcon;
      case 'ReturnedPackage':
        return ReturnedPackage;
      // Legacy icons
      case 'DeliveredPackage':
        return DeliveredPackage;
      case 'PaperPlaneIcon':
        return PaperPlaneIcon;
      default:
        return BoxIcon;
    }
  };

  const StatusIcon = getStatusIcon(code);

  return (
    <article 
      className={`
        flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-4
        dark:border-gray-800 dark:bg-white/3
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-sm' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90 flex-shrink-0">
        <StatusIcon className="h-7 w-7" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-1">
          {count}
        </h3>
        <p className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          {t(`dashboard.status.${code}`) || code}
          <Badge 
            color={getAmountBadgeColor(collectionAmount)}
            variant="light"
            size="sm"
          >
            {formatAmount(collectionAmount)}
          </Badge>
        </p>
      </div>
    </article>
  );
}
