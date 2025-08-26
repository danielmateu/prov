
// import React, { useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { formatCurrency } from "@/lib/utils";
// import { Check, X, AlertCircle, MoreHorizontal, WalletCards, Loader, XCircle, CheckCircle, User, CreditCard, Calendar, AlertTriangle, Loader2 } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import { useToast } from "@/hooks/use-toast";
// import { usePendingPaymentsStore } from "@/zustand/pendingPaymentsStore";
// import { useNoticesStore } from "@/zustand/noticesStore";

// export default function PendingPaymentsTable({
//     payments,
//     title = "Pagos Pendientes",
//     onApprove,
//     onReject
// }) {

//     // console.log('Payments:', payments);

//     const { externalNotices } = useNoticesStore();

//     console.log('External Notices:', externalNotices);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedPayment, setSelectedPayment] = useState(null);
//     const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
//     const [paymentDetails, setPaymentDetails] = useState([]);
//     const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//     const [processingAction, setProcessingAction] = useState(false);
//     const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//     const [actionType, setActionType] = useState(null);

//     // console.log('Selected Payment:', selectedPayment);
//     // console.log('Payment Details:', paymentDetails);

//     const { toast } = useToast();
//     const apiURL = import.meta.env.VITE_API_URL;
//     const { fetchPendingPayments } = usePendingPaymentsStore();

//     // console.log('Payments:', payments);

//     // Añadir un id único a cada pago si no existe
//     const paymentsWithId = payments.map((payment, index) => ({
//         ...payment,
//         id: payment.id || `payment-${index}`, // Usar un id existente o generar uno nuevo
//     }));


//     const filteredPayments = paymentsWithId.filter(payment => {
//         const searchFields = [
//             payment.TaxName,
//             payment.servicePeriod,
//             payment.paymentMethod,
//             payment.Ex_InvoicingAddressID.toString(),
//         ].map(field => (field || "").toLowerCase());

//         return searchFields.some(field => field.includes(searchTerm.toLowerCase()));
//     });

//     // console.log('Filtered Payments:', filteredPayments);

//     const getStatusBadge = (status) => {
//         switch (status) {
//             case 'pending':
//                 return <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:border-amber-800 dark:text-amber-300">Pendiente</Badge>;
//             case 'processed':
//                 return <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:border-green-800 dark:text-green-300">Procesado</Badge>;
//             case 'rejected':
//                 return <Badge className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:border-red-800 dark:text-red-300">Rechazado</Badge>;
//             default:
//                 return <Badge>Pendiente</Badge>;
//         }
//     };

//     const getMonthName = (monthNumber) => {
//         const months = [
//             "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
//             "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
//         ];
//         return months[monthNumber - 1] || "";
//     };

//     const handleConfirmAction = async () => {
//         setProcessingAction(true);
//         try {
//             // Obtener el monto total para el pago seleccionado
//             const totalAmount = getTotalPendingAmount(
//                 selectedPayment.Ex_InvoicingAddressID,
//                 selectedPayment.MES,
//                 selectedPayment.QUINCENA
//             );

//             const endpoint = actionType === 'approve' ? 'approvePendingPayment' : 'rejectPendingPayment';

//             const response = await fetch(`${apiURL}/paymentController/${endpoint}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     invoicingAddressId: selectedPayment.Ex_InvoicingAddressID,
//                     month: selectedPayment.MES,
//                     quincena: selectedPayment.QUINCENA,
//                     serviceTypeId: selectedPayment.ServiceTypeID,
//                     totalAmount: totalAmount // Incluir el monto total en la solicitud
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Error procesando el pago');
//             }

//             toast({
//                 title: actionType === 'approve' ? "Pago confirmado" : "Pago rechazado",
//                 description: `El pago de ${formatCurrency(totalAmount)} ha sido ${actionType === 'approve' ? 'confirmado' : 'rechazado'} correctamente`,
//                 variant: actionType === 'approve' ? "success" : "destructive",
//             });

//             // Actualizar la lista de pagos
//             if (actionType === 'approve') {
//                 onApprove && onApprove(selectedPayment.Ex_InvoicingAddressID);
//             } else {
//                 onReject && onReject(selectedPayment.Ex_InvoicingAddressID);
//             }

//             // Refrescar la lista de pagos pendientes
//             await fetchPendingPayments();

//         } catch (error) {
//             console.error('Error:', error);
//             toast({
//                 title: "Error",
//                 description: `No se pudo ${actionType === 'approve' ? 'confirmar' : 'rechazar'} el pago`,
//                 variant: "destructive",
//             });
//         } finally {
//             setProcessingAction(false);
//             setConfirmDialogOpen(false);
//             setSelectedPayment(null);
//             setActionType(null);
//         }
//     };

//     const handleActionClick = (payment, type) => {
//         setSelectedPayment(payment);
//         setActionType(type);
//         setConfirmDialogOpen(true);
//     };

//     const handleRowClick = async (payment) => {
//         setSelectedPayment(payment);
//         setIsLoadingDetails(true);
//         setDetailsDialogOpen(true);

