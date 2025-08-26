
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const languages = [
        {
            code: 'es',
            name: t('Spanish'),
            flag: <img src="/icons/spain.svg" alt="Spain flag" className="w-6 h-6 rounded-full" />
        },
        {
            code: 'cat',
            name: t('Catalan'),
            flag: <img src="/icons/catalonia.svg" alt="Catalonia flag" className="w-6 h-6 rounded-full" />
        }
    ];

    const changeLanguage = (languageCode) => {
        i18n.changeLanguage(languageCode);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                {t('LanguageSettings')}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t('ChooseLanguage')}
            </p>
            <div className="flex flex-col space-y-3">
                {languages.map((language) => (
                    <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={`flex items-center px-4 py-3 rounded-lg border transition-all duration-200 ${i18n.language === language.code
                            ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-700'
                            : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/50'
                            }`}
                    >
                        <span className="mr-3">{language.flag}</span>
                        <span className={`flex-grow text-left ${i18n.language === language.code
                            ? 'font-medium text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                            }`}>
                            {language.name}
                        </span>
                        {i18n.language === language.code && (
                            <span className="w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center">
                                <span className="w-2 h-2 bg-white rounded-full"></span>
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;

