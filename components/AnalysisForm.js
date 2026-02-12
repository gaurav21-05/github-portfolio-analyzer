"use client";
import { useState, useEffect } from "react";
import { Search, Loader2, history } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export default function AnalysisForm({ onAnalyze, loading }) {
    const [username, setUsername] = useState("");
    const [focused, setFocused] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("recentSearches");
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            const newRecent = [username, ...recentSearches.filter(u => u !== username)].slice(0, 3);
            setRecentSearches(newRecent);
            localStorage.setItem("recentSearches", JSON.stringify(newRecent));
            onAnalyze(username.trim());
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto mb-12 relative z-10">
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="relative"
            >
                <div
                    className={cn(
                        "relative flex items-center p-2 rounded-2xl bg-white/70 backdrop-blur-xl border-2 transition-all duration-300 shadow-2xl",
                        focused
                            ? "border-indigo-500/50 ring-4 ring-indigo-500/10 scale-[1.02]"
                            : "border-white/60 hover:border-white/80"
                    )}
                >
                    <Search
                        className={cn(
                            "absolute left-5 h-6 w-6 transition-colors duration-300",
                            focused ? "text-indigo-600" : "text-slate-400"
                        )}
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="Enter GitHub Username..."
                        className="w-full pl-14 pr-4 py-4 bg-transparent border-none outline-none text-slate-900 text-lg placeholder-slate-400 font-medium"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !username.trim()}
                        className={cn(
                            "ml-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center gap-2 shadow-lg",
                            loading || !username.trim()
                                ? "bg-slate-300 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 active:scale-95 shadow-indigo-500/30"
                        )}
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Analyze"}
                    </button>
                </div>
            </motion.form>

            {/* Recent Searches */}
            <AnimatePresence>
                {recentSearches.length > 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 flex justify-center items-center gap-3 text-sm text-slate-500"
                    >
                        <span>Recent:</span>
                        {recentSearches.map((user) => (
                            <button
                                key={user}
                                onClick={() => onAnalyze(user)}
                                className="px-3 py-1 rounded-full bg-white/50 hover:bg-white hover:text-indigo-600 border border-transparent hover:border-indigo-100 transition-all font-medium"
                            >
                                {user}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
