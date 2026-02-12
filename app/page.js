"use client";
import { useState } from "react";
import { Github, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnalysisForm from "../components/AnalysisForm";
import ScoreDisplay from "../components/ScoreDisplay";
import ScoreBreakdown from "../components/ScoreBreakdown";
import Recommendations from "../components/Recommendations";
import RedFlags from "../components/RedFlags";
import LoadingSkeleton from "../components/LoadingSkeleton";
import UserProfileCard from "../components/UserProfileCard";
import TopRepositories from "../components/TopRepositories";
import StrengthsBadges from "../components/StrengthsBadges";
import ScoreComparison from "../components/ScoreComparison";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (username) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze profile");
      }

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-slate-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <header className="flex flex-col items-center justify-center mb-12 text-center pt-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-6 relative group"
          >
            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity" />
            <div className="bg-white p-4 rounded-2xl shadow-xl relative z-10">
              <Github className="text-slate-900 w-12 h-12" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 drop-shadow-sm"
          >
            GitHub Portfolio Analyzer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl text-balance"
          >
            Professional insights into your engineering profile.
            <br className="hidden md:block" />
            Optimize your GitHub presence for recruiters and collaborators.
          </motion.p>
        </header>

        <AnalysisForm onAnalyze={handleAnalyze} loading={loading} />

        <AnimatePresence mode="wait">
          {loading && <LoadingSkeleton />}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md mx-auto mb-10 bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-xl flex items-center justify-center shadow-lg font-medium"
            >
              {error}
            </motion.div>
          )}

          {data && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 pb-12"
            >
              {/* Top Section: Profile & Score */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <UserProfileCard user={data.user} />
                </div>
                <div className="lg:col-span-1">
                  <ScoreDisplay score={data.totalScore} />
                </div>
              </div>

              <StrengthsBadges strengths={data.strengths} />

              {/* Main Analysis Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScoreBreakdown scores={data.scores} />
                <div className="space-y-6">
                  <RedFlags flags={data.redFlags} />
                  <ScoreComparison score={data.totalScore} />
                </div>
              </div>

              {/* Recommendations & Repos */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Recommendations recommendations={data.recommendations} />
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <TopRepositories repos={data.topRepositories} />
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
