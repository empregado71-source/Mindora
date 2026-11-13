import React, { useState, useEffect } from 'react';
import { Course, CourseLesson, Exercise, ModuleExamResult, ModuleExamReviewItem } from '../types';
import { useUser } from '../context/UserContext';
import { MathTool } from '../components/tools/MathTool';
import { LanguagesTool } from '../components/tools/LanguagesTool';
import { CodeEditorTool } from '../components/tools/CodeEditorTool';
import { DrawingCanvasTool } from '../components/tools/DrawingCanvasTool';
import { ColorPaletteTool } from '../components/tools/ColorPaletteTool';
import { DesignPlaygroundTool } from '../components/tools/DesignPlaygroundTool';
import { PhysicsSimTool } from '../components/tools/PhysicsSimTool';
import { ChemistryTool } from '../components/tools/ChemistryTool';
import { askMindoraAI } from '../services/aiService';
import { MarkdownMessageRenderer } from '../components/MarkdownMessageRenderer';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  Wrench,
  Bot,
  Send,
  HelpCircle,
  Lightbulb,
  FileCheck,
  RotateCcw,
  Clock,
  Compass,
  ArrowLeft,
  X,
  Target,
  AlertTriangle
} from 'lucide-react';

interface CourseStudyRoomProps {
  course: Course;
  onBack: () => void;
}

