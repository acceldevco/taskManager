"use client";
import { ContextMain } from "@/context/context";
import { useLazyVerify } from "@/hook/useLazyVerify";
import { LayoutDashboard, Menu, Sparkles, User, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";

interface HeaderProps {
  segment?: string[];
}

function Header({ segment }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ui = useContext(ContextMain);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "ویژگی‌ها" },
    { href: "#pricing", label: "قیمت‌ها" },
    { href: "#faq", label: "سؤالات" },
    { href: "#contact", label: "تماس" },
  ];

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
var{loading,error,user}=useLazyVerify()
  if (segment && segment.length > 0) return null;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                پروژه‌یار
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-slate-700 hover:text-blue-600 transition-colors duration-300 font-medium group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          {/* {JSON.stringify(loading)} */}
          {!loading ? (
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <a
                  href="/user"
                  className="flex items-center gap-2 px-5 py-2.5 text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium rounded-xl hover:bg-slate-100"
                >
                  <span>داشبورد</span>
                  <LayoutDashboard className="w-5 h-5" />
                </a>
              ) : (
                <>
                  <a
                    href="/auth"
                    className="flex items-center gap-2 px-5 py-2.5 text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium rounded-xl hover:bg-slate-100"
                  >
                    <span>ورود</span>
                    <User className="w-5 h-5" />
                  </a>
                  <a
                    href="/auth"
                    className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium overflow-hidden group shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                  >
                    <span className="relative z-10">شروع رایگان</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </>
              )}
            </div>
          ):<div className="bg-gray-200 rounded-2xl p-2 w-[30%]"></div>}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-300"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="block text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium py-3 px-4 rounded-lg transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 space-y-3">
            {ui.user ? (
              <a
                href="/user"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all duration-300"
              >
                <span>داشبورد</span>
                <LayoutDashboard className="w-5 h-5" />
              </a>
            ) : (
              <>
                <a
                  href="/auth"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all duration-300"
                >
                  <span>ورود</span>
                  <User className="w-5 h-5" />
                </a>
                <a
                  href="/auth"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                >
                  شروع رایگان
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
