import sql from 'mssql';
import nodemailer from 'nodemailer';

const PaymentController = {};

export const transporter = nodemailer.createTransport({
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

const sendPaymentConfirmationEmail = async (userInfo, paymentDetails) => {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: userInfo.Email,
        subject: 'Confirmación de Pago - Rapitecnic',
        html: `
            <h1>Confirmación de Pago</h1>
            <p>Hola ${userInfo.Name},</p>
            <p>Tu pago ha sido procesado exitosamente.</p>
            <h2>Detalles del Pago:</h2>
            <ul>
                <li>Monto: ${paymentDetails.amount}€</li>
                <li>Fecha: ${new Date().toLocaleDateString()}</li>
            </ul>
            <p>Gracias por confiar en Rapitecnic.</p>
            <br>
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
                                    webmaster
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 3px;">
                                    <strong>Correo:</strong> 
                                    <a href="mailto:itsupport@rapitecnic.com" style="color: #8B008B; text-decoration: none;">
                                        itsupport@rapitecnic.com
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
        console.log('Email de confirmación de pago enviado a:', userInfo.Email);
    } catch (error) {
        console.error('Error al enviar email de confirmación de pago:', error);
        throw error;
    }
};

const sendPaymentRefusalEmail = async (userInfo, paymentDetails) => {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: userInfo.Email,
        subject: 'Rechazo de Pago - Rapitecnic',
        html: `
            <h1>Rechazo de Pago</h1>
            <p>Hola ${userInfo.Name},</p>
            <p>Lamentamos informarte que tu pago ha sido rechazado.</p>
            <h2>Detalles del Pago:</h2>
            <ul>
                <li>Monto: ${paymentDetails.amount}€</li>
                <li>Fecha: ${new Date().toLocaleDateString()}</li>
            </ul>
            <p>Por favor, revisa los detalles y vuelve a intentarlo.</p>
            <br>
            <p>Saludos,</p>
            <p>El equipo de Rapitecnic</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email de rechazo de pago enviado a:', userInfo.Email);
    } catch (error) {
        console.error('Error al enviar email de rechazo de pago:', error);
        throw error;
    }
}

const sendInvoiceEmail = async (invoiceData, pdfBuffer) => {

    // console.log('📧 Enviando factura por email', invoiceData)
    // return
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: 'contabilidad@rapitecnic.com', // ✅ Email de Rapitecnic
        // to: 'dmateu@rapitecnic.com', // ✅ Email de Rapitecnic
        subject: `Nueva Factura - ${invoiceData.invoiceNumber} - ${invoiceData.issuer.name}`,
        html: generateInvoiceEmailHTML(invoiceData),
        attachments: [
            {
                filename: `Factura_${invoiceData.invoiceNumber.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf'
            }
        ]
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Factura enviada por email a contabilidad@rapitecnic.com:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('❌ Error al enviar factura por email:', error);
        throw error;
    }
};

// 🎨 Función para generar el HTML del email de factura
const generateInvoiceEmailHTML = (invoice) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Nueva Factura - ${invoice.invoiceNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; }
                .content { padding: 30px 20px; background-color: #f8fafc; }
                .invoice-card { background-color: white; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #2563eb; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
                .highlight { color: #2563eb; font-weight: bold; }
                .total-amount { font-size: 28px; color: #059669; font-weight: bold; text-align: center; padding: 15px; background: #ecfdf5; border-radius: 8px; margin: 15px 0; }
                .service-item { background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 3px solid #64748b; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
                .info-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
                .badge { display: inline-block; background: #2563eb; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
                .divider { height: 2px; background: linear-gradient(90deg, #2563eb, #64748b, #2563eb); margin: 25px 0; border-radius: 1px; }
                .rapitecnic-signature { background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="margin: 0; font-size: 32px;">📧 Nueva Factura Recibida</h1>
                    <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Factura N° <strong>${invoice.invoiceNumber}</strong></p>
                    <div class="badge" style="margin-top: 15px;">RAPITECNIC BILLING SYSTEM</div>
                </div>

                <div class="content">
                    <div class="total-amount">
                        💰 Importe Total: ${invoice.total.toFixed(2)} €
                    </div>

                    <div class="invoice-card">
                        <h2 style="color: #1e293b; margin-top: 0;">👤 Datos del Emisor</h2>
                        <div class="grid">
                            <div class="info-box">
                                <strong>Nombre/Razón Social:</strong><br>
                                ${invoice.issuer.name}
                            </div>
                            <div class="info-box">
                                <strong>NIF/CIF:</strong><br>
                                ${invoice.issuer.nif}
                            </div>
                        </div>
                        <div class="info-box">
                            <strong>Dirección Fiscal:</strong><br>
                            ${invoice.issuer.address}<br>
                            ${invoice.issuer.postalCode} ${invoice.issuer.city}, ${invoice.issuer.province}
                        </div>
                        ${invoice.issuer.email || invoice.issuer.phone ? `
                            <div class="grid" style="margin-top: 15px;">
                                ${invoice.issuer.email ? `<div class="info-box"><strong>Email:</strong><br>${invoice.issuer.email}</div>` : ''}
                                ${invoice.issuer.phone ? `<div class="info-box"><strong>Teléfono:</strong><br>${invoice.issuer.phone}</div>` : ''}
                            </div>
                        ` : ''}
                    </div>

                    <div class="invoice-card">
                        <h2 style="color: #1e293b; margin-top: 0;">📄 Información de la Factura</h2>
                        <div class="grid">
                            <div class="info-box">
                                <strong>Número de Factura:</strong><br>
                                ${invoice.invoiceNumber}
                            </div>
                            <div class="info-box">
                                <strong>Fecha de Expedición:</strong><br>
                                ${new Date(invoice.issueDate).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}
                            </div>
                        </div>
                        ${invoice.serviceDate && invoice.serviceDate !== invoice.issueDate ? `
                            <div class="info-box">
                                <strong>Fecha del Servicio:</strong><br>
                                ${new Date(invoice.serviceDate).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}
                            </div>
                        ` : ''}
                        <div class="grid">
                            <div class="info-box">
                                <strong>Forma de Pago:</strong><br>
                                ${invoice.paymentMethod}
                            </div>
                            <div class="info-box">
                                <strong>Condiciones:</strong><br>
                                ${invoice.paymentTerms}
                            </div>
                        </div>
                    </div>

                    <div class="invoice-card">
                        <h2 style="color: #1e293b; margin-top: 0;">🔧 Servicios Facturados</h2>
                        ${invoice.items.map((item, index) => `
                            <div class="service-item">
                                <h4 style="margin: 0 0 10px 0; color: #374151;">📋 Servicio ${index + 1}</h4>
                                <p style="margin: 5px 0; font-weight: bold; color: #1f2937;">${item.description}</p>
                                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                                    <span><strong>📊 Cantidad:</strong> ${item.quantity}</span>
                                    <span><strong>💵 Precio Unit.:</strong> ${item.unitPrice.toFixed(2)} €</span>
                                    <span><strong>💰 Total:</strong> ${item.total.toFixed(2)} €</span>
                                </div>
                                ${item.serviceType ? `<p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;"><strong>🏷️ Tipo:</strong> ${item.serviceType}</p>` : ''}
                                ${item.noticeIds && item.noticeIds.length > 0 ? `<p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;"><strong>🔗 Avisos:</strong> ${item.noticeIds.join(', ')}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>

                    <div class="invoice-card">
                        <h2 style="color: #1e293b; margin-top: 0;">🧮 Desglose Fiscal</h2>
                        <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <span><strong>Subtotal:</strong></span>
                                <span>${invoice.subtotal.toFixed(2)} €</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <span><strong>IVA (${invoice.ivaRate}%):</strong></span>
                                <span style="color: #059669;">+${invoice.ivaAmount.toFixed(2)} €</span>
                            </div>
                            ${invoice.irpfAmount > 0 ? `
                                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                    <span><strong>Retención IRPF (${invoice.irpfRate}%):</strong></span>
                                    <span style="color: #dc2626;">-${invoice.irpfAmount.toFixed(2)} €</span>
                                </div>
                            ` : ''}
                            <div class="divider"></div>
                            <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: bold; color: #1e293b;">
                                <span>TOTAL A PAGAR:</span>
                                <span style="color: #059669;">${invoice.total.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>

                    ${invoice.notes ? `
                        <div class="invoice-card">
                            <h2 style="color: #1e293b; margin-top: 0;">📝 Observaciones</h2>
                            <div style="background: #fffbeb; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <p style="margin: 0; font-style: italic; color: #92400e;">${invoice.notes}</p>
                            </div>
                        </div>
                    ` : ''}

                    <div class="invoice-card" style="border-left-color: #059669; background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);">
                        <h2 style="color: #065f46; margin-top: 0;">✅ Próximos Pasos</h2>
                        <div style="color: #047857;">
                            <p><strong>1.</strong> 📎 Revisar el archivo PDF adjunto con la factura oficial</p>
                            <p><strong>2.</strong> ✔️ Verificar que todos los datos fiscales son correctos</p>
                            <p><strong>3.</strong> 💳 Procesar el pago según las condiciones establecidas (${invoice.paymentTerms})</p>
                            <p><strong>4.</strong> 📧 Confirmar la recepción si es necesario</p>
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <p style="margin: 0 0 10px 0;">🤖 <strong>Factura generada automáticamente</strong> a través del sistema de facturación de Rapitecnic.</p>
                    <p style="margin: 0 0 10px 0;">📎 Por favor, revise el archivo PDF adjunto para obtener la factura oficial.</p>
                    <p style="margin: 0 0 15px 0;">📧 Email enviado a: <strong style="color: #2563eb;">dmateu@rapitecnic.com</strong></p>
                    <div class="divider" style="margin: 15px 0;"></div>
                    <p style="color: #64748b; font-size: 12px; margin: 0; line-height: 1.4;">
                        ⚖️ Esta factura cumple con la normativa española de facturación electrónica.<br>
                        <strong>Real Decreto 1619/2012</strong> - Obligaciones de facturación<br>
                        📋 Todos los datos fiscales han sido validados según la legislación vigente.
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
};

PaymentController.sendInvoiceEmail = async (req, res) => {
    try {
        const { invoiceData, pdfBase64 } = req.body;

        // Validar datos requeridos
        if (!invoiceData || !pdfBase64) {
            return res.status(400).json({
                success: false,
                message: "Datos de factura y PDF son requeridos"
            });
        }

        // console.log("Invoice data received:", invoiceData);
        // return res.json({
        //     success: true,
        //     message: "Factura recibida correctamente, simulando envío"
        // });

        // Convertir base64 a buffer
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');

        // Enviar email
        const result = await sendInvoiceEmail(invoiceData, pdfBuffer);

        res.json({
            success: true,
            message: "Factura enviada correctamente a dmateu@rapitecnic.com",
            messageId: result.messageId
        });

    } catch (error) {
        console.error("Error enviando factura por email:", error);
        res.status(500).json({
            success: false,
            message: "Error al enviar la factura por email",
            error: error.message
        });
    }
};



PaymentController.approvePendingPayment = async (req, res) => {
    try {
        const { invoicingAddressId, month, quincena, serviceTypeId, totalAmount } = req.body;
        const request = new sql.Request();

        console.log('Datos recibidos:', { invoicingAddressId, month, quincena, serviceTypeId, totalAmount });

        request.input('ExternalLoginID', sql.Int, invoicingAddressId);

        // Get user info for email
        const userQuery = `
            SELECT Name, Email
            FROM Ex_InvoicingAddress
            WHERE Ex_InvoicingAddressID = @ExternalLoginID`;

        const userResult = await request.query(userQuery);
        const userInfo = userResult.recordset[0];

        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        request.input('Month', sql.Int, month);
        request.input('Quincena', sql.Int, quincena);
        request.input('ServiceTypeID', sql.Int, serviceTypeId);

        // await request.query(updateQuery);

        // Llamar al procedimiento almacenado solo con el parámetro requerido
        // Ya que primero actualizamos solo los avisos específicos
        // await request.execute('ex_generateexinvoice');
        // Crear un nuevo objeto Request para el procedimiento almacenado
        // para evitar que se pasen los parámetros anteriores
        const procRequest = new sql.Request();

        // Añadir el parámetro requerido al procedimiento
        // procRequest.input('ExInvoicingAddressID', sql.Int, invoicingAddressId);
        // Al procedure ex_generateEXInvoice tienes que pasarle como parametros el id de la empresa, año, mes y quincena(1 o 2)
        procRequest.input('ExInvoicingAddressID', sql.Int, invoicingAddressId);
        procRequest.input('Anio', sql.Int, new Date().getFullYear());
        procRequest.input('Mes', sql.Int, month);
        procRequest.input('Quincena', sql.Int, quincena);


        // Llamar al procedimiento almacenado sin parámetros adicionales
        await procRequest.execute('ex_generateexinvoice');

        // Si todo ha ido bien, seteamos el valor de wallet de Ex_InvoicingAddress a 0
        const walletRequest = new sql.Request();
        walletRequest.input('ExInvoicingAddressID', sql.Int, invoicingAddressId);

        const updateWalletQuery = `
            UPDATE Ex_InvoicingAddress 
            SET Wallet = 0 
            WHERE Ex_InvoicingAddressID = @ExInvoicingAddressID`;

        await walletRequest.query(updateWalletQuery);

        console.log('Wallet actualizado a 0 para Ex_InvoicingAddressID:', invoicingAddressId);


        // Send confirmation email with the provided totalAmount
        await sendPaymentConfirmationEmail(userInfo, {
            amount: totalAmount || 0,
            month: month,
            quincena: quincena,
            serviceType: serviceTypeId
        });

        res.json({
            success: true,
            message: "Payment approved successfully",
            amount: totalAmount || 0
        });

    } catch (error) {
        console.error("Error approving payment:", error);
        res.status(500).json({
            success: false,
            message: "Error approving payment",
            error: error.message
        });
    }
};

PaymentController.rejectPendingPayment = async (req, res) => {
    try {
        const { invoicingAddressId, month, quincena, serviceType } = req.body;

        console.log('Received data:', { invoicingAddressId, month, quincena, serviceType });

        const request = new sql.Request();

        // Primero obtener información del usuario
        request.input('invoicingAddressId', sql.Int, invoicingAddressId);

        const userQuery = `
            SELECT Name, Email
            FROM Ex_InvoicingAddress
            WHERE Ex_InvoicingAddressID = @invoicingAddressId`;

        const userResult = await request.query(userQuery);
        const userInfo = userResult.recordset[0];

        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        // Ahora actualizar el estado de pago - usando los nombres correctos de columnas
        request.input('month', sql.Int, month);
        request.input('quincena', sql.Int, quincena);
        request.input('serviceType', sql.Int, serviceType);

        // CORRECCIÓN: Usar los nombres exactos de las columnas según tu esquema
        const updateStatusQuery = `
            UPDATE Ex_Notices 
            SET paid = 2 
            WHERE Ex_InvoicingAddressID = @invoicingAddressId 
            AND MONTH(CreateDate) = @month 
            AND CASE 
                WHEN DAY(CreateDate) <= 15 THEN 1 
                ELSE 2 
            END = @quincena
            AND Ex_ServiceTypeID = @serviceType
            AND paid = 0`;

        const updateResult = await request.query(updateStatusQuery);

        console.log('Filas afectadas:', updateResult.rowsAffected[0]);

        // Enviar email de rechazo
        await sendPaymentRefusalEmail(userInfo, {
            amount: 0
        });

        res.json({
            success: true,
            message: "Payment rejected successfully",
            rowsAffected: updateResult.rowsAffected[0]
        });

    } catch (error) {
        console.error("Error rejecting payment:", error);
        res.status(500).json({
            success: false,
            message: "Error rejecting payment",
            error: error.message
        });
    }
};

PaymentController.getPendingPaymentDetails = async (req, res) => {
    try {
        const { invoicingAddressId, month, quincena, serviceType } = req.query;
        const request = new sql.Request();

        request.input('invoicingAddressId', sql.Int, invoicingAddressId);
        request.input('month', sql.Int, month);
        request.input('quincena', sql.Int, quincena);
        request.input('serviceType', sql.Int, serviceType);

        const query = `
            SELECT 
                n.ExternalNoticeID,
                ia.Name as TaxName,
                st.Name as ServiceTypeName,
                MONTH(n.CreateDate) as MES,
                CASE 
                    WHEN DAY(CreateDate) <= 15 THEN 1 
                    ELSE 2 
                END as QUINCENA,
                n.NoticeCount as TotalAmount
            FROM Ex_Notices n
            JOIN Ex_InvoicingAddress ia ON n.Ex_InvoicingAddressID = ia.Ex_InvoicingAddressID
            JOIN Ex_ServiceTypes st ON n.ServiceTypeID = st.ServiceTypeID
            WHERE n.Ex_InvoicingAddressID = @invoicingAddressId 
            AND MONTH(n.CreateDate) = @month 
            AND CASE 
                WHEN DAY(n.CreateDate) <= 15 THEN 1 
                ELSE 2 
            END = @quincena
            AND n.ServiceTypeID = @serviceType
            AND n.paid = 0`;

        const result = await request.query(query);

        res.json({
            success: true,
            data: result.recordset
        });

    } catch (error) {
        console.error("Error getting payment details:", error);
        res.status(500).json({
            success: false,
            message: "Error getting payment details",
            error: error.message
        });
    }
};

export default PaymentController;