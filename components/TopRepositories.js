"use client";
import { Star, GitFork, Code2, ExternalLink } from "lucide-react";
import { Card } from "./ui/Card";
import { cn } from "../lib/utils";

export default function TopRepositories({ repos }) {
    if (!repos || repos.length === 0) return null;

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-purple-600" />
                Top Repositories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo, i) => (
                    <a
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="group block h-full"
                    >
                        <Card className="h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-purple-500">
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors break-all">
                                        {repo.name}
                                    </h4>
                                    <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                                    {repo.description || "No description provided."}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <GitFork className="w-4 h-4 text-gray-400" />
                                            {repo.forks_count}
                                        </span>
                                    </div>

                                    {repo.language && (
                                        <div className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md border border-purple-100">
                                            {repo.language}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </a>
                ))}
            </div>
        </div>
    );
}
