// import { useFormStore } from '@/stores/formStore';
import { Save, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useFormStore } from '@/zustand/useFormStore';

export function FormPersistenceIndicator() {
    const { hasFormData, clearFormData } = useFormStore();

    if (!hasFormData()) return null;

    return (
        <div className="fixed top-24 right-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 shadow-lg z-50">
            <div className="flex items-center gap-2 text-sm">
                <Save className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-800 dark:text-blue-200">
                    Datos del formulario guardados
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFormData}
                    className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                    <Trash2 className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
}