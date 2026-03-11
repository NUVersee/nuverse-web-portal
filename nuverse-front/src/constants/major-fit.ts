import { Monitor, Wrench, Dna, Building, Briefcase, LucideIcon } from 'lucide-react';

export type MajorCategory = 'Computer Science' | 'Engineering' | 'Biotechnology' | 'Architecture' | 'Business';

export interface Question {
  id: string;
  text: string;
  category: MajorCategory;
}

export interface MajorResult {
  category: MajorCategory;
  title: string;
  icon: LucideIcon;
  quote: string;
  description: string;
  color: string;
  bgGradient: string;
}

export const QUESTIONS: Question[] = [
  // Computer Science
  { id: 'cs_1', text: 'I enjoy solving logical or algorithmic problems.', category: 'Computer Science' },
  { id: 'cs_2', text: 'I am interested in programming or building software applications.', category: 'Computer Science' },
  { id: 'cs_3', text: 'I like working with computers for extended periods.', category: 'Computer Science' },
  { id: 'cs_4', text: 'I enjoy debugging and fixing technical issues.', category: 'Computer Science' },
  { id: 'cs_5', text: 'I am curious about artificial intelligence or cybersecurity.', category: 'Computer Science' },
  { id: 'cs_6', text: 'I prefer structured, rule-based problem solving.', category: 'Computer Science' },
  
  // Engineering
  { id: 'eng_1', text: 'I enjoy understanding how machines and systems work.', category: 'Engineering' },
  { id: 'eng_2', text: 'I prefer hands-on technical tasks over purely theoretical discussions.', category: 'Engineering' },
  { id: 'eng_3', text: 'I like applying math and physics to real-world problems.', category: 'Engineering' },
  { id: 'eng_4', text: 'I enjoy building or assembling technical projects.', category: 'Engineering' },
  { id: 'eng_5', text: 'I am comfortable working with technical tools or equipment.', category: 'Engineering' },
  { id: 'eng_6', text: 'I prefer solving practical engineering challenges.', category: 'Engineering' },
  
  // Biotechnology
  { id: 'bio_1', text: 'I am curious about biological systems and genetics.', category: 'Biotechnology' },
  { id: 'bio_2', text: 'I enjoy conducting scientific experiments.', category: 'Biotechnology' },
  { id: 'bio_3', text: 'I like analyzing scientific data and drawing conclusions.', category: 'Biotechnology' },
  { id: 'bio_4', text: 'I am interested in medical or environmental innovations.', category: 'Biotechnology' },
  { id: 'bio_5', text: 'I feel comfortable working in laboratory environments.', category: 'Biotechnology' },
  { id: 'bio_6', text: 'I enjoy research-based academic work.', category: 'Biotechnology' },
  
  // Architecture
  { id: 'arch_1', text: 'I enjoy designing or sketching ideas visually.', category: 'Architecture' },
  { id: 'arch_2', text: 'I am interested in buildings, structures, and urban spaces.', category: 'Architecture' },
  { id: 'arch_3', text: 'I like combining creativity with technical knowledge.', category: 'Architecture' },
  { id: 'arch_4', text: 'I think about how spaces affect people’s experiences.', category: 'Architecture' },
  { id: 'arch_5', text: 'I prefer open-ended creative projects over fixed instructions.', category: 'Architecture' },
  { id: 'arch_6', text: 'I enjoy visualizing 3D concepts in my mind.', category: 'Architecture' },

  // Business
  { id: 'bus_1', text: 'I enjoy leading teams and organizing group projects.', category: 'Business' },
  { id: 'bus_2', text: 'I am interested in starting or managing a business.', category: 'Business' },
  { id: 'bus_3', text: 'I like analyzing markets, trends, and business opportunities.', category: 'Business' },
  { id: 'bus_4', text: 'I enjoy solving problems related to management or strategy.', category: 'Business' },
  { id: 'bus_5', text: 'I feel comfortable communicating ideas and negotiating with others.', category: 'Business' },
  { id: 'bus_6', text: 'I am interested in understanding how companies grow and succeed.', category: 'Business' },
];

export const MAJOR_RESULTS: Record<MajorCategory, MajorResult> = {
  'Computer Science': {
    category: 'Computer Science',
    title: 'Computer Science',
    icon: Monitor,
    quote: '"You don\'t just think inside the box — you code the box."',
    description: "You're the kind of person who sees a problem and immediately wonders how to automate it. In university, you'll learn to build the software, apps, and AI systems that power the modern world — from mobile apps to cybersecurity to machine learning. If logic puzzles excite you and you love the satisfaction of making something work, CS is where your mind belongs.",
    color: 'text-nu-blue-500',
    bgGradient: 'from-nu-blue-500/20 to-nu-blue-600/20',
  },
  'Engineering': {
    category: 'Engineering',
    title: 'Engineering',
    icon: Wrench,
    quote: '"You see a broken world and your hands itch to fix it."',
    description: "You've always wanted to know how things work — and more importantly, how to make them work better. Engineering at university takes your love for math, physics, and real-world challenges and turns it into bridges, machines, circuits, and systems that people actually use. You're not just studying theory — you're building the future, one solution at a time.",
    color: 'text-nu-peach-500',
    bgGradient: 'from-nu-peach-500/20 to-nu-peach-600/20',
  },
  'Biotechnology': {
    category: 'Biotechnology',
    title: 'Biotechnology',
    icon: Dna,
    quote: '"Life is your laboratory, and curiosity is your method."',
    description: "You're fascinated by the invisible world — genes, cells, diseases, and breakthroughs. In university, Biotechnology puts you at the crossroads of science and innovation, where you'll work on real research that could one day fight cancer, feed the planet, or redefine medicine. If you love asking why and aren't afraid of a lab coat, this is your calling.",
    color: 'text-nu-red-500',
    bgGradient: 'from-nu-red-500/20 to-nu-red-600/20',
  },
  'Architecture': {
    category: 'Architecture',
    title: 'Architecture',
    icon: Building,
    quote: '"You dream in blueprints and think in skylines."',
    description: "You don't just see buildings — you see stories, experiences, and purpose built into every wall and window. Architecture at university blends your creative vision with technical skill, challenging you to design spaces that are beautiful, functional, and human. If you've ever sketched a room just for fun or reimagined your city's layout in your head, you were already thinking like an architect.",
    color: 'text-nu-red-400',
    bgGradient: 'from-nu-red-400/20 to-nu-red-500/20',
  },
  'Business': {
    category: 'Business',
    title: 'Business',
    icon: Briefcase,
    quote: '"You spot opportunities, rally people, and turn ideas into momentum."',
    description: "You are energized by leadership, strategy, and the challenge of building something that grows. Business at university sharpens the way you analyze markets, manage teams, communicate clearly, and make decisions under pressure. If you enjoy entrepreneurship, planning, and understanding why some companies thrive while others stall, Business gives you the tools to lead with purpose.",
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-400/20 to-green-500/20',
  }
};
