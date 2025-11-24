// "use client";
// import {
//   fetchGroups,
//   handleGroup,
//   ListMember,
//   setgroup,
// } from "@/app/features/group/groupSlice";
// import { Pagination } from "@/components/Paginate";
// import { ContextMain } from "@/context/context";
// import { useLoadingData } from "@/hook/useLoadingData";
// import {
//   Users,
//   Lock,
//   Globe,
//   Calendar,
//   Plus,
//   Trash2,
//   PenSquare,
//   SquarePen,
//   Search,
// } from "lucide-react";
// import { useParams } from "next/navigation";
// import { useContext, useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CryptoJS from "crypto-js";
// import Input from "@/components/Input";
// export default function GroupList({ crypto }: any) {
//   var [state, setstate] = useState<any>(1);
//   const ui = useContext(ContextMain);
//   const dispatch = useDispatch<any>();
//   const params: any = useParams();

//   // اصلاح useLoadingData
//   const {
//     query: groupsQuery,
//     mutation: dataMutation,
//     setSearch,
//     search,
//   }: any = useLoadingData(
//     // params.id ? "getdatatasks" :
//     "getdatagroup",
//     "main",
//     false,
//     // params.id ? { id: params.id } : {}, // body parameter
//     3
//   );

//   const { data, isFetchingNextPage, hasNextPage, isFetching, isFetched,isError,failureCount }: any =
//     groupsQuery;
//   // تعریف تابع getData
//   // useEffect(() => {
//   //   // ui.setcrypto([
//   //   //   (data: any) => {
//   //   //     const SECRETKAY = "adminacceldev";
//   //   //     const dataString = JSON.stringify(data);

//   //   //     // رمزنگاری با AES
//   //   //     const encrypted = CryptoJS.AES.encrypt(
//   //   //       dataString,
//   //   //       SECRETKAY
//   //   //     ).toString();
//   //   //     return encrypted;
//   //   //   },
//   //   // ]);
//   // }, []);

//   const loadMoreRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!groupsQuery.hasNextPage || !loadMoreRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           groupsQuery.fetchNextPage();
//         }
//       },
//       { threshold: 1 } // وقتی 50% المان دیده شد
//     );

//     const el = loadMoreRef.current;
//     observer.observe(el);

//     return () => observer.unobserve(el);
//   }, [groupsQuery.hasNextPage, groupsQuery.fetchNextPage, loadMoreRef]);
//   return (
//     <div dir="rtl" className="min-h-screen shadow-2xl p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* {JSON.stringify(select.group.list)} */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">گروه‌های من</h1>
//           <p className="text-gray-600">مدیریت و مشاهده گروه‌های خود</p>
//         </div>
//         <div className=" flex justify-between">
//           {/* {isError ?'true':"false"} */}
//           <Input
//             defaultValue={search}
//             onChange={(e) => (
//               console.log(e.target.value), setSearch(e.target.value)
//             )}
//             icon={<Search />}
//             placeholder="جستجو..."
//             // className="border p-2 rounded"
//           />
//           <div className=" px-6 py-4">
//             <div className="flex items-center justify-end">
//               <button
//                 onClick={() => {
//                   ui.open("dialoggroup", {
//                     data: {},
//                     // fun: () => getData(),
//                     user: ui.user.email,
//                   });
//                 }}
//                 className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//               >
//                 <Plus size={18} />
//                 <span>وظیفه جدید</span>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-wrap [&>*]:min-w-[350px] gap-6 justify-center md:justify-start">
//           {
//             // data?
//             // allGroups
//             // Array.isArray(select?.group?.list) &&
//             // select?.group?.list?
//             // allGroups
//             data
//               // state?
//               ?.map((d) => (
//                 <div
//                   key={d.id}
//                   className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] flex-shrink-0"
//                 >
//                   {/* Cover with Gradient Overlay */}
//                   <div className="relative h-48 sm:h-52 lg:h-48 overflow-hidden">
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-br ${d?.gradient} opacity-80 group-hover:opacity-95 transition-opacity duration-500`}
//                     />

//                     {/* Action Buttons */}
//                     <div className="flex gap-2 z-10 absolute left-3 top-3">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           ui.open("dialogalert", {
//                             type: "error",
//                             title: "میخواهید محتوا حذف شود ",
//                             message: " ",
//                             onConfirm: 1,
//                             id: d.id,
//                             // fun: async () => await getData(),
//                             table: "group",
//                           });
//                           // delete handler
//                         }}
//                         className="p-2 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 group/btn"
//                       >
//                         <Trash2
//                           size={16}
//                           className="text-red-500 group-hover/btn:text-red-600 transition-colors"
//                           strokeWidth={1.5}
//                         />
//                       </button>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           console.log("edit");
//                           ui.open("dialoggroup", {
//                             data: d,
//                             fun: () => getData(),
//                           });
//                         }}
//                         className="p-2 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 group/btn"
//                       >
//                         <SquarePen
//                           size={16}
//                           className="text-gray-600 group-hover/btn:text-blue-600 transition-colors"
//                           strokeWidth={1.5}
//                         />
//                       </button>
//                     </div>

//                     <img
//                       src={d?.coverImage}
//                       alt={d?.name}
//                       className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
//                     />

//                     {/* Floating Badge */}
//                     <div className="absolute top-3 right-3">
//                       <div
//                         className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-105 ${
//                           d.visibility === "PUBLIC"
//                             ? "bg-white/95 text-gray-700 border border-white/60"
//                             : "bg-gray-900/80 text-white border border-white/20"
//                         }`}
//                       >
//                         {d?.visibility === "PUBLIC" ? (
//                           <Globe className="w-4 h-4" />
//                         ) : (
//                           <Lock className="w-4 h-4" />
//                         )}
//                         <span className="text-xs font-bold tracking-wide">
//                           {d?.visibility === "PUBLIC" ? "عمومی" : "خصوصی"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div
//                     className="p-4 sm:p-5 lg:p-6"
//                     onClick={() => {
//                       window.open(`/user/task/${d.id}`, "_blank");
//                     }}
//                   >
//                     {/* Title */}
//                     <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300 line-clamp-1">
//                       {d?.name}
//                     </h2>

