
import { create } from 'zustand';

const apiURL = import.meta.env.VITE_API_URL;
const POLLING_INTERVAL = 30000; // 30 seconds polling interval
const DEBOUNCE_DELAY = 1000; // 1 second debounce for rapid updates

export const usePendingPaymentsStore = create((set, get) => ({
    pendingPayments: [],
    isLoading: false,
    error: null,
    lastFetched: null,
    pollingInterval: null,
    pendingPaymentsDetails: [],

    // Main fetch function with debouncing
    fetchPendingPayments: async (force = false) => {
        const now = Date.now();
        const lastFetched = get().lastFetched;

        // Skip if recently fetched unless forced
        if (!force && lastFetched && now - lastFetched < DEBOUNCE_DELAY) {
            return;
        }

        set({ isLoading: true });

        try {
            const response = await fetch(`${apiURL}/noticeController/get_Ex_PendingPayments`);
            if (!response.ok) throw new Error('Error fetching pending payments');

            const data = await response.json();
            set({
                pendingPayments: data,
                error: null,
                lastFetched: now
            });
        } catch (error) {
            set({ error: error.message });
            console.error('Error fetching pending payments:', error);
        } finally {
            set({ isLoading: false });
        }
    },
    fetchPendingPaymentsDetails: async (invoicingAddressId, month, quincena, serviceType) => {
        try {
            const response = await fetch(`${apiURL}/noticeController/getPendingPaymentDetails?invoicingAddressId=${invoicingAddressId}&month=${month}&quincena=${quincena}&serviceType=${serviceType}`);
            if (!response.ok) throw new Error('Error fetching payment details');

            const data = await response.json();
            set({ pendingPaymentsDetails: data });
        } catch (error) {
            console.error('Error fetching payment details:', error);
        }
    },

    // Start polling for real-time updates
    startPolling: () => {
        const currentInterval = get().pollingInterval;
        if (currentInterval) clearInterval(currentInterval);

        const interval = setInterval(() => {
            get().fetchPendingPayments();
        }, POLLING_INTERVAL);

        set({ pollingInterval: interval });
    },

    // Stop polling
    stopPolling: () => {
        const currentInterval = get().pollingInterval;
        if (currentInterval) {
            clearInterval(currentInterval);
            set({ pollingInterval: null });
        }
    },

    // Update payment status with automatic refresh
    updatePaymentStatus: async (invoicingAddressId, month, quincena, serviceType, newStatus) => {
        set(state => ({
            pendingPayments: state.pendingPayments.map(payment => {
                if (payment.Ex_InvoicingAddressID === invoicingAddressId &&
                    payment.Month === month &&
                    payment.Quincena === quincena &&
                    payment.ServiceTypeID === serviceType) {
                    return { ...payment, Status: newStatus };
                }
                return payment;
            })
        }));

        // Force refresh after status update
        await get().fetchPendingPayments(true);
    },

    // Remove payment with automatic refresh
    removePayment: async (invoicingAddressId, month, quincena, serviceType) => {
        set(state => ({
            pendingPayments: state.pendingPayments.filter(payment =>
                !(payment.Ex_InvoicingAddressID === invoicingAddressId &&
                    payment.Month === month &&
                    payment.Quincena === quincena &&
                    payment.ServiceTypeID === serviceType)
            )
        }));

        // Force refresh after removal
        await get().fetchPendingPayments(true);
    },

    // Add new payment with automatic refresh
    addPayment: async (payment) => {
        set(state => ({
            pendingPayments: [...state.pendingPayments, payment]
        }));

        // Force refresh after adding
        await get().fetchPendingPayments(true);
    },

    // Bulk update payments
    bulkUpdatePayments: async (updates) => {
        set(state => ({
            pendingPayments: state.pendingPayments.map(payment => {
                const update = updates.find(u =>
                    u.Ex_InvoicingAddressID === payment.Ex_InvoicingAddressID &&
                    u.Month === payment.Month &&
                    u.Quincena === payment.Quincena &&
                    u.ServiceTypeID === payment.ServiceTypeID
                );
                return update ? { ...payment, ...update } : payment;
            })
        }));

        // Force refresh after bulk update
        await get().fetchPendingPayments(true);
    },

    // Reset store state
    reset: () => {
        get().stopPolling();
        set({
            pendingPayments: [],
            isLoading: false,
            error: null,
            lastFetched: null
        });
    }
}));