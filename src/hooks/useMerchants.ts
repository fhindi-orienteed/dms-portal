import { useEffect, useState } from 'react';
import { merchantService } from '../services';
import { Merchant } from '../types/merchant';

// Mock data for fallback
const mockMerchants: Merchant[] = [
  {
    id: 1,
    name: 'Tech Solutions Ltd',
    registrationNumber: 'REG001',
    logo: undefined,
    address: '123 Business Street',
    country: 'Palestine',
    city: 'Ramallah',
    phone: '+970-2-123-4567',
    email: 'contact@techsolutions.ps',
    socialLinks: {
      facebook: 'https://facebook.com/techsolutions',
      twitter: undefined,
      instagram: undefined,
      linkedin: 'https://linkedin.com/company/techsolutions'
    },
    createdDate: '2024-01-15',
    branchCount: 3,
    userCount: 12,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Digital Commerce Co',
    registrationNumber: 'REG002',
    logo: undefined,
    address: '456 Commerce Ave',
    country: 'Palestine',
    city: 'Gaza',
    phone: '+970-8-987-6543',
    email: 'info@digitalcommerce.ps',
    socialLinks: {
      facebook: undefined,
      twitter: 'https://twitter.com/digitalcommerce',
      instagram: 'https://instagram.com/digitalcommerce',
      linkedin: undefined
    },
    createdDate: '2024-02-20',
    branchCount: 2,
    userCount: 8,
    status: 'Active'
  }
];

export function useMerchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadMerchantList = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Attempting to load merchants from API...');
      
      const data = await merchantService.getMerchants();
      console.log('Successfully loaded merchants:', data);
      setMerchants(data);
    } catch (err) {
      console.error('Failed to load merchants from API:', err);
      console.log('Using mock data as fallback...');
      
      // Use mock data as fallback
      setMerchants(mockMerchants);
      setError(null); // Clear error since we have fallback data
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
    loadMerchantList();
  }, []);
  return { merchants, loading, error, filterMerchants, refreshMerchantList: loadMerchantList };
}
