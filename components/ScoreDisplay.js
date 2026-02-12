"use client";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { cn } from "../lib/utils";

export default function ScoreDisplay({ score }) {
    const getColor = (s) => {
        if (s >= 80) return "text-emerald-500 stroke-emerald-500";
        if (s >= 60) return "text-indigo-500 stroke-indigo-500";
        if (s >= 40) return "text-amber-500 stroke-amber-500";
        return "text-rose-500 stroke-rose-500";
    };

    const getLabel = (s) => {
        if (s >= 80) return "Elite Developer";
        if (s >= 60) return "Solid Contributor";
        if (s >= 40) return "Growing Dev";
        return "Needs Polish";
    };

    const circumference = 2 * Math.PI * 50;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <Card className="flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 pointer-events-none" />

            <h3 className="text-slate-500 font-bold mb-6 uppercase tracking-widest text-xs z-10">
                Portfolio Score
            </h3>

            <div className="relative w-56 h-56 flex items-center justify-center z-10">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-100"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 2, ease: "circOut" }}
                        cx="50%"
                        cy="50%"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="transparent"
                        strokeDasharray={circumference}
                        className={cn("transition-colors duration-500", getColor(score))}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="flex flex-col items-center"
                    >
                        <span className={cn("text-7xl font-black tracking-tighter tabular-nums", getColor(score).split(" ")[0])}>
                            {Math.round(score)}
                        </span>
                        <span className="text-slate-400 text-sm font-semibold uppercase tracking-wide mt-1">
                            / 100
                        </span>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className={cn(
                    "mt-8 px-6 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm transition-all duration-300 border",
                    score >= 80 ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                        score >= 60 ? "bg-indigo-50 border-indigo-200 text-indigo-700" :
                            score >= 40 ? "bg-amber-50 border-amber-200 text-amber-700" :
                                "bg-rose-50 border-rose-200 text-rose-700"
                )}
            >
                {getLabel(score)}
            </motion.div>
        </Card>
    );
}
