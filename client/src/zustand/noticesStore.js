import { create } from 'zustand';

const apiURL = import.meta.env.VITE_API_URL;

export const useNoticesStore = create((set) => ({
    notices: [],
    isLoading: false,
    error: null,
    externalNotices: [],

    fetchNotices: async (Ex_InvoicingAddressID) => {
        if (!Ex_InvoicingAddressID) return;

        set({ isLoading: true });
        try {
            const response = await fetch(`${apiURL}/noticeController/by-invoicing-address/${Ex_InvoicingAddressID}`);
            if (!response.ok) throw new Error('Error fetching notices');
            const data = await response.json();
            set({ notices: data.data, error: null });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    fetchAllNotices: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${apiURL}/noticeController/getAllNotices`);
            if (!response.ok) throw new Error('Error fetching notices');
            const data = await response.json();
            // console.log('All Notices:', data.data); // Debugging line
            set({ externalNotices: data.data, error: null });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    removeNotice: (noticeId) => {
        set(state => ({
            notices: state.notices.filter(notice => notice.NoticeHeaderID !== noticeId),
            externalNotices: state.externalNotices.filter(notice => notice.NoticeHeaderID !== noticeId)
        }));
    },
    updateNotice: (noticeId, updatedNotice) => {
        set(state => ({
            notices: state.notices.map(notice =>
                notice.NoticeHeaderID === noticeId
                    ? { ...notice, ...updatedNotice }
                    : notice
            ),
            externalNotices: state.externalNotices.map(notice =>
                notice.NoticeHeaderID === noticeId
                    ? { ...notice, ...updatedNotice }
                    : notice
            )
        }));
    }
}));