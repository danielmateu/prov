const validatePhone = (phone) => {
    const phoneRegex = /^[679][0-9]{8}$/;
    return phoneRegex.test(phone);
};

// Validación de nombre y apellidos
const validateName = (name) => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{1,}$/;
    return nameRegex.test(name.trim());
};

// Validación de email
// Validación de email usando una expresión regular
const validateEmail = (email) => {
    if (!email) return false;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};


// Validación de documento de identidad
const validateDocument = (document, type = 'dni') => {
    if (!document) return false;

    const patterns = {
        dni: /^[0-9]{8}[A-Z]$/,
        nie: /^[XYZ][0-9]{7}[A-Z]$/,
        nif: /^[A-Z][0-9]{8}$/,
        passport: /^[A-Z0-9]{6,12}$/
    };

    const pattern = patterns[type.toLowerCase()] || patterns.dni;
    return pattern.test(document.toUpperCase());
};

// Validación de dirección
const validateStreet = (street) => {
    if (!street) return false;
    // La calle debe tener al menos 3 caracteres y puede contener letras, números, espacios y caracteres especiales comunes
    return street.trim().length >= 3 && /^[A-Za-zÀ-ÿ0-9\s\.,\-\/ºª]{3,}$/i.test(street);
};

const validateApartment = (apartment) => {
    // El piso puede contener letras, números y caracteres especiales comunes
    return apartment.trim().length > 0 && /^[A-Za-zÀ-ÿ0-9\s\.,\-\/ºª]{1,}$/i.test(apartment);
};

/// Validación de código postal
const validatePostalCode = (cp) => {
    const cpRegex = /^[0-9]{5}$/;
    return cpRegex.test(cp);
};

// Validación de población
const validateCity = (city) => {
    // La población debe tener al menos 2 caracteres y solo puede contener letras y espacios
    return city.trim().length >= 2 && /^[A-Za-zÀ-ÿ\s]{2,}$/i.test(city);
};

export {
    validatePhone,
    validateName,
    validateEmail,
    validateDocument,
    validateStreet,
    validateApartment,
    validatePostalCode,
    validateCity
}