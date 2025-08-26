export const resetCustomerForm = (setters) => {
    const {
        // setSelectedValues,
        setFormData,
        setPhoneNumber,
        setCellNumber,
        // setModelo,
        // setModeloValue,
        // setDeviceSearchResults,
        // setIsChecked,
        // setPopoverOpen,
        // setMiliseconds,
    } = setters;

    // Reset selected values
    // setSelectedValues({
    //     proveedor: { id: "", name: "" },
    //     estado: { id: 26, name: "ASIGNADO", isRequired: true, groupID: 1 },
    //     marca: { id: "", name: "" },
    //     aparato: { id: "", name: "" },
    //     tipo: { id: "", name: "" },
    //     questions0: { id: "", name: "" },
    //     questions1: { id: "", name: "" },
    //     questions2: { id: "", name: "" },
    //     prefijo: { id: "", name: "" },
    // });

    // Reset form data
    setFormData({
        ap1: '',
        ap2: '',
        // aparato: [],
        calle: '',
        // comentarioAveria: '',
        // comentarioParaTecnico: '',
        // commentForTheTechnician: '',
        // commentOnFailure: '',
        cp: '',
        dni: '',
        email: '',
        // estado: [],
        fijo: '',
        freeTransport: false,
        // marca: [],
        // modelo: '',
        movil: '',
        nombre: '',
        piso: '',
        poblacion: '',
        // proveedor: [],
        // questions0: [],
        // questions1: [],
        // questions2: [],
        // tipo: [],
        prefijo: '',
    });

    // Reset other state values
    setPhoneNumber("");
    setCellNumber("");
    // setModelo("");
    // setModeloValue('');
    // setDeviceSearchResults([]);
    // setIsChecked(false);

    // Reset popovers
    // setPopoverOpen({
    //     proveedor: false,
    //     estado: false,
    //     marca: false,
    //     aparato: false,
    //     tipo: false,
    //     questions0: false,
    //     questions1: false,
    //     questions2: false,
    //     modelo: false,
    // });

    // Reset timer
    // setMiliseconds(0);
};