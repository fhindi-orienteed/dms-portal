import { useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  enabled: boolean;
  isRTL: boolean;
}

export interface AppConfig {
  company: {
    name: string;
    tagline: string;
    logo: {
      light: string;
      dark: string;
      auth: string;
    };
    description: string;
  };
  features: {
    showSocialLinks: boolean;
    showAppStoreLinks: boolean;
    showBranches: boolean;
    showContactInfo: boolean;
    showThemeToggle: boolean;
    enableAnalytics: boolean;
    enableNotifications: boolean;
    enableLanguageSwitcher: boolean;
  };
  languages: Language[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

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

  return {
    config,
    loading,
    error,
    getEnabledLanguages,
    isLanguageSwitcherEnabled,
  };
};