import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

// Initialize i18n synchronously first
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

// Load app config and update i18n configuration asynchronously
const loadAppConfigAndUpdateI18n = async () => {
  try {
    const response = await fetch('/app-config.json');
    const config = await response.json();
    const availableLanguages = config.languages || [];
    
    // Only include languages that are enabled in app config
    const enabledLanguages = availableLanguages.filter((lang: any) => lang.enabled);
    const supportedLanguages = enabledLanguages.map((lang: any) => lang.code);

    if (supportedLanguages.length > 0) {
      // Update i18n configuration with supported languages from config
      i18n.changeLanguage(supportedLanguages.includes(i18n.language) ? i18n.language : supportedLanguages[0]);
    }
  } catch (error) {
    console.error('Error loading app config for i18n:', error);
  }
};

// Load config in background
loadAppConfigAndUpdateI18n();

export default i18n;
