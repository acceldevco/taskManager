// import { NextApiRequest, NextApiResponse } from "next";
// import { Server } from "socket.io";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (!res.socket.server.io) {
//     const io = new Server(res.socket.server, {
//       path: "/api/socket/io",
//       cors: {
//         origin: "*",
//       },
//     });

//     res.socket.server.io = io;

//     io.on("connection", (socket) => {
//       console.log("A user connected");

//       socket.on("message", (msg) => {
//         console.log(msg);

//         io.emit("message", msg);
//       });

//       socket.on("disconnect", () => {
//         console.log("User disconnected");
//       });
//     });
//   }

//   res.status(200).end();
// }

/////////////////////////////////////////////////////////////////////////////////////////

// import prisma from "@/prisma/prisma";
// import { NextApiRequest, NextApiResponse } from "next";
// import { cookies } from "next/headers";
// import { Server, Socket } from "socket.io";
// import jwt from "jsonwebtoken";
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   // useRouter().query
//   // const { id }: any = //req.query;

//   const JWT_SECRET = process.env.ACCESS_TOKEN!;
//   if (!res.socket.server.io) {
//     const io = new Server(res.socket.server, {
//       path: "/api/socket/io",
//       cors: {
//         origin: "*",
//       },
//     });

//     res.socket.server.io = io;

//     let payload: any;

//     // async function gettoken() {
//     //   return (await cookies()).get("token")?.value;
//     // }

//     // async function getmember() {
//     //   return await prisma.member.findUnique({
//     //     where: {
//     //       userEmail_groupId: {
//     //         userEmail: payload.email,
//     //         groupId: id,
//     //       },
//     //     },
//     //   });
//     // }

//     io.on("connection", (socket) => {
//       // console.log("A user connected");
//       // getmember().then((d) => {
//       //   console.log("❌ Not a member of this group");
//       //   socket.disconnect(true);
//       //   return;
//       // });
//       // if (!member) {
//       // }

//       try {
//         // console.log();

//         //  console.log('daaaa',socket.handshake.query.id);
//        var test = prisma.member
//           .findUnique({
//             where: {
//               userEmail_groupId: {
//                 userEmail: jwt.verify(req.cookies.token ?? "", JWT_SECRET)
//                   ?.email,
//                 groupId: socket.handshake.query.id ?? "",
//               },
//             },
//           })
//           .then((d: any) => {
//             payload = d.id;
//             console.log(d);
//             return d.id
//           })
//           .catch((d) => {
//             socket.disconnect(true);
//           });
//         console.log("dasdasdddd", test);
//         // gettoken().then((d: any) => {
//         //   payload = jwt.verify(d, JWT_SECRET);
//         //   console.log(payload);
//         // });

//         // console.log(payload);
//         // return NextResponse.json({ ok: true, message: "verified", payload });
//       } catch {
//         socket.disconnect(true);
//         return;
//         // return NextResponse.json({ error: "User not found" }, { status: 404 });
//       }

//       socket.on("message", (msg) => {
//         console.log(msg);

//         io.emit("message", msg);
//       });

//       socket.on("disconnect", () => {
//         console.log("User disconnected");
//       });
//     });
//   }

//   res.status(200).end();
// }
///////////////////////////////////////////////////////////////////////////
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/prisma";

const JWT_SECRET = process.env.ACCESS_TOKEN!;

export default async function handler(req:any, res:any) {
  if (!res.socket.server.io) {
    console.log("🔹 Starting new Socket.IO server...");

    const io = new Server(res.socket.server, {
      path: "/api/socket/io",
      cors: {
        origin: "*",
      },
    });

    res.socket.server.io = io;

    io.on("connection", async (socket) => {
      console.log("✅ New socket connection:", socket.id);

      try {
        // 🧠 داده ارسالی از کلاینت (query)
        const groupId = socket.handshake.query.id;
        const token = req.cookies.token//socket.handshake.query.token; // از کلاینت بفرستش

        // if (!token) {
        //   console.log("❌ No token provided");
        //   socket.disconnect(true);
        //   return;
        // }

        // // 🧩 بررسی JWT
        // const decoded = jwt.verify(token, JWT_SECRET);
        // if (!decoded?.email) {
        //   console.log("❌ Invalid token");
        //   socket.disconnect(true);
        //   return;
        // }

        // // 🧠 بررسی عضویت در گروه
        // const member = await prisma.member.findUnique({
        //   where: {
        //     userEmail_groupId: {
        //       userEmail: decoded.email,
        //       groupId: String(groupId),
        //     },
        //   },
        // });

        // if (!member) {
        //   console.log("❌ Not a member of this group");
        //   socket.disconnect(true);
        //   return;
        // }

        // console.log("✅ User verified:", decoded.email);

        // 📡 هندل پیام‌ها
        socket.on(
          "tasks:update"
          // `group:${groupId}`
          , (msg) => {
          console.log("📩 Message received:", msg);
          io.emit(
            "tasks:update"
            // `group:${groupId}`
            , msg);
        });

        socket.on("disconnect", () => {
          console.log("❌ User disconnected:", socket.id);
        });
      } catch (err) {
        console.error("❌ Error verifying socket connection:", err);
        socket.disconnect(true);
      }
    });
  } else {
    console.log("⚡ Socket.io already running");
  }

  res.status(200).end();
}
