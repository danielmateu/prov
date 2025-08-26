import React, { useState, useRef } from 'react';
import { MailQuestion } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import { useCustomerSearch } from '../../hooks/useCustomerSearch';
import { BaseFormLayout } from '../common/BaseFormLayout';
import { ConsultationForm as ConsultationFormComponent } from '../forms/ConsultationForm';

const ConsultationForm = ({ onSubmit, apiURL = '' }) => {
    const { toast } = useToast();
    const { userInfo } = useUserInfoStore();

    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const formRef = useRef(null);

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

    const handleNoticeSelect = (notice) => {
        handleSelectedNotice(notice);
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!selectedNotice || !description.trim() || !customerID) return;

        setSubmitting(true);
        try {
            const consultationData = {
                noticeId: selectedNotice.NoticeHeaderID,
                docEntry: selectedNotice.DocEntry,
                customerID: customerID,
                searchValue: searchValue,
                customerData,
                selectedNotice: selectedNotice,
                description: description,
                observation: selectedNotice.Observation || '',
                createdDate: new Date().toISOString(),
                status: 'Nueva'
            };

            await onSubmit(consultationData);
            handleCancel();

            toast({
                title: "Formulario enviado",
                description: "Su solicitud ha sido enviada con éxito.",
                variant: "success",
            });
        } catch (error) {
            console.error('Error submitting consultation:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        setDescription('');
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

    return (
        <BaseFormLayout
            headerIcon={MailQuestion}
            title="Consultas"
            subtitle="Ingrese teléfono, número de factura o albarán para comenzar"
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
            onNoticeSelect={handleNoticeSelect}
            loadingNotices={loadingNotices}
            selectionLabel="Seleccionar Aviso para Consulta"
        >
            {selectedNotice && (
                <form onSubmit={handleSubmit}>
                    <ConsultationFormComponent
                        selectedNotice={selectedNotice}
                        description={description}
                        onDescriptionChange={setDescription}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        submitting={submitting}
                        formRef={formRef}
                    />
                </form>
            )}
        </BaseFormLayout>
    );
};

export default ConsultationForm;