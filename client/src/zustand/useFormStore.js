import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFormStore = create(
    persist(
        (set, get) => ({
            // Form data state
            formData: {},

            // Save form data
            saveFormData: (data) => {
                set({ formData: { ...get().formData, ...data } });
            },

            // Get form data
            getFormData: () => get().formData,

            // Clear form data
            clearFormData: () => {
                set({ formData: {} });
            },

            // Update specific field
            updateField: (fieldName, value) => {
                set({
                    formData: {
                        ...get().formData,
                        [fieldName]: value
                    }
                });
            },

            // Check if form has data
            hasFormData: () => {
                const data = get().formData;
                return Object.keys(data).length > 0;
            }
        }),
        {
            name: 'service-form-storage', // unique name for localStorage key
            partialize: (state) => ({ formData: state.formData }), // only persist formData
        }
    )
);