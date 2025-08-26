import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const apiURL = import.meta.env.VITE_API_URL;

const VerifyEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [verificationStatus, setVerificationStatus] = useState('loading'); // loading, success, error

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`${apiURL}/authController/verifyEmail/${token}`, {
                    method: 'POST',
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Error al verificar el email');
                }

                setVerificationStatus('success');
                toast({
                    title: "¡Cuenta verificada!",
                    description: "Tu cuenta ha sido verificada correctamente",
                    variant: "success",
                });
            } catch (error) {
                console.error('Error:', error);
                setVerificationStatus('error');
                toast({
                    title: "Error",
                    description: error.message || "Error al verificar la cuenta",
                    variant: "destructive",
                });
            }
        };

        verifyEmail();
    }, [token, toast]);

    const renderContent = () => {
        switch (verificationStatus) {
            case 'loading':
                return (
                    <>
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-400 mb-4">
                            Verificando tu cuenta
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Por favor, espera mientras verificamos tu cuenta...
                        </p>
                    </>
                );

            case 'success':
                return (
                    <>
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-400 mb-4">
                            ¡Cuenta verificada!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión.
                        </p>
                        <Button
                            onClick={() => navigate('/login')}
                            className="w-full"
                        >
                            Ir al inicio de sesión
                        </Button>
                    </>
                );

            case 'error':
                return (
                    <>
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-400 mb-4">
                            Error de verificación
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            No se pudo verificar tu cuenta. El enlace puede haber expirado o ser inválido.
                        </p>
                        <Button
                            onClick={() => navigate('/login')}
                            className="w-full"
                        >
                            Volver al inicio de sesión
                        </Button>
                    </>
                );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
            <Card className="w-full max-w-md rounded-lg shadow-lg px-8 py-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <img
                        src="/rapitecnic-sin-letras.png"
                        alt="logo web graphicFactory"
                        className="h-10"
                    />
                </div>
                {renderContent()}
            </Card>
        </div>
    );
};

export default VerifyEmailPage;