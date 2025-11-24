// import prisma from "@/prisma/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { taskId, fromColumn, toColumn, newOrder, byId } = await req.json();
//     if (!taskId || !toColumn || newOrder === undefined)
//       return NextResponse.json({ error: "اطلاعات ناقص" }, { status: 400 });

//     const task = await prisma.task.findUnique({ where: { id: taskId } });
//     if (!task)
//       return NextResponse.json({ error: "تسک پیدا نشد" }, { status: 404 });

//     await prisma.$transaction(async (tx) => {
//       if (fromColumn === toColumn) {
//         const tasks = await tx.task.findMany({
//           where: { columnId: fromColumn },
//           orderBy: { order: "asc" },
//         });
//         await Promise.all(
//           tasks.map((t) =>
//             tx.task.update({
//               where: { id: t.id },
//               data: {
//                 order:
//                   t.id === taskId
//                     ? newOrder
//                     : t.order >= newOrder
//                     ? t.order + 1
//                     : t.order,
//               },
//             })
//           )
//         );
//       } else {
//         await Promise.all([
//           tx.task.updateMany({
//             where: { columnId: fromColumn, order: { gt: task.order } },
//             data: { order: { decrement: 1 } },
//           }),
//           tx.task.updateMany({
//             where: { columnId: toColumn, order: { gte: newOrder } },
//             data: { order: { increment: 1 } },
//           }),
//           tx.task.update({
//             where: { id: taskId },
//             data: { columnId: toColumn, order: newOrder },
//           }),
//           tx.activity.create({
//             data: { action: "MOVED", byId, taskId, fromColumn, toColumn },
//           }),
//         ]);
//       }
//     });

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

//////////////////////////////////////////////////////////////////////////

import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
export async function POST(req: Request) {
  const JWT_SECRET = process.env.SECRETKAY!;
  try {
    const // { taskId, fromColumn, toColumn, newOrder, byId }
      body = await req.json();
    const bytes = CryptoJS.AES.decrypt(body, JWT_SECRET);
    var { taskId, fromColumn, toColumn, newOrder, byId }: any = JSON.parse(
      bytes.toString(CryptoJS.enc.Utf8)
    );

    console.log(taskId, toColumn, newOrder);

    if (!taskId || !toColumn || newOrder === undefined)
      return NextResponse.json({ error: "اطلاعات ناقص" }, { status: 400 });

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task)
      return NextResponse.json({ error: "تسک پیدا نشد" }, { status: 404 });

    await prisma.$transaction(async (tx) => {
      if (fromColumn === toColumn) {
        const tasks = await tx.task.findMany({
          where: { columnId: fromColumn },
          orderBy: { order: "asc" },
        });

        const updated = tasks.map((t) => {
          let order = t.order;
          if (t.id === taskId) order = newOrder;
          else if (t.order >= newOrder && t.order < task.order)
            order = t.order + 1;
          else if (t.order <= newOrder && t.order > task.order)
            order = t.order - 1;

          return tx.task.update({ where: { id: t.id }, data: { order } });
        });

        await Promise.all(updated);
      } else {
        await tx.task.updateMany({
          where: { columnId: fromColumn, order: { gt: task.order } },
          data: { order: { decrement: 1 } },
        });

        await tx.task.updateMany({
          where: { columnId: toColumn, order: { gte: newOrder } },
          data: { order: { increment: 1 } },
        });

        await tx.task.update({
          where: { id: taskId },
          data: { columnId: toColumn, order: newOrder },
        });

        await tx.activity.create({
          data: { action: "MOVED", byId, taskId, fromColumn, toColumn },
        });
      }
    });

    // 🟢 داده جدید برگردون
    const columns = await prisma.column.findMany({
      include: { tasks: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, columns });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
