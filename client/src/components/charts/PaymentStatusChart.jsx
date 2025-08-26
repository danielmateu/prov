import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

// interface Notice {
//   NoticeHeaderID: string;
//   CreateDate: string;
//   StatusID: number;
//   Total: number;
//   paid?: boolean;
//   ClosedDate?: string;
// }

// interface PendingPayment {
//   PaymentID?: string;
//   Total: number;
//   createdAt?: string;
// }

// interface PaymentsStatusChartProps {
//   notices: Notice[];
//   pendingPayments: PendingPayment[];
// }

const chartConfig = {
    paid: {
        label: "Pagados",
        color: "hsl(var(--chart-2))",
    },
    pending: {
        label: "Pendientes",
        color: "hsl(var(--chart-1))",
    },
};

export default function PaymentsStatusChart({ notices, pendingPayments }) {

    // console.log("Pagos pendientes:", pendingPayments);
    const chartData = useMemo(() => {
        // Agrupar pagos por mes
        const monthlyData = {};

        // Procesar avisos pagados
        const paidNotices = notices.filter(notice => notice.paid && notice.StatusID === 27 && notice.Ex_StatusID === 5);
        paidNotices.forEach(notice => {
            const date = new Date(notice.ClosedDate || notice.CreateDate);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const monthName = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {
                    month: monthName,
                    paid: 0,
                    pending: 0,
                };
            }

            // Aplicar la misma lógica basada en ServiceTypeID para pagos realizados
            if (notice.ServiceTypeID === 1) {
                monthlyData[monthKey].paid += 10;
            } else if (notice.ServiceTypeID === 4 || notice.ServiceTypeID === 0) {
                monthlyData[monthKey].paid += 15;
            } else {
                // Si no tiene ServiceTypeID específico, usar el Total si existe
                monthlyData[monthKey].paid += notice.Total || 10; // Valor por defecto
            }
        });

        // Procesar pagos pendientes
        pendingPayments.forEach(payment => {
            // Usar los campos AÑO y MES en lugar de intentar extraer fecha de CreateDate
            // Los meses en JS son 0-indexed, pero tus datos usan 1-indexed, no necesitamos restar 1
            const year = payment.AÑO;
            const month = payment.MES;

            if (!year || !month) {
                console.warn("Payment missing year or month:", payment);
                return; // Saltamos este pago si faltan datos
            }

            const monthKey = `${year}-${String(month).padStart(2, '0')}`;
            // Crear un objeto Date para obtener el nombre del mes en español
            const date = new Date(year, month - 1, 1); // Restamos 1 al mes para crear el objeto Date
            const monthName = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {
                    month: monthName,
                    paid: 0,
                    pending: 0,
                };
            }

            // Usar el campo Total directamente en lugar de lógica condicional basada en ServiceTypeID
            if (payment.Total) {
                monthlyData[monthKey].pending += payment.Total;
            } else if (payment.ServiceTypeID === 1) {
                monthlyData[monthKey].pending += 10;
            } else if (payment.ServiceTypeID === 4 || payment.ServiceTypeID === 0) {
                monthlyData[monthKey].pending += 15;
            } else {
                // Valor por defecto si no se puede determinar
                monthlyData[monthKey].pending += 10;
            }
        });

        // Convertir a array y ordenar por fecha
        return Object.entries(monthlyData)
            .sort(([keyA], [keyB]) => {
                const [yearA, monthA] = keyA.split('-').map(Number);
                const [yearB, monthB] = keyB.split('-').map(Number);

                if (yearA !== yearB) return yearA - yearB;
                return monthA - monthB;
            })
            .slice(-6) // Últimos 6 meses
            .map(([_, data]) => ({
                ...data,
                paid: Math.round(data.paid * 100) / 100,
                pending: Math.round(data.pending * 100) / 100,
            }));
    }, [notices, pendingPayments]);

    const totalPaid = useMemo(() => {
        const paidNotices = notices.filter(notice => notice.paid && notice.StatusID === 27);
        return paidNotices.reduce((sum, notice) => {
            if (notice.ServiceTypeID === 1) {
                return sum + 10;
            } else if (notice.ServiceTypeID === 4 || notice.ServiceTypeID === 0) {
                return sum + 15;
            } else {
                return sum + (notice.Total || 10); // Usar Total si existe, o valor por defecto
            }
        }, 0);
    }, [notices]);

    const totalPending = useMemo(() => {
        return pendingPayments.reduce((sum, payment) => {
            // Usar el campo Total directamente
            return sum + (payment.Total || 0);
        }, 0);
    }, [pendingPayments]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Estado de Pagos</CardTitle>
                <CardDescription>
                    Comparación mensual entre pagos realizados y pendientes
                </CardDescription>
            </CardHeader>
            <CardContent
                className="pb-0"
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">€{totalPaid.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Pagos Realizados</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">€{totalPending.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Pagos Pendientes</div>
                    </div>
                </div>

                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 0,
                            right: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
                        <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}