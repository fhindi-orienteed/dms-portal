import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { PageBreadcrumb, PageMeta } from '../../../components/common';
import EntityStatus from '../../../components/EntityStatus';
import LineItemText from '../../../components/LineItemText';
import GenericDataTable from '../../../components/tables/DataTables/GenericDataTable';
import Loader from '../../../components/ui/loader/Loader';
import { useMerchants } from '../../../hooks/useMerchants';
import { EnvelopeIcon } from '../../../icons';
import { Merchant } from '../../../types/merchant';
import { formatLocalizedDate } from '../../../utils/packageUtils';
import MerchantsListHeader from '../components/Header';
import MerchantName from '../components/MerchantName';
import MerchantSocialLinks from '../components/SocialLinks';

export default function MerchantsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { loading, error, filterMerchants, refreshMerchantList } = useMerchants();

  const filteredMerchants = useMemo(() => {
    return filterMerchants(searchTerm);
  }, [filterMerchants, searchTerm]);

  const columns = [
    {
      header: 'Merchant',
      accessor: (merchant: Merchant) => <MerchantName merchant={merchant} />,
    },
    {
      header: 'Address',
      accessor: (merchant: Merchant) => (
        <LineItemText title={merchant.address} subTitle={[merchant.city, merchant.country].join(', ')} />
      ),
    },
    {
      header: 'Contact',
      accessor: (merchant: Merchant) => <LineItemText title={merchant.phone} subTitle={merchant.email} />,
    },
    {
      header: 'Social Links',
      accessor: (merchant: Merchant) => <MerchantSocialLinks merchant={merchant} size={6} />,
    },
    {
      header: 'Status',
      accessor: (merchant: Merchant) => <EntityStatus status={merchant.status} entity='merchant' />,
    },
    {
      header: 'Created Date',
      accessor: (merchant: Merchant) => (
        <span className='text-gray-500 text-theme-sm dark:text-gray-400'>
          {formatLocalizedDate(merchant.createdDate, i18n.language)}
        </span>
      ),
    },
    {
      header: 'Branches',
      accessor: (merchant: Merchant) => (
        <span className='text-gray-800 text-theme-sm dark:text-white/90'>{merchant.branchCount}</span>
      ),
    },
    {
      header: 'Users',
      accessor: (merchant: Merchant) => (
        <span className='text-gray-800 text-theme-sm dark:text-white/90'>{merchant.userCount}</span>
      ),
    },
  ];

  return (
    <>
      <PageMeta
        title={`${t('merchants.allMerchants')} | DMS Portal`}
        description={`${t('merchants.allMerchants')} - DMS Portal`}
      />
      <PageBreadcrumb pageTitle={t('merchants.allMerchants')} />

      <div className='space-y-6'>
        <MerchantsListHeader onChange={refreshMerchantList} searchTerm={searchTerm} onSearch={setSearchTerm} />

        {/* Loading State */}
        {loading && (
          <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8'>
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4'>
            <div className='flex items-center'>
              <EnvelopeIcon className='size-5 text-red-600 dark:text-red-400' />
              <span className='ml-3 text-red-800 dark:text-red-200'>{t('merchants.errorLoadingMerchants')}</span>
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <GenericDataTable
            data={filteredMerchants}
            columns={columns}
            itemsPerPage={10}
            showPagination={true}
            emptyMessage={t('merchants.noMerchantsFound')}
            onRowClick={(merchant) => navigate(`/merchant/${merchant.id}`)}
          />
        )}
      </div>
    </>
  );
}
