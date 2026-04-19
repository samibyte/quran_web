# Quran Web Application - Job Interview Task

A high-performance, responsive Quran reading application built with a modern monorepo architecture. This project was developed as a technical task to demonstrate proficiency in Full-stack TypeScript development, Static Site Generation (SSG), and performant API design.

## 🚀 Tech Stack

- **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Backend**: [Hono](https://hono.dev/) (Node.js/Bun compatible)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **State Management**: React Context API (with LocalStorage persistence)
- **Monorepo Management**: [pnpm Workspaces](https://pnpm.io/workspaces)
- **Fonts**: [Next/Font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Amiri & Scheherazade New)

## ✨ Features

- [x] **Surah List Page**: Instant access to all 114 Surahs with metadata in Arabic and English.
- [x] **Ayah Detail Page**: High-readability view of verses with translation.
- [x] **Static Site Generation (SSG)**: Surah pages are pre-rendered at build time for near-instant load speeds and SEO optimization.
- [x] **Full-Text Search**: Keyword-based search across all translations.
- [x] **Settings Panel (Sidebar)**:
    - [x] Arabic Font Selection (Amiri vs. Scheherazade New)
    - [x] Dynamic Font Size adjustment for Arabic text.
    - [x] Dynamic Font Size adjustment for Translations.
    - [x] Persistent settings using `localStorage`.
- [x] **Responsive Design**: Premium dark/light themes with mobile-first layout.

## 🏗️ Architecture

The project uses a monorepo structure to share types and ensure consistency across the stack:

```text
├── backend/       # Hono API Server
├── frontend/      # Next.js Application
├── shared/        # Shared TypeScript types
├── package.json   # Workspace configuration
└── pnpm-lock.yaml # Unified lockfile
```

### Data Implementation
Instead of an external database, the application utilizes a localized JSON dataset (sourced from AlQuran.cloud API). The backend loads this data into memory at startup, providing sub-millisecond response times for API requests.

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/quran_web.git

# Install dependencies for all projects
pnpm install

# Download/Prepare Quran data (runs the normalization script)
cd backend
pnpm run download-data # Optional: if data isn't pre-bundled
```

### Running Locally
You will need to run the backend and frontend simultaneously.

```bash
# In the root directory:
pnpm --filter backend dev    # Starts API on http://localhost:3001
pnpm --filter frontend dev   # Starts Web UI on http://localhost:3000
```

## ⚡ Performance Optimization (SSG)

One of the key technical requirements was **Static Site Generation**. 
In `frontend/app/surah/[id]/page.tsx`, the `generateStaticParams` function is utilized to pre-build all 114 Surah pages. This results in:
1. **Zero Load Latency**: Pages are served as static HTML/JSON.
2. **Reliability**: The site remains functional even if the backend is temporarily unavailable (excluding search).
3. **SEO**: Crawlers receive fully rendered content immediately.

## 🎨 UI/UX Design

The application follows a "Premium Aesthetic" approach:
- **Typography**: Uses specialized Arabic fonts to ensure correct rendering of script.
- **Glassmorphism**: Subtle backdrop blurs on navigation and interactive elements.
- **Micro-interactions**: Scale animations and smooth transitions for a modern feel.
- **Responsive Harmony**: Navigation and font sizes adapt gracefully to small screens.

---

*This project was completed as part of a technical evaluation.*
