import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
    email: z.string()
        .email('Correo electrónico inválido')
        .min(1, 'El correo electrónico es requerido'),
    password: z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(50, 'La contraseña no puede tener más de 50 caracteres'),
    rememberMe: z.boolean().optional(),
});

const LoginForm = ({ onSubmit, isLoading, error }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: localStorage.getItem('lastEmail') || '',
            password: localStorage.getItem('rememberedPassword') || '',
            rememberMe: !!localStorage.getItem('rememberedPassword'),
        },
    });

    const handleFormSubmit = async (data) => {
        localStorage.setItem('lastEmail', data.email);

        if (data.rememberMe) {
            localStorage.setItem('rememberedPassword', data.password);
        } else {
            localStorage.removeItem('rememberedPassword');
        }

        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 flex flex-col">
            <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico:</Label>
                <Input
                    id="email"
                    type="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register('email')}
                    className="w-full"
                    placeholder="josegp@mail.com"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2 relative">
                <Label htmlFor="password">Contraseña:</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        aria-invalid={errors.password ? "true" : "false"}
                        {...register('password')}
                        className="w-full pr-10"
                        placeholder="********"
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                        {showPassword ? <EyeOff size={20} className='dark:text-slate-800' /> : <Eye size={20} className='dark:text-slate-800' />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="rememberMe"
                    {...register('rememberMe')}
                />
                <Label htmlFor="rememberMe" className="text-sm">
                    Recordar contraseña
                </Label>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <Button
                type="submit"
                className="w-full dark:bg-sky-800 hover:dark:bg-sky-900 dark:text-sky-100 bg-blue-500 hover:bg-blue-600"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Iniciando sesión...
                    </div>
                ) : (
                    'Iniciar sesión'
                )}
            </Button>
        </form>
    );
};

export default LoginForm;