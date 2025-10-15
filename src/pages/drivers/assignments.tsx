import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { SearchIcon, UserCircleIcon } from "../../icons";
import { PageBreadcrumb, PageMeta } from "../../components/common";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";

interface DriverAssignment {
  id: number;
  assignmentId: string;
  driverName: string;
  driverId: string;
  packageId: string;
  customerName: string;
  pickupAddress: string;
  deliveryAddress: string;
  assignedDate: string;
  scheduledDate: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  notes?: string;
}

const mockDriverAssignments: DriverAssignment[] = [
  {
    id: 1,
    assignmentId: "ASG001",
    driverName: "Ahmed Hassan",
    driverId: "DRV001",
    packageId: "PKG12345",
    customerName: "Sarah Johnson",
    pickupAddress: "123 Main St, Downtown",
    deliveryAddress: "456 Oak Ave, Suburbs",
    assignedDate: "2024-01-15 09:00",
    scheduledDate: "2024-01-15 14:00",
    status: "in_progress",
    priority: "high",
    estimatedDeliveryTime: "30 min",
    actualDeliveryTime: undefined,
    notes: "Fragile package - handle with care"
  },
  {
    id: 2,
    assignmentId: "ASG002",
    driverName: "Mohamed Ali",
    driverId: "DRV002",
    packageId: "PKG12346",
    customerName: "Mike Chen",
    pickupAddress: "789 Business Blvd, Industrial",
    deliveryAddress: "321 Residential Rd, Suburbs",
    assignedDate: "2024-01-15 10:30",
    scheduledDate: "2024-01-15 16:00",
    status: "pending",
    priority: "medium",
    estimatedDeliveryTime: "45 min",
    actualDeliveryTime: undefined,
    notes: "Customer prefers evening delivery"
  },
  {
    id: 3,
    assignmentId: "ASG003",
    driverName: "Omar Khalil",
    driverId: "DRV003",
    packageId: "PKG12347",
    customerName: "Emily Davis",
    pickupAddress: "555 Warehouse St, Industrial",
    deliveryAddress: "777 Home St, Residential",
    assignedDate: "2024-01-15 08:00",
    scheduledDate: "2024-01-15 12:00",
    status: "completed",
    priority: "low",
    estimatedDeliveryTime: "25 min",
    actualDeliveryTime: "2024-01-15 12:15",
    notes: "Delivered successfully"
  },
  {
    id: 4,
    assignmentId: "ASG004",
    driverName: "Youssef Mahmoud",
    driverId: "DRV004",
    packageId: "PKG12348",
    customerName: "David Wilson",
    pickupAddress: "999 Factory Ave, Industrial",
    deliveryAddress: "111 Apartment Complex, Downtown",
    assignedDate: "2024-01-15 11:00",
    scheduledDate: "2024-01-15 15:30",
    status: "cancelled",
    priority: "urgent",
    estimatedDeliveryTime: "35 min",
    actualDeliveryTime: undefined,
    notes: "Customer cancelled - package returned to warehouse"
  },
  {
    id: 5,
    assignmentId: "ASG005",
    driverName: "Hassan Ibrahim",
    driverId: "DRV005",
    packageId: "PKG12349",
    customerName: "Lisa Brown",
    pickupAddress: "222 Distribution Center, Industrial",
    deliveryAddress: "333 House St, Remote",
    assignedDate: "2024-01-15 07:30",
    scheduledDate: "2024-01-15 18:00",
    status: "pending",
    priority: "medium",
    estimatedDeliveryTime: "60 min",
    actualDeliveryTime: undefined,
    notes: "Remote location - allow extra time"
  }
];

const DriverAssignments = () => {
  const [assignments] = useState<DriverAssignment[]>(mockDriverAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const matchesSearch = 
        assignment.assignmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.packageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [assignments, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in_progress":
        return "info";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "light";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "error";
      case "high":
        return "warning";
      case "medium":
        return "info";
      case "low":
        return "success";
      default:
        return "light";
    }
  };

  const columns = [
    {
      header: "Assignment",
      accessor: (assignment: DriverAssignment) => (
        <div>
          <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
            {assignment.assignmentId}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      header: "Driver",
      accessor: (assignment: DriverAssignment) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <UserCircleIcon className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {assignment.driverName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {assignment.driverId}
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Package",
      accessor: (assignment: DriverAssignment) => (
        <div>
          <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
            {assignment.packageId}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {assignment.estimatedDeliveryTime}
          </div>
        </div>
      )
    },
    {
      header: "Customer",
      accessor: (assignment: DriverAssignment) => (
        <div>
          <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
            {assignment.customerName}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 max-w-32 truncate">
            {assignment.deliveryAddress}
          </div>
        </div>
      )
    },
    {
      header: "Scheduled Time",
      accessor: (assignment: DriverAssignment) => (
        <div>
          <div className="text-gray-800 text-theme-sm dark:text-white/90">
            {new Date(assignment.scheduledDate).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(assignment.scheduledDate).toLocaleTimeString()}
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (assignment: DriverAssignment) => (
        <Badge color={getStatusColor(assignment.status)}>
          {assignment.status.replace('_', ' ')}
        </Badge>
      )
    },
    {
      header: "Priority",
      accessor: (assignment: DriverAssignment) => (
        <Badge color={getPriorityColor(assignment.priority)}>
          {assignment.priority}
        </Badge>
      )
    }
  ];

  return (
    <>
      <PageMeta 
        title={`${t('drivers.driverAssignments')} | DMS Portal`} 
        description={`${t('drivers.driverAssignments')} - DMS Portal`}
      />
      <PageBreadcrumb pageTitle={t('drivers.driverAssignments')} />
      
      <div className="space-y-6">
        {/* Search Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <GenericDataTable
          data={filteredAssignments}
          columns={columns}
          itemsPerPage={10}
          showPagination={true}
          emptyMessage="No assignments found."
          onRowClick={(assignment) => navigate(`/assignments/${assignment.id}`)}
        />
      </div>
    </>
  );
};

export default DriverAssignments;
