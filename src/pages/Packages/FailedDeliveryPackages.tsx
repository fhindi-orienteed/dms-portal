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

export default function FailedDeliveryPackages() {
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
        title={`${t('packages.failedDelivery')} | TailAdmin - React.js Admin Dashboard Template`}
        description={`${t('packages.failedDelivery')} - TailAdmin - React.js Tailwind CSS Admin Dashboard Template`}
      />
      <PageBreadcrumb pageTitle={t('packages.failedDelivery')} />
      
      <div className="space-y-6">
        {/* Packages Table with integrated filters */}
        <ComponentCard title={t('packages.failedDelivery')} desc={`${filteredPackages.length} packages with failed delivery`}>
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
