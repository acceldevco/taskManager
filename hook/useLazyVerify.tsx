import { useState, useEffect, useCallback, useRef } from "react";

export const useLazyVerify = (shouldLoad = true) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef:any = useRef(null);

  const fetchVerify = useCallback(async () => {
    if (!shouldLoad) return;
    setLoading(true);
    setError(null);

    // ایجاد AbortController برای مدیریت لغو درخواست
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/getverify", {
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Failed to fetch verify data");

      const data = await res.json();
      setUser(data.payload);
    } catch (err:any) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [shouldLoad]);

  // Lazy fetch هنگام mount یا تغییر shouldLoad
  useEffect(() => {
    fetchVerify();

    // Cleanup هنگام unmount یا تغییر shouldLoad
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchVerify]);

  // قابلیت refresh دستی
  const refresh = useCallback(() => {
    fetchVerify();
  }, [fetchVerify]);

  return { user, loading, error, refresh };
};
