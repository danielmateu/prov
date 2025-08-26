import nodemailer from 'nodemailer';

// Configuración del transporter de nodemailer
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: true,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });
// console.log('');

export const sendRegistrationEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: userEmail,
      subject: 'Confirma tu cuenta en Rapitecnic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>¡Bienvenido a Rapitecnic, ${userName}!</h2>
          <p>Gracias por registrarte en nuestra plataforma. Para completar tu registro, por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.APP_URL}/confirm-account?email=${encodeURIComponent(userEmail)}" 
               style="background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
              Confirmar cuenta
            </a>
          </div>
          <p>Si no has creado esta cuenta, puedes ignorar este mensaje.</p>
          <p>Saludos,<br>El equipo de Rapitecnic</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email de registro enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el email de registro:', error);
    throw new Error('Error al enviar el email de confirmación');
  }
};