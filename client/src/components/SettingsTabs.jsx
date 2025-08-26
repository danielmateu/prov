import React, { useState } from 'react';
import { User, Users, Bell, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const SettingsTabs = ({ activeTab, onTabChange }) => {
    const { t } = useTranslation();

    const tabs = [
        // { id: 'account', label: t('Account'), icon: <User size={18} /> },
        { id: 'account', label: (t('Cuenta')), icon: <User size={18} /> },
        // { id: 'community', label: t('Community'), icon: <Users size={18} /> },
        // { id: 'community', label: 'Comunidad', icon: <Users size={18} /> },
        // { id: 'notifications', label: t('Notifications'), icon: <Bell size={18} /> },
        { id: 'notifications', label: (t('Notificaciones')), icon: <Bell size={18} /> },
        // { id: 'security', label: t('Security'), icon: <Lock size={18} /> }
        { id: 'security', label: (t('Seguridad')), icon: <Lock size={18} /> }
    ];

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex items-center pl-6 space-x-8 overflow-x-auto" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        // disabled={tab.id === 'notifications' && !activeTab.includes('notifications')}
                        disabled
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                            ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                            }`}
                        aria-current={activeTab === tab.id ? 'page' : undefined}
                    >
                        <span className="text-current">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default SettingsTabs;