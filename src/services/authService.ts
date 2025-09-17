import api from '../config/api';
import { apiUtils } from '../utils/apiUtils';
import type { LoginRequest, LoginResponse } from '../types/api';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    
    if (response.data.accessToken) {
      apiUtils.auth.setToken(response.data.accessToken);
      apiUtils.auth.setUser(response.data.user);
    }
    
    return response.data;
  },

  logout: (): void => {
    apiUtils.auth.clearAll();
  },
};