import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Sparkles, RotateCcw, Check, Search } from 'lucide-react';

interface SelectedCell {
  row: number;
  col: number;
  char: string;
}

const TARGET_WORDS = [
  { word: "LÓGICA", color: "bg-blue-100 text-blue-700 border-blue-300" },
  { word: "ÁTOMO", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
  { word: "REDES", color: "bg-violet-100 text-violet-700 border-violet-300" },
  { word: "DNA", color: "bg-amber-100 text-amber-700 border-amber-300" }
];

// 7x7 grid containing words horizontally & vertically
// Row 0: L Ó G I C A P -> LÓGICA
// Row 1: A T O M O E R -> ÁTOMO (without accent match or with accent)
// Row 2: B R E D E S O -> REDES
// Row 3: X D N A K L T -> DNA
const GRID_LETTERS = [
  ['L', 'Ó', 'G', 'I', 'C', 'A', 'P'],
  ['Á', 'T', 'O', 'M', 'O', 'E', 'R'],
  ['B', 'R', 'E', 'D', 'E', 'S', 'O'],
  ['X', 'D', 'N', 'A', 'K', 'L', 'T'],
  ['P', 'Q', 'W', 'E', 'R', 'T', 'O'],
  ['F', 'I', 'S', 'I', 'C', 'A', 'N'],
  ['C', 'E', 'L', 'U', 'L', 'A', 'S']
];

export const WordSearchGame: React.FC = () => {
  const { addXP, recordGameScore } = useUser();
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [permanentlyMarked, setPermanentlyMarked] = useState<string[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);

  const handleCellClick = (row: number, col: number, char: string) => {
    const key = `${row}-${col}`;
    if (permanentlyMarked.includes(key)) return;

    const exists = selectedCells.find((c) => c.row === row && c.col === col);
    let newSelection: SelectedCell[];

    if (exists) {
      newSelection = selectedCells.filter((c) => !(c.row === row && c.col === col));
    } else {
      newSelection = [...selectedCells, { row, col, char }];
    }

    setSelectedCells(newSelection);

    // Check if the current selection forms one of our target words (or reversed)
    const forwardWord = newSelection.map((c) => c.char).join('');
    const reverseWord = [...newSelection].reverse().map((c) => c.char).join('');

    TARGET_WORDS.forEach(({ word }) => {
      // Allow exact match or accent-normalized match (e.g. ÁTOMO == ATOMO)
      const cleanWord = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const cleanForward = forwardWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const cleanReverse = reverseWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if ((forwardWord === word || cleanForward === cleanWord || reverseWord === word || cleanReverse === cleanWord) && !foundWords.includes(word)) {
        const newFound = [...foundWords, word];
        setFoundWords(newFound);

        const newPermanently = [
          ...permanentlyMarked,
          ...newSelection.map((c) => `${c.row}-${c.col}`)
        ];
        setPermanentlyMarked(newPermanently);
        setSelectedCells([]);

        if (newFound.length === TARGET_WORDS.length) {
          setIsWon(true);
          addXP(40, "Caça às Palavras Científico");
          recordGameScore('words', 4);
        }
      }
    });
  };

  const handleReset = () => {
    setSelectedCells([]);
    setFoundWords([]);
    setPermanentlyMarked([]);
    setIsWon(false);
  };

  if (isWon) {
    return (
      <div className="text-center space-y-5 max-w-sm mx-auto py-6 animate-in fade-in duration-200">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner border border-emerald-200">
          🔍
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800">Visão de Lince!</h3>
          <p className="text-sm text-slate-600">
            Encontraste todas as 4 palavras científicas escondidas na grelha!
          </p>
        </div>

        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" /> +40 XP Adicionados ao Teu Perfil
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3.5 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Jogar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-center space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="text-left">
          <h4 className="font-extrabold text-slate-800 text-sm">Encontra as Palavras Científicas:</h4>
          <p className="text-[11px] text-slate-400">Clica nas letras consecutivas</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-200">
          {foundWords.length} / {TARGET_WORDS.length} Concluídas
        </span>
      </div>

      {/* Target Word Pills */}
      <div className="flex justify-center gap-2 flex-wrap">
        {TARGET_WORDS.map(({ word, color }) => {
          const isDone = foundWords.includes(word);
          return (
            <span
              key={word}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border flex items-center gap-1.5 ${
                isDone
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 line-through opacity-70'
                  : color
              }`}
            >
              {isDone && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              {word}
            </span>
          );
        })}
      </div>

      {/* 7x7 Grid */}
      <div className="inline-grid grid-cols-7 gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-3xl mx-auto shadow-inner">
        {GRID_LETTERS.map((row, r) =>
          row.map((char, c) => {
            const key = `${r}-${c}`;
            const isPermanently = permanentlyMarked.includes(key);
            const isSelected = selectedCells.some((cell) => cell.row === r && cell.col === c);

            return (
              <button
                key={key}
                onClick={() => handleCellClick(r, c, char)}
                disabled={isPermanently}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl text-sm sm:text-base font-extrabold transition-all duration-150 flex items-center justify-center cursor-pointer select-none ${
                  isPermanently
                    ? 'bg-emerald-500 text-white shadow-sm scale-95'
                    : isSelected
                    ? 'bg-brand-600 text-white shadow-md scale-105 ring-2 ring-brand-300'
                    : 'bg-white hover:bg-brand-50 border border-slate-200 text-slate-700 hover:border-brand-400'
                }`}
              >
                {char}
              </button>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>Palavras na horizontal e vertical</span>
        {selectedCells.length > 0 && (
          <button
            onClick={() => setSelectedCells([])}
            className="text-rose-500 hover:underline font-semibold"
          >
            Limpar seleção
          </button>
        )}
      </div>
    </div>
  );
};
