import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const APIURL = import.meta.env.VITE_API_URL || '';

export const useCustomerSearch = (apiURL = '') => {
    const { toast } = useToast();

    // Estado unificado para la búsqueda
    const [searchValue, setSearchValue] = useState('');
    const [detectedType, setDetectedType] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const [customerID, setCustomerID] = useState(null);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [fetchingCustomer, setFetchingCustomer] = useState(false);

    // Notice state
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [loadingNotices, setLoadingNotices] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Función para detectar automáticamente el tipo de búsqueda
    const detectSearchType = (value) => {
        const cleanValue = value.trim();
        if (!cleanValue) return '';

        const phoneRegex = /^[\d\s\-\(\)\+]{9,}$/;
        const digitsOnly = cleanValue.replace(/\D/g, '');

        if (phoneRegex.test(cleanValue) && digitsOnly.length >= 9) {
            return 'phone';
        }

        const noticeRegex = /^\d{8}$/;
        if (noticeRegex.test(cleanValue) && cleanValue.length === 8) {
            return 'notice';
        }

        const invoiceRegex = /^[A-Za-z]+-\d+$/;
        if (invoiceRegex.test(cleanValue) && cleanValue.length === 9) {
            return 'invoice';
        }

        if (/^\d+$/.test(cleanValue) && cleanValue.length >= 9) {
            return 'phone';
        }

        return 'unknown';
    };

    const fetchCustomerData = async (searchTerm, searchType) => {
        if (!apiURL) {
            console.warn('API URL not provided, using mock data');
            const mockCustomer = {
                CustomerID: 13510,
                Name: 'Juan',
                Surname: 'Pérez',
                SecondSurname: 'García',
                Email: 'juan.perez@email.com',
                Phone: '912345678',
                Cell: '654321987',
                AddressNext: '2º A',
                Address: 'Calle Mayor 123',
                ZipCode: '28001',
                City: 'Madrid',
                State: 'Madrid',
                Country: 'España',
                DNI: '12345678A',
                Alias: 'Juan P.',
                ModifiedOn: new Date().toISOString(),
                EnteredBy: 'Sistema',
                InputDate: new Date().toISOString(),
                IsSubscribed: true
            };
            setCustomerData(mockCustomer);
            setCustomerID(mockCustomer.CustomerID);
            setPhoneVerified(true);
            return;
        }

        try {
            setFetchingCustomer(true);

            let queryUrl = '';
            if (searchType === 'invoice') {
                queryUrl = `${apiURL}?invoiceNumber=${searchTerm}`;
            } else if (searchType === 'notice') {
                queryUrl = `${apiURL}?docEntry=${searchTerm}`;
            } else if (searchType === 'phone') {
                const cleanPhone = searchTerm.replace(/\D/g, '');
                queryUrl = `${apiURL}?cell=${cleanPhone}`;
            } else {
                throw new Error('Formato no reconocido');
            }

            const response = await fetch(queryUrl);
            if (!response.ok) throw new Error('Error fetching customer data');

            const data = await response.json();
            setCustomerID(data.dataCustomer?.CustomerID || null);

            if (data.dataCustomer) {
                setCustomerData(data.dataCustomer);
                setPhoneVerified(true);
            } else {
                setCustomerData(null);
                setCustomerID(null);
                setPhoneVerified(false);
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
            setCustomerData(null);
            setCustomerID(null);
            setPhoneVerified(false);
        } finally {
            setFetchingCustomer(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (!value || value.length === 0) {
            resetSearchState();
            return;
        }

        const type = detectSearchType(value);
        setDetectedType(type);

        if (type === 'phone' && value.replace(/\D/g, '').length === 9) {
            fetchCustomerData(value, 'phone');
        } else if (type === 'invoice' && value.length === 9) {
            fetchCustomerData(value, 'invoice');
        } else if (type === 'notice' && value.length === 8) {
            fetchCustomerData(value, 'notice');
        } else {
            setPhoneVerified(false);
            setCustomerData(null);
            setCustomerID(null);
        }
    };

    const resetSearchState = () => {
        setCustomerData(null);
        setCustomerID(null);
        setPhoneVerified(false);
        setNotices([]);
        setSelectedNotice(null);
        setDetectedType('');
    };

    const resetAllState = () => {
        setSearchValue('');
        setSearchQuery('');
        resetSearchState();
    };

    // Fetch notices when customer is verified
    useEffect(() => {
        const fetchNotices = async () => {
            if (!customerID || !phoneVerified) return;

            setLoadingNotices(true);
            try {
                const response = await fetch(`${APIURL}/noticeController/getNoticesByCustomerID/${customerID}`);
                if (!response.ok) throw new Error('Error fetching notices');
                const data = await response.json();

                await new Promise(resolve => setTimeout(resolve, 1000));
                setNotices(data || []);
            } catch (error) {
                console.error('Error fetching notices:', error);
                setNotices([]);
            } finally {
                setLoadingNotices(false);
            }
        };

        fetchNotices();
    }, [customerID, phoneVerified]);

    const filteredNotices = notices.filter(notice => {
        if (!searchQuery.trim()) return true;
        const docEntry = String(notice.DocEntry || '');
        return docEntry.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleSelectedNotice = (notice) => {
        setSelectedNotice(notice);
    };

    return {
        // Search state
        searchValue,
        detectedType,
        customerData,
        customerID,
        phoneVerified,
        fetchingCustomer,

        // Notice state
        notices,
        selectedNotice,
        loadingNotices,
        searchQuery,
        filteredNotices,

        // Actions
        handleSearchChange,
        handleSelectedNotice,
        setSearchQuery,
        setSelectedNotice,
        resetAllState,
        detectSearchType
    };
};