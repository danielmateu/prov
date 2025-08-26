'use client';

import { useTheme } from "@/components/theme-provider";

// import { useTheme } from "./ThemeProvider";

export default function useDashboardData() {
    const { theme } = useTheme();
    const isBlindColorMode = theme === 'blindcolor';

    // Definir colores accesibles para el modo BlindColor
    const blindColorPalette = {
        primary: 'rgb(0, 255, 255)', // Cyan
        secondary: 'rgb(255, 255, 0)', // Amarillo
        tertiary: 'rgb(255, 0, 0)', // Rojo
        quaternary: 'rgb(0, 255, 0)', // Verde
        background1: 'rgba(0, 0, 255, 0.3)', // Azul claro
        background2: 'rgba(255, 255, 0, 0.3)', // Amarillo claro
        background3: 'rgba(255, 0, 0, 0.3)', // Rojo claro
        background4: 'rgba(0, 255, 0, 0.3)', // Verde claro
    };

    // Función para obtener el color correcto según el modo
    const getColor = (normalColor, blindColorAlternative) => {
        return isBlindColorMode ? blindColorAlternative : normalColor;
    };

    const weeklyData = {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
            {
                label: 'Llamadas',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: getColor('rgb(255, 99, 132)', blindColorPalette.primary),
                backgroundColor: getColor('rgba(255, 99, 132, 0.5)', blindColorPalette.primary),
            },
            {
                label: 'Avisos',
                data: [28, 48, 40, 19, 86, 27, 90],
                borderColor: getColor('rgb(53, 162, 235)', blindColorPalette.secondary),
                backgroundColor: getColor('rgba(53, 162, 235, 0.5)', blindColorPalette.secondary),
            },
        ],
    };

    const monthlyData = {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                label: 'Llamadas',
                data: [300, 450, 320, 450, 320, 200],
                borderColor: getColor('rgb(255, 99, 132)', blindColorPalette.primary),
                backgroundColor: getColor('rgba(255, 99, 132, 0.5)', blindColorPalette.primary),
            },
            {
                label: 'Avisos',
                data: [200, 300, 250, 400],
                borderColor: getColor('rgb(53, 162, 235)', blindColorPalette.secondary),
                backgroundColor: getColor('rgba(53, 162, 235, 0.5)', blindColorPalette.secondary),
            },
        ],
    };

    const clientRatingData = {
        week: {
            labels: ['Positiva', 'Negativa'],
            datasets: [{
                data: [75, 25],
                backgroundColor: [
                    getColor('rgba(75, 192, 192, 0.6)', blindColorPalette.primary),
                    getColor('rgba(255, 99, 132, 0.6)', blindColorPalette.secondary)
                ],
            }],
        },
        month: {
            labels: ['Positiva', 'Negativa'],
            datasets: [{
                data: [80, 20],
                backgroundColor: [
                    getColor('rgba(75, 192, 192, 0.6)', blindColorPalette.primary),
                    getColor('rgba(255, 99, 132, 0.6)', blindColorPalette.secondary)
                ],
            }],
        },
    };

    const avisosFinalizadosData = {
        week: {
            labels: ['Con seguimiento', 'Sin seguimiento'],
            datasets: [{
                data: [80, 20],
                backgroundColor: [
                    getColor('rgba(54, 162, 235, 0.6)', blindColorPalette.primary),
                    getColor('rgba(255, 206, 86, 0.6)', blindColorPalette.secondary)
                ],
            }],
        },
        month: {
            labels: ['Con seguimiento', 'Sin seguimiento'],
            datasets: [{
                data: [85, 15],
                backgroundColor: [
                    getColor('rgba(54, 162, 235, 0.6)', blindColorPalette.primary),
                    getColor('rgba(255, 206, 86, 0.6)', blindColorPalette.secondary)
                ],
            }],
        },
    };

    const electrodomesticosData = {
        week: {
            labels: ['Nevera', 'Lavadora', 'Lavavajillas', 'Horno', 'Vitrocerámica', 'Aire Acondicionado', 'Calentador', 'Secadora', 'Congelador', 'Campana Extractora'],
            datasets: [{
                label: 'Eficiencia en la gestión',
                data: [95, 90, 88, 85, 82, 80, 78, 75, 72, 70],
                backgroundColor: getColor('rgba(75, 192, 192, 0.6)', blindColorPalette.primary),
            }],
        },
        month: {
            labels: ['Nevera', 'Lavadora', 'Lavavajillas', 'Horno', 'Vitrocerámica', 'Aire Acondicionado', 'Calentador', 'Secadora', 'Congelador', 'Campana Extractora'],
            datasets: [{
                label: 'Eficiencia en la gestión',
                data: [97, 92, 89, 87, 84, 82, 80, 77, 75, 73],
                backgroundColor: getColor('rgba(75, 192, 192, 0.6)', blindColorPalette.primary),
            }],
        },
    };

    const metricsData = {
        week: {
            llamadas: { value: 245, change: '+20%' },
            avisos: { value: 189, change: '+15%' },
            duracion: { value: '5m 32s', change: '-2%' },
            revenue: { value: '$1,234', change: '+10%' },
        },
        month: {
            llamadas: { value: 1050, change: '+15%' },
            avisos: { value: 820, change: '+12%' },
            duracion: { value: '5m 45s', change: '+1%' },
            revenue: { value: '$5,678', change: '+8%' },
        },
    };

    return {
        weeklyData,
        monthlyData,
        clientRatingData,
        avisosFinalizadosData,
        electrodomesticosData,
        metricsData,
    };
}