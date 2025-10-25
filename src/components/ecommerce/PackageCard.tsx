import Badge from "../ui/badge/Badge";
import { PackageSummary } from "../../types/packagesSummary";
import { 
  BoxIcon, 
  DeliveredPackage, 
  PendingPackage, 
  ReturnedPackage,
  CloseIcon,
  PaperPlaneIcon
} from "../../icons";
import { 
  formatAmount, 
  getAmountBadgeColor, 
  getStatusIconName, 
  getStatusTextColor, 
  getStatusBackgroundColor 
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
      case 'DeliveredPackage':
        return DeliveredPackage;
      case 'PendingPackage':
        return PendingPackage;
      case 'ReturnedPackage':
        return ReturnedPackage;
      case 'CloseIcon':
        return CloseIcon;
      case 'PaperPlaneIcon':
        return PaperPlaneIcon;
      default:
        return BoxIcon;
    }
  };

  return (
    <div 
      className={`
        group relative flex items-center gap-4 rounded-2xl border border-gray-200 
        bg-white p-5 transition-all duration-200 hover:shadow-lg hover:border-gray-300
        dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700
        ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Icon Container */}
      {(() => {
        const StatusIcon = getStatusIcon(code);
        const statusColor = getStatusTextColor(code);
        const statusBgColor = getStatusBackgroundColor(code);
        
        return (
          <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${statusBgColor} rounded-xl group-hover:scale-110 transition-all duration-200`}>
            <StatusIcon className={`size-8 ${statusColor} group-hover:scale-110 transition-all duration-200`} />
          </div>
        );
      })()}
      
      {/* Content Container */}
      <div className="flex-1 min-w-0">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {count}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {t('dashboard.packages')}
            </span>
          </div>
          
          <Badge 
            color={getAmountBadgeColor(collectionAmount)}
            variant="light"
            size="sm"
          >
            {formatAmount(collectionAmount)}
          </Badge>
        </div>
        
        {/* Status Display */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">
            {t('dashboard.statusLabel')}:
          </span>
          <span className={`text-sm font-semibold px-2 py-1 rounded-md ${getStatusTextColor(code)} bg-opacity-10`}>
            {t(`dashboard.status.${code}`) || code}
          </span>
        </div>
      </div>

      {/* Hover Effect Indicator */}
      {onClick && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
