// Validation rules for customer data
export const validatePhone = (phone) => {
    // Spanish phone number format (9 digits, can start with 6, 7, or 9)
    const phoneRegex = /^[679][0-9]{8}$/;
    return phoneRegex.test(phone);
};

export const validateName = (name) => {
    // Name should be at least 2 characters and contain only letters and spaces
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;
    return nameRegex.test(name.trim());
};

export const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === '' || emailRegex.test(email); // Email is optional
};

export const validateDocument = (type, number) => {
    if (!number) return false;

    const patterns = {
        dni: /^[0-9]{8}[A-Z]$/,
        nie: /^[XYZ][0-9]{7}[A-Z]$/,
        nif: /^[A-Z][0-9]{8}$/,
        passport: /^[A-Z0-9]{6,12}$/
    };

    const pattern = patterns[type];
    return pattern.test(number.toUpperCase());
};

export const validatePostalCode = (cp) => {
    // Spanish postal code format (5 digits)
    const cpRegex = /^[0-9]{5}$/;
    return cpRegex.test(cp);
};


export const validateCustomerData = (data) => {
    const errors = {};

    // Phone validation
    // if (!validatePhone(data.phoneNumber)) {
    //     errors.phoneNumber = "Teléfono móvil inválido. Debe tener 9 dígitos y empezar por 6, 7 o 9";
    // }

    // if (data.landline && !validatePhone(data.landline)) {
    //     errors.landline = "Teléfono fijo inválido. Debe tener 9 dígitos y empezar por 6, 7 o 9";
    // }

    // Name validation
    // if (!validateName(data.nombre)) {
    //     errors.nombre = "El nombre debe contener al menos 2 caracteres y solo letras";
    // }

    // if (!validateName(data.apellido1)) {
    //     errors.apellido1 = "El primer apellido debe contener al menos 2 caracteres y solo letras";
    // }

    // if (data.apellido2 && !validateName(data.apellido2)) {
    //     errors.apellido2 = "El segundo apellido debe contener solo letras";
    // }

    // Email validation (optional)
    if (data.email && !validateEmail(data.email)) {
        errors.email = "Email inválido";
    }

    // Document validation
    // if (!validateDocument(data.documentType, data.documentNumber)) {
    //     errors.documentNumber = "Documento de identidad inválido";
    // }

    // Address validation
    // if (!data.calle?.trim()) {
    //     errors.calle = "La dirección es obligatoria";
    // }

    // if (!data.piso?.trim()) {
    //     errors.piso = "El piso/puerta es obligatorio";
    // }

    // if (!validatePostalCode(data.cp)) {
    //     errors.cp = "Código postal inválido";
    // }

    // if (!data.poblacion?.trim()) {
    //     errors.poblacion = "La población es obligatoria";
    // }

    return errors;
};