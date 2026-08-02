# ACCET APDS v2.0 — Comprehensive System History & Agent Context Log

> **Log Creation Date:** July 31, 2026  
> **Source Baseline:** `context.md` (Initial Context: July 28, 2026)  
> **Target Repository:** `AIPlaza/Agentic_Framework`  
> **Active Branch / Tag:** `v1.0.7-test` (Mirrors `v1.0.7`)  

> **Continual Improvement & Methodology (July 31, 2026):**
> We enforce a strict **"Brain vs. Body"** separation of concerns. `Agentic_Framework` acts as the "Brain", a pure LLM contextualization and methodology environment that never deploys to production. It holds `.agents` skills, histories, and prompts. The compiled Next.js applications (the "Body") are safely injected into deployment paths (e.g., Render pipelines) completely free of AI-specific scaffolding. This guarantees lean production environments while maximizing agent contextual awareness.

> **Design Methodology Update (August 2, 2026):**
> The "Chiaroscuro" aesthetic and the "Netflix Effect" for dark sections have been codified. Agents MUST now refer to `ACCET_Design_Manual.md` and `Dark_Mode_Components_Guide.md` located in the repository root to ensure "Divergencia 0". 
> **Correction (Aug 2):** After an agent hallucinated raw Tailwind background classes, we implemented a strict architectural constraint: The Netflix Effect is now fully encapsulated within the `<CinematicBackground />` universal React component. Agents are explicitly forbidden from manually coding background gradient stacks and must use the component.

> **Production Deployment Synchronization (July 31, 2026):**
> The `accet-app` repository (The Body) has been strictly synchronized with `Agentic_Framework` version `v1.0.7-test.1.2` (The Brain). The APDSv2 architecture was merged to `main` in `accet-app` via branch `release/v2.0-marketplace-refactor` and successfully pushed to trigger the Render production deployment.

---

## 1. System Vision & Core Objectives

The **Project Design & Active Management Suite (APDS v2.0)** is the flagship agentic software engine for the **ACCET Tokenization Platform** (AgoraLink S.A.S.).

Unlike traditional passive tokenization platforms that emit tokens and disappear, ACCET's competitive moat is **Active Management & Operational Quality Auditing**. APDS v2.0 guides Project Originators and Active Project Managers through structured onboarding, logical framework generation, RACER indicator assignment, ISO 9001 field telemetry logging, and programmatic FNVC milestone payouts audited by Independent Quality Auditors (TPA Annex VII-B).

---

## 2. Tri-Systemic Isomorphic Fusion Architecture

The framework synthesizes four core methodologies into a single state machine:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                   APDS v2.0: TRI-SYSTEMIC ISOMORPHIC FUSION ARCHITECTURE                     │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
  PASO 1: Concept       PASO 2: Mockup          PASO 3: Strategy        PASO 4: Governance &    PASO 5: Publication &
  & Onboarding           & Logical Framework     & Oracles               FNVC Payouts (TPA)      Active Monitoring
┌──────────────┐       ┌─────────────────┐      ┌────────────────┐      ┌────────────────────┐  ┌──────────────────┐
│ • PDF Upload │ ────> │ • EU Logframe   │ ───> │ • RACER        │ ───> │ • FNVC USD Link    │ ─>│ • Marketplace    │
│ • Scope      │       │   (Annex C)     │      │   Indicators   │      │ • Tolerances       │  │ • SGC Oracles    │
│   Discard IA │       │ • ISO Layout    │      │ • SGC Oracles  │      │ • TPA Annex VII-B  │  │ • Milestone      │
│ • Field      │       │ • PRINCE2 PID / │      │   (Daily BDO/  │      │ • CAR 5-Whys       │  │   Disbursement   │
│   Diagnosis  │       │   Scrum RACI    │      │   Cold Chain)  │      │   Zero-Defects     │  │   Automated      │
└──────────────┘       └─────────────────┘      └────────────────┘      └────────────────────┘  └──────────────────┘
 (AUTOMATIZATION)       (DIGITALIZATION)          (TOKENIZATION)          (SECURITIZATION)         (GAMIFICATION)
