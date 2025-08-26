
import { ErrorState } from '@/components/ErrorState/ErrorState';
import { NetworkErrorView } from '@/components/ErrorState/NetworkErrorView';
import { FiscalDataForm } from '@/components/FiscalDataForm/FiscalDataForm';
import { getInvoicingAddress } from '@/components/ServiceForm/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import { AlertCircle, Building2, ContactRound, FileText, Loader, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';



import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fiscalDataSchema } from '@/components/FiscalDataForm/types';
import { useTourSteps } from '@/hooks/useTourSteps';
import { useTour } from '@reactour/tour';

const apiURL = import.meta.env.VITE_API_URL;

export default function DatosFiscalesPage() {
    const { t } = useTranslation();
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { toast } = useToast();
    const [fiscalData, setFiscalData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { setSteps, setIsOpen, isOpen, currentStep, setCurrentStep } = useTour();

    const steps = useTourSteps();

    // console.log('steps', steps);

    useEffect(() => {
        if (isOpen) {
            setSteps(steps);
        }
    }, [steps, setSteps, isOpen]);

    useEffect(() => {
        fetchFiscalData();
    }, [userInfo?.Email]);

    useEffect(() => {
        document.title = 'Rapitecnic | ' + t('FiscalData');
    }, []);

    const startTour = () => {
        setCurrentStep(0);
        setSteps(steps);
        setIsOpen(true);
    };

    const handleCloseTour = () => {
        setIsOpen(false);
        setCurrentStep(0);
    }

    const {
        register,
        // handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
    } = useForm({
        resolver: zodResolver(fiscalDataSchema),
        defaultValues: fiscalData || {
            tipo: '', // 0 para autonomo, 1 para empresa
            tipoDocumento: '1', // 1 para DNI
            nombreFiscal: '',
            numeroFiscal: '',
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            direccion: '',
            telefonoMovil: '',
            telefonoFijo: '',
            correoElectronico: '',
            contactoNombre: '',
            contactoTelefonoMovil: '',
            contactoTelefonoFijo: '',
            iban: '',
            nombreComercial: '',
        },
    });

    const fetchFiscalData = async () => {
        if (!userInfo?.Administrator) {
            setIsLoading(false);
            return;
        }
        try {
            if (userInfo?.Email) {
                const response = await getInvoicingAddress(userInfo.Email);
                if (response) {
                    const data = response[0];
                    const transformedData = {
                        tipo: data.Business ? 'empresa' : 'autonomo',
                        tipoDocumento: data.DocumentTypeID === 1 ? '1' : data.DocumentTypeID === 2 ? '2' : '3',
                        nombreFiscal: data.TaxName || '',
                        nombre: data.Name || '',
                        primerApellido: data.Surname || '',
                        segundoApellido: data.SecondSurname || '',
                        direccion: data.Address || '',
                        telefonoMovil: data.Cell || '',
                        telefonoFijo: data.Phone || '',
                        correoElectronico: data.Email || '',
                        contactoNombre: data.Name || data.TaxName || '',
                        contactoTelefonoMovil: data.Cell || '',
                        contactoTelefonoFijo: data.Phone || '',
                        numeroFiscal: data.TaxIDNumber || '',
                        codigoPostal: data.ZipCode || '',
                        ciudad: data.City || '',
                        provincia: data.Province || '',
                        iban: data.IBAN || '',
                    };
                    setFiscalData(transformedData);
                    // Setear el valor de contactoNombre
                    setValue('contactoNombre', transformedData.contactoNombre + ' ' + transformedData.primerApellido);
                    setValue('contactoTelefonoMovil', transformedData.contactoTelefonoMovil);
                    setValue('contactoTelefonoFijo', transformedData.contactoTelefonoFijo);
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : t('ErrorFetchingFiscalData'));
            console.error('Error fetching fiscal data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data) => {

        setCurrentStep(4);

        try {
            const response = await fetch(`${apiURL}/noticeController/updateFiscalData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                setIsEditing(false);
                toast({
                    title: t('DataUpdated'),
                    description: result.message,
                    variant: 'success'
                })
                await fetchFiscalData();
            } else {
                console.error('Error updating fiscal data:', result.message);
                toast({
                    title: t('Error'),
                    // description: result.message,
                    description: t('ErrorUpdatingData'),
                    variant: 'destructive'
                })
            }
        } catch (error) {
            console.error('Error updating fiscal data:', error);
            toast({
                title: 'Error',
                description: result.message,
                variant: 'error'
            })
        }
    };

    if (error) {
        return (
            // <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            // {/* <div className="text-red-500">{t('Error')}: {error}</div> */}
            //     meeeeeh
            // </div>
            <>
                <ErrorState
                    errorType="network"
                    message={error}
                    onRetry={fetchFiscalData}
                    className="w-full max-w-md mx-auto mt-40"
                />
                {/* <NetworkErrorView
                    message={error}
                    onRetry={fetchFiscalData}
                    fullPage={true}
                /> */}
                {/* <div className="text-red-500">{t('Error')}: {error}</div> */}

            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 ">
            <header className="bg-white dark:bg-gray-800 shadow ">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-wrap  justify-between items-start">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                            {t('FiscalData')}
                        </h2>

                        <Button
                            variant="outline"
                            className={cn("text-sm h-fit fiscal-data-edit-button",
                                !userInfo?.Administrator && "hidden",
                            )}
                            onClick={
                                () => {
                                    setIsEditing(!isEditing)
                                    setCurrentStep(2);
                                }
                            }
                        >
                            {isEditing ? t('CancelEditing') : t('EditData')}
                        </Button>
                    </div>
                    <div className="flex gap-2 sm:gap-4">
                        <Button
                            onClick={startTour}
                            variant="gradientGlow"
                            className="hidden sm:flex"
                        >
                            {/* Iniciar Tour */}
                            {t('StartTour')}
                        </Button>
                        <div className="flex items-center gap-4">
                            <Dialog>
                                <DialogTrigger
                                    className='hover:bg-gray-100 dark:hover:bg-gray-600 transition rounded-md p-2 text-sm flex items-center gap-2 fiscal-data-contact-button'
                                    onClick={handleCloseTour}
                                >
                                    <ContactRound size={16} />
                                    {(t('Contacts'))}
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            {t('ContactPerson1')}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {t('ContactPerson1Description')}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                {/* <Label htmlFor="contactoNombre" className="text-gray-700 dark:text-slate-400">Nombre</Label> */}
                                                <Label htmlFor="contactoNombre" className="text-gray-700 dark:text-slate-400">
                                                    {t('Name')}
                                                </Label>
                                                <Input
                                                    id="contactoNombre"
                                                    {...register('contactoNombre')}
                                                    className={cn("border-gray-300", errors.contactoNombre && "border-red-500")}
                                                    placeholder="Juan"
                                                    disabled={!isEditing}
                                                />
                                                {errors.contactoNombre && (
                                                    <p className="text-sm text-red-500">{errors.contactoNombre.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                {/* <Label htmlFor="contactoTelefonoMovil" className="text-gray-700 dark:text-slate-400 truncate">Teléfono móvil</Label> */}
                                                <Label htmlFor="contactoTelefonoMovil" className="text-gray-700 dark:text-slate-400 truncate">
                                                    {t('MobilePhone')}
                                                </Label>
                                                <Input
                                                    id="contactoTelefonoMovil"
                                                    {...register('contactoTelefonoMovil')}
                                                    className={cn("border-gray-300", errors.contactoTelefonoMovil && "border-red-500")}
                                                    placeholder="+34655764662"
                                                    disabled={!isEditing}
                                                />
                                                {errors.contactoTelefonoMovil && (
                                                    <p className="text-sm text-red-500">{errors.contactoTelefonoMovil.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                {/* <Label htmlFor="contactoTelefonoFijo" className="text-gray-700 dark:text-slate-400">Teléfono fijo</Label> */}
                                                <Label htmlFor="contactoTelefonoFijo" className="text-gray-700 dark:text-slate-400">
                                                    {t('LandlinePhone')}
                                                </Label>
                                                <Input
                                                    id="contactoTelefonoFijo"
                                                    {...register('contactoTelefonoFijo')}
                                                    className={cn("border-gray-300", errors.contactoTelefonoFijo && "border-red-500")}
                                                    placeholder="+34937546252"
                                                    disabled={!isEditing}
                                                />
                                                {errors.contactoTelefonoFijo && (
                                                    <p className="text-sm text-red-500">{errors.contactoTelefonoFijo.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <div className="gap-2 hidden xl:flex">
                                <FileText size={18} />
                                <p className="text-sm text-gray-600 dark:text-slate-200">
                                    {t('FiscalDataMatchWarning')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {isLoading ? (
                <div className="h-96 bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
                    {/* <Loader2 className="h-8 w-8 animate-spin text-gray-500" /> */}
                    <Loader className="animate-spin h-8 w-8 text-gray-500 mx-auto mb-4" />
                    <p className="mt-4 text-gray-600">{t("loading")}</p>
                </div>
                // <>
                // </>
            ) : (
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 fiscal-data-header">
                    {!userInfo?.Administrator ? (
                        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-900">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-orange-500" />
                                    <CardTitle className="text-orange-800 dark:text-orange-400">
                                        {t('RestrictedAccess')}
                                    </CardTitle>
                                </div>
                                <CardDescription className="text-orange-700 dark:text-orange-300">
                                    {t('NoAdminPermissionsFiscal')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-4 text-orange-700 dark:text-orange-300">
                                    <Building2 className="h-5 w-5 mt-1" />
                                    <div className="space-y-2">
                                        <p>{t('FiscalDataAdminOnly')}</p>
                                        <p className="text-sm">{t('ContactSupport')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <FiscalDataForm
                            onSubmit={handleSubmit}
                            initialData={fiscalData}
                            isEditing={isEditing}
                        />
                    )}
                </main>
            )}
        </div>
    );
}