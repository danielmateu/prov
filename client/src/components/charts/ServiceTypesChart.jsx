import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { useMemo } from "react";

// interface Notice {
//     NoticeHeaderID: string;
//     ServiceTypeID: number;
//     StatusID: number;
//     Total: number;
//     ApparatusName?: string;
//     BrandName?: string;
// }

// interface ServiceTypesChartProps {
//     notices: Notice[];
// }

const chartConfig = {
    reparacion: {
        label: "Reparación",
        color: "hsl(var(--chart-1))",
    },
    mantenimiento: {
        label: "Mantenimiento",
        color: "hsl(var(--chart-4))",
    },
    instalacion: {
        label: "Instalación",
        color: "hsl(var(--chart-3))",
    },
    otros: {
        label: "Otros",
        color: "hsl(var(--chart-2))",
    },
};

const COLORS = [
    "hsl(var(--chart-2))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-1))",
];

export default function ServiceTypesChart({ notices }) {
    console.log('Notices:', notices);
    const chartData = useMemo(() => {
        // Agrupar por tipo de servicio
        const serviceTypes = notices.reduce((acc, notice) => {
            let serviceType = "Otros";

            // Mapear ServiceTypeID a nombres más descriptivos
            // switch (notice.ServiceTypeID) {
            switch (notice.Ex_ServiceTypeID) {
                case 1:
                    serviceType = "Reparación";
                    break;
                // case 0:
                //     serviceType = "Devuelto";
                //     break;
                case 2:
                    serviceType = "Mantenimiento";
                    break;
                case 3:
                    serviceType = "Venta";
                    break;
                case 4:
                    serviceType = "Instalación";
                    break;
                default:
                    serviceType = "Otros";
            }

            if (!acc[serviceType]) {
                acc[serviceType] = {
                    name: serviceType,
                    value: 0,
                    revenue: 0,
                };
            }

            acc[serviceType].value++;
            acc[serviceType].revenue += notice.Total;

            return acc;
        }, {});

        return Object.values(serviceTypes).sort((a, b) => b.value - a.value);
    }, [notices]);

    const totalServices = notices.length;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tipos de Servicio</CardTitle>
                <CardDescription>
                    Distribución de avisos por tipo de servicio
                </CardDescription>
            </CardHeader>
            <CardContent
                className="pb-0"
            >
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{totalServices}</div>
                    <div className="text-sm text-muted-foreground">Total Servicios</div>
                </div>

                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[200px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            fill="#8884d8"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>

                <div className="mt-4 space-y-2">
                    {chartData.map((item, index) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span>{item.name}</span>
                            </div>
                            <div className="text-right">
                                <div className="font-medium">{item.value} servicios</div>
                                <div className="text-muted-foreground">€{item.revenue.toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}