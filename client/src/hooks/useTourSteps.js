import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const useTourSteps = () => {
    const location = useLocation();
    const path = location.pathname;
    const { t } = useTranslation();

    const homeSteps = [
        {
            selector: '.first-step',
            content: (t('first-step')),
        },
        {
            selector: '.second-step',
            // content: 'En esta sección podrás crear un aviso desde cero.',
            content: (t('second-step')),
        },
        {
            selector: '.third-step',
            content: (t('third-step')),
        },
        {
            selector: '.fourth-step',
            content: (t('fourth-step')),
        },
        {
            selector: '.sixth-step',
            content: (t('sixth-step')),
        },
        {
            selector: '.fifth-step',
            content: (t('fifth-step')),
        },
    ];

    const asistenciaSteps = [
        {
            selector: '.asistencia-header',
            content: (t('asistencia-header')),
        },
        {
            selector: '.repair-module',
            content: (t('repair-module')),
        },
        {
            selector: '.installation-module',
            content: (t('installation-module')),
        },
    ];

    const serviceFormSteps = [
        {
            selector: '.warranty-question',
            content: (t('warranty-question')),
        },
        {
            selector: '.warranty-yes',
            content: (t('warranty-yes')),
        },
        {
            selector: ".warranty-no",
            content: (t('warranty-no')),
        },
        {
            selector: '.service-address',
            content: (t('service-address')),
        },
        {
            selector: '.customer-phone',
            content: (t('customer-phone')),
        },
        {
            selector: '.equipment-data',
            content: (t('equipment-data')),
        },
        {
            selector: '.brand-selector',
            content: ((t('brand-selector'))),
        },
        {
            selector: '.device-selector',
            content: (t('device-selector')),
        },

        {
            selector: '.model-input',
            content: (t('model-input')),
        },
        {
            selector: '.comment-section',
            content: (t('comment-section')),
        },
        {
            selector: '.customer-comment',
            content: (t('customer-comment')),
        },
        {
            selector: '.submit-button',
            content: (t('submit-button')),
        },
        {
            selector: '.back-button',
            content: (t('back-button')),
            // content: '¡Gracias por enviar tu solicitud! Te contactaremos pronto para confirmar la cita.',
        },
        {
            selector: '.sat-information',
            content: (t('sat-information')),
        },
        {
            selector: '.select-brand',
            content: (t('select-brand')),
        },
    ];

    const resumenSteps = [
        {
            selector: '.resumen-header',
            content: (t('resumen-header')),
        },
        {
            selector: '.calendar-filter',
            content: (t('calendar-filter')),
        },
        {
            selector: '.date-picker',
            content: (t('date-picker')),
        },
        {
            selector: '.status-filter',
            content: (t('status-filter')),
        },
        {
            selector: '.service-type-filter',
            content: (t('service-type')),
        },
        {
            selector: '.customer-name-filter',
            content: (t('customer-name-filter')),
        },
        {
            selector: '.clean-filter',
            content: (t('clean-filter')),
        }
    ]

    const satSteps = [
        {
            selector: '.sat-header',
            content: (t('sat-header')),
        },
        {
            selector: '.sat-search',
            content: (t('sat-search')),

        },
        {
            selector: '.brand-info',
            content: (t('brand-info')),
        },
        {
            selector: '.sat-info',
            content: (t('sat-info')),
        },
        {
            selector: '.back-button',
            content: (t('back-button')),
        },
    ];

    const facturacionSteps = [
        {
            selector: '.facturacion-header',
            content: (t('facturacion-header')),
        },
        {
            selector: '.calendar-filter',
            content: (t('calendar-filter')),
        },
        {
            selector: '.date-picker',
            content: (t('date-picker')),
        },
        {
            selector: '.cards-filter',
            content: (t('cards-filter')),
        },
        // {
        //     selector: '.accumulated-card',
        //     content: (t('accumulated-card')),
        // },
        // {
        //     selector: '.dialog-info',
        //     content: (t('dialog-info')),
        // }
        {
            selector: '.monedero-info',
            content: (t('monedero-info')),
        },
        {
            selector: '.clean-filter',
            content: (t('clean-filter')),
        }
    ]

    const fiscalDataSteps = [
        {
            selector: '.fiscal-data-header',
            content: (t('fiscal-data-header')),
        },
        {
            selector: '.fiscal-data-edit-button',
            content: (t('fiscal-data-edit-button')),
        },
        {
            selector: '.fiscal-data-form',
            content: (t('fiscal-data-form')),
        },
        {
            selector: '.fiscal-data-submit',
            content: (t('fiscal-data-submit')),
        },
        {
            selector: '.fiscal-data-contact-button',
            content: (t('fiscal-data-contact-button')),
        },
        // {
        //     selector: '.fiscal-data-back',
        //     content: (t('fiscal-data-back')),
        // }
    ]

    const addBussinessSteps = [
        {
            selector: '.add-business-header',
            content: (t('add-business-header')),
        },
        // {
        //     selector: '.add-business-form',
        //     content: (t('add-business-form')),
        // },
        {
            selector: '.add-business-submit',
            content: (t('add-business-submit')),
        },
        // {
        //     selector: '.add-business-contact-button',
        //     content: (t('add-business-contact-button')),
        // },
    ]

    const addUserSteps = [
        {
            selector: '.add-user-header',
            content: (t('add-user-header')),
        },
        // {
        //     selector: '.add-user-form',
        //     content: (t('add-user-form')),
        // },
        {
            selector: '.add-user-submit',
            content: (t('add-user-submit')),
        },
        // {
        //     selector: '.add-user-contact-button',
        //     content: (t('add-user-contact-button')),
        // },
    ]

    switch (path) {
        case '/inicio':
            return homeSteps;
        case '/asistencia':
            return asistenciaSteps;
        case '/asistencia/reparacion':
        case '/asistencia/instalacion':
            return serviceFormSteps;
        case '/resumen':
            return resumenSteps;
        case '/sats':
            return satSteps;
        case '/facturacion':
            return facturacionSteps;
        case '/datos-fiscales':
            return fiscalDataSteps;
        case '/nuevo-negocio':
            return addBussinessSteps;
        case '/nuevo-usuario':
            return addUserSteps;
        default:
            return [];
    }
};