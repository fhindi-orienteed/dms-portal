export interface Area {
  id: number;
  name: string;
  country: string;
  city: string;
  description?: string;
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  status: 'Active' | 'Inactive';
  createdDate: string;
  updatedDate: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CreateAreaRequest {
  name: string;
  country: string;
  city: string;
  description?: string;
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface UpdateAreaRequest extends Partial<CreateAreaRequest> {
  id: number;
  status?: 'Active' | 'Inactive';
}

export interface AreaFilters {
  country?: string;
  city?: string;
  status?: 'Active' | 'Inactive';
  search?: string;
}

export interface AreaApiResponse {
  success: boolean;
  data: Area[];
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}
