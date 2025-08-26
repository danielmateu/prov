import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const StatCardSkeleton = ({ className = "" }) => {
    return (
        <Card className={`${className} animate-pulse`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardHeader>
            <CardContent>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </CardContent>
        </Card>
    );
};

export default StatCardSkeleton;