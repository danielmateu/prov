import { useEffect, useState, useMemo } from "react";
import { useUserInfoStore } from "@/zustand/userInfoStore";
import { useNoticesStore } from "@/zustand/noticesStore";
import CalendarRange from "@/components/CalendarRange";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "@formkit/tempo";
import { AlertCircle, BookMarked, CalendarIcon, HandshakeIcon, Headset, NotebookPenIcon, Plus, Search, Truck, User } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast";

import { useTranslation } from "react-i18next";
import { useTourSteps } from "@/hooks/useTourSteps";
import { useTour } from "@reactour/tour";
import Footer from "@/components/footer/Footer";
import { Link } from "react-router-dom";

const apiURL = import.meta.env.VITE_API_URL;

// const statusOptionsMapping = [
//     {
//         id: 1,
//         name: 'En proceso',
//         statusId: ["1", "26"],
//     },
//     {
//         id: 2,
//         name: 'Finalizado',
//         statusId: ["27"]
//     },
//     {
//         id: 3,
//         name: 'Cobrado',
//         statusId: ["38"]
//     },
//     {
//         id: 4,
//         name: 'Anulado',
//         statusId: ["20"]
//     },
// ];

// const serviceTypes = [
//     { id: '0', name: 'Todos los servicios' },
//     { id: '1', name: 'Reparación' },
//     { id: '2', name: 'Instalación' },
//     { id: '3', name: 'Venta' },
//     { id: '4', name: 'Garantía' }
// ];

const serviceTypes = [
    { id: '0', name: 'AllServices' },
    { id: '1', name: 'Repair' },
    { id: '4', name: 'Installation' },
    // { id: '3', name: 'Sale' },
    // { id: '4', name: 'Warranty' }
];

const modules = [
    {
        title: 'Vista general',
        icon: <User className="w-12 h-12" />,
        statusId: "0",
    },
    {
        title: 'Por contactar',
        icon: <Headset className="w-12 h-12" />,
        statusId: "1",
    },
    {
        title: 'Gestionado',
        icon: <NotebookPenIcon className="w-12 h-12" />,
        statusId: "26,27,57,36,35",
    },
    {
        title: 'Citados',
        icon: <BookMarked className="w-12 h-12" />,
        statusId: "26",
    },
    {
        title: 'En proceso',
        icon: <Truck className="w-12 h-12" />,
        statusId: "57",
    },
    {
        title: 'Finalizados',
        icon: <HandshakeIcon className="w-12 h-12" />,
        statusId: "27",
    },
];

