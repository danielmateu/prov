import { useEffect, useState } from 'react';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, User } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const apiUrl = import.meta.env.VITE_API_URL;


export default function PendientesPage() {
    const [notices, setNotices] = useState([]);
    // console.log('notices', notices);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const userInfo = useUserInfoStore((state) => state.userInfo);

    useEffect(() => {
        const fetchNotices = async () => {
            if (!userInfo?.ExternalLoginID) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/noticeController/getNoticesByExternalLoginID/${userInfo.ExternalLoginID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al cargar los avisos: ${response.status}`);
                }

                const data = await response.json();
                setNotices(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar los avisos');
                console.error('Error fetching notices:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotices();
    }, [userInfo?.ExternalLoginID]);

    const pendingNotices = notices.filter(notice => notice.StatusID === 1);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <CardTitle className="text-red-800">Error</CardTitle>
                        </div>
                        <CardDescription className="text-red-700">
                            {error}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-400">
                            Avisos pendientes
                        </h1>
                        <Badge variant="secondary" className="text-sm">
                            {pendingNotices.length} avisos pendientes
                        </Badge>
                    </div>
                </div>
            </header>

            {/* <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    {notices.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Teléfono</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Observaciones</TableHead>
                                        <TableHead>Observaciones Técnicas</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {notices.map((notice) => (
                                        <TableRow key={notice.ExternalNoticeID}>
                                            <TableCell className="font-medium">
                                                {notice.ExternalNoticeID}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(notice.CreateDate), 'dd/MM/yyyy HH:mm', { locale: es })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium">{notice.CustomerName} {notice.CustomerSurname}</p>
                                                        <p className="text-sm text-gray-500">{notice.CustomerEmail}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {notice.CustomerCell || '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        notice.StatusID === 1 ? "secondary" :
                                                            notice.StatusID === 26 ? "outline" :
                                                                notice.StatusID === 27 ? "success" :
                                                                    notice.StatusID === 57 ? "warning" :
                                                                        notice.StatusID === 36 ? "destructive" :
                                                                            "destructive"
                                                    }
                                                >
                                                    {notice.StatusID === 1 ? 'Pendiente contactar' :
                                                        notice.StatusID === 26 ? 'Citado' :
                                                            notice.StatusID === 27 ? 'Finalizado' :
                                                                notice.StatusID === 57 ? 'En proceso' :
                                                                    notice.StatusID === 36 ? 'Ilocalizable' :
                                                                        'No interesado'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {notice.Observation}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {notice.TechnicalObservation || '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No hay avisos pendientes en este momento
                        </div>
                    )}
                </div>
            </main> */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    {pendingNotices.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Teléfono</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Observaciones</TableHead>
                                        <TableHead>Observaciones Técnicas</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingNotices.map((notice) => (
                                        <TableRow key={notice.ExternalNoticeID}>
                                            <TableCell className="font-medium">
                                                {notice.ExternalNoticeID}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(notice.CreateDate), 'dd/MM/yyyy HH:mm', { locale: es })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium">{notice.CustomerName} {notice.CustomerSurname}</p>
                                                        <p className="text-sm text-gray-500">{notice.CustomerEmail}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {notice.CustomerCell || '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        notice.StatusID === 1 ? "secondary" :
                                                            notice.StatusID === 26 ? "outline" :
                                                                notice.StatusID === 27 ? "success" :
                                                                    notice.StatusID === 57 ? "warning" :
                                                                        notice.StatusID === 36 ? "destructive" :
                                                                            "destructive"
                                                    }
                                                >
                                                    {notice.StatusID === 1 ? 'Pendiente contactar' :
                                                        notice.StatusID === 26 ? 'Citado' :
                                                            notice.StatusID === 27 ? 'Finalizado' :
                                                                notice.StatusID === 57 ? 'En proceso' :
                                                                    notice.StatusID === 36 ? 'Ilocalizable' :
                                                                        'No interesado'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {notice.Observation}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {notice.TechnicalObservation || '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No hay avisos pendientes en este momento
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
