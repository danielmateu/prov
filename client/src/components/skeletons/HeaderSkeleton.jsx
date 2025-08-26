import React from 'react';

const HeaderSkeleton = () => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow animate-pulse">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start gap-2 justify-between lg:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded hidden sm:block"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    </div>
                    <div className="flex flex-col gap-2 items-start sm:flex-row sm:items-center space-x-2">
                        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderSkeleton;