import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Form from "../../components/form/Form";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Switch from "../../components/form/switch/Switch";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import { useLanguage } from "../../context/LanguageContext";
import { useAppConfig } from "../../context/AppConfig";
import { toast } from "react-hot-toast";
import { AppConfig } from "../../types/AppConfig";

interface SystemSettings {
  // API Configuration
  apiBaseUrl: string;
  apiTimeout: number;
  apiRetryAttempts: number;
  apiRetryDelay: number;
  
  // Application Settings
  appName: string;
  appTagline: string;
  appDescription: string;
  
  // Feature Toggles
  showSocialLinks: boolean;
  showAppStoreLinks: boolean;
  showBranches: boolean;
  showContactInfo: boolean;
  showThemeToggle: boolean;
  enableAnalytics: boolean;
  enableNotifications: boolean;
  enableLanguageSwitcher: boolean;
  
  // Theme Settings
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // Contact Information
  contactEmail: string;
  supportEmail: string;
  salesEmail: string;
  hotline: string;
  
  // Security Settings
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  requireTwoFactor: boolean;
  
  // Maintenance Settings
  maintenanceMode: boolean;
  maintenanceMessage: string;
  
  // Logging Settings
  enableLogging: boolean;
  logLevel: string;
  maxLogFiles: number;
}

