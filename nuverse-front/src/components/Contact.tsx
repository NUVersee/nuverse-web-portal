"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter, Sparkles } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    Reason_for_Request: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; Reason_for_Request: string }>({
    type: null,
    Reason_for_Request: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus({ type: null, Reason_for_Request: "" });
    setSubmitting(true);

    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5297";
    const url = `${apiBase}/api/contact`;

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
          reason: formData.Reason_for_Request,
          captchaToken: null,
        }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || "Failed to send Reason_for_Request");
      }

      setStatus({ type: "success", Reason_for_Request: "Message sent successfully. We'll get back to you soon." });
      setFormData({ name: "", email: "", phone: "", Reason_for_Request: "" });
    } catch (err) {
      const Reason_for_Request = err instanceof Error ? err.message : "Something went wrong.";
      setStatus({ type: "error", Reason_for_Request });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 transition-colors overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/10 dark:bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-6">
            <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              LET'S CONNECT
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 dark:border-gray-700/30 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                <Send className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send us a message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                  placeholder="+20 123 456 7890"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Request *
                </label>
                <textarea
                  id="message"
                  value={formData.Reason_for_Request}
                  onChange={(e) => setFormData({ ...formData, Reason_for_Request: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none transition-all"
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
                  {status.Reason_for_Request}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none font-semibold text-lg"
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
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/30 transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                    <a
                      href="mailto:nuverse6@gmail.com"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      nuverse6@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-400">+20 2 3847 6656</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">Sheikh Zayed, Giza, Egypt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/30 transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Follow Us</h3>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-700 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Facebook className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" size={24} />
                  <span className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors">Facebook</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-700 dark:to-gray-600 hover:from-blue-400 hover:to-cyan-500 dark:hover:from-blue-400 dark:hover:to-cyan-500 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Twitter className="text-blue-400 group-hover:text-white transition-colors" size={24} />
                  <span className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors">Twitter</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 hover:from-blue-700 hover:to-indigo-800 dark:hover:from-blue-700 dark:hover:to-indigo-800 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Linkedin className="text-blue-700 dark:text-blue-400 group-hover:text-white transition-colors" size={24} />
                  <span className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors">LinkedIn</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 hover:from-pink-600 hover:to-purple-700 dark:hover:from-pink-600 dark:hover:to-purple-700 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Instagram className="text-pink-600 dark:text-pink-400 group-hover:text-white transition-colors" size={24} />
                  <span className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
