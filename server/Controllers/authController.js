import sql from 'mssql';
import { handleError } from '../common/tools.js';
import jwt from 'jsonwebtoken';
import { connectToSql } from '../config/db.js';
import initScheduler from '../common/cron.js';
import nodemailer from 'nodemailer';
import { randomBytes } from 'node:crypto';

const AuthController = {};

const DEFAULT_VALUES = {
    ADMINISTRATOR: 0,
    CALLCENTER_USER: 0,
    ENABLED_ACCOUNT: 1,
    HOT_QUOTITATION: 0,
    SERVES_LEADS: 0,
    WaveExtension: 0
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

// Función para crear usuarios de callcenter desde empresa externa
AuthController.createCallcenterUser = async (req, res) => {
    const {
        name,
        surname,
        email,
        cell,
        password,
        externalCompanyId, // ID de la empresa externa que crea el usuario
        externalCompanyName // Nombre de la empresa externa
    } = req.body;

    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 86400000); // 24 horas

    try {
        // Verificar que el email no exista
        let checkQuery = `
            SELECT ExternalLoginID
            FROM Ex_Login
            WHERE Email = @Email`;

        let checkRequest = new sql.Request();
        checkRequest.input('Email', sql.NVarChar(100), email);
        let checkResult = await checkRequest.query(checkQuery);

        if (checkResult.recordset.length > 0) {
            return res.status(400).json({
                message: "Ya existe un usuario con este correo electrónico"
            });
        }

        // Crear una dirección de facturación especial para callcenter
        const createAddressQuery = `
            INSERT INTO Ex_InvoicingAddress (
                Name,
                Email,
                TaxName,
                Business,
                SuperAdmin,
                ExternalCompanyId,
                ExternalCompanyName,
                IsCallcenterAddress
            )
            VALUES (
                @Name,
                @Email,
                @TaxName,
                0,
                0,
                @ExternalCompanyId,
                @ExternalCompanyName,
                1
            );
            
            SELECT SCOPE_IDENTITY() as Ex_InvoicingAddressID;`;

        let addressRequest = new sql.Request();
        addressRequest.input('Name', sql.NVarChar(100), `${name} ${surname}`.toUpperCase());
        addressRequest.input('Email', sql.NVarChar(100), email.toUpperCase());
        addressRequest.input('TaxName', sql.NVarChar(100), externalCompanyName.toUpperCase());
        addressRequest.input('ExternalCompanyId', sql.Int, externalCompanyId);
        addressRequest.input('ExternalCompanyName', sql.NVarChar(100), externalCompanyName.toUpperCase());

        const addressResult = await addressRequest.query(createAddressQuery);
        const Ex_InvoicingAddressID = addressResult.recordset[0].Ex_InvoicingAddressID;

        // Crear el usuario de callcenter
        const insertQuery = `
            INSERT INTO Ex_Login (
                Name,
                Surname,
                Cell,
                Email,
                Ex_InvoicingAddressID,
                Password,
                Administrator,
                CallcenterUser,
                Enabled,
                VerificationToken,
                VerificationTokenExpiry,
                ExternalCompanyId,
                ExternalCompanyName
            )
            VALUES (
                @Name,
                @Surname,
                @Cell,
                @Email,
                @Ex_InvoicingAddressID,
                PWDENCRYPT(@Password),
                0,
                1,
                0,
                @VerificationToken,
                @VerificationTokenExpiry,
                @ExternalCompanyId,
                @ExternalCompanyName
            );
            
            SELECT SCOPE_IDENTITY() as ExternalLoginID;`;

        let insertRequest = new sql.Request();
        insertRequest.input('Name', sql.NVarChar(100), name.toUpperCase());
        insertRequest.input('Surname', sql.NVarChar(100), surname.toUpperCase());
        insertRequest.input('Cell', sql.NVarChar(50), cell);
        insertRequest.input('Email', sql.NVarChar(100), email.toUpperCase());
        insertRequest.input('Ex_InvoicingAddressID', sql.Int, Ex_InvoicingAddressID);
        insertRequest.input('Password', sql.VarChar(128), password);
        insertRequest.input('VerificationToken', sql.NVarChar(100), verificationToken);
        insertRequest.input('VerificationTokenExpiry', sql.DateTime, verificationTokenExpiry);
        insertRequest.input('ExternalCompanyId', sql.Int, externalCompanyId);
        insertRequest.input('ExternalCompanyName', sql.NVarChar(100), externalCompanyName);

        const insertResult = await insertRequest.query(insertQuery);
        const externalLoginID = insertResult.recordset[0].ExternalLoginID;

        // Obtener la información del usuario creado
        let getUserQuery = `
            SELECT 
                ExternalLoginID,
                Name,
                Surname,
                Cell,
                Email,
                Ex_InvoicingAddressID,
                Administrator,
                CallcenterUser,
                Enabled,
                ExternalCompanyName
            FROM Ex_Login
            WHERE ExternalLoginID = @ExternalLoginID`;

        let getUserRequest = new sql.Request();
        getUserRequest.input('ExternalLoginID', sql.Int, externalLoginID);
        let getUserResult = await getUserRequest.query(getUserQuery);

        if (getUserResult.recordset.length > 0) {
            const userInfo = getUserResult.recordset[0];

            // Enviar email de verificación
            await sendCallcenterVerificationEmail(userInfo, verificationToken, externalCompanyName);

            res.status(201).json({
                message: "Usuario de callcenter creado exitosamente. Se ha enviado un correo de verificación.",
                user: userInfo
            });
        } else {
            throw new Error("Error al crear el usuario de callcenter");
        }

    } catch (err) {
        console.error('Error en registro de callcenter:', err);
        res.status(500).json({
            error: 'Error al crear el usuario de callcenter',
            details: err.message
        });
    }
};

