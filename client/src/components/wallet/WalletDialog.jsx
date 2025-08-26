
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCent, ChevronRight, Download, ListFilter, ReceiptText, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletSummary } from "./WalletSummary";
import { WalletTransactionList } from "./WalletTransactionList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";


export function WalletDialog({ transactions, isLoading, onOpenChange, notices }) {

    // Filtrar los avisos que tienen paid = false
    const unpaidNotices = useMemo(() => {
        if (!notices || !Array.isArray(notices)) {
            // console.log('Notices is not an array or is null/undefined');
            return [];
        }

        const filtered = notices.filter(notice => {
            const isPaid = notice.paid;
            // console.log(`Notice ${notice.NoticeHeaderID}: paid=${isPaid} (${typeof isPaid})`);
            return !isPaid;
        });

        // console.log('Filtered unpaid notices:', filtered.length);
        // console.log('Unpaid notices details:', filtered);

        return filtered;
    }, [notices]);

    // console.log('Final unpaid notices count:', unpaidNotices.length);
    // console.log('=== END DEBUG ===');

    const navigate = useNavigate();

    // console.log('Transactions:', transactions);
    const [filter, setFilter] = useState("all");
    const [view, setView] = useState("summary");

    // Calculate summary data
    const summaryData = useMemo(() => {
        if (!transactions.length) {
            return {
                balance: 0,
                transactionCount: 0,
                oldestDate: null,
                newestDate: null
            };
        }

        // Calculate total pending balance
        const balance = transactions.reduce((sum, tx) =>
            tx.Status.toLowerCase() === "pending" ? sum + tx.Amount : sum, 0);

        // Find date range
        const dates = transactions.map(tx => new Date(tx.Date));
        const oldestDate = new Date(Math.min(...dates.map(d => d.getTime())));
        const newestDate = new Date(Math.max(...dates.map(d => d.getTime())));

        return {
            balance,
            transactionCount: transactions.length,
            oldestDate,
            newestDate
        };
    }, [transactions]);

    // Filter transactions based on selected filter
    const filteredTransactions = useMemo(() => {
        if (filter === "all") return transactions;

        return transactions.filter(tx =>
            tx.Status.toLowerCase() === filter.toLowerCase()
        );
    }, [transactions, filter]);

    // Get distribution by service type for the chart
    const serviceTypeDistribution = useMemo(() => {
        const distribution = {};

        transactions.forEach(tx => {
            const type = tx.Description || "";
            distribution[type] = (distribution[type] || 0) + 1;
        });

        return Object.entries(distribution).map(([name, value]) => ({ name, value }));
    }, [transactions]);

    const handleRouteToFacturation = () => {
        navigate("/facturacion");
        onOpenChange(false);
    };

    // console.log('Service Type Distribution:', serviceTypeDistribution);

    return (
        <div className="flex flex-col h-full">
            <Tabs defaultValue="overview" className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <TabsList>
                        <TabsTrigger value="overview"
                            onClick={() => setView("summary")}
                        >
                            Vista General
                        </TabsTrigger>
                        <TabsTrigger value="transactions"
                            onClick={() => setView("transactions")}
                        >
                            {/* Transacciones */}
                            {t("Transactions")}
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">

                        <Button
                            onClick={() => {
                                handleRouteToFacturation();
                            }}
                            variant="outline" size="sm" className="flex gap-1 h-8">
                            <ReceiptText className="h-3.5 w-3.5" />
                            Generar Factura
                        </Button>
                        {/* <Button variant="outline" size="sm" className="flex gap-1 h-8">
                            <Download className="h-3.5 w-3.5" />
                            Exportar
                        </Button> */}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TabsContent value="overview" className="mt-0 ">
                            <WalletSummary
                                balance={summaryData.balance}
                                transactionCount={summaryData.transactionCount}
                                oldestDate={summaryData.oldestDate}
                                newestDate={summaryData.newestDate}
                                unpaidNotices={unpaidNotices}

                            />
                        </TabsContent>

                        <TabsContent value="transactions" className="mt-0">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-1">
                                    {/* Historial de Transacciones */}
                                    {t("TransactionHistory")}
                                </h2>
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground text-sm">
                                        Viendo {filteredTransactions.length} transaccion{filteredTransactions.length !== 1 ? 'es' : ''}

                                    </p>
                                </div>
                            </div>

                            <WalletTransactionList
                                transactions={filteredTransactions}
                                isLoading={isLoading}
                            />
                        </TabsContent>
                    </motion.div>
                </AnimatePresence>
            </Tabs>

            <div className="mt-auto pt-6 text-center border-t border-border text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-1">
                    <Wallet className="h-3.5 w-3.5" />
                    <span>
                        {/* Última actualización de la billetera: */}
                        {t("LastWalletUpdate")}:
                        {new Date().toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}