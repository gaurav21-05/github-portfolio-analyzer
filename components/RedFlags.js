"use client";
import { AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/Card";
import { cn } from "../lib/utils";

export default function RedFlags({ flags }) {
    if (!flags || flags.length === 0) {
        return (
            <Card className="h-full flex flex-col justify-center items-center text-center p-8 bg-emerald-50/30 border-emerald-100">
                <div className="bg-emerald-100 p-4 rounded-full mb-4 ring-4 ring-emerald-50 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">All Clear!</h3>
                <p className="text-gray-500 text-sm">
                    No major issues detected. Keep up the great work!
                </p>
            </Card>
        );
    }

    const getStyle = (type) => {
        if (type === "critical") return "bg-rose-50 border-rose-100 text-rose-900 hover:border-rose-200";
        return "bg-amber-50 border-amber-100 text-amber-900 hover:border-amber-200";
    };

    const getIcon = (type) => {
        if (type === "critical") return <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
        return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
    };

    return (
        <Card className="h-full border-rose-100 bg-gradient-to-br from-white to-rose-50/20">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                    <AlertTriangle className="w-5 h-5" />
                </div>
                Attention Needed
            </h3>
            <div className="space-y-3">
                {flags.map((flag, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-start p-4 rounded-xl border transition-all duration-300 hover:shadow-md cursor-default",
                            getStyle(flag.type)
                        )}
                    >
                        <div className="mt-0.5 mr-3 p-1.5 bg-white/60 rounded-full shadow-sm">
                            {getIcon(flag.type)}
                        </div>
                        <div>
                            <p className="font-semibold text-sm leading-snug">{flag.message}</p>
                            <p className="text-xs opacity-80 mt-1 uppercase tracking-wider font-bold">
                                {flag.impact} Impact • {flag.type === "critical" ? "Fix Immediately" : "Improve Soon"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
