import sql from 'mssql';
import nodemailer from 'nodemailer';

const NoticesController = {};

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
                    <p>Este email fue generado automáticamente por el sistema de gestión de reclamaciones de Rapitecnic.</p>
                    <p>Fecha de envío: ${new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}</p>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email de confirmación de reclamación enviado a:', mailOptions.to);
        if (customerData.Email) {
            console.log('Copia enviada al cliente:', customerData.Email);
        }
        return { success: true, message: 'Email enviado correctamente' };
    } catch (error) {
        console.error('Error al enviar email de confirmación de reclamación:', error);
        throw error;
    }
};

const sendAccountingClaimEmail = async (claimDetails) => {
    if (!claimDetails) {
        console.error('Error: claimDetails es undefined');
        return { success: false, message: 'Datos de reclamación no proporcionados' };
    }

    // Generar un ID si no existe
    const claimId = claimDetails.id || `ACC-CLAIM-${Date.now()}`;
    const description = claimDetails.description || 'No se proporcionó descripción';
    const customerName = claimDetails.customerName || 'No especificado';

    const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@rapitecnic.com',
        to: 'dmateu@rapitecnic.com',
        subject: 'Solicitud modificación - Contabilidad',
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
                    table { border-collapse: collapse; width: 100%; margin: 15px 0; }
                    th { background-color: #f2f2f2; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>📝 Solicitud modificación - Contabilidad</h1>
                </div>
                
                <div class="content">
                    <div class="info-section">
                        <div class="info-title">🆔 Información de la Solicitud</div>
                        <ul>
                            <li><strong>Cliente:</strong> ${customerName}</li>
                            <li><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}</li>
                            <li><strong>Documento de entrada:</strong> ${claimDetails.docEntry || 'No especificado'}</li>
                            <li><strong>Solicitado por:</strong> ${claimDetails.requestedBy || 'No especificado'}</li>
                        </ul>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">📄 Detalles de la Solicitud</div>
                        <div class="highlight">
                            <p><strong>Campo a modificar:</strong> ${claimDetails.fieldLabel || 'No especificado'}</p>
                            <p><strong>Valor actual:</strong> ${claimDetails.currentValue || 'No especificado'}</p>
                            <p><strong>Nuevo valor:</strong> <strong>${claimDetails.newValue || 'No especificado'}</strong></p>
                            <p><strong>Motivo:</strong> <em>${claimDetails.reason || 'No especificado'}</em></p>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">📝 Descripción</div>
                        <div style="background-color: white; padding: 15px; border-left: 4px solid #00A7E1; margin-top: 10px;">
                            ${description}
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Este email fue generado automáticamente por el sistema de gestión de reclamaciones contables de Rapitecnic.</p>
                    <p>Fecha de envío: ${new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}</p>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email de reclamación de contabilidad enviado a:', mailOptions.to);
        return { success: true, message: 'Email enviado correctamente' };
    } catch (error) {
        console.error('Error al enviar email de reclamación de contabilidad:', error);
        return { success: false, message: 'Error al enviar email', error: error.message };
    }
};

