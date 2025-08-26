import { useUserInfoStore } from '@/zustand/userInfoStore';
import { getUserPermissions, hasPermission, getUserType } from '@/types/userTypes';

export const useUserPermissions = () => {
    const { userInfo } = useUserInfoStore();
    
    const permissions = getUserPermissions(userInfo);
    const userType = getUserType(userInfo);
    
    const checkPermission = (permission) => {
        return hasPermission(userInfo, permission);
    };
    
    return {
        userType,
        permissions,
        checkPermission,
        isSuper: userType === 'super_admin',
        isAdmin: userType === 'admin',
        isStandard: userType === 'standard_user',
        isCallcenter: userType === 'callcenter_user'
    };
};