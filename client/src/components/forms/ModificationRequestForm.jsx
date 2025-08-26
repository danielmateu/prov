import React from 'react';
import { Edit3, Send, AlertCircle } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export const ModificationRequestForm = ({
    modificationRequest,
    selectedNotice,
    onNewValueChange,
    onReasonChange,
    onSubmit,
    onCancel,
    submitting,
    formRef
}) => {
    if (!modificationRequest.field) return null;

    return (
        <div ref={formRef} className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg overflow-hidden">
            <div className="bg-blue-100 dark:bg-blue-800 p-4 border-b border-blue-200 dark:border-blue-700">
                <div className="flex items-center">
                    <Edit3 className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                        Solicitar Modificación: {modificationRequest.fieldLabel}
                    </h3>
                </div>
                {selectedNotice?.DocEntry && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Aviso {selectedNotice.DocEntry}
                    </p>
                )}
            </div>

            <form onSubmit={onSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="currentValue" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Valor Actual
                        </Label>
                        <Input
                            id="currentValue"
                            value={modificationRequest.currentValue}
                            disabled
                            className="mt-1 bg-gray-100 dark:bg-gray-800"
                        />
                    </div>

                    <div>
                        <Label htmlFor="newValue" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nuevo Valor *
                        </Label>
                        <Input
                            id="newValue"
                            value={modificationRequest.newValue}
                            onChange={(e) => onNewValueChange(e.target.value)}
                            className={`mt-1 ${modificationRequest.validationError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                            required
                        />
                        {modificationRequest.validationError && (
                            <p className="text-sm text-red-600 mt-1 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {modificationRequest.validationError}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    <Label htmlFor="reason" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Razón de la Modificación *
                    </Label>
                    <Textarea
                        id="reason"
                        value={modificationRequest.reason}
                        onChange={(e) => onReasonChange(e.target.value)}
                        placeholder="Explique por qué es necesaria esta modificación..."
                        className="mt-1"
                        rows={3}
                        required
                    />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={submitting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={submitting || modificationRequest.validationError || !modificationRequest.newValue.trim() || !modificationRequest.reason.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {submitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Enviando...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Enviar Solicitud
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};