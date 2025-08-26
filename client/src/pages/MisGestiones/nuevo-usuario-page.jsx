import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useTourSteps } from "@/hooks/useTourSteps";
import { useUserInfoStore } from "@/zustand/userInfoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTour } from "@reactour/tour";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { use } from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string()
        .min(2, 'El nombre es requerido')
        .max(50, 'El nombre no puede tener más de 50 caracteres'),
    surname: z.string()
        .min(2, 'El primer apellido es requerido')
        .max(50, 'El apellido no puede tener más de 50 caracteres'),
    email: z.string()
        .email('Correo electrónico inválido')
        .min(1, 'El correo electrónico es requerido'),
    mobile: z.string()
        .min(9, 'El número de móvil es requerido')
        .max(15, 'El número de móvil no puede tener más de 15 dígitos')
        .regex(/^\+?[0-9]+$/, 'Número de móvil inválido'),
    password: z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(50, 'La contraseña no puede tener más de 50 caracteres'),
    confirmPassword: z.string()
        .min(1, 'Confirma tu contraseña'),
    // Ex_InvoicingAddressID: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export default function NuevoUsuarioPage() {
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { t } = useTranslation()
    const steps = useTourSteps();
    const { isOpen, currentStep, setIsOpen, setCurrentStep, setSteps } = useTour()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { registerUser } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        document.title = 'Rapitecnic | ' + t('NewUser');
    }, []);


    const startTour = () => {
        setCurrentStep(0);
        setSteps(steps);
        setIsOpen(true);
    };

    const handleSubmit = async (data) => {
        // console.log('data', data);
        setIsLoading(true);
        setError('');

        try {
            await registerUser(data);

            // toast({
            //     title: 'Registro exitoso',
            //     description: 'Le hemos enviado un correo para confirmar y validar su contraseña. Por favor revise su bandeja de entrada o spam.',
            //     variant: 'success',
            // });

        } catch (err) {
            console.error('Error durante el registro:', err);
            toast({
                title: 'Error',
                description: 'Ocurrió un error al registrar la cuenta.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col gap-2 md:flex-row items-center justify-between">
                    {/* <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Registro de Usuario
                    </h1> */}
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('NewUserRegistration')}
                    </h1>
                    {!userInfo?.Administrator ?
                        (<p>
                            {/* <span className="text-red-500">¡Atención!</span> Solo los administradores pueden crear nuevos usuarios. */}
                        </p>) : (
                            <div className="flex items-center gap-8">
                                <Button
                                    onClick={startTour}
                                    variant="gradientGlow"
                                    className="hidden md:flex"
                                >
                                    {/* Iniciar Tour */}
                                    {t('StartTour')}
                                </Button>
                                <div className="flex items-center gap-2">
                                    <UserPlus size={18} />
                                    <p className="text-sm text-muted-foreground">
                                        {/* Complete el formulario para crear una nueva cuenta de usuario. */}
                                        {t('FillFormNewAccount')}
                                    </p>
                                </div>
                            </div>
                        )}

                </div>
            </header >

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 add-user-header">
                <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 md:p-8">
                    {
                        !userInfo?.Administrator ? (
                            <p>
                                {/* <span className="text-red-500">¡Atención!</span> Solo los administradores pueden crear nuevos usuarios. */}
                                {t('OnlyAdministratorsCanCreateUsers')}
                            </p>
                        ) : (

                            <RegisterForm
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                error={error}
                                Ex_InvoicingAddressID={userInfo?.Ex_InvoicingAddressID}
                            />
                        )
                    }
                </div>
            </main>
        </div >
    );
}

function RegisterForm({ onSubmit, isLoading, error, Ex_InvoicingAddressID }) {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            Ex_InvoicingAddressID: Ex_InvoicingAddressID || ''
        }
    });

    useEffect(() => {
        if (Ex_InvoicingAddressID) {
            setValue('Ex_InvoicingAddressID', Ex_InvoicingAddressID);
        }
    }, [Ex_InvoicingAddressID, setValue]);

    const onSubmitWrapper = (data) => {
        // Asegurarnos de que Ex_InvoicingAddressID esté incluido
        const formData = {
            ...data,
            Ex_InvoicingAddressID: Ex_InvoicingAddressID
        };
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-6">
            <input
                type="hidden"
                {...register('Ex_InvoicingAddressID')}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">
                        {/* Nombre <span className="text-destructive">*</span> */}
                        {t('Name')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="surname">
                        {/* Primer Apellido <span className="text-destructive">*</span> */}
                        {t('FirstSurname')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="surname"
                        type="text"
                        {...register('surname')}
                    />
                    {errors.surname && (
                        <p className="text-sm text-destructive">{errors.surname.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">
                        {/* Correo electrónico <span className="text-destructive">*</span> */}
                        {t('Email')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="mobile">
                        {/* Móvil <span className="text-destructive">*</span> */}
                        {t('Phone')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="mobile"
                        type="tel"
                        placeholder="+34"
                        {...register('mobile')}
                    />
                    {errors.mobile && (
                        <p className="text-sm text-destructive">{errors.mobile.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">
                        {/* Contraseña <span className="text-destructive">*</span> */}
                        {t('Password')} <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                        {/* Confirmar Contraseña <span className="text-destructive">*</span> */}
                        {t('ConfirmPassword')} <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword')}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            {error && (
                <div className="rounded-md bg-destructive/10 p-4">
                    <p className="text-sm text-destructive">{error}</p>
                </div>
            )}

            <Button
                type="submit"
                className="w-full dark:bg-sky-800 hover:dark:bg-sky-900 dark:text-sky-100 bg-blue-500 hover:bg-blue-600 add-user-submit"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {/* Procesando... */}
                        {t('Processing')}
                    </>
                ) : (
                    // 'Crear cuenta'
                    t('CreateAccount')
                )}
            </Button>
        </form>
    );
}