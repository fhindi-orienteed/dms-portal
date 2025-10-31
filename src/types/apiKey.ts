export interface ApiKey {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'disabled';
  created: string;
  lastUsed: string | null;
  isEnabled: boolean;
}

export interface CreateApiKeyRequest {
  name: string;
}

export interface CreateApiKeyResponse {
  id: string;
  name: string;
  key: string;
  status: 'active';
  created: string;
  lastUsed: null;
  isEnabled: boolean;
}

export interface UpdateApiKeyRequest {
  name?: string;
  isEnabled?: boolean;
}

export interface ApiKeyFilters {
  status?: 'active' | 'disabled' | 'all';
  search?: string;
}
