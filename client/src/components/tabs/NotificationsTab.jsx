import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useSettings } from '../../contexts/SettingsContext';
import ToggleSwitch from '../ToggleSwitch';
import { Bell, Mail, MessageSquare } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

const NotificationsTab = () => {
    const { t } = useTranslation();
    const { notifications, updateNotifications } = useSettings();

    return (
        <div className="py-6 space-y-8">
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Mail size={20} className="text-primary-600 dark:text-primary-400" />
                    {t('EmailNotifications')}
                </h3>
                <div className="space-y-4">
                    <ToggleSwitch
                        checked={notifications.email}
                        onChange={(checked) => updateNotifications({ email: checked })}
                        label={t('EmailUpdates')}
                        description={t('EmailUpdatesDesc')}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Bell size={20} className="text-primary-600 dark:text-primary-400" />
                    {t('PushNotifications')}
                </h3>
                <div className="space-y-4">
                    <ToggleSwitch
                        checked={notifications.push}
                        onChange={(checked) => updateNotifications({ push: checked })}
                        label={t('DeviceNotifications')}
                        description={t('DeviceNotificationsDesc')}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MessageSquare size={20} className="text-primary-600 dark:text-primary-400" />
                    {t('AppUpdates')}
                </h3>
                <div className="space-y-4">
                    <ToggleSwitch
                        checked={notifications.updates}
                        onChange={(checked) => updateNotifications({ updates: checked })}
                        label={t('ProductUpdates')}
                        description={t('ProductUpdatesDesc')}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotificationsTab;