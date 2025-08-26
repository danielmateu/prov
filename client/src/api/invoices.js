
// import { Invoice } from '../types/invoice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3090';

// export const searchInvoices = async (searchTerm) => {
//     try {
//         const response = await axios.get(`${API_URL}/api/invoices/search`, {
//             params: { searchTerm }
//         });
//         console.log({ response });
//         return response.data;
//     } catch (error) {
//         console.error('Error searching invoices:', error);
//         throw error;
//     }
// }

export const searchInvoices = async (searchTerm) => {
    try {
        const response = await fetch(`${API_URL}/api/invoices/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Error searching invoices');
        }

        const data = await response.json();
        console.log({ response: data });
        return data;
    } catch (error) {
        console.error('Error searching invoices:', error);
        throw error;
    }
};