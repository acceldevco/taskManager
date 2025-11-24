// // import { Server } from "socket.io";
// // import { NextApiRequest, NextApiResponse } from "next";

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // export default function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (!(res.socket as any).server.io) {
// //     console.log("⚡ Initializing Socket.io server...");
// //     const io = new Server((res.socket as any).server, {
// //       path: "/socket/io",
// //     });
    
// //     (res.socket as any).server.io = io;

// //     io.on("connection", (socket) => {
// //       console.log("Client connected:", socket.id);

// //       socket.on("message", (msg) => {
// //         console.log("Received message:", msg);
// //         io.emit("message", msg); // Broadcast to all clients
// //       });

// //       socket.on("disconnect", () => {
// //         console.log("Client disconnected:", socket.id);
// //       });
// //     });
// //   }
// //   res.end();
// // }







// import { Server } from "socket.io";

// const JWT_SECRET = process.env.ACCESS_TOKEN!;

// export default async function handler(req, res) {
//   if (!res.socket.server.io) {
//     console.log("🔹 Starting new Socket.IO server...");

//     const io = new Server(res.socket.server, {
//       path: "/api/socket87/io",
//       cors: {
//         origin: "*",
//       },
//     });

//     res.socket.server.io = io;

//     io.on("connection", async (socket) => {
//       console.log("✅ New socket connection:", socket.id);

//       try {
//         // 📡 هندل پیام‌ها
//         socket.on(
//           "message"
//           // `group:${groupId}`
//           , (msg) => {
//           console.log("📩 Message received:", msg);
//           io.emit(
//             "message"
//             // `group:${groupId}`
//             , msg);
//         });

//         socket.on("disconnect", () => {
//           console.log("❌ User disconnected:", socket.id);
//         });
//       } catch (err) {
//         console.error("❌ Error verifying socket connection:", err);
//         socket.disconnect(true);
//       }
//     });
//   } else {
//     console.log("⚡ Socket.io already running");
//   }

//   res.status(200).end();
// }






// pages/api/socket87.ts
import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { bodyParser: false } };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const server = (res.socket as any)?.server;
  if (server && !server.io) {
    console.log("Initializing Socket.io server...");
    const io = new Server(server, { path: "/api/socket87" });
    server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        io.emit("message", msg); // broadcast to all
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  } else {
    console.log("Socket.io already running or server is unavailable");
  }
  res.end();
}
