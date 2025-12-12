// eslint-disable-next-line @typescript-eslint/no-unused-expressions
`use client`;

import { Brain, FlaskConical } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

type ServicesProps = {
  onOpenLabs?: () => void;
  onOpenAIProfessor?: () => void;
};

export function Services({ onOpenLabs, onOpenAIProfessor }: ServicesProps) {
  const services = [
    {
      icon: FlaskConical,
      title: "Lab Experiments",
      description:
        "Explore our state-of-the-art virtual laboratories including circuits and chemistry labs. Conduct experiments safely, learn with interactive equipment, and master laboratory techniques in an immersive VR environment.",
      image:
        "https://images.unsplash.com/photo-1631106321638-d94d9a8f3e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2NTIwODgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Circuits Lab", "Chemistry Lab", "Interactive Simulations", "Safe Virtual Environment"],
      onClick: onOpenLabs,
    },
    {
      icon: Brain,
      title: "AI Professor",
      description:
        "Meet our AI-powered virtual professors across different faculties. Get personalized guidance, ask questions in real-time, and receive expert advice tailored to your academic journey and learning style.",
      image:
        "https://images.unsplash.com/photo-1625314887424-9f190599bd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3R8ZW58MXx8fHwxNzY1MTY4MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["4 Faculty Experts", "Personalized Learning", "24/7 Availability", "Interactive Q&A"],
      onClick: onOpenAIProfessor,
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 dark:text-white mb-4">Our VR Services</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover how our virtual reality platform brings Nile University closer to you with immersive, interactive experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

