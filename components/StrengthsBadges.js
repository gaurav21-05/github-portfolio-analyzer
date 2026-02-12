"use client";
import { motion } from "framer-motion";
import { Award, Zap, Users, Code, PenTool, Layout } from "lucide-react";
import { Card } from "./ui/Card";
import { cn } from "../lib/utils";

const BADGE_ICONS = {
    "Consistent Committer": <Zap className="w-5 h-5" />,
    "Open Source Contributor": <Users className="w-5 h-5" />,
    "Polyglot Programmer": <Code className="w-5 h-5" />,
    "Well Documented": <PenTool className="w-5 h-5" />,
    "Community Builder": <Users className="w-5 h-5" />,
    "Project Maintainer": <Layout className="w-5 h-5" />,
};

export default function StrengthsBadges({ strengths }) {
    if (!strengths || strengths.length === 0) return null;

    return (
        <Card className="border-indigo-100 bg-gradient-to-br from-white via-indigo-50/30 to-white">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Achievements Unlocked
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {strengths.map((strength, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-shadow group"
                    >
                        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                            {BADGE_ICONS[strength] || <Award className="w-5 h-5" />}
                        </div>
                        <span className="font-semibold text-gray-700 text-sm group-hover:text-indigo-700 transition-colors">
                            {strength}
                        </span>
                    </motion.div>
                ))}
            </div>
        </Card>
    );
}
