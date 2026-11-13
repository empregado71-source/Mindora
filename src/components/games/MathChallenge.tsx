import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { Timer, Zap, Trophy, RotateCcw } from 'lucide-react';

export const MathChallenge: React.FC = () => {
  const { addXP, recordGameScore, state } = useUser();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [currentProblem, setCurrentProblem] = useState<{ expression: string; answer: number; options: number[] }>({
    expression: '',
    answer: 0,
    options: []
  });
  const [lastAnswerStatus, setLastAnswerStatus] = useState<'correct' | 'wrong' | null>(null);
  const [streakCount, setStreakCount] = useState<number>(0);

  const generateProblem = () => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = 0;
    let b = 0;
    let ans = 0;

    if (op === '+') {
      a = Math.floor(Math.random() * 45) + 5;
      b = Math.floor(Math.random() * 45) + 5;
      ans = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * 60) + 20;
      b = Math.floor(Math.random() * 20) + 1;
      ans = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 11) + 2;
      ans = a * b;
    }

    const opts = new Set<number>([ans]);
    while (opts.size < 4) {
      const delta = (Math.floor(Math.random() * 8) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const wrong = ans + delta;
      if (wrong >= 0) opts.add(wrong);
    }

    const options = Array.from(opts).sort(() => Math.random() - 0.5);
    setCurrentProblem({
      expression: `${a} ${op} ${b} = ?`,
      answer: ans,
      options
    });
  };

  const handleStart = () => {
    setScore(0);
    setTimeLeft(30);
    setStreakCount(0);
    setLastAnswerStatus(null);
    setIsPlaying(true);
    generateProblem();
  };

  useEffect(() => {
    generateProblem();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (timeLeft === 0 && !isPlaying && score > 0) {
      const earnedXP = Math.max(10, Math.floor(score / 2));
      addXP(earnedXP, `Desafio de Matemática (${score} pts)`);
      recordGameScore('calc', score);
    }
  }, [timeLeft, isPlaying]);

  const handleChoice = (val: number) => {
    if (!isPlaying) return;
    if (val === currentProblem.answer) {
      const newScore = score + 10 + streakCount * 2;
      setScore(newScore);
      setStreakCount((s) => s + 1);
      setLastAnswerStatus('correct');
      setTimeout(() => {
        setLastAnswerStatus(null);
        generateProblem();
      }, 150);
    } else {
      setStreakCount(0);
      setLastAnswerStatus('wrong');
      setTimeout(() => {
        setLastAnswerStatus(null);
        generateProblem();
      }, 250);
    }
  };

  if (!isPlaying) {
    const earnedXP = Math.max(10, Math.floor(score / 2));
    const highScore = state.highScores.calc;
    return (
      <div className="text-center space-y-6 max-w-md mx-auto py-4 animate-in fade-in duration-200">
        <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner border border-amber-200">
          ⏱️
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800">Tempo Esgotado!</h3>
          <p className="text-sm text-slate-600">
            A tua pontuação final foi de{' '}
            <span className="font-extrabold text-brand-600 text-lg">{score} pontos</span>.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <div className="px-4 py-3 bg-brand-50 border border-brand-200 text-brand-700 font-bold rounded-2xl text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400" /> +{earnedXP} XP Recebido
          </div>
          <div className="px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-2xl text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" /> Recorde: {Math.max(score, highScore)} pts
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full py-3.5 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Jogar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-center space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="text-left flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tempo</span>
            <div className={`text-xl font-black ${timeLeft <= 5 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>

        {streakCount > 1 && (
          <div className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black rounded-full flex items-center gap-1 animate-bounce">
            🔥 {streakCount}x Combo!
          </div>
        )}

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pontuação</span>
          <div className="text-xl font-black text-brand-600">{score} pts</div>
        </div>
      </div>

      {/* Progress Bar of time */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            timeLeft <= 5 ? 'bg-rose-500' : 'bg-brand-500'
          }`}
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        />
      </div>

      {/* Expression Area */}
      <div
        className={`p-8 rounded-3xl border transition-all duration-200 flex items-center justify-center ${
          lastAnswerStatus === 'correct'
            ? 'bg-emerald-50 border-emerald-300 scale-102'
            : lastAnswerStatus === 'wrong'
            ? 'bg-rose-50 border-rose-300 shake'
            : 'bg-brand-50/60 border-brand-100'
        }`}
      >
        <span className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-wider">
          {currentProblem.expression}
        </span>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3">
        {currentProblem.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleChoice(opt)}
            className="py-4 px-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 font-extrabold text-xl hover:border-brand-500 hover:bg-brand-50/70 hover:shadow-md transition active:scale-95 cursor-pointer"
          >
            {opt}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400">
        Ganha +10 XP por acerto com bónus de combo consecutivo antes dos 30 segundos!
      </p>
    </div>
  );
};
