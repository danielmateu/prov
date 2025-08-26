import cron from 'node-cron';
import sql from 'mssql';


const initScheduler = (io) => {
    cron.schedule('*/1 * * * * *', async () => {
        // AVISOS SAT
        try {
            const today = new Date();
            const todayformatted = today.getFullYear().toString() +
                            (today.getMonth() + 1).toString().padStart(2, '0') +
                            today.getDate().toString().padStart(2, '0');
            //console.log('Checking for MainCounter');
            const request = new sql.Request();
            const GetMainCounters = await request.query(`
                SELECT  [ILOC]
                        ,[PendMaterial]
                        ,[PendInstallation]
                        ,[Cited]
                        ,[PendMaterialClient]
                        ,[Leads]
                        ,[AbsentClient]
                        ,[Accounting]
                    FROM [Rapitecnic].[dbo].[MainCounter]
                `);

            const GetSATs = await request.query(`
                SELECT NoticeHeader.DocEntry, NoticeHeader.IntranetDocEntry, Customers.Name as Cliente, Brands.Name as Marca, Apparatus.Name as Aparato, Customers.ZipCode, Customers.City, NoticeHeader.NoticeHeaderID, NoticeHeader.AutomaticLead, NoticeHeader.CreateDate as FECHA
                from NoticeHeader
                join Customers on NoticeHeader.CustomerID = Customers.CustomerID
                JOIN Apparatus on NoticeHeader.ApparatusID = Apparatus.ApparatusID
                JOIN Brands on NoticeHeader.BrandID = Brands.BrandID
                where NoticeHeader.AutomaticLead = 1 and noticeheader.statusid=1
                order by NoticeHeader.CreateDate asc
                `);

            const getAgendaTechnics = await request.query(`
                    SELECT distinct
                        t.Name,
                        t.TechnicID
                    FROM Technics t
                    JOIN OrganizerEvents oe ON t.TechnicID = oe.TechnicID AND oe.Date = '${todayformatted}'
                    WHERE t.TechnicID not in (164,32,47) AND t.Type < 5 AND t.Status = 1 AND t.TechnicID not in(SELECT OrgElements.TechnicID FROM OrgElements JOIN OrgEvents ON OrgEvents.OrgEventID = OrgElements.OrgEventID AND OrgEvents.Date = '${todayformatted}' where OrgElements.OrgTypeID = 5 or OrgElements.OrgTypeID = 7)
                    ORDER BY t.Name
                `);
            const Techniclist = getAgendaTechnics.recordset

            const Agenda= {}
            const avgTimes = {}
            const totalWorkTimes ={}
            for (const t of Techniclist) {
                const agendaQry = `
                    SELECT nh.DocEntry, nh.StatusID, oe.StartTime, oe.EndTime, oe.VisitStart, oe.[Index],
                           Status.Name, Apparatus.NAME, oe.Time, oe.VisitEnd, Status.Color
                    FROM OrganizerEvents oe
                    JOIN NoticeHeader nh ON nh.NoticeHeaderID = oe.NoticeHeaderID
                    JOIN Customers ON Customers.CustomerID = nh.CustomerID
                    JOIN Apparatus ON Apparatus.ApparatusID = nh.ApparatusID
                    JOIN Status ON Status.StatusID = nh.StatusID
                    WHERE oe.Date = '${todayformatted}' AND oe.TechnicID = '${t.TechnicID}'
                    ORDER BY [Index]
                `;

                // Consulta para el promedio de tiempos
                const avgtimesQry = `
                SELECT AVG(OrganizerEvents.TimeValue)/60 AS AvgTime
                FROM OrganizerEvents
                JOIN Technics ON Technics.TechnicID = OrganizerEvents.TechnicID
                JOIN NoticeHeader ON NoticeHeader.NoticeHeaderID = OrganizerEvents.NoticeHeaderID
                JOIN Status ON Status.StatusID = NoticeHeader.StatusID
                WHERE OrganizerEvents.TimeValue <> ''
                AND Status.PersonalGroupID > 0
                AND OrganizerEvents.Date = '${todayformatted}'
                AND OrganizerEvents.TechnicID = ${t.TechnicID}
                `;
                const TotalWorkTimeQry =`
                SELECT
                    sum(DATEDIFF(MINUTE,
                        CAST(OrganizerEvents.VisitStart AS DATETIME),
                        CAST(OrganizerEvents.VisitEnd AS DATETIME)
                    )) AS Tiempo_trabajado
                FROM OrganizerEvents
                JOIN NoticeHeader ON NoticeHeader.NoticeHeaderID = OrganizerEvents.NoticeHeaderID
                    AND OrganizerEvents.VisitStart <> ''
                    AND OrganizerEvents.TechnicID = ${t.TechnicID}
                    AND OrganizerEvents.Date = '${todayformatted}'
                    AND CAST(OrganizerEvents.VisitStart AS DATE) = '${todayformatted}'
                    AND CAST(OrganizerEvents.VisitEnd AS DATE) = '${todayformatted}'
                JOIN Status ON Status.StatusID = NoticeHeader.StatusID
                    AND Status.GroupID <> '40';`

                const AgendaTechnic = await request.query(agendaQry); // Ejecutar la consulta
                const getAVGTimes = await request.query(avgtimesQry)
                const getTotalWorkTime = await request.query(TotalWorkTimeQry)
                avgTimes[t.TechnicID] = getAVGTimes.recordset.length > 0
                    ? getAVGTimes.recordset[0].AvgTime
                    : null;
                Agenda[t.Name] = AgendaTechnic.recordset;

                totalWorkTimes[t.TechnicID] = getTotalWorkTime.recordset.length > 0
                    ? getTotalWorkTime.recordset[0]
                    : null;
            }
            //console.log(totalWorkTimes)
            const MainCounter = GetMainCounters.recordset[0];
            const SATTable = GetSATs.recordset

            //console.log(counters)
            io.emit('Data', { maincounters: MainCounter, SATTable:SATTable, TechnicList:Techniclist, Agenda:Agenda, AVGTimes:avgTimes, totalWorkTimes:totalWorkTimes
             });



        } catch (e) {
            console.log(e)
        }
    })
};

export default initScheduler;