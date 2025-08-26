import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, getServiceTypeName, getStatusColor, getStatusName } from "@/lib/utils";
import { Eye, Edit, MoreHorizontal, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NoticesTable({ notices, title = "Avisos" }) {
    const [searchTerm, setSearchTerm] = useState("");
    console.log('notices', notices);

    // Filter notices based on search term
    const filteredNotices = notices.filter(notice => {
        const searchFields = [
            notice.customerName,
            notice.customerEmail,
            notice.customerPhone,
            notice.customerAddress,
            notice.externalNoticeId,
        ].map(field => (field || "").toLowerCase());

        return searchFields.some(field => field.includes(searchTerm.toLowerCase()));
    });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar aviso..."
                        className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Importe</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredNotices.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                                        {notices.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center p-4">
                                                <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                                                <p>No hay avisos disponibles</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-4">
                                                <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                                                <p>No se encontraron avisos que coincidan con la búsqueda</p>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredNotices.map((notice) => (
                                    <TableRow key={notice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <TableCell>
                                            <div className="font-medium">{notice.externalNoticeId}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{notice.customerName}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{notice.customerPhone}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                                {getServiceTypeName(notice.serviceTypeId)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                                <span>{formatDate(notice.createDate)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(notice.statusId)}>
                                                {getStatusName(notice.statusId)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">
                                                {notice.totalPrice !== undefined ? formatCurrency(notice.totalPrice) : "-"}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                    <Eye size={16} className="text-blue-600 dark:text-blue-400" />
                                                    <span className="sr-only">Ver detalles</span>
                                                </Button>
                                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                    <Edit size={16} className="text-amber-600 dark:text-amber-400" />
                                                    <span className="sr-only">Editar</span>
                                                </Button>
                                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                    <MoreHorizontal size={16} />
                                                    <span className="sr-only">Más opciones</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}