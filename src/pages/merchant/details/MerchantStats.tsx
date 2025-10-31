import ComponentCard from '../../../components/common/ComponentCard';
import Badge from '../../../components/ui/badge/Badge';
import Button from '../../../components/ui/button/Button';
import { StatsCard } from '../../../components/ui/stats';
import { BoxIcon, DollarLineIcon, GroupIcon, PlugInIcon, PencilIcon, TrashBinIcon } from '../../../icons';
import { getStatusColor, getTranslatedStatus, formatLocalizedDate } from '../../../utils/packageUtils';
import { useTranslation } from 'react-i18next';
import MerchantSocialLinks from '../components/SocialLinks';

interface MerchantStatsProps {
  merchant: any;
}

export default function MerchantStats({ merchant }: MerchantStatsProps) {
  const { t, i18n } = useTranslation();
  return (
    <ComponentCard title={merchant.merchantName} desc={merchant.description}>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatsCard
          icon={<BoxIcon className='size-6 text-brand-600 dark:text-brand-400' />}
          label={t('merchants.stats.totalPackages')}
          value={merchant.totalPackage}
          color='primary'
        />
        <StatsCard
          icon={<PlugInIcon className='size-6 text-success-600 dark:text-success-400' />}
          label={t('merchants.stats.branches')}
          value={merchant.branchCount}
          color='success'
        />
        <StatsCard
          icon={<GroupIcon className='size-6 text-purple-600 dark:text-purple-400' />}
          label={t('merchants.stats.users')}
          value={merchant.userCount}
          color='purple'
        />
        <StatsCard
          icon={<DollarLineIcon className='size-6 text-orange-600 dark:text-orange-400' />}
          label={t('merchants.stats.status')}
          value={<Badge color={getStatusColor(merchant.status)}>{getTranslatedStatus(merchant.status, t)}</Badge>}
          color='orange'
        />
      </div>

      {/* Contact Info */}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700'>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{t('merchants.stats.mainAddress')}</p>
          <p className='text-sm font-medium text-gray-900 dark:text-white mt-1'>
            {merchant.mainAddress || t('fallbacks.noAddress')}
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
          <div className='flex items-center gap-3 mt-3'>
            <MerchantSocialLinks merchant={merchant} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className='mt-6 flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700'>
        <Button variant='primary' size='sm' startIcon={<PencilIcon className='size-4' />}>
          {t('merchants.stats.editMerchant')}
        </Button>
        <Button variant='danger' size='sm' startIcon={<TrashBinIcon className='size-4' />}>
          {t('merchants.stats.deleteMerchant')}
        </Button>
      </div>
    </ComponentCard>
  );
}
