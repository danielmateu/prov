// import RegisterForm from "@/components/auth/RegisterForm";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "@/hooks/useAuth";
// import { useUserInfoStore } from "@/zustand/userInfoStore";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, HousePlus } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const registerSchema = z.object({
//     name: z.string()
//         .min(2, 'El nombre es requerido')
//         .max(50, 'El nombre no puede tener más de 50 caracteres'),
//     surname: z.string()
//         .min(2, 'El primer apellido es requerido')
//         .max(50, 'El apellido no puede tener más de 50 caracteres'),
//     email: z.string()
//         .email('Correo electrónico inválido')
//         .min(1, 'El correo electrónico es requerido'),
//     mobile: z.string()
//         .min(9, 'El número de móvil es requerido')
//         .max(15, 'El número de móvil no puede tener más de 15 dígitos')
//         .regex(/^\+?[0-9]+$/, 'Número de móvil inválido'),
//     password: z.string()
//         .min(6, 'La contraseña debe tener al menos 6 caracteres')
//         .max(50, 'La contraseña no puede tener más de 50 caracteres'),
//     confirmPassword: z.string()
//         .min(1, 'Confirma tu contraseña'),
//     // Ex_InvoicingAddressID: z.string().optional(),
// }).refine((data) => data.password === data.confirmPassword, {
//     message: "Las contraseñas no coinciden",
//     path: ["confirmPassword"],
// });

// export default function NuevoNegocioPage() {
//     const userInfo = useUserInfoStore((state) => state.userInfo);
//     // console.log('userInfo', userInfo);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     const { register } = useAuth();
//     const { toast } = useToast();

//     const handleSubmit = async (data) => {
//         console.log('data', data);
//         setIsLoading(true);
//         setError('');

//         try {
//             // await registerUser(data);
//             const response = await register(data);
//             console.log('response', response);

//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.message || 'Error al registrar el nuevo negocio');
//             }

//             toast({
//                 title: 'Registro exitoso',
//                 description: 'Le hemos enviado un correo para confirmar y validar su contraseña. Por favor revise su bandeja de entrada o spam.',
//                 variant: 'success',
//             });

//         } catch (err) {
//             console.error('Error durante el registro:', err);
//             toast({
//                 title: 'Error',
//                 description: 'Ocurrió un error al registrar la cuenta.',
//                 variant: 'destructive',
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };



//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//             <header className="bg-white dark:bg-gray-800 shadow">
//                 <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 md:flex items-center justify-between">
//                     <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                         Registro de nuevo negocio
//                     </h1>
//                     {!userInfo?.Administrator ?
//                         (<p>
//                             {/* <span className="text-red-500">¡Atención!</span> Solo los administradores pueden crear nuevos usuarios. */}
//                         </p>) : (
//                             <>
//                                 <div className="flex items-center gap-2">
//                                     <HousePlus size={18} />
//                                     <p className="text-sm text-muted-foreground">
//                                         Rellene el formulario para crear una nueva cuenta
//                                     </p>
//                                 </div>
//                             </>
//                         )}
//                 </div>
//             </header >

//             <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//                 <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 md:p-8">
//                     {
//                         !userInfo?.Administrator ? (
//                             <p>
//                                 <span className="text-red-500">¡Atención!</span> Solo los administradores pueden crear nuevos usuarios.
//                             </p>
//                         ) : (

//                             <RegisterForm
//                                 onSubmit={handleSubmit}
//                                 userInfo={userInfo}
//                             />
//                         )
//                     }
//                 </div>
//             </main>
//         </div >
//     );
// }

import RegisterForm from "@/components/auth/RegisterForm";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUserInfoStore } from "@/zustand/userInfoStore";
import { HousePlus } from "lucide-react";
import { useState, useEffect } from "react";

import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useTourSteps } from "@/hooks/useTourSteps";
import { useTour } from "@reactour/tour";

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
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export default function NuevoNegocioPage() {
    const { t } = useTranslation();
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { register } = useAuth();
    const { toast } = useToast();

    const steps = useTourSteps();
    const { isOpen, currentStep, setIsOpen, setCurrentStep, setSteps } = useTour()


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        document.title = 'Rapitecnic | ' + t('NewBusiness');
    }, []);

    const startTour = () => {
        setCurrentStep(0);
        setSteps(steps);
        setIsOpen(true);
    };

    const handleSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await register(data);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || t('ErrorRegisteringBusiness'));
            }

            toast({
                title: t('SuccessfulRegistration'),
                description: t('RegistrationEmailSent'),
                variant: 'success',
            });

        } catch (err) {
            console.error('Error during registration:', err);
            toast({
                title: t('Error'),
                description: t('ErrorCreatingAccount'),
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 md:flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('NewBusinessRegistration')}
                    </h1>
                    {!userInfo?.Administrator ? (
                        <p></p>
                    ) : (
                        <div className="flex items-center gap-8">
                            <Button
                                onClick={startTour}
                                variant="gradientGlow"
                                className="hidden md:flex "
                            >
                                {/* Iniciar Tour */}
                                {t('StartTour')}
                            </Button>
                            <div className="flex items-center gap-2">
                                <HousePlus size={18} />
                                <p className="text-sm text-muted-foreground">
                                    {t('FillFormNewBusiness')}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 add-business-header">
                <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 md:p-8">
                    {!userInfo?.Administrator ? (
                        <p>
                            <span className="text-red-500">{t('Warning')}</span> {t('AdminOnlyNewUsers')}
                        </p>
                    ) : (
                        <RegisterForm
                            onSubmit={handleSubmit}
                            userInfo={userInfo}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}