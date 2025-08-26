import React from 'react';
import { User, Phone, Home, AlertCircle, Edit3, CheckCircle, Circle } from 'lucide-react';
import { Button } from '../ui/button';
import { MultiSelectToolbar } from '../ClaimRequestForm/MultiSelectToolBar';

export const CustomerModificationDisplay = ({
    customerData,
    multiSelectState,
    modifiableFields,
    onToggleMode,
    onSelectAll,
    onClearSelection,
    onBulkEdit,
    onRequestModification,
    onToggleFieldSelection
}) => {
    const personalFields = [
        { key: 'Name', label: 'Nombre', value: customerData.Name },
        { key: 'Surname', label: 'Primer Apellido', value: customerData.Surname },
        { key: 'SecondSurname', label: 'Segundo Apellido', value: customerData.SecondSurname },
        { key: 'DNI', label: 'DNI', value: customerData.DNI }
    ];

    const contactFields = [
        { key: 'Phone', label: 'Teléfono', value: customerData.Phone },
        { key: 'Cell', label: 'Móvil', value: customerData.Cell },
        { key: 'Email', label: 'Email', value: customerData.Email }
    ];

    const addressFields = [
        { key: 'Address', label: 'Dirección', value: customerData.Address },
        { key: 'AddressNext', label: 'Complemento', value: customerData.AddressNext },
        { key: 'City', label: 'Ciudad', value: customerData.City },
        { key: 'ZipCode', label: 'Código Postal', value: customerData.ZipCode },
        { key: 'State', label: 'Provincia', value: customerData.State }
    ];

    const FieldComponent = ({ field }) => (
        <div
            key={field.key}
            className={`group relative p-2 rounded-lg transition-all cursor-pointer ${multiSelectState.isActive
                ? multiSelectState.selectedFields.has(field.key)
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent'
                : ''
                }`}
            // onClick={() => multiSelectState.isActive && multiSelectState.toggleFieldSelection(field.key)}
            onClick={() => multiSelectState.isActive && onToggleFieldSelection(field.key)}
        >
            {multiSelectState.isActive && (
                <div className="absolute top-2 right-2">
                    {multiSelectState.selectedFields.has(field.key) ? (
                        <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                        <Circle className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                    )}
                </div>
            )}
            <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{field.label}</p>
                {!multiSelectState.isActive && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        onClick={() => onRequestModification(field.key, field.label, field.value)}
                    >
                        <Edit3 className="h-3 w-3" />
                    </Button>
                )}
            </div>
            <p className={field.key === 'Email' ? "text-blue-600 dark:text-blue-400 hover:underline font-medium" : "font-medium dark:text-gray-200"}>
                {field.value ? (
                    field.key === 'Email' ? (
                        <a href={`mailto:${field.value}`}>{field.value}</a>
                    ) : (
                        field.value
                    )
                ) : (
                    "—"
                )}
            </p>
        </div>
    );

    return (
        <div className="mb-8 bg-white dark:bg-slate-800 border border-green-200 dark:border-green-900/30 rounded-lg overflow-hidden">
            {/* Multi-select toolbar */}
            <div className="flex items-end justify-end bg-green-50 dark:bg-green-900/20 py-2">
                <MultiSelectToolbar
                    multiSelectState={multiSelectState}
                    selectedCount={multiSelectState.selectedFields.size}
                    totalCount={modifiableFields.length}
                    onToggleMode={onToggleMode}
                    onSelectAll={onSelectAll}
                    onClearSelection={onClearSelection}
                    onBulkEdit={onBulkEdit}
                />
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 border-b border-green-200 dark:border-green-900/30">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <User className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Cliente Encontrado</h3>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center text-sm text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Solo lectura
                        </div>
                    </div>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400">
                    ID Cliente: <span className="font-medium">{customerData.CustomerID}</span> •
                    Última modificación: <span className="font-medium">{new Date(customerData.ModifiedOn).toLocaleDateString('es-ES')}</span>
                </p>
            </div>

            <div className="p-5 dark:bg-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Información Personal */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-3 flex items-center">
                            <User className="h-4 w-4 mr-1.5" />
                            Información Personal
                        </h4>
                        {personalFields.map((field) => <FieldComponent key={field.key} field={field} />)}
                    </div>

                    {/* Contacto */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-3 flex items-center">
                            <Phone className="h-4 w-4 mr-1.5" />
                            Contacto
                        </h4>
                        {contactFields.map((field) => <FieldComponent key={field.key} field={field} />)}
                    </div>

                    {/* Dirección */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-3 flex items-center">
                            <Home className="h-4 w-4 mr-1.5" />
                            Dirección
                        </h4>
                        {addressFields.map((field) => <FieldComponent key={field.key} field={field} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};