import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { Timer, Zap, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface FlashQuestion {
  q: string;
  ops: string[];
  cor: number;
}

const FLASH_QUESTIONS: FlashQuestion[] = [
  { q: "Qual é o planeta mais próximo do Sol?", ops: ["Vénus", "Mercúrio", "Marte", "Terra"], cor: 1 },
  { q: "Qual destes elementos é um gás nobre?", ops: ["Hélio", "Oxigénio", "Azoto", "Cloro"], cor: 0 },
  { q: "Quantos bits compõem exatamente 1 Byte?", ops: ["4", "16", "8", "32"], cor: 2 },
  { q: "Qual é a capital oficial de Espanha?", ops: ["Barcelona", "Sevilha", "Madrid", "Valência"], cor: 2 },
  { q: "Qual é o resultado da operação: 15 × 4?", ops: ["60", "45", "50", "70"], cor: 0 },
  { q: "Qual órgão humano bombeia sangue?", ops: ["Fígado", "Coração", "Pulmão", "Rim"], cor: 1 }
];

export const FlashQuiz: React.FC = () => {
  const { addXP, recordGameScore } = useUser();
  const [questions, setQuestions] = useState<FlashQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const initGame = () => {
    const shuffled = [...FLASH_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setTimeLeft(5);
    setScore(0);
    setSelectedOption(null);
    setIsFinished(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Timer effect
  useEffect(() => {
    if (isFinished || questions.length === 0 || selectedOption !== null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Time expired for this question, advance!
          handleNextQuestion(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isFinished, questions, selectedOption]);

  const handleNextQuestion = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setTimeLeft(5);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
        const finalScore = score + (wasCorrect ? 1 : 0);
        const xp = finalScore * 12;
        if (xp > 0) {
          addXP(xp, `Quiz Relâmpago (${finalScore}/${questions.length} acertos)`);
          recordGameScore('flash', finalScore);
        }
      }
    }, 450);
  };

  const handleSelect = (idx: number) => {
    if (selectedOption !== null || isFinished) return;
    setSelectedOption(idx);
    const isCor = idx === questions[currentIndex].cor;
    handleNextQuestion(isCor);
  };

  if (isFinished) {
    const totalXP = score * 12;
    return (
      <div className="text-center space-y-6 max-w-sm mx-auto py-6 animate-in fade-in duration-200">
        <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner border border-sky-200">
          ⚡
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800">Quiz Relâmpago Terminado!</h3>
          <p className="text-sm text-slate-600">
            Acertaste <span className="font-extrabold text-brand-600 text-lg">{score} de {questions.length}</span> perguntas velozes.
          </p>
        </div>

        <div className="p-3 bg-brand-50 text-brand-800 border border-brand-200 font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-400" /> +{totalXP} XP Conquistados
        </div>

        <button
          onClick={initGame}
          className="w-full py-3.5 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Nova Ronda Rápida
        </button>
      </div>
    );
  }

  if (questions.length === 0) return null;
  const currentQ = questions[currentIndex];

  return (
    <div className="w-full max-w-md text-center space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Pergunta {currentIndex + 1} de {questions.length}
        </span>
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-rose-500" />
          <span className={`text-sm font-black px-2.5 py-0.5 rounded-full ${timeLeft <= 2 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* 5-second countdown progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            timeLeft <= 2 ? 'bg-rose-500' : 'bg-sky-500'
          }`}
          style={{ width: `${(timeLeft / 5) * 100}%` }}
        />
      </div>

      <div className="p-6 bg-slate-50/70 border border-slate-100 rounded-3xl min-h-[100px] flex items-center justify-center">
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
          {currentQ.q}
        </h3>
      </div>

      <div className="space-y-2.5">
        {currentQ.ops.map((op, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = currentQ.cor === idx;
          let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-brand-500 hover:bg-brand-50/60";

          if (selectedOption !== null) {
            if (isCorrect) {
              btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
            } else if (isSelected) {
              btnStyle = "bg-rose-50 border-rose-500 text-rose-800 font-bold";
            } else {
              btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selectedOption !== null}
              className={`w-full py-3.5 px-4 rounded-2xl border-2 text-left font-bold text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${btnStyle}`}
            >
              <span>{op}</span>
              {selectedOption !== null && isCorrect && (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              )}
              {selectedOption !== null && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-600" />
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-400">
        Tens apenas 5 segundos por questão! Responde rápido para maximizar a pontuação.
      </p>
    </div>
  );
};
