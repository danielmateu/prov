import sql from 'mssql';
import nodemailer from 'nodemailer';

const NoticesController = {};

// Implementar WebSocket para actualizaciones en tiempo real
let io = null;

export const setSocketIO = (socketInstance) => {
    io = socketInstance;
};

// Función para notificar cambios a clientes conectados
const notifyPaymentChange = (changeType, data) => {
    if (io) {
        io.emit('paymentUpdate', {
            type: changeType,
            data,
            timestamp: new Date().toISOString()
        });
    }
};

const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

/**
 * Update the wallet balance for a specific invoicing address
 * by adding the TotalAmount from ex_GetPendingPayments
 * 
 * @param {number} externalInvoicingAddressID - The ID of the invoicing address to update
 */
async function updateWalletBalance(externalInvoicingAddressID) {
    try {
        console.log(`Updating wallet balance for invoicing address ID: ${externalInvoicingAddressID}`);

        const request = new sql.Request();
        request.input('invoicingAddressID', sql.Int, externalInvoicingAddressID);

        // Get the TotalAmount from ex_GetPendingPayments for this invoicing address
        const pendingPaymentsQuery = `
            SELECT TotalAmount 
            FROM ex_GetPendingPayments 
            WHERE Ex_InvoicingAddressID = @invoicingAddressID`;

        const pendingPaymentsResult = await request.query(pendingPaymentsQuery);

        // Calculate the total by summing individual amounts
        const totalPendingAmount = pendingPaymentsResult.recordset.reduce((sum, record) => {
            return sum + (record.TotalAmount || 0);
        }, 0);

        console.log(`Total pending amount for ID ${externalInvoicingAddressID}: ${totalPendingAmount}`);

        // Set the wallet value to the current total amount
        const updateWalletQuery = `
            UPDATE Ex_InvoicingAddress 
            SET wallet = @totalPendingAmount 
            WHERE Ex_InvoicingAddressID = @invoicingAddressID`;

        request.input('totalPendingAmount', sql.Decimal(18, 2), totalPendingAmount);

        const updateResult = await request.query(updateWalletQuery);
        console.log(`Wallet updated for invoicing address ID: ${externalInvoicingAddressID}. Rows affected: ${updateResult.rowsAffected[0]}`);

        return updateResult.rowsAffected[0] > 0;
    } catch (error) {
        console.error(`Error updating wallet balance for ID ${externalInvoicingAddressID}:`, error);
        throw error;
    }
}

