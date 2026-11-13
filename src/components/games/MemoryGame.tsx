import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { Trophy, RotateCcw, Sparkles } from 'lucide-react';

interface CardItem {
  id: number;
  keyId: number;
  label: string;
  sub: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CHEMICAL_PAIRS = [
  { element: "Oxigénio", symbol: "O", desc: "Gás vital da respiração" },
  { element: "Hidrogénio", symbol: "H", desc: "Elemento mais abundante" },
  { element: "Ouro", symbol: "Au", desc: "Metal nobre (Aurum)" },
  { element: "Ferro", symbol: "Fe", desc: "Presente na hemoglobina (Ferrum)" },
  { element: "Carbono", symbol: "C", desc: "Base da química orgânica" },
  { element: "Sódio", symbol: "Na", desc: "Metal alcalino (Natrium)" }
];

export const MemoryGame: React.FC = () => {
  const { addXP, recordGameScore, state } = useUser();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const initGame = () => {
    const deck: CardItem[] = [];
    let idCounter = 0;

    CHEMICAL_PAIRS.forEach((item, index) => {
      deck.push({
        id: idCounter++,
        keyId: index,
        label: item.element,
        sub: item.desc,
        isFlipped: false,
        isMatched: false
      });
      deck.push({
        id: idCounter++,
        keyId: index,
        label: item.symbol,
        sub: "Símbolo Químico",
        isFlipped: false,
        isMatched: false
      });
    });

    deck.sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
    setIsLocked(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.keyId === secondCard.keyId) {
        // Matched!
        setTimeout(() => {
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards([...newCards]);
          setFlippedIndices([]);
          setIsLocked(false);

          const allMatched = newCards.every((c) => c.isMatched);
          if (allMatched) {
            setIsWon(true);
            const xpAward = moves <= 10 ? 50 : 35;
            addXP(xpAward, `Jogo da Memória em ${moves + 1} jogadas`);
            recordGameScore('memory', moves + 1);
          }
        }, 400);
      } else {
        // Not matched
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  if (isWon) {
    const bestMoves = state.highScores.memory;
    return (
      <div className="text-center space-y-5 max-w-sm mx-auto py-6 animate-in fade-in duration-200">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner border border-emerald-200">
          🏆
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800">Memória Científica Perfeita!</h3>
          <p className="text-sm text-slate-600">
            Encontraste todos os 6 pares químicos em{' '}
            <span className="font-extrabold text-brand-600 text-lg">{moves} jogadas</span>.
          </p>
        </div>

        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold rounded-2xl text-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" /> +{moves <= 10 ? 50 : 35} XP Adicionados ao Teu Perfil
        </div>

        <button
          onClick={initGame}
          className="w-full py-3.5 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Jogar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg space-y-5 text-center">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="text-left">
          <h4 className="text-sm font-extrabold text-slate-800">Associa o Elemento ao seu Símbolo</h4>
          <p className="text-[11px] text-slate-400">Tabela Periódica & Química Geral</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-700">
          Jogadas: {moves}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {cards.map((card, idx) => {
          const showContent = card.isFlipped || card.isMatched;
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-300 select-none cursor-pointer border-2 shadow-xs ${
                card.isMatched
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 scale-95 shadow-sm'
                  : showContent
                  ? 'bg-brand-50 border-brand-500 text-brand-900 shadow-md rotate-y-180'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-400 hover:border-brand-300'
              }`}
            >
              {showContent ? (
                <>
                  <span className="font-extrabold text-base sm:text-lg leading-tight line-clamp-1">
                    {card.label}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 line-clamp-1 font-medium">
                    {card.sub}
                  </span>
                </>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-sm">
                  ?
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-400">
        Vira 2 cartas de cada vez para associar os 6 elementos aos respetivos símbolos químicos.
      </p>
    </div>
  );
};
