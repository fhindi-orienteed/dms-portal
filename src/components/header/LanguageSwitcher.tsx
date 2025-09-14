import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppConfig } from '../../hooks/useAppConfig';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import Button from '../ui/button/Button';
import { ChevronDownIcon } from '../../icons';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, isRTL } = useTranslation();
  const { getEnabledLanguages, isLanguageSwitcherEnabled, loading } = useAppConfig();
  const [isOpen, setIsOpen] = useState(false);

  const languages = getEnabledLanguages();

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Don't render if language switcher is disabled or still loading
  if (loading || !isLanguageSwitcherEnabled() || languages.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        onClick={toggleDropdown}
        className="flex items-center gap-2"
        aria-label="Switch Language"
        variant="outline"
        size="md"
      >
        <span>{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.nativeName}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </Button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className={`absolute z-20 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 ${
          isRTL ? 'left-0' : 'right-0'
        }`}
      >
        <div className="py-1">
          {languages.map((language) => (
            <DropdownItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                currentLanguage === language.code
                  ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.nativeName}</span>
              {currentLanguage === language.code && (
                <svg
                  className={`w-4 h-4 text-blue-600 dark:text-blue-400 ${isRTL ? 'mr-auto' : 'ml-auto'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </DropdownItem>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;
