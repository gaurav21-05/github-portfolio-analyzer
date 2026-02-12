"use client";
import { AlertCircle, Info, TrendingUp, Sparkles, CheckCircle2, Clock, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { cn } from "../lib/utils";

export default function Recommendations({ recommendations }) {
    if (!recommendations || recommendations.length === 0) return null;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const getPriorityInfo = (priority) => {
        switch (priority) {
            case "High":
                return {
                    color: "text-rose-600",
                    bg: "bg-rose-50",
                    border: "border-l-rose-500",
                    icon: <AlertCircle className="w-5 h-5 text-rose-500" />
                };
            case "Medium":
                return {
                    color: "text-amber-600",
                    bg: "bg-amber-50",
                    border: "border-l-amber-500",
                    icon: <Info className="w-5 h-5 text-amber-500" />
                };
            default:
                return {
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                    border: "border-l-blue-500",
                    icon: <TrendingUp className="w-5 h-5 text-blue-500" />
                };
        }
    };

    return (
        <Card className="h-full border-indigo-100 bg-gradient-to-br from-white to-slate-50">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    Action Plan
                </h3>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {recommendations.length} items remaining
                </span>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
            >
                {recommendations.map((rec, index) => {
                    const style = getPriorityInfo(rec.priority);
                    return (
                        <motion.div
                            key={index}
                            variants={item}
                            className={cn(
                                "group relative p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4",
                                style.border
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <div className={cn("p-2 rounded-lg shrink-0", style.bg)}>
                                    {style.icon}
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold text-slate-800 text-sm md:text-base leading-relaxed">
                                            {rec.text}
                                        </p>
                                        <span className="ml-3 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg whitespace-nowrap border border-emerald-100 flex items-center gap-1">
                                            +{rec.points} pts
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                                        <span className={cn("font-bold uppercase tracking-wider", style.color)}>
                                            {rec.priority} Priority
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BarChart className="w-3 h-3" /> {rec.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> 15 mins
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </Card>
    );
}
