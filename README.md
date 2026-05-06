# IELTS Band 9 Prep

A complete, single-user IELTS Academic preparation studio designed to help you reach Band 9. Built with Next.js 14, Prisma + Postgres, Tailwind, Zustand, TipTap, Recharts, and an AI grading pipeline (Gemini → Groq → local heuristic). All learning content is sourced from real, openly-licensed academic materials — see the in-app `/sources` page for full attributions.

## Features

- **AI essay grading** for Writing Task 1 and Task 2 across all four official criteria (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range), with strengths, improvements, and a Band 9 sample model. Falls back to a transparent local heuristic when no API keys are set.
- **Reading drills** for all 14 IELTS question types (TFNG / YNNG, MCQ, matching headings/info/features/endings, sentence/summary/note/table/flowchart completion, short answer) with immediate scoring against the official Academic raw-band table.
- **Listening lab** with real, professionally recorded TED-Ed lectures (embedded via the official YouTube player), verbatim transcripts, and IELTS-style questions. CC-BY-NC-ND 4.0.
- **Reading library** of 10 academic passages adapted from Wikipedia (CC-BY-SA 4.0), each with 13 IELTS-grounded questions covering all 14 official question types.
- **Writing prompts** drawn from real reported IELTS exams (IELTS Updates and Recent Exams, IELTS Liz) — 30+ Task 2 essay prompts and 20+ Task 1 chart/map/process prompts. Each item carries its source URL.
- **Tips** paraphrased from official IELTS partners (British Council "Take IELTS", IDP IELTS, Cambridge English) and respected former-examiner blogs (IELTS Liz, IELTS Simon). Every tip cites its source.
- **Speaking simulator** powered by the Web Speech API + AI analysis on fluency, lexis, grammar and pronunciation patterns.
- **Vocabulary** with the full **Coxhead Academic Word List** (570 word families) plus hand-curated high-band collocations, SM-2 spaced repetition, and 3D flip flashcards. Definitions sourced from Wiktionary (CC-BY-SA 4.0).
- **Mock test** centre that combines all four modules and applies the official IELTS averaging rule.
- **Progress analytics** (band trajectory, daily minutes, module split) and **achievements** with rarity tiers.
- **Study plan**: AI-generated, week-by-week schedule calibrated to your weakest areas and exam date.
- **PWA installable**, dark mode by default, mobile-first.

## Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript (strict)
- **Styling**: Tailwind CSS 3 + Tailwind Typography + custom design tokens
- **UI**: Radix primitives + bespoke shadcn-style components (`components/ui`)
- **Database**: Prisma 6 + Postgres (Neon serverless or any Postgres URL via `DATABASE_URL`)
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
| `DATABASE_URL`    | yes      | Postgres connection string (e.g. Neon).                                              |
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

## Data sources & attributions

All learning content in this app is sourced from real, openly-licensed academic materials. A full attribution page is available in the app at [`/sources`](./app/(app)/sources/page.tsx). Summary:

| Module        | Source                                                                                     | Licence                  |
| ------------- | ------------------------------------------------------------------------------------------ | ------------------------ |
| Vocabulary    | [Coxhead Academic Word List](https://www.wgtn.ac.nz/lals/resources/academicwordlist) (570 word families) + [Wiktionary](https://en.wiktionary.org/) definitions | Public research output / CC-BY-SA 4.0 |
| Reading       | Adapted from [Wikipedia](https://en.wikipedia.org/) academic articles                     | CC-BY-SA 4.0            |
| Listening     | [TED-Ed](https://ed.ted.com/) lessons (embedded via YouTube), verbatim transcripts        | CC-BY-NC-ND 4.0         |
| Writing T1/T2 | [IELTS Updates and Recent Exams](https://www.ieltsupdatesandrecentexams.com/), [IELTS Liz](https://ieltsliz.com/) | Reported exam questions (factual record, not copyrightable) |
| Tips          | [British Council "Take IELTS"](https://takeielts.britishcouncil.org/prepare), [IDP IELTS](https://ielts.idp.com/), [Cambridge English](https://www.cambridgeenglish.org/exams-and-tests/ielts/preparation/), [IELTS Liz](https://ieltsliz.com/), [IELTS Simon](https://ielts-simon.com/) | Free preparation guidance, paraphrased with attribution |
| AI grading    | [Google Gemini](https://ai.google.dev/) (essay & speaking analysis)                       | Free tier; provider terms apply |

Where source material is licensed under Creative Commons (CC-BY, CC-BY-SA, CC-BY-NC-ND), we comply with the attribution and share-alike conditions: the original work is identified, the author is credited, the licence is named, and a link to the licensed copy is provided. TED-Ed videos remain the property of TED Conferences LLC and are embedded via the official YouTube no-cookie player rather than redistributed.

## License

Private / personal use.
