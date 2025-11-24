// // "use client";
// // import { ContextMain } from "@/context/context";
// // import {
// //   Users,
// //   Lock,
// //   Globe,
// //   Calendar,
// //   Plus,
// //   Trash2,
// //   PenSquare,
// //   SquarePen,
// // } from "lucide-react";
// // import { useContext, useEffect, useState } from "react";

// // export default function Page() {
// //   const [form, setForm] = useState<any>({
// //     name: "",
// //     description: "",
// //     visibility: "private",
// //     cover_image: "",
// //     members: [],
// //   });
// //   const ui = useContext(ContextMain);

// //   const [data, setData] = useState(null);
// //   async function getData() {
// //     try {
// //       const res = await fetch("/api/getdata", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           table: "group",
// //           where: {
// //             members: {
// //               some: {
// //                 userEmail: ui?.user?.email,
// //               },
// //             },
// //           },
// //           include: {
// //             created_by: true, // اطلاعات سازنده گروه
// //             members: {
// //               include: { user: true },
// //             },
// //           },
// //         }),
// //       });

// //       const json = await res.json();
// //       console.log(json);
      
// //       setData(json.data); // ذخیره توی state
// //     } catch (err) {
// //       console.error("خطا در گرفتن داده:", err);
// //     }
// //   }
// //   useEffect(() => {
// //     getData();
// //   }, []);

// //   // const groups = [
// //   //   {
// //   //     id: "g1",
// //   //     name: "توسعه بک‌اند",
// //   //     description: "گروه مسئول توسعه و نگهداری سرور و API ها",
// //   //     created_at: "2025-09-15T10:00:00Z",
// //   //     created_by: {
// //   //       id: "u1",
// //   //       name: "علی رضایی",
// //   //     },
// //   //     member_count: 5,
// //   //     visibility: "private",
// //   //     cover_image:
// //   //       "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
// //   //     gradient: "from-blue-500 to-purple-600",
// //   //   },
// //   //   {
// //   //     id: "g2",
// //   //     name: "طراحی UI/UX",
// //   //     description: "تیم طراحی تجربه کاربری و رابط کاربری محصول",
// //   //     created_at: "2025-09-20T12:30:00Z",
// //   //     created_by: {
// //   //       id: "u3",
// //   //       name: "سارا محمدی",
// //   //     },
// //   //     member_count: 3,
// //   //     visibility: "public",
// //   //     cover_image:
// //   //       "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
// //   //     gradient: "from-pink-500 to-rose-600",
// //   //   },
// //   //   {
// //   //     id: "g3",
// //   //     name: "مارکتینگ",
// //   //     description: "گروه بازاریابی و تبلیغات برای جذب کاربر",
// //   //     created_at: "2025-09-25T09:15:00Z",
// //   //     created_by: {
// //   //       id: "u5",
// //   //       name: "محمد کریمی",
// //   //     },
// //   //     member_count: 4,
// //   //     visibility: "private",
// //   //     cover_image:
// //   //       "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
// //   //     gradient: "from-emerald-500 to-teal-600",
// //   //   },
// //   // ];

// //   return (
// //     <div dir="rtl" className="min-h-screen shadow-2xl p-6">
// //       {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
// //       <div className="max-w-6xl mx-auto">
// //         <div className="mb-8">
// //           <h1 className="text-4xl font-bold text-gray-900 mb-2">گروه‌های من</h1>
// //           <p className="text-gray-600">مدیریت و مشاهده گروه‌های خود</p>
// //         </div>
// //         <div className="  ">
// //           <div className="max-w-7xl mx-auto px-6 py-4">
// //             <div className="flex items-center justify-end">
// //               {/* <div>
// //               <h1 className="text-2xl font-bold text-gray-900">
// //                 سیستم مدیریت پروژه
// //               </h1>
// //               <p className="text-sm text-gray-500 mt-1">
// //                 مدیریت وظایف و همکاری تیمی
// //               </p>
// //             </div> */}
// //               <button
// //                 onClick={() => {
// //                   ui.open("dialoggroup",{data:{},fun:()=>getData(),user:ui.user.email});
// //                 }}
// //                 className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// //               >
// //                 <Plus size={18} />
// //                 <span>وظیفه جدید</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="flex flex-wrap [&>*]:min-w-[350px] gap-6 justify-center md:justify-start">
// //           {data?.map((d) => (
// //             <div
// //               key={d.id}
// //               className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] flex-shrink-0"
// //             >
// //               {/* Cover with Gradient Overlay */}
// //               <div className="relative h-48 sm:h-52 lg:h-48 overflow-hidden">
// //                 <div
// //                   className={`absolute inset-0 bg-gradient-to-br ${d?.gradient} opacity-80 group-hover:opacity-95 transition-opacity duration-500`}
// //                 />

