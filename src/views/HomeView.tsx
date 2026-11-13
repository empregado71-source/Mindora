import React from 'react';
import { TabType, GameType, Subject } from '../types';
import { useUser } from '../context/UserContext';
import { SUBJECTS, COURSES } from '../data/learningData';
import { MascotRobot } from '../components/MascotRobot';
import {
  Award,
  Compass,
  Play,
  Book,
  Gamepad,
  CheckCircle,
  Flame,
  Layers,
  Trophy,
  ChevronRight,
  ArrowRight,
  Search,
  Sparkles,
  Zap,
  Calendar,
  Clock,
  Target,
  GraduationCap,
  FolderKanban,
  Wrench,
  Bot,
  TrendingUp,
  Activity
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenSubject: (subject: Subject) => void;
  onOpenGame: (game: GameType) => void;
  onOpenAuth: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSubject,
  onOpenGame,
  onOpenAuth
}) => {
  const { state, calculateLevel, addXP, allBadges } = useUser();
  const { level, currentLevelXP, percent, title } = calculateLevel(state.xp);

  // In-progress and completed courses
  const enrolledCourses = COURSES.filter((c) => state.enrolledCourseIds.includes(c.id));
  const coursesInProgress = enrolledCourses.filter((c) => {
    const doneLessons = c.lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
    return doneLessons < c.lessons.length;
  });
  const coursesCompleted = enrolledCourses.filter((c) => {
    const doneLessons = c.lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
    return c.lessons.length > 0 && doneLessons >= c.lessons.length;
  });

  const completedModulesCount = state.completedModuleIds?.length || 0;
  const unlockedBadgesCount = state.unlockedBadges.length;

  // Next badge to unlock
  const nextBadge = allBadges.find((b) => !state.unlockedBadges.includes(b.id));

  // Weekly Goals calculations
  const weeklyGoals = state.weeklyGoals || { targetStudyMinutes: 120, targetLessons: 6, targetExercises: 12 };
  const currentWeekMinutes = state.studyTimeMinutes || 45;
  const currentLessonsCount = state.completedLessonIds.length;
  const currentExercisesCount = state.completedExercises.length;

  const minutesProgress = Math.min(100, Math.round((currentWeekMinutes / weeklyGoals.targetStudyMinutes) * 100));
  const lessonsProgress = Math.min(100, Math.round((currentLessonsCount / weeklyGoals.targetLessons) * 100));
  const exercisesProgress = Math.min(100, Math.round((currentExercisesCount / weeklyGoals.targetExercises) * 100));

  const handleDailyChallenge = () => {
    addXP(30, "Desafio Diário Concluído com Sucesso!");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-150">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-sky-500 p-8 sm:p-12 text-white shadow-xl shadow-brand-500/20">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white">
              <Award className="w-3.5 h-3.5 text-amber-300" /> Plataforma Inteligente de Aprendizagem & Projetos
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Olá, {state.name}! <br />
              <span className="text-sky-200">Aprende, Cria & Evolui.</span>
            </h1>

            <p className="text-brand-50 text-xs sm:text-base font-medium leading-relaxed max-w-xl">
              Cursos estruturados com percurso pedagógico, ferramentas práticas de experimentação, gestão de projetos e acompanhamento pessoal da <span className="font-extrabold text-white">MINDORA AI</span>.
            </p>

            {/* Main Navigation Actions */}
            <div className="pt-3 flex flex-wrap gap-2.5 sm:gap-3">
              <button
                onClick={() => onNavigate('cursos')}
                className="px-5 py-3 rounded-2xl bg-white text-brand-700 font-extrabold text-xs sm:text-sm hover:bg-brand-50 transition shadow-lg shadow-black/10 flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <GraduationCap className="w-4 h-4 text-brand-600" /> Explorar Cursos
              </button>
              <button
                onClick={() => onNavigate('ferramentas')}
                className="px-5 py-3 rounded-2xl bg-brand-800/60 backdrop-blur-md text-white font-bold text-xs sm:text-sm hover:bg-brand-800/80 border border-white/20 transition flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Wrench className="w-4 h-4 text-amber-300" /> Ferramentas Práticas
              </button>
              <button
                onClick={() => onNavigate('projetos')}
                className="px-5 py-3 rounded-2xl bg-brand-800/60 backdrop-blur-md text-white font-bold text-xs sm:text-sm hover:bg-brand-800/80 border border-white/20 transition flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <FolderKanban className="w-4 h-4 text-sky-300" /> Meus Projetos
              </button>
              <button
                onClick={() => onNavigate('ia')}
                className="px-5 py-3 rounded-2xl bg-sky-400/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm hover:bg-sky-400/40 border border-white/20 transition flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> MINDORA AI
              </button>
            </div>
          </div>

          {/* Educational Robot Mascot display */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <MascotRobot size="xl" mood="celebrating" message="Pronto para mais um dia de evolução?" />
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI DASHBOARD CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {/* Level and XP */}
        <div
          onClick={() => onNavigate('progresso')}
          className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs hover:border-brand-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">Nível</span>
            <div className="w-7 h-7 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-black text-xs">
              Nv
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-800">Nível {level}</div>
            <div className="text-[11px] text-brand-600 font-bold truncate">{title}</div>
          </div>
        </div>

        {/* XP Points */}
        <div
          onClick={() => onNavigate('progresso')}
          className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs hover:border-brand-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">Experiência</span>
            <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs">
              <Zap className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-800">{state.xp} XP</div>
            <div className="text-[11px] text-slate-400 font-medium">+{currentLevelXP}/100 próx.</div>
          </div>
        </div>

        {/* In Progress Courses */}
        <div
          onClick={() => onNavigate('meus-cursos')}
          className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs hover:border-brand-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">Em Andamento</span>
            <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-800">{coursesInProgress.length}</div>
            <div className="text-[11px] text-blue-600 font-bold">Cursos Ativos</div>
          </div>
        </div>

        {/* Completed Courses */}
        <div
          onClick={() => onNavigate('meus-cursos')}
          className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs hover:border-brand-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">Concluídos</span>
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-800">{coursesCompleted.length}</div>
            <div className="text-[11px] text-emerald-600 font-bold">Cursos Finalizados</div>
          </div>
        </div>

        {/* Completed Modules */}
        <div
          onClick={() => onNavigate('progresso')}
          className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs hover:border-brand-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">Módulos</span>
            <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-800">{completedModulesCount}</div>
            <div className="text-[11px] text-indigo-600 font-bold">Módulos Concluídos</div>
          </div>
        </div>

        {/* Streak Days */}
        <div
          onClick={() => onNavigate('progresso')}
          className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs hover:border-brand-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">Sequência</span>
            <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-800">{state.streak} Dias</div>
            <div className="text-[11px] text-amber-600 font-bold">Foco Consecutivo</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 8 cols (Courses in progress, Weekly goals) + Right 4 cols (Achievements, History, AI) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Cursos em Andamento */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" /> Cursos em Andamento
              </h2>
              <button
                onClick={() => onNavigate('cursos')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
              >
                Explorar Todos os Cursos <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {coursesInProgress.length === 0 ? (
              <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
                <Book className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-extrabold text-slate-800 text-sm">Ainda não tens cursos iniciados</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Explora a nossa biblioteca de Idiomas, Tecnologia, Arte, Design e Ciências e inicia a tua primeira lição!
                </p>
                <button
                  onClick={() => onNavigate('cursos')}
                  className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition"
                >
                  Ver Catálogo de Cursos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coursesInProgress.slice(0, 4).map((c) => {
                  const doneLessons = c.lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
                  const progress = Math.round((doneLessons / c.lessons.length) * 100);

                  return (
                    <div
                      key={c.id}
                      onClick={() => onNavigate('cursos')}
                      className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group hover:border-brand-200"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 px-2.5 py-0.5 rounded-full bg-brand-50">
                          {c.cat}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-brand-600 transition">
                          {c.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 block">
                          {doneLessons} de {c.lessons.length} lições concluídas
                        </span>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-50">
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-brand-600 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold text-brand-600">
                          <span>Continuar Estudo</span>
                          <span className="text-slate-500 font-mono">{progress}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Weekly Goals Tracker (Objetivos Semanais) */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
                  <Target className="w-5 h-5 text-brand-600" /> Objetivos Semanais de Aprendizagem
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Metas personalizadas para manter a tua disciplina de estudo e acumular XP.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Esta Semana
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Minutes Goal */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Tempo de Estudo</span>
                  <span className="text-brand-600 font-mono">{currentWeekMinutes}/{weeklyGoals.targetStudyMinutes} min</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-brand-600 h-2 rounded-full" style={{ width: `${minutesProgress}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 block">{minutesProgress}% atingido</span>
              </div>

              {/* Lessons Goal */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Lições Realizadas</span>
                  <span className="text-brand-600 font-mono">{currentLessonsCount}/{weeklyGoals.targetLessons}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${lessonsProgress}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 block">{lessonsProgress}% atingido</span>
              </div>

              {/* Exercises Goal */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Exercícios Resolvidos</span>
                  <span className="text-brand-600 font-mono">{currentExercisesCount}/{weeklyGoals.targetExercises}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${exercisesProgress}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 block">{exercisesProgress}% atingido</span>
              </div>
            </div>
          </div>

          {/* Recomendações de Aprendizagem */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Recomendações Para Ti
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => onNavigate('ferramentas')}
                className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-200/80 hover:border-amber-400 transition cursor-pointer space-y-2 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-amber-700">
                  Laboratório Prático
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Calculadora científica, editor live de código e quadro de desenho digital.
                </p>
              </div>

              <div
                onClick={() => onNavigate('projetos')}
                className="p-5 rounded-3xl bg-gradient-to-br from-brand-500/10 to-transparent border border-brand-200/80 hover:border-brand-400 transition cursor-pointer space-y-2 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-brand-700">
                  MINDORA Projects
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Cria o teu portfólio, define tarefas, prioridades e prazos de estudo.
                </p>
              </div>

              <div
                onClick={() => onNavigate('ia')}
                className="p-5 rounded-3xl bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-200/80 hover:border-sky-400 transition cursor-pointer space-y-2 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-sky-700">
                  MINDORA AI Tutora
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tira qualquer dúvida com respostas completas, exemplos e exercícios interativos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Conquistas e Medalhas Recentes */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> Medalhas & Conquistas
              </h3>
              <button
                onClick={() => onNavigate('conquistas')}
                className="text-xs font-bold text-brand-600 hover:underline cursor-pointer"
              >
                Ver Todas ({unlockedBadgesCount}/{allBadges.length})
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {allBadges.slice(0, 4).map((b) => {
                const isUnlocked = state.unlockedBadges.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`p-2.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 ${
                      isUnlocked
                        ? 'bg-amber-50/70 border-amber-200 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 opacity-40 grayscale'
                    }`}
                    title={`${b.title}: ${b.desc}`}
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[10px] font-bold truncate max-w-full">{b.title}</span>
                  </div>
                );
              })}
            </div>

            {nextBadge && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>Próxima Medalha: {nextBadge.title}</span>
                  <span className="text-brand-600 font-mono">{state.xp}/{nextBadge.req} XP</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div
                    className="bg-amber-500 h-1.5 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((state.xp / nextBadge.req) * 100))}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Histórico Recente de Atividades */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-sky-600" /> Histórico Recente
            </h3>

            <div className="space-y-3">
              {(state.recentActivity || []).length === 0 ? (
                <div className="text-xs text-slate-400 italic">Sem atividades recentes registadas.</div>
              ) : (
                state.recentActivity.slice(0, 5).map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs border border-slate-100"
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <span className="text-base">{act.icon || '📌'}</span>
                      <div className="truncate">
                        <span className="font-bold text-slate-800 block truncate">{act.title}</span>
                        <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full shrink-0">
                      +{act.xp} XP
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Desafio Diário */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white rounded-3xl p-6 border border-amber-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800 font-black text-sm">
                <Target className="w-4 h-4 text-amber-600" /> Desafio do Dia
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                +30 XP
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              Resolve uma lição de curso ou conclui uma tarefa num projeto para manter a tua sequência diária ativa!
            </p>

            <button
              onClick={handleDailyChallenge}
              className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" /> Reclamar Bónus do Desafio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
