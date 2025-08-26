import React, { useState, useRef } from 'react';
import { User as UserPen, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import { useCustomerSearch } from '../../hooks/useCustomerSearch';
import { useMultiSelectFields } from '../../hooks/useMultiSelectFields';
import { BaseFormLayout } from '../common/BaseFormLayout';
import { CustomerModificationDisplay } from '../forms/CustomerModificationDisplay';

import { validateField } from './schemas/customerValidation';
import { ModificationRequestForm } from '../forms/ModificationRequestForm';
import { BulkEditModal } from '../ClaimRequestForm/BulkEditModal';

const ContabilidadForm = ({ onSubmit, apiURL = '' }) => {
    const { toast } = useToast();
    const { userInfo } = useUserInfoStore();

    const [showModificationForm, setShowModificationForm] = useState(false);
    const [showBulkEditModal, setShowBulkEditModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [modificationRequest, setModificationRequest] = useState({
        field: '',
        fieldLabel: '',
        currentValue: '',
        newValue: '',
        reason: '',
        priority: 'medium',
        validationError: null
    });

    const modificationFormRef = useRef(null);

    const {
        searchValue,
        detectedType,
        customerData,
        customerID,
        phoneVerified,
        fetchingCustomer,
        notices,
        selectedNotice,
        loadingNotices,
        searchQuery,
        filteredNotices,
        handleSearchChange,
        handleSelectedNotice,
        setSearchQuery,
        resetAllState
    } = useCustomerSearch(apiURL);

    const modifiableFields = [
        { key: 'Name', label: 'Nombre', type: 'text' },
        { key: 'Surname', label: 'Primer Apellido', type: 'text' },
        { key: 'SecondSurname', label: 'Segundo Apellido', type: 'text' },
        { key: 'Phone', label: 'Teléfono Fijo', type: 'tel' },
        { key: 'Cell', label: 'Teléfono Móvil', type: 'tel' },
        { key: 'Email', label: 'Email', type: 'email' },
        { key: 'Address', label: 'Dirección', type: 'text' },
        { key: 'AddressNext', label: 'Complemento Dirección', type: 'text' },
        { key: 'City', label: 'Ciudad', type: 'text' },
        { key: 'ZipCode', label: 'Código Postal', type: 'text' },
        { key: 'State', label: 'Provincia', type: 'text' },
        { key: 'DNI', label: 'DNI', type: 'text' }
    ];

    const {
        multiSelectState,
        toggleMultiSelectMode,
        toggleFieldSelection,
        selectAllFields,
        clearSelection,
        getSelectedFieldsData
    } = useMultiSelectFields(modifiableFields, customerData);

    const handleRequestModification = (fieldKey, fieldLabel, currentValue) => {
        setModificationRequest({
            field: fieldKey,
            fieldLabel: fieldLabel,
            currentValue: currentValue || '',
            newValue: '',
            reason: '',
            priority: 'medium',
            validationError: null
        });
        setShowModificationForm(true);

        setTimeout(() => {
            if (modificationFormRef.current) {
                modificationFormRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleNewValueChange = (value) => {
        const validation = validateField(modificationRequest.field, value);
        setModificationRequest(prev => ({
            ...prev,
            newValue: value,
            validationError: validation.success ? null : validation.error
        }));
    };

    const handleBulkEdit = () => {
        setShowBulkEditModal(true);
    };

    const handleCancel = () => {
        setShowModificationForm(false);
        setShowBulkEditModal(false);
        clearSelection();
        setModificationRequest({
            field: '',
            fieldLabel: '',
            currentValue: '',
            newValue: '',
            reason: '',
            priority: 'medium',
            validationError: null
        });
        resetAllState();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        toast({
            title: "Formulario reiniciado",
            description: "Puede iniciar una nueva búsqueda.",
            variant: "default",
        });
    };

    const createRequestData = (field, fieldLabel, currentValue, newValue, reason) => {
        return {
            customerID: parseInt(customerID, 10),
            field: field,
            fieldLabel: fieldLabel,
            currentValue: currentValue || '',
            newValue: newValue,
            reason: reason,
            requestedBy: userInfo?.Name + ' ' + userInfo?.Surname || 'Call Center',
            requestDate: new Date().toISOString(),
            customerData: customerData,
            searchValue: searchValue,
            modificationType: 'customer_data_update',
            selectedNotice: selectedNotice ? selectedNotice.DocEntry : null
        };
    };

    const handleSubmitModification = async (e) => {
        e.preventDefault();

        const fieldValidation = validateField(modificationRequest.field, modificationRequest.newValue);
        if (!fieldValidation.success) {
            toast({
                title: "Valor inválido",
                description: fieldValidation.error,
                variant: "destructive",
            });
            return;
        }

        setSubmitting(true);
        try {
            const completeRequestData = createRequestData(
                modificationRequest.field,
                modificationRequest.fieldLabel,
                modificationRequest.currentValue,
                modificationRequest.newValue,
                modificationRequest.reason
            );

            await onSubmit(completeRequestData);

            setModificationRequest({
                field: '',
                fieldLabel: '',
                currentValue: '',
                newValue: '',
                reason: '',
                priority: 'medium',
                validationError: null
            });
            setShowModificationForm(false);

            toast({
                title: "Solicitud enviada",
                description: "La solicitud de modificación ha sido enviada correctamente.",
                variant: "success",
            });
        } catch (error) {
            console.error('Error submitting modification request:', error);
            toast({
                title: "Error",
                description: "No se pudo enviar la solicitud de modificación.",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleBulkSave = async (updates) => {
        setSubmitting(true);
        try {
            const bulkRequest = {
                customerID: parseInt(customerID, 10),
                customerData: customerData,
                searchValue: searchValue,
                modificationType: 'customer_data_bulk_update',
                requestedBy: userInfo?.Name + ' ' + userInfo?.Surname || 'Call Center',
                requestDate: new Date().toISOString(),
                selectedNotice: selectedNotice ? selectedNotice.DocEntry : null,
                modifications: updates.map(update => ({
                    field: update.field,
                    fieldLabel: update.fieldLabel,
                    currentValue: update.currentValue || '',
                    newValue: update.newValue,
                    reason: update.reason
                })),
                description: `Solicitud de modificación masiva: ${updates.length} campo(s) del cliente ${customerData.Name} ${customerData.Surname}`
            };

            await onSubmit(bulkRequest);

            toast({
                title: "Solicitud enviada",
                description: `Se ha enviado la solicitud para modificar ${updates.length} campos correctamente.`,
                variant: "success",
            });

            clearSelection();
            setShowBulkEditModal(false);
        } catch (error) {
            console.error('Error submitting bulk modifications:', error);
            toast({
                title: "Error",
                description: "No se pudo enviar la solicitud de modificaciones.",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const headerExtra = (
        <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 mr-2" />
            Solo lectura - Call Center
        </div>
    );

    return (
        <>
            <BaseFormLayout
                headerIcon={UserPen}
                title="Gestión de Contabilidad"
                subtitle="Consulte información del cliente y solicite modificaciones"
                headerExtra={headerExtra}
                searchValue={searchValue}
                detectedType={detectedType}
                fetchingCustomer={fetchingCustomer}
                onSearchChange={handleSearchChange}
                phoneVerified={phoneVerified}
                customerData={customerData}
                notices={notices}
                filteredNotices={filteredNotices}
                selectedNotice={selectedNotice}
                searchQuery={searchQuery}
                onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
                onNoticeSelect={handleSelectedNotice}
                loadingNotices={loadingNotices}
                selectionLabel="Si quieres modificar los datos fiscales de algún aviso, selecciónalo de la lista."
                showNotices={phoneVerified}
            >
                {/* Customer modification display */}
                {phoneVerified && customerData && (
                    <CustomerModificationDisplay
                        customerData={customerData}
                        multiSelectState={multiSelectState}
                        modifiableFields={modifiableFields}
                        onToggleMode={toggleMultiSelectMode}
                        onSelectAll={selectAllFields}
                        onClearSelection={clearSelection}
                        onBulkEdit={handleBulkEdit}
                        onRequestModification={handleRequestModification}
                        onToggleFieldSelection={toggleFieldSelection}
                    />
                )}

                {/* Modification Request Form */}
                <ModificationRequestForm
                    modificationRequest={modificationRequest}
                    selectedNotice={selectedNotice}
                    onNewValueChange={handleNewValueChange}
                    onReasonChange={(reason) => setModificationRequest(prev => ({ ...prev, reason }))}
                    onSubmit={handleSubmitModification}
                    onCancel={() => setShowModificationForm(false)}
                    submitting={submitting}
                    formRef={modificationFormRef}
                />

                {/* Action Buttons */}
                {phoneVerified && customerData && (
                    <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            className="px-6"
                        >
                            Nueva Búsqueda
                        </Button>
                    </div>
                )}
            </BaseFormLayout>

            {/* Bulk Edit Modal */}
            <BulkEditModal
                isOpen={showBulkEditModal}
                selectedFields={getSelectedFieldsData()}
                onClose={() => setShowBulkEditModal(false)}
                onSave={handleBulkSave}
                submitting={submitting}
            />
        </>
    );
};

export default ContabilidadForm;