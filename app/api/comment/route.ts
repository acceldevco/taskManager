// app/api/comments/route.ts
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { authorId, taskId, text } = body;

    if (!authorId || !taskId || !text) {
      return NextResponse.json(
        { error: "authorId, taskId, and text are required" },
        { status: 400 }
      );
    }

    // ایجاد کامنت
    const comment = await prisma.comment.create({
      data: {
        authorId,
        taskId,
        text,
      },
    });

    // ثبت اکتیویتی برای کامنت
    await prisma.activity.create({
      data: {
        action: "COMMENTED",
        byId: authorId,
        taskId: taskId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
