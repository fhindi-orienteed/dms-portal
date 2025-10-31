import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { EnvelopeIcon, PlusIcon, SearchIcon } from '../../../icons';
import { PageBreadcrumb, PageMeta } from '../../../components/common';
import Input from '../../../components/form/input/InputField';
import GenericDataTable from '../../../components/tables/DataTables/GenericDataTable';
import { Button } from '../../../components/ui';
import Badge from '../../../components/ui/badge/Badge';
import Loader from '../../../components/ui/loader/Loader';
import { merchantService } from '../../../services';
import { Merchant } from '../../../types/merchant';
import { formatLocalizedDate, getStatusColor, getTranslatedStatus } from '../../../utils/packageUtils';
import { showToast } from '../../../utils/toast';
import MerchantSocialLinks from './components/SocialLinks';
import AddMerchantModal from './../details/AddMerchantModal';
import MerchantName from './components/MerchantName';
import { useMerchants } from '../../../hooks/useMerchants';
import LineItemText from '../../../components/LineItemText';
import EntityStatus from '../../../components/EntityStatus';

export default function MerchantsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, error, filterMerchants, refresh } = useMerchants();

  const handleAddMerchant = async (merchant: any) => {
    try {
      const response = await merchantService.createMerchant(merchant);
      showToast.success('Merchant created successfully!');
      refresh();
      setIsModalOpen(false);
    } catch (error) {
      showToast.error('Failed to add merchant');
    }
  };

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
      accessor: (merchant: Merchant) => <MerchantSocialLinks merchant={merchant} />,
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
        {/* Search Controls */}
        <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6'>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            <div className='relative flex-1 max-w-md'>
              <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10' />
              <Input
                placeholder={t('merchants.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10'
              />
            </div>

            <Button
              variant='primary'
              size='sm'
              startIcon={<PlusIcon className='size-4 fill-white' />}
              onClick={() => setIsModalOpen(true)}>
              Add Merchant
            </Button>
          </div>
        </div>
        <AddMerchantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddMerchant} />
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
              <span className='ml-3 text-red-800 dark:text-red-200'>
                {error || t('merchants.errorLoadingMerchants')}
              </span>
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
