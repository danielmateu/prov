import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fiscalDataSchema } from './types';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useZipCodeValidation } from '@/hooks/use-zipcode-validation';
// import { validatePostalCode } from '@/utils/newNoticeFormValidations';
export function FiscalDataForm({
    onSubmit,
    initialData,
    isEditing = false,
}) {
    // console.log('initialData', initialData);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
        setError,
        clearErrors
    } = useForm({
        resolver: zodResolver(fiscalDataSchema),
        defaultValues: initialData || {
            tipo: '', // 0 para autonomo, 1 para empresa
            tipoDocumento: '1', // 1 para DNI
            nombreFiscal: '',
            numeroFiscal: '',
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            direccion: '',
            codigoPostal: '',
            ciudad: '',
            provincia: '',
            telefonoMovil: '',
            telefonoFijo: '',
            correoElectronico: '',
            contactoNombre: '',
            contactoTelefonoMovil: '',
            contactoTelefonoFijo: '',
            iban: '',
            nombreComercial: '',
        },
    });

    const { isValidating, validatePostalCode, population } = useZipCodeValidation(setError, clearErrors);

    // console.log('Poppulation', population);

    // console.log('initialData', initialData);

    const tipo = watch('tipo');
    const tipoDocumento = watch('tipoDocumento');
    const { t } = useTranslation()

    useEffect(() => {
        if (population) {
            setValue('ciudad', population.Population);
            setValue('provincia', population.Province);
        } else {
            setValue('ciudad', '');
            setValue('provincia', '');
        }
    }, [population, setValue]);

    // setValue de ciudad y provincia
    setValue('ciudad', initialData?.ciudad);
    setValue('provincia', initialData?.provincia);


    const handleTipoChange = async (value) => {
        setValue('tipo', value, { shouldValidate: true });
        if (value === 'empresa') { // empresa
            setValue('nombre', undefined);
            setValue('primerApellido', undefined);
            setValue('segundoApellido', undefined);
        }
        await trigger();
    };

    const handleDocumentoChange = async (value) => {
        setValue('tipoDocumento', value, { shouldValidate: true });
        setValue('numeroFiscal', '', { shouldValidate: true });
        await trigger('numeroFiscal');
    };

    let zipCodeTimeout;
    const handleZipCodeChange = (value) => {
        clearTimeout(zipCodeTimeout);
        zipCodeTimeout = setTimeout(() => {
            validatePostalCode(value);
            // console.log('city', city);
        }, 500);
    };

    const getDocumentPlaceholder = (type) => {
        switch (type) {
            case "1": return "12345678A"; // DNI
            case "2": return "X1234567A"; // NIE
            case "3": return "A12345678"; // CIF
            default: return "";
        }
    };

    const formatIBAN = (value) => {
        // Remove all spaces and non-alphanumeric characters
        const cleaned = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
        // Add a space every 4 characters
        return cleaned.replace(/(.{4})/g, '$1 ').trim();
    };

    const handleIBANChange = (e) => {
        const formatted = formatIBAN(e.target.value);
        e.target.value = formatted;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-900 px-8 py-6 rounded-lg shadow-sm border border-gray-200 fiscal-data-form">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 relative">
                {/* Columna izquierda - Datos principales */}
                <div className="space-y-2">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            {/* <Label className="text-gray-700 dark:text-slate-400">Tipo</Label> */}
                            <Label className="text-gray-700 dark:text-slate-400">
                                {t('Type')}
                            </Label>
                            <Select
                                defaultValue={tipo}
                                onValueChange={handleTipoChange}
                                disabled={!isEditing}
                            >
                                <SelectTrigger className={cn("w-full", errors.tipo && "border-red-500")}>
                                    <SelectValue placeholder="Seleccione el tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="empresa">
                                        {t('Company')}
                                    </SelectItem>
                                    <SelectItem value="autonomo">
                                        {t('SelfEmployed')}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.tipo && (
                                <p className="text-sm text-red-500">{errors.tipo.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            {/* <Label className="text-gray-700 dark:text-slate-400">Tipo documento</Label> */}
                            <Label className="text-gray-700 dark:text-slate-400">
                                {t('DocumentType')}
                            </Label>
                            <Select
                                defaultValue={tipoDocumento}
                                onValueChange={handleDocumentoChange}
                                disabled={!isEditing}
                            >
                                <SelectTrigger className={cn("w-full", errors.tipoDocumento && "border-red-500")}>
                                    <SelectValue placeholder="Seleccione el tipo de documento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">DNI</SelectItem>
                                    <SelectItem value="2">NIE</SelectItem>
                                    <SelectItem value="3">CIF</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.tipoDocumento && (
                                <p className="text-sm text-red-500">{errors.tipoDocumento.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            {/* <Label htmlFor="numeroFiscal" className="text-gray-700 dark:text-slate-400">Número fiscal</Label> */}
                            <Label htmlFor="numeroFiscal" className="text-gray-700 dark:text-slate-400">
                                {t('FiscalNumber')}
                            </Label>
                            <Input
                                id="numeroFiscal"
                                {...register('numeroFiscal')}
                                className={cn("border-gray-300", errors.numeroFiscal && "border-red-500")}
                                placeholder={getDocumentPlaceholder(tipoDocumento)}
                                disabled={!isEditing}
                            />
                            {errors.numeroFiscal && (
                                <p className="text-sm text-red-500">{errors.numeroFiscal.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            {/* <Label htmlFor="nombreFiscal" className="text-gray-700 dark:text-slate-400">Nombre fiscal</Label> */}
                            <Label htmlFor="nombreFiscal" className="text-gray-700 dark:text-slate-400">
                                {t('FiscalName')}
                            </Label>
                            <Input
                                id="nombreFiscal"
                                {...register('nombreFiscal')}
                                className={cn("border-gray-300", errors.nombreFiscal && "border-red-500")}
                                placeholder="Rapitecnic Servicio Integral S.L"
                                disabled={!isEditing}
                            />
                            {errors.nombreFiscal && (
                                <p className="text-sm text-red-500">{errors.nombreFiscal.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            {/* <Label htmlFor="nombreComercial" className="text-gray-700 dark:text-slate-400">Nombre comercial</Label> */}
                            <Label htmlFor="nombreComercial" className="text-gray-700 dark:text-slate-400">
                                {t('CommercialName')}
                            </Label>
                            <Input
                                id="nombreComercial"
                                {...register('nombreComercial')}
                                className={cn("border-gray-300", errors.nombreComercial && "border-red-500")}
                                placeholder="Rapitecnic Madrid"
                                disabled={!isEditing}
                            />
                            {errors.nombreComercial && (
                                <p className="text-sm text-red-500">{errors.nombreComercial.message}</p>
                            )}
                        </div>
                        {tipo === 'autonomo' && (
                            <>
                                <div className="space-y-2">
                                    {/* <Label htmlFor="nombre" className="text-gray-700 dark:text-slate-400">Nombre</Label> */}
                                    <Label htmlFor="nombre" className="text-gray-700 dark:text-slate-400">
                                        {t('Name')}
                                    </Label>
                                    <Input
                                        id="nombre"
                                        {...register('nombre')}
                                        className={cn("border-gray-300", errors.nombre && "border-red-500")}
                                        disabled={!isEditing}
                                    />
                                    {errors.nombre && (
                                        <p className="text-sm text-red-500">{errors.nombre.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {/* <Label htmlFor="primerApellido" className="text-gray-700 dark:text-slate-400">1º Apellido</Label> */}
                                    <Label htmlFor="primerApellido" className="text-gray-700 dark:text-slate-400">
                                        {t('FirstSurname')}
                                    </Label>
                                    <Input
                                        id="primerApellido"
                                        {...register('primerApellido')}
                                        className={cn("border-gray-300", errors.primerApellido && "border-red-500")}
                                        disabled={!isEditing}
                                    />
                                    {errors.primerApellido && (
                                        <p className="text-sm text-red-500">{errors.primerApellido.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {/* <Label htmlFor="segundoApellido" className="text-gray-700 dark:text-slate-400">2º Apellido</Label> */}
                                    <Label htmlFor="segundoApellido" className="text-gray-700 dark:text-slate-400">
                                        {t('SecondSurname')}
                                    </Label>
                                    <Input
                                        id="segundoApellido"
                                        {...register('segundoApellido')}
                                        className={cn("border-gray-300", errors.segundoApellido && "border-red-500")}
                                        disabled={!isEditing}
                                    />
                                    {errors.segundoApellido && (
                                        <p className="text-sm text-red-500">{errors.segundoApellido.message}</p>
                                    )}
                                </div>
                            </>
                        )
                        }
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2 ">
                            {/* <Label htmlFor="direccion" className="text-gray-700 dark:text-slate-400">Dirección</Label> */}
                            <Label htmlFor="direccion" className="text-gray-700 dark:text-slate-400">
                                {t('Address')}
                            </Label>
                            <Input
                                id="direccion"
                                {...register('direccion')}
                                className={cn("border-gray-300", errors.direccion && "border-red-500")}
                                placeholder="Plaça del Vapor 9"
                                disabled={!isEditing}
                            />
                            {errors.direccion && (
                                <p className="text-sm text-red-500">{errors.direccion.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            {/* <Label htmlFor="codigoPostal" className="text-gray-700 dark:text-slate-400">Código postal</Label> */}
                            <Label htmlFor="codigoPostal" className="text-gray-700 dark:text-slate-400">
                                {t('PostalCode')}
                            </Label>
                            <Input
                                id="codigoPostal"
                                {...register('codigoPostal', {
                                    onChange: (e) => {
                                        handleZipCodeChange(e.target.value);
                                    },
                                })}

                                className={cn("border-gray-300", errors.codigoPostal && "border-red-500")}
                                placeholder="08015"
                                maxLength={5}
                                disabled={!isEditing}
                            />
                            {errors.codigoPostal && (
                                <p className="text-sm text-red-500">{errors.codigoPostal.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            {/* <Label htmlFor="ciudad" className="text-gray-700 dark:text-slate-400">Ciudad</Label> */}
                            <Label htmlFor="ciudad" className="text-gray-700 dark:text-slate-400">
                                {t('City')}
                            </Label>
                            <Input
                                id="ciudad"
                                {...register('ciudad')}
                                className={cn("border-gray-300", errors.ciudad && "border-red-500")}
                                placeholder="Barcelona"
                                disabled={!isEditing}
                            />
                            {errors.ciudad && (
                                <p className="text-sm text-red-500">{errors.ciudad.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            {/* <Label htmlFor="provincia" className="text-gray-700 dark:text-slate-400">Provincia</Label> */}
                            <Label htmlFor="provincia" className="text-gray-700 dark:text-slate-400">
                                {t('Province')}
                            </Label>
                            <Input
                                id="provincia"
                                {...register('provincia')}
                                className={cn("border-gray-300", errors.provincia && "border-red-500")}
                                placeholder="Barcelona"
                                disabled={!isEditing}
                            />
                            {errors.provincia && (
                                <p className="text-sm text-red-500">{errors.provincia.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            {/* <Label htmlFor="telefonoMovil" className="text-gray-700 dark:text-slate-400 truncate">Teléfono móvil</Label> */}
                            <Label htmlFor="telefonoMovil" className="text-gray-700 dark:text-slate-400 ">
                                {t('MobilePhone')}
                            </Label>
                            <Input
                                id="telefonoMovil"
                                {...register('telefonoMovil')}
                                className={cn("border-gray-300", errors.telefonoMovil && "border-red-500")}
                                placeholder="+34655764662"
                                disabled={!isEditing}
                            />
                            {errors.telefonoMovil && (
                                <p className="text-sm text-red-500">{errors.telefonoMovil.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            {/* <Label htmlFor="telefonoFijo" className="text-gray-700 dark:text-slate-400">Teléfono fijo</Label> */}
                            <Label htmlFor="telefonoFijo" className="text-gray-700 dark:text-slate-400">
                                {t('LandlinePhone')}
                            </Label>
                            <Input
                                id="telefonoFijo"
                                {...register('telefonoFijo')}
                                className={cn("border-gray-300", errors.telefonoFijo && "border-red-500")}
                                placeholder="+34937546252"
                                disabled={!isEditing}
                            />
                            {errors.telefonoFijo && (
                                <p className="text-sm text-red-500">{errors.telefonoFijo.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            {/* <Label htmlFor="correoElectronico" className="text-gray-700 dark:text-slate-400 truncate">Correo electrónico</Label> */}
                            <Label htmlFor="correoElectronico" className="text-gray-700 dark:text-slate-400 truncate">
                                {t('Email')}
                            </Label>
                            <Input
                                id="correoElectronico"
                                type="email"
                                {...register('correoElectronico')}
                                className={cn("border-gray-300", errors.correoElectronico && "border-red-500")}
                                placeholder="info@rapitecnic.com"
                                disabled={!isEditing}
                            />
                            {errors.correoElectronico && (
                                <p className="text-sm text-red-500">{errors.correoElectronico.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="iban" className="text-gray-700 dark:text-slate-400">IBAN</Label>
                            <Input
                                id="iban"
                                {...register('iban')}
                                className={cn("border-gray-300", errors.iban && "border-red-500")}
                                placeholder="ES91 2100 0418 4502 0005 1332"
                                onChange={handleIBANChange}
                                disabled={!isEditing}
                                maxLength={29} // ES + 22 digits + 5 spaces
                            />
                            {errors.iban && (
                                <p className="text-sm text-red-500">{errors.iban.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className={cn("bg-[#00A7E1] hover:bg-[#0095c8] col-span-2 fiscal-data-submit", !isEditing && "hidden")}
                        >
                            <Send className="w-5 h-5 mr-2" />
                            {/* {isEditing ? 'Guardar cambios' : ''} */}
                            {t('SaveChanges')}
                        </Button>
                    </div>
                    {/* <div className="mt-8 items-end flex justify-end gap-4">
                    </div> */}
                </div>

                {/* Columna derecha - Datos de contacto */}

            </div>


        </form>
    );
}