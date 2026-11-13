import React from 'react';
import { useUser } from '../context/UserContext';
import {
  Zap,
  Trophy,
  Flame,
  Clock,
  BookOpen,
  CheckCircle2,
  Lock,
  Award,
  Gamepad2,
  BarChart3,
  Calendar
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { state, calculateLevel, allBadges } = useUser();
  const { level, currentLevelXP, percent, title } = calculateLevel(state.xp);

  const neededForNext = 100 - currentLevelXP;
  const hoursStudied = (state.studyTimeMinutes / 60).toFixed(1);

  // Weekly activity max for scale
  const maxWeeklyXP = Math.max(...(state.weeklyActivity || []).map((w) => w.xp), 50);

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
          <BarChart3 className="w-3.5 h-3.5 text-brand-600" /> Painel de Evolução & Conquistas
        </div>
        <h2 className="text-3xl font-black text-slate-800">Meu Progresso Real</h2>
        <p className="text-slate-500 text-sm mt-1">
          Acompanha o teu nível, horas de estudo, lições concluídas, gráficos semanais e medalhas desbloqueadas.
        </p>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <Zap className="w-7 h-7 text-amber-500 fill-amber-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              XP Total
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">{state.xp}</h3>
            <span className="text-xs text-brand-600 font-extrabold block">
              Nível {level} • {title}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Atividades Feitas
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              {state.activitiesCompleted}
            </h3>
            <span className="text-xs text-emerald-600 font-semibold block">
              {state.completedLessonIds?.length || 0} Lições • {state.completedExercises?.length || 0} Exercícios
            </span>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-7 h-7 text-amber-500 fill-amber-500" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Sequência Diária
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              {state.streak} {state.streak === 1 ? 'Dia' : 'Dias'}
            </h3>
            <span className="text-xs text-amber-600 font-semibold block">
              Estudo consistente
            </span>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7 text-sky-600" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Tempo de Estudo
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              {hoursStudied} h
            </h3>
            <span className="text-xs text-sky-600 font-semibold block">
              {state.studyTimeMinutes} minutos totais
            </span>
          </div>
        </div>
      </div>

      {/* Next Level Progression Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-600" />
              <h3 className="text-base font-black text-slate-800">
                Progresso para o Nível {level + 1}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Acumula XP com lições, exercícios e jogos para desbloquear novas patentes de conhecimento.
            </p>
          </div>
          <span className="text-brand-600 font-black text-xl">{percent}%</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-brand-600 via-brand-500 to-sky-400 h-3.5 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>{currentLevelXP} XP acumulados no nível atual</span>
          <span className="font-extrabold text-brand-700">Faltam {neededForNext} XP para o Nível {level + 1}</span>
        </div>
      </div>

      {/* Weekly Activity Interactive Bar Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-black text-slate-800">Atividade Semanal de Estudo</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Segunda a Domingo</span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-6 items-end h-48">
          {(state.weeklyActivity || []).map((dayData, idx) => {
            const barHeight = Math.max(12, Math.round((dayData.xp / maxWeeklyXP) * 100));
            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-black text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {dayData.xp} XP
                </span>
                <div
                  className="w-full max-w-[40px] rounded-2xl bg-gradient-to-t from-brand-600 to-sky-400 group-hover:from-brand-700 group-hover:to-sky-300 transition-all shadow-xs"
                  style={{ height: `${barHeight}%` }}
                />
                <span className="text-xs font-bold text-slate-600 mt-1">{dayData.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges and Medals Showcase */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-black text-slate-800">Quadro de Medalhas e Conquistas</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Desbloqueadas automaticamente conforme avanças nas lições e pontuações do MINDORA.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {allBadges.map((b) => {
            const isUnlocked = state.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-5 rounded-3xl border text-center transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-brand-50/50 border-brand-200 shadow-xs'
                    : 'bg-slate-50 border-slate-200/80 opacity-40'
                }`}
              >
                <div>
                  <div className="text-4xl mb-3 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-800 leading-snug">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isUnlocked
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Desbloqueada
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" /> Requer {b.req} XP
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
