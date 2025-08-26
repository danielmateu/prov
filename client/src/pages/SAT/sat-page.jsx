import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BrandCard from "@/components/brand-card";
import satData from "@/lib/satData";
import { handleFileDownload } from "@/utils/downloadUtils";
import { useViewTransition } from "@/hooks/useViewTransition";
import { ArrowLeft, ArrowUpCircle, CalendarIcon, Download, DownloadCloud, Globe, Info, Loader, Mail, Phone, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "@/components/ui/alert";
import { useTourSteps } from "@/hooks/useTourSteps";
import { useTour } from "@reactour/tour";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge";

export default function SatPage() {

    const { transition } = useViewTransition();
    const { t } = useTranslation();

    const [showScrollButton, setShowScrollButton] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    // Agregar un nuevo estado para controlar cuando mostrar el loader
    const [isLoading, setIsLoading] = useState(true);

    const steps = useTourSteps();
    const { isOpen, currentStep, setIsOpen, setCurrentStep, setSteps } = useTour()

    useEffect(() => {
        if (isOpen) {
            setSteps(steps);
        }
        setCurrentStep(0);
        document.title = 'Rapitecnic | SAT';
    }, []);

    useEffect(() => {
        if (filteredBrands.length === 0) {
            // Mostrar el loader por 3 segundos
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 3000);

            // Limpieza del temporizador si el componente se desmonta
            return () => clearTimeout(timer);
        } else {
            // Si hay marcas filtradas, no necesitamos mostrar el loader
            setIsLoading(false);
        }
    }, [filteredBrands.length]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        setFilteredBrands(
            satData.filter(brand =>
                brand.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSelectBrand = (brand) => {
        transition(() => {
            setSelectedBrand(brand);
            setCurrentStep(3);
        });
    };

    const handleBackToList = () => {
        transition(() => {
            setSelectedBrand(null);
            setCurrentStep(0);
            setIsOpen(false);
        });
        // Setear el valor de la búsqueda a vacío
        setSearchTerm('');
    };

    const isFilterActive = useMemo(() => {
        return (
            searchTerm !== '' ||
            // statusFilter !== 'all' ||
            // dateRange.from !== undefined ||
            // dateRange.to !== undefined ||
            // selectedCustomer !== null ||
            // serviceTypeFilter !== '0'
            false
        );
    }, [
        searchTerm,
        // statusFilter,
        // dateRange,
        // selectedCustomer,
        // serviceTypeFilter
    ]);

    const clearFilter = () => {
        // setSearchQuery('');
        setSearchTerm('');
        // setStatusFilter('all');
        // setDateRange({ from: undefined, to: undefined });
        // setSelectedCustomer(null);
        // setServiceTypeFilter('0');
    }

    const startTour = () => {
        setCurrentStep(0);
        setSteps(steps);
        setIsOpen(true);
    };

    return (
        <>
            <div className="min-h-screen">
                <header className="bg-white dark:bg-gray-800 shadow sat-header" data-index="0">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <div className="flex flex-col gap-0 sm:flex-row sm:gap-4">
                                {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row  justify-between items-center"> */}
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                                    {t('SATDirectory')}
                                </h1>
                                {isFilterActive && (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="mt-2 flex items-center gap-2 hover:cursor-pointer clean-filter">
                                                <Badge
                                                    onClick={clearFilter}
                                                    className="bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800 hover:text-white">
                                                    <CalendarIcon className="w-3 h-3 mr-1" />
                                                    {t('ActiveFilter')}
                                                </Badge>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                {t('ClickToClearFilter')}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={startTour}
                                    variant="gradientGlow"
                                    className="hidden sm:flex"
                                >
                                    {/* Iniciar Tour */}
                                    {t('StartTour')}
                                </Button>
                                <div className="relative sat-search">
                                    <Input
                                        type="text"
                                        placeholder={t('SearchBrand')}
                                        className="p-3 pl-10 rounded-lg text-gray-800 dark:text-slate-200"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-8">
                    {selectedBrand ? (
                        <div className="space-y-6 sat-info" style={{ viewTransitionName: 'brand-details' }}>
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center mb-6 justify-between content-transition" data-index="0">
                                        <div className="flex-shrink-0">
                                            {selectedBrand.logo ? (
                                                <img
                                                    src={selectedBrand.logo}
                                                    alt={`${selectedBrand.name} logo`}
                                                    className="aspect-auto max-w-56 object-cover rounded dark:bg-slate-200 dark:px-2 dark:py-1"
                                                    style={{ viewTransitionName: `brand-logo-${selectedBrand.id}` }}
                                                />
                                            ) : (
                                                <div
                                                    className="h-16 w-32 bg-gray-200 flex items-center justify-center mr-4 rounded"
                                                    style={{ viewTransitionName: `brand-logo-${selectedBrand.id}` }}
                                                >
                                                    {selectedBrand.name}
                                                </div>
                                            )}
                                        </div>
                                        <h2
                                            className="text-2xl font-bold hidden md:block"
                                            style={{ viewTransitionName: `brand-name-${selectedBrand.id}` }}
                                        >
                                            {selectedBrand.name}
                                        </h2>
                                        <Button
                                            variant="ghost"
                                            onClick={handleBackToList}
                                            className="transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 back-button"
                                        >
                                            <ArrowLeft size={18} className="mr-2" /> {t('BackToList')}
                                        </Button>
                                    </div>

                                    <div className="md:hidden mb-4 content-transition" data-index="0">
                                        <h2
                                            className="text-2xl font-bold"
                                            style={{ viewTransitionName: `brand-name-${selectedBrand.id}` }}
                                        >
                                            {selectedBrand.name}
                                        </h2>
                                    </div>

                                    {selectedBrand.description && (
                                        <div className="mb-6 content-transition" data-index="1">
                                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedBrand.description }} />
                                        </div>
                                    )}

                                    {selectedBrand.contacts && selectedBrand.contacts.length > 0 && (
                                        <div className="mb-6 content-transition" data-index="1">
                                            <h3 className="text-xl font-semibold mb-3 flex items-center">
                                                <Phone className="mr-2" /> {t('Contacts')}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {selectedBrand.contacts.map((contact, index) => (
                                                    <div key={index} className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                                                        {contact.name && <p className="font-semibold">{contact.name}</p>}
                                                        {contact.phone && <p className="text-sm">{contact.phone}</p>}
                                                        {contact.email && (
                                                            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline text-sm flex items-center mt-1">
                                                                <Mail className="mr-1" size={12} /> {contact.email}
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedBrand.websites && selectedBrand.websites.length > 0 && (
                                        <div className="mb-6 content-transition" data-index="2">
                                            <h3 className="text-xl font-semibold mb-3 flex items-center">
                                                <Globe className="mr-2" /> {t('Websites')}
                                            </h3>
                                            <div className="flex flex-wrap gap-3">
                                                {selectedBrand.websites.map((website, index) => (
                                                    <a
                                                        key={index}
                                                        href={website.startsWith('http') ? website : `https://${website}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-gray-50 px-4 py-2 rounded-lg text-blue-600 hover:bg-gray-100 transition"
                                                    >
                                                        {website}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedBrand.downloads && selectedBrand.downloads.length > 0 && (
                                        <div className="mb-6 content-transition" data-index="2">
                                            <h3 className="text-xl font-semibold mb-3 flex items-center">
                                                <Download className="mr-2" /> {t('Downloads')}
                                            </h3>
                                            <div className="flex flex-col gap-2">
                                                {selectedBrand.downloads.map((download, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleFileDownload(download.url, download.name)}
                                                        className="bg-gray-50 px-4 py-2 rounded-lg text-blue-600 hover:bg-gray-100 transition flex items-center cursor-pointer"
                                                    >
                                                        <DownloadCloud className="mr-2" /> {download.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <Alert
                                        variant="info"
                                        className="mb-6 content-transition"
                                    // data-index="3"
                                    // style={{ viewTransitionName: `brand-alert-${selectedBrand.id}` }}
                                    >
                                        <Info className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-blue-800 dark:text-slate-200">{t('ImportantInfo')}</h4>
                                            <p className="text-sm text-blue-700 dark:text-slate-300">
                                                {t('ImportantInfoDesc')}
                                            </p>
                                        </div>
                                    </Alert>
                                </div>
                            </div>
                            <Button
                                onClick={handleBackToList}
                                className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 group content-transition"
                                data-index="3"
                            >
                                <ArrowLeft size={18} className="mr-2 group-hover:mr-4 transition-all" /> {t('BackToList')}
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredBrands.map((brand, index) => (
                                <BrandCard
                                    key={brand.id}
                                    brand={brand}
                                    onClick={() => handleSelectBrand(brand)}
                                    index={index}
                                />
                            ))}

                            {/* {filteredBrands.length === 0 && (
                                <div className="col-span-full text-center py-12 content-transition" data-index="0">
                                    <Loader className="animate-spin h-8 w-8 text-gray-500 mx-auto mb-4" />
                                </div>
                            )} */}

                            {filteredBrands.length === 0 && (
                                <div className="col-span-full text-center py-12 content-transition" data-index="0">
                                    {isLoading ? (
                                        <>
                                            <Loader className="animate-spin h-8 w-8 text-gray-500 mx-auto mb-4" />
                                            <p className="mt-4 text-gray-600">{t("loading")}</p>
                                        </>

                                    ) : (
                                        <>
                                            <div className="text-gray-500 dark:text-gray-400">
                                                <p className="text-lg font-semibold">{t('NoSATResults')}</p>
                                                <p className="mt-2">{t('TryAnotherSearch')}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
            {showScrollButton && (
                <Button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-20 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 opacity-80"
                    aria-label={t('ScrollToTop')}
                >
                    <ArrowUpCircle className="h-6 w-6 text-white" />
                </Button>
            )}
        </>
    );
}