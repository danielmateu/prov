import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Wrench,
    BarChart3,
    FileText,
    Users,
    EuroIcon,
    ArrowRight,
    Download
} from 'lucide-react';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import { useTranslation } from 'react-i18next';
import { useTour } from '@reactour/tour';
import { Button } from '@/components/ui/button';
import { useTourSteps } from '@/hooks/useTourSteps';
import Footer from '@/components/footer/Footer';

const ModuleCard = ({ title, icon, path, description, className, setIsOpen }) => (
    <Link
        onClick={() => {
            setIsOpen(false);
        }}
        to={path}
        className={`group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500"></div>
        <div className="p-6 flex flex-col items-center space-y-4">
            <div className="text-blue-500 dark:text-blue-400 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                {icon}
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-balance">
                    {description}
                </p>
            </div>
            <div className="absolute bottom-2 right-4 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
        </div>
    </Link>
);

const Home = () => {
    const { t } = useTranslation();
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { Administrator } = userInfo || {};
    const isAdmin = Administrator === true;
    const { setIsOpen, setSteps } = useTour();
    const steps = useTourSteps();

    useEffect(() => {
        document.title = 'Rapitecnic | ' + t('MainPanel');
    }, []);

    const startTour = () => {
        setSteps(steps);
        setIsOpen(true);
    };

    const downloadManual = () => {
        // Create a link element
        const link = document.createElement('a');
        link.href = '/Manual_Rapitecnic.pdf'; // Path to the PDF file in the public directory
        link.download = 'Manual_Rapitecnic.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const modules = [
        {
            title: t('RequestAssistance'),
            icon: <Wrench className="w-12 h-12" />,
            path: '/asistencia',
            description: t('RequestAssistanceDesc'),
            className: 'second-step'
        },
        {
            title: t('ViewServices'),
            icon: <BarChart3 className="w-12 h-12" />,
            path: '/resumen',
            description: t('ViewServicesDesc'),
            className: 'third-step'
        },
        {
            title: t('SATS'),
            icon: <Users className="w-12 h-12" />,
            path: '/sats',
            description: t('SATSDesc'),
            className: 'fourth-step'
        },
    ];

    const adminModules = [
        {
            title: t('Billing'),
            icon: <EuroIcon className="w-12 h-12" />,
            path: '/facturacion',
            description: t('BillingDesc'),
            className: 'sixth-step'
        },
        {
            title: t('FiscalData'),
            icon: <FileText className="w-12 h-12" />,
            path: '/datos-fiscales',
            description: t('FiscalDataDesc'),
            className: 'fifth-step'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('MainPanel')}
                    </h1>
                    <div className="flex gap-4">
                        <Button
                            onClick={startTour}
                            variant="gradientGlow"
                        >
                            {t('StartTour')}
                        </Button>
                        <Button
                            onClick={downloadManual}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Descargar Manual
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main content - flex-grow pushes footer to bottom */}
            <main className="flex-grow max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 resumen-header first-step">
                <div className="space-y-8">
                    <section>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {modules.map((module, index) => (
                                <ModuleCard
                                    key={index}
                                    {...module}
                                    setIsOpen={setIsOpen}
                                />
                            ))}
                        </div>
                    </section>

                    {isAdmin && (
                        <section>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {adminModules.map((module, index) => (
                                    <ModuleCard
                                        key={index}
                                        {...module}
                                        setIsOpen={setIsOpen}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* Footer - will stick to bottom */}
            <Footer />
        </div>
    );
};

export default Home;