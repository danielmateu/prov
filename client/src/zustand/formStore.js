
import { create } from 'zustand';
import OpenAI from 'openai';

import { useUserInfoStore } from './userInfoStore';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const apiUrl = import.meta.env.VITE_API_URL;

const LeadSuppliersFetch = async () => {
    const response = await fetch(`${apiUrl}/noticeController/getLeadSuppliers`);
    const data = await response.json();
    // console.log('LeadSuppliersFetch:', data);
    return data;
}

const StatusFetch = async () => {
    const response = await fetch(`${apiUrl}/noticeController/getStatus`);
    const data = await response.json();
    // console.log('StatusFetch:', data);
    return data;
}

const BrandsFetch = async () => {
    const response = await fetch(`${apiUrl}/noticeController/getBrands`);
    const data = await response.json();
    // console.log('BrandsFetch:', data);
    return data;
}

const ApparatusFetch = async () => {
    const response = await fetch(`${apiUrl}/noticeController/getApparatus`);
    const data = await response.json();
    // console.log('ApparatusFetch:', data);
    return data;
}

const Prefixes = async () => {
    const response = await fetch(`${apiUrl}/noticeController/getPrefixes`);
    const data = await response.json();
    // console.log('Prefixes:', data);
    return data;
}

// const getZIPCodes = async (zipCode) => {
//     try {
//         const response = await fetch(`${apiUrl}/noticeController/getZIPCodes?zipCode=${zipCode}`);

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error al obtener los códigos postales:", error);
//         return null;
//     }
// };

