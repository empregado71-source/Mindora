import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Sparkles, RotateCcw, Check, Languages } from 'lucide-react';

interface VocabPair {
  pt: string;
  en: string;
  pronunciation?: string;
}

const VOCAB_DATABASE: VocabPair[] = [
  { pt: "Livro", en: "Book" },
  { pt: "Estrela", en: "Star" },
  { pt: "Conhecimento", en: "Knowledge" },
  { pt: "Cérebro", en: "Brain" },
  { pt: "Desafio", en: "Challenge" },
  { pt: "Sabedoria", en: "Wisdom" }
];

export const VocabMatchGame: React.FC = () => {
  const { addXP, recordGameScore } = useUser();
  const [pairs] = useState<VocabPair[]>(VOCAB_DATABASE);
  const [shuffledPt] = useState<string[]>(() =>
    [...VOCAB_DATABASE.map((p) => p.pt)].sort(() => Math.random() - 0.5)
  );
  const [shuffledEn] = useState<string[]>(() =>
    [...VOCAB_DATABASE.map((p) => p.en)].sort(() => Math.random() - 0.5)
  );

  const [selectedPt, setSelectedPt] = useState<string | null>(null);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [wrongAttempt, setWrongAttempt] = useState<{ pt: string; en: string } | null>(null);
  const [isWon, setIsWon] = useState<boolean>(false);

  const handleSelectPt = (word: string) => {
    if (matchedPairs.includes(word)) return;
    setSelectedPt(word);
    if (selectedEn) {
      checkMatch(word, selectedEn);
    }
  };

  const handleSelectEn = (word: string) => {
    // Find if already matched
    const isMatched = pairs.some((p) => p.en === word && matchedPairs.includes(p.pt));
    if (isMatched) return;

    setSelectedEn(word);
    if (selectedPt) {
      checkMatch(selectedPt, word);
    }
  };

  const checkMatch = (ptWord: string, enWord: string) => {
    const valid = pairs.find((p) => p.pt === ptWord && p.en === enWord);

    if (valid) {
      const nextMatched = [...matchedPairs, ptWord];
      setMatchedPairs(nextMatched);
      setSelectedPt(null);
      setSelectedEn(null);
      setWrongAttempt(null);

      if (nextMatched.length === pairs.length) {
        setIsWon(true);
        addXP(35, "Desafio de Vocabulário Completo");
        recordGameScore('vocab', pairs.length);
      }
    } else {
      setWrongAttempt({ pt: ptWord, en: enWord });
      setTimeout(() => {
        setSelectedPt(null);
        setSelectedEn(null);
        setWrongAttempt(null);
      }, 500);
    }
  };

  const handleRestart = () => {
    setMatchedPairs([]);
    setSelectedPt(null);
    setSelectedEn(null);
    setWrongAttempt(null);
    setIsWon(false);
  };

  if (isWon) {
    return (
      <div className="text-center space-y-5 max-w-sm mx-auto py-6 animate-in fade-in duration-200">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner border border-emerald-200">
          🌐
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800">Conexões Perfeitas!</h3>
          <p className="text-sm text-slate-600">
            Conectaste todos os {pairs.length} pares linguísticos sem falhas!
          </p>
        </div>

        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" /> +35 XP Adicionados ao Teu Perfil
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3.5 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Treinar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-5 text-center">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="text-left flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
            <Languages className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">Associa Português com Inglês</h4>
            <p className="text-[11px] text-slate-400">Vocabulário Internacional</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-200">
          {matchedPairs.length} / {pairs.length} Pares
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Portuguese Column */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block pb-1">
            🇵🇹 Português
          </span>
          {shuffledPt.map((word) => {
            const isMatched = matchedPairs.includes(word);
            const isSelected = selectedPt === word;
            const isWrong = wrongAttempt?.pt === word;

            let style = "bg-white border-slate-200 text-slate-700 hover:border-brand-400 hover:bg-brand-50/50";
            if (isMatched) {
              style = "bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60";
            } else if (isWrong) {
              style = "bg-rose-50 border-rose-400 text-rose-800";
            } else if (isSelected) {
              style = "bg-brand-100 border-brand-500 text-brand-900 ring-2 ring-brand-300 font-bold";
            }

            return (
              <button
                key={word}
                onClick={() => handleSelectPt(word)}
                disabled={isMatched}
                className={`w-full py-3 px-3 rounded-2xl border-2 text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-between cursor-pointer ${style}`}
              >
                <span>{word}</span>
                {isMatched && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* English Column */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block pb-1">
            🇬🇧 Inglês
          </span>
          {shuffledEn.map((word) => {
            const isMatched = pairs.some((p) => p.en === word && matchedPairs.includes(p.pt));
            const isSelected = selectedEn === word;
            const isWrong = wrongAttempt?.en === word;

            let style = "bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50/50";
            if (isMatched) {
              style = "bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60";
            } else if (isWrong) {
              style = "bg-rose-50 border-rose-400 text-rose-800";
            } else if (isSelected) {
              style = "bg-sky-100 border-sky-500 text-sky-900 ring-2 ring-sky-300 font-bold";
            }

            return (
              <button
                key={word}
                onClick={() => handleSelectEn(word)}
                disabled={isMatched}
                className={`w-full py-3 px-3 rounded-2xl border-2 text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-between cursor-pointer ${style}`}
              >
                <span>{word}</span>
                {isMatched && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Clica num termo em português e em seguida na sua correspondência em inglês.
      </p>
    </div>
  );
};