//         try {
//             const response = await fetch(`${apiURL}/noticeController/getPendingPaymentDetails?invoicingAddressId=${payment.Ex_InvoicingAddressID}&month=${payment.MES}&quincena=${payment.QUINCENA}&serviceType=${payment.ServiceTypeID}`);

//             if (!response.ok) {
//                 throw new Error('Error fetching payment details');
//             }

//             const data = await response.json();

//             console.log('Payment Details:', data);

//             if (data.success && data.data) {
//                 setPaymentDetails(data.data.map(item => ({
//                     id: `${item.Docentry}`,               // Cambiado de NUM_SERVICIO a Docentry
//                     noticeId: `${item.Docentry}`,         // Cambiado de NUM_SERVICIO a Docentry
//                     customerName: item.TaxName,
//                     serviceType: item.ServiceTypeName,
//                     month: getMonthName(item.MES),
//                     servicePeriod: item.QUINCENA ? `${item.QUINCENA}ª Quincena` : "N/A",
//                     amount: item.Total,
//                     status: "Pendiente",
//                 })));
//             } else {
//                 setPaymentDetails([]);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             toast({
//                 title: "Error",
//                 description: "No se pudieron cargar los detalles del pago",
//                 variant: "destructive",
//             });
//             setPaymentDetails([]);
//         } finally {
//             setIsLoadingDetails(false);
//         }
//     };

//     // const getTotalPendingAmount = (invoicingAddressId) => {
//     //     return payments
//     //         .filter(payment => payment.Ex_InvoicingAddressID === invoicingAddressId)
//     //         .reduce((total, payment) => total + parseFloat(payment.Total || 0), 0);
//     // };

//     const getTotalPendingAmount = (invoicingAddressId, month, quincena) => {
//         return payments
//             .filter(payment =>
//                 payment.Ex_InvoicingAddressID === invoicingAddressId &&
//                 payment.MES === month &&
//                 payment.QUINCENA === quincena
//             )
//             .reduce((total, payment) => total + parseFloat(payment.Total || 0), 0);
//     };

//     const isApproval = actionType === "approve"

