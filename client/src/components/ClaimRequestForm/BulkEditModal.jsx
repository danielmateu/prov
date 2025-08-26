// import React, { useState } from 'react';
// import { X, Save, AlertCircle, CheckCircle, Clock, Info } from 'lucide-react';

// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Textarea } from '../ui/textarea';
// import { Label } from '../ui/label';
// import { modificationRequestSchema, validateField, getFieldFormatHint } from '../ContabilidadForm/schemas/customerValidation';

// export const BulkEditModal = ({
//     isOpen,
//     selectedFields,
//     onClose,
//     onSave,
//     submitting = false
// }) => {
//     const [fieldUpdates, setFieldUpdates] = useState({});
//     const [fieldErrors, setFieldErrors] = useState({});
//     const [commonReason, setCommonReason] = useState('');
//     const [isFormComplete, setIsFormComplete] = useState(false);

//     if (!isOpen) return null;

//     const handleFieldUpdate = (fieldKey, value) => {
//         // Actualizar el valor del campo
//         setFieldUpdates(prev => ({
//             ...prev,
//             [fieldKey]: value
//         }));

//         // Validar el nuevo valor
//         const validation = validateField(fieldKey, value);

//         // Actualizar errores
//         setFieldErrors(prev => ({
//             ...prev,
//             [fieldKey]: validation.success ? null : validation.error
//         }));
//     };

//     const handleSave = () => {
//         // Verificar que no hay errores
//         const hasErrors = Object.values(fieldErrors).some(error => error !== null && error !== undefined);

//         if (hasErrors) {
//             return; // No continuar si hay errores
//         }

//         const updates = Object.entries(fieldUpdates)
//             .filter(([_, value]) => value.trim() !== '')
//             .map(([fieldKey, newValue]) => {
//                 const field = selectedFields.find(f => f.key === fieldKey);
//                 return {
//                     field: fieldKey,
//                     fieldLabel: field.label,
//                     currentValue: field.currentValue,
//                     newValue: newValue.trim(),
//                     reason: commonReason
//                 };
//             });

//         onSave(updates);
//         handleClose();
//     };

//     const handleClose = () => {
//         onClose();
//         setFieldUpdates({});
//         setFieldErrors({});
//         setCommonReason('');
//     };

//     // Validar razón común
//     const isReasonValid = commonReason.length >= 10 && commonReason.length <= 500;

//     // Calcular campos válidos (con valor y sin errores)
//     const validUpdates = Object.entries(fieldUpdates)
//         .filter(([key, value]) =>
//             value.trim() !== '' && !fieldErrors[key]
//         ).length;

//     const totalSteps = selectedFields.length + 1; // +1 para la razón común
//     const progressPercentage = ((validUpdates + (isReasonValid ? 1 : 0)) / totalSteps) * 100;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-fade-in">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[96vh] overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h2 className="text-2xl font-bold">Edición Múltiple</h2>
//                             <p className="text-blue-100 mt-1">
//                                 Editando {selectedFields.length} campos seleccionados
//                             </p>
//                         </div>
//                         <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={handleClose}
//                             className="p-2 hover:bg-blue-500 text-white"
//                             disabled={submitting}
//                         >
//                             <X className="w-6 h-6" />
//                         </Button>
//                     </div>

//                     {/* Progress bar */}
//                     <div className="mt-4">
//                         <div className="flex justify-between text-sm text-blue-100 mb-2">
//                             <span>Progreso</span>
//                             <span>{validUpdates + (isReasonValid ? 1 : 0)} de {totalSteps}</span>
//                         </div>
//                         <div className="w-full bg-blue-500 rounded-full h-2">
//                             <div
//                                 className="bg-white rounded-full h-2 transition-all duration-300"
//                                 style={{ width: `${progressPercentage}%` }}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//                     {/* Razón común */}
//                     <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                         <div className="flex items-center space-x-2 mb-3">
//                             <AlertCircle className="w-5 h-5 text-yellow-600" />
//                             <h3 className="font-semibold text-yellow-800">Razón de Modificación (Común)</h3>
//                             {isReasonValid && <CheckCircle className="w-4 h-4 text-green-600" />}
//                         </div>
//                         <Textarea
//                             value={commonReason}
//                             onChange={(e) => setCommonReason(e.target.value)}
//                             placeholder="Describe la razón para estos cambios (se aplicará a todos los campos seleccionados)..."
//                             className={`w-full resize-none ${!isReasonValid && commonReason.length > 0 ? 'border-red-300 focus:ring-red-500' : 'border-yellow-300 focus:ring-yellow-500'} focus:border-transparent`}
//                             rows={3}
//                             disabled={submitting}
//                         />
//                         {commonReason.length > 0 && (
//                             <div className={`mt-2 text-sm ${commonReason.length < 10 ? 'text-red-600' : commonReason.length > 500 ? 'text-red-600' : 'text-green-600'}`}>
//                                 {commonReason.length < 10 ? (
//                                     <p className="flex items-center">
//                                         <AlertCircle className="w-4 h-4 mr-1" />
//                                         Se requieren al menos 10 caracteres ({commonReason.length}/10)
//                                     </p>
//                                 ) : commonReason.length > 500 ? (
//                                     <p className="flex items-center">
//                                         <AlertCircle className="w-4 h-4 mr-1" />
//                                         Excede el máximo de 500 caracteres ({commonReason.length}/500)
//                                     </p>
//                                 ) : (
//                                     <p className="flex items-center">
//                                         <CheckCircle className="w-4 h-4 mr-1" />
//                                         {commonReason.length}/500 caracteres
//                                     </p>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {/* Campos para editar */}
//                     <div className="space-y-6">
//                         <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
//                             Campos a Modificar
//                         </h3>

