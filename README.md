# 🚀 GitHub Portfolio Analyzer

<div align="center">

![GitHub Portfolio Analyzer](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Analyze GitHub profiles and get actionable insights from a recruiter's perspective**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Scoring System](#-scoring-system) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Scoring System](#-scoring-system)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

---

## 🎯 About

**GitHub Portfolio Analyzer** is a powerful web application designed to help students and developers improve their GitHub portfolios from a recruiter's perspective. It analyzes your GitHub profile, evaluates your projects, and provides actionable recommendations to make your portfolio stand out.

### Why Use This Tool?

- 📊 **Data-Driven Insights**: Get a comprehensive 0-100 score based on 6 key metrics
- 🎯 **Recruiter's Perspective**: See what hiring managers actually look for
- ✅ **Actionable Recommendations**: Receive prioritized suggestions for improvement
- 🚩 **Red Flag Detection**: Identify issues that might hurt your chances
- 📈 **Track Progress**: Monitor your improvement over time

---

## ✨ Features

### Core Features

- **🔍 Profile Analysis**
  - Comprehensive GitHub profile evaluation
  - Repository quality assessment
  - Contribution pattern analysis
  - Technology stack diversity check

- **📊 Portfolio Scoring (0-100)**
  - Activity & Consistency (20 points)
  - Project Quality (25 points)
  - Community Engagement (15 points)
  - Tech Stack Diversity (15 points)
  - Portfolio Presentation (15 points)
  - Real-World Impact (10 points)

- **💡 Smart Recommendations**
  - Prioritized action items (High/Medium/Low)
  - Estimated impact on score
  - Category-specific improvements
  - Quick-win opportunities

- **🚨 Red Flag Detection**
  - Empty or template README files
  - Abandoned projects (6+ months inactive)
  - Only forked repositories
  - No deployed/live projects
  - Generic commit messages

- **📈 Visual Insights**
  - Interactive score breakdown charts
  - Top repositories showcase
  - Strengths identification
  - User profile overview

### Advanced Features

- **🎨 Modern UI/UX**
  - Smooth animations and transitions
  - Responsive design (mobile-friendly)
  - Glassmorphism effects
  - Skeleton loaders

- **⚡ Performance Optimized**
  - Fast API responses
  - Efficient data fetching
  - Caching strategies
  - Lazy loading

---

## 🎬 Demo

### Live Demo
https://github-portfolio-analyzer-nine.vercel.app/
https://youtu.be/-TZxRVH890E

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **UI Library**: [React 18](https://react.dev/) - Component-based UI
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon set
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (optional) - Animation library

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **API Routes**: Next.js API Routes
- **GitHub API**: [Octokit](https://github.com/octokit/octokit.js) - Official GitHub API client

### Development Tools
- **Package Manager**: npm/yarn/pnpm
- **Linting**: ESLint
- **Deployment**: Vercel (recommended)

---

## 📥 Installation

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** or **pnpm**
- **GitHub Personal Access Token** (for API access)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/github-portfolio-analyzer.git
cd github-portfolio-analyzer
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add your GitHub Personal Access Token:

```env
GITHUB_TOKEN=your_github_personal_access_token_here
```

**How to get a GitHub Token:**

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Portfolio Analyzer")
4. Select scopes:
   - ✅ `public_repo` (Access public repositories)
   - ✅ `read:user` (Read user profile data)
5. Click "Generate token"
6. Copy the token and paste it in `.env.local`

### Step 4: Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Usage

### Basic Usage

1. **Enter a GitHub Username**
   - Type any public GitHub username in the search bar
   - Example: `torvalds`, `tj`, `sindresorhus`

2. **Click "Analyze"**
   - The app fetches data from GitHub API
   - Analysis takes 5-10 seconds

3. **Review Results**
   - View your overall score (0-100)
   - Explore category breakdowns
   - Check identified strengths
   - Review red flags
   - Read personalized recommendations

4. **Take Action**
   - Follow high-priority recommendations first
   - Track your progress over time
   - Re-analyze after making improvements

### Example Profiles to Try

- **Linus Torvalds**: `torvalds` (Creator of Linux)
- **TJ Holowaychuk**: `tj` (Node.js pioneer)
- **Sindre Sorhus**: `sindresorhus` (Prolific open-source contributor)
- **Your Profile**: Enter your own username!

---

## 📊 Scoring System

The scoring algorithm evaluates 6 key areas that recruiters care about:

### 1. Activity & Consistency (20 points)

Measures regular, ongoing contributions:

- ✅ Recent activity (last 6 months): 8 points
- ✅ Multiple active projects (3+): 4 points
- ✅ High activity volume (5+): 4 points
- ✅ Account maturity (1+ years): 4 points

**Why it matters**: Shows you're actively coding and learning

### 2. Project Quality (25 points)

Evaluates documentation and organization:

- ✅ Has README files: 1 point per repo
- ✅ Comprehensive README (>500 chars): +1 point
- ✅ Detailed README (>1500 chars): +1 point
- ✅ Installation/usage instructions: +0.5 points
- ✅ Good descriptions: +0.5 points

**Why it matters**: Professional documentation shows attention to detail

### 3. Community Engagement (15 points)

Tracks social proof and collaboration:

- ⭐ Stars received: Up to 9 points
- 🍴 Forks of your projects: Up to 4 points
- 👥 Followers: Up to 2 points

**Why it matters**: Indicates your work is valuable to others

### 4. Tech Stack Diversity (15 points)

Assesses breadth of technical skills:

- 💻 2+ languages: 5 points
- 💻 4+ languages: +5 points
- 💻 6+ languages: +5 points

**Why it matters**: Versatility is valued by employers

### 5. Portfolio Presentation (15 points)

Evaluates profile completeness:

- 📝 Bio: 3 points
- 🖼️ Avatar: 2 points
- 🔗 Blog/social links: 2 points
- 📍 Location: 2 points
- 📦 Has repositories (3+): 2 points
- 📦 Multiple repositories (5+): +2 points

**Why it matters**: First impressions matter to recruiters

### 6. Real-World Impact (10 points)

Identifies production-ready work:

- 🌐 Deployed projects with live URLs: 2 points per project
- 🎯 Original work (not forks): 0.5 points per project

**Why it matters**: Shows you can ship real products

### Score Interpretation

| Score Range | Rating | Meaning |
|-------------|--------|---------|
| 80-100 | 🏆 Excellent | Top-tier portfolio, recruiter-ready |
| 60-79 | 🎯 Good | Strong portfolio, minor improvements needed |
| 40-59 | ⚠️ Fair | Decent start, significant improvements recommended |
| 0-39 | 🚧 Needs Work | Major improvements required |

---

## 📚 API Documentation

### Endpoint: `/api/analyze`

#### Request

**Method**: `POST`

**Headers**:
```json
{
  "Content-Type": "application/json"
}
```

**Body**:
```json
{
  "username": "github_username"
}
```

#### Response

**Success (200)**:
```json
{
  "user": {
    "username": "torvalds",
    "name": "Linus Torvalds",
    "avatar": "https://avatars.githubusercontent.com/...",
    "bio": "Creator of Linux",
    "followers": 150000,
    "following": 0,
    "publicRepos": 8
  },
  "totalScore": 85,
  "scores": {
    "activity": 18,
    "projectQuality": 22,
    "community": 15,
    "techStack": 12,
    "presentation": 13,
    "impact": 5
  },
  "strengths": [
    "Consistent commit activity",
    "Well-documented projects",
    "Strong community engagement"
  ],
  "redFlags": [],
  "recommendations": [
    {
      "priority": "High",
      "action": "Deploy at least 2 projects and add live demo links",
      "impact": "+4 points",
      "category": "Real-World Impact"
    }
  ],
  "topRepositories": [
    {
      "name": "linux",
      "description": "Linux kernel source tree",
      "stars": 150000,
      "language": "C",
      "url": "https://github.com/torvalds/linux"
    }
  ]
}
```

**Error (400/500)**:
```json
{
  "error": "User not found: invalid_username"
}
```

---

## 📁 Project Structure

```
github-portfolio-analyzer/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.js          # API endpoint for analysis
│   ├── layout.js                 # Root layout component
│   ├── page.js                   # Main page component
│   └── globals.css               # Global styles
├── components/
│   ├── AnalysisForm.js           # Search input form
│   ├── ScoreDisplay.js           # Score visualization
│   ├── ScoreBreakdown.js         # Category breakdown chart
│   ├── Recommendations.js        # Improvement suggestions
│   ├── RedFlags.js               # Warning display
│   └── (additional components)   # Enhanced UI components
├── lib/
│   └── github.js                 # GitHub API client functions
├── utils/
│   └── scoring.js                # Scoring algorithms
├── public/                       # Static assets
├── .env.local                    # Environment variables (not committed)
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # This file
```

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required
GITHUB_TOKEN=your_github_personal_access_token

# Optional (for production)
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

**Security Notes**:
- ⚠️ Never commit `.env.local` to version control
- ⚠️ Keep your GitHub token private
- ⚠️ Rotate tokens regularly
- ⚠️ Use environment variables in deployment platform

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `GITHUB_TOKEN`
   - Click "Deploy"

3. **Done!** Your app is live 🎉

### Deploy to Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment variables**
   - Add `GITHUB_TOKEN` in Netlify dashboard

### Deploy to Other Platforms

The app can be deployed to:
- Railway
- Render
- Heroku
- AWS Amplify
- DigitalOcean App Platform

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/github-portfolio-analyzer/issues)
2. If not, [create a new issue](https://github.com/yourusername/github-portfolio-analyzer/issues/new)
3. Provide detailed information:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)

### Suggesting Features

1. Check [existing feature requests](https://github.com/yourusername/github-portfolio-analyzer/issues?q=is%3Aissue+label%3Aenhancement)
2. Create a new issue with the `enhancement` label
3. Describe the feature and its benefits

### Pull Requests

1. **Fork the repository**
2. **Create a new branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Write clear commit messages
- Add comments for complex logic
- Test on multiple screen sizes
- Update documentation if needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **GitHub API** - For providing comprehensive developer data
- **Octokit** - Excellent GitHub API client library
- **Next.js Team** - Amazing React framework
- **Vercel** - Seamless deployment platform
- **Tailwind CSS** - Beautiful utility-first CSS framework
- **Recharts** - Powerful charting library
- **Lucide Icons** - Clean and consistent icon set

### Inspiration

This project was inspired by the need to help developers and students improve their GitHub profiles to stand out to recruiters and hiring managers.

---

## 📧 Contact

**Project Maintainer**: [Your Name]

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

**Project Link**: [https://github.com/yourusername/github-portfolio-analyzer](https://github.com/yourusername/github-portfolio-analyzer)

---

## 🌟 Star History

If you find this project helpful, please consider giving it a ⭐️ on GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/github-portfolio-analyzer&type=Date)](https://star-history.com/#yourusername/github-portfolio-analyzer&Date)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/github-portfolio-analyzer?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/github-portfolio-analyzer?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/github-portfolio-analyzer)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/github-portfolio-analyzer)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/github-portfolio-analyzer)

---

<div align="center">

**Made with ❤️ by developers, for developers**

[⬆ Back to Top](#-github-portfolio-analyzer)

</div>