const sendCallcenterVerificationEmail = async (userInfo, verificationToken, companyName) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: userInfo.Email,
        subject: `Cuenta de Callcenter creada - ${companyName}`,
        html: `
            <h1>¡Bienvenido al sistema Rapitecnic!</h1>
            <p>Hola ${userInfo.Name},</p>
            <p>Se ha creado una cuenta de callcenter para ti en nombre de <strong>${companyName}</strong>.</p>
            <p>Para activar tu cuenta y comenzar a usar el sistema, por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p>
            <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #00A7E1; color: white; text-decoration: none; border-radius: 5px;">Verificar cuenta</a>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p>${verificationUrl}</p>
            
            <h3>Permisos de tu cuenta:</h3>
            <ul>
                <li>✅ Acceso a reclamaciones</li>
                <li>✅ Gestión de contabilidad</li>
                <li>✅ Manejo de consultas</li>
                <li>✅ Visualización de todos los clientes</li>
                <li>✅ Modificación de datos de clientes</li>
            </ul>
            
            <p>Este enlace es válido por 24 horas.</p>
            <br>
            <p>Si no esperabas esta cuenta, puedes ignorar este correo.</p>
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
                                    Cuenta Callcenter
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 3px;">
                                    <strong>Empresa:</strong> ${companyName}
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
                        </table>
                    </td>
                </tr>
            </table>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email de verificación de callcenter enviado a:', userInfo.Email);
    } catch (error) {
        console.error('Error al enviar email de verificación de callcenter:', error);
        throw error;
    }
};

const sendVerificationEmail = async (userInfo, verificationToken) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: userInfo.Email,
        subject: 'Verifica tu cuenta en Rapitecnic',
        html: `
            <h1>¡Bienvenido a Rapitecnic!</h1>
            <p>Hola ${userInfo.Name},</p>
            <p>Tu cuenta ha sido creada exitosamente. Para comenzar a usar nuestros servicios, por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p>
            <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #00A7E1; color: white; text-decoration: none; border-radius: 5px;">Verificar cuenta</a>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p>${verificationUrl}</p>
            <p>Este enlace es válido por 24 horas.</p>
            <br>
            <p>Si no has creado una cuenta en Rapitecnic, puedes ignorar este correo.</p>
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
        console.log('Email de verificación enviado a:', userInfo.Email);
    } catch (error) {
        console.error('Error al enviar email de verificación:', error);
        throw error;
    }
};

