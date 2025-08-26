import { Send, Search, Loader2, Wrench, Info, Shield, ShieldOff, Calendar, Clock, WrenchIcon, ShieldCheck, ArrowUpCircle, LucideWrench } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from 'react';
import { formSchema } from './types';
import { ApparatusFetch, BrandsFetch, TypesFetch, searchModelo } from './api';
import { useKeyboardSelect } from '@/hooks/use-keyboard-select';
import { cn } from '@/lib/utils';
import { useZipCodeValidation } from '@/hooks/use-zipcode-validation';
import { useUserInfoStore } from '@/zustand/userInfoStore';
// import { useFormStore } from '@/stores/useFormStore';

import satData from "@/lib/satData";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useTour } from '@reactour/tour';
import { useNavigate } from 'react-router-dom';
import { AspectRatio } from '../ui/aspect-ratio';
import { useFormStore } from '@/zustand/useFormStore';
import ClaimRequestForm from '../ClaimRequestForm/ClaimRequestForm';
import ContabilidadForm from '../ContabilidadForm/ContabilidadForm';
import ConsultationForm from '../ConsultationForm/ConsultationForm';

const apiURL = import.meta.env.VITE_API_URL;
const apparatusLabelUrl = import.meta.env.VITE_MTS_APPARATUS_LABEL_URL

