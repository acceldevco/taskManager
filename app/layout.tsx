"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./output.css";
import { ReduxProvider } from "./provider";
// import TodoApp from "./features/todos/TodoApp";
import { ContextMain, ContextProvider } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Sparkles,
  Twitter,
  X,
} from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";
import Header from "@/components/Header";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const segment: any = useSelectedLayoutSegments();

  // const [scrolled, setScrolled] = useState(false);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => setScrolled(window.scrollY > 50);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  const queryClient = //new QueryClient();
      new QueryClient({
      defaultOptions: {
        queries: {
          // refetchOnMount:true,
          // initialDataUpdatedAt:true,
          refetchInterval: 5000,
          // refetchOnWindowFocus:true,
          retry:3
          // initialDataUpdatedAt: 1,
          // staleTime: 5000,
        },
      },
    });
  return (
    <html lang="en">
      <head>
        <title>تسک منیجر</title>
         {/* <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script> */}
      </head>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-white" dir="rtl">
          {/* <ReduxProvider> */}
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <ContextProvider>
                <Header segment={segment} />

                {children}

                {segment?.length === 0 ? (
                  <footer className="bg-slate-900 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4">
                      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-2xl font-bold">
                              پروژه‌یار
                            </span>
                          </div>
                          <p className="text-slate-400 text-lg leading-relaxed mb-6">
                            ابزار مدیریت پروژه برای تیم‌های ایرانی که به دنبال
                            سادگی، سرعت و کارایی هستند.
                          </p>
                          <div className="flex gap-4">
                            {[
                              <Twitter />,
                              <Facebook />,
                              <Linkedin />,
                              <Instagram />,
                            ].map((social, i) => (
                              <a
                                key={i}
                                href="#"
                                className="w-12 h-12 bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 rounded-xl flex items-center justify-center transition"
                              >
                                <span className="sr-only"></span>
                                <div className="w-5 h-5 ">{social}</div>
                              </a>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-6">محصول</h4>
                          <ul className="space-y-4">
                            {[
                              "ویژگی‌ها",
                              "قیمت‌ها",
                              "دمو",
                              "به‌روزرسانی‌ها",
                            ].map((item, i) => (
                              <li key={i}>
                                <a
                                  href="#"
                                  className="text-slate-400 hover:text-white transition"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-6">شرکت</h4>
                          <ul className="space-y-4">
                            {[
                              "درباره ما",
                              "وبلاگ",
                              "فرصت‌های شغلی",
                              "تماس با ما",
                            ].map((item, i) => (
                              <li key={i}>
                                <a
                                  href="#"
                                  className="text-slate-400 hover:text-white transition"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-6">پشتیبانی</h4>
                          <ul className="space-y-4">
                            {[
                              "مرکز راهنما",
                              "API",
                              "وضعیت سرویس",
                              "حریم خصوصی",
                            ].map((item, i) => (
                              <li key={i}>
                                <a
                                  href="#"
                                  className="text-slate-400 hover:text-white transition"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="border-t border-slate-800 pt-10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                          <p className="text-slate-400">
                            © ۱۴۰۳ پروژه‌یار. تمامی حقوق محفوظ است.
                          </p>
                          <div className="flex gap-8">
                            <a
                              href="#"
                              className="text-slate-400 hover:text-white transition"
                            >
                              قوانین و مقررات
                            </a>
                            <a
                              href="#"
                              className="text-slate-400 hover:text-white transition"
                            >
                              حریم خصوصی
                            </a>
                            <a
                              href="#"
                              className="text-slate-400 hover:text-white transition"
                            >
                              کوکی‌ها
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </footer>
                ) : (
                  ""
                )}
              </ContextProvider>
            </Provider>
             <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>

          {/* </ReduxProvider> */}
        </div>
      </body>
    </html>
  );
}
