import React, { useEffect, useState } from 'react';
import { Settings, ShieldCheck } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AccountTab from '@/components/tabs/AccountTab';
import SettingsTabs from '@/components/SettingsTabs';
import CommunityTab from '@/components/tabs/CommunityTab';
import NotificationsTab from '@/components/tabs/NotificationsTab';
import SecurityTab from '@/components/tabs/SecurityTab';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import ThemeSwitcher from '@/components/theme-switcher';
import { useUserInfoStore } from '@/zustand/userInfoStore';

export default function SettingsPage() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = 'Rapitecnic | ' + t('Settings');
    }, []);

    const [activeTab, setActiveTab] = useState('account');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'account':
                return <AccountTab
                    userInfo={userInfo}
                />;
            case 'community':
                return <CommunityTab />;
            case 'notifications':
                return <NotificationsTab />;
            case 'security':
                return <SecurityTab />;
            default:
                return <AccountTab />;
        }
    };

    const userInfo = useUserInfoStore((state) => state.userInfo);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 flex flex-col h-[calc(100dvh-85px)]">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                            {t('Settings')}
                        </h2>
                        <div className="flex items-center gap-2">
                            <Settings size={18} className="text-slate-500 dark:text-slate-400" />
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                <Trans i18nKey="AppSettings">
                                    Configuración de la aplicación
                                </Trans>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Tabs defaultValue="lenguage" className='col-span-2 lg:col-span-1' >
                        <TabsList>
                            <TabsTrigger value="lenguage">Idioma</TabsTrigger>
                            <TabsTrigger value="theme">
                                Tema
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="theme">
                            <ThemeSwitcher />
                        </TabsContent>
                        <TabsContent value="lenguage">
                            <LanguageSwitcher />
                        </TabsContent>
                    </Tabs>
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden col-span-2">
                        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

                        <div className="px-4 sm:px-6 lg:px-8">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </div >
    );
}