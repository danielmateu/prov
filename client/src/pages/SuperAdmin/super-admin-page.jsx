
import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Activity,
    Building2,
    ClipboardCheck,
    CreditCard,
    FileText,
    LayoutDashboard,
    Loader,
    ShieldCheck,
    Users,
    Wallet,
    CheckCircle,
    CalendarIcon,
    HandCoins
} from "lucide-react";
import StatCard from "@/components/StatCard";

import { Badge } from "@/components/ui/badge";
import CustomersTable from "@/components/tables/CustomersTable";
import NoticesTable from "@/components/tables/NoticesTables";
import PendingPaymentsTable from "@/components/tables/PendingPaymentsTable";
import { useNoticesStore } from "@/zustand/noticesStore";
import { useCustomersStore } from "@/zustand/customersStore";
import { useUserInfoStore } from "@/zustand/userInfoStore";
import { usePendingPaymentsStore } from "@/zustand/pendingPaymentsStore";

import { mockDashboardStats } from "@/mocks/data";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

import AcceptedPaymentsTable from '@/components/tables/AcceptedPaymentsTable';
import FAQSection from '@/components/footer/FAQSection';
import SuperAdminPageSkeleton from '@/components/skeletons/SuperAdminPageSkeleton';
import CustomersChart from '@/components/charts/CUstomerChart';
import NoticesChart from '@/components/charts/NoticesChart';
import RevenueChart from '@/components/charts/RevenueChart';
import ServiceTypesChart from '@/components/charts/ServiceTypesChart';
import PaymentsStatusChart from '@/components/charts/PaymentStatusChart';

