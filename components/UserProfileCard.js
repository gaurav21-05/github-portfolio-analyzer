"use client";
import { ExternalLink, MapPin, Calendar, Users, Star, GitFork, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { cn } from "../lib/utils";

export default function UserProfileCard({ user }) {
    const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <Card className="p-0 overflow-hidden group border-0 ring-1 ring-white/20">
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="px-6 pb-6 relative">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4 flex justify-between items-end">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-white rounded-full opacity-50 blur-sm" />
                        <img
                            src={user.avatar_url}
                            alt={user.login}
                            className="w-32 h-32 rounded-full border-4 border-white shadow-xl relative z-10 bg-white"
                        />
                    </motion.div>

                    <a
                        href={`https://github.com/${user.login}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mb-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2"
                    >
                        <span>View Profile</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>

                {/* Info */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{user.name || user.login}</h2>
                        <p className="text-gray-500 font-medium">@{user.login}</p>
                    </div>

                    {user.bio && (
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            {user.bio}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                        {user.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{user.location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>Joined {joinDate}</span>
                        </div>
                        {user.company && (
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-gray-400" />
                                <span>{user.company}</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                            <span className="block text-xl font-bold text-gray-900">{user.followers}</span>
                            <span className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1 uppercase tracking-wider">
                                <Users className="w-3 h-3" /> Followers
                            </span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                            <span className="block text-xl font-bold text-gray-900">{user.following}</span>
                            <span className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1 uppercase tracking-wider">
                                Following
                            </span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                            <span className="block text-xl font-bold text-gray-900">{user.public_repos}</span>
                            <span className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1 uppercase tracking-wider">
                                <BookOpen className="w-3 h-3" /> Repos
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
