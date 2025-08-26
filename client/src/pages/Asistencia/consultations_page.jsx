
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
import { FormPersistenceIndicator } from '@/components/FormPersistanceIndicator';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import { useUserPermissions } from '@/hooks/useUserPermissions';
// import { FormPersistenceIndicator } from '@/components/FormPersistenceIndicator';


const apiUrl = import.meta.env.VITE_API_URL;

export default function ConsultationsPage() {
    const [showScrollButton, setShowScrollButton] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { toast } = useToast();

    const { userInfo } = useUserInfoStore()

    console.log('UserInfo', userInfo);

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
        // document.title = 'Rapitecnic | ' + t('InstallationPage');
        document.title = 'Rapitecnic | ' + 'Consultas';
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
        setCurrentStep(0);
        setIsOpen(false);
        setLoading(true);

        console.log('Submitting consultation:', data);

        // Crear la estructura correcta para el envío de datos
        const requestData = {
            consultationData: {
                id: `CONSULT-${Date.now()}`,
                customerID: data.customerID,
                customerName: data.customerData ? `${data.customerData.Name} ${data.customerData.Surname}` : "Cliente no especificado",
                description: data.description || data.comentarioAveria || "Sin descripción",
                priority: data.priority || 'media',
                requestedBy: data.requestedBy || userInfo?.Name + " " + userInfo?.Surname || "Usuario del sistema",
                requestDate: data.requestDate || new Date().toISOString(),
                customerData: data.customerData || null,
                searchValue: data.searchValue || data.telefono || null,
                // topic: data.topic || "Consulta general",
                contactMethod: data.contactMethod || "Teléfono"
            }
        };

        try {
            const response = await fetch(`${apiUrl}/noticeController/submitConsultationRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData) // Enviar los datos con la estructura correcta
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setLoading(false);

            // Redirigir a la página de inicio después de enviar el formulario
            navigate('/inicio');
            toast({
                title: 'Consulta enviada',
                description: 'Su consulta ha sido enviada con éxito. Nos pondremos en contacto lo antes posible.',
                variant: 'success',
                duration: 5000,
            });
            setSubmitted(true);
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
                            serviceType={7}
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