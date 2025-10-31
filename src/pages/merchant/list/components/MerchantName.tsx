import LineItemText from '../../../../components/LineItemText';
import { UserCircleIcon } from '../../../../icons';
import { Merchant } from '../../../../types/merchant';

export interface Props {
  merchant: Merchant;
}

export default function MerchantName({ merchant }: Props) {
  const { logo, name, registrationNumber } = merchant;

  return (
    <div className='flex items-center gap-3'>
      {logo ? (
        <img src={logo} alt={name} className='w-10 h-10 rounded-lg object-cover' />
      ) : (
        <div className='flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
          <UserCircleIcon className='size-5 text-blue-600 dark:text-blue-400' />
        </div>
      )}
      <div>
        <LineItemText title={name} subTitle={registrationNumber} />
      </div>
    </div>
  );
}
