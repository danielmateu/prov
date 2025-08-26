
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useZipCodeValidation } from '@/hooks/use-zipcode-validation';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const validateIdNumber = (value, documentType) => {
    if (!documentType) return false;

    const dniRegex = /^[0-9]{8}[A-Za-z]$/i;
    const nieRegex = /^[XYZxyz][0-9]{7}[A-Za-z]$/i;
    const cifRegex = /^[A-Za-z][0-9]{8}$/i;

    switch (documentType) {
        case "1": return dniRegex.test(value);
        case "2": return nieRegex.test(value);
        case "3": return cifRegex.test(value);
        default: return false;
    }
};

const getIdNumberErrorMessage = (documentType) => {
    switch (documentType) {
        case "1": return "El DNI debe tener 8 números seguidos de una letra";
        case "2": return "El NIE debe comenzar con X, Y o Z, seguido de 7 números y una letra";
        case "3": return "El CIF debe comenzar con una letra seguida de 8 números";
        default: return "Identificador fiscal inválido";
    }
};

const createRegisterSchema = (documentType) => {
    const baseSchema = {
        userType: z.enum(['empresa', 'autonomo'], {
            required_error: "El tipo de usuario es requerido"
        }),
        cell: z.string()
            .min(9, 'El número de móvil es requerido')
            .max(12, 'El número de móvil no puede tener más de 12 dígitos')
            .regex(/^\+?[0-9]+$/, 'Número de móvil inválido'),
        phone: z.string()
            .optional(),
        address: z.string()
            .min(5, 'La dirección es requerida')
            .max(200, 'La dirección no puede tener más de 200 caracteres'),
        city: z.string()
            .min(2, 'La ciudad es requerida')
            .max(50, 'La ciudad no puede tener más de 50 caracteres'),
        zipCode: z.string()
            .min(5, 'El código postal es requerido')
            .max(5, 'El código postal debe tener 5 dígitos')
            .regex(/^[0-9]{5}$/, 'Código postal inválido'),
        province: z.string().optional(),
        // .min(2, 'La provincia es requerida')
        // .max(50, 'La provincia no puede tener más de 50 caracteres'),
        email: z.string()
            .email('Correo electrónico inválido')
            .min(1, 'El correo electrónico es requerido'),
        confirmEmail: z.string()
            .min(1, 'Confirma tu correo electrónico'),
        password: z.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .max(50, 'La contraseña no puede tener más de 50 caracteres'),
        confirmPassword: z.string()
            .min(1, 'Confirma tu contraseña'),
        documentType: z.enum(['1', '2', '3'], {
            required_error: "El tipo de documento es requerido"
        }),
        idnumber: z.string()
            .min(1, 'El identificador fiscal es requerido')
            .max(9, 'El número identificador no puede tener más de 9 caracteres')
            .refine(
                (val) => validateIdNumber(val, documentType),
                { message: getIdNumberErrorMessage(documentType) }
            ),
        companyName: z.string()
            .min(1, 'El nombre de la empresa es requerido')
            .max(50, 'El nombre de la empresa no puede tener más de 50 caracteres'),
        nombreComercial: z.string()
            .max(50, 'El nombre comercial no puede tener más de 50 caracteres')
            .optional(),
    };

    return z.discriminatedUnion('userType', [
        z.object({
            ...baseSchema,
            userType: z.literal('autonomo'),
            name: z.string()
                .min(2, 'El nombre es requerido')
                .max(50, 'El nombre no puede tener más de 50 caracteres'),
            surname: z.string()
                .min(2, 'El apellido es requerido')
                .max(50, 'El apellido no puede tener más de 50 caracteres'),
            secondSurname: z.string()
                .max(50, 'El segundo apellido no puede tener más de 50 caracteres')
                .optional(),
            companyName: z.string()
                .optional()
        }),
        z.object({
            ...baseSchema,
            userType: z.literal('empresa'),
            name: z.string().optional(),
            surname: z.string().optional(),
            secondSurname: z.string().optional(),
        })
    ]).refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    }).refine((data) => data.email === data.confirmEmail, {
        message: "Los correos electrónicos no coinciden",
        path: ["confirmEmail"],
    });
};

