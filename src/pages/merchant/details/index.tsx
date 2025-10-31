import { useParams } from 'react-router';
import { PageMeta } from '../../../components/common';
import { useMerchant } from '../../../hooks/useMerchant.ts';
import BranchesTable from './BranchesTable';
import MerchantHeader from './MerchantHeader';
import MerchantInformation from './MerchantInformation';
import PriceListTab from './PriceListTab';
import UsersTable from './UsersTable.tsx';
export default function MerchantDetails() {
  const { id } = useParams();

  const { merchant } = useMerchant(id);

  return (
    <>
      <PageMeta title={`${merchant.name} | DMS Portal`} description={`Merchant details for ${merchant.name}`} />

      <MerchantHeader />

      <MerchantInformation merchant={merchant} />

      {id && (
        <div className='mt-6'>
          <div className='mt-6'>
            <div className='mb-12'>
              <BranchesTable merchantId={id} />
            </div>
            <div className='mb-12'>
              <UsersTable merchantId={id} />
            </div>
            <div className='mb-12'>
              <PriceListTab merchantId={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