const sendBulkModificationEmail = async (claimDetails) => {
    if (!claimDetails || !claimDetails.modifications) {
        console.error('Error: Datos de modificaciones no proporcionados');
        return { success: false, message: 'Datos de modificaciones no proporcionados' };
    }

    const customerName = claimDetails.customerData ?
        `${claimDetails.customerData.Name} ${claimDetails.customerData.Surname}` :
        'Cliente no especificado';

    const modificationsCount = claimDetails.modifications.length;

    // Generar tabla HTML con todas las modificaciones
    let modificationsTableRows = '';
    claimDetails.modifications.forEach(mod => {
        modificationsTableRows += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${mod.fieldLabel}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${mod.currentValue || '—'}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold;">${mod.newValue}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; font-style: italic;">${mod.reason}</td>
            </tr>
        `;
    });

    const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@rapitecnic.com',
        to: 'dmateu@rapitecnic.com',
        subject: `Solicitud modificación múltiple: ${modificationsCount} campos para ${customerName}`,
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
                    table { border-collapse: collapse; width: 100%; margin: 15px 0; }
                    th { background-color: #f2f2f2; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🔄 Solicitud de Modificación Múltiple</h1>
                </div>
                
                <div class="content">
                    <div class="info-section">
                        <div class="info-title">👤 Información del Cliente</div>
                        <p><strong>ID Cliente:</strong> ${claimDetails.customerID}</p>
                        <p><strong>Nombre:</strong> ${customerName}</p>
                        <p><strong>Solicitado por:</strong> ${claimDetails.requestedBy || 'No especificado'}</p>
                        <p><strong>Fecha de solicitud:</strong> ${new Date(claimDetails.requestDate).toLocaleString('es-ES')}</p>
                        ${claimDetails.docEntry ?
                `<p><strong>Aviso relacionado:</strong> ${claimDetails.docEntry}</p>` :
                '<p><strong>Modificación general de cliente</strong></p>'
            }
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">📋 Modificaciones Solicitadas (${modificationsCount})</div>
                        <div class="highlight">
                            <p>Se han solicitado cambios en <strong>${modificationsCount} campos</strong> para este cliente.</p>
                        </div>
                        
                        <table style="width:100%; border-collapse: collapse; margin-top: 15px;">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Campo</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Valor Actual</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Nuevo Valor</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Razón</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${modificationsTableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Este email fue generado automáticamente por el sistema de gestión de reclamaciones contables.</p>
                    <p>Fecha de envío: ${new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email de modificación múltiple enviado a:', mailOptions.to);
        return { success: true, message: 'Email enviado correctamente' };
    } catch (error) {
        console.error('Error al enviar email de modificación múltiple:', error);
        return { success: false, message: 'Error al enviar email', error: error.message };
    }
};

const sendConsultationEmail = async (consultationDetails) => {
    if (!consultationDetails) {
        console.error('Error: consultationDetails es undefined');
        return { success: false, message: 'Datos de consulta no proporcionados' };
    }

    const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@rapitecnic.com',
        to: 'dmateu@rapitecnic.com',
        subject: `Nueva consulta - ${consultationDetails.topic || 'General'}`,
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
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>❓ Nueva Consulta</h1>
                </div>
                
                <div class="content">
                    <div class="info-section">
                        <div class="info-title">👤 Datos del Cliente</div>
                        <ul>
                            <li><strong>Cliente:</strong> ${consultationDetails.customerName || 'No especificado'}</li>
                            <li><strong>ID Cliente:</strong> ${consultationDetails.customerID || 'No especificado'}</li>
                            <li><strong>Contacto:</strong> ${consultationDetails.searchValue || 'No proporcionado'}</li>
                            <li><strong>Método de contacto preferido:</strong> ${consultationDetails.contactMethod || 'No especificado'}</li>
                        </ul>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">📋 Detalles de la Consulta</div>
                        <div class="highlight">
                            <p><strong>Solicitado por:</strong> ${consultationDetails.requestedBy || 'No especificado'}</p>
                            <p><strong>Fecha de solicitud:</strong> ${new Date(consultationDetails.requestDate).toLocaleString('es-ES')}</p>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">📝 Descripción</div>
                        <div style="background-color: white; padding: 15px; border-left: 4px solid #00A7E1; margin-top: 10px;">
                            ${consultationDetails.description || 'No se proporcionó descripción'}
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Este email fue generado automáticamente por el sistema de gestión de consultas de Rapitecnic.</p>
                    <p>Fecha de envío: ${new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}</p>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email de consulta enviado a:', mailOptions.to);
        return { success: true, message: 'Email enviado correctamente' };
    } catch (error) {
        console.error('Error al enviar email de consulta:', error);
        return { success: false, message: 'Error al enviar email', error: error.message };
    }
};

NoticesController.getLeadSuppliers = async (req, res) => {
    try {
        const query = `Select 
            LeadSuppliers.Name, 
            LeadSuppliers.LeadSupplierID AS ID
        From LeadSuppliers
        Where LeadSuppliers.CompanyID =  1  AND LeadSuppliers.LeadActive =  'Y'  Order By LeadSuppliers.Name`

        const result = await sql.query(query)
        const LeadSuppliers = result.recordset

        res.json(LeadSuppliers)
    } catch (err) {
        console.error(err);  // Para poder ver el error detallado en la consola del servidor
        res.status(400).json({ message: "No ha sido posible obtener los proveedores" })
    }
};

NoticesController.getStatus = async (req, res) => {
    try {
        const query = `Select Status.Name, Status.StatusID AS ID, Status.RequiredFields, GroupID, GroupName
                        From Status
                        Where Status.CallCenterFilter =  1
                        Order By Status.StatusID`

        const result = await sql.query(query)
        const Status = result.recordset

        res.json(Status)
    } catch (err) {
        res.status(400).json({ message: "No ha sido posible obtener los estados" })
    }
};

NoticesController.getReasons = async (req, res) => {
    try {
        const query = `Select Reason, ReasonID
        from Reasons
        where StatusID = 20
        `
        const result = await sql.query(query)
        const Reasons = result.recordset

        res.json(Reasons)
    } catch (error) {
        res.status(400).json({ message: "No ha sido posible obtener las razones" })
    }
}

NoticesController.getBrands = async (req, res) => {
    try {
        const query = `Select Brands.Name, Brands.BrandID AS ID, Brands.UrlLogo
                        From Brands 
                        Order By Brands.Name`

        const result = await sql.query(query)
        const Brands = result.recordset

        res.json(Brands)
    } catch (err) {
        res.status(400).json({ message: "No ha sido posible obtener las marcas" })
    }
};

NoticesController.getApparatus = async (req, res) => {
    try {
        const checkProductfamily = req.query.checkProductfamily === 'true';

        if (checkProductfamily) {
            const query = `SELECT Apparatus.Name, Apparatus.ApparatusID AS ID
            FROM Apparatus WHERE ProductFamilyID = 10 AND ApparatusID <> 35 ORDER BY Apparatus.Name`

            const result = await sql.query(query)
            const Apparatus = result.recordset

            res.json(Apparatus)
        } else {
            const query = `SELECT Apparatus.Name, Apparatus.ApparatusID AS ID
            FROM Apparatus WHERE ProductFamilyID NOT IN (10) ORDER BY Apparatus.Name`

            const result = await sql.query(query)
            const Apparatus = result.recordset

            res.json(Apparatus)
        }
    } catch (err) {
        res.status(400).json({ message: "No ha sido posible obtener los aparatos" })
    }
};

NoticesController.getTypes = async (req, res) => {
    const { apparatusID } = req.query

    try {
        const query = `select 
                Types.TYPE AS Name, 
                Types.TypeID AS ID
            from Types
            where Types.ApparatusID = ${apparatusID}
            ORDER BY Types.TYPE
        `
        const result = await sql.query(query)

        if (result.recordset.length > 0) {
            const Type = result.recordset

            res.json(Type)
        } else {
            res.json([])
        }

    } catch (err) {
        res.status(400).json({ message: "No ha sido posible obtener los tipos" })
    }
};

NoticesController.getPrefixes = async (req, res) => {
    try {
        const query = `Select 
                            PhoneCodes.CountryName, 
                            PhoneCodes.PhoneCodesID 
                        From PhoneCodes 
                        Order By PhoneCodes.CountryName
        `
        const result = await sql.query(query)
        const questions0 = result.recordset
        res.json({ questions0 })
    } catch (err) {
        res.status(400).json({ message: "No ha sido posible obtener los prefijos" })
    }
};

NoticesController.getCustomer = async (req, res) => {
    const { cell } = req.body
    try {
        const query = `
            SELECT Customers.CustomerID
            FROM Customers
            WHERE Customers.Cell = '${cell}' OR Customers.Phone = '${cell}'`

        const result = await sql.query(query)
        if (result.recordset.length == 0) {
            res.send('Cliente no encontrado')
        } else {
            const customer = result.recordset[0]
            res.json({ customer })
        }

    } catch (err) {
        res.status(400).json({ message: "error al consultar cliente" })
    }
};

// getCustomersByExternaID
NoticesController.getCustomersByExternalID = async (req, res) => {
    const { externalID } = req.params;

    return res.status(200).json({ message: `${externalID}` })

    if (!externalID) {
        return res.status(400).json({ message: "ID externo no proporcionado", customers: [] });
    }

    try {
        const query = `
            SELECT Customers.CustomerID, Customers.Name, Customers.Cell, Customers.Phone, Customers.Address, Customers.City, Customers.ZipCode, Customers.Email
            FROM Customers
            WHERE Customers.EnteredBy = '${externalID}'`;

        const result = await sql.query(query);

        if (result.recordset.length === 0) {
            // Devolver un array vacío en lugar de un mensaje de texto
            return res.status(200).json([]);
        } else {
            res.status(200).json(result.recordset);
        }

    } catch (err) {
        // Devolver un objeto de error en formato JSON
        res.status(400).json({ message: "Error al consultar clientes", error: err.message });
    }
}

NoticesController.getDataCustomer = async (req, res) => {
    const { cell, invoiceNumber, docEntry } = req.query
    try {
        let dataCustomer = null;
        // let deliveryAddress = null;

        // Si se proporciona un número de teléfono
        if (cell) {
            dataCustomer = (await sql.query(`
                SELECT *
                FROM Customers
                WHERE Cell = '${cell}' OR Phone = '${cell}'`)).recordset[0];
        }

        // Si se proporciona un número de factura
        else if (invoiceNumber) {
            // Primero obtenemos el CustomerID asociado a esa factura
            const customerIdResult = (await sql.query(`
                SELECT CustomerID 
                FROM InvoiceHeader 
                WHERE InternalInvoiceNumber = '${invoiceNumber}'`)).recordset[0];

            if (customerIdResult) {
                const customerId = customerIdResult.CustomerID;

                // Luego obtenemos los datos del cliente
                dataCustomer = (await sql.query(`
                    SELECT *
                    FROM Customers
                    WHERE CustomerID = ${customerId}`)).recordset[0];
            }
        }

        else if (docEntry) {
            // console.log("Buscando por DocEntry:", docEntry);
            // Primero obtenemos el CustomerID asociado a ese aviso
            const customerIdResult = (await sql.query(`
                SELECT CustomerID 
                FROM NoticeHeader 
                WHERE DocEntry = ${docEntry}`)).recordset[0];

            // console.log("Resultado de búsqueda por DocEntry:", customerIdResult);

            if (customerIdResult) {
                const customerId = customerIdResult.CustomerID;

                // Luego obtenemos los datos del cliente
                dataCustomer = (await sql.query(`
                    SELECT *
                    FROM Customers
                    WHERE CustomerID = ${customerId}`)).recordset[0];
            }
        }

        // Si no se encontró el cliente
        if (!dataCustomer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.status(200).json({ dataCustomer });
    } catch (err) {
        console.error("Error al consultar cliente:", err);
        res.status(400).json({ message: "Error al consultar cliente", error: err.message });
    }
};

NoticesController.createCustomer = async (req, res) => {
    const { customer } = req.body;
    const customerCoordinates = `${customer.lat},${customer.lng}`;
    const customerAddress = `${customer.calle} ${customer.numero}`;
    console.log("Customer", customer);
    // validateCustomerData(customer);
    try {
        const request = new sql.Request();

        // Agregar parámetros
        request.input('address', sql.NVarChar, customerAddress.toUpperCase() || null);
        request.input('addressNext', sql.NVarChar, customer.piso.toUpperCase() || null);
        request.input('alias', sql.NVarChar, `${customer.nombre} ${customer.apellido1} ${customer.apellido2}`.toUpperCase());
        request.input('cell', sql.NVarChar, customer.movil);
        request.input('city', sql.NVarChar, customer.poblacion.toUpperCase());
        request.input('dni', sql.NVarChar, customer.dni.toUpperCase() || null);
        request.input('email', sql.NVarChar, customer.email.toUpperCase() || null);
        request.input('name', sql.NVarChar, customer.nombre.toUpperCase() || 'N/S');
        request.input('phone', sql.NVarChar, customer.telefono || null);
        request.input('secondSurname', sql.NVarChar, customer.apellido2.toUpperCase() || null);
        request.input('surname', sql.NVarChar, customer.apellido1.toUpperCase() || null);
        request.input('zipCode', sql.NVarChar, customer.cp);
        request.input('enteredBy', sql.NVarChar, customer.enteredBy.toString() || 'System');
        // Coordinates
        // request.input('coordinates', sql.NVarChar, `${customer.lat},${customer.lng}`);
        request.input('coordinates', sql.NVarChar, customerCoordinates || null);
        request.input('country', sql.NVarChar, customer.pais.toUpperCase() || 'ESPAÑA');
        request.input('DeliverSameAddress', sql.Int, 1);
        request.input('InvoiceSameAddress', sql.Int, 1);
        request.input('state', sql.NVarChar, customer.comunidadAutonoma.toUpperCase() || null);

        const query = `
        DECLARE @NewCustomerID TABLE (CustomerID INT);

        INSERT INTO Customers (
            Address, AddressNext, Alias, Cell, City, CompanyID, 
            Coordinates, Country, DeliverSameAddress, DNI, Email,
            EnteredBy, InputDate, InvoiceModificated, InvoiceSameAddress,
            ModifiedBy, Name, Phone, PhoneCodesID, SecondSurname,
            State, Surname, ToRecall, ZipCode
        )
        OUTPUT INSERTED.CustomerID INTO @NewCustomerID
        VALUES (
            @address, @addressNext, @alias, @cell, @city, 1,
            @coordinates, @country, @DeliverSameAddress, @dni, @email,
            @enteredBy, GETDATE(), '', @InvoiceSameAddress,
            @enteredBy, @name, @phone, '', @secondSurname,
            @state, @surname, 0, @zipCode
        );

        SELECT CustomerID FROM @NewCustomerID;`;

        const result = await request.query(query);
        res.json({
            message: "Cliente creado correctamente",
            customerId: result.recordset[0].CustomerID
        });

        // console.log("Creating customer...");
    } catch (err) {
        console.error("Error al crear cliente:", err);
        res.status(400).json({
            message: "No ha sido posible crear el cliente",
            error: err.message
        });
    }
}

NoticesController.updateCustomer = async (req, res) => {
    const { customer } = req.body;
    console.log("Customer to update", customer);
    // return

    if (!customer.customerId) {
        return res.status(400).json({
            message: "El ID del cliente es requerido"
        });
    }

    try {
        const request = new sql.Request();

        // Agregar parámetros con validación
        request.input('address', sql.NVarChar, customer.calle || '');
        request.input('addressNext', sql.NVarChar, customer.piso || '');
        request.input('alias', sql.NVarChar, `${customer.nombre.toUpperCase() || ''} ${customer.apellido1.toUpperCase() || ''} ${customer.apellido2.toUpperCase() || ''}`);
        request.input('cell', sql.NVarChar, customer.movil || '');
        request.input('city', sql.NVarChar, customer.poblacion || '');
        request.input('dni', sql.NVarChar, customer.dni || '');
        request.input('email', sql.NVarChar, customer.email || '');
        request.input('name', sql.NVarChar, customer.nombre.toUpperCase() || '');
        request.input('phone', sql.NVarChar, customer.telefono || '');
        request.input('secondSurname', sql.NVarChar, customer.apellido2.toUpperCase() || '');
        request.input('surname', sql.NVarChar, customer.apellido1.toUpperCase() || '');
        request.input('zipCode', sql.NVarChar, customer.cp || '');
        request.input('customerID', sql.Int, parseInt(customer.customerId));
        request.input('coordinates', sql.NVarChar, customer.coordenadas || '');
        request.input('deliverSameAddress', sql.Int, customer.deliverySameAddress || 1);
        request.input('invoiceSameAddress', sql.Int, customer.invoiceSameAddress || 1);
        request.input('toRecall', sql.Int, customer.toRecall || 0);
        request.input('modifiedBy', sql.NVarChar, customer.modifiedBy.toString() || 'System');

        const query = `
        UPDATE Customers
        SET 
            Address = @address,
            AddressNext = @addressNext,
            Alias = @alias,
            Cell = @cell,
            City = @city,
            DNI = @dni,
            Email = @email,
            Name = @name,
            Phone = @phone,
            SecondSurname = @secondSurname,
            Surname = @surname,
            ZipCode = @zipCode,
            Coordinates = @coordinates,
            DeliverSameAddress = @deliverSameAddress,
            InvoiceSameAddress = @invoiceSameAddress,
            ToRecall = @toRecall,
            ModifiedBy = @modifiedBy
        WHERE CustomerID = @customerID;
        
        SELECT @@ROWCOUNT as affected;`;

        const result = await request.query(query);
        const rowsAffected = result.recordset[0].affected;

        if (rowsAffected === 0) {
            return res.status(404).json({
                message: "No se encontró el cliente o no se realizaron cambios"
            });
        }

        res.json({
            message: "Cliente actualizado correctamente",
            rowsAffected
        });
    } catch (err) {
        console.error("Error al actualizar cliente:", err);
        res.status(400).json({
            message: "No ha sido posible actualizar el cliente",
            error: err.message
        });
    }
}

NoticesController.getZIPCodes = async (req, res) => {
    try {
        const { zipCode } = req.query
        const query = `SELECT *
    from ZipCodes
    where ZipCodes.ZipCode = '${zipCode}'`
        const result = await sql.query(query)
        const data = result.recordset[0]

        res.json(data)

    } catch (err) {
        res.status(400).json({ message: "error al consultar cliente" })
    }
}

NoticesController.createCustomer = async (req, res) => {
    const { customer } = req.body;
    const customerCoordinates = `${customer.lat},${customer.lng}`;
    const customerAddress = `${customer.calle} ${customer.numero}`;
    console.log("Customer", customer);
    try {
        const request = new sql.Request();

        request.input('address', sql.NVarChar, customerAddress.toUpperCase() || 'SIN DIRECCIÓN');
        request.input('addressNext', sql.NVarChar, customer.piso.toUpperCase() || 'N/A');
        request.input('alias', sql.NVarChar, `${customer.nombre} ${customer.apellido1} ${customer.apellido2}`.toUpperCase());
        request.input('cell', sql.NVarChar, customer.movil || customer.telefono);
        request.input('city', sql.NVarChar, customer.poblacion.toUpperCase() || 'N/A');
        request.input('dni', sql.NVarChar, customer.dni.toUpperCase() || 'N/A');
        request.input('email', sql.NVarChar, customer.email.toUpperCase() || '');
        request.input('name', sql.NVarChar, customer.nombre.toUpperCase() || 'N/S');
        request.input('phone', sql.NVarChar, customer.telefono);
        request.input('secondSurname', sql.NVarChar, customer.apellido2.toUpperCase() || 'N/A');
        request.input('surname', sql.NVarChar, customer.apellido1.toUpperCase() || 'N/A');
        request.input('zipCode', sql.NVarChar, customer.cp || '00000');
        request.input('enteredBy', sql.NVarChar, customer.enteredBy.toString() || 'System');
        request.input('coordinates', sql.NVarChar, customerCoordinates || '0,0');
        request.input('country', sql.NVarChar, customer.pais.toUpperCase() || 'ESPAÑA');
        request.input('DeliverSameAddress', sql.Int, 1);
        request.input('InvoiceSameAddress', sql.Int, 1);
        request.input('state', sql.NVarChar, customer.comunidadAutonoma.toUpperCase() || 'N/A');

        const query = `
        DECLARE @NewCustomerID TABLE (CustomerID INT);

        INSERT INTO Customers (
            Address, AddressNext, Alias, Cell, City, CompanyID, 
            Coordinates, Country, DeliverSameAddress, DNI, Email,
            EnteredBy, InputDate, InvoiceModificated, InvoiceSameAddress,
            ModifiedBy, Name, Phone, PhoneCodesID, SecondSurname,
            State, Surname, ToRecall, ZipCode
        )
        OUTPUT INSERTED.CustomerID INTO @NewCustomerID
        VALUES (
            @address, @addressNext, @alias, @cell, @city, 1,
            @coordinates, @country, @DeliverSameAddress, @dni, @email,
            @enteredBy, GETDATE(), '', @InvoiceSameAddress,
            @enteredBy, @name, @phone, '', @secondSurname,
            @state, @surname, 0, @zipCode
        );

        SELECT CustomerID FROM @NewCustomerID;`;

        const result = await request.query(query);
        res.json({
            message: "Cliente creado correctamente",
            customerId: result.recordset[0].CustomerID
        });

    } catch (err) {
        console.error("Error al crear cliente:", err);
        res.status(400).json({
            message: "No ha sido posible crear el cliente",
            error: err.message
        });
    }
}

NoticesController.getStatusActions = async (req, res) => {
    try {
        const actions = (await sql.query(`SELECT * FROM StatusActions ORDER BY StatusID, ActionName`)).recordset;

        res.status(200).json(actions);
    } catch (error) {
        console.error('Error al obtener acciones de contextMenu:', error);
        res.status(400).json({ message: "Error al obtener acciones de contextMenu" });
    }
};

NoticesController.insertExternalNotice = async (req, res) => {
    console.log("Inserting external notice...");
    try {
        const { notice } = req.body;
        console.log("Notice data:", notice);

        // First, check if a customer exists with the given phone number
        const request = new sql.Request();
        request.input('phone', sql.NVarChar, notice.telefono);

        const checkCustomerQuery = `
            SELECT CustomerID, Name, Phone 
            FROM Customers 
            WHERE Phone = @phone OR Cell = @phone`;

        const customerResult = await request.query(checkCustomerQuery);

        let customerId;

        if (customerResult.recordset.length === 0) {
            // No customer found, create a new one
            const customerData = {
                nombre: notice.nombre.toUpperCase() || 'Sin Nombre',
                apellido1: notice.apellido.toUpperCase() || 'N/A',
                apellido2: notice.segundoApellido.toUpperCase() || 'N/A',
                telefono: notice.telefono,
                movil: notice.telefono, // Using main phone as cell
                calle: notice.direccion.toUpperCase() || 'Sin Dirección',
                numero: 'S/N',
                piso: notice.pisoPuerta.toUpperCase() || 'N/A',
                cp: notice.cp || '00000',
                poblacion: notice.poblacion.toUpperCase() || 'N/A',
                provincia: notice.provincia || 'N/A',
                pais: 'ESPAÑA',
                dni: 'N/A',
                email: notice.email.toUpperCase() || '',
                lat: notice.lat || '0',
                lng: notice.lng || '0',
                enteredBy: notice.externalInvoicingAddressID.toString() || 'ExternalSystem',
            };

            const createCustomerRequest = new sql.Request();
            const customerAddress = customerData.calle;
            const customerAlias = `${customerData.nombre} ${customerData.apellido1}`.trim();

            createCustomerRequest.input('address', sql.NVarChar, customerAddress.toUpperCase());
            createCustomerRequest.input('addressNext', sql.NVarChar, customerData.piso.toUpperCase());
            createCustomerRequest.input('alias', sql.NVarChar, customerAlias.toUpperCase());
            createCustomerRequest.input('cell', sql.NVarChar, customerData.movil);
            createCustomerRequest.input('city', sql.NVarChar, customerData.poblacion.toUpperCase());
            createCustomerRequest.input('dni', sql.NVarChar, customerData.dni.toUpperCase());
            createCustomerRequest.input('email', sql.NVarChar, customerData.email.toUpperCase());
            createCustomerRequest.input('name', sql.NVarChar, customerData.nombre.toUpperCase());
            createCustomerRequest.input('phone', sql.NVarChar, customerData.telefono);
            createCustomerRequest.input('secondSurname', sql.NVarChar, customerData.apellido2.toUpperCase());
            createCustomerRequest.input('surname', sql.NVarChar, customerData.apellido1.toUpperCase());
            createCustomerRequest.input('zipCode', sql.NVarChar, customerData.cp);
            createCustomerRequest.input('enteredBy', sql.NVarChar, customerData.enteredBy);
            createCustomerRequest.input('coordinates', sql.NVarChar, `${customerData.lat},${customerData.lng}`);
            createCustomerRequest.input('country', sql.NVarChar, customerData.pais.toUpperCase());
            createCustomerRequest.input('DeliverSameAddress', sql.Int, 1);
            createCustomerRequest.input('InvoiceSameAddress', sql.Int, 1);
            createCustomerRequest.input('state', sql.NVarChar, customerData.provincia || 'N/A');

            const createCustomerQuery = `
            DECLARE @NewCustomerID TABLE (CustomerID INT);

            INSERT INTO Customers (
                Address, AddressNext, Alias, Cell, City, CompanyID, 
                Coordinates, Country, DeliverSameAddress, DNI, Email,
                EnteredBy, InputDate, InvoiceModificated, InvoiceSameAddress,
                ModifiedBy, Name, Phone, PhoneCodesID, SecondSurname,
                State, Surname, ToRecall, ZipCode
            )
            OUTPUT INSERTED.CustomerID INTO @NewCustomerID
            VALUES (
                @address, @addressNext, @alias, @cell, @city, 1,
                @coordinates, @country, @DeliverSameAddress, @dni, @email,
                @enteredBy, GETDATE(), '', @InvoiceSameAddress,
                @enteredBy, @name, @phone, '', @secondSurname,
                @state, @surname, 0, @zipCode
            );

            SELECT CustomerID FROM @NewCustomerID;`;

            const newCustomerResult = await createCustomerRequest.query(createCustomerQuery);
            customerId = newCustomerResult.recordset[0].CustomerID;
            console.log("Created new customer with ID:", customerId);
        } else {
            customerId = customerResult.recordset[0].CustomerID;
            console.log("Found existing customer with ID:", customerId);
        }

        const noticeData = {
            data: {
                cell: notice.telefono,
                name: notice.nombre,
                address: notice.direccion,
                city: notice.poblacion || 'N/A',
                zipcode: notice.cp,
                phone: notice.telefono,
                email: notice.email || '',
                apparatus: notice.aparato,
                brand: notice.marca,
                model: notice.modelo,
                observations: notice.comentarioAveria.toUpperCase() || 'N/A',
                customerObservations: notice.comentario.toUpperCase() || 'N/A',
                ex_cell: notice.ex_cell,
                servicetypeid: notice.servicetypeid,
                externalLoginID: notice.externalLoginID,
                externalInvoicingAddressID: notice.externalInvoicingAddressID,
            }
        };

        const apiResponse = await fetch('https://externos.itcmadicloud.com/ex_functions/new-notice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noticeData)
        });

        console.log("API Response:", apiResponse.status, apiResponse.statusText);

        if (!apiResponse.ok) {
            throw new Error(`API call failed with status: ${apiResponse.status}`);
        }

        const apiResult = await apiResponse.json();

        // Update wallet in Ex_InvoicingAddress with TotalAmount from ex_GetPendingPayments
        await updateWalletBalance(notice.externalInvoicingAddressID);

        // Get user information to send email notification
        const userQuery = `
            SELECT * FROM Ex_Login 
            WHERE ExternalLoginID = @ExternalLoginID`;

        request.input('ExternalLoginID', sql.Int, notice.externalLoginID);
        const userResult = await request.query(userQuery);

        if (userResult.recordset.length > 0) {
            const userInfo = userResult.recordset[0];

            // Prepare notice details for the email
            const noticeDetails = {
                customerName: `${notice.nombre.toUpperCase()} ${notice.apellido.toUpperCase()}`.trim(),
                customerPhone: notice.telefono,
                customerCell: notice.ex_cell || notice.telefono,
                customerAddress: `${notice.direccion}, ${notice.pisoPuerta || ''}, ${notice.poblacion}`,
                apparatusName: notice.aparato,
                brandName: notice.marca,
                createDate: new Date().toISOString()
            };

            // Send email notification
            try {
                await sendNoticeCreationEmail(userInfo, noticeDetails);
                console.log("Notification email sent successfully");
            } catch (emailError) {
                console.error("Error sending notification email:", emailError);
                // Continue execution even if email fails
            }
        }

        res.json({
            success: true,
            message: "External notice processed",
            customerId: customerId,
            noticeResult: apiResult
        });

    } catch (error) {
        console.error("Error inserting external notice:", error);
        res.status(500).json({
            success: false,
            message: "Error inserting external notice",
            error: error.message
        });
    }
};

// Endpoint to get Ex_InvoicingAddress by Email
NoticesController.getEx_InvoicingAddressByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        // console.log("Email to search:", email);

        const request = new sql.Request();
        request.input('email', sql.NVarChar, email);

        const query = `
            SELECT * FROM Ex_InvoicingAddress WHERE Email = @email
        `;

        const result = await request.query(query);
        // console.log("Result:", result.recordset);

        res.json(result.recordset);
    } catch (error) {
        console.error("Error fetching Ex_InvoicingAddress:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching Ex_InvoicingAddress",
            error: error.message
        });
    }
};

NoticesController.updateFiscalData = async (req, res) => {
    try {
        const {
            tipo,
            tipoDocumento,
            nombreFiscal,
            nombre,
            primerApellido,
            segundoApellido,
            direccion,
            telefonoMovil,
            telefonoFijo,
            correoElectronico,
            numeroFiscal,
            codigoPostal,
            ciudad,
            provincia,
            iban
        } = req.body;

        console.log('IBAN:', iban);

        // Si tipo es 'autonomo', asignar el valor de 0
        const tipoValue = tipo === 'autonomo' ? 0 : 1;

        const request = new sql.Request();

        // Add input parameters
        request.input('TaxName', sql.NVarChar, nombreFiscal?.toUpperCase());
        request.input('Name', sql.NVarChar, nombre?.toUpperCase());
        request.input('Surname', sql.NVarChar, primerApellido?.toUpperCase());
        request.input('SecondSurname', sql.NVarChar, segundoApellido?.toUpperCase());
        request.input('Address', sql.NVarChar, direccion?.toUpperCase());
        request.input('Cell', sql.NVarChar, telefonoMovil);
        request.input('Phone', sql.NVarChar, telefonoFijo);
        request.input('Email', sql.NVarChar, correoElectronico?.toUpperCase());
        request.input('TaxIDNumber', sql.NVarChar, numeroFiscal?.toUpperCase());
        request.input('ZipCode', sql.NVarChar, codigoPostal);
        request.input('City', sql.NVarChar, ciudad?.toUpperCase());
        request.input('Province', sql.NVarChar, provincia?.toUpperCase());
        request.input('OldEmail', sql.NVarChar, correoElectronico?.toUpperCase());
        request.input('DocumentTypeID', sql.Int, tipoDocumento);
        request.input('Business', sql.Int, tipoValue);
        request.input('IBAN', sql.NVarChar, iban?.toUpperCase() || null); // Add Iban parameter

        // Update Ex_InvoicingAddress
        const updateInvoicingQuery = `
            UPDATE Ex_InvoicingAddress
            SET 
                TaxName = @TaxName,
                Name = @Name,
                Surname = @Surname,
                SecondSurname = @SecondSurname,
                Address = @Address,
                Cell = @Cell,
                Phone = @Phone,
                Email = @Email,
                TaxIDNumber = @TaxIDNumber,
                ZipCode = @ZipCode,
                City = @City,
                Province = @Province,
                DocumentTypeID = @DocumentTypeID,
                Business = @Business,
                IBAN = @IBAN
            WHERE Email = @OldEmail;
            
            SELECT @@ROWCOUNT as UpdatedRows;
        `;

        const invoicingResult = await request.query(updateInvoicingQuery);

        if (invoicingResult.recordset[0].UpdatedRows > 0) {
            // Update Ex_Login
            const updateLoginQuery = `
                UPDATE Ex_Login
                SET 
                    Name = @Name,
                    Surname = @Surname,
                    SecondSurname = @SecondSurname,
                    Cell = @Cell,
                    Phone = @Phone,
                    Address = @Address,
                    Email = @Email,
                    City = @City,
                    ZipCode = @ZipCode
                WHERE Email = @OldEmail;
                
                SELECT @@ROWCOUNT as UpdatedRows;
            `;

            const loginResult = await request.query(updateLoginQuery);

            if (loginResult.recordset[0].UpdatedRows > 0) {
                res.json({
                    success: true,
                    message: "Datos fiscales y de login actualizados correctamente"
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Error al actualizar los datos de login"
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: "No se encontró el registro de facturación para actualizar"
            });
        }

    } catch (error) {
        console.error("Error updating fiscal data:", error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar los datos",
            error: error.message
        });
    }
};

NoticesController.getNoticesByExternalLoginID = async (req, res) => {
    const { externalLoginID } = req.params; // Changed from req.query to req.params
    // console.log("ExternalLoginID:", externalLoginID);

    try {
        const request = new sql.Request();
        request.input('ExternalLoginID', sql.Int, externalLoginID);

        const result = await request.query(`
            SELECT 
                en.ExternalNoticeID,
                en.NoticeHeaderID,
                en.ExternalLoginID,
                en.Ex_StatusID,
                nh.ReasonID,
                nh.LoginID,
                nh.LeadSupplierID,
                nh.InvoicingAddressID,
                nh.StatusID,
                nh.CustomerID,
                nh.CreateDate,
                nh.ModifyDate,
                nh.Observation,
                nh.TechnicalObservation,
                nh.CompanyID,
                nh.Invoice,
                nh.TechnicID,
                nh.ApparatusID,
                nh.BrandID,
                nh.TypeID,
                c.Name as CustomerName,
                c.Surname as CustomerSurname,
                c.Address as CustomerAddress,
                c.City as CustomerCity,
                c.ZipCode as CustomerZipCode,
                c.Phone as CustomerPhone,
                c.Cell as CustomerCell,
                c.Email as CustomerEmail,
                a.Name as ApparatusName
            FROM Ex_Notices en
            JOIN NoticeHeader nh ON en.NoticeHeaderID = nh.NoticeHeaderID
            LEFT JOIN Customers c ON nh.CustomerID = c.CustomerID
            LEFT JOIN Apparatus a ON nh.ApparatusID = a.ApparatusID
            WHERE en.ExternalLoginID = @ExternalLoginID
            ORDER BY nh.CreateDate DESC;
        `);

        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener los avisos:', err);
        res.status(500).json({
            error: 'Error al obtener los avisos',
            details: err.message
        });
    }
};

NoticesController.getNoticesByEx_InvoicingAddressID = async (req, res) => {
    try {
        const { Ex_InvoicingAddressID } = req.params;

        const request = new sql.Request();
        request.input('Ex_InvoicingAddressID', sql.Int, Ex_InvoicingAddressID);

        // Primero obtenemos los datos del usuario para saber si es administrador
        const userQuery = `
            SELECT ExternalLoginID, Administrator
            FROM Ex_Login
            WHERE Ex_InvoicingAddressID = @Ex_InvoicingAddressID
        `;

        const userResult = await request.query(userQuery);
        const user = userResult.recordset[0];

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const isAdministrator = Boolean(user.Administrator);
        const externalLoginID = user.ExternalLoginID;

        let query = `
                SELECT DISTINCT
                    nh.NoticeHeaderID,
                    nh.CreateDate,
                    nh.ModifyDate,
                    nh.Observation,
                    nh.TechnicalObservation,
                    nh.StatusID,
                    nh.CustomerID,
                    nh.ApparatusID,
                    nh.BrandID,
                    nh.TypeID,
                    nh.ServiceTypeID,
                    nh.DocEntry,
                    c.Name as CustomerName,
                    c.Surname as CustomerSurname,
                    c.Address as CustomerAddress,
                    c.AddressNext as CustomerAddressNext,
                    c.ZipCode as CustomerZipCode,
                    c.City as CustomerCity,
                    c.Phone as CustomerPhone,
                    c.Cell as CustomerCell,
                    c.Email as CustomerEmail,
                    a.Name as ApparatusName,
                    b.Name as BrandName,
                    t.Type as TypeName,
                    s.Name as StatusName,
                    s.GroupID as GroupID,
                    s.GroupName as GroupName,
                    en.ExternalLoginID,
                    en.Ex_StatusID,
                    en.paid,
                    el.Administrator,
                    eia.TaxName as CustomerTaxName
                FROM NoticeHeader nh
                LEFT JOIN Customers c ON nh.CustomerID = c.CustomerID
                LEFT JOIN Apparatus a ON nh.ApparatusID = a.ApparatusID
                LEFT JOIN Brands b ON nh.BrandID = b.BrandID
                LEFT JOIN Types t ON nh.TypeID = t.TypeID
                INNER JOIN Status s ON nh.StatusID = s.StatusID
                LEFT JOIN Ex_Notices en ON nh.NoticeHeaderID = en.NoticeHeaderID
                LEFT JOIN Ex_Login el ON en.ExternalLoginID = el.ExternalLoginID
                LEFT JOIN Ex_InvoicingAddress eia ON el.Ex_InvoicingAddressID = eia.Ex_InvoicingAddressID
                WHERE el.Ex_InvoicingAddressID = @Ex_InvoicingAddressID
            `;

        // Si no es administrador, solo mostrar sus propios avisos
        if (!isAdministrator) {
            query += ` AND en.ExternalLoginID = @ExternalLoginID`;
            request.input('ExternalLoginID', sql.Int, externalLoginID);
        }

        query += ` ORDER BY nh.CreateDate DESC`;

        const result = await request.query(query);

        res.json({
            success: true,
            data: result.recordset,
            isAdmin: isAdministrator
        });

    } catch (error) {
        console.error('Error al obtener los avisos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los avisos',
            error: error.message
        });
    }
};

NoticesController.getAllNotices = async (req, res) => {
    try {
        // Consulta original para obtener los datos del encabezado del aviso
        const result = await sql.query(`
            SELECT DISTINCT
                nh.NoticeHeaderID,
                nh.DocEntry,
                nh.CreateDate,
                nh.ModifyDate,
                nh.Observation,
                nh.TechnicalObservation,
                nh.StatusID,
                nh.CustomerID,
                nh.ApparatusID,
                nh.BrandID,
                nh.TypeID,
                nh.ServiceTypeID,
                nh.Total,
                nh.Tax,
                c.Name as CustomerName,
                c.Surname as CustomerSurname,
                c.Address as CustomerAddress,
                c.AddressNext as CustomerAddressNext,
                c.ZipCode as CustomerZipCode,
                c.City as CustomerCity,
                c.Phone as CustomerPhone,
                c.Cell as CustomerCell,
                c.Email as CustomerEmail,
                a.Name as ApparatusName,
                b.Name as BrandName,
                t.Type as TypeName,
                s.Name as StatusName,
                en.ExternalLoginID,
                en.Ex_StatusID,
                en.paid,
                en.ClosedDate,
                en.Ex_ServiceTypeID,
                es.Name as Ex_StatusName,
                el.Administrator,
                eia.TaxName as CustomerTaxName
            FROM NoticeHeader nh
            JOIN Customers c ON nh.CustomerID = c.CustomerID
            JOIN Apparatus a ON nh.ApparatusID = a.ApparatusID
            JOIN Brands b ON nh.BrandID = b.BrandID
            LEFT JOIN Types t ON nh.TypeID = t.TypeID
            JOIN Status s ON nh.StatusID = s.StatusID
            JOIN Ex_Notices en ON nh.NoticeHeaderID = en.NoticeHeaderID
            JOIN Ex_Status es ON en.Ex_StatusID = es.Ex_StatusID
            JOIN Ex_Login el ON en.ExternalLoginID = el.ExternalLoginID
            JOIN Ex_InvoicingAddress eia ON el.Ex_InvoicingAddressID = eia.Ex_InvoicingAddressID
            WHERE nh.LeadSupplierID = 76
            ORDER BY nh.CreateDate DESC;
        `);

        const notices = result.recordset;

        // Para cada aviso, obtener sus líneas de detalle
        for (let notice of notices) {
            const noticeHeaderID = notice.NoticeHeaderID;

            // Consulta para obtener las líneas del aviso
            const linesResult = await sql.query(`
                SELECT 
                    nl.qty, 
                    p.Reference, 
                    nl.Description, 
                    nl.Revision, 
                    nl.MaterialCost, 
                    s.Name as SupplierName, 
                    st.Name as StatusName, 
                    nl.SubTotal,
                    nl.Tax,
                    nl.Total
                FROM NoticeLines nl
                JOIN Products p ON p.ProductID = nl.ProductID
                LEFT JOIN Suppliers s ON s.SupplierID = p.SupplierID
                LEFT JOIN Status st ON st.StatusID = nl.StatusID
                WHERE nl.NoticeHeaderID = ${noticeHeaderID}
            `);

            // Añadir las líneas al aviso
            notice.lines = linesResult.recordset;
        }

        // Calcular el beneficio (profit) si es necesario
        const refunds = await sql.query(`
            SELECT SUM(r.total) as TotalRefunds 
            FROM RefundsHeader r 
            WHERE r.NoticeHeaderID = ${notices.length > 0 ? notices[0].NoticeHeaderID : 0}
        `);

        let profit = 0;
        if (notices.length > 0 && refunds.recordset[0].TotalRefunds !== null) {
            profit = notices[0].Total - refunds.recordset[0].TotalRefunds;
        }

        res.json({
            success: true,
            data: notices,
            profit: profit || 0
        });
    }
    catch (error) {
        console.error('Error al obtener los avisos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los avisos',
            error: error.message
        });
    }
};

NoticesController.getCustomersByExternalLoginID = async (req, res) => {
    const { externalLoginID } = req.params;
    // console.log("ExternalLoginID:", externalLoginID);

    try {
        const request = new sql.Request();
        request.input('ExternalLoginID', sql.VarChar, externalLoginID);

        const result = await request.query(`
            SELECT 
                CustomerID,
                Name,
                Surname,
                Address,
                City,
                ZipCode,
                Country,
                Phone,
                Cell,
                Email,
                CompanyID,
                InputDate,
                ModifiedOn,
                EnteredBy
            FROM Customers
            WHERE EnteredBy = @ExternalLoginID
            ORDER BY InputDate DESC;
        `);

        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener los clientes:', err);
        res.status(500).json({
            error: 'Error al obtener los clientes',
            details: err.message
        });
    }
}

NoticesController.getEx_Status = async (req, res) => {
    try {
        const result = await sql.query(`SELECT * FROM Ex_Status ORDER BY Ex_StatusID`);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener los estados:', err);
        res.status(500).json({
            error: 'Error al obtener los estados',
            details: err.message
        });
    }
}

// Obtener todos los Ex_invoicingAddressID con CreateDate
NoticesController.getEx_InvoicingAddress = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT 
                i.*,
                (
                    SELECT TOP 1 l.CreateDate
                    FROM Ex_Login l
                    WHERE l.Ex_InvoicingAddressID = i.Ex_InvoicingAddressID
                    ORDER BY l.CreateDate DESC
                ) as CreateDate
            FROM Ex_InvoicingAddress i
            ORDER BY i.Ex_InvoicingAddressID
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener los Ex_InvoicingAddress:', err);
        res.status(500).json({
            error: 'Error al obtener los Ex_InvoicingAddress',
            details: err.message
        });
    }
}

NoticesController.get_Ex_PendingPayments = async (req, res) => {

    try {
        // const { Ex_InvoicingAddressID } = req.params;
        const result = await sql.query(`
            Select * from ex_GetPendingPayments
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener los pagos pendientes:', err);
        res.status(500).json({
            error: 'Error al obtener los pagos pendientes',
            details: err.message
        });
    }
}

NoticesController.getPendingPaymentDetails = async (req, res) => {
    try {
        const { invoicingAddressId, month, quincena, serviceType } = req.query;
        // console.log("Parameters:", { invoicingAddressId, month, quincena, serviceType });

        // return res.status(200).json({ message: "Parameters received", invoicingAddressId, month, quincena });

        if (!invoicingAddressId || !month || !quincena) {
            return res.status(400).json({
                success: false,
                message: 'Se requieren los parámetros invoicingAddressId, month y quincena'
            });
        }

        const query = `
            SELECT *
            FROM [Rapitecnic].[dbo].[ex_GetPendingPaymentsExtended] 
            WHERE Ex_InvoicingAddressID = @invoicingAddressId 
            AND MES = @month 
            AND QUINCENA = @quincena
            AND ServiceTypeID = @serviceType
        `;

        const request = new sql.Request();
        request.input('invoicingAddressId', sql.Int, parseInt(invoicingAddressId));
        request.input('month', sql.Int, parseInt(month));
        request.input('quincena', sql.Int, parseInt(quincena));
        request.input('serviceType', sql.Int, parseInt(serviceType));
        const result = await request.query(query);

        // console.log("Pending Payment Details Result:", result.recordset);

        res.json({
            success: true,
            data: result.recordset
        });
    } catch (error) {
        console.error('Error al obtener los detalles de pagos pendientes:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los detalles de pagos pendientes',
            error: error.message
        });
    }
};

