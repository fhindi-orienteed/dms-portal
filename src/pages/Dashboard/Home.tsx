import PageMeta from "../../components/common/PageMeta";
import PackageCard from "../../components/ecommerce/PackageCard";
import { useTranslation } from "../../hooks/useTranslation";
import { usePackages } from "../../hooks/usePackageSummary";
import { Loader } from "../../components/ui";
import { useMemo } from "react";

const ALL_STATUSES = [
  'PENDING_COLLECTION',
  'SCHEDULED',
  'IN_PROGRESS',
  'AT_COLLECTION',
  'COLLECTED',
  'MISSED',
  'CANCELLED',
  'RESCHEDULED',
  'FAILED',
  'RETURNED'
] as const;

export default function Home() {
  const { t } = useTranslation();
  const {packages, loading, error }=  usePackages();

  const allPackages = useMemo(() => {
    const result: Record<string, { count: number; collectionAmount: number }> = {};
    const packagesObj = packages as unknown as Record<string, { count: number; collectionAmount: number }>;
    
    ALL_STATUSES.forEach(status => {
      result[status] = packagesObj[status] || { count: 0, collectionAmount: 0 };
    });
    
    return result;
  }, [packages]);

  if(error) return <p>Error : </p>;
  if(loading) return <Loader />

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {Object.entries(allPackages).map(([statusName, values]) => (
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
