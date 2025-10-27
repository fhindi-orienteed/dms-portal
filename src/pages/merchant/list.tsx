import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Merchant } from "../../types/merchant";
import { SearchIcon, UserCircleIcon, FacebookIcon, TwitterIcon, LinkedinIcon, MailIcon, EnvelopeIcon } from "../../icons"; 
import { PageBreadcrumb, PageMeta } from "../../components/common";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import { getStatusColor } from "../../utils/packageUtils";
import Input from "../../components/form/input/InputField";
import { merchantService } from "../../services";

export default function MerchantsList(){
    const [merchants, setMerchants] = useState<Merchant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Fetch merchants from API
    useEffect(() => {
        const fetchMerchants = async () => {
            try {
                setLoading(true);
                const data = await merchantService.getMerchants();
                setMerchants(data);
                setError(null);
            } catch (err: unknown) {
                console.error('Failed to fetch merchants:', err);
                setError(err instanceof Error ? err.message : 'Failed to load merchants');
            } finally {
                setLoading(false);
            }
        };

        fetchMerchants();
    }, []);

    const filteredMerchants = useMemo(() => {
        return merchants.filter(merchant => {
            const matchesSearch = 
                merchant.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                merchant.mainAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                merchant.branchCount.toString().includes(searchTerm.toLowerCase()) ||
                (merchant.merchantEmail && merchant.merchantEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (merchant.merchantPhone && merchant.merchantPhone.includes(searchTerm)) ||
                (merchant.registrationNumber && merchant.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()));
            
            return matchesSearch;
        });
    }, [merchants, searchTerm]);

    const columns = [
        {
            header: "Merchant",
            accessor: (merchant: Merchant) => (
                <div className="flex items-center gap-3">
                    {merchant.merchantLogo ? (
                        <img 
                            src={merchant.merchantLogo} 
                            alt={merchant.merchantName}
                            className="w-10 h-10 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <UserCircleIcon className="size-5 text-blue-600 dark:text-blue-400" />
                        </div>
                    )}
                    <div>
                        <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {merchant.merchantName}
                        </div>
                        {merchant.registrationNumber && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Reg: {merchant.registrationNumber}
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            header: "Address",
            accessor: (merchant: Merchant) => (
                <div className="text-gray-800 text-theme-sm dark:text-white/90">
                    <div>{merchant.mainAddress}</div>
                    {(merchant.city || merchant.country) && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {[merchant.city, merchant.country].filter(Boolean).join(', ')}
                        </div>
                    )}
                </div>
            )
        },
        {
            header: "Contact",
            accessor: (merchant: Merchant) => (
                <div className="space-y-1">
                    {merchant.merchantPhone && (
                        <div className="text-gray-800 text-theme-sm dark:text-white/90">
                            {merchant.merchantPhone}
                        </div>
                    )}
                    {merchant.merchantEmail && (
                        <div className="text-gray-500 text-theme-xs dark:text-gray-400">
                            {merchant.merchantEmail}
                        </div>
                    )}
                </div>
            )
        },
        {
            header: "Social Links",
            accessor: (merchant: Merchant) => (
                <div className="flex items-center gap-2">
                    {merchant.socialLinks?.facebook && (
                        <a href={merchant.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <FacebookIcon className="size-4 text-blue-600 hover:text-blue-700" />
                        </a>
                    )}
                    {merchant.socialLinks?.twitter && (
                        <a href={merchant.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <TwitterIcon className="size-4 text-blue-400 hover:text-blue-500" />
                        </a>
                    )}
                    {merchant.socialLinks?.linkedin && (
                        <a href={merchant.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <LinkedinIcon className="size-4 text-blue-700 hover:text-blue-800" />
                        </a>
                    )}
                    {merchant.merchantEmail && (
                        <a href={`mailto:${merchant.merchantEmail}`}>
                            <MailIcon className="size-4 text-gray-600 hover:text-gray-700" />
                        </a>
                    )}
                    {!merchant.socialLinks?.facebook && !merchant.socialLinks?.twitter && !merchant.socialLinks?.linkedin && !merchant.merchantEmail && (
                        <span className="text-gray-400 text-theme-xs">-</span>
                    )}
                </div>
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
            header: "Created Date",
            accessor: (merchant: Merchant) => (
                <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                    {merchant.createdDate}
                </span>
            )
        },
        {
            header: "Branches",
            accessor: (merchant: Merchant) => (
                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                    {merchant.branchCount}
                </span>
            )
        },
        {
            header: "Users",
            accessor: (merchant: Merchant) => (
                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                    {merchant.userCount}
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
            <PageBreadcrumb pageTitle={t("merchants.allMerchants")} />
            
            <div className="space-y-6">
                {/* Search Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10" />
                            <Input
                                placeholder={t("merchants.searchPlaceholder")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600 dark:text-gray-400">
                                {t("merchants.loadingMerchants")}
                            </span>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <div className="flex items-center">
                            <EnvelopeIcon className="size-5 text-red-600 dark:text-red-400" />
                            <span className="ml-3 text-red-800 dark:text-red-200">
                                {error || t("merchants.errorLoadingMerchants")}
                            </span>
                        </div>
                    </div>
                )}

                {/* Table */}
                {!loading && !error && (
                    <GenericDataTable
                        data={filteredMerchants}
                        columns={columns}
                        itemsPerPage={10}
                        showPagination={true}
                        emptyMessage={t('merchants.noMerchantsFound')}
                        onRowClick={(merchant) => navigate(`/merchant/${merchant.id}`)}
                    />
                )}
            </div>
        </>
    );
}