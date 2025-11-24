
// /////////////////////////////////////////////////////////////////////////////////////////
// import { NextResponse } from "next/server";
// import prisma from "@/prisma/prisma";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.ACCESS_TOKEN!;

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const token = url.searchParams.get("token");

//     if (!token) {
//       return NextResponse.json({ error: "Token required" }, { status: 400 });
//     }

//     // بررسی JWT
//     let payload: any;
//     try {
//       payload = jwt.verify(token, JWT_SECRET);
//     } catch {
//       return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
//     }

//     // پیدا کردن کاربر
//     const user = await prisma.user.findUnique({ where: { id: payload.sub } });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // بروزرسانی وضعیت کاربر
//     await prisma.user.update({
//       where: { id: user.id },
//       data: { verified: true },
//     });

//     // ساخت JWT جدید برای کوکی (7 روز)
//     const jwtToken = jwt.sign(
//       { sub: user.id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // ست کردن کوکی امن
//     const response = NextResponse.json({ ok: true, message: "Email verified", user });
//     response.headers.set(
//       "Set-Cookie",
//       `token=${jwtToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure=${process.env.NODE_ENV === "production"}`
//     );

//     return response;
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
//   }
// }






/////////////////////////////////////////////////////////////////////////////////////////
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_TOKEN!;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    // بررسی JWT
    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL("/verify-error", req.url)); // اگر توکن نامعتبر بود
    }

    // پیدا کردن کاربر
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });

    if (!user) {
      return NextResponse.redirect(new URL("/verify-error", req.url)); // کاربر پیدا نشد
    }

    // بروزرسانی وضعیت کاربر به verified
    await prisma.user.update({
      where: { id: user.id },
      data: { verified: true },
    });

    // ساخت JWT جدید (اعتبار ۷ روز)
    const jwtToken = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ ساخت پاسخ با ریدایرکت
    const response = NextResponse.redirect(new URL("/user", req.url));

    // ست کردن کوکی جدید
    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 روز
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.redirect(new URL("/verify-error", req.url));
  }
}