const sendNoticeCreationEmail = async (userInfo, noticeDetails) => {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: userInfo.Email,
        subject: 'Confirmación de Creación de Aviso - Rapitecnic',
        html: `
            <h1>Confirmación de Aviso</h1>
            <p>Hola ${userInfo.Name},</p>
            <p>Tu aviso ha sido creado exitosamente.</p>
            <h2>Detalles del Aviso:</h2>
            <ul>
                <li>Cliente: ${noticeDetails.customerName}</li>
                <li>Teléfono: ${noticeDetails.customerPhone || noticeDetails.customerCell || 'No proporcionado'}</li>
                <li>Dirección: ${noticeDetails.customerAddress || 'No proporcionada'}</li>
                <li>Aparato: ${noticeDetails.apparatusName || 'No especificado'}</li>
                <li>Marca: ${noticeDetails.brandName || 'No especificada'}</li>
                <li>Fecha de creación: ${new Date(noticeDetails.createDate).toLocaleDateString()}</li>
            </ul>
            <p>Nos pondremos en contacto con tu cliente a la mayor brevedad para coordinar la visita técnica.</p>
            <p>Puedes consultar el estado de este aviso en cualquier momento desde tu panel de control.</p>
            <br>
            <p>Gracias por confiar en Rapitecnic.</p>
            <p>Saludos,</p>
            <p>El equipo de Rapitecnic</p>
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333;">
                <tr>
                    <td style="padding-right: 15px; vertical-align: top;">
                        <div style="display: flex; flex-direction: column;">
                            <div style="margin-bottom: 4px;">
                                <span style="color: #000; font-size: 28px; font-weight: bold; letter-spacing: 1px; font-family: Arial, sans-serif;">
                                    RAPI<span style="color: #8B008B;">TECNIC</span>
                                </span>
                            </div>
                            <div>
                                <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; display: block;">
                                    Servicio Técnico Integral
                                </span>
                            </div>
                        </div>
                    </td>
                    <td style="vertical-align: top; border-left: 2px solid #ddd; padding-left: 15px;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="font-weight: bold; font-size: 16px; color: #333; padding-bottom: 5px;">
                                    Atención al Cliente
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 3px;">
                                    <strong>Correo:</strong> 
                                    <a href="mailto:atencion@rapitecnic.com" style="color: #8B008B; text-decoration: none;">
                                        atencion@rapitecnic.com
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 10px;">
                                    <strong>Web:</strong> 
                                    <a href="https://www.rapitecnic.com" style="color: #8B008B; text-decoration: none;">
                                        www.rapitecnic.com
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 15px;">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="vertical-align: middle;">
                                                <span style="color: #fbbc04; font-size: 16px;">★★★★★</span>
                                                <span style="color: #666; font-size: 14px; margin-left: 4px;">Google Reviews</span>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top: 15px; border-top: 1px solid #eee; font-size: 11px; color: #666; line-height: 1.3;">
                        Este mensaje y sus posibles anexos son confidenciales y están exclusivamente dirigidos a las personas a quienes va dirigido. 
                        Si usted no es el destinatario de este mensaje, no está permitido leerlo, copiarlo, distribuirlo o comunicarlo, 
                        y le rogamos que proceda a destruirlo inmediatamente y comunique tal circunstancia. 
                        Su uso por persona distinta del destinatario está prohibido y puede ser ilegal. Asimismo le informamos que la entidad remitente 
                        de este correo, cuyos datos de contacto figuran en la firma del mismo, para atender a su solicitud, consulta o 
                        comunicación con nuestros servicios, tratará sus datos de carácter personal de acuerdo con lo dispuesto en la normativa 
                        aplicable a <a href="mailto:info@rapitecnic.com" style="color: #8B008B; text-decoration: none;">info@rapitecnic.com</a>. 
                        En caso de que se hayan facilitado los datos personales de un tercero, es responsabilidad suya informar a los mismos de haber obtenido 
                        <a href="#" style="color: #8B008B; text-decoration: none;">consentimiento</a> previo de esa persona para que sean tratados 
                        sus datos por nosotros. Puede consultar información adicional sobre privacidad en 
                        <a href="https://rapitecnic.com/privacidad/" style="color: #8B008B; text-decoration: none;">
                            https://rapitecnic.com/privacidad/
                        </a>
                    </td>
                </tr>
            </table>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email de confirmación de aviso enviado a:', userInfo.Email);
    } catch (error) {
        console.error('Error al enviar email de confirmación de aviso:', error);
        throw error;
    }
};

// Función para enviar email de confirmación de reclamación
const sendClaimRequestMail = async (customerData, claimDetails, noticeDetails) => {
    // Formatear fecha y hora de la reclamación
    const reclamationDateTime = new Date(claimDetails.createdDate).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', '');

    // Formatear fecha de finalización del aviso (igual a la fecha de factura)
    const closingDate = noticeDetails.closingDate ?
        new Date(noticeDetails.closingDate).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) : 'No disponible';

    const mailOptions = {
        from: process.env.SMTP_FROM,
        // to: "llamadasperdidas@rapitecnic.com",
        to: "dmateu@rapitecnic.com",
        // cc: "dmateu@rapitecnic.com",
        // cc: customerData.Email ? [customerData.Email] : [],
        subject: `Nueva Reclamación ${noticeDetails.docEntry}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .header { background-color: #00A7E1; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; }
                    .info-section { background-color: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 5px; }
                    .info-title { font-weight: bold; color: #00A7E1; margin-bottom: 10px; }
                    .highlight { background-color: #fffde7; padding: 10px; border-left: 4px solid #ffd600; }
                    .footer { background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; }
                    ul { padding-left: 20px; }
                    li { margin-bottom: 5px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>📋 Nueva Reclamación ${noticeDetails.docEntry}</h1>
                </div>
                
                <div class="content">
                    <div class="info-section">
                        <div class="info-title">👤 Cliente</div>
                        <p><strong>${customerData.Name} ${customerData.Surname || ''} ${customerData.SecondSurname || ''}</strong></p>
                        <p>Tlf: ${customerData.Phone || 'No disponible'} / Mvl: ${customerData.Cell || 'No disponible'}</p>
                        <p>Email: ${customerData.Email || 'No proporcionado'}</p>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">📅 Información temporal</div>
                        <ul>
                            <li><strong>Día y hora de la reclamación:</strong> ${reclamationDateTime}h</li>
                            <li><strong>Fecha finalización aviso:</strong> ${closingDate}</li>
                        </ul>
                        <div class="highlight">
                            <p><strong>Recordatorio:</strong> La garantía es de 6 meses y solo aplica si la avería es la misma y no proviene de un uso indebido del cliente. Limpiezas, mantenimientos y similares no tienen garantía.</p>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">🔧 Información del Aparato</div>
                        <ul>
                            <li><strong>Aparato:</strong> ${noticeDetails.apparatusName || 'No especificado'}</li>
                            <li><strong>Marca:</strong> ${noticeDetails.brandName || 'No especificada'}</li>
                            <li><strong>Modelo:</strong> ${noticeDetails.modelName || 'No especificado'}</li>
                            <li><strong>Número de Aviso:</strong> ${noticeDetails.docEntry}</li>
                        </ul>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">📝 Motivos de llamada</div>
                        <ul>
                            <li><strong>Motivo 1ª llamada:</strong> ${noticeDetails.observation || 'No especificado'}</li>
                        </ul>
                    </div>

                    <div class="info-section">
                        <div class="info-title">🛠️ Comentarios del técnico</div>
                        <p>${noticeDetails.technicalObservation || 'No hay comentarios de técnicos disponibles'}</p>
                    </div>

                    <div class="info-section">
                        <div class="info-title">📄 Detalles de la reclamación</div>
                        <div style="background-color: white; padding: 15px; border-left: 4px solid #00A7E1; margin-top: 10px;">
                            ${claimDetails.description}
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">⚡ Acciones Requeridas</div>
                        <ul>
                            <li>Revisar los detalles de la reclamación</li>
                            <li>Contactar al cliente en menos de 24 horas</li>
                            <li>Verificar el historial del aviso y la garantía aplicable</li>
                            <li>Actualizar el estado de la reclamación en el sistema</li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer">
                    