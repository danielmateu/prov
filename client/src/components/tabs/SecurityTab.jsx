import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useSettings } from '../../contexts/SettingsContext';
import ToggleSwitch from '../ToggleSwitch';
import { Shield, Lock, Clock } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { Button } from '../ui/button';
import { format } from "@formkit/tempo";
import { Select, SelectTrigger } from '../ui/select';


const SecurityTab = () => {
    const { t } = useTranslation();
    const { security, updateSecurity } = useSettings();
    const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);

    return (
        <div className="py-6 space-y-8">
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-primary-600 dark:text-primary-400" />
                    {t('AccountSecurity')}
                </h3>
                <div className="space-y-4">
                    <ToggleSwitch
                        checked={security.twoFactor}
                        onChange={(checked) => {
                            if (checked) {
                                setShowTwoFactorModal(true);
                            } else {
                                updateSecurity({ twoFactor: false });
                            }
                        }}
                        label={t('TwoFactorAuth')}
                        description={t('TwoFactorAuthDesc')}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-primary-600 dark:text-primary-400" />
                    {t('SessionManagement')}
                </h3>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            {t('SessionTimeout')}
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            {t('SessionTimeoutDesc')}
                        </p>
                        <select
                            id="sessionTimeout"
                            value={security.sessionTimeout}
                            onChange={(e) => updateSecurity({ sessionTimeout: Number(e.target.value) })}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:w-auto dark:bg-gray-700 dark:text-white"
                        >
                            <option value={15}>15 {t('Minutes')}</option>
                            <option value={30}>30 {t('Minutes')}</option>
                            <option value={60}>1 {t('Hour')}</option>
                            <option value={120}>2 {t('Hours')}</option>
                            <option value={240}>4 {t('Hours')}</option>
                            <option value={1440}>1 {t('Day')}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Lock size={20} className="text-primary-600 dark:text-primary-400" />
                    {t('PasswordSecurity')}
                </h3>

                <div className="space-y-4">
                    <Button
                        variant="outline"
                    >
                        {t('ChangePassword')}
                    </Button>

                    <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('LastPasswordChange')}: <span className="text-gray-900 dark:text-white">
                                {format(new Date(), 'long')}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {showTwoFactorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            {t('SetupTwoFactor')}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {t('TwoFactorInstructions')}
                        </p>

                        <div className="flex justify-end space-x-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setShowTwoFactorModal(false)}
                            // className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                {t('Cancel')}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    updateSecurity({ twoFactor: true });
                                    setShowTwoFactorModal(false);
                                }}
                                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                {t('Continue')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecurityTab;