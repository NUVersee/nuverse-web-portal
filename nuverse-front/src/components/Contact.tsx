"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter, Sparkles } from "lucide-react";
import { useState } from "react";
import { API_BASE_URL, CONTACT_INFO, SOCIAL_LINKS } from "@/constants";

/**
 * Contact Component
 * 
 * Displays the contact form and contact information for Nile University.
 * Allows users to send messages and requests for VR equipment.
 * 
 * @returns {JSX.Element} The contact section including form and info.
 */
export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  /**
   * Handles the submission of the contact form.
   * Sends form data to the backend API and displays success/error status.
   * 
   * @param {React.FormEvent} e - The form submit event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus({ type: null, message: "" });
    setSubmitting(true);

    const url = `${API_BASE_URL}/api/contact`;

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name || "Anonymous",
          email: formData.email,
          phoneNumber: formData.phone,
          reason: formData.reason,
          captchaToken: null,
        }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || "Failed to send Reason_for_Request");
      }

      setStatus({ type: "success", message: "Message sent successfully. We'll get back to you soon." });
      setFormData({ name: "", email: "", phone: "", reason: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setStatus({ type: "error", message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 transition-colors overflow-hidden">
      {/* Animated background */}


      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="badge mb-6">
            <Sparkles className="text-nu-peach-300" size={20} />
            <span className="ml-2">GET IN TOUCH</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-6 leading-tight">
            Let's Connect
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-8 text-white">
              <div className="p-3 bg-gradient-to-br from-nu-blue-500 to-nu-red-500 rounded-xl shadow-lg">
                <Send className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Send us a message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 border-2 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 border-2 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-3.5 border-2 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white transition-all"
                  placeholder="+20 123 456 7890"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Reason for Request *
                </label>
                <textarea
                  id="message"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-5 py-3.5 border-2 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white resize-none transition-all"
                  placeholder="I would like to request the university VR equipment to take a virtual tour of..."
                />
              </div>

              {status.type && (
                <div
                  className={`text-sm rounded-xl p-4 font-medium ${status.type === "success"
                    ? "bg-green-50 text-green-800 dark:bg-green-900/40 dark:text-green-100 border border-green-200 dark:border-green-800"
                    : "bg-red-50 text-red-800 dark:bg-red-900/40 dark:text-red-100 border border-red-200 dark:border-red-800"
                    }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group w-full bg-gradient-to-r from-[#121521] via-[#38476b] via-[#b6192e] to-[#ffc1ac] bg-[length:200%_auto] hover:bg-right hover:opacity-90 text-white px-8 py-4 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none font-black uppercase tracking-widest text-lg"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="bg-gradient-to-br from-[#b6192e] to-[#ffc1ac] p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <a
                      href="mailto:nuverse6@gmail.com"
                      className="text-gray-400 hover:text-nu-red-500 transition-colors"
                    >
                      nuverse6@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-gradient-to-br from-[#b6192e] to-[#ffc1ac] p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Phone</h4>
                    <p className="text-gray-400">+20 2 3847 6656</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-gradient-to-br from-[#b6192e] to-[#ffc1ac] p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Location</h4>
                    <p className="text-gray-400">Sheikh Zayed, Giza, Egypt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-8">Follow Us</h3>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-nu-blue-600 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Facebook className="text-nu-blue-400 group-hover:text-white transition-colors" size={24} />
                  <span className="font-semibold text-white group-hover:text-white transition-colors">Facebook</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-nu-blue-400 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Twitter className="text-nu-blue-400 group-hover:text-white transition-colors" size={24} />
                  <span className="font-semibold text-white group-hover:text-white transition-colors">Twitter</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-nu-blue-700 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Linkedin className="text-nu-blue-400 group-hover:text-white transition-colors" size={24} />
                  <span className="font-semibold text-white group-hover:text-white transition-colors">LinkedIn</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-nu-red-500 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Instagram className="text-nu-red-400 group-hover:text-white transition-colors" size={24} />
                  <span className="font-semibold text-white group-hover:text-white transition-colors">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