NoticesController.deleteNotice = async (req, res) => {
    try {
        const { docEntry, timestamp, Ex_InvoicingAddressID, noticeHeaderID } = req.body;

        console.log("Delete Notice Request:", { docEntry, timestamp, Ex_InvoicingAddressID, noticeHeaderID });


        if (!docEntry) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere el ID del aviso (docEntry)'
            });
        }

        // First check if the notice exists
        const checkQuery = `
            SELECT NoticeHeaderID, StatusID 
            FROM NoticeHeader 
            WHERE NoticeHeaderID = @noticeHeaderID
        `;

        const checkRequest = new sql.Request();
        checkRequest.input('noticeHeaderID', sql.Int, noticeHeaderID);
        const checkResult = await checkRequest.query(checkQuery);

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Aviso no encontrado'
            });
        }

        const notice = checkResult.recordset[0];

        console.log("Notice to delete:", notice);

        const deleteQuery = `
        EXEC [dbo].[DeleteNoticeHeader]
		@docentry = @docEntry
        `

        const deleteRequest = new sql.Request();
        deleteRequest.input('docEntry', sql.Int, docEntry);
        deleteRequest.input('Ex_InvoicingAddressID', sql.Int, Ex_InvoicingAddressID);
        await deleteRequest.query(deleteQuery);

        res.json({
            success: true,
            message: 'Aviso eliminado correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar el aviso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el aviso',
            error: error.message
        });
    }
};

