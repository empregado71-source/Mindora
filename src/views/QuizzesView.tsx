import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { QUIZ_BANK } from '../data/learningData';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Sliders,
  History,
  Award
} from 'lucide-react';

export const QuizzesView: React.FC = () => {
  const { recordQuizResult, state } = useUser();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'Iniciante' | 'Intermédio' | 'Avançado'>('Iniciante');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [viewMode, setViewMode] = useState<'hub' | 'history'>('hub');

  // Active quiz state
  const [activeQuestions, setActiveQuestions] = useState<{ q: string; ops: string[]; cor: number; explanation: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const availableThemes = Object.keys(QUIZ_BANK);

  const handleStartQuiz = (theme: string) => {
    setSelectedTheme(theme);
    const bank = QUIZ_BANK[theme] || [];
    // Shuffle and pick requested count
    const pool = [...bank].sort(() => Math.random() - 0.5);
    const selectedList = pool.slice(0, Math.min(questionCount, pool.length));

    setActiveQuestions(selectedList);
    setCurrentIndex(0);
    setUserScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const currentQ = activeQuestions[currentIndex];
    if (idx === currentQ.cor) {
      setUserScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
      const earnedXP = userScore * 15;
      if (selectedTheme) {
        recordQuizResult({
          theme: selectedTheme,
          difficulty,
          score: userScore,
          totalQuestions: activeQuestions.length,
          dateFormatted: 'Hoje',
          xpEarned: earnedXP
        });
      }
    }
  };

  const handleResetHub = () => {
    setSelectedTheme(null);
    setCurrentIndex(0);
    setUserScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-brand-600" /> Centro de Avaliação Pedagógica
          </div>
          <h2 className="text-3xl font-black text-slate-800">Quizzes & Testes de Aferição</h2>
          <p className="text-slate-500 text-sm mt-1">
            Escolhe a matéria, o nível e a quantidade de questões. Correção instantânea com explicação de erros e acertos.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('hub')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'hub' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            <Sliders className="w-4 h-4" /> Configurar Teste
          </button>
          <button
            onClick={() => setViewMode('history')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'history' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            <History className="w-4 h-4" /> Histórico ({state.quizHistory?.length || 0})
          </button>
        </div>
      </div>

      {viewMode === 'history' ? (
        /* History View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm max-w-3xl mx-auto space-y-4">
          <h3 className="text-lg font-black text-slate-800">Histórico de Avaliações Realizadas</h3>
          {state.quizHistory && state.quizHistory.length > 0 ? (
            <div className="space-y-3">
              {state.quizHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-extrabold text-slate-800 text-sm">{item.theme}</span>
                    <div className="text-xs text-slate-400">
                      Nível: {item.difficulty} • {item.dateFormatted}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-brand-600">
                      {item.score} / {item.totalQuestions} Acertos
                    </div>
                    <span className="text-xs text-emerald-600 font-bold">+{item.xpEarned} XP</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Ainda não realizaste nenhum teste. Escolhe um tema para começar!
            </div>
          )}
        </div>
      ) : (
        /* Quiz Arena */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6">
          {/* State 1: Choose category & settings */}
          {!selectedTheme && (
            <div className="space-y-6">
              {/* Parameters */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Dificuldade do Teste:
                    </label>
                    <div className="flex gap-2">
                      {(['Iniciante', 'Intermédio', 'Avançado'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setDifficulty(lvl)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                            difficulty === lvl
                              ? 'bg-brand-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Quantidade de Questões:
                    </label>
                    <div className="flex gap-2">
                      {[3, 5, 10].map((count) => (
                        <button
                          key={count}
                          onClick={() => setQuestionCount(count)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                            questionCount === count
                              ? 'bg-brand-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {count} Perguntas
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-black text-slate-800">
                Escolhe o tema para iniciar a avaliação:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {availableThemes.map((theme) => (
                  <div
                    key={theme}
                    onClick={() => handleStartQuiz(theme)}
                    className="p-5 rounded-3xl bg-slate-50 hover:bg-brand-50/70 border border-slate-200/80 hover:border-brand-300 transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                  >
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-base group-hover:text-brand-600 transition-colors">
                        {theme}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {QUIZ_BANK[theme].length} Questões no banco • {difficulty}
                      </p>
                    </div>
                    <span className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center text-brand-600 font-bold group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* State 2: Active question */}
          {selectedTheme && !isFinished && activeQuestions.length > 0 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider text-brand-600">
                  {selectedTheme} • Nível {difficulty}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Pergunta {currentIndex + 1} de {activeQuestions.length}
                </span>
              </div>

              {/* Question text */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-snug">
                  {activeQuestions[currentIndex].q}
                </h3>
                <p className="text-xs text-slate-400">
                  Seleciona a opção que consideras exata:
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {activeQuestions[currentIndex].ops.map((op, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === activeQuestions[currentIndex].cor;

                  let optClass = "bg-white border-slate-200 text-slate-700 hover:border-brand-400 hover:bg-brand-50/50";
                  if (selectedAnswer !== null) {
                    if (isCorrect) optClass = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                    else if (isSelected) optClass = "bg-rose-50 border-rose-500 text-rose-800 font-bold";
                    else optClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 rounded-2xl border-2 text-sm font-semibold text-left transition flex items-center justify-between cursor-pointer ${optClass}`}
                    >
                      <span>{op}</span>
                      {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {selectedAnswer !== null && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-rose-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation of Why it's correct / wrong */}
              {selectedAnswer !== null && (
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm font-medium border animate-in fade-in duration-150 ${
                    selectedAnswer === activeQuestions[currentIndex].cor
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  <div className="font-black mb-1">
                    {selectedAnswer === activeQuestions[currentIndex].cor
                      ? '✨ Resposta Correta! Excelente raciocínio.'
                      : `❌ Incorreto. A resposta exata era: "${activeQuestions[currentIndex].ops[activeQuestions[currentIndex].cor]}".`}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                    <strong>Explicação Pedagógica:</strong> {activeQuestions[currentIndex].explanation}
                  </div>
                </div>
              )}

              {/* Next button */}
              {selectedAnswer !== null && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 cursor-pointer flex items-center gap-2"
                  >
                    {currentIndex + 1 < activeQuestions.length ? 'Próxima Questão' : 'Ver Resultado Final'}{' '}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* State 3: Final Results */}
          {isFinished && (
            <div className="text-center py-8 space-y-6 animate-in fade-in duration-200">
              <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-inner border border-brand-200">
                🎉
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800">
                  Avaliação Concluída!
                </h3>
                <p className="text-slate-600 font-medium text-sm">
                  Acertaste <span className="font-black text-brand-600">{userScore}</span> de{' '}
                  <span className="font-bold">{activeQuestions.length}</span> questões em {selectedTheme}.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 font-extrabold inline-flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" /> +{userScore * 15} XP Guardados no Teu Histórico
              </div>

              <div>
                <button
                  onClick={handleResetHub}
                  className="px-8 py-3.5 rounded-2xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition shadow-lg shadow-brand-500/25 cursor-pointer flex items-center justify-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-4 h-4" /> Fazer Outro Teste
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
