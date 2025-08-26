import { useState, useEffect } from 'react';

export const useConnectionStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [connectionQuality, setConnectionQuality] = useState('good');

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Test connection quality periodically
        const testConnection = async () => {
            if (!navigator.onLine) {
                setConnectionQuality('offline');
                return;
            }

            const start = Date.now();
            try {
                await fetch('/favicon.ico', { 
                    method: 'HEAD',
                    cache: 'no-cache'
                });
                const duration = Date.now() - start;
                
                if (duration < 200) {
                    setConnectionQuality('excellent');
                } else if (duration < 500) {
                    setConnectionQuality('good');
                } else if (duration < 1000) {
                    setConnectionQuality('fair');
                } else {
                    setConnectionQuality('poor');
                }
            } catch {
                setConnectionQuality('poor');
            }
        };

        // Test connection quality every 30 seconds
        const qualityInterval = setInterval(testConnection, 30000);
        testConnection(); // Initial test

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(qualityInterval);
        };
    }, []);

    return { isOnline, connectionQuality };
};