NoticesController.updateNoticeStatus = async (req, res) => {
    try {
        const { noticeHeaderID, statusID, timestamp, Ex_InvoicingAddressID } = req.body;

        console.log("Update Notice Status Request:", { noticeHeaderID, statusID, timestamp, Ex_InvoicingAddressID });

        if (!noticeHeaderID || !statusID) {
            return res.status(400).json({
                success: false,
                message: 'Se requieren noticeHeaderID y statusID'
            });
        }

        // Mapeo de Ex_StatusID basado en StatusID
        let mappedStatusID;
        let exStatusID;

        switch (parseInt(statusID)) {
            case 1:
                mappedStatusID = 1;  // Pendiente Contactar
                exStatusID = 1;
                break;
            case 2:
            case 194:
                mappedStatusID = 194; // Para StatusID 20 o 194
                exStatusID = 2;      // Ex_StatusID = 2 (Descartado)
                break;
            case 3:
                mappedStatusID = 26; // Cotadp
                exStatusID = 3;
                break;
            case 4:
                mappedStatusID = 89; // En proceso
                exStatusID = 4;
                break;
            case 5:
                mappedStatusID = 27; // Finalizado
                exStatusID = 5;
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'StatusID no válido'
                });
        }

        const request = new sql.Request();
        request.input('noticeHeaderID', sql.Int, noticeHeaderID);
        request.input('statusID', sql.Int, mappedStatusID);
        request.input('exStatusID', sql.Int, exStatusID);
        request.input('timestamp', sql.DateTime, new Date(timestamp));

        // Primero verificar que el aviso existe
        const checkQuery = `
            SELECT nh.NoticeHeaderID, nh.StatusID, en.Ex_StatusID
            FROM NoticeHeader nh
            LEFT JOIN Ex_Notices en ON nh.NoticeHeaderID = en.NoticeHeaderID
            WHERE nh.NoticeHeaderID = @noticeHeaderID AND nh.LeadSupplierID = 76
        `;

        const checkResult = await request.query(checkQuery);

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Aviso no encontrado'
            });
        }

        // Actualizar NoticeHeader
        const updateNoticeHeaderQuery = `
            UPDATE NoticeHeader 
            SET StatusID = @statusID, 
                ModifyDate = @timestamp
            WHERE NoticeHeaderID = @noticeHeaderID AND LeadSupplierID = 76
        `;

        await request.query(updateNoticeHeaderQuery);

        // Actualizar Ex_Notices
        const updateExNoticesQuery = `
            UPDATE Ex_Notices 
            SET Ex_StatusID = @exStatusID
            WHERE NoticeHeaderID = @noticeHeaderID
        `;

        await request.query(updateExNoticesQuery);

        console.log(`Updated NoticeHeader ${noticeHeaderID}: StatusID = ${mappedStatusID}, Ex_StatusID = ${exStatusID}`);

        res.json({
            success: true,
            message: 'Estado del aviso actualizado correctamente',
            data: {
                noticeHeaderID,
                statusID: mappedStatusID,
                exStatusID
            }
        });

    } catch (error) {
        console.error('Error al actualizar el estado del aviso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el estado del aviso',
            error: error.message
        });
    }
};

