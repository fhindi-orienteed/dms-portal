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

  const handleAddUser = (user: any) => {};

  const handleAddBranch = (branch: any) => {};

  return (
    <>
      <PageMeta title={`${merchant.name} | DMS Portal`} description={`Merchant details for ${merchant.name}`} />

      <MerchantHeader />

      <MerchantInformation merchant={merchant} />

      <div className='mt-6'>
        <div className='mt-6'>
          <div className='mb-6'>
            <BranchesTable branches={merchant.branches} onAddBranch={handleAddBranch} />
          </div>
          <div className='mb-6'>
            <UsersTable users={merchant.users} onAddUser={handleAddUser} />
          </div>
          <div className='mb-6'>
            <PriceListTab prices={merchant.priceList || []} onAddPrice={(price) => {}} />
          </div>
        </div>
      </div>
    </>
  );
}
