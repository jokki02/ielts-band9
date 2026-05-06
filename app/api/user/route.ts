import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth/get-user";

const CreateUser = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  currentBand: z.number().min(0).max(9),
  targetBand: z.number().min(0).max(9),
  examDate: z.string().nullable().optional(),
});

const UpdateUser = CreateUser.partial();

export async function GET() {
  const user = await getUser();
  return NextResponse.json({ user });
}

export async function POST(req: NextRequest) {
  const existing = await getUser();
  if (existing) {
    return NextResponse.json(
      { error: "User already exists. Use PATCH to update." },
      { status: 409 },
    );
  }
  const body = await req.json();
  const parsed = CreateUser.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const { name, email, currentBand, targetBand, examDate } = parsed.data;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      currentBand,
      targetBand,
      examDate: examDate ? new Date(examDate) : null,
      settings: { create: {} },
    },
    include: { settings: true },
  });
  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest) {
  const existing = await getUser();
  if (!existing) {
    return NextResponse.json({ error: "No user yet" }, { status: 404 });
  }
  const body = await req.json();
  const parsed = UpdateUser.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const user = await prisma.user.update({
    where: { id: existing.id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.email !== undefined ? { email: data.email } : {}),
      ...(data.currentBand !== undefined ? { currentBand: data.currentBand } : {}),
      ...(data.targetBand !== undefined ? { targetBand: data.targetBand } : {}),
      ...(data.examDate !== undefined
        ? { examDate: data.examDate ? new Date(data.examDate) : null }
        : {}),
    },
  });
  return NextResponse.json({ user });
}
