// Definición de tipos de usuario del sistema
export const USER_TYPES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin', 
    STANDARD_USER: 'standard_user',
    CALLCENTER_USER: 'callcenter_user'
};

export const USER_PERMISSIONS = {
    [USER_TYPES.SUPER_ADMIN]: {
        canAccessSuperAdmin: true,
        canAccessAdmin: true,
        canAccessStandard: true,
        canAccessCallcenter: true,
        canCreateUsers: true,
        canCreateBusinesses: true,
        canManageBilling: true,
        canManageFiscalData: true,
        canAccessReclamaciones: true,
        canAccessContabilidad: true,
        canAccessConsultas: true
    },
    [USER_TYPES.ADMIN]: {
        canAccessSuperAdmin: false,
        canAccessAdmin: true,
        canAccessStandard: true,
        canAccessCallcenter: false,
        canCreateUsers: true,
        canCreateBusinesses: true,
        canManageBilling: true,
        canManageFiscalData: true,
        canAccessReclamaciones: false,
        canAccessContabilidad: false,
        canAccessConsultas: false
    },
    [USER_TYPES.STANDARD_USER]: {
        canAccessSuperAdmin: false,
        canAccessAdmin: false,
        canAccessStandard: true,
        canAccessCallcenter: false,
        canCreateUsers: false,
        canCreateBusinesses: false,
        canManageBilling: false,
        canManageFiscalData: false,
        canAccessReclamaciones: false,
        canAccessContabilidad: false,
        canAccessConsultas: false
    },
    [USER_TYPES.CALLCENTER_USER]: {
        canAccessSuperAdmin: false,
        canAccessAdmin: false,
        canAccessStandard: true,
        canAccessCallcenter: true,
        canCreateUsers: false,
        canCreateBusinesses: false,
        canManageBilling: false,
        canManageFiscalData: false,
        canAccessReclamaciones: true,
        canAccessContabilidad: true,
        canAccessConsultas: true,
        canViewAllCustomers: true, // Permiso especial para ver todos los clientes
        canModifyCustomerData: true // Permiso especial para modificar datos de clientes
    }
};

export const getUserType = (userInfo) => {
    if (!userInfo) return USER_TYPES.STANDARD_USER;
    
    if (userInfo.SuperAdmin === true && userInfo.Administrator === true) {
        return USER_TYPES.SUPER_ADMIN;
    }
    
    if (userInfo.Administrator === true) {
        return USER_TYPES.ADMIN;
    }
    
    if (userInfo.CallcenterUser === true) {
        return USER_TYPES.CALLCENTER_USER;
    }
    
    return USER_TYPES.STANDARD_USER;
};

export const getUserPermissions = (userInfo) => {
    const userType = getUserType(userInfo);
    return USER_PERMISSIONS[userType] || USER_PERMISSIONS[USER_TYPES.STANDARD_USER];
};

export const hasPermission = (userInfo, permission) => {
    const permissions = getUserPermissions(userInfo);
    return permissions[permission] || false;
};