

export const mockPendingPayments = [
    {
        id: "1",
        customerId: "49",
        amount: 60.00,
        status: "pending",
        createDate: "2025-04-28",
        noticeIds: ["65"],
        customerName: "DANIEL MATEU PARDO",
        servicePeriod: "Abril 2025",
        paymentMethod: "Transferencia"
    },
    {
        id: "2",
        customerId: "28",
        amount: 20.00,
        status: "pending",
        createDate: "2025-04-30",
        noticeIds: ["69"],
        customerName: "JOEL PÉREZ MIRALLES",
        servicePeriod: "Abril 2025",
        paymentMethod: "Transferencia"
    },
    {
        id: "3",
        customerId: "1",
        amount: 10.00,
        status: "pending",
        createDate: "2025-04-30",
        noticeIds: ["70"],
        customerName: "JUAN RODRÍGUEZ SÁNCHEZ",
        servicePeriod: "Abril 2025",
        paymentMethod: "Transferencia"
    }
];

export const mockDashboardStats = {
    customers: {
        total: 5,
        active: 5,
        inactive: 0,
        new: 1
    },
    notices: {
        total: 7,
        inProcess: 2,
        accumulated: 3,
        billed: 1,
        cancelled: 1
    },
    payments: {
        total: 4,
        pending: 3,
        processed: 1,
        rejected: 0,
        totalAmount: 115.00,
        pendingAmount: 10.00
    }
};

export const serviceTypes = [
    { id: 1, name: "Reparación", basePrice: 10 },
    { id: 2, name: "Instalación", basePrice: 15 },
    { id: 3, name: "Conexión/Mantenimiento", basePrice: 15 }
];