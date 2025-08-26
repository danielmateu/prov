import { create } from 'zustand';

export const useNotificationSettingsStore = create((set) => ({
    notifications: {
        email: false,
        push: false,
        updates: false
    },

    setNotifications: (settings) => set({ notifications: settings }),

    loadNotificationSettings: async (userId) => {
        try {
            const response = await fetch(`/api/settings/notifications/${userId}`);
            const data = await response.json();
            if (data.success) {
                set({ notifications: data.settings });
            }
        } catch (error) {
            console.error('Error loading notification settings:', error);
        }
    },

    updateNotifications: async (userId, updates) => {
        try {
            const response = await fetch('/api/settings/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    settings: updates
                }),
            });

            const data = await response.json();
            if (data.success) {
                set((state) => ({
                    notifications: { ...state.notifications, ...updates }
                }));
            }
        } catch (error) {
            console.error('Error updating notification settings:', error);
        }
    }
}));