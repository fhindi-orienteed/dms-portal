import { ReactNode } from "react";

interface LoaderProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"; // Loader size
  variant?: "spinner" | "dots" | "pulse" | "bars" | "skeleton"; // Loader type
  color?: "primary" | "secondary" | "white" | "gray"; // Color theme
  className?: string; // Additional CSS classes
  text?: string; // Optional loading text
  overlay?: boolean; // Show as overlay
  children?: ReactNode; // Content to show with overlay
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  variant = "spinner",
  color = "primary",
  className = "",
  text,
  overlay = false,
  children,
}) => {
  // Size Classes
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  // Color Classes
  const colorClasses = {
    primary: "text-blue-600 border-blue-600",
    secondary: "text-gray-600 border-gray-600 dark:text-gray-300 dark:border-gray-300",
    white: "text-white border-white",
    gray: "text-gray-400 border-gray-400",
  };

  // Text Size Classes
  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  // Spinner Loader
  const SpinnerLoader = () => (
    <div
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
    />
  );

  // Dots Loader
  const DotsLoader = () => {
    const dotSize = {
      xs: "w-1 h-1",
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2",
      lg: "w-2.5 h-2.5",
      xl: "w-3 h-3",
    };

    return (
      <div className="flex items-center space-x-1">
        <div
          className={`${dotSize[size]} ${colorClasses[color].split(' ')[0]} bg-current rounded-full animate-pulse`}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={`${dotSize[size]} ${colorClasses[color].split(' ')[0]} bg-current rounded-full animate-pulse`}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={`${dotSize[size]} ${colorClasses[color].split(' ')[0]} bg-current rounded-full animate-pulse`}
          style={{ animationDelay: "300ms" }}
        />
      </div>
    );
  };

  // Pulse Loader
  const PulseLoader = () => (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color].split(' ')[0]} bg-current rounded-full animate-pulse`}
    />
  );

  // Bars Loader
  const BarsLoader = () => {
    const barWidth = {
      xs: "w-0.5",
      sm: "w-0.5",
      md: "w-1",
      lg: "w-1",
      xl: "w-1.5",
    };

    const barHeight = {
      xs: "h-3",
      sm: "h-4",
      md: "h-6",
      lg: "h-8",
      xl: "h-12",
    };

    return (
      <div className="flex items-end space-x-1">
        <div
          className={`${barWidth[size]} ${barHeight[size]} ${colorClasses[color].split(' ')[0]} bg-current animate-pulse`}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={`${barWidth[size]} ${barHeight[size]} ${colorClasses[color].split(' ')[0]} bg-current animate-pulse`}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={`${barWidth[size]} ${barHeight[size]} ${colorClasses[color].split(' ')[0]} bg-current animate-pulse`}
          style={{ animationDelay: "300ms" }}
        />
        <div
          className={`${barWidth[size]} ${barHeight[size]} ${colorClasses[color].split(' ')[0]} bg-current animate-pulse`}
          style={{ animationDelay: "450ms" }}
        />
      </div>
    );
  };

  // Skeleton Loader
  const SkeletonLoader = () => {
    const skeletonHeight = {
      xs: "h-2",
      sm: "h-3",
      md: "h-4",
      lg: "h-5",
      xl: "h-6",
    };

    return (
      <div className="space-y-2 animate-pulse">
        <div className={`bg-gray-300 dark:bg-gray-600 rounded ${skeletonHeight[size]} w-full`} />
        <div className={`bg-gray-300 dark:bg-gray-600 rounded ${skeletonHeight[size]} w-3/4`} />
        <div className={`bg-gray-300 dark:bg-gray-600 rounded ${skeletonHeight[size]} w-1/2`} />
      </div>
    );
  };

  // Render appropriate loader variant
  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <DotsLoader />;
      case "pulse":
        return <PulseLoader />;
      case "bars":
        return <BarsLoader />;
      case "skeleton":
        return <SkeletonLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  // Loader content
  const loaderContent = (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      {renderLoader()}
      {text && (
        <p className={`${textSizeClasses[size]} ${colorClasses[color].split(' ')[0]} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  // If overlay is requested
  if (overlay) {
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          {loaderContent}
        </div>
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
