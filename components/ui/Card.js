"use client";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function Card({ className, children, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6",
                "hover:shadow-2xl hover:bg-white/80 transition-all duration-300",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
