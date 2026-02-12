"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { Card } from "./ui/Card";
import { BarChart2 } from "lucide-react";

export default function ScoreBreakdown({ scores }) {
    const data = [
        { name: "Activity", score: scores.activity, max: 20, fill: "#3b82f6" },
        { name: "Quality", score: scores.projectQuality, max: 25, fill: "#8b5cf6" },
        { name: "Community", score: scores.community, max: 15, fill: "#ec4899" },
        { name: "Tech", score: scores.techStack, max: 15, fill: "#f97316" },
        { name: "Brand", score: scores.presentation, max: 15, fill: "#10b981" },
        { name: "Impact", score: scores.impact, max: 10, fill: "#06b6d4" },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-slate-900/90 backdrop-blur-md p-4 border border-white/10 shadow-2xl rounded-xl text-white">
                    <p className="font-bold mb-1">{label}</p>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: data.fill }}
                        />
                        <p className="text-sm font-medium">
                            {data.score} <span className="text-slate-400">/ {data.max}</span> pts
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="h-full min-h-[400px]">
            <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <BarChart2 className="w-5 h-5" />
                </div>
                Performance Breakdown
            </h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
                        barSize={24}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={100}
                            tick={{ fill: "#64748b", fontSize: 13, fontWeight: 600 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "#f1f5f9", radius: 8 }}
                        />
                        <Bar dataKey="score" radius={[0, 12, 12, 0]} background={{ fill: "#f8fafc", radius: [0, 12, 12, 0] }}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.fill}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
