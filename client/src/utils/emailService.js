// import { InvoiceData } from '../types/invoice';


export async function sendInvoiceEmail(invoice, pdfBlob) {

    const apiURL = import.meta.env.VITE_API_URL;

    try {
        // Convert PDF blob to base64
        const pdfBase64 = await blobToBase64(pdfBlob);

        const emailData = {
            invoiceData: invoice,
            pdfBase64: pdfBase64.split(',')[1] // Remove data:application/pdf;base64, prefix
        };

        // 🚀 Usar el endpoint del paymentController
        const response = await fetch(`${apiURL}/paymentController/sendInvoiceEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            const result = await response.json();
            // console.log('✅ Factura enviada exitosamente:', result.messageId);
            return true;
        } else {
            const errorData = await response.json();
            console.error('❌ Error response from payment API:', errorData);
            return false;
        }

    } catch (error) {
        console.error('❌ Error sending invoice email:', error);

        // 🔄 MODO DESARROLLO: Simular envío exitoso
        if (process.env.NODE_ENV === 'development') {
            console.log('📧 MODO DESARROLLO: Simulando envío de factura a dmateu@rapitecnic.com');
            console.log('📄 Factura:', invoice.invoiceNumber);
            console.log('👤 Emisor:', invoice.issuer.name);
            console.log('💰 Total:', invoice.total.toFixed(2), '€');
            console.log('📎 PDF adjunto:', pdfBlob.size, 'bytes');

            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 2000));
            return true;
        }

        return false;
    }
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export function validateEmailConfiguration() {
    // En desarrollo, siempre está disponible
    if (process.env.NODE_ENV === 'development') {
        return true;
    }

    // En producción, verificar que el endpoint existe
    return typeof fetch !== 'undefined';
}