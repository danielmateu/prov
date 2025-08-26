import React from 'react';
import FAQItem from './FAQItem';
import { t } from 'i18next';


const FAQSection = ({ variant = 'full' }) => {
    // FAQ data with YouTube video IDs
    const allFaqItems = [
        {
            question: "Cómo puedo acceder a la plataforma?",
            answer: "Aprende a acceder a nuestra plataforma y a navegar por sus funciones principales.",
            // videoId: "LK91UbTFqpQ"
            videoId: "GPXXx3TIBZo"

        },
        {
            question: "Cómo puedo crear un nuevo usuario?",
            answer: "Sigue este tutorial para crear un nuevo usuario en la plataforma.",
            // videoId: "kgOLOtM7i0M"
            videoId: "1gVosIJFwaU"
        },
        {
            question: "Qué puedo hacer si no recuerdo mi contraseña",
            answer: "Si olvidaste tu contraseña, no te preocupes. Aquí te mostramos cómo restablecerla.",
            // videoId: "YsSMjo8zmX4"
            videoId: "0JRc_K9u19c"
        },
        {
            question: `${t("NewServiceFAQ")}`,
            answer: `${t("NewServiceFAQAnswer")}`,
            videoId: "45H4EH9ICrA"
        },
        {
            // question: "Cómo puedo revisar las asistencias?",
            question: `${t("AssistanceFAQ")}`,
            // answer: "Sigue este tutorial para aprender a gestionar las asistencias en la plataforma.",
            answer: `${t("AssistanceFAQAnswer")}`,
            videoId: "e_tZ1jECT1c"
        },
        {
            // question: "Dónde encuentro la información de los servicios técnicos?",
            question: `${t("TechnicalServiceFAQ")}`,
            // answer: "Aquí te mostramos cómo encontrar la información de los servicios técnicos en la plataforma.",
            answer: `${t("TechnicalServiceFAQAnswer")}`,
            videoId: "De27tjMSsy8"
        },
        {
            // question: "Quiero revisar la facturación de mis servicios",
            question: `${t("BillingFAQ")}`,
            // answer: "Aquí te mostramos cómo revisar la facturación de tus servicios en la plataforma.",
            answer: `${t("BillingFAQAnswer")}`,
            videoId: "53OGEvKWstE"

        },
        {
            // question: "¿Cómo puedo generar facturas desde la aplicación?",
            question: `${t("GenerateInvoiceFAQ")}`,
            // answer: "Aquí te mostramos cómo generar facturas desde la aplicación.",
            answer: `${t("GenerateInvoiceFAQAnswer")}`,
            // videoId: "-tuv9VusdXE"
            videoId: "wzbiPaKmnpQ"
        },
        // {
        //     question: "Puedo editar mis datos fiscales?",
        //     answer: "Aquí te mostramos cómo editar tus datos fiscales en la plataforma.",
        //     videoId: "1OXL7RLXySM"
        // },
        {
            // question: "Puedo modificar los ajustes de la aplicación?",
            question: `${t("AppSettingsFAQ")}`,
            // answer: "Aquí te mostramos cómo modificar los ajustes de la aplicación en la plataforma.",
            answer: `${t("AppSettingsFAQAnswer")}`,
            videoId: "SE8pqFvvDSw"
        },
        {
            question: "Quiero revisar los avisos y los pagos pendientes de la aplicación",
            answer: "Aquí te mostramos cómo revisar los avisos, usuarios y los pagos pendientes de la aplicación.",
            // videoId: "5Hgpm2EqkTE" //
            videoId: "KnCR9HQfnBg" //

        }
    ];

    // Filter FAQ items based on variant
    // const faqItems = variant === 'login'
    //     ? allFaqItems.slice(0, 3) 
    //     : allFaqItems.slice(3);

    const faqItems = variant === 'login'
        ? allFaqItems.slice(0, 3)
        : variant === 'super'
            ? [allFaqItems[allFaqItems.length - 1]]  // Solo el último elemento
            : allFaqItems.slice(3);

    return (
        <section className="">
            <div className="max-w-4xl mx-auto">
                {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center pb-4">
                    Preguntas Frecuentes
                </h2> */}
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            videoId={item.videoId}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;