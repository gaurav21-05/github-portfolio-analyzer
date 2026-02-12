import { NextResponse } from "next/server";
import {
    getByUsername,
    listForUser,
    getReadme,
    listPublicEventsForUser,
} from "../../../lib/github"; // Adjusted path
import {
    calculateActivityScore,
    calculateProjectQualityScore,
    calculateCommunityScore,
    calculateTechStackScore,
    calculatePresentationScore,
    calculateImpactScore,
    detectRedFlags,
    generateRecommendations,
} from "../../../utils/scoring"; // Adjusted path

export async function POST(request) {
    try {
        const { username } = await request.json();

        if (!username) {
            return NextResponse.json(
                { error: "Username is required" },
                { status: 400 }
            );
        }

        // 1. Fetch User Data
        const user = await getByUsername(username);
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // 2. Fetch Repositories
        const repos = await listForUser(username);
        const nonForkRepos = repos.filter((repo) => !repo.fork);

        // Sort by stars for "top repos"
        const topRepos = nonForkRepos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10);

        // 3. Fetch READMEs for Top Repos (Parallel)
        const readmePromises = topRepos.map(async (repo) => {
            const content = await getReadme(repo.owner.login, repo.name);
            return { name: repo.name, content };
        });

        const readmeResults = await Promise.all(readmePromises);
        const readmes = {};
        readmeResults.forEach((r) => {
            readmes[r.name] = r.content;
        });

        // 4. Fetch Events for Activity Score
        const publicEvents = await listPublicEventsForUser(username);

        // 5. Calculate Scores
        const activityMax = 20;
        const qualityMax = 25;
        const communityMax = 15;
        const techStackMax = 15;
        const presentationMax = 15;
        const impactMax = 10;

        const activity = calculateActivityScore(repos, user, publicEvents);
        const projectQuality = calculateProjectQualityScore(repos, readmes);
        const community = calculateCommunityScore(repos, user);
        const techStack = calculateTechStackScore(repos);
        const presentation = calculatePresentationScore(user, repos);
        const impact = calculateImpactScore(repos, readmes);

        const scores = {
            activity,
            projectQuality,
            community,
            techStack,
            presentation,
            impact,
        };

        const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

        // 6. Detect Red Flags
        const redFlags = detectRedFlags(repos, readmes);

        // 7. Generate Recommendations
        const recommendations = generateRecommendations(scores, redFlags, repos, user);

        // 8. Identify Strengths
        const strengths = [];
        if (activity >= 16) strengths.push("Consistent high activity levels");
        if (projectQuality >= 18) strengths.push("High quality documentation and project structure");
        if (community >= 12) strengths.push("Strong community engagement and following");
        if (techStack >= 12) strengths.push("Diverse technical skillset");
        if (impact >= 7) strengths.push("Projects with real-world impact and deployment");
        if (presentation >= 12) strengths.push("Professional profile presentation");

        // 9. Prepare Response
        const top3Repos = topRepos.slice(0, 3).map(repo => ({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            html_url: repo.html_url
        }));

        return NextResponse.json({
            user: {
                login: user.login,
                name: user.name,
                avatar_url: user.avatar_url,
                bio: user.bio,
                followers: user.followers,
                public_repos: user.public_repos,
                location: user.location,
                blog: user.blog,
                twitter_username: user.twitter_username
            },
            totalScore,
            scores,
            strengths,
            redFlags,
            recommendations,
            topRepositories: top3Repos,
        });

    } catch (error) {
        console.error("Analysis failed:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
