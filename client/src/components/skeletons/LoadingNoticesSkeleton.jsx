
export default function LoadingNoticesSkeleton() {
    return (
        <div className="space-y-4 mb-6">
            {[1, 2].map((item) => (
                <div key={item} className="relative border rounded-lg overflow-hidden transition-all duration-400 animate-pulse">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="pl-5 pr-4 py-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 mr-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                        <div>
                                            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded mt-1"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="mb-3 flex flex-col">
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 mr-1.5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                                <div className="mb-3 bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded border border-gray-100 dark:border-gray-700">
                                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                                    <div className="flex items-center">
                                        <div className="w-3.5 h-3.5 mr-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3.5 h-3.5 mr-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3.5 h-3.5 mr-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}