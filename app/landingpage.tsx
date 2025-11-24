"use client";

import React, { useContext, useState } from "react";
import {
  ClipboardCheck,
  Users,
  Bell,
  Smartphone,
  Zap,
  ChevronDown,
  Play,
  ArrowLeft,
  Star,
  CheckCircle2,
  Sparkles,
  Pause,
} from "lucide-react";


export default function LandingPage() {
  const [openFaq, setOpenFaq]:any = useState<any>(null);
  const features = [
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "مدیریت وظایف با کارت‌ها و بردها",
      description:
        "هر پروژه را با کارت‌ها، لیست‌ها و بردهای قابل تنظیم مدیریت کن.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "همکاری تیمی در زمان واقعی",
      description:
        "با اعضای تیمت به‌صورت زنده کار کن و همه تغییرات را در لحظه ببین.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "اعلان‌ها و پیگیری خودکار",
      description:
        "هیچ وظیفه‌ای را از دست نده؛ اعلان‌های هوشمند تو را در جریان می‌گذارند.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "موبایل و دسکتاپ",
      description: "در هر دستگاهی پروژه‌هایت را دنبال کن، حتی در حال حرکت.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "اتصال با ابزارهای دیگر",
      description: "Google Drive، Slack و ده‌ها ابزار دیگر را متصل کن.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "هوش مصنوعی و اتوماسیون",
      description: "با کمک هوش مصنوعی، وظایف تکراری را خودکار کن.",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const plans = [
    {
      name: "رایگان",
      price: "0 تومان",
      period: "برای همیشه",
      features: [
        "۱ پروژه فعال",
        "۵ عضو تیم",
        "۱۰۰ مگابایت فضا",
        "پشتیبانی ایمیل",
      ],
      popular: false,
    },
    {
      name: "حرفه‌ای",
      price: "۹۹٬۰۰۰",
      period: "تومان / ماه",
      features: [
        "پروژه‌های نامحدود",
        "۵۰ عضو تیم",
        "۱۰ گیگابایت فضا",
        "اعلان‌های پیشرفته",
        "پشتیبانی اولویت‌دار",
        "گزارش‌گیری پیشرفته",
      ],
      popular: true,
      badge: "پرفروش‌ترین",
    },
    {
      name: "تیمی",
      price: "۲۴۹٬۰۰۰",
      period: "تومان / ماه",
      features: [
        "همه امکانات حرفه‌ای",
        "اعضای نامحدود",
        "۱۰۰ گیگابایت فضا",
        "مدیریت نقش‌ها",
        "SSO و امنیت پیشرفته",
        "پشتیبانی ۲۴/۷",
        "مشاور اختصاصی",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "آیا نسخه رایگان محدودیت دارد؟",
      answer:
        "بله، نسخه رایگان برای تیم‌های کوچک با حداکثر ۵ عضو طراحی شده است.",
    },
    {
      question: "آیا داده‌های من امن هستند؟",
      answer: "بله، تمام داده‌ها با رمزگذاری و در سرورهای امن نگهداری می‌شوند.",
    },
    {
      question: "آیا امکان افزودن اعضای بیشتر وجود دارد؟",
      answer: "در پلن‌های حرفه‌ای و تیمی می‌توانید اعضای بیشتری اضافه کنید.",
    },
    {
      question: "آیا می‌توانم پلنم را تغییر دهم؟",
      answer: "بله، می‌توانید در هر زمان پلن خود را ارتقا یا کاهش دهید.",
    },
  ];

  const stats = [
    { value: "۱۰٬۰۰۰+", label: "کاربر فعال" },
    { value: "۵۰٬۰۰۰+", label: "پروژه تکمیل شده" },
    { value: "۹۸٪", label: "رضایت کاربران" },
    { value: "۲۴/۷", label: "پشتیبانی" },
  ];




    const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = document.getElementById('mainVideo') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };







// var ui = useContext(ContextMain);
  return (
    <div>
        {/* {JSON.stringify(ui)} */}
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  جدیدترین نسخه: ۲.۰ با هوش مصنوعی
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                مدیریت پروژه،
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  هوشمند و ساده
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                با پروژه‌یار، تیم خود را متحد کنید و پروژه‌ها را سریع‌تر و بهتر
                به اتمام برسانید. ابزاری که برای تیم‌های ایرانی طراحی شده است.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition transform hover:scale-105 flex items-center gap-2">
                  شروع رایگان
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <a href="#demo" className="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl text-lg font-semibold hover:bg-slate-200 transition flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  مشاهده دمو
                </a>
              </div>
              {/* <div className="flex items-center gap-8 pt-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-4 border-white"
                    ></div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    از <span className="font-bold">۱۰٬۰۰۰+</span> کاربر راضی
                  </p>
                </div>
              </div> */}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-[3rem] blur-3xl"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-700/50">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-slate-400 text-sm">
                        پروژه‌های من
                      </span>
                    </div>
                    {[
                      {
                        color: "from-blue-500 to-cyan-500",
                        title: "طراحی رابط کاربری",
                        progress: 75,
                      },
                      {
                        color: "from-purple-500 to-pink-500",
                        title: "توسعه بک‌اند",
                        progress: 50,
                      },
                      {
                        color: "from-green-500 to-emerald-500",
                        title: "تست و راه‌اندازی",
                        progress: 90,
                      },
                    ].map((item, i) => (
                      <div key={i} className="relative group">
                        <div
                          className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition duration-500"
                          style={{
                            background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                          }}
                        ></div>
                        <div
                          className={`relative p-5 bg-gradient-to-r ${item.color} rounded-2xl shadow-lg transform group-hover:scale-105 transition duration-300`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-white font-semibold">
                              {item.title}
                            </span>
                            <span className="text-white/90 text-sm">
                              {item.progress}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-1000"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition">
                  {stat.value}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">
                ویژگی‌های قدرتمند
              </span>
            </div>
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              ابزارهایی که نیاز داری،
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                همه در یک جا
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              از مدیریت ساده وظایف تا همکاری پیشرفته تیمی، همه چیز را در اختیار
              داری
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500`}
                ></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition border border-slate-200 group-hover:border-transparent">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:rotate-3 transition duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              ببین چطور کار می‌کنه
            </h2>
            <p className="text-xl text-slate-300">
              در کمتر از ۲ دقیقه با پروژه‌یار آشنا شو
            </p>
          </div>







    <div  className="relative group cursor-pointer" onClick={handlePlayPause}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition"></div>
      <div className="relative aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden">
        
        {/* ویدیو */}
        <video 
          id="mainVideo"
          className="w-full h-full object-cover"
          src="YOUR_VIDEO_URL.mp4"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {/* دکمه پلی/پاز */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition border-4 border-white/50">
              <Play className="w-12 h-12 text-white mr-2" />
            </div>
          </div>
        )}
        
        {/* دکمه پاز هنگام پخش (اختیاری) */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 group-hover:opacity-100 transition">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Pause className="w-12 h-12 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>

        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-6">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  چرا پروژه‌یار؟
                </span>
              </div>
              <h2 className="text-5xl font-bold text-slate-900 mb-8">
                ساخته شده برای
                <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  تیم‌های ایرانی
                </span>
              </h2>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                ما می‌دانیم تیم‌های ایرانی چه نیازهایی دارند. به همین خاطر
                پروژه‌یار را با فکر و دقت برای شما طراحی کردیم.
              </p>
              <div className="space-y-6">
                {[
                  "رابط کاربری ساده و فارسی کاملاً بومی‌سازی شده",
                  "سرعت فوق‌العاده در بارگذاری و عملکرد",
                  "پشتیبانی فارسی مستقیم در واتساپ و تلگرام",
                  "قیمت‌گذاری منصفانه و مناسب بازار ایران",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-lg text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-[3rem] blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-12 shadow-2xl text-white">
                <Sparkles className="w-16 h-16 mb-8 opacity-80" />
                <h3 className="text-3xl font-bold mb-4">
                  بیش از ۱۰۰ شرکت ایرانی
                </h3>
                <p className="text-lg opacity-90 mb-8">
                  به پروژه‌یار اعتماد کرده‌اند و روزانه از آن استفاده می‌کنند
                </p>
                <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:shadow-xl transition transform hover:scale-105">
                  مشاهده مشتریان ما
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              نظر کاربران ما
            </h2>
            <p className="text-xl text-slate-600">ببین دیگران چی می‌گن</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "استفاده از پروژه‌یار باعث شد مدیریت پروژه‌هامون ۴۰٪ سریع‌تر بشه! واقعاً تحول آفرین بود.",
                name: "علی رضایی",
                company: "استارتاپ نوا",
                avatar: "from-blue-500 to-cyan-500",
              },
              {
                quote:
                  "رابط کاربری خیلی راحت و پشتیبانی عالی. تیم ما عاشق این ابزار شده.",
                name: "مریم احمدی",
                company: "تیم دیجیتال مارکتینگ دیما",
                avatar: "from-purple-500 to-pink-500",
              },
            ].map((testimonial, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition"></div>
                <div className="relative bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition border border-slate-200">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <Star
                        key={j}
                        className="w-6 h-6 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 text-lg mb-8 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${testimonial.avatar} rounded-full`}
                    ></div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-slate-600">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                قیمت‌گذاری شفاف
              </span>
            </div>
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              پلنی که به تیمت
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                مناسبه رو انتخاب کن
              </span>
            </h2>
            <p className="text-xl text-slate-600">
              شروع رایگان، بدون نیاز به کارت اعتباری
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative group ${plan.popular ? "md:-mt-8" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {plan.badge}
                    </div>
                  </div>
                )}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition ${
                    plan.popular ? "opacity-50" : ""
                  }`}
                ></div>
                <div
                  className={`relative bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition ${
                    plan.popular
                      ? "border-2 border-blue-500 shadow-xl"
                      : "border border-slate-200"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-2">{plan.period}</p>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-4 rounded-xl font-semibold transition transform hover:scale-105 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {plan.name === "رایگان"
                      ? "شروع رایگان"
                      : `انتخاب پلن ${plan.name}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-slate-600">
              سؤال دارید؟{" "}
              <a
                href="#contact"
                className="text-blue-600 font-semibold hover:underline"
              >
                با ما تماس بگیرید
              </a>
            </p>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              سؤالات متداول
            </h2>
            <p className="text-xl text-slate-600">
              پاسخ سؤالات رایج را اینجا پیدا کنید
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:border-blue-300 transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-8 text-right flex justify-between items-center hover:bg-slate-50 transition group"
                >
                  <span className="font-semibold text-slate-900 text-lg pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 text-white" />
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-8 text-slate-600 text-lg leading-relaxed border-t border-slate-100 pt-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-4 relative overflow-hidden">
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Sparkles className="w-16 h-16 text-white mx-auto mb-8 opacity-80" />
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              آماده‌ای کار با تیمت رو
              <br />
              متحول کنی؟
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
              همین الان شروع کن، بدون نیاز به کارت اعتباری. در کمتر از ۲ دقیقه
              اولین پروژه‌ات رو بساز.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-10 py-5 bg-white text-blue-600 rounded-xl text-lg font-bold hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-2">
                شروع رایگان
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 rounded-xl text-lg font-bold hover:bg-white/20 transition">
                تماس با فروش
              </button>
            </div>
            <p className="text-white/80 mt-8">
              بدون نیاز به کارت اعتباری • لغو در هر زمان • پشتیبانی ۲۴/۷
            </p>
          </div>
        </>
      </section>
    </div>
  );
}