NoticesController.searchModelo = async (req, res) => {
    try {
        const { keywords } = req.query;

        if (!keywords || keywords.length < 3) {
            return res.json([]);
        }

        // Use the API key from environment variables
        const apiKey = process.env.DEVICE_SEARCH_KEYWORDS_API_KEY;
        const url = `https://aswoshop.aswo.com/service/customerapi/devicesearch?devicesearchkeywords=${encodeURIComponent(keywords)}&format=json&apikey=${apiKey}`;

        // console.log("Fetching from URL:", url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`External API error: ${response.status} ${response.statusText}`);
        }

        const responseText = await response.text();
        const data = JSON.parse(responseText);

        res.json(Object.values(data));
    } catch (error) {
        console.error("Error searching model:", error);
        res.status(500).json({ error: error.message });
    }
};

// select * from NoticeHeader where CustomerID = 13510
NoticesController.getNoticesByCustomerID = async (req, res) => {
    try {
        const { customerId } = req.params;

        if (!customerId) {
            return res.status(400).json({ error: 'Customer ID is required' });
        }

        const request = new sql.Request();
        request.input('CustomerID', sql.Int, customerId);

        const query = `
    SELECT 
        nh.*,
        a.Name as ApparatusName,
        b.Name as BrandName,
        s.Name as StatusName,
        t.Name as TechnicName,
        st.ServiceTypeName,
        ih.InternalInvoiceNumber
    FROM NoticeHeader nh
    LEFT JOIN Apparatus a ON nh.ApparatusID = a.ApparatusID
    LEFT JOIN Brands b ON nh.BrandID = b.BrandID
    LEFT JOIN Status s ON nh.StatusID = s.StatusID
    LEFT JOIN Technics t ON nh.TechnicID = t.TechnicID
    LEFT JOIN ServiceTypes st ON nh.ServiceTypeID = st.ServiceTypeID
    LEFT JOIN InvoiceHeader ih ON nh.NoticeHeaderID = ih.NoticeHeaderID
    WHERE nh.CustomerID = @CustomerID
    ORDER BY nh.CreateDate DESC
`;

        const result = await request.query(query);
        res.json(result.recordset);
    } catch (error) {
        console.error("Error fetching notices by customer ID:", error);
        res.status(500).json({ error: error.message });
    }
};

