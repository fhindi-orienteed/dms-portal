import api from '../config/api';

export const apiUtils = {
  auth: {
    setToken: (token: string) => {
      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    clearToken: () => {
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
    },

    getToken: (): string | null => {
      return localStorage.getItem('authToken');
    },

    isAuthenticated: (): boolean => {
      const token = localStorage.getItem('authToken');
      return !!token;
    },

    getUser: () => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    },

    setUser: (user: any) => {
      localStorage.setItem('user', JSON.stringify(user));
    },

    clearUser: () => {
      localStorage.removeItem('user');
    },

    clearAll: () => {
      apiUtils.auth.clearToken();
      apiUtils.auth.clearUser();
    },
  },

  file: {
   
    upload: (
      url: string,
      file: File,
      onProgress?: (progress: number) => void,
      fieldName: string = 'file'
    ) => {
      const formData = new FormData();
      formData.append(fieldName, file);

      return api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      });
    },

    uploadMultiple: (
      url: string,
      files: File[],
      onProgress?: (progress: number) => void,
      fieldName: string = 'files'
    ) => {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`${fieldName}[${index}]`, file);
      });

      return api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      });
    },

    download: async (url: string, filename?: string) => {
      const response = await api.get(url, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    },

    formatFileSize: (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    validateFileType: (file: File, allowedTypes: string[]): boolean => {
      return allowedTypes.includes(file.type);
    },

    validateFileSize: (file: File, maxSizeInMB: number): boolean => {
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      return file.size <= maxSizeInBytes;
    },
  },

  url: {
   
    buildQueryString: (params: Record<string, any>): string => {
      const searchParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, item));
          } else {
            searchParams.append(key, value.toString());
          }
        }
      });
      
      return searchParams.toString();
    },

    parseQueryString: (queryString: string): Record<string, any> => {
      const params = new URLSearchParams(queryString);
      const result: Record<string, any> = {};
      
      params.forEach((value, key) => {
        if (result[key]) {
          if (Array.isArray(result[key])) {
            result[key].push(value);
          } else {
            result[key] = [result[key], value];
          }
        } else {
          result[key] = value;
        }
      });
      
      return result;
    },

    // Combine base URL with path
    joinUrl: (baseUrl: string, path: string): string => {
      const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const pathPart = path.startsWith('/') ? path : `/${path}`;
      return `${base}${pathPart}`;
    },
  },

  transform: {
    formDataToObject: (formData: FormData): Record<string, any> => {
      const object: Record<string, any> = {};
      formData.forEach((value, key) => {
        if (object[key]) {
          if (Array.isArray(object[key])) {
            object[key].push(value);
          } else {
            object[key] = [object[key], value];
          }
        } else {
          object[key] = value;
        }
      });
      return object;
    },

    objectToFormData: (obj: Record<string, any>): FormData => {
      const formData = new FormData();
      
      Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(item => formData.append(key, item));
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      
      return formData;
    },

    deepClone: <T>(obj: T): T => {
      return JSON.parse(JSON.stringify(obj));
    },

    removeEmpty: (obj: Record<string, any>): Record<string, any> => {
      const cleaned: Record<string, any> = {};
      
      Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'object' && !Array.isArray(value)) {
            const cleanedNested = apiUtils.transform.removeEmpty(value);
            if (Object.keys(cleanedNested).length > 0) {
              cleaned[key] = cleanedNested;
            }
          } else {
            cleaned[key] = value;
          }
        }
      });
      
      return cleaned;
    },
  },

  // Error handling utilities
  error: {
    // Check if error is network error
    isNetworkError: (error: any): boolean => {
      return !error.response && error.request;
    },

    // Check if error is server error (5xx)
    isServerError: (error: any): boolean => {
      return error.response && error.response.status >= 500;
    },

    // Check if error is client error (4xx)
    isClientError: (error: any): boolean => {
      return error.response && error.response.status >= 400 && error.response.status < 500;
    },

    // Get user-friendly error message
    getUserMessage: (error: any): string => {
      if (error.response?.data?.message) {
        return error.response.data.message;
      }
      
      if (error.message) {
        return error.message;
      }
      
      if (apiUtils.error.isNetworkError(error)) {
        return 'Network error. Please check your internet connection.';
      }
      
      if (apiUtils.error.isServerError(error)) {
        return 'Server error. Please try again later.';
      }
      
      return 'An unexpected error occurred.';
    },
  },

  // Validation utilities
  validate: {
    // Validate email format
    email: (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    // Validate phone number
    phone: (phone: string): boolean => {
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
      return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },

    // Validate URL
    url: (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },

    // Check if string is not empty
    required: (value: any): boolean => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined;
    },

    // Validate minimum length
    minLength: (value: string, min: number): boolean => {
      return value.length >= min;
    },

    // Validate maximum length
    maxLength: (value: string, max: number): boolean => {
      return value.length <= max;
    },
  },

  // Storage utilities
  storage: {
    // Safe localStorage operations
    local: {
      get: (key: string): any => {
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        } catch {
          return null;
        }
      },

      set: (key: string, value: any): void => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.error('Failed to save to localStorage:', error);
        }
      },

      remove: (key: string): void => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error('Failed to remove from localStorage:', error);
        }
      },

      clear: (): void => {
        try {
          localStorage.clear();
        } catch (error) {
          console.error('Failed to clear localStorage:', error);
        }
      },
    },

    session: {
      get: (key: string): any => {
        try {
          const item = sessionStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        } catch {
          return null;
        }
      },

      set: (key: string, value: any): void => {
        try {
          sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.error('Failed to save to sessionStorage:', error);
        }
      },

      remove: (key: string): void => {
        try {
          sessionStorage.removeItem(key);
        } catch (error) {
          console.error('Failed to remove from sessionStorage:', error);
        }
      },

      clear: (): void => {
        try {
          sessionStorage.clear();
        } catch (error) {
          console.error('Failed to clear sessionStorage:', error);
        }
      },
    },
  },
};
