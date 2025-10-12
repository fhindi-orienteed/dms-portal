import { useState } from "react";
import { PageBreadcrumb, PageMeta } from "../../components/common";
import ComponentCard from "../../components/common/ComponentCard";
import { StatsCard } from "../../components/ui/stats";
import Badge from "../../components/ui/badge/Badge";
import { UserCircleIcon, DollarLineIcon, BoxIcon, GroupIcon } from "../../icons";

interface CustomerSegment {
  id: number;
  name: string;
  description: string;
  customerCount: number;
  totalRevenue: string;
  avgOrderValue: string;
  badgeColor: "primary" | "success" | "warning" | "error" | "info" | "light" | "dark";
  statsColor: "primary" | "success" | "warning" | "error" | "info" | "purple" | "orange";
}

const segments: CustomerSegment[] = [
  {
    id: 1,
    name: "VIP Customers",
    description: "High-value customers with 50+ orders or $5000+ total spent",
    customerCount: 23,
    totalRevenue: "$125,430",
    avgOrderValue: "$245",
    badgeColor: "primary",
    statsColor: "primary"
  },
  {
    id: 2,
    name: "Regular Customers",
    description: "Active customers with 10-50 orders",
    customerCount: 156,
    totalRevenue: "$89,670",
    avgOrderValue: "$95",
    badgeColor: "success",
    statsColor: "success"
  },
  {
    id: 3,
    name: "New Customers",
    description: "Joined within last 30 days",
    customerCount: 45,
    totalRevenue: "$12,340",
    avgOrderValue: "$67",
    badgeColor: "info",
    statsColor: "info"
  },
  {
    id: 4,
    name: "At Risk",
    description: "No orders in last 60 days",
    customerCount: 34,
    totalRevenue: "$8,920",
    avgOrderValue: "$78",
    badgeColor: "warning",
    statsColor: "warning"
  },
  {
    id: 5,
    name: "Inactive",
    description: "No orders in last 90+ days",
    customerCount: 67,
    totalRevenue: "$15,670",
    avgOrderValue: "$52",
    badgeColor: "error",
    statsColor: "error"
  },
  {
    id: 6,
    name: "High Frequency",
    description: "Orders at least once per week",
    customerCount: 89,
    totalRevenue: "$234,560",
    avgOrderValue: "$156",
    badgeColor: "primary",
    statsColor: "purple"
  }
];

export default function CustomerSegment() {
  const [selectedSegment, setSelectedSegment] = useState<CustomerSegment | null>(null);

  return (
    <>
      <PageMeta 
        title="Customer Segments | DMS Portal" 
        description="Customer Segments Analysis - DMS Portal"
      />
      <PageBreadcrumb pageTitle="Customer Segments" />
      
      <div className="space-y-6">
        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segments.map((segment) => (
            <ComponentCard
              key={segment.id}
              title={segment.name}
              desc={segment.description}
            >
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <UserCircleIcon className="size-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Customers</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{segment.customerCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <DollarLineIcon className="size-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Revenue</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{segment.totalRevenue}</p>
                    </div>
                  </div>
                </div>
                
                {/* Average Order Value */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Order Value</span>
                    <Badge color={segment.badgeColor}>{segment.avgOrderValue}</Badge>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => setSelectedSegment(segment)}
                  className="w-full mt-2 py-2 px-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  View Segment Details
                </button>
              </div>
            </ComponentCard>
          ))}
        </div>

        {/* Selected Segment Details */}
        {selectedSegment && (
          <ComponentCard
            title={`${selectedSegment.name} - Detailed Analysis`}
            desc="Customer segment breakdown and insights"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                icon={<UserCircleIcon className="size-6 text-brand-600 dark:text-brand-400" />}
                label="Total Customers"
                value={selectedSegment.customerCount}
                color="primary"
              />
              <StatsCard
                icon={<DollarLineIcon className="size-6 text-success-600 dark:text-success-400" />}
                label="Total Revenue"
                value={selectedSegment.totalRevenue}
                color="success"
              />
              <StatsCard
                icon={<BoxIcon className="size-6 text-purple-600 dark:text-purple-400" />}
                label="Avg. Order Value"
                value={selectedSegment.avgOrderValue}
                color="purple"
              />
              <StatsCard
                icon={<GroupIcon className="size-6 text-orange-600 dark:text-orange-400" />}
                label="Segment"
                value={<Badge color={selectedSegment.badgeColor}>{selectedSegment.name}</Badge>}
                color="orange"
              />
            </div>
          </ComponentCard>
        )}
      </div>
    </>
  );
}

