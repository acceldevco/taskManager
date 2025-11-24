
// components/TasksCalendar.tsx
"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import faLocale from "@fullcalendar/core/locales/fa";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Plus,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";

// انواع داده‌ها
interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  description?: string;
  completed?: boolean;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  allDay: boolean;
  backgroundColor: string;
  borderColor: string;
  extendedProps: {
    priority: string;
    description?: string;
    completed?: boolean;
  };
}

// داده‌های نمونه
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "طراحی UI صفحه اصلی",
    dueDate: "2025-10-17",
    priority: "HIGH",
    description: "طراحی رابط کاربری صفحه اصلی با توجه به guidelineهای جدید",
  },
  {
    id: "2",
    title: "کدنویسی بخش احراز هویت",
    dueDate: "2025-10-19",
    priority: "MEDIUM",
    description: "پیاده‌سازی سرویس احراز هویت با JWT",
  },
  {
    id: "3",
    title: "تست ماژول پرداخت",
    dueDate: "2025-10-22",
    priority: "LOW",
    completed: true,
  },
  {
    id: "4",
    title: "جلسه تیمی با طراحان",
    dueDate: "2025-10-25",
    priority: "HIGH",
    description: "بررسی طرح‌های جدید و هماهنگی مراحل بعدی",
  },
];

// کامپوننت کارت تسک
const TaskCard: any = ({ task }: any) => {
  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return { color: "text-red-500", bg: "bg-red-50", label: "فوری" };
      case "MEDIUM":
        return { color: "text-amber-500", bg: "bg-amber-50", label: "متوسط" };
      case "LOW":
        return { color: "text-emerald-500", bg: "bg-emerald-50", label: "کم" };
      default:
        return {
          color: "text-gray-500",
          bg: "bg-gray-50",
          label: "بدون اولویت",
        };
    }
  };

  const priorityInfo = getPriorityInfo(task.priority);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
       
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {task.completed ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : (
            <Clock className="w-4 h-4 text-blue-500" />
          )}
          <h3
            className={`font-medium text-sm ${
              task.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.bg} ${priorityInfo.color}`}
        >
          {priorityInfo.label}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(task.dueDate).toLocaleDateString("fa-IR")}
        </span>
      </div>
    </div>
  );
};

// کامپوننت اصلی تقویم
export default function TasksCalendar({data}:any) {

  
  const [tasks, setTasks] = useState<Task[]>(data??sampleTasks);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [view, setView] = useState<"calendar" | "list">("calendar");

  // تبدیل تسک‌ها به ایونت‌های تقویم
  const calendarEvents: CalendarEvent[] = tasks.map((task) => {
    const getEventColors = () => {
      switch (task.priority) {
        case "HIGH":
          return {
            bg: task.completed ? "#dcfce7" : "#fef2f2",
            border: task.completed ? "#bbf7d0" : "#fecaca",
          };
        case "MEDIUM":
          return {
            bg: task.completed ? "#dcfce7" : "#fffbeb",
            border: task.completed ? "#bbf7d0" : "#fed7aa",
          };
        case "LOW":
          return {
            bg: task.completed ? "#dcfce7" : "#f0fdf4",
            border: task.completed ? "#bbf7d0" : "#bbf7d0",
          };
        default:
          return {
            bg: "#f8fafc",
            border: "#e2e8f0",
          };
      }
    };

    const colors = getEventColors();

    return {
      id: task.id,
      title: task.title,
      start: task.dueDate,
      allDay: true,
      backgroundColor: colors.bg,
      borderColor: colors.border,
      textColor: task.completed ? "#6b7280" : "#1f2937",
      extendedProps: {
        priority: task.priority,
        description: task.description,
        completed: task.completed,
      },
    };
  });

  // مدیریت کلیک روی تاریخ
  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    // در اینجا می‌توانید مدال افزودن تسک جدید را باز کنید
    console.log("افزودن تسک در تاریخ:", info.dateStr);
  };

  // مدیریت درگ و دراپ تسک
  const handleEventDrop = (info: any) => {
    const newDate = info.event.startStr;
    const taskId = info.event.id;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, dueDate: newDate } : task
      )
    );

    console.log(`تسک ${taskId} به تاریخ ${newDate} منتقل شد`);
  };

  // مدیریت کلیک روی تسک
  const handleEventClick = (info: any) => {
    const task = tasks.find((t) => t.id === info.event.id);
    if (task) {
      // نمایش جزئیات تسک
      console.log("جزئیات تسک:", task);
    }
  };

  // تسک‌های امروز
  const todayTasks = tasks.filter(
    (task) => task.dueDate === new Date().toISOString().split("T")[0]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
         {/* {JSON.stringify(data)} */}
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  تقویم تسک‌ها
                </h1>
                <p className="text-gray-600">
                  مدیریت و پیگیری فعالیت‌های روزانه
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href={'/user/group'}  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                <Plus className="w-4 h-4" />
                گروه جدید
              </Link>
            </div>
          </div>
        </div>

        {/* محتوای اصلی */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* سایدبار */}
          <div className="lg:col-span-1 space-y-6">
            {/* تسک‌های امروز */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                تسک‌های اخیر
              </h3>
              {/* {JSON.stringify(data)} */}
              <div className="space-y-3">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    هیچ تسکی برای امروز ندارید
                  </p>
                )}
              </div>
            </div>

         

          </div>

          {/* تقویم */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-5">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={faLocale}
                direction="rtl"
                editable={true}
                selectable={true}
                dayMaxEvents={3}
                headerToolbar={{
                  left: "today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay prev,next",
                }}
                buttonText={{
                  today: "امروز",
                  month: "ماهانه",
                  week: "هفتگی",
                  day: "روزانه",
                }}
                dateClick={handleDateClick}
                eventDrop={handleEventDrop}
                eventClick={handleEventClick}
                events={calendarEvents}
                height="75vh"
                eventContent={(eventInfo) => (
                  <div className="p-1">
                    <div
                      className={`flex items-center gap-1 p-2 rounded-lg border-l-4 ${
                        eventInfo.event.extendedProps.completed
                          ? "opacity-60"
                          : ""
                      }`}
                      style={{
                        borderLeftColor: eventInfo.event.backgroundColor,
                        backgroundColor: eventInfo.event.backgroundColor,
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-xs font-medium truncate"
                          style={{ color: eventInfo.event.textColor }}
                        >
                          {eventInfo.event.title}
                        </div>
                        {eventInfo.event.extendedProps.completed && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-1" />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
