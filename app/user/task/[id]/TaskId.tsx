
"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Plus,
  Clock,
  User,
  MessageCircle,
  FilePenLine,
  Trash2,
  SquarePen,
  ClipboardList,
  LoaderCircle,
  CircleAlert,
  RotateCcw,
  Check,
} from "lucide-react";
import CryptoJS from "crypto-js";
import taskSlice, {
  moveColumn,
  moveTask,
  setTasks,
} from "@/app/features/tasks/taskSlice";
import { ContextMain } from "@/context/context";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "@/app/features/group/groupSlice";
import { store } from "@/store/store";
import { RootState } from "@reduxjs/toolkit/query";
import { useLoadingData } from "@/hook/useLoadingData";
import { useLazyVerify } from "@/hook/useLazyVerify";

var main: any = {};
var information: any = {};

// کامپوننت TaskCard بهبود یافته
function TaskCard({ crypto, task, index, dataget, loading }: any) {
  const ui: any = useContext(ContextMain);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 
            hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 
            cursor-move transition-all duration-300 group
            ${snapshot.isDragging ? "shadow-lg rotate-2 scale-105" : ""}
          `}
        >
          <div className="flex justify-between items-start mb-3 gap-2">
            <h5 className="font-bold text-gray-800 text-sm sm:text-base leading-tight flex-1 line-clamp-2">
              {task.title}
            </h5>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 sm:gap-2">
              <button
                onClick={() => {
                  ui.open("dialogtask", { data: task, fun: () => dataget() });
                }}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FilePenLine size={14} className="text-gray-500" />
              </button>
              <button
                onClick={() => {
                  ui.open("dialogalert", {
                    type: "error",
                    title: "میخواهید محتوا حذف شود ",
                    message: " ",
                    onConfirm: 1,
                    id: task.id,
                    fun: () => dataget(),
                    table: "task",
                  });
                }}
                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
            {task?.description ?? '...'}
          </p>

          <div className="flex flex-col gap-2 mb-3">
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                وضعیت:
                {task.status === "TODO" && (
                  <CircleAlert className="w-3 h-3 text-yellow-500" />
                )}
                {task?.status === "IN_PROGRESS" && (
                  <RotateCcw className="w-3 h-3 text-blue-500" />
                )}
                {task?.status === "DONE" && (
                  <Check className="w-3 h-3 text-green-500" />
                )}
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                اولویت:
                {task.priority === "HIGH" && (
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                )}
                {task.priority === "MEDIUM" && (
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                )}
                {task.priority === "LOW" && (
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const isOwner =
                    information?.created_by?.email === ui.user?.email;
                  const isPrivate = information?.visibility === "PRIVATE";
                  const isPublic = information?.visibility === "PUBLIC";

                  if ((isPrivate && isOwner) || isPublic) {
                    ui.open("addmembertask", { task });
                  }
                }}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 flex items-center justify-center shadow-md"
              >
                <User size={12} className="text-white" />
              </button>
              <div className="flex -space-x-2">
                {task?.assignedMembers?.slice(0, 3).map((d: any, i: any) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-xs font-semibold bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 rounded-full border-2 border-white shadow-sm"
                  >
                    {i + 1}
                  </span>
                ))}
                {task?.assignedMembers?.length > 3 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-xs font-semibold bg-gray-200 text-gray-600 rounded-full border-2 border-white">
                    +{task.assignedMembers.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={async () => {
                  ui.open("dialogcomment", {
                    fun: () => dataget(),
                    data: task,
                  });
                }}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors relative"
              >
                {task?.comments?.filter((c: any) =>
                  Date.now() - new Date(c?.createdAt).getTime() > 3 * 864e5
                ).length >= 3 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                  )}
                <MessageCircle size={14} />
                <span className="text-xs font-medium">
                  {task?.comments?.length ?? 0}
                </span>
              </button>

              <div className="flex items-center gap-1 text-gray-500">
                <Clock size={14} />
                <span className="text-xs font-medium">
                  {!task?.dueDate
                    ? "بدون تاریخ"
                    : ((d) =>
                      d > 0
                        ? `${d} روز مانده`
                        : d < 0
                          ? `${-d} روز گذشته`
                          : "امروز")(
                            Math.ceil(
                              (+new Date(task.dueDate) - Date.now()) / 86400000
                            )
                          )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

// کامپوننت Column بهبود یافته
function Column({ column, crypto, index, dataget, onDragend, setload, loading }: any) {
  const getColumnColor = (name: string) => {
    if (name === "To Do") return "from-red-50 to-pink-50 border-red-200";
    if (name === "In Progress")
      return "from-blue-50 to-indigo-50 border-blue-200";
    if (name === "Done") return "from-green-50 to-emerald-50 border-green-200";
    return "from-gray-50 to-slate-50 border-gray-200";
  };

  const getBadgeColor = (name: string) => {
    if (name === "To Do") return "bg-red-100 text-red-700";
    if (name === "In Progress") return "bg-blue-100 text-blue-700";
    if (name === "Done") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-600";
  };

  const ui = useContext(ContextMain);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (i: any, col: any) => {
    setIsDragging(true);
  };

  const onDragEnter = (i: any, col: any) => {
    (window as any).test = { ordernew: i, to: col };
  };

  const params: any = (useParams() as any).id;
  const { query: groupsQuery, mutation: dataMutation } = useLoadingData(
    !params ? "getdatagroup" : "getdatatasks",
    "movecolumn",
    params
  );

  const dispatch = useDispatch<any>();

  const onDragEnd = async (d: any, i: any) => {
    setIsDragging(false);
    var col = {
      columnId: i,
      newOrder: (window as any).test.ordernew,
    };

    dispatch(
      moveColumn({
        fromOrder: d,
        toOrder: (window as any).test.ordernew,
      })
    );

    dataMutation.mutateAsync({ method: "POST", body: col });
  };

  return (
    <div>
      {column && (
        <div
          data-id={column.order}
          draggable
          key={column.order}
          onDragStart={() => onDragStart(column.order, column.id)}
          onDragEnter={() => onDragEnter(column.order, column.id)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={async () => await onDragEnd(column.order, column.id)}
          // style={{ backgroundColor: `${column.colortask}70` }}
          style={{ backgroundColor: `${column.colortask}50` }}
          className={`
            rounded-2xl p-3 sm:p-4 flex flex-col gap-3 border-2 shadow-lg
             ${getColumnColor(column.name)}
            transition-all duration-300
            ${isDragging ? "opacity-60 scale-95 rotate-2" : ""}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-sm sm:text-base md:text-lg truncate max-w-[120px] sm:max-w-none">
                {column.name}
              </h4>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold shadow-sm ${getBadgeColor(
                  column.name
                )}`}
              >
                {column?.tasks?.length}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  ui.open("dialogcolumn", {
                    // fun: () => dataget(),
                    order: column.order,
                    edit: column,
                  });
                }}
                className="p-1.5 hover:bg-white/70 rounded-lg transition-all duration-200 hover:shadow-md"
              >
                <SquarePen size={16} className="text-gray-500" />
              </button>
              <button
                onClick={() => {
                  ui.open("dialogalert", {
                    type: "error",
                    title: "میخواهید محتوا حذف شود ",
                    message: " ",
                    onConfirm: 1,
                    id: column.id,
                    fun: () => dataget(),
                    table: "column",
                  });
                }}
                className="p-1.5 hover:bg-white/70 rounded-lg transition-all duration-200 hover:shadow-md"
              >
                <Trash2 size={16} className="text-gray-500" />
              </button>
              <button
                onClick={() => {
                  ui.open("dialogtask", { data: column, fun: () => dataget() });
                }}
                className="p-1.5 hover:bg-white/70 rounded-lg transition-all duration-200 hover:shadow-md"
              >
                <Plus size={16} className="text-gray-500" />
              </button>
            </div>
          </div>

          <Droppable droppableId={column.id} type="TASK">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                  space-y-2 min-h-[100px] rounded-lg transition-all duration-200 p-1
                  ${snapshot.isDraggingOver
                    ? "bg-white/50 ring-2 ring-blue-300"
                    : ""
                  }
                `}
              >
                {column?.tasks?.map((task: any, i: number) => (
                  <TaskCard
                    loading={loading}
                    crypto={crypto}
                    key={task.id}
                    task={task}
                    index={i}
                    dataget={dataget}
                  />
                ))}
                {provided.placeholder}

                {column?.tasks?.length === 0 && (
                  <div className="text-center py-6 text-gray-400 text-sm flex flex-col justify-center items-center">
                    <ClipboardList size={24} className="mb-2 opacity-50" />
                    <p className="font-medium">هیچ تسکی وجود ندارد</p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </div>
  );
}

