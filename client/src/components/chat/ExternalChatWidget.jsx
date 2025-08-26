import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';

export function ExternalChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const iframeRef = useRef(null);

    // Detectar si es móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Configuración del chat adaptativa
    const config = {
        // liveChatUrl: 'https://c074ad8e124c.a.gdms.cloud/liveChat?liveChatAccess=MF9mNTlkMjY4NDYwYjM0MTI1YjhhNWRlMDMzYmIxYWZmYyYxNjFiYmFjNjdhYTgzZTAwNjEzZTZmMGM4NDU4Y2RlOA==',
        liveChatUrl: 'https://c074ad8e124c.a.gdms.cloud/liveChat/?liveChatAccess=MF8xODdjMWEwM2IyNzY0NjNhYTQ1NjA1NzdjZDliNTJmM19jMDc0YWQ4ZTEyNGMmZGZmMDExYTVkN2EwYTE4ZTRjOWVjZDUyNDYxMDQ4ZWM=',
        liveChatWidth: isMobile ? window.innerWidth - 20 : 400,
        liveChatHeight: isMobile ? window.innerHeight - 100 : 680,
        btnSize: isMobile ? 50 : 56,
        btnRight: isMobile ? 10 : 16,
        btnBottom: isMobile ? 20 : 30
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    // Cerrar chat al hacer clic fuera (solo en móvil)
    useEffect(() => {
        if (!isMobile || !isOpen) return;

        const handleClickOutside = (event) => {
            if (iframeRef.current && !iframeRef.current.contains(event.target)) {
                const chatButton = document.querySelector('[data-chat-button]');
                if (!chatButton?.contains(event.target)) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, isMobile]);

    // SVG para el botón de abrir chat
    const OpenIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-full h-full group-hover:scale-110 transition group-hover:rotate-12">
            <path d="M27.8832966,16.887873 C27.8094879,16.8666413 27.7342507,16.8550603 27.660442,16.8492698 C27.6742514,16.6663873 27.6537754,16.4864 27.6023474,16.3204063 C27.639966,15.9363048 27.6666324,15.5497905 27.6666324,15.1555556 C27.6666324,8.62631111 22.4433584,3.33333333 16.0000982,3.33333333 C9.55636184,3.33333333 4.33356399,8.62631111 4.33356399,15.1555556 C4.33356399,15.5497905 4.35975417,15.9363048 4.39784898,16.3204063 C4.34594481,16.4864 4.32546885,16.6663873 4.33927822,16.8492698 C4.26546953,16.8550603 4.19070847,16.8666413 4.11689979,16.887873 L3.54452533,17.0519365 C2.91310393,17.2333714 2.5378701,17.9287111 2.70739198,18.6052317 L3.93356854,23.5044571 C4.10261424,24.1804952 4.75213067,24.5819683 5.38355207,24.4010159 L5.95545034,24.2374349 C5.98925948,24.2273016 6.01973533,24.2104127 6.05211591,24.1978667 L6.08925835,24.3561397 C6.20497132,24.8468825 6.56068156,25.1885206 6.97448639,25.2681397 C9.50064818,28.5822222 13.7929804,28.6932063 14.8982059,28.6628063 C14.9120153,28.6632889 14.9248723,28.6666667 14.9386817,28.6666667 L17.0962762,28.6666667 C17.8910291,28.6666667 18.5353075,28.0996825 18.5353075,27.4 C18.5353075,26.7008 17.8910291,26.1333333 17.0962762,26.1333333 L14.9386817,26.1333333 C14.1439288,26.1333333 13.5001266,26.7008 13.5001266,27.4 C13.5001266,27.5119492 13.5220311,27.6181079 13.5525069,27.7213714 C10.7211105,27.3300317 8.98255883,25.9687873 8.10447356,25.0447238 L8.51304035,24.9207111 C9.10303365,24.7407238 9.45350586,24.0506921 9.29541242,23.3794794 L7.57733669,16.0887873 C7.44210013,15.5136 6.9773435,15.142527 6.47639681,15.1594159 L6.47639681,15.1555556 C6.47639681,9.82542222 10.7401579,5.5047619 16.0000982,5.5047619 C21.2600385,5.5047619 25.5237996,9.82542222 25.5237996,15.1555556 L25.5237996,15.1594159 C25.0223767,15.142527 24.5576201,15.5136 24.4223835,16.0887873 L22.704784,23.3794794 C22.5466905,24.0506921 22.8966866,24.7407238 23.4866799,24.9207111 L24.5557153,25.2454603 C25.1457086,25.4259302 25.7523684,25.0273524 25.9104619,24.3561397 L25.9476043,24.1978667 C25.9804611,24.2104127 26.0104607,24.2273016 26.044746,24.2374349 L26.6166443,24.4010159 C27.2480657,24.5819683 27.897106,24.1804952 28.0666279,23.5044571 L29.2928044,18.6052317 C29.4618501,17.9287111 29.0866163,17.2333714 28.4551949,17.0519365 L27.8832966,16.887873 Z" fill="#FFF" fillRule="evenodd" />
        </svg>
    );

    // SVG para el botón de cerrar chat
    const CloseIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-full h-full group-hover:rotate-180 transition">
            <path d="M6.95955989,6.95955989 C7.35008418,6.56903559 7.98324916,6.56903559 8.37377345,6.95955989 L15.9996667,14.5846667 L23.6262266,6.95955989 C24.0167508,6.56903559 24.6499158,6.56903559 25.0404401,6.95955989 C25.4309644,7.35008418 25.4309644,7.98324916 25.0404401,8.37377345 L17.4136667,15.9996667 L25.0404401,23.6262266 C25.4009241,23.9867105 25.4286536,24.5539416 25.1236287,24.9462328 L25.0404401,25.0404401 C24.6499158,25.4309644 24.0167508,25.4309644 23.6262266,25.0404401 L15.9996667,17.4136667 L8.37377345,25.0404401 C7.98324916,25.4309644 7.35008418,25.4309644 6.95955989,25.0404401 C6.56903559,24.6499158 6.56903559,24.0167508 6.95955989,23.6262266 L14.5846667,15.9996667 L6.95955989,8.37377345 C6.59907592,8.01328949 6.57134639,7.44605843 6.87637128,7.05376722 Z" fill="#FFF" fillRule="evenodd" />
        </svg>
    );

    return (
        <>
            {/* Overlay para móvil cuando el chat está abierto */}
            {isOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[99998]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Botón de chat */}
            <Button
                data-chat-button
                className="fixed z-[100000] rounded-full p-3 cursor-pointer transition duration-200 group shadow-lg"
                style={{
                    bottom: `${config.btnBottom}px`,
                    right: `${config.btnRight}px`,
                    width: `${config.btnSize}px`,
                    height: `${config.btnSize}px`,
                    backgroundColor: '#3F8EF0',
                }}
                onClick={toggleChat}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4299FC'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3F8EF0'}
            >
                {isOpen ? <CloseIcon /> : <OpenIcon />}
            </Button>

            {/* Iframe del chat */}
            {isOpen && (
                <div
                    ref={iframeRef}
                    className={`fixed z-[99999] ${isMobile
                        ? 'inset-x-2 top-16 bottom-20'
                        : ''
                        }`}
                    style={
                        isMobile
                            ? {
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.3)',
                            }
                            : {
                                bottom: '30px',
                                right: `${config.btnSize + 20}px`,
                                width: `${config.liveChatWidth}px`,
                                height: `${config.liveChatHeight}px`,
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 16px 0 #00000029',
                            }
                    }
                >
                    <iframe
                        src={config.liveChatUrl}
                        width="100%"
                        height="100%"
                        style={{
                            backgroundColor: '#F5F7FA',
                            border: 'none',
                            borderRadius: '12px',
                        }}
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
                        allow="camera; microphone; autoplay; speaker; speaker-selection"
                    />
                </div>
            )}
        </>
    );
}