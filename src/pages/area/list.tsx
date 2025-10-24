import { useState, useMemo, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Area, AreaFilters } from "../../types/area";
import { SearchIcon, GridIcon, PlusIcon, PencilIcon, TrashBinIcon } from "../../icons"; 
import { PageBreadcrumb, PageMeta } from "../../components/common";
import GenericDataTable from "../../components/tables/DataTables/GenericDataTable";
import Badge from "../../components/ui/badge/Badge";
import { getStatusColor } from "../../utils/packageUtils";
import Input from "../../components/form/input/InputField";
import { Button } from "../../components/ui";
import Select from "../../components/form/Select";
import { areaService } from "../../services";
import toast from "react-hot-toast";

export default function AreasList() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [countries, setCountries] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingArea, setEditingArea] = useState<Area | null>(null);
    
    const { t } = useTranslation();
    const navigate = useNavigate();

    const fetchAreas = useCallback(async () => {
        try {
            setLoading(true);
            const filters: AreaFilters = {
                country: selectedCountry || undefined,
                city: selectedCity || undefined,
                status: selectedStatus as 'Active' | 'Inactive' || undefined,
                search: searchTerm || undefined
            };
            const data = await areaService.getAreas(filters);
            setAreas(data);
            setError(null);
        } catch (err: unknown) {
            console.error('Failed to fetch areas:', err);
            setError(err instanceof Error ? err.message : 'Failed to load areas');
        } finally {
            setLoading(false);
        }
    }, [selectedCountry, selectedCity, selectedStatus, searchTerm]);

    // Fetch areas and countries on component mount
    useEffect(() => {
        fetchAreas();
        fetchCountries();
    }, [fetchAreas]);

    // Fetch cities when country changes
    useEffect(() => {
        if (selectedCountry) {
            fetchCities(selectedCountry);
        } else {
            setCities([]);
            setSelectedCity("");
        }
    }, [selectedCountry]);

    const fetchCountries = async () => {
        try {
            const data = await areaService.getCountries();
            setCountries(data);
        } catch (err) {
            console.error('Failed to fetch countries:', err);
        }
    };

    const fetchCities = async (country: string) => {
        try {
            const data = await areaService.getCitiesByCountry(country);
            setCities(data);
        } catch (err) {
            console.error('Failed to fetch cities:', err);
        }
    };

    // Refetch areas when filters change
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchAreas();
        }, 300); // Debounce search

        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedCountry, selectedCity, selectedStatus, fetchAreas]);

    const handleDeleteArea = async (area: Area) => {
        if (window.confirm(t('area.confirmDelete'))) {
            try {
                await areaService.deleteArea(area.id);
                toast.success(t('area.areaDeleted'));
                fetchAreas();
            } catch (err) {
                toast.error(t('area.failedToDelete'));
                console.error('Delete error:', err);
            }
        }
    };

    const handleEditArea = (area: Area) => {
        setEditingArea(area);
        setShowEditModal(true);
    };

    const filteredAreas = useMemo(() => {
        return areas.filter(area => {
            const matchesSearch = searchTerm === "" || 
                area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                area.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                area.postalCode?.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesSearch;
        });
    }, [areas, searchTerm]);

    // Filter options for dropdowns
    const countryOptions = [
        { label: t('area.allCountries'), value: "" },
        ...countries.map(country => ({ label: country, value: country }))
    ];

    const cityOptions = [
        { label: t('area.allCities'), value: "" },
        ...cities.map(city => ({ label: city, value: city }))
    ];

    const statusOptions = [
        { label: t('area.allStatus'), value: "" },
        { label: t('area.active'), value: "Active" },
        { label: t('area.inactive'), value: "Inactive" }
    ];

    const columns = [
        {
            header: "Area",
            accessor: (area: Area) => (
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <GridIcon className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {area.name}
                        </div>
                        {area.postalCode && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Postal: {area.postalCode}
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            header: "Location",
            accessor: (area: Area) => (
                <div className="text-gray-800 text-theme-sm dark:text-white/90">
                    <div className="font-medium">{area.city}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {area.country}
                    </div>
                </div>
            )
        },
        {
            header: "Description",
            accessor: (area: Area) => (
                <div className="text-gray-600 text-theme-sm dark:text-gray-300 max-w-xs">
                    {area.description ? (
                        <span className="line-clamp-2">{area.description}</span>
                    ) : (
                        <span className="text-gray-400 italic">No description</span>
                    )}
                </div>
            )
        },
        {
            header: "Coordinates",
            accessor: (area: Area) => (
                <div className="text-gray-600 text-theme-xs dark:text-gray-400">
                    {area.coordinates ? (
                        <div>
                            <div>Lat: {area.coordinates.latitude.toFixed(4)}</div>
                            <div>Lng: {area.coordinates.longitude.toFixed(4)}</div>
                        </div>
                    ) : (
                        <span className="text-gray-400 italic">Not set</span>
                    )}
                </div>
            )
        },
        {
            header: "Status",
            accessor: (area: Area) => (
                <Badge color={getStatusColor(area.status)}>
                    {area.status}
                </Badge>
            )
        },
        {
            header: "Created Date",
            accessor: (area: Area) => (
                <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                    {area.createdDate}
                </span>
            )
        },
        {
            header: "Actions",
            accessor: (area: Area) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditArea(area)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                        <PencilIcon className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteArea(area)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <TrashBinIcon className="size-4" />
                    </Button>
                </div>
            )
        },
    ];

    return (
        <>
            <PageMeta 
                title={`${t('area.areaList')} | DMS Portal`} 
                description={`${t('area.areaList')} - DMS Portal`}
            />
            <PageBreadcrumb pageTitle={t('area.areaManagement')} />
            
            <div className="space-y-6">
                {/* Search and Filter Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10" />
                            <Input
                                placeholder={t('area.searchAreas')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10"
                            />
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            <Select
                                options={countryOptions}
                                defaultValue={selectedCountry}
                                onChange={setSelectedCountry}
                                placeholder={t('area.country')}
                                className="min-w-[150px]"
                            />
                            
                            <Select
                                options={cityOptions}
                                defaultValue={selectedCity}
                                onChange={setSelectedCity}
                                placeholder={t('area.city')}
                                className="min-w-[150px]"
                            />
                            
                            <Select
                                options={statusOptions}
                                defaultValue={selectedStatus}
                                onChange={setSelectedStatus}
                                placeholder={t('area.status')}
                                className="min-w-[150px]"
                            />
                            
                            <Button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2"
                            >
                                <PlusIcon className="size-4" />
                                {t('area.addArea')}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600 dark:text-gray-400">{t('area.loadingAreas')}</span>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <div className="flex items-center">
                            <GridIcon className="size-5 text-red-600 dark:text-red-400" />
                            <span className="ml-3 text-red-800 dark:text-red-200">{error}</span>
                        </div>
                    </div>
                )}

                {/* Table */}
                {!loading && !error && (
                    <GenericDataTable
                        data={filteredAreas}
                        columns={columns}
                        itemsPerPage={10}
                        showPagination={true}
                        emptyMessage={t('area.noAreasFound')}
                        onRowClick={(area) => navigate(`/area/${area.id}`)}
                    />
                )}
            </div>

            {/* TODO: Add modals for Add/Edit functionality */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">{t('area.addArea')}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Add Area modal will be implemented in the next phase.</p>
                        <Button 
                            onClick={() => setShowAddModal(false)}
                            className="mt-4"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}

            {showEditModal && editingArea && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">{t('area.editArea')}: {editingArea.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Edit Area modal will be implemented in the next phase.</p>
                        <Button 
                            onClick={() => {
                                setShowEditModal(false);
                                setEditingArea(null);
                            }}
                            className="mt-4"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
