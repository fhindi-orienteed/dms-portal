import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { apiKeyService } from '../../services/apiKeyService';
import { ApiKey, ApiKeyFilters } from '../../types/apiKey';
import Button from '../../components/ui/button/Button';
import { GenerateApiKeyModal } from './GenerateApiKeyModal';
import { 
  CopyIcon, 
  PencilIcon, 
  TrashBinIcon, 
  LockIcon,
  SearchIcon 
} from '../../icons';
import toast from 'react-hot-toast';

export default function ApiKeysList() {
  const { t } = useLanguage();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [filters, setFilters] = useState<ApiKeyFilters>({
    status: 'all',
    search: '',
  });

  // Load API keys
  const loadApiKeys = useCallback(async () => {
    setIsLoading(true);
    try {
      const keys = await apiKeyService.getApiKeys(filters);
      setApiKeys(keys);
    } catch {
      toast.error(t('apiKeys.failedToLoadKeys'));
    } finally {
      setIsLoading(false);
    }
  }, [filters, t]);

  useEffect(() => {
    loadApiKeys();
  }, [loadApiKeys]);

  // Handle copy API key
  const handleCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast.success(t('apiKeys.keyCopiedToClipboard'));
    } catch {
      toast.error(t('apiKeys.failedToCopyKey'));
    }
  };

  // Handle toggle API key status
  const handleToggleStatus = async (id: string) => {
    try {
      await apiKeyService.toggleApiKeyStatus(id);
      await loadApiKeys(); // Reload to get updated data
      toast.success(t('apiKeys.statusUpdatedSuccessfully'));
    } catch {
      toast.error(t('apiKeys.failedToUpdateStatus'));
    }
  };

  // Handle delete API key
  const handleDeleteKey = async (id: string, name: string) => {
    if (window.confirm(t('apiKeys.confirmDeleteKey', { name }))) {
      try {
        await apiKeyService.deleteApiKey(id);
        await loadApiKeys(); // Reload to get updated data
        toast.success(t('apiKeys.keyDeletedSuccessfully'));
      } catch {
        toast.error(t('apiKeys.failedToDeleteKey'));
      }
    }
  };

  // Handle search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value,
    }));
  };

  // Handle status filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      status: e.target.value as ApiKeyFilters['status'],
    }));
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'disabled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('apiKeys.title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {t('apiKeys.description')}
            </p>
          </div>
          <Button
            onClick={() => setIsGenerateModalOpen(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <span className="text-lg font-bold">+</span>
            {t('apiKeys.addApiKey')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('apiKeys.searchPlaceholder')}
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={handleStatusFilterChange}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">{t('apiKeys.allStatuses')}</option>
          <option value="active">{t('apiKeys.active')}</option>
          <option value="disabled">{t('apiKeys.disabled')}</option>
        </select>
      </div>

      {/* API Keys Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{t('apiKeys.loadingKeys')}</p>
          </div>
        ) : apiKeys.length === 0 ? (
          <div className="p-8 text-center">
            <LockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('apiKeys.noKeysTitle')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {t('apiKeys.noKeysDescription')}
            </p>
            <Button
              onClick={() => setIsGenerateModalOpen(true)}
              variant="primary"
              className="flex items-center gap-2"
            >
              <span className="text-lg font-bold">+</span>
              {t('apiKeys.generateFirstKey')}
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('apiKeys.name')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('apiKeys.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('apiKeys.created')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('apiKeys.lastUsed')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('apiKeys.enableDisable')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('apiKeys.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {apiKeys.map((apiKey) => (
                  <tr key={apiKey.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          {apiKey.name}
                        </div>
                        <div className="flex items-center gap-2">
                          {/* API Key Display Container */}
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 px-3 py-2 flex-1 max-w-xs">
                            <span className="text-sm text-gray-700 dark:text-gray-300 font-mono flex-1 truncate">
                              {apiKey.key}
                            </span>
                            <button
                              onClick={() => handleCopyKey(apiKey.key)}
                              className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                              title={t('apiKeys.copyToClipboard')}
                            >
                              <CopyIcon className="w-4 h-4" />
                            </button>
                          </div>
                          {/* Refresh Button */}
                          <button
                            onClick={() => loadApiKeys()}
                            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            title="Refresh API Key"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(apiKey.status)}`}>
                        {t(`apiKeys.${apiKey.status}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {apiKey.created}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {apiKey.lastUsed || t('apiKeys.neverUsed')}
                    </td>
                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={apiKey.isEnabled}
                          onChange={() => handleToggleStatus(apiKey.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteKey(apiKey.id, apiKey.name)}
                          className="p-1.5 text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400 transition-colors"
                          title={t('apiKeys.deleteKey')}
                        >
                          <TrashBinIcon className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                          title={t('apiKeys.editKey')}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Generate API Key Modal */}
      <GenerateApiKeyModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onApiKeyGenerated={loadApiKeys}
      />
    </div>
  );
}
