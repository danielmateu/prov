
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { TooltipProvider } from './components/ui/tooltip.jsx'
import { ThemeProvider } from './components/theme-provider.jsx'
import { Toaster } from './components/ui/toaster.jsx'
import { TourProvider } from '@reactour/tour'
import i18n from './utils/i18';
import { SettingsProvider } from './context/SettingsContext';

const radius = 10

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <TooltipProvider>
                    <Toaster />
                    <TourProvider
                        styles={{
                            popover: (base) => ({
                                ...base,
                                '--reactour-accent': '#ef5a3d',
                                borderRadius: radius,
                                color: '#2d3748',
                                position: 'fixed',
                                bottom: '2rem',
                                top: 'auto',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                maxWidth: '500px',
                                width: '90%',
                                margin: '0 auto',
                                padding: '1.25rem',
                                zIndex: 1000000,
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(209, 213, 219, 0.3)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                minHeight: 'min-content',
                                height: 'auto'
                            }),
                            maskArea: (base) => ({
                                ...base,
                                rx: radius,
                                zIndex: 999999
                            }),
                            badge: (base) => ({
                                ...base,
                                left: 'auto',
                                right: '-0.8125em',
                                background: '#ef5a3d',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }),
                            controls: (base) => ({
                                ...base,
                                marginTop: 16,
                                marginBottom: 0,
                                padding: 0
                            }),
                            arrow: (base) => ({
                                ...base,
                                display: 'none'
                            }),
                            dot: (base, { current }) => ({
                                ...base,
                                background: current ? '#ef5a3d' : '#e2e8f0',
                                width: 8,
                                height: 8,
                                margin: '0 4px'
                            }),
                            close: (base) => ({
                                ...base,
                                right: 8,
                                top: 8,
                                width: 24,
                                height: 24,
                                padding: 4,
                                ':hover': {
                                    background: 'rgba(0, 0, 0, 0.05)'
                                },
                                display: 'none',
                            }),
                            content: (base) => ({
                                ...base,
                                padding: 0,
                                margin: 0,
                                fontSize: '0.95rem',
                                lineHeight: '1.5'
                            })
                        }}
                    >
                        <App />
                    </TourProvider>
                </TooltipProvider>
            </ThemeProvider>
            {/* <SettingsProvider>
            </SettingsProvider> */}
        </BrowserRouter>
    </StrictMode>,
)