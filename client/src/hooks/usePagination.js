import { useState, useMemo } from 'react';


export function usePagination({
    data,
    itemsPerPage,
    initialPage = 1,
}) {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const totalItems = data.length;

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const canGoNext = currentPage < totalPages;
    const canGoPrev = currentPage > 1;

    return {
        currentPage,
        totalPages,
        totalItems,
        currentData,
        goToPage,
        nextPage,
        prevPage,
        canGoNext,
        canGoPrev,
    };
}