NoticesController.submitClaimRequest = async (req, res) => {
    try {
        const claimData = req.body;

        // Validar que se recibieron todos los datos necesarios
        if (!claimData.customerData || !claimData.description || !claimData.noticeId) {
            return res.status(400).json({
                message: "Datos incompletos para procesar la reclamación",
                required: ["customerData", "description", "noticeId"]
            });
        }

        // Extraer información relevante del aviso original
        const noticeDetails = {
            noticeId: claimData.selectedNotice?.NoticeHeaderID,
            docEntry: claimData.selectedNotice?.DocEntry,
            observation: claimData.selectedNotice?.Observation,
            technicalObservation: claimData.selectedNotice?.TechnicalObservation,
            closingDate: claimData.selectedNotice?.LastVisit,
            apparatusName: claimData.selectedNotice?.ApparatusName,
            brandName: claimData.selectedNotice?.BrandName,
            modelName: claimData.selectedNotice?.Model,
            initialReason: claimData.selectedNotice?.Observation,
            invoiceNumber: claimData.selectedNotice?.InternalInvoiceNumber
        };

        // Crear objeto de detalles de la reclamación
        const claimDetails = {
            id: `RECLA-${Date.now()}`, // ID único para la reclamación
            description: claimData.description,
            priority: claimData.priority || 'media',
            status: claimData.status || 'Nueva',
            createdDate: claimData.createdDate || new Date().toISOString(),
            searchValue: claimData.searchValue,
            invoiceNumber: claimData.selectedNotice?.InternalInvoiceNumber
        };

        const request = new sql.Request();

        const callCenterObservationText = `Callcenter Externo - Nueva Reclamacion: ${claimData.description}`;

        request.input('LoginID', sql.Int, 68); //TODO: Actualizar al ID de usuario que realiza la reclamación
        request.input('NoticeHeaderID', sql.Int, noticeDetails.noticeId);
        request.input('CustomerID', sql.Int, claimData.customerID);
        request.input('CallCenterObservation', sql.NVarChar, callCenterObservationText);
        request.input('ObservationTypeID', sql.Int, 1); // Tipo de observación para reclamaciones

        const insertQuery = `
            INSERT INTO Observations (
                LoginID, 
                NoticeHeaderID, 
                CustomerID, 
                CallCenterObservation, 
                ObservationTypeID,
                CreateDate
            ) 
            VALUES (
                @LoginID, 
                @NoticeHeaderID, 
                @CustomerID, 
                @CallCenterObservation, 
                @ObservationTypeID,
                GETDATE()
            );

            SELECT SCOPE_IDENTITY() AS ObservationID;
        `;

        const insertResult = await request.query(insertQuery);
        const observationId = insertResult.recordset[0].ObservationID;

        // Enviar el email de confirmación con la información reorganizada
        const emailResult = await sendClaimRequestMail(
            claimData.customerData,
            claimDetails,
            noticeDetails
        );

        res.status(200).json({
            success: true,
            message: "Reclamación procesada y enviada correctamente",
            claimId: claimDetails.id,
            observationId: observationId,
            emailSent: emailResult.success
        });

    } catch (error) {
        console.error("Error al procesar la reclamación:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al procesar la reclamación",
            error: error.message
        });
    }
};
// submitConsultationRequest
NoticesController.submitConsultationRequest = async (req, res) => {
    // Extraer datos de forma segura
    const { consultationData } = req.body || {};

    console.log("Consultation Request Data:", consultationData);

    try {
        // Validar que los datos existen
        if (!consultationData) {
            return res.status(400).json({
                success: false,
                message: "No se recibieron datos de consulta"
            });
        }

        // Enviar email de notificación
        const emailResult = await sendConsultationEmail(consultationData);

        if (!emailResult.success) {
            console.error("Error al enviar email:", emailResult.message);
        }

        // Aquí podrías guardar los datos en la base de datos si lo necesitas

        res.status(200).json({
            success: true,
            message: "Solicitud de consulta procesada correctamente",
            emailSent: emailResult.success
        });
    } catch (error) {
        console.error("Error al procesar la solicitud de consulta:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al procesar la solicitud de consulta",
            error: error.message
        });
    }
};

