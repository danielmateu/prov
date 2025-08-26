import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUserInfoStore } from "@/zustand/userInfoStore";
import { BookMarked, HandshakeIcon, Headset, NotebookPenIcon, Search, Truck, User, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format, parse, addHour } from "@formkit/tempo"

export default function GestionesPage() {
    const modules = [
        {
            title: 'Pediente contactar',
            icon: <Headset className="w-12 h-12" />,
            statusId: "1",
            // description: 'Clientes pendientes de contactar',
        },
        {
            title: 'Gestionado',
            icon: <NotebookPenIcon className="w-12 h-12" />,
            statusId: "26,27,57,36,35",
            // description: 'Clientes Gestionado'
        },
        {
            title: 'Citado',
            icon: <BookMarked className="w-12 h-12" />,
            statusId: "26",
            // description: 'Clientes citados'
        },
        {
            title: 'En proceso',
            icon: <Truck className="w-12 h-12" />,
            statusId: "57",
            // description: 'En proceso de gestión'
        },
        {
            title: 'Finalizados',
            icon: <HandshakeIcon className="w-12 h-12" />,
            statusId: "27",
            // description: 'Trabajos finalizados'
        },
    ];

    const apiUrl = import.meta.env.VITE_API_URL;
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const [notices, setNotices] = useState([]);
    console.log('Notices:', notices); // Debugging line
    const [filteredNotices, setFilteredNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedModule, setSelectedModule] = useState("");

    const statusOptions = [
        { id: "0", label: "Todos los estados" },
        { id: "1", label: "Pendiente contactar" },
        { id: "26", label: "Citado" },
        { id: "27", label: "Finalizado" },
        { id: "57", label: "En proceso" },
        { id: "36", label: "Ilocalizable" }
    ];

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
                // console.log('Fetched notices:', data); // Debugging line
                setNotices(data);
                setFilteredNotices(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar los avisos');
                console.error('Error fetching notices:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotices();
    }, [userInfo?.ExternalLoginID]);

    useEffect(() => {
        let filtered = [...notices];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(notice =>
                (notice.CustomerName + " " + notice.CustomerSurname).toLowerCase().includes(query) ||
                (notice.CustomerCell || "").toLowerCase().includes(query)
            );
        }

        if (selectedModule) {
            const statusIds = selectedModule.split(',').map(Number);
            filtered = filtered.filter(notice => statusIds.includes(notice.StatusID));
        } else if (statusFilter && statusFilter !== "0") {
            filtered = filtered.filter(notice =>
                notice.StatusID.toString() === statusFilter
            );
        }

        setFilteredNotices(filtered);
    }, [searchQuery, statusFilter, selectedModule, notices]);

    const handleModuleClick = (statusId) => {
        setSelectedModule(statusId);
        setStatusFilter("");  // Reset the dropdown filter when clicking a module
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Mis Servicios
                    </h1>
                    <Button
                        className="h-fit"
                    >
                        <Link to="/gestiones/nuevo_usuario" className="flex items-center gap-2">
                            <UsersRound className="w-4 h-4" /> Añadir usuario
                        </Link>
                    </Button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {modules.map((module, index) => (
                        <button
                            key={index}
                            onClick={() => handleModuleClick(module.statusId)}
                            className={`transform transition-all duration-300 hover:scale-105 w-full ${selectedModule === module.statusId ? 'ring-2 ring-blue-500 ring-offset-1 rounded-lg' : ''
                                }`}
                        >
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg">
                                <div className="py-4">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="text-blue-500 dark:text-blue-400">
                                            {module.icon}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            {module.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            {module.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Input
                                    placeholder="Buscar por nombre o teléfono..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <Select
                                value={statusFilter}
                                onValueChange={(value) => {
                                    setStatusFilter(value);
                                    setSelectedModule("");  // Reset the module selection when using dropdown
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filtrar por estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map((option) => (
                                        <SelectItem key={option.id} value={option.id}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {filteredNotices.length > 0 ? (
                        <div className="overflow-x-auto">
                            <ScrollArea className="h-96 rounded-md border p-4">
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
                                        {filteredNotices.map((notice) => (
                                            <TableRow key={notice.ExternalNoticeID}>
                                                <TableCell className="font-medium">
                                                    {notice.ExternalNoticeID}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        format(notice.CreateDate, { date: "medium" })
                                                    }
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
                            </ScrollArea>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No hay avisos que coincidan con los filtros seleccionados
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}