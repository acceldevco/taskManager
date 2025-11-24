import prisma from "@/prisma/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // 👈 گرفتن body
    var user = await prisma.user.findMany({
      where: {
        email: body.email, // 👈 فیلتر بر اساس ایمیل
      },
    });
    return user.length > 0
      ? new Response("ok", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      : new Response(JSON.stringify({ error: "empty" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });

    // return new Response("ok", {
    //   status: 200,
    //   headers: { "Content-Type": "application/json" },
    // });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
