import React, { useState, useEffect, useRef } from 'react';
import { Level, GrammarSentence, ConjugationTask, MathTask, DictationTask, TimeTask } from '../types';
import { getGrammarQuestions, getConjugationQuestions, getMathQuestions, getDictationQuestions, getTimeQuestions } from '../data';
import { CATEGORY_COLORS, CATEGORY_LABELS, TIMINGS } from '../constants';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  level: Level;
  subject: 'français' | 'maths' | 'autre';
  type: string;
  timerDuration?: number;
  selectedTables?: number[];
  additionMax?: number;
  totalQuestions?: number;
  onFinish: (score: number) => void;
}

const ENCOURAGEMENTS = [
  "Bravo ! 🎉",
  "Génial ! 🌟",
  "Tu es un incroyable ! 🏆",
  "Magnifique ! ✨",
  "Super travail ! 👍",
  "Impressionnant ! 🚀",
  "Quelle intelligence ! 🧠",
  "Continue comme ça ! 💪",
  "C'est parfait ! ✅",
  "Toppisime ! 🌈"
];

const ExerciseRunner: React.FC<Props> = ({ level, subject, type, timerDuration = 4, selectedTables, additionMax, totalQuestions = 5, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | 'retry' | null>(null);
  const [currentEncouragement, setCurrentEncouragement] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [wrongValue, setWrongValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    let q: any[] = [];
    if (subject === 'français') {
      if (type === 'grammaire') q = getGrammarQuestions(level, totalQuestions);
      else if (type === 'conjugaison') q = getConjugationQuestions(level, totalQuestions);
      else if (type === 'dictée') q = getDictationQuestions(level, totalQuestions);
    } else if (subject === 'autre') {
      if (type === 'time') q = getTimeQuestions(level, totalQuestions);
    } else {
      q = getMathQuestions(level, type, selectedTables, additionMax, totalQuestions);
    }
    setQuestions(q);
    setCurrentIdx(0);
    setScore(0);
    setWrongAttempts(0);
    setWrongValue(undefined);
  }, [level, subject, type, selectedTables, additionMax, totalQuestions]);

  const handleValidation = (isCorrect: boolean, value?: string) => {
    if (isCorrect) {
      setScore(s => s + 1);
      setCurrentEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
      setShowFeedback('correct');

      setTimeout(() => {
        setShowFeedback(null);
        setWrongAttempts(0);
        if (currentIdx < questions.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          onFinish(score + 1);
        }
      }, TIMINGS.FEEDBACK_CORRECT);
    } else {
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);
      setWrongValue(value);

      if (newAttempts < 3) {
        setShowFeedback('retry');
        setTimeout(() => {
          setShowFeedback(null);
        }, TIMINGS.FEEDBACK_RETRY);
      } else {
        setShowFeedback('wrong');
        setTimeout(() => {
          setShowFeedback(null);
          setWrongAttempts(0);
          if (currentIdx < questions.length - 1) {
            setCurrentIdx(i => i + 1);
          } else {
            onFinish(score);
          }
        }, subject === 'français' ? TIMINGS.FEEDBACK_WRONG_FRENCH : TIMINGS.FEEDBACK_WRONG_MATH);
      }
    }
  };

  if (questions.length === 0) return (
    <div className="text-center p-10 sm:p-20 bg-white rounded-3xl shadow-xl">
      <div className="animate-spin text-4xl sm:text-5xl mb-4">🌀</div>
      <p className="text-lg sm:text-xl font-bold text-gray-400">Préparation...</p>
    </div>
  );

  const current = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-10 bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-hidden border-b-[8px] sm:border-b-[10px] border-indigo-200">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] sm:text-sm">Q. {currentIdx + 1} / {questions.length}</span>
        <div className="w-32 sm:w-48 bg-gray-100 h-2 sm:h-3 rounded-full overflow-hidden border border-gray-200">
          <div
            className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-full transition-all duration-700"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {showFeedback === 'retry' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-orange-500/95 text-white p-4">
          <div className="text-center animate-pulse">
            <span className="text-7xl sm:text-9xl">🤔</span>
            <h2 className="text-3xl sm:text-5xl font-title mt-6">
              {wrongValue ? <>{wrongValue} est incorrect,<br />essaie encore !</> : "C'est incorrect, essaie encore !"}
            </h2>
          </div>
        </div>
      )}

      {showFeedback === 'correct' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-green-500/95 text-white p-4">
          <div className="text-center animate-bounce">
            <span className="text-7xl sm:text-9xl">🌟</span>
            <h2 className="text-3xl sm:text-5xl font-title mt-6">{currentEncouragement}</h2>
          </div>
        </div>
      )}

      {showFeedback === 'wrong' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-red-500/95 text-white p-4">
          <div className="text-center px-4 max-h-full overflow-y-auto py-8">
            <span className="text-7xl sm:text-9xl">💡</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-6">Oups !</h2>
            <p className="mt-4 text-xl sm:text-2xl opacity-90">La réponse était :</p>
            <div className="bg-white/20 p-4 sm:p-6 rounded-2xl mt-4 text-xl sm:text-2xl font-bold border-2 border-white/30 leading-relaxed break-words">
              {type === 'grammaire' ? (
                <div className="flex flex-wrap justify-center gap-2">
                  {(current as GrammarSentence).parts.map((p, i) => (
                    <span key={i} className={`px-2 py-1 rounded-lg border-2 ${CATEGORY_COLORS[p.category]}`}>
                      {p.text}
                    </span>
                  ))}
                </div>
              ) : type === 'decomposition'
                ? (
                  <div className="flex flex-col gap-2">
                    <span>{(current.correctAnswer as string).split(',').map((v, i) => v !== '0' ? `${v} ${['M', 'C', 'D', 'U'][i]}` : '').filter(s => s !== '').join(' ')}</span>
                    <span className="text-lg opacity-80 italic">soit {(current.correctAnswer as string).split(',').map((v, i) => parseInt(v) * Math.pow(10, 3 - i)).filter(v => v !== 0).join(' + ')}</span>
                  </div>
                )
                : String(current.correctAnswer || current.answer || current.sentence || (current as TimeTask).time || '...')
              }
            </div>
          </div>
        </div>
      )}

      <div className="py-2 sm:py-4">
        {type === 'grammaire' && (
          <GrammarExercise
            sentence={current as GrammarSentence}
            onValidate={handleValidation}
          />
        )}
        {type === 'conjugaison' && (
          <ConjugationExercise
            task={current as ConjugationTask}
            onValidate={handleValidation}
          />
        )}
        {type === 'dictée' && (
          <DictationExercise
            task={current as DictationTask}
            onValidate={handleValidation}
          />
        )}
        {type === 'time' && (
          <TimeExercise
            task={current as TimeTask}
            onValidate={handleValidation}
          />
        )}
        {subject === 'maths' && (
          <MathDisplay
            task={current as MathTask}
            timerDuration={timerDuration}
            onValidate={handleValidation}
          />
        )}
      </div>
    </div>
  );
};

