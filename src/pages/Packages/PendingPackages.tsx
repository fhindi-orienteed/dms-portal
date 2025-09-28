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
  }
];

export default function PendingPackages() {
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
        title={`${t('packages.pending')} | TailAdmin - React.js Admin Dashboard Template`}
        description={`${t('packages.pending')} - TailAdmin - React.js Tailwind CSS Admin Dashboard Template`}
      />
      <PageBreadcrumb pageTitle={t('packages.pending')} />
      
      <div className="space-y-6">
        {/* Packages Table with integrated filters */}
        <ComponentCard title={t('packages.pending')} desc={`${filteredPackages.length} packages pending`}>
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
