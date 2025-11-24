// app/api/proxy/route.ts  (Next.js /app route)
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetPath = searchParams.get("path") || "/";
    // سایر پارامترها را می‌توان پاس داد یا بخوانی و فوروارد کنی.

    // Credentials from environment (never checked into repo)
    const REMOTE_HOST = process.env.REMOTE_HOST; // e.g. "https://api.example.com"
    const REMOTE_USER = process.env.REMOTE_USER;
    const REMOTE_PASS = process.env.REMOTE_PASS;

    if (!REMOTE_HOST || !REMOTE_USER || !REMOTE_PASS) {
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const url = `${REMOTE_HOST}${targetPath}${buildQueryFrom(searchParams)}`;

    // Basic Auth header (encoded)
    const basic = Buffer.from(`${REMOTE_USER}:${REMOTE_PASS}`).toString("base64");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${basic}`,
        // در صورت نیاز هدرهای دیگر را اضافه کن
        "Accept": "application/json",
      },
    });

    const text = await res.text();
    // سعی کن Content-Type و status را پاس کنی
    const contentType = res.headers.get("content-type") || "text/plain";
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    console.error("proxy error:", err);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}

// helper برای ساخت query string (حذف path و برخی پارامترها اگر خواستی)
function buildQueryFrom(searchParams: URLSearchParams) {
  // اگر می‌خواهی پارامتر path را فوروارد نکنی:
  const p = new URLSearchParams(searchParams);
  p.delete("path");
  const qs = p.toString();
  return qs ? `?${qs}` : "";
}
