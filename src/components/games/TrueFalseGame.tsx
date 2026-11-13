import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { Check, X, RotateCcw, Zap, Sparkles } from 'lucide-react';

interface Statement {
  text: string;
  isTrue: boolean;
  explanation: string;
}

const STATEMENTS: Statement[] = [
  {
    text: "O Sol é uma estrela de tamanho médio localizada no centro do nosso Sistema Solar.",
    isTrue: true,
    explanation: "Verdadeiro! O Sol é uma estrela anã amarela e concentra 99,8% da massa do sistema solar."
  },
  {
    text: "Os humanos têm apenas 3 pares de cromossomas em cada célula somática.",
    isTrue: false,
    explanation: "Falso! O genoma humano possui 23 pares (46 cromossomas no total)."
  },
  {
    text: "A velocidade da luz no vácuo é de aproximadamente 300.000 quilómetros por segundo.",
    isTrue: true,
    explanation: "Verdadeiro! É a velocidade máxima universal de transmissão de informação."
  },
  {
    text: "O elemento químico Ouro tem como símbolo na tabela periódica a letra 'Ag'.",
    isTrue: false,
    explanation: "Falso! Ouro é 'Au' (Aurum). 'Ag' é a prata (Argentum)."
  },
  {
    text: "A Grande Muralha da China é a única construção humana visível a olho nu da Lua.",
    isTrue: false,
    explanation: "Falso! É um mito popular. Da órbita lunar sem instrumentos óticos, nenhuma construção humana é distinguível."
  },
  {
    text: "A fotossíntese liberta oxigénio molecular (O₂) para a atmosfera a partir da quebra da água.",
    isTrue: true,
    explanation: "Verdadeiro! O oxigénio libertado pelas plantas provém da fotólise da água nos cloroplastos."
  },
  {
    text: "Um byte é composto por exatamente 8 bits.",
    isTrue: true,
    explanation: "Verdadeiro! 1 Byte = 8 bits de informação binária."
  }
];

export const TrueFalseGame: React.FC = () => {
  const { addXP, recordGameScore } = useUser();
  const [deck, setDeck] = useState<Statement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const initGame = () => {
    const shuffled = [...STATEMENTS].sort(() => Math.random() - 0.5).slice(0, 5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setLastFeedback(null);
    setIsFinished(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleAnswer = (userChoseTrue: boolean) => {
    if (lastFeedback !== null || isFinished) return;
    const current = deck[currentIndex];
    const isCorrect = userChoseTrue === current.isTrue;

    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }

    setLastFeedback({
      isCorrect,
      explanation: current.explanation
    });

    setTimeout(() => {
      setLastFeedback(null);
      if (currentIndex + 1 < deck.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsFinished(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        const earnedXP = finalScore * 10;
        if (earnedXP > 0) {
          addXP(earnedXP, `Verdadeiro ou Falso (${finalScore}/${deck.length})`);
          recordGameScore('truefalse', finalScore);
        }
      }
    }, 1200);
  };

  if (isFinished) {
    const earnedXP = score * 10;
    return (
      <div className="text-center space-y-5 max-w-sm mx-auto py-6 animate-in fade-in duration-200">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner border border-emerald-200">
          🎯
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800">Desafio Concluído!</h3>
          <p className="text-sm text-slate-600">
            Acertaste <span className="font-extrabold text-brand-600 text-lg">{score} de {deck.length}</span> afirmações.
          </p>
        </div>

        <div className="p-3 bg-brand-50 text-brand-800 border border-brand-200 font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" /> +{earnedXP} XP Conquistados
        </div>

        <button
          onClick={initGame}
          className="w-full py-3.5 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Jogar Novamente
        </button>
      </div>
    );
  }

  if (deck.length === 0) return null;
  const current = deck[currentIndex];

  return (
    <div className="w-full max-w-md text-center space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="text-left">
          <h4 className="text-sm font-extrabold text-slate-800">Verdadeiro ou Falso</h4>
          <span className="text-xs text-slate-400">Afirmação {currentIndex + 1} de {deck.length}</span>
        </div>
        <div className="flex items-center gap-2">
          {streak > 1 && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-black border border-amber-200">
              🔥 {streak}x
            </span>
          )}
          <span className="px-3 py-1 bg-brand-50 text-brand-700 font-bold text-xs rounded-full border border-brand-200">
            {score} pts
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 bg-slate-50/80 border border-slate-200 rounded-3xl min-h-[140px] flex items-center justify-center shadow-xs">
        <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
          &quot;{current.text}&quot;
        </p>
      </div>

      {lastFeedback ? (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold border animate-in zoom-in-95 duration-150 ${
            lastFeedback.isCorrect
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-rose-50 text-rose-800 border-rose-300'
          }`}
        >
          <div className="font-black text-sm mb-1">
            {lastFeedback.isCorrect ? '✨ Exato! Resposta correta.' : '❌ Incorreto!'}
          </div>
          <p className="text-xs">{lastFeedback.explanation}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base transition shadow-md shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-5 h-5" /> Verdadeiro
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-base transition shadow-md shadow-rose-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <X className="w-5 h-5" /> Falso
          </button>
        </div>
      )}

      <p className="text-xs text-slate-400">
        Avalia criticamente a afirmação e clica se é cientificamente verdadeira ou falsa!
      </p>
    </div>
  );
};
