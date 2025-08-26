import React from 'react';
import { FileText, Search, CheckCircle, Monitor, MessageSquare, Wrench, CalendarIcon, BadgeEuro, Activity } from 'lucide-react';
import { Input } from '../ui/input';

export const NoticesGrid = ({
    notices,
    filteredNotices,
    selectedNotice,
    searchQuery,
    onSearchChange,
    onNoticeSelect,
    selectionLabel = "Seleccionar Aviso"
}) => {
    const getStatusColor = (statusId) => {
        const statusColors = {
            1: 'bg-yellow-500',
            4: 'bg-blue-500',
            20: 'bg-red-500',
            22: 'bg-red-500',
            28: 'bg-red-500',
            102: 'bg-red-500',
            27: 'bg-green-500',
            51: 'bg-green-500',
            default: 'bg-slate-400'
        };
        return statusColors[statusId] || statusColors.default;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
    };

    const formatDateDistance = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 30) return `Hace ${diffDays} días`;
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} ${Math.floor(diffDays / 30) === 1 ? 'mes' : 'meses'}`;
        return `Hace ${Math.floor(diffDays / 365)} ${Math.floor(diffDays / 365) === 1 ? 'año' : 'años'}`;
    };

    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return '0,00 €';
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
                {selectionLabel}
            </label>

            {/* Search notices */}
            <div className={`mb-4 ${notices.length > 1 ? '' : 'hidden'}`}>
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={onSearchChange}
                            placeholder="Buscar por número de aviso o descripción"
                            className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                            aria-label="Buscar avisos"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            {searchQuery && (
                                <button
                                    onClick={() => onSearchChange({ target: { value: '' } })}
                                    className="h-full px-3 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <span className="sr-only">Limpiar</span>
                                    <span>✕</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                        {filteredNotices.length === notices.length ? (
                            <>Mostrando <span className="font-medium">{notices.length}</span> avisos</>
                        ) : (
                            <>Mostrando <span className="font-medium">{filteredNotices.length}</span> de <span className="font-medium">{notices.length}</span> avisos</>
                        )}
                    </div>

                    {filteredNotices.length !== notices.length && (
                        <button
                            onClick={() => onSearchChange({ target: { value: '' } })}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Mostrar todos
                        </button>
                    )}
                </div>

                {searchQuery && (
                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-gray-500 dark:text-slate-400">Filtros:</span>
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-800 border border-blue-100">
                            {searchQuery}
                            <button
                                onClick={() => onSearchChange({ target: { value: '' } })}
                                className="ml-1 text-blue-400 hover:text-blue-600"
                                aria-label="Quitar filtro"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Notices list */}
            {filteredNotices.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-slate-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>
                        {notices.length === 0
                            ? "No se encontraron avisos para este cliente"
                            : "No hay avisos que coincidan con su búsqueda"}
                    </p>
                    {notices.length > 0 && searchQuery && (
                        <button
                            onClick={() => onSearchChange({ target: { value: '' } })}
                            className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
                        >
                            Mostrar todos los avisos
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredNotices.map((notice) => (
                        <div
                            key={notice.NoticeHeaderID}
                            className={`relative border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer ${selectedNotice?.NoticeHeaderID === notice.NoticeHeaderID
                                    ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50/50 dark:bg-blue-900/10'
                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                                }`}
                            onClick={() => onNoticeSelect(notice)}
                        >
                            <div className={`absolute left-0 top-0 w-1 h-full ${getStatusColor(notice.StatusID)}`}></div>

                            <div className="pl-5 pr-4 py-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="selectedNotice"
                                                    id={`notice-${notice.NoticeHeaderID}`}
                                                    checked={selectedNotice?.NoticeHeaderID === notice.NoticeHeaderID}
                                                    onChange={() => onNoticeSelect(notice)}
                                                    className="w-4 h-4 mr-3 text-blue-600 focus:ring-blue-500"
                                                />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <label
                                                            htmlFor={`notice-${notice.NoticeHeaderID}`}
                                                            className="font-medium text-gray-900 dark:text-gray-100 cursor-pointer"
                                                        >
                                                            Aviso {notice.DocEntry}
                                                        </label>
                                                        {notice.InternalInvoiceNumber && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                Nº Factura {notice.InternalInvoiceNumber}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatDateDistance(notice.CreateDate)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                {notice.Visits > 1 && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                                        {notice.Visits} {notice.Visits === 1 ? 'visita' : 'visitas'}
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:text-gray-300">
                                                    {notice.TechnicName}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-3 flex flex-col">
                                            <div className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
                                                <Monitor className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" />
                                                {notice.ApparatusID && notice.ApparatusName}
                                                {notice.BrandID && (
                                                    <span className="ml-1 text-gray-600 dark:text-gray-300">
                                                        - {notice.BrandName}
                                                    </span>
                                                )}
                                                {notice.Model && (
                                                    <span className="ml-1 text-gray-500 dark:text-gray-400 font-normal">
                                                        ({notice.Model})
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {notice.Observation && (
                                            <div className="mb-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-800 px-3 py-1.5">
                                                    <MessageSquare className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase">
                                                        Motivo de la 1ª llamada
                                                    </p>
                                                </div>
                                                <div className="p-2.5">
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                                        {notice.Observation}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {notice.TechnicalObservation && (
                                            <div className="mb-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5">
                                                    <Wrench className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase">
                                                        Observación del Técnico
                                                    </p>
                                                </div>
                                                <div className="p-2.5">
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                                        {notice.TechnicalObservation}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center">
                                                <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                                                <span>Última visita: {formatDate(notice.LastVisit)}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <BadgeEuro className="w-3.5 h-3.5 mr-1" />
                                                <span>{formatCurrency(notice.Total)}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <Activity className="w-3.5 h-3.5 mr-1" />
                                                <span>{notice.StatusName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {selectedNotice?.NoticeHeaderID === notice.NoticeHeaderID && (
                                <div className="absolute right-3 top-3">
                                    <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};