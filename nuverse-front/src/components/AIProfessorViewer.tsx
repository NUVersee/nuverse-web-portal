// eslint-disable-next-line @typescript-eslint/no-unused-expressions
`use client`;

import { useState } from "react";
import { Home, MessageCircle, Send, X } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

type AIProfessorViewerProps = {
  onClose: () => void;
};

type Faculty = {
  id: string;
  name: string;
  gradient: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  professor: {
    name: string;
    image: string;
    title: string;
  };
  description: string;
  expertise: string[];
  helpAreas: string[];
};

export function AIProfessorViewer({ onClose }: AIProfessorViewerProps) {
  const [activeFaculty, setActiveFaculty] = useState("engineering");
  const [question, setQuestion] = useState("");
  const [direction, setDirection] = useState<"left" | "right">("right");

  const faculties: Faculty[] = [
    {
      id: "engineering",
      name: "Engineering",
      gradient: "from-blue-600 to-cyan-600",
      accentText: "text-blue-600",
      accentBg: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10",
      accentBorder: "border-blue-200 dark:border-blue-800",
      professor: {
        name: "Dr. Ahmed Hassan",
        image:
          "https://images.unsplash.com/photo-1758685734622-3e0a002b2f53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHByb2Zlc3NvcnxlbnwxfHx8fDE3NjUyMTkxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Professor of Mechanical Engineering",
      },
      description:
        "The Faculty of Engineering at Nile University offers cutting-edge programs in mechanical, electrical, and civil engineering. Our curriculum combines theoretical knowledge with practical applications, preparing students for the challenges of modern engineering.",
      expertise: ["Mechanical Systems", "Electrical Engineering", "Civil Engineering", "Robotics & Automation"],
      helpAreas: [
        "Course selection and program planning",
        "Research opportunities and projects",
        "Career paths in engineering fields",
        "Industry partnerships and internships",
        "Laboratory facilities and resources",
      ],
    },
    {
      id: "cs",
      name: "Computer Science",
      gradient: "from-purple-600 to-pink-600",
      accentText: "text-purple-600",
      accentBg: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/10",
      accentBorder: "border-purple-200 dark:border-purple-800",
      professor: {
        name: "Dr. Sara Mohamed",
        image:
          "https://images.unsplash.com/photo-1758685848208-e108b6af94cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzb3IlMjB0ZWFjaGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY1MjE5MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Professor of Computer Science & AI",
      },
      description:
        "Our Computer Science faculty is at the forefront of technology education, offering specialized programs in artificial intelligence, cybersecurity, software engineering, and data science. We prepare students to become innovators in the digital age.",
      expertise: ["Artificial Intelligence", "Software Development", "Cybersecurity", "Data Science"],
      helpAreas: [
        "Programming languages and frameworks",
        "AI and machine learning projects",
        "Software development methodologies",
        "Cybersecurity certifications",
        "Tech industry career guidance",
      ],
    },
    {
      id: "biotech",
      name: "Biotechnology",
      gradient: "from-green-600 to-emerald-600",
      accentText: "text-green-600",
      accentBg: "from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/10",
      accentBorder: "border-green-200 dark:border-green-800",
      professor: {
        name: "Dr. Layla Ibrahim",
        image:
          "https://images.unsplash.com/photo-1580795479025-93d13fd9aa6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW90ZWNobm9sb2d5JTIwc2NpZW50aXN0fGVufDF8fHx8MTc2NTIxOTExNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Professor of Biotechnology & Genetics",
      },
      description:
        "The Biotechnology faculty combines biology with technology to address global challenges in health, agriculture, and environmental sustainability. Our programs emphasize hands-on research and innovation in genetic engineering, pharmaceuticals, and bioinformatics.",
      expertise: ["Genetic Engineering", "Bioinformatics", "Pharmaceutical Sciences", "Environmental Biotech"],
      helpAreas: [
        "Research methodologies in biotechnology",
        "Lab techniques and safety protocols",
        "Bioinformatics tools and applications",
        "Pharmaceutical industry opportunities",
        "Environmental sustainability projects",
      ],
    },
    {
      id: "business",
      name: "Business",
      gradient: "from-orange-600 to-red-600",
      accentText: "text-orange-600",
      accentBg: "from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/10",
      accentBorder: "border-orange-200 dark:border-orange-800",
      professor: {
        name: "Dr. Omar Khalil",
        image:
          "https://images.unsplash.com/photo-1736939561648-bafddedd9f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3NvcnxlbnwxfHx8fDE3NjUxMTEwNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Professor of Business Administration",
      },
      description:
        "The Business faculty offers comprehensive programs in business administration, finance, marketing, and entrepreneurship. We develop future leaders equipped with strategic thinking, analytical skills, and global business perspectives.",
      expertise: ["Business Strategy", "Financial Management", "Marketing & Brand Management", "Entrepreneurship"],
      helpAreas: [
        "Business program specializations",
        "Entrepreneurship and startup guidance",
        "Finance and investment strategies",
        "Marketing and digital business",
        "International business opportunities",
      ],
    },
  ];

  const currentFaculty = faculties.find((f) => f.id === activeFaculty) ?? faculties[0];

  const handleFacultyChange = (newFacultyId: string) => {
    const currentIndex = faculties.findIndex((f) => f.id === activeFaculty);
    const newIndex = faculties.findIndex((f) => f.id === newFacultyId);
    setDirection(newIndex > currentIndex ? "right" : "left");
    setActiveFaculty(newFacultyId);
  };

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    alert(`Question for ${currentFaculty.professor.name}: ${question}`);
    setQuestion("");
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      <div className={`sticky top-0 bg-gradient-to-r ${currentFaculty.gradient} shadow-lg z-10 transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <Home size={24} />
            </button>
            <div>
              <h1 className="text-white">AI Faculty Advisors</h1>
              <p className="text-sm text-white/90">Get personalized guidance from our AI professors</p>
            </div>
          </div>

          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="sticky top-[72px] bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {faculties.map((faculty) => (
              <button
                key={faculty.id}
                onClick={() => handleFacultyChange(faculty.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl transition-all duration-300 transform ${
                  activeFaculty === faculty.id
                    ? `bg-gradient-to-r ${faculty.gradient} text-white shadow-lg scale-105`
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-105"
                }`}
              >
                {faculty.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div key={activeFaculty} className={`grid lg:grid-cols-2 gap-12 items-start animate-slide-${direction}`}>
          <div className="space-y-6">
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${currentFaculty.gradient} rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity`}></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform group-hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentFaculty.gradient} rounded-2xl blur opacity-50`}></div>
                    <ImageWithFallback
                      src={currentFaculty.professor.image}
                      alt={currentFaculty.professor.name}
                      className="relative w-32 h-32 rounded-2xl object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-gray-900 dark:text-white mb-2">{currentFaculty.professor.name}</h2>
                    <p className={`bg-gradient-to-r ${currentFaculty.gradient} bg-clip-text text-transparent mb-4`}>
                      {currentFaculty.professor.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentFaculty.expertise.map((skill, index) => (
                        <span key={index} className={`px-3 py-1 bg-gradient-to-r ${currentFaculty.gradient} text-white text-sm rounded-full`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className={currentFaculty.accentText} size={24} />
                <h3 className="text-gray-900 dark:text-white">Ask a Question</h3>
              </div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask ${currentFaculty.professor.name} anything about ${currentFaculty.name}...`}
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white resize-none"
                rows={4}
              />
              <button
                onClick={handleAskQuestion}
                className={`mt-4 w-full bg-gradient-to-r ${currentFaculty.gradient} text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2`}
              >
                <Send size={20} />
                Send Question
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${currentFaculty.gradient} text-white px-4 py-2 rounded-full mb-6`}>
                <span>Faculty of {currentFaculty.name}</span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">{currentFaculty.description}</p>

              <div className="space-y-4">
                <h4 className="text-gray-900 dark:text-white">How I Can Help You:</h4>
                <ul className="space-y-3">
                  {currentFaculty.helpAreas.map((area, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentFaculty.gradient} mt-2 flex-shrink-0`}></div>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className={`bg-gradient-to-br ${currentFaculty.accentBg} p-6 rounded-2xl border ${currentFaculty.accentBorder}`}
              >
                <h4 className="text-gray-900 dark:text-white mb-2">24/7</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Always Available to Help</p>
              </div>
              <div
                className={`bg-gradient-to-br ${currentFaculty.accentBg} p-6 rounded-2xl border ${currentFaculty.accentBorder}`}
              >
                <h4 className="text-gray-900 dark:text-white mb-2">Instant</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Real-time Responses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