export const CourseStudyRoom: React.FC<CourseStudyRoomProps> = ({ course, onBack }) => {
  const {
    state,
    recordCompletedLesson,
    recordModuleExamResult,
    calculateLevel
  } = useUser();

  const { title: userLevelTitle } = calculateLevel(state.xp);

  // Active navigation states
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [isExamMode, setIsExamMode] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'tool' | 'ai'>('none');

  // Interactive exercises state for current lesson
  const [exerciseAnswer, setExerciseAnswer] = useState<number | null>(null);
  const [showExerciseExplanation, setShowExerciseExplanation] = useState(false);

  // Comprehension test state
  const [compAnswer, setCompAnswer] = useState<number | null>(null);
  const [showCompExplanation, setShowCompExplanation] = useState(false);

  // Module Exam State
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examResult, setExamResult] = useState<ModuleExamResult | null>(null);

  // In-course AI chat state
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Olá! Estou a acompanhar o teu estudo no curso **${course.title}**. Tens alguma dúvida sobre a matéria ou gostarias de um exemplo adicional?`
    }
  ]);

  const allLessons = course.lessons || [];
  const currentLesson: CourseLesson | undefined = allLessons[selectedLessonIndex];

  // Reset exercise states when lesson changes
  useEffect(() => {
    setExerciseAnswer(null);
    setShowExerciseExplanation(false);
    setCompAnswer(null);
    setShowCompExplanation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedLessonIndex, isExamMode]);

  // Determine practical tool for this course type
  const getToolForCourse = () => {
    const titleLow = course.title.toLowerCase();
    const catLow = course.cat.toLowerCase();

    if (titleLow.includes('matemática') || catLow.includes('exatas')) return 'math';
    if (course.type === 'language' || titleLow.includes('inglês') || titleLow.includes('francês') || titleLow.includes('espanhol')) return 'languages';
    if (course.type === 'tech' || titleLow.includes('web') || titleLow.includes('python') || titleLow.includes('javascript') || titleLow.includes('código')) return 'code';
    if (titleLow.includes('desenho') || titleLow.includes('arte') || titleLow.includes('ilustração')) return 'drawing';
    if (titleLow.includes('cor') || titleLow.includes('pintura') || titleLow.includes('aguarela')) return 'colors';
    if (titleLow.includes('design') || titleLow.includes('layout')) return 'design';
    if (titleLow.includes('física') || titleLow.includes('cinemática')) return 'physics';
    if (titleLow.includes('química') || titleLow.includes('molécula')) return 'chemistry';
    return 'code';
  };

  const courseToolType = getToolForCourse();

  // Handle lesson completion
  const handleCompleteCurrentLesson = () => {
    if (!currentLesson) return;
    recordCompletedLesson(currentLesson.id, course.id, 25);
    if (selectedLessonIndex + 1 < allLessons.length) {
      setSelectedLessonIndex(selectedLessonIndex + 1);
    } else {
      setIsExamMode(true);
    }
  };

  // Generate Module Exam questions dynamically based on course content
  const moduleExamQuestions: Exercise[] = [
    {
      q: `Com base nos conceitos fundamentais de ${course.title}, qual é o princípio orientador ensinado nas lições?`,
      options: [
        `Compreender a estrutura teórica e aplicar em problemas reais passo a passo.`,
        `Memorizar fórmulas sem compreender a sua dedução ou aplicação prática.`,
        `Ignorar os fundamentos e passar logo a aplicações avançadas.`,
        `Utilizar métodos arbitrários sem rigor metodológico.`
      ],
      correct: 0,
      hint: `Pensa na importância de aliar a fundamentação teórica à aplicação concreta.`,
      explanation: `O percurso pedagógico da MINDORA enfatiza o domínio conceitual claro seguido de exemplos do quotidiano e prática orientada.`
    },
    {
      q: `Num exemplo resolvido passo a passo, qual é a primeira etapa metodológica indispensável?`,
      options: [
        `Identificar os dados do problema, a incógnita e as relações conceituais estruturantes.`,
        `Escrever imediatamente o resultado final sem cálculos.`,
        `Alterar aleatoriamente as unidades de medida.`,
        `Desistir ao primeiro obstáculo matemático.`
      ],
      correct: 0,
      hint: `A leitura atenta e a extração organizada dos dados é o alicerce de qualquer resolução.`,
      explanation: `A organização prévia dos dados e a identificação do objetivo evitam erros conceituais e guiam o raciocínio dedutivo.`
    },
    {
      q: `Em termos de aplicação no mundo real, porque é que o domínio desta matéria é relevante para o estudante?`,
      options: [
        `Desenvolve o pensamento crítico, a capacidade analítica e resolve desafios profissionais reais.`,
        `Serve apenas para passar em testes escolares sem utilidade prática.`,
        `Não tem qualquer impacto no mercado de trabalho tecnológico ou científico.`,
        `Substitui completamente a necessidade de cooperação humana.`
      ],
      correct: 0,
      hint: `A educação serve para capacitar o estudante para o seu futuro pessoal e profissional.`,
      explanation: `O conhecimento aprofundado capacita o estudante para criar projetos autênticos, resolver problemas complexos e inovar.`
    }
  ];

  // Submit Exam
  const handleExamSubmit = () => {
    let correctCount = 0;
    const reviewItems: ModuleExamReviewItem[] = moduleExamQuestions.map((q, idx) => {
      const selected = examAnswers[idx] ?? -1;
      const isCorrect = selected === q.correct;
      if (isCorrect) correctCount++;
      return {
        question: q.q,
        options: q.options,
        selectedOption: selected,
        correctOption: q.correct,
        explanation: q.explanation || 'Reveja a fundamentação teórica nas lições anteriores.',
        needsReview: !isCorrect
      };
    });

    const percentage = Math.round((correctCount / moduleExamQuestions.length) * 100);
    const passed = percentage >= 66;

    const result: ModuleExamResult = {
      id: `exam_${course.id}_${Date.now()}`,
      moduleId: `mod_${course.id}_final`,
      courseId: course.id,
      moduleTitle: `Prova Final de Módulo: ${course.title}`,
      score: correctCount,
      totalQuestions: moduleExamQuestions.length,
      percentage,
      passed,
      completedAt: new Date().toISOString(),
      reviewItems
    };

    setExamResult(result);
    setExamSubmitted(true);
    recordModuleExamResult(result);
  };

  const handleRetakeExam = () => {
    setExamAnswers({});
    setExamSubmitted(false);
    setExamResult(null);
  };

  // In-course AI Ask
  const handleSendAi = async () => {
    const query = aiInput.trim();
    if (!query || aiLoading) return;

    setAiMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setAiInput('');
    setAiLoading(true);

    try {
      const reply = await askMindoraAI(
        `[Contexto do Curso: ${course.title} | Lição Atual: ${currentLesson?.title || 'Geral'}]\n${query}`,
        [],
        userLevelTitle
      );
      setAiMessages((prev) => [...prev, { sender: 'assistant', text: reply }]);
    } catch {
      setAiMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: 'Não foi possível contactar o tutor de momento. Tenta de novo!' }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const completedCount = allLessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
  const progressPercent = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col -m-4 sm:-m-8 animate-in fade-in duration-150">
      {/* Top Study Room Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar aos Cursos</span>
          </button>
          <div className="h-5 w-px bg-slate-200 hidden sm:block" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block">
              {course.cat} • {course.level}
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate max-w-xs sm:max-w-md">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Action drawers triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDrawer(activeDrawer === 'tool' ? 'none' : 'tool')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeDrawer === 'tool'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
            title="Abrir Ferramenta Prática do Curso"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Ferramenta Prática</span>
          </button>

          <button
            onClick={() => setActiveDrawer(activeDrawer === 'ai' ? 'none' : 'ai')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeDrawer === 'ai'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-brand-50 text-brand-800 hover:bg-brand-100 border border-brand-200'
            }`}
            title="Tirar Dúvida com MINDORA AI"
          >
            <Bot className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden md:inline">Tirar Dúvida (IA)</span>
          </button>
        </div>
      </div>

      {/* Main Room Layout: Left Syllabus + Center Study Stage */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* LEFT SYLLABUS SIDEBAR */}
        <div className="w-full lg:w-72 shrink-0 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-slate-500">Progresso do Curso</span>
                <span className="text-brand-600 font-black">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Plano de Lições ({allLessons.length})
              </span>
              <div className="space-y-1.5">
                {allLessons.map((les, idx) => {
                  const isCurrent = !isExamMode && selectedLessonIndex === idx;
                  const isDone = state.completedLessonIds.includes(les.id);

                  return (
                    <button
                      key={les.id}
                      onClick={() => {
                        setIsExamMode(false);
                        setSelectedLessonIndex(idx);
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition cursor-pointer flex items-center justify-between gap-2 text-xs ${
                        isCurrent
                          ? 'bg-brand-600 text-white font-bold shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="opacity-70 font-mono text-[11px] shrink-0">{idx + 1}.</span>
                        <span className="truncate">{les.title}</span>
                      </div>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Module Final Exam Entry */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsExamMode(true)}
                className={`w-full p-3 rounded-2xl transition cursor-pointer flex items-center justify-between text-xs font-bold ${
                  isExamMode
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-600" />
                  <span>Prova Final do Módulo</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-amber-900 font-extrabold shadow-2xs">
                  Avaliação
                </span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center border-t border-slate-100 pt-3">
            MINDORA Pedagogical Core • Ensino Sequencial
          </div>
        </div>

        {/* CENTER STUDY STAGE */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          {/* REGULAR LESSON MODE */}
          {!isExamMode && currentLesson && (
            <div className="space-y-8">
              {/* 1. Header & Objectives */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
                    Lição {selectedLessonIndex + 1} de {allLessons.length}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {currentLesson.duration} de estudo guiado
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentLesson.title}
                </h1>

                {/* Objectives Pill */}
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1.5">
                  <span className="text-xs font-black uppercase text-sky-800 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-sky-600" /> Objetivos Pedagógicos desta Lição:
                  </span>
                  <p className="text-xs text-sky-950 leading-relaxed font-medium">
                    Compreender os fundamentos teóricos, analisar demonstrações práticas e resolver exercícios orientados passo a passo.
                  </p>
                </div>
              </div>

              {/* 2. Detailed Pedagogical Explanation */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-5 bg-brand-600 rounded-full inline-block" />
                  <span>1. Explicação Aprofundada da Matéria</span>
                </h3>

                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 font-normal">
                  <p>{currentLesson.content}</p>

                  {currentLesson.grammarTip && (
                    <div className="p-3.5 rounded-xl bg-brand-100/60 text-brand-950 font-medium text-xs border border-brand-200">
                      💡 <strong>Dica Estruturante:</strong> {currentLesson.grammarTip}
                    </div>
                  )}

                  {/* Vocabulary if language */}
                  {currentLesson.vocabulary && currentLesson.vocabulary.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <span className="text-xs font-bold text-slate-700 block">Vocabulário & Pronúncia Fonética:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentLesson.vocabulary.map((v, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-slate-900 block text-xs">{v.word}</span>
                              <span className="text-[11px] text-slate-500">{v.translation}</span>
                            </div>
                            {v.phonetic && <span className="font-mono text-[10px] text-brand-600">{v.phonetic}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Practical Examples & Demonstrations */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-5 bg-emerald-600 rounded-full inline-block" />
                  <span>2. Exemplos Práticos & Aplicação Quotidiana</span>
                </h3>

                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm text-emerald-950 leading-relaxed space-y-2">
                  <p className="font-medium">
                    Na prática real, este conhecimento permite modelar situações reais e tomar decisões fundamentadas.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-emerald-100 text-xs text-slate-700">
                    <strong>Caso Real:</strong> Quando aplicamos esta regra, conseguimos reduzir erros lógicos e garantir que o resultado cumpre os padrões esperados da indústria ou da comunicação.
                  </div>
                </div>
              </div>

              {/* 4. Solved Step-by-Step Example */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-5 bg-amber-500 rounded-full inline-block" />
                  <span>3. Exemplo Resolvido Passo a Passo</span>
                </h3>

                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3 text-xs sm:text-sm text-slate-800">
                  <div className="font-bold text-amber-900">
                    Problema Demonstrativo: Como proceder do início ao fim?
                  </div>
                  <div className="space-y-1.5 pl-2">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-black flex items-center justify-center shrink-0">1</span>
                      <span>Analisar os requisitos e estabelecer os dados iniciais.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-black flex items-center justify-center shrink-0">2</span>
                      <span>Aplicar a relação fundamental com rigor passo a passo.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-black flex items-center justify-center shrink-0">3</span>
                      <span>Validar o resultado final através da prova de consistência.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Summary */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-5 bg-sky-600 rounded-full inline-block" />
                  <span>4. Resumo da Lição</span>
                </h3>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p>• A compreensão conceitual precede sempre a resolução de exercícios.</p>
                  <p>• O raciocínio estruturado passo a passo garante solidez na retenção de memória de longo prazo.</p>
                </div>
              </div>

              {/* 6. Learning Exercise (Only After Teaching) */}
              {currentLesson.exercise && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span>5. Exercício Prático de Aprendizagem</span>
                  </h3>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      {currentLesson.exercise.question}
                    </p>

                    <div className="space-y-2">
                      {currentLesson.exercise.options.map((opt, i) => {
                        const isSelected = exerciseAnswer === i;
                        const isCorrect = i === currentLesson.exercise.correct;

                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setExerciseAnswer(i);
                              setShowExerciseExplanation(true);
                            }}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                              showExerciseExplanation
                                ? isCorrect
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                  : isSelected
                                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 opacity-60'
                                : isSelected
                                ? 'bg-brand-50 border-brand-500 text-brand-900'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{opt}</span>
                            {showExerciseExplanation && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showExerciseExplanation && (
                      <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-700 space-y-1">
                        <span className="font-bold text-slate-900 block">Explicação da Resposta:</span>
                        <p>{currentLesson.exercise.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Advance Button */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedLessonIndex(Math.max(0, selectedLessonIndex - 1))}
                  disabled={selectedLessonIndex === 0}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs disabled:opacity-30 transition cursor-pointer"
                >
                  Lição Anterior
                </button>

                <button
                  onClick={handleCompleteCurrentLesson}
                  className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-md shadow-brand-500/20 cursor-pointer active:scale-95"
                >
                  <span>Concluir Lição & Avançar (+25 XP)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* FINAL MODULE EXAMINATION MODE */}
          {isExamMode && (
            <div className="space-y-8 animate-in fade-in">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase text-amber-700 tracking-wider block">
                    Avaliação Formal de Mestria
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">
                    Prova Final do Módulo: {course.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Esta prova avalia rigorosamente os conteúdos lecionados. Nota mínima para aprovação: 66%.
                  </p>
                </div>
              </div>

              {!examSubmitted ? (
                <div className="space-y-6">
                  {moduleExamQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <span className="text-xs font-black text-brand-600 uppercase">
                        Pergunta {qIdx + 1} de {moduleExamQuestions.length}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{q.q}</h4>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = examAnswers[qIdx] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => setExamAnswers({ ...examAnswers, [qIdx]: optIdx })}
                              className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                              }`}
                            >
                              <span>{opt}</span>
                              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-brand-600 bg-brand-600' : 'border-slate-300'
                              }`}>
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleExamSubmit}
                      disabled={Object.keys(examAnswers).length < moduleExamQuestions.length}
                      className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm disabled:opacity-40 transition shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      Submeter Prova para Correção Automática
                    </button>
                  </div>
                </div>
              ) : (
                /* EXAM RESULTS REPORT */
                examResult && (
                  <div className="space-y-6">
                    {/* Score banner */}
                    <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      examResult.passed ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950'
                    }`}>
                      <div className="space-y-1 text-center sm:text-left">
                        <span className="text-xs font-black uppercase tracking-wider block">
                          {examResult.passed ? '🎉 Aprovado com Sucesso!' : '⚠️ Necessita de Revisão'}
                        </span>
                        <h3 className="text-2xl font-black">
                          Nota Obtida: {examResult.percentage}% ({examResult.score}/{examResult.totalQuestions} Corretas)
                        </h3>
                        <p className="text-xs opacity-90 max-w-md">
                          {examResult.passed
                            ? 'Parabéns! O teu progresso foi gravado e ganhaste pontos de experiência.'
                            : 'Ainda não atingiste a nota mínima. Analisa os erros abaixo e podes repetir a prova!'}
                        </p>
                      </div>

                      <button
                        onClick={handleRetakeExam}
                        className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition shadow-xs cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" /> Repetir Prova
                      </button>
                    </div>

                    {/* Detailed Review Breakdown */}
                    <div className="space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Correção Detalhada & Explicação Pedagógica:
                      </h4>

                      <div className="space-y-4">
                        {examResult.reviewItems.map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-5 rounded-2xl border ${
                              item.needsReview ? 'bg-rose-50/50 border-rose-200' : 'bg-emerald-50/40 border-emerald-200'
                            } space-y-2.5`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-600">Pergunta {idx + 1}</span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                item.needsReview ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {item.needsReview ? 'Incorreta' : 'Correta'}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-slate-900">{item.question}</p>

                            <div className="text-xs space-y-1">
                              <div className="text-slate-600">
                                A tua resposta: <strong>{item.options[item.selectedOption] || 'Não respondida'}</strong>
                              </div>
                              {item.needsReview && (
                                <div className="text-emerald-700 font-bold">
                                  Resposta correta: {item.options[item.correctOption]}
                                </div>
                              )}
                            </div>

                            <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-700">
                              <strong className="text-slate-900">Explicação:</strong> {item.explanation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* DRAWER: PRACTICAL TOOL */}
      {activeDrawer === 'tool' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-4 border border-slate-200 shadow-2xl custom-scrollbar flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Ferramenta Prática do Curso</h3>
              </div>
              <button
                onClick={() => setActiveDrawer('none')}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-2">
              {courseToolType === 'math' && <MathTool />}
              {courseToolType === 'languages' && <LanguagesTool />}
              {courseToolType === 'code' && <CodeEditorTool />}
              {courseToolType === 'drawing' && <DrawingCanvasTool />}
              {courseToolType === 'colors' && <ColorPaletteTool />}
              {courseToolType === 'design' && <DesignPlaygroundTool />}
              {courseToolType === 'physics' && <PhysicsSimTool />}
              {courseToolType === 'chemistry' && <ChemistryTool />}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveDrawer('none')}
                className="px-5 py-2 rounded-xl bg-slate-100 font-bold text-xs text-slate-700 hover:bg-slate-200"
              >
                Voltar à Lição
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DRAWER: IN-COURSE MINDORA AI */}
      {activeDrawer === 'ai' && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-brand-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <h4 className="font-bold text-xs">MINDORA AI • Tutora em Tempo Real</h4>
                <p className="text-[10px] text-brand-100">Curso: {course.title}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveDrawer('none')}
              className="p-1 rounded-lg hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar text-xs">
            {aiMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-tr-xs'
                      : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  <MarkdownMessageRenderer content={msg.text} isUser={msg.sender === 'user'} />
                </div>
              </div>
            ))}
            {aiLoading && (
              <div className="text-[11px] text-slate-400 italic">MINDORA AI está a responder...</div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendAi();
            }}
            className="p-3 border-t border-slate-100 flex gap-2"
          >
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Pergunta sobre esta lição..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
            />
            <button
              type="submit"
              disabled={!aiInput.trim() || aiLoading}
              className="p-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
