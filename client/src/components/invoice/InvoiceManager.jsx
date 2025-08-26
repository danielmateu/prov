
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
    FileText,
    Plus,
    Search,
    Calendar,
    Euro,
    Download,
    Eye,
    Filter,
    Archive,
    Mail,
    Send,
    CheckCircle,
    Trash2
} from 'lucide-react';
// import { InvoiceData } from '../../types/invoice';
import { InvoiceGenerator } from './InvoiceGenerator';
import { InvoicePreview } from './InvoicePreview';
import { generateInvoicePDF, generateInvoicePDFBlob } from '../../utils/pdfGenerator';
import { sendInvoiceEmail, validateEmailConfiguration } from '../../utils/emailService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { t } from 'i18next';

// interface InvoiceManagerProps {
//     userProfile?: any;
//     pendingPayments?: any[];
// }

export function InvoiceManager({ userProfile, pendingPayments = [], shouldShowPendingAlert }) {

    // console.log('InvoiceManager mounted with userProfile:', userProfile);

    // console.log('Should Show Pending Alert:', shouldShowPendingAlert);
    const [view, setView] = useState('list');
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(null);
    const [isSendingEmail, setIsSendingEmail] = useState(null);

    const { toast } = useToast();

    // Load invoices from localStorage
    useEffect(() => {
        const savedInvoices = localStorage.getItem('invoices');
        if (savedInvoices) {
            setInvoices(JSON.parse(savedInvoices));
        }
    }, []);

    // Save invoices to localStorage
    const saveInvoices = (newInvoices) => {
        setInvoices(newInvoices);
        localStorage.setItem('invoices', JSON.stringify(newInvoices));
    };

    const handleInvoiceGenerated = (invoice) => {
        const newInvoices = [...invoices, { ...invoice, id: Date.now().toString(), status: 'draft' }];
        saveInvoices(newInvoices);
        setView('list');
    };

    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setView('preview');
    };

    const handleDownloadInvoice = async (invoice) => {
        setIsGeneratingPDF(invoice.id || '');

        try {
            // Create a temporary div with the invoice preview
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.style.top = '-9999px';
            tempDiv.style.width = '210mm';
            tempDiv.style.backgroundColor = 'white';
            document.body.appendChild(tempDiv);

            // Render the invoice preview in the temporary div
            const { createRoot } = await import('react-dom/client');
            const root = createRoot(tempDiv);

            await new Promise((resolve) => {
                root.render(
                    React.createElement(InvoicePreview, {
                        invoice,
                        onRenderComplete: resolve
                    })
                );
                // Give it a moment to render
                setTimeout(resolve, 1000);
            });

            // Generate PDF
            await generateInvoicePDF(invoice, tempDiv);

            // Cleanup
            root.unmount();
            document.body.removeChild(tempDiv);

        } catch (error) {
            console.error('Error downloading invoice:', error);
            // alert('Error al descargar la factura. Por favor, inténtelo de nuevo.');
            toast({
                title: 'Error',
                description: 'Error al descargar la factura. Por favor, inténtelo de nuevo.',
                variant: 'destructive'
            });
        } finally {
            setIsGeneratingPDF(null);
        }
    };

    const handleSendEmail = async (invoice) => {
        if (!validateEmailConfiguration()) {
            // alert('El servicio de email no está configurado correctamente.');
            toast({
                title: 'Error',
                description: 'El servicio de email no está configurado correctamente.',
                variant: 'destructive'
            });
            return;
        }

        setIsSendingEmail(invoice.id || '');

        try {
            // Create a temporary div with the invoice preview
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.style.top = '-9999px';
            tempDiv.style.width = '210mm';
            tempDiv.style.backgroundColor = 'white';
            document.body.appendChild(tempDiv);

            // Render the invoice preview in the temporary div
            const { createRoot } = await import('react-dom/client');
            const root = createRoot(tempDiv);

            await new Promise((resolve) => {
                root.render(
                    React.createElement(InvoicePreview, {
                        invoice,
                        onRenderComplete: resolve
                    })
                );
                // Give it a moment to render
                setTimeout(resolve, 1000);
            });

            // Generate PDF blob
            const pdfBlob = await generateInvoicePDFBlob(invoice, tempDiv);

            // Send email
            const emailSent = await sendInvoiceEmail(invoice, pdfBlob);

            if (emailSent) {
                // Update invoice status to 'sent'
                const updatedInvoices = invoices.map(inv =>
                    inv.id === invoice.id ? { ...inv, status: 'sent' } : inv
                );
                saveInvoices(updatedInvoices);

                // Update selectedInvoice if it's the same one
                if (selectedInvoice?.id === invoice.id) {
                    setSelectedInvoice({ ...selectedInvoice, status: 'sent' });
                }

                // alert('¡Factura enviada correctamente a Rapitecnic!');
                toast({
                    title: 'Éxito',
                    description: '¡Factura enviada correctamente a Rapitecnic!',
                    variant: 'success'
                });

            } else {
                // alert('Error al enviar la factura. Por favor, inténtelo de nuevo.');
                toast({
                    title: 'Error',
                    description: 'Error al enviar la factura. Por favor, inténtelo de nuevo.',
                    variant: 'destructive'
                });

            }

            // Cleanup
            root.unmount();
            document.body.removeChild(tempDiv);

        } catch (error) {
            console.error('Error sending email:', error);
            // alert('Error al enviar la factura por email. Por favor, inténtelo de nuevo.');
            toast({
                title: 'Error',
                description: 'Error al enviar la factura por email. Por favor, inténtelo de nuevo.',
                variant: 'destructive'
            });

        } finally {
            setIsSendingEmail(null);
        }
    };

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.issuer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const totalPendingAmount = pendingPayments.reduce((sum, payment) => sum + payment.Total, 0);

    // Helper function to check if invoice can be sent
    const canSendInvoice = (invoice) => {
        return invoice.status === 'draft';
    };

    // Helper function to get send button text
    const getSendButtonText = (invoice) => {
        if (invoice.status === 'sent') return 'Ya Enviada';
        if (invoice.status === 'paid') return 'Pagada';
        return 'Enviar a Rapitecnic';
    };

    // Helper function to get send button icon
    const getSendButtonIcon = (invoice) => {
        if (invoice.status === 'sent' || invoice.status === 'paid') {
            return <CheckCircle className="mr-2 h-4 w-4" />;
        }
        return <Send className="mr-2 h-4 w-4" />;
    };

    if (view === 'create') {
        return (
            <div className="space-y-6">
                <div className="flex justify-end">

                    <Button variant="outline" onClick={() => setView('list')}>
                        {/* Volver al listado */}
                        {t("BackToList")}
                    </Button>
                </div>

                <InvoiceGenerator
                    userProfile={userProfile}
                    pendingPayments={pendingPayments}
                    onInvoiceGenerated={handleInvoiceGenerated}
                />
            </div>
        );
    }

    if (view === 'preview' && selectedInvoice) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">Vista Previa - {selectedInvoice.invoiceNumber}</h2>
                        <Badge variant={
                            selectedInvoice.status === 'paid' ? 'default' :
                                selectedInvoice.status === 'sent' ? 'secondary' : 'outline'
                        }>
                            {selectedInvoice.status === 'draft' ? 'Borrador' :
                                selectedInvoice.status === 'sent' ? 'Enviada' : 'Pagada'}
                        </Badge>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={async () => await handleDownloadInvoice(selectedInvoice)}
                            disabled={isGeneratingPDF === selectedInvoice.id}
                        >
                            {isGeneratingPDF === selectedInvoice.id ? (
                                <>Generando...</>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Descargar PDF
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={async () => await handleSendEmail(selectedInvoice)}
                            disabled={isSendingEmail === selectedInvoice.id || !canSendInvoice(selectedInvoice)}
                            className={canSendInvoice(selectedInvoice) ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"}
                        >
                            {isSendingEmail === selectedInvoice.id ? (
                                <>Enviando...</>
                            ) : (
                                <>
                                    {getSendButtonIcon(selectedInvoice)}
                                    {getSendButtonText(selectedInvoice)}
                                </>
                            )}
                        </Button>
                        <Button variant="outline" onClick={() => setView('list')}>
                            {/* Volver al listado */}
                            {t("BackToList")}
                        </Button>
                    </div>
                </div>

                <InvoicePreview invoice={selectedInvoice} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Facturas Generadas</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{invoices.length}</div>
                        <p className="text-xs text-muted-foreground">
                            Total de facturas creadas
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {/* Pagos Pendientes */}
                            {t("PendingPayments")}
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {/* {t("ServicesToInvoice", { count: pendingPayments.length })} */}
                            {pendingPayments.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {/* Servicios por facturar */}
                            {t("ServicesToInvoice", { count: pendingPayments.length })}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {/* Importe Pendiente */}
                            {t("PendingAmount")}
                        </CardTitle>
                        <Euro className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {(totalPendingAmount)} €
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {/* Total por facturar (iva incluido) */}
                            {t("TotalToInvoice")}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Pending Payments Alert */}
            {
                pendingPayments.length > 0 && (
                    <Card className="border-orange-200 bg-orange-50">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-orange-600" />
                                    <CardTitle className="text-orange-800">
                                        {/* Servicios Pendientes de Facturar */}
                                        {t("PendingServicesToInvoice")}
                                    </CardTitle>
                                </div>
                                <Badge variant="outline" className="text-orange-700 border-orange-300">
                                    {/* {pendingPayments.length} servicios */}
                                    {t("PendingServicesCount", { count: pendingPayments.length })}
                                </Badge>
                            </div>
                            <CardDescription className="text-orange-700">
                                {/* Tiene servicios acumulados listos para facturar por un importe total de {(totalPendingAmount)} € */}
                                {t("PendingServicesDescription")} {(totalPendingAmount)} €
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => setView('create')} className="bg-orange-600 hover:bg-orange-700">
                                <Plus className="mr-2 h-4 w-4" />
                                {/* Generar Factura Ahora */}
                                {t("GenerateInvoiceNow")}
                            </Button>
                        </CardContent>
                    </Card>
                )
            }

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Buscar por número de factura o cliente..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant={filterStatus === 'all' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterStatus('all')}
                            >
                                {/* Todas */}
                                {t("AllInvoices")}
                            </Button>
                            <Button
                                variant={filterStatus === 'draft' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterStatus('draft')}
                            >
                                {/* Borradores */}
                                {t("DraftInvoices")}
                            </Button>
                            <Button
                                variant={filterStatus === 'sent' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterStatus('sent')}
                            >
                                Enviadas
                            </Button>
                            <Button
                                disabled
                                variant={filterStatus === 'paid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterStatus('paid')}
                            >
                                Pagadas
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Invoices List */}
            <Card>
                <CardHeader>
                    <CardTitle>Facturas</CardTitle>
                    <CardDescription>
                        {/* Listado de todas sus facturas generadas */}
                        {t("GeneratedInvoicesDescription")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {filteredInvoices.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {invoices.length === 0 ? `${t("NoInvoices")}` : `${t("NoInvoicesFound")}`}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {invoices.length === 0
                                    ? `${t("CreateFirstInvoice")}`
                                    : `${t("NoInvoicesMatchSearch")}`
                                }
                            </p>
                            {invoices.length === 0 && (
                                <Button
                                    disabled={!pendingPayments.length}
                                    onClick={() => setView('create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Crear Primera Factura
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredInvoices.map((invoice) => (
                                <div
                                    key={invoice.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors dark:bg-slate-900"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-semibold">{invoice.invoiceNumber}</h4>
                                            <Badge variant={
                                                invoice.status === 'paid' ? 'default' :
                                                    invoice.status === 'sent' ? 'secondary' : 'outline'
                                            }>
                                                {invoice.status === 'draft' ? 'Borrador' :
                                                    invoice.status === 'sent' ? 'Enviada' : 'Pagada'}
                                            </Badge>
                                        </div>

                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>
                                                {t("Customer")}: {invoice.recipient.name}
                                            </p>
                                            <p>
                                                {t("Date")}: {format(new Date(invoice.issueDate), 'dd/MM/yyyy', { locale: es })}
                                            </p>
                                            <p className="font-medium">
                                                {t("Amount")}: {invoice.total.toFixed(2)} €
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleViewInvoice(invoice)}
                                            title="Ver factura"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDownloadInvoice(invoice)}
                                            disabled={isGeneratingPDF === invoice.id}
                                            title="Descargar PDF"
                                        >
                                            {isGeneratingPDF === invoice.id ? (
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                                            ) : (
                                                <Download className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSendEmail(invoice)}
                                            disabled={isSendingEmail === invoice.id || !canSendInvoice(invoice)}
                                            title={canSendInvoice(invoice) ? "Enviar por email a Rapitecnic" : getSendButtonText(invoice)}
                                            className={
                                                canSendInvoice(invoice)
                                                    ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    : "text-gray-400 cursor-not-allowed"
                                            }
                                        >
                                            {isSendingEmail === invoice.id ? (
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
                                            ) : canSendInvoice(invoice) ? (
                                                <Mail className="h-4 w-4" />
                                            ) : (
                                                <CheckCircle className="h-4 w-4" />
                                            )}
                                        </Button>

                                        {/* Boton para eliminar factura */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            // Deshabilitado si la factura está pagada o enviada
                                            disabled={invoice.status === 'paid' || invoice.status === 'sent'}
                                            onClick={() => {
                                                const updatedInvoices = invoices.filter(inv => inv.id !== invoice.id);
                                                saveInvoices(updatedInvoices);
                                            }}
                                            title="Eliminar factura"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div >
    );
}