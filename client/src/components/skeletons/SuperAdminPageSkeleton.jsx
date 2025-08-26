import React from 'react';
import HeaderSkeleton from './HeaderSkeleton';
import TabsSkeleton from './TabsSkeleton';
import StatCardSkeleton from './StatCardSkeleton';
import TableSkeleton from './TableSkeleton';
// import HeaderSkeleton from './HeaderSkeleton';
// import TabsSkeleton from './TabsSkeleton';
// import StatCardSkeleton from './StatCardSkeleton';
// import TableSkeleton from './TableSkeleton';

const SuperAdminPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <HeaderSkeleton />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    <TabsSkeleton />

                    {/* Dashboard content skeleton */}
                    <div className="space-y-6">
                        {/* Stats cards skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <StatCardSkeleton className="bg-blue-50 dark:bg-blue-950" />
                            <StatCardSkeleton className="bg-amber-50 dark:bg-amber-950" />
                            <StatCardSkeleton className="bg-purple-50 dark:bg-purple-950" />
                            <StatCardSkeleton className="bg-green-50 dark:bg-green-950" />
                        </div>

                        {/* Tables skeleton */}
                        <div className="space-y-6">
                            <TableSkeleton rows={6} columns={8} title={true} actions={true} />
                            <TableSkeleton rows={4} columns={5} title={true} actions={true} />
                            <TableSkeleton rows={5} columns={6} title={true} actions={true} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SuperAdminPageSkeleton;