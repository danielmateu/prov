import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export function formatDate(date) {
//   return date.toLocaleDateString("es-ES", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// }

// export function formatDate(dateString) {
//   if (!dateString) return 'Fecha desconocida';

//   try {
//     const date = new Date(dateString);
//     return format(date, 'dd MMM yyyy', { locale: es });
//   } catch (error) {
//     return 'Fecha inválida';
//   }
// }
export function formatDate(dateString, fallback = 'Fecha desconocida') {
  if (!dateString) return fallback;

  try {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    // Format the date using Intl.DateTimeFormat for better localization
    return new Intl.DateTimeFormat('es', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch (error) {
    return 'Fecha inválida';
  }
}

export function isWithinDateRange(
  date,
  dateRange
) {
  if (!dateRange.from && !dateRange.to) return true;

  const checkDate = new Date(date);
  // Set time to start of day for the check date
  checkDate.setHours(0, 0, 0, 0);

  if (dateRange.from && !dateRange.to) {
    const fromDate = new Date(dateRange.from);
    fromDate.setHours(0, 0, 0, 0);
    return checkDate >= fromDate;
  }

  if (!dateRange.from && dateRange.to) {
    const toDate = new Date(dateRange.to);
    toDate.setHours(23, 59, 59, 999);
    return checkDate <= toDate;
  }

  if (dateRange.from && dateRange.to) {
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);
    return checkDate >= fromDate && checkDate <= toDate;
  }

  return false;
}

export function truncateText(text, maxLength = 30) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(amount);
}

export function getStatusColor(statusId) {
  // In process: 26, 1
  // Accumulated: 27
  // Billed: 38
  // Cancelled: 20
  if ([26, 1].includes(statusId)) {
    return "text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-400 dark:bg-blue-900 dark:border-blue-800";
  } else if (statusId === 27) {
    return "text-green-600 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-900 dark:border-green-800";
  } else if (statusId === 38) {
    return "text-purple-600 bg-purple-100 border-purple-200 dark:text-purple-400 dark:bg-purple-900 dark:border-purple-800";
  } else if (statusId === 20) {
    return "text-red-600 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-900 dark:border-red-800";
  }
  return "text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-800";
}

export function getStatusName(statusId) {
  // console.log("getStatusName called with statusId:", statusId);
  switch (statusId) {
    case 26:
    case 1:
      return "En proceso";
    case 27:
      return "Acumulado";
    case 36:
      return "Cliente ilocalizable";
    case 38:
      return "Facturado";
    case 20:
      return "Cancelado";
    default:
      return "Contactado";
  }
}

export function getServiceTypeName(serviceTypeId) {
  switch (serviceTypeId) {
    case 1:
      return "Reparación";
    case 2:
      return "Instalación";
    case 3:
      return "Conexión/Mantenimiento";
    default:
      return "Otro";
  }
}
