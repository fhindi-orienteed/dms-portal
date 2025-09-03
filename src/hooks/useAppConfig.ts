import { useAppConfig as useAppConfigContext } from "../context/AppConfig";
import type { AppConfig } from "../types";

export const useAppConfig = () => {
  const { config, updateConfig, resetConfig, isLoaded } = useAppConfigContext();
  
  return {
    companyName: config.company.name,
    companyTagline: config.company.tagline,
    companyLogo: config.company.logo,
    companyDescription: config.company.description,
    
    socialLinks: config.socialLinks,
    enabledSocialLinks: config.socialLinks.filter(link => link.enabled),
    
    appStoreLinks: config.appStoreLinks,
    enabledAppStoreLinks: config.appStoreLinks.filter(link => link.enabled),
    
    branches: config.branches,
    enabledBranches: config.branches.filter(branch => branch.enabled),
    
    contactInfo: config.contact,
    
    features: config.features,
    isFeatureEnabled: (feature: keyof AppConfig['features']) => config.features[feature],
    
    theme: config.theme,
    
    updateConfig,
    resetConfig,
    isLoaded,
    config
  };
};