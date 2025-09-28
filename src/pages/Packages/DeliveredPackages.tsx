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
  }
];

export default function DeliveredPackages() {
  const { t } = useTranslation();
  const [packages] = useState<Package[]>(mockPackages);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      return (
        pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.packageDetails.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [packages, searchTerm]);

  const handlePackageClick = (pkg: Package) => {
    console.log("Package clicked:", pkg);
  };

  return (
    <>
      <PageMeta
        title={`${t('packages.delivered')} | TailAdmin - React.js Admin Dashboard Template`}
        description={`${t('packages.delivered')} - TailAdmin - React.js Tailwind CSS Admin Dashboard Template`}
      />
      <PageBreadcrumb pageTitle={t('packages.delivered')} />
      
      <div className="space-y-6">
        {/* Packages Table with integrated filters */}
        <ComponentCard title={t('packages.delivered')} desc={`${filteredPackages.length} packages delivered`}>
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
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
