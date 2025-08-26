import React, { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { AlertCircle, MoreHorizontal, WalletCards, Loader, Receipt, Calendar, MapPin, Phone, Hammer, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import CalendarRange from "../CalendarRange";
import TableSkeleton from "../skeletons/TableSkeleton";

export default function AcceptedPaymentsTable({ payments, title = "Pagos Realizados", dateRange = { from: undefined, to: undefined }, handleDateRangeChange }) {

    // console.log('Payments:', payments);

    const [selectedPayment, setSelectedPayment] = useState(null);

    // console.log('Selected Payment:', selectedPayment);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

    const { toast } = useToast();

    // Filtrar los pagos por fecha usando el rango de fechas
    const filteredPayments = useMemo(() => {
        if (!payments) return [];
        if (!dateRange.from && !dateRange.to) return payments;

        return payments.filter(payment => {
            const paymentDate = new Date(payment.CreateDate);

            // Si solo tenemos fecha de inicio
            if (dateRange.from && !dateRange.to) {
                return paymentDate >= dateRange.from;
            }

            // Si solo tenemos fecha de fin
            if (!dateRange.from && dateRange.to) {
                // Ajustar la fecha de fin para incluir todo el día
                const endDate = new Date(dateRange.to);
                endDate.setHours(23, 59, 59, 999);
                return paymentDate <= endDate;
            }

            // Si tenemos ambas fechas
            if (dateRange.from && dateRange.to) {
                const endDate = new Date(dateRange.to);
                endDate.setHours(23, 59, 59, 999);
                return paymentDate >= dateRange.from && paymentDate <= endDate;
            }

            return true;
        });
    }, [payments, dateRange]);

    const getServiceTypeLabel = (serviceTypeID) => {
        switch (serviceTypeID) {
            case 1:
                return "Reparación";
            case 0:
                return "Instalación";
            default:
                return "Otro Servicio";
        }
    };

    const getValueByStatus = (statusID) => {
        switch (statusID) {
            case 1:
                return 10.00;
            case 0:
                return 15.00;
            default:
                return 0;
        }
    };

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setDetailsDialogOpen(true);
    };

    return (
        <>
            {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>

                    {handleDateRangeChange && (
                        <CalendarRange
                            date={dateRange}
                            setDate={handleDateRangeChange}
                        />
                    )}
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Nº Aviso</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {!payments || payments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                            <div className="flex flex-col items-center justify-center p-4">
                                                <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                                                <p>No hay pagos procesados</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    payments.map((payment) => (
                                        <TableRow key={payment.NoticeHeaderID} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <TableCell>
                                                <div className="font-medium">
                                                    {payment.CustomerName} {payment.CustomerSurname}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {payment.CustomerTaxName}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-mono">
                                                    {payment.DocEntry}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {getServiceTypeLabel(payment.ServiceTypeID)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    {payment.Ex_StatusName}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(payment.CreateDate).toLocaleDateString('es-ES')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Abrir menú</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 flex justify-between"
                                                            onClick={() => handleViewDetails(payment)}
                                                        >
                                                            Ver Detalles
                                                            <WalletCards className="h-4 w-4 ml-2" />
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
            </Card> */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                        <CardTitle className="text-xl font-bold">{title}</CardTitle>
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                            {filteredPayments.length} {filteredPayments.length === 1 ? "pago" : "pagos"}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarRange
                            date={dateRange}
                            setDate={handleDateRangeChange}
                        />

                        {(dateRange.from || dateRange.to) && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDateRangeChange({ from: undefined, to: undefined })}
                                className="h-8 px-2"
                            >
                                <Filter className="h-4 w-4 mr-1" />
                                Limpiar filtros
                            </Button>
                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    {filteredPayments.length === 0 ? (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                            </div>
                            <TableSkeleton rows={3} columns={6} />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Nº Aviso</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {!filteredPayments || filteredPayments.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                                <div className="flex flex-col items-center justify-center p-4">
                                                    <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                                                    <p>No hay pagos procesados {dateRange.from || dateRange.to ? "en el rango de fechas seleccionado" : ""}</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredPayments.map((payment) => (
                                            <TableRow key={payment.NoticeHeaderID} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                {/* ... el contenido existente de las celdas ... */}
                                                <TableCell>
                                                    <div className="font-medium">
                                                        {payment.CustomerName} {payment.CustomerSurname}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {payment.CustomerTaxName}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="font-mono">
                                                        {payment.DocEntry}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">
                                                        {getServiceTypeLabel(payment.ServiceTypeID)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        {payment.Ex_StatusName}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(payment.CreateDate).toLocaleDateString('es-ES')}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Abrir menú</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 flex justify-between"
                                                                onClick={() => handleViewDetails(payment)}
                                                            >
                                                                Ver Detalles
                                                                <WalletCards className="h-4 w-4 ml-2" />
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
                    )}
                </CardContent>
            </Card>

            <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
                <DialogContent className="sm:max-w-[800px]">
                    {selectedPayment && (
                        <>
                            <DialogHeader>
                                <div className="flex justify-between items-center mb-2">
                                    <DialogTitle className="flex items-center gap-2">
                                        <Receipt className="h-5 w-5" />
                                        Detalles del Aviso
                                        <Badge variant="outline" className="font-mono">
                                            #{selectedPayment.DocEntry}
                                        </Badge>
                                    </DialogTitle>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(selectedPayment.CreateDate).toLocaleDateString('es-ES')}
                                    </div>
                                </div>
                                <DialogDescription>
                                    Aquí puedes ver los detalles del aviso y el pago realizado.
                                    Si necesitas más información, contacta al cliente directamente.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <h4 className="font-medium">Información del Cliente</h4>
                                    <div className="grid gap-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span>{selectedPayment.CustomerAddress}, {selectedPayment.CustomerCity}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span>{selectedPayment.CustomerPhone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <h4 className="font-medium">Detalles del Servicio</h4>
                                    <div className="grid gap-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Hammer className="h-4 w-4 text-muted-foreground" />
                                            <span>
                                                {selectedPayment.ApparatusName} - {selectedPayment.BrandName}
                                            </span>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-sm text-gray-600">
                                                {selectedPayment.Observation}
                                            </p>
                                            {selectedPayment.TechnicalObservation && (
                                                <p className="text-sm text-gray-600 mt-2">
                                                    <span className="font-medium">Observaciones técnicas:</span> {selectedPayment.TechnicalObservation}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-2 mt-4">
                                    <h4 className="font-medium">Líneas de Facturación</h4>
                                    <div className="border rounded-lg overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-gray-50 dark:bg-gray-800">
                                                    <TableHead className="w-16 text-center">Cant.</TableHead>
                                                    <TableHead>Referencia</TableHead>
                                                    <TableHead>Descripción</TableHead>
                                                    <TableHead className="text-right">Coste</TableHead>
                                                    <TableHead className="text-right">Subtotal</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {selectedPayment.lines && selectedPayment.lines.length > 0 ? (
                                                    selectedPayment.lines.map((line, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="text-center">{line.qty}</TableCell>
                                                            <TableCell>{line.Reference}</TableCell>
                                                            <TableCell>{line.Description}</TableCell>
                                                            <TableCell className="text-right">{formatCurrency(line.MaterialCost)}</TableCell>
                                                            <TableCell className="text-right font-medium">{formatCurrency(line.SubTotal)}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                                                            No hay líneas de detalle disponibles
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                            {selectedPayment.lines && selectedPayment.lines.length > 0 && (
                                                <tfoot className="border-t">
                                                    <tr>
                                                        <td colSpan={4} className="p-2 text-right font-medium">
                                                            Subtotal:
                                                        </td>
                                                        <td className="p-2 text-right font-medium">
                                                            {formatCurrency(selectedPayment.Total - selectedPayment.Tax)}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className="p-2 text-right font-medium">
                                                            IVA (21%):
                                                        </td>
                                                        <td className="p-2 text-right font-medium">
                                                            {formatCurrency(selectedPayment.Tax)}
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                                        <td colSpan={4} className="p-2 text-right font-medium">
                                                            Total:
                                                        </td>
                                                        <td className="p-2 text-right font-bold">
                                                            {formatCurrency(selectedPayment.Total)}
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            )}
                                        </Table>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                            {selectedPayment.Ex_StatusName}
                                        </Badge>
                                        <span className="text-sm text-green-700">
                                            {getServiceTypeLabel(selectedPayment.ServiceTypeID)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-lg font-semibold text-green-700">
                                            {formatCurrency(getValueByStatus(selectedPayment.ServiceTypeID))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
