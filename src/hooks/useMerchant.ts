import { useEffect, useState } from 'react';
import { merchantService } from '../services';
import { Merchant } from '../types/merchant';

export function useMerchant(id: string | undefined | null) {
  const [merchant, setMerchant] = useState<Merchant>({} as Merchant);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMerchant = async () => {
    try {
      if (id) {
        const data = await merchantService.getMerchantById(id);
        setMerchant(data);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchant();
  }, []);
  return { merchant, loading, error, refreshMerchant: fetchMerchant };
}