export default function ResumenPage() {
    const { t } = useTranslation();
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { toast } = useToast();
    // console.log('userInfo', userInfo);
    const { notices, fetchNotices } = useNoticesStore();

    // console.log('Notices:', notices);

    const steps = useTourSteps();
    const { isOpen, currentStep, setIsOpen, setCurrentStep, setSteps } = useTour()

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
    const [serviceTypeFilter, setServiceTypeFilter] = useState('0');
    const [customers, setCustomers] = useState([]);

    // console.log('customers', customers);
    const [selectedModule, setSelectedModule] = useState("0");

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const statusOptionsMapping = [
        {
            id: 1,
            // name: {t('InProcess')},
            name: (t('InProcess')),
            statusId: ["1", "26"],
        },
        {
            id: 2,
            // name: 'Finished',
            name: (t('Finished')),
            statusId: ["27"]
        },
        {
            id: 3,
            // name: 'Charged',
            name: (t('Charged')),
            statusId: ["38"]
        },
        {
            id: 4,
            // name: 'Canceled',
            name: (t('Canceled')),
            statusId: ["20", "194"]
        },
        {
            id: 5,
            // name: 'Contacted',
            name: 'Ilocalizable',
            statusId: ["36"]
        }
    ];

    useEffect(() => {
        if (isOpen) {
            setSteps(steps);
        }
        setCurrentStep(0);
        document.title = 'Rapitecnic | ' + t('ResumenPage');
    }, []);

    useEffect(() => {
        if (userInfo?.Ex_InvoicingAddressID) {
            fetchNotices(userInfo.Ex_InvoicingAddressID);
        }
    }, [userInfo?.Ex_InvoicingAddressID]);

    useEffect(() => {
        const fetchCustomers = async () => {
            if (!userInfo?.ExternalLoginID) return;
            try {
                const response = await fetch(`${apiURL}/noticeController/getCustomersByExternalLoginID/${userInfo.Ex_InvoicingAddressID}`);
                if (!response.ok) throw new Error('Error fetching customers');
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCustomers();
    }, [userInfo?.ExternalLoginID]);

    const filteredCustomers = useMemo(() => {
        if (!userInfo?.Administrator) return [];

        // Ordenar todos los clientes primero por nombre (orden alfabético)
        const sortedCustomers = [...customers].sort((a, b) =>
            a.Name.localeCompare(b.Name)
        );

        // Luego aplicar el filtrado sobre los clientes ordenados
        return sortedCustomers.filter(customer => {
            const searchTerm = searchQuery.toLowerCase();
            return (
                customer.Name?.toLowerCase().includes(searchTerm) ||
                customer.Surname?.toLowerCase().includes(searchTerm) ||
                customer.Phone?.includes(searchTerm) ||
                customer.Cell?.includes(searchTerm)
            );
        });
    }, [customers, searchQuery, userInfo?.Administrator]);

    // console.log('Customers:', customers);

    const getStatusBadgeVariant = (statusId) => {
        const status = statusOptionsMapping.find(s => s.statusId.includes(statusId));
        switch (status?.id) {
            case 1: return "secondary"; // En proceso
            case 2: return "success";   // Finalizados
            case 3: return "info"; // Anulados
            case 4: return "destructive"; // Cobrado
            default: return "secondary";
        }
    };

    const getStatusName = (statusId) => {
        console.log('getStatusName called with statusId:', statusId);

        const status = statusOptionsMapping.find(s => s.statusId.includes(statusId));
        return status ? status.name : 'Gestionado';
    };

    // console.log('Notices:', notices);

    const filteredNotices = useMemo(() => {
        return notices.filter(notice => {
            const matchesSearch = searchQuery.toLowerCase().trim() === '' ||
                notice.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                notice.CustomerSurname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                notice.CustomerPhone?.includes(searchQuery) ||
                notice.CustomerCell?.includes(searchQuery);

            const matchesStatus = statusFilter === 'all' ||
                statusOptionsMapping.find(s =>
                    s.id.toString() === statusFilter &&
                    s.statusId.includes(notice.StatusID.toString())
                ) !== undefined;

            const normalizeDate = (date) => {
                const normalized = new Date(date);
                normalized.setHours(0, 0, 0, 0);
                return normalized;
            };

            const matchesDate = (!dateRange.from || !dateRange.to) ||
                (normalizeDate(notice.CreateDate) >= normalizeDate(dateRange.from) &&
                    normalizeDate(notice.CreateDate) <= normalizeDate(dateRange.to));

            const matchesCustomer = !selectedCustomer ||
                notice.CustomerID === selectedCustomer.CustomerID;

            const matchesModule = selectedModule === "0" ||
                (selectedModule.includes(',')
                    ? selectedModule.split(',').includes(notice.Ex_StatusID.toString())
                    : notice.Ex_StatusID.toString() === selectedModule);

            const matchesUser = userInfo?.Administrator || notice.ExternalLoginID === userInfo?.ExternalLoginID;

            const matchesServiceType = serviceTypeFilter === '0' || notice.ServiceTypeID?.toString() === serviceTypeFilter;

            return matchesSearch && matchesStatus && matchesDate && matchesCustomer &&
                matchesModule && matchesUser && matchesServiceType;
        });
    }, [notices, searchQuery, statusFilter, dateRange, selectedCustomer, selectedModule, userInfo, serviceTypeFilter]);

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer === selectedCustomer ? null : customer);
    };

    const handleDateRangeChange = (range) => {
        setDateRange({
            from: range?.from ? new Date(range.from) : undefined,
            to: range?.to ? new Date(range.to) : undefined
        });
    };

    const handleCopyTOClipboard = (text) => {
        if (!text) return;
        // console.log('text', text);
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: t('NumberCopied'),
                description: `${t('TheNumber')} ${text} ${t('hasBeenCopied')}`,
                duration: 2000,
                variant: "success",
            });
        }).catch((err) => {
            console.error('Error copying text: ', err);
        });
    }

    const isFilterActive = useMemo(() => {
        return (
            (searchQuery !== '' && searchQuery !== undefined) ||
            (statusFilter !== 'all') ||
            (dateRange.from !== undefined && dateRange.to !== undefined) ||
            (selectedCustomer !== null) ||
            (serviceTypeFilter !== '0')
        );
    }, [searchQuery, statusFilter, dateRange, selectedCustomer, serviceTypeFilter]);

    const clearFilter = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setDateRange({ from: undefined, to: undefined });
        setSelectedCustomer(null);
        setServiceTypeFilter('0');
        setIsOpen(false);
        setCurrentStep(0);
    }

    const startTour = () => {
        setCurrentStep(0);
        setSteps(steps);
        setIsOpen(true);
    };

    return (
        <div className="h-[calc(100dvh-85px)] bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 "> */}
                        <div className="md:col-span-2">
                            <div className="flex flex-col md:flex-row justify-between gap-2">
                                {/* <Tooltip delayDuration={0}> */}
                                {/* <TooltipTrigger asChild> */}
                                <div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
                                    <h1
                                        className="text-3xl font-bold text-gray-900 dark:text-white truncate"
                                    // onClick={() => handleModuleClick("0")}
                                    >
                                        {t('MyServices')}
                                    </h1>
                                    {isFilterActive && (
                                        <div className="mt-2 flex items-center gap-2 hover:cursor-pointer clean-filter">
                                            <Badge
                                                onClick={clearFilter}
                                                className="bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800 hover:text-white clean-filter">
                                                <CalendarIcon className="w-3 h-3 mr-1" />
                                                {t('ActiveFilter')}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                                {/* </TooltipTrigger>
                                <TooltipContent side="top" align="">
                                    <p>{t('ClearFilters')}</p>
                                </TooltipContent>
                            </Tooltip> */}
                                <div className="flex gap-2">
                                    <Button
                                        onClick={startTour}
                                        variant="gradientGlow"
                                        className="hidden sm:flex"
                                    >
                                        {/* Iniciar Tour */}
                                        {t('StartTour')}
                                    </Button>
                                    <div className="calendar-filter">
                                        <CalendarRange
                                            date={dateRange}
                                            setDate={handleDateRangeChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="status-filter">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectItem value="all">Todos los estados</SelectItem> */}
                                        <SelectItem value="all">{t('AllStatuses')}</SelectItem>
                                        {statusOptionsMapping.map((status) => (
                                            <SelectItem key={status.id} value={status.id.toString()}>
                                                {/* {status.name} */}
                                                {t(status.name)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="service-type-filter">
                                <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tipo de servicio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* {serviceTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>
                                            {type.name}
                                        </SelectItem>
                                    ))} */}
                                        {serviceTypes.map((type) => (
                                            <SelectItem key={type.id} value={type.id}>
                                                {t(type.name)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-4 resumen-header">
                {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"> */}
                <div className="">
                    <div className={`${userInfo?.Administrator ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white dark:bg-gray-800 shadow rounded-lg p-4`}>
                        {/* Si no hay avisos */}
                        {
                            notices.length === 0 ? (
                                // <div className="flex flex-col items-center justify-center h-full">
                                //     <p className="text-gray-500 dark:text-gray-400">No hay avisos disponibles.</p>
                                // </div>
                                <div className="border border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-6 rounded-lg shadow-sm">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800/30">
                                                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-amber-800 dark:text-amber-300">{t('NoNoticesAvailable')}</p>
                                                <p className="text-sm text-amber-700/80 dark:text-amber-400/80 mt-1">
                                                    {t('CreateNewServiceRequest')}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/asistencia"
                                            className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-200 hover:bg-amber-300 dark:bg-amber-700 dark:hover:bg-amber-600 text-amber-800 dark:text-amber-100 transition-colors font-medium"
                                        >
                                            <Plus className="h-4 w-4" />
                                            {t('RequestAssistance')}
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">
                                            {selectedCustomer
                                                ? `Avisos de ${selectedCustomer.Name} ${selectedCustomer.Surname}`
                                                : selectedModule === "0"
                                                    ? 'Todos los Avisos'
                                                    : modules.find(module => module.statusId === selectedModule)?.title}
                                        </h2>
                                        <div className="flex flex-col sm:flex-row gap-2 customer-name-filter">
                                            <div className="relative">
                                                <Input
                                                    placeholder="Buscar por nombre o teléfono..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="pl-6"
                                                />
                                                <Search size={14} className="absolute left-2 top-3.5 text-gray-400" />
                                            </div>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={open}
                                                        className="w-[200px] justify-between"
                                                    >
                                                        {selectedCustomer
                                                            ? `${selectedCustomer.Name} ${selectedCustomer.Surname}` : "Seleccionar cliente"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-72 p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Buscar cliente..." />
                                                        <CommandList>
                                                            {/* <CommandEmpty>No customer found.</CommandEmpty> */}
                                                            <CommandEmpty>
                                                                {t('NoCustomerFound')}
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {filteredCustomers.map((customer) => (
                                                                    <CommandItem
                                                                        key={customer.CustomerID}
                                                                        onSelect={() => handleCustomerClick(customer)}
                                                                        className={`p-4 rounded-lg cursor-pointer transition-colors mb-2 ${selectedCustomer?.CustomerID === customer.CustomerID
                                                                            ? 'bg-blue-50 dark:bg-blue-900'
                                                                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                                                                            }`}
                                                                    >
                                                                        <div className="w-full">
                                                                            <div className="flex justify-between gap-2 mb-1">
                                                                                <p className="font-semibold"
                                                                                >{customer.Name} {customer.Surname}</p>
                                                                                <p className="text-sm text-gray-600 dark:text-gray-300 items-end cursor-pointer"
                                                                                    onClick={
                                                                                        (e) => {
                                                                                            e.stopPropagation(); // Evitar que se cierre el popover
                                                                                            handleCopyTOClipboard(customer.Phone || customer.Cell);
                                                                                        }

                                                                                    }
                                                                                >{customer.Phone || customer.Cell}</p>
                                                                            </div>
                                                                            <p className="text-sm text-gray-600 dark:text-gray-300">{customer.Email}</p>
                                                                        </div>
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                    </div>
                                    {
                                        // Si no hay avisos filtrados
                                        filteredNotices.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    {t('NoNoticesFound')}
                                                </p>
                                                {/* <p className="text-gray-500 dark:text-gray-400">No hay avisos de {
                                                    selectedCustomer
                                                        ? `${selectedCustomer.Name} ${selectedCustomer.Surname}`
                                                        : selectedModule === "0"
                                                            ? 'Todos los Avisos'
                                                            : modules.find(module => module.statusId === selectedModule)?.title
                                                }</p> */}

                                            </div>
                                        ) : (
                                            <ScrollArea className="h-[600px]">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Fecha</TableHead>
                                                            <TableHead>Cliente</TableHead>
                                                            <TableHead>Aparato</TableHead>
                                                            <TableHead>Estado</TableHead>
                                                            <TableHead>Observaciones</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {filteredNotices.map((notice) => (
                                                            <TableRow key={notice.NoticeHeaderID}>
                                                                <TableCell>
                                                                    {format(notice.CreateDate, { date: "medium" })}
                                                                </TableCell>
                                                                <TableCell
                                                                    className="cursor-pointer"
                                                                    onClick={
                                                                        (e) => {
                                                                            e.stopPropagation(); // Evitar que se cierre el popover
                                                                            handleCopyTOClipboard(notice.CustomerPhone || notice.CustomerCell);
                                                                        }

                                                                    }
                                                                >
                                                                    <div>
                                                                        <p className="font-medium">
                                                                            {notice.CustomerName} {notice.CustomerSurname}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500">
                                                                            {notice.CustomerPhone || notice.CustomerCell}
                                                                        </p>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {notice.ApparatusName || '-'}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Badge variant={getStatusBadgeVariant(notice.StatusID.toString())}>
                                                                        {/* {getStatusName(notice.StatusID.toString())} */}
                                                                        {notice.StatusName || getStatusName(notice.StatusID.toString())}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell className="max-w-xs truncate">
                                                                    {notice.Observation || '-'}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </ScrollArea>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
}