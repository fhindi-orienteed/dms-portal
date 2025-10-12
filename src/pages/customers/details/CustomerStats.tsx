import ComponentCard from "../../../components/common/ComponentCard";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";
import { StatsCard } from "../../../components/ui/stats";
import { BoxIcon, DollarLineIcon, CalenderIcon, PencilIcon, TrashBinIcon } from "../../../icons";

interface CustomerStatsProps {
  customer: any;
}

export default function CustomerStats({ customer }: CustomerStatsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Inactive": return "warning";
      case "Blacklisted": return "error";
      default: return "light";
    }
  };

  return (
    <ComponentCard title={customer.name} desc={`Customer since ${customer.joinDate}`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          icon={<BoxIcon className="size-6 text-brand-600 dark:text-brand-400" />}
          label="Total Orders"
          value={customer.totalOrders}
          color="primary"
        />
        <StatsCard
          icon={<DollarLineIcon className="size-6 text-success-600 dark:text-success-400" />}
          label="Total Spent"
          value={customer.totalSpent}
          color="success"
        />
        <StatsCard
          icon={<CalenderIcon className="size-6 text-purple-600 dark:text-purple-400" />}
          label="Status"
          value={<Badge color={getStatusColor(customer.status)}>{customer.status}</Badge>}
          color="purple"
        />
      </div>

      {/* Contact Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{customer.phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{customer.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">City</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{customer.city}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="primary" size="sm" startIcon={<PencilIcon className="size-4" />}>
          Edit Customer
        </Button>
        <Button variant="danger" size="sm" startIcon={<TrashBinIcon className="size-4" />}>
          Block Customer
        </Button>
      </div>
    </ComponentCard>
  );
}

