import { useEffect, useRef } from 'react';
import { useToast } from './use-toast';
import { usePendingPaymentsStore } from '@/zustand/pendingPaymentsStore';

export const useWebSocket = (userInfo) => {
    const socketRef = useRef(null);
    const { toast } = useToast();
    const { fetchPendingPayments } = usePendingPaymentsStore();

    useEffect(() => {
        if (!userInfo?.Ex_InvoicingAddressID) return;

        const wsUrl = import.meta.env.VITE_WEBSOCKET || 'ws://localhost:3090';
        
        const connectWebSocket = () => {
            try {
                socketRef.current = new WebSocket(wsUrl);

                socketRef.current.onopen = () => {
                    console.log('WebSocket connected');
                    // Identificar el usuario
                    socketRef.current.send(JSON.stringify({
                        type: 'identify',
                        userId: userInfo.Ex_InvoicingAddressID
                    }));
                };

                socketRef.current.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        
                        switch (data.type) {
                            case 'paymentUpdate':
                                // Solo actualizar si afecta a este usuario
                                if (data.invoicingAddressId === userInfo.Ex_InvoicingAddressID) {
                                    fetchPendingPayments(true);
                                    
                                    if (data.type === 'payment_approved') {
                                        toast({
                                            title: 'Pago Aprobado',
                                            description: `Su pago de ${data.amount}€ ha sido aprobado`,
                                            variant: 'success'
                                        });
                                    }
                                }
                                break;
                                
                            case 'noticeUpdate':
                                // Actualizar avisos si es necesario
                                break;
                                
                            default:
                                console.log('Unknown WebSocket message type:', data.type);
                        }
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                };

                socketRef.current.onclose = () => {
                    console.log('WebSocket disconnected');
                    // Reconectar después de 5 segundos
                    setTimeout(connectWebSocket, 5000);
                };

                socketRef.current.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };

            } catch (error) {
                console.error('Error connecting to WebSocket:', error);
                // Reintentar conexión después de 10 segundos
                setTimeout(connectWebSocket, 10000);
            }
        };

        connectWebSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [userInfo?.Ex_InvoicingAddressID, fetchPendingPayments, toast]);

    return socketRef.current;
};