```

1. **Tech Governance (PRINCE2 + Agile Scrum)**:
   - Business Case & Project Initiation Document (PID).
   - RACI Matrix & Definition of Done (DoD).
   - Variance Tolerances: **+10% Budget** / **+15% Schedule**.
2. **Physical Quality Management (ISO 9001:2008 + TEG Field Standards)**:
   - Layouts, Planograms, and Process Maps (Clause 4.1).
   - Digital Field Instruments (Clause 8.4): Daily Operational Quality Log (BDO), Cold Chain & Storage Controls, IoT Sensor Streams.
   - Root-Cause Analysis: **5 Whys & Corrective Action Requests (CAR)** targeting a **Zero-Defects Policy** (Clause 8.5).
3. **Verification Logic & EU Grant Mechanics (FNVC / Non-Cost-Linked Financing)**:
   - EU Logical Framework (Annex C): Impact → Outcomes → Outputs → Activities.
   - Neutral RACER Indicators (Relevant, Accepted, Credible, Easy to monitor, Robust).
   - FNVC Milestone Payouts (Annex K): Yield tranches disbursed upon objective milestone verification signed by an Independent Quality Auditor (TPA Annex VII-B) without requiring financial expense invoices.
4. **Maturity Lifecycle (DEv-matrix 5x4 Roadmap)**:
   - 5 Stages: *Automatization → Digitalization → Tokenization → Securitization → Gamification* across LOGIC, DESIGN, DEFI, and 4D PATH.

---

## 3. Mandatory Protocols & Interaction Rules

Every AI agent operating within this codebase MUST adhere strictly to the following rules:

### A. Versioning & Git Protocol (`AGENTS.md`)
- **Strict Branching**: NEVER commit directly to `main` or production branches. Always work on versioned feature or test branches (e.g., `v1.0.7`, `v1.0.7-test`).
- **Semantic Versioning**: Use formal SemVer tags (`v0.1`, `v0.2`, ..., `v1.0.7`).
- **User Consent**: Ask for explicit permission before executing `git push` or `git pull`.
- **Commit Formatting**: Follow Conventional Commits (`feat:`, `fix:`, `style:`, `refactor:`).

### B. Database Safety Protocol
- **Production Supabase DB**: Connected to cloud project `ladhrrjidksmynazoybx.supabase.co`.
- **Safe Additive SQL Migrations**: NEVER run `prisma db push --accept-data-loss`. Existing tables (`auth.users`, `User`, `Tenant`, `Document`, `Signature`, `Transaction`, `profiles`) must remain intact.
- **Migration File**: Execute safe additive DDL scripts like `prisma/apds_v2_migration.sql` with `CREATE TABLE IF NOT EXISTS` and `ALTER TABLE ADD COLUMN IF NOT EXISTS`.

### C. ACCET Design System & Aesthetics (Brand Manual v1.1)
- **Typography DNA**:
  - **Display / Headlines**: `Syne` (700–900 weight, `font-syne`).
  - **System / Badges / Buttons**: `JetBrains Mono` (uppercase, tracking-widest, `font-mono`).
  - **Body / Content**: `DM Sans` (300–500 weight, `font-sans`).
- **Official Color Tokens**:
  - `Sky Blue`: `#5EC8F2` (Primary accent - 45%)
  - `Ice Blue`: `#5ED7F2` (Highlight - 3%)
  - `Teal`: `#377D8C` (Accent - 5%)
  - `Deep Base`: `#020624` / `#0D0D0D` (Backgrounds - 35%)
  - `Light Text`: `#F2F2F2` (Text - 12%)
  - `Pass Status`: `#1A7A4A` / `#10B981`
  - `Fail Status`: `#8B1A1A` / `#FF7575`
  - `Prohibited Colors`: Pure Green (e.g., `#0e7c5a`, `#10B981` unless strict status marker) is banned in UI.
- **Glassmorphism Spec**:
  - `.glass-blue-card`: `rgba(255, 255, 255, 0.03)` background fill, `backdrop-filter: blur(20px) saturate(120%)`, `border: 1px solid rgba(94, 200, 242, 0.12)`, `border-radius: 12px`.
  - `.signature-line`: Top gradient decorator line (`linear-gradient(90deg, #5EC8F2, #5ED7F2, #377D8C)`).
  - `CinematicBackground`: Video engine (`Marketplace-background.mp4`) with `vignette` and `grain` overlays for high-contrast frosted glass refracion.
- **Rules Learned**: Never use legacy classes (e.g., `.glass-platinum`) that break the Firme Digital v1.1 standard.

---

## 4. Key Work Accomplished & Milestones (`v1.0.7`)

1. **Authentication Engine Fix**:
   - Resolved infinite loading spinner by migrating `lib/supabase.ts` to `@supabase/ssr` (`createBrowserClient`).
   - Synced cookie sessions with Next.js 16 `middleware.ts` and enabled hard window navigation (`window.location.href = '/onboarding'`).
   - Fixed `app/auth/callback/route.ts` for Next.js 16 (`await cookies()`).
