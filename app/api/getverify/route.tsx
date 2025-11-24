// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// const JWT_SECRET = process.env.ACCESS_TOKEN!;
// export async function GET(req: Request) {
//   let payload: any;

//   const token: any = (await cookies()).get("token")?.value;
//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//     return NextResponse.json({ ok: true, message: "verified", payload });
//   } catch {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }
// }

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

const JWT_SECRET = process.env.ACCESS_TOKEN!;

// تابع verify JWT با caching
const verifyToken = unstable_cache(
  async (token: string) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  },
  [JWT_SECRET] // استفاده از یک آرایه ثابت برای keyParts
);

export async function GET(req: Request) {
  try {
    // دریافت token از کوکی
    const token: string | undefined = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }

    // verify با cache
    const payload: any = jwt.verify(token, JWT_SECRET)//verifyToken(token);

    return NextResponse.json({ ok: true, message: "verified", payload });
  } catch (err) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
