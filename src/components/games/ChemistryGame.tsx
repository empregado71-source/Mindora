import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { RotateCcw, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface ChemQuestion {
  question: string;
  hint: string;
  options: string[];
  correct: number;
}

const CHEM_QUESTIONS: ChemQuestion[] = [
  {
    question: "Qual é a fórmula molecular da molécula de água?",
    hint: "Dois átomos de hidrogénio e um de oxigénio.",
    options: ["H₂O", "CO₂", "NaCl", "CH₄"],
    correct: 0
  },
  {
    question: "Qual destes elementos pertence à família dos Halogéneos?",
    hint: "Encontra-se no grupo 17 da Tabela Periódica.",
    options: ["Cloro (Cl)", "Sódio (Na)", "Hélio (He)", "Cálcio (Ca)"],
    correct: 0
  },
  {
    question: "Qual é o valor do pH de uma solução neutra a 25°C?",
    hint: "Equilíbrio entre iões H⁺ e OH⁻ na água pura.",
    options: ["pH = 0", "pH = 7", "pH = 14", "pH = 3.5"],
    correct: 1
  },
  {
    question: "Qual é o número atómico (Z) do elemento Carbono (C)?",
    hint: "Possui 6 protões no seu núcleo.",
    options: ["Z = 4", "Z = 6", "Z = 8", "Z = 12"],
    correct: 1
  },
  {
    question: "Qual é o gás que alimenta a combustão e é consumido na respiração?",
    hint: "Elemento do grupo 16 com símbolo 'O'.",
    options: ["Nitrogénio (N₂)", "Oxigénio (O₂)", "Árgon (Ar)", "Metano (CH₄)"],
    correct: 1
  }
];

export const ChemistryGame: React.FC = () => {
  const { addXP, recordGameScore } = useUser();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const current = CHEM_QUESTIONS[index];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect = idx === current.correct;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      setSelected(null);
      if (index + 1 < CHEM_QUESTIONS.length) {
        setIndex((i) => i + 1);
      } else {
        setIsFinished(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        const xp = finalScore * 12;
        if (xp > 0) {
          addXP(xp, `Desafio de Química (${finalScore}/${CHEM_QUESTIONS.length})`);
          recordGameScore('chemistry', finalScore);
        }
      }
    }, 800);
  };

  const handleRestart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsFinished(false);
  };

  if (isFinished) {
    const xp = score * 12;
    return (
      <div className="text-center space-y-5 max-w-sm mx-auto py-6 animate-in fade-in duration-200">
        <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner border border-teal-200">
          🧪
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800">Química Dominada!</h3>
          <p className="text-sm text-slate-600">
            Acertaste <span className="font-extrabold text-brand-600 text-lg">{score} de {CHEM_QUESTIONS.length}</span> perguntas atómicas.
          </p>
        </div>

        <div className="p-3 bg-brand-50 text-brand-800 border border-brand-200 font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" /> +{xp} XP Adicionados
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
          <h4 className="text-sm font-extrabold text-slate-800">Desafio de Química</h4>
          <span className="text-xs text-slate-400">Questão {index + 1} de {CHEM_QUESTIONS.length}</span>
        </div>
        <span className="px-3 py-1 bg-teal-50 text-teal-700 font-bold text-xs rounded-full border border-teal-200">
          {score} Acertos
        </span>
      </div>

      <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl min-h-[110px] flex items-center justify-center">
        <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
          {current.question}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {current.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === current.correct;

          let style = "bg-white border-slate-200 text-slate-800 hover:border-teal-500 hover:bg-teal-50/50";
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
              className={`p-4 rounded-2xl border-2 text-sm font-extrabold transition-all duration-150 flex items-center justify-between cursor-pointer ${style}`}
            >
              <span>{opt}</span>
              {selected !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {selected !== null && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-600" />}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-400">Dica: {current.hint}</p>
    </div>
  );
};
