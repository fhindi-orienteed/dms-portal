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
  }
];

export default function InTransitPackages() {
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
        title={`${t('packages.inTransit')} | TailAdmin - React.js Admin Dashboard Template`}
        description={`${t('packages.inTransit')} - TailAdmin - React.js Tailwind CSS Admin Dashboard Template`}
      />
      <PageBreadcrumb pageTitle={t('packages.inTransit')} />
      
      <div className="space-y-6">
        {/* Packages Table with integrated filters */}
        <ComponentCard title={t('packages.inTransit')} desc={`${filteredPackages.length} packages in transit`}>
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
