/**
 * Get the appropriate badge color for a package status
 * @param status - The package status
 * @returns The badge color string
 */
export const getStatusColor = (
  status: string | undefined
): 'primary' | 'success' | 'warning' | 'error' | 'info' | 'dark' => {
  if (!status) return 'primary';

  switch (status?.toLocaleLowerCase()) {
    case 'delivered':
      return 'success';
    case 'active':
      return 'success';
    case 'disbaled':
      return 'error';
    case 'in transit':
      return 'info';
    case 'pending':
      return 'warning';
    case 'failed delivery':
      return 'error';
    default:
      return 'primary';
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
export const getAmountBadgeColor = (amount: number): 'success' | 'warning' | 'error' => {
  if (amount >= 1000) return 'success';
  if (amount >= 500) return 'warning';
  return 'error';
};

/**
 * Get status-specific icon component name
 * @param status - The package status
 * @returns Icon component name
 */
export const getStatusIconName = (status: string): string => {
  const statusUpper = status.toUpperCase();
  
  switch (statusUpper) {
    case 'PENDING_COLLECTION':
      return 'PendingPackage';
    case 'SCHEDULED':
      return 'CalenderIcon';
    case 'IN_PROGRESS':
      return 'BoltIcon';
    case 'AT_COLLECTION':
      return 'BoxCubeIcon';
    case 'COLLECTED':
      return 'CheckCircleIcon';
    case 'MISSED':
      return 'AlertIcon';
    case 'CANCELLED':
      return 'CloseIcon';
    case 'RESCHEDULED':
      return 'TimeIcon';
    case 'FAILED':
      return 'ErrorIcon';
    case 'RETURNED':
      return 'ReturnedPackage';
    case 'DELIVERED':
      return 'DeliveredPackage';
    case 'PENDING':
    case 'NEW':
      return 'PendingPackage';
    case 'CANCELED':
      return 'CloseIcon';
    case 'SHIPPED':
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
  const statusUpper = status.toUpperCase();
  
  switch (statusUpper) {
    case 'PENDING_COLLECTION':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'SCHEDULED':
      return 'text-blue-600 dark:text-blue-400';
    case 'IN_PROGRESS':
      return 'text-indigo-600 dark:text-indigo-400';
    case 'AT_COLLECTION':
      return 'text-cyan-600 dark:text-cyan-400';
    case 'COLLECTED':
      return 'text-green-600 dark:text-green-400';
    case 'MISSED':
      return 'text-orange-600 dark:text-orange-400';
    case 'CANCELLED':
      return 'text-red-600 dark:text-red-400';
    case 'RESCHEDULED':
      return 'text-purple-600 dark:text-purple-400';
    case 'FAILED':
      return 'text-red-600 dark:text-red-400';
    case 'RETURNED':
      return 'text-orange-600 dark:text-orange-400';
    case 'DELIVERED':
      return 'text-green-600 dark:text-green-400';
    case 'PENDING':
    case 'NEW':
      return 'text-blue-600 dark:text-blue-400';
    case 'CANCELED':
      return 'text-red-600 dark:text-red-400';
    case 'SHIPPED':
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
  const statusUpper = status.toUpperCase();
  
  switch (statusUpper) {
    case 'PENDING_COLLECTION':
      return 'from-yellow-100 to-yellow-200 dark:from-yellow-500/20 dark:to-yellow-600/20';
    case 'SCHEDULED':
      return 'from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20';
    case 'IN_PROGRESS':
      return 'from-indigo-100 to-indigo-200 dark:from-indigo-500/20 dark:to-indigo-600/20';
    case 'AT_COLLECTION':
      return 'from-cyan-100 to-cyan-200 dark:from-cyan-500/20 dark:to-cyan-600/20';
    case 'COLLECTED':
      return 'from-green-100 to-green-200 dark:from-green-500/20 dark:to-green-600/20';
    case 'MISSED':
      return 'from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20';
    case 'CANCELLED':
      return 'from-red-100 to-red-200 dark:from-red-500/20 dark:to-red-600/20';
    case 'RESCHEDULED':
      return 'from-purple-100 to-purple-200 dark:from-purple-500/20 dark:to-purple-600/20';
    case 'FAILED':
      return 'from-red-100 to-red-200 dark:from-red-500/20 dark:to-red-600/20';
    case 'RETURNED':
      return 'from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20';
    case 'DELIVERED':
      return 'from-green-100 to-green-200 dark:from-green-500/20 dark:to-green-600/20';
    case 'PENDING':
    case 'NEW':
      return 'from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20';
    case 'CANCELED':
      return 'from-red-100 to-red-200 dark:from-red-500/20 dark:to-red-600/20';
    case 'SHIPPED':
      return 'from-purple-100 to-purple-200 dark:from-purple-500/20 dark:to-purple-600/20';
    default:
      return 'from-gray-100 to-gray-200 dark:from-gray-500/20 dark:to-gray-600/20';
  }
};

/**
 * Get translated status text
 * @param status - The status string from API
 * @param t - Translation function from useTranslation hook
 * @returns Translated status string
 */
export const getTranslatedStatus = (status: string, t: (key: string) => string): string => {
  // Normalize the status string (handle different formats)
  const normalizedStatus = status?.toLowerCase().replace(/\s+/g, '');

  const statusKeyMap: Record<string, string> = {
    active: 'status.active',
    inactive: 'status.inactive',
    suspended: 'status.suspended',
    pending: 'status.pending',
    intransit: 'status.inTransit',
    delivered: 'status.delivered',
    faileddelivery: 'status.failedDelivery',
    allstatus: 'status.allStatus',
  };

  const translationKey = statusKeyMap[normalizedStatus];

  // If we have a translation key, use it. Otherwise, return original status
  return translationKey ? t(translationKey) : status;
};

/**
 * Get translated role text
 * @param role - The role string from API
 * @param t - Translation function from useTranslation hook
 * @returns Translated role string
 */
export const getTranslatedRole = (role: string, t: (key: string) => string): string => {
  const normalizedRole = role?.toLowerCase();

  const roleKeyMap: Record<string, string> = {
    admin: 'merchants.users.roles.admin',
    user: 'merchants.users.roles.user',
    manager: 'merchants.users.roles.manager',
  };

  const translationKey = roleKeyMap[normalizedRole];

  return translationKey ? t(translationKey) : role;
};

/**
 * Get translated user status text
 * @param status - The status string from API
 * @param t - Translation function from useTranslation hook
 * @returns Translated status string
 */
export const getTranslatedUserStatus = (status: string, t: (key: string) => string): string => {
  const normalizedStatus = status?.toLowerCase();

  const statusKeyMap: Record<string, string> = {
    active: 'merchants.users.statuses.active',
    inactive: 'merchants.users.statuses.inactive',
  };

  const translationKey = statusKeyMap[normalizedStatus];

  return translationKey ? t(translationKey) : status;
};

/**
 * Format date according to user's locale
 * @param dateString - The date string to format
 * @param locale - The locale code (en, ar, etc.)
 * @returns Formatted date string
 */
export const formatLocalizedDate = (dateString: string, locale: string = 'en'): string => {
  if (!dateString || dateString === 'N/A') {
    return dateString;
  }

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString;
    }

    // Format date based on locale
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
};
