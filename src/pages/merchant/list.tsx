import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Merchant } from "../../types/merchant";
import { UserCircleIcon } from "../../icons"; 
import { PageMeta } from "../../components/common";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import { getStatusColor } from "../../utils/packageUtils";
import Input from "../../components/form/input/InputField";

const merchantList :Merchant[] =[
    {
        id: 1,
        merchantName:"Ali Ahmad",
        mainAddress:"Jenin",
        createdDate:"20/3/2025",
        branchCount:5002,
        userCount:7,
        status:"Delivered",
        totalPackage:17,   
    },
    {
        id: 2,
        merchantName:"khaled Ahmad",
        mainAddress:"Nablus",
        createdDate:"20/3/2025",
        branchCount:5003,
        userCount:2,
        status:"Failed Delivery",
        totalPackage:7,   
    },
    {
        id: 3,
        merchantName:"Omar ",
        mainAddress:"Nablus",
        createdDate:"20/5/2025",
        branchCount:5007,
        userCount:7,
        status:"In Transit",
        totalPackage:5,   
    },
    {
        id: 4,
        merchantName:"Othman",
        mainAddress:"Nablus",
        createdDate:"15/3/2025",
        branchCount:5009,
        userCount:7,
        status:"Pending",
        totalPackage:17,   
    }
];
export default function MerchantsList(){
    const [merchants] = useState<Merchant[]>(merchantList);
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();

    const filteredMerchants = useMemo(() => {
        return merchants.filter(merchant => {
            const matchesSearch = 
                merchant.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                merchant.mainAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                merchant.branchCount.toString().includes(searchTerm.toLowerCase());
            
            return matchesSearch;
        });
    }, [merchants, searchTerm]);

    const columns = [
        {
            header: "Merchant Name",
            accessor: (merchant: Merchant) => (
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <UserCircleIcon className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {merchant.merchantName}
                        </span>
                    </div>
                </div>
            )
        },
        {
            header: "Main Address",
            accessor: (merchant: Merchant) => (
                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                    {merchant.mainAddress}
                </span>
            )
        },
        {
            header: "Created Date",
            accessor: (merchant: Merchant) => (
                <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                    {merchant.createdDate}
                </span>
            )
        },
        {
            header: "Branch Count",
            accessor: (merchant: Merchant) => (
                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                    {merchant.branchCount}
                </span>
            )
        },
        {
            header: "User Count",
            accessor: (merchant: Merchant) => (
                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                    {merchant.userCount}
                </span>
            )
        },
        {
            header: "Status",
            accessor: (merchant: Merchant) => (
                <Badge color={getStatusColor(merchant.status)}>
                    {merchant.status}
                </Badge>
            )
        },
        {
            header: "Total Package",
            accessor: (merchant: Merchant) => (
                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                    {merchant.totalPackage}
                </span>
            )
        },
    ];
    return (
        <>
            <PageMeta 
                title={`${t('merchants.allMerchants')} | DMS Portal`} 
                description={`${t('merchants.allMerchants')} - DMS Portal`}
            />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6">All Merchants</h2>
            
            <div className="space-y-6">
                {/* Search Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex-1 max-w-md">
                            <Input
                                placeholder="Search merchants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <GenericDataTable
                    data={filteredMerchants}
                    columns={columns}
                    itemsPerPage={10}
                    showPagination={true}
                    emptyMessage="No merchants found."
                />
            </div>
        </>
    );
}