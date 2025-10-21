import PageMeta from "../../components/common/PageMeta";
import PackageCard from "../../components/ecommerce/PackageCard";
// import { DeliveredPackage, PendingPackage, ReturnedPackage } from "../../icons";
import { useTranslation } from "../../hooks/useTranslation";
import { usePackages } from "../../hooks/usePackageSummary";

export default function Home() {
  const { t } = useTranslation();
  const {packages, loading, error }=  usePackages();

  if(error) return <p>Error : </p>;
  if(loading) return <p>Loading...</p>

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

        {/* export&import buttons */}
        <div className="items-end">
            <button className="mr-4 border border-gray-200 p-2 rounded-lg bg-blue-600 text-white">{t('dashboard.export')}</button>
            <button className="mr-4 border border-gray-200 p-2 rounded-lg bg-blue-600 text-white">{t('dashboard.import')}</button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {Object.entries(packages).map(([statusName, values]) => (
            <PackageCard
              key={statusName}
              code={statusName}
              count={values.count}
              collectionAmount={values.collectionAmount}
            />
          ))}
          
        </div>
      </div>
    </>
  );
}
