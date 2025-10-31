import { useEffect, useState } from 'react';
import { merchantService } from '../services';
import { Merchant } from '../types/merchant';

export function useMerchants() {
  const [merchants, setMerchants] = useState<Merchant[]>({} as Merchant[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadPackages = async () => {
    try {
      const data = await merchantService.getMerchants();
      setMerchants(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const filterMerchants = (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === '') {
      return merchants;
    }

    return merchants.filter?.((merchant) => {
      return (
        merchant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  useEffect(() => {
    loadPackages();
  }, []);
  return { merchants, loading, error, filterMerchants, refreshMerchantList: loadPackages };
}
