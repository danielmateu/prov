import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const PendingRegister = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
            <Card className="w-full max-w-md rounded-lg shadow-lg px-8 py-10 text-center">
                <div className="flex flex-col items-center gap-4">
                    <Mail className="w-16 h-16 text-blue-500 dark:text-sky-400" />
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-400">
                        ¡Registro casi completado!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Te hemos enviado un correo electrónico con las instrucciones para confirmar tu cuenta.
                        Por favor, revisa tu bandeja de entrada y sigue los pasos indicados.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        ¿No has recibido el correo? Revisa tu carpeta de spam o
                        <Button variant="link" className="text-blue-500 dark:text-sky-400 p-0 mx-1">
                            solicita un nuevo correo
                        </Button>
                    </div>
                    <Link to="/login" className="mt-6">
                        <Button variant="outline">
                            Volver al inicio de sesión
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default PendingRegister;