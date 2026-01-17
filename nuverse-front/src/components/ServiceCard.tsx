"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  features: string[];
  onClick?: () => void;
};

export function ServiceCard({ icon: Icon, title, description, image, features, onClick }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className="group bg-nu-dark/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-white/5 hover:border-nu-peach-300/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nu-dark via-nu-dark/40 to-transparent transition-colors" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#b6192e]/20 to-[#38476b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#b6192e] to-[#ffc1ac] p-3 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
              <Icon className="text-white" size={24} />
            </div>
            <h3 className="section-h3 text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{title}</h3>
          </div>
          <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-300 mb-6 leading-relaxed font-medium transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{description}</p>

        <div className="space-y-2 mb-4">
          {features.slice(0, isExpanded ? features.length : 3).map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms`, fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b6192e] to-[#ffc1ac] shadow-[0_0_10px_rgba(182,25,46,0.5)]"></div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-nu-peach-300 hover:text-white transition-colors flex items-center gap-1 group font-bold uppercase tracking-widest text-xs"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {isExpanded ? "Show Less" : "Explore More"}
          <ChevronRight
            size={16}
            className={`transition-transform duration-300 ${isExpanded ? "rotate-90" : ""} group-hover:translate-x-1`}
          />
        </button>
      </div>
    </div>
  );
}

