import useFormStore from "@/zustand/formStore";
import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { useTour } from "@reactour/tour";

export default function useExitConfirmation() {
    const { toast } = useToast()
    const [isOpen, setIsOpen] = useState(false); // Estado para el modal
    const [nextLocation, setNextLocation] = useState(null); // Ruta siguiente a la que el usuario desea ir
    const navigate = useNavigate();
    const location = useLocation(); // Obtiene la ruta actua

    const {
        setPhoneNumber,
        resetFormData
    } = useFormStore()

    // Función que cancela la navegación y cierra el modal
    const cancelExit = () => {
        setIsOpen(false);
        setNextLocation(null); // Resetea la ruta
    };

    // Función que confirma la navegación (el usuario quiere salir sin guardar)
    const confirmExit = () => {
        if (nextLocation) {
            navigate(nextLocation); // Realiza la navegación a la ruta siguiente
        } else {
            // Si no hay ubicación específica, navegar a home
            navigate('/home');
        }
        setPhoneNumber('')
        resetFormData()
        setIsOpen(false); // Cierra el modal
        setNextLocation(null); // Resetea la ubicación siguiente
    };

    // Función que se llama cuando el usuario intenta cambiar de página o tab
    const handleNavigate = useCallback((e, nextLocation, restrictedProfiles, permission) => {
        e.preventDefault();

        if (restrictedProfiles) {
            const profile = localStorage.getItem('profile');
            // Verifica si el usuario tiene permisos para acceder
            if (restrictedProfiles.includes(Number(profile)) && !permission) {
                return toast({
                    title: "Atención.",
                    description: "No tienes permisos para acceder a este módulo.",
                    variant: "info",
                    duration: 3000,
                });
            }
        }

        // Rutas que requieren confirmación
        const protectedRoutes = ['/notices/newnotice', '/logistic/AddSupplier', '/logistic/addProduct'];
        const dynamicRoutePattern = /^\/notices\/\d+$/;

        if (protectedRoutes.includes(location.pathname) || dynamicRoutePattern.test(location.pathname)) {
            setIsOpen(true); // Muestra el modal de confirmación
            setNextLocation(nextLocation); // Guarda la ruta
        } else {
            if (nextLocation) navigate(nextLocation); // Navega directamente si no es una ruta protegida
        }
    }, [location.pathname, navigate]);

    return {
        isOpen,
        setIsOpen,
        handleNavigate,
        cancelExit,
        confirmExit,
    };
}