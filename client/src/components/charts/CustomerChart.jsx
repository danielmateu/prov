// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
// import { useMemo } from "react";

// const chartConfig = {
//     customers: {
//         label: "Clientes",
//         color: "hsl(var(--chart-1))",
//     },
//     business: {
//         label: "Empresas",
//         color: "hsl(var(--chart-2))",
//     },
// };

// export default function CustomersChart({ customers }) {
//     console.log('CustomersChart rendered', customers);
//     const chartData = useMemo(() => {
//         // Agrupar clientes por mes
//         const monthlyData = customers.reduce((acc, customer) => {
//             const date = new Date(customer.CreateDate);
//             const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//             const monthName = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

//             if (!acc[monthKey]) {
//                 acc[monthKey] = {
//                     month: monthName,
//                     customers: 0,
//                     business: 0,
//                     total: 0
//                 };
//             }

//             acc[monthKey].customers++;
//             if (customer.Business) {
//                 acc[monthKey].business++;
//             }
//             acc[monthKey].total++;

//             return acc;
//         }, {});

//         // Convertir a array y ordenar por fecha
//         return Object.entries(monthlyData)
//             .sort(([a], [b]) => a.localeCompare(b))
//             .slice(-6) // Últimos 6 meses
//             .map(([_, data]) => data);
//     }, [customers]);

//     const totalCustomers = customers.length;
//     const businessCustomers = customers.filter(c => c.Business).length;
//     const autonomosCustomers = customers.filter(c => !c.Business).length;

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Registro de Clientes</CardTitle>
//                 <CardDescription>
//                     Evolución mensual de nuevos clientes registrados
//                 </CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <div className="grid grid-cols-3 gap-4 mb-4">
//                     <div className="text-center">
//                         <div className="text-2xl font-bold text-blue-600">{totalCustomers}</div>
//                         <div className="text-sm text-muted-foreground">Total Clientes</div>
//                     </div>
//                     <div className="text-center">
//                         <div className="text-2xl font-bold text-green-600">{businessCustomers}</div>
//                         <div className="text-sm text-muted-foreground">Empresas</div>
//                     </div>
//                     <div className="text-center">
//                         <div className="text-2xl font-bold text-red-600">{autonomosCustomers}</div>
//                         <div className="text-sm text-muted-foreground">Autónomos</div>
//                     </div>
//                 </div>

//                 <ChartContainer config={chartConfig}>
//                     <AreaChart
//                         accessibilityLayer
//                         data={chartData}
//                         margin={{
//                             left: 12,
//                             right: 12,
//                         }}
//                     >
//                         <XAxis
//                             dataKey="month"
//                             tickLine={false}
//                             axisLine={false}
//                             tickMargin={8}
//                             tickFormatter={(value) => value.slice(0, 3)}
//                         />
//                         <YAxis hide />
//                         <ChartTooltip
//                             cursor={false}
//                             content={<ChartTooltipContent indicator="line" />}
//                         />
//                         <Area
//                             dataKey="customers"
//                             type="natural"
//                             fill="var(--color-customers)"
//                             fillOpacity={0.4}
//                             stroke="var(--color-customers)"
//                             stackId="a"
//                         />
//                         <Area
//                             dataKey="business"
//                             type="natural"
//                             fill="var(--color-business)"
//                             fillOpacity={0.4}
//                             stroke="var(--color-business)"
//                             stackId="a"
//                         />
//                     </AreaChart>
//                 </ChartContainer>
//             </CardContent>
//         </Card>
//     );
// }

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import { useMemo } from "react";

const chartConfig = {
    business: {
        label: "Empresas",
        color: "hsl(var(--chart-2))",
    },
    autonomos: {
        label: "Autónomos",
        color: "hsl(var(--chart-1))",
    },
};

export default function CustomersChart({ customers }) {
    const chartData = useMemo(() => {
        // Agrupar clientes por mes
        const monthlyData = customers.reduce((acc, customer) => {
            const date = new Date(customer.CreateDate);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const monthName = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

            if (!acc[monthKey]) {
                acc[monthKey] = {
                    month: monthName,
                    autonomos: 0,
                    business: 0,
                    total: 0
                };
            }

            // Incrementar contador según tipo de cliente
            if (customer.Business) {
                acc[monthKey].business++;
            } else {
                acc[monthKey].autonomos++;
            }

            acc[monthKey].total++;

            return acc;
        }, {});

        // Convertir a array y ordenar por fecha correctamente
        return Object.entries(monthlyData)
            .sort(([keyA], [keyB]) => {
                const [yearA, monthA] = keyA.split('-').map(Number);
                const [yearB, monthB] = keyB.split('-').map(Number);

                if (yearA !== yearB) return yearA - yearB;
                return monthA - monthB;
            })
            .slice(-6) // Últimos 6 meses
            .map(([_, data]) => data);
    }, [customers]);

    const totalCustomers = customers.length;
    const businessCustomers = customers.filter(c => c.Business).length;
    const autonomosCustomers = customers.filter(c => !c.Business).length;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Registro de Clientes</CardTitle>
                <CardDescription>
                    Evolución mensual de nuevos clientes por tipo
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{totalCustomers}</div>
                        <div className="text-sm text-muted-foreground">Total Clientes</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{businessCustomers}</div>
                        <div className="text-sm text-blue-600/70 dark:text-blue-400/70">Empresas</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{autonomosCustomers}</div>
                        <div className="text-sm text-green-600/70 dark:text-green-400/70">Autónomos</div>
                    </div>
                </div>

                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={4}
                            // tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={(value, name) => [
                                            value,
                                            name === "business" ? "Empresas" : "Autónomos"
                                        ]}
                                    />
                                }
                            />
                            <Legend
                                formatter={(value) => value === "business" ? "Empresas" : "Autónomos"}
                                verticalAlign="top"
                                height={36}
                            />
                            <Area
                                name="autonomos"
                                dataKey="autonomos"
                                type="monotone"
                                stackId="1"
                                stroke="#22c55e"
                                fill="#22c55e80"
                            />
                            <Area
                                name="business"
                                dataKey="business"
                                type="monotone"
                                stackId="1"
                                stroke="#3b82f6"
                                fill="#3b82f680"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>

                {/* Tabla con detalles mensuales */}
                {/* <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="py-2 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Mes</th>
                                <th className="py-2 px-4 text-right font-medium text-gray-500 dark:text-gray-400">Empresas</th>
                                <th className="py-2 px-4 text-right font-medium text-gray-500 dark:text-gray-400">Autónomos</th>
                                <th className="py-2 px-4 text-right font-medium text-gray-500 dark:text-gray-400">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chartData.map((data, index) => (
                                <tr key={index} className="border-b border-gray-200 dark:border-gray-800">
                                    <td className="py-2 px-4 font-medium">{data.month}</td>
                                    <td className="py-2 px-4 text-right text-blue-600 dark:text-blue-400">{data.business}</td>
                                    <td className="py-2 px-4 text-right text-green-600 dark:text-green-400">{data.autonomos}</td>
                                    <td className="py-2 px-4 text-right font-medium">{data.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
            </CardContent>
        </Card>
    );
}