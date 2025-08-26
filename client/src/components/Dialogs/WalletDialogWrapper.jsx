
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PiggyBankIcon } from "lucide-react";
import { WalletDialog } from "@/components/wallet";
import { usePendingPaymentsStore } from "@/zustand/pendingPaymentsStore";
import { useUserInfoStore } from "@/zustand/userInfoStore";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useNoticesStore } from "@/zustand/noticesStore";
import { t } from "i18next";

export function WalletDialogWrapper() {
    const [open, setOpen] = useState(false);
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const {
        pendingPayments,
        fetchPendingPayments,
        startPolling,
        stopPolling,
        isLoading
    } = usePendingPaymentsStore();

    const {
        notices,
        fetchNotices,
        isLoading: noticesLoading,
        error: noticesError
    } = useNoticesStore();

    // console.log('Notices:', notices);
    // console.log('User Info:', userInfo);
    // console.log('Notices Loading:', noticesLoading);
    // console.log('Notices Error:', noticesError);

    // console.log('Pending payments:', pendingPayments);
    const [userTransactions, setUserTransactions] = useState([]);

    // Initial fetch and start polling when component mounts
    useEffect(() => {
        if (userInfo?.Ex_InvoicingAddressID) {
            fetchPendingPayments();
            startSmartPolling();

            // Fetch notices for this user
            // console.log('Fetching notices for Ex_InvoicingAddressID:', userInfo.Ex_InvoicingAddressID);
            fetchNotices(userInfo.Ex_InvoicingAddressID);
        }

        // Cleanup polling on unmount
        return () => stopPolling();
    }, [userInfo?.Ex_InvoicingAddressID, fetchPendingPayments, stopPolling, fetchNotices]);

    // Force refresh when dialog opens
    useEffect(() => {
        if (userInfo?.Ex_InvoicingAddressID && open) {
            fetchPendingPayments(true);
            // Also refresh notices when dialog opens
            // console.log('Dialog opened, refreshing notices for Ex_InvoicingAddressID:', userInfo.Ex_InvoicingAddressID);
            fetchNotices(userInfo.Ex_InvoicingAddressID);
        }
    }, [open, userInfo?.Ex_InvoicingAddressID, fetchPendingPayments, fetchNotices]);

    // Transform pending payments into transactions
    useEffect(() => {
        if (userInfo?.Ex_InvoicingAddressID) {
            const filteredPayments = pendingPayments
                .filter(payment => payment.Ex_InvoicingAddressID === userInfo.Ex_InvoicingAddressID)
                .map(payment => ({
                    Ex_InvoicingAddressID: payment.Ex_InvoicingAddressID,
                    Amount: payment.Total,
                    Date: payment.Date || new Date().toISOString(),
                    Description: payment.ServiceTypeName || "Payment for service",
                    Status: payment.Status || "pending",
                    NoticeCount: payment.NoticeCount,
                    NoticeID: payment.NoticeID || `LEAD${100000 + Math.floor(Math.random() * 900000)}`,
                }));

            setUserTransactions(filteredPayments);
        }
    }, [pendingPayments, userInfo?.Ex_InvoicingAddressID]);

    const pendingCount = userTransactions.filter(tx => tx.Status.toLowerCase() === 'pending').length;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="relative inline-block">
                    <PiggyBankIcon className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                    {pendingCount > 0 && (
                        <>
                            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500/30 animate-ping" />
                            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                                <span className="text-[10px] font-medium text-white">
                                    {userTransactions.reduce((total, transaction) => total + (transaction.NoticeCount || 0), 0)}
                                </span>
                            </span>
                        </>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] max-h-[85vh] overflow-hidden flex flex-col">
                <ScrollArea className="h-[50rem] rounded-md border p-4">
                    <DialogHeader>
                        <DialogTitle className="text-xl flex items-center gap-2">
                            <PiggyBankIcon className="h-5 w-5" />
                            {/* Tu Monedero */}
                            {t("WalletDialogTitle")}
                        </DialogTitle>
                        <DialogDescription>
                            {t("WalletDialogDescription")}
                        </DialogDescription>
                    </DialogHeader>

                    <WalletDialog
                        onOpenChange={setOpen}
                        transactions={userTransactions}
                        isLoading={isLoading || noticesLoading}
                        notices={notices}
                    />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}