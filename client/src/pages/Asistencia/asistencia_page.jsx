

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    PocketKnife,
    Drill,
    BadgeEuro,
    Award,
    ArrowRight,
    BadgeEuroIcon,
    // BadgeQuestionMark,
    Frown,
    MailQuestionIcon,
    AlertCircle,
    UserPen
} from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { useTour } from '@reactour/tour';
import { useTourSteps } from '@/hooks/useTourSteps';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUserInfoStore } from '@/zustand/userInfoStore';


const ModuleCard = ({ title, icon, path, description, className }) => (
    <Link
        to={path}
        className={`group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500"></div>
        <div className="p-8 flex flex-col items-center space-y-4">
            <div className="text-blue-500 dark:text-blue-400 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                {icon}
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm text-pretty">
                    {description}
                </p>
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
        </div>
    </Link>
);

export default function AsistenciaPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setSteps, isOpen, setIsOpen, setCurrentStep } = useTour();
    const steps = useTourSteps();
    const { userInfo } = useUserInfoStore()

    console.log('User Info:', userInfo);

    const isSuperAdmin = userInfo?.SuperAdmin || false;

    useEffect(() => {
        // document.title = 'Rapitecnic | ' + t('AssistanceRequest');
        document.title = 'Rapitecnic | Asistencia';
    }, []);

    useEffect(() => {
        if (isOpen) {
            setSteps(steps);
        }
    }, [steps, setSteps, isOpen]);

    // Módulos base que todos los usuarios pueden ver
    const baseModules = [
        {
            title: t('RepairRequest'),
            icon: <PocketKnife className="w-12 h-12" />,
            path: '/asistencia/reparacion',
            description: t('RepairDesc'),
            className: 'repair-module'
        },
        {
            title: t('InstallationRequest'),
            icon: <Drill className="w-12 h-12" />,
            path: '/asistencia/instalacion',
            description: t('InstallationDesc'),
            className: 'installation-module'
        }
    ];

    // Módulos adicionales solo para SuperAdmin
    const adminModules = [
        {
            title: 'Reclamaciones',
            icon: <AlertCircle className="w-12 h-12" />,
            path: '/asistencia/reclamaciones',
            // description: t('ReclamacionesDesc'),
            description: 'Reclamaciones y quejas',
            className: 'reclamaciones-module'
        },
        {
            title: 'Contabilidad',
            icon: <UserPen className="w-12 h-12" />,
            path: '/asistencia/contabilidad',
            // description: t('ContabilidadDesc'),
            description: 'Gestión contable y facturación',
            className: 'contabilidad-module'
        },
        {
            title: 'Consultas',
            icon: <MailQuestionIcon className="w-12 h-12" />,
            path: '/asistencia/consultas',
            // description: t('ConsultasDesc'),
            description: 'Consultas y dudas',
            className: 'consultas-module'
        }
    ];

    // Combinar módulos según el rol del usuario
    const modules = isSuperAdmin
        ? [...baseModules, ...adminModules]
        : baseModules;

    const handleSelectChange = (value) => {
        navigate(value);
    };

    const startTour = () => {
        setCurrentStep(0);
        setSteps(steps);
        setIsOpen(true);
    };

    return (
        <div className="flex flex-col h-full lg:h-[calc(100dvh-85px)] bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow ">
                {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"> */}
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row  justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('AssistanceRequest')}
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={startTour}
                            variant="gradientGlow"
                            className="hidden sm:block"
                        >
                            {/* Iniciar Tour */}
                            {t('StartTour')}
                        </Button>
                        {/* <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder={t('AssistanceType')} />
                            </SelectTrigger>
                            <SelectContent>
                                {modules.map((module, index) => (
                                    <SelectItem key={index} value={module.path}>
                                        {module.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select> */}
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder={t('AssistanceType')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>Módulos Básicos</SelectLabel> */}
                                    {baseModules.map((module, index) => (
                                        <SelectItem key={`select-base-${index}`} value={module.path}>
                                            {module.title}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>

                                {isSuperAdmin && (
                                    <SelectGroup>
                                        {/* <SelectLabel>Módulos Administrativos</SelectLabel> */}
                                        {adminModules.map((module, index) => (
                                            <SelectItem key={`select-admin-${index}`} value={module.path}>
                                                {module.title}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex-grow">
                <div className="space-y-8">
                    {/* Módulos básicos siempre en 2 columnas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 asistencia-header">
                        {baseModules.map((module, index) => (
                            <ModuleCard key={`base-${index}`} {...module} />
                        ))}
                    </div>

                    {/* Módulos de administración en 3 columnas cuando están disponibles */}
                    {isSuperAdmin && (
                        <div className="mt-8">
                            {/* <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                                Módulos Administrativos
                            </h2> */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {adminModules.map((module, index) => (
                                    <ModuleCard key={`admin-${index}`} {...module} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {/* <Footer /> */}
        </div>

    );
}