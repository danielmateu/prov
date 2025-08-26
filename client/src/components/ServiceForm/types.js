import { useTranslation } from "react-i18next";
import { z } from "zod";


const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];


// export const formSchema = z.object({
//     nombre: z.string().min(1, 'El nombre es requerido'),
//     apellido: z.string().min(1, 'El apellido es requerido'),
//     segundoApellido: z.string().optional(),
//     telefono: z.string()
//         .min(9, 'El teléfono debe tener al menos 9 dígitos')
//         .regex(/^\d+$/, 'El teléfono solo debe contener números'),
//     direccion: z.string().min(1, 'La dirección es requerida'),
//     pisoPuerta: z.string().
//         min(1, 'El piso y puerta son requeridos')
//         .optional(),
//     cp: z.string()
//         .length(5, 'El código postal debe tener 5 dígitos')
//         .regex(/^\d+$/, 'El código postal solo debe contener números'),
//     poblacion: z.string().optional(),
//     provincia: z.string().optional(),
//     lat: z.string().optional(),
//     lng: z.string().optional(),
//     email: z.string()
//         .email('El email no es válido')
//         .optional(),
//     enGarantia: z.boolean().default(false),
//     aparato: z.string().min(1, 'El aparato es requerido'),
//     aparatoId: z.number().optional(),
//     marca: z.string().optional(),
//     marcaId: z.number().optional(),
//     modelo: z.string().optional(),
//     modeloId: z.string().optional(),
//     // tipo: z.string().optional(),
//     // tipoId: z.number().optional(),
//     comentario: z.string().max(500, 'El comentario no puede exceder los 500 caracteres').optional(),
//     // Campos específicos para garantía
//     telefonoSAT: z.string()
//         .min(9, 'El teléfono SAT debe tener al menos 9 dígitos')
//         .regex(/^\d+$/, 'El teléfono SAT solo debe contener números')
//         .optional(),
//     numeroFactura: z.string().min(1, 'El número de factura es requerido').optional(),
//     fechaCompra: z.string().min(1, 'La fecha de compra es requerida').optional(),
//     facturaFile: z.instanceof(FileList)
//         .refine((files) => files?.length === 1, "La factura es requerida")
//         .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "El archivo no puede superar los 5MB")
//         .refine(
//             (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
//             "Solo se aceptan archivos JPG, PNG o PDF"
//         )
//         .optional(),
//     ex_cell: z.string().optional(),
//     servicetypeid: z.number().default(1),
//     externalLoginID: z.number().optional(),
// });

export const formSchema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido'),
    // apellido: z.string().min(1, 'El apellido es requerido'),
    apellido: z.string().optional(),
    segundoApellido: z.string().optional(),
    telefono: z.string()
        .min(9, 'El teléfono debe tener al menos 9 dígitos')
        .max(13, 'Télefono incorrecto')
        .regex(/^\d+$/, 'El teléfono solo debe contener números'),
    direccion: z.string().min(1, 'La dirección es requerida'),
    // pisoPuerta: z.string().optional(),
    pisoPuerta: z.string().min(1, 'Este campo es requerido'),
    cp: z.string()
        .min(1, 'El código postal es requerido')
        .regex(/^\d+$/, 'El código postal solo debe contener números'),
    poblacion: z.string().min(1, 'La población es requerida'),
    provincia: z.string().optional(),
    lat: z.string().optional(),
    lng: z.string().optional(),
    email: z.string().optional(),
    enGarantia: z.boolean().default(false),
    aparato: z.string().min(1, 'El aparato es requerido'),
    aparatoId: z.number().optional(),
    marca: z.string().min(1, 'La marca es requerida'),
    marcaId: z.number().optional(),
    modelo: z.string().optional(),
    modeloId: z.string().optional(),
    comentarioAveria: z.string().max(500, 'El comentario no puede exceder los 500 caracteres ni tener menos de 5 caracteres')
        .min(5, 'El comentario no puede tener menos de 5 caracteres'),
    comentario: z.string().max(500, 'El comentario no puede exceder los 500 caracteres').optional(),
    telefonoSAT: z.string()
        .min(9, 'El teléfono SAT debe tener al menos 9 dígitos')
        .regex(/^\d+$/, 'El teléfono SAT solo debe contener números')
        .optional(),
    numeroFactura: z.string().optional(),
    fechaCompra: z.string().optional(),
    facturaFile: z.any().optional(),
    ex_cell: z.string().optional(),
    servicetypeid: z.number().default(1),
    externalLoginID: z.number().optional(),
    externalInvoicingAddressID: z.number().optional(),
});