//                     <p className="text-sm text-gray-600 leading-relaxed mb-4 sm:mb-5 line-clamp-2 group-hover:text-gray-700 transition-colors">
//                       {d?.description ?? "...."}
//                     </p>

//                     {/* Stats Grid */}
//                     <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-5">
//                       <div
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           dispatch(ListMember(d));
//                           if (d.created_by.id === ui.user.sub) {
//                             ui.open("addmember", {
//                               groupId: d.id,
//                               data: d,
//                             });
//                           }
//                         }}
//                         className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 sm:p-3.5 hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 hover:scale-105 cursor-pointer border border-blue-100 flex-1"
//                       >
//                         <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm flex-shrink-0">
//                           <Users className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="flex flex-col min-w-0">
//                           <span className="text-xs text-blue-600 font-medium">
//                             اعضا
//                           </span>
//                           <span className="text-base sm:text-lg font-bold text-gray-900">
//                             {d?.members?.length}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-3 sm:p-3.5 transition-all duration-300 hover:scale-105 border border-purple-100 flex-1">
//                         <div className="w-9 h-9 rounded-lg bg-purple-500 flex items-center justify-center shadow-sm flex-shrink-0">
//                           <Calendar className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="flex flex-col min-w-0">
//                           <span className="text-xs text-purple-600 font-medium">
//                             تاریخ
//                           </span>
//                           <span className="text-sm font-bold text-gray-900 truncate">
//                             {new Date(d.createdAt).toLocaleDateString("fa-IR", {
//                               month: "short",
//                               day: "numeric",
//                             })}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Creator Info */}
//                     <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-gray-200">
//                       <div className="relative flex-shrink-0">
//                         <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">
//                           {d?.created_by?.email?.charAt(0).toUpperCase()}
//                         </div>

//                       </div>
//                       <div className="flex flex-col flex-1 min-w-0">
//                         <span className="text-xs text-gray-500 font-medium">
//                           ایجاد شده توسط
//                         </span>
//                         <span className="text-sm font-semibold text-gray-900 truncate">
//                           {d?.created_by?.email}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Animated Bottom Border */}
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

//                   {/* Shine Effect */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
//                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//                   </div>
//                 </div>
//               ))
//           }
//         </div>
//       </div>
//       {/* <button onClick={()=>groupsQuery.fetchNextPage()}>more</button> */}
//       <div ref={loadMoreRef} className="text-center py-4">
//         {isFetchingNextPage
//           ? "در حال بارگذاری..."
//           : hasNextPage
//           ? "در حال بررسی صفحه بعد..."
//           : ""}
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////

