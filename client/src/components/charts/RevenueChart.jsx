import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

// interface Notice {
//   NoticeHeaderID: string;
//   CreateDate: string;
//   StatusID: number;
//   Total: number;
//   Tax: number;
//   paid?: boolean;
//   ClosedDate?: string;
// }

// interface RevenueChartProps {
//   notices: Notice[];
// }

const chartConfig = {
    revenue: {
        label: "Ingresos",
        color: "hsl(var(--chart-2))",
    },
    tax: {
        label: "Impuestos",
        color: "hsl(var(--chart-1))",
    },
    // total: {
    //     label: "Total",
    //     color: "hsl(var(--chart-3))",
    // },
};

export default function RevenueChart({ notices }) {
    // console.log('Notices:', notices);
    const chartData = useMemo(() => {
        // Filtrar solo avisos pagados y finalizados
        const paidNotices = notices.filter(notice => notice.Ex_StatusID === 5 && notice.StatusID === 27);

        // Agrupar por mes basado en ClosedDate o CreateDate
        const monthlyData = paidNotices.reduce((acc, notice) => {
            const date = new Date(notice.ClosedDate || notice.CreateDate);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const monthName = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

            if (!acc[monthKey]) {
                acc[monthKey] = {
                    month: monthName,
                    revenue: 0,
                    tax: 0,
                    total: 0,
                };
            }

            acc[monthKey].revenue += notice.Total - notice.Tax;
            acc[monthKey].tax += notice.Tax;
            acc[monthKey].total += notice.Total;

            return acc;
        }, {});

        // Convertir a array y ordenar por fecha
        return Object.entries(monthlyData)
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(-6) // Últimos 6 meses
            .map(([_, data]) => ({
                ...data,
                revenue: Math.round(data.revenue * 100) / 100,
                tax: Math.round(data.tax * 100) / 100,
                total: Math.round(data.total * 100) / 100,
            }));
    }, [notices]);

    const totalRevenue = useMemo(() => {
        const paidNotices = notices.filter(notice => notice.Ex_StatusID === 5 && notice.StatusID === 27);
        return paidNotices.reduce((sum, notice) => sum + notice.Total, 0);
    }, [notices]);

    const totalTax = useMemo(() => {
        const paidNotices = notices.filter(notice => notice.Ex_StatusID === 5 && notice.StatusID === 27);
        return paidNotices.reduce((sum, notice) => sum + notice.Tax, 0);
    }, [notices]);

    // Total avisos pagados -> paid: true
    // const totalPaidNotices = useMemo(() => {
    //     return notices.filter(notice => notice.paid && notice.StatusID === 27).length;
    // }, [notices]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ingresos y Facturación</CardTitle>
                <CardDescription>
                    Evolución mensual de ingresos por servicios completados
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">€{totalRevenue.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Ingresos Totales</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">€{totalTax.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Impuestos</div>
                    </div>
                    {/* <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{totalPaidNotices}</div>
                        <div className="text-sm text-muted-foreground">Avisos Pagados</div>
                    </div> */}
                </div>

                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            dataKey="revenue"
                            type="monotone"
                            stroke="var(--color-revenue)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="tax"
                            type="monotone"
                            stroke="var(--color-tax)"
                            strokeWidth={2}
                            dot={false}
                        />
                        {/* <Line
                            dataKey="total"
                            type="monotone"
                            stroke="var(--color-total)"
                            strokeWidth={2}
                            dot={false}
                        /> */}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}