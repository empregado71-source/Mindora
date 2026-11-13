import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { RotateCcw, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface HistoryQuestion {
  question: string;
  era: string;
  options: string[];
  correct: number;
  hint: string;
}

const HISTORY_QUESTIONS: HistoryQuestion[] = [
  {
    question: "Quem foi o primeiro imperador de Roma após a queda da República Romana?",
    era: "Antiguidade Clássica (27 a.C.)",
    options: ["Júlio César", "César Augusto (Octávio)", "Nero", "Marco Aurélio"],
    correct: 1,
    hint: "Filho adotivo de Júlio César, inaugurou a 'Pax Romana'."
  },
  {
    question: "Em que ano o ser humano pisou pela primeira vez a superfície da Lua (missão Apollo 11)?",
    era: "Século XX (Guerra Fria)",
    options: ["1959", "1969", "1975", "1981"],
    correct: 1,
    hint: "Neil Armstrong pronunciou a famosa frase sobre 'um pequeno passo'."
  },
  {
    question: "A Tomada da Bastilha em 1789 marcou o início de qual grande processo histórico?",
    era: "Idade Moderna",
    options: ["Revolução Francesa", "Revolução Industrial Inglesa", "Guerra dos Cem Anos", "Reforma Protestante"],
    correct: 0,
    hint: "Marco da ascensão dos direitos cívicos na França contra o absolutismo."
  },
  {
    question: "Que navegador português comandou a primeira frota europeia a chegar à Índia por via marítima (1498)?",
    era: "Era das Descobertas",
    options: ["Pedro Álvares Cabral", "Vasco da Gama", "Bartolomeu Dias", "Infante D. Henrique"],
    correct: 1,
    hint: "Cantado por Luís de Camões n'Os Lusíadas."
  },
  {
    question: "A Queda do Muro de Berlim em que ano simbolizou o colapso da Guerra Fria na Europa?",
    era: "Século XX",
    options: ["1985", "1989", "1991", "1995"],
    correct: 1,
    hint: "Aconteceu no outono de 1989, reunificando a Alemanha."
  }
];

export const HistoryGame: React.FC = () => {
  const { addXP, recordGameScore } = useUser();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const current = HISTORY_QUESTIONS[index];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect = idx === current.correct;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      setSelected(null);
      if (index + 1 < HISTORY_QUESTIONS.length) {
        setIndex((i) => i + 1);
      } else {
        setIsFinished(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        const xp = finalScore * 12;
        if (xp > 0) {
          addXP(xp, `Desafio de História (${finalScore}/${HISTORY_QUESTIONS.length})`);
          recordGameScore('history', finalScore);
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
        <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner border border-orange-200">
          🏛️
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800">Mestre da História!</h3>
          <p className="text-sm text-slate-600">
            Acertaste <span className="font-extrabold text-brand-600 text-lg">{score} de {HISTORY_QUESTIONS.length}</span> acontecimentos históricos.
          </p>
        </div>

        <div className="p-3 bg-brand-50 text-brand-800 border border-brand-200 font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" /> +{xp} XP Adicionados ao Perfil
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
          <h4 className="text-sm font-extrabold text-slate-800">Desafio de História</h4>
          <span className="text-xs text-slate-400">Pergunta {index + 1} de {HISTORY_QUESTIONS.length}</span>
        </div>
        <span className="px-3 py-1 bg-orange-50 text-orange-700 font-bold text-xs rounded-full border border-orange-200">
          {score} Acertos
        </span>
      </div>

      <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl min-h-[110px] flex flex-col items-center justify-center gap-1.5">
        <span className="text-[11px] font-black uppercase tracking-wider text-orange-700 bg-orange-100/70 px-2.5 py-0.5 rounded-full">
          {current.era}
        </span>
        <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug mt-1">
          {current.question}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {current.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === current.correct;

          let style = "bg-white border-slate-200 text-slate-800 hover:border-orange-500 hover:bg-orange-50/40";
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
              className={`p-3.5 rounded-2xl border-2 text-sm font-semibold transition-all duration-150 flex items-center justify-between cursor-pointer ${style}`}
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