export function ServiceForm({
    onSubmit,
    submitButtonText = "Validar",
    isWarrantyForm = false,
    serviceType,
    location,
    loading
}) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        setError,
        clearErrors,
        reset
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            enGarantia: isWarrantyForm,
            comentarioAveria: '',
            comentario: '',
            servicetypeid: serviceType, // Default to reparación
        },
    });

    const { t } = useTranslation();
    const { isValidating, validatePostalCode, population } = useZipCodeValidation(setError, clearErrors);
    const { formData, saveFormData, getFormData, clearFormData, updateField } = useFormStore();

    const userInfo = useUserInfoStore((state) => state.userInfo);
    const navigate = useNavigate()
    const { isOpen, setIsOpen, setCurrentStep } = useTour()

    // Step display states
    const [showWarrantyQuestion, setShowWarrantyQuestion] = useState(true);
    // console.log('Show Warranty Question:', showWarrantyQuestion);
    const [showBrandSelector, setShowBrandSelector] = useState(false);
    const [showMainForm, setShowMainForm] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBrands, setFilteredBrands] = useState(satData || []);
    const [showScrollButton, setShowScrollButton] = useState(false);

    setValue('externalLoginID', userInfo?.ExternalLoginID || '');
    setValue('externalInvoicingAddressID', userInfo?.Ex_InvoicingAddressID || '');

    const selectedAparatoId = watch('aparatoId');
    const comentarioAveria = watch('comentarioAveria') || '';
    const comentario = watch('comentario') || '';
    const enGarantia = watch('enGarantia');

    const [aparatoSuggestions, setAparatoSuggestions] = useState([]);
    const [marcaSuggestions, setMarcaSuggestions] = useState([]);
    // console.log('Marca Suggestions', marcaSuggestions);
    const [modeloSuggestions, setModeloSuggestions] = useState([]);
    const [tipoOptions, setTipoOptions] = useState([]);
    const [allAparatos, setAllAparatos] = useState([]);
    const [allMarcas, setAllMarcas] = useState([]);

    // console.log('All Marcas', allMarcas);
    const [showAparatoSuggestions, setShowAparatoSuggestions] = useState(false);
    const [showMarcaSuggestions, setShowMarcaSuggestions] = useState(false);
    const [showModeloSuggestions, setShowModeloSuggestions] = useState(false);
    const [isLoadingModelo, setIsLoadingModelo] = useState(false);
    const [isLoadingTipos, setIsLoadingTipos] = useState(false);

    const [etiquetaMarcaUrl, setEtiquetaMarcaUrl] = useState('');
    // console.log('etiquetaMarcaUrl', etiquetaMarcaUrl);
    const marca = watch('marca') || '';
    const [etiquetaAparatoUrl, setEtiquetaAparatoUrl] = useState('');
    const aparato = watch('aparato') || '';

    const [showInfoAparato, setShowInfoAparato] = useState(false);
    const [showInfoMarca, setShowInfoMarca] = useState(false);

    const [customerID, setCustomerID] = useState(null);

    useEffect(() => {
        // Resetear los estados de UI solo cuando se carga el componente con serviceType=4
        if (serviceType === 4) {
            // Resetear el estado para forzar la pregunta de garantía
            const urlParams = new URLSearchParams(window.location.search);
            const resetView = urlParams.get('reset') === 'true';

            if (resetView || !formData.hasBeenSubmitted) {
                setShowWarrantyQuestion(true);
                setShowBrandSelector(false);
                setShowMainForm(false);
                setSelectedBrand(null);

                // Opcional: Limpiar datos específicos del formulario relacionados con la vista
                setValue('enGarantia', undefined);
                saveFormData({
                    enGarantia: undefined,
                    selectedBrand: null,
                    hasBeenSubmitted: false
                });
            }
        }
    }, [serviceType, setValue, saveFormData]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Load saved form data on component mount
    useEffect(() => {
        const savedData = getFormData();
        if (savedData && Object.keys(savedData).length > 0) {
            // Restore form values
            Object.keys(savedData).forEach(key => {
                if (savedData[key] !== undefined && savedData[key] !== null) {
                    setValue(key, savedData[key]);
                }
            });

            // Restore component states based on saved data
            if (savedData.enGarantia !== undefined) {
                if (savedData.enGarantia) {
                    setShowWarrantyQuestion(false);
                    setShowMainForm(true);
                } else {
                    setShowWarrantyQuestion(false);
                    setShowBrandSelector(true);
                }
            }

            // Restore selected brand if exists
            if (savedData.selectedBrand) {
                setSelectedBrand(savedData.selectedBrand);
                setShowBrandSelector(false);
                setShowMainForm(true);
            }
        }
    }, [setValue, getFormData]);

    // Save form data whenever form values change
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change' && name) {
                updateField(name, value[name]);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, updateField]);

    // Update filtered brands when search term changes
    useEffect(() => {
        if (satData) {
            setFilteredBrands(
                satData.filter(brand =>
                    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm]);

    const handleWarrantySelection = (isWarranty) => {
        setValue('enGarantia', isWarranty);
        saveFormData({ enGarantia: isWarranty });
        setShowWarrantyQuestion(false);
        // setCurrentStep(3);

        if (isWarranty) {
            // If under warranty, show the main form directly
            setShowMainForm(true);
            setCurrentStep(3);
        } else {
            // If not under warranty, show the brand selector
            setShowBrandSelector(true);
            setCurrentStep(13);
        }
    };

    const handleSelectBrand = (brand) => {
        setSelectedBrand(brand);
        setValue('marca', brand.name);
        saveFormData({
            selectedBrand: brand,
            marca: brand.name
        });

        // When a brand is selected, show the main form
        setShowBrandSelector(false);
        setShowMainForm(true);
        setIsOpen(false);
        setCurrentStep(0);
    };

    const handleBackToBrands = () => {
        setSelectedBrand(null);
        saveFormData({ selectedBrand: null });
        setShowBrandSelector(true);
        setShowMainForm(false);
    };

    const { selectedIndex: aparatoSelectedIndex, handleKeyDown: handleAparatoKeyDown } = useKeyboardSelect({
        suggestions: aparatoSuggestions,
        onSelect: (suggestion) => {
            setValue('aparato', suggestion.Name);
            setValue('aparatoId', suggestion.ID);
            setShowAparatoSuggestions(false);

            setEtiquetaAparatoUrl(`${apparatusLabelUrl}/${suggestion.Name}.png`);
        },
        isOpen: showAparatoSuggestions,
        setIsOpen: setShowAparatoSuggestions
    });

    const { selectedIndex: marcaSelectedIndex, handleKeyDown: handleMarcaKeyDown } = useKeyboardSelect({
        suggestions: marcaSuggestions,
        onSelect: (suggestion) => {
            setValue('marca', suggestion.Name);
            setValue('marcaId', suggestion.ID);
            setShowMarcaSuggestions(false);

            setEtiquetaMarcaUrl(`${apparatusLabelUrl}/${suggestion.Name}.png`);
        },
        isOpen: showMarcaSuggestions,
        setIsOpen: setShowMarcaSuggestions
    });

    const { selectedIndex: modeloSelectedIndex, handleKeyDown: handleModeloKeyDown } = useKeyboardSelect({
        suggestions: modeloSuggestions,
        onSelect: (suggestion) => {
            // console.log('suggestion', suggestion);
            setValue('modelo', suggestion.Name || suggestion.Type);
            setValue('modeloId', suggestion.Geraeteid);
            setShowModeloSuggestions(false);
        },
        isOpen: showModeloSuggestions,
        setIsOpen: setShowModeloSuggestions
    });

    let zipCodeTimeout;
    const handleZipCodeChange = (value) => {
        clearTimeout(zipCodeTimeout);
        zipCodeTimeout = setTimeout(() => {
            validatePostalCode(value);
        }, 500);
    };

    const fetchCustomerData = async (phoneNumber) => {
        try {
            const response = await fetch(`${apiURL}/noticeController/getDataCustomer?cell=${phoneNumber}`);
            if (!response.ok) throw new Error('Error fetching customer data');

            const data = await response.json();
            console.log('data', data);
            setCustomerID(data.dataCustomer?.CustomerID || null);

            // Si data es un objeto vacío, usaremos los datos que añadimos en el formulario
            if (Object.keys(data).length === 0) {
                setValue('nombre', '');
                setValue('apellido', '');
                setValue('segundoApellido', '');
                setValue('email', '');
                setValue('pisoPuerta', '');
                setValue('direccion', '');
                setValue('telefono', phoneNumber); // Set the phone number directly
                setValue('cp', '');
                setValue('poblacion', '');
            }

            if (data.dataCustomer) {
                // Populate form fields with customer data
                setValue('nombre', data.dataCustomer.Name || '');
                setValue('apellido', data.dataCustomer.Surname || '');
                setValue('segundoApellido', data.dataCustomer.SecondSurname || '');
                setValue('email', data.dataCustomer.Email || '');
                setValue('pisoPuerta', data.dataCustomer.AddressNext || '');
                setValue('direccion', data.dataCustomer.Address || '');
                // ZipCode
                setValue('cp', data.dataCustomer.ZipCode || '');
                setValue('poblacion', data.dataCustomer.City || '');
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    // Add phone number change handler
    const handlePhoneChange = (e) => {
        const phoneNumber = e.target.value;

        // Si el teléfono está vacío, resetear todos los campos del cliente
        if (!phoneNumber || phoneNumber.length === 0) {
            setValue('nombre', '');
            setValue('apellido', '');
            setValue('segundoApellido', '');
            setValue('email', '');
            setValue('pisoPuerta', '');
            setValue('direccion', '');
            setValue('cp', '');
            setValue('poblacion', '');
            setValue('provincia', '');
            return;
        }

        // Si hay al menos 9 dígitos, buscar datos del cliente
        if (phoneNumber.length >= 9) {
            fetchCustomerData(phoneNumber);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [aparatosData, marcasData] = await Promise.all([
                    ApparatusFetch(),
                    BrandsFetch()
                ]);
                setAllAparatos(aparatosData);
                setAllMarcas(marcasData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchTipos = async () => {
            if (selectedAparatoId) {
                setIsLoadingTipos(true);
                try {
                    const tipos = await TypesFetch(selectedAparatoId);
                    setTipoOptions(tipos);
                    setValue('tipo', '');
                    setValue('tipoId', undefined);
                } catch (error) {
                    console.error('Error fetching tipos:', error);
                    setTipoOptions([]);
                } finally {
                    setIsLoadingTipos(false);
                }
            } else {
                setTipoOptions([]);
            }
        };

        fetchTipos();
    }, [selectedAparatoId, setValue]);

    useEffect(() => {
        if (population) {
            setValue('poblacion', population.Population);
            setValue('provincia', population.Province);
            setValue('cp', population.ZipCode);
            setValue('lat', population.Latitude || '');
            setValue('lng', population.Longitude || '');;
        }
        setValue('ex_cell', userInfo.Cell || '');
    }, [population, setValue]);

    useEffect(() => {
        if (etiquetaMarcaUrl && marca.length > 0) {
            setShowInfoMarca(true);
        }
        else {
            setShowInfoMarca(false);
        }
    }, [etiquetaMarcaUrl, marca]);

    useEffect(() => {
        if (etiquetaAparatoUrl && aparato.length > 0) {
            setShowInfoAparato(true);
        } else {
            setShowInfoAparato(false);
        }
    }, [etiquetaAparatoUrl, aparato]);

    // Cambiar titulo en fincion de la ruta
    // const location = useLocation();
    useEffect(() => {
        if (location === '/asistencia/reparacion') {
            setValue('servicetypeid', serviceType);
        }
        if (location === '/asistencia/instalacion') {
            setValue('servicetypeid', serviceType);
        }
        if (location === '/asistencia/venta') {
            setValue('servicetypeid', serviceType);
        }
        if (location === '/asistencia/garantia') {
            setValue('servicetypeid', serviceType);
        }
    }, [setValue]);

    const handleAparatoSearch = (value) => {
        setValue('aparato', value);
        if (value.length > 0) {
            const filtered = allAparatos.filter(item =>
                item.Name.toLowerCase().includes(value.toLowerCase())
            );
            setAparatoSuggestions(filtered);
            setShowAparatoSuggestions(true);
        } else {
            setAparatoSuggestions([]);
            setShowAparatoSuggestions(false);
        }
    };

    const handleMarcaSearch = (value) => {
        setValue('marca', value);
        if (value.length > 0) {
            const filtered = allMarcas.filter(item =>
                item.Name.toLowerCase().includes(value.toLowerCase())
            );
            setMarcaSuggestions(filtered);
            setShowMarcaSuggestions(true);
        } else {
            setMarcaSuggestions([]);
            setShowMarcaSuggestions(false);
        }
    };

    // Add a new function to handle image loading errors
    const handleImageError = (e) => {
        e.target.onerror = null; // Prevents infinite loop
        e.target.src = '/IMAGEN-NO-DISPONIBLE.webp'; // Fallback image
        console.warn('Failed to load brand logo:', e.target.src);
    };


    const handleModeloSearch = async (keywords) => {
        setValue('modelo', keywords);
        setIsLoadingModelo(true);

        try {
            const results = await searchModelo(keywords);
            console.log('Modelo search results:', results);
            setModeloSuggestions(results);
            setShowModeloSuggestions(results.length > 0);
        } catch (err) {
            console.error('Search error:', err);
            setModeloSuggestions([]);
            setShowModeloSuggestions(false);
        } finally {
            setIsLoadingModelo(false);
        }
    };

    const handleClickOutside = () => {
        setTimeout(() => {
            setShowAparatoSuggestions(false);
            setShowMarcaSuggestions(false);
            setShowModeloSuggestions(false);
        }, 200);
    };

    // Enhanced form submission handler
    const handleFormSubmit = async (data, e) => {
        try {
            await onSubmit(data, e);
            // Clear form data after successful submission
            clearFormData();
            reset();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    const handleClaimSubmit = async (claimData) => {
        // console.log('Claim submitted:', claimData);
        try {
            // await onSubmit(claimData);
            await onSubmit(claimData, null);
        } catch (error) {
            console.error('Claim submission error:', error);
        }
        // Here you would typically send the data to your backend
        // Example: await submitClaim(claimData);
        // alert('Reclamación enviada exitosamente');
    };

    const handleContabilidadSubmit = async (contabilidadData) => {
        try {
            await onSubmit(contabilidadData, null);
        } catch (error) {
            console.error('Contabilidad submission error:', error);
        }
    };

    const handleConsultationSubmit = async (consultationData) => {
        try {
            await onSubmit(consultationData, null);
        } catch (error) {
            console.error('Consultation submission error:', error);
        }
    };

    // Si es una instalación
    if (serviceType === 4) {
        return (
            <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white dark:bg-slate-800 pt-4 p-8 rounded-lg shadow-sm border border-gray-200 transition-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                        {serviceType === 1 ? t('RepairServiceRequest') :
                            serviceType === 4 ? t('InstallationServiceRequest') :
                                serviceType === 2 ? t('SaleServiceRequest') :
                                    serviceType === 3 ? t('WarrantyServiceRequest') : t('AssistanceRequest')
                        }
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sección Dirección asistencia */}
                    <div className="space-y-6 service-address">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-300">{t('ServiceAddress')}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2 customer-phone">
                                <Label htmlFor="telefono" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('Phone')}</Label>
                                <Input
                                    id="telefono"
                                    type="tel"
                                    placeholder="600 123 456"
                                    {...register('telefono')}
                                    onChange={(e) => {
                                        register('telefono').onChange(e);
                                        handlePhoneChange(e);
                                    }}
                                    className={`border-gray-300 ${errors.telefono ? 'border-red-500' : ''}`}
                                    autoComplete="off"
                                />
                                {errors.telefono && (
                                    <p className="text-sm text-red-500">{errors.telefono.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nombre" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('Name')}</Label>
                                <Input
                                    id="nombre"
                                    {...register('nombre')}
                                    className={`border-gray-300 ${errors.nombre ? 'border-red-500' : ''}`}
                                    placeholder="Juan"
                                    autoComplete="off"
                                />
                                {errors.nombre && (
                                    <p className="text-sm text-red-500">{errors.nombre.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="apellido" className="text-gray-700 dark:text-slate-400">
                                    {/* <span className='text-red-500'>*</span> */}
                                    {t('Surname')}</Label>
                                <Input
                                    id="apellido"
                                    {...register('apellido')}
                                    className={`border-gray-300 ${errors.apellido ? 'border-red-500' : ''}`}
                                    placeholder="Pérez"
                                    autoComplete="off"
                                />
                                {errors.apellido && (
                                    <p className="text-sm text-red-500">{errors.apellido.message}</p>
                                )}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="segundoApellido" className="text-gray-700 dark:text-slate-400">{t('SecondSurname')}</Label>
                                <Input
                                    id="segundoApellido"
                                    {...register('segundoApellido')}
                                    className={`border-gray-300 ${errors.segundoApellido ? 'border-red-500' : ''}`}
                                    placeholder="García"
                                    autoComplete="off"
                                />
                                {errors.segundoApellido && (
                                    <p className="text-sm text-red-500">{errors.segundoApellido.message}</p>
                                )}
                            </div>


                            <div className="space-y-2">
                                <div className="flex"></div>
                                <Label htmlFor="direccion" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('Address')}</Label>
                                <Input
                                    id="direccion"
                                    {...register('direccion')}
                                    placeholder="C/Muntaner, 25"
                                    className={`border-gray-300 ${errors.direccion ? 'border-red-500' : ''}`}
                                    autoComplete="off"
                                />
                                {errors.direccion && (
                                    <p className="text-sm text-red-500">{errors.direccion.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <div className="flex"></div>
                                <Label htmlFor="pisoPuerta" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('FloorDoor')}</Label>
                                <Input
                                    id="pisoPuerta"
                                    {...register('pisoPuerta')}
                                    placeholder="4º 2ª"
                                    className={`border-gray-300 ${errors.pisoPuerta ? 'border-red-500' : ''}`}
                                    autoComplete="off"
                                />
                                {errors.pisoPuerta && (
                                    <p className="text-sm text-red-500">{errors.pisoPuerta.message}</p>
                                )}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className="space-y-2">
                                <Label htmlFor="cp" className="text-gray-700 dark:text-slate-400 truncate"><span className='text-red-500'>*</span> {t('ZipCode')}</Label>
                                <div className="relative">
                                    <Input
                                        id="cp"
                                        {...register('cp', {
                                            onChange: (e) => handleZipCodeChange(e.target.value)
                                        })}
                                        placeholder="08001"
                                        className={`border-gray-300 ${errors.cp ? 'border-red-500' : ''}`}
                                        autoComplete="off"
                                    />
                                    {isValidating && (
                                        <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                                    )}
                                </div>
                                {errors.cp && (
                                    <p className="text-sm text-red-500">{errors.cp.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="poblacion" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('City')}</Label>
                                <div className="relative">
                                    <Input
                                        id="poblacion"
                                        {...register('poblacion', {
                                            onChange: (e) => handleZipCodeChange(e.target.value)
                                        })}
                                        placeholder="Barcelona"
                                        className={`border-gray-300 ${errors.poblacion ? 'border-red-500' : ''}`}
                                        autoComplete="off"
                                    />
                                    {isValidating && (
                                        <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                                    )}
                                </div>
                                {errors.poblacion && (
                                    <p className="text-sm text-red-500">{errors.poblacion.message}</p>
                                )}
                            </div>
                            <div className="space-y-2 hidden">
                                <Label htmlFor="provincia" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>* </span>
                                    {t('Province')}
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="provincia"
                                        {...register('provincia', {
                                            onChange: (e) => handleZipCodeChange(e.target.value)
                                        })}
                                        placeholder="Barcelona"
                                        className={`border-gray-300 ${errors.provincia ? 'border-red-500' : ''}`}
                                        autoComplete="off"
                                    />
                                    {isValidating && (
                                        <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                                    )}
                                </div>
                                {errors.provincia && (
                                    <p className="text-sm text-red-500">{errors.provincia.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 dark:text-slate-400 truncate">{t('Email')}</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        {...register('email', {
                                            onChange: (e) => handleZipCodeChange(e.target.value)
                                        })}
                                        placeholder="juan@gmail.com"
                                        className={`border-gray-300 ${errors.email ? 'border-red-500' : ''}`}
                                        autoComplete="off"
                                    />
                                    {isValidating && (
                                        <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                                    )}
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 equipment-data">
                        <div className="flex justify-between h-0 pb-7">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-300">{t('EquipmentData')}</h3>
                        </div>

                        <div className={cn("space-y-2 relative brand-selector", !showInfoMarca ? "pt-[10px]" : "pt-[6px]")}>
                            <div className="flex gap-2 items-center ">
                                <Label htmlFor="marca" className="text-gray-700 dark:text-slate-400 flex gap-2 items-center "><span className='text-red-500'>*</span> {t('Brand')}</Label>
                                <Dialog>
                                    {
                                        showInfoMarca && (
                                            <DialogTrigger asChild>
                                                <Info size={18}
                                                    className='hover:cursor-pointer'
                                                />
                                            </DialogTrigger>
                                        )
                                    }
                                    <DialogContent className="max-w-[425px] overflow-y-auto gap-10 h-[65vh]">
                                        <DialogHeader className={"mb-52"}>
                                            <DialogTitle>{t('BrandInfo')}</DialogTitle>
                                            <DialogDescription>{t('BrandInfoDesc')}</DialogDescription>
                                            {/* <picture> */}
                                            {/* </picture> */}
                                            <AspectRatio ratio={16 / 9}>
                                                <picture>
                                                    <img
                                                        src={etiquetaMarcaUrl}
                                                        alt="Etiqueta de marca"
                                                        className="w-full h-auto object-contain rounded-xl"
                                                        onError={(e) => {
                                                            e.target.onerror = null; // Prevents infinite loop
                                                            e.target.src = '/IMAGEN-NO-DISPONIBLE.webp'; // Placeholder image
                                                        }}
                                                    />
                                                </picture>
                                            </AspectRatio>
                                        </DialogHeader>

                                        {/* <DialogFooter
                                            className={"text-sm text-gray-500"}>
                                        </DialogFooter> */}
                                        <p className="text-sm text-gray-500 mt-2">
                                            {t('ContactSupport')}
                                        </p>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="relative">
                                <Input
                                    id="marca"
                                    placeholder="Samsung, LG, etc."
                                    {...register('marca')}
                                    onChange={(e) => handleMarcaSearch(e.target.value)}
                                    onKeyDown={handleMarcaKeyDown}
                                    onBlur={handleClickOutside}
                                    className="border-gray-300"
                                    autoComplete="off"
                                    readOnly={selectedBrand !== null}
                                />
                                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {showMarcaSuggestions && marcaSuggestions.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto shadow-lg dark:bg-slate-800">
                                    {marcaSuggestions.map((suggestion, index) => (
                                        <li
                                            key={suggestion.ID}
                                            className={`px-4 py-2 cursor-pointer flex items-center ${index === marcaSelectedIndex ? 'bg-[#00A7E1] text-white' : 'hover:bg-slate-100'
                                                }`}
                                            onClick={() => {
                                                setValue('marca', suggestion.Name);
                                                setValue('marcaId', suggestion.ID);
                                                setShowMarcaSuggestions(false);
                                            }}
                                        >
                                            {suggestion.UrlLogo && (
                                                <img
                                                    src={suggestion.UrlLogo}
                                                    alt={suggestion.Name}
                                                    className="w-6 h-6 mr-2 object-contain"
                                                    onError={handleImageError}
                                                    loading="lazy"
                                                />
                                            )}
                                            <span>{suggestion.Name}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="space-y-2 relative device-selector ">
                            <div className="flex gap-2 items-center pt-[5.5px]">
                                <Label htmlFor="aparato" className="text-gray-700 dark:text-slate-400 flex gap-2 items-center pt-[5.5px]"><span className='text-red-500'>*</span> {t('Device')}</Label>
                                <Dialog>
                                    {
                                        showInfoAparato && (
                                            <DialogTrigger asChild>
                                                <Info size={18} className='hover:cursor-pointer' />
                                            </DialogTrigger>
                                        )
                                    }
                                    <DialogContent className="max-w-[425px] overflow-y-auto gap-10">
                                        <DialogHeader>
                                            <DialogTitle>{t('EquipmentInfo')}</DialogTitle>
                                            <DialogDescription>{t('EquipmentInfoDesc')}</DialogDescription>
                                        </DialogHeader>
                                        <AspectRatio ratio={16 / 9}>
                                            {/* <picture> */}
                                            <img
                                                src={etiquetaAparatoUrl}
                                                alt="Etiqueta de aparato"
                                                className="w-full h-auto object-contain rounded-xl"
                                                // Si la imagen no se carga, mostrar un mensaje
                                                onError={(e) => {
                                                    e.target.onerror = null; // Prevents infinite loop
                                                    e.target.src = '/IMAGEN-NO-DISPONIBLE.webp'; // Placeholder image
                                                }}
                                            />
                                            {/* </picture> */}
                                        </AspectRatio>


                                        {/* <DialogFooter>
                                        </DialogFooter> */}
                                        <p className="text-sm text-gray-500 mt-2">{t('ContactSupport')}</p>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="relative">
                                <Input
                                    id="aparato"
                                    placeholder="Lavadora, Frigorifico, etc."
                                    {...register('aparato')}
                                    onChange={(e) => handleAparatoSearch(e.target.value)}
                                    onKeyDown={handleAparatoKeyDown}
                                    onBlur={handleClickOutside}
                                    className={`border-gray-300 ${errors.aparato ? 'border-red-500' : ''}`}
                                    autoComplete="off"
                                />
                                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {showAparatoSuggestions && aparatoSuggestions.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto shadow-lg dark:bg-slate-800">
                                    {aparatoSuggestions.map((suggestion, index) => (
                                        <li
                                            key={suggestion.ID}
                                            className={`px-4 py-2 cursor-pointer ${index === aparatoSelectedIndex ? 'bg-[#00A7E1] text-white' : 'hover:bg-gray-100 dark:hover:bg-sky-800'
                                                }`}
                                            onClick={() => {
                                                setValue('aparato', suggestion.Name);
                                                setValue('aparatoId', suggestion.ID);
                                                setShowAparatoSuggestions(false);
                                            }}
                                        >
                                            {suggestion.Name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {errors.aparato && (
                                <p className="text-sm text-red-500">{errors.aparato.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 relative model-input">
                            <Label htmlFor="modelo" className="text-gray-700 dark:text-slate-400">
                                {/* <span className='text-red-500'>*</span> */}
                                {t('Model')}</Label>
                            <div className="relative">
                                <Input
                                    id="modelo"
                                    {...register('modelo')}
                                    onChange={(e) => handleModeloSearch(e.target.value)}
                                    onKeyDown={handleModeloKeyDown}
                                    onBlur={handleClickOutside}
                                    className="border-gray-300"
                                    autoComplete="off"
                                    placeholder={t('SearchPlaceholder')}
                                />
                                {isLoadingModelo ? (
                                    <div className="absolute right-3 top-2.5 h-5 w-5 animate-spin rounded-full border-2 border-[#00A7E1] border-t-transparent" />
                                ) : (
                                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                )}
                            </div>
                            {showModeloSuggestions && modeloSuggestions.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto shadow-lg dark:bg-slate-800">
                                    {modeloSuggestions.map((suggestion, index) => (
                                        <li
                                            key={suggestion.Geraeteid}
                                            className={`px-4 py-2 cursor-pointer ${index === modeloSelectedIndex ? 'bg-[#00A7E1] text-white' : 'hover:bg-gray-100 dark:hover:bg-sky-800'
                                                }`}
                                            onClick={() => {
                                                setValue('modelo', suggestion.Name);
                                                setValue('modeloId', suggestion.Geraeteid);
                                                setShowModeloSuggestions(false);
                                            }}
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium">{suggestion.Name}</span>
                                                <span className={`text-sm ${index === modeloSelectedIndex ? 'text-white' : 'text-gray-500'}`}>
                                                    {suggestion.Type} - {suggestion.Hersteller}
                                                </span>
                                                {suggestion.EAN && (
                                                    <span className={`text-xs ${index === modeloSelectedIndex ? 'text-white' : 'text-gray-400'}`}>
                                                        EAN: {suggestion.EAN}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                <div className={cn("mt-6 space-y-4",
                    // isWarrantyForm || enGarantia ? "mt-0" : ""
                )}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <div className="space-y-2 comment-section">
                            <Label htmlFor="comentarioAveria" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('FailureCommentary')}</Label>
                            <Textarea
                                id="comentarioAveria"
                                {...register('comentarioAveria')}
                                placeholder={t('MaxCharacters')}
                                className={`border-gray-300 h-20 ${errors.comentarioAveria ? 'border-red-500' : ''}`}
                            />
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-500">
                                    {comentarioAveria.length}/500 {t('Characters', 'caracteres')}
                                </p>
                                {errors.comentarioAveria && (
                                    <p className="text-sm text-red-500">{errors.comentarioAveria.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2 customer-comment">
                            <Label htmlFor="comentario" className="text-gray-700 dark:text-slate-400"> {t('AddComment')}</Label>
                            <Textarea
                                id="comentario"
                                {...register('comentario')}
                                placeholder={t('InternComment')}
                                className={`border-gray-300 h-20 ${errors.comentario ? 'border-red-500' : ''}`}
                            />
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-500">
                                    {comentario.length}/500 {t('Characters', 'caracteres')}
                                </p>
                                {errors.comentario && (
                                    <p className="text-sm text-red-500">{errors.comentario.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* {!enGarantia && (
                    )} */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setShowMainForm(false);
                                setSelectedBrand(null);
                                setShowWarrantyQuestion(true);
                                setCurrentStep(0);
                                navigate('/asistencia');
                            }}
                            className="flex-grow back-button"
                        >
                            {t('Back')}
                        </Button>
                        <Button
                            disabled={loading}
                            type="submit" className="flex-grow bg-[#00A7E1] hover:bg-[#0095c8] submit-button">
                            <Send className="w-5 h-5 mr-2" />
                            {submitButtonText}
                        </Button>
                    </div>
                </div>
            </form >
        )
    }

    // Si es una reclamación -> serviceType === 5
    if (serviceType === 5) {
        return (
            <ClaimRequestForm
                onSubmit={handleClaimSubmit}
                apiURL={`${apiURL}/noticeController/getDataCustomer`}
            />
        );
    }

    if (serviceType === 6) {
        return (
            <ContabilidadForm
                onSubmit={handleContabilidadSubmit}
                apiURL={`${apiURL}/noticeController/getDataCustomer`}
            />
        );
    }

    if (serviceType === 7) {
        return (
            <ConsultationForm
                onSubmit={handleConsultationSubmit}
                apiURL={`${apiURL}/noticeController/getDataCustomer`}
            />
        );
    }

    // First we're showing the warranty question
    if (showWarrantyQuestion) {
        return (
            <div className="warranty-question py-1">
                <div className="bg-white dark:bg-slate-800 pt-4 p-8 rounded-lg shadow-sm border border-gray-200 transition-fade-in transition-scale-in ">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-200 mb-6 flex items-center">
                        <Wrench className="mr-3 h-8 w-8 text-[#00A7E1]" />
                        {t('RepairServiceRequest')
                        }
                    </h2>

                    <div className="mb-8 space-y-6">
                        <Card className="border-2 border-[#00A7E1]/10 dark:bg-slate-900">
                            <CardHeader className="space-y-3">
                                <CardTitle className="text-2xl flex items-center text-sky-800 dark:text-sky-400">
                                    {/* <Shield className="mr-2 h-6 w-6" /> */}
                                    {t('IsDeviceUnderWarranty')}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {/* Información importante sobre la garantía de tu electrodoméstico */}
                                    {
                                        t('WarrantyInfo')
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-blue-50 dark:bg-slate-900 p-4 rounded-lg">
                                    <h3 className="font-semibold text-lg mb-2 flex items-center text-blue-800 dark:text-blue-300">
                                        <Calendar className="mr-2 h-5 w-5" />
                                        {/* Garantía Legal Ampliada */}
                                        {t('ExtendedLegalWarranty')}
                                    </h3>
                                    <p className="text-blue-700 dark:text-blue-200">
                                        {/* Desde el 1 de enero de 2022, todos los electrodomésticos y bienes duraderos cuentan con 3 años de garantía legal. */}
                                        {t('WarrantyLegalExtended')}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <Clock className="h-5 w-5 text-[#00A7E1] mr-2" />
                                            <h4 className="font-semibold">
                                                {t('WarrantyDuration')}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {/* Garantía legal para productos desde 2022 */}
                                            {t('WarrantyDurationDesc')}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <WrenchIcon className="h-5 w-5 text-[#00A7E1] mr-2" />
                                            <h4 className="font-semibold">
                                                {/* 10 Años */}
                                                {t('WarrantyDuration10Years')}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {/* Disponibilidad mínima de piezas de repuesto */}
                                            {t('WarrantyDuration10YearsDesc')}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <ShieldCheck className="h-5 w-5 text-[#00A7E1] mr-2" />
                                            <h4 className="font-semibold">Factura de compra</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 text-pretty">
                                            {/* Sin necesidad de demostrar defecto de origen */}
                                            {/* Siempre será necesario presentar la factura de compra */}
                                            {t('WarrantyDurationInvoice')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4  rounded-b-lg">
                                <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                    <Info className="h-5 w-5 text-[#00A7E1] mt-0.5" />
                                    <p>
                                        {/*  */}
                                        {t('WarrantyInfoDesc2')}
                                    </p>
                                </div>
                            </CardFooter>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <Button
                                onClick={() => handleWarrantySelection(false)}
                                className="bg-[#00A7E1] hover:bg-[#0095c8] py-6 text-lg font-medium warranty-yes"
                            >
                                <Shield className="mr-2 h-5 w-5" />
                                Sí, está en garantía
                            </Button>
                            <Button
                                onClick={() => handleWarrantySelection(true)}
                                variant="outline"
                                className="py-6 text-lg font-medium border-2 hover:bg-gray-50 dark:hover:bg-slate-900 warranty-no"
                            >
                                <ShieldOff className="mr-2 h-5 w-5" />
                                No está en garantía
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Si está en garantía inicio
    if (showBrandSelector) {
        return (
            <>
                <div className="bg-white dark:bg-slate-800 pt-4 p-8 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between sat-information gap-2 mb-4">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-200 truncate">
                            Selecciona la marca
                        </h2>
                        <div className="flex gap-4">
                            <Button
                                onClick={() => {
                                    setShowBrandSelector(false);
                                    setShowWarrantyQuestion(true);
                                    if (isOpen) {
                                        setCurrentStep(0);
                                    }
                                }}
                                variant="outline"
                                className=""
                            >
                                {t('Back')}
                            </Button>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder={t('SearchBrand')}
                                    className="p-3 pl-10 rounded-lg"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 bottom-1 transform -translate-y-1/2 text-gray-500"
                                    size={18}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBrands.map((brand) => (
                            <Card
                                key={brand.id}
                                className="p-4 cursor-pointer hover:shadow-md content-transition dark:hover:bg-slate-900 transition overflow-hidden select-brand"
                                onClick={() => handleSelectBrand(brand)}
                            >
                                <div className="flex items-center h-16">
                                    {brand.logo ? (
                                        <img
                                            src={brand.logo}
                                            alt={`${brand.name} logo`}
                                            className="h-12 max-w-32 object-contain mr-4 dark:bg-white dark:p-1 rounded"
                                        />
                                    ) : (
                                        <div className="h-10 w-24 bg-gray-200 flex items-center justify-center mr-4 rounded">
                                            {brand.name}
                                        </div>
                                    )}
                                    <h3 className="font-medium truncate">{brand.name}</h3>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredBrands.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">{t('NoResultsFound')}</p>
                        </div>
                    )}

                    <div className="mt-6">
                        <Button
                            onClick={() => {
                                setShowBrandSelector(false);
                                setShowWarrantyQuestion(true);
                            }}
                            variant="outline"
                            className="w-full"
                        >
                            {t('Back')}
                        </Button>
                    </div>
                </div>

                {showScrollButton && (
                    <Button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-20 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 opacity-80 hover:scale-110"
                        aria-label={t('ScrollToTop')}
                    >
                        <ArrowUpCircle className="h-6 w-6 text-white" />
                    </Button>
                )}
            </>
        );
    }

    {
        if (selectedBrand && !enGarantia) {
            return (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {selectedBrand.logo ? (
                                <img
                                    src={selectedBrand.logo}
                                    alt={`${selectedBrand.name} logo`}
                                    className="h-12 max-w-32 object-contain mr-4 dark:bg-white dark:p-1 rounded"
                                />
                            ) : (
                                <div className="h-10 w-24 bg-gray-200 flex items-center justify-center mr-4 rounded">
                                    {selectedBrand.name}
                                </div>
                            )}
                            <h3 className="font-medium">{selectedBrand.name}</h3>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleBackToBrands}
                            className="text-sm"
                        >
                            {t('Back')}
                        </Button>
                    </div>

                    {selectedBrand.contacts && selectedBrand.contacts.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold mb-2">{t('ContactInformation')}:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {selectedBrand.contacts.map((contact, index) => (
                                    <div key={index} className="text-sm">
                                        {contact.name && <p className="font-semibold">{contact.name}</p>}
                                        {contact.phone && <p>{contact.phone}</p>}
                                        {contact.email && <p>{contact.email}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }
    // Si está en garantía fin

    // Si no está en garantía y no es una instalación
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white dark:bg-slate-800 pt-4 p-8 rounded-lg shadow-sm border border-gray-200 transition-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                    {serviceType === 1 ? t('RepairServiceRequest') :
                        serviceType === 2 ? t('InstallationServiceRequest') :
                            serviceType === 3 ? t('SaleServiceRequest') :
                                serviceType === 4 ? t('WarrantyServiceRequest') : t('AssistanceRequest')}
                </h2>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sección Dirección asistencia */}
                <div className="space-y-6 service-address">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-300">{t('ServiceAddress')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2 customer-phone">
                            <Label htmlFor="telefono" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('Phone')}</Label>
                            <Input
                                id="telefono"
                                type="tel"
                                placeholder="600 123 456"
                                {...register('telefono')}
                                onChange={(e) => {
                                    register('telefono').onChange(e);
                                    handlePhoneChange(e);
                                }}
                                className={`border-gray-300 ${errors.telefono ? 'border-red-500' : ''}`}
                                autoComplete="off"
                            />
                            {errors.telefono && (
                                <p className="text-sm text-red-500">{errors.telefono.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nombre" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('Name')}</Label>
                            <Input
                                id="nombre"
                                {...register('nombre')}
                                className={`border-gray-300 ${errors.nombre ? 'border-red-500' : ''}`}
                                placeholder="Juan"
                                autoComplete="off"
                            />
                            {errors.nombre && (
                                <p className="text-sm text-red-500">{errors.nombre.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="apellido" className="text-gray-700 dark:text-slate-400">
                                {/* <span className='text-red-500'>*</span> */}
                                {t('Surname')}</Label>
                            <Input
                                id="apellido"
                                {...register('apellido')}
                                className={`border-gray-300 ${errors.apellido ? 'border-red-500' : ''}`}
                                placeholder="Pérez"
                                autoComplete="off"
                            />
                            {errors.apellido && (
                                <p className="text-sm text-red-500">{errors.apellido.message}</p>
                            )}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="segundoApellido" className="text-gray-700 dark:text-slate-400">{t('SecondSurname')}</Label>
                            <Input
                                id="segundoApellido"
                                {...register('segundoApellido')}
                                className={`border-gray-300 ${errors.segundoApellido ? 'border-red-500' : ''}`}
                                placeholder="García"
                                autoComplete="off"
                            />
                            {errors.segundoApellido && (
                                <p className="text-sm text-red-500">{errors.segundoApellido.message}</p>
                            )}
                        </div>


                        <div className="space-y-2">
                            <div className="flex"></div>
                            <Label htmlFor="direccion" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('Address')}</Label>
                            <Input
                                id="direccion"
                                {...register('direccion')}
                                placeholder="C/Muntaner, 25"
                                className={`border-gray-300 ${errors.direccion ? 'border-red-500' : ''}`}
                                autoComplete="off"
                            />
                            {errors.direccion && (
                                <p className="text-sm text-red-500">{errors.direccion.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex"></div>
                            <Label htmlFor="pisoPuerta" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('FloorDoor')}</Label>
                            <Input
                                id="pisoPuerta"
                                {...register('pisoPuerta')}
                                placeholder="4º 2ª"
                                className={`border-gray-300 ${errors.pisoPuerta ? 'border-red-500' : ''}`}
                                autoComplete="off"
                            />
                            {errors.pisoPuerta && (
                                <p className="text-sm text-red-500">{errors.pisoPuerta.message}</p>
                            )}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="space-y-2">
                            <Label htmlFor="cp" className="text-gray-700 dark:text-slate-400 truncate"><span className='text-red-500'>*</span> {t('ZipCode')}</Label>
                            <div className="relative">
                                <Input
                                    id="cp"
                                    {...register('cp', {
                                        onChange: (e) => handleZipCodeChange(e.target.value)
                                    })}
                                    placeholder="08001"
                                    className={`border-gray-300 ${errors.cp ? 'border-red-500' : ''}`}
                                    autoComplete="off"
                                />
                                {isValidating && (
                                    <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                                )}
                            </div>
                            {errors.cp && (
                                <p className="text-sm text-red-500">{errors.cp.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="poblacion" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('City')}</Label>
                            <div className="relative">
                                <Input
                                    id="poblacion"
                                    {...register('poblacion', {
                                        onChange: (e) => handleZipCodeChange(e.target.value)
                                    })}
                                    placeholder="Barcelona"
                                    className={`border-gray-300 ${errors.poblacion ? 'border-red-500' : ''}`}
                                    autoComplete="off"
                                />
                                {isValidating && (
                                    <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                                )}
                            </div>
                            {errors.poblacion && (
                                <p className="text-sm text-red-500">{errors.poblacion.message}</p>
                            )}
                        </div>
                        <div className="space-y-2 hidden">
                            <Label htmlFor="provincia" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>* </span>
                                {t('Province')}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="provincia"
                                    {...register('provincia', {
                                        onChange: (e) => handleZipCodeChange(e.target.value)
                                    })}
                                    placeholder="Barcelona"
                                    className={`border-gray-300 ${errors.provincia ? 'border-red-500' : ''}`}
                                    autoComplete="off"
                                />
                                {isValidating && (
                                    <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                                )}
                            </div>
                            {errors.provincia && (
                                <p className="text-sm text-red-500">{errors.provincia.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 dark:text-slate-400 truncate">{t('Email')}</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    {...register('email', {
                                        onChange: (e) => handleZipCodeChange(e.target.value)
                                    })}
                                    placeholder="juan@gmail.com"
                                    className={`border-gray-300 ${errors.email ? 'border-red-500' : ''}`}
                                    autoComplete="off"
                                />
                                {isValidating && (
                                    <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                                )}
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6 equipment-data">
                    <div className="flex justify-between h-0 pb-7 ">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-300">{t('EquipmentData')}</h3>
                    </div>

                    <div className={cn("space-y-2 relative brand-selector", !showInfoMarca ? "pt-[10px]" : "pt-[6px]")}>
                        <div className="flex gap-2 items-center ">
                            <Label htmlFor="marca" className="text-gray-700 dark:text-slate-400 flex gap-2 items-center">
                                {/* <span className='text-red-500'>*</span> */}
                                {t('Brand')}
                            </Label>
                            <Dialog >
                                {
                                    showInfoMarca && (
                                        <DialogTrigger asChild>
                                            <Info size={18}
                                                className='hover:cursor-pointer'
                                            />
                                        </DialogTrigger>
                                    )
                                }
                                <DialogContent className="max-w-[425px] overflow-y-auto gap-10">
                                    <DialogHeader>
                                        <DialogTitle>{t('BrandInfo')}</DialogTitle>
                                        <DialogDescription>{t('BrandInfoDesc')}</DialogDescription>
                                        <AspectRatio ratio={4 / 4} >
                                            <picture>
                                                <img
                                                    src={etiquetaMarcaUrl}
                                                    alt="Etiqueta de marca"
                                                    className="w-full h-auto object-contain rounded-xl"
                                                    onError={(e) => {
                                                        e.target.onerror = null; // Prevents infinite loop
                                                        e.target.src = '/IMAGEN-NO-DISPONIBLE.webp'; // Placeholder image
                                                    }}
                                                />
                                            </picture>
                                        </AspectRatio>
                                    </DialogHeader>

                                    {/* <DialogFooter>
                                    </DialogFooter> */}
                                    <p className="text-sm text-gray-500 mt-2">{t('ContactSupport')}</p>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="relative">
                            <Input
                                id="marca"
                                placeholder="Samsung, LG, etc."
                                {...register('marca')}
                                onChange={(e) => handleMarcaSearch(e.target.value)}
                                onKeyDown={handleMarcaKeyDown}
                                onBlur={handleClickOutside}
                                className="border-gray-300"
                                autoComplete="off"
                                readOnly={selectedBrand !== null}
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        {showMarcaSuggestions && marcaSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto shadow-lg dark:bg-slate-800">
                                {marcaSuggestions.map((suggestion, index) => (
                                    <li
                                        key={suggestion.ID}
                                        className={`px-4 py-2 cursor-pointer flex items-center ${index === marcaSelectedIndex ? 'bg-[#00A7E1] text-white' : 'hover:bg-slate-100'
                                            }`}
                                        onClick={() => {
                                            setValue('marca', suggestion.Name);
                                            setValue('marcaId', suggestion.ID);
                                            setShowMarcaSuggestions(false);
                                        }}
                                    >
                                        {suggestion.UrlLogo && (
                                            <img
                                                src={suggestion.UrlLogo}
                                                alt={suggestion.Name}
                                                className="w-6 h-6 mr-2 object-contain"
                                                onError={handleImageError}
                                                loading="lazy"
                                            />
                                        )}
                                        <span>{suggestion.Name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="space-y-2 relative device-selector">
                        <div className="flex gap-2 items-center pt-[5.5px]">
                            <Label htmlFor="aparato" className="text-gray-700 dark:text-slate-400 flex gap-2 items-center pt-[5.5px]">
                                {/* <span className='text-red-500'>*</span> */}
                                {t('Device')}
                            </Label>
                            <Dialog>
                                {
                                    showInfoAparato && (
                                        <DialogTrigger asChild>
                                            <Info size={18} className='hover:cursor-pointer' />
                                        </DialogTrigger>
                                    )
                                }
                                <DialogContent className="max-w-[425px] overflow-y-auto gap-10">
                                    <DialogHeader>
                                        <DialogTitle>{t('EquipmentInfo')}</DialogTitle>
                                        <DialogDescription>{t('EquipmentInfoDesc')}</DialogDescription>
                                    </DialogHeader>
                                    <AspectRatio ratio={4 / 4} >
                                        <picture>
                                            <img
                                                src={etiquetaAparatoUrl}
                                                alt="Etiqueta de aparato"
                                                className="w-full h-auto object-contain rounded-xl"
                                                onError={(e) => {
                                                    e.target.onerror = null; // Prevents infinite loop
                                                    e.target.src = '/IMAGEN-NO-DISPONIBLE.webp'; // Placeholder image
                                                }}
                                            // lazyLoad="eager"
                                            />
                                        </picture>
                                    </AspectRatio>

                                    {/* <DialogFooter>
                                    </DialogFooter> */}
                                    <p className="text-sm text-gray-500 mt-2">{t('ContactSupport')}</p>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="relative">
                            <Input
                                id="aparato"
                                placeholder="Lavadora, Frigorifico, etc."
                                {...register('aparato')}
                                onChange={(e) => handleAparatoSearch(e.target.value)}
                                onKeyDown={handleAparatoKeyDown}
                                onBlur={handleClickOutside}
                                className={`border-gray-300 ${errors.aparato ? 'border-red-500' : ''}`}
                                autoComplete="off"
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        {showAparatoSuggestions && aparatoSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto shadow-lg dark:bg-slate-800">
                                {aparatoSuggestions.map((suggestion, index) => (
                                    <li
                                        key={suggestion.ID}
                                        className={`px-4 py-2 cursor-pointer ${index === aparatoSelectedIndex ? 'bg-[#00A7E1] text-white' : 'hover:bg-slate-100'
                                            }`}
                                        onClick={() => {
                                            setValue('aparato', suggestion.Name);
                                            setValue('aparatoId', suggestion.ID);
                                            setShowAparatoSuggestions(false);
                                        }}
                                    >
                                        {suggestion.Name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {errors.aparato && (
                            <p className="text-sm text-red-500">{errors.aparato.message}</p>
                        )}
                    </div>

                    <div className="space-y-2 relative model-input">
                        <Label htmlFor="modelo" className="text-gray-700 dark:text-slate-400">
                            {/* <span className='text-red-500'>*</span>  */}
                            {t('Model')}</Label>
                        <div className="relative">
                            <Input
                                id="modelo"
                                {...register('modelo')}
                                onChange={(e) => handleModeloSearch(e.target.value)}
                                onKeyDown={handleModeloKeyDown}
                                onBlur={handleClickOutside}
                                className="border-gray-300"
                                autoComplete="off"
                                placeholder={t('SearchPlaceholder')}
                            />
                            {isLoadingModelo ? (
                                <div className="absolute right-3 top-2.5 h-5 w-5 animate-spin rounded-full border-2 border-[#00A7E1] border-t-transparent" />
                            ) : (
                                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            )}
                        </div>
                        {showModeloSuggestions && modeloSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto shadow-lg dark:bg-slate-800">
                                {modeloSuggestions.map((suggestion, index) => (
                                    <li
                                        key={suggestion.Geraeteid}
                                        className={`px-4 py-2 cursor-pointer ${index === modeloSelectedIndex ? 'bg-[#00A7E1] text-white' : 'hover:bg-slate-100'
                                            }`}
                                        onClick={() => {
                                            setValue('modelo', suggestion.Name);
                                            setValue('modeloId', suggestion.Geraeteid);
                                            setShowModeloSuggestions(false);
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium">{suggestion.Name}</span>
                                            <span className={`text-sm ${index === modeloSelectedIndex ? 'text-white' : 'text-gray-500'}`}>
                                                {suggestion.Type} - {suggestion.Hersteller}
                                            </span>
                                            {suggestion.EAN && (
                                                <span className={`text-xs ${index === modeloSelectedIndex ? 'text-white' : 'text-gray-400'}`}>
                                                    EAN: {suggestion.EAN}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className={cn("mt-6 space-y-4",
                // isWarrantyForm || enGarantia ? "mt-0" : ""
            )}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="space-y-2 comment-section">
                        <Label htmlFor="comentarioAveria" className="text-gray-700 dark:text-slate-400"><span className='text-red-500'>*</span> {t('FailureCommentary')}</Label>
                        <Textarea
                            id="comentarioAveria"
                            {...register('comentarioAveria')}
                            placeholder={t('MaxCharacters')}
                            className={`border-gray-300 h-20 ${errors.comentarioAveria ? 'border-red-500' : ''}`}
                        />
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-500">
                                {comentarioAveria.length}/500 {t('Characters', 'caracteres')}
                            </p>
                            {errors.comentarioAveria && (
                                <p className="text-sm text-red-500">{errors.comentarioAveria.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2 customer-comment">
                        <Label htmlFor="comentario" className="text-gray-700 dark:text-slate-400">{t('AddComment')}</Label>
                        <Textarea
                            id="comentario"
                            {...register('comentario')}
                            placeholder={t('InternComment')}
                            className={`border-gray-300 h-20 ${errors.comentario ? 'border-red-500' : ''} `}
                        />
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-500">
                                {comentario.length}/500 {t('Characters', 'caracteres')}
                            </p>
                            {errors.comentario && (
                                <p className="text-sm text-red-500">{errors.comentario.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    {/* {!enGarantia && (
                    )} */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            setShowMainForm(false);
                            setSelectedBrand(null);
                            setShowWarrantyQuestion(true);
                            setCurrentStep(0);
                        }}
                        className="flex-grow back-button"
                    >
                        {t('Back')}
                    </Button>
                    <Button
                        disabled={loading}
                        type="submit" className="flex-grow bg-[#00A7E1] hover:bg-[#0095c8] submit-button">
                        <Send className="w-5 h-5 mr-2" />
                        {submitButtonText}
                    </Button>
                </div>
            </div>
        </form>
    );
}