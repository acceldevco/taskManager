import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function assignUserToTask(taskId: string, userEmail: string) {
  // پیدا کردن کاربر
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) throw new Error("User not found");

  // آپدیت تسک برای اختصاص دادن کاربر
  const task = await prisma.task.update({
    where: { id: taskId },
    data: { assignedToId: user.id },
  });

  // ثبت اکتیویتی
  await prisma.activity.create({
    data: {
      action: "UPDATED",
      byId: user.id,
      taskId: task.id,
    },
  });

  return task;
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { taskId, userEmail } = body;

    if (!taskId || !userEmail) {
      return NextResponse.json({ error: "taskId and userEmail are required" }, { status: 400 });
    }

    const updatedTask = await assignUserToTask(taskId, userEmail);

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}