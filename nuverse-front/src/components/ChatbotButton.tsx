// eslint-disable-next-line @typescript-eslint/no-unused-expressions
`use client`;

import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

type Message = {
  type: "bot" | "user";
  text: string;
};

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      text: "Hello! I'm the Nile University Admission Officer. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickQuestions = ["What programs do you offer?", "How do I apply?", "What are the admission requirements?", "Tell me about tuition fees"];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { type: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        type: "bot",
        text: "Thank you for your question! For detailed information, please contact us at nuverse6@gmail.com or explore our VR tour to learn more about Nile University.",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInputValue("");
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = { type: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      let response = "";
      if (question.includes("programs")) {
        response = "We offer programs in Engineering, Computer Science, Business, and more. Would you like to schedule a VR tour to explore our facilities?";
      } else if (question.includes("apply")) {
        response = "You can apply through our website or email us at nuverse6@gmail.com. Our admission team will guide you through the process!";
      } else if (question.includes("requirements")) {
        response = "Admission requirements vary by program. Please email nuverse6@gmail.com with your intended program for specific requirements.";
      } else if (question.includes("tuition")) {
        response = "For detailed tuition information and scholarship opportunities, please contact us at nuverse6@gmail.com.";
      }

      const botResponse: Message = { type: "bot", text: response };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce-slow"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h3>Admission Officer</h3>
            <p className="text-sm opacity-90">Ask me anything about Nile University</p>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="block w-full text-left text-sm bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              />
              <button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

