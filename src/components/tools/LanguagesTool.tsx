import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, XCircle, RotateCcw, Languages, ChevronRight, ChevronLeft } from 'lucide-react';

interface Flashcard {
  id: string;
  lang: 'en' | 'fr' | 'es' | 'de';
  word: string;
  translation: string;
  phonetic: string;
  example: string;
  exampleTrans: string;
}

const CARDS_DATABASE: Flashcard[] = [
  // English
  { id: 'en-1', lang: 'en', word: 'Knowledge', translation: 'Conhecimento / Sabedoria', phonetic: '/ˈnɑː.lɪdʒ/', example: 'Knowledge is power.', exampleTrans: 'O conhecimento é poder.' },
  { id: 'en-2', lang: 'en', word: 'Challenge', translation: 'Desafio', phonetic: '/ˈtʃæl.ɪndʒ/', example: 'Every challenge is an opportunity to learn.', exampleTrans: 'Cada desafio é uma oportunidade para aprender.' },
  { id: 'en-3', lang: 'en', word: 'Achievement', translation: 'Conquista / Realização', phonetic: '/əˈtʃiːv.mənt/', example: 'Hard work leads to great achievements.', exampleTrans: 'O trabalho árduo leva a grandes conquistas.' },
  { id: 'en-4', lang: 'en', word: 'Breakthrough', translation: 'Avanço decisivo / Descoberta', phonetic: '/ˈbreɪk.θruː/', example: 'A major scientific breakthrough was announced.', exampleTrans: 'Foi anunciado um grande avanço científico.' },
  
  // French
  { id: 'fr-1', lang: 'fr', word: 'Enchanté', translation: 'Muito prazer / Encantado', phonetic: '/ɑ̃.ʃɑ̃.te/', example: 'Enchanté de faire votre connaissance.', exampleTrans: 'Muito prazer em conhecê-lo.' },
  { id: 'fr-2', lang: 'fr', word: 'Apprentissage', translation: 'Aprendizagem', phonetic: '/a.pʁɑ̃.ti.saʒ/', example: 'L’apprentissage est un voyage continu.', exampleTrans: 'A aprendizagem é uma viagem contínua.' },
  { id: 'fr-3', lang: 'fr', word: 'Réussite', translation: 'Sucesso / Êxito', phonetic: '/ʁe.y.sit/', example: 'La persévérance est la clé de la réussite.', exampleTrans: 'A perseverança é a chave do sucesso.' },
  
  // Spanish
  { id: 'es-1', lang: 'es', word: 'Desarrollo', translation: 'Desenvolvimento', phonetic: '/de.saˈro.ʎo/', example: 'El desarrollo de nuevas habilidades abre puertas.', exampleTrans: 'O desenvolvimento de novas competências abre portas.' },
  { id: 'es-2', lang: 'es', word: 'Pensamiento', translation: 'Pensamento / Raciocínio', phonetic: '/pen.saˈmjen.to/', example: 'El pensamiento crítico es indispensable.', exampleTrans: 'O pensamento crítico é indispensável.' },
  { id: 'es-3', lang: 'es', word: 'Superación', translation: 'Superação', phonetic: '/su.pe.ɾaˈsjon/', example: 'Cada día es una oportunidad de superación.', exampleTrans: 'Cada dia é uma oportunidade de superação.' }
];

interface SentencePuzzle {
  id: string;
  targetLang: 'en' | 'fr' | 'es';
  portuguese: string;
  words: string[];
  correctOrder: string[];
}

const PUZZLES: SentencePuzzle[] = [
  {
    id: 'p-1',
    targetLang: 'en',
    portuguese: 'Eu sou um estudante dedicado na Mindora.',
    words: ['a', 'I', 'Mindora', 'student', 'am', 'dedicated', 'at'],
    correctOrder: ['I', 'am', 'a', 'dedicated', 'student', 'at', 'Mindora']
  },
  {
    id: 'p-2',
    targetLang: 'fr',
    portuguese: 'O conhecimento transforma o nosso futuro.',
    words: ['notre', 'La', 'connaissance', 'avenir', 'transforme'],
    correctOrder: ['La', 'connaissance', 'transforme', 'notre', 'avenir']
  },
  {
    id: 'p-3',
    targetLang: 'es',
    portuguese: 'Aprender idiomas abre muitas oportunidades.',
    words: ['idiomas', 'Aprender', 'muchas', 'abre', 'oportunidades'],
    correctOrder: ['Aprender', 'idiomas', 'abre', 'muchas', 'oportunidades']
  }
];

