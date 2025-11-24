// "use client";
// import {
//   QueryClient,
//   useInfiniteQuery,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import CryptoJS from "crypto-js";
// interface PageResponse<T> {
//   columns: T[];
//   nextCursor?: string | null;
// }

// export function useLoadingData<T = any>(
//   type: string,
//   mutateEndpoint: string,
//   body: any = {},
//   limit: any = 1
// ) {
//   const queryClient = useQueryClient();
//   // new QueryClient({
//   //   defaultOptions: {
//   //     queries: {
//   //       refetchInterval: 5000,
//   //       // initialDataUpdatedAt: 1,
//   //       staleTime: 5000,
//   //     },
//   //   },
//   // });
//   const queryKey = [
//     "data",
//     // , type, limit, body
//   ];

//   const query = useInfiniteQuery<PageResponse<T>, Error>({
//     initialDataUpdatedAt: 1,
//     queryKey,
//     queryFn: async ({ pageParam = undefined }) => {
//       console.log(queryKey);

//       const res = await fetch(
//         `/api/${type}?limit=${limit}${pageParam ? `&cursor=${pageParam}` : ""}`,
//         {
//           method: Object.keys(body).length ? "POST" : "GET",
//           body: Object.keys(body).length ? JSON.stringify(body) : undefined,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       if (!res.ok) throw new Error("Failed to fetch data");
//       // console.log(await res.json());

//       return res.json();
//     },
//     getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,

//     initialPageParam: undefined,
//   });

//   const mutation = useMutation({
//     mutationFn: async ({
//       method,
//       body,
//     }: {
//       method: "POST" | "PUT" | "DELETE";
//       body: any;
//     }) => {
//       const SECRETKAY = "adminacceldev";
//       const dataString = JSON.stringify(body);

//       // رمزنگاری با AES
//       const encrypted = CryptoJS.AES.encrypt(dataString, SECRETKAY).toString();
//       const res = await fetch(`/api/${mutateEndpoint}`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body:JSON.stringify(encrypted),
//       });

//       if (!res.ok) throw new Error("Mutation failed");
//       return await res.json();
//     },
//     onMutate: (newData) => {
//       console.log(newData);

//       queryClient.cancelQueries({ queryKey });
//       const previousData = queryClient.getQueryData(queryKey);
//       console.log(previousData);

//       // Optimistic update
//       queryClient.setQueryData(["data"], (old: any) => {
//         console.log(old);

//         if (!old) return old;
//         console.log("old", old);

//         return {
//           ...old,
//           // pages: old.pages.map((page: any) => ({
//           //   ...page,
//           //   columns: page.columns.map((col: any) => {
//           //     if (col.id === newData.columnId && newData.taskId) {
//           //       // Example: move task inside column
//           //       const taskIndex = col.tasks.findIndex(
//           //         (t: any) => t.id === newData.taskId
//           //       );
//           //       if (taskIndex !== -1) {
//           //         const [task] = col.tasks.splice(taskIndex, 1);
//           //         col.tasks.splice(newData.newOrder, 0, task);
//           //       }
//           //     }
//           //     return col;
//           //   }),
//           // })),
//         };
//       });

//       return { previousData };
//     },
//     onError: (err, newData, context) => {
//       if (context?.previousData) {
//         queryClient.setQueryData(queryKey, context.previousData);
//       }
//     },
//     onSettled: () => {
//       // console.log(queryClient.isMutating());
//       // query.refetch();
//       // queryClient.invalidateQueries({ queryKey: ["data", type, limit, body] });
//       queryClient.invalidateQueries({
//         queryKey: [
//           "data",
//           // , type, limit
//         ],
//       });
//       queryClient.refetchQueries({ queryKey: queryKey });
//     },
//   });

//   return { query, mutation, queryKey };
// }

///////////////////////////////////////////////////////////////////////////////////////////
// "use client";
// import {
//   useInfiniteQuery,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import CryptoJS from "crypto-js";
// import { useState, useEffect } from "react";

// interface PageResponse<T> {
//   columns: T[];
//   nextCursor?: string | null;
// }

// export function useLoadingData<T = any>(
//   type: string,
//   mutateEndpoint: string,
//   body: any = {},
//   limit: number = 1
// ) {
//   const queryClient = useQueryClient();
//   const [search, setSearch] = useState<string>("");

//   // ایجاد یک مقدار debounced برای سرچ (جلوگیری از درخواست پشت‌سر‌هم)
//   const [debouncedSearch, setDebouncedSearch] = useState(search);
//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedSearch(search), 500);
//     return () => clearTimeout(handler);
//   }, [search]);

//   const queryKey = ["data", type, limit, debouncedSearch];

//   const query = useInfiniteQuery<
//     PageResponse<T>,
//     Error,
//     T[],
//     readonly unknown[]
//   >({
//     queryKey,
//     // initialDataUpdatedAt: 1,
//     queryFn: async ({
//       pageParam = undefined,
//     }: // undefined
//     any) => {
//       console.log(pageParam);

