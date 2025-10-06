import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Form from "../../components/form/Form";
import Label from "../../components/form/Label";
import Switch from "../../components/form/switch/Switch";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import { useLanguage } from "../../context/LanguageContext";
import { toast } from "react-hot-toast";

interface NotificationSettings {
  // Email Notifications
  emailNotifications: boolean;
  emailDeliveryUpdates: boolean;
  emailPaymentReminders: boolean;
  emailSystemAlerts: boolean;
  emailMarketing: boolean;
  emailWeeklyReport: boolean;
  
  // Push Notifications
  pushNotifications: boolean;
  pushDeliveryUpdates: boolean;
  pushPaymentReminders: boolean;
  pushSystemAlerts: boolean;
  pushMarketing: boolean;
  
  // SMS Notifications
  smsNotifications: boolean;
  smsDeliveryUpdates: boolean;
  smsPaymentReminders: boolean;
  smsSystemAlerts: boolean;
  
  // Frequency Settings
  notificationFrequency: string;
  quietHours: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  
  // Sound Settings
  soundEnabled: boolean;
  soundType: string;
}

export default function NotificationSettings() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState<NotificationSettings>({
    // Email Notifications
    emailNotifications: true,
    emailDeliveryUpdates: true,
    emailPaymentReminders: true,
    emailSystemAlerts: true,
    emailMarketing: false,
    emailWeeklyReport: true,
    
    // Push Notifications
    pushNotifications: true,
    pushDeliveryUpdates: true,
    pushPaymentReminders: true,
    pushSystemAlerts: true,
    pushMarketing: false,
    
    // SMS Notifications
    smsNotifications: false,
    smsDeliveryUpdates: false,
    smsPaymentReminders: false,
    smsSystemAlerts: true,
    
    // Frequency Settings
    notificationFrequency: "immediate",
    quietHours: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
    
    // Sound Settings
    soundEnabled: true,
    soundType: "default",
  });

  const frequencyOptions = [
    { value: "immediate", label: t('notifications.immediate') || "Immediate" },
    { value: "hourly", label: t('notifications.hourly') || "Hourly Digest" },
    { value: "daily", label: t('notifications.daily') || "Daily Digest" },
    { value: "weekly", label: t('notifications.weekly') || "Weekly Summary" },
  ];

  const soundOptions = [
    { value: "default", label: t('notifications.defaultSound') || "Default" },
    { value: "soft", label: t('notifications.softSound') || "Soft" },
    { value: "loud", label: t('notifications.loudSound') || "Loud" },
    { value: "custom", label: t('notifications.customSound') || "Custom" },
  ];

  const handleToggle = (field: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field: keyof NotificationSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChange = (field: keyof NotificationSettings, value: string) => {
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
      
      toast.success(t('notifications.settingsUpdatedSuccessfully') || 'Notification settings updated successfully!');
    } catch (error) {
      toast.error(t('notifications.updateFailed') || 'Failed to update notification settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Notification Settings | DMS Portal"
        description="Manage your notification preferences and settings"
      />
      <PageBreadcrumb pageTitle={t('settings.notificationSettings')} />
      
      <div className="space-y-6">
        {/* Email Notifications */}
        <ComponentCard
          title={t('notifications.emailNotifications')}
          desc={t('notifications.emailNotificationsDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('notifications.enableEmailNotifications')}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('notifications.enableEmailNotificationsDesc')}
                  </p>
                </div>
                <Switch
                  label=""
                  defaultChecked={settings.emailNotifications}
                  onChange={(checked) => handleToggle('emailNotifications', checked)}
                />
              </div>

              {settings.emailNotifications && (
                <div className="space-y-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.deliveryUpdates')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.deliveryUpdatesDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.emailDeliveryUpdates}
                      onChange={(checked) => handleToggle('emailDeliveryUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.paymentReminders')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.paymentRemindersDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.emailPaymentReminders}
                      onChange={(checked) => handleToggle('emailPaymentReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.systemAlerts')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.systemAlertsDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.emailSystemAlerts}
                      onChange={(checked) => handleToggle('emailSystemAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.marketingEmails')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.marketingEmailsDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.emailMarketing}
                      onChange={(checked) => handleToggle('emailMarketing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.weeklyReport')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.weeklyReportDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.emailWeeklyReport}
                      onChange={(checked) => handleToggle('emailWeeklyReport', checked)}
                    />
                  </div>
                </div>
              )}
            </div>
          </Form>
        </ComponentCard>

        {/* Push Notifications */}
        <ComponentCard
          title={t('notifications.pushNotifications')}
          desc={t('notifications.pushNotificationsDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('notifications.enablePushNotifications')}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('notifications.enablePushNotificationsDesc')}
                  </p>
                </div>
                <Switch
                  label=""
                  defaultChecked={settings.pushNotifications}
                  onChange={(checked) => handleToggle('pushNotifications', checked)}
                />
              </div>

              {settings.pushNotifications && (
                <div className="space-y-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.deliveryUpdates')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.pushDeliveryUpdatesDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.pushDeliveryUpdates}
                      onChange={(checked) => handleToggle('pushDeliveryUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.paymentReminders')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.pushPaymentRemindersDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.pushPaymentReminders}
                      onChange={(checked) => handleToggle('pushPaymentReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.systemAlerts')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.pushSystemAlertsDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.pushSystemAlerts}
                      onChange={(checked) => handleToggle('pushSystemAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.marketingNotifications')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.marketingNotificationsDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.pushMarketing}
                      onChange={(checked) => handleToggle('pushMarketing', checked)}
                    />
                  </div>
                </div>
              )}
            </div>
          </Form>
        </ComponentCard>

        {/* SMS Notifications */}
        <ComponentCard
          title={t('notifications.smsNotifications')}
          desc={t('notifications.smsNotificationsDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('notifications.enableSmsNotifications')}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('notifications.enableSmsNotificationsDesc')}
                  </p>
                </div>
                <Switch
                  label=""
                  defaultChecked={settings.smsNotifications}
                  onChange={(checked) => handleToggle('smsNotifications', checked)}
                />
              </div>

              {settings.smsNotifications && (
                <div className="space-y-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.deliveryUpdates')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.smsDeliveryUpdatesDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.smsDeliveryUpdates}
                      onChange={(checked) => handleToggle('smsDeliveryUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.paymentReminders')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.smsPaymentRemindersDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.smsPaymentReminders}
                      onChange={(checked) => handleToggle('smsPaymentReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('notifications.systemAlerts')}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('notifications.smsSystemAlertsDesc')}
                      </p>
                    </div>
                    <Switch
                      label=""
                      defaultChecked={settings.smsSystemAlerts}
                      onChange={(checked) => handleToggle('smsSystemAlerts', checked)}
                    />
                  </div>
                </div>
              )}
            </div>
          </Form>
        </ComponentCard>

        {/* Frequency & Timing Settings */}
        <ComponentCard
          title={t('notifications.frequencyAndTiming')}
          desc={t('notifications.frequencyAndTimingDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label>{t('notifications.notificationFrequency')}</Label>
                <Select
                  options={frequencyOptions}
                  placeholder={t('notifications.selectFrequency')}
                  onChange={(value) => handleSelectChange('notificationFrequency', value)}
                  defaultValue={settings.notificationFrequency}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('notifications.quietHours')}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('notifications.quietHoursDesc')}
                  </p>
                </div>
                <Switch
                  label=""
                  defaultChecked={settings.quietHours}
                  onChange={(checked) => handleToggle('quietHours', checked)}
                />
              </div>
            </div>

            {settings.quietHours && (
              <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="quietHoursStart">{t('notifications.quietHoursStart')}</Label>
                  <Input
                    type="time"
                    id="quietHoursStart"
                    value={settings.quietHoursStart}
                    onChange={(e) => handleInputChange('quietHoursStart', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="quietHoursEnd">{t('notifications.quietHoursEnd')}</Label>
                  <Input
                    type="time"
                    id="quietHoursEnd"
                    value={settings.quietHoursEnd}
                    onChange={(e) => handleInputChange('quietHoursEnd', e.target.value)}
                  />
                </div>
              </div>
            )}
          </Form>
        </ComponentCard>

        {/* Sound Settings */}
        <ComponentCard
          title={t('notifications.soundSettings')}
          desc={t('notifications.soundSettingsDesc')}
        >
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('notifications.enableSound')}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('notifications.enableSoundDesc')}
                  </p>
                </div>
                <Switch
                  label=""
                  defaultChecked={settings.soundEnabled}
                  onChange={(checked) => handleToggle('soundEnabled', checked)}
                />
              </div>

              {settings.soundEnabled && (
                <div>
                  <Label>{t('notifications.soundType')}</Label>
                  <Select
                    options={soundOptions}
                    placeholder={t('notifications.selectSoundType')}
                    onChange={(value) => handleSelectChange('soundType', value)}
                    defaultValue={settings.soundType}
                  />
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
