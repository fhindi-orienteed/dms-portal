export interface Merchant {
  id: number;
  name: string;
  registrationNumber?: string;
  logo?: string;
  address: string;
  country?: string;
  city?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  createdDate: string;
  branchCount: number;
  userCount: number;
  status:
    | 'All status'
    | 'Pending'
    | 'In Transit'
    | 'Delivered'
    | 'Failed Delivery'
    | 'Active'
    | 'Inactive'
    | 'Suspended';
  totalPackage?: number;
}
