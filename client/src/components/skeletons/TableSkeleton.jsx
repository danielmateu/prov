import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// interface TableSkeletonProps {
//   rows?: number;
//   columns?: number;
//   title?: boolean;
//   actions?: boolean;
// }

const TableSkeleton = ({
    rows = 5,
    columns = 6,
    title = true,
    actions = true
}) => {
    return (
        <Card className="animate-pulse">
            <CardHeader className="pb-4">
                {title && (
                    <div className="flex items-center justify-between">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                        {actions && (
                            <div className="flex gap-2">
                                <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                            </div>
                        )}
                    </div>
                )}
                <div className="flex gap-2 mt-4">
                    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
                    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {/* Header row */}
                    <div className="grid gap-4 py-3 border-b border-gray-200 dark:border-gray-700" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                        {Array.from({ length: columns }).map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        ))}
                    </div>
                    {/* Data rows */}
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="grid gap-4 py-4 border-b border-gray-100 dark:border-gray-800" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <div key={colIndex} className="space-y-1">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    {colIndex === 0 && <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {/* Pagination skeleton */}
                {/* <div className="flex items-center justify-between pt-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    <div className="flex gap-2">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div> */}
            </CardContent>
        </Card>
    );
};

export default TableSkeleton;