export default function SuperAdminPage() {
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
    const [activeTab, setActiveTab] = useState("dashboard");
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedModule, setSelectedModule] = useState("0");
    const [serviceTypeFilter, setServiceTypeFilter] = useState('0');
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [selectedPaymentPeriod, setSelectedPaymentPeriod] = useState(null);

    const { toast } = useToast();
    const { customers, fetchCustomers, isLoading: customersLoading } = useCustomersStore();

    // console.log('Customers:', customers);
    const { notices, fetchNotices, isLoading: noticesLoading, fetchAllNotices, externalNotices, removeNotice, updateNotice } = useNoticesStore();

    // console.log('External notices:', externalNotices);
    // // Console log de cada uno de los Total de externalNotices
    // externalNotices.forEach(notice => {
    //     console.log(`Total for notice ${notice.NoticeHeaderID}:`, notice.Total);
    // });

    const { pendingPayments, fetchPendingPayments, isLoading: paymentsLoading } = usePendingPaymentsStore();

    // Añadir un identificador único a cada pago para evitar problemas de referencia
    const pendingPaymentsWithId = useMemo(() => {
        return pendingPayments.map((payment, index) => ({
            ...payment,
            id: payment.PaymentID || `payment-${index}` // Asegurarse de que cada pago tenga un ID único
        }));
    }, [pendingPayments]);

    const pendingPaymentsAmout = useMemo(() => {
        return pendingPayments.reduce((total, payment) => total + payment.Total, 0);
    }, [pendingPayments]);

    // Pagos realizados, filtramos de external notices los que tienen paid en true
    const paidNotices = useMemo(() => {
        return externalNotices.filter(notice => notice.paid === true);
    }, [externalNotices]);

    // Sumar los montos de (externalNotices.Total + externalNotices.Tax)
    const totalPaidAmount = useMemo(() => {
        // return externalNotices.reduce((total, notice) => total + (notice.Total || 0) + (notice.Tax || 0), 0);
        return externalNotices.reduce((total, notice) => total + (notice.Total || 0), 0);
    }, [externalNotices]);

    // Función para calcular trends basados en períodos de tiempo
    const calculateTrend = (currentData, historicalData, dateField = 'CreateDate') => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Datos del mes actual
        const currentMonthData = currentData.filter(item => {
            const itemDate = new Date(item[dateField]);
            return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
        });

        // Datos del mes anterior
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const lastMonthData = historicalData.filter(item => {
            const itemDate = new Date(item[dateField]);
            return itemDate.getMonth() === lastMonth && itemDate.getFullYear() === lastMonthYear;
        });

        if (lastMonthData.length === 0) {
            return null; // No hay datos históricos para comparar
        }

        const currentCount = currentMonthData.length;
        const lastCount = lastMonthData.length;

        if (lastCount === 0) {
            return { value: 100, isPositive: true }; // 100% de crecimiento si no había datos anteriores
        }

        const percentageChange = ((currentCount - lastCount) / lastCount) * 100;

        return {
            value: Math.abs(Math.round(percentageChange)),
            isPositive: percentageChange >= 0
        };
    };

    // Función para calcular trend de montos
    const calculateAmountTrend = (currentData, historicalData, amountFields = ['Total', 'Tax']) => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Calcular monto del mes actual
        const currentMonthData = currentData.filter(item => {
            const itemDate = new Date(item.CreateDate || item.createdAt);
            return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
        });

        const currentAmount = currentMonthData.reduce((total, item) => {
            return total + amountFields.reduce((sum, field) => sum + (item[field] || 0), 0);
        }, 0);

        // Calcular monto del mes anterior
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const lastMonthData = historicalData.filter(item => {
            const itemDate = new Date(item.CreateDate || item.createdAt);
            return itemDate.getMonth() === lastMonth && itemDate.getFullYear() === lastMonthYear;
        });

        const lastAmount = lastMonthData.reduce((total, item) => {
            return total + amountFields.reduce((sum, field) => sum + (item[field] || 0), 0);
        }, 0);

        if (lastAmount === 0) {
            return currentAmount > 0 ? { value: 100, isPositive: true } : null;
        }

        const percentageChange = ((currentAmount - lastAmount) / lastAmount) * 100;

        return {
            value: Math.abs(Math.round(percentageChange)),
            isPositive: percentageChange >= 0
        };
    };

    // Calcular trends dinámicos
    const customersTrend = useMemo(() => {
        return calculateTrend(customers, customers, 'createdAt');
    }, [customers]);

    const noticesTrend = useMemo(() => {
        return calculateTrend(externalNotices, externalNotices);
    }, [externalNotices]);

    const paymentsTrend = useMemo(() => {
        return calculateTrend(pendingPayments, pendingPayments, 'createdAt');
    }, [pendingPayments]);

    const invoicedTrend = useMemo(() => {
        return calculateAmountTrend(externalNotices, externalNotices);
    }, [externalNotices]);

    const { t } = useTranslation();

    useEffect(() => {
        document.title = 'Rapitecnic | ' + t('SuperAdminPanel');
    }, []);

    useEffect(() => {
        if (userInfo?.Ex_InvoicingAddressID) {
            fetchCustomers();
            fetchNotices(userInfo.Ex_InvoicingAddressID);
            fetchAllNotices();
        }
        fetchPendingPayments();
    }, [userInfo?.Ex_InvoicingAddressID]);

    const filteredNotices = useMemo(() => {
        return externalNotices.filter(notice => {
            const matchesSearch = searchQuery.toLowerCase().trim() === '' ||
                notice.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                notice.CustomerSurname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                notice.CustomerPhone?.includes(searchQuery) ||
                notice.CustomerCell?.includes(searchQuery);

            const matchesStatus = statusFilter === 'all' ||
                statusOptionsMapping.find(s =>
                    s.id.toString() === statusFilter &&
                    s.statusId.includes(notice.StatusID.toString())
                ) !== undefined;

            const normalizeDate = (date) => {
                const normalized = new Date(date);
                normalized.setHours(0, 0, 0, 0);
                return normalized;
            };

            const matchesDate = (!dateRange.from || !dateRange.to) ||
                (normalizeDate(notice.CreateDate) >= normalizeDate(dateRange.from) &&
                    normalizeDate(notice.CreateDate) <= normalizeDate(dateRange.to));

            const matchesCustomer = !selectedCustomer ||
                notice.CustomerID === selectedCustomer.CustomerID;

            const matchesModule = selectedModule === "0" ||
                (selectedModule.includes(',')
                    ? selectedModule.split(',').includes(notice.Ex_StatusID.toString())
                    : notice.Ex_StatusID.toString() === selectedModule);

            const matchesUser = userInfo?.Administrator || notice.ExternalLoginID === userInfo?.ExternalLoginID;

            const matchesServiceType = serviceTypeFilter === '0' || notice.ServiceTypeID?.toString() === serviceTypeFilter;

            return matchesSearch && matchesStatus && matchesDate && matchesCustomer &&
                matchesModule && matchesUser && matchesServiceType;
        });
    }, [notices, externalNotices, searchQuery, statusFilter, dateRange, selectedCustomer, selectedModule, userInfo, serviceTypeFilter]);

    const pendingNotices = useMemo(() => {
        return externalNotices.filter(notice => notice.StatusID !== 27 && notice.StatusID !== 38);
    }, [externalNotices]);

    const finalizedNotices = useMemo(() => {
        return externalNotices.filter(notice => notice.StatusID === 27 || notice.StatusID === 38);
    }, [externalNotices]);

    const handleDateRangeChange = (range) => {
        setDateRange({
            from: range?.from ? new Date(range.from) : undefined,
            to: range?.to ? new Date(range.to) : undefined
        });
    };

    const handleApprovePayment = (paymentId) => {
        toast({
            title: "Pago aprobado",
            description: `El pago #${paymentId} ha sido aprobado correctamente`,
            variant: "success",
        });
    };

    const handleRejectPayment = (paymentId) => {
        toast({
            title: "Pago rechazado",
            description: `El pago #${paymentId} ha sido rechazado`,
            variant: "destructive",
        });
    };

    const handleResetFilters = () => {
        setDateRange({ from: undefined, to: undefined });
        setSearchQuery('');
        setStatusFilter('all');
        setSelectedCustomer(null);
        setSelectedModule("0");
        setServiceTypeFilter('0');
    };

    const generatePaymentPeriods = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const periods = [];

        for (let i = -3; i <= 2; i++) {
            let targetMonth = currentMonth + Math.floor(i / 2);
            let targetYear = currentYear;

            while (targetMonth < 0) {
                targetMonth += 12;
                targetYear--;
            }
            while (targetMonth > 11) {
                targetMonth -= 12;
                targetYear++;
            }

            const isFirstHalf = (i % 2 === 0);

            let startDate, endDate;

            if (isFirstHalf) {
                startDate = new Date(targetYear, targetMonth, 1);
                endDate = new Date(targetYear, targetMonth, 15);
            } else {
                startDate = new Date(targetYear, targetMonth, 16);
                endDate = new Date(targetYear, targetMonth + 1, 0);
            }

            const isPast = endDate < today;
            const isCurrent = !isPast && startDate <= today && today <= endDate;

            periods.push({
                id: i,
                startDate,
                endDate,
                label: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
                status: isPast ? "completed" : isCurrent ? "current" : "upcoming"
            });
        }

        return periods;
    };

    const paymentPeriods = useMemo(() => generatePaymentPeriods(), []);

    const handleProcessPayments = () => {
        if (!selectedPaymentPeriod) {
            toast({
                title: "Error",
                description: "Por favor seleccione un período de pago",
                variant: "destructive",
            });
            return;
        }

        setProcessingPayment(true);

        setTimeout(() => {
            setProcessingPayment(false);
            setShowPaymentDialog(false);

            toast({
                title: "Pagos procesados",
                description: `Se han procesado los pagos para el período ${selectedPaymentPeriod.label}`,
                variant: "success",
            });

            setSelectedPaymentPeriod(null);
        }, 2000);
    };

    const handleDeleteNotice = async (noticeId) => {
        removeNotice(noticeId);

        if (userInfo?.Ex_InvoicingAddressID) {
            setTimeout(() => {
                fetchAllNotices();
            }, 500);
        }

        toast({
            title: "Aviso eliminado",
            description: "El aviso ha sido eliminado correctamente",
            variant: "success",
        });
    };

    const handleUpdateNotice = async (noticeId, updatedNotice) => {
        // Update the notice in the store
        updateNotice(noticeId, updatedNotice);

        // Optionally refresh the notices from the server
        if (userInfo?.Ex_InvoicingAddressID) {
            setTimeout(() => {
                fetchAllNotices();
            }, 500);
        }
    };



    const isFilterActive = dateRange.from || dateRange.to || searchQuery || statusFilter !== 'all' ||
        selectedCustomer || selectedModule !== "0" || serviceTypeFilter !== '0';

    const clearFilter = () => {
        setDateRange({ from: undefined, to: undefined });
        setSearchQuery('');
        setStatusFilter('all');
        setSelectedCustomer(null);
        setSelectedModule("0");
        setServiceTypeFilter('0');
    }
    // Si los datos de clientes o avisos están cargando, mostramos el esqueleto
    if (customersLoading || noticesLoading) {
        return <SuperAdminPageSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-start gap-2 justify-between lg:flex-row md:items-center">
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400 hidden sm:block" />
                            <h1
                                className="text-3xl font-bold text-gray-900 dark:text-white truncate"
                                onClick={handleResetFilters}
                            >
                                {t("PanelSuperAdmin")}
                            </h1>

                            {isFilterActive && (
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="mt-2 flex items-center gap-2 hover:cursor-pointer clean-filter">
                                            <Badge
                                                onClick={clearFilter}
                                                className="bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800 hover:text-white">
                                                <CalendarIcon className="w-3 h-3 mr-1" />
                                                {t('ActiveFilter')}
                                            </Badge>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {t('ClickToClearFilter')}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 items-start sm:flex-row sm:items-center space-x-2">
                            <Dialog>
                                <DialogTrigger
                                    className='border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-4 py-2 flex items-center gap-2 dialog-info'
                                >
                                    {t('StartTour')}

                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            {/* Preguntas Frecuentes */}
                                            {t("FAQ")}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {/* Aquí encontrarás respuestas a las preguntas más comunes sobre el uso de la aplicación. */}
                                            {t("FAQDesc")}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <FAQSection
                                        variant='super'
                                    />
                                </DialogContent>
                            </Dialog>

                            {/* <CalendarRange
                                date={dateRange}
                                setDate={handleDateRangeChange}
                            /> */}
                        </div>
                    </div>
                </div>
            </header >

            <main className="max-w-7xl  mx-auto py-6 sm:px-6 lg:px-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 ">
                        <TabsTrigger value="dashboard" className="items-center">
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="customers">
                            <Users className="h-4 w-4 mr-2" />
                            {t("customers")}
                        </TabsTrigger>
                        <TabsTrigger value="notices">
                            <ClipboardCheck className="h-4 w-4 mr-2" />
                            {t("notices")}
                        </TabsTrigger>
                        <TabsTrigger value="payments">
                            <Wallet className="h-4 w-4 mr-2" />
                            {t("PendingPayments")}
                        </TabsTrigger>
                        <TabsTrigger value="completed-payments">
                            <HandCoins className="h-4 w-4 mr-2" />
                            Pagos realizados
                        </TabsTrigger>
                        <TabsTrigger value="analytics">
                            <Activity className="h-4 w-4 mr-2" />
                            Analíticas
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                            <StatCard
                                title={(t("TotalCustomers"))}
                                value={customers.length}
                                // description={`${(t('active', { count: customers.length }))}, ${(t('inactive', { count: mockDashboardStats.customers.inactive }))}`}
                                // description={`${(t('active', { count: customers.length }))}, ${(t('inactive', { count: mockDashboardStats.customers.inactive }))}`}
                                icon={Building2}
                                trend={customersTrend}
                                className="bg-blue-50 dark:bg-blue-950"
                            />
                            <StatCard
                                title={(t("TotalNotices"))}
                                value={externalNotices.length}
                                description={`${pendingNotices.length} ${(t('InProcess'))}, 
                                ${finalizedNotices.length} ${(t('Finished'))}
                                `}
                                icon={Activity}
                                // trend={noticesTrend}
                                className="bg-amber-50 dark:bg-amber-950"
                            />
                            <StatCard
                                title={(t("PendingPayments"))}
                                value={pendingPayments?.length}
                                description={`${pendingPaymentsAmout.toFixed(2)}€ ${t('ToProcess')}`}
                                icon={CreditCard}
                                trend={paymentsTrend}
                                className="bg-purple-50 dark:bg-purple-950"
                            />
                            <StatCard
                                title={(t("TotalInvoiced"))}
                                value={`${totalPaidAmount.toFixed(2)}€`}
                                description={t('ThisMonth')}
                                icon={FileText}
                                trend={invoicedTrend}
                                className="bg-green-50 dark:bg-green-950"
                            />
                        </div>

                        <div className="mt-6">
                            <NoticesTable
                                // notices={filteredNotices.slice(0, 10)}
                                notices={filteredNotices.slice(0, 10)}
                                title={(t('Lastnotices'))}
                                onDeleteNotice={handleDeleteNotice}
                                userInfo={userInfo}
                                onUpdateNotice={handleUpdateNotice}
                                dateRange={dateRange}
                                handleDateRangeChange={handleDateRangeChange}
                            />
                        </div>

                        <div className="mt-6">
                            <PendingPaymentsTable
                                payments={pendingPaymentsWithId}
                                title={(t('PendingPayments'))}
                                onApprove={handleApprovePayment}
                                onReject={handleRejectPayment}
                            />
                        </div>

                        <div className="mt-6">
                            <AcceptedPaymentsTable
                                payments={paidNotices}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="customers">
                        <CustomersTable
                            customers={customers}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            dateRange={dateRange}
                        />
                    </TabsContent>

                    <TabsContent value="notices">
                        <NoticesTable
                            notices={filteredNotices}
                            title={(t('AllNotices'))}
                            all={true}
                            onDeleteNotice={handleDeleteNotice}
                            userInfo={userInfo}
                            onUpdateNotice={handleUpdateNotice}
                            dateRange={dateRange}
                            handleDateRangeChange={handleDateRangeChange}
                        />
                    </TabsContent>

                    <TabsContent value="payments">
                        <PendingPaymentsTable
                            payments={pendingPayments}
                            onApprove={handleApprovePayment}
                            onReject={handleRejectPayment}
                        />
                    </TabsContent>

                    <TabsContent value="completed-payments">
                        <AcceptedPaymentsTable
                            payments={paidNotices}
                            dateRange={dateRange}
                            handleDateRangeChange={handleDateRangeChange}
                        />
                    </TabsContent>

                    <TabsContent value="analytics">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <CustomersChart customers={customers} />
                            <NoticesChart notices={externalNotices} />
                            <RevenueChart notices={externalNotices} />
                            <ServiceTypesChart notices={externalNotices} />
                            <div className="md:col-span-2">
                                <PaymentsStatusChart
                                    notices={externalNotices}
                                    pendingPayments={pendingPayments}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Procesar Pagos Quincenales</DialogTitle>
                        <DialogDescription>
                            Seleccione el período para procesar los pagos a los proveedores de servicios.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-sm font-medium">Período de pago</label>
                            <div className="grid grid-cols-1 gap-2">
                                {paymentPeriods.map(period => (
                                    <div
                                        key={period.id}
                                        className={`p-3 border rounded-md cursor-pointer ${selectedPaymentPeriod?.id === period.id
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                                            : "border-gray-200 dark:border-gray-700"
                                            }`}
                                        onClick={() => setSelectedPaymentPeriod(period)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{period.label}</span>
                                            {selectedPaymentPeriod?.id === period.id && (
                                                <CheckCircle className="h-4 w-4 text-blue-500" />
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {period.status === "completed"
                                                ? "Período pasado"
                                                : period.status === "current"
                                                    ? "Período actual"
                                                    : "Período futuro"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleProcessPayments}
                            disabled={!selectedPaymentPeriod || processingPayment}
                        >
                            {processingPayment ? (
                                <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                "Procesar Pagos"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
}