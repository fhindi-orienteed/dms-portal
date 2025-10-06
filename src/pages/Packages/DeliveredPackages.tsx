import { useState, useMemo } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import SearchFilter from "../../components/searchFilter/searchFilter";
import { Package } from "../../types/packages";

const mockPackages: Package[] = [
  {
    id: 1,
    trackingNumber: "PKG001234567",
    recipient: {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      phone: "+970 59 123 4567",
      address: "Al-Masri Street, Building 15",
      city: "Ramallah",
      country: "Palestine",
    },
    sender: {
      name: "TechStore Ramallah",
      email: "orders@techstore.ps",
      phone: "+970 2 295 1234",
    },
    packageDetails: {
      description: "iPhone 15 Pro Max 256GB",
      weight: "0.5 kg",
      dimensions: "20x15x8 cm",
      value: "₪4,500 NIS",
      category: "Electronics",
    },
    status: "Delivered",
    timeline: [
      {
        status: "Delivered",
        location: "Ramallah, Palestine",
        timestamp: "2024-01-15T14:30:00Z",
        description: "Package delivered to recipient",
      },
      {
        status: "In Transit",
        location: "Ramallah Distribution Center",
        timestamp: "2024-01-15T10:00:00Z",
        description: "Out for delivery",
      },
      {
        status: "In Transit",
        location: "Jerusalem Hub",
        timestamp: "2024-01-14T16:45:00Z",
        description: "Package in transit",
      },
      {
        status: "Pending",
        location: "TechStore Ramallah",
        timestamp: "2024-01-13T09:00:00Z",
        description: "Package picked up",
      },
    ],
    shippingInfo: {
      service: "Express Delivery",
      carrier: "PalPost Express",
      estimatedDelivery: "2024-01-15",
      actualDelivery: "2024-01-15",
    },
    createdAt: "2024-01-13T09:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
];

export default function DeliveredPackages() {
  const [packages] = useState<Package[]>(mockPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<
    { key: string; label: string; value: string }[]
  >([]);

  function handleSearch(term: string) {
    setSearchTerm(term);
  }

  function handleFilterChange(key: string, value: string | null) {
    if (value === null) {
      setFilters((prev) => prev.filter((f) => f.key !== key));
    } else {
      setFilters((prev) => {
        const existing = prev.find((f) => f.key === key);
        if (existing) {
          return prev.map((f) => (f.key === key ? { ...f, value } : f));
        }
        return [...prev, { key, label: key, value }];
      });
    }
  }

  function handleClearFilters() {
    setFilters([]);
  }

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesSearch =
        pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters = filters.every((f) => {
        if (f.key === "status") return f.value === "" || pkg.status === f.value;
        if (f.key === "carrier")
          return f.value === "" || pkg.shippingInfo.carrier === f.value;
        if (f.key === "city")
          return f.value === "" || pkg.recipient.city === f.value;
        return true;
      });

      return matchesSearch && matchesFilters;
    });
  }, [packages, searchTerm, filters]);

  return (
    <>
      <PageMeta
        title="Delivered Packages | TailAdmin"
        description="Delivered Packages Dashboard"
      />
      <PageBreadcrumb pageTitle="Delivered" />

      <div className="space-y-6 p-4">
        <SearchFilter
          onSearch={handleSearch}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Active filters info */}
        <div className="mt-4 space-y-2">
          {searchTerm && <p>Searching for: {searchTerm}</p>}
          {filters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <span
                  key={filter.key}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center space-x-1"
                >
                  <span>
                    {filter.label}: {filter.value}
                  </span>
                  <button
                    onClick={() => handleFilterChange(filter.key, null)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={handleClearFilters}
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Package Cards */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          {filteredPackages.length === 0 ? (
            <p>No packages found.</p>
          ) : (
            filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                {/* Icon + Tracking */}
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7h18M3 7l1 14h16l1-14M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">{pkg.trackingNumber}</p>
                    <p className="text-gray-500 text-sm">
                      {pkg.packageDetails.category}
                    </p>
                  </div>
                </div>

                {/* Recipient */}
                <div className="mt-2 md:mt-0">
                  <p className="font-semibold">{pkg.recipient.name}</p>
                  <p className="text-gray-500 text-sm">
                    {pkg.recipient.city}, {pkg.recipient.country}
                  </p>
                </div>

                {/* Package Details */}
                <div className="mt-2 md:mt-0 text-gray-700 text-sm">
                  <p>{pkg.packageDetails.description}</p>
                  <p>
                    {pkg.packageDetails.weight} • {pkg.packageDetails.value}
                  </p>
                </div>

                {/* Carrier */}
                <div className="mt-2 md:mt-0">
                  <p className="font-semibold">{pkg.shippingInfo.carrier}</p>
                  <p className="text-gray-500 text-sm">
                    {pkg.shippingInfo.service}
                  </p>
                </div>

                {/* Status */}
                <div className="mt-2 md:mt-0">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-600">
                    {pkg.status}
                  </span>
                </div>

                {/* Created Date */}
                <div className="mt-2 md:mt-0 text-gray-500 text-sm">
                  {new Date(pkg.createdAt).toLocaleDateString("en-GB")}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
