// eslint-disable-next-line @typescript-eslint/no-unused-expressions
`use client`;

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
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
              <Icon className="text-white" size={24} />
            </div>
            <h3 className="text-white">{title}</h3>
          </div>
          <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{description}</p>

        <div className="space-y-2 mb-4">
          {features.slice(0, isExpanded ? features.length : 3).map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-1 group"
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

