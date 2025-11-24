"use client";
import React, { useEffect, useState } from "react";

function AddBadge() {

  const [inputValue, setInputValue] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ارسال به API
  const sendToAPI = async (newNames: string[]) => {
    try {
      setLoading(true);
      const res = await fetch("/api/main", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: newNames }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add member");
      }

      // می‌توانی نتیجه API را نمایش دهی یا پیام موفقیت بدهی
      console.log("Added members:", newNames);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    const trimmed = inputValue.trim();
    if (trimmed && !names.includes(trimmed)) {
      const updatedNames = [...names, trimmed];
      setNames(updatedNames);
      setInputValue("");
      await sendToAPI([trimmed]); // ارسال اسم جدید به API
    }
  };

  const handleRemove = async (name: string) => {
    setNames(names.filter((n) => n !== name));
    // در صورت نیاز می‌توان حذف از سرور هم انجام شود
    // await fetch(`/api/removeMember`, { method: "POST", body: JSON.stringify({ name }) })
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a name"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {names.map((name) => (
          <div
            key={name}
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
          >
            <span>{name}</span>
            <button
              onClick={() => handleRemove(name)}
              className="ml-2 text-red-500 font-bold hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddBadge;
