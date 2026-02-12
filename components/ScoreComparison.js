"use client";
import { Card } from "./ui/Card";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function ScoreComparison({ score }) {
    // Mock data for comparison
    const benchmarks = [
        { label: "Top 10% Devs", value: 90, color: "bg-emerald-500" },
        { label: "Your Score", value: score, color: "bg-indigo-600", active: true },
        { label: "Community Avg.", value: 65, color: "bg-slate-400" },
    ];

    const sortedBenchmarks = [...benchmarks].sort((a, b) => b.value - a.value);

    return (
        <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-slate-500" />
                Benchmark Comparison
            </h3>

            <div className="space-y-5">
                {sortedBenchmarks.map((item, index) => (
                    <div key={index} className="space-y-1.5">
                        <div className="flex justify-between text-sm font-medium">
                            <span className={item.active ? "text-indigo-700 font-bold" : "text-gray-600"}>
                                {item.label}
                            </span>
                            <span className="text-gray-500">{Math.round(item.value)}</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full rounded-full ${item.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
