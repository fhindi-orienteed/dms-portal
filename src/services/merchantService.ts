import api from '../config/api';
import type { ApiResponse, PaginationParams } from '../types/api';
import type { Merchant, MerchantApiResponse } from '../types/merchant';

export const merchantService = {
  /**
   * Get list of merchants from API
   * @param params - Pagination and filter parameters
   * @returns Promise with merchants data
   */
  getMerchants: async (params?: PaginationParams): Promise<Merchant[]> => {
    const response = await api.get<ApiResponse<MerchantApiResponse[]>>('/company/list', {params});
    // Transform API response to match our Merchant interface
    return response.data.data.map(transformApiResponseToMerchant);
  },

 
  /**
   * Get single merchant by ID
   * @param id - Merchant ID
   * @returns Promise with merchant data
   */
  getMerchantById: async (id: number): Promise<Merchant> => {
    const response = await api.get<ApiResponse<MerchantApiResponse>>(`/company/${id}`);
    return transformApiResponseToMerchant(response.data.data);
  },
 /**
   *  Create new merchant 
   */
  createMerchant: async (merchantData: any): Promise<Merchant> => {
    const requestBody = {
      name: merchantData.businessName,
      registrationNumber: merchantData.registrationNumber,
      email: merchantData.email,
      phone: merchantData.phone,
      address: {
        street: merchantData.address
      }
    };

    const response = await api.post<ApiResponse<MerchantApiResponse>>('/company', requestBody);

    return transformApiResponseToMerchant(response.data.data);
  }
};

/**
 * Transform API response to Merchant interface
 * @param apiMerchant - Merchant data from API
 * @returns Transformed merchant object
 */
function transformApiResponseToMerchant(apiMerchant: MerchantApiResponse): Merchant {
  // Build main address with fallback
  const addressParts = [
    apiMerchant.address?.street,
    apiMerchant.address?.city,
    apiMerchant.address?.country
  ].filter(Boolean);
  
  const mainAddress = apiMerchant.address?.fullAddress || 
                     (addressParts.length > 0 ? addressParts.join(', ') : 'No address provided');

  return {
    id: apiMerchant.id || 0,
    merchantName: apiMerchant.name || 'Unknown Merchant',
    registrationNumber: apiMerchant.registrationNumber,
    merchantLogo: apiMerchant.logo,
    mainAddress,
    country: apiMerchant.address?.country,
    city: apiMerchant.address?.city,
    address: apiMerchant.address?.street,
    merchantPhone: apiMerchant.phone,
    merchantEmail: apiMerchant.email,
    socialLinks: apiMerchant.socialLinks,
    createdDate: formatDate(apiMerchant.createdAt || ''),
    branchCount: apiMerchant.branchCount || 0,
    userCount: apiMerchant.userCount || 0,
    status: mapApiStatusToMerchantStatus(apiMerchant.status)
  };
}

/**
 * Format date string to display format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
function formatDate(dateString: string): string {
  if (!dateString) {
    return 'N/A';
  }
  
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  } catch {
    return dateString || 'N/A';
  }
}

/**
 * Map API status to merchant status
 * @param apiStatus - Status from API
 * @returns Mapped status
 */
function mapApiStatusToMerchantStatus(apiStatus: string | null | undefined): Merchant['status'] {
  // Handle null, undefined, or empty status
  if (!apiStatus || typeof apiStatus !== 'string') {
    return 'Pending';
  }

  const statusMap: Record<string, Merchant['status']> = {
    'active': 'Active',
    'inactive': 'Inactive',
    'suspended': 'Suspended',
    'pending': 'Pending',
    'in_transit': 'In Transit',
    'delivered': 'Delivered',
    'failed_delivery': 'Failed Delivery'
  };
  
  return statusMap[apiStatus.toLowerCase()] || 'Pending';
}
