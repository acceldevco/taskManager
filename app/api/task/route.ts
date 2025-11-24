import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function moveTask(taskId: string, toColumnId: string, userId: string) {
  // مرحله 1: پیدا کردن تسک فعلی
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { id: true, columnId: true },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  // مرحله 2: آپدیت ستون تسک
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { columnId: toColumnId },
  });

  // مرحله 3: ثبت اکتیویتی (که مشخص باشه این تسک جابه‌جا شده)
  await prisma.activity.create({
    data: {
      action: "MOVED",              // enum ActivityAction
      byId: userId,                 // کسی که جابه‌جا کرده
      taskId: taskId,
      fromColumn: task.columnId,    // ستون قبلی
      toColumn: toColumnId,         // ستون جدید
    },
  });

  return updatedTask;
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { taskId, toColumnId, userId } = body;

    const task = await moveTask(taskId, toColumnId, userId);

    return new Response(JSON.stringify(task), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const groupId = url.searchParams.get("groupId");

    if (!groupId) {
      return NextResponse.json({ error: "groupId is required" }, { status: 400 });
    }

    const columns = await prisma.column.findMany({
      where: { groupId },
      include: {
        tasks: {
          orderBy: { createdAt: "asc" },
          include: {
            assigned_to: true,
            comments: true,
            taskLabels: { include: { label: true } },
          },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(columns, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}