import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, TrendingUp, Calendar, AlertCircle, HandCoins, User, MapPin, Phone, Mail, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { t } from "i18next";

export function WalletSummary({
    balance,
    transactionCount,
    oldestDate,
    newestDate,
    unpaidNotices
}) {
    const [displayBalance, setDisplayBalance] = useState(0);
    // console.log('Unpaid Notices in WalletSummary:', unpaidNotices);

    // console.log('NewestDaye:', newestDate);

    // Animated counting effect for balance
    useEffect(() => {
        let startValue = 0;
        const duration = 1500; // ms
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentValue = Math.floor(balance * progress);

            setDisplayBalance(currentValue);

            if (frame === totalFrames) {
                clearInterval(counter);
                setDisplayBalance(balance); // Ensure the final value is exact
            }
        }, frameDuration);

        return () => clearInterval(counter);
    }, [balance]);

    const formatDateRange = () => {
        if (!oldestDate || !newestDate) return "Sin transacciones";

        const oldestFormatted = oldestDate.toLocaleDateString();
        const newestFormatted = newestDate.toLocaleDateString();

        if (oldestFormatted === newestFormatted) {
            return oldestFormatted;
        }

        return `${oldestFormatted} - ${newestFormatted}`;
    };

    const getMonthName = (monthNumber) => {
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return months[monthNumber - 1] || "";
    };

    return (
        <div className="space-y-6">
            {/* Balance and Transaction Stats */}
            <div className="grid grid-cols-1 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 shadow-md">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                    {/* Balance Total */}
                                    {t("WalletSummaryBalanceTitle")}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <DataRefreshIndicator showRefreshButton={false} />
                                    <HandCoins className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-900 dark:text-blue-50 mb-2">
                                {formatCurrency(displayBalance)}
                            </div>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                                {/* {transactionCount} Transacciones pendientes */}
                                {t("pending", { count: transactionCount })}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>


                {unpaidNotices && unpaidNotices.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className="border-red-200 dark:border-red-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-400">
                                    <AlertCircle className="h-5 w-5" />
                                    {/* Avisos Pendientes de Pago */}
                                    {t("WalletSummaryUnpaidNoticesTitle")}
                                    <Badge variant="destructive" className="ml-auto">
                                        {unpaidNotices.length}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {unpaidNotices.map((notice, index) => (
                                    <motion.div
                                        key={notice.DocEntry}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800"
                                    >
                                        {/* Header with apparatus and status */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <Wrench className="h-4 w-4 text-red-600 dark:text-red-400" />
                                                <div>
                                                    <div className="font-semibold text-red-800 dark:text-red-300">
                                                        {notice.ApparatusName} - {notice.BrandName}
                                                    </div>
                                                    <div className="text-xs text-red-600 dark:text-red-400">
                                                        ID: {notice.DocEntry} • {new Date(notice.CreateDate).toLocaleDateString('es-ES')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700">
                                                    {notice.StatusName}
                                                </Badge>
                                                {notice.GroupName && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        {notice.GroupName}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Customer Information */}
                                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-md p-3 mb-3">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-gray-500" />
                                                    <div>
                                                        <span className="font-medium">{notice.CustomerName} {notice.CustomerSurname}</span>
                                                        {notice.CustomerTaxName && (
                                                            <div className="text-xs text-gray-500">{notice.CustomerTaxName}</div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                                    <div className="text-xs">
                                                        <div>{notice.CustomerAddress}</div>
                                                        {notice.CustomerAddressNext && (
                                                            <div>{notice.CustomerAddressNext}</div>
                                                        )}
                                                        <div>{notice.CustomerZipCode} {notice.CustomerCity}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-gray-500" />
                                                    <div className="text-xs">
                                                        <div>{notice.CustomerPhone}</div>
                                                        {notice.CustomerCell && notice.CustomerCell !== notice.CustomerPhone && (
                                                            <div>{notice.CustomerCell}</div>
                                                        )}
                                                    </div>
                                                </div>

                                                {notice.CustomerEmail && (
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-gray-500" />
                                                        <div className="text-xs break-all">{notice.CustomerEmail}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Observations */}
                                        {(notice.Observation || notice.TechnicalObservation) && (
                                            <div className="space-y-2">
                                                <Separator />
                                                {notice.Observation && (
                                                    <div className="text-sm">
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                                            {t("WalletSummaryObservationTitle") /* Observaciones */}
                                                        </span>
                                                        <p className="text-gray-600 dark:text-gray-400 mt-1">{notice.Observation}</p>
                                                    </div>
                                                )}
                                                {notice.TechnicalObservation && (
                                                    <div className="text-sm">
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">Observaciones técnicas:</span>
                                                        <p className="text-gray-600 dark:text-gray-400 mt-1">{notice.TechnicalObservation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="border-blue-100 dark:border-blue-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    {/* Periodo de transacciones */}
                                    {t("WalletSummaryTransactionPeriodTitle")}
                                </h3>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </div>
                            {/* <p className="text-base font-medium mt-2">{formatDateRange()}</p> */}
                            {/* Primera o segunda quincena del mes en curso */}
                            <p className="text-base font-medium mt-2">
                                {
                                    newestDate && oldestDate
                                        ? `
                                        ${oldestDate.getDate() <= 15 ? "1ª Quincena" : "2ª Quincena"} de
                                        ${getMonthName(newestDate.getMonth() + 1)} ${newestDate.getFullYear()} 
                                        `

                                        : "Sin transacciones"
                                }
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="border-blue-100 dark:border-blue-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    {/* Estado */}
                                    {t("WalletSummaryStatusTitle")}
                                </h3>
                                {balance > 0 ? (
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                    <AlertCircle className="h-4 w-4 text-amber-500" />
                                )}
                            </div>
                            <p className="text-base font-medium mt-2">
                                {/* {balance > 0 ? "Listo para recibir" : "Sin pagos pendientes"} */}
                                {balance > 0 ? `${t("ReadyToReceive")}` : `${t("NoPendingPayments")}`}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Unpaid Notices Section */}

            {/* Empty state for unpaid notices */}
            {(!unpaidNotices || unpaidNotices.length === 0) && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card className="border-green-200 dark:border-green-800">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                                <TrendingUp className="h-5 w-5" />
                                <span className="font-medium">
                                    {/* No hay avisos pendientes */}
                                    {t("WalletSummaryNoUnpaidNotices")}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}