//                         {selectedFields.map((field, index) => {
//                             const fieldHint = getFieldFormatHint(field.key);
//                             const hasError = fieldErrors[field.key] && fieldUpdates[field.key]?.trim();
//                             const isValid = fieldUpdates[field.key]?.trim() && !hasError;

//                             return (
//                                 <div
//                                     key={field.key}
//                                     className={`p-4 border rounded-lg transition-all ${hasError
//                                         ? 'border-red-300 bg-red-50'
//                                         : isValid
//                                             ? 'border-green-300 bg-green-50'
//                                             : 'border-gray-200 bg-gray-50'
//                                         }`}
//                                 >
//                                     <div className="flex items-center justify-between mb-3">
//                                         <div className="flex items-center space-x-3">
//                                             <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
//                                                 {index + 1}
//                                             </span>
//                                             <div>
//                                                 <h4 className="font-semibold text-gray-900">{field.label}</h4>
//                                                 <p className="text-sm text-gray-500">Campo: {field.key}</p>
//                                             </div>
//                                         </div>
//                                         {isValid && (
//                                             <CheckCircle className="w-5 h-5 text-green-600" />
//                                         )}
//                                         {hasError && (
//                                             <AlertCircle className="w-5 h-5 text-red-500" />
//                                         )}
//                                     </div>

//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div>
//                                             <Label className="block text-sm font-medium text-gray-700 mb-2">
//                                                 Valor Actual
//                                             </Label>
//                                             <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
//                                                 {field.currentValue || 'Sin valor'}
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <div className="flex items-center justify-between mb-2">
//                                                 <Label className="block text-sm font-medium text-gray-700">
//                                                     Nuevo Valor
//                                                 </Label>
//                                                 {fieldHint && (
//                                                     <span className="text-xs text-gray-500 flex items-center">
//                                                         <Info className="w-3 h-3 mr-1" />
//                                                         {fieldHint}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                             <Input
//                                                 type={field.type || 'text'}
//                                                 value={fieldUpdates[field.key] || ''}
//                                                 onChange={(e) => handleFieldUpdate(field.key, e.target.value)}
//                                                 placeholder={`Nuevo valor para ${field.label}`}
//                                                 className={`w-full focus:ring-2 ${hasError
//                                                     ? 'border-red-300 focus:ring-red-500'
//                                                     : 'focus:ring-blue-500'
//                                                     } focus:border-transparent`}
//                                                 disabled={submitting}
//                                             />
//                                             {hasError && (
//                                                 <p className="text-sm text-red-600 mt-1 flex items-center">
//                                                     <AlertCircle className="w-4 h-4 mr-1" />
//                                                     {fieldErrors[field.key]}
//                                                 </p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="bg-gray-50 px-6 py-4 border-t">
//                     <div className="flex items-center justify-between">
//                         <div className="text-sm text-gray-600">
//                             {validUpdates > 0 && (
//                                 <span className="text-green-600 font-medium">
//                                     ✓ {validUpdates} campos válidos
//                                 </span>
//                             )}
//                             {Object.keys(fieldErrors).filter(key => fieldErrors[key]).length > 0 && (
//                                 <span className="text-red-600 font-medium ml-4">
//                                     ⚠ {Object.keys(fieldErrors).filter(key => fieldErrors[key]).length} campos con errores
//                                 </span>
//                             )}
//                         </div>