NoticesController.accountingClaimRequest = async (req, res) => {
    // Extraer datos de forma segura
    const { claimData } = req.body || {};

    console.log("Accounting Claim Request Data:", claimData);

    try {
        // Validar que los datos existen
        if (!claimData) {
            return res.status(400).json({
                success: false,
                message: "No se recibieron datos de reclamación"
            });
        }

        // Verificar si es una solicitud de modificación masiva
        if (claimData.modificationType === 'customer_data_bulk_update' && Array.isArray(claimData.modifications)) {
            // Crear un email con todas las modificaciones
            await sendBulkModificationEmail(claimData);

            res.status(200).json({
                success: true,
                message: "Solicitud de modificaciones masivas procesada correctamente"
            });
        } else {
            // Mantener el comportamiento original para modificaciones individuales
            const emailResult = await sendAccountingClaimEmail(claimData);

            if (!emailResult.success) {
                return res.status(500).json({
                    success: false,
                    message: "Error al enviar el email de reclamación contable",
                    error: emailResult.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Reclamación contable procesada y enviada correctamente"
            });
        }
    } catch (error) {
        console.error("Error al procesar la reclamación contable:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al procesar la reclamación contable",
            error: error.message
        });
    }
};

// Endpoint para obtener todos los clientes (solo para callcenter)
NoticesController.getAllCustomers = async (req, res) => {
    try {
        const query = `
            SELECT 
                CustomerID,
                Name,
                Surname,
                SecondSurname,
                Phone,
                Cell,
                Email,
                Address,
                AddressNext,
                City,
                ZipCode,
                State,
                Country,
                DNI,
                CreateDate,
                ModifiedOn
            FROM Customers
            ORDER BY Name, Surname`;

        const request = new sql.Request();
        const result = await request.query(query);

        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener todos los clientes:', err);
        res.status(500).json({
            error: 'Error al obtener los clientes',
            details: err.message
        });
    }
};

