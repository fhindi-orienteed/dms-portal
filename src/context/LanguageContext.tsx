import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  isRTL: boolean;
  changeLanguage: (language: string) => void;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [isRTL, setIsRTL] = useState(currentLanguage === 'ar');

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
      setIsRTL(lng === 'ar');
      
      // Update document direction and language
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lng;
      
      // Add/remove RTL class to body for Tailwind RTL support
      if (lng === 'ar') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    };

    // Set initial language
    handleLanguageChange(currentLanguage);

    // Check if i18n is ready and has the on method
    if (i18n && typeof i18n.on === 'function') {
      // Listen for language changes
      i18n.on('languageChanged', handleLanguageChange);

      return () => {
        if (i18n && typeof i18n.off === 'function') {
          i18n.off('languageChanged', handleLanguageChange);
        }
      };
    } else {
      // If i18n is not ready, set up a retry mechanism
      const retryInterval = setInterval(() => {
        if (i18n && typeof i18n.on === 'function') {
          clearInterval(retryInterval);
          i18n.on('languageChanged', handleLanguageChange);
        }
      }, 100);

      return () => {
        clearInterval(retryInterval);
        if (i18n && typeof i18n.off === 'function') {
          i18n.off('languageChanged', handleLanguageChange);
        }
      };
    }
  }, [i18n, currentLanguage]);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const value: LanguageContextType = {
    currentLanguage,
    isRTL,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
