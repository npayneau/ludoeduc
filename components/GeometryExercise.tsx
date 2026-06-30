import React, { useState, useEffect } from 'react';
import { ShapeIdTask, PerimeterTask, ParallelTask } from '../types';

const SHAPE_PATHS: Record<string, React.FC<{ size?: number; color?: string; strokeColor?: string }>> = {
  square: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="10" y="10" width="80" height="80" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  rectangle: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="5" y="25" width="90" height="50" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  triangle: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="50,8 95,92 5,92" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  circle: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="50" r="42" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  rhombus: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="50,8 92,50 50,92 8,50" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  trapezoid: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="20,80 80,80 65,20 35,20" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  parallelogram: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="25,80 90,80 75,20 10,20" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  pentagon: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="50,8 95,38 78,88 22,88 5,38" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  hexagon: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="50,5 93,27 93,73 50,95 7,73 7,27" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
  octagon: ({ size = 100, color = '#e0e7ff', strokeColor = '#6366f1' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <polygon points="35,5 65,5 95,35 95,65 65,95 35,95 5,65 5,35" fill={color} stroke={strokeColor} strokeWidth="4" />
    </svg>
  ),
};

type SideAnnotation = { x: number; y: number; anchor: 'start' | 'middle' | 'end' };

function getPerimeterShapeData(shapeKey: string, sides: number[], unit: string): {
  points: string;
  isCircle: boolean;
  sideAnnotations: Array<{ label: string; pos: SideAnnotation }>;
} {
  const fmt = (n: number) => Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.', ',');
  const label = (i: number) => `${fmt(sides[i])} ${unit}`;

  if (shapeKey === 'square') {
    // forme centrée dans viewBox 280x260, marges suffisantes pour les labels
    return { points: '50,40 220,40 220,210 50,210', isCircle: false, sideAnnotations: [
      { label: label(0), pos: { x: 135, y: 28,  anchor: 'middle' } },
      { label: label(1), pos: { x: 235, y: 130, anchor: 'start'  } },
      { label: label(2), pos: { x: 135, y: 228, anchor: 'middle' } },
      { label: label(3), pos: { x: 35,  y: 130, anchor: 'end'    } },
    ]};
  }
  if (shapeKey === 'rectangle') {
    return { points: '30,75 250,75 250,185 30,185', isCircle: false, sideAnnotations: [
      { label: label(0), pos: { x: 140, y: 62,  anchor: 'middle' } },
      { label: label(1), pos: { x: 262, y: 135, anchor: 'start'  } },
      { label: label(2), pos: { x: 140, y: 205, anchor: 'middle' } },
      { label: label(3), pos: { x: 18,  y: 135, anchor: 'end'    } },
    ]};
  }
  if (shapeKey === 'triangle') {
    return { points: '135,30 240,210 30,210', isCircle: false, sideAnnotations: [
      { label: label(0), pos: { x: 200, y: 110, anchor: 'start'  } },
      { label: label(1), pos: { x: 135, y: 232, anchor: 'middle' } },
      { label: label(2), pos: { x: 68,  y: 110, anchor: 'end'    } },
    ]};
  }
  if (shapeKey === 'pentagon') {
    return { points: '135,25 230,90 200,210 70,210 40,90', isCircle: false, sideAnnotations: [
      { label: label(0), pos: { x: 195, y: 50,  anchor: 'start'  } },
      { label: label(1), pos: { x: 238, y: 158, anchor: 'start'  } },
      { label: label(2), pos: { x: 135, y: 232, anchor: 'middle' } },
      { label: label(3), pos: { x: 28,  y: 158, anchor: 'end'    } },
      { label: label(4), pos: { x: 72,  y: 50,  anchor: 'end'    } },
    ]};
  }
  return { points: '50,40 220,40 220,210 50,210', isCircle: false, sideAnnotations: [] };
}

export const ShapeIdExercise: React.FC<{
  task: ShapeIdTask;
  onValidate: (c: boolean, v?: string) => void;
}> = ({ task, onValidate }) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { setSelected(null); }, [task]);

  const handleClick = (choice: { shapeKey: string; label: string; isCorrect: boolean }) => {
    if (selected !== null) return;
    setSelected(choice.shapeKey);
    onValidate(choice.isCorrect, choice.label);
    if (!choice.isCorrect) {
      setTimeout(() => setSelected(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-10 w-full">
      <h3 className="text-lg sm:text-2xl font-bold text-indigo-400 uppercase tracking-widest">
        Qui est-ce ? 🔷
      </h3>
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-2 font-medium">Clique sur la bonne forme :</p>
        <div className="text-4xl sm:text-6xl font-title text-indigo-900 bg-amber-50 px-8 py-4 rounded-2xl border-4 border-dashed border-amber-200 inline-block">
          {task.targetShape}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md">
        {task.choices.map(choice => {
          const ShapeComponent = SHAPE_PATHS[choice.shapeKey];
          const isSelected = selected === choice.shapeKey;
          return (
            <button
              key={choice.shapeKey}
              onClick={() => handleClick(choice)}
              disabled={selected !== null}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-4 transition-all shadow-md
                ${selected === null ? 'hover:border-amber-400 hover:bg-amber-50 border-indigo-100 bg-white cursor-pointer' : ''}
                ${isSelected && choice.isCorrect ? 'border-green-400 bg-green-50' : ''}
                ${isSelected && !choice.isCorrect ? 'border-red-400 bg-red-50' : ''}
                ${!isSelected && selected !== null ? 'border-indigo-100 bg-white opacity-60' : ''}
              `}
            >
              {ShapeComponent ? <ShapeComponent size={80} /> : <div className="w-20 h-20 bg-indigo-100 rounded" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const PerimeterExercise: React.FC<{
  task: PerimeterTask;
  onValidate: (c: boolean, v?: string) => void;
}> = ({ task, onValidate }) => {
  const [value, setValue] = useState('');

  useEffect(() => { setValue(''); }, [task]);

  const check = () => {
    const normalized = value.trim().replace(',', '.');
    const num = parseFloat(normalized);
    if (isNaN(num)) return;
    onValidate(Math.abs(num - task.answer) < 0.01, value.trim());
  };

  const { points, isCircle, sideAnnotations } = getPerimeterShapeData(task.shapeKey, task.sides, task.unit);

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
      <h3 className="text-lg sm:text-2xl font-bold text-indigo-400 uppercase tracking-widest">
        Calcule le périmètre 📐
      </h3>
      <div className="bg-white rounded-2xl border-2 border-indigo-100 p-4 shadow-md">
        <svg viewBox="0 0 280 250" width="280" height="250">
          {!isCircle && (
            <polygon points={points} fill="#e0e7ff" stroke="#6366f1" strokeWidth="3" />
          )}
          {sideAnnotations.map((ann, i) => (
            <text
              key={i}
              x={ann.pos.x}
              y={ann.pos.y}
              textAnchor={ann.pos.anchor}
              fontSize="13"
              fontWeight="bold"
              fill="#4338ca"
            >
              {ann.label}
            </text>
          ))}
        </svg>
      </div>
      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        <p className="text-gray-500 text-sm">Périmètre = ?</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && check()}
            placeholder="?"
            className="text-3xl sm:text-4xl p-4 border-4 rounded-2xl w-36 text-center font-title border-indigo-100 focus:border-indigo-400 outline-none"
          />
          <span className="text-xl font-bold text-indigo-700">{task.unit}</span>
        </div>
        <button
          onClick={check}
          disabled={!value.trim()}
          className={`w-full px-10 py-4 rounded-2xl text-xl font-bold shadow-xl transition-all ${
            value.trim()
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Valider 🎯
        </button>
      </div>
    </div>
  );
};

const PARALLEL_LABELS: Record<'parallel' | 'perpendicular' | 'neither', string> = {
  parallel: 'Parallèles',
  perpendicular: 'Perpendiculaires',
  neither: "Ni l'un ni l'autre",
};

export const ParallelExercise: React.FC<{
  task: ParallelTask;
  onValidate: (c: boolean, v?: string) => void;
}> = ({ task, onValidate }) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { setSelected(null); }, [task]);

  const options: Array<'parallel' | 'perpendicular' | 'neither'> =
    task.level === 'CE1'
      ? ['parallel', 'perpendicular']
      : ['parallel', 'perpendicular', 'neither'];

  const handleChoice = (choice: 'parallel' | 'perpendicular' | 'neither') => {
    if (selected !== null) return;
    setSelected(choice);
    onValidate(choice === task.answer, PARALLEL_LABELS[choice]);
    if (choice !== task.answer) {
      setTimeout(() => setSelected(null), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
      <h3 className="text-lg sm:text-2xl font-bold text-indigo-400 uppercase tracking-widest">
        Parallèle ou perpendiculaire ? 📏
      </h3>
      <p className="text-gray-400 text-sm">Ces deux droites sont…</p>
      <div className="bg-white rounded-2xl border-2 border-indigo-100 p-4 shadow-md">
        <svg viewBox="0 0 300 200" width="300" height="200">
          <line x1={task.lineA.x1} y1={task.lineA.y1} x2={task.lineA.x2} y2={task.lineA.y2}
            stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
          <line x1={task.lineB.x1} y1={task.lineB.y1} x2={task.lineB.x2} y2={task.lineB.y2}
            stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 w-full max-w-sm">
        {options.map(opt => {
          const isSelected = selected === opt;
          const isCorrect = opt === task.answer;
          return (
            <button
              key={opt}
              onClick={() => handleChoice(opt)}
              disabled={selected !== null}
              className={`py-3 px-3 rounded-2xl font-bold text-sm border-4 transition-all shadow text-center break-words
                ${selected === null ? 'border-indigo-100 bg-white hover:border-amber-400 hover:bg-amber-50 cursor-pointer' : ''}
                ${isSelected && isCorrect  ? 'border-green-400 bg-green-50 text-green-700' : ''}
                ${isSelected && !isCorrect ? 'border-red-400 bg-red-50 text-red-700' : ''}
                ${!isSelected && selected !== null ? 'border-indigo-100 bg-white opacity-60' : 'text-indigo-700'}
              `}
            >
              {PARALLEL_LABELS[opt]}
            </button>
          );
        })}
      </div>
    </div>
  );
};
