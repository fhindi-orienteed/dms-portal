import api from '../config/api';
import endpoints from '../config/endpoint';
import type { PaginationParams } from '../types/api';
import type { Merchant } from '../types/merchant';

export const merchantService = {
  /**
   * Get list of merchants from API
   * @param params - Pagination and filter parameters
   * @returns Promise with merchants data
   */
  getMerchants: async (params?: PaginationParams): Promise<Merchant[]> => {
    const response = await api.get(endpoints.company.list, { params });

    return response.data.data.map(buildMerchantObject);
  },

  /**
   * Get single merchant by ID
   * @param id - Merchant ID
   * @returns Promise with merchant data
   */
  getMerchantById: async (id: number): Promise<Merchant> => {
    const response = await api.get(`${endpoints.company.byId(id)}`);
    return buildMerchantObject(response.data.data);
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
        street: merchantData.address,
      },
    };

    const response = await api.post(endpoints.company.new, requestBody);
    return buildMerchantObject(response.data.data);
  },
};

/**
 * Transform API JSON response to Merchant interface
 * @param apiMerchant - Merchant data from API
 * @returns Transformed merchant object
 */
function buildMerchantObject(json: any): Merchant {
  return {
    id: json.id,
    name: json.name,
    registrationNumber: json.registrationNumber,
    logo: json.logo,
    address: json.address,
    country: json.country,
    city: json.city,
    phone: json.phone,
    email: json.email,
    socialLinks: {
      facebook: json.facebook || null,
      twitter: json.twitter || null,
      instagram: json.instagram || null,
      linkedin: json.linkedin || null,
    },
    createdDate: json.createdDate,
    branchCount: json.branchCount || 0,
    userCount: json.userCount || 0,
    status: json.status,
  };
}
