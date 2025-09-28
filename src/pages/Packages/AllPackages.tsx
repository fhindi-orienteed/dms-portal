import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PackageTable from "../../components/tables/Packages/PackageTable";
import Input from "../../components/form/input/InputField";
import { SearchIcon } from "../../icons";
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
      country: "Palestine"
    },
    sender: {
      name: "TechStore Ramallah",
      email: "orders@techstore.ps",
      phone: "+970 2 295 1234"
    },
    packageDetails: {
      description: "iPhone 15 Pro Max 256GB",
      weight: "0.5 kg",
      dimensions: "20x15x8 cm",
      value: "₪4,500 NIS",
      category: "Electronics"
    },
    status: "Delivered",
    timeline: [
      {
        status: "Delivered",
        location: "Ramallah, Palestine",
        timestamp: "2024-01-15T14:30:00Z",
        description: "Package delivered to recipient"
      },
      {
        status: "In Transit",
        location: "Ramallah Distribution Center",
        timestamp: "2024-01-15T10:00:00Z",
        description: "Out for delivery"
      },
      {
        status: "In Transit",
        location: "Jerusalem Hub",
        timestamp: "2024-01-14T16:45:00Z",
        description: "Package in transit"
      },
      {
        status: "Pending",
        location: "TechStore Ramallah",
        timestamp: "2024-01-13T09:00:00Z",
        description: "Package picked up"
      }
    ],
    shippingInfo: {
      service: "Express Delivery",
      carrier: "PalPost Express",
      estimatedDelivery: "2024-01-15",
      actualDelivery: "2024-01-15"
    },
    createdAt: "2024-01-13T09:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z"
  },
  {
    id: 2,
    trackingNumber: "PKG001234568",
    recipient: {
      name: "Fatima Al-Zahra",
      email: "fatima.zahra@email.com",
      phone: "+970 59 987 6543",
      address: "Nablus Old City, Quarter 3",
      city: "Nablus",
      country: "Palestine"
    },
    sender: {
      name: "Fashion Hub Gaza",
      email: "orders@fashionhub.ps",
      phone: "+970 8 123 4567"
    },
    packageDetails: {
      description: "Designer Handbag - Leather",
      weight: "1.2 kg",
      dimensions: "35x25x15 cm",
      value: "₪850 NIS",
      category: "Fashion"
    },
    status: "In Transit",
    timeline: [
      {
        status: "In Transit",
        location: "Nablus Distribution Center",
        timestamp: "2024-01-16T08:00:00Z",
        description: "Package arrived at local facility"
      },
      {
        status: "In Transit",
        location: "Jerusalem Hub",
        timestamp: "2024-01-15T20:30:00Z",
        description: "Package in transit"
      },
      {
        status: "Pending",
        location: "Fashion Hub Gaza",
        timestamp: "2024-01-14T11:00:00Z",
        description: "Package picked up"
      }
    ],
    shippingInfo: {
      service: "Standard Delivery",
      carrier: "PalPost Standard",
      estimatedDelivery: "2024-01-17"
    },
    createdAt: "2024-01-14T11:00:00Z",
    updatedAt: "2024-01-16T08:00:00Z"
  },
  {
    id: 3,
    trackingNumber: "PKG001234569",
    recipient: {
      name: "Omar Khalil",
      email: "omar.khalil@email.com",
      phone: "+970 59 555 1234",
      address: "Hebron Industrial Zone",
      city: "Hebron",
      country: "Palestine"
    },
    sender: {
      name: "BookWorld Bethlehem",
      email: "orders@bookworld.ps",
      phone: "+970 2 276 5432"
    },
    packageDetails: {
      description: "Educational Books Set - 12 Books",
      weight: "3.5 kg",
      dimensions: "40x30x20 cm",
      value: "₪320 NIS",
      category: "Books"
    },
    status: "Pending",
    timeline: [
      {
        status: "Pending",
        location: "BookWorld Bethlehem",
        timestamp: "2024-01-16T10:00:00Z",
        description: "Package ready for pickup"
      }
    ],
    shippingInfo: {
      service: "Economy Delivery",
      carrier: "PalPost Economy",
      estimatedDelivery: "2024-01-18"
    },
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z"
  },
  {
    id: 4,
    trackingNumber: "PKG001234570",
    recipient: {
      name: "Layla Mansour",
      email: "layla.mansour@email.com",
      phone: "+970 59 777 8888",
      address: "Jenin City Center",
      city: "Jenin",
      country: "Palestine"
    },
    sender: {
      name: "HealthPlus Pharmacy",
      email: "orders@healthplus.ps",
      phone: "+970 4 234 5678"
    },
    packageDetails: {
      description: "Medical Supplies - Prescription Package",
      weight: "0.8 kg",
      dimensions: "25x15x10 cm",
      value: "₪180 NIS",
      category: "Medical"
    },
    status: "Failed Delivery",
    timeline: [
      {
        status: "Failed Delivery",
        location: "Jenin City Center",
        timestamp: "2024-01-15T16:00:00Z",
        description: "Recipient not available - delivery attempt failed"
      },
      {
        status: "In Transit",
        location: "Jenin Distribution Center",
        timestamp: "2024-01-15T12:00:00Z",
        description: "Out for delivery"
      },
      {
        status: "Pending",
        location: "HealthPlus Pharmacy",
        timestamp: "2024-01-14T14:00:00Z",
        description: "Package picked up"
      }
    ],
    shippingInfo: {
      service: "Express Delivery",
      carrier: "PalPost Express",
      estimatedDelivery: "2024-01-15"
    },
    createdAt: "2024-01-14T14:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z"
  }
];

export default function AllPackages() {
  const { t } = useTranslation();
  const [packages] = useState<Package[]>(mockPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [carrierFilter, setCarrierFilter] = useState<string>("all");

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesSearch = 
        pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.packageDetails.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || pkg.status === statusFilter;
      const matchesCarrier = carrierFilter === "all" || pkg.shippingInfo.carrier === carrierFilter;
      
      return matchesSearch && matchesStatus && matchesCarrier;
    });
  }, [packages, searchTerm, statusFilter, carrierFilter]);

  const handlePackageClick = (pkg: Package) => {
    // TODO: Navigate to package details page
    console.log("Package clicked:", pkg);
  };

  const getUniqueCarriers = () => {
    return Array.from(new Set(packages.map(pkg => pkg.shippingInfo.carrier)));
  };

  return (
    <>
      <PageMeta
        title={`${t('packages.allPackages')} | TailAdmin - React.js Admin Dashboard Template`}
        description={`${t('packages.allPackages')} - TailAdmin - React.js Tailwind CSS Admin Dashboard Template`}
      />
      <PageBreadcrumb pageTitle={t('packages.allPackages')} />
      
      <div className="space-y-6">
        {/* Packages Table with integrated filters */}
        <ComponentCard title={t('packages.allPackages')} desc={`${filteredPackages.length} packages found`}>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
              <Input
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Failed Delivery">Failed Delivery</option>
              </select>

              {/* Carrier Filter */}
              <select
                value={carrierFilter}
                onChange={(e) => setCarrierFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Carriers</option>
                {getUniqueCarriers().map((carrier) => (
                  <option key={carrier} value={carrier}>{carrier}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <PackageTable 
            packages={filteredPackages} 
            onPackageClick={handlePackageClick}
          />
        </ComponentCard>
      </div>
    </>
  );
}
