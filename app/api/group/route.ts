// app/api/groups/route.ts
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, visibility, coverImage, createdByEmail, members } = body;

    if (!name || !createdByEmail) {
      return NextResponse.json(
        { error: "name and createdByEmail are required" },
        { status: 400 }
      );
    }

    // پیدا کردن کاربر ایجادکننده
    const creator = await prisma.user.findUnique({
      where: { email: createdByEmail },
    });

    if (!creator) {
      return NextResponse.json({ error: "Creator user not found" }, { status: 404 });
    }

    // ایجاد گروه جدید
    const group = await prisma.group.create({
      data: {
        name,
        description,
        visibility,       // "PUBLIC" یا "PRIVATE"
        coverImage,
        createdById: creator.id,
        // memberCount: Array.isArray(members) ? members.length : 0, // Add memberCount as required
      },
    });

    // افزودن اعضا (members = [{userEmail: "a@a.com", role: "member"}, ...])
    if (Array.isArray(members) && members.length > 0) {
      const memberData = members.map((m: any) => ({
        userEmail: m.userEmail,
        groupId: group.id,
        role: m.role || "member",
      }));

      await prisma.member.createMany({
        data: memberData,
        skipDuplicates: true, // اگر عضوی قبلاً اضافه شده بود رد می‌کنه
      });
    }

    return NextResponse.json(group, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
