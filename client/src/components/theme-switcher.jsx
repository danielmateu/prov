import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const ThemeSwitcher = () => {
    const { setTheme, theme } = useTheme()
    // console.log('ThemeSwitcher', theme);
    const { t } = useTranslation();

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 mb-4">
                {theme === 'dark' ? (
                    <Moon size={20} className="text-primary-600 dark:text-primary-400" />
                ) : (
                    <Sun size={20} className="text-primary-600 dark:text-primary-400" />
                )}
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('Theme')}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                    onClick={() => setTheme('light')}
                    variant="outline"
                    className={cn("",
                        theme === 'light' ? 'bg-sky-100 border-sky-400 border-2' : ''
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Sun size={16} className="text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('Light')}</span>
                    </div>
                    {theme === 'light' && (
                        <span className="flex h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400"></span>
                    )}
                </Button>

                <Button
                    onClick={() => setTheme('dark')}
                    variant="outline"
                    className={cn("",
                        theme === 'dark' ? 'bg-slate-800 border-slate-400 border-2 ' : ''
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Moon size={16} className="text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('Dark')}</span>
                    </div>
                    {theme === 'dark' && (
                        <span className="flex h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400"></span>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ThemeSwitcher;