AuthController.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        // Verificar si el token existe y no ha expirado
        let query = `
            SELECT ExternalLoginID, Email, Name
            FROM Ex_Login
            WHERE VerificationToken = @Token AND VerificationTokenExpiry > GETDATE() AND Enabled = 0`;

        let request = new sql.Request();
        request.input('Token', sql.NVarChar(100), token);
        let result = await request.query(query);

        if (result.recordset.length === 0) {
            return res.status(400).json({
                message: "Token inválido o expirado. Por favor, solicita un nuevo enlace de verificación."
            });
        }

        const user = result.recordset[0];

        // Activar la cuenta
        const updateQuery = `
            UPDATE Ex_Login
            SET Enabled = 1,
                VerificationToken = NULL,
                VerificationTokenExpiry = NULL
            WHERE ExternalLoginID = @ExternalLoginID`;

        let updateRequest = new sql.Request();
        updateRequest.input('ExternalLoginID', sql.Int, user.ExternalLoginID);
        await updateRequest.query(updateQuery);

        res.json({
            message: "Cuenta verificada correctamente. Ya puedes iniciar sesión."
        });
    } catch (err) {
        console.error('Error al verificar email:', err);
        res.status(500).json({
            error: 'Error al verificar la cuenta',
            details: err.message
        });
    }
};

