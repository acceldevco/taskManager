"use client";

import { useContext, useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Home,
  CirclePlus,
  MessageSquare,
  UserPlus,
  Mail,
  Users,
  Check,
  ThumbsUp,
  Smile,
  MessageCircle,
  Plus,
  ChartSpline,
  CircleAlert,
  RotateCcw,
  Lock,
  User,
  FilePenLine,
  Pencil,
  Save,
  Image,
  Loader,
  LoaderCircle,
  Search,
  Edit,
} from "lucide-react";
import { ContextMain } from "@/context/context";
import AddBadge from "@/components/addbadge";
import { useParams } from "next/navigation";
import { SketchPicker } from "react-color";
import { HookButton } from "@/hook/hookbutton";
import MenuSlider from "@/components/MenuSlider";
import { useDispatch, useSelector } from "react-redux";
import { handleGroup } from "../features/group/groupSlice";
// import { handleTask } from "../features/tasks/taskSlice";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
import GradientButton from "@/components/Button";
import { useLoadingData } from "@/hook/useLoadingData";
export default function Sidebar({ children }: any) {
  // useParams().id
  const { query: groupsQuery, mutation: dataMutation } = useLoadingData(
    !(useParams() as any).id ? "getdatagroup" : "getdatatasks",
    "main",
    (useParams() as any).id,
    3
  );
  // var id = (useParams() as any).id
  // const taskData = useSelector(
  //   (s: any) => s?.[!id ? "group" : "task"]?.list?.[0]
  // );
  const ui = useContext(ContextMain);
  const dispatch = useDispatch<any>();
  const schema: any = {
    dialoggroup: z.object({
      ["cover_image"]: z.string().max(3, "حداقل ۳ کاراکتر"),
      name: z.string().max(3, "حداقل ۳ کاراکتر"),
    }),
  };
  return (
    <div dir="rtl" className="flex h-screen bg-white text-gray-800">
      {/* Sidebar */}
      <MenuSlider />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">{children}</div>

      {/* Drawer Example */}
      <ui.DrawerComponent id="dialogtask">
        {(data: any,taskData:any) => {
          console.log(taskData);
          
          const [priority, setPriority] = useState(data.data.priority ?? "LOW");
          const [status, setstatus] = useState(data.data.status ?? "DONE");
          const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
          }:any = useForm<any>({});
          // const { groupsQuery, dataMutation } = useLoadingData(
          //   3,
          //   "getdatatasks",
          //   "main"
          // );
          const onSubmit: any = async (values:any) => {
            console.log(values);
            const cleaned = Object.fromEntries(
              Object.entries(values).filter(
                ([_, value]) => value !== "" && value != null
              )
            );

            const dueDate = new Date(values.dueDate as string);
            dataMutation
              .mutateAsync({
                method: "POST",
                body: {
                  table: "task",
                  data: {
                    ...cleaned,
                    columnId: data.data.tasks
                      ? data.data.id
                      : data.data.columnId,
                    dueDate,
                  },
                },
              })
              .then(() => {
                ui.close("dialogtask");
              });
            // dispatch(
            //   handleTask({
            //     token: "",
            //     table: "",
            //     data: await ui.crypto[0]({
            //       table: "task",
            //       data: {
            //         ...cleaned,
            //         columnId: data.data.tasks
            //           ? data.data.id
            //           : data.data.columnId,
            //         dueDate,
            //       },
            //     }),
            //   })
            // );
          };
          return (
            <>
              <div
                className="fixed inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/40 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fadeIn"
                onClick={() => ui.close("dialogtask")}
              >
                <form
                  className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-500 hover:shadow-indigo-500/20 hover:shadow-3xl border border-white/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-3xl">📌</span>
                        <span>ایجاد تسک جدید</span>
                      </h2>
                      <button
                        type="button"
                        onClick={() => ui.close("dialogtask")}
                        className="text-white hover:bg-white/20 rounded-xl p-2.5 transition-all hover:rotate-90 duration-300"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-indigo-100 text-sm mt-2 text-right">
                      جزئیات تسک خود را وارد کنید
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                    {/* عنوان */}
                    {/* {JSON.stringify()} */}
                    <input
                      type="hidden"
                      // name="id"
                      value={!data.data.tasks ? data.data.id : ""}
                      {...register("id")}
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 text-right">
                        عنوان تسک
                      </label>
                      <input
                        defaultValue={data.data.title}
                        {...register("title", {
                          required: {
                            value: true,
                            message: "لطفا عنوان را وارد کنید",
                          },
                        })}
                        // name="title"
                        type="text"
                        placeholder="عنوان تسک را وارد کنید..."
                        className={`${
                          errors.title?.message
                            ? "border-red-500"
                            : "border-white"
                        } w-full px-5 py-3 border-2  bg-white/80 backdrop-blur-sm rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm hover:shadow-md text-right`}
                      />
                      <span className="text-red-500">
                        {errors.title?.message}
                      </span>
                    </div>

                    {/* توضیحات */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 text-right">
                        توضیحات
                      </label>
                      <textarea
                        defaultValue={data.data.description}
                        {...register("description")}
                        // name="description"
                        placeholder="توضیحات تسک را بنویسید..."
                        rows="4"
                        className="w-full px-5 py-3 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none shadow-sm hover:shadow-md text-right"
                      />
                    </div>

                    {/* تاریخ سررسید */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 text-right">
                        📅 تاریخ سررسید
                      </label>
                      <input
                        defaultValue={data.data.dueDate}
                        {...register("dueDate")}
                        // name="dueDate"
                        type="date"
                        className="w-full px-5 py-3 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm hover:shadow-md text-right"
                      />
                    </div>

                    {/* اولویت */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700 text-right">
                        اولویت تسک
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <label
                          className={`group relative overflow-hidden cursor-pointer ${
                            priority === "LOW" ? "ring-2 ring-green-500" : ""
                          }`}
                        >
                          <input
                            // defaultValue={data.data.priority}
                            defaultChecked={data.data.priority === priority}
                            type="radio"
                            name="priority"
                            value="LOW"
                            checked={priority === "LOW"}
                            onChange={() => (
                              setValue("priority", "LOW"), setPriority("LOW")
                            )}
                            className="hidden"
                          />
                          <div
                            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                              priority === "LOW"
                                ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg scale-105"
                                : "border-gray-200 bg-white hover:border-green-400 hover:shadow-md"
                            }`}
                          >
                            <span className="text-3xl">🟢</span>
                            <span
                              className={`font-semibold text-sm ${
                                priority === "LOW"
                                  ? "text-green-700"
                                  : "text-gray-600"
                              }`}
                            >
                              پایین
                            </span>
                          </div>
                        </label>

                        <label
                          className={`group relative overflow-hidden cursor-pointer ${
                            priority === "MEDIUM"
                              ? "ring-2 ring-yellow-500"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="priority"
                            value="MEDIUM"
                            checked={priority === "MEDIUM"}
                            onChange={() => (
                              setValue("priority", "MEDIUM"),
                              setPriority("MEDIUM")
                            )}
                            className="hidden"
                          />
                          <div
                            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                              priority === "MEDIUM"
                                ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg scale-105"
                                : "border-gray-200 bg-white hover:border-yellow-400 hover:shadow-md"
                            }`}
                          >
                            <span className="text-3xl">🟡</span>
                            <span
                              className={`font-semibold text-sm ${
                                priority === "MEDIUM"
                                  ? "text-yellow-700"
                                  : "text-gray-600"
                              }`}
                            >
                              متوسط
                            </span>
                          </div>
                        </label>

                        <label
                          className={`group relative overflow-hidden cursor-pointer ${
                            priority === "HIGH" ? "ring-2 ring-red-500" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="priority"
                            value="HIGH"
                            checked={priority === "HIGH"}
                            onChange={() => (
                              setValue("priority", "HIGH"), setPriority("HIGH")
                            )}
                            className="hidden"
                          />
                          <div
                            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                              priority === "HIGH"
                                ? "border-red-500 bg-gradient-to-br from-red-50 to-red-100 shadow-lg scale-105"
                                : "border-gray-200 bg-white hover:border-red-400 hover:shadow-md"
                            }`}
                          >
                            <span className="text-3xl">🔴</span>
                            <span
                              className={`font-semibold text-sm ${
                                priority === "HIGH"
                                  ? "text-red-700"
                                  : "text-gray-600"
                              }`}
                            >
                              بالا
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* وضعیت */}

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700 text-right">
                        وضعیت
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <label
                          className={`group relative overflow-hidden cursor-pointer ${
                            status === "LOW" ? "ring-2 ring-green-500" : ""
                          }`}
                        >
                          <input
                            // defaultValue={data.data.status}
                            defaultChecked={data.data.status === status}
                            type="radio"
                            name="status"
                            value="DONE"
                            checked={status === "DONE"}
                            onChange={() => (
                              setValue("status", "DONE"), setstatus("DONE")
                            )}
                            className="hidden"
                          />
                          <div
                            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                              status === "DONE"
                                ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg scale-105"
                                : "border-gray-200 bg-white hover:border-green-400 hover:shadow-md"
                            }`}
                          >
                            <span className="text-3xl">
                              <Check className="w-[40px]" />
                            </span>
                            <span
                              className={`font-semibold text-sm ${
                                status === "DONE"
                                  ? "text-green-700"
                                  : "text-gray-600"
                              }`}
                            >
                              انجام شده
                            </span>
                          </div>
                        </label>

                        <label
                          className={`group relative overflow-hidden cursor-pointer ${
                            status === "IN_PROGRESS"
                              ? "ring-2 ring-yellow-500"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="status"
                            value="IN_PROGRESS"
                            checked={status === "IN_PROGRESS"}
                            onChange={() => (
                              setValue("status", "IN_PROGRESS"),
                              setstatus("IN_PROGRESS")
                            )}
                            className="hidden"
                          />
                          <div
                            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                              status === "IN_PROGRESS"
                                ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg scale-105"
                                : "border-gray-200 bg-white hover:border-yellow-400 hover:shadow-md"
                            }`}
                          >
                            <span className="text-3xl">
                              <RotateCcw className="w-[40px] p-[0px]" />
                            </span>
                            <span
                              className={`font-semibold text-sm ${
                                status === "IN_PROGRESS"
                                  ? "text-yellow-700"
                                  : "text-gray-600"
                              }`}
                            >
                              درحال انجام
                            </span>
                          </div>
                        </label>

                        <label
                          className={`group relative overflow-hidden cursor-pointer ${
                            status === "TODO" ? "ring-2 ring-red-500" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="status"
                            value="TODO"
                            checked={status === "TODO"}
                            onChange={() => (
                              setValue("status", "TODO"), setstatus("TODO")
                            )}
                            className="hidden"
                          />
                          <div
                            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                              status === "TODO"
                                ? "border-red-500 bg-gradient-to-br from-red-50 to-red-100 shadow-lg scale-105"
                                : "border-gray-200 bg-white hover:border-red-400 hover:shadow-md"
                            }`}
                          >
                            <span className="text-3xl">
                              <CircleAlert className="w-[40px]" />
                            </span>
                            <span
                              className={`font-semibold text-sm ${
                                status === "TODO"
                                  ? "text-red-700"
                                  : "text-gray-600"
                              }`}
                            >
                              انجام نشده
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gradient-to-r from-gray-50 to-indigo-50/30 px-6 py-4 border-t border-indigo-100/50 flex justify-end gap-3">
                    <GradientButton
                      buttonText="ذخیره ستون"
                      onSubmit={handleSubmit(onSubmit)}
                    />
                  </div>
                </form>

                <style jsx>{`
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                      transform: scale(0.95);
                    }
                    to {
                      opacity: 1;
                      transform: scale(1);
                    }
                  }
                  .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                  }
                `}</style>
              </div>
            </>
          );
        }}
      </ui.DrawerComponent>
      <ui.DrawerComponent id="addmember">
        {(data2: any) => {
          var [load, setload] = useState<any>(0);
          var ref = useRef(null);
          const {
            register,
            handleSubmit,
            control,
            formState: { errors },
          } = useForm({});
          // const { dirtyFields } = useFormState({
          //   control
          // });
          const onSubmit = async (data:any) => {
            const res = await fetch("/api/checkmemberuser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: data.userEmail,
              }),
            }).catch(() => ({ ok: true })); // Mock success for demo

            if (res.ok) {
              dataMutation
                .mutateAsync({
                  method: "POST",
                  body: {
                    table: "member",
                    data: {
                      ...data,
                      role: "",
                    },
                  },
                })
                .then(() => {
                  setload(0);
                  ui.close("addmember");
                });
            } else {
              alert("این ایمیل معتبر نیست یا در سیستم وجود ندارد ❌");
            }

            return console.log(data);
          };

          var data1: any = data2.data.members;

          return (
            <div
              className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
              onClick={() => ui.close("addmember")}
            >
              <div
                className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Section */}
                <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          مدیریت اعضای گروه
                        </h2>
                        <p className="text-indigo-100 text-sm mt-1">
                          افزودن و مدیریت کاربران جدید
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="عکس کاربر"
                      onClick={() => ui.close("addmember")}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-xl transition-all duration-200 hover:rotate-90"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 translate-y-12"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-6">
                  {/* Members List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
                        اعضای فعلی
                      </label>
                      <div className="flex gap-2">
                        {dataMutation.isPending ? (
                          <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                        ) : (
                          ""
                        )}
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {data1?.length}
                        </span>
                      </div>

                      {/* {data1.filter((d) => d.id === data2.groupId)?.[0]?.members
                        .length > 0 && (
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {
                            data1.filter((d) => d.id === data2.groupId)[0]
                              .members.length
                          }{" "}
                          عضو
                        </span>
                      )} */}
                    </div>

                    <div
                      ref={ref}
                      className="min-h-[120px] max-h-[280px] overflow-y-auto p-5 bg-gradient-to-br from-gray-50 via-indigo-50/20 to-purple-50/20 rounded-2xl border-2 border-gray-100 shadow-inner"
                    >
                      {data1?.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {/* {JSON.stringify(data.data.members)} */}
                          {data1.map((l:any, i:any) => (
                            <div
                              key={i}
                              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white pl-4 pr-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slideIn"
                            >
                              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg">
                                <Mail className="w-4 h-4" />
                              </div>
                              <span className="font-medium text-sm">
                                {l.userEmail}
                              </span>
                              <label
                                htmlFor="deletemember"
                                className="bg-white/10 z-[10] hover:bg-white/30 backdrop-blur-sm rounded-lg p-1.5 transition-all duration-200 hover:rotate-90 ml-1"
                                title="حذف عضو"
                              >
                                <HookButton
                                  id="deletemember"
                                  fun={async (e:any) => {
                                    dataMutation
                                      .mutateAsync({
                                        method: "POST",
                                        body: {
                                          table: "member",
                                          data: {
                                            id: l.id,
                                          },
                                        },
                                      })
                                      .then(() => {
                                        ui.close("addmember");
                                      });
                                  }}
                                >
                                  {(d:any) => (
                                    <>
                                      <X className="w-4 h-4" />
                                    </>
                                  )}
                                </HookButton>
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full py-8">
                          <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl mb-3">
                            <Users className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-400 font-medium">
                            هنوز عضوی اضافه نشده است
                          </p>
                          <p className="text-gray-300 text-sm mt-1">
                            برای شروع، ایمیل کاربر را وارد کنید
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {data2.data.id && (
                      <form className="flex gap-3 h-[100px]">
                        <input
                          type="hidden"
                          {...register("groupId")}
                          value={data2.data.id}
                        />
                        <div className="relative flex-1">
                          <Input
                            name="userEmail"
                            errors={errors}
                            icon={<Mail />}
                            type="email"
                            register={register("userEmail", {
                              required: {
                                value: true,
                                message: "لطفا ایمیل را وارد کنید",
                              },
                              validate: (value) =>
                                !data1.find((d:any) => d.userEmail === value)
                                  ? true
                                  : "ایمیل وارد شده قبلا ثبت شده است",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "ایمیل وارد شده معتبر نیست",
                              },
                            })}
                            placeholder="ایمیل کاربر جدید را وارد کنید..."
                          />

                          {/* <input
                            
                            
                            
                            className="w-full pl-5 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-sm font-medium placeholder:text-gray-400 bg-white hover:border-gray-300"
                          /> */}
                        </div>

                        <label
                          htmlFor="addmember"
                          className="group self-start relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-sm overflow-hidden hover:scale-105"
                        >
                          <div className="relative z-10 flex items-center gap-2">
                            <UserPlus className="w-5 h-5" />
                            <button onClick={handleSubmit(onSubmit)}>
                              افزودن
                            </button>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </label>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              <style jsx>{`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }

                @keyframes slideIn {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                .animate-fadeIn {
                  animation: fadeIn 0.3s ease-out;
                }

                .animate-slideIn {
                  animation: slideIn 0.3s ease-out;
                }

                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                  width: 8px;
                }

                ::-webkit-scrollbar-track {
                  background: #f1f5f9;
                  border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb {
                  background: linear-gradient(to bottom, #6366f1, #a855f7);
                  border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(to bottom, #4f46e5, #9333ea);
                }
              `}</style>
            </div>
          );
        }}
      </ui.DrawerComponent>
      <ui.DrawerComponent id="addmembertask">
        {(data2: any,taskData:any) => {
          // console.log(taskData);

          var datas = taskData.members; /// useSelector((s) => s.task.list.pages[0].members);

          useEffect(() => {
            console.log();
            //   // جستجوی task مورد نظر
            const findDeep = (
              arr: any[],
              id: string,
              seen = new Set()
            ): any => {
              if (!Array.isArray(arr)) return null;
              return arr.reduceRight((found, item) => {
                if (found || seen.has(item)) return found;
                seen.add(item);
                return item.id === id
                  ? item
                  : item.tasks
                  ? findDeep(item.tasks, id, seen)
                  : found;
              }, null);
            };
          }, []);
          // ✅ تابع toggle برای افزودن/حذف عضو بدون دکمه submit
          const toggleMember = async (memberId2: any, checked: boolean) => {
            const taskId = data2.task.id;
            var memberId = memberId2.id;
            var id = memberId2.assignedTasks.filter(
              (d:any, i:any) => d.taskId === taskId && d.memberId === memberId
            )?.[0]?.id;
            try {
              dataMutation
                .mutateAsync({
                  method: "POST",
                  body: {
                    table: "taskAssignment",
                    data: checked ? { memberId, taskId } : { id },
                  },
                })
                .then(() => {
                  ui.close("addmembertask");
                });
            } catch (err) {
              console.error("Error updating member:", err);
            }
          };
          return (
            <div
              className="fixed inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fadeIn"
              onClick={() => ui.close("addmembertask")}
            >
              <div
                className="bg-white w-full max-w-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(139,92,246,0.5)] overflow-hidden transform transition-all duration-300 hover:shadow-[0_25px_70px_-15px_rgba(139,92,246,0.7)] hover:scale-[1.01]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* header */}
                <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 px-8 py-8 overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl shadow-lg ring-2 ring-white/30">
                        <Users className="w-7 h-7 text-white drop-shadow-lg" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white drop-shadow-md">
                          مدیریت اعضای گروه
                        </h2>
                        <p className="text-indigo-50 text-sm mt-1.5 font-medium">
                          افزودن و مدیریت کاربران جدید
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => ui.close("addmembertask")}
                      className="bg-white/15 hover:bg-white/25 backdrop-blur-md p-2.5 rounded-2xl transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-lg ring-1 ring-white/20"
                    >
                      <X className="w-5 h-5 text-white drop-shadow" />
                    </button>
                  </div>
                </div>

                {/* form body */}
                <div className="p-8">
                  <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3">
                    {datas.map((d: any, index: number) => (
                      <label
                        key={d.id}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-purple-50 hover:from-purple-100 hover:to-indigo-100 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-md border border-purple-100/50 group animate-slideIn"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <input
                          // checked={}
                          defaultChecked={data2.task.assignedMembers
                            .map((d:any) => d.memberId)
                            .includes(d.id)}
                          onChange={(e) => toggleMember(d, e.target.checked)}
                          type="checkbox"
                          className="w-5 h-5 rounded-lg border-2 border-purple-300 text-purple-600 cursor-pointer"
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                            {d.userEmail.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-slate-700 font-medium text-sm group-hover:text-purple-700 transition-colors">
                            {d.userEmail}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ui.DrawerComponent>
      <ui.DrawerComponent id="dialogcolumn">
        {(data: any) => {
          var [color, setcolor] = useState<any>(data?.edit?.colortask ?? "");
          console.log(data);

          const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
          } = useForm<any>({
            // resolver: zodResolver(schema.dialoggroup),
            // defaultValues: {
            //   name: data.data.name,
            // },
          });

          const onSubmit: any = async (values:any) => {
            console.log(values);

            ////////////////////////////////////
            const cleaned = Object.fromEntries(
              Object.entries(values).filter(
                ([_, value]) => value !== "" && value != null
              )
            );

            dataMutation
              .mutateAsync({
                method: "POST",
                body: {
                  table: "column",
                  data: {
                    ...cleaned,
                    order: !data?.edit?.id ? data.order + 1 : data.order,
                  },
                },
              })
              .then(() => {
                // setTimeout(() => {
                ui.close("dialogcolumn");
                // }, 100);
              });
          };

          return (
            <div
              className="fixed inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/30 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fadeIn"
              onClick={() => ui.close("dialogcolumn")}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-indigo-500/20 hover:shadow-3xl border border-white/20"
              >
                {/* هدر با گرادیانت مشابه دیالوگ نظرات */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
                  <h2 className="text-2xl font-bold text-white text-right flex gap-3 items-center">
                    <span className="text-2xl">
                      <Plus />
                    </span>
                    ساخت ستون جدید
                  </h2>
                  <p className="text-indigo-100 text-sm mt-1 text-right">
                    ستون جدید خود را تنظیم کنید
                  </p>
                </div>
                <div className="p-2">
                  
                  {dataMutation.isPending ? (
                    <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                  ) : (
                    ""
                  )}
                </div>
                {/* فرم با padding مشابه */}
                <div className="p-6">
                  <form
                    className="space-y-6"
                    // onSubmit={async (e: any) => {

                    //   // console.log(values);
                    // }}
                  >
                    <input
                      type="hidden"
                      {...register("groupId")}
                      value={useParams()?.id}
                    />
                    {/* {JSON.stringify(data.edit.id)} */}
                    <input
                      type="hidden"
                      value={data?.edit?.id}
                      {...register("id")}
                    />
                    {/* نام ستون */}
                    <div className="relative">
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                        htmlFor="name"
                      >
                        نام ستون
                      </label>
                      <div className="relative group">
                        <Input
                          register={register("name", {
                            required: {
                              value: true,
                              message: "لطفا نام را وارد کنید",
                            },
                          })}
                          placeholder="مثلاً: To Do"
                          name="name"
                          defaultValue={data?.edit?.name}
                          icon={<Edit />}
                        />
                        {/* <input
                          id="name"
                          type="text"
                          // name="name"
                          defaultValue={data?.edit?.name}
                          placeholder="مثلاً: To Do"
                          required
                          className={`${
                            errors.name?.message
                              ? "border-red-500"
                              : "border-white"
                          } w-full px-5 py-3 border-2  bg-white/80 backdrop-blur-sm rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm hover:shadow-md text-right`}
                        /> */}

                        {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 opacity-0 group-focus-within:opacity-100 transition-opacity">
                          📝
                        </div> */}
                      </div>
                      {/* <span className="text-red-500 p-5">
                        {errors.name?.message}
                      </span> */}
                    </div>

                    <div className="space-y-3">
                      {/* <input
                        
                        type="text"
                        
                        value={color}
                        {...register("colortask")}
                      /> */}

                      <label className="block text-sm font-semibold text-gray-700 text-right">
                        رنگ کادر
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <SketchPicker
                          color={color}
                          onChangeComplete={(color) => {
                            setcolor(color.hex);
                            setValue("colortask", color.hex);
                          }}
                        />
                      </div>
                    </div>

                    {/* ترتیب ستون */}
                    {/* <div className="relative">
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-2 text-right"
                      htmlFor="order"
                    >
                      ترتیب
                    </label>
                    <div className="relative group">
                      <input
                        id="order"
                        type="number"
                        name="order"
                        // value={form.order}
                        // onChange={(e) => handleChange("order", parseInt(e.target.value))}
                        required
                        className="w-full px-5 py-3 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm hover:shadow-md text-right"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 opacity-0 group-focus-within:opacity-100 transition-opacity">
                        🔢
                      </div>
                    </div>
                  </div> */}

                    {/* دکمه ذخیره */}
                    <GradientButton
                      buttonText="ذخیره ستون"
                      onSubmit={handleSubmit(onSubmit)}
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </ui.DrawerComponent>
      <ui.DrawerComponent id="dialogcomment">
        {(data: any,taskData:any) => {
          var datas = taskData; //useSelector((s) => s.task.list.pages[0]);
          useEffect(() => {
            console.log(datas, data);

            const findDeep: any = (arr = [], id: any, seen = new Set()) =>
              arr.reduceRight((found:any, item:any) => {
                if (found || seen.has(item)) return found;
                seen.add(item);
                if (item.id === id) return item;
                if (item.tasks) return findDeep(item.tasks, id, seen);
                return found;
              }, null);
            console.log(findDeep(datas.columns, data.data.id).comments);
          }, [datas]);

          const findDeep: any = (arr = [], id = 0, seen = new Set()) =>
            arr.reduceRight((a:any, c:any) => {
              if (a || seen.has(c)) return a; // اگر قبلاً دیده شده یا پیدا شده، رد شو
              seen.add(c); // علامت بزن
              return c.id === id
                ? c
                : c.tasks
                ? findDeep(c.tasks, id, seen)
                : a;
            }, null);
          return (
            <>
              <div
                className="fixed inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/30 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fadeIn"
                onClick={() => ui.close("dialogcomment")}
              >
                <div
                  className="bg-white/95 backdrop-blur-sm w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-indigo-500/20 hover:shadow-3xl border border-white/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* {JSON.stringify(data.data)} */}
                  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
                    <h2 className="text-2xl font-bold text-white text-right flex gap-5 items-center">
                      <MessageCircle width={20} /> نظرات و بازخوردها
                    </h2>
                    <p className="text-indigo-100 text-sm mt-1 text-right">
                      نظرات خود را با تیم به اشتراک بگذارید
                    </p>
                  </div>

                  <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                      {
                        //ui.data.data[0]?.columns?.length > 0
                        datas.columns?.length > 0
                          ? findDeep(
                              datas.columns,
                              data.data.id
                              // ui.data.data[0]?.columns,
                              // data.id
                            ).comments.map((d:any) => (
                              <div className="flex items-start gap-4 group">
                                <div className="relative">
                                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-purple-100 transition-transform group-hover:scale-105">
                                    {d?.author?.name?.[0] ?? d?.author?.email?.[0]}
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                                </div>

                                <div className="flex-1">
                                  <div className="bg-gradient-to-br from-gray-50 to-indigo-50/50 rounded-2xl p-5 shadow-sm border border-indigo-100/50 transition-all hover:shadow-md hover:border-indigo-200">
                                    <div className="flex items-center justify-between mb-2">
                                      <p className="font-bold text-gray-900 text-lg">
                                        {d.author.name ?? d.author.email}
                                      </p>
                                      <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                                        🕐{" "}
                                        {new Date(d.createdAt).toLocaleString(
                                          "fa"
                                        )}
                                      </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-right">
                                      {d.text ?? "خالی"}
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-indigo-100">
                                      <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors hover:underline">
                                        پاسخ
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : ""
                      }
                    </div>

                    <div className=" relative">
                      <div className="absolute -top-3 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        کامنت جدید
                      </div>
                      <form
                        onSubmit={async (e: any) => {
                          e.preventDefault();
                          const values = Object.fromEntries(
                            [...new FormData(e.target)].filter(
                              ([_, v]: any) => v.trim() !== ""
                            )
                          );

                          dataMutation.mutateAsync({
                            method: "POST",
                            body: {
                              table: "comment",
                              data: {
                                ...values,
                                taskId: data.data.id,
                                authorId: ui.user.sub,
                              },
                            },
                          });

                          // dispatch(
                          //   handleTask({
                          //     token: "",
                          //     table: "member",
                          //     data: await ui.crypto[0]({
                          //       table: "comment",
                          //       data: {
                          //         ...values,
                          //         taskId: data.data.id,
                          //         authorId: ui.user.sub,
                          //       },
                          //     }),
                          //   })
                          // );
                        }}
                        className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-indigo-200 shadow-sm"
                      >
                        <textarea
                          name="text"
                          placeholder=" نظر خود را بنویسید..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none shadow-sm hover:shadow-md text-right"
                        />
                        <div className="flex items-center justify-between mt-4">
                          <button className="px-6 flex py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                            ارسال نظر{" "}
                            {dataMutation.isPending ? (
                              <LoaderCircle className="w-6 h-6 animate-spin text-white" />
                            ) : (
                              ""
                            )}
                          </button>
                          <div className="flex gap-2">
                            <button className="w-10 h-10 bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center text-gray-600 hover:text-indigo-600">
                              📎
                            </button>
                            <button className="w-10 h-10 bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center text-gray-600 hover:text-indigo-600">
                              <Smile />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </ui.DrawerComponent>
      <ui.DrawerComponent id="dialoggroup">
        {(datas: any) => {
          const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm<any>({
            // resolver: zodResolver(schema.dialoggroup),
            defaultValues: {
              name: datas.data.name,
            },
          });
          // const { groupsQuery, dataMutation } = useLoadingData(
          //   3,
          //   "getdatagroup",
          //   "main"
          // );
          // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
          //   groupsQuery;

          var load: any = useSelector((d) => d);
          const onSubmit: any = async (values:any) => {
            const cleaned = Object.fromEntries(
              Object.entries(values).filter(
                ([_, value]) => value !== "" && value != null
              )
            );
            console.log(cleaned);

            dataMutation.mutateAsync({
              method: "POST",
              body: {
                table: "group",
                data: {
                  ...cleaned,
                  ...(datas.user && {
                    members: {
                      create: [
                        {
                          userEmail: datas.user,
                        },
                      ],
                    },
                  }),
                },
              },
            });

            // dispatch(
            //   handleGroup({
            //     token: "",
            //     table: "",
            //     data: await ui.crypto[0]({
            //       table: "group",
            //       data: {
            //         ...cleaned,
            //         ...(data.user && {
            //           members: {
            //             create: [
            //               {
            //                 userEmail: data.user,
            //               },
            //             ],
            //           },
            //         }),
            //       },
            //     }),
            //   })
            // );
            ui.close("dialoggroup");
          };

          return (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
              onClick={() => ui.close("dialoggroup")}
            >
              <form
                //   onSubmit={
                //   //   async (e: any) => {
                //   //   e.preventDefault();

                //   //   //   [...new FormData(e.target)].filter(
                //   //   //     ([_, v]: any) => v.trim() !== ""
                //   //   //   )
                //   //   // );
                //   // }
                // }
                className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="hidden"
                  value={ui.user.sub}
                  {...register("createdById")}
                />
                <input
                  type="hidden"
                  value={datas.data.id}
                  {...register("id")}
                />
                {/* <input type="hidden" name="members" value={} /> */}

                {/* Gradient Header */}
                <div className="relative h-32 sm:h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => ui.close("dialoggroup")}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  >
                    <svg
                      className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Icon & Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                          {datas.data.id ? "ویرایش گروه" : "افزودن گروه جدید"}
                        </h2>
                        <p className="text-white/90 text-sm mt-1">
                          اطلاعات گروه خود را وارد کنید
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-6 sm:p-8 space-y-5 sm:space-y-6 max-h-[calc(100vh-20rem)] overflow-y-auto">
                  {/* نام گروه */}
                  <div className="group">
                    {/* <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      <span className="text-xl">
                        <Pencil size={15} color="#4f4f4f" strokeWidth={1.5} />
                      </span>
                      نام گروه
                    </label> */}

                    <Input
                      name="name"
                      label="نام گروه"
                      placeholder="مثال: گروه توسعه‌دهندگان"
                      icon={<Pencil className="w-5 h-5" />}
                      register={register("name", {
                        required: "نام الزامی است",
                      })}
                      errors={errors}
                      type="name"
                      defaultValue={datas.data.name}
                    />
                  </div>

                  {/* توضیحات */}
                  <div className="group">
                    <Textarea
                      name="description"
                      label="پیام شما"
                      placeholder="توضیحاتی درباره گروه بنویسید..."
                      icon={<FilePenLine />}
                      register={register("description")}
                      errors={errors}
                      defaultValue={datas.data.description}
                      rows={5}
                    />
                  </div>

                  {/* Grid Layout for Status & Cover */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* وضعیت */}
                    <div className="group">
                      <Select
                        name="visibility"
                        label="وضعیت گروه"
                        placeholder="وضعیت گروه را انتخاب کنید"
                        icon={
                          <Lock size={15} color="#4f4f4f" strokeWidth={1.5} />
                        }
                        register={register("visibility", {
                          required: "انتخاب موضوع الزامی است",
                        })}
                        errors={errors}
                        defaultValue={datas.data.visibility || "PRIVATE"}
                        // dirtyFields={dirtyFields}
                        // watch={watch}
                        options={[
                          { label: "خصوصی", value: "PRIVATE" },
                          { label: "عمومی", value: "PUBLIC" },
                        ]}
                      />
                    </div>
                  </div>
                  {/* تصویر کاور */}
                  <div className="group">
                    <Input
                      name="email"
                      label="تصویر کاور"
                      placeholder="https://example.com/cover.png"
                      defaultValue={datas.data.cover_image}
                      icon={<Image className="w-5 h-5" />}
                      register={register("coverImage")}
                      errors={errors}
                      type="email"
                    />
                    {/* <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      <span className="text-xl">
                        <Image size={15} color="#4f4f4f" strokeWidth={1.5} />
                      </span>
                      تصویر کاور
                    </label>
                    <input
                      {...register("coverImage")}
                      type="url"
                      // name="cover_image"
                      defaultValue={data.data.cover_image}
                      placeholder="https://example.com/cover.png"
                      className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl text-sm sm:text-base focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none placeholder:text-gray-400"
                    /> */}
                  </div>
                </div>

                {/* Action Buttons */}
                <GradientButton onSubmit={handleSubmit(onSubmit)} />
                {/* <div className="flex flex-col-reverse sm:flex-row gap-3 p-6 sm:p-8 pt-0 sm:pt-0">
                  <label
                    htmlFor="addgroup"
                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>
                      <Save size={20} color="#4f4f4f" strokeWidth={1.5} />
                    </span>
                    <button type="submit" onClick={handleSubmit(onSubmit)}>
                      ثبت
                    </button>
                  </label>
                </div> */}
              </form>
            </div>
          );
        }}
      </ui.DrawerComponent>
      <ui.DrawerComponent id="dialogalert">
        {(data: any) => {
          return (
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => ui.close("dialogalert")}
            >
              <div
                className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: "Vazirmatn, Tahoma, sans-serif",
                  direction: "rtl",
                }}
              >
                <div
                  className={`h-1.5 ${
                    data?.type === "success"
                      ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                      : data?.type === "error"
                      ? "bg-gradient-to-r from-red-400 to-rose-500"
                      : data?.type === "warning"
                      ? "bg-gradient-to-r from-amber-400 to-orange-500"
                      : "bg-gradient-to-r from-blue-400 to-cyan-500"
                  }`}
                />

                {/* محتوای اصلی */}
                <div className="p-6">
                  {/* آیکون و عنوان */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        data?.type === "success"
                          ? "bg-emerald-100"
                          : data?.type === "error"
                          ? "bg-red-100"
                          : data?.type === "warning"
                          ? "bg-amber-100"
                          : "bg-blue-100"
                      }`}
                    >
                      {data?.type === "success" && (
                        <svg
                          className="w-6 h-6 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      {data?.type === "error" && (
                        <svg
                          className="w-6 h-6 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      {data?.type === "warning" && (
                        <svg
                          className="w-6 h-6 text-amber-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      )}
                      {data?.type === "info" && (
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {data?.title || "پیام"}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {data?.message ||
                          "محتوای پیام شما اینجا نمایش داده می‌شود."}
                      </p>
                    </div>

                    {/* دکمه بستن */}
                    <button
                      onClick={() => ui.close("dialogalert")}
                      className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* دکمه‌های عملیات */}
                  <div className="flex gap-3 mt-6">
                    {data?.onConfirm && (
                      <button
                        onClick={async () => {
                          var crypto = {
                            table: data.table,
                            data: {
                              id: data.id,
                            },
                          };
                          dataMutation.mutateAsync({
                            method: "POST",
                            body: crypto,
                          });
                          ui.close("dialogalert");
                        }}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 ${
                          data?.type === "success"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/50"
                            : data?.type === "error"
                            ? "bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-lg hover:shadow-red-500/50"
                            : data?.type === "warning"
                            ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:shadow-amber-500/50"
                            : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/50"
                        }`}
                      >
                        {data?.confirmText || "تایید"}
                      </button>
                    )}

                    {data?.onCancel && (
                      <button
                        onClick={() => {
                          data.onCancel();
                          ui.close("dialogalert");
                        }}
                        className="flex-1 py-3 px-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
                      >
                        {data?.cancelText || "انصراف"}
                      </button>
                    )}

                    {!data?.onConfirm && !data?.onCancel && (
                      <button
                        onClick={() => ui.close("dialogalert")}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 ${
                          data?.type === "success"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/50"
                            : data?.type === "error"
                            ? "bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-lg hover:shadow-red-500/50"
                            : data?.type === "warning"
                            ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:shadow-amber-500/50"
                            : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/50"
                        }`}
                      >
                        متوجه شدم
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <style jsx>{`
                @keyframes scaleIn {
                  from {
                    opacity: 0;
                    transform: scale(0.9);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }

                .animate-scaleIn {
                  animation: scaleIn 0.2s ease-out;
                }
              `}</style>
            </div>
          );
        }}
      </ui.DrawerComponent>
    </div>
  );
}
