import { QuizContainer } from '@/components/major-fit/QuizContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Major Fit Quiz | Find Your Path',
  description: 'Take our 30-question assessment to uncover whether Computer Science, Engineering, Biotechnology, Architecture, or Business is the best fit for your unique interests.',
};

export default function MajorFitPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-nu-deep pt-32 pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-20 h-96 w-96 rounded-full bg-nu-blue-500/15 blur-3xl" />
        <div className="absolute top-1/3 -right-28 h-[28rem] w-[28rem] rounded-full bg-nu-red-500/15 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-nu-peach-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <QuizContainer />
      </div>
    </main>
  );
}
