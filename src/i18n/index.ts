import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

// Load app config to get available languages
const loadAppConfig = async () => {
  try {
    const response = await fetch('/app-config.json');
    const config = await response.json();
    return config.languages || [];
  } catch (error) {
    console.error('Error loading app config:', error);
    return [];
  }
};

// Initialize i18n with dynamic language support
const initializeI18n = async () => {
  const availableLanguages = await loadAppConfig();
  
  // Build resources object dynamically
  const resources: { [key: string]: { translation: any } } = {
    en: { translation: enTranslations },
    ar: { translation: arTranslations },
  };

  // Only include languages that are enabled in app config
  const enabledLanguages = availableLanguages.filter((lang: any) => lang.enabled);
  const supportedLanguages = enabledLanguages.map((lang: any) => lang.code);

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      supportedLngs: supportedLanguages.length > 0 ? supportedLanguages : ['en', 'ar'],
      debug: process.env.NODE_ENV === 'development',
      
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },

      interpolation: {
        escapeValue: false, // React already does escaping
      },
    });
};

// Initialize i18n
initializeI18n();

export default i18n;
