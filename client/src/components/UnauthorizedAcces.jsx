import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const UnauthorizedAccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                    <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Acceso No Autorizado
                    </h1>
                    <p className="text-gray-600">
                        No tienes permisos suficientes para acceder a esta página.
                        Solo los superadministradores pueden ver este contenido.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/inicio')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver al Inicio
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Página Anterior
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Si crees que esto es un error, contacta al administrador del sistema.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedAccess;