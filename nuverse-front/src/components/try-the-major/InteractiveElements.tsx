'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import {
  Beaker,
  Briefcase,
  Check,
  Droplets,
  Layout,
  Move,
  Shirt,
  Sprout,
  Sun,
  X,
  Zap,
  Monitor,
  Wrench,
  Dna,
  Building,
  Lamp,
  SquareStack,
  Layers,
  Box,
  Landmark,
  ShieldCheck,
  Gem,
  Triangle,
  Rocket,
  Gauge,
  Wind,
  Activity,
  Cpu,
  Power
} from 'lucide-react';
import { ExperimentStep } from '@/constants/try-the-major';

interface ElementProps {
  step: ExperimentStep;
  accentColor: string;
  onComplete: (answer: unknown) => void;
}

export function DragDropSorter({ step, accentColor, onComplete }: ElementProps) {
  const options = (step.options as string[] | undefined) ?? ['Plan', 'Build', 'Test'];
  const answer = (step.correctAnswer as string[] | undefined) ?? options;
  const [items, setItems] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'bad'>('idle');

  useEffect(() => {
    setItems([...options].sort(() => Math.random() - 0.5));
    setStatus('idle');
  }, [step.id]);

  const validate = () => {
    const ok = JSON.stringify(items) === JSON.stringify(answer);
    if (ok) {
      onComplete(items);
      return;
    }
    setStatus('bad');
  };

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6">
      <Reorder.Group axis="y" values={items} onReorder={setItems} className="flex w-full flex-col gap-3">
        {items.map((item) => (
          <Reorder.Item key={item} value={item}>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white">{item}</div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <button
        onClick={validate}
        className="rounded-full px-10 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5"
        style={{
          background: 'var(--nu-gradient-signature)',
          boxShadow: '0 0 20px rgba(185, 29, 47, 0.3)'
        }}
      >
        Validate Order
      </button>
      {status === 'bad' && <p className="text-sm text-slate-400 font-medium">Wrong sequence. Reorder and try again.</p>}
    </div>
  );
}

export function LabPlacer({ step, accentColor, onComplete }: ElementProps) {
  const items = (step.options as { id: string; label: string }[] | undefined) ?? [
    { id: 'a', label: 'Sensor' },
    { id: 'b', label: 'Controller' },
    { id: 'c', label: 'Power Unit' },
  ];
  const [placed, setPlaced] = useState<string[]>([]);

  useEffect(() => setPlaced([]), [step.id]);

  const toggle = (id: string) => {
    setPlaced((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6">
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        {items.map((item) => {
          const active = placed.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`rounded-2xl border p-5 text-white ${active ? 'border-white bg-white/15' : 'border-white/10 bg-white/5'}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => placed.length === items.length && onComplete(placed)}
        className="rounded-full px-10 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5"
        style={{
          background: 'var(--nu-gradient-signature)',
          boxShadow: '0 0 20px rgba(185, 29, 47, 0.3)'
        }}
      >
        Place Components
      </button>
    </div>
  );
}

export function ResourceBalancer({ step, accentColor, onComplete }: ElementProps) {
  const options = (step.options as string[] | undefined) ?? ['Research', 'Marketing', 'Operations'];
  const [values, setValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const initial: Record<string, number> = {};
    options.forEach((option) => {
      initial[option] = 33;
    });
    setValues(initial);
  }, [step.id]);

  const total = Object.values(values).reduce((sum, value) => sum + value, 0);

  return (
    <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="space-y-5">
        {options.map((option) => (
          <div key={option}>
            <div className="mb-2 flex justify-between text-sm text-white/80">
              <span>{option}</span>
              <span>{values[option] ?? 0}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={values[option] ?? 0}
              onChange={(event) => setValues((prev) => ({ ...prev, [option]: Number(event.target.value) }))}
              className="w-full"
              style={{ accentColor }}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-white/70">Total: {total}%</span>
        <button
          onClick={() => Math.abs(total - 100) <= 5 && onComplete(values)}
          className="rounded-full px-7 py-2.5 font-bold text-white transition-all hover:-translate-y-0.5"
          style={{
            background: 'var(--nu-gradient-signature)',
            boxShadow: '0 0 15px rgba(185, 29, 47, 0.2)'
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export function LogicBuilder({ step, accentColor, onComplete }: ElementProps) {
  const options = (step.options as string[] | undefined) ?? ['True', 'False'];
  const correct = (step.correctAnswer as string | undefined) ?? options[0];
  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setSelected(null);
    setWrong(false);
  }, [step.id]);

  const submit = () => {
    if (!selected) return;
    if (selected === correct) {
      onComplete(selected);
      return;
    }
    setWrong(true);
  };

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-black/60 p-5 font-mono text-sm text-slate-300">
        if (input % 2 === 0) {'{'} return ... {'}'}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`rounded-xl border px-5 py-3 ${selected === option ? 'border-white bg-white text-black' : 'border-white/15 bg-white/5 text-white'}`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={submit}
        className="rounded-full px-10 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5"
        style={{
          background: 'var(--nu-gradient-signature)',
          boxShadow: '0 0 20px rgba(185, 29, 47, 0.3)'
        }}
      >
        Run Snippet
      </button>
      {wrong && <p className="text-sm text-slate-400 font-medium">Logic output is incorrect.</p>}
    </div>
  );
}

export function LabSelector({ step, accentColor, onComplete }: ElementProps) {
  const options = (step.options as string[] | undefined) ?? ['Water', 'Light', 'Soil'];
  const correct = (step.correctAnswer as string | undefined) ?? options[0];
  const [selected, setSelected] = useState<string | null>(null);

  const iconFor = (label: string) => {
    if (label.toLowerCase().includes('water')) return Droplets;
    if (label.toLowerCase().includes('light')) return Sun;
    if (label.toLowerCase().includes('soil')) return Sprout;
    return Beaker;
  };

  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
      {options.map((option) => {
        const Icon = iconFor(option);
        const active = selected === option;
        return (
          <button
            key={option}
            onClick={() => {
              setSelected(option);
              if (option === correct) onComplete(option);
            }}
            className={`rounded-2xl border p-6 text-white ${active ? 'border-white bg-white/15' : 'border-white/10 bg-white/5'}`}
          >
            <Icon className="mx-auto mb-2 h-8 w-8" />
            <div className="font-bold border-b border-transparent group-hover:border-white/20 transition-all inline-block">{option}</div>
          </button>
        );
      })}
    </div>
  );
}

export function CubeSorter({ step, accentColor, onComplete }: ElementProps) {
  const [cubes, setCubes] = useState<number[]>([]);
  const [status, setStatus] = useState<'idle' | 'bad'>('idle');

  useEffect(() => {
    const shuffled = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
    setCubes(shuffled);
    setStatus('idle');
  }, [step.id]);

  const validate = () => {
    const ok = JSON.stringify(cubes) === JSON.stringify([1, 2, 3, 4, 5, 6]);
    if (ok) {
      onComplete(cubes);
    } else {
      setStatus('bad');
      setTimeout(() => setStatus('idle'), 1800);
    }
  };

  const isSorted = JSON.stringify(cubes) === JSON.stringify([1, 2, 3, 4, 5, 6]);

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-8">
      {/* Instruction badge */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Drag and drop cubes to sort them ascending
        </div>
        <div className="h-1 w-12 rounded-full bg-white/10" />
      </div>

      {/* Horizontal cube row with Reorder */}
      <Reorder.Group
        axis="x"
        values={cubes}
        onReorder={setCubes}
        className="flex items-end gap-3 sm:gap-4 overflow-x-auto pb-6 w-full justify-center px-4"
      >
        {cubes.map((cube, idx) => {
          const heightMap = [40, 52, 64, 76, 88, 100];
          const heightPx = heightMap[cube - 1] ?? 64;
          const isInPlace = cube === cubes.indexOf(cube) + 1; // logical position in current array

          return (
            <Reorder.Item
              key={cube}
              value={cube}
              className="relative flex flex-col items-center gap-3 cursor-grab active:cursor-grabbing"
            >
              {/* The cube block */}
              <motion.div
                layout
                className="relative flex items-center justify-center rounded-xl border text-white font-black text-xl transition-shadow duration-300"
                style={{
                  width: '4rem',
                  height: `${heightPx}px`,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                  borderColor: 'rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(255,255,255,0.3)',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))'
                }}
                whileTap={{ scale: 0.95, rotate: -2 }}
              >
                {/* 3D-ish highlight */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl" />

                {cube}

                {/* Visual feedback if correct in result list order (computed on the fly) */}
                {cube === cubes.indexOf(cube) + 1 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-[8px] backdrop-blur-sm shadow-sm"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>

              {/* Slot Indicator */}
              <div className="w-8 h-1 rounded-full bg-white/5" />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      {/* Validate */}
      <button
        onClick={validate}
        className="rounded-full px-12 py-4 font-bold text-white transition-all hover:-translate-y-0.5"
        style={{
          background: 'var(--nu-gradient-signature)',
          boxShadow: '0 0 24px rgba(185, 29, 47, 0.35)',
        }}
      >
        {isSorted ? '✓ Submit Sorted Order' : 'Check Sort'}
      </button>

      {status === 'bad' && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-slate-400 font-medium"
        >
          Not quite — drag them to be in order from 1 to 6.
        </motion.p>
      )}
    </div>
  );
}

export function FlowchartEvenOdd({ step, accentColor, onComplete }: ElementProps) {
  const [value, setValue] = useState<number>(0);
  const [tests, setTests] = useState(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const v = Math.floor(Math.random() * 20) + 1;
    setValue(v);
    setTests(0);
    setMessage('');
  }, [step.id]);

  const answer = (kind: 'even' | 'odd') => {
    const ok = (value % 2 === 0 && kind === 'even') || (value % 2 !== 0 && kind === 'odd');
    if (!ok) {
      setMessage('Wrong branch.');
      return;
    }
    const next = tests + 1;
    setTests(next);
    setMessage('Correct.');
    if (next >= 3) {
      onComplete({ tests: next });
      return;
    }
    setValue(Math.floor(Math.random() * 20) + 1);
  };

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="text-lg">Classify this number: <span className="font-black">{value}</span></div>
      <div className="flex gap-4">
        <button onClick={() => answer('even')} className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all px-8 py-3 font-semibold">Even</button>
        <button onClick={() => answer('odd')} className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all px-8 py-3 font-semibold">Odd</button>
      </div>
      <div className="text-sm text-white/50">Completed tests: {tests}/3</div>
      {message && <div className="text-sm text-slate-400 font-medium">{message}</div>}
    </div>
  );
}

export function TowerBuilder({ step, accentColor, onComplete }: ElementProps) {
  const blocks = ['heavy', 'beam', 'light'];
  const [stack, setStack] = useState<string[]>([]);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setStack([]);
    setWrong(false);
  }, [step.id]);

  const add = (item: string) => {
    setStack((prev) => (prev.includes(item) ? prev : [...prev, item]));
  };

  const test = () => {
    const ok = JSON.stringify(stack) === JSON.stringify(blocks);
    if (ok) {
      onComplete(stack);
      return;
    }
    setWrong(true);
  };

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6">
      <div className="flex flex-wrap gap-3">
        {blocks.map((item) => (
          <button key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white" onClick={() => add(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="min-w-72 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white">Tower: {stack.join(' → ') || 'Empty'}</div>
      <button
        onClick={test}
        className="rounded-full px-10 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5"
        style={{
          background: 'var(--nu-gradient-signature)',
          boxShadow: '0 0 20px rgba(185, 29, 47, 0.3)'
        }}
      >
        Test Stability
      </button>
      {wrong && <div className="text-red-100">Use heavy → beam → light.</div>}
    </div>
  );
}

export function StructuralIntegrity({ step, accentColor, onComplete }: ElementProps) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => setSelected(null), [step.id]);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (id === 'arch' || id === 'truss') {
      setTimeout(() => onComplete(id), 2200);
    }
  };

  const designs = [
    { id: 'beam', label: 'Simple Beam', efficiency: 'Low', feedback: 'Tension and compression are concentrated in the center. Risk of snapping under heavy load.' },
    { id: 'truss', label: 'Warren Truss', efficiency: 'High', feedback: 'Triangulation distributes forces effectively across the structure. Very efficient.' },
    { id: 'arch', label: 'Masonry Arch', efficiency: 'Maximum', feedback: 'Transfers all tension into compression against the abutments. Incredible durability.' },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    beam: <Layers className="h-6 w-6 text-white" />,
    truss: <Gem className="h-6 w-6 text-white" />,
    arch: <Landmark className="h-6 w-6 text-white" />,
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-10">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] text-center">
        Analyze structural efficiency and select the strongest design
      </div>

      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6">
        {designs.map((design) => {
          const isActive = selected === design.id;
          const isSuccess = design.id === 'arch' || design.id === 'truss';

          return (
            <button
              key={design.id}
              onClick={() => handleSelect(design.id)}
              className={`group flex flex-col p-6 rounded-2xl border transition-all text-left ${isActive
                  ? (isSuccess ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-red-500/50 bg-red-500/10')
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                  {iconMap[design.id]}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  {design.efficiency}
                </div>
              </div>

              <h4 className="text-lg font-bold text-white mb-2">{design.label}</h4>

              <div className="h-20">
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs leading-relaxed text-slate-400 font-medium"
                  >
                    {design.feedback}
                  </motion.p>
                )}
              </div>

              {isActive && isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400 tracking-widest"
                >
                  <ShieldCheck className="h-3 w-3" />
                  <span>Structural Success</span>
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      <div className="h-1 invisible">Launch Bridge</div>
    </div>
  );
}

export function BusinessLaunch({ step, accentColor, onComplete }: ElementProps) {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPrice(null);
    setFeedback(null);
  }, [step.id]);

  const handlePriceSelect = (price: number) => {
    setSelectedPrice(price);
    if (price === 5) {
      setFeedback("Price too low! Production costs are $6 — you'll lose money on every sale.");
    } else if (price === 20) {
      setFeedback("Price too high! Market research shows customers won't pay more than $15 for a basic tee.");
    } else {
      setFeedback("Optimal price! You've balanced high demand with a healthy profit margin.");
      setTimeout(() => onComplete(price), 2000);
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-10">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] text-center">
        Analyze the market and set the optimal product price
      </div>

      <div className="relative group">
        {/* T-Shirt Visual */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative h-48 w-48 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-nu-red-500/10 to-transparent opacity-50 rounded-3xl" />
          <Shirt className="h-28 w-28 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 rounded-full border border-white/20">
            <span className="text-[10px] font-black tracking-tighter text-white uppercase italic">Nuverse</span>
          </div>
        </motion.div>
      </div>

      {/* Price Options */}
      <div className="flex gap-4 w-full justify-center">
        {[5, 10, 20].map((price) => (
          <button
            key={price}
            onClick={() => handlePriceSelect(price)}
            className={`flex flex-col items-center gap-2 group transition-all ${selectedPrice === price ? 'scale-105' : 'hover:scale-102 opacity-80 hover:opacity-100'}`}
          >
            <div
              className={`h-20 w-20 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all ${selectedPrice === price
                  ? (price === 10 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-red-500/50 bg-red-500/10 text-red-400')
                  : 'border-white/10 bg-white/5 text-white'
                }`}
            >
              ${price}
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{price === 10 ? 'Market Choice' : 'Proposed'}</span>
          </button>
        ))}
      </div>

      {/* Feedback Area */}
      <div className="h-12 text-center max-w-sm">
        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs font-medium leading-relaxed ${selectedPrice === 10 ? 'text-emerald-400' : 'text-slate-400'}`}
          >
            {feedback}
          </motion.p>
        )}
      </div>

      <div className="h-1 invisible">Launch Strategy</div>
    </div>
  );
}

export function FlaskDragDrop({ step, accentColor, onComplete }: ElementProps) {
  const [h2In, setH2In] = useState(false);
  const [o2In, setO2In] = useState(false);
  const [reactionComplete, setReactionComplete] = useState(false);

  useEffect(() => {
    setH2In(false);
    setO2In(false);
    setReactionComplete(false);
  }, [step.id]);

  useEffect(() => {
    if (h2In && o2In && !reactionComplete) {
      setTimeout(() => setReactionComplete(true), 600);
      setTimeout(() => onComplete({ reaction: 'H2O' }), 2500);
    }
  }, [h2In, o2In, reactionComplete, onComplete]);

  const Flask = ({ label, color, onDrop, active }: { label: string; color: string; onDrop: () => void; active: boolean }) => (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      onDragEnd={(_, info) => {
        // Simple check if dragged near center (0,0 is start, so we check total offset)
        if (Math.abs(info.offset.x) > 60 || Math.abs(info.offset.y) > 60) {
          onDrop();
        }
      }}
      className={`relative flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing transition-opacity duration-500 ${active ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="relative h-24 w-16">
        {/* Flask SVG */}
        <svg viewBox="0 0 64 100" className="h-full w-full drop-shadow-xl">
          <path
            d="M20 10 L44 10 L44 40 L58 85 Q60 92 52 92 L12 92 Q4 92 6 85 L20 40 Z"
            fill="rgba(255,255,255,0.05)"
            stroke="white"
            strokeWidth="2"
          />
          <motion.path
            initial={{ d: "M20 50 L44 50 L56 86 L8 86 Z" }}
            animate={{
              d: [
                "M20 52 L44 52 L56 86 L8 86 Z",
                "M20 50 L44 50 L56 88 L8 88 Z",
                "M20 52 L44 52 L56 86 L8 86 Z"
              ]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            fill={color}
            opacity="0.6"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pt-8 text-xs font-black text-white">
          {label}
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label === 'H₂' ? 'Hydrogen' : 'Oxygen'}</span>
    </motion.div>
  );

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-12">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">
        Drag both flasks to the synthesis chamber
      </div>

      <div className="relative flex w-full items-center justify-around h-64">
        <Flask label="H₂" color="#4f46e5" active={h2In} onDrop={() => setH2In(true)} />

        {/* Reaction Zone */}
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-dashed border-white/10 bg-white/5">
          <AnimatePresence>
            {!reactionComplete ? (
              <motion.div className="flex flex-col items-center gap-1 text-[10px] font-black text-white/20 uppercase tracking-tighter">
                <div className="text-2xl opacity-20 transition-all">
                  {h2In || o2In ? '⚡' : '○'}
                </div>
                <span>Synthesis Zone</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative h-20 w-20 flex items-center justify-center rounded-2xl bg-nu-blue-500/10 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <Droplets className="h-10 w-10 text-blue-400 animate-pulse" />
                </div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-xl font-black text-white whitespace-nowrap">2H₂ + O₂ → 2H₂O</div>
                  <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1">Water Synthesized</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reaction glow */}
          {(h2In || o2In) && !reactionComplete && (
            <motion.div
              animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 rounded-full bg-white/10 blur-xl"
            />
          )}
        </div>

        <Flask label="O₂" color="#b91d2f" active={o2In} onDrop={() => setO2In(true)} />
      </div>

      <div className="opacity-0 h-4 invisible">
        {/* Helper to keep layout stable */}
        Mix Flasks
      </div>
    </div>
  );
}

export function RoomDesigner({ step, accentColor, onComplete }: ElementProps) {
  const floorColors: Record<string, string> = {
    'Italian Marble': '#d4cfc4',
    'Smoked Oak': '#8b6f47',
    'Polished Concrete': '#7a7d80',
    'Herringbone Walnut': '#5c3d2e',
  };
  const wallColors: Record<string, string> = {
    'Exposed Brick': '#a0522d',
    'Smooth Plaster': '#e8e0d4',
    'Concrete Panel': '#6b6e70',
    'Sage Green': '#8ba888',
  };
  const lightColors: Record<string, string> = {
    'Ambient Cove': '#fdf4dc',
    'Warm Spotlight': '#ffe08a',
  };

  const categories = [
    { id: 'floor', label: 'Floor', options: ['Italian Marble', 'Smoked Oak', 'Polished Concrete', 'Herringbone Walnut'] },
    { id: 'wall', label: 'Wall', options: ['Exposed Brick', 'Smooth Plaster', 'Concrete Panel', 'Sage Green'] },
    { id: 'light', label: 'Light', options: ['Ambient Cove', 'Warm Spotlight'] },
  ];

  const colorLookup: Record<string, Record<string, string>> = {
    floor: floorColors,
    wall: wallColors,
    light: lightColors,
  };

  const catIcons: Record<string, React.ReactNode> = {
    floor: <SquareStack className="h-3.5 w-3.5 text-white/40" />,
    wall: <Box className="h-3.5 w-3.5 text-white/40" />,
    light: <Sun className="h-3.5 w-3.5 text-white/40" />,
  };

  const [selections, setSelections] = useState<Record<string, string>>({});

  useEffect(() => setSelections({}), [step.id]);

  const allDone = Object.keys(selections).length === 3;

  const handleSelect = (categoryId: string, option: string) => {
    setSelections(prev => ({ ...prev, [categoryId]: option }));
  };

  const currentFloor = floorColors[selections['floor']] || '#1a1a2e';
  const currentWall = wallColors[selections['wall']] || '#1a1a2e';
  const currentLight = lightColors[selections['light']] || 'transparent';

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-8">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] text-center">
        Design your dream interior space
      </div>

      <div className="flex flex-col-reverse md:flex-row w-full gap-8 items-stretch">
        {/* Selection Panel */}
        <div className="flex flex-col gap-4 md:w-[340px] shrink-0">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                {catIcons[cat.id]}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{cat.label}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cat.options.map(opt => {
                  const isActive = selections[cat.id] === opt;
                  const swatchColor = colorLookup[cat.id]?.[opt] || '#fff';
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(cat.id, opt)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-[11px] font-medium ${isActive
                          ? 'bg-white/15 border-white text-white'
                          : 'border-white/5 text-white/50 hover:bg-white/10'
                        }`}
                    >
                      <span
                        className="w-4 h-4 rounded-md shrink-0 border border-white/20"
                        style={{ backgroundColor: swatchColor }}
                      />
                      <span className="truncate">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Visual Room Preview — Large */}
        <div className="flex-1 flex items-center justify-center min-h-[320px]">
          <div
            className="relative w-full max-w-md h-80 rounded-3xl overflow-hidden border border-white/10"
            style={{ backgroundColor: '#0a0a1a' }}
          >
            {/* Light glow from ceiling */}
            {selections['light'] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[60px]"
                style={{ backgroundColor: currentLight }}
              />
            )}

            {/* Back wall */}
            <div
              className="absolute top-0 left-0 right-0 h-[62%] transition-colors duration-700"
              style={{ backgroundColor: currentWall, opacity: selections['wall'] ? 0.65 : 0.08 }}
            />

            {/* Floor with perspective */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[38%] transition-colors duration-700"
              style={{
                backgroundColor: currentFloor,
                opacity: selections['floor'] ? 0.75 : 0.08,
                borderTop: '1px solid rgba(255,255,255,0.15)',
              }}
            />

            {/* Window on wall */}
            {selections['wall'] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-[12%] right-[15%] w-16 h-20 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm"
              >
                <div className="absolute inset-1 rounded bg-gradient-to-b from-sky-400/20 to-sky-600/10" />
              </motion.div>
            )}

            {/* Room label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/70 rounded-full border border-white/10">
              <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">
                {allDone ? '✓ Design Complete' : 'Live Preview'}
              </span>
            </div>

            {/* Light fixture indicator */}
            {selections['light'] && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentLight, boxShadow: `0 0 30px ${currentLight}` }}
              >
                <Sun className="h-4 w-4 text-black/60" />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => allDone && onComplete(selections)}
        disabled={!allDone}
        className={`rounded-full px-12 py-4 font-bold text-white transition-all ${allDone
            ? 'hover:-translate-y-0.5'
            : 'opacity-20 grayscale pointer-events-none'
          }`}
        style={{
          background: 'var(--nu-gradient-signature)',
          boxShadow: allDone ? '0 0 24px rgba(185, 29, 47, 0.35)' : 'none',
        }}
      >
        {allDone ? '✓ Finalize Design' : 'Complete Selection'}
      </button>
    </div>
  );
}
export function RocketLaunch({ step, accentColor, onComplete }: ElementProps) {
  const [thrust, setThrust] = useState(50);
  const [weight, setWeight] = useState(50);
  const [status, setStatus] = useState<'idle' | 'launching' | 'success' | 'fail'>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setStatus('idle');
    setFeedback('');
  }, [step.id]);

  const handleLaunch = () => {
    setStatus('launching');
    setFeedback('');

    setTimeout(() => {
      // Logic: Thrust must be higher than weight but not excessively so (stability)
      // Ideal Thrust: Weight + 20 to Weight + 40
      const ratio = thrust - weight;

      if (ratio < 10) {
        setStatus('fail');
        setFeedback("Insufficient thrust. The rocket couldn't clear the launch pad.");
      } else if (ratio > 50) {
        setStatus('fail');
        setFeedback("Excessive thrust! Aerodynamic stress caused structural failure during ascent.");
      } else {
        setStatus('success');
        setFeedback("Perfect trajectory! Nile University-1 has successfully reached orbit.");
        setTimeout(() => onComplete({ thrust, weight }), 3000);
      }
    }, 2500);
  };

  const stars = useMemo(() => {
    return [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `-${Math.random() * 20}%`,
      duration: 1 + Math.random(),
      delay: Math.random()
    }));
  }, []);

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-10">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] text-center">
        Calibrate propulsion systems for vertical ascent
      </div>

      <div className="flex flex-col md:flex-row w-full gap-12 items-center justify-center">
        {/* Visual Rocket Area */}
        <div className="relative h-96 w-64 rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

          {/* Stars Background during flight */}
          {status === 'success' && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="absolute inset-0 bg-[#000408]"
             >
                {stars.map((star, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, 400], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: star.duration, delay: star.delay }}
                    className="absolute w-0.5 h-0.5 bg-white rounded-full"
                    style={{ left: star.left, top: star.top }}
                  />
                ))}
             </motion.div>
          )}

          <motion.div
            animate={
              status === 'launching'
                ? { y: [0, -2, 2, -2, 0], x: [0, 1, -1, 1, 0] }
                : status === 'success'
                  ? { y: -500, scale: 0.5, opacity: 0 }
                  : status === 'fail'
                    ? { y: [0, -10, 0], rotate: [0, 5, -5, 0], opacity: [1, 1, 0] }
                    : {}
            }
            transition={
              status === 'launching'
                ? { repeat: Infinity, duration: 0.1 }
                : { duration: 2.5, ease: "easeInOut" }
            }
            className="relative z-10"
          >
            <Rocket className={`h-32 w-32 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] ${status === 'fail' ? 'text-red-500' : ''}`} />

            {(status === 'launching' || status === 'success') && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2"
              >
                <div className="h-20 w-8 bg-gradient-to-b from-orange-500 via-red-500 to-transparent blur-md rounded-full" />
                <Zap className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-8 text-yellow-300 animate-pulse" />
              </motion.div>
            )}
          </motion.div>

          {/* Launch Pad */}
          <div className="absolute bottom-0 w-full h-8 bg-white/10 border-t border-white/20" />
        </div>

        {/* Controls Panel */}
        <div className="flex flex-col gap-8 w-full md:w-80 p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-2 italic">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  Thrust Power
                </div>
                <span className="text-white font-black">{thrust}kN</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={thrust}
                onChange={(e) => setThrust(Number(e.target.value))}
                disabled={status !== 'idle'}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-nu-red-500"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-2 italic">
                  <Wind className="w-3 h-3 text-blue-400" />
                  Rocket Weight
                </div>
                <span className="text-white font-black">{weight}kg</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                disabled={status !== 'idle'}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-nu-red-500"
              />
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-600">Ratio</span>
                <span className={`text-lg font-black ${Math.abs(thrust - weight - 30) < 15 ? 'text-emerald-400' : 'text-white'}`}>
                  {(thrust / weight).toFixed(2)}
                </span>
              </div>
              <Gauge className={`w-8 h-8 ${status === 'launching' ? 'animate-pulse text-nu-red-500' : 'text-white/20'}`} />
            </div>

            <button
              onClick={handleLaunch}
              disabled={status !== 'idle'}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all ${status === 'idle'
                  ? 'bg-white text-black hover:bg-white/90 hover:-translate-y-1 shadow-lg'
                  : 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'
                }`}
            >
              {status === 'idle' ? 'Initiate Launch' : 'Launching...'}
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center max-w-md p-6 rounded-2xl border ${status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
          >
            <p className="font-bold mb-2">{status === 'success' ? 'Mission Success' : 'Mission Failure'}</p>
            <p className="text-sm font-medium leading-relaxed opacity-80">{feedback}</p>

            {status === 'fail' && (
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-[10px] font-black uppercase border-b border-white/20 hover:border-white transition-all text-white/60 hover:text-white"
              >
                Reset Systems
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CircuitRepair({ step, accentColor, onComplete }: ElementProps) {
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [complete, setComplete] = useState(false);

  const targets = [
    { id: 0, label: 'Resistor', color: '#f59e0b' },
    { id: 1, label: 'Capacitor', color: '#10b981' },
    { id: 2, label: 'Battery', color: '#3b82f6' },
  ];

  const handlePlace = (id: number, type: string) => {
    if (complete) return;
    const newPlaced = { ...placed, [id]: type };
    setPlaced(newPlaced);

    if (Object.keys(newPlaced).length === 3) {
      setComplete(true);
      setTimeout(() => onComplete(newPlaced), 3000);
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-12">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] text-center">
        Bridge the gap to the Nile University Core
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between w-full h-[350px] md:h-[400px] px-4 md:px-12 gap-8">
        {/* Source */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-2xl bg-nu-red-500/10 border border-nu-red-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(185,29,47,0.1)]">
            <Power className="h-10 w-10 text-nu-red-400" />
          </div>
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Power Source</span>
        </div>

        {/* The Grid / Path */}
        <div className="flex-1 relative h-full flex items-center justify-center min-w-[300px]">
          {/* Horizontal Wire Path */}
          <div className="absolute left-0 right-0 h-1 bg-white/5 top-1/2 -translate-y-1/2" />

          {/* Neon Pulse when complete */}
          {complete && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-0 h-1 bg-gradient-to-r from-nu-red-500 via-emerald-400 to-blue-500 shadow-[0_0_20px_rgba(52,211,153,0.5)] top-1/2 -translate-y-1/2 z-0"
            />
          )}

          <div className="flex items-center justify-around w-full relative z-10">
            {targets.map((target) => {
              const item = placed[target.id];
              return (
                <div key={target.id} className="flex flex-col items-center gap-6">
                  <motion.div
                    onClick={() => !item && handlePlace(target.id, target.label)}
                    className={`h-24 w-20 rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer ${item
                        ? 'border-solid border-white/40 bg-white/5'
                        : 'border-white/10 hover:border-white/20 bg-black/20'
                      }`}
                    whileHover={!item ? { scale: 1.05 } : {}}
                    whileTap={!item ? { scale: 0.95 } : {}}
                  >
                    {!item ? (
                      <span className="text-[9px] font-black uppercase text-slate-600 tracking-tighter text-center px-1">Place {target.label}</span>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex flex-col items-center gap-1"
                      >
                        <Cpu className="h-8 w-8 text-white" style={{ color: target.color }} />
                        <span className="text-[8px] font-black uppercase text-white/50">{target.label}</span>
                        {complete && (
                          <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="absolute inset-0 rounded-xl bg-white/10 blur-xl"
                            style={{ backgroundColor: target.color }}
                          />
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Target: The Core */}
        <div className="flex flex-col items-center gap-4">
          <div className={`h-24 w-24 rounded-3xl border-2 flex items-center justify-center transition-all duration-1000 ${complete
              ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.3)]'
              : 'border-white/10 bg-white/5'
            }`}>
            <Activity className={`h-12 w-12 ${complete ? 'text-emerald-400 animate-pulse' : 'text-white/20'}`} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${complete ? 'text-emerald-400' : 'text-slate-500'}`}>
            Nile University Core
          </span>
        </div>
      </div>

      {complete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-xl font-black text-white italic tracking-tight uppercase">Power Restored</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">Systems initializing...</div>
        </motion.div>
      )}
    </div>
  );
}
