
"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

export const useDialogManager = () => {
  var id = (useParams() as any).id;
    const taskData = useSelector(
    (s: any) => s?.[!id ? "group" : "task"]?.list?.[0]
  );
  const [items, setItems] = useState<any>({});
  const [payloads, setPayloads] = useState<any>({});
  const [toasts, setToasts] = useState<any>([]);
  // const [co, setco] = useState<any>(0)

  // --- کنترل باز و بسته شدن ---
  const set = (id: string, v: boolean, payload?: any) => {
    setItems((x) => ({ ...x, [id]: v }));
    if (payload !== undefined) setPayloads((p) => ({ ...p, [id]: payload }));
  };

  const open = (id: string, payload?: any) => set(id, true, payload);
  const close = (id: string) => set(id, false);
  const toggle = (id: string, payload?: any) => set(id, !items[id], payload);
  const isOpen = (id: string) => items[id] === true;
  const getPayload = (id: string) => payloads[id];

  // --- Dialog Component ---
  const DialogComponent = ({ id, title, children }: any) => {
    if (typeof document === "undefined" || !isOpen(id)) return null;

    // داده‌ای که هنگام open ارسال شده
    const data = getPayload(id);

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {/* Pass data as prop to children */}
          {typeof children === "function" ? children(data) : children}
          <button
            onClick={() => close(id)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>
      </div>,
      document.body
    );
  };

  // --- Drawer Component ---
  const DrawerComponent = ({
    id,
    title,
    children,
    position = "right",
  }: any) => {
    if (typeof document === "undefined" || !isOpen(id)) return null;

    const data = getPayload(id);
    return (
      <div>{typeof children === "function" ? children(data,taskData) : children}</div>
    );
  };

  // --- Toast Manager ---
  const showToast = (
    msg: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const ToastContainer = () =>
    typeof document !== "undefined"
      ? createPortal(
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((t) => (
              <div
                key={t.id}
                className={`px-4 py-2 rounded-lg shadow text-white animate-fadeIn
                  ${
                    t.type === "success"
                      ? "bg-green-500"
                      : t.type === "error"
                      ? "bg-red-500"
                      : "bg-gray-700"
                  }`}
              >
                {t.msg}
              </div>
            ))}
          </div>,
          document.body
        )
      : null;

  return {
    open,
    close,
    toggle,
    isOpen,
    getPayload,
    DialogComponent,
    DrawerComponent,
    showToast,
    ToastContainer,
  };
};
