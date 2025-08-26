'use client'

import { useState } from 'react'

import { Bar, Line, Pie } from 'react-chartjs-2'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import { Phone, CheckCircle, Clock, DollarSign, Star, FileCheck, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useUser from '@/hooks/useUser'
import useDashboardData from '@/hooks/use-dashboard-data'
// import useUser from '../../hooks/useUser'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

export default function CallcenterDashboard() {

    const [timeFrame, setTimeFrame] = useState('week')

    const { username } = useUser()
    const { weeklyData, avisosFinalizadosData, clientRatingData, electrodomesticosData, metricsData, monthlyData } = useDashboardData()

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 ">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    <h1 className="text-3xl font-bold">Dashboard de {username}</h1>
                    <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Esta semana</SelectItem>
                            <SelectItem value="month">Este mes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <Card className='bg-sky-200 dark:bg-sky-800 dark:hover:bg-sky-900 hover:bg-sky-300 transition '>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Llamadas Descolgadas</CardTitle>
                            <Phone className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metricsData[timeFrame].llamadas.value}</div>
                            <p className="text-xs text-muted-foreground dark:text-slate-100">{metricsData[timeFrame].llamadas.change} que el período anterior</p>
                        </CardContent>
                    </Card>
                    <Card className='bg-green-200 dark:bg-green-800 dark:hover:bg-green-900 hover:bg-green-300 transition'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avisos Creados</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metricsData[timeFrame].avisos.value}</div>
                            <p className="text-xs text-muted-foreground dark:text-slate-100">{metricsData[timeFrame].avisos.change} que el período anterior</p>
                        </CardContent>
                    </Card>
                    <Card className='bg-orange-200 dark:bg-orange-800 dark:hover:bg-orange-900 hover:bg-orange-300 transition'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Media Duración Llamadas</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metricsData[timeFrame].duracion.value}</div>
                            <p className="text-xs text-muted-foreground dark:text-slate-100">{metricsData[timeFrame].duracion.change} que el período anterior</p>
                        </CardContent>
                    </Card>
                    <Card className='bg-purple-200 dark:bg-purple-800 dark:hover:bg-purple-900 hover:bg-purple-300 transition'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metricsData[timeFrame].revenue.value}</div>
                            <p className="text-xs text-muted-foreground dark:text-slate-100">{metricsData[timeFrame].revenue.change} que el período anterior</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <Card
                        className="dark:bg-slate-900"
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Star className="mr-2 h-4 w-4" />
                                Valoración de Clientes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <Pie
                                    // className="dark:text-red-500"
                                    data={clientRatingData[timeFrame]} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <span className=''>Valoración Positiva</span>
                                    <span className="font-bold">{clientRatingData[timeFrame].datasets[0].data[0]}%</span>
                                </div>
                                <Progress value={clientRatingData[timeFrame].datasets[0].data[0]} className="mt-2 blindcolor:bg-lightyellow" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card
                        className="dark:bg-slate-900"
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileCheck className="mr-2 h-4 w-4" />
                                Avisos Finalizados
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <Pie data={avisosFinalizadosData[timeFrame]} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <span>Con Seguimiento</span>
                                    <span className="font-bold">{avisosFinalizadosData[timeFrame].datasets[0].data[0]}%</span>
                                </div>
                                <Progress value={avisosFinalizadosData[timeFrame].datasets[0].data[0]} className="mt-2 blindcolor:bg-lightyellow" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                        className="dark:bg-slate-900"
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Zap className="mr-2 h-4 w-4" />
                                Rendimiento por Tipo de Electrodoméstico
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <Bar
                                    data={electrodomesticosData[timeFrame]}
                                    options={{
                                        indexAxis: 'y',
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                        },
                                        scales: {
                                            x: {
                                                beginAtZero: true,
                                                max: 100,
                                                title: {
                                                    display: true,
                                                    text: 'Eficiencia en la gestión (%)'
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        className="dark:bg-slate-900"
                    >
                        <CardHeader>
                            <CardTitle>Rendimiento {timeFrame === 'week' ? 'Semanal' : 'Mensual'}</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            {timeFrame === 'week' ? (
                                <Line data={weeklyData} />
                            ) : (
                                <Bar data={monthlyData} />
                            )}
                        </CardContent>
                    </Card>
                </div>


                <Card className="max-w-[calc(100%-5em)] mx-auto hover:bg-slate-100 dark:hover:bg-slate-900 transition hidden lg:flex">
                    {/* <CardHeader>
                    <CardTitle>Últimas Llamadas</CardTitle>
                </CardHeader> */}
                    <CardContent>
                        <Table >
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Duración</TableHead>
                                    <TableHead>Resultado</TableHead>
                                    <TableHead>Revenue</TableHead>
                                    <TableHead>Valoración</TableHead>
                                    <TableHead>Seguimiento</TableHead>
                                    <TableHead>Electrodoméstico</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                className=""
                            >
                                <TableRow>
                                    <TableCell>2023-10-31 15:23</TableCell>
                                    <TableCell>4m 12s</TableCell>
                                    <TableCell>Aviso Creado</TableCell>
                                    <TableCell>$45</TableCell>
                                    <TableCell>Positiva</TableCell>
                                    <TableCell>Realizado</TableCell>
                                    <TableCell>Nevera</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2023-10-31 14:56</TableCell>
                                    <TableCell>2m 35s</TableCell>
                                    <TableCell>Sin Aviso</TableCell>
                                    <TableCell>$0</TableCell>
                                    <TableCell>Negativa</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell>Lavadora</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2023-10-31  14:30</TableCell>
                                    <TableCell>7m 48s</TableCell>
                                    <TableCell>Aviso Creado</TableCell>
                                    <TableCell>$80</TableCell>
                                    <TableCell>Positiva</TableCell>
                                    <TableCell>Pendiente</TableCell>
                                    <TableCell>Aire Acondicionado</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}