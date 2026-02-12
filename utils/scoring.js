
// Helper to check if a repo is a fork
const isOriginal = (repo) => !repo.fork;

// Helper to check if a repo has a description
const hasDescription = (repo) => repo.description && repo.description.length > 20;

// Helper to check for deployment URL
const hasDeployment = (repo, readme) => {
    if (repo.homepage) return true;
    if (!readme) return false;
    // Simple check for https:// links in readme context often implies deployment or docs
    // But strictly for the requirement: "detect https:// in readme/description"
    const urlRegex = /https:\/\/[^\s)]+/;
    return urlRegex.test(repo.description || "") || urlRegex.test(readme);
};

export const calculateActivityScore = (repos, user, publicEvents) => {
    let score = 0;

    // Recent activity in last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const recentEvents = publicEvents.filter(e => new Date(e.created_at) > sixMonthsAgo);

    if (recentEvents.length > 0) score += 8;
    if (recentEvents.length >= 3) score += 4;
    if (recentEvents.length >= 5) score += 4;

    // Account age > 1 year
    const created = new Date(user.created_at);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    if (created < oneYearAgo) score += 4;

    return Math.min(score, 20);
};

export const calculateProjectQualityScore = (repos, readmes) => {
    let score = 0;
    // Analyze top 10 non-fork repos
    const topRepos = repos.filter(isOriginal).slice(0, 10);

    for (const repo of topRepos) {
        let repoScore = 0;
        const readme = readmes[repo.name] || "";

        // Has README
        if (readme) {
            repoScore += 1;
            if (readme.length > 500) repoScore += 1;
            if (readme.length > 1500) repoScore += 1;

            // Installation/Usage sections
            if (/installation|usage|getting started/i.test(readme)) {
                repoScore += 0.5;
            }
        }

        // Good description
        if (hasDescription(repo)) {
            repoScore += 0.5;
        }

        score += repoScore;
    }

    return Math.min(Math.round(score), 25);
};

export const calculateCommunityScore = (repos, user) => {
    let score = 0;

    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

    if (totalStars > 5) score += 3;
    if (totalStars > 20) score += 3;
    if (totalStars > 50) score += 3;

    if (totalForks > 3) score += 2;
    if (totalForks > 10) score += 2;

    if (user.followers > 5) score += 2;

    return Math.min(score, 15);
};

export const calculateTechStackScore = (repos) => {
    let score = 0;
    const languages = new Set();

    repos.forEach(repo => {
        if (repo.language) languages.add(repo.language);
    });

    const count = languages.size;
    if (count >= 2) score += 5;
    if (count >= 4) score += 5;
    if (count >= 6) score += 5;

    return Math.min(score, 15);
};

export const calculatePresentationScore = (user, repos) => {
    let score = 0;

    if (user.bio) score += 3;
    if (user.avatar_url) score += 2;
    if (user.blog || user.twitter_username) score += 2;
    if (user.location) score += 2;

    if (repos.length > 3) score += 2;
    if (repos.length > 5) score += 2;

    return Math.min(score, 15);
};

export const calculateImpactScore = (repos, readmes) => {
    let score = 0;
    const topRepos = repos.filter(isOriginal).slice(0, 10);

    for (const repo of topRepos) {
        const readme = readmes[repo.name] || "";

        // Original work (already filtered by isOriginal, but logic implies per repo scoring)
        // "Original work (not fork): +0.5" applies to the repo being analyzed
        if (isOriginal(repo)) score += 0.5; // Redundant check if we only iterate non-forks, but safe

        // Deployment URL
        if (hasDeployment(repo, readme)) {
            score += 2;
        }
    }

    return Math.min(Math.round(score), 10);
};

export const detectRedFlags = (repos, readmes) => {
    const flags = [];
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    // 3+ repos without README
    const reposWithoutReadme = repos.filter(r => !readmes[r.name]).length;
    if (reposWithoutReadme >= 3) {
        flags.push({
            type: 'warning',
            message: `${reposWithoutReadme} repositories have no README`,
            impact: 'Medium'
        });
    }

    // 4+ repos not updated in 6 months
    const staleRepos = repos.filter(r => new Date(r.updated_at) < sixMonthsAgo).length;
    if (staleRepos >= 4) {
        flags.push({
            type: 'warning',
            message: `${staleRepos} projects haven't been updated in 6+ months`,
            impact: 'Medium'
        });
    }

    // More forks than original projects (and <3 original)
    const originalCount = repos.filter(isOriginal).length;
    const forkCount = repos.filter(r => r.fork).length;
    if (forkCount > originalCount && originalCount < 3) {
        flags.push({
            type: 'critical',
            message: 'More forked repositories than original projects',
            impact: 'High'
        });
    }

    // No deployment URLs found (check all repos)
    const anyDeployment = repos.some(r => hasDeployment(r, readmes[r.name]));
    if (!anyDeployment) {
        flags.push({
            type: 'warning',
            message: 'No deployed/live projects detected',
            impact: 'High'
        });
    }

    return flags;
};

export const generateRecommendations = (scores, flags, repos, user) => {
    const recommendations = [];

    if (scores.projectQuality < 15) {
        recommendations.push({
            priority: 'High',
            text: "Add comprehensive READMEs to your top 3 projects",
            category: 'Quality',
            points: '+7 points'
        });
    }

    if (scores.impact < 6) {
        recommendations.push({
            priority: 'High',
            text: "Deploy at least 2 projects and add live demo links",
            category: 'Impact',
            points: '+4 points'
        });
    }

    if (!user.bio) {
        recommendations.push({
            priority: 'Medium',
            text: "Add a bio to your GitHub profile",
            category: 'Presentation',
            points: '+3 points'
        });
    }

    if (scores.activity < 15) {
        recommendations.push({
            priority: 'Medium',
            text: "Commit code regularly (aim for 3-4 times per week)",
            category: 'Activity',
            points: '+5 points'
        });
    }

    if (scores.techStack < 10) {
        recommendations.push({
            priority: 'Low',
            text: "Learn and showcase projects in different languages/frameworks",
            category: 'Tech Stack',
            points: '+5 points'
        });
    }

    if (scores.community < 10) {
        recommendations.push({
            priority: 'Medium',
            text: "Contribute to open source projects or collaborate with others",
            category: 'Community',
            points: '+5 points'
        });
    }

    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};
