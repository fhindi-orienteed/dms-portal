import { useEffect, useState } from 'react';
import { merchantService } from '../services';
import MerchantBranch from '../models/MerchantBranch';

export function useMerchantBranch(merchantId: string) {
  const [branchList, setBranchList] = useState<MerchantBranch[]>({} as MerchantBranch[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMerchantBranchList = async () => {
    try {
      const data = await merchantService.getMerchantBranchList(merchantId);
      setBranchList(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchantBranchList();
  }, []);
  return { branchList, loading, error, refreshList: fetchMerchantBranchList };
}
