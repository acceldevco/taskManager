import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table");
    const whereParam = searchParams.get("where");

    if (!table || !(table in prisma)) {
      return NextResponse.json(
        { error: "Invalid or missing table name" },
        { status: 400 }
      );
    }

    let where = {};
    if (whereParam) {
      try {
        where = JSON.parse(whereParam);
      } catch (err) {
        return NextResponse.json(
          { error: "Invalid JSON in where parameter" },
          { status: 400 }
        );
      }
    }

    // @ts-ignore
    const data = await prisma[table].findMany({ where });
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ POST (برای فرستادن JSON مستقیم توی body)
export async function POST(req: Request) {
  const JWT_SECRET = process.env.ACCESS_TOKEN!;
  try {
    const body = await req.json();

   var payload:any = jwt.verify(body, JWT_SECRET);
  //  console.log(payload);
   

  // jwt.verify()
    const { table, where, include } = payload;

    if (!table || !(table in prisma)) {
      return NextResponse.json(
        { error: "Invalid or missing table name" },
        { status: 400 }
      );
    }
    prisma.comment.findMany({
      where:{
        authorId:""
      },
      include:{
        task:true
      }
    })
    const data = await (prisma as any)[table].findMany({
      include: include || {},
      where: where || {},
    });

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
