import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft, Search } from 'lucide-react';

const NotFound404 = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Update the page title when component mounts
        document.title = 'Página no encontrada | 404';

        // Reset title when component unmounts
        return () => {
            const defaultTitle = document.querySelector('title[data-default]')?.textContent;
            if (defaultTitle) document.title = defaultTitle;
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center pt-28">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-sky-600 p-6 flex justify-center">
                    <FileQuestion className="text-white w-24 h-24 animate-pulse" />
                </div>

                <div className="p-6 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Página no encontrada</h2>
                    <p className="text-gray-600 mb-8">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver atrás
                        </button>

                        <button
                            onClick={() => navigate('/inicio')}
                            className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            <Home className="w-4 h-4" />
                            Ir al inicio
                        </button>
                    </div>

                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">o intenta buscar</span>
                        </div>
                    </div>

                    <div className="mt-4 relative">
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            placeholder="Buscar en la aplicación..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // Implement search functionality or redirect to search page
                                    navigate('/inicio');
                                }
                            }}
                        />
                        <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
                <p>Si crees que esto es un error, por favor contacta con soporte.</p>
            </div>
        </div>
    );
};

export default NotFound404;