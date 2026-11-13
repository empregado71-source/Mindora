import React, { useState } from 'react';
import { Subject, CurriculumModule, CurriculumUnit, CurriculumLesson, Exercise } from '../types';
import { useUser } from '../context/UserContext';
import {
  X,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Target,
  FileCode,
  Tag,
  Layers,
  ChevronRight,
  Clock,
  Award,
  CheckCircle,
  PlayCircle,
  FileText
} from 'lucide-react';

interface SubjectModalProps {
  subject: Subject | null;
  onClose: () => void;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({ subject, onClose }) => {
  const { recordCompletedExercise, addXP, state } = useUser();
  const [activeTab, setActiveTab] = useState<'curriculo' | 'visao_geral' | 'avaliacoes'>('curriculo');
  
  // Navigation inside Curriculum Hierarchy
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<CurriculumLesson | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<{ title: string; questions: Exercise[] } | null>(null);

  // Exercise states for interactive question in overview
  const [overviewSelectedAnswer, setOverviewSelectedAnswer] = useState<number | null>(null);
  const [overviewFeedback, setOverviewFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Lesson interactive exercise states
  const [lessonAnswers, setLessonAnswers] = useState<{ [qIdx: number]: number }>({});
  const [lessonFeedback, setLessonFeedback] = useState<{ [qIdx: number]: boolean }>({});
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  if (!subject) return null;

  const modules = subject.modules || [];
  const finalAssessments = subject.finalAssessments || [];

  // Calculate subject progress statistics
  const totalModulesCount = modules.length;
  const totalUnitsCount = modules.reduce((acc, m) => acc + m.units.length, 0);
  const totalLessonsCount = modules.reduce((acc, m) => acc + m.units.reduce((uAcc, u) => uAcc + u.lessons.length, 0), 0);

  const completedLessonsCount = modules.reduce((acc, m) => {
    return acc + m.units.reduce((uAcc, u) => {
      return uAcc + u.lessons.filter((l) => state.completedExercises.includes(`lesson-${l.id}`)).length;
    }, 0);
  }, 0);

  const progressPercentage = totalLessonsCount > 0
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
    : 0;

  const handleOverviewExercise = (idx: number) => {
    setOverviewSelectedAnswer(idx);
    if (idx === subject.exercise.correct) {
      setOverviewFeedback({
        isCorrect: true,
        message: `✅ Resposta Correta! ${subject.exercise.explanation || 'Parabéns pelo raciocínio.'}`
      });
      const exId = `subject-${subject.id}`;
      if (!state.completedExercises.includes(exId)) {
        recordCompletedExercise(exId, 15);
      }
    } else {
      setOverviewFeedback({
        isCorrect: false,
        message: `❌ Incorreto. Dica: ${subject.exercise.hint}`
      });
    }
  };

  const handleLessonOptionSelect = (qIdx: number, optIdx: number, correctIdx: number, explanation?: string) => {
    setLessonAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    setLessonFeedback((prev) => ({ ...prev, [qIdx]: isCorrect }));
    if (isCorrect && selectedLesson) {
      const lessonExId = `lesson-q-${selectedLesson.id}-${qIdx}`;
      if (!state.completedExercises.includes(lessonExId)) {
        recordCompletedExercise(lessonExId, 10);
      }
    }
  };

  const handleCompleteFullLesson = (lesson: CurriculumLesson) => {
    const lId = `lesson-${lesson.id}`;
    if (!state.completedExercises.includes(lId)) {
      recordCompletedExercise(lId, 30);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white flex items-center justify-center text-3xl font-black shadow-md">
              {subject.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {subject.name}
                </h3>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${subject.badgeColor}`}>
                  {subject.level}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                  {subject.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Currículo Estruturado: {totalModulesCount > 0 ? `${totalModulesCount} Módulos • ${totalUnitsCount} Unidades • ${totalLessonsCount} Lições` : `${subject.topics.length} Módulos`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
            aria-label="Fechar Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Global Progress Bar for Subject */}
        {totalModulesCount > 0 && (
          <div className="bg-brand-50/60 px-6 py-2.5 border-b border-brand-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-brand-900">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Progresso na Matéria: {progressPercentage}% concluído</span>
              <span className="text-slate-500 font-normal">({completedLessonsCount} de {totalLessonsCount} lições)</span>
            </div>
            <div className="w-36 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 border-b border-slate-200 px-6 pt-2 gap-2">
          {totalModulesCount > 0 && (
            <button
              onClick={() => {
                setActiveTab('curriculo');
                setSelectedLesson(null);
                setActiveAssessment(null);
              }}
              className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'curriculo'
                  ? 'bg-white text-brand-700 border-t-2 border-brand-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              Currículo Extenso ({totalModulesCount} Módulos)
            </button>
          )}

          <button
            onClick={() => setActiveTab('visao_geral')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'visao_geral'
                ? 'bg-white text-brand-700 border-t-2 border-brand-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Visão Geral & Glossário
          </button>

          {finalAssessments.length > 0 && (
            <button
              onClick={() => setActiveTab('avaliacoes')}
              className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'avaliacoes'
                  ? 'bg-white text-brand-700 border-t-2 border-brand-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              Avaliações Finais de Nível ({finalAssessments.length})
            </button>
          )}
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar text-xs sm:text-sm flex-1">
          {/* TAB 1: CURRICULUM EXTENSO */}
          {activeTab === 'curriculo' && totalModulesCount > 0 && (
            <div className="space-y-6">
              {/* Back button if viewing a specific lesson or assessment */}
              {(selectedLesson || activeAssessment || selectedModule) && (
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => {
                      if (selectedLesson || activeAssessment) {
                        setSelectedLesson(null);
                        setActiveAssessment(null);
                      } else {
                        setSelectedModule(null);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    ← Voltar {selectedLesson || activeAssessment ? `ao Módulo ${selectedModule?.moduleNumber}` : 'à Lista de Módulos'}
                  </button>
                  {selectedModule && (
                    <span className="text-slate-400 font-medium truncate">
                      • Módulo {selectedModule.moduleNumber}: {selectedModule.title}
                    </span>
                  )}
                </div>
              )}

              {/* VIEW: SPECIFIC LESSON PLAYER */}
              {selectedLesson ? (
                <div className="space-y-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-200 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block">
                        Lição Detalhada
                      </span>
                      <h4 className="text-xl font-black text-slate-900 mt-0.5">
                        {selectedLesson.title}
                      </h4>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      {selectedLesson.durationMinutes} min
                    </span>
                  </div>

                  {/* 1. Explicação Aprofundada */}
                  <div className="space-y-2">
                    <h5 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-brand-600" /> Explicação Aprofundada
                    </h5>
                    <div className="p-5 bg-white rounded-2xl border border-slate-200 text-slate-700 leading-relaxed font-normal text-xs sm:text-sm whitespace-pre-wrap">
                      {selectedLesson.explanation}
                    </div>
                  </div>

                  {/* 2. Conceitos Fundamentais */}
                  {selectedLesson.fundamentalConcepts.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Target className="w-4 h-4 text-brand-600" /> Conceitos Fundamentais
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedLesson.fundamentalConcepts.map((c, i) => (
                          <li key={i} className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 text-slate-800 text-xs font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 3. Exemplos Práticos */}
                  {selectedLesson.practicalExamples.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-sky-600" /> Exemplos Práticos
                      </h5>
                      <div className="space-y-2">
                        {selectedLesson.practicalExamples.map((ex, i) => (
                          <div key={i} className="p-3.5 bg-slate-900 text-sky-200 font-mono text-xs rounded-xl shadow-inner">
                            {ex}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Aplicações no Quotidiano */}
                  {selectedLesson.realWorldApplications.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" /> Aplicações no Quotidiano e Mercado
                      </h5>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedLesson.realWorldApplications.map((app, i) => (
                          <div key={i} className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">
                            💡 {app}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. Exercícios Resolvidos Passo a Passo */}
                  {selectedLesson.stepByStepExercises.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Exercício Resolvido Passo a Passo
                      </h5>
                      {selectedLesson.stepByStepExercises.map((sb, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                          <h6 className="font-bold text-slate-900 text-xs sm:text-sm">
                            Problema: {sb.problem}
                          </h6>
                          <div className="space-y-1.5 pl-3 border-l-2 border-emerald-500">
                            {sb.steps.map((st, sIdx) => (
                              <p key={sIdx} className="text-xs text-slate-600 leading-relaxed">
                                {st}
                              </p>
                            ))}
                          </div>
                          <div className="p-2.5 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200">
                            Resposta Final: {sb.finalAnswer}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 6. Exercícios para Praticar */}
                  {selectedLesson.practiceExercises.length > 0 && (
                    <div className="space-y-4 pt-2">
                      <h5 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-brand-600" /> Exercício para Praticar (+10 XP)
                      </h5>
                      {selectedLesson.practiceExercises.map((q, qIdx) => {
                        const answer = lessonAnswers[qIdx];
                        const feedback = lessonFeedback[qIdx];
                        return (
                          <div key={qIdx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                            <p className="font-bold text-slate-900 text-xs sm:text-sm">{q.q}</p>
                            <div className="space-y-2">
                              {q.options.map((opt, oIdx) => {
                                const isSelected = answer === oIdx;
                                const isCorrect = oIdx === q.correct;
                                let btnStyle = "bg-slate-50 border-slate-200 hover:bg-brand-50 hover:border-brand-300 text-slate-700";
                                if (answer !== undefined) {
                                  if (isCorrect) btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                                  else if (isSelected) btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold";
                                  else btnStyle = "bg-slate-50 text-slate-400 opacity-60";
                                }
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => handleLessonOptionSelect(qIdx, oIdx, q.correct, q.explanation)}
                                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {answer !== undefined && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                                  </button>
                                );
                              })}
                            </div>
                            {feedback !== undefined && (
                              <div className={`p-3 rounded-xl text-xs font-semibold ${feedback ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                                {feedback ? `✅ Excelente! ${q.explanation || ''}` : `❌ Dica: ${q.hint}`}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 7. Resumo e Botão de Conclusão */}
                  <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-700 leading-relaxed border border-slate-200">
                    <span className="font-black text-slate-900 block mb-1">Resumo da Lição:</span>
                    {selectedLesson.summary}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleCompleteFullLesson(selectedLesson)}
                      className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                        state.completedExercises.includes(`lesson-${selectedLesson.id}`)
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {state.completedExercises.includes(`lesson-${selectedLesson.id}`)
                        ? 'Lição Concluída (+30 XP Guardado)'
                        : 'Marcar Lição como Concluída (+30 XP)'}
                    </button>
                  </div>
                </div>
              ) : activeAssessment ? (
                /* VIEW: MODULE ASSESSMENT */
                <div className="space-y-6 bg-amber-50/50 p-6 rounded-3xl border border-amber-200 animate-in fade-in">
                  <div className="border-b border-amber-200 pb-3">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                      Avaliação Formal do Módulo
                    </span>
                    <h4 className="text-xl font-black text-slate-900 mt-0.5">
                      {activeAssessment.title}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {activeAssessment.questions.map((q, qIdx) => (
                      <div key={qIdx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">
                          Questão {qIdx + 1}: {q.q}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => {
                                if (oIdx === q.correct) {
                                  addXP(25, 'Questão de avaliação superada');
                                  setAssessmentScore((prev) => (prev || 0) + 1);
                                }
                              }}
                              className="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-brand-50 hover:border-brand-400 text-xs font-medium transition cursor-pointer"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : selectedModule ? (
                /* VIEW: SPECIFIC MODULE UNITS */
                <div className="space-y-6 animate-in fade-in">
                  <div className="bg-brand-50 p-6 rounded-3xl border border-brand-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-brand-700 uppercase tracking-wider">
                        Módulo {selectedModule.moduleNumber} de {totalModulesCount}
                      </span>
                      <span className="text-xs font-bold bg-white px-3 py-1 rounded-full text-brand-700 border border-brand-200">
                        {selectedModule.targetLevel} • {selectedModule.estimatedHours}h estimadas
                      </span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">
                      {selectedModule.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {selectedModule.description}
                    </p>
                  </div>

                  {/* List of Units */}
                  <div className="space-y-4">
                    <h5 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                      Unidades de Ensino ({selectedModule.units.length} Unidades)
                    </h5>

                    {selectedModule.units.map((unit) => (
                      <div key={unit.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider block">
                              Unidade {unit.unitNumber}
                            </span>
                            <h6 className="font-bold text-slate-900 text-sm">{unit.title}</h6>
                            <p className="text-xs text-slate-500 mt-0.5">{unit.description}</p>
                          </div>
                          <span className="text-xs text-slate-400 font-bold shrink-0">
                            {unit.lessons.length} Lições
                          </span>
                        </div>

                        <div className="divide-y divide-slate-100">
                          {unit.lessons.map((les) => {
                            const isDone = state.completedExercises.includes(`lesson-${les.id}`);
                            return (
                              <div
                                key={les.id}
                                className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
                                onClick={() => setSelectedLesson(les)}
                              >
                                <div className="flex items-center gap-3">
                                  {isDone ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                  ) : (
                                    <PlayCircle className="w-5 h-5 text-brand-600 shrink-0" />
                                  )}
                                  <div>
                                    <h6 className="font-bold text-slate-800 text-xs sm:text-sm">
                                      {les.title}
                                    </h6>
                                    <span className="text-[11px] text-slate-400">
                                      Duração: {les.durationMinutes} min • {les.fundamentalConcepts.length} conceitos
                                    </span>
                                  </div>
                                </div>
                                <button className="px-3 py-1.5 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white rounded-xl text-xs font-bold transition">
                                  {isDone ? 'Revisitar' : 'Estudar'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Module Assessment Card */}
                  {selectedModule.moduleAssessment && (
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                          Avaliação de Fim de Módulo
                        </span>
                        <h6 className="font-extrabold text-slate-900 text-sm">
                          {selectedModule.moduleAssessment.title}
                        </h6>
                        <p className="text-xs text-slate-600">
                          {selectedModule.moduleAssessment.questions.length} questões para testar os teus conhecimentos.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveAssessment(selectedModule.moduleAssessment)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                      >
                        Iniciar Avaliação
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* VIEW: MODULES GRID SELECTION */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-base">
                      Módulos do Currículo ({totalModulesCount})
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      Progresso contínuo e progressivo
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modules.map((mod) => (
                      <div
                        key={mod.id}
                        onClick={() => setSelectedModule(mod)}
                        className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-brand-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group space-y-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 font-black text-xs flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition">
                              {mod.moduleNumber}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {mod.targetLevel}
                            </span>
                          </div>
                          <h5 className="font-black text-slate-800 text-sm group-hover:text-brand-600 transition">
                            {mod.title}
                          </h5>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {mod.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                          <span>{mod.units.length} Unidades • {mod.estimatedHours}h</span>
                          <span className="text-brand-600 flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                            Explorar <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VISÃO GERAL */}
          {activeTab === 'visao_geral' && (
            <div className="space-y-6">
              {/* Intro */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-600" /> Introdução Geral
                </h4>
                <p className="text-slate-600 mt-2 leading-relaxed bg-brand-50/40 p-4 rounded-2xl border border-brand-100 font-medium">
                  {subject.intro}
                </p>
              </div>

              {/* Objectives if provided */}
              {subject.objectives && subject.objectives.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-brand-600" /> Objetivos de Aprendizagem
                  </h4>
                  <ul className="mt-2 space-y-1.5 pl-2">
                    {subject.objectives.map((obj, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Practical Solved Example */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-brand-600" /> Exemplo Prático & Conceitos Importantes
                </h4>
                <div className="mt-2 p-4 rounded-2xl bg-slate-900 text-brand-100 text-xs font-mono leading-relaxed whitespace-pre-wrap shadow-inner">
                  {subject.example}
                </div>
              </div>

              {/* Glossary if present */}
              {subject.glossary && subject.glossary.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-brand-600" /> Glossário de Termos Essenciais
                  </h4>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {subject.glossary.map((g, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="font-black text-slate-800 text-xs block">{g.term}</span>
                        <span className="text-[11px] text-slate-500 mt-0.5 block leading-relaxed">{g.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview Interactive Exercise */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-600" /> Desafio Rápido da Matéria
                  </h4>
                  <span className="text-xs text-brand-600 font-extrabold px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> +15 XP
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-800 leading-normal">
                  {subject.exercise.q}
                </p>

                <div className="space-y-2.5">
                  {subject.exercise.options.map((opt, idx) => {
                    const isSelected = overviewSelectedAnswer === idx;
                    const isCorrect = idx === subject.exercise.correct;

                    let optStyle = "bg-white border-slate-200 text-slate-700 hover:bg-brand-50/60 hover:border-brand-300";

                    if (overviewSelectedAnswer !== null) {
                      if (isCorrect) {
                        optStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                      } else if (isSelected) {
                        optStyle = "bg-rose-50 border-rose-500 text-rose-800 font-bold";
                      } else {
                        optStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOverviewExercise(idx)}
                        className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-medium transition flex items-center justify-between cursor-pointer ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {overviewSelectedAnswer !== null && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                        {overviewSelectedAnswer !== null && isSelected && !isCorrect && (
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {overviewFeedback && (
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm font-semibold border ${
                      overviewFeedback.isCorrect
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    {overviewFeedback.message}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: AVALIAÇÕES FINAIS POR NÍVEL */}
          {activeTab === 'avaliacoes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">
                    Avaliações Finais de Nível
                  </h4>
                  <p className="text-xs text-slate-500">
                    Conclui estas provas formais para certificar a tua mestria nesta disciplina.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {finalAssessments.map((fa, faIdx) => (
                  <div
                    key={faIdx}
                    className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
                        Nível {fa.level}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {fa.questions.length} Questões de Exame
                      </span>
                    </div>

                    <h5 className="font-black text-slate-900 text-base">
                      {fa.title}
                    </h5>

                    <div className="space-y-3 pt-2">
                      {fa.questions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                          <p className="font-bold text-slate-800 text-xs sm:text-sm">{qIdx + 1}. {q.q}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  if (oIdx === q.correct) {
                                    addXP(30, `Questão de exame final (${fa.level})`);
                                  }
                                }}
                                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-brand-50 text-xs font-medium text-slate-700 transition text-left cursor-pointer"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {totalModulesCount > 0 ? `${totalModulesCount} módulos progressivos disponíveis` : 'Matéria estruturada'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-300 transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
