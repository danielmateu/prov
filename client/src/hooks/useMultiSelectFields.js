import { useState, useCallback } from 'react';

export const useMultiSelectFields = (modifiableFields, customerData) => {
    const [multiSelectState, setMultiSelectState] = useState({
        isActive: false,
        selectedFields: new Set(),
        commonReason: ''
    });

    const toggleMultiSelectMode = useCallback(() => {
        setMultiSelectState(prev => ({
            ...prev,
            isActive: !prev.isActive,
            selectedFields: new Set(),
            commonReason: ''
        }));
    }, []);

    const toggleFieldSelection = useCallback((fieldKey) => {
        setMultiSelectState(prev => {
            const newSelected = new Set(prev.selectedFields);
            if (newSelected.has(fieldKey)) {
                newSelected.delete(fieldKey);
            } else {
                newSelected.add(fieldKey);
            }
            return {
                ...prev,
                selectedFields: newSelected
            };
        });
    }, []);

    const selectAllFields = useCallback(() => {
        setMultiSelectState(prev => ({
            ...prev,
            selectedFields: new Set(modifiableFields.map(f => f.key))
        }));
    }, [modifiableFields]);

    const clearSelection = useCallback(() => {
        setMultiSelectState(prev => ({
            ...prev,
            selectedFields: new Set(),
            commonReason: ''
        }));
    }, []);

    const setCommonReason = useCallback((reason) => {
        setMultiSelectState(prev => ({
            ...prev,
            commonReason: reason
        }));
    }, []);

    const getSelectedFieldsData = useCallback(() => {
        return modifiableFields
            .filter(field => multiSelectState.selectedFields.has(field.key))
            .map(field => ({
                ...field,
                currentValue: customerData?.[field.key] || ''
            }));
    }, [modifiableFields, multiSelectState.selectedFields, customerData]);

    return {
        multiSelectState,
        toggleMultiSelectMode,
        toggleFieldSelection,
        selectAllFields,
        clearSelection,
        setCommonReason,
        getSelectedFieldsData
    };
};