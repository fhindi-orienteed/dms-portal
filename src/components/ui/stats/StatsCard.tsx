import { ReactNode } from "react";

type StatsCardColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "purple"
  | "orange";

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number | ReactNode;
  color?: StatsCardColor;
}

const colorVariants = {
  primary: {
    bg: "bg-brand-50 dark:bg-brand-900/20",
    iconBg: "bg-brand-100 dark:bg-brand-900/40"
  },
  success: {
    bg: "bg-success-50 dark:bg-success-900/20",
    iconBg: "bg-success-100 dark:bg-success-900/40"
  },
  error: {
    bg: "bg-error-50 dark:bg-error-900/20",
    iconBg: "bg-error-100 dark:bg-error-900/40"
  },
  warning: {
    bg: "bg-warning-50 dark:bg-warning-900/20",
    iconBg: "bg-warning-100 dark:bg-warning-900/40"
  },
  info: {
    bg: "bg-blue-light-50 dark:bg-blue-light-900/20",
    iconBg: "bg-blue-light-100 dark:bg-blue-light-900/40"
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    iconBg: "bg-purple-100 dark:bg-purple-900/40"
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    iconBg: "bg-orange-100 dark:bg-orange-900/40"
  }
};

export default function StatsCard({ 
  icon, 
  label, 
  value, 
  color = "primary" 
}: StatsCardProps) {
  const colors = colorVariants[color];

  return (
    <div className={`flex items-center gap-4 p-4 ${colors.bg} rounded-lg`}>
      <div className={`flex items-center justify-center w-12 h-12 ${colors.iconBg} rounded-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        {typeof value === 'string' || typeof value === 'number' ? (
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        ) : (
          <div className="mt-1">{value}</div>
        )}
      </div>
    </div>
  );
}
