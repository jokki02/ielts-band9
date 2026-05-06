import { TASK1_PROMPTS } from "@/data/writing/task1-prompts";
import { TIME_LIMITS } from "@/lib/ielts/time-limits";
import { WritingPractice } from "../WritingPractice";

export default function Task1Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const prompt =
    TASK1_PROMPTS.find((p) => p.id === searchParams.id) ??
    TASK1_PROMPTS[Math.floor(Math.random() * TASK1_PROMPTS.length)];
  return (
    <WritingPractice
      taskType="task1"
      promptId={prompt.id}
      prompt={prompt.prompt}
      meta={{
        topic: prompt.type,
        type: prompt.type,
        keyVocabulary: prompt.keyVocabulary,
        band9Tips: prompt.band9Tips,
        dataDescription: prompt.dataDescription,
      }}
      timeLimit={TIME_LIMITS.writing.task1}
      minWords={150}
      promptOptions={TASK1_PROMPTS.map((p) => ({
        id: p.id,
        label: `${p.type}`,
      }))}
    />
  );
}
