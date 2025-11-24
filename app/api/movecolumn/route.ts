
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

import CryptoJS from "crypto-js";
export async function POST(req: NextRequest) {
  const JWT_SECRET = process.env.SECRETKAY!;

  try {
    const body = await req.json();
    const bytes = CryptoJS.AES.decrypt(body, JWT_SECRET);
    var payload: any = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // var payload: any = jwt.verify(body, JWT_SECRET);

    const columnId = payload.columnId; 
    let newOrder = Number(payload.newOrder);

    if (isNaN(newOrder)) {
      return NextResponse.json(
        { error: "columnId and newOrder must be numbers" },
        { status: 400 }
      );
    }

    // پیدا کردن ستون فعلی
    const column = await prisma.column.findUnique({ where: { id: columnId } });
    if (!column)
      return NextResponse.json({ error: "Column not found" }, { status: 404 });

    const oldOrder = column.order; // فرض: order از 1 شروع می‌شود
    const groupId = column.groupId;

    // تعداد ستون‌ها در گروه
    const count = await prisma.column.count({ where: { groupId } });

    // اگر کاربر مقدار بزرگ‌تر از count فرستاده، آن را به انتها محدود کن
    if (newOrder < 1) newOrder = 1;
    if (newOrder > count) newOrder = count; // اجازه می‌دهیم newOrder == count (چسباندن به انتها)

    if (newOrder === oldOrder) {
      return NextResponse.json({ message: "Column order unchanged" });
    }

    // درون یک تراکنش همه تغییرات را اعمال کنیم
    // await prisma.$transaction(async (tx) => {
    //   if (newOrder > oldOrder) {
    //     // آیتمی که به سمت پایین‌تر (اعداد بزرگ‌تر) می‌رود:
    //     // همه ستون‌هایی که order بین oldOrder+1 تا newOrder هستند، یک واحد کم شوند
    //     await tx.column.updateMany({
    //       where: {
    //         groupId,
    //         order: { gt: oldOrder, lte: newOrder },
    //       },
    //       data: { order: { decrement: 1 } },
    //     });
    //   } else {
    //     // آیتمی که به سمت بالا‌تر (اعداد کوچکتر) می‌رود:
    //     // همه ستون‌هایی که order بین newOrder تا oldOrder-1 هستند، یک واحد زیاد شوند
    //     await tx.column.updateMany({
    //       where: {
    //         groupId,
    //         order: { gte: newOrder, lt: oldOrder },
    //       },
    //       data: { order: { increment: 1 } },
    //     });
    //   }

    //   // و سپس ستون مورد نظر را به newOrder منتقل کن
    //   await tx.column.update({
    //     where: { id: columnId },
    //     data: { order: newOrder },
    //   });
    // });




    await prisma.$transaction(async (tx) => {
  const columns = await tx.column.findMany({
    where: { groupId },
    orderBy: { order: "asc" },
  });

  // حذف ستون قدیمی از آرایه
  const [moved] = columns.splice(oldOrder - 1, 1);
  // درج در جای جدید
  columns.splice(newOrder - 1, 0, moved);

  // به‌روزرسانی ترتیب همه
  await Promise.all(
    columns.map((col, index) =>
      tx.column.update({
        where: { id: col.id },
        data: { order: index + 1 },
      })
    )
  );
});


    return NextResponse.json({ message: "Column moved successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
