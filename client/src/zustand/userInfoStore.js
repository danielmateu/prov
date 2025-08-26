import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserInfoStore = create(
    persist(
        (set, get) => ({
            userInfo: null,
            isAuthenticated: false,

            // Set user info from login/registration
            setUserInfo: (userInfo) => set({
                userInfo,
                isAuthenticated: true
            }),

            // Update specific user fields
            updateUserInfo: (updates) => set((state) => ({
                userInfo: state.userInfo ? { ...state.userInfo, ...updates } : null
            })),

            // Get user profile for invoice generation
            getUserProfile: () => {
                const { userInfo } = get();
                if (!userInfo) return null;

                return {
                    name: `${userInfo.Name || ''} ${userInfo.Surname || ''}`.trim(),
                    taxName: userInfo.CompanyName || userInfo.TaxName || `${userInfo.Name || ''} ${userInfo.Surname || ''}`.trim(),
                    nif: userInfo.IDNumber || userInfo.NIF || '',
                    address: userInfo.Address || '',
                    city: userInfo.City || '',
                    postalCode: userInfo.ZipCode || userInfo.PostalCode || '',
                    province: userInfo.Province || '',
                    email: userInfo.Email || '',
                    phone: userInfo.Phone || userInfo.Cell || '',
                    iban: userInfo.IBAN || '',
                    isAutonomo: userInfo.UserType === 'autonomo' || true,
                    irpfRate: userInfo.IRPFRate || 15
                };
            },

            // Get safe user info for components (with fallbacks)
            getSafeUserInfo: () => {
                const { userInfo } = get();
                if (!userInfo) {
                    return {
                        Name: '',
                        Surname: '',
                        TaxName: '',
                        Email: '',
                        UserName: '',
                        Administrator: false,
                        role: 'user'
                    };
                }

                return {
                    ...userInfo,
                    UserName: userInfo.UserName || `${userInfo.Name || ''} ${userInfo.Surname || ''}`.trim() || userInfo.Email || 'Usuario',
                    role: userInfo.Administrator ? 'admin' : 'user'
                };
            },

            // Clear user data on logout
            clearUserInfo: () => set({
                userInfo: null,
                isAuthenticated: false
            }),

            // Get authentication token
            getToken: () => {
                return localStorage.getItem('token');
            },

            // Update IBAN specifically
            updateIBAN: (iban) => set((state) => ({
                userInfo: state.userInfo ? { ...state.userInfo, IBAN: iban } : null
            }))
        }),
        {
            name: 'user-info-storage',
            // Only persist essential data
            partialize: (state) => ({
                userInfo: state.userInfo,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);