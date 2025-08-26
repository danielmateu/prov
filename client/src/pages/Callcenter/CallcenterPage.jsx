import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Headset,
    Users,
    Phone,
    MessageSquare,
    Clock,
    CheckCircle,
    AlertCircle,
    Search,
    Filter,
    UserPlus,
    Building2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserInfoStore } from '@/zustand/userInfoStore';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import ClaimRequestForm from '@/components/ClaimRequestForm/ClaimRequestForm';
import ContabilidadForm from '@/components/ContabilidadForm/ContabilidadForm';
import ConsultationForm from '@/components/ConsultationForm/ConsultationForm';

const apiURL = import.meta.env.VITE_API_URL;

export default function CallcenterPage() {
    const { t } = useTranslation();
    const { userInfo } = useUserInfoStore();
    const { checkPermission } = useUserPermissions();
    
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [customers, setCustomers] = useState([]);
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = 'Rapitecnic | Panel Callcenter';
        fetchCallcenterData();
    }, []);

    const fetchCallcenterData = async () => {
        setIsLoading(true);
        try {
            // Obtener todos los clientes (solo callcenter puede ver todos)
            const customersResponse = await fetch(`${apiURL}/noticeController/getAllCustomers`);
            if (customersResponse.ok) {
                const customersData = await customersResponse.json();
                setCustomers(customersData);
            }

            // Obtener todos los avisos
            const noticesResponse = await fetch(`${apiURL}/noticeController/getAllNotices`);
            if (noticesResponse.ok) {
                const noticesData = await noticesResponse.json();
                setNotices(noticesData.data || []);
            }
        } catch (error) {
            console.error('Error fetching callcenter data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClaimSubmit = async (claimData) => {
        try {
            const response = await fetch(`${apiURL}/noticeController/submitCallcenterClaim`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...claimData,
                    callcenterUser: userInfo?.Name + ' ' + userInfo?.Surname,
                    callcenterUserID: userInfo?.ExternalLoginID
                })
            });

            if (!response.ok) {
                throw new Error('Error al enviar la reclamación');
            }

            console.log('Reclamación enviada exitosamente');
        } catch (error) {
            console.error('Error submitting claim:', error);
            throw error;
        }
    };

    const handleAccountingSubmit = async (accountingData) => {
        try {
            const response = await fetch(`${apiURL}/noticeController/submitCallcenterAccounting`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...accountingData,
                    callcenterUser: userInfo?.Name + ' ' + userInfo?.Surname,
                    callcenterUserID: userInfo?.ExternalLoginID
                })
            });

            if (!response.ok) {
                throw new Error('Error al enviar la solicitud contable');
            }

            console.log('Solicitud contable enviada exitosamente');
        } catch (error) {
            console.error('Error submitting accounting request:', error);
            throw error;
        }
    };

    const handleConsultationSubmit = async (consultationData) => {
        try {
            const response = await fetch(`${apiURL}/noticeController/submitCallcenterConsultation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...consultationData,
                    callcenterUser: userInfo?.Name + ' ' + userInfo?.Surname,
                    callcenterUserID: userInfo?.ExternalLoginID
                })
            });

            if (!response.ok) {
                throw new Error('Error al enviar la consulta');
            }

            console.log('Consulta enviada exitosamente');
        } catch (error) {
            console.error('Error submitting consultation:', error);
            throw error;
        }
    };

    const stats = {
        totalCustomers: customers.length,
        totalNotices: notices.length,
        pendingCalls: notices.filter(n => n.StatusID === 1).length,
        resolvedToday: notices.filter(n => {
            const today = new Date().toDateString();
            const noticeDate = new Date(n.CreateDate).toDateString();
            return noticeDate === today && n.StatusID === 27;
        }).length
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Headset className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Panel Callcenter
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Gestión centralizada de clientes y servicios
                                </p>
                            </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Usuario Callcenter
                        </Badge>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-gray-100 dark:bg-gray-700 p-1">
                        <TabsTrigger value="dashboard">
                            <Headset className="h-4 w-4 mr-2" />
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="reclamaciones">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Reclamaciones
                        </TabsTrigger>
                        <TabsTrigger value="contabilidad">
                            <Building2 className="h-4 w-4 mr-2" />
                            Contabilidad
                        </TabsTrigger>
                        <TabsTrigger value="consultas">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Consultas
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                                    <p className="text-xs text-muted-foreground">
                                        En toda la plataforma
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Avisos</CardTitle>
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.totalNotices}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Todos los servicios
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Llamadas Pendientes</CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.pendingCalls}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Por contactar
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Resueltos Hoy</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.resolvedToday}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Finalizados hoy
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Información del Usuario Callcenter</CardTitle>
                                <CardDescription>
                                    Permisos y capacidades especiales del usuario de callcenter
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Permisos Especiales:</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                Ver todos los clientes del sistema
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                Modificar datos de clientes
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                Gestionar reclamaciones
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                Acceso a contabilidad
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Restricciones:</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li className="flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4 text-red-500" />
                                                No puede crear nuevos usuarios
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4 text-red-500" />
                                                No puede acceder a facturación
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4 text-red-500" />
                                                No puede gestionar datos fiscales
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reclamaciones">
                        <ClaimRequestForm 
                            onSubmit={handleClaimSubmit}
                            apiURL={`${apiURL}/noticeController/getDataCustomer`}
                        />
                    </TabsContent>

                    <TabsContent value="contabilidad">
                        <ContabilidadForm 
                            onSubmit={handleAccountingSubmit}
                            apiURL={`${apiURL}/noticeController/getDataCustomer`}
                        />
                    </TabsContent>

                    <TabsContent value="consultas">
                        <ConsultationForm 
                            onSubmit={handleConsultationSubmit}
                            apiURL={`${apiURL}/noticeController/getDataCustomer`}
                        />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}