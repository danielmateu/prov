import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

// interface Notice {
//   NoticeHeaderID: string;
//   CreateDate: string;
//   StatusID: number;
//   StatusName: string;
//   Total: number;
//   paid?: boolean;
//   ClosedDate?: string;
// }

// interface NoticesChartProps {
//   notices: Notice[];
// }

const chartConfig = {
    created: {
        label: "Creados",
        color: "hsl(var(--chart-3))",
    },
    completed: {
        label: "Finalizados",
        color: "hsl(var(--chart-2))",
    },
    cancelled: {
        label: "Cancelados",
        color: "hsl(var(--chart-1))",
    },
};

export default function NoticesChart({ notices }) {
    // console.log('NoticesChart rendered', notices);
    const chartData = useMemo(() => {
        // Agrupar avisos por mes
        const monthlyData = notices.reduce((acc, notice) => {
            const date = new Date(notice.CreateDate);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const monthName = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

            if (!acc[monthKey]) {
                acc[monthKey] = {
                    month: monthName,
                    created: 0,
                    completed: 0,
                    cancelled: 0,
                };
            }

            acc[monthKey].created++;

            // StatusID 27 = ATENDIDO (completado)
            if (notice.StatusID === 27) {
                acc[monthKey].completed++;
            }

            // StatusID 38 u otros estados de cancelación
            if (notice.StatusID === 194 || notice.Ex_StatusID === 2) {
                acc[monthKey].cancelled++;
            }

            return acc;
        }, {});

        // Convertir a array y ordenar por fecha
        return Object.entries(monthlyData)
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(-6) // Últimos 6 meses
            .map(([_, data]) => data);
    }, [notices]);

    const totalNotices = notices.length;
    const completedNotices = notices.filter(n => n.StatusID === 27).length;
    const cancelledNotices = notices.filter(n => n.StatusID === 194 || n.Ex_StatusID === 2).length;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestión de Avisos</CardTitle>
                <CardDescription>
                    Evolución mensual de avisos creados, finalizados y cancelados
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{totalNotices}</div>
                        <div className="text-sm text-muted-foreground">Total Avisos</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{completedNotices}</div>
                        <div className="text-sm text-muted-foreground">Finalizados</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{cancelledNotices}</div>
                        <div className="text-sm text-muted-foreground">Cancelados</div>
                    </div>
                </div>

                <ChartContainer config={chartConfig}>
                    <BarChart
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
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="created" fill="var(--color-created)" radius={4} />
                        <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                        <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}