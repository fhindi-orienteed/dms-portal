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
