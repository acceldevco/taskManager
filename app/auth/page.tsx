"use client";
import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({});
  const onSubmit: any = async (values) => {
    setIsLoading(true);
        await fetch("/api/sendverification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 'email': values.email }),
    })
      .then(() => {
        setIsLoading(true);
        setIsLoading(false);
        alert("ورود موفقیت‌آمیز!");
      })
      .catch(() => {
        alert("error");
      });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">خوش آمدید</h1>
            <p className="text-white/80">
              برای ادامه وارد حساب کاربری خود شوید
            </p>
          </div>

          <form
            // onClick={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                ایمیل
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="email"
                  value={email}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "لطفا ایمیل را وارد کنید",
                    },
                  })}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${
                    errors.email?.message ? "border-red-500" : "border-white/30"
                  } w-full bg-white/10 border  rounded-xl px-11 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition`}
                  placeholder="example@email.com"
                />
              </div>
              <span className={`${errors.email?.message && "text-red-500"}`}>
                {errors.email?.message}
              </span>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-white text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-white/90 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin ml-2" />
                  در حال ارسال...
                </>
              ) : (
                "ورود"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
