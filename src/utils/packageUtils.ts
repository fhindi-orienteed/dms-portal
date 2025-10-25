/**
 * Get the appropriate badge color for a package status
 * @param status - The package status
 * @returns The badge color string
 */
export const getStatusColor = (status: string): "primary" | "success" | "warning" | "error" | "info" | "dark" => {
  switch (status) {
    case "Delivered":
      return "success";
    case "In Transit":
      return "info";
    case "Pending":
      return "warning";
    case "Failed Delivery":
      return "error";
    default:
      return "primary";
  }
};

/**
 * Get the appropriate translation key for a package status
 * @param status - The package status
 * @returns The translation key string
 */
export const getStatusTranslationKey = (status: string): string => {
  switch (status) {
    case "In Transit":
      return "packages.status.InTransit";
    case "Failed Delivery":
      return "packages.status.FailedDelivery";
    case "Pending":
      return "packages.status.Pending";
    case "Delivered":
      return "packages.status.Delivered";
    default:
      return `packages.status.${status}`;
  }
};

/**
 * Format a date string to a localized date
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export const formatPackageDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

/**
 * Format currency amount with proper formatting
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Get badge color based on amount thresholds
 * @param amount - The amount to evaluate
 * @returns Badge color string
 */
export const getAmountBadgeColor = (amount: number): "success" | "warning" | "error" => {
  if (amount >= 1000) return "success";
  if (amount >= 500) return "warning";
  return "error";
};

/**
 * Get status-specific icon component name
 * @param status - The package status
 * @returns Icon component name
 */
export const getStatusIconName = (status: string): string => {
  const statusLower = status.toLowerCase();
  
  switch (statusLower) {
    case 'delivered':
      return 'DeliveredPackage';
    case 'pending':
    case 'new':
      return 'PendingPackage';
    case 'returned':
      return 'ReturnedPackage';
    case 'canceled':
    case 'cancelled':
      return 'CloseIcon';
    case 'shipped':
      return 'PaperPlaneIcon';
    default:
      return 'BoxIcon';
  }
};

/**
 * Get status-specific text color classes
 * @param status - The package status
 * @returns CSS color classes
 */
export const getStatusTextColor = (status: string): string => {
  const statusLower = status.toLowerCase();
  
  switch (statusLower) {
    case 'delivered':
      return 'text-green-600 dark:text-green-400';
    case 'pending':
    case 'new':
      return 'text-blue-600 dark:text-blue-400';
    case 'returned':
      return 'text-orange-600 dark:text-orange-400';
    case 'canceled':
    case 'cancelled':
      return 'text-red-600 dark:text-red-400';
    case 'shipped':
      return 'text-purple-600 dark:text-purple-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

/**
 * Get status-specific background gradient classes
 * @param status - The package status
 * @returns CSS background gradient classes
 */
export const getStatusBackgroundColor = (status: string): string => {
  const statusLower = status.toLowerCase();
  
  switch (statusLower) {
    case 'delivered':
      return 'from-green-100 to-green-200 dark:from-green-500/20 dark:to-green-600/20';
    case 'pending':
    case 'new':
      return 'from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20';
    case 'returned':
      return 'from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20';
    case 'canceled':
    case 'cancelled':
      return 'from-red-100 to-red-200 dark:from-red-500/20 dark:to-red-600/20';
    case 'shipped':
      return 'from-purple-100 to-purple-200 dark:from-purple-500/20 dark:to-purple-600/20';
    default:
      return 'from-gray-100 to-gray-200 dark:from-gray-500/20 dark:to-gray-600/20';
  }
};