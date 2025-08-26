import nodemailer from 'nodemailer';

// 📧 Configuración centralizada del transporter de email
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

// 📧 Función para enviar emails de error
export const sendErrorEmail = async (error, req) => {
    try {
        let content;
        if (error.message) {
            content = `Error: ${error.message}\nStack: ${error.stack}\nRequest URL: ${req.url}\nMethod: ${req.method}\nBody: ${JSON.stringify(req.body)}`;
        } else {
            content = error;
        }

        const emailContent = {
            from: 'webmaster@rapitecnic.com',
            to: 'webmaster@rapitecnic.com',
            subject: 'Error in Rapitecnic Core',
            text: content,
            html: `
                <h2>🚨 Error en Rapitecnic Core</h2>
                <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <h3>Error Message:</h3>
                    <p><strong>${error.message}</strong></p>
                </div>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <h3>Request Details:</h3>
                    <p><strong>URL:</strong> ${req.url}</p>
                    <p><strong>Method:</strong> ${req.method}</p>
                    <p><strong>Body:</strong> <pre>${JSON.stringify(req.body, null, 2)}</pre></p>
                </div>
                <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <h3>Stack Trace:</h3>
                    <pre style="white-space: pre-wrap; font-size: 12px;">${error.stack}</pre>
                </div>
                <p style="color: #6b7280; font-size: 14px;">
                    Timestamp: ${new Date().toISOString()}
                </p>
            `
        };

        const result = await transporter.sendMail(emailContent);
        console.log('✅ Error notification email sent:', result.messageId);
        return true;
    } catch (emailError) {
        console.error('❌ Error sending error notification email:', emailError);
        return false;
    }
};

// 📧 Función para verificar la configuración del email
export const verifyEmailConfig = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email configuration verified successfully');
        return true;
    } catch (error) {
        console.error('❌ Email configuration verification failed:', error);
        return false;
    }
};