import { create } from 'zustand';

const apiURL = import.meta.env.VITE_API_URL;

export const useCustomersStore = create((set) => ({
    customers: [],
    isLoading: false,
    error: null,

    fetchCustomers: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${apiURL}/noticeController/getEx_InvoicingAddress`);
            if (!response.ok) throw new Error('Error fetching customers');
            const data = await response.json();
            set({ customers: data, error: null });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));