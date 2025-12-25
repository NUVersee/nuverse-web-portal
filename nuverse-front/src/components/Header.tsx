"use client";
/* eslint-disable @next/next/no-img-element */

import { Menu, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? "glass dark:dark-glass shadow-lg py-2" : "bg-transparent py-4"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img src="/nuverse-logo.png" alt="NUverse Logo" className="relative h-12 w-12 rounded-full border-2 border-white dark:border-gray-800 shadow-md" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              NUverse
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center space-x-1">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: isHome ? "#about" : "/#about" },
                { name: "Services", href: isHome ? "#services" : "/#services" },
                { name: "Contact", href: isHome ? "#contact" : "/#contact" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-full hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group shadow-sm border border-gray-200/50 dark:border-gray-700/50"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-yellow-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon size={20} className="text-gray-700 group-hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 p-4 glass dark:dark-glass rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl animate-fade-in">
            <div className="flex flex-col space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: isHome ? "#about" : "/#about" },
                { name: "Services", href: isHome ? "#services" : "/#services" },
                { name: "Contact", href: isHome ? "#contact" : "/#contact" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 px-4 py-3 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

