import { MajorCategory } from './major-fit';
import {
  LucideIcon, 
  Wrench, Dna, Building, Briefcase,
  Cpu, Code, Terminal, Settings, Hammer,
  FlaskConical, Microscope, Thermometer, Compass, Ruler, Pencil,
  TrendingUp, PieChart, Globe,
  Construction, Binary, TestTube,
  DraftingCompass, Home, Calculator, Award, BarChart, Droplets,
  Cog,
  Code2, Database, Shield, Cloud, Braces, Hash, Blocks, Smartphone,
  Zap, Gauge
} from 'lucide-react';

export type ExperimentType = 'SORT' | 'LAB_SELECT' | 'LOGIC' | 'PLACEMENT' | 'BALANCE' | 'CUBE_SORT' | 'FLOWCHART_EVEN_ODD' | 'FLASK_DRAG_DROP' | 'ROOM_DESIGN' | 'TOWER_BUILD' | 'BUSINESS_LAUNCH' | 'CIRCUIT_LAB' | 'CIRCUIT_REPAIR' | 'ROCKET_LAUNCH' | 'STRUCTURAL_INTEGRITY';

export interface ExperimentStep {
  id: string;
  type: ExperimentType;
  question: string;
  options?: string[] | { id: string; label: string; icon: LucideIcon }[];
  correctAnswer?: unknown;
}

export interface SimulationConfig {
  id: MajorCategory;
  slug: string;
  icon: LucideIcon;
  secondaryIcons: LucideIcon[]; // Additional thematic tools for backgrounds
  label: string;
  tagline: string;
  accentColor: string;
  bgFrom: string;
  bgTo: string;
  glowColor: string;
  enjoyedFeedback: string;
  struggledFeedback: string;
  experiments: ExperimentStep[];
}

const UNIFIED_ACCENT = '#b91d2f'; // Nuverse Red
const UNIFIED_GLOW = 'rgba(185, 29, 47, 0.25)';

export const SIMULATION_CONFIGS: Record<MajorCategory, SimulationConfig> = {
  'Computer Science': {
    id: 'Computer Science',
    slug: 'computer-science',
    icon: Code2,
    secondaryIcons: [Cpu, Code, Terminal, Binary, Database, Shield, Cloud, Braces, Hash, Blocks, Smartphone],
    label: 'Computer Science',
    tagline: 'Algorithm & Logic Flow',
    accentColor: UNIFIED_ACCENT,
    bgFrom: '#040910',
    bgTo: '#000408',
    glowColor: UNIFIED_GLOW,
    enjoyedFeedback: 'Systems and logic are your native language!',
    struggledFeedback: 'Even top coders get looped sometimes - keep exploring.',
    experiments: [
      {
        id: 'cs_q1',
        type: 'CUBE_SORT',
        question: 'Sort the cubes in ascending order',
      }
    ]
  },
  'Engineering': {
    id: 'Engineering',
    slug: 'engineering',
    icon: Wrench,
    secondaryIcons: [Settings, Cog, Zap, Gauge, Hammer, Construction],
    label: 'Engineering',
    tagline: 'Circuit Systems Lab',
    accentColor: UNIFIED_ACCENT,
    bgFrom: '#040910',
    bgTo: '#000408',
    glowColor: UNIFIED_GLOW,
    enjoyedFeedback: 'You have a natural spark for electrical systems and structural hardware!',
    struggledFeedback: 'Circuit logic can be complex - a great learning step.',
    experiments: [
      {
        id: 'eng_q1',
        type: 'CIRCUIT_REPAIR',
        question: 'Restore the power flow to the Nile University Core by placing the missing circuit components.',
      }
    ]
  },
  'Biotechnology': {
    id: 'Biotechnology',
    slug: 'biotechnology',
    icon: Dna,
    secondaryIcons: [FlaskConical, Microscope, Thermometer, TestTube, Droplets],
    label: 'Biotechnology',
    tagline: 'Life Science Diagnostic',
    accentColor: UNIFIED_ACCENT,
    bgFrom: '#040910',
    bgTo: '#000408',
    glowColor: UNIFIED_GLOW,
    enjoyedFeedback: 'You have the precise eye of a biotechnologist!',
    struggledFeedback: 'Biological patterns take time to master - you are doing well.',
    experiments: [
      {
        id: 'bio_q1',
        type: 'FLASK_DRAG_DROP',
        question: 'Combine flasks to create a reaction',
      }
    ]
  },
  'Architecture': {
    id: 'Architecture',
    slug: 'architecture',
    icon: Building,
    secondaryIcons: [Compass, Ruler, Pencil, DraftingCompass, Home],
    label: 'Architecture',
    tagline: 'Spatial Design Studio',
    accentColor: UNIFIED_ACCENT,
    bgFrom: '#040910',
    bgTo: '#000408',
    glowColor: UNIFIED_GLOW,
    enjoyedFeedback: 'You think beautifully in spaces and layout flow!',
    struggledFeedback: 'Balancing light and space is an art form you can learn.',
    experiments: [
      {
        id: 'arch_q1',
        type: 'ROOM_DESIGN',
        question: 'Select the foundational elements for this modern interior design.',
      }
    ]
  },
  'Business': {
    id: 'Business',
    slug: 'business',
    icon: Briefcase,
    secondaryIcons: [TrendingUp, PieChart, Globe, Calculator, BarChart, Award],
    label: 'Business',
    tagline: 'Market Strategy Lab',
    accentColor: UNIFIED_ACCENT,
    bgFrom: '#040910',
    bgTo: '#000408',
    glowColor: UNIFIED_GLOW,
    enjoyedFeedback: 'Your strategic thinking is ready for the boardroom!',
    struggledFeedback: 'Market trends are chaotic, but your awareness is growing.',
    experiments: [
      {
        id: 'bus_q1',
        type: 'BUSINESS_LAUNCH',
        question: 'Determine the optimal price point for the new Nuverse Community T-shirt.',
      }
    ]
  },
};

export const SIMULATION_TOTAL_SECONDS = 60;