export const LanguagesTool: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'en' | 'fr' | 'es'>('en');
  const [activeMode, setActiveMode] = useState<'flashcards' | 'sentence'>('flashcards');

  // Flashcard state
  const filteredCards = CARDS_DATABASE.filter((c) => c.lang === activeLang);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Sentence puzzle state
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const currentPuzzle = PUZZLES[puzzleIndex % PUZZLES.length];
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [puzzleFeedback, setPuzzleFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentCard = filteredCards[cardIndex % filteredCards.length];

  const handleSpeak = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode === 'en' ? 'en-US' : langCode === 'fr' ? 'fr-FR' : 'es-ES';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleAddWordToSentence = (word: string) => {
    if (selectedWords.includes(word)) return;
    const next = [...selectedWords, word];
    setSelectedWords(next);

    if (next.length === currentPuzzle.correctOrder.length) {
      const isCorrect = next.every((w, i) => w === currentPuzzle.correctOrder[i]);
      setPuzzleFeedback(isCorrect ? 'correct' : 'wrong');
      if (isCorrect) {
        handleSpeak(next.join(' '), currentPuzzle.targetLang);
      }
    }
  };

  const handleRemoveWordFromSentence = (index: number) => {
    const next = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(next);
    setPuzzleFeedback(null);
  };

  const handleResetPuzzle = () => {
    setSelectedWords([]);
    setPuzzleFeedback(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shadow-xs">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Treinador de Idiomas & Pronúncia</h3>
            <p className="text-xs text-slate-500">Flashcards Interativos com Áudio & Construtor de Frases</p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
          {[
            { id: 'en', label: '🇬🇧 Inglês' },
            { id: 'fr', label: '🇫🇷 Francês' },
            { id: 'es', label: '🇪🇸 Espanhol' }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setActiveLang(l.id as any);
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeLang === l.id ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveMode('flashcards')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeMode === 'flashcards'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          Flashcards com Pronúncia
        </button>
        <button
          onClick={() => {
            setActiveMode('sentence');
            handleResetPuzzle();
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeMode === 'sentence'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          Construtor de Frases Gramaticais
        </button>
      </div>

      {/* FLASHCARDS VIEW */}
      {activeMode === 'flashcards' && currentCard && (
        <div className="max-w-md mx-auto space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[220px] p-6 rounded-3xl border-2 border-dashed border-sky-300 bg-gradient-to-br from-sky-50/70 to-blue-50/50 hover:bg-sky-50 transition cursor-pointer flex flex-col justify-between shadow-xs select-none relative group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Cartão {cardIndex + 1} de {filteredCards.length}</span>
              <span className="text-[11px] text-sky-600 font-bold bg-white px-2.5 py-0.5 rounded-full shadow-2xs">
                {isFlipped ? 'Verso (Tradução)' : 'Frente (Clica para virar)'}
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              {!isFlipped ? (
                <>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {currentCard.word}
                  </h4>
                  <div className="text-xs text-sky-600 font-mono">{currentCard.phonetic}</div>
                </>
              ) : (
                <>
                  <h4 className="text-xl sm:text-2xl font-black text-emerald-800 tracking-tight">
                    {currentCard.translation}
                  </h4>
                  <p className="text-xs text-slate-600 italic pt-2">"{currentCard.example}"</p>
                  <p className="text-[11px] text-slate-500 font-medium">({currentCard.exampleTrans})</p>
                </>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(currentCard.word, currentCard.lang);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-sky-700 hover:bg-sky-100 text-xs font-bold transition shadow-xs cursor-pointer"
                title="Ouvir pronúncia falada"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Ouvir Pronúncia</span>
              </button>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                MINDORA VOCAB
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrevCard}
              className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="py-2.5 px-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Virar
            </button>
            <button
              onClick={handleNextCard}
              className="flex-1 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              Próximo <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SENTENCE BUILDER PUZZLE */}
      {activeMode === 'sentence' && (
        <div className="max-w-xl mx-auto space-y-5">
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
            <span className="text-xs font-extrabold uppercase text-sky-700">Frase em Português para Montar:</span>
            <p className="text-sm font-bold text-slate-800">"{currentPuzzle.portuguese}"</p>
          </div>

          {/* Answer Dropzone */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 min-h-[70px] flex flex-wrap items-center gap-2">
            {selectedWords.length === 0 ? (
              <span className="text-xs text-slate-400 font-medium italic">
                Clica nas palavras abaixo pela ordem correta...
              </span>
            ) : (
              selectedWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWordFromSentence(idx)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-sky-200 text-sky-900 font-bold text-xs shadow-xs hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 transition cursor-pointer flex items-center gap-1"
                >
                  <span>{word}</span>
                  <span className="text-[10px] text-slate-400">×</span>
                </button>
              ))
            )}
          </div>

          {/* Feedback */}
          {puzzleFeedback === 'correct' && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Excelente! Frase 100% correta!</span>
              </div>
              <button
                onClick={() => {
                  setPuzzleIndex((prev) => prev + 1);
                  handleResetPuzzle();
                }}
                className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
              >
                Próxima Frase
              </button>
            </div>
          )}

          {puzzleFeedback === 'wrong' && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 font-bold text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>A ordem ainda não está correta. Tenta de novo!</span>
              </div>
              <button
                onClick={handleResetPuzzle}
                className="px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition cursor-pointer"
              >
                Recomeçar
              </button>
            </div>
          )}

          {/* Word Bank */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500">Banco de Palavras:</span>
            <div className="flex flex-wrap gap-2">
              {currentPuzzle.words.map((word, i) => {
                const used = selectedWords.includes(word);
                return (
                  <button
                    key={i}
                    onClick={() => handleAddWordToSentence(word)}
                    disabled={used}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      used
                        ? 'opacity-30 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white border border-slate-200 text-slate-800 hover:border-sky-400 hover:text-sky-700 shadow-2xs active:scale-95'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
