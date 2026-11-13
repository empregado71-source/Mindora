import React, { useState } from 'react';
import { Course, CourseLesson } from '../types';
import { useUser } from '../context/UserContext';
import { X, BookOpen, Volume2, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

interface LessonModalProps {
  course: Course | null;
  lesson: CourseLesson | null;
  onClose: () => void;
  onNextLesson?: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  course,
  lesson,
  onClose,
  onNextLesson
}) => {
  const { recordCompletedLesson, state } = useUser();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  if (!course || !lesson) return null;

  const isCompleted = state.completedLessonIds.includes(lesson.id);

  const handleSelectOption = (idx: number) => {
    setSelectedAnswer(idx);
    const isCor = idx === lesson.exercise.correct;

    if (isCor) {
      setFeedback({
        isCorrect: true,
        message: `✨ Resposta Exata! ${lesson.exercise.explanation}`
      });
      if (!isCompleted) {
        recordCompletedLesson(lesson.id, course.id, 25);
      }
    } else {
      setFeedback({
        isCorrect: false,
        message: `❌ Incorreto. ${lesson.exercise.explanation}`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white max-w-3xl w-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
              {course.title}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              {lesson.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable lesson content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar text-xs sm:text-sm text-slate-700">
          {/* Main explanation text */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-600" /> Conteúdo Pedagógico
            </h4>
            <p className="leading-relaxed bg-brand-50/40 p-4 rounded-2xl border border-brand-100 text-slate-800 font-medium">
              {lesson.content}
            </p>
          </div>

          {/* Vocabulary Section if present */}
          {lesson.vocabulary && lesson.vocabulary.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Vocabulário & Pronúncia
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lesson.vocabulary.map((v, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-extrabold text-slate-800 text-sm">{v.word}</div>
                      <div className="text-xs text-brand-600 font-semibold">{v.translation}</div>
                    </div>
                    {v.phonetic && (
                      <span className="text-[11px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {v.phonetic}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dialogue Section if present */}
          {lesson.dialogue && lesson.dialogue.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Diálogo Prático
              </h4>
              <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                {lesson.dialogue.map((d, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className="font-black text-brand-700 text-xs">{d.speaker}: </span>
                    <span className="font-semibold text-slate-800">&quot;{d.text}&quot;</span>
                    <div className="text-[11px] text-slate-500 italic pl-3">↳ {d.translation}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grammar or Technical Tip */}
          {lesson.grammarTip && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <span className="font-extrabold text-xs uppercase tracking-wider block text-amber-800">
                💡 Dica Importante
              </span>
              <p className="text-xs leading-relaxed font-medium">{lesson.grammarTip}</p>
            </div>
          )}

          {/* Interactive comprehension exercise */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-800 text-sm">
                Exercício de Fixação da Lição
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold flex items-center gap-1 border border-brand-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> +25 XP
              </span>
            </div>

            <p className="font-semibold text-slate-800">{lesson.exercise.question}</p>

            <div className="space-y-2.5">
              {lesson.exercise.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === lesson.exercise.correct;

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
                    className={`w-full p-3.5 rounded-2xl border-2 text-left font-semibold text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${optClass}`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {selectedAnswer !== null && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-600" />}
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-semibold border ${
                  feedback.isCorrect ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {feedback.message}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {isCompleted ? "✓ Lição já concluída" : "Responde ao exercício para validar a conclusão"}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Fechar
            </button>
            {onNextLesson && (
              <button
                onClick={onNextLesson}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-500/20 cursor-pointer"
              >
                Próxima Lição <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
