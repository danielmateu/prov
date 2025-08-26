import React from 'react';
import { AlertCircle, Phone, FileText, Bell, Search, Zap } from 'lucide-react';
import { Input } from '../ui/input';

export const CustomerSearchInput = ({
    searchValue,
    detectedType,
    fetchingCustomer,
    onSearchChange
}) => {
    const getSearchInfo = () => {
        switch (detectedType) {
            case 'phone':
                return {
                    icon: Phone,
                    placeholder: 'Teléfono detectado',
                    description: 'Buscando por número de teléfono'
                };
            case 'invoice':
                return {
                    icon: FileText,
                    placeholder: 'Factura detectada',
                    description: 'Buscando por número de factura'
                };
            case 'notice':
                return {
                    icon: Bell,
                    placeholder: 'Albarán detectado',
                    description: 'Buscando por número de albarán'
                };
            default:
                return {
                    icon: Search,
                    placeholder: 'Ingrese teléfono, factura (ej: R-2307971) o albarán (ej: 25123456)',
                    description: ''
                };
        }
    };

    const searchInfo = getSearchInfo();
    const IconComponent = searchInfo.icon;

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-slate-400">
                    Buscar Cliente por teléfono, factura o albarán
                </label>
                {detectedType && searchInfo.description && (
                    <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        <Zap className="w-4 h-4 mr-1" />
                        {searchInfo.description}
                    </div>
                )}
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconComponent className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                    type="text"
                    value={searchValue}
                    onChange={onSearchChange}
                    placeholder={searchInfo.placeholder}
                    className={`w-2/4 pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${detectedType && detectedType !== 'unknown'
                            ? 'border-blue-300 bg-blue-50/30'
                            : 'border-gray-300'
                        }`}
                    required
                />
                {fetchingCustomer && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    </div>
                )}
            </div>

            {/* Validation hints */}
            {searchValue && detectedType === 'unknown' && (
                <p className="text-sm text-amber-600 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Formato no reconocido. Use: teléfono (9+ dígitos), factura (ej: R-2307971) o albarán (25XXXXXX)
                </p>
            )}

            {detectedType === 'phone' && searchValue.replace(/\D/g, '').length > 0 && searchValue.replace(/\D/g, '').length < 9 && (
                <p className="text-sm text-gray-500 mt-1">
                    Ingrese al menos 9 dígitos para buscar el cliente
                </p>
            )}

            {detectedType === 'invoice' && searchValue.length > 0 && searchValue.length < 4 && (
                <p className="text-sm text-gray-500 mt-1">
                    El número de factura debe tener al menos 4 caracteres
                </p>
            )}

            {detectedType === 'notice' && searchValue.length > 0 && searchValue.length < 8 && (
                <p className="text-sm text-gray-500 mt-1">
                    El número de albarán debe tener 8 dígitos (ej: 25123456)
                </p>
            )}
        </div>
    );
};