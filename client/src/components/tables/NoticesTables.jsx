

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format, parse } from "@formkit/tempo"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslation } from "react-i18next";
import CalendarRange from "../CalendarRange";
import { useEffect, useState } from "react";
import { Activity, ArrowDownIcon, ArrowUpIcon, ChevronsUpDown, Edit, FileText, Loader2, Mail, MapPin, MessageSquare, Phone, Smartphone, Tag, ThumbsUp, Trash2, User, X, Save, CircleDollarSign, CheckCircle, XCircle, Clock, MoveRight, AlertCircle, Search, ClipboardList, Filter, CircleDollarSignIcon, AlertCircleIcon, Layers, Box, Layers2, CircleArrowLeft, ArrowRightCircle } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

// import CalendarRange from "@/components/CalendarRange";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { MoreHorizontal } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Paginator } from "./Paginator";
import { usePagination } from "@/hooks/usePagination";
import TableSkeleton from "../skeletons/TableSkeleton";

export default function NoticesTables({ notices, title = "Avisos Filtrados", all = false, onDeleteNotice, userInfo, onUpdateNotice, dateRange, handleDateRangeChange }) {

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletedNoticeIds, setDeletedNoticeIds] = useState([]);
    const [noticeToDelete, setNoticeToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showOnlyFinalized, setShowOnlyFinalized] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Status options for the select
    const statusOptions = [
        { id: "1", name: "Pendiente Contactar", variant: "warning" },
        { id: "2", name: "Descartado", variant: "destructive" },
        { id: "3", name: "En proceso", variant: "info" },
        { id: "4", name: "Traerá aparato a nave", variant: "secondary" },
        { id: "5", name: "Finalizado", variant: "success" }
    ];

    const getStatusBadgeVariant = (statusId) => {
        // console.log('getStatusBadgeVariant called with statusId:', statusId);
        switch (statusId) {
            case "1": return "warning";     // Pendiente Contactar
            case "2": return "destructive"; // Descartado
            case "3": return "secondary";   // En proceso
            case "4": return "info";        // Citado
            case "5": return "success";     // Finalizado
            default: return "secondary";
        }
    };

    const handleViewDetails = (notice) => {
        // console.log('Selected notice for details:', notice);
        setSelectedNotice(notice);
        setDetailsDialogOpen(true);
        setIsEditing(false);
        setSelectedStatus(notice.Ex_StatusID?.toString() || "");
    };

    // Handle edit action
    const handleEditClick = (notice) => {
        // console.log('Edit clicked for notice:', notice);
        setSelectedNotice(notice);
        setDetailsDialogOpen(true);
        setIsEditing(true);
        setSelectedStatus(notice.Ex_StatusID?.toString() || "");
    };

    const handleDeleteClick = (e, notice) => {
        e.stopPropagation();
        setNoticeToDelete(notice);
        setDeleteDialogOpen(true);
    };

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };

    const handleSaveChanges = async () => {
        if (!selectedNotice || !selectedStatus) return;

        setIsUpdating(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const loginID = userInfo?.Ex_InvoicingAddressID;

            const response = await fetch(`${apiUrl}/noticeController/updateNoticeStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    noticeHeaderID: selectedNotice.NoticeHeaderID,
                    statusID: selectedStatus,
                    timestamp: new Date().toISOString(),
                    Ex_InvoicingAddressID: loginID,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar el aviso: ${response.statusText}`);
            }

            const data = await response.json();

            // Update the selected notice with the new status
            const updatedNotice = {
                ...selectedNotice,
                Ex_StatusID: parseInt(selectedStatus),
                Ex_StatusName: statusOptions.find(option => option.id === selectedStatus)?.name || selectedNotice.Ex_StatusName
            };

            setSelectedNotice(updatedNotice);

            toast({
                title: "Aviso actualizado",
                description: "El estado del aviso ha sido actualizado correctamente",
                variant: "success",
            });

            // Call the parent callback to update the notices list
            if (onUpdateNotice) {
                await onUpdateNotice(selectedNotice.NoticeHeaderID, updatedNotice);
            }

            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar el aviso:", error);
            toast({
                title: "Error",
                description: "No se pudo actualizar el aviso. Inténtelo de nuevo más tarde.",
                variant: "destructive",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedStatus(selectedNotice?.Ex_StatusID?.toString() || "");
    };

    const confirmDelete = async () => {
        if (!noticeToDelete) return;

        setIsDeleting(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const loginID = userInfo?.Ex_InvoicingAddressID

            const response = await fetch(`${apiUrl}/noticeController/deleteNotice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    docEntry: noticeToDelete.DocEntry,
                    noticeHeaderID: noticeToDelete.NoticeHeaderID,
                    timestamp: new Date().toISOString(),
                    Ex_InvoicingAddressID: loginID,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar el aviso: ${response.statusText}`);
            }

            const data = await response.json();

            setDeletedNoticeIds(prev => [...prev, noticeToDelete.NoticeHeaderID]);

            toast({
                title: "Aviso eliminado",
                description: data.message || "El aviso ha sido eliminado correctamente",
                variant: "success",
            });

            if (onDeleteNotice) {
                await onDeleteNotice(noticeToDelete.NoticeHeaderID);
            }
        } catch (error) {
            console.error("Error al eliminar el aviso:", error);
            toast({
                title: "Error",
                description: "No se pudo eliminar el aviso. Inténtelo de nuevo más tarde.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setNoticeToDelete(null);
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortedNotices = (notices) => {
        if (!sortConfig.key) return notices;

        return [...notices].sort((a, b) => {
            let aValue, bValue;

            switch (sortConfig.key) {
                case 'notice':
                    aValue = a.DocEntry || a.NoticeHeaderID;
                    bValue = b.DocEntry || b.NoticeHeaderID;
                    break;
                case 'date':
                    aValue = new Date(a.CreateDate);
                    bValue = new Date(b.CreateDate);
                    break;
                case 'customer':
                    aValue = `${a.CustomerName} ${a.CustomerSurname}`.toLowerCase();
                    bValue = `${b.CustomerName} ${b.CustomerSurname}`.toLowerCase();
                    break;
                case 'apparatus':
                    aValue = a.ApparatusName.toLowerCase();
                    bValue = b.ApparatusName.toLowerCase();
                    break;
                case 'status':
                    aValue = a.Ex_StatusName || a.StatusName;
                    bValue = b.Ex_StatusName || b.StatusName;
                    break;
                case 'collaborator':
                    aValue = a.CustomerTaxName.toLowerCase();
                    bValue = b.CustomerTaxName.toLowerCase();
                    break;
                case 'endDate':
                    aValue = a.ClosedDate ? new Date(a.ClosedDate) : null;
                    bValue = b.ClosedDate ? new Date(b.ClosedDate) : null;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return <ChevronsUpDown className="h-4 w-4" />;
        }
        return sortConfig.direction === 'asc' ?
            <ArrowUpIcon className="h-4 w-4" /> :
            <ArrowDownIcon className="h-4 w-4" />;
    };

    const filteredNotices = notices.filter(notice =>
        !deletedNoticeIds.includes(notice.NoticeHeaderID) &&
        (!showOnlyFinalized || notice.Ex_StatusID === 5) &&
        (searchQuery === "" ||
            // Búsqueda por número de aviso
            (notice.DocEntry?.toString() || notice.NoticeHeaderID?.toString()).toLowerCase().includes(searchQuery.toLowerCase()) ||
            // Búsqueda por nombre de cliente
            `${notice.CustomerName} ${notice.CustomerSurname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            // Búsqueda por nombre fiscal (opcional)
            notice.CustomerTaxName?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const sortedNotices = getSortedNotices(filteredNotices);

    const {
        currentPage,
        totalPages,
        totalItems,
        currentData,
        goToPage,
    } = usePagination({
        data: sortedNotices, // Usar sortedNotices en lugar de filteredNotices
        itemsPerPage: 15,
    });

    useEffect(() => {
        goToPage(1);
    }, [showOnlyFinalized, searchQuery]);

    const { t } = useTranslation()

    const getDisplayStatusName = (notice) => {
        if (!notice) return "";

        // Si los IDs de estado son diferentes, usar el StatusName (estado interno)
        if (notice.StatusID !== notice.Ex_StatusID) {
            return notice.StatusName;
        }

        // Si los estados coinciden o en otros casos, usar Ex_StatusName
        return notice.Ex_StatusName || notice.StatusName || "Sin estado";
    };

    return (
        <Card>
            <CardHeader className="space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <CardTitle className="text-xl font-bold">
                        <div className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-primary" />
                            <span>{title}</span>
                        </div>
                    </CardTitle>

                    <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-2.5 py-1"
                    >
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        {filteredNotices.length} {filteredNotices.length === 1 ? "aviso" : "avisos"}
                    </Badge>
                </div>

                <div className="relative w-full">
                    <div className="flex justify-between">
                        <div className="flex items-center space-x-2 w-full max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Buscar por aviso, cliente o colaborador..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-9 w-full border-gray-200 dark:border-gray-700 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1 transition-colors"
                                        aria-label="Borrar búsqueda"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                )}
                            </div>
                            {/* Boton para filtrar avisos finalizados */}
                            <Button
                                variant={showOnlyFinalized ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowOnlyFinalized(!showOnlyFinalized)}
                                className="flex items-center gap-2"
                            >
                                {/* {statusFilter === 'completed' ? 'Mostrar todos' : 'Mostrar finalizados'} */}
                                {
                                    showOnlyFinalized ?
                                        <X className="h-4 w-4" />
                                        :
                                        <CheckCircle className="h-4 w-4" />
                                }

                                {showOnlyFinalized ? 'Mostrar todos' : 'Finalizados'}
                            </Button>
                        </div>

                        <CalendarRange
                            date={dateRange}
                            setDate={handleDateRangeChange}
                        />
                    </div>

                    {searchQuery && (
                        <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1.5">
                            <Search className="h-3.5 w-3.5" />
                            <span>
                                Resultados para <span className="font-medium text-foreground">"{searchQuery}"</span>
                                {filteredNotices.length === 0 ?
                                    <span className="ml-1 text-destructive">- No se encontraron avisos</span> :
                                    null
                                }
                            </span>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {filteredNotices.length > 0 ? (
                    <div className="overflow-x-auto">
                        <ScrollArea className={cn("h-fit", all ? "h-fit" : "")}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead onClick={() => handleSort('notice')} className="cursor-pointer dark:hover:text-gray-50">
                                            <div className="flex items-center gap-2">
                                                {t('Notice')}
                                                {/* Aviso */}
                                                {getSortIcon('notice')}
                                            </div>
                                        </TableHead>
                                        <TableHead onClick={() => handleSort('date')} className="cursor-pointer dark:hover:text-gray-50">
                                            <div className="flex items-center gap-2">
                                                {t('CreationDate')}
                                                {getSortIcon('date')}
                                            </div>
                                        </TableHead>
                                        <TableHead onClick={() => handleSort('customer')} className="cursor-pointer dark:hover:text-gray-50">
                                            <div className="flex items-center gap-2">
                                                {t('Customer')}
                                                {getSortIcon('customer')}
                                            </div>
                                        </TableHead>
                                        <TableHead onClick={() => handleSort('apparatus')} className="cursor-pointer dark:hover:text-gray-50">
                                            <div className="flex items-center gap-2">
                                                {t('Equipment')}
                                                {getSortIcon('apparatus')}
                                            </div>
                                        </TableHead>
                                        <TableHead>
                                            Marca
                                        </TableHead>
                                        <TableHead onClick={() => handleSort('status')} className="cursor-pointer dark:hover:text-gray-50">
                                            <div className="flex items-center gap-2">
                                                {t('Status')}
                                                {getSortIcon('status')}
                                            </div>
                                        </TableHead>
                                        {/* Fecha finalización */}
                                        <TableHead onClick={() => handleSort('endDate')} className="cursor-pointer dark:hover:text-gray-50">
                                            <div className="flex items-center gap-2">
                                                {t('EndDate')}
                                                {getSortIcon('endDate')}
                                            </div>
                                        </TableHead>
                                        <TableHead onClick={() => handleSort('collaborator')} className="cursor-pointer dark:hover:text-gray-50">
                                            <div className="flex items-center gap-2">
                                                Colaborador
                                                {getSortIcon('collaborator')}
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-right">
                                            {/* Acciones */}
                                            {t("Actions")}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* {sortedNotices.map((notice) => ( */}
                                    {currentData.map((notice) => (
                                        <TableRow key={notice.NoticeHeaderID} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <TableCell className="font-medium">{
                                                notice.DocEntry ?
                                                    notice.DocEntry : notice.NoticeHeaderID
                                            }</TableCell>
                                            <TableCell>{format(notice.CreateDate, "short")}</TableCell>
                                            <TableCell>{`${notice.CustomerName} ${notice.CustomerSurname}`}</TableCell>
                                            <TableCell>{notice.ApparatusName}</TableCell>
                                            <TableCell>{notice.BrandName}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant={getStatusBadgeVariant(notice.Ex_StatusID.toString())}
                                                        className="inline-flex items-center px-2.5 py-1 font-medium text-xs"
                                                    >
                                                        <div className="flex items-center gap-1.5">
                                                            {/* Icono basado en el estado */}
                                                            {notice.Ex_StatusID.toString() === "5" ? (
                                                                <CheckCircle className="h-3.5 w-3.5 mr-0.5" />
                                                            ) : notice.Ex_StatusID.toString() === "2" ? (
                                                                <XCircle className="h-3.5 w-3.5 mr-0.5" />
                                                            ) : notice.Ex_StatusID.toString() === "3" ? (
                                                                <Clock className="h-3.5 w-3.5 mr-0.5" />
                                                            ) : notice.Ex_StatusID.toString() === "4" ? (
                                                                <ArrowRightCircle className="h-3.5 w-3.5 mr-0.5" />
                                                            ) : notice.Ex_StatusID === 1 && notice.StatusID === 1 ? (
                                                                <AlertCircle className="h-3.5 w-3.5 mr-0.5" />
                                                            )
                                                                // : (
                                                                //     <CircleArrowLeft className="h-3.5 w-3.5 mr-0.5" />
                                                                // )
                                                                : notice.Ex_StatusID === 1 && notice.StatusID === 22 ? (
                                                                    <CircleArrowLeft className="h-3.5 w-3.5 mr-0.5" />
                                                                ) : (
                                                                    <AlertCircle className="h-3.5 w-3.5 mr-0.5" />
                                                                )
                                                            }

                                                            {/* Texto del estado */}
                                                            <span className="truncate">
                                                                {/* {notice.Ex_StatusName && notice.StatusID !== 89 && notice.StatusID !== 194
                                                                    ? notice.Ex_StatusName
                                                                    : notice.StatusName} */}
                                                                {getDisplayStatusName(notice)}
                                                            </span>
                                                        </div>
                                                    </Badge>

                                                    {/* Indicador de pago con tooltip */}
                                                    {notice.paid && (
                                                        <div className="relative group">
                                                            <Badge
                                                                variant="success"
                                                                className="inline-flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full transition-all hover:bg-green-200 dark:hover:bg-green-800"
                                                            >
                                                                <CircleDollarSign size={14} />
                                                                <span className="text-xs font-medium">Pagado</span>
                                                            </Badge>

                                                            {/* Tooltip */}
                                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none">
                                                                Factura pagada
                                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className=""
                                            >
                                                {notice.ClosedDate ? format(notice.ClosedDate, "short") : "N/A"}
                                            </TableCell>
                                            <TableCell>{`${notice.CustomerTaxName}`}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {userInfo.SuperAdmin && (
                                                            <>

                                                                <DropdownMenuItem
                                                                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 flex justify-between"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleEditClick(notice);
                                                                    }}
                                                                >
                                                                    Editar
                                                                    <Edit className="h-4 w-4" />
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="text-red-500 hover:text-red-700 hover:bg-red-100 flex justify-between"
                                                                    onClick={(e) => handleDeleteClick(e, notice)}>
                                                                    Eliminar
                                                                    <Trash2 className="h-4 w-4" />
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="text-green-500 hover:text-green-700 hover:bg-green-100 flex justify-between"
                                                                    onSelect={() => handleViewDetails(notice)}>
                                                                    Ver Detalles
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                        {
                                                            !userInfo.SuperAdmin &&
                                                            <DropdownMenuItem onSelect={() => handleViewDetails(notice)}>
                                                                Ver Detalles
                                                            </DropdownMenuItem>
                                                        }
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                        {/* <div className="flex items-center justify-end space-x-2 py-4">
                            <Button
                                variant="outline"
                                size="sm"
                            // onClick={() => table.previousPage()}
                            // disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                            // onClick={() => table.nextPage()}
                            // disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div> */}
                        <Paginator
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemsPerPage={15}
                            onPageChange={goToPage}
                        />
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        {/* {t('NoResults')} */}
                        <TableSkeleton rows={3} columns={9} title={true} actions={true} />
                    </div>
                )}
            </CardContent>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará permanentemente el aviso {noticeToDelete?.NoticeHeaderID}.
                            Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Eliminando...
                                </>
                            ) : (
                                "Eliminar"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh]">
                    <DialogHeader className="space-y-3">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                {isEditing ? "Editar Aviso" : "Detalles del Aviso"}
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-muted-foreground">
                            {isEditing ? "Modifica el estado del aviso seleccionado" : "Información completa del aviso seleccionado"}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedNotice ? (
                        <ScrollArea className="max-h-[60vh] pr-4">
                            <div className="space-y-6">
                                {/* Header Info */}
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Número de Aviso</p>
                                            <p className="text-lg font-semibold">#{selectedNotice.DocEntry || selectedNotice.NoticeHeaderID}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {isEditing ? (
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-muted-foreground">Estado del Aviso</label>
                                                    <Select value={selectedStatus} onValueChange={handleStatusChange}>
                                                        <SelectTrigger className="w-[200px]">
                                                            <SelectValue placeholder="Seleccionar estado" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {statusOptions.map((status) => (
                                                                <SelectItem key={status.id} value={status.id}>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className={cn(
                                                                            "w-2 h-2 rounded-full",
                                                                            status.variant === "warning" && "bg-yellow-500",
                                                                            status.variant === "destructive" && "bg-red-500",
                                                                            status.variant === "secondary" && "bg-gray-500",
                                                                            status.variant === "info" && "bg-blue-500",
                                                                            status.variant === "success" && "bg-green-500"
                                                                        )} />
                                                                        {status.name}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <Badge
                                                        variant={getStatusBadgeVariant(selectedNotice.Ex_StatusID.toString())}
                                                        className="text-sm px-3 py-1"
                                                    >
                                                        <Activity className="h-3 w-3 mr-1" />
                                                        {/* {selectedNotice.Ex_StatusName && selectedNotice.StatusID !== 89 && selectedNotice.StatusID !== 194 ?
                                                            selectedNotice.Ex_StatusName : selectedNotice.StatusName
                                                        } */}
                                                        {getDisplayStatusName(selectedNotice)}
                                                    </Badge>
                                                    {
                                                        selectedNotice.paid &&
                                                        <Badge variant="info" className="text-sm px-3 py-1">
                                                            <ThumbsUp className="h-3 w-3 mr-1" />
                                                            Facturado
                                                        </Badge>
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Information */}
                                <div className="space-y-4">
                                    {/* Header */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                        <h4 className="font-semibold text-foreground">Información del Cliente</h4>
                                    </div>

                                    {/* Customer Info Card */}
                                    <Card className="overflow-hidden">
                                        <CardContent className="p-0">
                                            {/* Customer Name - Full width header */}
                                            <div className="bg-muted/30 px-6 py-4 border-b">
                                                <h3 className="font-semibold text-lg text-foreground">{
                                                    `${selectedNotice.CustomerName} ${selectedNotice.CustomerSurname}`
                                                }</h3>
                                            </div>

                                            {/* Contact Information Grid */}
                                            <div className="p-6">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    {/* Phone */}
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950">
                                                            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Teléfono</p>
                                                            <p className="text-sm font-medium text-foreground">{selectedNotice.CustomerCell}</p>
                                                        </div>
                                                    </div>

                                                    {/* Address */}
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 dark:bg-green-950">
                                                            <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dirección</p>
                                                            <div className="space-y-0.5">
                                                                <p className="text-sm font-medium text-foreground">{
                                                                    selectedNotice.CustomerAddress || "No disponible"
                                                                }
                                                                    {
                                                                        selectedNotice.CustomerAddressNext ? `, ${selectedNotice.CustomerAddressNext}` : ""
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-muted-foreground">{
                                                                    selectedNotice.CustomerCity ? `${selectedNotice.CustomerCity}, ${selectedNotice.CustomerZipCode}` : "No disponible"
                                                                }</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Email */}
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950">
                                                            <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</p>
                                                            {selectedNotice.CustomerEmail ? (
                                                                <p className="text-sm font-medium text-foreground break-all text-balance">{selectedNotice.CustomerEmail}</p>
                                                            ) : (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    No disponible
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Device Information */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                                        <Smartphone className="h-4 w-4" />
                                        Información del Equipo
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-card border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-muted-foreground">Aparato</span>
                                            </div>
                                            <p className="font-medium">{selectedNotice.ApparatusName}</p>
                                        </div>
                                        <div className="bg-card border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Tag className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-muted-foreground">Marca</span>
                                            </div>
                                            <p className="font-medium">{selectedNotice.BrandName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* {!userInfo.SuperAdmin && (
                                    <div className="bg-red-500 text-white p-4 rounded-lg">
                                        <p className="font-medium">No tienes permisos para ver esta sección.</p>
                                    </div>
                                )} */}

                                {/* Lines */}
                                {userInfo.SuperAdmin && selectedNotice && selectedNotice.lines && selectedNotice.lines.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                                                <Layers className="h-4 w-4" />
                                                Detalle de Productos y Servicios
                                            </h4>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="px-2 py-1 text-xs">
                                                    <Box className="h-3.5 w-3.5 mr-1" />
                                                    {selectedNotice.lines.length} {selectedNotice.lines.length === 1 ? "elemento" : "elementos"}
                                                </Badge>
                                            </div>
                                        </div>

                                        <Card className="">
                                            <Table>
                                                <TableHeader className="bg-muted/30 sticky top-0">
                                                    <TableRow>
                                                        <TableHead className="w-[60px]">Cant.</TableHead>
                                                        {/* <TableHead className="w-[100px]">Referencia</TableHead> */}
                                                        <TableHead>Descripción</TableHead>
                                                        <TableHead className="text-right w-[120px]">Subtotal</TableHead>
                                                        <TableHead className="text-right w-[80px]">IVA</TableHead>
                                                        <TableHead className="text-right w-[120px]">Total</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {selectedNotice.lines.map((line, index) => (
                                                        <TableRow key={index} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                            <TableCell className="font-medium text-center">{line.qty}</TableCell>
                                                            {/* <TableCell>
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium">{line.Reference}</span>
                                                                        {line.SupplierName && (
                                                                            <span className="text-xs text-muted-foreground">{line.SupplierName}</span>
                                                                        )}
                                                                    </div>
                                                                </TableCell> */}
                                                            <TableCell>
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium">{line.Description}</span>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        {line.Revision && (
                                                                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700">
                                                                                Revisión
                                                                            </Badge>
                                                                        )}
                                                                        {line.StatusName && (
                                                                            <Badge variant="outline" className="text-xs">
                                                                                {line.StatusName}
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-right font-medium">{line.SubTotal.toFixed(2)} €</TableCell>
                                                            <TableCell className="text-right text-muted-foreground">{line.Tax.toFixed(2)} €</TableCell>
                                                            <TableCell className="text-right font-medium">{line.Total.toFixed(2)} €</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Card>

                                        <div className="flex justify-end mt-2">
                                            <div className="bg-card border rounded-lg p-4 w-72 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">Subtotal</span>
                                                    <span className="font-medium">{(selectedNotice.Total - selectedNotice.Tax).toFixed(2)} €</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">IVA</span>
                                                    <span className="font-medium">{selectedNotice.Tax} €</span>
                                                </div>
                                                <div className="h-px bg-border my-1"></div>
                                                <div className="flex justify-between items-center font-semibold">
                                                    <span>Total</span>
                                                    <span className="text-lg">{selectedNotice.Total} €</span>
                                                </div>
                                                {selectedNotice.paid ? (
                                                    <Badge variant="success" className="w-full justify-center mt-2 py-1.5">
                                                        <CircleDollarSignIcon className="mr-1 h-4 w-4" />
                                                        Factura pagada
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="w-full justify-center mt-2 py-1.5 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50">
                                                        <AlertCircleIcon className="mr-1 h-4 w-4" />
                                                        Pendiente de pago
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Observations */}
                                {selectedNotice.Observation && (
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4" />
                                            Observaciones
                                        </h4>
                                        <div className="bg-card border rounded-lg p-4">
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedNotice.Observation}</p>
                                        </div>
                                    </div>
                                )}
                                {
                                    selectedNotice.TechnicalObservation && selectedNotice.TechnicalObservation.trim() !== "" &&
                                    (
                                        <div className="space-y-3">
                                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                                                <MessageSquare className="h-4 w-4" />
                                                Observaciones Técnicas
                                            </h4>
                                            <div className="bg-card border rounded-lg p-4">
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedNotice.TechnicalObservation}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-muted-foreground">No hay información disponible</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {selectedNotice && (
                        <div className="flex justify-end gap-2 pt-4 border-t">
                            {isEditing ? (
                                <>
                                    <Button variant="outline" onClick={handleCancelEdit} disabled={isUpdating}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={handleSaveChanges}
                                        disabled={isUpdating || !selectedStatus}
                                        className="flex items-center gap-2"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Guardar Cambios
                                            </>
                                        )}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                                        Cerrar
                                    </Button>
                                    {userInfo.SuperAdmin && (
                                        <Button
                                            className="flex items-center gap-2"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <Edit className="h-4 w-4" />
                                            Editar Aviso
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Card >
    );
}