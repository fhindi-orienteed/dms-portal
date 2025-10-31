import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericDataTable from '../../../components/tables/DataTables/GenericDataTable';
import Button from '../../../components/ui/button/Button';
import { PlusIcon } from '../../../icons';
import AddBranchModal from './AddBranchModal';
import { useMerchantBranch } from '../../../hooks/useMerchantBranch';
import { FaStore } from 'react-icons/fa6';
import LineItemText from '../../../components/LineItemText';
import { formatLocalizedDate } from '../../../utils';
import MerchantBranch from '../../../models/MerchantBranch';
import EntityStatus from '../../../components/EntityStatus';
import i18n from '../../../i18n';

interface Props {
  merchantId: string;
}

export default function BranchesTable({ merchantId }: Props) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { branchList } = useMerchantBranch(merchantId);

  const columns = [
    {
      header: t('merchants.branches.branchName'),
      accessor: (branch: any) => (
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
            <FaStore className='size-5 text-blue-600 dark:text-blue-400' />
          </div>
          <div>
            <LineItemText title={branch.name} subTitle={branch.id} />
          </div>
        </div>
      ),
    },
    {
      header: t('merchants.branches.address'),
      accessor: (branch: MerchantBranch) => (
        <LineItemText title={branch.address ?? ''} subTitle={[branch.city, branch.country ?? ''].join(', ')} />
      ),
    },
    {
      header: t('merchants.branches.contact'),
      accessor: (branch: MerchantBranch) => <LineItemText title={branch.phone ?? ''} subTitle={branch.email ?? ''} />,
    },
    {
      header: 'Created Date',
      accessor: (branch: MerchantBranch) => (
        <span className='text-gray-500 text-theme-sm dark:text-gray-400'>
          {formatLocalizedDate(branch.createdDate ?? '', i18n.language)}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (branch: MerchantBranch) => <EntityStatus status={branch.status ?? ''} entity='branch' />,
    },
  ];

  const handleAdd = (branch: any) => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='mb-4 flex justify-between items-center w-full'>
        <h2 className='text-xl'>Branch List</h2>
        <Button
          variant='primary'
          size='sm'
          onClick={() => setIsModalOpen(true)}
          startIcon={<PlusIcon className='size-4 fill-white' />}>
          {t('merchants.branches.addBranch')}
        </Button>
      </div>
      <GenericDataTable
        data={branchList || []}
        columns={columns}
        itemsPerPage={10}
        showPagination={true}
        emptyMessage={t('merchants.branches.noBranches')}
      />
      <AddBranchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />
    </>
  );
}
