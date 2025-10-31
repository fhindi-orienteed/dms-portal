import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../../../../components/form/input/InputField';
import { Button } from '../../../../components/ui';
import { PlusIcon, SearchIcon } from '../../../../icons';
import { merchantService } from '../../../../services';
import { showToast } from '../../../../utils/toast';
import AddMerchantModal from './../../details/AddMerchantModal';

export default function MerchantsListHeader({
  onChange,
  onSearch,
  searchTerm,
}: {
  onChange: () => void;
  onSearch: (term: string) => void;
  searchTerm: string;
}) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMerchant = async (merchant: any) => {
    try {
      await merchantService.createMerchant(merchant);
      showToast.success('Merchant created successfully!');
      onChange();
      setIsModalOpen(false);
    } catch (error) {
      showToast.error('Failed to add merchant');
    }
  };

  return (
    <>
      <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6'>
        <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
          <div className='relative flex-1 max-w-md'>
            <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10' />
            <Input
              placeholder={t('merchants.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
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
    </>
  );
}