const GrammarExercise: React.FC<{ sentence: GrammarSentence, onValidate: (c: boolean, v?: string) => void }> = ({ sentence, onValidate }) => {
  const [selectedCategory, setSelectedCategory] = useState<any>('nom');
  const [userColors, setUserColors] = useState<Record<number, any>>({});

  const check = () => {
    let allCorrect = true;
    sentence.parts.forEach((p, i) => {
      const userChoice = userColors[i] || 'none';
      if (p.category !== 'none' && userChoice !== p.category) {
        allCorrect = false;
      }
    });
    onValidate(allCorrect);
    setUserColors({});
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl font-title mb-6 sm:mb-8 text-indigo-700 leading-tight">Identifie chaque mot :</h3>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        {(['determinant', 'nom', 'adjectif', 'verbe'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-1 min-w-[70px] px-2 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-b-4 sm:border-b-8 transition-all transform hover:scale-105 ${CATEGORY_COLORS[cat]} ${selectedCategory === cat ? 'ring-4 sm:ring-8 ring-indigo-200 -translate-y-1 sm:-translate-y-2' : 'opacity-60 scale-95'}`}
          >
            <span className="text-xs sm:text-lg font-bold">{CATEGORY_LABELS[cat]}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-12 p-4 sm:p-8 bg-indigo-50/50 rounded-3xl border-2 border-dashed border-indigo-100 min-h-[100px] sm:min-h-[140px]">
        {sentence.parts.map((part, i) => (
          <button
            key={i}
            onClick={() => setUserColors(prev => ({ ...prev, [i]: selectedCategory }))}
            className={`px-4 sm:px-8 py-2 sm:py-4 text-xl sm:text-3xl font-bold rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-200 shadow-sm ${CATEGORY_COLORS[userColors[i] || 'none']}`}
          >
            {part.text}
          </button>
        ))}
      </div>
      <button onClick={check} className="w-full sm:w-auto bg-indigo-600 text-white px-10 sm:px-16 py-4 sm:py-5 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl font-bold hover:bg-indigo-700 shadow-xl transition-all">
        Vérifier 🎨
      </button>
    </div>
  );
};