//       const res = await fetch(
//         `/api/${type}?limit=${pageParam.lastPage}${
//           pageParam.nextCursor !== null
//             ? `&cursor=${pageParam.nextCursor}`
//             : ""
//         }${debouncedSearch ? `&search=${debouncedSearch}` : ""}`,
//         {
//           method: Object.keys(body).length ? "POST" : "GET",
//           body: Object.keys(body).length ? JSON.stringify(body) : undefined,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (!res.ok) throw new Error("Failed to fetch data");
//       return res.json();
//     },
//     getNextPageParam: (lastPage: any) => {
//       console.log(lastPage);

//       return {
//         lastPage: lastPage.lastPage + 1,
//         nextCursor: lastPage?.nextCursor ?? null
//       };
//     },

//     select: (data) => data?.pages.flatMap((p: any) => p?.items) ?? [],
//     initialPageParam: {
//       lastPage: 1,
//       nextCursor: null,
//     },
//     // initialDataUpdatedAt:undefined
//   });

//   const mutation = useMutation({
//     mutationFn: async ({
//       method,
//       body,
//     }: {
//       method: "POST" | "PUT" | "DELETE";
//       body: any;
//     }) => {
//       const SECRET_KEY = "adminacceldev";
//       const dataString = JSON.stringify(body);
//       const encrypted = CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();

//       const res = await fetch(`/api/${mutateEndpoint}`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(encrypted),
//       });

//       if (!res.ok) throw new Error("Mutation failed");
//       return await res.json();
//     },
//     onMutate: (newData) => {
//       queryClient.cancelQueries({ queryKey });
//       const previousData = queryClient.getQueryData(queryKey);

//       // آپدیت خوش‌بینانه
//       queryClient.setQueryData(queryKey, (old: any) => old);
//       return { previousData };
//     },
//     onError: (err, newData, context) => {
//       if (context?.previousData) {
//         queryClient.setQueryData(queryKey, context.previousData);
//       }
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey });
//       queryClient.refetchQueries({ queryKey });
//     },
//   });

//   return {
//     query,
//     mutation,
//     queryKey,
//     search,
//     setSearch, // این رو اضافه کردیم تا بتونی در کامپوننت سرچ انجام بدی
//   };
// }

////////////////////////////////////////////////////////////////////////////////////////////
"use client";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import CryptoJS from "crypto-js";
import { useState, useEffect, useCallback } from "react";

interface PageResponse<T> {
  items: T[];
  nextCursor?: string | null;
}

export function useLoadingData<T = any>(
  type: string,
  mutateEndpoint: string,
  body: any = {},
  limit: number = 1
) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const queryKey = ["data", type, limit, debouncedSearch];

  const query = useInfiniteQuery<any>({
    queryKey,
    refetchOnReconnect: true,
    retryDelay: (failureCount: number, error: unknown) => {
      // exponential backoff: 1s, 2s, 4s... capped at 30s
      const base = 1000;
      return Math.min(base * 2 ** Math.max(0, failureCount - 1), 30000);
    },
    
    select: useCallback((data: any) => {
      return data?.pages.flatMap((p: any) => p?.items ?? p) ?? [];
    }, []),
    
    queryFn: async ({ pageParam }: any) => {
      const cursor = pageParam?.nextCursor ?? null;

      const res = await fetch(
        `/api/${type}?limit=${limit}${
          cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""
        }${debouncedSearch ? `&search=${debouncedSearch}` : ""}`,
        {
          method: Object.keys(body).length ? "POST" : "GET",
          body: Object.keys(body).length ? JSON.stringify(body) : undefined,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
    // getNextPageParam: (lastPage) =>
    //   lastPage?.nextCursor ? { nextCursor: lastPage.nextCursor } : undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.nextCursor) {
        return { nextCursor: lastPage.nextCursor };
      }
      return undefined; // 👈 دقیقاً این مهمه!
    },
    initialPageParam: null,
  });

  const mutation = useMutation({
    mutationFn: async ({
      method,
      body,
    }: {
      method: "POST" | "PUT" | "DELETE";
      body: any;
    }) => {
      const SECRET_KEY = "adminacceldev";
      const dataString = JSON.stringify(body);
      const encrypted = CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();

      const res = await fetch(`/api/${mutateEndpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(encrypted),
      });

      if (!res.ok) throw new Error("Mutation failed");
      return await res.json();
    },
    onMutate: async (data: any) => {
      // console.log(data);

      await queryClient.cancelQueries({ queryKey });
    },
    onSettled(data, error, variables, onMutateResult, context) {
      console.log(data, error, variables);
    },
    onSuccess: () => {
      console.log("success");
      query.refetch();
      queryClient
        .invalidateQueries({ queryKey: ["data"] })
        .then(() => {
          console.log("suc");
        })
        .catch(() => {
          console.log("err");
        });
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey:queryKey });
    // },
  });

  return {
    query,
    mutation,
    queryKey,
    search,
    setSearch,
  };
}
