import React from 'react';
import { Wifi, WifiOff, Signal, SignalHigh, SignalLow, SignalMedium } from 'lucide-react';
import { Badge } from './badge';
import { useConnectionStatus } from '@/hooks/useConnectionStatus';

export const ConnectionIndicator = ({ className = '' }) => {
    const { isOnline, connectionQuality } = useConnectionStatus();

    const getQualityIcon = () => {
        if (!isOnline) return <WifiOff className="h-3 w-3" />;
        
        switch (connectionQuality) {
            case 'excellent':
                return <SignalHigh className="h-3 w-3 text-green-500" />;
            case 'good':
                return <Signal className="h-3 w-3 text-green-500" />;
            case 'fair':
                return <SignalMedium className="h-3 w-3 text-yellow-500" />;
            case 'poor':
                return <SignalLow className="h-3 w-3 text-red-500" />;
            default:
                return <Wifi className="h-3 w-3" />;
        }
    };

    const getStatusText = () => {
        if (!isOnline) return 'Sin conexión';
        
        switch (connectionQuality) {
            case 'excellent':
                return 'Excelente';
            case 'good':
                return 'Buena';
            case 'fair':
                return 'Regular';
            case 'poor':
                return 'Lenta';
            default:
                return 'Conectado';
        }
    };

    const getVariant = () => {
        if (!isOnline) return 'destructive';
        
        switch (connectionQuality) {
            case 'excellent':
            case 'good':
                return 'success';
            case 'fair':
                return 'warning';
            case 'poor':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    return (
        <Badge 
            variant={getVariant()} 
            className={`flex items-center gap-1 text-xs ${className}`}
            title={`Conexión: ${getStatusText()}`}
        >
            {getQualityIcon()}
            <span className="hidden sm:inline">{getStatusText()}</span>
        </Badge>
    );
};