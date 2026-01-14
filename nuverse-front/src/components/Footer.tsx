"use client";
/* eslint-disable @next/next/no-img-element */

import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Instagram } from "lucide-react";

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
    <footer className="bg-white/5 backdrop-blur-xl text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/nuverse-logo.png" alt="NUverse Logo" className="h-10 w-10 rounded-full" />
              <h4 className="text-white font-black uppercase tracking-tighter">NU<span className="text-nu-red-500">verse</span></h4>
            </div>
            <p className="text-gray-400">Experience the future of education through immersive virtual reality technology.</p>
          </div>

          <div>
            <h5 className="mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4">Contact Info</h5>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>Sheikh Zayed, Giza, Egypt</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span>+20 2 3847 6656</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <a href="mailto:nuverse6@gmail.com" className="hover:text-white transition-colors">
                  nuverse6@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4">Follow Us</h5>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-nu-red-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-nu-red-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-nu-red-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com"
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
          <p>&copy; 2025 NUverse - Nile University VR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

