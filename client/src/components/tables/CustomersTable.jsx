
import React, { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency, truncateText } from "@/lib/utils";
// import { Eye, Edit, MoreHorizontal, Building, User, Search, Check, X, WalletCards, ArrowUpDown, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { useUserInfoStore } from "@/zustand/userInfoStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { format } from "@formkit/tempo";
import CalendarRange from "../CalendarRange";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useTranslation } from "react-i18next";
import { Eye, Edit, MoreHorizontal, Building, User, Search, Check, X, WalletCards, ArrowUpDown, ShieldCheck, Phone, Mail, MapPin, FileText, CreditCard, Landmark, Calendar } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CustomersTable({
    customers,
    title = "Listado Clientes",
    searchQuery,
    onSearchChange
}) {

    console.log('CustomersTable rendered with customers:', customers);

    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { t } = useTranslation();

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

    // Función para manejar la apertura del diálogo
    const handleViewDetails = (customer) => {
        setSelectedCustomer(customer);
        setDetailsDialogOpen(true);
    };


    const [sortConfig, setSortConfig] = useState({
        key: 'CreateDate',
        direction: 'desc'
    });

    const handleSort = (key) => {
        setSortConfig((currentSort) => ({
            key,
            direction:
                currentSort.key === key && currentSort.direction === 'asc'
                    ? 'desc'
                    : 'asc',
        }));
    };

    // console.log('CustomersTable rendered with customers:', customers);

    const filteredCustomers = useMemo(() => {
        if (!userInfo?.Administrator) return [];

        // First filter the customers
        let result = [...customers].filter(customer => {
            const searchTerm = searchQuery.toLowerCase();
            return (
                customer.Name?.toLowerCase().includes(searchTerm) ||
                customer.Surname?.toLowerCase().includes(searchTerm) ||
                customer.Phone?.includes(searchTerm) ||
                customer.Cell?.includes(searchTerm)
            );
        });

        // Then sort them according to the current sort configuration
        result.sort((a, b) => {
            switch (sortConfig.key) {
                case 'Name':
                    const nameA = `${a.Name || ''} ${a.Surname || ''}`.toLowerCase();
                    const nameB = `${b.Name || ''} ${b.Surname || ''}`.toLowerCase();
                    return sortConfig.direction === 'asc'
                        ? nameA.localeCompare(nameB)
                        : nameB.localeCompare(nameA);

                case 'CreateDate':
                    const dateA = new Date(a.CreateDate || 0);
                    const dateB = new Date(b.CreateDate || 0);
                    return sortConfig.direction === 'asc'
                        ? dateA - dateB
                        : dateB - dateA;

                case 'wallet':
                    const walletA = a.wallet || 0;
                    const walletB = b.wallet || 0;
                    return sortConfig.direction === 'asc'
                        ? walletA - walletB
                        : walletB - walletA;

                case 'Balance': // Agregar caso específico para Balance
                    const balanceA = a.Balance || 0;
                    const balanceB = b.Balance || 0;
                    return sortConfig.direction === 'asc'
                        ? balanceA - balanceB
                        : balanceB - balanceA;

                case 'Business':
                    const typeA = a.Business === true ? 1 : 0;
                    const typeB = b.Business === true ? 1 : 0;
                    return sortConfig.direction === 'asc'
                        ? typeA - typeB
                        : typeB - typeA;

                default:
                    return 0;
            }
        });

        return result;
    }, [customers, searchQuery, userInfo?.Administrator, sortConfig]);

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />;
        }
        return <ArrowUpDown className="ml-1 h-4 w-4 inline opacity-30" />;
    };

    return (
        <>
            <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Input
                                placeholder="Buscar por nombre o teléfono..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="pl-6"
                            />
                            <Search size={14} className="absolute left-2 top-3.5 text-gray-400" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <button
                                            onClick={() => handleSort('Name')}
                                            className="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
                                        >
                                            {t('Customer')}
                                            {getSortIcon('Name')}
                                        </button>
                                    </TableHead>
                                    <TableHead>{t('Contact')}</TableHead>
                                    <TableHead>{t('Location')}</TableHead>
                                    <TableHead>
                                        <button
                                            onClick={() => handleSort('Business')}
                                            className="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
                                        >
                                            {t('Type')}
                                            {getSortIcon('Business')}
                                        </button>
                                    </TableHead>
                                    <TableHead>
                                        <button
                                            onClick={() => handleSort('CreateDate')}
                                            className="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
                                        >
                                            {t('Created')}
                                            {getSortIcon('CreateDate')}
                                        </button>
                                    </TableHead>
                                    <TableHead>
                                        {/* <TableHead> */}
                                        <button
                                            onClick={() => handleSort('Balance')}
                                            className="flex items-center justify-start hover:text-gray-700 dark:hover:text-gray-300"
                                        >
                                            Pagado
                                            {getSortIcon('Balance')}
                                        </button>
                                        {/* </TableHead> */}
                                    </TableHead>
                                    <TableHead>
                                        <button
                                            onClick={() => handleSort('wallet')}
                                            className="flex items-center justify-start hover:text-gray-700 dark:hover:text-gray-300"
                                        >
                                            {/* {t('Balance')} */}
                                            Pendiente
                                            {getSortIcon('wallet')}
                                        </button>
                                    </TableHead>
                                    <TableHead className="text-center">{t('Actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCustomers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                                            No se encontraron clientes que coincidan con la búsqueda
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCustomers.map((customer) => (
                                        <TableRow key={customer.Ex_InvoicingAddressID} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <TableCell>
                                                <div className="flex items-start gap-2">
                                                    <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                        {customer.Business === true ? (
                                                            <Building size={16} />
                                                        ) : (
                                                            <User size={16} />
                                                        )}
                                                        {/* Si es admin mostrar icono */}
                                                        {customer.SuperAdmin && (
                                                            <span className="text-green-500">
                                                                <ShieldCheck size={16} />
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium flex flex-col">
                                                            <p className="truncate">{`${customer.Name}`} {customer.Surname && ` ${customer.Surname}`}</p>
                                                            <p className="text-slate-600">{customer.TaxName}</p>
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {customer.TaxIDNumber}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm flex flex-col gap-1 w-64">
                                                    {customer.Email && (
                                                        <div className="text-blue-600 dark:text-blue-400 truncate text-balance">
                                                            {customer.Email}
                                                        </div>
                                                    )}
                                                    {customer.Cell && (
                                                        <div className="text-gray-600 dark:text-gray-400">{customer.Cell}</div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {customer.Address}
                                                    {customer.City !== "NULL" && (
                                                        <div className="text-gray-600 dark:text-gray-400">
                                                            {customer.City}, {customer.ZipCode !== "NULL" ? customer.ZipCode : ""}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={customer.Business > 0 ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"}>
                                                    {customer.Business === false ? "Autónomo" : "Empresa"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatDate(customer.CreateDate || "")}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {/* <div className="font-medium">
                                                {customer.wallet !== undefined ? formatCurrency(customer.wallet) : "-"}
                                            </div> */}
                                                <div className="font-medium">
                                                    {customer.Balance !== undefined ? formatCurrency(customer.Balance) : "-"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {customer.wallet !== undefined ? formatCurrency(customer.wallet) : "-"}
                                                </div>
                                                {/* <div className="font-medium">
                                                {customer.Balance !== undefined ? formatCurrency(customer.Balance) : "-"}
                                            </div> */}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            // disabled
                                                            variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {/* <DropdownMenuItem
                                                        // disabled
                                                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 flex justify-between">
                                                        Ver Detalles
                                                        <WalletCards size={16} className="text-blue-600 dark:text-blue-400" />
                                                    </DropdownMenuItem> */}
                                                        <DropdownMenuItem
                                                            onClick={() => { handleViewDetails(customer) }}
                                                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 flex justify-between">
                                                            Ver Detalles
                                                            <Eye size={16} className="text-blue-600 dark:text-blue-400" />
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            {/* Diálogo de Detalles del Cliente */}
            <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh]">
                    {selectedCustomer && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Detalles del Cliente
                                </DialogTitle>
                                <DialogDescription>
                                    Información completa del cliente seleccionado
                                </DialogDescription>
                            </DialogHeader>

                            <div className="overflow-y-auto pr-2 max-h-[70vh]">
                                <div className="space-y-6">
                                    {/* Cabecera con información principal */}
                                    <div className="bg-muted/50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`relative flex items-center justify-center h-12 w-12 rounded-full ${selectedCustomer.Business
                                                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                                                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                                                    }`}>
                                                    {selectedCustomer.Business ? (
                                                        <Building size={24} />
                                                    ) : (
                                                        <User size={24} />
                                                    )}

                                                    {/* Indicador de SuperAdmin */}
                                                    {selectedCustomer.SuperAdmin && (
                                                        <div className="absolute -top-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                                                            <ShieldCheck size={12} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                                        {selectedCustomer.Name} {selectedCustomer.Surname}
                                                        {selectedCustomer.SuperAdmin && (
                                                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                                <ShieldCheck size={12} />
                                                                Súper Admin
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <p className="text-muted-foreground">{selectedCustomer.TaxName}</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className={`px-3 py-1 ${selectedCustomer.Business
                                                ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
                                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                                                }`}>
                                                {selectedCustomer.Business ? "Empresa" : "Autónomo"}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Información financiera */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-card border rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Balance</h4>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-medium">Saldo actual:</span>
                                                <span className={`text-xl font-semibold ${selectedCustomer.Balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                                    }`}>
                                                    {formatCurrency(selectedCustomer.Balance || 0)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-card border rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Monedero</h4>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-medium">Disponible:</span>
                                                <span className="text-xl font-semibold text-primary">
                                                    {formatCurrency(selectedCustomer.wallet || 0)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Información de contacto */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Información de contacto</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Teléfonos */}
                                            <div className="space-y-2">
                                                {selectedCustomer.Cell && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950">
                                                            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-muted-foreground">Móvil</p>
                                                            <p className="font-medium">{selectedCustomer.Cell}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedCustomer.Phone && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950">
                                                            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-muted-foreground">Teléfono fijo</p>
                                                            <p className="font-medium">{selectedCustomer.Phone}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Email */}
                                            {selectedCustomer.Email && (
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950">
                                                        <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Email</p>
                                                        <p className="font-medium text-xs">{selectedCustomer.Email}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Dirección */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Dirección</h4>
                                        <div className="bg-card border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-muted-foreground">Dirección completa</span>
                                            </div>
                                            <p className="font-medium">{selectedCustomer.Address}</p>
                                            <p className="text-muted-foreground">
                                                {selectedCustomer.ZipCode} {selectedCustomer.City}, {selectedCustomer.Province}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Información fiscal */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Información fiscal</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-card border rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium text-muted-foreground">Nombre fiscal</span>
                                                </div>
                                                <p className="font-medium">{selectedCustomer.TaxName}</p>
                                            </div>

                                            <div className="bg-card border rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium text-muted-foreground">NIF/CIF</span>
                                                </div>
                                                <p className="font-medium">{selectedCustomer.TaxIDNumber}</p>
                                            </div>
                                        </div>

                                        {/* IBAN - Mostrar siempre, aunque sea vacío */}
                                        <div className="bg-card border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Landmark className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-muted-foreground">Cuenta bancaria</span>
                                            </div>
                                            {selectedCustomer.IBAN ? (
                                                <p className="font-medium font-mono tracking-wider">{selectedCustomer.IBAN}</p>
                                            ) : (
                                                <p className="text-muted-foreground italic">No disponible</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Estado de administración */}
                                    <div className="bg-card border rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-muted-foreground">Permisos</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    variant={selectedCustomer.SuperAdmin ? "success" : "outline"}
                                                    className={selectedCustomer.SuperAdmin
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                                                    }
                                                >
                                                    {selectedCustomer.SuperAdmin
                                                        ? "Súper Administrador"
                                                        : "Usuario estándar"
                                                    }
                                                </Badge>

                                                {selectedCustomer.SuperAdmin && (
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Usuario con privilegios de súper administrador</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Información adicional */}
                                    <div className="bg-card border rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium text-muted-foreground">Fecha de alta</span>
                                        </div>
                                        <p className="font-medium">{format(selectedCustomer.CreateDate, "long")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                                    Cerrar
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}