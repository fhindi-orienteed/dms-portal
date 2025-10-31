import { useTranslation } from 'react-i18next';
import ComponentCard from '../../../components/common/ComponentCard';
import { Merchant } from '../../../types/merchant';
import { formatLocalizedDate, getTranslatedStatus } from '../../../utils/packageUtils';
import MerchantMetaCard from './MerchantMetaCard';
import Statistic from './Statistic';

interface Props {
  merchant: Merchant;
}

export default function MerchantInformation({ merchant }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <ComponentCard title={merchant.name} desc={merchant.registrationNumber}>
      <MerchantMetaCard merchant={merchant} />

      <Statistic merchant={merchant} />

      {/* Contact Info */}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700'>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{t('merchants.stats.mainAddress')}</p>
          <p className='text-sm font-medium text-gray-900 dark:text-white mt-1'>
            {merchant.address || t('fallbacks.noAddress')}
          </p>
        </div>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{t('merchants.stats.createdDate')}</p>
          <p className='text-sm font-medium text-gray-900 dark:text-white mt-1'>
            {formatLocalizedDate(merchant.createdDate, i18n.language)}
          </p>
        </div>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{t('merchants.stats.accountStatus')}</p>
          <p className='text-sm font-medium text-gray-900 dark:text-white mt-1'>
            {getTranslatedStatus(merchant.status, t)}
          </p>
        </div>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Phone</p>
          <p className='text-sm font-medium text-gray-900 dark:text-white mt-1'>{merchant.phone}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Email</p>
          <p className='text-sm font-medium text-gray-900 dark:text-white mt-1'>{merchant.email}</p>
        </div>
      </div>
    </ComponentCard>
  );
}