//     return (
//         <>
//             <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-xl font-bold">{title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="overflow-x-auto">
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Cliente</TableHead>
//                                     <TableHead>Tipo de Servicio</TableHead>
//                                     <TableHead>Avisos</TableHead>
//                                     <TableHead>Mes</TableHead>
//                                     <TableHead>Periodo</TableHead>
//                                     <TableHead>Importe</TableHead>
//                                     <TableHead>Estado</TableHead>
//                                     <TableHead className="text-right">Acciones</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {filteredPayments.length === 0 ? (
//                                     <TableRow>
//                                         <TableCell colSpan={8} className="text-center py-6 text-gray-500">
//                                             <div className="flex flex-col items-center justify-center p-4">
//                                                 <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
//                                                 <p>{payments.length === 0 ? "No hay pagos pendientes" : "No se encontraron pagos que coincidan con la búsqueda"}</p>
//                                             </div>
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : (
//                                     filteredPayments.map((payment) => (
//                                         <TableRow key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
//                                             <TableCell>
//                                                 <div className="font-medium">{payment.TaxName}</div>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <div className="font-medium">{payment.ServiceTypeName}</div>
//                                             </TableCell>
//                                             <TableCell>{payment.NoticeCount}</TableCell>
//                                             <TableCell>{getMonthName(payment.MES)}</TableCell>
//                                             <TableCell>
//                                                 {payment.QUINCENA ? `${payment.QUINCENA}ª Quincena` : "N/A"}
//                                             </TableCell>
//                                             <TableCell>
//                                                 <div className="font-medium">{formatCurrency(payment.Total)}</div>
//                                             </TableCell>
//                                             <TableCell>{getStatusBadge(payment.status)}</TableCell>
//                                             <TableCell className="text-right">
//                                                 <DropdownMenu>
//                                                     <DropdownMenuTrigger asChild>
//                                                         <Button variant="ghost" className="h-8 w-8 p-0">
//                                                             <span className="sr-only">Open menu</span>
//                                                             <MoreHorizontal className="h-4 w-4" />
//                                                         </Button>
//                                                     </DropdownMenuTrigger>
//                                                     <DropdownMenuContent align="end">
//                                                         <DropdownMenuItem
//                                                             className="text-green-500 hover:text-green-700 hover:bg-green-100 flex justify-between"
//                                                             onClick={() => handleActionClick(payment, 'approve')}
//                                                         >
//                                                             Confirmar pago
//                                                             <Check size={16} className="text-green-600 dark:text-green-400" />
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem
//                                                             disabled
//                                                             className="text-red-500 hover:text-red-700 hover:bg-red-100 flex justify-between"
//                                                             onClick={() => handleActionClick(payment, 'reject')}
//                                                         >
//                                                             Rechazar pago
//                                                             <X size={16} />
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem
//                                                             className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 flex justify-between"
//                                                             onClick={() => handleRowClick(payment)}
//                                                         >
//                                                             Ver Detalles
//                                                             <WalletCards size={16} className="text-blue-600 dark:text-blue-400" />
//                                                         </DropdownMenuItem>
//                                                     </DropdownMenuContent>
//                                                 </DropdownMenu>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </div>
//                 </CardContent>
//             </Card>

//             <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
//                 <DialogContent className="sm:max-w-md">
//                     <DialogHeader className="text-center pb-4">
//                         <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
//                             {isApproval ? (
//                                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
//                                     <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
//                                 </div>
//                             ) : (
//                                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
//                                     <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
//                                 </div>
//                             )}
//                         </div>
//                         <DialogTitle className="text-xl">{isApproval ? "Confirmar Pago" : "Rechazar Pago"}</DialogTitle>
//                         <DialogDescription className="text-base">
//                             {isApproval
//                                 ? "¿Está seguro que desea aprobar este pago? Esta acción no se puede deshacer."
//                                 : "¿Está seguro que desea rechazar este pago? El cliente será notificado."}
//                         </DialogDescription>
//                     </DialogHeader>

//                     {selectedPayment && (
//                         <div className="space-y-4">
//                             {/* <Separator /> */}

//                             <div className="space-y-3">
//                                 <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Detalles del Pago</h4>

//                                 <div className="space-y-3">
//                                     <div className="flex items-center gap-3">
//                                         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
//                                             <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-muted-foreground">Cliente</p>
//                                             <p className="font-medium">{selectedPayment.TaxName}</p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-3">
//                                         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
//                                             <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-muted-foreground">Total Pendiente</p>
//                                             <p className="font-semibold text-lg text-green-600 dark:text-green-400">
//                                                 {/* {formatCurrency(getTotalPendingAmount(selectedPayment.Ex_InvoicingAddressID))} */}
//                                                 {formatCurrency(getTotalPendingAmount(
//                                                     selectedPayment.Ex_InvoicingAddressID,
//                                                     selectedPayment.MES,
//                                                     selectedPayment.QUINCENA
//                                                 ))}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-3">
//                                         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
//                                             <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-muted-foreground">Periodo</p>
//                                             <div className="flex items-center gap-2">
//                                                 <p className="font-medium">{getMonthName(selectedPayment.MES)}</p>
//                                                 <Badge variant="secondary" className="text-xs">
//                                                     {selectedPayment.QUINCENA}ª Quincena
//                                                 </Badge>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {!isApproval && (
//                                 <div className="flex items-start gap-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 p-3 border border-amber-200 dark:border-amber-800">
//                                     <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
//                                     <div className="text-sm">
//                                         <p className="font-medium text-amber-800 dark:text-amber-200">Advertencia</p>
//                                         <p className="text-amber-700 dark:text-amber-300">
//                                             El cliente será notificado automáticamente sobre el rechazo del pago.
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     <DialogFooter className="gap-2 pt-4">
//                         <Button
//                             variant="outline"
//                             onClick={() => setConfirmDialogOpen(false)}
//                             disabled={processingAction}
//                             className="flex-1"
//                         >
//                             Cancelar
//                         </Button>
//                         <Button
//                             variant={isApproval ? "default" : "destructive"}
//                             onClick={handleConfirmAction}
//                             disabled={processingAction}
//                             className={`flex-1 ${isApproval ? "bg-green-600 hover:bg-green-700" : ""}`}
//                         >
//                             {processingAction ? (
//                                 <>
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     Procesando...
//                                 </>
//                             ) : (
//                                 <>
//                                     {isApproval ? <CheckCircle className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
//                                     {isApproval ? "Confirmar Pago" : "Rechazar Pago"}
//                                 </>
//                             )}
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>

//             {/* Diálogo de detalles */}
//             <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
//                 <DialogContent className="sm:max-w-[800px]">
//                     <DialogHeader>
//                         <DialogTitle>Detalles de Pago</DialogTitle>
//                         <DialogDescription>
//                             {selectedPayment && (
//                                 <>Información detallada de los avisos para {selectedPayment.TaxName}</>
//                             )}
//                         </DialogDescription>
//                     </DialogHeader>

//                     {isLoadingDetails ? (
//                         <div className="flex justify-center items-center py-8">
//                             <Loader className="h-8 w-8 animate-spin text-blue-500" />
//                             <span className="ml-2">Cargando detalles...</span>
//                         </div>
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableHead>ID Aviso</TableHead>
//                                         <TableHead>Cliente</TableHead>
//                                         <TableHead>Tipo</TableHead>
//                                         <TableHead>Periodo</TableHead>
//                                         <TableHead>Importe</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {paymentDetails.map((detail) => (
//                                         <TableRow key={detail.id}>
//                                             <TableCell className="font-medium">{detail.noticeId}</TableCell>
//                                             <TableCell>{detail.customerName}</TableCell>
//                                             <TableCell>{detail.serviceType}</TableCell>
//                                             <TableCell>
//                                                 {detail.servicePeriod} de <span className="font-semibold">{detail.month}</span>
//                                             </TableCell>
//                                             <TableCell>{formatCurrency(detail.amount)}</TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>

//                             {paymentDetails.length > 0 && (
//                                 <div className="flex justify-between items-center mt-4 p-2 bg-gray-50 dark:bg-gray-800 rounded">
//                                     <div>
//                                         <span className="font-medium">Total avisos:</span> {paymentDetails.length}
//                                     </div>
//                                     <div>
//                                         <span className="font-medium">Importe total:</span> {formatCurrency(
//                                             paymentDetails.reduce((sum, detail) => sum + parseFloat(detail.amount), 0)
//                                         )}
//                                     </div>
//                                 </div>
//                             )}

//                             {paymentDetails.length === 0 && (
//                                 <div className="text-center py-8 text-gray-500">
//                                     No hay detalles disponibles para este pago
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }



