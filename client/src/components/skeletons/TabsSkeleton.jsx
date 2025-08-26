import React from 'react';

const TabsSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Tabs list skeleton */}
            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-md flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-9 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                ))}
            </div>
        </div>
    );
};

export default TabsSkeleton;