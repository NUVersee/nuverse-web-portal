"use client";

import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NAVIGATION_ITEMS, CONTACT_INFO, SOCIAL_LINKS, BRAND, META } from "@/constants";

/**
 * Footer Component
 * 
 * Displays the application footer with quick links, contact information,
 * social media links, and copyright notice.
 * 
 * @returns {JSX.Element} The footer section.
 */
export function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-xl text-white py-24 px-4 sm:px-6 lg:px-8 transition-colors border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={BRAND.logoPath}
                alt={`${BRAND.name} Logo`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <h4 className="text-white font-black uppercase tracking-tighter">
                NU<span className="text-nu-red-500">verse</span>
              </h4>
            </div>
            <p className="text-gray-400">{BRAND.tagline}</p>
          </div>

          <div>
            <h5 className="mb-4 font-semibold">Quick Links</h5>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-semibold">Contact Info</h5>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>{CONTACT_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-semibold">Follow Us</h5>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-nu-red-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-nu-red-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-nu-red-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-nu-red-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-nu-blue-200">
          <p>{META.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