// Axios version
// const getZIPCodes = async (zipCode) => {
//     try {
//         const response = await axios.get(`${apiUrl}/noticeController/getZIPCodes?zipCode=${zipCode}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error al obtener los códigos postales:", error);
//     }
// }
const getZIPCodes = async (zipCode) => {
    try {
        const response = await fetch(`${apiUrl}/noticeController/getZIPCodes?zipCode=${zipCode}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener los códigos postales:", error);
        return null;
    }
};

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log('fetchData:', data);
    return data;
}

const useFormStore = create((set, get) => ({
    formData: {
        ap1: '',
        ap2: '',
        aparato: [],
        calle: '',
        comentarioAveria: '',
        comentarioParaTecnico: '',
        commentForTheTechnician: '',
        commentOnFailure: '',
        cp: '',
        documentType: 'dni',
        dni: '',
        email: '',
        estado: [],
        fijo: '',
        freeTransport: false,
        marca: [],
        modelo: '',
        movil: '',
        nombre: '',
        piso: '',
        poblacion: '',
        comunidadAutonoma: '',
        pais: '',
        proveedor: [],
        questions0: [],
        questions1: [],
        questions2: [],
        tipo: [],
        lat: null,
        lng: null,
        InvoicingAddressID: null,
        DeliveryAddressID: null,
    },
    selectedValues: {
        proveedor: { id: "", name: "" },
        estado: { id: 26, name: "ASIGNADO", isRequired: true, groupID: 1 },
        marca: { id: "", name: "" },
        aparato: { id: "", name: "" },
        tipo: { id: "", name: "" },
        questions0: { id: "", name: "" },
        questions1: { id: "", name: "" },
        questions2: { id: "", name: "" },
        prefijo: { id: "", name: "" },
    },
    customerData: null,
    messages: [],
    isLoading: false,
    dialogOpen: false,
    selectedTechnician: '',
    timeSlot: '',
    selectedSlot: '',
    parsedAddress: null,
    phoneNumber: '',
    isDgsrcpChecked: false,
    isPossibleSale: false,
    isWhatsAppSelected: false,
    clientRequestStart: '',
    clientRequestEnd: '',
    isAssignedToLogistics: false,
    selectedDate: new Date(),
    // Resetea los valores del formulario a sus valores iniciales
    resetFormData: () => set({
        formData: {
            ap1: '',
            ap2: '',
            aparato: [],
            calle: '',
            comentarioAveria: '',
            comentarioParaTecnico: '',
            commentForTheTechnician: '',
            commentOnFailure: '',
            cp: '',
            dni: '',
            email: '',
            estado: [],
            fijo: '',
            freeTransport: false,
            marca: [],
            modelo: '',
            movil: '',
            nombre: '',
            piso: '',
            poblacion: '',
            proveedor: [],
            questions0: [],
            questions1: [],
            questions2: [],
            tipo: [],
            lat: null,
            lng: null,
        },
    }),

    totalPoints: 0,
    setDialogOpen: (open) => set({ dialogOpen: open }),
    setCustomerData: (data) => set({ customerData: data }),
    setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
    setSelectedValues: (data) => set((state) => ({ selectedValues: { ...state.selectedValues, ...data } })),
    setSelectedDate: (date) => set({ selectedDate: date }),
    setSelectedTechnician: (technician) => set({ selectedTechnician: technician }),
    setTimeSlot: (slot) => set({ timeSlot: slot }),
    setSelectedSlot: (slot) => set({ selectedSlot: slot }),
    setIsDgsrcpChecked: (checked) => set({ isDgsrcpChecked: checked }),
    setIsPossibleSale: (checked) => set({ isPossibleSale: checked }),
    setIsWhatsAppSelected: (selected) => set({ isWhatsAppSelected: selected }),
    setClientRequestStart: (start) => set({ clientRequestStart: start }),
    setClientRequestEnd: (end) => set({ clientRequestEnd: end }),
    setIsAssignedToLogistics: (assigned) => set({ isAssignedToLogistics: assigned }),
    setTotalPoints: (points) => set({ totalPoints: points }),
    setParsedAddress: (address) => set({ parsedAddress: address }),
    setPhoneNumber: (number) => set({ phoneNumber: number }),
    resetFormData: () => set({
        formData: {
            // proveedor: [],
            // estado: [],
            // marca: [],
            // aparato: [],
            // tipo: [],
            // questions0: [],
            // questions1: [],
            // questions2: [],
            modelo: '',
            movil: '',
            fijo: '',
            freeTransport: false,
            comentarioAveria: '',
            comentarioParaTecnico: '',
            commentOnFailure: '',
            commentForTheTechnician: '',
        },
        selectedValues: {
            proveedor: { id: "", name: "" },
            estado: { id: 26, name: "ASIGNADO", isRequired: true, groupID: 1 },
            marca: { id: "", name: "" },
            aparato: { id: "", name: "" },
            tipo: { id: "", name: "" },
            questions0: { id: "", name: "" },
            questions1: { id: "", name: "" },
            questions2: { id: "", name: "" },
            prefijo: { id: "", name: "" },
        },
        customerData: null,
        messages: [],
        isLoading: false,
        dialogOpen: false,
        selectedDate: new Date(),
        selectedTechnician: '',
        timeSlot: '',
    }),
    resetCustomerData: () => set({
        customerData: null,
        formData: {
            nombre: '',
            ap1: '',
            ap2: '',
            dni: '',
            email: '',
            calle: '',
            piso: '',
            poblacion: '',
            cp: '',
            fijo: '',
            movil: '',
            CustomerID: null,
            DeliveryAddressID: null
        }
    }),
    fetchAllData: async () => {
        try {
            const [leadSuppliers, status, brands, apparatus, prefixes] = await Promise.all([
                LeadSuppliersFetch(),
                StatusFetch(),
                BrandsFetch(),
                ApparatusFetch(),
                Prefixes()
            ]);

            set((state) => ({
                formData: {
                    ...state.formData,
                    proveedor: leadSuppliers || [],
                    estado: status || [],
                    marca: brands || [],
                    aparato: apparatus || [],
                    prefijo: prefixes || [],
                }
            }));

            // console.log({ status });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    // fetchCustomerData: async (phone = null) => {
    //     if (!phone) {
    //         return `El número de teléfono es obligatorio`;
    //     }

    //     try {
    //         const response = await fetch(`${apiUrl}/noticeController/getDataCustomer?cell=${phone}`);

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         const { dataCustomer, deliveryAddress } = data;

    //         if (data && Object.keys(data).length > 0) {
    //             set((state) => ({
    //                 formData: {
    //                     ...state.formData,
    //                     nombre: dataCustomer?.Name,
    //                     ap1: dataCustomer?.Surname,
    //                     ap2: dataCustomer?.SecondSurname,
    //                     dni: dataCustomer?.DNI,
    //                     email: dataCustomer?.Email,
    //                     calle: dataCustomer?.Address,
    //                     piso: dataCustomer?.AddressNext,
    //                     poblacion: dataCustomer?.City,
    //                     cp: dataCustomer?.ZipCode,
    //                     fijo: dataCustomer?.Phone,
    //                     movil: dataCustomer?.Cell,
    //                     coordenadas: dataCustomer?.Coordinates,
    //                     CustomerID: deliveryAddress?.CustomerID,
    //                     DeliveryAddressID: deliveryAddress?.DeliveryAddressID
    //                 },
    //                 customerData: dataCustomer,
    //                 deliveryAddress: deliveryAddress,
    //             }));
    //             return;
    //         }

    //         // Si data es un objeto vacío, mostrar un mensaje de error
    //         set((state) => ({
    //             formData: {
    //                 ...state.formData,
    //                 nombre: '',
    //                 ap1: '',
    //                 ap2: '',
    //                 dni: '',
    //                 email: '',
    //                 calle: '',
    //                 piso: '',
    //                 poblacion: '',
    //                 cp: '',
    //                 fijo: '',
    //                 movil: '',
    //                 CustomerID: null,
    //                 DeliveryAddressID: null
    //             },
    //             customerData: null,
    //             deliveryAddress: null,
    //         }));

    //         return `Cliente no encontrado`;

    //     } catch (error) {
    //         console.error("Error al obtener los datos del cliente:", error);
    //         toast({
    //             variant: "destructive",
    //             title: `Cliente no encontrado`,
    //             description: `Parece que ha ocurrido un error al obtener los datos del cliente.`,
    //         });
    //     }
    // },
    //   Axios version
    // fetchCustomerData: async (phone = null) => {

    //     if (!phone) {
    //         return `El número de teléfono es obligatorio`;
    //     }

    //     try {
    //         const response = await axios.get(`${apiUrl}/noticeController/getDataCustomer?cell=${phone}`);
    //         if (response.status === 200) {
    //             const data = response.data;
    //             const { dataCustomer, deliveryAddress } = data;

    //             if (data) {
    //                 set((state) => ({
    //                     formData: {
    //                         ...state.formData,
    //                         nombre: dataCustomer?.Name,
    //                         ap1: dataCustomer?.Surname,
    //                         ap2: dataCustomer?.SecondSurname,
    //                         dni: dataCustomer?.DNI,
    //                         email: dataCustomer?.Email,
    //                         calle: dataCustomer?.Address,
    //                         piso: dataCustomer?.AddressNext,
    //                         poblacion: dataCustomer?.City,
    //                         cp: dataCustomer?.ZipCode,
    //                         fijo: dataCustomer?.Phone,
    //                         movil: dataCustomer?.Cell,
    //                         coordenadas: dataCustomer?.Coordinates,
    //                         CustomerID: deliveryAddress?.CustomerID,
    //                         DeliveryAddressID: deliveryAddress?.DeliveryAddressID
    //                     },
    //                     customerData: dataCustomer,
    //                     deliveryAddress: deliveryAddress,
    //                 }));
    //             }

    //             // Si data es un objeto vacío, mostrar un mensaje de error
    //             if (Object.keys(data).length === 0) {
    //                 // console.log("Cliente no encontrado, debemos crear uno nuevo");
    //                 // Seteamos
    //                 set((state) => ({
    //                     formData: {
    //                         ...state.formData,
    //                         nombre: '',
    //                         ap1: '',
    //                         ap2: '',
    //                         dni: '',
    //                         email: '',
    //                         calle: '',
    //                         piso: '',
    //                         poblacion: '',
    //                         cp: '',
    //                         fijo: '',
    //                         movil: '',
    //                         CustomerID: null,
    //                         DeliveryAddressID: null
    //                     },
    //                     customerData: null,
    //                     deliveryAddress: null,
    //                 }));

    //                 return `Cliente no encontrado`;
    //             }

    //         } else {
    //             console.log("Error HTTP: " + response.status);
    //             toast({
    //                 variant: "destructive",
    //                 title: `Cliente no encontrado`,
    //                 description: `Parece que ha ocurrido un error al obtener los datos del cliente.`,
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error al obtener los datos del cliente:", error);
    //     }
    // },
    fetchCustomerData: async (phone = null) => {
        if (!phone) {
            return `El número de teléfono es obligatorio`;
        }

        try {
            const response = await fetch(`${apiUrl}/noticeController/getDataCustomer?cell=${phone}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log({ data });
            const { dataCustomer, deliveryAddress } = data;

            if (data && Object.keys(data).length > 0) {
                set((state) => ({
                    formData: {
                        ...state.formData,
                        nombre: dataCustomer?.Name,
                        ap1: dataCustomer?.Surname,
                        ap2: dataCustomer?.SecondSurname,
                        dni: dataCustomer?.DNI,
                        email: dataCustomer?.Email,
                        calle: dataCustomer?.Address,
                        piso: dataCustomer?.AddressNext,
                        poblacion: dataCustomer?.City,
                        cp: dataCustomer?.ZipCode,
                        fijo: dataCustomer?.Phone,
                        movil: dataCustomer?.Cell,
                        coordenadas: dataCustomer?.Coordinates,
                        CustomerID: deliveryAddress?.CustomerID,
                        DeliveryAddressID: deliveryAddress?.DeliveryAddressID
                    },
                    customerData: dataCustomer,
                    deliveryAddress: deliveryAddress,
                }));
                return;
            }

            // Si data es un objeto vacío, mostrar un mensaje de error
            set((state) => ({
                formData: {
                    ...state.formData,
                    nombre: '',
                    ap1: '',
                    ap2: '',
                    dni: '',
                    email: '',
                    calle: '',
                    piso: '',
                    poblacion: '',
                    cp: '',
                    fijo: '',
                    movil: '',
                    CustomerID: null,
                    DeliveryAddressID: null
                },
                customerData: null,
                deliveryAddress: null,
            }));

            return `Cliente no encontrado`;

        } catch (error) {
            console.error("Error al obtener los datos del cliente:", error);
            toast({
                variant: "destructive",
                title: `Cliente no encontrado`,
                description: `Parece que ha ocurrido un error al obtener los datos del cliente.`,
            });
        }
    },
    fetchCustomerDataByCustomerID: async (customerID) => {
        try {
            const response = await fetch(`${apiUrl}/noticeController/getDataCustomerByCustomerID?customerId=${customerID}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const { dataCustomer, deliveryAddress } = data;

            if (data && Object.keys(data).length > 0) {
                set((state) => ({
                    formData: {
                        ...state.formData,
                        nombre: dataCustomer?.Name,
                        ap1: dataCustomer?.Surname,
                        ap2: dataCustomer?.SecondSurname,
                        dni: dataCustomer?.DNI,
                        email: dataCustomer?.Email,
                        calle: dataCustomer?.Address,
                        piso: dataCustomer?.AddressNext,
                        poblacion: dataCustomer?.City,
                        cp: dataCustomer?.ZipCode,
                        fijo: dataCustomer?.Phone,
                        movil: dataCustomer?.Cell,
                        coordenadas: dataCustomer?.Coordinates,
                        CustomerID: deliveryAddress?.CustomerID,
                        DeliveryAddressID: deliveryAddress?.DeliveryAddressID
                    },
                    customerData: dataCustomer,
                    deliveryAddress: deliveryAddress,
                }));
                return;
            }

            // Si data es un objeto vacío, mostrar un mensaje de error
            set((state) => ({
                formData: {
                    ...state.formData,
                    nombre: '',
                    ap1: '',
                    ap2: '',
                    dni: '',
                    email: '',
                    calle: '',
                    piso: '',
                    poblacion: '',
                    cp: '',
                    fijo: '',
                    movil: '',
                    CustomerID: null,
                    DeliveryAddressID: null
                },
                customerData: null,
                deliveryAddress: null,
            }));

            return `Cliente no encontrado`;

        } catch (error) {
            console.error("Error al obtener los datos del cliente:", error);
            toast({
                variant: "destructive",
                title: `Cliente no encontrado`,
                description: `Parece que ha ocurrido un error al obtener los datos del cliente.`,
            });
        }
    },
    // Axios version
    // fetchCustomerDataByCustomerID: async (customerID) => {

    //     // console.log(customerID);
    //     try {
    //         const response = await axios.get(`${apiUrl}/noticeController/getDataCustomerByCustomerID?customerId=${customerID}`);

    //         // console.log(response);
    //         if (response.status === 200) {
    //             const data = response.data;
    //             const { dataCustomer, deliveryAddress } = data;

    //             if (data) {
    //                 set((state) => ({
    //                     formData: {
    //                         ...state.formData,
    //                         nombre: dataCustomer?.Name,
    //                         ap1: dataCustomer?.Surname,
    //                         ap2: dataCustomer?.SecondSurname,
    //                         dni: dataCustomer?.DNI,
    //                         email: dataCustomer?.Email,
    //                         calle: dataCustomer?.Address,
    //                         piso: dataCustomer?.AddressNext,
    //                         poblacion: dataCustomer?.City,
    //                         cp: dataCustomer?.ZipCode,
    //                         fijo: dataCustomer?.Phone,
    //                         movil: dataCustomer?.Cell,
    //                         coordenadas: dataCustomer?.Coordinates,
    //                         CustomerID: deliveryAddress?.CustomerID,
    //                         DeliveryAddressID: deliveryAddress?.DeliveryAddressID
    //                     },
    //                     customerData: dataCustomer,
    //                     deliveryAddress: deliveryAddress,
    //                 }));
    //             }

    //             // Si data es un objeto vacío, mostrar un mensaje de error
    //             if (Object.keys(data).length === 0) {
    //                 // console.log("Cliente no encontrado, debemos crear uno nuevo");
    //                 // Seteamos
    //                 set((state) => ({
    //                     formData: {
    //                         ...state.formData,
    //                         nombre: '',
    //                         ap1: '',
    //                         ap2: '',
    //                         dni: '',
    //                         email: '',
    //                         calle: '',
    //                         piso: '',
    //                         poblacion: '',
    //                         cp: '',
    //                         fijo: '',
    //                         movil: '',
    //                         CustomerID: null,
    //                         DeliveryAddressID: null
    //                     },
    //                     customerData: null,
    //                     deliveryAddress: null,
    //                 }));

    //                 return `Cliente no encontrado`;
    //             }

    //         } else {
    //             console.log("Error HTTP: " + response.status);
    //             toast({
    //                 variant: "destructive",
    //                 title: `Cliente no encontrado`,
    //                 description: `Parece que ha ocurrido un error al obtener los datos del cliente.`,
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error al obtener los datos del cliente:", error);
    //     }
    // },
    createNewCustomer: async () => {
        try {
            const {
                formData,
                parsedAddress,
                phoneNumber,
                createDeliveryAddress,
                createBillingAddress,
            } = get();
            // console.log({ parsedAddress });
            const user = useUserInfoStore.getState().userInfo;

            const newCustomerData = {
                movil: phoneNumber,
                telefono: formData.fijo,
                calle: parsedAddress.street,
                cp: parsedAddress.postalCode,
                dni: formData.dni,
                email: formData.email,
                nombre: formData.nombre,
                apellido1: formData.ap1,
                apellido2: formData.ap2,
                numero: parsedAddress.number,
                piso: formData.piso,
                comunidadAutonoma: formData.comunidadAutonoma,
                pais: formData.pais,
                poblacion: parsedAddress.city,
                lat: parsedAddress.lat,
                lng: parsedAddress.lng,
                enteredBy: user.LoginID || 'System',
            };

            const response = await fetch(`${apiUrl}/noticeController/createCustomer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customer: newCustomerData }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            // console.log("Customer created:", responseData);

            // Si el cliente se ha creado correctamente, creamos una nueva dirección de entrega y facturación con los datos del cliente
            if (response.ok && responseData.customerId) {
                const addressData = {
                    CustomerID: responseData.customerId,
                    Name: `${formData.nombre} ${formData.ap1} ${formData.ap2}`,
                    Email: formData.email || 'N/S',
                    street: parsedAddress.street,
                    number: parsedAddress.number,
                    floor: formData.piso,
                    postalCode: parsedAddress.postalCode,
                    city: parsedAddress.city,
                    State: parsedAddress.state,
                    Country: parsedAddress.country,
                    DNI: formData.dni || 'N/S',
                    Phone: formData.fijo || 'N/S',
                    Cell: phoneNumber,
                    Coordinates: `${parsedAddress.lat},${parsedAddress.lng}`,
                    isPrincipal: true,
                    lat: parsedAddress.lat ? parseFloat(parsedAddress.lat) : null,
                    lng: parsedAddress.lng ? parseFloat(parsedAddress.lng) : null,
                    Observation: formData.CallCenterObservation || '',
                };

                // Creamos la dirección de entrega
                await createDeliveryAddress(addressData);

                set((state) => ({
                    formData: {
                        ...state.formData,
                        CustomerID: responseData.customerId,
                    },
                }));

                return responseData;
            } else {
                throw new Error('Error al crear el cliente');
            }
        } catch (error) {
            console.error("Error al crear un nuevo cliente:", error);
        }
    },
    // Axios version
    // createNewCustomer: async () => {
    //     try {
    //         const {
    //             formData,
    //             parsedAddress,
    //             phoneNumber,
    //             createDeliveryAddress,
    //             createBillingAddress,
    //             customerData
    //         } = get();
    //         console.log({ parsedAddress });
    //         const user = useUserInfoStore.getState().userInfo;
    //         const newCustomerData = {
    //             movil: phoneNumber,
    //             telefono: formData.fijo,
    //             calle: parsedAddress.street,
    //             cp: parsedAddress.postalCode,
    //             dni: formData.dni,
    //             email: formData.email,
    //             nombre: formData.nombre,
    //             apellido1: formData.ap1,
    //             apellido2: formData.ap2,
    //             numero: parsedAddress.number,
    //             piso: formData.piso,
    //             comunidadAutonoma: formData.comunidadAutonoma,
    //             pais: formData.pais,
    //             poblacion: parsedAddress.city,
    //             lat: parsedAddress.lat,
    //             lng: parsedAddress.lng,
    //             enteredBy: user.LoginID || 'System',
    //         };
    //         // const response = await axios.post({ apiUrl } / noticeController / createCustomer, { customer: newCustomerData, });
    //         const response = await axios.post(`${apiUrl}/noticeController/createCustomer`, { customer: newCustomerData });
    //         console.log("Customer created:", response.data);
    //         // Seteamos los datos del cliente
    //         // set({ customerData: newCustomerData });

    //         // console.log(customerData);

    //         // console.log(response);
    //         // Si el cliente se ha creado correctamente, creamos una nueva dirección de entrega y facturación con los datos del cliente
    //         if (response.status === 200 && response.data.customerId) {
    //             // Preparamos los datos de la dirección
    //             // let customerFullName = `${formData.nombre} ${formData.ap1} ${formData.ap2}`;
    //             const addressData = {
    //                 CustomerID: response.data.customerId,
    //                 Name: `${formData.nombre} ${formData.ap1} ${formData.ap2}`,
    //                 Email: formData.email || 'N/S',
    //                 street: parsedAddress.street,
    //                 number: parsedAddress.number,
    //                 // street: newCustomerData.calle,
    //                 floor: formData.piso,
    //                 postalCode: parsedAddress.postalCode,
    //                 city: parsedAddress.city,
    //                 State: parsedAddress.state,
    //                 Country: parsedAddress.country,
    //                 DNI: formData.dni || 'N/S',
    //                 Phone: formData.fijo || 'N/S',
    //                 Cell: phoneNumber,
    //                 Coordinates: `${parsedAddress.lat},${parsedAddress.lng}`,
    //                 isPrincipal: true,
    //                 lat: parsedAddress.lat ? parseFloat(parsedAddress.lat) : null,
    //                 lng: parsedAddress.lng ? parseFloat(parsedAddress.lng) : null,
    //                 Observation: formData.CallCenterObservation || '',
    //             };

    //             // console.log({ addressData });

    //             // Creamos la dirección de entrega
    //             await createDeliveryAddress(addressData);
    //             // await createBillingAddress(addressData);

    //             set((state) => ({
    //                 formData: {
    //                     ...state.formData,
    //                     CustomerID: response.data.customerId,
    //                 },
    //             }));
    //             return response.data;
    //         } else {
    //             throw new Error('Error al crear el cliente');
    //         }

    //     } catch (error) {
    //         console.error("Error al crear un nuevo cliente:", error);
    //     }
    // },
    updateCustomer: async (data) => {
        console.log('updateCustomer:', data);
        try {
            // Validar que tenemos un customerId
            if (!data.customerId) {
                throw new Error('El ID del cliente es requerido');
            }

            const customerData = {
                ...data,
                // Asegurarnos de que todos los campos requeridos estén presentes
                customerId: data.customerId,
                nombre: data.nombre || '',
                apellido1: data.apellido1 || '',
                apellido2: data.apellido2 || '',
                calle: data.calle || '',
                piso: data.piso || '',
                cp: data.cp || '',
                poblacion: data.poblacion || '',
                telefono: data.telefono || '',
                movil: data.movil || '',
                email: data.email || '',
                dni: data.dni || '',
                coordenadas: data.coordenadas || '',
                deliverySameAddress: data.deliverySameAddress || false,
                invoiceSameAddress: data.invoiceSameAddress || false,
                toRecall: data.toRecall || false,
                modifiedBy: data.modifiedBy || 'System',
            };

            const response = await fetch(`${apiUrl}/noticeController/updateCustomer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customer: customerData }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData;

        } catch (error) {
            console.error("Error al actualizar los datos del cliente:", error);
            throw error;
        }
    },
    // Axios version
    // updateCustomer: async (data) => {
    //     // console.log({ data });
    //     try {
    //         // Validar que tenemos un customerId
    //         if (!data.customerId) {
    //             throw new Error('El ID del cliente es requerido');
    //         }

    //         const response = await axios.post(`${apiUrl}/noticeController/updateCustomer`, {
    //             customer: {
    //                 ...data,
    //                 // Asegurarnos de que todos los campos requeridos estén presentes
    //                 customerId: data.customerId,
    //                 nombre: data.nombre || '',
    //                 apellido1: data.apellido1 || '',
    //                 apellido2: data.apellido2 || '',
    //                 calle: data.calle || '',
    //                 piso: data.piso || '',
    //                 cp: data.cp || '',
    //                 poblacion: data.poblacion || '',
    //                 telefono: data.telefono || '',
    //                 movil: data.movil || '',
    //                 email: data.email || '',
    //                 dni: data.dni || '',
    //                 coordenadas: data.coordenadas || '',
    //                 deliverySameAddress: data.deliverySameAddress || false,
    //                 invoiceSameAddress: data.invoiceSameAddress || false,
    //                 toRecall: data.toRecall || false,
    //                 modifiedBy: data.modifiedBy || 'System',
    //             }
    //         });

    //         if (response.status === 200) {
    //             return response.data;
    //         }

    //         throw new Error(response.data.message || 'Error al actualizar el cliente');
    //     } catch (error) {
    //         console.error("Error al actualizar los datos del cliente:", error);
    //         throw error;
    //     }
    // },
    updateBillingData: async (data) => {
        console.log("updateBillingData:", data);
        try {
            // Validar que tenemos un InvoicingAddressID
            if (!data.InvoicingAddressID) {
                throw new Error('El ID de la dirección de facturación es requerido');
            }

            const response = await fetch(`${apiUrl}/noticeController/updateBillingData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    billingData: {
                        InvoicingAddressID: data.InvoicingAddressID,
                        Country: 'ESPAÑA',
                        Phone: data.Phone || '',
                        CustomerID: data.CustomerID,
                        Name: data.Name || '',
                        ZipCode: data.ZipCode || '',
                        Observation: data.observation || '',
                        Address: data.Address || '',
                        City: data.City || '',
                        AddressNext: data.AddressNext || '',
                        Cell: data.Cell || '',
                        Email: data.Email || '',
                        NIF_DNI_NIE: data.NIF_DNI_NIE || '',
                        Coordinates: data.Coordinates || '',
                        Principal: data.Principal || false,
                        ModifiedBy: data.modifiedBy || 'System',
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error("Error al actualizar los datos de facturación:", error);
            throw error;
        }
    },
    // Axios version
    // updateBillingData: async (data) => {
    //     console.log({ data });
    //     try {
    //         // Validar que tenemos un InvoicingAddressID
    //         if (!data.InvoicingAddressID) {
    //             throw new Error('El ID de la dirección de facturación es requerido');
    //         }

    //         const response = await axios.post(`${apiUrl}/noticeController/updateBillingData`, {
    //             billingData: {
    //                 InvoicingAddressID: data.InvoicingAddressID,
    //                 Country: 'ESPAÑA',
    //                 Phone: data.Phone || '',
    //                 CustomerID: data.CustomerID,
    //                 Name: data.Name || '',
    //                 ZipCode: data.ZipCode || '',
    //                 Observation: data.observation || '',
    //                 Address: data.Address || '',
    //                 City: data.City || '',
    //                 AddressNext: data.AddressNext || '',
    //                 Cell: data.Cell || '',
    //                 Email: data.Email || '',
    //                 NIF_DNI_NIE: data.NIF_DNI_NIE || '',
    //                 Coordinates: data.Coordinates || '',
    //                 Principal: data.Principal || false,
    //                 ModifiedBy: data.modifiedBy || 'System'
    //             }
    //         });

    //         if (response.status === 200) {
    //             return response.data;
    //         }

    //         throw new Error(response.data.message || 'Error al actualizar los datos de facturación');
    //     } catch (error) {
    //         console.error("Error al actualizar los datos de facturación:", error);
    //         throw error;
    //     }
    // },
    createDeliveryAddress: async (deliveryAddressData) => {
        console.log({ deliveryAddressData });
        try {
            const response = await fetch(`${apiUrl}/noticeController/createDeliveryAddress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deliveryAddress: deliveryAddressData,
                    customerID: get().formData.CustomerID,
                    customerData: get().customerData,
                    formData: get().formData,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Delivery address created:', responseData);
            console.log('Delivery address data:', deliveryAddressData);

            if (response.ok) {
                // Verificar si hay dirección de facturación
                // const billingAddressResponse = await fetch(`${apiUrl}/noticeController/getBillingAddresses?customerId=${get().formData.CustomerID}`, {
                const billingAddressResponse = await fetch(`${apiUrl}/noticeController/getBillingAddresses?customerId=${deliveryAddressData.CustomerID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!billingAddressResponse.ok) {
                    throw new Error(`HTTP error! status: ${billingAddressResponse.status}`);
                }

                const billingAddresses = await billingAddressResponse.json();
                const hasBillingAddress = billingAddresses && billingAddresses.length > 0;

                // Si no hay dirección de facturación, crear una con los mismos datos que deliveryAddress
                if (!hasBillingAddress) {
                    const billingAddressData = {
                        ...deliveryAddressData,
                        isPrincipal: true, // Aseguramos que la dirección de facturación sea principal
                    };

                    const createBillingResponse = await fetch(`${apiUrl}/noticeController/createBillingAddress`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            billingAddress: billingAddressData,
                            customerID: get().formData.CustomerID,
                            customerData: get().customerData,
                        }),
                    });

                    if (!createBillingResponse.ok) {
                        throw new Error(`HTTP error! status: ${createBillingResponse.status}`);
                    }
                }

                return responseData;
            }
        } catch (error) {
            console.error("Error al crear dirección de entrega:", error);
            throw error;
        }
    },
    // Axios version
    // createDeliveryAddress: async (deliveryAddressData) => {

    //     console.log({ deliveryAddressData });
    //     try {
    //         const response = await axios.post(
    //             `${apiUrl}/noticeController/createDeliveryAddress`,
    //             {
    //                 deliveryAddress: deliveryAddressData,
    //                 customerID: get().formData.CustomerID,
    //                 customerData: get().customerData,
    //                 formData: get().formData
    //             }
    //         );

    //         console.log(response);

    //         if (response.status === 200 || response.status === 201) {
    //             // Verificar si hay dirección de facturación
    //             const billingAddressResponse = await axios.get(`${apiUrl}/noticeController/getBillingAddresses`, {
    //                 params: {
    //                     customerId: get().formData.CustomerID
    //                 }
    //             });

    //             const billingAddresses = billingAddressResponse.data;
    //             const hasBillingAddress = billingAddresses && billingAddresses.length > 0;

    //             // Si no hay dirección de facturación, crear una con los mismos datos que deliveryAddress
    //             if (!hasBillingAddress) {
    //                 const billingAddressData = {
    //                     ...deliveryAddressData,
    //                     isPrincipal: true // Aseguramos que la dirección de facturación sea principal
    //                 };

    //                 await axios.post(
    //                     `${apiUrl}/noticeController/createBillingAddress`,
    //                     {
    //                         billingAddress: billingAddressData,
    //                         customerID: get().formData.CustomerID,
    //                         customerData: get().customerData
    //                     }
    //                 );
    //             }

    //             return response.data;
    //         }
    //     } catch (error) {
    //         console.error("Error al crear dirección de entrega:", error);
    //         throw error;
    //     }
    // },

    createBillingAddress: async (billingAddressData) => {
        console.log(billingAddressData);
        try {
            const response = await fetch(`${apiUrl}/noticeController/createBillingAddress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    billingAddress: billingAddressData,
                    customerID: get().formData.CustomerID,
                    customerData: get().customerData,
                    formData: get().formData,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (response.status === 201) {
                return data;
            }
        } catch (error) {
            console.error("Error al crear dirección de facturación:", error);
            throw error;
        }
    },
    // Axios version
    // createBillingAddress: async (billingAddressData) => {
    //     console.log(billingAddressData);
    //     try {
    //         const response = await axios.post(
    //             `${apiUrl}/noticeController/createBillingAddress`,
    //             {
    //                 billingAddress: billingAddressData,
    //                 customerID: get().formData.CustomerID,
    //                 customerData: get().customerData,
    //                 formData: get().formData
    //             }
    //         );

    //         // console.log(response);

    //         if (response.status === 201) {
    //             return response.data;
    //         }
    //     } catch (error) {
    //         console.error("Error al crear dirección de facturación:", error);
    //         throw error;
    //     }
    // },
    getDeliveryAddresses: async (customerId) => {
        try {
            const response = await fetch(`${apiUrl}/noticeController/getDeliveryAddresses?customerId=${customerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Setear en el formulario la DeliveryAddressID si Principal es true
            const defaultAddr = data.find((addr) => addr.Principal === true);
            if (defaultAddr) {
                set((state) => ({
                    formData: {
                        ...state.formData,
                        DeliveryAddressID: defaultAddr.DeliveryAddressID,
                    },
                }));
            }

            return data;
        } catch (error) {
            console.error("Error al obtener las direcciones de entrega:", error);
        }
    },
    // Axios version
    // getDeliveryAddresses: async (customerId) => {
    //     // console.log(customerId);
    //     try {
    //         const response = await axios.get(`${apiUrl}/noticeController/getDeliveryAddresses`, {
    //             params: {
    //                 customerId
    //             }
    //         });
    //         // console.log(response.data);
    //         // Setear el el form la DeliveryAddressID si Principal es true
    //         const defaultAddr = response.data.find(addr => addr.Principal === true);
    //         if (defaultAddr) {
    //             set((state) => ({
    //                 formData: {
    //                     ...state.formData,
    //                     DeliveryAddressID: defaultAddr.DeliveryAddressID
    //                 }
    //             }));
    //         }
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error al obtener las direcciones de entrega:", error);
    //     }
    // },
    getBillingAddresses: async (customerId) => {
        try {
            const response = await fetch(`${apiUrl}/noticeController/getBillingAddresses?customerId=${customerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Setear en el formulario la InvoicingAddressID si Principal es true
            const defaultAddr = data.find((addr) => addr.Principal === true);
            if (defaultAddr) {
                set((state) => ({
                    formData: {
                        ...state.formData,
                        InvoicingAddressID: defaultAddr.InvoicingAddressID,
                    },
                }));
            }

            return data;
        } catch (error) {
            console.error("Error al obtener las direcciones de facturación:", error);
        }
    },
    // Axios version
    // getBillingAddresses: async (customerId) => {
    //     // console.log(customerId);
    //     try {
    //         const response = await axios.get(`${apiUrl}/noticeController/getBillingAddresses`, {
    //             params: {
    //                 customerId
    //             }
    //         });
    //         // console.log(response.data);
    //         // Setear el el form la InvoicingAddressID si Principal es true
    //         const defaultAddr = response.data.find(addr => addr.Principal === true);
    //         if (defaultAddr) {
    //             set((state) => ({
    //                 formData: {
    //                     ...state.formData,
    //                     InvoicingAddressID: defaultAddr.InvoicingAddressID
    //                 }
    //             }));
    //         }

    //         return response.data;
    //     } catch (error) {
    //         console.error("Error al obtener las direcciones de facturación:", error);
    //     }
    // },
    deleteDeliveryAddress: async (addressId) => {
        try {
            const response = await fetch(`${apiUrl}/noticeController/deleteDeliveryAddress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ addressId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al eliminar la dirección de entrega:", error);
            throw error;
        }
    },
    // Axios version
    // deleteDeliveryAddress: async (addressId) => {
    //     try {
    //         const response = await axios.post(`${apiUrl}/noticeController/deleteDeliveryAddress`, {
    //             addressId
    //         });

    //         if (response.status === 200) {
    //             return response.data;
    //         }
    //     } catch (error) {
    //         console.error("Error al eliminar la dirección de entrega:", error);
    //         throw error;
    //     }
    // },
    deleteBillingAddress: async (addressId) => {
        try {
            const response = await fetch(`${apiUrl}/noticeController/deleteBillingAddress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ addressId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al eliminar la dirección de facturación:", error);
            throw error;
        }
    },
    // Axios version
    // deleteBillingAddress: async (addressId) => {
    //     try {
    //         const response = await axios.post(`${apiUrl}/noticeController/deleteBillingAddress`, {
    //             addressId
    //         });

    //         if (response.status === 200) {
    //             return response.data;
    //         }
    //     } catch (error) {
    //         console.error("Error al eliminar la dirección de facturación:", error);
    //         throw error;
    //     }
    // },
    fetchTipoAndQuestions: async (SelectedAparratus) => {
        try {
            // Primero limpiamos los estados
            set((state) => ({
                formData: {
                    ...state.formData,
                    tipo: [],
                    questions0: [],
                    questions1: [],
                    questions2: [],
                }
            }));

            // Luego hacemos las peticiones
            const [typeFetch, questions0Fetch, questions1Fetch, questions2Fetch] = await Promise.all([
                fetchData(`${apiUrl}/noticeController/getType?apparatusID=${SelectedAparratus}`),
                fetchData(`${apiUrl}/noticeController/getQuestions0?apparatusID=${SelectedAparratus}`),
                fetchData(`${apiUrl}/noticeController/getQuestions1?apparatusID=${SelectedAparratus}`),
                fetchData(`${apiUrl}/noticeController/getQuestions2?apparatusID=${SelectedAparratus}`),
            ]);

            // Actualizamos con los nuevos datos
            set((state) => ({
                formData: {
                    ...state.formData,
                    tipo: typeFetch || [],
                    questions0: questions0Fetch || [],
                    questions1: questions1Fetch || [],
                    questions2: questions2Fetch || [],
                }
            }));
        } catch (error) {
            console.error("Error al obtener tipos y preguntas:", error);
        }
    },
    getDeviceSearchKeywords: async (deviceSearchKeywords) => {
        try {

            const apiUrl = `/api/service/customerapi/devicesearch?devicesearchkeywords=${encodeURIComponent(deviceSearchKeywords)}&format=json&apikey=${import.meta.env.VITE_DEVICE_SEARCH_KEYWORDS_API_KEY}`;
            // const apiUrl = `https://aswoshop.aswo.com/service/customerapi/devicesearch?devicesearchkeywords=${deviceSearchKeywords}&format=json&apikey=${import.meta.env.VITE_DEVICE_SEARCH_KEYWORDS_API_KEY}`

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            // Log the response in development
            if (import.meta.env.DEV) {
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Response Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText
                });
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Try to parse the response as JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Expected JSON response but got ${contentType}`);
            }

            const data = await response.json();

            console.log('API Response Data:', data);

            // Validate the data structure
            if (typeof data !== 'object' || data === null) {
                throw new Error('Invalid data structure received from API');
            }

            return data;
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            // Return null to indicate error state
            return null;
        }
    },
    // getDeviceSearchKeywords: async (deviceSearchKeywords) => {
    //     try {
    //         const response = await fetch(`/api/service/customerapi/devicesearch?devicesearchkeywords=${deviceSearchKeywords}&format=json&apikey=${import.meta.env.VITE_DEVICE_SEARCH_KEYWORDS_API_KEY}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error("Error al obtener los datos:", error);
    //     }
    // },
    // Axios version
    // getDeviceSearchKeywords: async (deviceSearchKeywords) => {
    //     try {
    //         const res = await axios.get(`/api/service/customerapi/devicesearch?devicesearchkeywords=${deviceSearchKeywords}&format=json&apikey=${import.meta.env.VITE_DEVICE_SEARCH_KEYWORDS_API_KEY}`);
    //         return res.data;
    //     } catch (error) {
    //         console.error("Error al obtener los datos:", error);
    //     }
    // },
    handleZIPCodeSearch: async (zipCode) => {
        const data = await getZIPCodes(zipCode);
        if (data) {
            set((state) => ({
                formData: {
                    ...state.formData,
                    poblacion: data.Population,
                }
            }));
        } else {
            // console.log('Código postal incorrecto');
            set((state) => ({
                formData: {
                    ...state.formData,
                    calle: '',
                    piso: '',
                    poblacion: '',
                }
            }));
            return `Código postal ${zipCode} incorrecto`;
        }
    },
    handleIADiagnosticSubmit: async () => {
        try {
            set({ isLoading: true, dialogOpen: true });
            const { formData, selectedValues } = get();
            const userMessage = `Tengo un ${selectedValues.aparato.name} de la marca ${selectedValues.marca.name}, tipo ${selectedValues.tipo.name}. Y tengo este problema: ${formData.commentOnFailure}`;

            set((state) => ({
                messages: [...state.messages, { role: 'user', content: userMessage }]
            }));

            const completion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: userMessage }],
                model: 'gpt-3.5-turbo',
            });

            const assistantMessage = completion.choices[0]?.message?.content || 'Perdona, no he podido entender tu mensaje. ¿Podrías reformularlo?';

            set((state) => ({
                messages: [...state.messages, { role: 'assistant', content: assistantMessage }]
            }));

        } catch (error) {
            console.error('Error:', error);
            set((state) => ({
                messages: [...state.messages, {
                    role: 'assistant',
                    content: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, inténtalo de nuevo.'
                }]
            }));
        } finally {
            set({ isLoading: false });
        }
    },
    formatTime: (totalMilliseconds) => {
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
    getReasons: async () => {
        try {
            const response = await fetch(`${apiUrl}/noticeController/getReasons`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener las razones:", error);
        }
    },
    // Axios version
    // getReasons: async () => {
    //     try {
    //         const response = await axios.get(`${apiUrl}/noticeController/getReasons`);
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error al obtener las razones:", error);
    //     }
    // },
}));


export default useFormStore;