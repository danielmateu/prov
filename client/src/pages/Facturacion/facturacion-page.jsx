import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInfoStore } from "@/zustand/userInfoStore";
import { useNoticesStore } from "@/zustand/noticesStore";
import { AlertCircle, Building2, Clock, LucideEuro, PiggyBank, Annoyed, CalendarIcon, BookOpenCheck, FileText, Plus, AlertCircleIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import CalendarRange from "@/components/CalendarRange";
import { cn, isWithinDateRange } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import NoticesTable from "@/components/tables/NoticesTables";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { LeadInfoDialog } from "@/components/dialogs/LeadInfoDialog";
import { useTranslation } from "react-i18next";
import { useTourSteps } from "@/hooks/useTourSteps";
import { useTour } from "@reactour/tour";
// import { WalletDialogWrapper } from "@/components/dialogs/WalletDialogWrapper";
import { usePendingPaymentsStore } from "@/zustand/pendingPaymentsStore";
import { Button } from "@/components/ui/button";
import { InvoiceManager } from "@/components/invoice/InvoiceManager";

// import { InvoiceManager } from "../components/invoice/InvoiceManager";

import { Link, useHref, useLocation, useNavigate } from "react-router-dom";

export default function FacturacionPage() {
    const { t } = useTranslation();
    const userInfo = useUserInfoStore((state) => state.userInfo);
    // console.log('userInfo', userInfo);

    const { pendingPayments, fetchPendingPayments, isLoading: paymentsLoading } = usePendingPaymentsStore();

    const { notices, fetchNotices, isLoading } = useNoticesStore();
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showInvoiceManager, setShowInvoiceManager] = useState(false);

    const [userPendingPayments, setUserPendingPayments] = useState([]);

    // console.log('UserPendingPayments', userPendingPayments);

    // Filtraremos los pendingPayments por el Ex_InvoicingAddressID
    useEffect(() => {
        if (userInfo?.Ex_InvoicingAddressID) {
            const filteredPayments = pendingPayments.filter(payment => payment.Ex_InvoicingAddressID === userInfo.Ex_InvoicingAddressID);
            setUserPendingPayments(filteredPayments);
        }
    }, [pendingPayments, userInfo?.Ex_InvoicingAddressID]);

    // console.log('UserInfo', userInfo);

    // Crear perfil de usuario para el sistema de facturas
    const userProfile = useMemo(() => {
        if (!userInfo) return null;

        // console.log('UserInfo for profile:', userInfo);

        return {
            name: userInfo.Name || '',
            taxName: userInfo.TaxName || '',
            nif: userInfo.TaxIDNumber || '',
            address: userInfo.Address || '',
            city: userInfo.City || '',
            postalCode: userInfo.ZipCode || '',
            province: userInfo.Province || '',
            email: userInfo.Email || '',
            phone: userInfo.Cell || '',
            iban: userInfo.IBAN || '',
            isAutonomo: userInfo.Business, // Asumimos que son autónomos
            irpfRate: 15 // Valor por defecto para actividades profesionales
        };
    }, [userInfo]);

    const bonusTable = [
        {
            type: t('RepairLeads'),
            volumeMonthly: '<100',
            compensation: '10€',
            volume: '>100',
            value: '15€'
        },
        {
            type: t('InstallationLeads'),
            volumeMonthly: '<100',
            compensation: '15€',
            volume: '>100',
            value: '20€'
        },
        {
            type: t('ClimateMaintenanceLeads'),
            volumeMonthly: '<100',
            compensation: '15€',
            volume: '>100',
            value: '20€'
        }
    ];

    const getStatusIds = (status) => {
        switch (status) {
            case 'inProcess':
                return [1];
            case 'accumulated':
                return [3, 4];
            case 'billed':
                return [5];
            case 'cancelled':
                return [2];
            default:
                return [];
        }
    };

    const steps = useTourSteps();
    const { isOpen, currentStep, setIsOpen, setCurrentStep, setSteps } = useTour()

    useEffect(() => {
        if (isOpen) {
            setSteps(steps);
        }
        setCurrentStep(0);
        document.title = 'Rapitecnic | ' + t('FacturationPage');
    }, []);

    useEffect(() => {
        if (userInfo?.Ex_InvoicingAddressID) {
            fetchNotices(userInfo.Ex_InvoicingAddressID);
            fetchPendingPayments();
        }
    }, [userInfo?.Ex_InvoicingAddressID, fetchNotices, fetchPendingPayments]);

    const filteredNotices = useMemo(() => {
        let filtered = notices;

        if (dateRange.from || dateRange.to) {
            filtered = filtered.filter(notice =>
                isWithinDateRange(new Date(notice.CreateDate), dateRange)
            );
        }

        if (selectedStatus) {
            const statusIds = getStatusIds(selectedStatus);

            if (selectedStatus === 'accumulated') {
                filtered = filtered.filter(notice =>
                    notice.Ex_StatusID === 3 ||
                    notice.Ex_StatusID === 4 ||
                    (notice.Ex_StatusID === 5 && notice.paid === false)
                );
            } else if (selectedStatus === 'billed') {
                filtered = filtered.filter(notice =>
                    notice.Ex_StatusID === 5 && notice.paid === true
                );
            } else {
                filtered = filtered.filter(notice =>
                    statusIds.includes(notice.Ex_StatusID)
                );
            }
        }

        return filtered;
    }, [notices, dateRange, selectedStatus]);

    const calculateBillingStats = (noticesToProcess) => {
        const stats = {
            accumulated: { count: 0, value: 0, percentage: 0 },
            billed: { count: 0, value: 0, percentage: 0 },
            inProcess: { count: 0, value: 0, percentage: 0 },
            cancelled: { count: 0, value: 0, percentage: 0 }
        };

        noticesToProcess.forEach(notice => {
            const baseValue = notice.ServiceTypeID === 1 ? 10 :
                notice.ServiceTypeID === 4 ? 15 :
                    notice.ServiceTypeID === 3 ? 15 : 10;

            if (notice.Ex_StatusID === 3 || notice.Ex_StatusID === 4 || (notice.Ex_StatusID === 5 && notice.paid === false)) {
                stats.accumulated.count++;
                stats.accumulated.value += baseValue;
            }

            if (notice.Ex_StatusID === 5 && notice.paid === true) {
                stats.billed.count++;
                stats.billed.value += baseValue;
            }

            if (notice.Ex_StatusID === 1) {
                stats.inProcess.count++;
                stats.inProcess.value += baseValue;
            }

            if (notice.Ex_StatusID === 2) {
                stats.cancelled.count++;
                stats.cancelled.value += 0;
            }
        });

        const totalNotices = noticesToProcess.length;
        if (totalNotices > 0) {
            stats.accumulated.percentage = (stats.accumulated.count / totalNotices) * 100;
            stats.billed.percentage = (stats.billed.count / totalNotices) * 100;
            stats.inProcess.percentage = (stats.inProcess.count / totalNotices) * 100;
            stats.cancelled.percentage = (stats.cancelled.count / totalNotices) * 100;
        }

        return stats;
    };

    const billingStats = useMemo(() => calculateBillingStats(notices), [notices]);

    const handleDateRangeChange = (range) => {
        setDateRange({
            from: range?.from ? new Date(range.from) : undefined,
            to: range?.to ? new Date(range.to) : undefined
        });
    };

    const handleCardClick = (status) => {
        // console.log('Card clicked:', status);
        setSelectedStatus(status);
        setDialogOpen(true);
        handleCloseTour();
    };

    const statusFilteredNotices = useMemo(() => {
        if (!selectedStatus) return [];

        if (selectedStatus === 'accumulated') {
            return notices.filter(notice =>
                notice.Ex_StatusID === 3 ||
                notice.Ex_StatusID === 4 ||
                (notice.Ex_StatusID === 5 && notice.paid === false)
            );
        } else if (selectedStatus === 'billed') {
            return notices.filter(notice =>
                notice.Ex_StatusID === 5 && notice.paid === true
            );
        } else {
            const statusIds = getStatusIds(selectedStatus);
            return notices.filter(notice => statusIds.includes(notice.Ex_StatusID));
        }
    }, [selectedStatus, notices]);

    const isFilterActive = !!dateRange.from || !!dateRange.to || !!selectedStatus;

    const getCardStyles = (status) => {
        const baseStyles = "transition-all duration-300 hover:shadow-lg";

        switch (status) {
            case 'inProcess':
                return `${baseStyles} in-process-card`;
            case 'accumulated':
                return `${baseStyles} border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-900 accumulated-card`;
            case 'billed':
                return `${baseStyles} border-sky-200 bg-sky-50 dark:bg-sky-950 dark:border-sky-900`;
            case 'cancelled':
                return `${baseStyles} border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-900`;
            default:
                return baseStyles;
        }
    };

    const clearFilter = () => {
        setDateRange({ from: undefined, to: undefined });
        setSelectedStatus(null);
        handleCloseTour();
    }

    const startTour = () => {
        setCurrentStep(0);
        setSteps(steps);
        setIsOpen(true);
    };

    const handleCloseTour = () => {
        setIsOpen(false);
        setCurrentStep(0);
    }

    const handleGenerateInvoice = () => {
        setShowInvoiceManager(true);
        handleCloseTour();
    };

    const hasInvoiceForPendingPayments = useMemo(() => {
        if (userPendingPayments.length === 0) return false;

        // Obtener facturas del localStorage
        const savedInvoices = localStorage.getItem('invoices');
        if (!savedInvoices) return false;

        try {
            const invoices = JSON.parse(savedInvoices);

            // Verificar si existe alguna factura que contenga los servicios pendientes
            return invoices.some(invoice => {
                // Verificar si la factura es del mismo usuario
                if (invoice.issuer.nif !== userProfile?.nif) return false;

                // Verificar si algún item de la factura coincide con los pagos pendientes
                return invoice.items.some(item => {
                    return userPendingPayments.some(payment => {
                        // Comparar por tipo de servicio y cantidad
                        const serviceMatches = item.serviceType === payment.ServiceTypeName;
                        const amountMatches = Math.abs(item.total - payment.TotalAmount) < 0.01; // Tolerancia para decimales

                        return serviceMatches && amountMatches;
                    });
                });
            });
        } catch (error) {
            console.error('Error parsing invoices from localStorage:', error);
            return false;
        }
    }, [userPendingPayments, userProfile?.nif]);

    // Determinar si mostrar la alerta de servicios pendientes
    const shouldShowPendingAlert = useMemo(() => {
        return userPendingPayments.length > 0 && !hasInvoiceForPendingPayments;
    }, [userPendingPayments.length, hasInvoiceForPendingPayments]);

    const totalPendingAmount = useMemo(() => {
        return userPendingPayments.reduce((sum, payment) => sum + payment.Total, 0).toFixed(2);
    }, [userPendingPayments]);

    // Si estamos mostrando el gestor de facturas
    if (showInvoiceManager) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {t('InvoiceGeneration')}
                                    {/* Facturación - Generador de Facturas */}
                                </h1>
                                {/* <p className="text-sm text-gray-600 dark:text-gray-400">
                                    
                                    Genera facturas para tus servicios pendientes.
                                </p> */}
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setShowInvoiceManager(false)}
                        >
                            {t('BackToBilling')}
                            {/* Volver a Facturación */}
                        </Button>

                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <InvoiceManager
                        userProfile={userProfile}
                        pendingPayments={userPendingPayments}
                        shouldShowPendingAlert={shouldShowPendingAlert}
                    />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex gap-4">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('Billing')}
                        </h1>
                        {isFilterActive && (
                            <div className="mt-2 flex items-center gap-2 hover:cursor-pointer clean-filter">
                                <Badge
                                    onClick={clearFilter}
                                    className="bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800 hover:text-white">
                                    <CalendarIcon className="w-3 h-3 mr-1" />
                                    {t('ActiveFilter')}
                                </Badge>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={startTour}
                            variant="gradientGlow"
                            className="hidden sm:flex"
                        >
                            {t('StartTour')}
                        </Button>
                        <div className="flex items-center justify-center calendar-filter">
                            <CalendarRange
                                date={dateRange}
                                setDate={handleDateRangeChange}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-4 facturacion-header">
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
                                {t('NoAdminPermissions')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start gap-4 text-orange-700 dark:text-orange-300">
                                <Building2 className="h-5 w-5 mt-1" />
                                <div className="space-y-2">
                                    <p>{t('BillingDataAdminOnly')}</p>
                                    <p className="text-sm">{t('ContactSupport')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Alerta de servicios pendientes con botón de facturación */}
                        {userPendingPayments.length > 0 && (
                            // {shouldShowPendingAlert && (
                            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-900">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                            <CardTitle className="text-blue-800 dark:text-blue-400">
                                                {t('ReadyToInvoice')}
                                                {/* Listo para Facturar */}
                                            </CardTitle>
                                        </div>
                                        <Badge variant="outline" className="text-blue-700 border-blue-300">
                                            {/* {userPendingPayments.length}  */}
                                            {t('services', { count: userPendingPayments.length })}
                                            {/* {userPendingPayments.length} servicios */}
                                            <span className="ml-1">
                                                ({(totalPendingAmount)}€)</span>
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-blue-700 dark:text-blue-300">
                                        {/* {t('YouHaveServicesReadyToInvoice', {
                                            count: userPendingPayments.length,
                                            amount: userPendingPayments.reduce((sum, payment) => sum + payment.TotalAmount, 0).toFixed(2)
                                        })} */}
                                        {/* Tienes {userPendingPayments.length} servicios listos para facturar, con un importe total de {userPendingPayments.reduce((sum, payment) => sum + payment.TotalAmount, 0).toFixed(2)}€. */}
                                        {/* Tienes {userPendingPayments.length} servicios listos para facturar, con un importe total de {totalPendingAmount} €. */}
                                        {t('YouHaveServicesReadyToInvoice', {
                                            count: userPendingPayments.length,
                                            // amount: totalPendingAmount
                                        })} {totalPendingAmount}€

                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            onClick={handleGenerateInvoice}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <FileText className="mr-2 h-4 w-4" />
                                            {/* {t('GenerateInvoice')} */}
                                            Generar Factura
                                        </Button>
                                        {/* <Button
                                            variant="outline"
                                            onClick={() => handleCardClick('accumulated')}
                                        >
                                            {t('ViewDetails')}
                                        </Button> */}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 cards-filter">
                            <Card
                                className={getCardStyles('inProcess')}
                            // onClick={() => handleCardClick('inProcess')}
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {t('LeadsInProcess')}
                                    </CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {billingStats.inProcess.count} {t('Leads', { count: billingStats.inProcess.count })}
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-muted-foreground"></p>
                                        <Badge variant="outline" className="ml-2">
                                            {billingStats.inProcess.percentage.toFixed(1)}%
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card
                                className={getCardStyles('accumulated')}
                                onClick={() => {
                                    // handleCardClick('accumulated')
                                    setCurrentStep(4)
                                }}
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {t('AccumulatedLeads')}
                                    </CardTitle>
                                    <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {billingStats.accumulated.count} {t('Leads', { count: billingStats.accumulated.count })}
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-muted-foreground">
                                            {t('Value')}: {billingStats.accumulated.value}€
                                        </p>
                                        <Badge variant="outline" className="ml-2">
                                            {billingStats.accumulated.percentage.toFixed(1)}%
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card
                                className={getCardStyles('billed')}
                            // onClick={() => handleCardClick('billed')}
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {t('BilledLeads')}
                                    </CardTitle>
                                    <LucideEuro className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {billingStats.billed.count} {t('Leads', { count: billingStats.billed.count })}
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-muted-foreground">
                                            {t('Value')}: {billingStats.billed.value}€
                                        </p>
                                        <Badge variant="outline" className="ml-2">
                                            {billingStats.billed.percentage.toFixed(1)}%
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card
                                className={getCardStyles('cancelled')}
                            // onClick={() => handleCardClick('cancelled')}
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {t('CancelledLeads')}
                                    </CardTitle>
                                    <Annoyed className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {billingStats.cancelled.count} {t('Leads', { count: billingStats.cancelled.count })}
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-muted-foreground"></p>
                                        <Badge variant="outline" className="ml-2">
                                            {billingStats.cancelled.percentage.toFixed(1)}%
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key="filtered-table"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", duration: 0.5 }}
                            >
                                {
                                    // Si no hay avisos
                                    !notices || notices.length === 0 ? (
                                        // <div className="bg-red-500 text-white p-4 rounded-lg flex justify-between">
                                        //     <p className="font-medium">No hay avisos disponibles en este momento.</p>
                                        //     {/* Redirigir a Solicitud de Asisitencia */}
                                        //     <Link
                                        //         to="/asistencia" className="underline">
                                        //         Solicitud de Asistencia
                                        //     </Link>
                                        // </div>
                                        <div className="border border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-6 rounded-lg shadow-sm">
                                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800/30">
                                                        <AlertCircleIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-amber-800 dark:text-amber-300">{t('NoNoticesAvailable')}</p>
                                                        <p className="text-sm text-amber-700/80 dark:text-amber-400/80 mt-1">
                                                            {t('CreateNewServiceRequest')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link
                                                    to="/asistencia"
                                                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-200 hover:bg-amber-300 dark:bg-amber-700 dark:hover:bg-amber-600 text-amber-800 dark:text-amber-100 transition-colors font-medium"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    {t('RequestAssistance')}
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <NoticesTable
                                            notices={filteredNotices}
                                            title={t('NoticesDateRange', {
                                                from: dateRange.from ? dateRange.from.toLocaleDateString() : '',
                                                to: dateRange.to ? dateRange.to.toLocaleDateString() : ''
                                            })}
                                            userInfo={userInfo}
                                        />
                                    )}
                            </motion.div>
                        </AnimatePresence>

                        <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4")}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('CollaboratorBonuses')}</CardTitle>
                                    <CardDescription
                                        className="text-md text-muted-foreground"
                                    >
                                        {t('BonusTableDescription')}
                                    </CardDescription>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        {t('BonusTableDescriptionDescription')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>{t('PriceTable')}</TableHead>
                                                    <TableHead>{t('Volume')}</TableHead>
                                                    <TableHead>{t('Value')}</TableHead>
                                                    <TableHead>{t('Volume')}</TableHead>
                                                    <TableHead>{t('Value')}</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {bonusTable.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{row.type}</TableCell>
                                                        <TableCell>{row.volumeMonthly}</TableCell>
                                                        <TableCell>{row.compensation}</TableCell>
                                                        <TableCell>{row.volume}</TableCell>
                                                        <TableCell>{row.value}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('BillingProcess')}</CardTitle>
                                    <CardDescription>
                                        {t('BillingProcessDescription')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {t('LeadsBilling')}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('BillingDates')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {t('AutomaticInvoiceGeneration')}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('GeneratedAfterBilling')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {t('TransferIssuance')}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('ProcessedAfterBilling')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {t('InvoiceGeneration')}
                                                    {/* Generación de Facturas */}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('GenerateYourOwnInvoices')}
                                                    {/* Genera tus propias facturas para los servicios pendientes. */}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={handleGenerateInvoice}
                                                size="sm"
                                                variant="outline"
                                            // disabled={!userPendingPayments.length}
                                            >
                                                <FileText className="h-4 w-4 mr-2" />
                                                {/* {t('Generate')} */}
                                                {/* Ver Facturas */}
                                                {t('ViewInvoices')}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <LeadInfoDialog
                            isOpen={dialogOpen}
                            onOpenChange={setDialogOpen}
                            notices={statusFilteredNotices}
                            status={selectedStatus}
                        />
                    </>
                )}
            </main>
        </div>
    );
}