import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { TeacherService } from '../services/teacherService';
import { TeacherCourse, TeacherSubject, TeacherApplication } from '../types';
import {
  GraduationCap,
  BookOpen,
  Search,
  Filter,
  Star,
  Clock,
  Layers,
  CheckCircle,
  PlayCircle,
  Award,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Flag,
  X,
  FileText,
  UserCheck
} from 'lucide-react';

interface TeacherDiscoveryViewProps {
  onOpenTeacherApply: () => void;
  onNavigateToDashboard?: () => void;
}

export const TeacherDiscoveryView: React.FC<TeacherDiscoveryViewProps> = ({
  onOpenTeacherApply,
  onNavigateToDashboard
}) => {
  const { state, enrollInTeacherCourse, completeTeacherCourseLesson } = useUser();
  const [activeTab, setActiveTab] = useState<'cursos' | 'materias' | 'professores'>('cursos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  
  // Modals & Active Viewers
  const [activeCourse, setActiveCourse] = useState<TeacherCourse | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<{ moduleIdx: number; lessonIdx: number } | null>(null);
  const [activeSubject, setActiveSubject] = useState<TeacherSubject | null>(null);
  const [reviewCourseModal, setReviewCourseModal] = useState<TeacherCourse | null>(null);
  const [reportModalItem, setReportModalItem] = useState<{ type: 'course' | 'subject'; id: string; title: string } | null>(null);

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Report Form state
  const [reportReason, setReportReason] = useState<'inapropriado' | 'direitos_autor' | 'dados_pessoais' | 'outro'>('inapropriado');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Data fetching from TeacherService
  const allApprovedCourses = TeacherService.getApprovedCourses();
  const allApprovedSubjects = TeacherService.getApprovedSubjects();
  const teachersList: TeacherApplication[] = TeacherService.getApplications().filter((a: TeacherApplication) => a.status === 'aprovado');

  const categories = ['Todas', 'Ciências Exatas', 'Tecnologia', 'Línguas', 'Humanidades', 'Biológicas & Terra', 'Programação', 'Física'];

  // Filtered courses
  const filteredCourses = allApprovedCourses.filter((course: TeacherCourse) => {
    const matchesCategory = selectedCategory === 'Todas' || course.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered subjects
  const filteredSubjects = allApprovedSubjects.filter((subj: TeacherSubject) => {
    const matchesCategory = selectedCategory === 'Todas' || subj.discipline.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = subj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subj.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subj.theme.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (course: TeacherCourse) => {
    enrollInTeacherCourse(course.id);
    TeacherService.enrollStudent(state.id, state.name, course.id);
    setActiveCourse({ ...course, enrolledCount: (course.enrolledCount || 0) + 1 });
  };

  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    completeTeacherCourseLesson(courseId, lessonId);
    TeacherService.completeLesson(state.id, courseId, lessonId);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewCourseModal) return;
    TeacherService.addReview(reviewCourseModal.id, {
      userId: state.id,
      userName: state.name,
      userAvatar: state.avatarEmoji,
      rating: reviewRating,
      comment: reviewComment
    });
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewCourseModal(null);
      setReviewComment('');
    }, 1500);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportModalItem) return;
    TeacherService.submitReport({
      contentType: reportModalItem.type,
      contentId: reportModalItem.id,
      contentTitle: reportModalItem.title,
      reporterId: state.id,
      reporterName: state.name,
      reason: reportReason,
      details: reportDetails
    });
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportModalItem(null);
      setReportDetails('');
    }, 1500);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-sky-600 p-8 sm:p-12 text-white shadow-xl shadow-brand-500/10">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide text-brand-50 border border-white/25">
            <GraduationCap className="w-4 h-4 text-sky-200" />
            MINDORA TEACHERS • Espaço dos Professores
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Aprende com Professores Reais. <br />
            <span className="text-sky-200">100% Gratuito e Aberto a Todos.</span>
          </h1>
          <p className="text-brand-100 text-base sm:text-lg max-w-2xl leading-relaxed">
            Explora cursos estruturados, videoaulas e lições preparadas por educadores dedicados. 
            Todas as publicações são revisadas pedagogicamente para garantir máxima qualidade e segurança.
          </p>

          <div className="pt-3 flex flex-wrap gap-4 items-center">
            {state.role === 'professor' && onNavigateToDashboard ? (
              <button
                onClick={onNavigateToDashboard}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white text-brand-700 font-bold hover:bg-brand-50 transition-all shadow-md transform hover:-translate-y-0.5"
              >
                <Layers className="w-5 h-5 text-brand-600" />
                Aceder ao Meu Painel de Professor
              </button>
            ) : (
              <button
                onClick={onOpenTeacherApply}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white text-brand-700 font-bold hover:bg-brand-50 transition-all shadow-md transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                Quero ser Professor na MINDORA
              </button>
            )}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-100 bg-brand-900/30 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Sem custos nem mensalidades para alunos</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-6 opacity-20 hidden md:block">
          <GraduationCap className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Sub Navigation */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('cursos')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'cursos'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Cursos dos Professores ({allApprovedCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('materias')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'materias'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              Matérias & Artigos ({allApprovedSubjects.length})
            </button>
            <button
              onClick={() => setActiveTab('professores')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'professores'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Corpo Docente ({teachersList.length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar por título, professor ou tema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Categories Chips */}
        {activeTab !== 'professores' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB CONTENT: CURSOS */}
      {activeTab === 'cursos' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-brand-600" />
              Cursos Disponíveis
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              A mostrar {filteredCourses.length} cursos aprovados
            </span>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Nenhum curso encontrado</h3>
              <p className="text-sm text-slate-500">
                Tenta pesquisar por outro termo ou seleciona outra categoria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todas');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course: TeacherCourse) => {
                const isEnrolled = state.enrolledTeacherCourseIds.includes(course.id);
                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Course Banner */}
                    <div className="relative h-44 bg-gradient-to-br from-brand-600 to-sky-700 overflow-hidden flex items-center justify-center text-white">
                      {course.coverUrl ? (
                        <img
                          src={course.coverUrl}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center p-6 space-y-2">
                          <GraduationCap className="w-12 h-12 mx-auto text-sky-200" />
                          <span className="text-xs font-bold text-brand-100 uppercase tracking-wider block">
                            {course.category}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-brand-700 shadow-sm">
                          {course.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-900/80 backdrop-blur-md text-sky-200">
                          {course.level}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                        <span className="flex items-center gap-1.5 drop-shadow">
                          <Clock className="w-3.5 h-3.5" />
                          {course.estimatedDuration}
                        </span>
                        <span className="flex items-center gap-1 text-amber-300 font-bold drop-shadow">
                          <Star className="w-3.5 h-3.5 fill-amber-300" />
                          {course.averageRating.toFixed(1)} ({course.reviews?.length || 0})
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-brand-100 text-sm flex items-center justify-center">
                            {course.teacherAvatar || '👨‍🏫'}
                          </span>
                          <span className="text-xs font-semibold text-slate-600 line-clamp-1">
                            {course.teacherName}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                          100% Gratuito
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveCourse(course)}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{isEnrolled ? 'Continuar Curso' : 'Ver Detalhes'}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MATÉRIAS */}
      {activeTab === 'materias' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-brand-600" />
              Matérias & Aulas dos Professores
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {filteredSubjects.length} matérias disponíveis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subj: TeacherSubject) => (
              <div
                key={subj.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-brand-50 text-brand-700 font-bold text-xs rounded-full">
                      {subj.discipline}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {subj.educationLevel}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                    {subj.title}
                  </h3>
                  <p className="text-xs text-brand-600 font-semibold">
                    Tema: {subj.theme}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {subj.fullExplanation}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-100 text-sm flex items-center justify-center">
                      {subj.teacherAvatar || '👨‍🏫'}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      {subj.teacherName}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveSubject(subj)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Ler Matéria
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CORPO DOCENTE */}
      {activeTab === 'professores' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <UserCheck className="w-6 h-6 text-brand-600" />
              Professores Verificados da Plataforma
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {teachersList.length} educadores voluntários
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachersList.map((t: TeacherApplication) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white text-3xl font-black flex items-center justify-center shadow-md">
                    {t.avatarEmoji || '👨‍🏫'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-slate-900 text-base">
                        {t.name}
                      </h3>
                      <Award className="w-4 h-4 text-brand-600" />
                    </div>
                    <p className="text-xs font-semibold text-brand-600">
                      {t.specialty}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Professor Verificado
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  "{t.bio}"
                </p>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Disciplinas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {t.subjectsTaught.map((s: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 font-medium">
                  {t.experience || 'Educador certificado MINDORA'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COURSE DETAILS & LESSON VIEWER MODAL */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            {/* Modal Header */}
            <div className="relative min-h-[14rem] bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              {activeCourse.coverUrl && (
                <img
                  src={activeCourse.coverUrl}
                  alt={activeCourse.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-brand-900/40" />
              
              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-brand-500 text-white">
                  {activeCourse.category} • {activeCourse.level}
                </span>
                <button
                  onClick={() => {
                    setActiveCourse(null);
                    setActiveLessonIndex(null);
                  }}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative z-10 space-y-2 pt-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeCourse.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center">
                      {activeCourse.teacherAvatar || '👨‍🏫'}
                    </span>
                    {activeCourse.teacherName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeCourse.estimatedDuration}
                  </span>
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    {activeCourse.averageRating.toFixed(1)} ({activeCourse.reviews?.length || 0} avaliações)
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Enrollment / Status Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {state.enrolledTeacherCourseIds.includes(activeCourse.id)
                      ? 'Já estás inscrito neste curso!'
                      : 'Acesso Livre e Gratuito'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Aprende ao teu próprio ritmo, sem prazos nem taxas.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {!state.enrolledTeacherCourseIds.includes(activeCourse.id) ? (
                    <button
                      onClick={() => handleEnroll(activeCourse)}
                      className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Inscrever-me Gratuitamente
                    </button>
                  ) : (
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      Inscrição Ativa
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setReviewCourseModal(activeCourse);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Star className="w-4 h-4 text-amber-500" />
                    Avaliar
                  </button>
                  <button
                    onClick={() => {
                      setReportModalItem({
                        type: 'course',
                        id: activeCourse.id,
                        title: activeCourse.title
                      });
                    }}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                    title="Denunciar conteúdo inadequado"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ACTIVE LESSON VIEWER */}
              {activeLessonIndex !== null && (
                <div className="bg-brand-50/60 border border-brand-200 rounded-3xl p-6 space-y-4 animate-fade-in">
                  {(() => {
                    const currentMod = activeCourse.modules[activeLessonIndex.moduleIdx];
                    const currentLes = currentMod?.lessons[activeLessonIndex.lessonIdx];
                    if (!currentLes) return null;
                    const isCompleted = state.completedLessonIds.includes(currentLes.id);

                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-700 bg-brand-100 px-3 py-1 rounded-full">
                            Módulo {activeLessonIndex.moduleIdx + 1} • Lição {activeLessonIndex.lessonIdx + 1}
                          </span>
                          <button
                            onClick={() => setActiveLessonIndex(null)}
                            className="text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                          >
                            Fechar Lição
                          </button>
                        </div>

                        <h3 className="text-xl font-extrabold text-slate-900">
                          {currentLes.title}
                        </h3>

                        {currentLes.videoUrl && (
                          <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <PlayCircle className="w-8 h-8 text-sky-400" />
                              <div>
                                <h4 className="font-bold text-sm">Aula em Vídeo / Multimédia</h4>
                                <p className="text-xs text-slate-400 truncate max-w-sm sm:max-w-md">
                                  {currentLes.videoUrl}
                                </p>
                              </div>
                            </div>
                            <a
                              href={currentLes.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                            >
                              Assistir <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}

                        <div className="prose prose-sm max-w-none text-slate-700 bg-white p-5 rounded-2xl border border-slate-100 whitespace-pre-wrap leading-relaxed">
                          {currentLes.content}
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => handleCompleteLesson(activeCourse.id, currentLes.id)}
                            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                            {isCompleted ? 'Lição Concluída (+50 XP)' : 'Marcar Lição como Concluída (+50 XP)'}
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Course Overview */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-900 text-base">Sobre este Curso</h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {activeCourse.description}
                </p>

                {activeCourse.objectives && activeCourse.objectives.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h5 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                      O que vais aprender:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeCourse.objectives.map((obj: string, i: number) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Course Syllabus / Modules */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-900 text-base flex items-center justify-between">
                  <span>Conteúdo Programático ({activeCourse.modules.length} Módulos)</span>
                  <span className="text-xs font-medium text-slate-500">
                    {activeCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Aulas
                  </span>
                </h4>

                <div className="space-y-3">
                  {activeCourse.modules.map((mod, mIdx) => (
                    <div key={mod.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                      <div className="bg-slate-50 p-4 flex items-center justify-between border-b border-slate-200">
                        <div>
                          <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                            Módulo {mIdx + 1}
                          </span>
                          <h5 className="font-bold text-slate-900 text-sm">{mod.title}</h5>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {mod.lessons.length} aulas
                        </span>
                      </div>

                      <div className="divide-y divide-slate-100 bg-white">
                        {mod.lessons.map((les, lIdx) => {
                          const isCompleted = state.completedLessonIds.includes(les.id);
                          return (
                            <div
                              key={les.id}
                              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                ) : (
                                  <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />
                                )}
                                <div>
                                  <span className="text-xs font-semibold text-slate-800">
                                    {lIdx + 1}. {les.title}
                                  </span>
                                  <span className="text-[11px] text-slate-400 block">
                                    Duração: {les.duration}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => setActiveLessonIndex({ moduleIdx: mIdx, lessonIdx: lIdx })}
                                className="px-3 py-1.5 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                {isCompleted ? 'Revisitar' : 'Assistir Aula'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Project if exists */}
              {activeCourse.finalProject && (
                <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-2">
                  <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    Projeto Final Prático
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {activeCourse.finalProject}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBJECT DETAILS MODAL */}
      {activeSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold">
                  {activeSubject.discipline} • {activeSubject.educationLevel}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                  {activeSubject.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Publicado pelo(a) Prof. {activeSubject.teacherName} • Tema: {activeSubject.theme}
                </p>
              </div>
              <button
                onClick={() => setActiveSubject(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explanation */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Explicação Pedagógica</h4>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {activeSubject.fullExplanation}
              </div>
            </div>

            {/* Examples & Formulas */}
            {activeSubject.examples && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Exemplos Práticos</h4>
                <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100 text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">
                  {activeSubject.examples}
                </div>
              </div>
            )}

            {activeSubject.formulasOrCode && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Fórmulas & Regras</h4>
                <div className="p-4 bg-slate-900 text-amber-300 font-mono text-xs rounded-2xl whitespace-pre-wrap">
                  {activeSubject.formulasOrCode}
                </div>
              </div>
            )}

            {/* Summary */}
            {activeSubject.summary && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Resumo Rápido</h4>
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">
                  {activeSubject.summary}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setReportModalItem({
                    type: 'subject',
                    id: activeSubject.id,
                    title: activeSubject.title
                  });
                }}
                className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5" />
                Denunciar matéria
              </button>

              <button
                onClick={() => setActiveSubject(null)}
                className="px-5 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Concluir Leitura
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RATING & REVIEW MODAL */}
      {reviewCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Avaliar Curso</h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {reviewCourseModal.title}
                </p>
              </div>
              <button
                onClick={() => setReviewCourseModal(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-900">Obrigado pela tua avaliação!</h4>
                <p className="text-xs text-slate-500">O teu feedback ajuda o professor a melhorar o curso.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Classificação Geral</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= reviewRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm font-bold text-slate-700 ml-2">
                      {reviewRating} de 5 estrelas
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">O teu comentário</label>
                  <textarea
                    required
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="O que achaste das explicações, dos exercícios e do professor?"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewCourseModal(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    Publicar Avaliação
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* REPORT CONTENT MODAL */}
      {reportModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-rose-500" />
                <h3 className="font-extrabold text-slate-900 text-lg">Denunciar Conteúdo</h3>
              </div>
              <button
                onClick={() => setReportModalItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-900">Denúncia enviada à Moderação</h4>
                <p className="text-xs text-slate-500">
                  Os administradores da MINDORA analisarão este conteúdo com prioridade. Obrigado por manter a plataforma segura!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <p className="text-xs text-slate-600">
                  Estás a reportar: <span className="font-bold text-slate-800">{reportModalItem.title}</span>
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Motivo</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  >
                    <option value="inapropriado">Conteúdo inadequado ou impreciso</option>
                    <option value="direitos_autor">Violação de direitos de autor</option>
                    <option value="dados_pessoais">Exposição de dados privados / segurança de menores</option>
                    <option value="outro">Outro problema</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detalhes Adicionais</label>
                  <textarea
                    required
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Explica com clareza o problema identificado..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalItem(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    Enviar Denúncia
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