2. **Database Schema Initialization**:
   - Applied safe additive migration (`apds_v2_migration.sql`) to Supabase Cloud DB.
   - Created tables: `projects`, `logical_frameworks`, `indicators`, `checklists`, `checklist_entries`, `oracle_readings`, `evaluator_reports`, `fnvc_tranches`, `market_listings`, `audit_logs`.
   - Enabled Row Level Security (RLS) policies.
3. **Full ACCET Brand Manual v1.0 Overhaul**:
   - **Login**: Replicated `accet-app/apps/marketplace` login flow with `CinematicBackground`, `LoginIntro`, `NeuralButton`, and `glass-platinum` card.
   - **Onboarding**: Redesigned 4-step wizard and updated **"Analysis Queued!"** modal with `#5EC8F2` Sky Blue atmosphere ring, `Syne` headlines, `JetBrains Mono` badges, and `NeuralButton`.
   - **Project Management Board (`project/[id]/page.tsx`)**: Removed hardcoded `DEMO_PROJECT` fallbacks, connected to live Supabase DB and REST APIs, added 404 state.
   - **PM Components**: Overhauled `RACERTable`, `GovernanceKanban`, `ChecklistBuilder`, and `Marketplace Fiche` to 100% ACCET Brand System specifications.
4. **Branching & Release**:
   - Tagged and released `v1.0.7`.
   - Created and pushed mirror branch `v1.0.7-test` to GitHub.

---

## 5. Architectural Directory Layout

```
Agentic_Framework/
├── .agents/                        # Customization Root (Skills & Rules)
│   ├── AGENTS.md                   # Global ACCET Project Rules & Branching Protocols
│   └── skills/
│       └── branding/SKILL.md       # ACCET 2026 UI/UX Design System Skill
├── apdsv2-initial-artifacts/
│   └── scaffold/
│       ├── frontend/               # Next.js 16 App Router Client
│       │   ├── app/
│       │   │   ├── [lang]/         # Native Multilingual Dynamic Routing (en, es, pt)
│       │   │   │   ├── evaluator/      # TPA Independent Auditor Portal
│       │   │   │   ├── login/          # Cinematic Glassmorphic Login
│       │   │   │   ├── marketplace/    # Public Fiche & Scenario Simulator
│       │   │   │   ├── onboarding/     # 4-Step AI Wizard & Analysis Modal
│       │   │   │   ├── project/[id]/   # Live PM Board & Maturity Studio
│       │   │   │   └── layout.tsx      # Root Layout & Typography Loader
│       │   │   ├── auth/callback/  # SSR Auth Callback Handler
│       │   │   ├── components/     # UI, Auth, and Dashboard Components
│       │   │   ├── globals.css     # Brand Design System Tokens & Glass Utilities
│       │   │   └── middleware.ts   # SSR Auth Route Protection & Locale Negotiation
│       │   ├── dictionaries/       # i18n JSON translation files
│       │   ├── lib/
│       │   │   └── supabase.ts     # @supabase/ssr Browser Client Provider
│       │   └── tailwind.config.js  # ACCET Theme Colors & Font Families
│       └── backend/                # Express + TypeScript + Prisma API
│           ├── prisma/
│           │   ├── apds_v2_migration.sql # Safe Additive DDL Migration Script
│           │   └── schema.prisma         # Prisma Schema Definition
│           └── src/
│               ├── index.ts        # Express REST Endpoints & Memory Fallback Store
│               ├── worker.ts       # BullMQ Agent Task Worker Stub
│               └── modules/
│                   └── evaluator/  # TPA Milestone Approval Routes
├── context.md                      # Historical Project Context Baseline
└── history.md                      # Active Session History & Guidelines Log
```

---

## 6. Quick Reference for Incoming AI Agents

- **Primary Credentials**: `accet.project@gmail.com` / `Accet2026!`
- **Cloud Supabase URL**: `https://ladhrrjidksmynazoybx.supabase.co`
- **Local Dev Servers**:
  - Frontend: `http://localhost:3003` (or `3000`)
  - Backend API: `http://localhost:4001`
- **When creating new UI components**: Always inspect `.agents/skills/branding/SKILL.md` and use `font-syne`, `font-mono`, `font-sans`, `#5EC8F2` Sky Blue accents, and `.glass-blue-card` frosted glass translucency. Do NOT use legacy classes like `.glass-platinum`.
- **When editing DB schemas**: Never run destructive migrations. Add new tables using `apds_v2_migration.sql` with `IF NOT EXISTS`.
- **Client Component i18n**: Wrap layout with `DictionaryProvider.tsx` and use the `useDictionary()` hook rather than prop drilling from `page.tsx`.

---

## 7. Reconciliation & Audit Analysis: July 30 Context Update vs. Active Implementation

