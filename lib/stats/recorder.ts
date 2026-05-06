import "server-only";
import { prisma } from "@/lib/db";
import { ACHIEVEMENTS } from "@/data/achievements/achievements";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export async function recordSession(
  userId: string,
  module: string,
  durationMins: number,
  score?: number,
) {
  const now = new Date();
  await prisma.studySession.create({
    data: { userId, module, duration: durationMins, score: score ?? null, date: now },
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;
  let newStreak = user.studyStreak;
  const last = user.lastStudyDate;
  if (!last) newStreak = 1;
  else if (isSameDay(last, now)) {
    // already studied today
  } else {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (isSameDay(last, yesterday)) newStreak += 1;
    else newStreak = 1;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      lastStudyDate: now,
      studyStreak: newStreak,
      totalStudyMins: { increment: durationMins },
    },
  });

  await checkStreakAchievements(userId, newStreak);
  await checkTimeAchievements(userId, user.totalStudyMins + durationMins);
}

async function ensureAchievement(userId: string, type: string) {
  const def = ACHIEVEMENTS.find((a) => a.type === type);
  if (!def) return;
  const exists = await prisma.achievement.findUnique({
    where: { userId_type: { userId, type } },
  });
  if (exists) return;
  await prisma.achievement.create({
    data: {
      userId,
      type: def.type,
      title: def.title,
      description: def.description,
      icon: def.icon,
    },
  });
}

async function checkStreakAchievements(userId: string, streak: number) {
  if (streak >= 100) await ensureAchievement(userId, "streak-100");
  if (streak >= 30) await ensureAchievement(userId, "streak-30");
  if (streak >= 7) await ensureAchievement(userId, "streak-7");
  if (streak >= 3) await ensureAchievement(userId, "streak-3");
}

async function checkTimeAchievements(userId: string, totalMins: number) {
  const hours = totalMins / 60;
  if (hours >= 100) await ensureAchievement(userId, "hours-100");
  if (hours >= 50) await ensureAchievement(userId, "hours-50");
  if (hours >= 10) await ensureAchievement(userId, "hours-10");
}

export async function awardForWriting(userId: string, band: number) {
  const count = await prisma.writingAttempt.count({ where: { userId } });
  if (count >= 1) await ensureAchievement(userId, "writing-1");
  if (count >= 10) await ensureAchievement(userId, "writing-10");
  if (band >= 9) await ensureAchievement(userId, "writing-band-9");
  else if (band >= 8) await ensureAchievement(userId, "writing-band-8");
}

export async function awardForReading(
  userId: string,
  raw: number,
  total: number,
  timeSpent: number,
) {
  const count = await prisma.readingAttempt.count({ where: { userId } });
  if (count >= 1) await ensureAchievement(userId, "reading-1");
  if (raw === total) await ensureAchievement(userId, "reading-perfect");
  if (raw / total >= 0.8 && timeSpent < 15 * 60)
    await ensureAchievement(userId, "reading-fast");
}

export async function awardForVocab(userId: string) {
  const count = await prisma.vocabCard.count({
    where: { userId, repetitions: { gte: 3 } },
  });
  if (count >= 100) await ensureAchievement(userId, "vocab-100");
  if (count >= 500) await ensureAchievement(userId, "vocab-500");
}

export async function awardForMock(userId: string, overall: number) {
  const count = await prisma.mockTest.count({
    where: { userId, status: "completed" },
  });
  if (count >= 1) await ensureAchievement(userId, "mock-1");
  if (overall >= 9) await ensureAchievement(userId, "mock-band-9");
  else if (overall >= 8) await ensureAchievement(userId, "mock-band-8");
}
