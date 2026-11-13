import React, { useState } from 'react';
import { Course } from '../types';
import { COURSES } from '../data/learningData';
import { useUser } from '../context/UserContext';
import { CourseStudyRoom } from './CourseStudyRoom';
import {
  Clock,
  BookOpen,
  CheckCircle,
  Play,
  Award,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export const CoursesView: React.FC<{ filterOnlyEnrolled?: boolean }> = ({ filterOnlyEnrolled = false }) => {
  const { state, enrollInCourse } = useUser();
  const [coursesList] = useState<Course[]>(COURSES);
  const [activeCourseForStudy, setActiveCourseForStudy] = useState<Course | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // If a course is currently opened for study, render the dedicated full CourseStudyRoom!
  if (activeCourseForStudy) {
    return (
      <CourseStudyRoom
        course={activeCourseForStudy}
        onBack={() => setActiveCourseForStudy(null)}
      />
    );
  }

  const categories = [
    { id: 'todos', label: 'Todos os Cursos' },
    { id: 'Idiomas', label: 'Idiomas' },
    { id: 'Programação e Tecnologia', label: 'Programação & Tech' },
    { id: 'Arte e Criatividade', label: 'Arte & Criatividade' },
    { id: 'Design e Multimédia', label: 'Design & Multimédia' },
    { id: 'Ciências e Conhecimentos Gerais', label: 'Ciências & Gerais' },
    { id: 'Sociedade & Negócios', label: 'Negócios' },
  ];

  const filteredCourses = coursesList.filter((c) => {
    if (filterOnlyEnrolled && !state.enrolledCourseIds.includes(c.id)) {
      return false;
    }

    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.cat.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (categoryFilter === 'todos') return true;

    if (categoryFilter === 'Idiomas') {
      return c.type === 'language' || c.cat.toLowerCase().includes('idioma') || c.cat.toLowerCase().includes('comunicação');
    }
    if (categoryFilter === 'Programação e Tecnologia') {
      return c.cat === 'Programação e Tecnologia' || c.cat === 'Tecnologia & Programação' || c.cat === 'Tecnologia do Futuro';
    }
    if (categoryFilter === 'Arte e Criatividade') {
      return c.cat === 'Arte e Criatividade';
    }
    if (categoryFilter === 'Design e Multimédia') {
      return c.cat === 'Design e Multimédia';
    }
    if (categoryFilter === 'Ciências e Conhecimentos Gerais') {
      return c.cat === 'Ciências e Conhecimentos Gerais' || c.cat === 'Exatas' || c.cat === 'Biológicas & Terra';
    }
    if (categoryFilter === 'Sociedade & Negócios') {
      return c.cat === 'Sociedade & Negócios' || c.type === 'business';
    }

    return true;
  });

  const handleStartOrContinue = (c: Course) => {
    if (!state.enrolledCourseIds.includes(c.id)) {
      enrollInCourse(c.id);
    }
    setActiveCourseForStudy(c);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {filterOnlyEnrolled ? 'Os Teus Cursos em Andamento' : 'Catálogo Completo de Formação Estruturada'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            {filterOnlyEnrolled ? 'Meus Cursos Inscritos' : 'Explorar Cursos & Especializações'}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Lições progressivas, teoria aprofundada, exemplos resolvidos, exercícios e provas finais de módulo com correção imediata.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex-1 flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-2xl">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por curso, matéria ou palavra-chave..."
            className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
          />
        </div>

        {/* Categories scrollable chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-extrabold text-slate-700 text-base">Nenhum curso encontrado</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tenta ajustar a tua pesquisa ou escolher outra categoria no menu superior.
            </p>
          </div>
        ) : (
          filteredCourses.map((c) => {
            const completedCount = c.lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
            const calculatedProgress = c.lessons.length > 0
              ? Math.round((completedCount / c.lessons.length) * 100)
              : 0;
            const isEnrolled = state.enrolledCourseIds.includes(c.id);

            return (
              <div
                key={c.id}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group hover:border-brand-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100 truncate max-w-[170px]">
                      {c.cat}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{c.duration}</span>
                    </div>
                  </div>

                  <h3 className="font-black text-slate-800 text-lg leading-snug group-hover:text-brand-600 transition-colors">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {c.desc}
                  </p>

                  {/* Level & Modules Tag */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold">
                      Nível: {c.level}
                    </span>
                    {c.curriculumModules && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                        <Layers className="w-3 h-3 text-amber-600" /> {c.curriculumModules.length} Módulos
                      </span>
                    )}
                  </div>

                  {/* Lessons Preview */}
                  <div className="pt-2 space-y-1.5">
                    {c.lessons.slice(0, 2).map((l, idx) => {
                      const done = state.completedLessonIds.includes(l.id);
                      return (
                        <div
                          key={l.id}
                          className="text-[11px] flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100"
                        >
                          <span className="font-semibold text-slate-700 truncate pr-2">
                            {idx + 1}. {l.title}
                          </span>
                          {done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono shrink-0">{l.duration}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> {c.lessons.length} Lições Estruturadas
                    </span>
                    <span className="text-brand-600 font-black">{calculatedProgress}%</span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-500 to-sky-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${calculatedProgress}%` }}
                    />
                  </div>

                  <button
                    onClick={() => handleStartOrContinue(c)}
                    className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>
                      {calculatedProgress === 100
                        ? 'Revisar Curso'
                        : isEnrolled && calculatedProgress > 0
                        ? 'Continuar Sala de Estudo'
                        : 'Entrar na Sala de Estudo'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