const ConjugationExercise: React.FC<{ task: ConjugationTask, onValidate: (c: boolean, v?: string) => void }> = ({ task, onValidate }) => {
  const [value, setValue] = useState('');
  const check = () => {
    onValidate(value.trim().toLowerCase() === task.answer.toLowerCase(), value);
    setValue('');
  };
  return (
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl font-title mb-4 sm:mb-6 text-indigo-700">Conjugaison</h3>
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] mb-6 sm:mb-10 text-white">
        <p className="text-3xl sm:text-5xl font-title mb-4 sm:mb-6">{task.verb}</p>
        <p className="text-lg sm:text-2xl font-bold bg-white/20 px-6 py-2 rounded-full uppercase inline-block">{task.tense}</p>
      </div>
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-md">
          <span className="text-3xl sm:text-4xl font-title text-indigo-800">{task.person}</span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            className="text-2xl sm:text-3xl p-4 sm:p-6 border-4 border-indigo-100 rounded-2xl sm:rounded-3xl w-full text-center font-bold focus:border-indigo-500 outline-none"
            placeholder="..."
            autoFocus
          />
        </div>
        <button onClick={check} className="w-full sm:w-auto bg-indigo-600 text-white px-12 sm:px-16 py-4 sm:py-5 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl font-bold">Valider ✍️</button>
      </div>
    </div>
  );
};

