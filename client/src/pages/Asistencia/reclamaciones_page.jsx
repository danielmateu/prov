
import { useEffect, useState } from 'react';
import { AlertCircle, ArrowUpCircle, Award, BadgeEuro, BadgeEuroIcon, CheckCircle2, Drill, Frown, MailQuestionIcon, PocketKnife, UserPen } from 'lucide-react';
import { ServiceForm } from '@/components/ServiceForm/ServiceForm';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import ModuleCard from '@/components/cards/ModuleCard';
import { useTranslation } from 'react-i18next';
import { useTourSteps } from '@/hooks/useTourSteps';
import { useTour } from '@reactour/tour';
// import { FormPersistenceIndicator } from '@/components/FormPersistanceIndicator';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import { useUserPermissions } from '@/hooks/useUserPermissions';
// import { FormPersistenceIndicator } from '@/components/FormPersistenceIndicator';


const apiUrl = import.meta.env.VITE_API_URL;

export default function ReclamacionesPage() {
    const [showScrollButton, setShowScrollButton] = useState(false);

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
        // document.title = 'Rapitecnic | ' + t('InstallationPage');
        document.title = 'Rapitecnic | ' + 'Reclamaciones';
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleSubmit = async (data) => {
        // Prevenir el comportamiento por defecto del formulario 
        // e.preventDefault();
        setCurrentStep(0);
        setIsOpen(false);
        setLoading(true);

        console.log('Submitting claim:', data);

        try {
            const response = await fetch(`${apiUrl}/noticeController/submitClaimRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
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
        <>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* <FormPersistenceIndicator /> */}
                <header className="bg-white dark:bg-gray-800 shadow flex gap-4 justify-center py-2">
                    {modules.map((module, index) => (
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
                            title="Solicitud de reclamación"
                            submitButtonText="Solicitar reclamación"
                            showWarrantyCheckbox={false}
                            serviceType={5}
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
            {showScrollButton && (
                <Button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-20 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 opacity-80"
                    aria-label={t('ScrollToTop')}
                >
                    <ArrowUpCircle className="h-6 w-6 text-white" />
                </Button>
            )}
        </>
    );
}