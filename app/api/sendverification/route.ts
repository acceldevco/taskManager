
///////////////////////////////////////////////////////////////////////////////////////////
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { sendVerificationEmail } from "@/utils/sendemail";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_TOKEN!;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // پیدا کردن یا ساخت کاربر
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, verified: false },
    });

    // ساخت JWT برای تایید ایمیل (اعتبار 1 روز)
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // لینک تأیید با encodeURIComponent
    const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${encodeURIComponent(token)}`;

    // ارسال ایمیل
    await sendVerificationEmail(email, verifyLink);

    return NextResponse.json({ ok: true, message: "Verification email sent" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
