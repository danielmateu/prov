import useStore from '@/zustand/userStore';
import { useState, useEffect } from 'react';

export function useNotice(id) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [notice, setNotice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const setCustomerPhone = useStore((state) => state.setCustomerPhone);

    useEffect(() => {
        let isMounted = true; // Variable para evitar actualizaciones de estado si el componente se desmonta

        async function fetchNotice() {
            try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}/noticeController/getNoticeByDocEntry?docEntry=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('No se pudo cargar el aviso');
                }
                const data = await response.json();
                if (isMounted) {
                    // console.log('data', data);
                    setNotice(data);
                    setCustomerPhone(data.cell); // Setear el teléfono del cliente
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Error al cargar el aviso');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        if (id) {
            fetchNotice();
        }

        return () => {
            isMounted = false; // Cleanup para evitar actualizaciones de estado si el componente se desmonta
        };
    }, [id, apiUrl, setCustomerPhone]);

    return { notice, isLoading, error }
}