import sql from 'mssql';
import mysql from 'mysql2/promise' // Cliente de MySQL
import express from 'express'
import dotenv from 'dotenv';

dotenv.config(); // Configurar dotenv para cargar las variables de entorno

const app = express()
app.use(express.json())

// const sqlConfig = {
//     user: 'CallCenter',
//     password: 'N?x~Af6pvo-J7cmi1.',
//     server: '192.168.12.200',
//     database: 'Rapitecnic',
//     options: {
//         encrypt: false,
//         enableArithAbort: false
//     },
//   options: {
//     encrypt: true, // for azure
//     trustServerCertificate: true // change to true for local dev / self-signed certs
//   }
// };

let dbname = 'Rapitecnic'

app.post('/CompanyName', async (req, res) => {
    try {
        const { CompanyName } = req.body;

        dbname = CompanyName

        // await connectToSql(CompanyName)

    } catch (error) {
        console.error('Error al cambiar la base de datos', error)
    }
})

export const connectToSql = async (CompanyName) => {
    try {
        const config = {
            user: process.env.ENV_user,
            password: process.env.ENV_password,
            server: process.env.ENV_server,
            database: CompanyName,
            options: {
                encrypt: false,
                enableArithAbort: false
            },
            options: {
                encrypt: true, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
            }
        };
        // const pool = await sql.connect(config);
        await sql.close()
        await sql.connect(config);
        // return pool;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
}

// export const connectToSql = async () => {
//   try {
//     // await sql.connect(sqlConfig);
//     await connectToDatabase(dbname)
//     // connectionPool = await sql.connect(sqlConfig)
//     console.log('Connected to SQL Server');
//   } catch (error) {
//     console.error('Error connecting to SQL Server:', error);
//     throw error;
//   }
// };

let mysqlPool;

export const connectToMySql = async () => {
    if (mysqlPool) {
        return mysqlPool
    }
    try {
        const mysqlConfig = {
            host: process.env.ENV_mysql_server,
            user: process.env.ENV_mysql_user,
            password: process.env.ENV_mysql_password,
            database: process.env.ENV_mysql_dbName,
            timezone: 'Z',
        };
        mysqlPool = await mysql.createPool(mysqlConfig);
        console.log('Connected to MySQL');

        return mysqlPool;
    } catch (error) {
        console.error('Error al conectar con MySQL:', error);
        throw error;
    }
}