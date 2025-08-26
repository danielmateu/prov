import { z } from "zod";

const validateIdNumber = (value, documentType) => {
    if (!documentType) return false;

    const dniRegex = /^[0-9]{8}[A-Z]$/;
    const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;
    const cifRegex = /^[A-Z][0-9]{8}$/;

    switch (documentType) {
        case "1": // DNI
            return dniRegex.test(value);
        case "2": // NIE
            return nieRegex.test(value);
        case "3": // CIF
            return cifRegex.test(value);
        default:
            return false;
    }
};

const getIdNumberErrorMessage = (documentType) => {
    switch (documentType) {
        case "1":
            return "El DNI debe tener 8 números seguidos de una letra mayúscula";
        case "2":
            return "El NIE debe comenzar con X, Y o Z, seguido de 7 números y una letra mayúscula";
        case "3":
            return "El CIF debe comenzar con una letra mayúscula seguida de 8 números";
        default:
            return "Identificador fiscal inválido";
    }
};

const validateIBAN = (iban) => {
    // Remove spaces and convert to uppercase
    iban = iban.replace(/\s/g, '').toUpperCase();

    // Spanish IBAN format: ES + 2 digits + 20 digits (24 characters total)
    const ibanRegex = /^ES\d{2}\d{20}$/;

    if (!ibanRegex.test(iban)) {
        return false;
    }

    // Additional validation could be added here if needed
    return true;
};

const baseSchema = {
    tipo: z.enum(['0', '1']), // 0 para autonomo, 1 para empresa
    tipoDocumento: z.enum(['1', '2', '3']), // 1 para DNI, 2 para NIE, 3 para CIF
    numeroFiscal: z.string().min(1, 'El identificador fiscal es requerido'),
    nombreFiscal: z.string().min(1, 'El nombre fiscal es requerido'),
    direccion: z.string().min(5, 'La dirección es requerida'),
    codigoPostal: z.string()
        .length(5, 'El código postal debe tener 5 dígitos')
        .regex(/^[0-9]{5}$/, 'Código postal inválido'),
    ciudad: z.string().min(2, 'La ciudad es requerida'),
    provincia: z.string().min(2, 'La provincia es requerida'),
    telefonoMovil: z.string()
        .min(9, 'El número de móvil es requerido')
        .regex(/^\+?[0-9]+$/, 'Número de móvil inválido'),
    telefonoFijo: z.string()
        .regex(/^\+?[0-9]+$/, 'Número de teléfono inválido')
        .optional(),
    correoElectronico: z.string()
        .email('Correo electrónico inválido')
        .min(1, 'El correo electrónico es requerido'),
    contactoNombre: z.string().min(2, 'El nombre del contacto es requerido'),
    contactoTelefonoMovil: z.string()
        .min(9, 'El teléfono móvil debe tener al menos 9 dígitos')
        .regex(/^\+?[0-9]+$/, 'Número de móvil inválido'),
    contactoTelefonoFijo: z.string()
        .regex(/^\+?[0-9]+$/, 'Número de teléfono inválido')
        .optional(),
    iban: z.string()
        .min(1, 'El IBAN es requerido')
        .max(29, 'El IBAN no puede tener más de 29 caracteres')
        .refine((val) => validateIBAN(val), {
            message: 'IBAN inválido. Debe ser un IBAN español válido (ES + 22 dígitos)',
        }),
    nombreComercial: z.string()
        .max(50, 'El nombre comercial no puede tener más de 50 caracteres')
        .optional(),
};

export const fiscalDataSchema = z.discriminatedUnion('tipo', [
    z.object({
        ...baseSchema,
        tipo: z.literal('empresa'), // empresa
        nombre: z.string().optional(),
        primerApellido: z.string().optional(),
        segundoApellido: z.string().optional(),
    }),
    z.object({
        ...baseSchema,
        tipo: z.literal('autonomo'), // autónomo
        nombre: z.string()
            .min(2, 'El nombre es requerido')
            .max(50, 'El nombre no puede tener más de 50 caracteres'),
        primerApellido: z.string()
            .min(2, 'El apellido es requerido')
            .max(50, 'El apellido no puede tener más de 50 caracteres'),
        segundoApellido: z.string()
            .max(50, 'El segundo apellido no puede tener más de 50 caracteres')
            .optional(),
    })
]).refine((data) => validateIdNumber(data.numeroFiscal, data.tipoDocumento), {
    message: (data) => getIdNumberErrorMessage(data.tipoDocumento),
    path: ["numeroFiscal"],
});