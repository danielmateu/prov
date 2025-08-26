import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useUserInfoStore } from '../stores/userInfoStore';
import { useToast } from './use-toast';
import { useUserInfoStore } from '@/zustand/userInfoStore';

const apiUrl = import.meta.env.VITE_API_URL;

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUserInfo, clearUserInfo } = useUserInfoStore();
    const { toast } = useToast();

    const login = async ({ email, password, empresa }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/authcontroller/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ empresa, email, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const data = await response.json();
            const { userInfo, token } = data;

            // Ensure userInfo has all required fields with fallbacks
            const normalizedUserInfo = {
                ...userInfo,
                UserName: userInfo.UserName || `${userInfo.Name || ''} ${userInfo.Surname || ''}`.trim() || userInfo.Email || 'Usuario',
                Administrator: userInfo.Administrator || false,
                Name: userInfo.Name || '',
                Surname: userInfo.Surname || '',
                Email: userInfo.Email || email,
                TaxName: userInfo.TaxName || userInfo.CompanyName || '',
                IBAN: userInfo.IBAN || '',
                City: userInfo.City || '',
                Province: userInfo.Province || '',
                ZipCode: userInfo.ZipCode || '',
                Phone: userInfo.Phone || userInfo.Cell || '',
                Address: userInfo.Address || '',
                IDNumber: userInfo.IDNumber || userInfo.NIF || ''
            };

            // Store in Zustand
            setUserInfo(normalizedUserInfo);

            // Only store essential items in localStorage (tokens, session data)
            const essentialStorageItems = {
                token,
                empresa,
                justLoggedIn: 'true',
                workdayStatus: '0',
                // Keep some backward compatibility items
                UserName: normalizedUserInfo.UserName,
                role: normalizedUserInfo.Administrator ? 'admin' : 'user',
                LoginID: userInfo.ExternalLoginID || '',
                email: normalizedUserInfo.Email,
                profile: userInfo.ExternalLoginID || '',
                city: normalizedUserInfo.City,
                province: normalizedUserInfo.Province,
                zipCode: normalizedUserInfo.ZipCode,
                iban: normalizedUserInfo.IBAN
            };

            Object.entries(essentialStorageItems).forEach(([key, value]) => {
                localStorage.setItem(key, String(value));
            });

            navigate('/inicio');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al conectar con el servidor');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async ({
        address,
        cell,
        city,
        companyName,
        email,
        empresa,
        idnumber,
        name,
        password,
        phone,
        province,
        secondSurname,
        surname,
        zipCode,
        documentType,
        userType,
    }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/authcontroller/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    cell,
                    city,
                    companyName,
                    email,
                    empresa,
                    idnumber,
                    name,
                    password,
                    phone,
                    province,
                    secondSurname,
                    surname,
                    zipCode,
                    documentType,
                    userType,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al registrar usuario');
            }

            navigate('/login');
        } catch (err) {
            setError(err.message || 'Error al registrar usuario');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const registerUser = async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/authcontroller/registerUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userData }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Error al registrar usuario');
                toast({
                    title: 'Error',
                    description: data.message || 'Error al registrar usuario',
                    variant: 'destructive',
                });
                return;
            }

            toast({
                title: 'Usuario registrado',
                description: 'El usuario ha sido registrado correctamente.',
                variant: 'success',
            });

            navigate('/inicio');
        } catch (err) {
            setError(err.message || 'Error al registrar usuario');
            toast({
                title: 'Error',
                description: err.message || 'Error al registrar usuario',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        clearUserInfo();
        localStorage.clear();
        navigate('/login');
    };

    return {
        login,
        register,
        registerUser,
        logout,
        isLoading,
        error,
    };
};