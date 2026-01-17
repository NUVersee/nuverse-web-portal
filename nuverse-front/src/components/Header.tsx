"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { NAVIGATION_ITEMS, BRAND } from "@/constants";

/**
 * Header Component
 * 
 * The main navigation header of the application.
 * Features a sticky design and mobile-responsive menu.
 * 
 * @returns {JSX.Element} The header with navigation links.
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Get the appropriate href based on current page
   */
  const getNavHref = (item: typeof NAVIGATION_ITEMS[0]) => {
    if (isHome && item.homeHref) {
      return item.homeHref;
    }
    return item.href;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-nu-dark/40 backdrop-blur-xl border-b border-white/5 shadow-2xl py-2" : "bg-transparent py-4"}`}>
      <nav className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="relative -mt-6 ml-20">
              <div className="absolute -inset-1 bg-gradient-to-r from-nu-blue-600 to-nu-red-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <Image
                src={BRAND.logoPath}
                alt={`${BRAND.name} Logo`}
                width={140}
                height={80}
                className="relative h-20 w-auto rounded-full border-2 border-white dark:border-gray-800 shadow-2xl"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center space-x-1">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={getNavHref(item)}
                  className="relative text-white font-bold hover:text-nu-peach-300 transition-colors px-4 py-2 rounded-full hover:bg-white/10 uppercase tracking-widest text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 p-4 glass dark:dark-glass rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl animate-fade-in">
            <div className="flex flex-col space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={getNavHref(item)}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-semibold hover:text-nu-red-500 px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors"
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
