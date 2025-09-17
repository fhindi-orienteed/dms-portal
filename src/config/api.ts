import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://api-dms.orienteed.ps/v1/web',
  TIMEOUT: 30000, 
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
      
      return Promise.reject(error);
    }

   
    if (error.response?.status === 403) {
      console.warn('Access forbidden - insufficient permissions');
    }

    if (!error.response && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (originalRequest._retryCount < API_CONFIG.RETRY_ATTEMPTS) {
        originalRequest._retryCount++;
        
        await new Promise(resolve => 
          setTimeout(resolve, API_CONFIG.RETRY_DELAY * originalRequest._retryCount)
        );
        
        console.log(`🔄 Retrying request (${originalRequest._retryCount}/${API_CONFIG.RETRY_ATTEMPTS}):`, originalRequest.url);
        return api(originalRequest);
      }
    }

   
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    const errorStatus = error.response?.status || 0;

    const standardError = {
      message: errorMessage,
      status: errorStatus,
      statusText: error.response?.statusText || 'Unknown Error',
      data: error.response?.data || null,
      isNetworkError: !error.response,
      isServerError: errorStatus >= 500,
      isClientError: errorStatus >= 400 && errorStatus < 500,
    };

    return Promise.reject(standardError);
  }
);

export { apiUtils } from '../utils/apiUtils';

export default api;
