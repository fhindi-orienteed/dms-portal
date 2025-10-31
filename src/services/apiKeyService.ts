import { ApiKey, CreateApiKeyRequest, CreateApiKeyResponse, UpdateApiKeyRequest, ApiKeyFilters } from '../types/apiKey';

// Mock data for API Keys
const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API key',
    key: 'sk_live_**********4248',
    status: 'disabled',
    created: '25 Jan, 2025',
    lastUsed: '2 Today, 10:45 AM',
    isEnabled: false,
  },
  {
    id: '2',
    name: 'Development API key',
    key: 'dev_live_**********4923',
    status: 'active',
    created: '29 Dec, 2024',
    lastUsed: 'Today, 12:40 AM',
    isEnabled: true,
  },
  {
    id: '3',
    name: 'Legacy API Key',
    key: 'leg_live_**********0932',
    status: 'active',
    created: '12 Mar, 2024',
    lastUsed: 'Today, 11:45 PM',
    isEnabled: true,
  },
];

// Generate a random API key
const generateApiKey = (): string => {
  const prefix = 'sk_live_';
  const randomPart = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return prefix + randomPart;
};

// Mask API key for display
const maskApiKey = (key: string): string => {
  if (key.length <= 8) return key;
  const prefix = key.substring(0, 8);
  const suffix = key.substring(key.length - 4);
  return `${prefix}${'*'.repeat(10)}${suffix}`;
};

export const apiKeyService = {
  // Get all API keys with optional filtering
  async getApiKeys(filters?: ApiKeyFilters): Promise<ApiKey[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredKeys = [...mockApiKeys];

        // Apply status filter
        if (filters?.status && filters.status !== 'all') {
          filteredKeys = filteredKeys.filter(key => key.status === filters.status);
        }

        // Apply search filter
        if (filters?.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredKeys = filteredKeys.filter(key =>
            key.name.toLowerCase().includes(searchTerm) ||
            key.key.toLowerCase().includes(searchTerm)
          );
        }

        // Mask API keys for display
        const maskedKeys = filteredKeys.map(key => ({
          ...key,
          key: maskApiKey(key.key)
        }));

        resolve(maskedKeys);
      }, 500);
    });
  },

  // Get a single API key by ID
  async getApiKey(id: string): Promise<ApiKey | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const apiKey = mockApiKeys.find(key => key.id === id);
        if (apiKey) {
          resolve({
            ...apiKey,
            key: maskApiKey(apiKey.key)
          });
        } else {
          resolve(null);
        }
      }, 300);
    });
  },

  // Create a new API key
  async createApiKey(request: CreateApiKeyRequest): Promise<CreateApiKeyResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newKey = generateApiKey();
        const newApiKey: CreateApiKeyResponse = {
          id: (mockApiKeys.length + 1).toString(),
          name: request.name,
          key: newKey, // Return the full key only once during creation
          status: 'active',
          created: new Date().toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          }),
          lastUsed: null,
          isEnabled: true,
        };

        // Add to mock data with masked key
        mockApiKeys.push({
          ...newApiKey,
          key: maskApiKey(newKey)
        });

        resolve(newApiKey);
      }, 800);
    });
  },

  // Update an API key
  async updateApiKey(id: string, request: UpdateApiKeyRequest): Promise<ApiKey> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const keyIndex = mockApiKeys.findIndex(key => key.id === id);
        if (keyIndex === -1) {
          reject(new Error('API Key not found'));
          return;
        }

        const updatedKey = {
          ...mockApiKeys[keyIndex],
          ...request,
          status: request.isEnabled !== undefined 
            ? (request.isEnabled ? 'active' : 'disabled') as 'active' | 'disabled'
            : mockApiKeys[keyIndex].status
        };

        mockApiKeys[keyIndex] = updatedKey;
        resolve(updatedKey);
      }, 500);
    });
  },

  // Delete an API key
  async deleteApiKey(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const keyIndex = mockApiKeys.findIndex(key => key.id === id);
        if (keyIndex === -1) {
          reject(new Error('API Key not found'));
          return;
        }

        mockApiKeys.splice(keyIndex, 1);
        resolve();
      }, 500);
    });
  },

  // Toggle API key status
  async toggleApiKeyStatus(id: string): Promise<ApiKey> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const keyIndex = mockApiKeys.findIndex(key => key.id === id);
        if (keyIndex === -1) {
          reject(new Error('API Key not found'));
          return;
        }

        const currentKey = mockApiKeys[keyIndex];
        const updatedKey = {
          ...currentKey,
          isEnabled: !currentKey.isEnabled,
          status: (!currentKey.isEnabled ? 'active' : 'disabled') as 'active' | 'disabled'
        };

        mockApiKeys[keyIndex] = updatedKey;
        resolve(updatedKey);
      }, 300);
    });
  },
};
