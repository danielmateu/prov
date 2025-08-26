'use client';

import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function ViewNoticeLoader() {
    return (
        <Card className="w-full max-w-6xl mx-auto my-6">
            <CardHeader className="flex flex-row justify-between items-center">
                <Skeleton className="w-40 h-10" />
                <Skeleton className="w-40 h-16" />
            </CardHeader>
            <CardContent>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        {/* <Skeleton className="h-4 w-20" /> */}
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        {/* <Skeleton className="h-4 w-16" /> */}
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                {/* Fault Data Section */}
                <div className="space-y-6 mt-6">
                    {/* <Skeleton className="h-6 w-32" /> */}

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-16" /> */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-20" /> */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-14" /> */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        {/* <Skeleton className="h-4 w-20" /> */}
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Questions */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-24" /> */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-24" /> */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-32" /> */}
                            <Skeleton className="h-32 w-full" />
                        </div>
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-36" /> */}
                            <Skeleton className="h-32 w-full" />
                        </div>
                    </div>
                </div>

                {/* Client Data Section */}
                <div className="space-y-6 mt-6">
                    {/* <Skeleton className="h-6 w-36" /> */}

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-16" /> */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-14" /> */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-8" /> */}
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </CardContent>

            {/* Provider and Status */}

            {/* Footer Actions */}
            <CardFooter className="flex justify-end gap-4">

                <div className="flex justify-end gap-4 pt-4">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </CardFooter>
        </Card>
    );
}