import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";
import fs from "fs";

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../uploads/tickets");

// Verificar si la carpeta existe, si no, crearla
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const filePath = path.join(uploadPath, file.originalname);
        console.log('Subiendo archivo...');

        // Verificar si el archivo ya existe
        if (fs.existsSync(filePath)) {
            console.log(`El archivo ${file.originalname} ya existe. No se volverá a subir.`);
            return cb(null, file.originalname); // Usa el mismo nombre y evita el error
        }

        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

export default upload;