import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Check, X, AlertCircle, MoreHorizontal, WalletCards, Loader, XCircle, CheckCircle, User, CreditCard, Calendar, AlertTriangle, Loader2, CreditCardIcon, CalendarIcon, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { usePendingPaymentsStore } from "@/zustand/pendingPaymentsStore";
import { useNoticesStore } from "@/zustand/noticesStore";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PendingPaymentsTable({
    payments,
    title = "Pagos Pendientes",
    onApprove,
    onReject
}) {

    // console.log('Payments:', payments);

    const { externalNotices } = useNoticesStore();

    // console.log('External Notices:', externalNotices);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [processingAction, setProcessingAction] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [noticeLines, setNoticeLines] = useState({});

    // console.log('noticeLines:', noticeLines);

    // console.log('Selected Payment:', selectedPayment);
    // console.log('Payment Details:', paymentDetails);

    const { toast } = useToast();
    const apiURL = import.meta.env.VITE_API_URL;
    const { fetchPendingPayments } = usePendingPaymentsStore();

    // console.log('Payments:', payments);

    // Añadir un id único a cada pago si no existe
    const paymentsWithId = payments.map((payment, index) => ({
        ...payment,
        id: payment.id || `payment-${index}`, // Usar un id existente o generar uno nuevo
    }));


    const filteredPayments = paymentsWithId.filter(payment => {
        const searchFields = [
            payment.TaxName,
            payment.servicePeriod,
            payment.paymentMethod,
            payment.Ex_InvoicingAddressID.toString(),
        ].map(field => (field || "").toLowerCase());

        return searchFields.some(field => field.includes(searchTerm.toLowerCase()));
    });

    // console.log('Filtered Payments:', filteredPayments);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:border-amber-800 dark:text-amber-300">Pendiente</Badge>;
            case 'processed':
                return <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:border-green-800 dark:text-green-300">Procesado</Badge>;
            case 'rejected':
                return <Badge className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:border-red-800 dark:text-red-300">Rechazado</Badge>;
            default:
                return <Badge>Pendiente</Badge>;
        }
    };

    const getMonthName = (monthNumber) => {
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return months[monthNumber - 1] || "";
    };

    const handleConfirmAction = async () => {
        setProcessingAction(true);
        try {
            // Obtener el monto total para el pago seleccionado
            const totalAmount = getTotalPendingAmount(
                selectedPayment.Ex_InvoicingAddressID,
                selectedPayment.MES,
                selectedPayment.QUINCENA
            );

            const endpoint = actionType === 'approve' ? 'approvePendingPayment' : 'rejectPendingPayment';

            const response = await fetch(`${apiURL}/paymentController/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    invoicingAddressId: selectedPayment.Ex_InvoicingAddressID,
                    month: selectedPayment.MES,
                    quincena: selectedPayment.QUINCENA,
                    serviceTypeId: selectedPayment.ServiceTypeID,
                    totalAmount: totalAmount // Incluir el monto total en la solicitud
                }),
            });

            if (!response.ok) {
                throw new Error('Error procesando el pago');
            }

            toast({
                title: actionType === 'approve' ? "Pago confirmado" : "Pago rechazado",
                description: `El pago de ${formatCurrency(totalAmount)} ha sido ${actionType === 'approve' ? 'confirmado' : 'rechazado'} correctamente`,
                variant: actionType === 'approve' ? "success" : "destructive",
            });

            // Actualizar la lista de pagos
            if (actionType === 'approve') {
                onApprove && onApprove(selectedPayment.Ex_InvoicingAddressID);
            } else {
                onReject && onReject(selectedPayment.Ex_InvoicingAddressID);
            }

            // Refrescar la lista de pagos pendientes
            await fetchPendingPayments();

        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Error",
                description: `No se pudo ${actionType === 'approve' ? 'confirmar' : 'rechazar'} el pago`,
                variant: "destructive",
            });
        } finally {
            setProcessingAction(false);
            setConfirmDialogOpen(false);
            setSelectedPayment(null);
            setActionType(null);
        }
    };

    const handleActionClick = (payment, type) => {
        setSelectedPayment(payment);
        setActionType(type);
        setConfirmDialogOpen(true);
    };

    const handleRowClick = async (payment) => {
        setSelectedPayment(payment);
        setIsLoadingDetails(true);
        setDetailsDialogOpen(true);

        try {
            const response = await fetch(`${apiURL}/noticeController/getPendingPaymentDetails?invoicingAddressId=${payment.Ex_InvoicingAddressID}&month=${payment.MES}&quincena=${payment.QUINCENA}&serviceType=${payment.ServiceTypeID}`);

            if (!response.ok) {
                throw new Error('Error fetching payment details');
            }

            const data = await response.json();

            // console.log('Payment Details:', data);

            if (data.success && data.data) {
                setPaymentDetails(data.data.map(item => ({
                    id: `${item.Docentry}`,               // Cambiado de NUM_SERVICIO a Docentry
                    noticeId: `${item.Docentry}`,         // Cambiado de NUM_SERVICIO a Docentry
                    customerName: item.TaxName,
                    serviceType: item.ServiceTypeName,
                    month: getMonthName(item.MES),
                    servicePeriod: item.QUINCENA ? `${item.QUINCENA}ª Quincena` : "N/A",
                    amount: item.Total,
                    status: "Pendiente",
                })));

                // Obtener las líneas de los avisos externos
                const linesData = {};
                data.data.forEach(item => {
                    const externalNotice = externalNotices.find(notice =>
                        notice.DocEntry === item.Docentry.toString()
                    );
                    if (externalNotice && externalNotice.lines) {
                        linesData[item.Docentry] = externalNotice.lines;
                    }
                });
                setNoticeLines(linesData);
            } else {
                setPaymentDetails([]);
                setNoticeLines({});
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Error",
                description: "No se pudieron cargar los detalles del pago",
                variant: "destructive",
            });
            setPaymentDetails([]);
            setNoticeLines({});
        } finally {
            setIsLoadingDetails(false);
        }
    };

    // const getTotalPendingAmount = (invoicingAddressId) => {
    //     return payments
    //         .filter(payment => payment.Ex_InvoicingAddressID === invoicingAddressId)
    //         .reduce((total, payment) => total + parseFloat(payment.Total || 0), 0);
    // };

    const getTotalPendingAmount = (invoicingAddressId, month, quincena) => {
        return payments
            .filter(payment =>
                payment.Ex_InvoicingAddressID === invoicingAddressId &&
                payment.MES === month &&
                payment.QUINCENA === quincena
            )
            .reduce((total, payment) => total + parseFloat(payment.Total || 0), 0);
    };

    const isApproval = actionType === "approve"

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Tipo de Servicio</TableHead>
                                    <TableHead>Avisos</TableHead>
                                    <TableHead>Mes</TableHead>
                                    <TableHead>Periodo</TableHead>
                                    <TableHead>Importe</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPayments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                                            <div className="flex flex-col items-center justify-center p-4">
                                                <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                                                <p>{payments.length === 0 ? "No hay pagos pendientes" : "No se encontraron pagos que coincidan con la búsqueda"}</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredPayments.map((payment) => (
                                        <TableRow key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <TableCell>
                                                <div className="font-medium">{payment.TaxName}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{payment.ServiceTypeName}</div>
                                            </TableCell>
                                            <TableCell>{payment.NoticeCount}</TableCell>
                                            <TableCell>{getMonthName(payment.MES)}</TableCell>
                                            <TableCell>
                                                {payment.QUINCENA ? `${payment.QUINCENA}ª Quincena` : "N/A"}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{formatCurrency(payment.Total)}</div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            className="text-green-500 hover:text-green-700 hover:bg-green-100 flex justify-between"
                                                            onClick={() => handleActionClick(payment, 'approve')}
                                                        >
                                                            Confirmar pago
                                                            <Check size={16} className="text-green-600 dark:text-green-400" />
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            disabled
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-100 flex justify-between"
                                                            onClick={() => handleActionClick(payment, 'reject')}
                                                        >
                                                            Rechazar pago
                                                            <X size={16} />
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 flex justify-between"
                                                            onClick={() => handleRowClick(payment)}
                                                        >
                                                            Ver Detalles
                                                            <WalletCards size={16} className="text-blue-600 dark:text-blue-400" />
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center pb-4">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                            {isApproval ? (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                            )}
                        </div>
                        <DialogTitle className="text-xl">{isApproval ? "Confirmar Pago" : "Rechazar Pago"}</DialogTitle>
                        <DialogDescription className="text-base">
                            {isApproval
                                ? "¿Está seguro que desea aprobar este pago? Esta acción no se puede deshacer."
                                : "¿Está seguro que desea rechazar este pago? El cliente será notificado."}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPayment && (
                        <div className="space-y-4">
                            {/* <Separator /> */}

                            <div className="space-y-3">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Detalles del Pago</h4>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Cliente</p>
                                            <p className="font-medium">{selectedPayment.TaxName}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                                            <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Pendiente</p>
                                            <p className="font-semibold text-lg text-green-600 dark:text-green-400">
                                                {/* {formatCurrency(getTotalPendingAmount(selectedPayment.Ex_InvoicingAddressID))} */}
                                                {formatCurrency(getTotalPendingAmount(
                                                    selectedPayment.Ex_InvoicingAddressID,
                                                    selectedPayment.MES,
                                                    selectedPayment.QUINCENA
                                                ))}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                            <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Periodo</p>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{getMonthName(selectedPayment.MES)}</p>
                                                <Badge variant="secondary" className="text-xs">
                                                    {selectedPayment.QUINCENA}ª Quincena
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!isApproval && (
                                <div className="flex items-start gap-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 p-3 border border-amber-200 dark:border-amber-800">
                                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm">
                                        <p className="font-medium text-amber-800 dark:text-amber-200">Advertencia</p>
                                        <p className="text-amber-700 dark:text-amber-300">
                                            El cliente será notificado automáticamente sobre el rechazo del pago.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter className="gap-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setConfirmDialogOpen(false)}
                            disabled={processingAction}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant={isApproval ? "default" : "destructive"}
                            onClick={handleConfirmAction}
                            disabled={processingAction}
                            className={`flex-1 ${isApproval ? "bg-green-600 hover:bg-green-700" : ""}`}
                        >
                            {processingAction ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    {isApproval ? <CheckCircle className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
                                    {isApproval ? "Confirmar Pago" : "Rechazar Pago"}
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Diálogo de detalles */}

            {/* <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
                <DialogContent className="sm:max-w-[800px] max-h-lvh">
                    <DialogHeader>
                        <DialogTitle>Detalles de Pago</DialogTitle>
                        <DialogDescription>
                            {selectedPayment && (
                                <>Información detallada de los avisos para {selectedPayment.TaxName}</>
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    {isLoadingDetails ? (
                        <div className="flex justify-center items-center py-8">
                            <Loader className="h-8 w-8 animate-spin text-blue-500" />
                            <span className="ml-2">Cargando detalles...</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID Aviso</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Periodo</TableHead>
                                        <TableHead>Importe</TableHead>
                                        <TableHead>Detalles</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paymentDetails.map((detail) => (
                                        <React.Fragment key={detail.noticeId}>
                                            <TableRow>
                                                <TableCell className="font-medium">{detail.noticeId}</TableCell>
                                                <TableCell>{detail.customerName}</TableCell>
                                                <TableCell>{detail.serviceType}</TableCell>
                                                <TableCell>
                                                    {detail.servicePeriod} de <span className="font-semibold">{detail.month}</span>
                                                </TableCell>
                                                <TableCell>{formatCurrency(detail.amount)}</TableCell>
                                                <TableCell>
                                                    {noticeLines[detail.noticeId] && noticeLines[detail.noticeId].length > 0 ? (
                                                        <Badge variant="secondary" className="text-xs">
                                                            {noticeLines[detail.noticeId].length} líneas
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">Sin detalles</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            {noticeLines[detail.noticeId] && noticeLines[detail.noticeId].length > 0 && (
                                                <TableRow key={`${detail.id}-lines`}>
                                                    <TableCell colSpan={6} className="p-0">
                                                        <Accordion type="single" collapsible className="w-full">
                                                            <AccordionItem value={`lines-${detail.noticeId}`} className="border-none">
                                                                <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-sm font-medium">Ver líneas del aviso {detail.noticeId}</span>
                                                                        <Badge variant="outline" className="text-xs">
                                                                            {noticeLines[detail.noticeId].length} elementos
                                                                        </Badge>
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <AccordionContent className="px-4 pb-4">
                                                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                                                        <div className="space-y-3">
                                                                            {noticeLines[detail.noticeId].map((line, index) => (
                                                                                <div key={index} className="bg-white dark:bg-gray-900 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                                                                        <div>
                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Referencia</p>
                                                                                            <p className="font-medium">{line.Reference}</p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Cantidad</p>
                                                                                            <p className="font-medium">{line.qty}</p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Subtotal</p>
                                                                                            <p className="font-medium">{formatCurrency(line.SubTotal)}</p>
                                                                                        </div>
                                                                                        <div>
                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                                                                                            <p className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(line.Total)}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="mt-3">
                                                                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Descripción</p>
                                                                                        <p className="text-sm">{line.Description}</p>
                                                                                    </div>
                                                                                    {line.SupplierName && (
                                                                                        <div className="mt-2">
                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Proveedor</p>
                                                                                            <p className="text-sm">{line.SupplierName}</p>
                                                                                        </div>
                                                                                    )}
                                                                                    <div className="flex items-center gap-2 mt-2">
                                                                                        {line.Revision && (
                                                                                            <Badge variant="secondary" className="text-xs">
                                                                                                Revisión
                                                                                            </Badge>
                                                                                        )}
                                                                                        {line.StatusName && (
                                                                                            <Badge variant="outline" className="text-xs">
                                                                                                {line.StatusName}
                                                                                            </Badge>
                                                                                        )}
                                                                                        {line.Total < 0 && (
                                                                                            <Badge variant="destructive" className="text-xs">
                                                                                                Descuento
                                                                                            </Badge>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-4">
                                                                                <div className="space-y-3">
                                                                                   
                                                                                    <div className="flex justify-between items-center">
                                                                                        <span className="text-sm text-gray-500 dark:text-gray-400">Subtotal (sin IVA)</span>
                                                                                        <span className="font-medium">
                                                                                            {formatCurrency(
                                                                                                noticeLines[detail.noticeId].reduce((sum, line) => sum + parseFloat(line.SubTotal), 0)
                                                                                            )}
                                                                                        </span>
                                                                                    </div>

                                                                                   
                                                                                    <div className="flex justify-between items-center">
                                                                                        <span className="text-sm text-gray-500 dark:text-gray-400">IVA (21%)</span>
                                                                                        <span className="font-medium">
                                                                                            {formatCurrency(
                                                                                                noticeLines[detail.noticeId].reduce((sum, line) =>
                                                                                                    sum + (parseFloat(line.Total) - parseFloat(line.SubTotal)), 0)
                                                                                            )}
                                                                                        </span>
                                                                                    </div>

                                                                                   
                                                                                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>

                                                                                   
                                                                                    <div className="flex justify-between items-center">
                                                                                        <span className="font-medium">Total (IVA incluido)</span>
                                                                                        <span className="font-semibold text-lg text-green-600 dark:text-green-400">
                                                                                            {formatCurrency(
                                                                                                noticeLines[detail.noticeId].reduce((sum, line) => sum + parseFloat(line.Total), 0)
                                                                                            )}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        </Accordion>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>

                            {paymentDetails.length > 0 && (
                                <div className="flex justify-between items-center mt-4 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                    <div>
                                        <span className="font-medium">Total avisos:</span> {paymentDetails.length}
                                    </div>
                                    <div>
                                        <span className="font-medium">Importe total:</span> {formatCurrency(
                                            paymentDetails.reduce((sum, detail) => sum + parseFloat(detail.amount), 0)
                                        )}
                                    </div>
                                </div>
                            )}

                            {paymentDetails.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No hay detalles disponibles para este pago
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog> */}
            <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
                <DialogContent className="sm:max-w-[800px] p-0 h-[80vh] flex flex-col">
                    <DialogHeader className="px-6 pt-6 pb-2">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-semibold">Detalles de Pago</DialogTitle>
                            {selectedPayment && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/60 px-2 py-1">
                                    {getMonthName(selectedPayment.MES)} {selectedPayment.QUINCENA}ª quincena
                                </Badge>
                            )}
                        </div>
                        <DialogDescription className="mt-1.5">
                            {selectedPayment && (
                                <span className="flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span>Información detallada para <span className="font-medium">{selectedPayment.TaxName}</span></span>
                                </span>
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    {isLoadingDetails ? (
                        <div className="flex flex-col justify-center items-center py-16">
                            <Loader className="h-8 w-8 animate-spin text-blue-500 mb-3" />
                            <span className="text-muted-foreground">Cargando detalles del pago...</span>
                        </div>
                    ) : (
                        <ScrollArea className="flex-1 px-6">
                            <div className="pb-6">
                                {/* Resumen del pago */}
                                {selectedPayment && (
                                    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-card border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <File className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-muted-foreground">Avisos</span>
                                            </div>
                                            <p className="text-2xl font-semibold">{paymentDetails.length}</p>
                                        </div>
                                        <div className="bg-card border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-muted-foreground">Periodo</span>
                                            </div>
                                            <p className="text-lg font-medium">{getMonthName(selectedPayment.MES)} {selectedPayment.QUINCENA}ª</p>
                                        </div>
                                        <div className="bg-card border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-muted-foreground">Total</span>
                                            </div>
                                            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                                                {formatCurrency(
                                                    paymentDetails.reduce((sum, detail) => sum + parseFloat(detail.amount), 0)
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {paymentDetails.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                                            <AlertCircle className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium mb-1">No hay detalles disponibles</h3>
                                        <p className="text-muted-foreground max-w-sm">
                                            No se encontraron avisos asociados a este pago pendiente.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="rounded-lg border overflow-hidden">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-muted/40">
                                                        <TableHead className="w-24">ID Aviso</TableHead>
                                                        <TableHead>Cliente</TableHead>
                                                        <TableHead>Tipo</TableHead>
                                                        <TableHead>Periodo</TableHead>
                                                        <TableHead className="text-right">Importe</TableHead>
                                                        <TableHead className="text-center w-24">Detalles</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {paymentDetails.map((detail) => (
                                                        <React.Fragment key={detail.noticeId}>
                                                            <TableRow className="hover:bg-muted/30">
                                                                <TableCell className="font-medium">{detail.noticeId}</TableCell>
                                                                <TableCell>{detail.customerName}</TableCell>
                                                                <TableCell>
                                                                    <Badge variant="secondary" className="font-normal">
                                                                        {detail.serviceType}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {detail.servicePeriod} de <span className="font-semibold">{detail.month}</span>
                                                                </TableCell>
                                                                <TableCell className="text-right font-medium">{formatCurrency(detail.amount)}</TableCell>
                                                                <TableCell className="text-center">
                                                                    {noticeLines[detail.noticeId] && noticeLines[detail.noticeId].length > 0 ? (
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            {noticeLines[detail.noticeId].length} líneas
                                                                        </Badge>
                                                                    ) : (
                                                                        <span className="text-gray-400 text-sm">Sin detalles</span>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                            {noticeLines[detail.noticeId] && noticeLines[detail.noticeId].length > 0 && (
                                                                <TableRow key={`${detail.id}-lines`}>
                                                                    <TableCell colSpan={6} className="p-0">
                                                                        <Accordion type="single" collapsible className="w-full">
                                                                            <AccordionItem value={`lines-${detail.noticeId}`} className="border-none">
                                                                                <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span className="text-sm font-medium">Ver líneas del aviso {detail.noticeId}</span>
                                                                                        <Badge variant="outline" className="text-xs">
                                                                                            {noticeLines[detail.noticeId].length} elementos
                                                                                        </Badge>
                                                                                    </div>
                                                                                </AccordionTrigger>
                                                                                <AccordionContent className="px-4 pb-4">
                                                                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                                                                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                                                                            {noticeLines[detail.noticeId].map((line, index) => (
                                                                                                <div key={index} className="bg-white dark:bg-gray-900 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                                                                                        <div>
                                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Referencia</p>
                                                                                                            <p className="font-medium">{line.Reference || "—"}</p>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Cantidad</p>
                                                                                                            <p className="font-medium">{line.qty}</p>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Subtotal</p>
                                                                                                            <p className="font-medium">{formatCurrency(line.SubTotal)}</p>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                                                                                                            <p className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(line.Total)}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="mt-3">
                                                                                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Descripción</p>
                                                                                                        <p className="text-sm">{line.Description}</p>
                                                                                                    </div>
                                                                                                    {line.SupplierName && (
                                                                                                        <div className="mt-2">
                                                                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Proveedor</p>
                                                                                                            <p className="text-sm">{line.SupplierName}</p>
                                                                                                        </div>
                                                                                                    )}
                                                                                                    <div className="flex items-center gap-2 mt-2">
                                                                                                        {line.Revision && (
                                                                                                            <Badge variant="secondary" className="text-xs">
                                                                                                                Revisión
                                                                                                            </Badge>
                                                                                                        )}
                                                                                                        {line.StatusName && (
                                                                                                            <Badge variant="outline" className="text-xs">
                                                                                                                {line.StatusName}
                                                                                                            </Badge>
                                                                                                        )}
                                                                                                        {line.Total < 0 && (
                                                                                                            <Badge variant="destructive" className="text-xs">
                                                                                                                Descuento
                                                                                                            </Badge>
                                                                                                        )}
                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                        <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                                                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-4">
                                                                                                <div className="space-y-3">
                                                                                                    <div className="flex justify-between items-center">
                                                                                                        <span className="text-sm text-gray-500 dark:text-gray-400">Subtotal (sin IVA)</span>
                                                                                                        <span className="font-medium">
                                                                                                            {formatCurrency(
                                                                                                                noticeLines[detail.noticeId].reduce((sum, line) => sum + parseFloat(line.SubTotal), 0)
                                                                                                            )}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    <div className="flex justify-between items-center">
                                                                                                        <span className="text-sm text-gray-500 dark:text-gray-400">IVA (21%)</span>
                                                                                                        <span className="font-medium">
                                                                                                            {formatCurrency(
                                                                                                                noticeLines[detail.noticeId].reduce((sum, line) =>
                                                                                                                    sum + (parseFloat(line.Total) - parseFloat(line.SubTotal)), 0)
                                                                                                            )}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                                                                                                    <div className="flex justify-between items-center">
                                                                                                        <span className="font-medium">Total (IVA incluido)</span>
                                                                                                        <span className="font-semibold text-lg text-green-600 dark:text-green-400">
                                                                                                            {formatCurrency(
                                                                                                                noticeLines[detail.noticeId].reduce((sum, line) => sum + parseFloat(line.Total), 0)
                                                                                                            )}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </AccordionContent>
                                                                            </AccordionItem>
                                                                        </Accordion>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>

                                        <div className="bg-card border rounded-lg p-4 space-y-3">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Resumen total</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase mb-1">Total avisos</p>
                                                    <p className="text-lg font-semibold">{paymentDetails.length}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase mb-1">Líneas de detalle</p>
                                                    <p className="text-lg font-semibold">
                                                        {Object.values(noticeLines).reduce((total, lines) => total + lines.length, 0)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase mb-1">Importe total</p>
                                                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                                                        {formatCurrency(
                                                            paymentDetails.reduce((sum, detail) => sum + parseFloat(detail.amount), 0)
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    )}

                    <div className="mt-auto p-4 bg-muted/20 border-t flex justify-end">
                        <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                            Cerrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
