"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

type Message = {
  type: "bot" | "user";
  text: string;
  sources?: string[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5297";

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
      const errorResponse: Message = {
        type: "bot",
        text: "I'm having trouble connecting to the server. Please try again later or contact us at nuverse6@gmail.com.",
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
      const errorResponse: Message = {
        type: "bot",
        text: "I'm having trouble connecting to the server. Please try again later or contact us at nuverse6@gmail.com.",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#b6192e] to-[#ff4b2b] hover:from-[#ff4b2b] hover:to-[#b6192e] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce-slow border border-white/20"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-nu-dark/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <div className="bg-gradient-to-r from-nu-red-500 to-nu-red-600 text-white p-5 border-b border-white/10">
            <h3 className="font-black uppercase tracking-tight">Admission Officer</h3>
            <p className="text-xs opacity-80 font-bold uppercase tracking-widest mt-0.5">Nile University AI</p>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-nu-dark/50">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm font-medium ${message.type === "user" ? "bg-nu-blue-500 text-white rounded-tr-none" : "bg-white/10 dark:bg-nu-dark/80 text-gray-900 dark:text-white rounded-tl-none border border-white/10"
                    }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                      <p className="text-xs opacity-75 mb-1">Sources:</p>
                      {message.sources.map((source, idx) => (
                        <p key={idx} className="text-xs opacity-75">• {source}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="block w-full text-left text-sm bg-nu-dark/40 hover:bg-white/5 text-white p-2 rounded-lg transition-colors border border-white/5"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-nu-deep border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nu-red-500 bg-white/5 dark:bg-nu-dark/50 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-nu-red-500 hover:bg-nu-red-600 text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-nu-red-500/20 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

