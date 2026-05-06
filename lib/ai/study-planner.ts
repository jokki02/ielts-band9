import { geminiJson, hasGemini } from "./gemini";
import { groqJson, hasGroq } from "./groq";
import { Provider } from "./heuristic-grader";

export interface DailyTask {
  module: string;
  activity: string;
  duration: number; // minutes
}

export interface WeeklyPlan {
  week: number;
  theme: string;
  focus: string[];
  daily_tasks: Record<string, DailyTask[]>;
  weekly_goal: string;
  mock_test: boolean;
}

export interface StudyPlanResult {
  overview: string;
  weekly_plans: WeeklyPlan[];
  milestone_weeks: number[];
  final_week_tips: string[];
  provider: Provider;
}

export interface PlanInput {
  examDate: string; // ISO
  weeksUntil: number;
  bands: { listening: number; reading: number; writing: number; speaking: number };
  hoursPerDay: number;
  weakest: string[];
}

function basePrompt(p: PlanInput) {
  return `Create a personalised IELTS Academic study plan to reach Band 9.

USER PROFILE:
- Exam Date: ${p.examDate} (${p.weeksUntil} weeks away)
- Current Bands: L:${p.bands.listening} R:${p.bands.reading} W:${p.bands.writing} S:${p.bands.speaking}
- Target: Band 9 Academic
- Available study time: ${p.hoursPerDay} hours/day
- Weakest modules (priority): ${p.weakest.join(", ")}

Generate a week-by-week plan in JSON ONLY (no prose) for ${Math.min(p.weeksUntil || 8, 12)} weeks:
{
  "overview": string,
  "weekly_plans": [
    {
      "week": number,
      "theme": string,
      "focus": [string],
      "daily_tasks": {
        "monday":   [{"module": string, "activity": string, "duration": number}],
        "tuesday":  [{"module": string, "activity": string, "duration": number}],
        "wednesday":[{"module": string, "activity": string, "duration": number}],
        "thursday": [{"module": string, "activity": string, "duration": number}],
        "friday":   [{"module": string, "activity": string, "duration": number}],
        "saturday": [{"module": string, "activity": string, "duration": number}],
        "sunday":   [{"module": string, "activity": string, "duration": number}]
      },
      "weekly_goal": string,
      "mock_test": boolean
    }
  ],
  "milestone_weeks": [number],
  "final_week_tips": [string]
}

Each daily total should sum to ~${Math.round(p.hoursPerDay * 60)} minutes. Skew time toward the weakest modules. Schedule a mock test every 3 weeks. Tasks must be specific (e.g. "Task 2 opinion essay — environment topic" not "writing practice").`;
}

function heuristicPlan(p: PlanInput): StudyPlanResult {
  const totalWeeks = Math.min(Math.max(p.weeksUntil || 8, 4), 12);
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const dailyMins = Math.round(p.hoursPerDay * 60);

  const weekly_plans: WeeklyPlan[] = [];
  for (let w = 1; w <= totalWeeks; w++) {
    const theme =
      w <= 2
        ? "Foundation Strengthening"
        : w <= 5
          ? "Range & Accuracy Building"
          : w <= totalWeeks - 2
            ? "Strategy Mastery"
            : "Test Simulation & Polish";

    const daily_tasks: Record<string, DailyTask[]> = {};
    for (const d of days) {
      const isRest = d === "sunday";
      if (isRest) {
        daily_tasks[d] = [
          {
            module: "review",
            activity: "Light review: re-read last week's feedback + 15 vocab cards",
            duration: 30,
          },
        ];
        continue;
      }
      const split = Math.floor(dailyMins / 3);
      // Skew toward weakest
      const w1 = p.weakest[0] || "writing";
      const w2 = p.weakest[1] || "reading";
      daily_tasks[d] = [
        {
          module: w1,
          activity:
            w1 === "writing"
              ? d === "monday" || d === "thursday"
                ? "Task 2 essay (timed) + AI feedback review"
                : "Task 1 chart description"
              : `${w1} practice — focused exercise`,
          duration: split + 10,
        },
        {
          module: "vocabulary",
          activity: `Spaced-repetition review + AWL Unit ${w}`,
          duration: 20,
        },
        {
          module: w2,
          activity:
            w2 === "reading"
              ? d === "tuesday" || d === "friday"
                ? "Full passage timed + question type drill"
                : "TFNG / matching headings drill"
              : `${w2} practice — focused exercise`,
          duration: split,
        },
      ];
    }
    weekly_plans.push({
      week: w,
      theme,
      focus: [w <= totalWeeks / 2 ? "structure" : "precision", "vocabulary range"],
      daily_tasks,
      weekly_goal:
        w === totalWeeks
          ? "Complete final mock test under exam conditions."
          : `Submit at least 2 ${p.weakest[0] || "writing"} tasks for AI grading.`,
      mock_test: w % 3 === 0 || w === totalWeeks,
    });
  }

  return {
    overview: `A ${totalWeeks}-week plan focused on your weakest areas (${p.weakest.join(
      ", ",
    )}). Sundays are light-review days. Mock tests every 3 weeks track progress.`,
    weekly_plans,
    milestone_weeks: Array.from(
      { length: Math.floor(totalWeeks / 3) },
      (_, i) => (i + 1) * 3,
    ).filter((n) => n <= totalWeeks),
    final_week_tips: [
      "No new material in the final week — only revision and one full mock test.",
      "Prioritise sleep and a normal eating routine the day before the exam.",
      "Re-read your last 3 essays' feedback, not the essays themselves.",
    ],
    provider: "heuristic",
  };
}

export async function generateStudyPlan(
  input: PlanInput,
): Promise<StudyPlanResult> {
  const p = basePrompt(input);
  if (hasGemini()) {
    try {
      const r = await geminiJson<StudyPlanResult>(p);
      return { ...r, provider: "gemini" };
    } catch (err) {
      console.error("[studyPlan] Gemini failed:", (err as Error).message);
    }
  }
  if (hasGroq()) {
    try {
      const r = await groqJson<StudyPlanResult>(p);
      return { ...r, provider: "groq" };
    } catch (err) {
      console.error("[studyPlan] Groq failed:", (err as Error).message);
    }
  }
  return heuristicPlan(input);
}
