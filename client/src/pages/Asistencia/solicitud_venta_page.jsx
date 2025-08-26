import { useState } from 'react';
import { Award, BadgeEuro, CheckCircle2, Drill, PocketKnife } from 'lucide-react';
import { ServiceForm } from '@/components/ServiceForm/ServiceForm';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import ModuleCard from '@/components/cards/ModuleCard';
import { useTranslation } from 'react-i18next';

const apiUrl = import.meta.env.VITE_API_URL;

// const modules = [
//     {
//         title: 'Reparación',
//         icon: <PocketKnife />,
//         path: '/asistencia/reparacion',
//         // description: 'Solicita asistencia técnica para una reparación'
//     },
//     {
//         title: 'Instalación',
//         icon: <Drill />,
//         path: '/asistencia/instalacion',
//         // description: 'Solicita asistencia técnica para la instalación de un equipo'
//     },
//     {
//         title: 'Venta',
//         icon: <BadgeEuro />,
//         path: '/asistencia/venta',
//         // description: 'Solicita asistencia técnica sobre la venta de un equipo'
//     },
//     {
//         title: 'Garantía',
//         icon: <Award />,
//         path: '/asistencia/garantia',
//         // description: 'Solicita asistencia técnica en un equipo en garantía'
//     },
// ];

export default function SolicitudVentaPage() {
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (data, e) => {
        // Prevenir el comportamiento por defecto del formulario 
        e.preventDefault();

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
        } catch (error) {

        }

        // Redirigir a la página de inicio después de enviar el formulario
        navigate('/inicio'); // Descomentar si deseas redirigir a la página de inicio
        // Mostrar un mensaje de éxito
        toast({
            title: 'Solicitud enviada',
            description: 'Sus datos se han enviado con éxito, en la mayor brevedad posible llamaremos al cliente para citar la asistencia.',
            variant: 'success',
            duration: 5000,
        });
        setSubmitted(true);
    };

    const location = useLocation();

    const { t } = useTranslation();
    const modules = [
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
        {
            title: t('Sale'),
            icon: <BadgeEuro />,
            path: '/asistencia/venta',
        },
        {
            title: t('Warranty'),
            icon: <Award />,
            path: '/asistencia/garantia',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
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
                        title="Solicitud de Venta"
                        submitButtonText="Solicitar Presupuesto"
                        showWarrantyCheckbox={false}
                        serviceType={3}
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
                            Volver a Solicitar una venta
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}