import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { RotateCcw, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface LogicProblem {
  problem: string;
  sequence?: string;
  options: string[];
  correct: number;
  explanation: string;
}

const LOGIC_PROBLEMS: LogicProblem[] = [
  {
    problem: "Descobre o próximo número na sequência matemática:",
    sequence: "2, 4, 8, 16, 32, ?",
    options: ["48", "64", "54", "60"],
    correct: 1,
    explanation: "Cada número é multiplicado por 2 (potências de base 2): 32 × 2 = 64."
  },
  {
    problem: "Descobre o próximo termo da sequência de Fibonacci:",
    sequence: "1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "12"],
    correct: 1,
    explanation: "Na série de Fibonacci, cada termo é a soma dos dois anteriores: 5 + 8 = 13."
  },
  {
    problem: "Se ontem fosse amanhã, hoje seria sexta-feira. Que dia é hoje?",
    sequence: "Dedução Temporal",
    options: ["Quarta-feira", "Sábado", "Domingo", "Quinta-feira"],
    correct: 2,
    explanation: "Se ontem (sábado) fosse amanhã, hoje seria sexta-feira. Portanto, hoje é domingo."
  },
  {
    problem: "Qual número completa o padrão lógico triangular?",
    sequence: "3 ➔ 9 | 4 ➔ 16 | 5 ➔ 25 | 7 ➔ ?",
    options: ["42", "49", "35", "56"],
    correct: 1,
    explanation: "O padrão é o quadrado do número: 7² = 49."
  },
  {
    problem: "Um relógio analógico marca 3:15. Quantos graus mede o ângulo entre os ponteiros?",
    sequence: "Geometria do Tempo",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correct: 1,
    explanation: "Às 3:15, o ponteiro das horas avançou um quarto de hora (30° / 4 = 7.5°), enquanto o dos minutos está no 15."
  }
];

export const LogicChallengeGame: React.FC = () => {
  const { addXP, recordGameScore } = useUser();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const current = LOGIC_PROBLEMS[index];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect = idx === current.correct;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      setSelected(null);
      if (index + 1 < LOGIC_PROBLEMS.length) {
        setIndex((i) => i + 1);
      } else {
        setIsFinished(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        const xp = finalScore * 15;
        if (xp > 0) {
          addXP(xp, `Desafio de Lógica (${finalScore}/${LOGIC_PROBLEMS.length})`);
          recordGameScore('logic', finalScore);
        }
      }
    }, 900);
  };

  const handleRestart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsFinished(false);
  };

  if (isFinished) {
    const xp = score * 15;
    return (
      <div className="text-center space-y-5 max-w-sm mx-auto py-6 animate-in fade-in duration-200">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner border border-indigo-200">
          🧠
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800">Mente Analítica!</h3>
          <p className="text-sm text-slate-600">
            Decifraste <span className="font-extrabold text-brand-600 text-lg">{score} de {LOGIC_PROBLEMS.length}</span> enigmas lógicos.
          </p>
        </div>

        <div className="p-3 bg-brand-50 text-brand-800 border border-brand-200 font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" /> +{xp} XP Adicionados ao Teu Perfil
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3.5 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Jogar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-center space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="text-left">
          <h4 className="text-sm font-extrabold text-slate-800">Desafio de Lógica</h4>
          <span className="text-xs text-slate-400">Enigma {index + 1} de {LOGIC_PROBLEMS.length}</span>
        </div>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full border border-indigo-200">
          {score} Acertos
        </span>
      </div>

      <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl min-h-[120px] flex flex-col items-center justify-center gap-2">
        <p className="text-xs font-semibold text-slate-500">{current.problem}</p>
        {current.sequence && (
          <div className="text-xl sm:text-2xl font-black text-brand-700 tracking-wider font-mono bg-white px-4 py-2 rounded-2xl border border-slate-200">
            {current.sequence}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {current.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === current.correct;

          let style = "bg-white border-slate-200 text-slate-800 hover:border-indigo-500 hover:bg-indigo-50/40";
          if (selected !== null) {
            if (isCorrect) style = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
            else if (isSelected) style = "bg-rose-50 border-rose-500 text-rose-800 font-bold";
            else style = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className={`p-4 rounded-2xl border-2 text-base font-extrabold transition-all duration-150 flex items-center justify-between cursor-pointer ${style}`}
            >
              <span>{opt}</span>
              {selected !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {selected !== null && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-600" />}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-400">Analisa padrões matemáticos, temporais e dedutivos com atenção.</p>
    </div>
  );
};
