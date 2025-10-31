import { useTranslation } from 'react-i18next';
import Badge from '../../../components/ui/badge/Badge';
import { StatsCard } from '../../../components/ui/stats';
import { BoxIcon, DollarLineIcon, GroupIcon, PlugInIcon } from '../../../icons';
import { Merchant } from '../../../types/merchant';
import { getStatusColor, getTranslatedStatus } from '../../../utils/packageUtils';

interface Props {
  merchant: Merchant;
}

export default function Statistic({ merchant }: Props) {
  const { t } = useTranslation();

  return (
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
  );
}
