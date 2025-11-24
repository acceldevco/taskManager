
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";
import Tokens from "csrf";
const JWT_SECRET = process.env.ACCESS_TOKEN!;
const CSRF = process.env.CSRF_SECRET!;
const CSRF_HEADER = "XSRF-TOKEN";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  // const csrfToken = request.headers.get(CSRF_HEADER);
  const csrfToken = request.cookies.get(CSRF_HEADER)?.value;
  const { pathname } = request.nextUrl;

  let userId: string | null = null;

  // مسیرهایی که نیاز به توکن ندارند
  const excludedPaths = ["/api/verify", "/api/sendverification", "/auth"];
  const tokens = new Tokens();
  // بررسی CSRF فقط برای مسیرهای API محافظت‌شده
  // if (
  //   !excludedPaths.some((path) => pathname.startsWith(path)) &&
  //   pathname.startsWith("/api")
  // ) {
  //   if (!csrfToken) {
  //     return new NextResponse("CSRF token missing", { status: 403 });
  //   }

  //   const ok = tokens.verify(CSRF, csrfToken);
  //   if (!ok) return new NextResponse("CSRF token missing", { status: 403 });
  // }

  // بررسی JWT برای مسیرهای محافظت‌شده
  if (!excludedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
      userId = payload.sub;
    } catch {
      const response = NextResponse.redirect(new URL("/auth", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // اگر توکن دارد و به صفحه‌ی auth می‌رود → بفرستش صفحه اصلی
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/user/:path*", "/api/:path*"],
};