// Endpoints específicos para callcenter
NoticesController.submitCallcenterClaim = async (req, res) => {
    try {
        const claimData = req.body;
        
        // Aquí puedes procesar la reclamación del callcenter
        // Por ejemplo, guardarla en una tabla específica o enviar notificaciones
        
        console.log('Reclamación de callcenter recibida:', claimData);
        
        res.json({
            success: true,
            message: 'Reclamación procesada correctamente'
        });
    } catch (err) {
        console.error('Error al procesar reclamación de callcenter:', err);
        res.status(500).json({
            error: 'Error al procesar la reclamación',
            details: err.message
        });
    }
};

NoticesController.submitCallcenterAccounting = async (req, res) => {
    try {
        const accountingData = req.body;
        
        console.log('Solicitud contable de callcenter recibida:', accountingData);
        
        res.json({
            success: true,
            message: 'Solicitud contable procesada correctamente'
        });
    } catch (err) {
        console.error('Error al procesar solicitud contable de callcenter:', err);
        res.status(500).json({
            error: 'Error al procesar la solicitud contable',
            details: err.message
        });
    }
};

NoticesController.submitCallcenterConsultation = async (req, res) => {
    try {
        const consultationData = req.body;
        
        console.log('Consulta de callcenter recibida:', consultationData);
        
        res.json({
            success: true,
            message: 'Consulta procesada correctamente'
        });
    } catch (err) {
        console.error('Error al procesar consulta de callcenter:', err);
        res.status(500).json({
            error: 'Error al procesar la consulta',
            details: err.message
        });
    }
};

export default NoticesController;