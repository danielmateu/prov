import { connectToSql } from './config/db.js';
import app from './app.js';
import setupWebSocket from './websocket/websocket.js';  // Importa la configuración del WebSocket
import initScheduler from './common/cron.js';  // Importa cron

const port = process.env.PORT || 5090;
const initialDatabase = process.env.ENV_dbName

connectToSql(initialDatabase)
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });

        // Configurar WebSocket sobre el mismo servidor HTTP
        const io = setupWebSocket(server); // Asegúrate de pasar el servidor a WebSocket

        // Iniciar los cron jobs y pasar el objeto io
        initScheduler(io);
    })
    .catch((error) => {
        console.log('Error Connecting to SQL Server', error);
    })
