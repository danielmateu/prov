import React from 'react';
import { RefreshCw, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import { usePendingPaymentsStore } from '@/zustand/pendingPaymentsStore';

export const DataRefreshIndicator = ({ 
    className = '',
    showRefreshButton = true,
    showCacheStatus = true 
}) => {
    const { 
        isLoading, 
        refreshData, 
        getCacheStatus, 
        lastSuccessfulFetch,
        error 
    } = usePendingPaymentsStore();

    const cacheStatus = getCacheStatus();
    const lastUpdate = lastSuccessfulFetch ? new Date(lastSuccessfulFetch) : null;

    const getCacheStatusInfo = () => {
        switch (cacheStatus) {
            case 'fresh':
                return {
                    icon: <CheckCircle className="h-3 w-3" />,
                    text: 'Actualizado',
                    variant: 'success'
                };
            case 'stale':
                return {
                    icon: <Clock className="h-3 w-3" />,
                    text: 'Desactualizado',
                    variant: 'warning'
                };
            case 'expired':
                return {
                    icon: <AlertTriangle className="h-3 w-3" />,
                    text: 'Expirado',
                    variant: 'destructive'
                };
            default:
                return {
                    icon: <RefreshCw className="h-3 w-3" />,
                    text: 'Sin datos',
                    variant: 'outline'
                };
        }
    };

    const statusInfo = getCacheStatusInfo();

    const handleRefresh = async () => {
        await refreshData();
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {showCacheStatus && (
                <Badge 
                    variant={statusInfo.variant}
                    className="flex items-center gap-1 text-xs"
                    title={lastUpdate ? `Última actualización: ${lastUpdate.toLocaleTimeString()}` : 'Sin datos'}
                >
                    {statusInfo.icon}
                    <span className="hidden sm:inline">{statusInfo.text}</span>
                </Badge>
            )}
            
            {error && (
                <Badge variant="destructive" className="text-xs">
                    Error de conexión
                </Badge>
            )}

            {showRefreshButton && (
                <Button
                    onClick={handleRefresh}
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    className="h-8 w-8 p-0"
                    title="Actualizar datos manualmente"
                >
                    <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
            )}
        </div>
    );
};