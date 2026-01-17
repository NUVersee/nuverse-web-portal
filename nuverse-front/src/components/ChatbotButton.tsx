"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/constants";

type Message = {
  type: "bot" | "user";
  text: string;
  sources?: string[];
};

/**
 * ChatbotButton Component
 * 
 * Provides a floating chat interface for interacting with the Nile University Admission Officer AI.
 * Handles user messages, quick questions, and displays bot responses with sources.
 * 
 * @returns {JSX.Element} The floating chat button and chat window.
 */
export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      text: "Hello! I'm the Nile University Admission Officer. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickQuestions = ["What programs do you offer?", "How do I apply?", "What are the admission requirements?", "Tell me about tuition fees"];

  /**
   * Sends the current input value as a message to the chatbot API.
   * Updates the message list with the user message and the bot's response.
   * 
   * @returns {Promise<void>}
   */
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { type: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: inputValue,
          sessionId: sessionId,
          useMemory: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
      }

      const data = await response.json();
      const botResponse: Message = {
        type: "bot",
        text: data.answer || "I apologize, but I couldn't generate a response. Please try again.",
        sources: data.sources,
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      let errorText = "I'm having trouble connecting to the server. Please try again later or contact us at nuverse6@gmail.com.";

      // Provide more specific error messages
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        errorText = "Cannot connect to the chatbot server. Please ensure the backend is running on port 5297 and try again.";
      }

      const errorResponse: Message = {
        type: "bot",
        text: errorText,
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sends a predefined quick question to the chatbot API.
   * 
   * @param {string} question - The quick question text to send.
   * @returns {Promise<void>}
   */
  const handleQuickQuestion = async (question: string) => {
    const userMessage: Message = { type: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          sessionId: sessionId,
          useMemory: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
      }

      const data = await response.json();
      const botResponse: Message = {
        type: "bot",
        text: data.answer || "I apologize, but I couldn't generate a response. Please try again.",
        sources: data.sources,
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      let errorText = "I'm having trouble connecting to the server. Please try again later or contact us at nuverse6@gmail.com.";

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        errorText = "Cannot connect to the chatbot server. Please ensure the backend is running on port 5297 and try again.";
      }

      const errorResponse: Message = {
        type: "bot",
        text: errorText,
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Returns the appropriate character image path based on the current state.
   */
  const getCharacterImage = () => {
    const basePath = "/Images/Chat-Bot Character";
    if (isLoading) return `${basePath}/Think.webp`;
    if (messages.length <= 1) return `${basePath}/Hello.webp`;
    return `${basePath}/Ready.webp`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#9e1b36] to-[#c73852] hover:from-[#c73852] hover:to-[#9e1b36] text-white rounded-full p-6 shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce-slow border border-white/20"
        aria-label="Open chat"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-[-14rem] md:right-0 lg:right-[-14rem] z-50 flex items-end gap-0 pointer-events-none">
          {/* Chat Window Container */}
          <div
            className="w-96 max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden border border-white/20 pointer-events-auto shrink-0"
            style={{ background: 'linear-gradient(180deg, #121521 0%, #38476b 100%)' }}
          >
            {/* Header */}
            <div
              className="text-white p-5 border-b border-white/20 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #9e1b36 0%, #c73852 100%)' }}
            >
              <div className="flex-1">
                <h3
                  className="font-bold text-lg tracking-tight leading-none"
                  style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
                >
                  Admission Officer
                </h3>
                <p
                  className="text-xs opacity-90 mt-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Nile University AI Assistant
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              className="h-96 overflow-y-auto p-4 space-y-4"
              style={{ background: 'rgba(18, 21, 33, 0.9)' }}
            >
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[80%] min-w-0 rounded-2xl px-4 py-3 text-sm shadow-lg"
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
                      ...(message.type === "user"
                        ? {
                          background: 'linear-gradient(135deg, #38476b 0%, #121521 100%)',
                          borderRadius: '16px 16px 4px 16px',
                          border: '1px solid rgba(56, 71, 107, 0.5)',
                          color: 'white'
                        }
                        : {
                          background: 'linear-gradient(135deg, #9e1b36 0%, #c73852 100%)',
                          borderRadius: '16px 16px 16px 4px',
                          border: '1px solid rgba(255, 75, 43, 0.3)',
                          color: 'white'
                        }
                      )
                    }}
                  >
                    <div className="whitespace-pre-wrap break-words overflow-wrap-anywhere leading-relaxed">
                      {message.text}
                    </div>
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/30">
                        <p className="text-xs opacity-80 mb-1">Sources:</p>
                        {message.sources.map((source, idx) => (
                          <p key={idx} className="text-xs opacity-80">• {source}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl p-3"
                    style={{ background: 'linear-gradient(135deg, #b6192e 0%, #ff4b2b 100%)' }}
                  >
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="space-y-3">
                  <p
                    className="text-sm font-semibold uppercase tracking-wide"
                    style={{ fontFamily: "'Inter', sans-serif", color: '#8B0000' }}
                  >
                    Quick Questions:
                  </p>
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="block w-full text-left text-sm text-white p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                      style={{
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        background: 'linear-gradient(135deg, #38476b 0%, #121521 100%)',
                        border: '1px solid rgba(56, 71, 107, 0.5)'
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              className="p-4 border-t border-white/20"
              style={{ background: '#121521' }}
            >
              <div className="flex gap-2 items-end">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (!isLoading) handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 text-white disabled:opacity-50 disabled:cursor-not-allowed resize-none min-h-[44px] max-h-32 overflow-y-auto placeholder-white/50"
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                    background: '#38476b',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #b6192e 0%, #ff4b2b 100%)' }}
                >
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Floating Character - Outside clipping area */}
          <div className="w-140 h-80 pointer-events-none hidden lg:block overflow-visible relative ml-[-12rem] mb-[-1rem]">
            <motion.div
              key={getCharacterImage()}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.img
                src={getCharacterImage()}
                alt="Admission Officer"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              />

              {/* Thinking Indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: 10 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/20 shadow-2xl"
                  >
                    {[0, 0.2, 0.4].map((delay) => (
                      <motion.div
                        key={delay}
                        animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay }}
                        className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}

