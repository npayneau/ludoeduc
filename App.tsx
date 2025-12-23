
import React, { useState, useEffect } from 'react';
import { Level, MathType } from './types';
import ExerciseRunner from './components/ExerciseRunner';

const App: React.FC = () => {
  const [level, setLevel] = useState<Level | null>(null);
  const [subject, setSubject] = useState<'français' | 'maths' | null>(null);
  const [exerciseType, setExerciseType] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'intro' | 'configuringMath' | 'configuringDictation' | 'playing' | 'summary'>('intro');
  const [lastScore, setLastScore] = useState(0);
  const [timerDuration, setTimerDuration] = useState(4);
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [additionMax, setAdditionMax] = useState<number>(10);
  const [totalQuestions, setTotalQuestions] = useState(5);

  const startExercise = (subj: 'français' | 'maths', type: string) => {
    setSubject(subj);
    setExerciseType(type);
    if (type === 'multiplication' || type === 'addition') {
      setGameState('configuringMath');
      if (type === 'multiplication') setSelectedTables([2, 5, 10]);
      if (type === 'addition') setAdditionMax(10);
      setTotalQuestions(5);
    } else if (type === 'dictée') {
      setGameState('configuringDictation');
      setTotalQuestions(3);
    } else {
      setGameState('playing');
      setTotalQuestions(5);
    }
  };

  const handleTableToggle = (num: number) => {
    setSelectedTables(prev => 
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const handleFinish = (score: number) => {
    setLastScore(score);
    setGameState('summary');
  };

  const reset = () => {
    setGameState('intro');
    setSubject(null);
    setExerciseType(null);
    setSelectedTables([]);
    setAdditionMax(10);
    setTotalQuestions(5);
  };

  /**
   * Composant Footer avec injection du script Buy Me a Coffee
   */
  const Footer = () => {
    useEffect(() => {
      const container = document.getElementById('bmc-container');
      if (container && !container.hasChildNodes()) {
        const script = document.createElement('script');
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
        script.setAttribute('data-name', 'bmc-button');
        script.setAttribute('data-slug', 'nicolaspayj');
        script.setAttribute('data-color', '#40DCA5');
        script.setAttribute('data-emoji', '🌭');
        script.setAttribute('data-font', 'Cookie');
        script.setAttribute('data-text', 'Acheté moi un hotdog');
        script.setAttribute('data-outline-color', '#000000');
        script.setAttribute('data-font-color', '#ffffff');
        script.setAttribute('data-coffee-color', '#FFDD00');
        script.async = true;
        container.appendChild(script);
      }
    }, []);

    return (
      <footer className="mt-12 pb-12 text-center text-gray-400 text-xs sm:text-sm">
        <p className="mb-4">Application développée par un papa passionné.</p>
      </footer>
    );
  };

  if (!level) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl max-w-xl w-full text-center border-4 border-indigo-200">
          <h1 className="text-4xl sm:text-6xl font-title text-indigo-600 mb-4 sm:mb-6 drop-shadow-sm">LudoÉduc 🚀</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 font-medium italic">Choisis ton niveau pour commencer l'aventure !</p>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {(['CE1', 'CE2', 'CM1', 'CM2'] as Level[]).map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className="py-6 sm:py-8 rounded-2xl bg-indigo-50 border-b-8 border-indigo-200 text-2xl sm:text-3xl font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white hover:scale-105 transition-all active:translate-y-2 active:border-b-0"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (gameState === 'configuringMath' || gameState === 'configuringDictation') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-indigo-50">
        <div className={`bg-white p-6 sm:p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center border-b-[8px] sm:border-b-[12px] ${gameState === 'configuringMath' ? 'border-amber-200' : 'border-emerald-200'}`}>
          <h2 className={`text-3xl sm:text-4xl font-title mb-6 ${gameState === 'configuringMath' ? 'text-amber-600' : 'text-emerald-600'}`}>
            {gameState === 'configuringMath' ? 'Prépare ton défi ! 🔢' : 'Prépare ta dictée ! 📝'}
          </h2>
          
          {gameState === 'configuringMath' && (
            <div className="mb-8">
              <p className="text-gray-500 mb-4 font-bold uppercase tracking-wider text-xs sm:text-sm">
                Étape 1 : {exerciseType === 'multiplication' ? 'Choisis tes tables' : "Choisis l'étendue des nombres"}
              </p>
              
              {exerciseType === 'multiplication' ? (
                <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <button
                      key={num}
                      onClick={() => handleTableToggle(num)}
                      className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full text-lg sm:text-2xl font-bold transition-all shadow-md transform hover:scale-110 active:scale-95 border-2 sm:border-4 ${
                        selectedTables.includes(num) 
                          ? 'bg-amber-500 text-white border-amber-600' 
                          : 'bg-white text-amber-400 border-amber-100 hover:border-amber-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6">
                  {[10, 20].map(max => (
                    <button
                      key={max}
                      onClick={() => setAdditionMax(max)}
                      className={`flex-1 py-4 sm:py-6 px-4 rounded-3xl text-xl sm:text-2xl font-bold transition-all border-4 flex flex-col items-center justify-center gap-1 sm:gap-2 ${
                        additionMax === max 
                          ? 'bg-amber-500 text-white border-amber-600 scale-105 shadow-xl' 
                          : 'bg-white text-amber-400 border-amber-100 hover:border-amber-300'
                      }`}
                    >
                      <span className="text-[10px] sm:text-sm opacity-80 uppercase">Nombres de</span>
                      <span className="text-2xl sm:text-4xl">0 à {max}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={`mb-8 sm:mb-10 p-4 sm:p-6 rounded-3xl border-2 border-dashed ${gameState === 'configuringMath' ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'}`}>
            <p className={`mb-4 font-bold uppercase tracking-wider text-xs sm:text-sm ${gameState === 'configuringMath' ? 'text-amber-700' : 'text-emerald-700'}`}>
              Combien de {gameState === 'configuringMath' ? 'calculs' : 'phrases'} ?
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {(gameState === 'configuringMath' ? [5, 10, 15, 20] : [1, 2, 3, 4, 5, 10]).map(count => (
                <button
                  key={count}
                  onClick={() => setTotalQuestions(count)}
                  className={`flex-1 min-w-[60px] sm:flex-none sm:px-8 py-2 sm:py-3 rounded-2xl text-lg sm:text-xl font-bold transition-all ${
                    totalQuestions === count
                      ? `${gameState === 'configuringMath' ? 'bg-amber-600' : 'bg-emerald-600'} text-white shadow-lg scale-110`
                      : `bg-white ${gameState === 'configuringMath' ? 'text-amber-600 border-amber-200 hover:bg-amber-100' : 'text-emerald-600 border-emerald-200 hover:bg-emerald-100'} border-2`
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-dashed border-gray-100 flex flex-col sm:flex-row gap-4">
            <button onClick={reset} className="flex-1 py-4 sm:py-5 rounded-2xl bg-white border-2 border-gray-200 text-lg sm:text-xl font-bold text-gray-400 hover:bg-gray-50 transition-all">Retour</button>
            <button 
              onClick={() => setGameState('playing')}
              className={`flex-[2] py-4 sm:py-5 rounded-2xl text-xl sm:text-2xl font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 text-white ${
                gameState === 'configuringMath' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              C'est parti ! 🚀
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (gameState === 'playing' && subject && exerciseType) {
    return (
      <div className="min-h-screen p-4 sm:p-6 bg-indigo-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <button 
            onClick={reset}
            className="text-indigo-600 font-bold flex items-center gap-2 bg-white sm:bg-transparent px-4 py-2 rounded-xl transition-all shadow-sm sm:shadow-none"
          >
            ← Menu principal
          </button>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm flex flex-wrap justify-center gap-4 text-xs sm:text-base">
            <div>
              <span className="text-gray-500">Niveau : </span>
              <span className="font-bold text-indigo-600">{level}</span>
            </div>
            {exerciseType === 'multiplication' && (
              <div className="border-l pl-4">
                <span className="text-gray-500">Tables : </span>
                <span className="font-bold text-amber-600">{selectedTables.sort((a,b)=>a-b).join(', ')}</span>
              </div>
            )}
            <div className="border-l pl-4">
              <span className="text-gray-500">Total : </span>
              <span className="font-bold text-emerald-600">{totalQuestions} q.</span>
            </div>
          </div>
        </div>
        <ExerciseRunner 
          level={level} 
          subject={subject} 
          type={exerciseType} 
          timerDuration={timerDuration}
          selectedTables={selectedTables}
          additionMax={additionMax}
          totalQuestions={totalQuestions}
          onFinish={handleFinish} 
        />
      </div>
    );
  }

  if (gameState === 'summary') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-green-50">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border-b-8 border-green-200">
          <div className="text-7xl sm:text-9xl mb-6">🏆</div>
          <h2 className="text-4xl sm:text-5xl font-title text-green-600 mb-4">Félicitations !</h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">Tu as obtenu <span className="text-3xl sm:text-4xl font-bold text-green-500">{lastScore} / {totalQuestions}</span> bonnes réponses !</p>
          <button 
            onClick={reset}
            className="w-full bg-green-500 text-white py-5 sm:py-6 rounded-2xl text-xl sm:text-2xl font-bold hover:bg-green-600 transition-all shadow-lg active:scale-95"
          >
            Continuer
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-12 bg-indigo-50">
      <header className="flex flex-col lg:flex-row justify-between items-center mb-10 sm:mb-12 max-w-6xl mx-auto gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-title text-indigo-600">LudoÉduc 🚀</h1>
          <p className="text-lg sm:text-xl text-gray-500 font-medium">Prêt pour les défis, champion ?</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-sm border-2 border-indigo-100 flex flex-col items-center flex-1 sm:flex-none">
            <span className="text-gray-400 font-bold uppercase text-[9px] sm:text-[10px] block leading-tight">Chrono (secondes)</span>
            <input 
              type="number" 
              min="1" 
              max="60" 
              value={timerDuration} 
              onChange={(e) => setTimerDuration(parseInt(e.target.value) || 4)}
              className="w-full sm:w-16 text-center text-lg sm:text-xl font-bold text-indigo-600 focus:outline-none"
            />
          </div>
          <div className="bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-sm border-2 border-indigo-100 flex flex-col items-center flex-1 sm:flex-none">
            <span className="text-gray-400 font-bold uppercase text-[9px] sm:text-[10px] block leading-tight">Niveau actuel</span>
            <span className="text-lg sm:text-xl font-bold text-indigo-600">{level}</span>
          </div>
          <button onClick={() => setLevel(null)} className="bg-white text-red-500 font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-sm border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all text-xs sm:text-sm uppercase tracking-wider flex-1 sm:flex-none">
            Changer niveau
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 max-w-6xl mx-auto">
        {/* Français Section */}
        <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] shadow-xl border-t-[8px] sm:border-t-[12px] border-emerald-400 flex flex-col h-full">
          <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">📚</div>
            <h2 className="text-3xl sm:text-4xl font-title text-gray-800">Français</h2>
          </div>
          <div className="grid gap-4 sm:gap-6">
            <button 
              onClick={() => startExercise('français', 'grammaire')}
              className="group relative p-6 sm:p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-100 hover:border-emerald-400 hover:bg-emerald-100 transition-all text-left"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-1 sm:mb-2">Structure d'une phrase</h3>
              <p className="text-sm sm:text-base text-emerald-600/70">Identifie les classes grammaticales.</p>
              <span className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-2xl">🖍️</span>
            </button>
            <button 
              onClick={() => startExercise('français', 'conjugaison')}
              className="group relative p-6 sm:p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-100 hover:border-emerald-400 hover:bg-emerald-100 transition-all text-left"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-1 sm:mb-2">Défi Conjugaison</h3>
              <p className="text-sm sm:text-base text-emerald-600/70">Conjugue les verbes aux temps demandés.</p>
              <span className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-2xl">✍️</span>
            </button>
            <button 
              onClick={() => startExercise('français', 'dictée')}
              className="group relative p-6 sm:p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-100 hover:border-emerald-400 hover:bg-emerald-100 transition-all text-left"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-1 sm:mb-2">Dictée Interactive</h3>
              <p className="text-sm sm:text-base text-emerald-600/70">Écoute les phrases et écris-les (local).</p>
              <span className="hidden sm:block absolute right-6 bottom-6 text-2xl group-hover:scale-125 transition-all">🎧</span>
            </button>
          </div>
        </div>

        {/* Maths Section */}
        <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] shadow-xl border-t-[8px] sm:border-t-[12px] border-amber-400 flex flex-col h-full">
          <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="bg-amber-100 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">🧮</div>
            <h2 className="text-3xl sm:text-4xl font-title text-gray-800">Mathématiques</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <button 
                  onClick={() => startExercise('maths', 'multiplication')}
                  className="p-6 sm:p-10 rounded-3xl bg-amber-50 border-4 border-amber-100 hover:border-amber-400 hover:bg-amber-100 transition-all text-left group shadow-lg flex flex-col justify-between min-h-[120px] sm:min-h-[160px]"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-amber-700 text-xl sm:text-2xl">Tables</h3>
                    <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">✖️</span>
                  </div>
                  <p className="text-sm sm:text-lg text-amber-600/70 font-medium">Multiplications</p>
                </button>
                <button 
                  onClick={() => startExercise('maths', 'addition')}
                  className="p-6 sm:p-10 rounded-3xl bg-amber-50 border-4 border-amber-100 hover:border-amber-400 hover:bg-amber-100 transition-all text-left group shadow-lg flex flex-col justify-between min-h-[120px] sm:min-h-[160px]"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-amber-700 text-xl sm:text-2xl">Additions</h3>
                    <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">➕</span>
                  </div>
                  <p className="text-sm sm:text-lg text-amber-600/70 font-medium">Calcul mental</p>
                </button>
                <button 
                  onClick={() => startExercise('maths', 'decomposition')}
                  className="p-6 sm:p-10 rounded-3xl bg-amber-50 border-4 border-amber-100 hover:border-amber-400 hover:bg-amber-100 transition-all text-left group shadow-lg flex flex-col justify-between min-h-[120px] sm:min-h-[160px]"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-amber-700 text-xl sm:text-2xl">Décompo.</h3>
                    <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">📦</span>
                  </div>
                  <p className="text-sm sm:text-lg text-amber-600/70 font-medium">M - C - D - U</p>
                </button>
                <button 
                  onClick={() => startExercise('maths', 'problem')}
                  className="p-6 sm:p-10 rounded-3xl bg-amber-50 border-4 border-amber-100 hover:border-amber-400 hover:bg-amber-100 transition-all text-left group shadow-lg flex flex-col justify-between min-h-[120px] sm:min-h-[160px]"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-amber-700 text-xl sm:text-2xl">Problèmes</h3>
                    <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">🤔</span>
                  </div>
                  <p className="text-sm sm:text-lg text-amber-600/70 font-medium">Réflexion</p>
                </button>
            </div>
            <button 
              onClick={() => startExercise('maths', 'ordering')}
              className="p-6 sm:p-10 rounded-3xl bg-amber-50 border-4 border-amber-100 hover:border-amber-400 hover:bg-amber-100 transition-all text-left group shadow-lg flex flex-col justify-between min-h-[100px] sm:min-h-[140px] w-full"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-amber-700 text-xl sm:text-2xl">Classement Numérique</h3>
                <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform">🔢</span>
              </div>
              <p className="text-sm sm:text-lg text-amber-600/70 font-medium">Ranger les nombres</p>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
