import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DivideIcon as LucideIcon } from "lucide-react";

export default function StatCard({
    title,
    value = "0",
    description,
    icon: Icon,
    trend,
    className,
    onClick,
}) {

    // console.log('Trend:', trend);

    return (
        <Card
            className={cn(
                "transition-all duration-300",
                onClick ? "cursor-pointer hover:shadow-lg" : "",
                className
            )}
            onClick={onClick}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className="flex justify-between items-center mt-2">
                    {description && (
                        <p className="text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                    {trend && (
                        <Badge variant="outline" className={cn(
                            "ml-2",
                            trend.isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        )}>
                            {trend.isPositive ? "+" : "-"}{trend.value}%
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}