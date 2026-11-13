import React from 'react';
import { GameType } from '../types';
import { MathChallenge } from '../components/games/MathChallenge';
import { MemoryGame } from '../components/games/MemoryGame';
import { FlashQuiz } from '../components/games/FlashQuiz';
import { WordSearchGame } from '../components/games/WordSearchGame';
import { VocabMatchGame } from '../components/games/VocabMatchGame';
import { TrueFalseGame } from '../components/games/TrueFalseGame';
import { ChemistryGame } from '../components/games/ChemistryGame';
import { GeographyGame } from '../components/games/GeographyGame';
import { HistoryGame } from '../components/games/HistoryGame';
import { LogicChallengeGame } from '../components/games/LogicChallengeGame';

interface GamesViewProps {
  activeGame: GameType;
  onSelectGame: (game: GameType) => void;
}

export const GamesView: React.FC<GamesViewProps> = ({
  activeGame,
  onSelectGame
}) => {
  const gamesList: { id: GameType; icon: string; title: string; desc: string; category: string }[] = [
    { id: 'calc', icon: '⚡', title: 'Cálculo Rápido', desc: 'Matemática contra o tempo', category: 'Exatas' },
    { id: 'memory', icon: '🃏', title: 'Jogo da Memória', desc: 'Pares da tabela periódica', category: 'Ciências' },
    { id: 'flash', icon: '⏱️', title: 'Quiz Relâmpago', desc: '5s por pergunta veloz', category: 'Geral' },
    { id: 'words', icon: '🔎', title: 'Caça às Palavras', desc: 'Descobre termos na matriz', category: 'Ciências' },
    { id: 'vocab', icon: '🌐', title: 'Desafio Vocabulário', desc: 'Pares bilíngues em inglês', category: 'Idiomas' },
    { id: 'truefalse', icon: '🎯', title: 'Verdadeiro ou Falso', desc: 'Avaliação crítica rápida', category: 'Geral' },
    { id: 'chemistry', icon: '🧪', title: 'Desafio de Química', desc: 'Fórmulas e átomos moleculares', category: 'Ciências' },
    { id: 'geography', icon: '🗺️', title: 'Desafio de Geografia', desc: 'Capitais mundiais e relevos', category: 'Humanas' },
    { id: 'history', icon: '🏛️', title: 'Desafio de História', desc: 'Eras e marcos civilizacionais', category: 'Humanas' },
    { id: 'logic', icon: '🧠', title: 'Desafio de Lógica', desc: 'Padrões e enigmas dedutivos', category: 'Exatas' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
          <span>🎮</span> 10 Jogos Educativos 100% Funcionais
        </div>
        <h2 className="text-3xl font-black text-slate-800">Central de Jogos Educativos</h2>
        <p className="text-slate-500 text-sm mt-1">
          Pratica as tuas capacidades cognitivas, memória, velocidade e raciocínio lógico em tempo real. Cada jogo premeia XP para o teu perfil!
        </p>
      </div>

      {/* Grid of 10 Games */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {gamesList.map((g) => {
          const isActive = activeGame === g.id;
          return (
            <button
              key={g.id}
              onClick={() => onSelectGame(g.id)}
              className={`p-4 rounded-3xl text-left transition-all duration-200 cursor-pointer border-2 ${
                isActive
                  ? 'bg-white border-brand-500 shadow-md scale-102 ring-2 ring-brand-100'
                  : 'bg-white border-slate-100 shadow-xs hover:border-brand-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{g.icon}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {g.category}
                </span>
              </div>
              <h4 className="font-extrabold text-slate-800 mt-2 text-sm leading-tight line-clamp-1">
                {g.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                {g.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Game Arena */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl min-h-[460px] flex flex-col justify-center items-center">
        {activeGame === 'calc' && <MathChallenge />}
        {activeGame === 'memory' && <MemoryGame />}
        {activeGame === 'flash' && <FlashQuiz />}
        {activeGame === 'words' && <WordSearchGame />}
        {activeGame === 'vocab' && <VocabMatchGame />}
        {activeGame === 'truefalse' && <TrueFalseGame />}
        {activeGame === 'chemistry' && <ChemistryGame />}
        {activeGame === 'geography' && <GeographyGame />}
        {activeGame === 'history' && <HistoryGame />}
        {activeGame === 'logic' && <LogicChallengeGame />}
      </div>
    </div>
  );
};
