"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter, Sparkles } from "lucide-react";
import { useState } from "react";

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
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Text Content */}
          <div className="space-y-6 lg:pt-12">
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight uppercase tracking-wider" style={{fontFamily: 'RostexDisplay, sans-serif'}}>
              REQUEST A
              <br />
              VIRTUAL REALITY
              <br />
              CAMPUS TOUR
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
              Our VR campus tour allows prospective students and parents to gain
              a realistic understanding of the university environment. Using
              immersive technology, you can walk through key locations, explore
              academic facilities, and visualize student life in an interactive
              and engaging way. By completing this request form, you will
              receive an email with further details, including a scheduled time
              to access and attend the virtual campus tour.
            </p>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/10 transition-all duration-300">
            <div className="mb-8 text-white">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>VR Tour Request Form</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
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
                  style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 border-2 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white transition-all"
                  placeholder="john@gmail.com"
                  style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-3.5 border-2 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white transition-all"
                  placeholder="+20 123 456 7890"
                  style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
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
                  style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}
                />
              </div>

              {status.type && (
                <div
                  className={`text-sm rounded-xl p-4 font-medium ${status.type === "success"
                    ? "bg-green-50 text-green-800 dark:bg-green-900/40 dark:text-green-100 border border-green-200 dark:border-green-800"
                    : "bg-red-50 text-red-800 dark:bg-red-900/40 dark:text-red-100 border border-red-200 dark:border-red-800"
                    }`}
                  style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group w-full bg-gradient-to-r from-[#121521] via-[#38476b] via-[#b6192e] to-[#ffc1ac] bg-[length:200%_auto] hover:bg-right hover:opacity-90 text-white px-8 py-4 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none font-bold uppercase tracking-widest text-lg"
                style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
