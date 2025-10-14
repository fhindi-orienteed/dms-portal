import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { SearchIcon, UserCircleIcon } from "../../icons";
import { PageBreadcrumb, PageMeta } from "../../components/common";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Input from "../../components/form/input/InputField";
import { Badge, Rating, SuccessRate } from "../../components/ui";

interface DriverPerformance {
  id: number;
  driverName: string;
  driverId: string;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  successRate: number;
  averageDeliveryTime: string;
  customerRating: number;
  totalEarnings: string;
  status: "active" | "inactive" | "suspended";
  lastActive: string;
  region: string;
}

const mockDriverPerformance: DriverPerformance[] = [
  {
    id: 1,
    driverName: "Ahmed Hassan",
    driverId: "DRV001",
    totalDeliveries: 245,
    successfulDeliveries: 238,
    failedDeliveries: 7,
    successRate: 97.1,
    averageDeliveryTime: "28 min",
    customerRating: 4.8,
    totalEarnings: "$2,450",
    status: "active",
    lastActive: "2 hours ago",
    region: "Downtown"
  },
  {
    id: 2,
    driverName: "Mohamed Ali",
    driverId: "DRV002",
    totalDeliveries: 189,
    successfulDeliveries: 175,
    failedDeliveries: 14,
    successRate: 92.6,
    averageDeliveryTime: "32 min",
    customerRating: 4.5,
    totalEarnings: "$1,890",
    status: "active",
    lastActive: "1 hour ago",
    region: "Suburbs"
  },
  {
    id: 3,
    driverName: "Omar Khalil",
    driverId: "DRV003",
    totalDeliveries: 156,
    successfulDeliveries: 142,
    failedDeliveries: 14,
    successRate: 91.0,
    averageDeliveryTime: "35 min",
    customerRating: 4.3,
    totalEarnings: "$1,560",
    status: "active",
    lastActive: "30 min ago",
    region: "Industrial"
  },
  {
    id: 4,
    driverName: "Youssef Mahmoud",
    driverId: "DRV004",
    totalDeliveries: 98,
    successfulDeliveries: 85,
    failedDeliveries: 13,
    successRate: 86.7,
    averageDeliveryTime: "42 min",
    customerRating: 4.1,
    totalEarnings: "$980",
    status: "inactive",
    lastActive: "2 days ago",
    region: "Residential"
  },
  {
    id: 5,
    driverName: "Hassan Ibrahim",
    driverId: "DRV005",
    totalDeliveries: 67,
    successfulDeliveries: 45,
    failedDeliveries: 22,
    successRate: 67.2,
    averageDeliveryTime: "55 min",
    customerRating: 3.2,
    totalEarnings: "$670",
    status: "suspended",
    lastActive: "1 week ago",
    region: "Remote"
  }
];

const DriverPerformance = () => {
  const [drivers] = useState<DriverPerformance[]>(mockDriverPerformance);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver => {
      const matchesSearch = 
        driver.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.region.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [drivers, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "light";
      case "suspended":
        return "error";
      default:
        return "light";
    }
  };


  const columns = [
    {
      header: "Driver",
      accessor: (driver: DriverPerformance) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <UserCircleIcon className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {driver.driverName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {driver.driverId} • {driver.region}
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Deliveries",
      accessor: (driver: DriverPerformance) => (
        <div>
          <div className="text-gray-800 text-theme-sm dark:text-white/90">
            {driver.successfulDeliveries}/{driver.totalDeliveries}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {driver.failedDeliveries} failed
          </div>
        </div>
      )
    },
    {
      header: "Success Rate",
      accessor: (driver: DriverPerformance) => (
        <SuccessRate rate={driver.successRate} />
      )
    },
    {
      header: "Avg Time",
      accessor: (driver: DriverPerformance) => (
        <span className="text-gray-500 text-theme-sm dark:text-gray-400">
          {driver.averageDeliveryTime}
        </span>
      )
    },
    {
      header: "Rating",
      accessor: (driver: DriverPerformance) => (
        <Rating rating={driver.customerRating} />
      )
    },
    {
      header: "Status",
      accessor: (driver: DriverPerformance) => (
        <Badge color={getStatusColor(driver.status)}>
          {driver.status}
        </Badge>
      )
    },
    {
      header: "Earnings",
      accessor: (driver: DriverPerformance) => (
        <span className="text-gray-800 text-theme-sm dark:text-white/90">
          {driver.totalEarnings}
        </span>
      )
    }
  ];

  return (
    <>
      <PageMeta 
        title={`${t('drivers.driverPerformance')} | DMS Portal`} 
        description={`${t('drivers.driverPerformance')} - DMS Portal`}
      />
      <PageBreadcrumb pageTitle={t('drivers.driverPerformance')} />
      
      <div className="space-y-6">
        {/* Search Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10" />
              <Input
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <GenericDataTable
          data={filteredDrivers}
          columns={columns}
          itemsPerPage={10}
          showPagination={true}
          emptyMessage="No drivers found."
          onRowClick={(driver) => navigate(`/drivers/${driver.id}`)}
        />
      </div>
    </>
  );
};

export default DriverPerformance;