// کامپوننت اصلی TaskBoard بهبود یافته
export default function TaskBoard({ cry }: any) {
  const dispatch = useDispatch();
  const params = (useParams() as any).id;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { query, mutation }: any = useLoadingData(
    "getdatatasks",
    "movetask",
    params
  );

  const ui = useContext(ContextMain);
  const taskData = useSelector((s: any) => s.task.list[0]);
  var { loading, user, error }: any = useLazyVerify();
  // تشخیص دستگاه موبایل
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // اتصال Socket
  // useEffect(() => {
  //   let active = true;
  //   fetch("/api/socket");
  //   const s = io("/", { path: "/api/socket/io", query: { id: params } });

  //   s.on("tasks:update", () => {
  //     if (active) query.refetch();
  //   });

  //   setSocket(s);
  //   return () => {
  //     active = false;
  //     s.disconnect();
  //   };
  // }, []);

  // ✅ اتصال WebSocket با cleanup و جلوگیری از اتصال مجدد غیرضروری
  useEffect(() => {
    const controller = new AbortController();
    const connectSocket = async () => {
      try {
        await fetch("/api/socket", { signal: controller.signal });
        const s = io("/", {
          path: "/api/socket/io",
          query: { id: params },
          transports: ["websocket"], // سریع‌تر و پایدارتر
        });

        s.on("tasks:update", () => query.refetch());
        setSocket(s);

        return s;
      } catch (err) {
        console.error("Socket connection error:", err);
      }
    };

    const socketInstance = connectSocket();

    return () => {
      controller.abort();
      socketInstance?.then((s) => s?.disconnect());
    };
  }, [params, query.data, setSocket]);







  // // سینک کردن Redux با داده‌های query
  // useEffect(() => {
  //   if (query?.data) {
  //     dispatch(setTasks(query.data));
  //     main = query?.data;
  //     information = query.data[0];
  //   }
  // }, [query?.dataUpdatedAt]);

  // ✅ سینک Redux با query (فقط هنگام تغییر داده)
  useEffect(() => {
    if (query?.data) {
      dispatch(setTasks(query.data));
    }
  }, [query?.dataUpdatedAt, dispatch]);



  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, type } = result;
      if (!destination || type === "COLUMN") return;

      const fromColumn = source.droppableId;
      const toColumn = destination.droppableId;

      const taskId = query.data[0].columns
        ?.find((c: any) => c.id === fromColumn)
        ?.tasks[source.index]?.id;

      if (!taskId) return;

      // به‌روزرسانی محلی Redux
      dispatch(
        moveTask({
          fromColumnId: fromColumn,
          toColumnId: toColumn,
          fromIndex: source.index,
          toIndex: destination.index,
        })
      );

      // ارسال به سرور
      mutation.mutate(
        {
          method: "POST",
          body: {
            taskId,
            fromColumn,
            toColumn,
            newOrder: destination.index,
            byId: user.sub,
          },
        },
        {
          onSuccess: () => socket?.emit("tasks:update", "update"),
        }
      );
    },
    [query, user?.sub, dispatch, mutation, socket]
  );





  // هندل کردن Drag & Drop
  // const handleDragEnd = (result: DropResult) => {
  //   const { source, destination, type } = result;
  //   if (!destination || type === "COLUMN") return;

  //   const fromColumn = source.droppableId;
  //   const toColumn = destination.droppableId;
  //   const newOrder = destination.index;

  //   const taskId = query.data[0].columns?.find((c: any) => c.id === fromColumn)
  //     ?.tasks[source.index]?.id;

  //   if (!taskId) return;

  //   // به‌روزرسانی محلی (Redux)
  //   dispatch(
  //     moveTask({
  //       fromColumnId: fromColumn,
  //       toColumnId: toColumn,
  //       fromIndex: source.index,
  //       toIndex: destination.index,
  //     })
  //   );

  //   mutation.mutate(
  //     {
  //       method: "POST",
  //       body: {
  //         taskId,
  //         fromColumn,
  //         toColumn,
  //         newOrder,
  //         byId: ui.user.sub,
  //       },
  //     },
  //     {
  //       onSuccess: () => {
  //         socket?.emit("tasks:update", "update");
  //       },
  //     }
  //   );
  // };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 sm:p-4 lg:p-6 xl:p-8">
        <div className="max-w-7xl mx-auto">
          {/* هدر */}
          <div className="mb-4 sm:mb-6 lg:mb-8 backdrop-blur-sm bg-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2 drop-shadow-sm">
                  مدیریت پروژه
                </h1>
                <p className="text-gray-700 text-xs sm:text-sm lg:text-base font-medium">
                  سازماندهی و پیگیری تسک‌های خود
                </p>
              </div>

              <div className="flex items-center gap-3">
                {query.isLoading && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <LoaderCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="text-xs sm:text-sm">
                      در حال بارگذاری...
                    </span>
                  </div>
                )}

                <button
                  onClick={() => {
                    ui.open("dialogcolumn", {
                      order: main[0]?._count?.columns || 0,
                    });
                  }}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
                >
                  <Plus size={18} className="sm:w-5 sm:h-5" />
                  افزودن ستون
                </button>
              </div>
            </div>
          </div>

          {/* برد تسک‌ها */}
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction={isMobile ? "vertical" : "horizontal"}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                  grid gap-3 sm:gap-4
                  ${isMobile
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  }
                  min-h-[200px]
                  transition-all duration-200
                  ${snapshot.isDraggingOver ? "bg-blue-50/50 rounded-2xl" : ""}
                `}
              >
                {!query.data ? (
                  <div className="col-span-full flex justify-center items-center h-40">
                    <div className="flex flex-col items-center gap-3 text-gray-500">
                      <LoaderCircle className="w-8 h-8 animate-spin" />
                      <span className="text-sm">در حال بارگذاری تسک‌ها...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* <div>
                      
                      {mutation.isPending ? (
                        <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                      ) : (
                        ""
                      )}
                    </div> */}
                    <>
                      {taskData?.columns?.map((col: any, i: any) => (
                        <div key={col.id} className="h-fit">
                          <Column
                            crypto={cry}
                            column={col}
                            index={i}
                            dataget={query.refetch}
                            loading={mutation.isPending}
                          />
                        </div>
                      ))}
                    </>

                    {provided.placeholder}
                  </>
                )}
              </div>
            )}
          </Droppable>

          {/* حالت موبایل - راهنمای درگ اند دراپ */}
          {isMobile && (
            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                💡 برای جابجایی تسک‌ها، آن‌ها را فشار داده و نگه دارید
              </p>
            </div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
}
