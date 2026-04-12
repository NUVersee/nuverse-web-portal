import { UnifiedExperiment } from '@/components/try-the-major/UnifiedExperiment';
import { SIMULATION_CONFIGS } from '@/constants/try-the-major';
import { MajorCategory } from '@/constants/major-fit';

interface TryTheMajorPageProps {
  searchParams?: Promise<{
    major?: string;
  }>;
}

function resolveMajor(input?: string): MajorCategory {
  if (!input) return 'Computer Science';

  const normalized = decodeURIComponent(input).trim().toLowerCase();
  const match = (Object.keys(SIMULATION_CONFIGS) as MajorCategory[]).find(
    (major) => major.toLowerCase() === normalized || SIMULATION_CONFIGS[major].slug === normalized,
  );

  return match ?? 'Computer Science';
}

export default async function TryTheMajorPage({ searchParams }: TryTheMajorPageProps) {
  const params = await searchParams;
  const major = resolveMajor(params?.major);
  // Pass only the string key — the client component resolves the full config
  // so we never serialize React components (LucideIcon functions) across the server→client boundary
  return <UnifiedExperiment majorKey={major} />;
}