export default function SystemSettings() {
  const { t } = useLanguage();
  const { config, updateConfig } = useAppConfig();
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState<SystemSettings>({
    // API Configuration
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://api-dms.orienteed.ps/v1/web',
    apiTimeout: 30000,
    apiRetryAttempts: 3,
    apiRetryDelay: 1000,
    
    // Application Settings
    appName: config?.company?.name || "DMS Portal",
    appTagline: config?.company?.tagline || "Delivery Management System",
    appDescription: config?.company?.description || "Professional delivery management solution",
    
    // Feature Toggles
    showSocialLinks: config?.features?.showSocialLinks ?? true,
    showAppStoreLinks: config?.features?.showAppStoreLinks ?? true,
    showBranches: config?.features?.showBranches ?? true,
    showContactInfo: config?.features?.showContactInfo ?? true,
    showThemeToggle: config?.features?.showThemeToggle ?? true,
    enableAnalytics: config?.features?.enableAnalytics ?? true,
    enableNotifications: config?.features?.enableNotifications ?? true,
    enableLanguageSwitcher: config?.features?.enableLanguageSwitcher ?? true,
    
    // Theme Settings
    primaryColor: config?.theme?.primaryColor || "#3B82F6",
    secondaryColor: config?.theme?.secondaryColor || "#1E40AF",
    accentColor: config?.theme?.accentColor || "#F59E0B",
    
    // Contact Information
    contactEmail: config?.contact?.email || "info@dms.com",
    supportEmail: config?.contact?.support || "support@dms.com",
    salesEmail: config?.contact?.sales || "sales@dms.com",
    hotline: config?.contact?.hotline || "+970 59 999 9999",
    
    // Security Settings
    sessionTimeout: 3600, // 1 hour
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireTwoFactor: false,
    
    // Maintenance Settings
    maintenanceMode: false,
    maintenanceMessage: "System is currently under maintenance. Please try again later.",
    
    // Logging Settings
    enableLogging: true,
    logLevel: "info",
    maxLogFiles: 10,
  });

  const logLevelOptions = [
    { value: "debug", label: t('system.debug') || "Debug" },
    { value: "info", label: t('system.info') || "Info" },
    { value: "warn", label: t('system.warn') || "Warning" },
    { value: "error", label: t('system.error') || "Error" },
  ];

  const handleInputChange = (field: keyof SystemSettings, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the app configuration
      const updatedConfig = {
        company: {
          name: settings.appName,
          tagline: settings.appTagline,
          description: settings.appDescription,
        },
        features: {
          showSocialLinks: settings.showSocialLinks,
          showAppStoreLinks: settings.showAppStoreLinks,
          showBranches: settings.showBranches,
          showContactInfo: settings.showContactInfo,
          showThemeToggle: settings.showThemeToggle,
          enableAnalytics: settings.enableAnalytics,
          enableNotifications: settings.enableNotifications,
          enableLanguageSwitcher: settings.enableLanguageSwitcher,
        },
        theme: {
          primaryColor: settings.primaryColor,
          secondaryColor: settings.secondaryColor,
          accentColor: settings.accentColor,
        },
        contact: {
          email: settings.contactEmail,
          support: settings.supportEmail,
          sales: settings.salesEmail,
          hotline: settings.hotline,
        },
      };
      
      updateConfig(updatedConfig as Partial<AppConfig>);
      
      toast.success(t('system.settingsUpdatedSuccessfully') || 'System settings updated successfully!');
    } catch (error) {
      toast.error(t('system.updateFailed') || 'Failed to update system settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (field: keyof SystemSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field: keyof SystemSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <PageMeta
        title="System Settings | DMS Portal"
        description="Manage system configuration and settings"
      />
      <PageBreadcrumb pageTitle={t('settings.systemSettings')} />
      
      <div className="space-y-6">
        {/* API Configuration */}
        <ComponentCard
          title={t('system.apiConfiguration')}
          desc={t('system.apiConfigurationDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="apiBaseUrl">{t('system.apiBaseUrl')}</Label>
                <Input
                  type="url"
                  id="apiBaseUrl"
                  value={settings.apiBaseUrl}
                  onChange={(e) => handleInputChange('apiBaseUrl', e.target.value)}
                  placeholder="https://api.example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="apiTimeout">{t('system.apiTimeout')} (ms)</Label>
                <Input
                  type="number"
                  id="apiTimeout"
                  value={settings.apiTimeout}
                  onChange={(e) => handleInputChange('apiTimeout', parseInt(e.target.value))}
                  placeholder="30000"
                />
              </div>
              
              <div>
                <Label htmlFor="apiRetryAttempts">{t('system.apiRetryAttempts')}</Label>
                <Input
                  type="number"
                  id="apiRetryAttempts"
                  value={settings.apiRetryAttempts}
                  onChange={(e) => handleInputChange('apiRetryAttempts', parseInt(e.target.value))}
                  placeholder="3"
                />
              </div>
              
              <div>
                <Label htmlFor="apiRetryDelay">{t('system.apiRetryDelay')} (ms)</Label>
                <Input
                  type="number"
                  id="apiRetryDelay"
                  value={settings.apiRetryDelay}
                  onChange={(e) => handleInputChange('apiRetryDelay', parseInt(e.target.value))}
                  placeholder="1000"
                />
              </div>
            </div>
          </Form>
        </ComponentCard>

        {/* Application Settings */}
        <ComponentCard
          title={t('system.applicationSettings')}
          desc={t('system.applicationSettingsDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="appName">{t('system.appName')}</Label>
                <Input
                  type="text"
                  id="appName"
                  value={settings.appName}
                  onChange={(e) => handleInputChange('appName', e.target.value)}
                  placeholder={t('system.appName')}
                />
              </div>
              
              <div>
                <Label htmlFor="appTagline">{t('system.appTagline')}</Label>
                <Input
                  type="text"
                  id="appTagline"
                  value={settings.appTagline}
                  onChange={(e) => handleInputChange('appTagline', e.target.value)}
                  placeholder={t('system.appTagline')}
                />
              </div>
              
              <div>
                <Label htmlFor="appDescription">{t('system.appDescription')}</Label>
                <TextArea
                  value={settings.appDescription}
                  onChange={(value) => handleInputChange('appDescription', value)}
                  rows={3}
                  placeholder={t('system.appDescription')}
                />
              </div>
            </div>
          </Form>
        </ComponentCard>

        {/* Feature Toggles */}
        <ComponentCard
          title={t('system.featureToggles')}
          desc={t('system.featureTogglesDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('system.showSocialLinks')}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('system.showSocialLinksDesc')}
                    </p>
                  </div>
                  <Switch
                    label=""
                    defaultChecked={settings.showSocialLinks}
                    onChange={(checked) => handleToggle('showSocialLinks', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('system.showAppStoreLinks')}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('system.showAppStoreLinksDesc')}
                    </p>
                  </div>
                  <Switch
                    label=""
                    defaultChecked={settings.showAppStoreLinks}
                    onChange={(checked) => handleToggle('showAppStoreLinks', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('system.showBranches')}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('system.showBranchesDesc')}
                    </p>
                  </div>
                  <Switch
                    label=""
                    defaultChecked={settings.showBranches}
                    onChange={(checked) => handleToggle('showBranches', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('system.showContactInfo')}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('system.showContactInfoDesc')}
                    </p>
                  </div>
                  <Switch
                    label=""
                    defaultChecked={settings.showContactInfo}
                    onChange={(checked) => handleToggle('showContactInfo', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('system.showThemeToggle')}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('system.showThemeToggleDesc')}
                    </p>
                  </div>
                  <Switch
                    label=""
                    defaultChecked={settings.showThemeToggle}
                    onChange={(checked) => handleToggle('showThemeToggle', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('system.enableAnalytics')}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('system.enableAnalyticsDesc')}
                    </p>
                  </div>
                  <Switch
                    label=""
                    defaultChecked={settings.enableAnalytics}
                    onChange={(checked) => handleToggle('enableAnalytics', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('system.enableNotifications')}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('system.enableNotificationsDesc')}
                    </p>
                  </div>
                  <Switch
                    label=""
                    defaultChecked={settings.enableNotifications}
                    onChange={(checked) => handleToggle('enableNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('system.enableLanguageSwitcher')}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('system.enableLanguageSwitcherDesc')}
                    </p>
                  </div>
                  <Switch
                    label=""
                    defaultChecked={settings.enableLanguageSwitcher}
                    onChange={(checked) => handleToggle('enableLanguageSwitcher', checked)}
                  />
                </div>
              </div>
            </div>
          </Form>
        </ComponentCard>

        {/* Theme Settings */}
        <ComponentCard
          title={t('system.themeSettings')}
          desc={t('system.themeSettingsDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <Label htmlFor="primaryColor">{t('system.primaryColor')}</Label>
                <Input
                  type="color"
                  id="primaryColor"
                  value={settings.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="secondaryColor">{t('system.secondaryColor')}</Label>
                <Input
                  type="color"
                  id="secondaryColor"
                  value={settings.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="accentColor">{t('system.accentColor')}</Label>
                <Input
                  type="color"
                  id="accentColor"
                  value={settings.accentColor}
                  onChange={(e) => handleInputChange('accentColor', e.target.value)}
                />
              </div>
            </div>
          </Form>
        </ComponentCard>

        {/* Contact Information */}
        <ComponentCard
          title={t('system.contactInformation')}
          desc={t('system.contactInformationDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="contactEmail">{t('system.contactEmail')}</Label>
                <Input
                  type="email"
                  id="contactEmail"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="info@company.com"
                />
              </div>
              
              <div>
                <Label htmlFor="supportEmail">{t('system.supportEmail')}</Label>
                <Input
                  type="email"
                  id="supportEmail"
                  value={settings.supportEmail}
                  onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                  placeholder="support@company.com"
                />
              </div>
              
              <div>
                <Label htmlFor="salesEmail">{t('system.salesEmail')}</Label>
                <Input
                  type="email"
                  id="salesEmail"
                  value={settings.salesEmail}
                  onChange={(e) => handleInputChange('salesEmail', e.target.value)}
                  placeholder="sales@company.com"
                />
              </div>
              
              <div>
                <Label htmlFor="hotline">{t('system.hotline')}</Label>
                <Input
                  type="tel"
                  id="hotline"
                  value={settings.hotline}
                  onChange={(e) => handleInputChange('hotline', e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>
          </Form>
        </ComponentCard>

        {/* Security Settings */}
        <ComponentCard
          title={t('system.securitySettings')}
          desc={t('system.securitySettingsDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="sessionTimeout">{t('system.sessionTimeout')} (seconds)</Label>
                <Input
                  type="number"
                  id="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                  placeholder="3600"
                />
              </div>
              
              <div>
                <Label htmlFor="maxLoginAttempts">{t('system.maxLoginAttempts')}</Label>
                <Input
                  type="number"
                  id="maxLoginAttempts"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
                  placeholder="5"
                />
              </div>
              
              <div>
                <Label htmlFor="passwordMinLength">{t('system.passwordMinLength')}</Label>
                <Input
                  type="number"
                  id="passwordMinLength"
                  value={settings.passwordMinLength}
                  onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
                  placeholder="8"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('system.requireTwoFactor')}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('system.requireTwoFactorDesc')}
                  </p>
                </div>
                <Switch
                  label=""
                  defaultChecked={settings.requireTwoFactor}
                  onChange={(checked) => handleToggle('requireTwoFactor', checked)}
                />
              </div>
            </div>
          </Form>
        </ComponentCard>

        {/* Maintenance Settings */}
        <ComponentCard
          title={t('system.maintenanceSettings')}
          desc={t('system.maintenanceSettingsDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('system.maintenanceMode')}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('system.maintenanceModeDesc')}
                  </p>
                </div>
                <Switch
                  label=""
                  defaultChecked={settings.maintenanceMode}
                  onChange={(checked) => handleToggle('maintenanceMode', checked)}
                />
              </div>

              {settings.maintenanceMode && (
                <div>
                  <Label htmlFor="maintenanceMessage">{t('system.maintenanceMessage')}</Label>
                  <TextArea
                    value={settings.maintenanceMessage}
                    onChange={(value) => handleInputChange('maintenanceMessage', value)}
                    rows={3}
                    placeholder={t('system.maintenanceMessage')}
                  />
                </div>
              )}
            </div>
          </Form>
        </ComponentCard>

        {/* Logging Settings */}
        <ComponentCard
          title={t('system.loggingSettings')}
          desc={t('system.loggingSettingsDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('system.enableLogging')}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('system.enableLoggingDesc')}
                  </p>
                </div>
                <Switch
                  label=""
                  defaultChecked={settings.enableLogging}
                  onChange={(checked) => handleToggle('enableLogging', checked)}
                />
              </div>

              {settings.enableLogging && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label>{t('system.logLevel')}</Label>
                    <Select
                      options={logLevelOptions}
                      placeholder={t('system.selectLogLevel')}
                      onChange={(value) => handleSelectChange('logLevel', value)}
                      defaultValue={settings.logLevel}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="maxLogFiles">{t('system.maxLogFiles')}</Label>
                    <Input
                      type="number"
                      id="maxLogFiles"
                      value={settings.maxLogFiles}
                      onChange={(e) => handleInputChange('maxLogFiles', parseInt(e.target.value))}
                      placeholder="10"
                    />
                  </div>
                </div>
              )}
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
