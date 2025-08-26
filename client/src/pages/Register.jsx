import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const Register = ({ empresa }) => {
    const { register, isLoading, error } = useAuth();
    const { t } = useTranslation();
    const { toast } = useToast();

    useEffect(() => {
        document.title = 'Rapitecnic | ' + t('Register');
    }, []);

    const handleRegister = async (formData) => {
        // console.log('formData', formData);
        try {
            await register({ ...formData, empresa });

            toast({
                title: 'Registro exitoso',
                description: 'Le hemos enviado un correo para confirmar y validar su contraseña. Por favor revise su bandeja de entrada o spam.',
                variant: 'success',
            });

        } catch (err) {
            console.error('Error durante el registro:', err);
            toast({
                title: 'Error',
                description: 'Ocurrió un error al registrar la cuenta.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
            <Card className="w-full max-w-xl rounded-lg shadow-lg px-8 py-4">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <img
                        src="/rapitecnic-sin-letras.png"
                        alt="logo web graphicFactory"
                        className="h-10"
                    />
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-400">
                        {/* Crear Cuenta */}
                        {t('CreateAccount')}
                    </h2>
                </div>

                <RegisterForm
                    onSubmit={handleRegister}
                    isLoading={isLoading}
                    error={error}
                />

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:text-blue-600 dark:text-sky-400 dark:hover:text-sky-500"
                        >
                            {/* Inicia sesión */}
                            {t('Login')}
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Register;