A thorough audit comparing the **July 30 Context Log Export** (`context.md` lines 651–2137) against the **active codebase trajectory** (`6adf8a29-3341-4c43-805e-06bba9e33e8a`) revealed four critical misalignments that were successfully resolved in production:

### Key Misalignments & Resolved Improvements

| Area | July 30 Context Update Proposal | Active Implementation (`history.md` Baseline) | Resolution / Improvement Status |
| :--- | :--- | :--- | :--- |
| **Authentication Engine** | Generic `@supabase/supabase-js` `createClient` without cookie persistence. | `@supabase/ssr` `createBrowserClient` with explicit cookie propagation and `await cookies()` in Next.js 16 server handlers. | **Resolved**: Eliminated infinite auth loading spinner; aligned middleware session checks across Next.js 16 App Router. |
| **Database Migration Strategy** | Direct `prisma db push` / raw migrations that risk dropping existing schema tables. | Safe additive PostgreSQL migration script (`apds_v2_migration.sql`) using `IF NOT EXISTS`. | **Resolved**: Protected existing `auth.users`, `User`, `Tenant`, `Document`, `Signature`, `Transaction`, and `profiles` tables. |
| **Brand & Design System** | Generic UI placeholders and generic styling. | Full ACCET Brand Manual v1.1 (`Syne`, `JetBrains Mono`, `DM Sans`, `#5EC8F2`, `.glass-blue-card`, `CinematicBackground`). | **Resolved**: Replicated exact high-contrast glassmorphic design system from `accet-app` marketplace. Purged legacy `.glass-platinum` classes. |
| **Project Management Architecture** | High-level theoretical review of 14 open-source PM repositories (Focalboard, Wekan, OpenProject, Taiga, etc.). | Native Next.js 16 PM suite (`GovernanceKanban`, `RACERTable`, `ChecklistBuilder`) integrated with Supabase and REST API. | **Benchmarked**: Core patterns (Focalboard DnD, Wekan WebSockets, OpenProject tolerance tracking) integrated into APDS v2.0 roadmap. |

### Open-Source PM Repository Benchmarking Summary (14 Repos)

The 14 open-source PM repositories evaluated in the July 30 update serve as functional benchmarks for APDS v2.0:

1. **Focalboard / Taskcafe**: Benchmark for visual drag-and-drop board UX (Logframe & PM Board builder).
2. **Wekan**: Benchmark for real-time WebSocket pub/sub feeds (Investor transparency portal & field oracle streams).
3. **OpenProject / Redmine**: Benchmark for enterprise WorkPackage hierarchy, budget/schedule tolerance tracking (+10%/+15%), and PDF export engines.
4. **Taiga**: Benchmark for REST API serialization and clean backend/frontend separation.
5. **Odoo / GitLab CE**: Benchmark for marketplace listing metadatos, fine-grained RBAC permissions, and approval workflows.

---

## 8. Key Work Accomplished & Milestones (`v1.0.7-test.1.2`)

1. **Native Next.js 16 Multilingual Implementation**:
   - Refactored routing structure into `app/[lang]/` dynamic segments.
   - Handled `getDictionary(lang)` fetching on the server.
   - **Rule Learned**: Use `Promise<{ lang: string }>` for Next.js 15+ async `params` in layout files.
2. **Middleware Dual-Negotiation Engine**:
   - Combined Supabase Auth (`supabase.auth.getUser()`) session protection with language header negotiation (`negotiator` + `@formatjs/intl-localematcher`) in a single `middleware.ts`.
3. **24-Story UI Translation Expansion**:
   - Translated 24 dashboard, login, onboarding, and marketplace components into `en`, `es`, and `pt` JSON dictionaries.
   - **Rule Learned**: Prevented prop-drilling in Client Components by injecting a `DictionaryProvider` Context hook at the `RootLayout` level, keeping the Server/Client boundary clean.
4. **Firme Digital v1.1 Design Enforcement**:
   - Identified and resolved legacy classes (`.glass-platinum`) stripping out the requested UI styles.
   - Standardized `globals.css` to the singular `.glass-blue-card` (12px radius, `#5EC8F2` borders, blur 20px).
   - Moved `globals.css` back to `app/globals.css` to prevent Next.js dev server cache issues with the `Module not found` error during active route refactoring.
5. **Cinematic Netflix Blur Integration**:
   - Replaced strict dark backgrounds with a vibrant `#3866B3` (derived from sculptural art assets).
   - Applied a Netflix-style left-to-right gradient fade (`bg-gradient-to-r`) to smoothly bridge solid UI backgrounds into transparent cinematic video backdrops.
