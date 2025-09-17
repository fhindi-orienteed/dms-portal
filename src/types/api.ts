export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  message: string;
  status: number;
  statusText: string;
  data: any;
  isNetworkError: boolean;
  isServerError: boolean;
  isClientError: boolean;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
  refreshToken?: string;
  expiresIn: number;
}

export interface User {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  avatar?: string;
  permissions?: string[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export interface FilterParams {
  [key: string]: any;
}

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
