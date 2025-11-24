import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma"; // مسیر فایل Prisma خودت رو جایگزین کن

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    var body: any = await req.json();

    // const { searchParams } = new URL(req.url);
    // console.log(body);
    //  return NextResponse.json({message:body})

    const id = body;

    if (!id) {
      return NextResponse.json(
        { error: "Group ID is required" },
        { status: 400 }
      );
    }

    // اجرای Query مشابه داده‌ای که گفتی:
    const group = await prisma.group.findUnique({
      where: { id },

      include: {
        _count: {
          select: { columns: true }, // اینجا تعداد ستون‌ها رو می‌گیری
        },
        members: {
          include: {
            assignedTasks: true, // وظایف اعضا
          },
        },
        created_by: true, // سازنده گروه
        columns: {
          orderBy: {
            order: "asc",
          },
          include: {
            tasks: {
              include: {
                assignedMembers: true, // اعضای اختصاص داده‌شده به تسک
                comments: {
                  include: { author: true }, // نویسنده کامنت
                },
              },
            },
          },
        },
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json(group);
  } catch (error) {
    console.error("Error fetching group details:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
