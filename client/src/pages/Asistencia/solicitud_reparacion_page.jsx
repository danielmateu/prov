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
import { set } from 'date-fns';
import { usePendingPaymentsStore } from '@/zustand/pendingPaymentsStore';
import { FormPersistenceIndicator } from '@/components/FormPersistanceIndicator';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import { useUserPermissions } from '@/hooks/useUserPermissions';
// import { FormPersistenceIndicator } from '@/components/FormPersistenceIndicator';

const apiUrl = import.meta.env.VITE_API_URL;

export default function SolicitudReparacionPage() {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    // const { pendingPayments, fetchPendingPayments, isLoading: paymentsLoading } = usePendingPaymentsStore();

    // console.log('location', location.pathname);
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

    // const modules = [
    //     {
    //         title: t('Repair'),
    //         icon: <PocketKnife />,
    //         path: '/asistencia/reparacion',
    //     },
    //     {
    //         title: t('Installation'),
    //         icon: <Drill />,
    //         path: '/asistencia/instalacion',
    //     },
    //     // {
    //     //     title: t('Sale'),
    //     //     icon: <BadgeEuro />,
    //     //     path: '/asistencia/venta',
    //     // },
    //     // {
    //     //     title: t('Warranty'),
    //     //     icon: <Award />,
    //     //     path: '/asistencia/garantia',
    //     // },
    // ];

    const steps = useTourSteps();
    const { isOpen, currentStep, setIsOpen, setCurrentStep, setSteps } = useTour()

    // console.log('CurrentStep', currentStep);

    useEffect(() => {
        if (isOpen) {
            setSteps(steps);
        }
        setCurrentStep(0);
        // document.title = 'Rapitecnic | Reparación';
        document.title = 'Rapitecnic | ' + t('ReparationPage');
    }, []);

    // const handleSteps = () => {
    //     if (isOpen) {
    //         setSteps(steps);
    //     }
    // }



    const handleSubmit = async (data, e) => {
        // console.log('data', data);
        setCurrentStep(0);
        setIsOpen(false);
        setLoading(true);

        // return
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/noticeController/insertExternalNotice`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    notice: data,
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
            return;
        }

        navigate('/inicio');
        toast({
            title: t('RequestSent'),
            description: t('SuccessMessage'),
            variant: 'success',
            duration: 5000,
        });
        setSubmitted(true);
        setLoading(false);
    };

    return (
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
                        title={t('RepairServiceRequest')}
                        submitButtonText={t('RequestRepair')}
                        showWarrantyCheckbox={true}
                        isWarrantyForm={false}
                        serviceType={1}
                        location={location.pathname}
                        loading={loading}
                    // handleSteps={handleSteps}
                    />
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                        <CheckCircle2 className="w-16 h-16 text-[#00A7E1] mx-auto mb-4" />
                        <p className="text-lg text-gray-700">
                            {t('SuccessMessage')}
                        </p>
                        <Button
                            className="mt-4 bg-[#00A7E1] text-white hover:bg-[#0092c4]"
                            onClick={() => {
                                setSubmitted(false);
                            }}
                        >
                            {t('BackToRepair')}
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}