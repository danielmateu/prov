import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export const ConsultationForm = ({
    selectedNotice,
    description,
    onDescriptionChange,
    onSubmit,
    onCancel,
    submitting,
    formRef
}) => {
    if (!selectedNotice) return null;

    return (
        <div className="space-y-6" ref={formRef}>
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-slate-400">
                    Detalles de la consulta para aviso {selectedNotice.DocEntry}
                </h3>

                <div>
                    <Label>Descripción de la Consulta *</Label>
                    <Textarea
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        placeholder="Describa detalladamente la consulta que desea realizar..."
                        rows={6}
                        required
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Mínimo 10 caracteres requeridos
                    </p>
                </div>

                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors dark:text-slate-200 dark:hover:bg-slate-900"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        onClick={onSubmit}
                        disabled={!selectedNotice || !description.trim() || description.length < 10 || submitting}
                        className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                        {submitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Enviando...
                            </>
                        ) : (
                            <>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Enviar Consulta
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};