"use client";
import {
  fetchGroups,
  handleGroup,
  ListMember,
  setgroup,
} from "@/app/features/group/groupSlice";
import { Pagination } from "@/components/Paginate";
import { ContextMain } from "@/context/context";
import { useLoadingData } from "@/hook/useLoadingData";
import {
  Users,
  Lock,
  Globe,
  Calendar,
  Plus,
  Trash2,
  PenSquare,
  SquarePen,
  Search,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import Input from "@/components/Input";
import { useLazyVerify } from "@/hook/useLazyVerify";

export default function GroupList({ crypto }: any) {
  const [state, setstate] = useState<any>(1);
  const ui = useContext(ContextMain);
  const dispatch = useDispatch<any>();
  const params: any = useParams();

  const {
    query: groupsQuery,
    mutation: dataMutation,
    setSearch,
    search,
  }: any = useLoadingData("getdatagroup", "main", false, 3);

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    isFetched,
    isError,
    failureCount,
  }: any = groupsQuery;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  var { loading, user, error }: any = useLazyVerify();
  useEffect(() => {
    if (!groupsQuery.hasNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          groupsQuery.fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const el = loadMoreRef.current;
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [groupsQuery.hasNextPage, groupsQuery.fetchNextPage, loadMoreRef]);

  const getVisibilityConfig = (visibility: string) => {
    return visibility === "PUBLIC"
      ? { icon: Globe, text: "عمومی", color: "text-blue-600", bg: "bg-blue-50" }
      : {
          icon: Lock,
          text: "خصوصی",
          color: "text-gray-700",
          bg: "bg-gray-100",
        };
  };

  const getGradientClass = (gradient: string) => {
    const gradients: { [key: string]: string } = {
      default: "from-blue-500 via-purple-500 to-pink-500",
      blue: "from-blue-400 to-blue-600",
      purple: "from-purple-400 to-purple-600",
      pink: "from-pink-400 to-pink-600",
      orange: "from-orange-400 to-orange-600",
      teal: "from-teal-400 to-teal-600",
    };
    return gradients[gradient] || gradients.default;
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              گروه‌های من
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            مدیریت و سازماندهی گروه‌های خود را به صورت حرفه‌ای انجام دهید
          </p>
        </div>

        {/* Actions Bar */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="flex-1 w-full lg:max-w-md">
              <Input
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="w-4 h-4" />}
                placeholder="جستجو در گروه‌ها..."
                className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Create Button */}
            <button
              onClick={() => {
                !loading &&
                  ui.open("dialoggroup", {
                    data: {},
                    user: user.email,
                  });
              }}
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-semibold"
            >
              <div className="relative">
                <Plus
                  size={20}
                  className="transition-transform group-hover:rotate-90"
                />
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>
              <span>گروه جدید</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {data?.map((d: any) => {
            const visibilityConfig = getVisibilityConfig(d.visibility);
            const VisibilityIcon = visibilityConfig.icon;
            const gradientClass = getGradientClass(d.gradient);

            return (
              <div
                key={d.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-200/60 flex-shrink-0
                   w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(32%-18px)] flex flex-col"
              >
                {/* Cover Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-90 group-hover:opacity-95 transition-opacity duration-500`}
                  />
                  <img
                    src={d?.coverImage || "/images/default-cover.jpg"}
                    alt={d?.name || "گروه"}
                    className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Action Buttons */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        ui.open("dialogalert", {
                          type: "error",
                          title: "حذف گروه",
                          message: "آیا از حذف این گروه اطمینان دارید؟",
                          onConfirm: 1,
                          id: d.id,
                          table: "group",
                        });
                      }}
                      aria-label="حذف گروه"
                      className="p-2 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 group/btn"
                    >
                      <Trash2
                        size={16}
                        className="text-red-500 group-hover/btn:text-red-600 transition-colors"
                        strokeWidth={2}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        ui.open("dialoggroup", {
                          data: d,
                        });
                      }}
                      aria-label="ویرایش گروه"
                      className="p-2 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 group/btn"
                    >
                      <SquarePen
                        size={16}
                        className="text-gray-600 group-hover/btn:text-blue-600 transition-colors"
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  {/* Visibility Badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-105 ${visibilityConfig.bg} border border-white/60`}
                    >
                      <VisibilityIcon className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-wide">
                        {visibilityConfig.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div
                  className="flex-1 p-6 flex flex-col justify-between"
                  onClick={() => {
                    window.open(`/user/task/${d.id}`, "_blank");
                  }}
                >
                  <div>
                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 line-clamp-1">
                      {d?.name}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {d?.description || "توضیحاتی برای این گروه وجود ندارد..."}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-3 mb-6">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(ListMember(d));

                        if (!loading) {
                          if (d.created_by.id === user.sub) {
                            ui.open("addmember", {
                              groupId: d.id,
                              data: d,
                            });
                          }
                        }
                      }}
                      className="flex-1 flex items-center gap-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 hover:scale-105 cursor-pointer border border-blue-100"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-blue-600 font-medium">
                          اعضا
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          {d?.members?.length || 0}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center gap-3 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 transition-all duration-300 hover:scale-105 border border-purple-100">
                      <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center shadow-sm flex-shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-purple-600 font-medium">
                          تاریخ ایجاد
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {new Date(d.createdAt).toLocaleDateString("fa-IR")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Creator */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60">
                    <div className="relative flex-shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md text-sm">
                        {d?.created_by?.email?.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-xs text-gray-500 font-medium">
                        ایجاد شده توسط
                      </span>
                      <span className="text-sm font-semibold text-gray-900 truncate">
                        {d?.created_by?.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loading More Indicator */}
        <div ref={loadMoreRef} className="text-center py-8">
          {isFetchingNextPage ? (
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <span>در حال بارگذاری گروه‌های بیشتر...</span>
            </div>
          ) : hasNextPage ? (
            <div className="text-gray-500">
              اسکرول کنید برای دیدن گروه‌های بیشتر
            </div>
          ) : data?.length > 0 ? (
            <div className="text-gray-400">همه گروه‌ها بارگذاری شدند</div>
          ) : null}
        </div>

        {/* Empty State */}
        {!isFetching && data?.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-3">
              گروهی یافت نشد
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              هنوز گروهی ایجاد نکرده‌اید. اولین گروه خود را ایجاد کنید!
            </p>
            <button
              onClick={() => {
                if (loading) {
                  ui.open("dialoggroup", {
                    data: {},
                    user: user.email,
                  });
                }
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
            >
              ایجاد اولین گروه
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
