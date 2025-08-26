import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { t } from "i18next";

export function WalletTransactionList({ transactions, isLoading }) {
    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
                        {/* Pendiente */}
                        {t("Pending")}
                    </Badge>
                );
            case 'completed':
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                        {/* Completado */}
                        {t("Completed")}
                    </Badge>
                );
            case 'cancelled':
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800">
                        {/* Cancelado */}
                        {t("Cancelled")}
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline">
                        {status}
                    </Badge>
                );
        }
    };

    // Animation variants for table rows
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (isLoading) {
        return (
            <div className="py-8 text-center">
                <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Cargando transacciones...</p>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-12 text-center"
            >
                <div className="bg-muted/20 p-6 rounded-lg inline-block mb-4">
                    <PiggyBankIcon className="h-12 w-12 text-muted-foreground/60 mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                    No hay transacciones disponibles
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Cuando se realicen transacciones, aparecerán aquí.
                </p>
            </motion.div>
        );
    }

    return (
        <ScrollArea className="h-[300px]">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {/* Fecha */}
                                {t("Date")}
                            </TableHead>
                            <TableHead>
                                {/* Tipo de Aviso */}
                                {t("NoticeType")}
                            </TableHead>
                            <TableHead className='truncate'>
                                {/* Cantidad de Avisos */}
                                {t("NoticeCount")}
                            </TableHead>
                            <TableHead>
                                {/* Estado */}
                                {t("Status")}
                            </TableHead>
                            <TableHead className="text-right">
                                {/* Cantidad */}
                                {t("Amount")}
                            </TableHead>
                            {/* <TableHead className="w-[40px]"></TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction, index) => (
                            <motion.tr key={index} variants={item} className="group">
                                <TableCell className="font-medium">
                                    {new Date(transaction.Date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="max-w-[180px] truncate">
                                    {transaction.Description}
                                </TableCell>
                                <TableCell
                                    className="text-center"
                                >{transaction.NoticeCount || "N/A"}</TableCell>
                                <TableCell>{getStatusBadge(transaction.Status)}</TableCell>
                                <TableCell className="text-right font-medium">
                                    {formatCurrency(transaction.Amount)}
                                </TableCell>
                                <TableCell>
                                    {transaction.NoticeID && (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Notice ID: {transaction.NoticeID}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>
        </ScrollArea>
    );
}

// Fallback icon component when no transactions are available
function PiggyBankIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
            <path d="M2 9v1c0 1.1.9 2 2 2h1" />
            <path d="M16 11h0" />
        </svg>
    );
}