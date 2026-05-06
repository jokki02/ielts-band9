import { notFound } from "next/navigation";
import { PART2_CUE_CARDS } from "@/data/speaking/cue-cards";
import { SpeakingPractice } from "./SpeakingPractice";

export default function SpeakingPracticePage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const card = PART2_CUE_CARDS.find((c) => c.id === searchParams.id) ?? PART2_CUE_CARDS[0];
  if (!card) return notFound();
  return <SpeakingPractice card={card} />;
}
