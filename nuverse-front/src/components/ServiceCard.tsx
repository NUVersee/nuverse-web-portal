"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronRight, ArrowUpRight, Sparkle } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className="group bg-nu-dark/85 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-white/10 hover:border-nu-peach-300/40 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative h-48 shrink-0 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nu-dark via-nu-dark/20 to-transparent transition-colors" />
        <div className="absolute inset-0 bg-gradient-to-tr from-nu-blue-900/40 to-nu-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300"
              style={{ background: 'var(--nu-gradient-signature)' }}
            >
              <Icon className="text-white" size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{title}</h3>
          </div>
          <ArrowUpRight className="text-white/40 group-hover:text-nu-peach-300 transition-colors" size={24} />
        </div>
        
        <p className="text-slate-100 text-base mb-4 leading-relaxed font-medium transition-colors flex-grow" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{description}</p>

        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-slate-200 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms`, fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <Sparkle size={16} className="text-nu-peach-300 shrink-0 opacity-80" />
              <span className="text-slate-200 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
          className="px-8 py-3 mt-auto rounded-full text-white transition-all flex items-center gap-2 group font-bold uppercase tracking-widest text-[11px] shadow-lg hover:shadow-nu-blue-500/20 hover:scale-105 active:scale-95 w-fit"
          style={{ 
            background: 'var(--nu-gradient-signature)', 
            fontFamily: 'system-ui, -apple-system, sans-serif' 
          }}
        >
          Explore More
          <ChevronRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}

