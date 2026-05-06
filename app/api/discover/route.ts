import { NextRequest, NextResponse } from "next/server";
import { discover, DiscoverModule } from "@/lib/ai/discoverer";

const VALID_MODULES: DiscoverModule[] = [
  "listening",
  "reading",
  "writing-task1",
  "writing-task2",
  "vocabulary",
  "speaking",
  "tips",
];

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const moduleName = body.module as DiscoverModule | undefined;
    const topic = (body.topic as string | undefined)?.slice(0, 80);

    if (!moduleName || !VALID_MODULES.includes(moduleName)) {
      return NextResponse.json(
        { error: `module must be one of: ${VALID_MODULES.join(", ")}` },
        { status: 400 },
      );
    }

    const result = await discover(moduleName, topic);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: `Discovery failed: ${(err as Error).message}` },
      { status: 500 },
    );
  }
}
