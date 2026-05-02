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
  Power,
  Play,
  RotateCcw,
  ArrowRight,
  Flag,
  Square,
  Trash2
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
  const [price, setPrice] = useState(25);
  const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');
  const [feedback, setFeedback] = useState('');

  const productionCost = 12;
  const demand = Math.max(0, 100 - price * 2);
  const profit = (price - productionCost) * demand;

  const isOptimal = price >= 28 && price <= 34;

  const handleLockIn = () => {
    if (profit <= 0) {
      setStatus('failure');
      setFeedback("Net Loss: Your production costs exceed revenue. Business model unsustainable.");
    } else if (!isOptimal) {
      setStatus('failure');
      setFeedback("Sub-optimal Strategy: Adjust the price to find the peak of the profit curve.");
    } else {
      setStatus('success');
      setFeedback("Strategy Validated: Excellent market positioning. You've achieved maximum profitability!");
      setTimeout(() => onComplete(price), 3000);
    }
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-10">
      <div className="text-center space-y-2">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Market Strategy Simulator</div>
        <div className="text-xs font-bold text-slate-400">Optimize price vs. demand to maximize quarterly profits</div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-8 items-center justify-center">
        <div className="relative h-64 w-64 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="relative z-10"
          >
            <Shirt className="h-32 w-32 text-white/90 drop-shadow-2xl" />
          </motion.div>
          <div className="absolute inset-0 opacity-10 grid grid-cols-4 gap-4 p-4">
            {[...Array(16)].map((_, i) => <div key={i} className="h-1 w-1 bg-white rounded-full" />)}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-80 p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Unit Price</span>
              <div className="text-4xl font-black text-white italic tracking-tighter">${price}</div>
              <input
                type="range" min={5} max={50} value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                disabled={status !== 'idle'}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-nu-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[8px] font-black uppercase text-slate-500 mb-1">Demand</div>
                <div className="text-xl font-black text-white">{demand} <span className="text-[10px] text-white/30 tracking-tighter">u</span></div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[8px] font-black uppercase text-slate-500 mb-1">Profit</div>
                <div className={`text-xl font-black ${profit > 0 ? 'text-emerald-400' : 'text-red-400'}`}>${profit}</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleLockIn}
            disabled={status !== 'idle'}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all ${status === 'idle' ? 'bg-white text-black hover:bg-white/90 shadow-xl' : 'bg-white/5 text-white/20'
              }`}
          >
            {status === 'idle' ? 'Lock In Strategy' : 'Strategy Logged'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`text-center max-w-lg p-6 rounded-2xl border backdrop-blur-md ${status === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
          >
            <p className="text-sm font-medium leading-relaxed opacity-90">{feedback}</p>
            {status === 'failure' && (
              <button onClick={() => setStatus('idle')} className="mt-4 text-[10px] font-black uppercase border-b border-white/20 hover:border-white transition-all">Retry Analysis</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FlaskDragDrop({ step, accentColor, onComplete }: ElementProps) {
  const [dropped, setDropped] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'reacting' | 'error' | 'success'>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setDropped([]);
    setStatus('idle');
    setFeedback('');
  }, [step.id]);

  const leftElements = [
    { label: 'H₂', full: 'Hydrogen', color: '#3b82f6' },
    { label: 'N₂', full: 'Nitrogen', color: '#10b981' },
    { label: 'Li', full: 'Lithium', color: '#f59e0b' },
    { label: 'C', full: 'Carbon', color: '#64748b' },
  ];

  const rightElements = [
    { label: 'O₂', full: 'Oxygen', color: '#ef4444' },
    { label: 'Cl₂', full: 'Chlorine', color: '#84cc16' },
    { label: 'Br', full: 'Bromine', color: '#a855f7' },
    { label: 'F', full: 'Fluorine', color: '#ec4899' },
  ];

  const handleDrop = (label: string) => {
    if (status !== 'idle' || dropped.includes(label)) return;
    const newItems = [...dropped, label];
    setDropped(newItems);
    if (newItems.length === 2) {
      if (newItems.includes('H₂') && newItems.includes('O₂')) {
        setStatus('reacting');
        setFeedback('Catalyst active: Synthesis initiated...');
        setTimeout(() => setStatus('success'), 1200);
        setTimeout(() => onComplete({ reaction: 'H2O' }), 3500);
      } else {
        setStatus('error');
        setFeedback('Error: Incompatible atomic structures.');
        setTimeout(() => {
          setDropped([]);
          setStatus('idle');
          setFeedback('');
        }, 2000);
      }
    }
  };

  const Flask = ({ label, full, color, active }: { label: string; full: string; color: string; active: boolean }) => (
    <motion.div
      drag={!active && status === 'idle'}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      onDragEnd={(_, info) => {
        // More lenient drop detection for 8 flasks
        if (Math.abs(info.offset.x) > 40 || Math.abs(info.offset.y) > 40) {
          handleDrop(label);
        }
      }}
      className={`relative flex flex-col items-center gap-1.5 cursor-grab active:cursor-grabbing transition-all duration-500 ${active ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 hover:scale-105'}`}
    >
      <div className="relative h-16 w-12 sm:h-20 sm:w-14">
        <svg viewBox="0 0 64 100" className="h-full w-full drop-shadow-lg">
          <path
            d="M20 10 L44 10 L44 40 L58 85 Q60 92 52 92 L12 92 Q4 92 6 85 L20 40 Z"
            fill="rgba(255,255,255,0.03)"
            stroke="white"
            strokeWidth="2.5"
            strokeOpacity="0.2"
          />
          <motion.path
            initial={{ d: "M20 52 L44 52 L56 86 L8 86 Z" }}
            animate={{
              d: ["M20 54 L44 54 L56 86 L8 86 Z", "M20 52 L44 52 L56 88 L8 88 Z", "M20 54 L44 54 L56 86 L8 86 Z"]
            }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            fill={color}
            fillOpacity="0.5"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pt-6 text-[10px] font-black text-white/90">
          {label}
        </div>
      </div>
      <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter text-center">{full}</span>
    </motion.div>
  );

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-10">
      <div className="text-center space-y-2">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Biotechnology synthesis lab</div>
        <div className={`h-6 text-xs font-bold tracking-tight transition-colors ${status === 'success' ? 'text-emerald-400' :
          status === 'error' ? 'text-red-400' :
            status === 'reacting' ? 'text-blue-400' : 'text-slate-400'
          }`}>
          {feedback || 'Drag elements to the synthesis chamber'}
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-4 px-4">
        {/* Left Elements Grid */}
        <div className="grid grid-cols-2 gap-4 shrink-0">
          {leftElements.map(el => (
            <Flask key={el.label} {...el} active={dropped.includes(el.label)} />
          ))}
        </div>

        {/* Synthesis Chamber */}
        <div className="relative flex h-48 w-48 sm:h-64 sm:w-64 items-center justify-center rounded-full border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-sm">
          {/* Inner Glow */}
          <div className={`absolute inset-4 rounded-full transition-all duration-1000 ${status === 'reacting' ? 'bg-blue-500/10' :
            status === 'success' ? 'bg-emerald-500/10' :
              status === 'error' ? 'bg-red-500/10' : 'bg-transparent'
            }`} />

          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="chamber-idle"
                className="flex flex-col items-center gap-2 text-center"
              >
                <div className="flex gap-2">
                  {dropped.map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-xl"
                    >
                      {d}
                    </motion.div>
                  ))}
                  {dropped.length === 0 && <div className="h-10 w-10 rounded-xl border border-white/5 border-dashed" />}
                  {dropped.length < 2 && dropped.length > 0 && <div className="h-10 w-10 rounded-xl border border-white/5 border-dashed" />}
                </div>
                <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-2">Synthesis Chamber</div>
              </motion.div>
            ) : (
              <motion.div
                key="chamber-success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative h-24 w-24 flex items-center justify-center rounded-3xl bg-blue-500/20 border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                  <Droplets className="h-12 w-12 text-blue-400 animate-pulse" />
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-3xl bg-blue-400/20 blur-xl"
                  />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-white tracking-tighter">2H₂O</div>
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">H₂O Synthesized</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Environmental Glow */}
          {status === 'reacting' && (
            <motion.div
              animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl -z-10"
            />
          )}
          {status === 'error' && (
            <motion.div
              animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl -z-10"
            />
          )}
        </div>

        {/* Right Elements Grid */}
        <div className="grid grid-cols-2 gap-4 shrink-0">
          {rightElements.map(el => (
            <Flask key={el.label} {...el} active={dropped.includes(el.label)} />
          ))}
        </div>
      </div>

      {/* Target Equation Display */}
      <div className="mt-4 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Target Protocol</span>
        <div className="flex items-center gap-4 text-xl font-black text-white/90 italic tracking-tight">
          <span className={dropped.includes('H₂') ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : ''}>2H₂</span>
          <span className="text-white/20">+</span>
          <span className={dropped.includes('O₂') ? 'text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : ''}>O₂</span>
          <ArrowRight className="h-5 w-5 text-white/20" />
          <span className={status === 'success' ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'text-white/40'}>2H₂O</span>
        </div>
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

  const challenges = [
    {
      name: 'Industrial Style',
      description: 'Create a room that feels like a city warehouse. It should look raw, strong, and urban, with a cool "under construction" feel.',
      target: { floor: 'Polished Concrete', wall: 'Exposed Brick', light: 'Warm Spotlight' }
    },
    {
      name: 'Cozy Minimal',
      description: 'Design a room that is super simple and relaxing. It should feel bright, open, and very peaceful, like a quiet morning.',
      target: { floor: 'Smoked Oak', wall: 'Smooth Plaster', light: 'Ambient Cove' }
    },
    {
      name: 'Nature Forest',
      description: 'Bring the feeling of the woods indoors. The space should feel calm, earthy, and connected to nature.',
      target: { floor: 'Herringbone Walnut', wall: 'Sage Green', light: 'Ambient Cove' }
    },
    {
      name: 'Art Gallery',
      description: 'Make a space that looks like a fancy museum. It should feel very clean, elegant, and ready to show off beautiful art.',
      target: { floor: 'Italian Marble', wall: 'Concrete Panel', light: 'Warm Spotlight' }
    }
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
  const [challenge, setChallenge] = useState(challenges[0]);
  const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');

  useEffect(() => {
    const random = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(random);
    setSelections({});
    setStatus('idle');
  }, [step.id]);

  const allDone = Object.keys(selections).length === 3;

  const handleSelect = (categoryId: string, option: string) => {
    if (status === 'success') return;
    setSelections(prev => ({ ...prev, [categoryId]: option }));
    setStatus('idle');
  };

  const validate = () => {
    const isCorrect = 
      selections.floor === challenge.target.floor &&
      selections.wall === challenge.target.wall &&
      selections.light === challenge.target.light;

    if (isCorrect) {
      setStatus('success');
      setTimeout(() => onComplete(selections), 2500);
    } else {
      setStatus('failure');
    }
  };

  const currentFloor = floorColors[selections['floor']] || '#1a1a2e';
  const currentWall = wallColors[selections['wall']] || '#1a1a2e';
  const currentLight = lightColors[selections['light']] || 'transparent';

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-10">
      {/* Goal Card */}
      <div className="w-full max-w-2xl p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center gap-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Building className="w-16 h-16" />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left relative z-10">
          <div className="text-[10px] font-black tracking-[0.2em] text-slate-500">Active Challenge</div>
          <h4 className="text-2xl font-bold text-white leading-tight">{challenge.name}</h4>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">{challenge.description}</p>
        </div>
        <div className="flex flex-col items-center gap-2 shrink-0 relative z-10 md:border-l md:border-white/10 md:pl-6">
          <span className="text-[8px] font-black text-slate-500 tracking-widest">Goal Requirements</span>
          <div className="flex gap-2">
            {Object.entries(challenge.target).map(([key, val]) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${selections[key] === val ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-white/20'}`}>
                  {catIcons[key]}
                </div>
                <span className="text-[8px] font-black text-slate-600">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row w-full gap-8 items-stretch">
        {/* Selection Panel */}
        <div className="flex flex-col gap-4 md:w-[340px] shrink-0">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                {catIcons[cat.id]}
                <span className="text-[10px] font-black tracking-widest text-slate-500">{cat.label}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cat.options.map(opt => {
                  const isActive = selections[cat.id] === opt;
                  const isCorrect = selections[cat.id] === opt && opt === challenge.target[cat.id as keyof typeof challenge.target];
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
            className="relative w-full max-w-md h-80 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
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

            {/* Room label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 bg-black/70 backdrop-blur-md rounded-full border border-white/10 shadow-xl">
              <span className={`text-[9px] font-black tracking-widest ${status === 'success' ? 'text-emerald-400' : 'text-white/60'}`}>
                {status === 'success' ? '✓ Goal Reached' : allDone ? 'Ready for Review' : 'Live Preview'}
              </span>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[2px] flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-white font-black italic tracking-tighter text-xl">Perfect Design!</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Failure Overlay */}
            <AnimatePresence>
              {status === 'failure' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-red-500/10 backdrop-blur-[2px] flex items-center justify-center z-50"
                >
                  <div className="text-center p-6">
                    <span className="text-red-400 font-black text-sm tracking-widest block mb-2">Almost there!</span>
                    <p className="text-[10px] text-white/60 font-medium leading-relaxed">Check your floor, wall, or lighting choices. <br />They need to match the style above.</p>
                    <button onClick={() => setStatus('idle')} className="mt-4 text-[9px] font-black uppercase border-b border-white/20 hover:border-white transition-all text-white/40 hover:text-white">Adjust Elements</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <button
        onClick={validate}
        disabled={!allDone || status === 'success'}
        className={`rounded-full px-12 py-4 font-bold text-white transition-all ${allDone && status !== 'success'
          ? 'hover:-translate-y-0.5 active:scale-95'
          : 'opacity-20 grayscale pointer-events-none'
          }`}
        style={{
          background: 'var(--nu-gradient-signature)',
          boxShadow: allDone && status !== 'success' ? '0 0 30px rgba(185, 29, 47, 0.4)' : 'none',
        }}
      >
        {status === 'success' ? '✓ Design Finalized' : 'Verify Design Match'}
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
  const [placed, setPlaced] = useState<Record<number, { label: string; value: number; color: string; icon: any } | null>>({ 0: null, 1: null, 2: null });
  const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');

  const targetVoltage = 24;
  const currentVoltage = Object.values(placed).reduce((sum, item) => sum + (item?.value || 0), 0);

  const components = [
    { label: 'Battery A', value: 12, color: '#3b82f6', icon: Zap },
    { label: 'Battery B', value: 14, color: '#60a5fa', icon: Zap },
    { label: 'Resistor', value: -2, color: '#ef4444', icon: Gauge },
    { label: 'Capacitor', value: 4, color: '#10b981', icon: Activity },
  ];

  const handlePlace = (slotId: number, component: typeof components[0]) => {
    if (status !== 'idle') return;
    setPlaced(prev => ({ ...prev, [slotId]: component }));
  };

  const handleInitiate = () => {
    if (currentVoltage === targetVoltage) {
      setStatus('success');
      setTimeout(() => onComplete(placed), 3000);
    } else {
      setStatus('failure');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-12">
      <div className="text-center space-y-2">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Electrical Engineering Lab</div>
        <div className="text-xs font-bold text-slate-400">Match the target voltage output to stabilize the core</div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-12 items-start justify-center">
        {/* Toolbox */}
        <div className="w-full lg:w-64 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Components</h4>
          <div className="grid grid-cols-1 gap-3">
            {components.map((comp) => {
              const Icon = comp.icon;
              return (
                <button
                  key={comp.label}
                  onClick={() => {
                    const emptySlot = [0, 1, 2].find(id => !placed[id]);
                    if (emptySlot !== undefined) handlePlace(emptySlot, comp);
                  }}
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-black/40" style={{ color: comp.color }}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-white/90">{comp.label}</span>
                      <span className="text-[9px] font-black opacity-40">{comp.value > 0 ? `+${comp.value}V` : `${comp.value}V`}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <button onClick={() => setPlaced({ 0: null, 1: null, 2: null })} className="w-full mt-6 py-2 text-[9px] font-black uppercase text-white/30 hover:text-white/60 transition-all tracking-widest">Clear All</button>
        </div>

        {/* Main Interface */}
        <div className="flex-1 flex flex-col items-center gap-10 pt-4">
          <div className="flex items-center justify-center gap-8 w-full">
            {[0, 1, 2].map((slotId) => (
              <div key={slotId} className="relative group">
                <div
                  onClick={() => setPlaced(prev => ({ ...prev, [slotId]: null }))}
                  className={`h-24 w-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${placed[slotId] ? 'border-solid border-white/40 bg-white/5' : 'border-white/10 hover:border-white/20'
                    }`}
                >
                  {placed[slotId] ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-lg bg-black/40" style={{ color: placed[slotId]?.color }}>
                        {(() => {
                           const Icon = placed[slotId]?.icon || Zap;
                           return <Icon className="w-6 h-6" />;
                        })()}
                      </div>
                      <span className="text-[8px] font-black uppercase text-white/40">{placed[slotId]?.value}V</span>
                    </motion.div>
                  ) : (
                    <span className="text-[8px] font-black uppercase text-slate-700 tracking-tighter">Slot {slotId + 1}</span>
                  )}
                </div>
                {/* Connection wires */}
                {slotId < 2 && <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-white/5 -translate-y-1/2" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 w-full max-w-sm">
            <div className="w-full h-1 bg-white/5 rounded-full relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                animate={{ width: `${Math.min(100, (currentVoltage / targetVoltage) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between w-full px-2">
              <div className="flex flex-col items-start">
                <span className="text-[8px] font-black uppercase text-slate-600">Current Load</span>
                <span className={`text-2xl font-black italic tracking-tighter ${currentVoltage > targetVoltage ? 'text-red-400' : 'text-white'}`}>{currentVoltage}V</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black uppercase text-slate-600">Target</span>
                <span className="text-2xl font-black italic tracking-tighter text-emerald-400">{targetVoltage}V</span>
              </div>
            </div>

            <button
              onClick={handleInitiate}
              disabled={status !== 'idle' || currentVoltage === 0}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all ${status === 'success' ? 'bg-emerald-500 text-white shadow-emerald-500/20' :
                status === 'failure' ? 'bg-red-500 text-white shadow-red-500/20' :
                  'bg-white text-black hover:bg-white/90 shadow-xl'
                }`}
            >
              {status === 'success' ? 'Core Stabilized' : status === 'failure' ? 'System Overload' : 'Initiate Power Flow'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlockCoding({ step, accentColor, onComplete }: ElementProps) {
  const [array, setArray] = useState<number[]>([]);
  const [blocks, setBlocks] = useState<{ id: string; type: 'loop' | 'scan' | 'if' | 'swap' }[]>([]);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failure'>('idle');
  const [feedback, setFeedback] = useState('');
  const [activeIndices, setActiveIndices] = useState<{ i: number; j: number } | null>(null);

  useEffect(() => {
    const initial = [65, 30, 85, 45, 15]; // Unsorted array
    setArray(initial);
    setBlocks([]);
    setStatus('idle');
    setFeedback('');
    setActiveIndices(null);
  }, [step.id]);

  const addBlock = (type: 'loop' | 'scan' | 'if' | 'swap') => {
    if (status !== 'idle') return;
    setBlocks(prev => [...prev, { id: Math.random().toString(36).substring(2, 9), type }]);
  };

  const removeBlock = (id: string) => {
    if (status !== 'idle') return;
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const runCode = async () => {
    if (blocks.length === 0 || status !== 'idle') return;

    // Check for correct Bubble Sort sequence
    const order = blocks.map(b => b.type).join('->');
    const correctOrder = 'loop->scan->if->swap';

    setStatus('running');
    setFeedback('Compiling algorithm...');
    await new Promise(r => setTimeout(r, 1000));

    if (order !== correctOrder) {
      setStatus('failure');
      setFeedback('Logic Error: Algorithm architecture invalid. Standard sorting requires nested iterations.');
      return;
    }

    setFeedback('Executing Bubble Sort...');
    let currentArray = [...array];
    const n = currentArray.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices({ i: j, j: j + 1 });
        await new Promise(r => setTimeout(r, 600));

        if (currentArray[j] > currentArray[j + 1]) {
          const temp = currentArray[j];
          currentArray[j] = currentArray[j + 1];
          currentArray[j + 1] = temp;
          setArray([...currentArray]);
          await new Promise(r => setTimeout(r, 400));
        }
      }
    }

    setActiveIndices(null);
    const sorted = [...currentArray].sort((a, b) => a - b);
    if (JSON.stringify(currentArray) === JSON.stringify(sorted)) {
      setStatus('success');
      setFeedback('Algorithm Validated: Dataset sorted.');
      setTimeout(() => onComplete(currentArray), 2000);
    } else {
      setStatus('failure');
      setFeedback('Logical Fallacy: Target state not reached.');
    }
  };

  const reset = () => {
    setArray([65, 30, 85, 45, 15]);
    setBlocks([]);
    setStatus('idle');
    setFeedback('');
    setActiveIndices(null);
  };

  return (
    <div className="flex w-full max-w-6xl flex-col lg:flex-row gap-8 items-start justify-center">
      {/* Sidebar: Toolbox & Stack */}
      <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Logic Units</h4>
          <div className="grid grid-cols-1 gap-2">
            {[
              { type: 'loop', label: 'FOR each pass', color: '#a855f7' },
              { type: 'scan', label: '  FOR each element', color: '#3b82f6' },
              { type: 'if', label: '    IF current > next', color: '#f59e0b' },
              { type: 'swap', label: '      SWAP elements', color: '#ef4444' },
            ].map((btn) => (
              <button
                key={btn.type}
                onClick={() => addBlock(btn.type as any)}
                disabled={status !== 'idle'}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-bold text-white/80 group disabled:opacity-50"
              >
                <div className="p-1.5 rounded-md bg-black/40" style={{ color: btn.color }}>
                  <Cpu className="h-3.5 w-3.5" />
                </div>
                <span className="whitespace-pre">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-[300px] p-5 rounded-3xl bg-black/40 border border-white/10 flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Algorithm Stack</h4>
            <span className="text-[10px] font-bold text-white/30">{blocks.length}/4 units</span>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="space-y-2">
              <AnimatePresence initial={false}>
                {blocks.map((block) => (
                  <Reorder.Item
                    key={block.id}
                    value={block}
                    className="group relative flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-grab active:cursor-grabbing hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="text-[11px] font-bold text-white/90">
                        {block.type === 'loop' && 'Repeat (Outer)'}
                        {block.type === 'scan' && 'Scan List (Inner)'}
                        {block.type === 'if' && 'Comparison Logic'}
                        {block.type === 'swap' && 'Swap Elements'}
                      </span>
                    </div>
                    <button onClick={() => removeBlock(block.id)} className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-red-400 transition-all">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
            {blocks.length === 0 && (
              <div className="h-48 flex flex-col items-center justify-center opacity-20 text-center">
                <Layers className="h-8 w-8 mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest leading-loose">
                  Assemble logic units<br />in sequence
                </p>
              </div>
            )}
          </div>
          <div className="mt-6 flex gap-2">
            <button onClick={runCode} disabled={blocks.length < 4 || status !== 'idle'} className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${blocks.length >= 4 && status === 'idle' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white/5 text-white/20 border border-white/5'}`}>Run Algorithm</button>
            <button onClick={reset} className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"><RotateCcw className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 w-full flex flex-col gap-8 items-center pt-8">
        <div className="text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Memory Stack Visualization</div>
          <div className={`h-6 text-xs font-bold tracking-tight transition-colors ${status === 'success' ? 'text-emerald-400' : status === 'failure' ? 'text-red-400' : status === 'running' ? 'text-blue-400' : 'text-slate-400'}`}>{feedback || 'Initialize algorithm units...'}</div>
        </div>
        <div className="relative h-64 w-full flex items-end justify-center gap-4 px-8">
          {array.map((val, idx) => {
            const isActive = activeIndices && (activeIndices.i === idx || activeIndices.j === idx);
            return (
              <motion.div key={idx} layout transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative flex flex-col items-center flex-1 max-w-[60px]">
                <motion.div className="w-full rounded-t-xl" style={{ height: `${val * 2}px`, background: isActive ? 'linear-gradient(to top, #3b82f6, #06b6d4)' : 'rgba(255,255,255,0.05)', border: isActive ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.05)', boxShadow: isActive ? '0 0 30px rgba(59, 130, 246, 0.3)' : 'none' }}>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/40">{val}</div>
                </motion.div>
                <div className="mt-4 text-[10px] font-bold text-slate-600">idx[{idx}]</div>
              </motion.div>
            );
          })}
        </div>
        <div className="max-w-md text-center px-4">
          <p className="text-[10px] font-medium text-slate-500 leading-relaxed uppercase tracking-tighter">
            <span className="text-white/40">Instructions:</span> Data must be processed in nested iterative units. Reorder the stack to follow standard Bubble Sort protocol: Loop pass → List scan → Comparison logic → Memory swap.
          </p>
        </div>
      </div>
    </div>
  );
}