//                         <div className="flex space-x-3">
//                             <Button
//                                 variant="outline"
//                                 onClick={handleClose}
//                                 disabled={submitting}
//                             >
//                                 Cancelar
//                             </Button>
//                             <Button
//                                 onClick={handleSave}
//                                 disabled={
//                                     !isReasonValid ||
//                                     validUpdates === 0 ||
//                                     Object.keys(fieldErrors).some(key => fieldErrors[key]) ||
//                                     submitting ||
//                                     // Si no se han completado todos los campos requeridos
//                                     !isFormComplete
//                                 }
//                                 className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
//                             >
//                                 {submitting ? (
//                                     <>
//                                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                                         <span>Procesando...</span>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Save className="w-4 h-4" />
//                                         <span>Guardar Cambios ({validUpdates})</span>
//                                     </>
//                                 )}
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, CheckCircle, Info } from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { validateField, getFieldFormatHint } from '../ContabilidadForm/schemas/customerValidation';

export const BulkEditModal = ({
    isOpen,
    selectedFields,
    onClose,
    onSave,
    submitting = false
}) => {
    const [fieldUpdates, setFieldUpdates] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});
    const [commonReason, setCommonReason] = useState('');
    const [isFormComplete, setIsFormComplete] = useState(false);

    // Efecto para comprobar si el formulario está completo
    useEffect(() => {
        if (!isOpen) return;

        // Verificar que todos los campos tienen un valor y no hay errores
        const allFieldsComplete = selectedFields.every(field =>
            fieldUpdates[field.key]?.trim() && !fieldErrors[field.key]
        );

        // Verificar que la razón es válida
        const isReasonValid = commonReason.length >= 10 && commonReason.length <= 500;

        // Actualizar estado de completitud
        setIsFormComplete(allFieldsComplete && isReasonValid);
    }, [fieldUpdates, fieldErrors, commonReason, selectedFields, isOpen]);

    if (!isOpen) return null;

    const handleFieldUpdate = (fieldKey, value) => {
        // Actualizar el valor del campo
        setFieldUpdates(prev => ({
            ...prev,
            [fieldKey]: value
        }));

        // Validar el nuevo valor
        const validation = validateField(fieldKey, value);

        // Actualizar errores
        setFieldErrors(prev => ({
            ...prev,
            [fieldKey]: validation.success ? null : validation.error
        }));
    };

    const handleSave = () => {
        // Verificar que no hay errores
        const hasErrors = Object.values(fieldErrors).some(error => error !== null && error !== undefined);

        if (hasErrors || !isFormComplete) {
            return; // No continuar si hay errores o no está completo
        }

        const updates = Object.entries(fieldUpdates)
            .filter(([_, value]) => value.trim() !== '')
            .map(([fieldKey, newValue]) => {
                const field = selectedFields.find(f => f.key === fieldKey);
                return {
                    field: fieldKey,
                    fieldLabel: field.label,
                    currentValue: field.currentValue,
                    newValue: newValue.trim(),
                    reason: commonReason
                };
            });

        onSave(updates);
        handleClose();
    };

    const handleClose = () => {
        onClose();
        setFieldUpdates({});
        setFieldErrors({});
        setCommonReason('');
        setIsFormComplete(false);
    };

    // Validar razón común
    const isReasonValid = commonReason.length >= 10 && commonReason.length <= 500;

    // Calcular campos válidos (con valor y sin errores)
    const validUpdates = Object.entries(fieldUpdates)
        .filter(([key, value]) =>
            value.trim() !== '' && !fieldErrors[key]
        ).length;

    // Calcular campos pendientes
    const pendingFields = selectedFields.filter(field =>
        !fieldUpdates[field.key]?.trim() || fieldErrors[field.key]
    );

    const totalSteps = selectedFields.length + 1; // +1 para la razón común
    const progressPercentage = ((validUpdates + (isReasonValid ? 1 : 0)) / totalSteps) * 100;

    return (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 transition-fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[96vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Edición Múltiple</h2>
                            <p className="text-blue-100 dark:text-blue-200 mt-1">
                                Editando {selectedFields.length} campos seleccionados
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClose}
                            className="p-2 hover:bg-blue-500 dark:hover:bg-blue-800 text-white"
                            disabled={submitting}
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-blue-100 dark:text-blue-200 mb-2">
                            <span>Progreso</span>
                            <span>{validUpdates + (isReasonValid ? 1 : 0)} de {totalSteps}</span>
                        </div>
                        <div className="w-full bg-blue-500 dark:bg-blue-700 rounded-full h-2">
                            <div
                                className="bg-white dark:bg-blue-300 rounded-full h-2 transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] dark:text-slate-300">
                    {/* Razón común */}
                    <div className="mb-8 p-4 bg-yellow-50 dark:bg-amber-900/30 border border-yellow-200 dark:border-amber-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-400">Razón de Modificación (Común)</h3>
                            {isReasonValid && <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />}
                        </div>
                        <Textarea
                            value={commonReason}
                            onChange={(e) => setCommonReason(e.target.value)}
                            placeholder="Describe la razón para estos cambios (se aplicará a todos los campos seleccionados)..."
                            className={`w-full resize-none dark:bg-slate-800 dark:text-slate-200 ${!isReasonValid && commonReason.length > 0
                                    ? 'border-red-300 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-400'
                                    : 'border-yellow-300 focus:ring-yellow-500 dark:border-yellow-600 dark:focus:ring-yellow-500'
                                } focus:border-transparent`}
                            rows={3}
                            disabled={submitting}
                        />
                        {commonReason.length > 0 && (
                            <div className={`mt-2 text-sm ${commonReason.length < 10
                                    ? 'text-red-600 dark:text-red-400'
                                    : commonReason.length > 500
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-green-600 dark:text-green-400'
                                }`}>
                                {commonReason.length < 10 ? (
                                    <p className="flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        Se requieren al menos 10 caracteres ({commonReason.length}/10)
                                    </p>
                                ) : commonReason.length > 500 ? (
                                    <p className="flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        Excede el máximo de 500 caracteres ({commonReason.length}/500)
                                    </p>
                                ) : (
                                    <p className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        {commonReason.length}/500 caracteres
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Campos para editar */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200 border-b dark:border-slate-700 pb-2">
                            Campos a Modificar
                        </h3>

                        {selectedFields.map((field, index) => {
                            const fieldHint = getFieldFormatHint(field.key);
                            const hasError = fieldErrors[field.key] && fieldUpdates[field.key]?.trim();
                            const isValid = fieldUpdates[field.key]?.trim() && !hasError;
                            const isEmpty = !fieldUpdates[field.key]?.trim();

                            return (
                                <div
                                    key={field.key}
                                    className={`p-4 border rounded-lg transition-all ${hasError
                                            ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                                            : isValid
                                                ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                                                : 'border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-800/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <span className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-slate-200">{field.label}</h4>
                                                <p className="text-sm text-gray-500 dark:text-slate-400">Campo: {field.key}</p>
                                            </div>
                                        </div>
                                        {isValid && (
                                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        )}
                                        {hasError && (
                                            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                                        )}
                                        {isEmpty && !submitting && (
                                            <span className="text-xs text-orange-500 dark:text-orange-400 font-medium">
                                                Requerido
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                                Valor Actual
                                            </Label>
                                            <div className="p-3 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-600 dark:text-slate-300">
                                                {field.currentValue || 'Sin valor'}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <Label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                                                    Nuevo Valor *
                                                </Label>
                                                {fieldHint && (
                                                    <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center">
                                                        <Info className="w-3 h-3 mr-1" />
                                                        {fieldHint}
                                                    </span>
                                                )}
                                            </div>
                                            <Input
                                                type={field.type || 'text'}
                                                value={fieldUpdates[field.key] || ''}
                                                onChange={(e) => handleFieldUpdate(field.key, e.target.value)}
                                                placeholder={`Nuevo valor para ${field.label}`}
                                                className={`w-full focus:ring-2 dark:bg-slate-800 dark:text-slate-200 ${hasError
                                                        ? 'border-red-300 focus:ring-red-500 dark:border-red-700 dark:focus:ring-red-600'
                                                        : 'focus:ring-blue-500 dark:focus:ring-blue-600'
                                                    } focus:border-transparent`}
                                                disabled={submitting}
                                                required
                                            />
                                            {hasError && (
                                                <p className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {fieldErrors[field.key]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 dark:bg-slate-800 px-6 py-4 border-t dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-slate-400">
                            {pendingFields.length > 0 ? (
                                <span className="text-orange-500 dark:text-orange-400 font-medium">
                                    {pendingFields.length} campo(s) pendiente(s) de completar
                                </span>
                            ) : validUpdates > 0 ? (
                                <span className="text-green-600 dark:text-green-400 font-medium">
                                    ✓ Todos los campos completados
                                </span>
                            ) : null}

                            {Object.keys(fieldErrors).filter(key => fieldErrors[key]).length > 0 && (
                                <span className="text-red-600 dark:text-red-400 font-medium ml-4">
                                    ⚠ {Object.keys(fieldErrors).filter(key => fieldErrors[key]).length} campos con errores
                                </span>
                            )}
                        </div>

                        <div className="flex space-x-3">
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                disabled={submitting}
                                className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={
                                    !isReasonValid ||
                                    validUpdates === 0 ||
                                    Object.keys(fieldErrors).some(key => fieldErrors[key]) ||
                                    submitting ||
                                    !isFormComplete
                                }
                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600"
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Procesando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-1" />
                                        <span>
                                            {isFormComplete
                                                ? `Guardar Cambios (${validUpdates})`
                                                : `Completa todos los campos (${validUpdates}/${selectedFields.length})`
                                            }
                                        </span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};