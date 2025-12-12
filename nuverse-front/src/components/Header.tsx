// eslint-disable-next-line @typescript-eslint/no-unused-expressions
`use client`;
/* eslint-disable @next/next/no-img-element */

import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img src="/nuverse-logo.png" alt="NUverse Logo" className="h-12 w-12 rounded-full" />
            <span className="text-blue-600 dark:text-blue-400">NUverse</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
                <Link href="/" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2">
                  Home
                </Link>
                <Link
                  href={isHome ? "#services" : "/#services"}
                  onClick={(e) => {
                    if (!isHome) {
                      e.preventDefault();
                      window.location.href = "/#services";
                    }
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2"
                >
                  Services
                </Link>
                <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2">
                  About
                </Link>
                <Link
                  href={isHome ? "#contact" : "/#contact"}
                  onClick={(e) => {
                    if (!isHome) {
                      e.preventDefault();
                      window.location.href = "/#contact";
                    }
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2"
                >
                  Contact
                </Link>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t dark:border-gray-700">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2">
                Home
              </Link>
              <Link
                href={isHome ? "#services" : "/#services"}
                onClick={(e) => {
                  if (!isHome) {
                    e.preventDefault();
                    window.location.href = "/#services";
                  }
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2"
              >
                Services
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2">
                About
              </Link>
              <Link
                href={isHome ? "#contact" : "/#contact"}
                onClick={(e) => {
                  if (!isHome) {
                    e.preventDefault();
                    window.location.href = "/#contact";
                  }
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

