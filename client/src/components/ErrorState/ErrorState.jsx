import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff, ServerCrash, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const ErrorState = ({
    errorType = 'unknown',
    message,
    onRetry,
    className,
}) => {
    const { t } = useTranslation();

    // Define error configs based on error type
    const errorConfigs = {
        network: {
            icon: WifiOff,
            title: t('NetworkErrorTitle'),
            description: t('NetworkErrorDescription'),
            color: 'text-orange-500',
            bgColor: 'bg-orange-50 dark:bg-orange-950/30',
            borderColor: 'border-orange-200 dark:border-orange-800/50',
        },
        server: {
            icon: ServerCrash,
            title: t('ServerErrorTitle'),
            description: t('ServerErrorDescription'),
            color: 'text-red-500',
            bgColor: 'bg-red-50 dark:bg-red-950/30',
            borderColor: 'border-red-200 dark:border-red-800/50',
        },
        timeout: {
            icon: Info,
            title: t('TimeoutErrorTitle'),
            description: t('TimeoutErrorDescription'),
            color: 'text-amber-500',
            bgColor: 'bg-amber-50 dark:bg-amber-950/30',
            borderColor: 'border-amber-200 dark:border-amber-800/50',
        },
        unknown: {
            icon: AlertTriangle,
            title: t('UnknownErrorTitle'),
            description: t('UnknownErrorDescription'),
            color: 'text-blue-500',
            bgColor: 'bg-blue-50 dark:bg-blue-950/30',
            borderColor: 'border-blue-200 dark:border-blue-800/50',
        },
    };

    const config = errorConfigs[errorType];
    const Icon = config.icon;

    return (
        <div className={`flex flex-col items-center justify-center p-8 rounded-lg border ${config.borderColor} ${config.bgColor} ${className}`}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
            >
                <div className={`p-4 rounded-full ${config.bgColor} border ${config.borderColor}`}>
                    <Icon className={`h-10 w-10 ${config.color}`} />
                </div>
            </motion.div>

            <h3 className={`text-xl font-semibold mb-2 ${config.color}`}>
                {config.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-center mb-4 max-w-md">
                {message || config.description}
            </p>

            {onRetry && (
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <Button
                        onClick={onRetry}
                        className="gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        {t('Retry')}
                    </Button>
                </motion.div>
            )}
        </div>
    );
};