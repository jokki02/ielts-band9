import { notFound } from "next/navigation";
import { LISTENING_TRACKS } from "@/data/listening/audio";
import { ListeningPractice } from "./ListeningPractice";

export default function ListeningTrackPage({ params }: { params: { id: string } }) {
  const track = LISTENING_TRACKS.find((t) => t.id === params.id);
  if (!track) return notFound();
  return <ListeningPractice track={track} />;
}
