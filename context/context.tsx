"use client";
import { useDialogManager } from "@/hook/dialog";
import React, { createContext, useEffect, useState } from "react";

export const ContextMain = createContext<any>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dialog = useDialogManager();
  const [user, setUser] = useState<any>(null);
  const [crypto, setcrypto] = useState<any>([]);
  const [data, setdata] = useState<any>({
    imagesadmin: JSON.parse(localStorage.getItem("image") || "[]"),
  });
  // const [csrfToken, setCsrfToken] = useState<string | null>(null);

  async function getData() {
    // try {
    //   const res = await fetch("/api/getdata", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(
    //       await crypto[0]({
    //         table: "group",
    //         where: {
    //           members: {
    //             some: {
    //               userEmail: user?.email,
    //             },
    //           },
    //         },
    //         include: {
    //           created_by: true, // اطلاعات سازنده گروه
    //           members: {
    //             include: { user: true },
    //           },
    //         },
    //       })
    //     ),
    //   });
    //   const json = await res.json();
    //   setdata(json)
    //   // console.log('dasdddddd:',ui);
    //   // setData(json.data); // ذخیره توی state
    // } catch (err) {
    //   console.error("خطا در گرفتن داده:", err);
    // }
  }

  // useEffect(() => {
  //   const fetchCsrfToken = async () => {
  //     try {
  //       const response = await axios.get("/api/csrf");
  //       setCsrfToken(response.data.csrfToken);
  //     } catch (error) {
  //       console.error("Failed to fetch CSRF token:", error);
  //     }
  //   };
  //   fetchCsrfToken();
  // }, []);

  useEffect(() => {
    const fetchVerify = async () => {
      try {
        const res = await fetch("/api/getverify");
        if (!res.ok) throw new Error("Failed to fetch verify data");
        const data = await res.json();
        setUser(data.payload);
      } catch (err) {
        console.error("Error fetching verify:", err);
      }
    };
    getData();
    fetchVerify();
  }, []);

  return (
    <ContextMain.Provider
      value={{ ...dialog, user, setcrypto, crypto, data, setdata }}
    >
      {children}
    </ContextMain.Provider>
  );
};
