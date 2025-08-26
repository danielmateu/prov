import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Key, CheckCircle2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const apiURL = import.meta.env.VITE_API_URL;

const formSchema = z.object({
    password: z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string()
        .min(1, 'Confirma tu contraseña')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

const ResetPasswordPage = () => {
    const { token } = useParams();
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

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            // Actualizada la URL para que coincida con la ruta del backend
            const response = await fetch(`${apiURL}/authController/resetPassword/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword: data.password,
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Error al restablecer la contraseña');
            }

            const result = await response.json();
            setIsSubmitted(true);
            toast({
                title: "Contraseña actualizada",
                description: "Tu contraseña ha sido actualizada correctamente",
                variant: "success",
            });
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Error",
                description: error.message || "Error al restablecer la contraseña",
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
                        ¡Contraseña actualizada!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.
                    </p>
                    <Button
                        onClick={() => navigate('/login')}
                        className="w-full"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Ir al inicio de sesión
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
                        Nueva contraseña
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password">Nueva contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register('confirmPassword')}
                            className={errors.confirmPassword ? 'border-red-500' : ''}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
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
                                <Key className="w-4 h-4 mr-2" />
                            )}
                            Actualizar contraseña
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
            </Card>
        </div>
    );
};

export default ResetPasswordPage;