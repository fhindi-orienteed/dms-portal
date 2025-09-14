import { useLanguage } from '../context/LanguageContext';

export const useTranslation = () => {
  const { t, currentLanguage, isRTL, changeLanguage } = useLanguage();
  
  return {
    t,
    currentLanguage,
    isRTL,
    changeLanguage,
  };
};
