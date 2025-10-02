import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import StatusCards from "../../components/ecommerce/PackageCardsStatus";
import { useTranslation } from "../../hooks/useTranslation";

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <>
      <PageMeta
        title={`${t('dashboard.title')} | TailAdmin - React.js Admin Dashboard Template`}
        description={`${t('dashboard.welcomeMessage')} - TailAdmin - React.js Tailwind CSS Admin Dashboard Template`}
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.welcomeMessage')}
        </h1>
      </div>
      
      <div className="mb-6">
        <StatusCards/>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