// //                 {/* Action Buttons */}
// //                 <div className="flex gap-2 z-10 absolute left-3 top-3">
// //                   <button
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                     ui.open("dialogalert", {
// //                     type: "error",
// //                     title: "میخواهید محتوا حذف شود ",
// //                     message: " ",
// //                     onConfirm: 1,
// //                     id: d.id,
// //                     fun: async () => await getData(),
// //                     table: "group",
// //                   });
// //                       // delete handler
// //                     }}
// //                     className="p-2 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 group/btn"
// //                   >
// //                     <Trash2
// //                       size={16}
// //                       className="text-red-500 group-hover/btn:text-red-600 transition-colors"
// //                       strokeWidth={1.5}
// //                     />
// //                   </button>
// //                   <button
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       console.log("edit");
// //                       ui.open("dialoggroup",{data:d,fun:()=>getData()});
// //                     }}
// //                     className="p-2 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 group/btn"
// //                   >
// //                     <SquarePen
// //                       size={16}
// //                       className="text-gray-600 group-hover/btn:text-blue-600 transition-colors"
// //                       strokeWidth={1.5}
// //                     />
// //                   </button>
// //                 </div>

// //                 <img
// //                   src={d?.coverImage}
// //                   alt={d?.name}
// //                   className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
// //                 />

// //                 {/* Floating Badge */}
// //                 <div className="absolute top-3 right-3">
// //                   <div
// //                     className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-105 ${
// //                       d.visibility === "PUBLIC"
// //                         ? "bg-white/95 text-gray-700 border border-white/60"
// //                         : "bg-gray-900/80 text-white border border-white/20"
// //                     }`}
// //                   >
// //                     {d?.visibility === "PUBLIC" ? (
// //                       <Globe className="w-4 h-4" />
// //                     ) : (
// //                       <Lock className="w-4 h-4" />
// //                     )}
// //                     <span className="text-xs font-bold tracking-wide">
// //                       {d?.visibility === "PUBLIC" ? "عمومی" : "خصوصی"}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Content */}
// //               <div
// //                 className="p-4 sm:p-5 lg:p-6"
// //                 onClick={() => {
// //                   window.open(`/user/task/${d.id}`, "_blank");
// //                 }}
// //               >
// //                 {/* Title */}
// //                 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300 line-clamp-1">
// //                   {d?.name}
// //                 </h2>

// //                 <p className="text-sm text-gray-600 leading-relaxed mb-4 sm:mb-5 line-clamp-2 group-hover:text-gray-700 transition-colors">
// //                   {d?.description}
// //                 </p>

// //                 {/* Stats Grid */}
// //                 <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-5">
// //                   <div
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       ui.open("addmember", {
// //                         groupId: d.id,
// //                         data: d,
// //                         fun: async () => await getData(),
// //                       });
// //                     }}
// //                     className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 sm:p-3.5 hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 hover:scale-105 cursor-pointer border border-blue-100 flex-1"
// //                   >
// //                     <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm flex-shrink-0">
// //                       <Users className="w-4 h-4 text-white" />
// //                     </div>
// //                     <div className="flex flex-col min-w-0">
// //                       <span className="text-xs text-blue-600 font-medium">
// //                         اعضا
// //                       </span>
// //                       <span className="text-base sm:text-lg font-bold text-gray-900">
// //                         {d?.members?.length}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-3 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-3 sm:p-3.5 transition-all duration-300 hover:scale-105 border border-purple-100 flex-1">
// //                     <div className="w-9 h-9 rounded-lg bg-purple-500 flex items-center justify-center shadow-sm flex-shrink-0">
// //                       <Calendar className="w-4 h-4 text-white" />
// //                     </div>
// //                     <div className="flex flex-col min-w-0">
// //                       <span className="text-xs text-purple-600 font-medium">
// //                         تاریخ
// //                       </span>
// //                       <span className="text-sm font-bold text-gray-900 truncate">
// //                         {new Date(d.createdAt).toLocaleDateString("fa-IR", {
// //                           month: "short",
// //                           day: "numeric",
// //                         })}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Creator Info */}
// //                 <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-gray-200">
// //                   <div className="relative flex-shrink-0">
// //                     <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">
// //                       {d?.created_by?.email?.charAt(0).toUpperCase()}
// //                     </div>
// //                     <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
// //                   </div>
// //                   <div className="flex flex-col flex-1 min-w-0">
// //                     <span className="text-xs text-gray-500 font-medium">
// //                       ایجاد شده توسط
// //                     </span>
// //                     <span className="text-sm font-semibold text-gray-900 truncate">
// //                       {d?.created_by?.email}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Animated Bottom Border */}
// //               <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

// //               {/* Shine Effect */}
// //               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
// //                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }












// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import {
//   Calendar,
//   CheckCircle2,
//   Clock,
//   Users,
//   TrendingUp,
//   BarChart3,
//   Filter,
//   Search,
//   Bell,
//   Settings,
//   ChevronDown,
//   Plus,
//   MoreVertical,
//   AlertCircle,
// } from "lucide-react";
// import { ContextMain } from "@/context/context";

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");

//   const [data, setData] = useState<any>({});

//   var ui: any = useContext(ContextMain);

//   async function getData() {
//     if (ui?.user) {
//       try {
//         const groupBody = {
//           table: "member",

//           where: {
//             userEmail: "berowob467@erynka.com", //ui.user.email,
//           },
//           include: {
//             group: {
//               include: {
//                 _count: {
//                   select: {
//                     members: true,
//                   },
//                 },
//               },
//             },
//             assignedTasks: {
//               select: {
//                 task: {
//                   include: {
//                     comments: true,
//                   },
//                 },
//               },
//             },
//           },
//         };

//         // همزمان هر دو fetch اجرا می‌شوند
//         const [userRes] = await Promise.all([
//           fetch("/api/getdata", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(groupBody),
//           }),
//         ]);

//         // همزمان داده‌ها را به JSON تبدیل می‌کنیم
//         const [userJson] = await Promise.all([userRes.json()]);

//         console.log("User data:", userJson.data);
//         const now = new Date();
//         const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

//         const stats = userJson.data.map((u) => {
//           const tasks = u.assignedTasks.map((t) => t.task);
//           const recent = tasks.filter(
//             (t) => new Date(t.createdAt) >= sevenDaysAgo
//           );
//           return {
//             userEmail: u.userEmail,
//             total: tasks.length,
//             status: tasks.reduce(
//               (a, t) => ((a[t.status] = (a[t.status] || 0) + 1), a),
//               {}
//             ),
//             priority: tasks.reduce(
//               (a, t) => ((a[t.priority] = (a[t.priority] || 0) + 1), a),
//               {}
//             ),
//             recentTasks: recent.map((t) => ({
//               id: t.id,
//               title: t.title,
//               createdAt: t.createdAt,
//               priority: t.priority,
//               dueDate: t.dueDate,
//             })),
//           };
//         });

//         console.log(stats);

//         // console.log(stats);

//         // ذخیره‌ی داده‌ها
//         setData({
//           ...stats[0],
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     }
//   }
//   useEffect(() => {
//     getData();
//   }, [ui.user]);

//   const userData = {
//     name: "علی رضایی",
//     email: "ali@example.com",
//     avatar: "https://cdn.example.com/avatar/ali.png",
//     verified: true,
//     stats: {
//       totalGroups: 3,
//       totalTasks: 12,
//       pendingTasks: 5,
//       completedTasks: 7,
//       highPriorityTasks: 2,
//       recentActivityCount: 10,
//     },
//   };

//   const groups = [
//     {
//       id: "group-1",
//       name: "Frontend Team",
//       visibility: "خصوصی",
//       membersCount: 6,
//       tasksCount: 8,
//       progress: 60,
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       id: "group-2",
//       name: "Backend Team",
//       visibility: "عمومی",
//       membersCount: 4,
//       tasksCount: 15,
//       progress: 40,
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       id: "group-3",
//       name: "UI Design Team",
//       visibility: "خصوصی",
//       membersCount: 3,
//       tasksCount: 6,
//       progress: 80,
//       color: "from-orange-500 to-red-500",
//     },
//   ];

//   const tasks = [
//     {
//       id: 1,
//       title: "پیاده‌سازی صفحه ورود",
//       priority: "بالا",
//       dueDate: "2024-10-20",
//       status: "در انتظار",
//       group: "Frontend Team",
//       assignees: 2,
//       comments: 3,
//       labels: ["UI", "Auth"],
//     },
//     {
//       id: 2,
//       title: "یکپارچه‌سازی API",
//       priority: "متوسط",
//       dueDate: "2024-10-18",
//       status: "در حال انجام",
//       group: "Backend Team",
//       assignees: 1,
//       comments: 5,
//       labels: ["API"],
//     },
//     {
//       id: 3,
//       title: "طراحی داشبورد",
//       priority: "بالا",
//       dueDate: "2024-10-15",
//       status: "در حال انجام",
//       group: "UI Design Team",
//       assignees: 3,
//       comments: 8,
//       labels: ["Design", "UI"],
//     },
//   ];

//   const activities = [
//     {
//       id: 1,
//       action: "به‌روزرسانی",
//       taskTitle: "طراحی داشبورد",
//       timestamp: "2 ساعت پیش",
//       groupName: "UI Design Team",
//       user: "شما",
//       type: "update",
//     },
//     {
//       id: 2,
//       action: "نظر جدید",
//       taskTitle: "یکپارچه‌سازی API",
//       timestamp: "5 ساعت پیش",
//       groupName: "Backend Team",
//       user: "سارا محمدی",
//       type: "comment",
//     },
//     {
//       id: 3,
//       action: "تسک تکمیل شد",
//       taskTitle: "بهینه‌سازی کوئری‌ها",
//       timestamp: "1 روز پیش",
//       groupName: "Backend Team",
//       user: "رضا احمدی",
//       type: "complete",
//     },
//   ];

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "بالا":
//         return "text-red-500 bg-red-50 border-red-200";
//       case "متوسط":
//         return "text-yellow-500 bg-yellow-50 border-yellow-200";
//       default:
//         return "text-green-500 bg-green-50 border-green-200";
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
//       dir="rtl"
//     >
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-5">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 داشبورد پروژه
//               </h1>
//               <div className="hidden md:flex items-center gap-4">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`px-4 py-2 rounded-lg transition-all ${
//                     activeTab === "overview"
//                       ? "bg-blue-500 text-white shadow-lg"
//                       : "text-slate-600 hover:bg-slate-100"
//                   }`}
//                 >
//                   نمای کلی
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("tasks")}
//                   className={`px-4 py-2 rounded-lg transition-all ${
//                     activeTab === "tasks"
//                       ? "bg-blue-500 text-white shadow-lg"
//                       : "text-slate-600 hover:bg-slate-100"
//                   }`}
//                 >
//                   وظایف
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("teams")}
//                   className={`px-4 py-2 rounded-lg transition-all ${
//                     activeTab === "teams"
//                       ? "bg-blue-500 text-white shadow-lg"
//                       : "text-slate-600 hover:bg-slate-100"
//                   }`}
//                 >
//                   تیم‌ها
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="hidden lg:flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2">
//                 <Search className="w-4 h-4 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="جستجو..."
//                   className="bg-transparent border-none outline-none text-sm w-64"
//                 />
//               </div>
//               <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-all">
//                 <Bell className="w-5 h-5 text-slate-600" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <button className="p-2 rounded-xl hover:bg-slate-100 transition-all">
//                 <Settings className="w-5 h-5 text-slate-600" />
//               </button>
//               <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
//                 <div className="text-right">
//                   <p className="text-sm font-semibold text-slate-800">
//                     {userData.name}
//                   </p>
//                   <p className="text-xs text-slate-500">{userData.email}</p>
//                 </div>
//                 <img
//                   src={userData.avatar}
//                   alt="Avatar"
//                   className="w-10 h-10 rounded-xl ring-2 ring-blue-100"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-2xl p-6 shadow-lg shadow-blue-100/50 border border-blue-100/50 hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
//                 <BarChart3 className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xs font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
//                 +12%
//               </span>
//             </div>
//             <h3 className="text-slate-500 text-sm mb-1">کل وظایف</h3>
//             <p className="text-3xl font-bold text-slate-800">
//               {/* {JSON.stringify(data?.total)} */}
//               {data?.total ?? 0}
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/50 hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
//                 <Clock className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
//                 {userData.stats.pendingTasks}
//               </span>
//             </div>
//             <h3 className="text-slate-500 text-sm mb-1">در انتظار</h3>
//             <p className="text-3xl font-bold text-slate-800">
//               {/* {JSON.stringify(data?.status?.IN_PROGRESS)} */}
//               {data?.status?.IN_PROGRESS ?? 0}
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg shadow-green-100/50 border border-green-100/50 hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
//                 <CheckCircle2 className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xs font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
//                 +8%
//               </span>
//             </div>
//             <h3 className="text-slate-500 text-sm mb-1">تکمیل شده</h3>
//             <p className="text-3xl font-bold text-slate-800">
//               {/* {JSON.stringify(data?.status?.DONE} */}
//               {data?.status?.DONE ?? 0}
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg shadow-red-100/50 border border-red-100/50 hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
//                 <AlertCircle className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full">
//                 فوری
//               </span>
//             </div>
//             <h3 className="text-slate-500 text-sm mb-1">اولویت بالا</h3>
//             <p className="text-3xl font-bold text-slate-800">
//               {/* {JSON.stringify(data?.priority?.HIGH} */}
//               {data?.priority?.HIGH ?? 0}
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Groups */}
//             {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-slate-800">تیم‌های من</h2>
//                 <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200">
//                   <Plus className="w-4 h-4" />
//                   تیم جدید
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {groups.map((group) => (
//                   <div
//                     key={group.id}
//                     className="p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg group cursor-pointer"
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center gap-4">
//                         <div
//                           className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center`}
//                         >
//                           <Users className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
//                             {group.name}
//                           </h3>
//                           <div className="flex items-center gap-3 mt-1">
//                             <span className="text-xs text-slate-500">
//                               {group.membersCount} عضو
//                             </span>
//                             <span className="text-xs text-slate-400">•</span>
//                             <span className="text-xs text-slate-500">
//                               {group.tasksCount} وظیفه
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <button className="p-2 hover:bg-slate-100 rounded-lg transition-all">
//                         <MoreVertical className="w-4 h-4 text-slate-400" />
//                       </button>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-slate-600">پیشرفت</span>
//                         <span className="font-semibold text-slate-800">
//                           {group.progress}%
//                         </span>
//                       </div>
//                       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                         <div
//                           className={`h-full bg-gradient-to-r ${group.color} transition-all duration-500`}
//                           style={{ width: `${group.progress}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div> */}

//             {/* Tasks */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-slate-800">وظایف اخیر</h2>
//                 <div className="flex items-center gap-2">
//                   <button className="p-2 hover:bg-slate-100 rounded-lg transition-all">
//                     <Filter className="w-4 h-4 text-slate-600" />
//                   </button>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 {/* {JSON.stringify(data.recentTasks)} */}
//                 {data.recentTasks?.map((task) => (
//                   <div
//                     key={task.id}
//                     className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md cursor-pointer group"
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
//                           {task.title}
//                         </h3>
//                       </div>
//                       <span
//                         className={`text-xs px-3 py-1 rounded-full border ${getPriorityColor(
//                           task.priority
//                         )}`}
//                       >
//                         {task.priority}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <div className="flex items-center gap-4 text-slate-500">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           <span>
//                             {new Date(task.dueDate).toLocaleDateString("fa")}
//                           </span>
//                         </div>
//                       </div>
//                       <span className="text-xs text-slate-400">
//                         {task.group}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Activity Feed */}
//             <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
//               <h3 className="text-lg font-bold mb-4">اقدامات سریع</h3>
//               <div className="space-y-3">
//                 <button className="w-full flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all">
//                   <Plus className="w-5 h-5" />
//                   <span>ایجاد وظیفه جدید</span>
//                 </button>
//                 <button className="w-full flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all">
//                   <Users className="w-5 h-5" />
//                   <span>دعوت اعضای تیم</span>
//                 </button>
//                 <button className="w-full flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all">
//                   <Calendar className="w-5 h-5" />
//                   <span>مشاهده تقویم</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;





import Dashboard from "./Dashboard";
// import GroupList from "./Group";
import jwt from "jsonwebtoken";
async function page() {
  const JWT_SECRET = process.env.ACCESS_TOKEN!;
  async function crypto(params: any) {
    "use server";
    const token = jwt.sign(params, JWT_SECRET, { expiresIn: "1d" })
    return token;
  }
  return ( <>
  <Dashboard crypto={crypto}/>
  </> );
}

export default page;