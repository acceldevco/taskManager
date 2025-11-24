// import { NextResponse } from "next/server";

// // import { authOptions } from "@/lib/auth"; // تنظیمات auth
// import prisma from "@/prisma/prisma"; // اتصال Prisma
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// export async function GET(req: Request) {
//   const JWT_SECRET = process.env.ACCESS_TOKEN!;
//   let payload: any;

//   const token: any = (await cookies()).get("token")?.value;

//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//     NextResponse.json({ ok: true, message: "verified", payload });
//     // گرفتن سشن برای بدست آوردن ایمیل کاربر
//     // const session = await getServerSession(authOptions);
//     // const user = session?.user;
//     if (!payload?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("skip") || "1", 10);
//     const limit = parseInt(searchParams.get("take") || "6", 10);
//     const skip = (page - 1) * limit;

//     const groups = await prisma.group.findMany({
//       skip: skip,
//       take: limit,
//       where: {
//         OR: [
//           {
//             created_by: {
//               is: {
//                 email: payload.email,
//               },
//             },
//           },
//           {
//             members: {
//               some: {
//                 user: {
//                   email: payload.email,
//                 },
//               },
//             },
//           },
//         ],
//       },
//       include: {
//         created_by: true, // اطلاعات سازنده گروه
//         members: {
//           include: { user: true },
//         },
//       },
//     });

//     return NextResponse.json(groups);
//   } catch (error) {
//     console.error("Error fetching groups:", error);
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//     // return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// // app/api/getdatagroup/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/prisma/prisma";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export async function GET(req: Request) {
//   const JWT_SECRET = process.env.ACCESS_TOKEN!;
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   try {
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // 🔐 Decode JWT
//     const payload: any = jwt.verify(token, JWT_SECRET);
//     if (!payload?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // 🧩 گرفتن پارامترها از URL
//     const { searchParams } = new URL(req.url);
//     const limit = parseInt(searchParams.get("limit") || "1", 10);
//     const cursor = searchParams.get("cursor") || undefined;
//   console.log(limit,cursor);

//     // 🔍 شرط مشترک برای کاربر
//     const whereCondition = {
//       OR: [
//         { created_by: { is: { email: payload.email } } },
//         {
//           members: {
//             some: {
//               user: { email: payload.email },
//             },
//           },
//         },
//       ],
//     };

//     // 🧠 واکشی گروه‌ها
//     const groups = await prisma.group.findMany({
//       take: limit + 1, // +1 برای فهمیدن اینکه آیا صفحه‌ی بعدی وجود دارد
//       ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
//       where: whereCondition,
//       orderBy: { createdAt: "desc" },
//       include: {
//         created_by: true,
//         members: { include: { user: true } },
//       },
//     });

//     // 🎯 مشخص کردن nextCursor
//     // let nextCursor: string | null = null;
//     // if (groups.length > limit) {
//     //   const nextItem = groups.pop(); // حذف آخرین آیتم اضافه‌شده برای صفحه بعد
//     //   nextCursor = nextItem?.id ?? null;
//     // }

//     let nextCursor: string | null = null;
// if (groups.length > limit) {
//   const nextItem = groups.pop()!;
//   nextCursor = nextItem.id;
// }

//     return NextResponse.json({
//       items: groups,
//       nextCursor,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching groups:", error);
//     return NextResponse.json(
//       { error: "Server error or invalid token" },
//       { status: 500 }
//     );
//   }
// }
////////////////////////////////////////////////////////////////////////
// app/api/getdatagroup/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const JWT_SECRET = process.env.ACCESS_TOKEN!;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔐 Decode JWT
    const payload: any = jwt.verify(token, JWT_SECRET);
    if (!payload?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🧩 گرفتن پارامترها از URL
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const cursor = searchParams.get("cursor") || undefined;
    const search = searchParams.get("search")?.trim() || ""; // 👈 دریافت عبارت جستجو

    // 🔍 شرط پایه برای کاربر فعلی
    const baseCondition = {
      OR: [
        { created_by: { is: { email: payload.email } } },
        {
          members: {
            some: {
              user: { email: payload.email },
            },
          },
        },
      ],
    };

    // 🔎 افزودن شرط سرچ (اگر وجود داشته باشد)
    const whereCondition = search
      ? {
          AND: [
            baseCondition,
            {
              OR: [
                { name: { contains: search, mode: "insensitive" as const } },
                {
                  description: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
                {
                  members: {
                    some: {
                      user: {
                        name: {
                          contains: search,
                          mode: "insensitive" as const,
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
        }
      : baseCondition;

    // 🧠 واکشی گروه‌ها با فیلتر، سرچ و pagination
    const groups = await prisma.group.findMany({
      take: limit + 1, // +1 برای تشخیص وجود صفحه بعد
      ...(cursor ? { cursor: { id: cursor } } : {}),
      where: whereCondition,
      // orderBy: { createdAt: "desc" },
      orderBy: [
        { createdAt: "desc" },
        { id: "desc" }, // برای اطمینان از ترتیب پایدار
      ],
      include: {
        created_by: true,
        members: { include: { user: true } },
      },
    });

    console.log(groups);

    // 🎯 مشخص کردن nextCursor
    let nextCursor: string | null = null;

    if (groups.length > limit) {
      const nextItem = groups.pop()!;

      nextCursor = nextItem.id;
    } else {
      nextCursor = null; // 👈 حتماً
    }

    return NextResponse.json({
      lastPage: limit,
      items: groups,
      nextCursor,
    });
  } catch (error) {
    console.error("❌ Error fetching groups:", error);
    return NextResponse.json(
      { error: "Server error or invalid token" },
      { status: 500 }
    );
  }
}
