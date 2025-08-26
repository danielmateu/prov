import cron from 'node-cron';
import sql from 'mssql';

const getMainCounters = async () => {
    return await sql.query(`
        SELECT ILOC, PendMaterial, PendInstallation, Cited, PendMaterialClient, 
               Leads, AbsentClient, Accounting
        FROM MainCounter
    `);
};

const getSATs = async () => {
    return await sql.query(`SELECT * FROM [vw_GetSATNotices]`);
};

const unreadComments = async (LoginID) => {
    return (await sql.query(`SELECT COUNT(*) AS count FROM TicketCommentReadStatus WHERE UserID = ${LoginID} AND IsRead = 0`)).recordset[0];
};

const getPendingMaterial = async () => {
    return await sql.query(`
        SELECT
                nl.NoticeLineID,
                nh.LastVisit,
                nh.DocEntry,
                T0.Name AS FirstTechnic,
                spl.Name AS SupplierName,
                nl.Description,
                s.Name AS StatusName,
                nl.RevisionDate,
                nl.Observations,
                l.UserName,
                nh.NoticeHeaderID,
                nl.DeliveryDate,
                nl.SupplierID,
                c.Address,
                a.Name AS ApparatusName,
                b.Name AS BrandName,
                c.City,
                c.CustomerID,
                T1.Name AS TechnicName,
                nl.StatusID,
                nl.Qty,
                nh.Model
            FROM NoticeHeader nh
            JOIN Technics AS T0 ON T0.TechnicID = nh.FirstTechnicID AND (T0.Type = 1 OR T0.Type = 5)
            JOIN Technics AS T1 ON T1.TechnicID = nh.TechnicID AND (T1.Type = 1 OR T1.Type = 5)
            JOIN NoticeLines nl ON nl.NoticeHeaderID = nh.NoticeHeaderID AND nl.ProductTypeID = 1
            LEFT JOIN Suppliers spl ON spl.SupplierID = nl.SupplierID
            LEFT JOIN Login l ON l.LoginID = nl.RevisionBy
            JOIN Apparatus a ON a.ApparatusID = nh.ApparatusID
            JOIN Brands b ON b.BrandID = nh.BrandID
            JOIN Customers c ON c.CustomerID = nh.CustomerID
            JOIN Status s ON s.StatusID = nl.StatusID
            WHERE nh.StatusID = 23 AND nl.Delivered = 0
            ORDER BY nh.LastVisit DESC`);
};

const getControlSales = async () => {
    return await sql.query(`
        SELECT
                nl.NoticeLineID,
                nh.LastVisit,
                nh.DocEntry,
                T0.Name AS FirstTechnic,
                spl.Name AS SupplierName,
                nl.Description,
                s.Name AS StatusName,
                nl.RevisionDate,
                nl.Observations,
                l.UserName,
                nh.NoticeHeaderID,
                nl.DeliveryDate,
                nl.SupplierID,
                c.Address,
                a.Name AS ApparatusName,
                b.Name AS BrandName,
                c.City,
                c.CustomerID,
                T1.Name AS TechnicName,
                nl.StatusID,
                nl.Qty,
                nh.Model
            FROM NoticeHeader nh
            JOIN Technics AS T0 ON T0.TechnicID = nh.FirstTechnicID AND (T0.Type = 1 OR T0.Type = 5)
            JOIN Technics AS T1 ON T1.TechnicID = nh.TechnicID AND (T1.Type = 1 OR T1.Type = 5)
            JOIN NoticeLines nl ON nl.NoticeHeaderID = nh.NoticeHeaderID AND nl.ProductTypeID = 2
            LEFT JOIN Suppliers spl ON spl.SupplierID = nl.SupplierID
            LEFT JOIN Login l ON l.LoginID = nl.RevisionBy
            JOIN Apparatus a ON a.ApparatusID = nh.ApparatusID
            JOIN Brands b ON b.BrandID = nh.BrandID
            JOIN Customers c ON c.CustomerID = nh.CustomerID
            JOIN Status s ON s.StatusID = nl.StatusID
            WHERE nh.StatusID = 35 AND nl.Delivered = 0
            ORDER BY nh.LastVisit DESC`);
};

const fetchMeetingInvitations = async (LoginID) => {

    // const invitations = (await sql.query(`
    //     SELECT 
    //         m.MeetingID,
    //         m.MeetingDate,
    //         m.StartTime,
    //         m.EndTime,
    //         m.Subject,
    //         m.MeetingObservation,
    //         mp.EmployeeID,
    //         mp.Notified,
    //         mp.Confirmated
    //     FROM Meetings m
    //     JOIN MeetingParticipants mp ON mp.MeetingID = m.MeetingID AND m.OrganizerEmployeeID <> mp.EmployeeID AND mp.EmployeeID = ${LoginID} AND mp.Confirmated = 0 AND mp.Notified = 0
    //     ORDER BY m.MeetingDate, m.StartTime, m.EndTime`)).recordset

    // return invitations
    return []
};

const initScheduler = (io) => {
    let selectedDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Fecha por defecto: hoy

    const userLoginIDs = new Map();

    io.on('connection', (socket) => {
        // Escuchar cambio de fecha desde el frontend
        socket.on('changeDate', (date) => {
            selectedDate = date
        });

        // Escuchar el LoginID enviado por el cliente
        socket.on('setLoginID', (loginID) => {
            userLoginIDs.set(socket.id, loginID); // Asociar LoginID con socket.id
        });
    });

    cron.schedule('*/5 * * * * *', async () => {    // Cada 5 segundos
        try {
            // Consultas base
            const MainCounter = (await getMainCounters()).recordset[0];
            const SATTable = (await getSATs()).recordset;

            // Obtener invitaciones para cada cliente conectado
            for (const [socketId, loginID] of userLoginIDs) {
                const unreadComment = await unreadComments(loginID);
                const Meetings = await fetchMeetingInvitations(loginID);

                // Emitir datos solo al cliente correspondiente
                io.to(socketId).emit('Data', {
                    maincounters: MainCounter,
                    SATTable,
                    Meetings,
                    unreadComment,
                });
            }
        } catch (e) {
            console.error('Error en WebSocket (5 segundos):', e);
        }
    });

    // Función para obtener y emitir pendingMaterial
    const fetchAndEmitPendingMaterial = async () => {
        try {
            const pendingMaterial = (await getPendingMaterial()).recordset;
            const controlSales = (await getControlSales()).recordset;

            // Emitir datos relacionados con material pendiente
            io.emit('PendingMaterialData', { pendingMaterial, controlSales, });
        } catch (e) {
            console.error('Error al obtener/emitir pendingMaterial:', e);
        }
    };

    // Llamar a la función inmediatamente
    fetchAndEmitPendingMaterial();

    // Programar el cron job para cada 2 minutos
    cron.schedule('*/2 * * * *', fetchAndEmitPendingMaterial);
};

export default initScheduler;