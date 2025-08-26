import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import {
    FileText,
    Download,
    Calculator,
    Building2,
    User,
    Calendar,
    Euro,
    AlertCircle,
    CheckCircle2,
    Plus,
    Trash2,
    ChevronRight
} from 'lucide-react';
// import { InvoiceData, InvoiceItem, UserProfile } from '../../types/invoice';
// import { InvoicePreview } from './InvoicePreview';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { InvoicePreview } from './InvoicePReview';
import { t } from 'i18next';
import { usePendingPaymentsStore } from '@/zustand/pendingPaymentsStore';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { formatCurrency } from '@/lib/utils';

export function InvoiceGenerator({ userProfile, pendingPayments = [], onInvoiceGenerated }) {

    const { pendingPaymentsDetails, fetchPendingPaymentsDetails } = usePendingPaymentsStore()

    // fetchPendingPaymentsDetails(
    //     userProfile?.invoicingAddressId,
    //     format(new Date(), 'MM'),
    //     format(new Date(), 'dd') <= 15 ? '1' : '2',
    //     'reparacion'
    // );

    console.log('Pending payments details:', pendingPaymentsDetails);

    // console.log('Pending payments:', pendingPayments);

    // console.log('User profile:', userProfile);

    const [currentStep, setCurrentStep] = useState('profile');
    const [profile, setProfile] = useState(userProfile || {
        name: '',
        taxName: '',
        nif: '',
        address: '',
        city: '',
        postalCode: '',
        province: '',
        email: '',
        phone: '',
        iban: '',
        isAutonomo: true,
        irpfRate: 15
    });

    const [invoice, setInvoice] = useState({
        // invoiceNumber: `FAC-${format(new Date(), 'yyyy-MM-dd')}-001`,
        invoiceNumber: ``,
        invoiceSeries: '',
        issueDate: format(new Date(), 'yyyy-MM-dd'),
        serviceDate: format(new Date(), 'yyyy-MM-dd'),
        issuer: {
            name: profile.name,
            taxName: profile.taxName || profile.name,
            nif: profile.nif,
            address: profile.address,
            city: profile.city,
            postalCode: profile.postalCode,
            province: profile.province,
            email: profile.email,
            phone: profile.phone,
            iban: profile.iban
        },
        recipient: {
            name: 'Rapitecnic S.L.',
            nif: 'B66443854',
            address: 'PLAZA DEL VAPOR, 9 - ESC C P 3 PTA. 6',
            city: 'Badalona',
            postalCode: '08915',
            province: 'Barcelona'
        },
        items: [],
        subtotal: 0,
        ivaRate: 21,
        ivaAmount: 0,
        irpfRate: profile.isAutonomo ? (profile.irpfRate || 15) : 0,
        irpfAmount: 0,
        total: 0,
        paymentMethod: 'Transferencia bancaria',
        paymentTerms: 'Pago a 30 días',
        notes: ''
    });

    // console.log('User profile', userProfile);

    // console.log('Invoice state:', invoice);

    const [isGenerating, setIsGenerating] = useState(false);
    const previewRef = useRef(null);

    // Auto-populate items from pending payments
    console.log('Pending payments:', pendingPayments);
    // React.useEffect(() => {
    //     if (pendingPayments.length > 0 && invoice.items.length === 0) {
    //         const items = pendingPayments.map((payment, index) => ({
    //             id: `item-${index + 1}`,
    //             description: `Servicios de ${payment.ServiceTypeName || 'reparación'} - ${payment.NoticeCount || 1} avisos`,
    //             quantity: payment.NoticeCount || 1,
    //             unitPrice: payment.TotalAmount / (payment.NoticeCount || 1),
    //             total: payment.TotalAmount,
    //             serviceType: payment.ServiceTypeName,
    //             noticeIds: [payment.NoticeID]
    //         }));

    //         setInvoice(prev => ({
    //             ...prev,
    //             items
    //         }));
    //     }
    // }, [pendingPayments]);

    React.useEffect(() => {
        const loadPaymentDetails = async () => {
            if (pendingPayments.length > 0 && invoice.items.length === 0) {
                // Crear un array para almacenar todos los detalles de los pagos
                let allPaymentDetails = [];

                // Para cada pago pendiente, obtener sus detalles
                for (const payment of pendingPayments) {
                    try {
                        const response = await fetch(
                            `${import.meta.env.VITE_API_URL}/noticeController/getPendingPaymentDetails?` +
                            `invoicingAddressId=${payment.Ex_InvoicingAddressID}&` +
                            `month=${payment.MES}&` +
                            `quincena=${payment.QUINCENA}&` +
                            `serviceType=${payment.ServiceTypeID}`
                        );

                        if (response.ok) {
                            const result = await response.json();
                            if (result.success && result.data) {
                                // Agregar los detalles a nuestro array
                                allPaymentDetails = [...allPaymentDetails, ...result.data];
                            }
                        }
                    } catch (error) {
                        console.error("Error fetching payment details:", error);
                    }
                }

                console.log('All payment details:', allPaymentDetails);

                // Agrupar los avisos por tipo de servicio
                const groupedByServiceType = allPaymentDetails.reduce((acc, item) => {
                    const key = item.ServiceTypeName || 'Sin especificar';
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(item);
                    return acc;
                }, {});

                // Crear los items de la factura a partir de los datos agrupados
                const items = Object.entries(groupedByServiceType).map(([serviceType, details], index) => {
                    const totalAmount = details.reduce((sum, item) => sum + parseFloat(item.TotalAmount || 0), 0);
                    const count = details.length;

                    return {
                        id: `item-${index + 1}`,
                        description: `Servicios de ${serviceType} - ${count} avisos`,
                        quantity: count,
                        unitPrice: totalAmount / count,
                        total: totalAmount,
                        serviceType: serviceType,
                        // Guardar los DocEntry en un array para referencia
                        noticeIds: details.map(item => item.Docentry),
                        // Guardar los detalles completos para mostrarlos si es necesario
                        detailedItems: details
                    };
                });

                setInvoice(prev => ({
                    ...prev,
                    items
                }));
            }
        };

        loadPaymentDetails();
    }, [pendingPayments]);

    // Calculate totals
    React.useEffect(() => {
        const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
        const ivaAmount = subtotal * (invoice.ivaRate / 100);
        const irpfAmount = subtotal * (invoice.irpfRate / 100);
        const total = Math.round(subtotal + ivaAmount - irpfAmount);

        setInvoice(prev => ({
            ...prev,
            subtotal,
            ivaAmount,
            irpfAmount,
            total
        }));
    }, [invoice.items, invoice.ivaRate, invoice.irpfRate]);

    const handleProfileSave = () => {
        setInvoice(prev => ({
            ...prev,
            issuer: {
                name: profile.name,
                taxName: profile.taxName || profile.name,
                nif: profile.nif,
                address: profile.address,
                city: profile.city,
                postalCode: profile.postalCode,
                province: profile.province,
                email: profile.email,
                phone: profile.phone,
                iban: profile.iban
            },
            irpfRate: profile.isAutonomo ? (profile.irpfRate || 15) : 0
        }));
        setCurrentStep('invoice');
    };

    const addInvoiceItem = () => {
        const newItem = {
            id: `item-${invoice.items.length + 1}`,
            description: '',
            quantity: 1,
            unitPrice: 0,
            total: 0
        };

        setInvoice(prev => ({
            ...prev,
            items: [...prev.items, newItem]
        }));
    };

    const updateInvoiceItem = (index, field, value) => {
        setInvoice(prev => {
            const newItems = [...prev.items];
            newItems[index] = {
                ...newItems[index],
                [field]: value
            };

            // Recalculate total for this item
            if (field === 'quantity' || field === 'unitPrice') {
                newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
            }

            return {
                ...prev,
                items: newItems
            };
        });
    };

    const removeInvoiceItem = (index) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const generatePDF = async () => {
        if (!previewRef.current) return;

        setIsGenerating(true);
        try {
            await generateInvoicePDF(invoice, previewRef.current);
            onInvoiceGenerated?.(invoice);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const validateProfile = () => {
        return profile.name && profile.nif && profile.address && profile.city && profile.postalCode && profile.province && profile.taxName && profile.iban
    };

    const validateInvoice = () => {
        return (
            invoice.invoiceNumber && // Verificar que hay un número de factura
            invoice.items.length > 0 &&
            invoice.items.every(item => item.description && item.quantity > 0 && item.unitPrice > 0)
        );
    };

    if (currentStep === 'profile') {
        return (
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <CardTitle>
                            {t("UserData")}
                        </CardTitle>
                    </div>
                    <CardDescription>
                        {/* Complete sus datos fiscales para generar facturas válidas según la normativa española */}
                        {t("UserDataDescription")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                {/* Nombre completo / Razón social * */}
                                {t("FullNameOrCompanyName")}
                            </Label>
                            <Input
                                id="name"
                                value={profile.taxName}
                                onChange={(e) => setProfile(prev => ({ ...prev, taxName: e.target.value }))}
                                placeholder="Juan Pérez García / Empresa S.L."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nif">NIF / CIF *</Label>
                            <Input
                                id="nif"
                                value={profile.nif}
                                onChange={(e) => setProfile(prev => ({ ...prev, nif: e.target.value.toUpperCase() }))}
                                placeholder="12345678A / B12345678"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">
                            {/* Dirección fiscal * */}
                            {t("FiscalAddress")}
                        </Label>
                        <Input
                            id="address"
                            value={profile.address}
                            onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                            placeholder="Calle, número, piso, puerta"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">
                                {t("City")} *</Label>
                            <Input
                                id="city"
                                value={profile.city}
                                onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                                placeholder="Madrid"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="postalCode">{t("ZipCode")} *</Label>
                            <Input
                                id="postalCode"
                                value={profile.postalCode}
                                onChange={(e) => setProfile(prev => ({ ...prev, postalCode: e.target.value }))}
                                placeholder="28001"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="province">{t("Province")} *</Label>
                            <Input
                                id="province"
                                value={profile.province}
                                onChange={(e) => setProfile(prev => ({ ...prev, province: e.target.value }))}
                                placeholder="Madrid"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="space-y-2">
                            <Label htmlFor="iban">
                                IBAN
                                <span className="text-sm text-muted-foreground"> *</span>
                            </Label>
                            <Input
                                id="iban"
                                value={profile.iban || ''}
                                onChange={(e) => setProfile(prev => ({ ...prev, iban: e.target.value }))}
                                placeholder="ES12 3456 7890 1234 5678 9012"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">{t("Phone")}</Label>
                            <Input
                                id="phone"
                                value={profile.phone || ''}
                                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                                placeholder="600 123 456"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isAutonomo"
                                checked={profile.isAutonomo}
                                onChange={(e) => setProfile(prev => ({ ...prev, isAutonomo: e.target.checked }))}
                                className="rounded border-gray-300"
                            />
                            <Label htmlFor="isAutonomo">
                                {t("SelfEmployedDescription")}

                            </Label>
                        </div>

                        {profile.isAutonomo && (
                            <div className="space-y-2">
                                <Label htmlFor="irpfRate">{t("IRPFRetention")} (%)</Label>
                                <Select
                                    value={profile.irpfRate?.toString()}
                                    onValueChange={(value) => setProfile(prev => ({ ...prev, irpfRate: parseInt(value) }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar porcentaje" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectItem value="7">7% - Actividades agrícolas, ganaderas y forestales</SelectItem> */}
                                        <SelectItem value="9">9% - Actividades empresariales en general</SelectItem>
                                        <SelectItem value="15">15% - Actividades profesionales</SelectItem>
                                        {/* <SelectItem value="18">18% - Actividades artísticas</SelectItem>
                                        <SelectItem value="21">21% - Actividades deportivas</SelectItem> */}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={handleProfileSave}
                            disabled={!validateProfile()}
                            className="min-w-32"
                        >
                            Continuar
                            <CheckCircle2 className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (currentStep === 'invoice') {
        return (
            <Card className="max-w-6xl mx-auto">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            <CardTitle>
                                Generar Factura
                            </CardTitle>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setCurrentStep('profile')}
                        >
                            {/* Editar Datos */}
                            {t("EditProfile")}
                        </Button>
                    </div>
                    <CardDescription>
                        {t("InvoiceDetailsDescription")}
                        {/* Complete los detalles de la factura. Los campos marcados con * son obligatorios por ley. */}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Invoice Header */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="invoiceNumber">Número de factura *</Label>
                            <Input
                                id="invoiceNumber"
                                value={invoice.invoiceNumber}
                                onChange={(e) => setInvoice(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                                placeholder="FAC-2025-001"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="invoiceSeries">Serie</Label>
                            <Input
                                id="invoiceSeries"
                                value={invoice.invoiceSeries || ''}
                                onChange={(e) => setInvoice(prev => ({ ...prev, invoiceSeries: e.target.value }))}
                                placeholder="A"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="issueDate">{t("ExpeditionDate")}</Label>
                            <Input
                                id="issueDate"
                                type="date"
                                value={invoice.issueDate}
                                onChange={(e) => setInvoice(prev => ({ ...prev, issueDate: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="serviceDate">
                            {t("ServiceDate")}
                        </Label>
                        <Input
                            id="serviceDate"
                            type="date"
                            value={invoice.serviceDate || ''}
                            onChange={(e) => setInvoice(prev => ({ ...prev, serviceDate: e.target.value }))}
                        />
                        <p className="text-sm text-muted-foreground">
                            {/* Solo necesario si es diferente a la fecha de expedición */}
                            {t("ServiceDateDescription")}
                        </p>
                    </div>

                    <Separator />

                    {/* Invoice Items */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                {t("ClosedServices")}
                            </h3>
                            {/* <Button
                                disabled
                                onClick={addInvoiceItem} variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Añadir servicio
                            </Button> */}
                        </div>

                        {invoice.items.map((item, index) => (
                            <Card key={item.id} className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                    {/* <div className="md:col-span-5 space-y-2">
                                        <Label>
                                            {t("ClosedServicesDescription")}
                                        </Label>
                                        <Textarea
                                            value={item.description}
                                            onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                                            placeholder="Descripción detallada del servicio realizado"
                                            rows={2}
                                        />
                                    </div> */}
                                    <div className="md:col-span-5 space-y-2">
                                        <Label>
                                            {t("ClosedServicesDescription")}
                                        </Label>
                                        <Textarea
                                            value={item.description}
                                            onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                                            placeholder="Descripción detallada del servicio realizado"
                                            rows={2}
                                        />

                                        {/* Añadimos la información de los DocEntry */}
                                        {item.noticeIds && item.noticeIds.length > 0 && (
                                            <div className="mt-2">
                                                <Collapsible>
                                                    <CollapsibleTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="flex items-center p-0 h-auto">
                                                            <ChevronRight className="h-4 w-4 mr-1" />
                                                            <span className="text-xs text-muted-foreground">
                                                                Ver {item.noticeIds.length} avisos
                                                            </span>
                                                        </Button>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-1">
                                                            {item.detailedItems && item.detailedItems.map(detail => (
                                                                <div key={detail.Docentry} className="text-xs flex justify-between">
                                                                    <span className="font-medium">Nº aviso {detail.Docentry}</span>
                                                                    <span>{formatCurrency(detail.TotalAmount)}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label>
                                            {t("Quantity")}
                                        </Label>
                                        <Input
                                            disabled
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateInvoiceItem(index, 'quantity', parseInt(e.target.value) || 1)}
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label>{t("UnitPrice")} (€)</Label>
                                        <Input
                                            disabled
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={item.unitPrice}
                                            onChange={(e) => updateInvoiceItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="truncate">Total (€)</Label>
                                        <Input
                                            value={item.total.toFixed(2)}
                                            disabled
                                            className="bg-gray-50 dark:bg-slate-900"
                                        />
                                    </div>

                                    {/* <div className="md:col-span-1">
                                        <Button
                                            disabled
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeInvoiceItem(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div> */}
                                </div>
                            </Card>
                        ))}

                        {invoice.items.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No hay servicios añadidos</p>
                                <p className="text-sm">Haga clic en "Añadir servicio" para comenzar</p>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Tax Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">{t("FiscalInfo")}</h3>

                            <div className="space-y-2">
                                <Label htmlFor="ivaRate">{t("TaxType")} (%)</Label>
                                <Select
                                    value={invoice.ivaRate.toString()}
                                    onValueChange={(value) => setInvoice(prev => ({ ...prev, ivaRate: parseInt(value) }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectItem value="0">0% - Exento</SelectItem>
                                        <SelectItem value="4">4% - Tipo superreducido</SelectItem>
                                        <SelectItem value="10">10% - Tipo reducido</SelectItem> */}
                                        <SelectItem value="21">21% - General</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {profile.isAutonomo && (
                                <div className="space-y-2">
                                    <Label>{t("IRPFSelect")} (%)</Label>
                                    <Input
                                        value={invoice.irpfRate}
                                        disabled
                                        className="bg-gray-50"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Configurado en sus datos de perfil
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">{t("Resume")}</h3>

                            <div className="space-y-2 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>{invoice.subtotal.toFixed(2)} €</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>IVA ({invoice.ivaRate}%):</span>
                                    <span>{invoice.ivaAmount.toFixed(2)} €</span>
                                </div>

                                {invoice.irpfAmount > 0 && (
                                    <div className="flex justify-between text-red-600">
                                        <span>Retención IRPF ({invoice.irpfRate}%):</span>
                                        <span>-{invoice.irpfAmount.toFixed(2)} €</span>
                                    </div>
                                )}

                                <Separator />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>{invoice.total.toFixed(2)} €</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Payment Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="paymentMethod">
                                {t("PaymentMethod")}
                            </Label>
                            <Select
                                value={invoice.paymentMethod}
                                onValueChange={(value) => setInvoice(prev => ({ ...prev, paymentMethod: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Transferencia bancaria">Transferencia bancaria</SelectItem>
                                    {/* <SelectItem value="Efectivo">Efectivo</SelectItem>
                                    <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                                    <SelectItem value="Cheque">Cheque</SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="paymentTerms">
                                {t("PaymentCOnditions")}
                            </Label>
                            <Select
                                value={invoice.paymentTerms}
                                onValueChange={(value) => setInvoice(prev => ({ ...prev, paymentTerms: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* <SelectItem value="Pago al contado">Pago al contado</SelectItem> */}
                                    <SelectItem value="Pago a 15 días">Pago a 15 días</SelectItem>
                                    <SelectItem value="Pago a 30 días">Pago a 30 días</SelectItem>
                                    {/* <SelectItem value="Pago a 60 días">Pago a 60 días</SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">
                            {t("Observations")}
                        </Label>
                        <Textarea
                            id="notes"
                            value={invoice.notes || ''}
                            onChange={(e) => setInvoice(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Información adicional, condiciones especiales, etc."
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentStep('profile')}
                        >
                            {/* Volver */}
                            {t("Back")}
                        </Button>

                        <Button
                            onClick={() => setCurrentStep('preview')}
                            disabled={!validateInvoice()}
                            className="min-w-32"
                        >
                            Vista previa
                            <FileText className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            <CardTitle>Vista previa de la factura</CardTitle>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentStep('invoice')}
                            >
                                Editar
                            </Button>
                            <Button
                                onClick={generatePDF}
                                disabled={isGenerating}
                                className="min-w-32"
                            >
                                {isGenerating ? (
                                    <>Generando...</>
                                ) : (
                                    <>
                                        <Download className="mr-2 h-4 w-4" />
                                        Crear Factura
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                    <CardDescription>
                        {/* Revise todos los datos antes de generar la factura final */}
                        {t("InvoicePreviewDesc")}
                    </CardDescription>
                </CardHeader>
            </Card>

            <div ref={previewRef}>
                <InvoicePreview invoice={invoice} />
            </div>
        </div>
    );
}