# IELTS Band 9 Prep

A complete, single-user IELTS Academic preparation studio designed to help you reach Band 9. Built with Next.js 14, Prisma + SQLite, Tailwind, Zustand, TipTap, Recharts, and an AI grading pipeline (Gemini → Groq → local heuristic).

## Features

- **AI essay grading** for Writing Task 1 and Task 2 across all four official criteria (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range), with strengths, improvements, and a Band 9 sample model. Falls back to a transparent local heuristic when no API keys are set.
- **Reading drills** for all 14 IELTS question types (TFNG / YNNG, MCQ, matching headings/info/features/endings, sentence/summary/note/table/flowchart completion, short answer) with immediate scoring against the official Academic raw-band table.
- **Listening lab** with full transcripts and built-in speech synthesis when no audio file is supplied.
- **Speaking simulator** powered by the Web Speech API + AI analysis on fluency, lexis, grammar and pronunciation patterns.
- **Vocabulary** with ~100 high-band IELTS words, SM-2 spaced repetition, and 3D flip flashcards.
- **Mock test** centre that combines all four modules and applies the official IELTS averaging rule.
- **Progress analytics** (band trajectory, daily minutes, module split) and **achievements** with rarity tiers.
- **Study plan**: AI-generated, week-by-week schedule calibrated to your weakest areas and exam date.
- **PWA installable**, dark mode by default, mobile-first.

## Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript (strict)
- **Styling**: Tailwind CSS 3 + Tailwind Typography + custom design tokens
- **UI**: Radix primitives + bespoke shadcn-style components (`components/ui`)
- **Database**: Prisma 6 + SQLite (single file at `prisma/dev.db`)
- **State**: Zustand (UI), React Server Components + Server Actions for data
- **Editor**: TipTap (StarterKit + character count) for essays
- **Charts**: Recharts
- **AI**: Google Gemini (primary), Groq Llama (fallback), local heuristic (final fallback)

## Quick start

```bash
# 1. install
npm install

# 2. env (already includes a sane DATABASE_URL)
cp .env.example .env

# 3. database
npx prisma db push        # creates prisma/dev.db with the schema

# 4. run
npm run dev
# open http://localhost:3000

# 5. one-time onboarding
# enter name, email, current band, target band, exam date
```

After onboarding you can populate the vocabulary deck via the **Seed vocabulary** button on `/vocabulary` (or `npx prisma db seed`).

## Environment variables

| Variable          | Required | Notes                                                                                |
| ----------------- | -------- | ------------------------------------------------------------------------------------ |
| `DATABASE_URL`    | yes      | SQLite path. Default: `file:./dev.db`.                                              |
| `GEMINI_API_KEY`  | optional | Enables Gemini-powered essay/speaking grading and study-plan generation.            |
| `GROQ_API_KEY`    | optional | Fallback if Gemini is missing or fails.                                             |

If neither key is set, the app uses a transparent local heuristic grader that scores essays based on word count, lexical diversity, linker usage, and structural cues. The grading provider used is shown in the feedback UI.

## Scripts

```bash
npm run dev         # next dev
npm run build       # next build
npm run start       # next start
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
npm run db:push     # prisma db push
npm run db:seed     # tsx prisma/seed.ts
```

## Folder layout

```
app/
  (app)/            # authenticated route group: dashboard, writing, reading, …
  onboarding/       # first-run profile creation
  api/              # server endpoints: grade-essay, reading, vocabulary/review, …
components/
  ui/               # shadcn-style primitives (button, card, input, …)
  layout/           # Header, Sidebar, MobileNav, PageWrapper
  dashboard/        # band-score card, daily-goal ring, weak-areas alert, …
  editor/           # TipTap RichEditor
  common/           # Timer, EmptyState, PwaRegister
data/
  writing/          # 100+ Task 2 + 50+ Task 1 prompts
  reading/          # passages with all 14 question types
  vocabulary/       # ~100 high-band words
  speaking/         # Part 1 questions, Part 2 cue cards, Part 3 follow-ups
  listening/        # tracks with transcripts
  achievements/     # 25 achievement definitions
  tips/             # study tips, filterable by module + level
lib/
  ai/               # Gemini + Groq + heuristic grader, study planner, speaking analyzer
  ielts/            # band tables, question types, time limits, writing criteria
  spaced-repetition/# SM-2 algorithm
  stats/            # session recorder + achievement awarding
  auth/             # getUser / requireUser
prisma/             # schema + seed
public/             # icons + manifest + service worker
```

## Single-user model

The app is intentionally single-user (no NextAuth, no multi-tenancy). The `User` table has at most one row; on first run the `/onboarding` page is shown until that row exists.

## Production-readiness checklist

- [x] TypeScript strict mode, `npm run typecheck` clean
- [x] `npm run lint` clean
- [x] `npm run build` clean
- [x] Server-only data access (`requireUser`) on every authenticated page and API route
- [x] Zod validation on every API route
- [x] Graceful AI fallbacks (Gemini → Groq → heuristic)
- [x] PWA manifest + service worker + maskable icons
- [x] All 14 IELTS reading question types implemented
- [x] Official IELTS band conversion + averaging rule

## License

Private / personal use.
