import { create } from 'zustand';

const useStore = create((set) => ({
    customerPhone: '',
    customerNotices: [],
    setCustomerNotices: (notices) => set({ customerNotices: notices }),
    setCustomerPhone: (phone) => set({ customerPhone: phone }),
}));

export default useStore;