"use client";
import { cn } from "../lib/utils";

export function Skeleton({ className }) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-gray-200/80",
                className
            )}
        />
    );
}

export default function LoadingSkeleton() {
    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto animate-fade-in">
            {/* User Attributes Skeleton */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <Skeleton className="w-full md:w-1/3 h-[400px] rounded-2xl" />
                <div className="w-full md:w-2/3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="h-[300px] rounded-2xl" />
                        <Skeleton className="h-[300px] rounded-2xl" />
                    </div>
                    <Skeleton className="h-[200px] rounded-2xl" />
                </div>
            </div>

            {/* Detailed Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-[300px] md:col-span-2 rounded-2xl" />
                <Skeleton className="h-[300px] rounded-2xl" />
            </div>
        </div>
    );
}
