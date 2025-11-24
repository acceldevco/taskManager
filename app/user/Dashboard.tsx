"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
  BarChart3,
  Filter,
  Search,
  Bell,
  Settings,
  ChevronDown,
  Plus,
  MoreVertical,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
// import { ContextMain } from "@/context/context";
// import { Pagination } from "@/components/Paginate";
// import { useLoadingData } from "@/hook/useLoadingData";
import TasksCalendar from "@/components/TasksCalendar";
import { useLazyVerify } from "@/hook/useLazyVerify";
const userStats:any = {};
const Dashboard = ({ crypto }: any) => {
  const [activeTab, setActiveTab] = useState("overview");

  const [data, setData] = useState<any>();

  // var ui: any = useContext(ContextMain);
  var { loading, user, error }: any = useLazyVerify();
  // const { dataMutation } = useLoadingData(
  //   3,
  //   "",
  //   ""
  //   // JSON.stringify(groupBody),
  // );
  async function getData() {
    if (user) {
      try {
        var groupBody = await crypto({
          table: "member",

          where: {
            userEmail: user.email,
          },
          include: {
            group: {
              include: {
                _count: {
                  select: {
                    members: true,
                  },
                },
              },
            },
            assignedTasks: {
              select: {
                task: {
                  include: {
                    comments: true,
                  },
                },
              },
            },
          },
        });
        // همزمان هر دو fetch اجرا می‌شوند
        const [userRes] = await Promise.all([
          fetch("/api/getdata", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(groupBody),
          }),
        ]);

        // همزمان داده‌ها را به JSON تبدیل می‌کنیم
        const [userJson] = await Promise.all([userRes.json()]);

        console.log("User data:", userJson.data);
        const now = new Date();
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

        userJson.data.forEach((u:any) => {
          const tasks = u.assignedTasks.map((t:any) => t.task);

          // فیلتر تسک‌های ۷ روز اخیر
          const recentTasks = tasks
          .filter(
            (t:any) => new Date(t.dueDate) >= sevenDaysAgo
          );

          // شمارش وضعیت‌ها
          const statusCount = tasks.reduce((acc:any, t:any) => {
            acc[t.status] = (acc[t.status] || 0) + 1;
            return acc;
          }, {});

          // شمارش اولویت‌ها
          const priorityCount = tasks.reduce((acc:any, t:any) => {
            acc[t.priority] = (acc[t.priority] || 0) + 1;
            return acc;
          }, {});

          // افزودن به آبجکت کلی
          userStats[u.userEmail] = {
            totalTasks: tasks.length,
            status: statusCount,
            priority: priorityCount,
            recentTasks: recentTasks.map((t:any) => ({
              id: t.id,
              title: t.title,
              createdAt: t.createdAt,
              priority: t.priority,
              dueDate: t.dueDate,
            })),
          };
        });

        console.log();

        // console.log(stats);

        // ذخیره‌ی داده‌ها
        setData(
          Object.values(userStats)
          // userJson:userJson
        );
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
  }
  useEffect(() => {
    getData();
  }, [user]);

  const getPriorityColor = (priority:any) => {
    switch (priority) {
      case "بالا":
        return "text-red-500 bg-red-50 border-red-200";
      case "متوسط":
        return "text-yellow-500 bg-yellow-50 border-yellow-200";
      default:
        return "text-green-500 bg-green-50 border-green-200";
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      dir="rtl"
    >
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                داشبورد پروژه
              </h1>
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "overview"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  نمای کلی
                </button>
                <button
                  onClick={() => setActiveTab("tasks")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "tasks"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  وظایف
                </button>
                <button
                  onClick={() => setActiveTab("teams")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "teams"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  تیم‌ها
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="bg-transparent border-none outline-none text-sm w-64"
                />
              </div>
              <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-all">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-100 transition-all">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">
                    {userData.name}
                  </p>
                  <p className="text-xs text-slate-500">{userData.email}</p>
                </div>
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-xl ring-2 ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>
      </header> */}
      {data ? (
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-blue-100/50 border border-blue-100/50 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                  +12%
                </span>
              </div>
              <h3 className="text-slate-500 text-sm mb-1">کل وظایف</h3>
              <p className="text-3xl font-bold text-slate-800">
                {/* {JSON.stringify(data?.total)} */}

                {data?.[0]?.totalTasks ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/50 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                  {/* {userData.stats.pendingTasks} */}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm mb-1">در انتظار</h3>
              <p className="text-3xl font-bold text-slate-800">
                {/* {JSON.stringify(data?.status?.IN_PROGRESS)} */}

                {data?.[0]?.status?.IN_PROGRESS ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-green-100/50 border border-green-100/50 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                  +8%
                </span>
              </div>
              <h3 className="text-slate-500 text-sm mb-1">تکمیل شده</h3>
              <p className="text-3xl font-bold text-slate-800">
                {/* {JSON.stringify(data?.status?.DONE} */}

                {data?.[0]?.status?.DONE ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-red-100/50 border border-red-100/50 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full">
                  فوری
                </span>
              </div>
              <h3 className="text-slate-500 text-sm mb-1">اولویت بالا</h3>
              <p className="text-3xl font-bold text-slate-800">
                {data?.[0]?.priority?.HIGH ?? 0}
              </p>
            </div>
          </div>
          <TasksCalendar data={data?.[0]?.recentTasks}/>
        </main>
      ) : (
        <div className="p-2 flex w-[100%] h-[100%] justify-center items-center">
           <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
        </div>
        
      )}
    </div>
  );
};

export default Dashboard;