const DictationExercise: React.FC<{ task: DictationTask, onValidate: (c: boolean, v?: string) => void }> = ({ task, onValidate }) => {
  const [value, setValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (isPlaying) return;

    // Utilisation de la synthèse vocale native (Web Speech API)
    const utterance = new SpeechSynthesisUtterance(task.sentence);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8; // Un peu plus lent pour une dictée
    utterance.pitch = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const check = () => {
    const normalizedUser = value.trim().toLowerCase().replace(/[.!?]$/, '');
    const normalizedTarget = task.sentence.trim().toLowerCase().replace(/[.!?]$/, '');
    onValidate(normalizedUser === normalizedTarget, value);
    setValue('');
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl font-title mb-4 sm:mb-6 text-indigo-700">Dictée Locale 🔊</h3>
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <button
          onClick={playAudio}
          disabled={isPlaying}
          className={`group flex items-center justify-center gap-4 w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 sm:border-8 transition-all ${isPlaying ? 'bg-indigo-100 border-indigo-200' : 'bg-white border-indigo-500 hover:scale-105 shadow-xl animate-pulse'}`}
        >
          {isPlaying ? (
            <div className="flex gap-1 items-center">
              <div className="w-1 sm:w-2 h-4 sm:h-6 bg-indigo-500 animate-bounce rounded-full"></div>
              <div className="w-1 sm:w-2 h-6 sm:h-10 bg-indigo-500 animate-bounce delay-75 rounded-full"></div>
              <div className="w-1 sm:w-2 h-4 sm:h-6 bg-indigo-500 animate-bounce delay-150 rounded-full"></div>
            </div>
          ) : (
            <span className="text-5xl sm:text-7xl group-hover:scale-110 transition-transform">🎧</span>
          )}
        </button>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] sm:text-sm bg-indigo-50 px-4 py-2 rounded-full">Clique pour écouter (Synthèse vocale locale)</p>

        <div className="w-full max-w-lg mt-2 sm:mt-4">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full text-lg sm:text-2xl p-4 sm:p-6 border-4 border-indigo-100 rounded-2xl sm:rounded-3xl font-bold min-h-[120px] sm:min-h-[140px] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            placeholder="Écris la phrase ici..."
            autoFocus
          />
        </div>

        <button
          onClick={check}
          disabled={!value.trim()}
          className={`w-full sm:w-auto px-10 sm:px-20 py-4 sm:py-6 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl font-bold shadow-xl transition-all ${value.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Valider ma réponse ✍️
        </button>
      </div>
    </div>
  );
};



const MathDisplay: React.FC<{ task: MathTask, timerDuration: number, onValidate: (c: boolean, v?: string) => void }> = ({ task, timerDuration, onValidate }) => {
  const [value, setValue] = useState('');
  const [decompValues, setDecompValues] = useState<Record<string, string>>({ M: '', C: '', D: '', U: '' });
  const [additiveValues, setAdditiveValues] = useState<Record<string, string>>({ M: '', C: '', D: '', U: '' });
  const [orderItems, setOrderItems] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const isTimed = task.type === 'addition' || task.type === 'multiplication';
  const isProblem = task.type === 'problem';
  const isDecomp = task.type === 'decomposition';

  useEffect(() => {
    if (task.type === 'ordering' && task.options) setOrderItems(task.options as number[]);
    setValue('');
    setDecompValues({ M: '', C: '', D: '', U: '' });
    setAdditiveValues({ M: '', C: '', D: '', U: '' });
    setProgress(0);

    if (isTimed) {
      startTimeRef.current = Date.now();
      const duration = timerDuration * 1000;
      const tick = () => {
        const now = Date.now();
        const elapsed = now - (startTimeRef.current || now);
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        if (newProgress < 100) timerRef.current = requestAnimationFrame(tick);
      };
      timerRef.current = requestAnimationFrame(tick);
    }
    return () => { if (timerRef.current) cancelAnimationFrame(timerRef.current); };
  }, [task, isTimed, timerDuration]);

  const check = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    if (task.type === 'ordering') onValidate(orderItems.join(',') === task.correctAnswer);
    else if (isDecomp) {
      const expected = (task.correctAnswer as string).split(',');
      const [m, c, d, u] = expected;
      const userTableCorrect = (decompValues.M || '0') === m && (decompValues.C || '0') === c && (decompValues.D || '0') === d && (decompValues.U || '0') === u;
      const userAdditiveCorrect = (parseInt(additiveValues.M) || 0) === (parseInt(m) * 1000) && (parseInt(additiveValues.C) || 0) === (parseInt(c) * 100) && (parseInt(additiveValues.D) || 0) === (parseInt(d) * 10) && (parseInt(additiveValues.U) || 0) === (parseInt(u));

      if (!userTableCorrect || !userAdditiveCorrect) {
        setDecompValues({ M: '', C: '', D: '', U: '' });
        setAdditiveValues({ M: '', C: '', D: '', U: '' });
      }
      onValidate(userTableCorrect && userAdditiveCorrect);
    }
    else {
      onValidate(String(value).trim() === String(task.correctAnswer), value);
      setValue('');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setOrderItems((items) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over.id as number);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const isTimeExceeded = progress === 100;

  return (
    <div className="text-center w-full max-w-full overflow-hidden px-1">
      <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-indigo-400 uppercase tracking-widest truncate">
        {isProblem ? 'Problème' : isDecomp ? 'Décomposition' : 'Calcul ⚡'}
      </h3>

      <div className={`mb-6 sm:mb-8 text-indigo-900 bg-amber-50 p-4 sm:p-12 rounded-[1.5rem] sm:rounded-[2.5rem] border-4 border-dashed border-amber-200 leading-relaxed break-words overflow-hidden ${isProblem ? 'text-xl sm:text-2xl font-semibold' : 'text-3xl sm:text-6xl font-title'}`}>
        {task.question}
      </div>

      {isTimed && (
        <div className="max-w-md mx-auto mb-6 sm:mb-8 space-y-2">
          <div className="flex justify-between text-[10px] sm:text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <span>Vite ! ({timerDuration}s)</span>
            <span>{isTimeExceeded ? 'Temps dépassé !' : 'Temps restant'}</span>
          </div>
          <div className="w-full bg-gray-100 h-3 sm:h-4 rounded-full overflow-hidden border-2 border-indigo-50">
            <div className={`h-full transition-colors duration-300 ${progress > 80 ? 'bg-red-500' : progress > 50 ? 'bg-yellow-400' : 'bg-green-400'}`} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {isDecomp ? (
        <div className="flex flex-col items-center gap-6 sm:gap-10 w-full overflow-hidden">
          <div className="w-full">
            <p className="text-left text-[10px] sm:text-xs font-bold text-indigo-400 uppercase mb-3 sm:mb-4 ml-1">1. Tableau de numération :</p>
            <div className="grid grid-cols-4 gap-1 sm:gap-3 w-full max-w-lg mx-auto">
              {[
                { k: 'M', label: 'Milliers', color: 'bg-yellow-100 border-yellow-400 text-yellow-700', active: parseInt(task.question) >= 1000 },
                { k: 'C', label: 'Centaines', color: 'bg-blue-100 border-blue-400 text-blue-700', active: parseInt(task.question) >= 100 },
                { k: 'D', label: 'Dizaines', color: 'bg-red-100 border-red-400 text-red-700', active: parseInt(task.question) >= 10 },
                { k: 'U', label: 'Unités', color: 'bg-green-100 border-green-400 text-green-700', active: true }
              ].map(col => col.active ? (
                <div key={col.k} className="flex flex-col gap-1">
                  <div className={`py-1 rounded-t-xl font-bold text-[10px] sm:text-[12px] ${col.color.replace('100', '200')}`}>{col.k}</div>
                  <input
                    type="number"
                    value={decompValues[col.k]}
                    onChange={(e) => setDecompValues({ ...decompValues, [col.k]: e.target.value.slice(-1) })}
                    className={`w-full text-lg sm:text-2xl p-1.5 sm:p-3 border-2 rounded-b-xl text-center font-title ${col.color} focus:outline-none`}
                    placeholder="0"
                  />
                </div>
              ) : <div key={col.k}></div>)}
            </div>
          </div>

          <div className="w-full">
            <p className="text-left text-[10px] sm:text-xs font-bold text-indigo-400 uppercase mb-3 sm:mb-4 ml-1">2. Somme décomposée :</p>
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-base sm:text-2xl font-bold text-gray-400 w-full px-2">
              {[
                { k: 'M', color: 'border-yellow-300', active: parseInt(task.question) >= 1000 },
                { k: 'C', color: 'border-blue-300', active: parseInt(task.question) >= 100 },
                { k: 'D', color: 'border-red-300', active: parseInt(task.question) >= 10 },
                { k: 'U', color: 'border-green-300', active: true }
              ].filter(c => c.active).map((c, i, arr) => (
                <React.Fragment key={c.k}>
                  <input
                    type="number"
                    value={additiveValues[c.k]}
                    onChange={(e) => setAdditiveValues({ ...additiveValues, [c.k]: e.target.value })}
                    className={`w-12 sm:w-24 p-1.5 sm:p-3 border-b-4 rounded-xl text-center font-title text-indigo-900 bg-white ${c.color} focus:outline-none focus:bg-indigo-50 transition-colors text-sm sm:text-2xl`}
                    placeholder="..."
                  />
                  {i < arr.length - 1 && <span>+</span>}
                </React.Fragment>
              ))}
              <span>=</span>
              <span className="text-indigo-600 bg-indigo-50 px-2 sm:px-4 py-1 sm:py-2 rounded-xl text-sm sm:text-2xl">{task.question}</span>
            </div>
          </div>
          <button onClick={check} className="w-full sm:w-auto bg-indigo-600 text-white px-10 sm:px-20 py-4 sm:py-6 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">Vérifier 🎯</button>
        </div>
      ) : task.type !== 'ordering' ? (
        <div className="flex flex-col items-center gap-6 sm:gap-10">
          <input
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            className={`text-4xl sm:text-6xl p-6 sm:p-8 border-4 rounded-[1.5rem] sm:rounded-[2rem] w-full max-w-[200px] sm:max-w-[280px] text-center font-title transition-all ${isTimeExceeded ? 'border-red-500 animate-pulse ring-4 ring-red-100' : 'border-indigo-100 focus:border-indigo-400'}`}
            placeholder="?"
            autoFocus
          />
          <button onClick={check} className="w-full sm:w-auto bg-indigo-600 text-white px-12 sm:px-20 py-4 sm:py-6 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl font-bold shadow-xl">Valider 🚀</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 sm:gap-10 w-full max-w-full overflow-hidden">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderItems}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full touch-none">
                {orderItems.map((num) => (
                  <SortableItem key={num} id={num} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <button onClick={check} className="w-full sm:w-auto bg-indigo-600 text-white px-12 sm:px-20 py-4 sm:py-6 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl font-bold">Vérifier 🔢</button>
        </div>
      )}
    </div>
  );
};

const SortableItem: React.FC<{ id: number }> = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-3 sm:p-8 text-xl sm:text-4xl font-title rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-indigo-100 shadow-lg min-w-[60px] sm:min-w-[100px] truncate cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50 scale-105 shadow-2xl ring-4 ring-indigo-300' : ''}`}
    >
      {id}
    </div>
  );
};



