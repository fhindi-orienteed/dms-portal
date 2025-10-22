import PageMeta from "../../components/common/PageMeta";
import PackageCard from "../../components/ecommerce/PackageCard";
import { DeliveredPackage, PendingPackage, ReturnedPackage } from "../../icons";
import { useTranslation } from "../../hooks/useTranslation";


export default function Home() {
  const { t } = useTranslation();
  
  const packageStatus = [
    { statusName: "In Transit", count: 10, totalCOD: "500$", icon: DeliveredPackage, badgeColor: "warning" as const },
    { statusName: "Delivered", count: 5, totalCOD: "200$", icon: DeliveredPackage, badgeColor: "success" as const },
    { statusName: "Pending Pickup", count: 3, totalCOD: "100$", icon: PendingPackage, badgeColor: "info" as const },
    { statusName: "Returned", count: 2, totalCOD: "50$", icon: ReturnedPackage, badgeColor: "error" as const },
   
  ];

  return (
    <>
      
      <PageMeta
        title={`${t('dashboard.title')} | TailAdmin - React.js Admin Dashboard Template`}
        description={`${t('dashboard.welcomeMessage')} - TailAdmin - React.js Tailwind CSS Admin Dashboard Template`}
      />
      <div className="mb-6 flex justify-between ">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.welcomeMessage')}
        </h1>
      </div>
      
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5 md:gap-6">
          {packageStatus.map((pkg, index) => (
            <PackageCard
              key={index}
              statusName={pkg.statusName}
              count={pkg.count}
              totalCOD={pkg.totalCOD}
              icon={pkg.icon}
              badgeColor={pkg.badgeColor}
            />
          ))}
        </div>
      </div>
    </>
  );
}
