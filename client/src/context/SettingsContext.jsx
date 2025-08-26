import React, { createContext, useState, useContext, useEffect } from 'react';

const defaultSettings = {
    // theme: 'light',
    language: 'es',
    userProfile: {
        name: 'Daniel Mateu Pardo',
        email: 'danielmateu86@gmail.com',
        role: 'Otros'
    },
    notifications: {
        email: true,
        push: true,
        updates: true
    },
    security: {
        twoFactor: false,
        sessionTimeout: 30
    },
    // setTheme: () => { },
    setLanguage: () => { },
    updateUserProfile: () => { },
    updateNotifications: () => { },
    updateSecurity: () => { }
};

const SettingsContext = createContext(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {

    const [language, setLanguageState] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return (savedLanguage) || 'es';
    });

    const [userProfile, setUserProfile] = useState(() => {
        const savedProfile = localStorage.getItem('userProfile');
        return savedProfile ? JSON.parse(savedProfile) : defaultSettings.userProfile;
    });

    const [notifications, setNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem('notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : defaultSettings.notifications;
    });

    const [security, setSecurity] = useState(() => {
        const savedSecurity = localStorage.getItem('security');
        return savedSecurity ? JSON.parse(savedSecurity) : defaultSettings.security;
    });

    // Update localStorage when other settings change
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem('security', JSON.stringify(security));
    }, [security]);

    const setTheme = (newTheme) => {
        setThemeState(newTheme);
    };

    const setLanguage = (newLanguage) => {
        setLanguageState(newLanguage);
    };

    const updateUserProfile = (profile) => {
        setUserProfile(prev => ({ ...prev, ...profile }));
    };

    const updateNotifications = (settings) => {
        setNotifications(prev => ({ ...prev, ...settings }));
    };

    const updateSecurity = (settings) => {
        setSecurity(prev => ({ ...prev, ...settings }));
    };

    return (
        <SettingsContext.Provider
            value={{
                // theme,
                language,
                userProfile,
                notifications,
                security,
                // setTheme,
                setLanguage,
                updateUserProfile,
                updateNotifications,
                updateSecurity
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};