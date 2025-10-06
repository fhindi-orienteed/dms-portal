import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Form from "../../components/form/Form";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

interface AccountSettingsForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  language: string;
  timezone: string;
  company: string;
  jobTitle: string;
}

export default function AccountSettings() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<AccountSettingsForm>({
    firstName: user?.name || "",
    lastName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    language: "en",
    timezone: "UTC",
    company: user?.name || "",
    jobTitle: user?.name || "",
  });

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "ar", label: "العربية" },
  ];

  const timezoneOptions = [
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    { value: "EST", label: "Eastern Standard Time" },
    { value: "PST", label: "Pacific Standard Time" },
    { value: "GMT", label: "Greenwich Mean Time" },
    { value: "CET", label: "Central European Time" },
  ];

  const handleInputChange = (field: keyof AccountSettingsForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(t('settings.accountUpdatedSuccessfully') || 'Account settings updated successfully!');
    } catch (error) {
      toast.error(t('settings.updateFailed') || 'Failed to update account settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (field: keyof AccountSettingsForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <PageMeta
        title="Account Settings | DMS Portal"
        description="Manage your account settings and preferences"
      />
      <PageBreadcrumb pageTitle={t('settings.accountSettings')} />
      
      <div className="space-y-6">
        {/* Personal Information */}
        <ComponentCard
          title={t('settings.personalInformation')}
          desc={t('settings.personalInformationDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">{t('profile.firstName')}</Label>
                <Input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder={t('profile.firstName')}
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">{t('profile.lastName')}</Label>
                <Input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder={t('profile.lastName')}
                />
              </div>
              
              <div>
                <Label htmlFor="email">{t('profile.emailAddress')}</Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t('profile.emailAddress')}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">{t('profile.phone')}</Label>
                <Input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={t('profile.phone')}
                />
              </div>
            </div>
          </Form>
        </ComponentCard>

        {/* Professional Information */}
        <ComponentCard
          title={t('settings.professionalInformation')}
          desc={t('settings.professionalInformationDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="company">{t('settings.company')}</Label>
                <Input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder={t('settings.company')}
                />
              </div>
              
              <div>
                <Label htmlFor="jobTitle">{t('settings.jobTitle')}</Label>
                <Input
                  type="text"
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder={t('settings.jobTitle')}
                />
              </div>
            </div>
          </Form>
        </ComponentCard>

        {/* Preferences */}
        <ComponentCard
          title={t('settings.preferences')}
          desc={t('settings.preferencesDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label>{t('settings.language')}</Label>
                <Select
                  options={languageOptions}
                  placeholder={t('settings.selectLanguage')}
                  onChange={(value) => handleSelectChange('language', value)}
                  defaultValue={formData.language}
                />
              </div>
              
              <div>
                <Label>{t('settings.timezone')}</Label>
                <Select
                  options={timezoneOptions}
                  placeholder={t('settings.selectTimezone')}
                  onChange={(value) => handleSelectChange('timezone', value)}
                  defaultValue={formData.timezone}
                />
              </div>
            </div>
          </Form>
        </ComponentCard>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t('common.saving') || 'Saving...'}
              </>
            ) : (
              t('common.save')
            )}
          </button>
        </div>
      </div>
    </>
  );
}
