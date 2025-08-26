

const apiUrl = import.meta.env.VITE_API_URL;

export const BrandsFetch = async () => {
    const response = await fetch(`${apiUrl}/noticeController/getBrands`);
    const data = await response.json();
    return data;
}

export const ApparatusFetch = async () => {
    const response = await fetch(`${apiUrl}/noticeController/getApparatus`);
    const data = await response.json();
    return data;
}

export const TypesFetch = async (apparatusId) => {
    const response = await fetch(`${apiUrl}/noticeController/getType?apparatusID=${apparatusId}`);
    const data = await response.json();
    return data;
}

// export const searchModelo = async (keywords) => {
//     if (!keywords || keywords.length < 3) return [];

//     const baseUrl = import.meta.env.PROD
//         ? 'https://aswoshop.aswo.com'
//         : '/api';

//     const apiUrl = `${baseUrl}/service/customerapi/devicesearch?devicesearchkeywords=${encodeURIComponent(keywords)}&format=json&apikey=${import.meta.env.VITE_DEVICE_SEARCH_KEYWORDS_API_KEY}`;

//     const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//     });

//     const responseText = await response.text();
//     const data = JSON.parse(responseText);
//     return Object.values(data);
// }

export const searchModelo = async (keywords) => {
    if (!keywords || keywords.length < 3) return [];

    try {
        // Use our backend proxy endpoint instead of calling ASWO API directly
        const response = await fetch(`${apiUrl}/noticeController/searchModelo?keywords=${encodeURIComponent(keywords)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : Object.values(data);
    } catch (error) {
        console.error("Error searching model:", error);
        return [];
    }
}


export const validateZipCode = async (zipCode) => {
    try {
        const response = await fetch(`${apiUrl}/noticeController/getZIPCodes?zipCode=${zipCode}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        return data
    } catch (error) {
        console.error("Error validating ZIP code:", error);
        return false;
    }
};

export async function getInvoicingAddress(email) {
    try {
        const response = await fetch(`${apiUrl}/noticeController/getEx_InvoicingAddressByEmail?email=${encodeURIComponent(email)}`);

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching invoicing address:', error);
        throw new Error(error instanceof Error ? error.message : 'Error fetching invoicing address data');
    }
}