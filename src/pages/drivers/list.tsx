import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { SearchIcon, UserCircleIcon } from "../../icons"; 
import { PageBreadcrumb, PageMeta } from "../../components/common";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import { getStatusColor } from "../../utils/packageUtils";
import Input from "../../components/form/input/InputField";

interface Driver {
    id: number;
    driverName: string;
    phone: string;
    email: string;
    status: string;
    totalDeliveries: number;
}

const driverList: Driver[] = [
    { id: 1, driverName: "John Doe", phone: "123456789", email: "john@example.com", status: "Active", totalDeliveries: 15 },
    { id: 2, driverName: "Jane Smith", phone: "987654321", email: "jane@example.com", status: "Inactive", totalDeliveries: 7 },
    { id: 3, driverName: "Mike Johnson", phone: "555555555", email: "mike@example.com", status: "Active", totalDeliveries: 20 },
    { id: 4, driverName: "Alice Brown", phone: "111222333", email: "alice@example.com", status: "Pending", totalDeliveries: 5 },
];

export default function DriverList() {
    const [drivers] = useState<Driver[]>(driverList);
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();
    const navigate = useNavigate();

    const filteredDrivers = useMemo(() => {
        return drivers.filter(driver => 
            driver.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            driver.phone.includes(searchTerm) ||
            driver.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [drivers, searchTerm]);

    const handleRowClick = (driver: Driver) => {
        navigate(`/drivers/${driver.id}`);
    };

    const columns = [
        {
            header: "Driver Name",
            accessor: (driver: Driver) => (
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <UserCircleIcon className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {driver.driverName}
                    </span>
                </div>
            )
        },
        {
            header: "Phone",
            accessor: (driver: Driver) => (
                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                    {driver.phone}
                </span>
            )
        },
        {
            header: "Email",
            accessor: (driver: Driver) => (
                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                    {driver.email}
                </span>
            )
        },
        {
            header: "Status",
            accessor: (driver: Driver) => (
                <Badge color={getStatusColor(driver.status)}>
                    {driver.status}
                </Badge>
            )
        },
        {
            header: "Total Deliveries",
            accessor: (driver: Driver) => (
                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                    {driver.totalDeliveries}
                </span>
            )
        },
    ];

    return (
        <>
            <PageMeta 
                title={`${t('drivers.allDrivers')} | DMS Portal`} 
                description={`${t('drivers.allDrivers')} - DMS Portal`}
            />
            <PageBreadcrumb pageTitle="All Drivers" />

            <div className="space-y-6">
                {/* Search Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="relative max-w-md">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10" />
                        <Input
                            placeholder="Search drivers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10"
                        />
                    </div>
                </div>

                {/* Table */}
                <GenericDataTable
                    data={filteredDrivers}
                    columns={columns}
                    itemsPerPage={10}
                    showPagination={true}
                    emptyMessage="No drivers found."
                    onRowClick={handleRowClick}
                />
            </div>
        </>
    );
}