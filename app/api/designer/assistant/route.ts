import { NextResponse } from "next/server";
import { z } from "zod";
import { geminiJson, hasGemini } from "@/lib/ai/gemini";

const RoomSchema = z.object({
  name: z.string(),
  width: z.number(),
  depth: z.number(),
  height: z.number(),
  floorMaterial: z.string(),
  wallColor: z.string(),
  floorColor: z.string(),
});

const ObjectSchema = z.object({
  name: z.string(),
  category: z.string(),
  kind: z.string(),
  width: z.number(),
  depth: z.number(),
  height: z.number(),
  rotation: z.number(),
  color: z.string(),
});

const RequestSchema = z.object({
  goal: z.string().min(3).max(1200),
  project: z.object({
    name: z.string(),
    rooms: z.array(RoomSchema).min(1).max(30),
    objects: z.array(ObjectSchema).max(250),
  }),
});

const ResponseSchema = z.object({
  summary: z.string(),
  suggestions: z.array(z.object({ title: z.string(), details: z.string() })).min(3).max(6),
  palette: z.array(z.string()).min(3).max(8),
  checklist: z.array(z.string()).min(3).max(8),
  provider: z.string(),
});

type DesignerRequest = z.infer<typeof RequestSchema>;
type AssistantResponse = z.infer<typeof ResponseSchema>;

function fallbackAssistant(input: DesignerRequest): AssistantResponse {
  const totalArea = input.project.rooms.reduce((sum, room) => sum + room.width * room.depth, 0);
  const furnitureArea = input.project.objects.reduce((sum, object) => sum + object.width * object.depth, 0);
  const openRatio = totalArea > 0 ? Math.max(0, (totalArea - furnitureArea) / totalArea) : 0;
  const tightRooms = input.project.rooms.filter((room) => room.width < 2.4 || room.depth < 2.4);
  const oversizedObjects = input.project.objects.filter((object) => object.width * object.depth > 3.2);

  return {
    provider: "local heuristic",
    summary: `The plan has ${input.project.rooms.length} rooms, ${input.project.objects.length} objects, ${totalArea.toFixed(1)} m² total area, and about ${Math.round(openRatio * 100)}% open circulation.`,
    palette: ["#f8fafc", "#c89155", "#64748b", "#a7f3d0", "#312e81"],
    suggestions: [
      {
        title: "Protect clear circulation paths",
        details: `Keep at least 0.8–0.9m around main walkways. Current open-space estimate is ${Math.round(openRatio * 100)}%, so prioritize slim storage and floating pieces if you add more furniture.`,
      },
      {
        title: "Zone with materials, not clutter",
        details: "Use floor changes, rugs, and lighting to separate living, dining, and sleeping areas while keeping sightlines open and the interface-ready plan easy to read.",
      },
      {
        title: "Balance large anchor pieces",
        details: oversizedObjects.length > 0
          ? `Review ${oversizedObjects.slice(0, 3).map((object) => object.name).join(", ")} so each has door clearance and does not block windows.`
          : "Your major furniture footprint is modest; add one strong focal piece per room rather than many small accents.",
      },
      {
        title: "Fix compact-room pressure points",
        details: tightRooms.length > 0
          ? `${tightRooms.map((room) => room.name).join(", ")} may feel tight. Use sliding doors, wall-mounted fixtures, mirrors, and pale wall colors.`
          : "Room proportions are comfortable; use consistent wall tones to make the plan feel more connected.",
      },
    ],
    checklist: [
      "Confirm door swings and window clearances before buying furniture.",
      "Keep bed sides above 0.6m clearance where possible.",
      "Use 2700–3000K warm lighting for living zones and task lights for work areas.",
      "Export project JSON after major changes so the design remains portable.",
    ],
  };
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = RequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid designer assistant request" }, { status: 400 });
  }

  const fallback = fallbackAssistant(parsed.data);
  if (!hasGemini()) {
    return NextResponse.json(fallback);
  }

  const prompt = `You are an expert architect and interior designer improving a browser-based 3D floor-plan project.
Return only valid JSON with this exact shape: {"summary":"...","suggestions":[{"title":"...","details":"..."}],"palette":["#hex"],"checklist":["..."],"provider":"Gemini"}.
Give practical, precise, non-paywalled advice. Emphasize accessibility, accurate spacing in meters, minimalist modern UI taste, materials, lighting, storage, and room division.
User goal: ${parsed.data.goal}
Project: ${JSON.stringify(parsed.data.project)}`;

  try {
    const ai = await geminiJson<AssistantResponse>(prompt);
    const normalized = ResponseSchema.safeParse({ ...ai, provider: "Gemini" });
    return NextResponse.json(normalized.success ? normalized.data : fallback);
  } catch {
    return NextResponse.json(fallback);
  }
}
