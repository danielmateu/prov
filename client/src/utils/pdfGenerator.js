
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import { InvoiceData } from '../types/invoice';

export async function generateInvoicePDF(invoice, element) {
    try {
        // Create canvas from HTML element
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        });

        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        // Add first page
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if needed
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Generate filename
        const filename = `Factura_${invoice.invoiceNumber.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

        // Save PDF
        pdf.save(filename);

        return filename;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('No se pudo generar el PDF. Por favor, inténtelo de nuevo.');
    }
}

export async function generateInvoicePDFBlob(invoice, element) {
    try {
        // Create canvas from HTML element
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        });

        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        // Add first page
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if needed
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Return as blob instead of saving
        return pdf.output('blob');
    } catch (error) {
        console.error('Error generating PDF blob:', error);
        throw new Error('No se pudo generar el PDF. Por favor, inténtelo de nuevo.');
    }
}

export function validateInvoiceData(invoice) {
    const errors = [];

    // Required fields validation
    if (!invoice.invoiceNumber) errors.push('Número de factura es obligatorio');
    if (!invoice.issueDate) errors.push('Fecha de expedición es obligatoria');

    // Issuer validation
    if (!invoice.issuer.name) errors.push('Nombre del emisor es obligatorio');
    if (!invoice.issuer.nif) errors.push('NIF del emisor es obligatorio');
    if (!invoice.issuer.address) errors.push('Dirección del emisor es obligatoria');
    if (!invoice.issuer.city) errors.push('Ciudad del emisor es obligatoria');
    if (!invoice.issuer.postalCode) errors.push('Código postal del emisor es obligatorio');
    if (!invoice.issuer.province) errors.push('Provincia del emisor es obligatoria');

    // Recipient validation
    if (!invoice.recipient.name) errors.push('Nombre del destinatario es obligatorio');
    if (!invoice.recipient.nif) errors.push('NIF del destinatario es obligatorio');
    if (!invoice.recipient.address) errors.push('Dirección del destinatario es obligatoria');

    // Items validation
    if (invoice.items.length === 0) errors.push('Debe incluir al menos un servicio');

    invoice.items.forEach((item, index) => {
        if (!item.description) errors.push(`Descripción del servicio ${index + 1} es obligatoria`);
        if (item.quantity <= 0) errors.push(`Cantidad del servicio ${index + 1} debe ser mayor a 0`);
        if (item.unitPrice <= 0) errors.push(`Precio unitario del servicio ${index + 1} debe ser mayor a 0`);
    });

    // NIF format validation (basic)
    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    const cifRegex = /^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/i;

    if (invoice.issuer.nif && !nifRegex.test(invoice.issuer.nif) && !cifRegex.test(invoice.issuer.nif)) {
        errors.push('Formato de NIF/CIF del emisor no válido');
    }

    if (invoice.recipient.nif && !nifRegex.test(invoice.recipient.nif) && !cifRegex.test(invoice.recipient.nif)) {
        errors.push('Formato de NIF/CIF del destinatario no válido');
    }

    return errors;
}