// import { useTranslation } from "react-i18next";
// import { z } from "zod";

// const MAX_FILE_SIZE = 5000000; // 5MB
// const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

// // Create a function that generates the schema with translated error messages
// export const createFormSchema = (t) => z.object({
//     nombre: z.string().min(1, t('ValidationErrors.NameRequired', 'El nombre es requerido')),
//     apellido: z.string().min(1, t('ValidationErrors.SurnameRequired', 'El apellido es requerido')),
//     segundoApellido: z.string().optional(),
//     telefono: z.string()
//         .min(9, t('ValidationErrors.PhoneLength', 'El teléfono debe tener al menos 9 dígitos'))
//         .regex(/^\d+$/, t('ValidationErrors.PhoneFormat', 'El teléfono solo debe contener números')),
//     direccion: z.string().min(1, t('ValidationErrors.AddressRequired', 'La dirección es requerida')),
//     pisoPuerta: z.string().
//         min(1, t('ValidationErrors.FloorDoorRequired', 'El piso y puerta son requeridos'))
//         .optional(),
//     cp: z.string()
//         .length(5, t('ValidationErrors.ZipCodeLength', 'El código postal debe tener 5 dígitos'))
//         .regex(/^\d+$/, t('ValidationErrors.ZipCodeFormat', 'El código postal solo debe contener números')),
//     poblacion: z.string().optional(),
//     provincia: z.string().optional(),
//     lat: z.string().optional(),
//     lng: z.string().optional(),
//     email: z.string()
//         .email(t('ValidationErrors.EmailInvalid', 'El email no es válido'))
//         .optional(),
//     enGarantia: z.boolean().default(false),
//     aparato: z.string().min(1, t('ValidationErrors.DeviceRequired', 'El aparato es requerido')),
//     aparatoId: z.number().optional(),
//     marca: z.string().optional(),
//     marcaId: z.number().optional(),
//     modelo: z.string().optional(),
//     modeloId: z.string().optional(),
//     comentario: z.string().max(500, t('ValidationErrors.CommentLength', 'El comentario no puede exceder los 500 caracteres')).optional(),
//     // Campos específicos para garantía
//     telefonoSAT: z.string()
//         .min(9, t('ValidationErrors.SATPhoneLength', 'El teléfono SAT debe tener al menos 9 dígitos'))
//         .regex(/^\d+$/, t('ValidationErrors.SATPhoneFormat', 'El teléfono SAT solo debe contener números'))
//         .optional(),
//     numeroFactura: z.string().min(1, t('ValidationErrors.InvoiceNumberRequired', 'El número de factura es requerido')).optional(),
//     fechaCompra: z.string().min(1, t('ValidationErrors.PurchaseDateRequired', 'La fecha de compra es requerida')).optional(),
//     facturaFile: z.instanceof(FileList)
//         .refine((files) => files?.length === 1, t('ValidationErrors.InvoiceRequired', "La factura es requerida"))
//         .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, t('ValidationErrors.FileSizeLimit', "El archivo no puede superar los 5MB"))
//         .refine(
//             (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
//             t('ValidationErrors.FileTypeAccepted', "Solo se aceptan archivos JPG, PNG o PDF")
//         )
//         .optional(),
//     ex_cell: z.string().optional(),
//     servicetypeid: z.number().default(1),
//     externalLoginID: z.number().optional(),
// });

// // Hook to get the form schema with current translations
// export function useFormSchema() {
//     const { t } = useTranslation();
//     return createFormSchema(t);
// }

// // Export the original schema for backward compatibility
// export const formSchema = createFormSchema((key, defaultValue) => defaultValue);