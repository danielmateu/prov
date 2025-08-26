

import React, { useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
// import { InvoiceData } from '../../types/invoice';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function InvoicePreview({ invoice, onRenderComplete }) {
    console.log('Rendering InvoicePreview with invoice:', invoice);
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy', { locale: es });
    };

    useEffect(() => {
        if (onRenderComplete) {
            // Call the callback after a short delay to ensure rendering is complete
            const timer = setTimeout(onRenderComplete, 100);
            return () => clearTimeout(timer);
        }
    }, [onRenderComplete]);

    return (
        <Card className="max-w-4xl mx-auto bg-white print:shadow-none print:border-none">
            <CardContent className="p-8 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-400">FACTURA - {invoice.issuer.taxName}</h1>
                        <div className="mt-2 space-y-1">
                            <p className="text-lg font-semibold">
                                {invoice.invoiceSeries ? `${invoice.invoiceSeries}-` : ''}{invoice.invoiceNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                                Fecha de expedición: {formatDate(invoice.issueDate)}
                            </p>
                            {invoice.serviceDate && invoice.serviceDate !== invoice.issueDate && (
                                <p className="text-sm text-gray-600">
                                    Fecha del servicio: {formatDate(invoice.serviceDate)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="text-right">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                            {invoice.total.toFixed(2)} €
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Parties Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Issuer */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3 dark:text-gray-600">DATOS DEL EMISOR</h3>
                        <div className="space-y-1 text-sm">
                            <p className="font-medium">{invoice.issuer.taxName}</p>
                            <p>NIF: {invoice.issuer.nif}</p>
                            <p>{invoice.issuer.address}</p>
                            <p>{invoice.issuer.postalCode} {invoice.issuer.city}</p>
                            <p>{invoice.issuer.province}</p>
                            {invoice.issuer.email && <p>Email: {invoice.issuer.email}</p>}
                            {invoice.issuer.phone && <p>Teléfono: {invoice.issuer.phone}</p>}
                        </div>
                    </div>

                    {/* Recipient */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3 dark:text-gray-600">DATOS DEL DESTINATARIO</h3>
                        <div className="space-y-1 text-sm">
                            <p className="font-medium">{invoice.recipient.name}</p>
                            <p>NIF: {invoice.recipient.nif}</p>
                            <p>{invoice.recipient.address}</p>
                            <p>{invoice.recipient.postalCode} {invoice.recipient.city}</p>
                            <p>{invoice.recipient.province}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Items */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 dark:text-gray-600">DETALLE DE SERVICIOS</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-2 px-1 font-semibold">Descripción</th>
                                    <th className="text-center py-2 px-1 font-semibold w-20">Cant.</th>
                                    <th className="text-right py-2 px-1 font-semibold w-24">Precio</th>
                                    <th className="text-right py-2 px-1 font-semibold w-24">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item, index) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                        <td className="py-3 px-1">
                                            <div>
                                                <p className="font-medium">{item.description}</p>
                                                {item.serviceType && (
                                                    <p className="text-sm text-gray-600">Tipo: {item.serviceType}</p>
                                                )}
                                                {item.noticeIds && item.noticeIds.length > 0 && (
                                                    <div className="mt-1">
                                                        <p className="text-xs text-gray-500 flex items-center">
                                                            <span className="font-medium mr-1">Nº(s) de aviso:</span>
                                                            <span>{item.noticeIds.join(', ')}</span>
                                                        </p>
                                                        {item.detailedItems && (
                                                            <div className="mt-1 space-y-1">
                                                                {item.detailedItems.map(detail => (
                                                                    <div key={detail.Docentry} className="text-xs text-gray-500 flex justify-between">
                                                                        {/* <span>DocEntry: {detail.Docentry}</span> */}
                                                                        <span>Servicio Nº: {detail.NUM_SERVICIO}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {/* {item.serviceType && (
                                                    <p className="text-sm text-gray-600">Tipo: {item.serviceType}</p>
                                                    // 
                                                )} */}
                                                {/* {item.noticeIds && item.noticeIds.length > 0 && (
                                                    <p className="text-xs text-gray-500">
                                                        Avisos: {item.noticeIds.join(', ')}
                                                    </p>
                                                )} */}
                                            </div>
                                        </td>
                                        <td className="py-3 px-1 text-center">{item.quantity}</td>
                                        <td className="py-3 px-1 text-right">{item.unitPrice.toFixed(2)} €</td>
                                        <td className="py-3 px-1 text-right font-medium">{item.total.toFixed(2)} €</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Separator />

                {/* Totals */}
                <div className="flex justify-end">
                    <div className="w-full max-w-sm space-y-2">
                        <div className="flex justify-between py-1">
                            <span>Subtotal:</span>
                            <span>{invoice.subtotal.toFixed(2)} €</span>
                        </div>

                        <div className="flex justify-between py-1">
                            <span>IVA ({invoice.ivaRate}%):</span>
                            <span>{invoice.ivaAmount.toFixed(2)} €</span>
                        </div>

                        {invoice.irpfAmount > 0 && (
                            <div className="flex justify-between py-1 text-red-600">
                                <span>Retención IRPF ({invoice.irpfRate}%):</span>
                                <span>-{invoice.irpfAmount.toFixed(2)} €</span>
                            </div>
                        )}

                        <Separator />

                        <div className="flex justify-between py-2 text-lg font-bold">
                            <span>TOTAL:</span>
                            <span>{invoice.total.toFixed(2)} €</span>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Payment Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <h4 className="font-semibold mb-2">INFORMACIÓN DE PAGO</h4>
                        <p>Forma de pago: {invoice.paymentMethod}</p>
                        <p>IBAN: {invoice.issuer.iban}</p>
                        <p>Condiciones: {invoice.paymentTerms}</p>
                    </div>

                    {invoice.notes && (
                        <div>
                            <h4 className="font-semibold mb-2">OBSERVACIONES</h4>
                            <p className="text-gray-700">{invoice.notes}</p>
                        </div>
                    )}
                </div>

                {/* Legal Notice */}
                <div className="mt-8 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        Esta factura cumple con los requisitos establecidos en el Real Decreto 1619/2012,
                        por el que se aprueba el Reglamento por el que se regulan las obligaciones de facturación.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}