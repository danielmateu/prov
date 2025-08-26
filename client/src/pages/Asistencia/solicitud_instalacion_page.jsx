
import { useEffect, useState } from 'react';
import { AlertCircle, Award, BadgeEuro, BadgeEuroIcon, CheckCircle2, Drill, Frown, MailQuestionIcon, PocketKnife, UserPen } from 'lucide-react';
import { ServiceForm } from '@/components/ServiceForm/ServiceForm';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import ModuleCard from '@/components/cards/ModuleCard';
import { useTranslation } from 'react-i18next';
import { useTourSteps } from '@/hooks/useTourSteps';
import { useTour } from '@reactour/tour';
import { FormPersistenceIndicator } from '@/components/FormPersistanceIndicator';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import { useUserPermissions } from '@/hooks/useUserPermissions';
// import { FormPersistenceIndicator } from '@/components/FormPersistenceIndicator';


const apiUrl = import.meta.env.VITE_API_URL;

export default function SolicitudInstalacionPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { toast } = useToast();

    const { userInfo } = useUserInfoStore()

    const { checkPermission } = useUserPermissions();

    const standardModules = [
        {
            title: t('Repair'),
            icon: <PocketKnife />,
            path: '/asistencia/reparacion',
        },
        {
            title: t('Installation'),
            icon: <Drill />,
            path: '/asistencia/instalacion',
        },
        // {
        //     title: t('Sale'),
        //     icon: <BadgeEuro />,
        //     path: '/asistencia/venta',
        // },
        // {
        //     title: t('Warranty'),
        //     icon: <Award />,
        //     path: '/asistencia/garantia',
        // },
    ];

    const superAdminModules = [
        {
            title: 'Reclamaciones',
            icon: <AlertCircle />,
            path: '/asistencia/reclamaciones',
        },
        {
            title: 'Contabilidad',
            icon: <UserPen />,
            path: '/asistencia/contabilidad',
        },
        {
            title: 'Consultas',
            icon: <MailQuestionIcon />,
            path: '/asistencia/consultas',
        },
    ];

    const modules = checkPermission('canAccessReclamaciones') ? [...standardModules, ...superAdminModules] : standardModules;

    const steps = useTourSteps();
    const { isOpen, currentStep, setIsOpen, setCurrentStep, setSteps } = useTour()

    // console.log('CurrentStep', currentStep);

    useEffect(() => {
        if (isOpen) {
            setSteps(steps);
        }
        setCurrentStep(3);
        // document.title = 'Rapitecnic | Instalación';
        document.title = 'Rapitecnic | ' + t('InstallationPage');
    }, []);

    const handleSubmit = async (data, e) => {
        // Prevenir el comportamiento por defecto del formulario 
        e.preventDefault();
        setCurrentStep(0);
        setIsOpen(false);
        setLoading(true);


        try {
            const response = await fetch(`${apiUrl}/noticeController/insertExternalNotice`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    notice: data, // Enviar noticeData como propiedad 'notice'
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            toast({
                title: t('Error'),
                description: t('ErrorMessage'),
                variant: 'destructive',
                duration: 5000,
            });
            setLoading(false);
        }

        // Redirigir a la página de inicio después de enviar el formulario
        navigate('/inicio'); // Descomentar si deseas redirigir a la página de inicio
        toast({
            title: 'Solicitud enviada',
            description: 'Sus datos se han enviado con éxito, en la mayor brevedad posible llamaremos al cliente para citar la asistencia.',
            variant: 'success',
            duration: 5000,
        });
        setSubmitted(true);
    };

    const location = useLocation();



    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* <FormPersistenceIndicator /> */}
            <header className="bg-white dark:bg-gray-800 shadow flex gap-4 justify-center py-2">
                {modules.map((module, index) => (
                    // <Link
                    //     key={index}
                    //     to={module.path}
                    //     className=""
                    // >
                    //     {/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg group min-w-40"> */}
                    //     <div className={cn("bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg group min-w-40",
                    //         location.pathname === module.path ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800",
                    //         ""
                    //     )}>
                    //         <div className="py-2">
                    //             <div className="flex items-center justify-center">
                    //                 <div className="text-blue-500 dark:text-blue-400 group-hover:-rotate-12 transition-transform duration-200">
                    //                     {module.icon}
                    //                 </div>
                    //             </div>
                    //             <div className="text-center">
                    //                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    //                     {module.title}
                    //                 </h3>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </Link>
                    <ModuleCard
                        key={index}
                        title={module.title}
                        icon={module.icon}
                        path={module.path}
                        description={module.description}
                    />
                ))}
            </header>
            <main className="max-w-7xl mx-auto px-4 py-6">
                {!submitted ? (
                    <ServiceForm
                        onSubmit={handleSubmit}
                        title="Solicitud de Instalación"
                        submitButtonText="Solicitar Instalación"
                        showWarrantyCheckbox={false}
                        serviceType={4}
                        isWarrantyForm={false}
                        loading={loading}
                    />
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                        <CheckCircle2 className="w-16 h-16 text-[#00A7E1] mx-auto mb-4" />
                        <p className="text-lg text-gray-700">
                            Sus datos se han enviado con éxito, en la mayor brevedad posible llamaran al cliente para citar la asistencia.
                        </p>
                        <Button
                            className="mt-4 bg-[#00A7E1] text-white hover:bg-[#0092c4]"
                            onClick={() => {
                                setSubmitted(false);
                            }}
                        >
                            Volver a Solicitar una instalación
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}