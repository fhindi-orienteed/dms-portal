import { ReactNode } from "react";

interface LoaderProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"; // Loader size
  variant?: "spinner" | "dots" | "pulse" | "bars" | "skeleton" | "modern"; // Loader type
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

  // Modern Loader - Sleek design similar to attachment
  const ModernLoader = () => {
    const containerSize = {
      xs: "w-8 h-8",
      sm: "w-10 h-10",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-20 h-20",
    };

    const ringSize = {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-14 h-14",
      xl: "w-18 h-18",
    };

    const borderWidth = {
      xs: "border-[1.5px]",
      sm: "border-2",
      md: "border-[2.5px]",
      lg: "border-[3px]",
      xl: "border-4",
    };

    const getColorValue = () => {
      switch (color) {
        case 'primary': return '#3b82f6';
        case 'secondary': return '#6b7280';
        case 'white': return '#ffffff';
        case 'gray': return '#9ca3af';
        default: return '#3b82f6';
      }
    };

    return (
      <div className={`relative ${containerSize[size]} flex items-center justify-center`}>
        {/* Background ring */}
        <div
          className={`absolute ${ringSize[size]} ${borderWidth[size]} border-gray-200/40 dark:border-gray-700/40 rounded-full`}
        />
        
        {/* Animated gradient ring */}
        <div
          className={`absolute ${ringSize[size]} ${borderWidth[size]} border-transparent rounded-full`}
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${getColorValue()} 90deg, transparent 180deg)`,
            borderRadius: '50%',
            animation: 'spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />
        
        {/* Inner glow effect */}
        <div
          className={`absolute w-2 h-2 rounded-full opacity-80`}
          style={{
            backgroundColor: getColorValue(),
            boxShadow: `0 0 8px ${getColorValue()}40`,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
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
      case "modern":
        return <ModernLoader />;
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
