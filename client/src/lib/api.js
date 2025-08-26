const API_BASE_URL = import.meta.env.VITE_API_URL;

// export const generateQRHash = async (data, loginID) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/AuthenticatorController/generateHash`, { data, loginID });
//         console.log(response);
//         return response.data;
//     } catch (error) {
//         throw new Error("Error al generar el hash.");
//     }
// }

// export const verifyQRHash = async (hash) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/AuthenticatorController/verifyHash`, { hash });
//         // console.log(response);
//         return response.data
//     } catch (error) {
//         throw new Error("Error al verificar el hash.");
//     }
// }

// export const forceUpdateHashStatus = async (hash, status) => {
//     try {
//         const response = await axios.put(`${API_BASE_URL}/AuthenticatorController/updateHashStatus`, { hash, status });
//         console.log(response);
//         return response.data;
//     } catch (error) {
//         throw new Error("Error al actualizar el estado del hash.");
//     }
// };

export const generateQRHash = async (data, loginID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/AuthenticatorController/generateHash`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data, loginID }),
        });

        if (!response.ok) {
            throw new Error("Error al generar el hash.");
        }

        const responseData = await response.json();
        // console.log(responseData);
        return responseData;
    } catch (error) {
        throw new Error("Error al generar el hash.");
    }
};

export const verifyQRHash = async (hash) => {
    try {
        const response = await fetch(`${API_BASE_URL}/AuthenticatorController/verifyHash`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash }),
        });

        if (!response.ok) {
            throw new Error("Error al verificar el hash.");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw new Error("Error al verificar el hash.");
    }
};

export const forceUpdateHashStatus = async (hash, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/AuthenticatorController/updateHashStatus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash, status }),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el estado del hash.");
        }

        const responseData = await response.json();
        // console.log(responseData);
        return responseData;
    } catch (error) {
        throw new Error("Error al actualizar el estado del hash.");
    }
};