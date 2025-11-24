"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    // fetch("/api/socket87"); // روشن کردن سرور Socket
    const newSocket = io("/", { path: "/api/socket87", query: { id: 'params' } });
    // const newSocket = io({
    //   path: "/chat/socket/io",
    // });

    newSocket.on("connect", () => {
      console.log("Connected to server:", newSocket.id);
    });

    newSocket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    
    
    if (!message.trim() || !socket) return;
    console.log(socket);
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Chat App</h2>
      <div style={{ border: "1px solid #ccc", height: 200, overflowY: "scroll", padding: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "80%" }}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} style={{ width: "18%" }}>
        Send
      </button>
    </div>
  );
}