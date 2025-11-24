"use client"
import { useContext, useState } from "react";
import {
  Menu,
  X,
  Home,
  CirclePlus,
  MessageSquare,
  TrendingUp,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";
import { ContextMain } from "@/context/context";
import { useOnlineStatus } from "@/hook/statusOnline";
import { useSelectedLayoutSegments } from "next/navigation";
import { useLazyVerify } from "@/hook/useLazyVerify";

function MenuSlider() {
  const ui = useContext(ContextMain);
  const [isOpen, setIsOpen] = useState(false);
var { loading, user, error }: any = useLazyVerify();
  const [activeItem, setActiveItem]:any = useState(
    // location?.pathname.split('/')?.[2]
    useSelectedLayoutSegments()
  );
  // console.log(useSelectedLayoutSegments());
  
  const menuItems = [
    { icon: TrendingUp, label: "خانه", badge: null,url:"/user",ty:undefined },
    { icon: CirclePlus, label: "افزودن گروه", badge: null,url:"/user/group",ty:'group' },
    // { icon: MessageSquare, label: "کامنت ها", badge: "3",url:"/comments",ty:'' },
    // { icon: TrendingUp, label: "وضعیت", badge: null,url:"" },
  ];

  return (
    <>
          <div
        className={`fixed md:static top-0 right-0 z-50 h-full bg-white border-l border-gray-200 flex flex-col justify-between transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 md:w-64"
        }`}
      >      {/* Sidebar Container */}
      <div
        className={`fixed md:relative top-0 right-0 h-full w-72 bg-white shadow-2xl md:shadow-none z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7e4fff] to-[#9d6fff] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">د</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#7e4fff] to-[#9d6fff] bg-clip-text text-transparent">
              داشبورد
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 md:hidden group"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-[#7e4fff] transition-colors" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem[0] === item.ty;
            return (
              <a
                href={item.url}
                key={item.label}
                onClick={() => {
                  setActiveItem(item.label);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 relative group ${
                  isActive
                    ? "bg-gradient-to-r from-[#7e4fff]/15 to-[#9d6fff]/10 text-[#7e4fff] shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#7e4fff]"
                }`}
              >
                {isActive && (
                  <div className="absolute right-0 w-1.5 h-10 bg-gradient-to-b from-[#7e4fff] to-[#9d6fff] rounded-l-full shadow-lg" />
                )}
                <div
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-br from-[#7e4fff] to-[#9d6fff] shadow-md"
                      : "bg-gray-100 group-hover:bg-[#7e4fff]/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-gray-600 group-hover:text-[#7e4fff]"
                    }`}
                  />
                </div>
                <span className="flex-1 text-right font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2.5 py-1 text-xs font-bold bg-gradient-to-r from-[#7e4fff] to-[#9d6fff] text-white rounded-full shadow-md animate-pulse">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 p-4 space-y-3">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <button aria-label="الرت ها" className="flex-1 p-3 rounded-xl bg-gray-50 hover:bg-[#7e4fff]/10 transition-all duration-200 group">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#7e4fff] mx-auto transition-colors" />
            </button>
            <a aria-label="ویرایش اطلاعات"  href="/user/editprofile" className="flex-1 p-3 rounded-xl bg-gray-50 hover:bg-[#7e4fff]/10 transition-all duration-200 group">
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-[#7e4fff] mx-auto transition-colors" />
            </a>
            <a aria-label="خروج" href="/api/logout" className="flex-1 p-3 rounded-xl bg-gray-50 hover:bg-red-50 transition-all duration-200 group">
              <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-500 mx-auto transition-colors" />
            </a>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7e4fff] to-[#9d6fff] flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
                {loading?"":user?.email[0]?.toUpperCase()}
                {/* {ui.user?.email[0]?.toUpperCase()} */}
              </div>
              {
              // typeof window !== 'undefined'&&
                // useOnlineStatus() ? <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>: <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
              }
             
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {loading?<div className="bg-gray-200 rounded-2xl p-2"></div>: user?.name ?? 'کاربر میهمان'}
              </p>
              <p className="text-xs text-gray-500 truncate">

                {loading?<div className="bg-gray-200 rounded-2xl p-2"></div>: user?.email }
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Toggle button for mobile */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 p-3 bg-gradient-to-br from-[#7e4fff] to-[#9d6fff] text-white rounded-xl shadow-lg md:hidden z-50 hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      </div>

    </>
  );
}

export default MenuSlider;