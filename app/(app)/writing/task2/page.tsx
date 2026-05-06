import { TASK2_PROMPTS } from "@/data/writing/task2-prompts";
import { TIME_LIMITS } from "@/lib/ielts/time-limits";
import { WritingPractice } from "../WritingPractice";

export default function Task2Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const prompt =
    TASK2_PROMPTS.find((p) => p.id === searchParams.id) ??
    TASK2_PROMPTS[Math.floor(Math.random() * TASK2_PROMPTS.length)];
  return (
    <WritingPractice
      taskType="task2"
      promptId={prompt.id}
      prompt={prompt.prompt}
      meta={{
        topic: prompt.topic,
        type: prompt.type,
        keyVocabulary: prompt.keyVocabulary,
        band9Tips: prompt.band9Tips,
      }}
      timeLimit={TIME_LIMITS.writing.task2}
      minWords={250}
      promptOptions={TASK2_PROMPTS.map((p) => ({
        id: p.id,
        label: `${p.topic} · ${p.type}`,
      }))}
    />
  );
}
