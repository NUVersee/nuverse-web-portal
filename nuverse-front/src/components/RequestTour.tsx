"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter, Sparkles } from "lucide-react";
import { useState } from "react";
import { API_BASE_URL } from "@/constants";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

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

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Handles the submission of the contact form.
   * Sends form data to the backend API and displays success/error status.
   * 
   * @param {React.FormEvent} e - The form submit event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    if (!captchaToken) {
      toast.error("Please complete the captcha verification.");
      setSubmitting(false);
      return;
    }

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
          captchaToken: captchaToken,
        }),
      });

      if (!resp.ok) {
        if (resp.status === 400) {
          const problemDetails = await resp.json();
          if (problemDetails.errors) {
            const newErrors: Record<string, string> = {};
            // Map backend DTO names to frontend state names
            if (problemDetails.errors.FullName) newErrors.name = problemDetails.errors.FullName[0];
            if (problemDetails.errors.Email) newErrors.email = problemDetails.errors.Email[0];
            if (problemDetails.errors.PhoneNumber) newErrors.phone = problemDetails.errors.PhoneNumber[0];
            if (problemDetails.errors.Reason) newErrors.reason = problemDetails.errors.Reason[0];

            setErrors(newErrors);
            toast.error("Please check the form for errors.");
            return; // Stop execution here, don't throw generic error
          }
        }

        console.error("Tour Request error status:", resp.status, resp.statusText);
        const text = await resp.text();
        console.error("Tour Request error body:", text);

        if (resp.status === 429) {
          throw new Error("Too many requests. Please try again in minute.");
        }
        if (resp.status === 524) {
          throw new Error("Connection timeout. The server took too long to respond.");
        }
        throw new Error(text || "Failed to send request");
      }

      const data = await resp.json();
      if (data.status === 'error') {
        console.error("Backend returned error:", data.message);
        throw new Error(data.message || "An error occurred while sending the message.");
      } else if (data.status === 'captcha_failed') {
        throw new Error("Captcha verification failed.");
      }

      toast.success("Request sent successfully! We'll contact you soon.");
      setFormData({ name: "", email: "", phone: "", reason: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
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
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight uppercase tracking-wider" style={{ fontFamily: 'RostexDisplay, sans-serif' }}>
              REQUEST A
              <br />
              VIRTUAL REALITY
              <br />
              CAMPUS TOUR
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>VR Tour Request Form</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white transition-all ${errors.name ? 'border-red-500 bg-red-900/10' : 'border-white/10'
                    }`}
                  placeholder="John Doe"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400 font-medium animate-pulse">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white transition-all ${errors.email ? 'border-red-500 bg-red-900/10' : 'border-white/10'
                    }`}
                  placeholder="john@gmail.com"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 font-medium animate-pulse">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white transition-all ${errors.phone ? 'border-red-500 bg-red-900/10' : 'border-white/10'
                    }`}
                  placeholder="+20 123 456 7890"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400 font-medium animate-pulse">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Reason for Request *
                </label>
                <textarea
                  id="message"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                  rows={5}
                  className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 focus:border-transparent bg-nu-dark/80 text-white resize-none transition-all ${errors.reason ? 'border-red-500 bg-red-900/10' : 'border-white/10'
                    }`}
                  placeholder="I would like to request the university VR equipment to take a virtual tour of..."
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                />
                {errors.reason && (
                  <p className="mt-1 text-sm text-red-400 font-medium animate-pulse">{errors.reason}</p>
                )}
              </div>

              <div className="flex justify-center">
                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                    theme="dark"
                  />
                ) : (
                  <p className="text-red-400 text-sm bg-red-900/10 p-2 rounded">
                    Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing in .env.local
                  </p>
                )}
              </div>


              <button
                type="submit"
                disabled={submitting}
                className="group w-full bg-gradient-to-r from-[#121521] via-[#38476b] via-[#b6192e] to-[#ffc1ac] bg-[length:200%_auto] hover:bg-right hover:opacity-90 text-white px-8 py-4 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none font-bold uppercase tracking-widest text-lg"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
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
