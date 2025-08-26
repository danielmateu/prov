import { Search } from "lucide-react";

export default function NoCustomerFound() {
    return (
        <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/30 rounded-lg">
            <div className="flex items-center">
                <Search className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                <p className="text-yellow-800 dark:text-yellow-300">
                    No se encontraron datos para esta búsqueda
                </p>
            </div>
        </div>
    );
}