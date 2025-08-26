import express from 'express';
import cors from 'cors';
import router from './router.js';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import initScheduler from './common/cron.js';  // Cron para programar tareas
import { transporter } from './Controllers/paymentController.js';

const app = express();

// Aumentar el límite de tamaño de solicitud a 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// app.use(express.json());
// Aumentar el límite de tamaño de solicitud a 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(router);
app.use("/uploads", express.static("uploads"));

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err);  // Loguea el error para rastreo en el servidor

    let content;
    if (err.message) {
        content = `Error: ${err.message}\nStack: ${err.stack}\nRequest: ${req}`;
    } else {
        content = err;
    }

    // Preparar contenido del email
    const emailContent = {
        // from: 'no-responder@rapitecnic.com',
        from: 'webmaster@rapitecnic.com',
        // to: 'abaco@rapitecnic.com',
        to: 'webmaster@rapitecnic.com',
        subject: 'Error in Rapitecnic Core',
        text: content
    };

    // Enviar el correo con el error
    transporter.sendMail(emailContent, (error, info) => {
        if (error) {
            console.error('Error sending error notification email:', error);
        } else {
            console.log('Error notification email sent:', info.response);
        }
    });

    // Enviar respuesta de error al cliente
    res.status(500).send('Internal Server Error');
});

// Iniciar cron jobs
// No necesitas pasar io aquí ya que se pasa en index.js
export default app;
