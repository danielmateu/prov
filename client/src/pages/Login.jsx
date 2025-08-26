import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import Footer from '@/components/footer/Footer';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FAQSection from '@/components/footer/FAQSection';

const Login = ({ empresa }) => {
    const { login, isLoading, error } = useAuth();

    useEffect(() => {
        document.title = 'Rapitecnic | Login';
    }, []);

    const handleLogin = async (formData) => {
        try {
            await login({ ...formData, empresa });
        } catch (err) {
            console.error('Error durante el inicio de sesión:', err);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
                <Card className="w-full max-w-md rounded-lg shadow-lg px-8 py-10">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <img
                            src="/rapitecnic-sin-letras.png"
                            alt="logo web graphicFactory"
                            className="h-10"
                        />
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-400">
                            Iniciar Sesión
                        </h2>
                    </div>

                    <LoginForm
                        onSubmit={handleLogin}
                        isLoading={isLoading}
                        error={error}
                    />

                    <div className="mt-6 space-y-2 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            ¿No tienes una cuenta?{' '}
                            <Link
                                to="/register"
                                className="text-blue-500 hover:text-blue-600 dark:text-sky-400 dark:hover:text-sky-500"
                            >
                                Regístrate
                            </Link>
                        </p>
                        <p>
                            <Link
                                to="/recover-password"
                                className="text-blue-500 hover:text-blue-600 dark:text-sky-400 dark:hover:text-sky-500"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </p>
                    </div>
                </Card>
                <Dialog>
                    <DialogTrigger
                        className='flex gap-2 pt-6'
                    >
                        <p className="text-gray-600 dark:text-gray-400">
                            ¿Necesitas ayuda?{' '}
                        </p>
                        <p className="text-blue-500 hover:text-blue-600 dark:text-sky-400 dark:hover:text-sky-500">
                            Preguntas Frecuentes
                        </p>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">
                                Preguntas Frecuentes
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                                Aquí encontrarás respuestas a las preguntas más comunes sobre el inicio de sesión y la recuperación de contraseña.
                            </DialogDescription>
                        </DialogHeader>
                        <FAQSection variant="login" />

                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default Login;