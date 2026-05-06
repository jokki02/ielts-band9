import { notFound } from "next/navigation";
import { READING_PASSAGES } from "@/data/reading/passages";
import { ReadingPractice } from "./ReadingPractice";

export default function ReadingPassagePage({
  params,
}: {
  params: { id: string };
}) {
  const passage = READING_PASSAGES.find((p) => p.id === params.id);
  if (!passage) return notFound();
  return <ReadingPractice passage={passage} />;
}