AuthController.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        let query = `
            SELECT ExternalLoginID, Email, Name
            FROM Ex_Login
            WHERE Email = @Email`;

        let request = new sql.Request();
        request.input('Email', sql.NVarChar(100), email);
        let result = await request.query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No existe una cuenta con este correo electrónico" });
        }

        const user = result.recordset[0];

        const resetToken = randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

        // Primero limpiamos cualquier token anterior
        const cleanQuery = `
            UPDATE Ex_Login
            SET ResetToken = NULL,
                ResetTokenExpiry = NULL
            WHERE ExternalLoginID = @ExternalLoginID`;

        let cleanRequest = new sql.Request();
        cleanRequest.input('ExternalLoginID', sql.Int, user.ExternalLoginID);
        await cleanRequest.query(cleanQuery);

        // Luego establecemos el nuevo token
        const updateQuery = `
            UPDATE Ex_Login
            SET ResetToken = @ResetToken,
                ResetTokenExpiry = @ResetTokenExpiry
            WHERE ExternalLoginID = @ExternalLoginID`;

        let updateRequest = new sql.Request();
        updateRequest.input('ResetToken', sql.NVarChar(100), resetToken);
        updateRequest.input('ResetTokenExpiry', sql.DateTime, resetTokenExpiry);
        updateRequest.input('ExternalLoginID', sql.Int, user.ExternalLoginID);
        await updateRequest.query(updateQuery);

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Recuperación de contraseña',
            html: `
                <h1>Recuperación de contraseña</h1>
                <p>Hola ${user.Name},</p>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                <a href="${resetUrl}">Restablecer contraseña</a>
                <p>Este enlace es válido por 1 hora.</p>
                <p>Si no has solicitado este cambio, puedes ignorar este correo.</p>
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

        await transporter.sendMail(mailOptions);

        res.json({ message: "Se ha enviado un correo con las instrucciones para restablecer tu contraseña" });
    } catch (err) {
        console.error('Error en recuperación de contraseña:', err);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
};

AuthController.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Verificamos si el token existe y no ha expirado
        let query = `
            SELECT ExternalLoginID, ResetTokenExpiry
            FROM Ex_Login
            WHERE ResetToken = @Token`;

        let request = new sql.Request();
        request.input('Token', sql.NVarChar(100), token);
        let result = await request.query(query);

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: "Token inválido" });
        }

        const user = result.recordset[0];
        const tokenExpiry = new Date(user.ResetTokenExpiry);
        const now = new Date();

        if (now > tokenExpiry) {
            return res.status(400).json({ message: "El enlace ha expirado. Por favor, solicita un nuevo enlace de recuperación." });
        }

        // Actualizamos la contraseña y limpiamos el token usando PWDENCRYPT
        const updateQuery = `
            UPDATE Ex_Login
            SET Password = PWDENCRYPT(@Password),
                ResetToken = NULL,
                ResetTokenExpiry = NULL
            WHERE ExternalLoginID = @ExternalLoginID`;

        let updateRequest = new sql.Request();
        updateRequest.input('Password', sql.VarChar(128), newPassword);
        updateRequest.input('ExternalLoginID', sql.Int, user.ExternalLoginID);
        await updateRequest.query(updateQuery);

        res.json({ message: "Contraseña actualizada correctamente" });
    } catch (err) {
        console.error('Error al restablecer contraseña:', err);
        res.status(500).json({ error: 'Error al restablecer la contraseña' });
    }
};

AuthController.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        let query = `
            SELECT 
                Ex_Login.ExternalLoginID,
                Ex_Login.Name,
                Ex_Login.Surname,
                Ex_Login.SecondSurname,
                Ex_Login.Cell,
                Ex_Login.Phone,
                Ex_Login.Address,
                Ex_Login.Email,
                Ex_Login.Ex_InvoicingAddressID,
                Ex_Login.Password,
                Ex_Login.Administrator,
                Ex_Login.CallcenterUser,
                Ex_Login.City,
                Ex_Login.ZipCode,
                Ex_Login.Province,
                Ex_Login.Enabled,
                Ex_Login.ProfileImageUrl,
                Ex_Login.ExternalCompanyName,
                Ex_InvoicingAddress.TaxName,
                Ex_InvoicingAddress.TaxIDNumber,
                Ex_InvoicingAddress.DocumentTypeID,
                Ex_InvoicingAddress.Business,
                Ex_InvoicingAddress.SuperAdmin,
                Ex_InvoicingAddress.IBAN,
                CASE WHEN PWDCOMPARE(@Password, Ex_Login.Password) = 1 THEN 1 ELSE 0 END AS PasswordMatch
            FROM Ex_Login
            JOIN Ex_InvoicingAddress ON Ex_InvoicingAddress.Ex_InvoicingAddressID = Ex_Login.Ex_InvoicingAddressID
            WHERE Ex_Login.Email = @Email`;

        let request = new sql.Request();
        request.input('Email', sql.NVarChar(100), email);
        request.input('Password', sql.VarChar(128), password);
        let result = await request.query(query);

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecto" });
        }

        const userInfo = result.recordset[0];

        // Verificar si la contraseña coincide usando el resultado de PWDCOMPARE
        if (!userInfo || userInfo.PasswordMatch !== 1) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecto" });
        }

        // Check if user is enabled
        if (userInfo.Enabled === false) {
            return res.status(403).json({
                message: "Tu cuenta está pendiente de verificación. Por favor, revisa tu correo electrónico.",
                enabled: 0
            });
        }

        const token = jwt.sign({
            user_email: userInfo.Email,
            user_name: `${userInfo.Name} ${userInfo.Surname}`,
            user_id: userInfo.ExternalLoginID
        },
            'cdjfbgoisfdubhgfdouigbfygbdg4358',
            { expiresIn: '1h' });

        delete userInfo.Password;
        delete userInfo.PasswordMatch;

        res.json({
            userInfo,
            token,
            enabled: userInfo.Enabled
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

AuthController.register = async (req, res) => {
    const {
        address,
        cell,
        city,
        companyName,
        email,
        empresa,
        idnumber,
        name,
        password,
        phone,
        province,
        secondSurname,
        surname,
        zipCode,
        userType,
        documentType,
    } = req.body;

    const userTypeValue = userType === 'autonomo' ? 0 : 1;
    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 86400000); // 24 horas

    try {
        let checkQuery = `
            SELECT ExternalLoginID
            FROM Ex_Login
            WHERE Email = @Email`;

        let checkRequest = new sql.Request();
        checkRequest.input('Email', sql.NVarChar(100), email);
        let checkResult = await checkRequest.query(checkQuery);

        if (checkResult.recordset.length > 0) {
            return res.status(400).json({
                message: "Ya existe un usuario con este correo electrónico"
            });
        }

        const safeToUpperCase = (value) => value ? value.toUpperCase() : null;

        const createAddressQuery = `
            INSERT INTO Ex_InvoicingAddress (
                Address,
                City,
                Province,
                ZipCode,
                Name,
                Surname,
                SecondSurname,
                Cell,
                Phone,
                Email,
                TaxName,
                TaxIDNumber,
                DocumentTypeID,
                Business
            )
            VALUES (
                @Address,
                @City,
                @Province,
                @ZipCode,
                @Name,
                @Surname,
                @SecondSurname,
                @Cell,
                @Phone,
                @Email,
                @TaxName,
                @TaxIDNumber,
                @DocumentTypeID,
                @Business
            );
            
            SELECT SCOPE_IDENTITY() as Ex_InvoicingAddressID;`;

        let addressRequest = new sql.Request();
        addressRequest.input('Address', sql.NVarChar(200), safeToUpperCase(address));
        addressRequest.input('City', sql.NVarChar(50), safeToUpperCase(city));
        addressRequest.input('Province', sql.NVarChar(20), safeToUpperCase(province));
        addressRequest.input('ZipCode', sql.NVarChar(10), zipCode);
        addressRequest.input('Name', sql.NVarChar(100), userType === 'empresa' ? safeToUpperCase(companyName) : safeToUpperCase(name));
        addressRequest.input('Surname', sql.NVarChar(100), userType === 'empresa' ? null : safeToUpperCase(surname));
        addressRequest.input('SecondSurname', sql.NVarChar(100), userType === 'empresa' ? null : safeToUpperCase(secondSurname));
        addressRequest.input('Cell', sql.NVarChar(50), cell);
        addressRequest.input('Phone', sql.NVarChar(50), phone);
        addressRequest.input('Email', sql.NVarChar(100), safeToUpperCase(email));
        addressRequest.input('TaxName', sql.NVarChar(100), safeToUpperCase(companyName));
        addressRequest.input('TaxIDNumber', sql.NVarChar(50), idnumber);
        addressRequest.input('DocumentTypeID', sql.Int, parseInt(documentType, 10));
        addressRequest.input('Business', sql.Int, userTypeValue);

        const addressResult = await addressRequest.query(createAddressQuery);
        const Ex_InvoicingAddressID = addressResult.recordset[0].Ex_InvoicingAddressID;

        const insertQuery = `
            INSERT INTO Ex_Login (
                Name,
                Surname,
                SecondSurname,
                Cell,
                Phone,
                Address,
                Email,
                Ex_InvoicingAddressID,
                Password,
                Administrator,
                CallcenterUser,
                City,
                ZipCode,
                Province,
                Enabled,
                VerificationToken,
                VerificationTokenExpiry
            )
            VALUES (
                @Name,
                @Surname,
                @SecondSurname,
                @Cell,
                @Phone,
                @Address,
                @Email,
                @Ex_InvoicingAddressID,
                PWDENCRYPT(@Password),
                1,
                0,
                @City,
                @ZipCode,
                @Province,
                0,
                @VerificationToken,
                @VerificationTokenExpiry
            );
            
            SELECT SCOPE_IDENTITY() as ExternalLoginID;`;

        let insertRequest = new sql.Request();
        insertRequest.input('Name', sql.NVarChar(100), userType === 'empresa' ? safeToUpperCase(companyName) : safeToUpperCase(name));
        insertRequest.input('Surname', sql.NVarChar(100), userType === 'empresa' ? null : safeToUpperCase(surname));
        insertRequest.input('SecondSurname', sql.NVarChar(100), userType === 'empresa' ? null : safeToUpperCase(secondSurname));
        insertRequest.input('Cell', sql.NVarChar(50), cell);
        insertRequest.input('Phone', sql.NVarChar(50), phone);
        insertRequest.input('Address', sql.NVarChar(200), safeToUpperCase(address));
        insertRequest.input('Email', sql.NVarChar(100), safeToUpperCase(email));
        insertRequest.input('Ex_InvoicingAddressID', sql.Int, Ex_InvoicingAddressID);
        insertRequest.input('Password', sql.VarChar(128), password);
        insertRequest.input('City', sql.NVarChar(50), safeToUpperCase(city));
        insertRequest.input('ZipCode', sql.NVarChar(10), zipCode);
        insertRequest.input('Province', sql.NVarChar(20), safeToUpperCase(province));
        insertRequest.input('VerificationToken', sql.NVarChar(100), verificationToken);
        insertRequest.input('VerificationTokenExpiry', sql.DateTime, verificationTokenExpiry);

        await insertRequest.query(insertQuery);

        let query = `
            SELECT 
                ExternalLoginID,
                Name,
                Surname,
                SecondSurname,
                Cell,
                Phone,
                Address,
                Email,
                Ex_InvoicingAddressID,
                Administrator,
                CallcenterUser,
                City,
                ZipCode,
                Province,
                Enabled
            FROM Ex_Login
            WHERE Email = @Email`;

        let request = new sql.Request();
        request.input('Email', sql.NVarChar(100), email);
        let result = await request.query(query);

        const userInfo = result.recordset[0];

        // Enviar email de verificación
        await sendVerificationEmail(userInfo, verificationToken);

        const token = jwt.sign({
            user_email: userInfo.Email,
            user_name: `${userInfo.Name} ${userInfo.Surname}`,
            user_id: userInfo.ExternalLoginID
        },
            'cdjfbgoisfdubhgfdouigbfygbdg4358',
            { expiresIn: '1h' });

        res.json({
            userInfo,
            token,
            message: "Se ha enviado un correo de verificación a tu dirección de email. Por favor, verifica tu cuenta para poder iniciar sesión."
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Error al registrar el usuario',
            details: err.message
        });
    }
};

AuthController.registerUser = async (req, res) => {
    const { userData } = req.body;

    if (!userData) {
        return res.status(400).json({
            message: "Datos de usuario no proporcionados"
        });
    }

    const {
        name,
        surname,
        email,
        mobile,
        password,
        Ex_InvoicingAddressID
    } = userData;

    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 86400000); // 24 horas

    try {
        let checkQuery = `
            SELECT ExternalLoginID
            FROM Ex_Login
            WHERE Email = @Email`;

        let checkRequest = new sql.Request();
        checkRequest.input('Email', sql.NVarChar(100), email);
        let checkResult = await checkRequest.query(checkQuery);

        if (checkResult.recordset.length > 0) {
            return res.status(400).json({
                message: "Ya existe un usuario con este correo electrónico"
            });
        }

        const insertQuery = `
            INSERT INTO Ex_Login (
                Name,
                Surname,
                Cell,
                Email,
                Ex_InvoicingAddressID,
                Password,
                Administrator,
                CallcenterUser,
                Enabled,
                VerificationToken,
                VerificationTokenExpiry
            )
            VALUES (
                @Name,
                @Surname,
                @Cell,
                @Email,
                @Ex_InvoicingAddressID,
                PWDENCRYPT(@Password),
                0,
                0,
                0,
                @VerificationToken,
                @VerificationTokenExpiry
            );
            
            SELECT SCOPE_IDENTITY() as ExternalLoginID;`;

        let insertRequest = new sql.Request();
        insertRequest.input('Name', sql.NVarChar(100), name.toUpperCase());
        insertRequest.input('Surname', sql.NVarChar(100), surname.toUpperCase());
        insertRequest.input('Cell', sql.NVarChar(50), mobile);
        insertRequest.input('Email', sql.NVarChar(100), email.toUpperCase());
        insertRequest.input('Ex_InvoicingAddressID', sql.Int, Ex_InvoicingAddressID);
        insertRequest.input('Password', sql.VarChar(128), password);
        insertRequest.input('VerificationToken', sql.NVarChar(100), verificationToken);
        insertRequest.input('VerificationTokenExpiry', sql.DateTime, verificationTokenExpiry);

        const insertResult = await insertRequest.query(insertQuery);
        const externalLoginID = insertResult.recordset[0].ExternalLoginID;

        let query = `
            SELECT 
                ExternalLoginID,
                Name,
                Surname,
                CallcenterUser,
                Cell,
                Email,
                Ex_InvoicingAddressID,
                Administrator,
                Enabled
            FROM Ex_Login
            WHERE ExternalLoginID = @ExternalLoginID`;

        let request = new sql.Request();
        request.input('ExternalLoginID', sql.Int, externalLoginID);
        let result = await request.query(query);

        if (result.recordset.length > 0) {
            const userInfo = result.recordset[0];

            // Enviar email de verificación
            await sendVerificationEmail(userInfo, verificationToken);

            res.status(201).json({
                message: "Usuario creado exitosamente. Se ha enviado un correo de verificación.",
                user: userInfo
            });
        } else {
            throw new Error("Error al crear el usuario");
        }

    } catch (err) {
        console.error('Error en registro:', err);
        res.status(500).json({
            error: 'Error al crear el usuario',
            details: err.message
        });
    }
};

AuthController.getDocumentTypes = async (req, res) => {
    try {
        const query = `
            SELECT 
                DocumentTypeID,
                Name
            FROM DocumentType
            ORDER BY DocumentTypeID`;

        const request = new sql.Request();
        const result = await request.query(query);

        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener tipos de documento:', err);
        res.status(500).json({
            error: 'Error al obtener los tipos de documento',
            details: err.message
        });
    }
};

export default AuthController;