import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md" | "lg"; // Button size
  variant?: "primary" | "outline" | "secondary" | "danger"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Additional CSS classes
  loading?: boolean; // Loading state
  type?: "button" | "submit" | "reset"; // Button type
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  type = "button",
}) => {
  // Loading Spinner Component using Tailwind
  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
  );

  // Size Classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm font-medium",
    md: "px-4 py-2.5 text-sm font-medium",
    lg: "px-6 py-3 text-base font-medium",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-500 disabled:opacity-70 disabled:text-white disabled:cursor-not-allowed transition-all duration-200",
    secondary:
      "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-700",
    danger:
      "bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-300 disabled:cursor-not-allowed transition-all duration-200",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        loading || disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        startIcon && <span className="flex items-center">{startIcon}</span>
      )}
      {children}
      {!loading && endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
