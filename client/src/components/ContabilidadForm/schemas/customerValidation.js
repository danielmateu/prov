import { z } from 'zod';

// Esquemas de validación para diferentes tipos de campos
export const customerFieldSchemas = {
    // Información Personal
    Name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres'),
    // .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),

    Surname: z.string()
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(50, 'El apellido no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios'),

    SecondSurname: z.string()
        .min(2, 'El segundo apellido debe tener al menos 2 caracteres')
        .max(50, 'El segundo apellido no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El segundo apellido solo puede contener letras y espacios')
        .optional()
        .or(z.literal('')),

    DNI: z.string()
        .regex(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i, 'Formato de DNI inválido (ej: 12345678A)')
        .refine((dni) => {
            const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const number = parseInt(dni.slice(0, 8));
            const letter = dni.slice(8).toUpperCase();
            return letters[number % 23] === letter;
        }, 'La letra del DNI no es correcta'),

    // Contacto
    Phone: z.string()
        .regex(/^[679][0-9]{8}$/, 'El teléfono debe tener 9 dígitos y empezar por 6, 7 o 9')
        .optional()
        .or(z.literal('')),

    Cell: z.string()
        .regex(/^[679][0-9]{8}$/, 'El móvil debe tener 9 dígitos y empezar por 6, 7 o 9'),

    Email: z.string()
        .email('Formato de email inválido')
        .max(100, 'El email no puede exceder 100 caracteres')
        .optional()
        .or(z.literal('')),

    // Dirección
    Address: z.string()
        .min(5, 'La dirección debe tener al menos 5 caracteres')
        .max(100, 'La dirección no puede exceder 100 caracteres'),

    AddressNext: z.string()
        .max(50, 'El complemento de dirección no puede exceder 50 caracteres')
        .optional()
        .or(z.literal('')),

    City: z.string()
        .min(2, 'La ciudad debe tener al menos 2 caracteres')
        .max(50, 'La ciudad no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-\.]+$/, 'La ciudad solo puede contener letras, espacios, guiones y puntos'),

    ZipCode: z.string()
        .regex(/^[0-9]{5}$/, 'El código postal debe tener exactamente 5 dígitos'),

    State: z.string()
        .min(2, 'La provincia debe tener al menos 2 caracteres')
        .max(50, 'La provincia no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-\.]+$/, 'La provincia solo puede contener letras, espacios, guiones y puntos')
};

// Esquema para la solicitud de modificación completa
export const modificationRequestSchema = z.object({
    customerID: z.number().positive('ID de cliente inválido'),
    field: z.string().min(1, 'Campo requerido'),
    fieldLabel: z.string().min(1, 'Etiqueta de campo requerida'),
    currentValue: z.string(),
    newValue: z.string().min(1, 'El nuevo valor es requerido'),
    reason: z.string()
        .min(10, 'La razón debe tener al menos 10 caracteres')
        .max(500, 'La razón no puede exceder 500 caracteres'),
    // priority: z.enum(['low', 'medium', 'high'], {
    //     errorMap: () => ({ message: 'Prioridad inválida' })
    // }),
    requestedBy: z.string().min(1, 'Solicitante requerido'),
    requestDate: z.string().datetime('Fecha inválida')
});

// Función para validar un campo específico
export const validateField = (fieldName, value) => {
    const schema = customerFieldSchemas[fieldName];
    if (!schema) {
        return { success: false, error: 'Campo no válido para validación' };
    }

    try {
        schema.parse(value);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.errors[0]?.message || 'Valor inválido'
        };
    }
};

// Función para obtener sugerencias de formato para cada campo
export const getFieldFormatHint = (fieldName) => {
    const hints = {
        Name: 'Solo letras y espacios, 2-50 caracteres',
        Surname: 'Solo letras y espacios, 2-50 caracteres',
        SecondSurname: 'Solo letras y espacios, 2-50 caracteres (opcional)',
        DNI: 'Formato: 12345678A (8 números + letra)',
        Phone: '9 dígitos empezando por 6, 7 o 9 (opcional)',
        Cell: '9 dígitos empezando por 6, 7 o 9',
        Email: 'Formato válido de email (opcional)',
        Address: 'Mínimo 5 caracteres, máximo 100',
        AddressNext: 'Máximo 50 caracteres (opcional)',
        City: 'Solo letras, espacios, guiones y puntos, 2-50 caracteres',
        ZipCode: 'Exactamente 5 dígitos',
        State: 'Solo letras, espacios, guiones y puntos, 2-50 caracteres'
    };

    return hints[fieldName] || '';
};