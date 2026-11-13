import React from 'react';
import { TabType } from '../types';
import { useUser } from '../context/UserContext';
import { Logo } from './Logo';
import {
  Home,
  GraduationCap,
  BookOpenCheck,
  Trophy,
  Wrench,
  FolderKanban,
  Sparkles,
  Settings,
  BookOpen,
  Gamepad2,
  CheckCircle2,
  User,
  Zap,
  LogIn,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenAuth: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  isOpenMobile,
  onCloseMobile
}) => {
  const { state, calculateLevel } = useUser();
  const { level, percent, title } = calculateLevel(state.xp);

  // The 8 mandatory primary items requested by the user
  const primaryNavItems: { id: TabType; label: string; icon: React.ReactNode; isAI?: boolean }[] = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'cursos', label: 'Explorar Cursos', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'meus-cursos', label: 'Meus Cursos', icon: <BookOpenCheck className="w-4 h-4" /> },
    { id: 'conquistas', label: 'Conquistas', icon: <Trophy className="w-4 h-4" /> },
    { id: 'ferramentas', label: 'Ferramentas', icon: <Wrench className="w-4 h-4" /> },
    { id: 'projetos', label: 'Meus Projetos', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'ia', label: 'MINDORA AI', icon: <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />, isAI: true },
    { id: 'perfil', label: 'Definições', icon: <Settings className="w-4 h-4" /> },
  ];

  // Secondary library shortcuts
  const secondaryNavItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'materias', label: 'Biblioteca de Matérias', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'jogos', label: 'Jogos Educativos', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 'quizzes', label: 'Quizzes Rápidos', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'professores', label: 'Espaço Professores', icon: <GraduationCap className="w-3.5 h-3.5 text-sky-600" /> },
  ];

  if (state.role === 'professor' || state.role === 'administrador') {
    secondaryNavItems.push({
      id: 'painel-professor',
      label: 'Painel Docente',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
    });
  }

  if (state.role === 'administrador') {
    secondaryNavItems.push({
      id: 'admin',
      label: 'Administração',
      icon: <Sparkles className="w-3.5 h-3.5 text-rose-600" />
    });
  }

  const handleSelect = (tab: TabType) => {
    onNavigate(tab);
    onCloseMobile();
  };

  const content = (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5 text-slate-700 select-none">
      <div className="space-y-6">
        {/* Logo and close for mobile */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <Logo onClick={() => handleSelect('inicio')} />
          {isOpenMobile && (
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 8 Primary Nav Items */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-1">
            Menu Principal
          </span>
          {primaryNavItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-brand-600 text-white font-black shadow-md shadow-brand-500/20'
                    : 'text-slate-700 hover:bg-slate-100/80 hover:text-brand-700'
                } ${item.isAI && !isActive ? 'ring-1 ring-amber-200/80 bg-amber-50/40 text-amber-900' : ''}`}
              >
                <span className={isActive ? 'text-white' : ''}>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Libraries */}
        <div className="space-y-1 pt-2 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-1">
            Recursos & Atividades
          </span>
          {secondaryNavItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Progress Pill & Authentication Card */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        {/* User Mini Progress Card */}
        <div
          onClick={() => handleSelect('progresso')}
          className="p-3.5 rounded-2xl bg-slate-50 hover:bg-brand-50/60 border border-slate-200/70 transition cursor-pointer space-y-2 group"
          title="Ver progresso detalhado"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{state.avatarEmoji}</span>
              <div className="truncate">
                <span className="font-extrabold text-slate-800 text-xs block truncate">{state.name}</span>
                <span className="text-[10px] text-brand-600 font-bold">Nível {level} • {title}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-400" /> {state.xp} XP
              </span>
              <span>{percent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-brand-600 h-1.5 rounded-full transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {!state.isAuthenticated && (
          <button
            onClick={() => {
              onOpenAuth();
              onCloseMobile();
            }}
            className="w-full py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-brand-700 transition cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" /> Entrar na Conta
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (w-64) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 sticky top-0 h-screen shrink-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
