import { useState, useEffect } from 'react';
import type { AppConfig, Language } from '../types';

export const useAppConfig = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/app-config.json');
        if (!response.ok) {
          throw new Error('Failed to load app configuration');
        }
        const appConfig = await response.json();
        setConfig(appConfig);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error loading app config:', err);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const getEnabledLanguages = (): Language[] => {
    if (!config) return [];
    return config.languages.filter(lang => lang.enabled);
  };

  const isLanguageSwitcherEnabled = (): boolean => {
    return config?.features.enableLanguageSwitcher ?? false;
  };

  // Company info
  const companyName = config?.company.name ?? '';
  const companyTagline = config?.company.tagline ?? '';
  const companyLogo = config?.company.logo ?? { light: '', dark: '', auth: '' };

  // Enabled items
  const enabledSocialLinks = config?.socialLinks.filter(link => link.enabled) ?? [];
  const enabledAppStoreLinks = config?.appStoreLinks.filter(link => link.enabled) ?? [];
  const enabledBranches = config?.branches.filter(branch => branch.enabled) ?? [];

  // Contact info
  const contactInfo = config?.contact ?? {
    email: '',
    support: '',
    sales: '',
    hotline: '',
    enabled: false
  };

  // Feature flags
  const isFeatureEnabled = (feature: keyof NonNullable<AppConfig>['features']): boolean => {
    return config?.features[feature] ?? false;
  };

  return {
    config,
    loading,
    error,
    getEnabledLanguages,
    isLanguageSwitcherEnabled,
    companyName,
    companyTagline,
    companyLogo,
    enabledSocialLinks,
    enabledAppStoreLinks,
    enabledBranches,
    contactInfo,
    isFeatureEnabled,
  };
};