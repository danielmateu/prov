

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar/Navbar";

import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/dashboard";
import Config from "./pages/Config";
import AsistenciaPage from "./pages/Asistencia/asistencia_page";
import SolicitudReparacionPage from "./pages/Asistencia/solicitud_reparacion_page";
import SolicitudInstalacionPage from "./pages/Asistencia/solicitud_instalacion_page";
import SolicitudVentaPage from "./pages/Asistencia/solicitud_venta_page";
import SolicitudGarantiaPage from "./pages/Asistencia/solicitud_garantia_page";
// import GestionesPage from "./pages/MisGestiones/gestiones_page";
import DatosFiscalesPage from "./pages/DatosFiscales/datos_fiscales_page";
import NuevoUsuarioPage from "./pages/MisGestiones/nuevo-usuario-page";
// import PendientesPage from "./pages/MisGestiones/pendientes-page";
import ResumenPage from "./pages/Resumen/resumen-page";
import SatPage from "./pages/SAT/sat-page";
import FacturacionPage from "./pages/Facturacion/facturacion-page";
import NuevoNegocioPage from "./pages/MisGestiones/nuevo-negocio-page";
import AjustesPage from "./pages/Ajustes/ajustes_page";
import SuperAdminPage from "./pages/SuperAdmin/super-admin-page";
import NotFound404 from "./pages/NotFound404";
import SuperAdminRoute from "./components/SuperAdminRoute";
import { useUserInfoStore } from "./zustand/userInfoStore";
// import { ChatWidget } from "./components/chat/ChatWidget";
import { ExternalChatWidget } from "./components/chat/ExternalChatWidget";
import ReclamacionesPage from "./pages/Asistencia/reclamaciones_page";
import ContabilidadPage from "./pages/Asistencia/contabilidad_page";
import ConsultationsPage from "./pages/Asistencia/consultations_page";
import CallcenterRoute from "./components/CallcenterRoute";
import CallcenterPage from "./pages/Callcenter/CallcenterPage";
// import Footer from "./components/footer/Footer";

function App() {

    // const userInfo = useUserInfoStore((state) => state.userInfo);

    // console.log('User Info:', userInfo);

    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [username, setUsername] = useState(localStorage.getItem('UserName') || '');
    const [role, setRole] = useState(localStorage.getItem('role') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [empresa, setEmpresa] = useState(localStorage.getItem('empresa') || 'Rapitecnic');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const hasJustLoggedIn = localStorage.getItem('justLoggedIn');
        const publicPaths = ['/', '/login', '/register', '/recover-password', '/reset-password', '/verify-email'];

        if (token) {
            setIsAuthenticated(true);
            setRole(localStorage.getItem('role'));
            setUsername(localStorage.getItem('UserName'));

            if (hasJustLoggedIn === 'true') {
                setIsDrawerOpen(true);
                localStorage.removeItem('justLoggedIn');
            }

            // Si el usuario está autenticado y está en una ruta pública, redirigir a home
            if (publicPaths.includes(location.pathname)) {
                navigate('/inicio');
            }
        } else {
            setIsAuthenticated(false);
            // Permitir acceso a reset-password y verify-email incluso sin autenticación
            if (!publicPaths.includes(location.pathname) &&
                !location.pathname.startsWith('/reset-password/') &&
                !location.pathname.startsWith('/verify-email/')) {
                navigate('/');
            }
        }
    }, [navigate, location.pathname]);

    useEffect(() => {
        localStorage.setItem('empresa', empresa);
    }, [empresa]);

    useEffect(() => {
        // Añadir los atributos para prevenir traducciones automáticas
        document.documentElement.setAttribute('translate', 'no');

        // Añadir la meta tag si no existe
        if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
            const meta = document.createElement('meta');
            meta.name = 'google';
            meta.content = 'notranslate';
            document.head.appendChild(meta);
        }

        // También puedes añadir la clase a todo el body
        document.body.classList.add('notranslate');
    }, []);

    const shouldShowNavbar = isAuthenticated &&
        !['/login', '/register', '/recover-password', '/'].includes(location.pathname) &&
        !location.pathname.startsWith('/reset-password/') &&
        !location.pathname.startsWith('/verify-email/');

    return (
        <div className="App">
            {shouldShowNavbar && (
                <>
                    <Navbar
                        activeTab={activeTab}
                        empresa={empresa}
                        setActiveTab={setActiveTab}
                        onOpenDashboard={() => setIsDrawerOpen(true)}
                    />

                    {/* <Footer /> */}
                </>
            )}

            <Routes>
                <Route path="/" element={<Login empresa={empresa} setEmpresa={setEmpresa} />} />
                <Route path="/login" element={<Login empresa={empresa} setEmpresa={setEmpresa} />} />
                <Route path="/register" element={<Register empresa={empresa} />} />
                <Route path="/recover-password" element={<RecoverPasswordPage empresa={empresa} />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/verify-email/:token" element={<VerifyEmailPage />} />

                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/inicio" element={<Home />} />
                    <Route path="/profile" element={<Dashboard />} />
                    <Route path="/settings" element={<Config />} />

                    <Route path="/asistencia" element={<AsistenciaPage />} />
                    <Route path="/asistencia/reparacion" element={<SolicitudReparacionPage />} />
                    <Route path="/asistencia/instalacion" element={<SolicitudInstalacionPage />} />
                    <Route path="/asistencia/venta" element={<SolicitudVentaPage />} />
                    <Route path="/asistencia/garantia" element={<SolicitudGarantiaPage />} />
                    <Route
                        path="/asistencia/reclamaciones"
                        element={
                            <CallcenterRoute>
                                <ReclamacionesPage />
                            </CallcenterRoute>
                        }
                    />
                    <Route
                        path="/asistencia/contabilidad"
                        element={
                            <CallcenterRoute>
                                <ContabilidadPage />
                            </CallcenterRoute>
                        }
                    />
                    <Route
                        path="/asistencia/consultas"
                        element={
                            <CallcenterRoute>
                                <ConsultationsPage />
                            </CallcenterRoute>
                        }
                    />

                    {/* <Route path="/gestiones" element={<GestionesPage />} /> */}
                    {/* <Route path="/gestiones/pendientes" element={<PendientesPage />} /> */}
                    <Route path="/nuevo-usuario" element={<NuevoUsuarioPage />} />
                    <Route path="/nuevo-negocio" element={<NuevoNegocioPage />} />

                    <Route path="/resumen" element={<ResumenPage />} />

                    <Route path="/datos-fiscales" element={<DatosFiscalesPage />} />

                    <Route path="/facturacion" element={<FacturacionPage />} />

                    <Route path="/sats" element={<SatPage />} />

                    {/* <Route path="/superadmin" element={<SuperAdminPage />} /> */}
                    <Route
                        path="/superadmin"
                        element={
                            <SuperAdminRoute>
                                <SuperAdminPage />
                            </SuperAdminRoute>
                        }
                    />
                    <Route
                        path="/callcenter"
                        element={
                            <CallcenterRoute>
                                <CallcenterPage />
                            </CallcenterRoute>
                        }
                    />
                    <Route path="/ajustes" element={<AjustesPage />} />
                </Route>

                {/* Catch-all route for 404 page */}
                <Route path="*" element={<NotFound404 />} />
            </Routes>

            {/* {shouldShowNavbar && (
                <Footer />
            )} */}

            {/* {isAuthenticated && <ChatWidget />} */}
            {isAuthenticated && <ExternalChatWidget />}


        </div>
    );
}

export default App;