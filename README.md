# 🎓 Skill Verse — Skill-based LMS with Intelligent Task Planner

**Skill Verse** is a modern, skill-based Learning Management System (LMS) designed to help learners transition from basic enrollment to full competency mastery. Powered by Next.js 15, Supabase, and OpenRouter AI, it goes beyond traditional learning platforms by combining structured course delivery with a context-aware, workload-sensitive **Intelligent Task Planner** that breaks down assignments, schedules study blocks, and syncs directly to Google Calendar.

---

## 🚀 Key Features

### 👨‍💻 For Learners
*   **Skill-Based Course Tracks:** Discover and enroll in courses focused on specific skill paths, consuming structured modules and video lessons.
*   **Intelligent Task Planner:** Automatically break down complex assignments into 3-5 manageable subtasks with study timeline recommendations using LLMs.
*   **Workload-Aware AI Scheduling:** Get personalized study planning suggestions that analyze your current task lists to prevent schedule overload.
*   **Bi-directional Google Calendar Sync:** Sync your generated learning schedule as interactive calendar events with automatic reminders.
*   **AI Mock Interviews:** Build professional communications skills with interactive, speech-to-text practice interviews.
*   **Canvas LMS Integration:** Seamlessly import external university coursework and assignments directly into your planner.

### 👩‍🏫 For Educators (Skill Creators)
*   **Course Creator Suite:** Design and publish skill-focused courses with structured modules, lessons, and pricing.
*   **AI Teaching Assistant:** Leverage AI to quickly generate lesson structures, summaries, and assessments/quizzes.
*   **Student Mastery Analytics:** Monitor enrollment counts, course completion rates, and identify students who may need additional support.

---

## 🛠 Tech Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 19, Next.js 15 (App Router), Tailwind CSS (v4), Framer Motion, Lucide Icons |
| **Backend & Auth** | Next.js Server Actions, Next.js Middleware, Supabase SSR Auth (with Google OAuth) |
| **Database & Storage** | PostgreSQL, Row Level Security (RLS) policies, Supabase Storage bucket |
| **AI Engine** | OpenRouter API (Meta Llama 3.3 70B model) |
| **Testing Suite** | Vitest, Playwright, React Testing Library, jsdom |
| **Integrations** | Google Calendar API (OAuth 2.0 flow), Stripe API (checkout sessions + webhooks), Canvas API |

---

## 🧪 Software Testing Architecture (4 Core Levels)

Skill Verse implements a comprehensive 4-level automated testing architecture using **Vitest** for code-level testing and **Playwright** for browser automation.

| Level | Testing Type | Framework | Target Files / Coverage |
|---|---|---|---|
| **Level 1** | **Unit Testing** | Vitest + React Testing Library | `nbutton`, `ncard`, `ninput`, `progress` components & `file-parser` utilities |
| **Level 2** | **Integration Testing** | Vitest + jsdom | `auth-context` state propagation & `ai-task-prompt` workload aggregation logic |
| **Level 3** | **System Testing** | Playwright E2E | `system-middleware` route security redirects & landing page navigation |
| **Level 4** | **Acceptance Testing (UAT)** | Playwright E2E | `uat-user-journey` onboarding flows & dashboard loading integrity |

### ⚡ Test Execution Commands

```bash
# Run Unit & Integration tests once in terminal (Vitest)
npm run test

# Run Unit & Integration tests in continuous watch mode (auto-retests on file save)
npm run test:watch

# Run System & UAT E2E browser tests (Playwright headless)
npm run test:e2e

# Run E2E tests with the visual interactive UI debugger
npm run test:e2e:ui
```

---

## 📂 Project Structure

```
├── __tests__/                # Vitest Unit & Integration test suites
│   ├── unit/                 # Level 1: UI component and utility unit tests
│   ├── integration/          # Level 2: Auth context and AI prompt integration tests
│   └── setup.ts              # Global test environment configuration
├── tests-e2e/                # Playwright E2E System & Acceptance (UAT) test suites
│   ├── system-middleware.ts  # Level 3: Middleware security and route protection tests
│   ├── landing-navigation.ts # Level 3: Landing page link & CTA tests
│   ├── uat-user-journey.ts   # Level 4: Onboarding user journey tests
│   └── dashboard-loading.ts  # Level 4: Dashboard layout loading tests
├── app/                      # Next.js 15 App Router routes
│   ├── api/                  # Backend API routes (Stripe webhooks, AI generation, Google OAuth)
│   ├── auth/                 # Sign-in, sign-up, and role selection views & Server Actions
│   ├── educator/             # Educator course management and analytics dashboards
│   ├── learner/              # Learner dashboard, task boards, courses, and AI interviews
│   └── page.tsx              # Public-facing landing page
├── components/               # Reusable React components
│   ├── ui/                   # Custom Neobrutalism UI library (buttons, inputs, cards)
│   ├── auth-context.tsx      # Global client-side authentication context
│   └── reminder-service.tsx  # Browser-level notification dispatch system
├── hooks/                    # Speech-to-text, text-to-speech, and custom React hooks
├── lib/                      # External client setups (Stripe, Google Calendar, Canvas API)
├── utils/                    # General utility files (file parser, Supabase client/server configurations)
├── vitest.config.mjs         # Vitest test runner configuration
├── playwright.config.ts      # Playwright browser automation configuration
└── middleware.ts             # Route guard protecting educator/learner/auth routes using Supabase sessions
```

---

## ⚙️ Environment Setup

Create a `.env.local` file in the root directory and configure the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenRouter AI Configuration
OPENROUTER_API_KEY=your_openrouter_api_key

# Stripe Payment Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google OAuth & Calendar Configuration
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Canvas API Configuration (Optional)
CANVAS_API_TOKEN=your_canvas_api_token
```

---

## 🛠 Installation & Getting Started

Follow these steps to run the project and tests locally:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/skill-verse.git
    cd skill-verse
    ```

2.  **Install Dependencies (including all testing tools):**
    ```bash
    npm install
    ```

3.  **Run Database Migrations:**
    Set up the required tables inside your Supabase PostgreSQL instance. You can reference the database models defined in the code, which include tables for:
    `profiles`, `courses`, `course_sections`, `course_lessons`, `course_materials`, `enrollments`, `lesson_progress`, `learner_tasks`, `lesson_assessments`, `assessment_questions`, and `assessment_attempts`.

4.  **Run Automated Tests:**
    ```bash
    npm run test
    ```

5.  **Launch the Development Server:**
    ```bash
    npm run dev
    ```

6.  **Access the App:**
    Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔒 Security & Data Rules
*   **Role-Based Access Control (RBAC):** Next.js middleware guards dashboard paths according to the user's role ('learner' or 'educator').
*   **Row Level Security (RLS):** Supabase database queries are secured using policy definitions, ensuring data-isolation between users.
*   **Secure API Requests:** External keys (OpenRouter, Stripe, Google Client Secrets) are stored securely on the server-side and never exposed to the client.


