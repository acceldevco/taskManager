"use client";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Mail, User, Check, Loader2, Settings, Edit3 } from "lucide-react";
import Input from "@/components/Input";
import { ContextMain } from "@/context/context";
import { useLazyVerify } from "@/hook/useLazyVerify";

export const UserDashboard = ({ crypto }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
// const ui = useContext(ContextMain);
var { loading, user, error }: any = useLazyVerify();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    watch,
    reset,
  } = useForm<any>({
    mode: "onChange",
    // defaultValues: async () => ({email: "user@example.com"})
    // defaultValues: {
    //   email: "user@example.com",
    //   name: "کاربر نمونه",
    // //   id:ui?.user?.sub
    // },
  });
  
  const onSubmit = async (data: any) => {
    setSuccess(false);
    setIsLoading(true);
    console.log({...data});
    fetch("/api/main", {
      method: "post",
      body: JSON.stringify(
        await crypto({
          table: "user",
          data: {...data},
        })
      ),
    });

    // await new Promise((resolve) => setTimeout(resolve, 1500));

    // console.log("Form Data:", data);
    setIsLoading(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  const hasChanges = Object.keys(dirtyFields).length > 0;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20"
      dir="rtl"
    >
      {/* Success Toast */}
      {success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-500">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-200 flex items-center gap-3 border border-emerald-200">
            <Check className="w-4 h-4" />
            <span className="font-medium text-sm">
              تغییرات با موفقیت ذخیره شد
            </span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            {activeTab === "profile" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 bg-gradient-to-l from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        ویرایش پروفایل
                      </h2>
                      <p className="text-slate-600 mt-2 flex items-center gap-2">
                        <Edit3 className="w-4 h-4" />
                        اطلاعات حساب کاربری خود را مدیریت و به‌روزرسانی کنید
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                {
                    user ?                 <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 flex justify-center [&>*]:grow"
                >
                  
                  <input
                    type="hidden"
                    value={user?.sub}
                    {...register("id")}
                  />
                  <div className="max-w-2xl space-y-8">
                  
                    <Input
                      defaultValue={user?.email}
                      name="email"
                      label="آدرس ایمیل"
                      placeholder="your.email@example.com"
                      icon={<Mail className="w-5 h-5" />}
                      register={register("email", {
                        required: "ایمیل الزامی است",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "فرمت ایمیل معتبر نیست",
                        },
                      })}
                      errors={errors}
                      dirtyFields={dirtyFields}
                      watch={watch}
                      type="email"
                    />

                    <Input
                      name="name"
                      label="نام کامل"
                      placeholder="نام و نام خانوادگی خود را وارد کنید"
                      icon={<User className="w-5 h-5" />}
                      register={register("name", {
                        minLength: {
                          value: 2,
                          message: "نام باید حداقل ۲ کاراکتر باشد",
                        },
                        maxLength: {
                          value: 100,
                          message: "نام نباید بیشتر از ۱۰۰ کاراکتر باشد",
                        },
                      })}
                      errors={errors}
                      dirtyFields={dirtyFields}
                      watch={watch}
                    />

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
                      <button
                        type="submit"
                        disabled={isLoading || !isValid || !hasChanges}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 
                          disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed
                          text-white font-semibold py-4 rounded-xl transition-all duration-300
                          shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50
                          transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none
                          flex items-center justify-center gap-3 text-lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            در حال ذخیره...
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            ذخیره تغییرات
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>:""
                }

              </div>
            )}

            {activeTab !== "profile" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Settings className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  بخش در حال توسعه
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  این بخش در حال حاضر در دست توسعه است و به زودی در دسترس قرار
                  خواهد گرفت
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
