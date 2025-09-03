export interface CompanyInfo {
  name: string;
  tagline: string;
  logo: {
    light: string;
    dark: string;
    auth: string;
  };
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface AppStoreLink {
  name: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  enabled: boolean;
}

export interface ContactInfo {
  email: string;
  support: string;
  sales: string;
  hotline: string;
  enabled: boolean;
}

export interface FeatureFlags {
  showSocialLinks: boolean;
  showAppStoreLinks: boolean;
  showBranches: boolean;
  showContactInfo: boolean;
  showThemeToggle: boolean;
  enableAnalytics: boolean;
  enableNotifications: boolean;
}

export interface AppConfig {
  company: CompanyInfo;
  socialLinks: SocialLink[];
  appStoreLinks: AppStoreLink[];
  branches: Branch[];
  contact: ContactInfo;
  features: FeatureFlags;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
} 