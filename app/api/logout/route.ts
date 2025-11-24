import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // حذف توکن از کوکی‌ها
  const res = NextResponse.redirect(new URL("/", req.url));

  // حذف کوکی توکن
  res.cookies.delete("token");

  return res;
}
