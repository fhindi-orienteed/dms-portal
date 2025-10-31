import { useTranslation } from 'react-i18next';
import { PageBreadcrumb } from '../../../components/common';

export default function MerchantHeader() {
  const { t } = useTranslation();

  return (
    <div className='mb-6'>
      <PageBreadcrumb
        pageTitle={t('merchants.details.title')}
        pageLink='/merchant/list'
        pageLinkText={t('merchants.details.breadcrumb')}
      />
    </div>
  );
}