const TimeExercise: React.FC<{ task: TimeTask, onValidate: (c: boolean, v?: string) => void }> = ({ task, onValidate }) => {
  const [userHour, setUserHour] = useState(12);
  const [userMinute, setUserMinute] = useState(0);
  const [inputHour, setInputHour] = useState('');
  const [inputMinute, setInputMinute] = useState('');

  useEffect(() => {
    // Reset state on new task
    if (task.type === 'set_time') {
      setUserHour(10);
      setUserMinute(10);
    } else {
      setInputHour('');
      setInputMinute('');
    }
  }, [task]);

  const check = () => {
    if (task.type === 'read_time') {
      const h = parseInt(inputHour);
      const m = parseInt(inputMinute);
      const [targetH, targetM] = task.time.split(':').map(Number);

      const isCorrect = h === targetH && m === targetM;
      onValidate(isCorrect, `${inputHour}:${inputMinute}`);
      if (!isCorrect) {
        setInputHour('');
        setInputMinute('');
      }
    } else {
      const [targetH, targetM] = task.time.split(':').map(Number);
      // Allow 12 to be 0 for hours if needed, but usually 0-23. 
      // Clock visual is 12h. Task time is 24h string "14:30".
      // We need to match visual position. 
      // 14:30 -> visual 2:30. userHour 2, userMinute 30.

      const targetH12 = targetH % 12 || 12;
      const userH12 = userHour % 12 || 12;

      const isCorrect = userH12 === targetH12 && userMinute === targetM;
      onValidate(isCorrect, `${userHour}h${userMinute}`);
    }
  };

  const adjustTime = (hDelta: number, mDelta: number) => {
    let newM = userMinute + mDelta;
    let newH = userHour + hDelta;

    if (newM >= 60) {
      newM -= 60;
      newH += 1;
    } else if (newM < 0) {
      newM += 60;
      newH -= 1;
    }

    if (newH > 12) newH = 1;
    else if (newH < 1) newH = 12;

    setUserHour(newH);
    setUserMinute(newM);
  };

  // Clock rendering helpers
  const getHandAngle = (value: number, total: number) => (value / total) * 360;
  const hourAngle = getHandAngle(userHour % 12 + userMinute / 60, 12);
  const minuteAngle = getHandAngle(userMinute, 60);

  // For read_time, we show the task.time on the clock
  const displayHour = task.type === 'read_time' ? parseInt(task.time.split(':')[0]) : userHour;
  const displayMinute = task.type === 'read_time' ? parseInt(task.time.split(':')[1]) : userMinute;

  const displayHourAngle = getHandAngle(displayHour % 12 + displayMinute / 60, 12);
  const displayMinuteAngle = getHandAngle(displayMinute, 60);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 mt-12">
        {/* Period Indicator */}
        <div className="absolute -right-4 -top-16 sm:-right-12 sm:-top-16 bg-white p-3 rounded-2xl shadow-lg border-4 border-indigo-100 flex flex-col items-center animate-bounce-slow z-20">
          <span className="text-4xl sm:text-5xl">
            {parseInt(task.time.split(':')[0]) < 12 ? '🌅' : '🌇'}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-indigo-400 uppercase tracking-wider mt-1">
            {parseInt(task.time.split(':')[0]) < 12 ? 'Matin' : 'Après-midi'}
          </span>
        </div>

        {/* Clock Face */}
        <div className="absolute inset-0 rounded-full border-8 border-indigo-600 bg-white shadow-xl flex items-center justify-center">
          {[...Array(12)].map((_, i) => {
            const num = i + 1;
            const angleDeg = (num * 30) - 90;
            const angleRad = angleDeg * (Math.PI / 180);
            const radius = 40; // 40% from center
            const left = 50 + radius * Math.cos(angleRad);
            const top = 50 + radius * Math.sin(angleRad);

            return (
              <div
                key={i}
                className="absolute font-bold text-gray-400 flex items-center justify-center w-8 h-8"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.5rem'
                }}
              >
                {num}
              </div>
            );
          })}
          {/* Center Dot */}
          <div className="w-4 h-4 bg-indigo-800 rounded-full z-10"></div>

          {/* Hour Hand */}

          <div
            className="absolute w-2 bg-pink-500 rounded-full origin-bottom transition-transform duration-500 ease-out"
            style={{
              height: '25%',
              bottom: '50%',
              transform: `rotate(${task.type === 'read_time' ? displayHourAngle : hourAngle}deg)`
            }}
          ></div>

          {/* Minute Hand */}

          <div
            className="absolute w-1.5 bg-blue-500 rounded-full origin-bottom transition-transform duration-500 ease-out"
            style={{
              height: '35%',
              bottom: '50%',
              transform: `rotate(${task.type === 'read_time' ? displayMinuteAngle : minuteAngle}deg)`
            }}
          ></div>
        </div>
      </div>

      {task.type === 'read_time' ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <div className="flex items-center gap-2 justify-center bg-white p-2 rounded-3xl border-4 border-indigo-50 shadow-sm">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputHour}
              onChange={(e) => {
                const v = e.target.value;
                if (v === '' || /^\d+$/.test(v)) setInputHour(v);
              }}
              placeholder="HH"
              className="w-20 sm:w-24 text-center text-3xl sm:text-4xl p-3 sm:p-4 border-4 border-indigo-100 rounded-2xl font-bold focus:border-indigo-500 outline-none text-indigo-700 placeholder-indigo-200"
              autoFocus
            />
            <span className="text-3xl sm:text-4xl font-bold text-indigo-300 pb-1">:</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputMinute}
              onChange={(e) => {
                const v = e.target.value;
                if (v === '' || /^\d+$/.test(v)) setInputMinute(v);
              }}
              placeholder="MM"
              className="w-20 sm:w-24 text-center text-3xl sm:text-4xl p-3 sm:p-4 border-4 border-indigo-100 rounded-2xl font-bold focus:border-indigo-500 outline-none text-indigo-700 placeholder-indigo-200"
              onKeyDown={(e) => e.key === 'Enter' && check()}
            />
          </div>
          <button onClick={check} className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:bg-indigo-700 transition-colors">Valider</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="text-3xl sm:text-5xl font-title text-indigo-900 bg-white px-8 py-4 rounded-2xl shadow-sm border-2 border-indigo-100">
            {task.time.replace(':', 'h')}
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <button onClick={() => adjustTime(1, 0)} className="p-4 bg-pink-100 rounded-xl font-bold hover:bg-pink-200 transition-colors text-pink-700">H +</button>
              <button onClick={() => adjustTime(-1, 0)} className="p-4 bg-pink-100 rounded-xl font-bold hover:bg-pink-200 transition-colors text-pink-700">H -</button>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => adjustTime(0, 5)} className="p-4 bg-blue-100 rounded-xl font-bold hover:bg-blue-200 transition-colors text-blue-700">M +</button>
              <button onClick={() => adjustTime(0, -5)} className="p-4 bg-blue-100 rounded-xl font-bold hover:bg-blue-200 transition-colors text-blue-700">M -</button>
            </div>
          </div>
          <button onClick={check} className="w-full max-w-xs bg-indigo-600 text-white py-4 rounded-2xl text-xl font-bold shadow-lg">Valider</button>
        </div>
      )}
    </div>
  );
};

export default ExerciseRunner;
