export function formatHoursToTime(hora) {
    if (isNaN(hora) || hora < 0) {
        return "00:00:00";  // Si el valor no es válido, devuelve 00:00:00
    }

    const hours = Math.floor(hora);
    const minutes = Math.floor((hora - hours) * 60);
    const seconds = Math.round(((hora - hours) * 60 - minutes) * 60);

    // Formatear como hh:mm:ss
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function convertTimeToDecimal(time) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
}
