import React from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorState } from './ErrorState';
import { motion } from 'framer-motion';

export const NetworkErrorView = ({
    onRetry,
    message,
    fullPage = false
}) => {
    const { t } = useTranslation();

    if (fullPage) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md"
                >
                    <ErrorState
                        errorType="network"
                        message={message || t('NetworkErrorFullPageMessage')}
                        onRetry={onRetry}
                        className="w-full shadow-lg"
                    />
                </motion.div>
            </div>
        );
    }

    return (
        <ErrorState
            errorType="network"
            message={message}
            onRetry={onRetry}
        />
    );
};