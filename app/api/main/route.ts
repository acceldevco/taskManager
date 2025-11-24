// app/api/handle-item/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import CryptoJS from "crypto-js";
// Map داینامیک نام جدول به مدل Prisma
const modelMap: Record<string, any> = {
  member: prisma.member,
  user: prisma.user,
  group: prisma.group,
  column: prisma.column,
  task: prisma.task,
  comment: prisma.comment,
  taskassignment: prisma.taskAssignment,
  // جدول‌های دیگر را اضافه کن
};

export async function POST(req: NextRequest) {
  const JWT_SECRET = process.env.SECRETKAY!;
  try {
    const body = await req.json();


    const bytes = CryptoJS.AES.decrypt(body, JWT_SECRET);
    var payload: any = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // var payload:any = jwt.verify(body, JWT_SECRET);
    const { table, data } = payload;

    if (!table || !data) {
      return NextResponse.json(
        { error: "table و data باید ارسال شوند" },
        { status: 400 }
      );
    }

    const model = modelMap[table.toLowerCase()];
    if (!model) {
      return NextResponse.json({ error: "مدل نامعتبر است" }, { status: 400 });
    }

    const isArray = Array.isArray(data);
    let result;

    // افزودن
    if ((!isArray && !data.id) || (isArray && data.every((d: any) => !d.id))) {
      if (isArray) {
        result = await model.createMany({ data });
      } else {
        result = await model.create({ data });
      }
    }
    // آپدیت یا حذف
    else {
      const items = isArray ? data : [data];

      result = await Promise.all(
        items.map((item: any) => {
          if (item.id && Object.keys(item).length > 1) {
            // آپدیت
            return model.update({
              where: { id: item.id },
              data: { ...item, id: undefined },
            });
          } else if (item.id && Object.keys(item).length === 1) {
            // حذف
            return model.delete({ where: { id: item.id } });
          } else {
            throw new Error("داده نامعتبر است");
          }
        })
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
