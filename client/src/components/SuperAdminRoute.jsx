// import { Navigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useUserInfoStore } from '@/zustand/userInfoStore';


// const SuperAdminRoute = ({ children }) => {
//     const [isAuthorized, setIsAuthorized] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const { userInfo } = useUserInfoStore();

//     useEffect(() => {
//         const checkSuperAdminAccess = () => {
//             const token = localStorage.getItem('token');

//             // Verificar si el usuario está autenticado
//             if (!token) {
//                 setIsAuthorized(false);
//                 setIsLoading(false);
//                 return;
//             }

//             // Verificar si tenemos la información del usuario
//             if (!userInfo) {
//                 // Si no tenemos userInfo, intentar obtenerlo del localStorage como fallback
//                 const storedUserInfo = localStorage.getItem('user-store');
//                 if (storedUserInfo) {
//                     try {
//                         const parsedUserInfo = JSON.parse(storedUserInfo);
//                         if (parsedUserInfo?.state?.userInfo?.SuperAdmin === true) {
//                             setIsAuthorized(true);
//                         } else {
//                             setIsAuthorized(false);
//                         }
//                     } catch (error) {
//                         console.error('Error parsing stored user info:', error);
//                         setIsAuthorized(false);
//                     }
//                 } else {
//                     setIsAuthorized(false);
//                 }
//                 setIsLoading(false);
//                 return;
//             }

//             // Verificar si el usuario tiene permisos de SuperAdmin
//             if (userInfo.SuperAdmin === true && userInfo.Administrator === true) {
//                 setIsAuthorized(true);
//             } else {
//                 setIsAuthorized(false);
//             }

//             setIsLoading(false);
//         };

//         checkSuperAdminAccess();
//     }, [userInfo]);

//     // Mostrar loading mientras verificamos los permisos
//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                     <p className="text-gray-600">Verificando permisos de SuperAdmin...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Si no está autorizado, redirigir a inicio
//     if (!isAuthorized) {
//         return <Navigate to="/inicio" replace />;
//     }

//     // Si está autorizado, mostrar el componente hijo
//     return children;
// };

// export default SuperAdminRoute;

import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserInfoStore } from '@/zustand/userInfoStore';


const SuperAdminRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { userInfo } = useUserInfoStore();

    useEffect(() => {
        const checkSuperAdminAccess = () => {
            const token = localStorage.getItem('token');

            // Verificar si el usuario está autenticado
            if (!token) {
                setIsAuthorized(false);
                setIsLoading(false);
                return;
            }

            // Verificar si tenemos la información del usuario
            if (!userInfo) {
                // Si no tenemos userInfo, intentar obtenerlo del localStorage como fallback
                const storedUserInfo = localStorage.getItem('user-store');
                if (storedUserInfo) {
                    try {
                        const parsedUserInfo = JSON.parse(storedUserInfo);
                        if (parsedUserInfo?.state?.userInfo?.SuperAdmin === true) {
                            setIsAuthorized(true);
                        } else {
                            setIsAuthorized(false);
                        }
                    } catch (error) {
                        console.error('Error parsing stored user info:', error);
                        setIsAuthorized(false);
                    }
                } else {
                    setIsAuthorized(false);
                }
                setIsLoading(false);
                return;
            }

            // Verificar si el usuario tiene permisos de SuperAdmin
            if (userInfo.SuperAdmin === true && userInfo.Administrator === true) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }

            setIsLoading(false);
        };

        checkSuperAdminAccess();
    }, [userInfo]);

    // Mostrar loading mientras verificamos los permisos
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12 px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                    <p className="text-gray-600 text-sm">Verificando permisos...</p>
                </div>
            </div>
        );
    }

    // Si no está autorizado, redirigir a inicio
    if (!isAuthorized) {
        return <Navigate to="/inicio" replace />;
    }

    // Si está autorizado, mostrar el componente hijo
    return children;
};

export default SuperAdminRoute;