import sql from 'mssql';
import nodemailer from 'nodemailer';

export const handleError = (error, req, res, next, eventID = null, docEntry = null) => {
    let importance;

    if (error instanceof SomeCriticalError) {
        importance = 3; // Critical error
    } else if (error instanceof SomeMajorError) {
        importance = 2; // Error
    } else if (error instanceof SomeMinorError) {
        importance = 1; // Warning
    } else {
        importance = 0; // Informative
    }

    const errorResponse = {
        Importance: importance,
        Message: error.message || "An unknown error occurred",
        EventID: eventID,
        DocEntry: docEntry,
        RelevantData: error.stack || "No additional data available",
        url: req ? req.url : null
    };

    // Log the error (optional, but recommended)
    console.error(error);
    // console log the url of the request

    if (res) {
        // Send the response
        res.status(500).json(errorResponse);
    }

    // Call the next function with the error
    if (next) {
        next(error);
    }
};

export const fetchNTA = async (SelectedTime, All, DateFilter, ApparatusID, CustomerCoordinates, DateTypeID) => {
    try {
        const response = await fetch(`http://192.168.12.250:9030/HDPlus/rapitecnic/${SelectedTime}/${All}/${DateFilter}/${ApparatusID}/${CustomerCoordinates}/${DateTypeID}`)

        if (!response.ok) {
            const TechnicID = (await sql.query(`
                SELECT TOP 1 t.TechnicID
                FROM Technics t
                JOIN TechnicSpecialties ts ON ts.TechnicID = t.TechnicID AND t.TechnicID NOT IN(32, 164) AND t.Status = 1 AND t.Type IN (1, 3, 4) AND ts.Status = 1 AND ts.ApparatusID = ${ApparatusID}
                WHERE 
                    NOT EXISTS (
                        SELECT 1 
                        FROM TechnicBlockedDay tbd 
                        WHERE tbd.TechnicID = t.TechnicID
                        AND tbd.OrgEventID IN (
                            SELECT oev.OrgEventID
                            FROM OrgEvents oev
                            WHERE oev.Date = '${DateFilter}'
                        )) 
                    AND ((${DateTypeID} = 1 AND t.TechnicID NOT IN (
                            SELECT OrgElements.TechnicID 
                            FROM OrgElements 
                            JOIN OrgEvents ON OrgEvents.OrgEventID = OrgElements.OrgEventID 
                            JOIN OrgTypes ot ON ot.OrgTypeID = OrgElements.OrgTypeID AND ot.RequiredFields = 2 AND ot.WorkTime = 0
                            AND CAST(OrgEvents.Date AS DATE) = '${DateFilter}'
                            --AND OrgTypeID IN (5, 6, 7, 13, 21)
                        )) 
                    OR (
                        ${DateTypeID} > 1
                        AND t.TechnicID IN (
                            SELECT OrgElements.TechnicID 
                            FROM OrgElements 
                            JOIN OrgEvents ON OrgEvents.OrgEventID = OrgElements.OrgEventID 
                            AND CAST(OrgEvents.Date AS DATE) = '${DateFilter}'
                            AND OrgEvents.DateTypeID = ${DateTypeID}
                        )
                    ))
                ORDER BY ts.Priority ASC`)).recordset[0].TechnicID

            return TechnicID
        } else {
            const data = await response.json();
            return data[0].TechnicID
        }
    } catch (error) {
        console.error('error', error);
    }
}

const transporter = nodemailer.createTransport({
    host: 'mail.rapitecnic.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.ENV_EMAIL_USER,
        pass: process.env.ENV_EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
        servername: 'mail.rapitecnic.com'
    }
});

export const sendMail = async (asunto, mails, templateMail, attachments = []) => {
    try {
        const textMail = mails.join(', ');

        let mailOptions = {
            from: 'webmaster@rapitecnic.com',
            to: textMail,
            // to: 'asanchez@rapitecnic.com',
            bcc: 'abaco@rapitecnic.com',
            subject: asunto,
            html: templateMail,
            attachments: attachments,
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email enviado: ' + info.response)
            }
        })
    } catch (error) {
        console.error('error', error);
    }
}

export const calculatePVP = (coste) => {
    let extra = 0;

    if (coste >= 0.0001 && coste <= 120.99) {
        extra = 120;
    } else if (coste >= 121 && coste <= 180.99) {
        extra = 140;
    } else if (coste >= 181 && coste <= 250.99) {
        extra = 160;
    } else if (coste >= 251 && coste <= 330.99) {
        extra = 180;
    } else if (coste >= 331 && coste <= 450.99) {
        extra = 200;
    } else if (coste >= 451 && coste <= 600.99) {
        extra = 220;
    } else if (coste >= 601 && coste <= 800.99) {
        extra = 240;
    } else if (coste >= 801 && coste <= 1100.99) {
        extra = 300;
    } else if (coste >= 1101 && coste <= 6000.99) {
        extra = 500;
    } else if (coste >= 2001 && coste <= 3500.99) {
        extra = 750;
    } else if (coste >= 3501 && coste <= 5000.99) {
        extra = 900;
    } else if (coste >= 5001 && coste <= 7000.99) {
        extra = 1000;
    }

    const pvp = (coste + extra) * 1.21;
    return Math.round(pvp);
}