const apiURL = import.meta.env.VITE_API_URL;

const RegisterForm = ({ onSubmit, isLoading, error, userInfo = {} }) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [selectedDocType, setSelectedDocType] = useState('3');

    const { toast } = useToast();

    const { register, handleSubmit, formState: { errors }, setValue, watch, trigger, setError, clearErrors } = useForm({
        resolver: zodResolver(createRegisterSchema(selectedDocType)),
        mode: 'onChange',
        defaultValues: {
            userType: 'empresa',
            documentType: '3',
            companyName: userInfo.TaxName || '',
        }
    });

    // useEffect(() => {
    //     if (userInfo) {
    //         setValue('companyName', userInfo.TaxName || '');
    //     }
    // }, [userInfo, setValue]);
    useEffect(() => {
        if (userInfo?.TaxName) {
            setValue('companyName', userInfo.TaxName);
        }
    }, [userInfo, setValue]);


    const { isValidating, validatePostalCode, population } = useZipCodeValidation(setError, clearErrors);

    const selectedDocumentType = watch('documentType');
    const userType = watch('userType');

    useEffect(() => {
        setSelectedDocType(selectedDocumentType);
    }, [selectedDocumentType]);

    useEffect(() => {
        if (population) {
            setValue('city', population.Population);
            setValue('province', population.Province);
        } else {
            setValue('city', '');
            setValue('province', '');
        }
    }, [population, setValue]);

    const getDocumentTypes = async () => {
        try {
            const response = await fetch(`${apiURL}/authController/getDocumentTypes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error fetching document types');
            }
            setDocumentTypes(data);
            return data;
        } catch (error) {
            console.error('Error fetching document types:', error);
        }
    }

    useEffect(() => {
        getDocumentTypes();
    }, []);

    let zipCodeTimeout;
    const handleZipCodeChange = (value) => {
        clearTimeout(zipCodeTimeout);
        zipCodeTimeout = setTimeout(() => {
            validatePostalCode(value);
        }, 500);
    };

    const handleDocumentTypeChange = async (value) => {
        setValue('documentType', value, { shouldValidate: true });
        setValue('idnumber', '', { shouldValidate: true });
        await trigger('idnumber');
    };

    const handleUserTypeChange = (value) => {
        setValue('userType', value, { shouldValidate: true });

        if (value === 'empresa') {
            setValue('documentType', '3', { shouldValidate: true });
            setValue('name', undefined, { shouldValidate: true });
            setValue('surname', undefined, { shouldValidate: true });
            setValue('secondSurname', undefined, { shouldValidate: true });
        }
    };

    const preventCopyPaste = (e) => {
        e.preventDefault();
        toast({
            title: t('CopyPasteDisabled'),
            description: t('CopyPasteDisabledDescription'),
            variant: 'destructive',
        });

        return false;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="userType">{t('UserType')} <span className='text-red-500'>*</span></Label>
                    <Select onValueChange={handleUserTypeChange} defaultValue={userType}>
                        <SelectTrigger className={errors.userType ? 'border-red-500' : ''}>
                            <SelectValue placeholder={t('SelectUserType')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="empresa">{t('BusinessType')}</SelectItem>
                            <SelectItem value="autonomo">{t('SelfEmployedType')}</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.userType && (
                        <p className="text-red-500 text-sm">{errors.userType.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="documentType">{t('DocumentType')} <span className='text-red-500'>*</span></Label>
                    <Select onValueChange={handleDocumentTypeChange} defaultValue={selectedDocType}>
                        <SelectTrigger className={errors.documentType ? 'border-red-500' : ''}>
                            <SelectValue placeholder={t('SelectDocument')} />
                        </SelectTrigger>
                        <SelectContent>
                            {documentTypes.map((type) => (
                                <SelectItem key={type.DocumentTypeID} value={type.DocumentTypeID.toString()}>
                                    {type.Name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.documentType && (
                        <p className="text-red-500 text-sm">{errors.documentType.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="idnumber">{t('FiscalId')} <span className='text-red-500'>*</span></Label>
                    <Input
                        id="idnumber"
                        type="text"
                        aria-invalid={errors.idnumber ? "true" : "false"}
                        {...register('idnumber')}
                        className={`w-full ${errors.idnumber ? 'border-red-500' : ''}`}
                        placeholder={selectedDocumentType === "1" ? "12345678A" :
                            selectedDocumentType === "2" ? "X1234567A" :
                                selectedDocumentType === "3" ? "A12345678" : "12345678A"}
                    />
                    {errors.idnumber && (
                        <p className="text-red-500 text-sm">{errors.idnumber.message}</p>
                    )}
                </div>

                {userType === 'autonomo' && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="name">{t('Name')} <span className='text-red-500'>*</span></Label>
                            <Input
                                id="name"
                                type="text"
                                aria-invalid={errors.name ? "true" : "false"}
                                {...register('name')}
                                className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                                placeholder="Jose"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="surname">{t('FirstSurname')} <span className='text-red-500'>*</span></Label>
                            <Input
                                id="surname"
                                type="text"
                                aria-invalid={errors.surname ? "true" : "false"}
                                {...register('surname')}
                                className={`w-full ${errors.surname ? 'border-red-500' : ''}`}
                                placeholder="Gonzalez"
                            />
                            {errors.surname && (
                                <p className="text-red-500 text-sm">{errors.surname.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="secondSurname">{t('SecondSurname')}:</Label>
                            <Input
                                id="secondSurname"
                                type="text"
                                aria-invalid={errors.secondSurname ? "true" : "false"}
                                {...register('secondSurname')}
                                className={`w-full ${errors.secondSurname ? 'border-red-500' : ''}`}
                                placeholder="Perez"
                            />
                            {errors.secondSurname && (
                                <p className="text-red-500 text-sm">{errors.secondSurname.message}</p>
                            )}
                        </div>
                    </>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">{t('Email')} <span className='text-red-500'>*</span></Label>
                    <Input
                        id="email"
                        type="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        {...register('email')}
                        className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="josegp@mail.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmEmail">
                        {t('ConfirmEmail')}
                        <span className='text-red-500'>*</span></Label>
                    <Input
                        id="confirmEmail"
                        type="email"
                        aria-invalid={errors.confirmEmail ? "true" : "false"}
                        {...register('confirmEmail')}
                        className={`w-full ${errors.confirmEmail ? 'border-red-500' : ''}`}
                        placeholder="josegp@mail.com"
                        onPaste={preventCopyPaste}
                        onCopy={preventCopyPaste}
                    />
                    {errors.confirmEmail && (
                        <p className="text-red-500 text-sm">{errors.confirmEmail.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cell">{t('MobilePhone')} <span className='text-red-500'>*</span></Label>
                    <Input
                        id="cell"
                        type="tel"
                        aria-invalid={errors.cell ? "true" : "false"}
                        {...register('cell')}
                        className={`w-full ${errors.cell ? 'border-red-500' : ''}`}
                        placeholder="+34661234567"
                        autoComplete="off"
                    />
                    {errors.cell && (
                        <p className="text-red-500 text-sm">{errors.cell.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">{t('LandlinePhone')}</Label>
                    <Input
                        id="phone"
                        type="tel"
                        aria-invalid={errors.phone ? "true" : "false"}
                        {...register('phone')}
                        className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+34931234567"
                        autoComplete="off"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="companyName">{t('CompanyName')} <span className={cn('text-red-500',
                        userType === 'empresa' ? '' : 'hidden'
                    )}>*</span></Label>
                    <Input
                        id="companyName"
                        type="text"
                        aria-invalid={errors.companyName ? "true" : "false"}
                        {...register('companyName')}
                        className={`w-full ${errors.companyName ? 'border-red-500' : ''}`}
                        placeholder="Grupo Pérez"
                        autoComplete="off"
                    />
                    {errors.companyName && (
                        <p className="text-red-500 text-sm">{errors.companyName.message}</p>
                    )}
                </div>

                <div className={cn("space-y-2",
                    userType === 'empresa' ? '' : 'hidden'
                )}>
                    <Label htmlFor="nombreComercial">{t('CommercialName')}
                        {/* <span className={cn('text-red-500',
                        )}>*</span> */}
                    </Label>
                    <Input
                        id="nombreComercial"
                        type="text"
                        aria-invalid={errors.nombreComercial ? "true" : "false"}
                        {...register('nombreComercial')}
                        className={`w-full ${errors.nombreComercial ? 'border-red-500' : ''}`}
                        placeholder="Ferretería Pérez"
                        autoComplete="off"
                    />
                    {errors.nombreComercial && (
                        <p className="text-red-500 text-sm">{errors.nombreComercial.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">{t('Address')} <span className='text-red-500'>*</span></Label>
                    <Input
                        id="address"
                        type="text"
                        aria-invalid={errors.address ? "true" : "false"}
                        {...register('address')}
                        className={`w-full ${errors.address ? 'border-red-500' : ''}`}
                        placeholder="Calle de la Paz, 12"
                        autoComplete="off"
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-gray-700 dark:text-slate-500">{t('ZipCode')} <span className='text-red-500'>*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="zipCode"
                            {...register('zipCode', {
                                onChange: (e) => handleZipCodeChange(e.target.value)
                            })}
                            placeholder="08001"
                            className={`border-gray-300 ${errors.zipCode ? 'border-red-500' : ''}`}
                            autoComplete="off"
                        />
                        {isValidating && (
                            <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                        )}
                    </div>
                    {errors.zipCode && (
                        <p className="text-sm text-red-500">{errors.zipCode.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="city">{t('City')} <span className='text-red-500'>*</span></Label>
                    <div className="relative">
                        <Input
                            id="city"
                            {...register('city', {
                                onChange: (e) => handleZipCodeChange(e.target.value)
                            })}
                            placeholder="Barcelona"
                            className={`border-gray-300 ${errors.city ? 'border-red-500' : ''}`}
                            autoComplete="off"
                        />
                        {isValidating && (
                            <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-gray-400" />
                        )}
                    </div>
                    {errors.city && (
                        <p className="text-sm text-red-500">{errors.city.message}</p>
                    )}
                </div>

                <div className="space-y-2 hidden">
                    <Label htmlFor="province">{t('Province')} <span className='text-red-500'>*</span></Label>
                    <Input
                        id="province"
                        type="text"
                        aria-invalid={errors.province ? "true" : "false"}
                        {...register('province')}
                        className={`w-full ${errors.province ? 'border-red-500' : ''}`}
                        placeholder="Barcelona"
                        autoComplete="off"
                    />
                    {errors.province && (
                        <p className="text-red-500 text-sm">{errors.province.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="password">{t('Password')} <span className='text-red-500'>*</span></Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            aria-invalid={errors.password ? "true" : "false"}
                            {...register('password')}
                            className={`w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
                            placeholder="********"
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            aria-label={showPassword ? t('HidePassword') : t('ShowPassword')}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('ConfirmPassword')} <span className='text-red-500'>*</span></Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
                            {...register('confirmPassword')}
                            className={`w-full pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            placeholder="********"
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            aria-label={showConfirmPassword ? t('HidePassword') : t('ShowPassword')}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <p className="text-sm text-gray-500">{t('RequiredFields')}</p>

            <Button
                type="submit"
                className="w-full dark:bg-sky-800 hover:dark:bg-sky-900 dark:text-sky-100 bg-blue-500 hover:bg-blue-600 add-business-submit"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {t('CreatingAccount')}
                    </div>
                ) : (
                    t('CreateAccount')
                )}
            </Button>
        </form>
    );
};

export default RegisterForm;