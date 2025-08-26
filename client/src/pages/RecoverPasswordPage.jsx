import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { t } from 'i18next';

const apiURL = import.meta.env.VITE_API_URL;

const formSchema = z.object({
    email: z.string()
        .min(1, 'El email es requerido')
        .email('Formato de email inválido'),
});

const RecoverPasswordPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
            document.title = 'Rapitecnic | ' + (t('RecoverPassword') );
        }, []);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiURL}/authController/requestPasswordReset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error al solicitar la recuperación de contraseña');
            }

            setIsSubmitted(true);
            toast({
                title: "Correo enviado",
                description: "Se han enviado las instrucciones a tu correo electrónico",
                variant: "success",
            });
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Error",
                description: error.message || "Error al enviar el correo de recuperación",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
                <Card className="w-full max-w-md rounded-lg shadow-lg px-8 py-10 text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-400 mb-4">
                        Correo enviado
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Se ha enviado un correo con las instrucciones para restablecer tu contraseña.
                        Por favor, revisa tu bandeja de entrada.
                    </p>
                    <Button
                        onClick={() => navigate('/login')}
                        className="w-full"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al inicio de sesión
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
            <Card className="w-full max-w-md rounded-lg shadow-lg px-8 py-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <img
                        src="/rapitecnic-sin-letras.png"
                        alt="logo web graphicFactory"
                        className="h-10"
                    />
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-400">
                        Recuperar contraseña
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            {...register('email')}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4 mr-2" />
                            )}
                            Enviar instrucciones
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => navigate('/login')}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al inicio de sesión
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Te enviaremos un correo electrónico con instrucciones sobre cómo
                        restablecer tu contraseña.
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default RecoverPasswordPage;