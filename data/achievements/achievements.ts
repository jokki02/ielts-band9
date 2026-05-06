export interface AchievementDef {
  type: string;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const ACHIEVEMENTS: AchievementDef[] = [
  // Streaks
  { type: "streak-3", title: "Three-Day Streak", description: "Studied 3 days in a row.", icon: "Flame", rarity: "common" },
  { type: "streak-7", title: "Week Warrior", description: "Studied 7 days in a row.", icon: "Flame", rarity: "rare" },
  { type: "streak-30", title: "Month of Mastery", description: "Studied 30 days in a row.", icon: "Trophy", rarity: "epic" },
  { type: "streak-100", title: "Centurion", description: "Studied 100 days in a row.", icon: "Crown", rarity: "legendary" },

  // Writing
  { type: "writing-1", title: "First Essay", description: "Submitted your first writing task.", icon: "PenLine", rarity: "common" },
  { type: "writing-10", title: "Prolific Writer", description: "Submitted 10 writing tasks.", icon: "PenLine", rarity: "rare" },
  { type: "writing-band-8", title: "Eloquent", description: "Achieved Band 8+ on a writing task.", icon: "Award", rarity: "epic" },
  { type: "writing-band-9", title: "Native Stylist", description: "Achieved Band 9 on a writing task.", icon: "Crown", rarity: "legendary" },

  // Reading
  { type: "reading-1", title: "First Passage", description: "Completed your first reading passage.", icon: "BookOpen", rarity: "common" },
  { type: "reading-perfect", title: "Eagle Eye", description: "Got every question correct on a reading passage.", icon: "Target", rarity: "epic" },
  { type: "reading-fast", title: "Speed Reader", description: "Completed a passage in under 15 minutes with 80%+ accuracy.", icon: "Zap", rarity: "rare" },

  // Vocabulary
  { type: "vocab-100", title: "Vocabulary Builder", description: "Learned 100 vocabulary cards.", icon: "Library", rarity: "rare" },
  { type: "vocab-500", title: "Word Hoarder", description: "Mastered 500 vocabulary cards.", icon: "Library", rarity: "epic" },
  { type: "vocab-streak", title: "Daily Reviewer", description: "Reviewed vocabulary 7 days in a row.", icon: "RefreshCw", rarity: "rare" },

  // Listening / Speaking
  { type: "listen-1", title: "Tuned In", description: "Completed your first listening test.", icon: "Headphones", rarity: "common" },
  { type: "speak-1", title: "Spoken Up", description: "Completed your first speaking practice.", icon: "Mic", rarity: "common" },

  // Mock
  { type: "mock-1", title: "Test Pilot", description: "Completed your first mock test.", icon: "ClipboardCheck", rarity: "rare" },
  { type: "mock-band-8", title: "Mock Marvel", description: "Achieved Band 8+ overall in a mock test.", icon: "Trophy", rarity: "epic" },
  { type: "mock-band-9", title: "Band 9 Achieved", description: "Achieved Band 9 overall in a mock test.", icon: "Crown", rarity: "legendary" },

  // Time
  { type: "hours-10", title: "Dedicated Learner", description: "Logged 10 hours of study.", icon: "Clock", rarity: "common" },
  { type: "hours-50", title: "Serious Student", description: "Logged 50 hours of study.", icon: "Clock", rarity: "rare" },
  { type: "hours-100", title: "Marathon Mind", description: "Logged 100 hours of study.", icon: "Clock", rarity: "epic" },
];
