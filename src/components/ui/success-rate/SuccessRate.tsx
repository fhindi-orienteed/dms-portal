interface SuccessRateProps {
  rate: number;
  showPercentage?: boolean;
  showProgressBar?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SuccessRate: React.FC<SuccessRateProps> = ({
  rate,
  showPercentage = true,
  showProgressBar = true,
  size = "md",
  className = ""
}) => {
  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "md":
        return "text-sm";
      case "lg":
        return "text-base";
      default:
        return "text-sm";
    }
  };

  const getProgressBarSize = () => {
    switch (size) {
      case "sm":
        return "h-1.5";
      case "md":
        return "h-2";
      case "lg":
        return "h-3";
      default:
        return "h-2";
    }
  };

  const getProgressBarWidth = () => {
    switch (size) {
      case "sm":
        return "w-12";
      case "md":
        return "w-16";
      case "lg":
        return "w-20";
      default:
        return "w-16";
    }
  };

  const getRateColor = () => {
    if (rate >= 95) return "green";
    if (rate >= 85) return "yellow";
    return "red";
  };

  const getProgressBarColor = () => {
    const color = getRateColor();
    switch (color) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressBarBgColor = () => {
    const color = getRateColor();
    switch (color) {
      case "green":
        return "bg-green-200 dark:bg-green-900/20";
      case "yellow":
        return "bg-yellow-200 dark:bg-yellow-900/20";
      case "red":
        return "bg-red-200 dark:bg-red-900/20";
      default:
        return "bg-gray-200 dark:bg-gray-700";
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showPercentage && (
        <div className={`text-gray-800 dark:text-white/90 ${getTextSize()}`}>
          {rate.toFixed(1)}%
        </div>
      )}
      {showProgressBar && (
        <div className={`${getProgressBarWidth()} ${getProgressBarSize()} rounded-full ${getProgressBarBgColor()}`}>
          <div 
            className={`h-full rounded-full ${getProgressBarColor()}`}
            style={{ width: `${Math.min(rate, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default SuccessRate;
