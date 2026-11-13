import React, { useState } from 'react';
import { TabType } from '../types';
import { useUser } from '../context/UserContext';
import { Logo } from './Logo';
import {
  Home,
  Search,
  BookOpen,
  Gamepad2,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  User,
  Zap,
  Menu,
  X,
  LogIn,
  Wrench,
  FolderKanban,
  Trophy,
  BookOpenCheck
} from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenAuth: () => void;
  onOpenMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  onOpenMobileSidebar
}) => {
  const { state, calculateLevel } = useUser();
  const { level } = calculateLevel(state.xp);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode; isAI?: boolean; highlight?: boolean }[] = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'cursos', label: 'Cursos', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'ferramentas', label: 'Ferramentas', icon: <Wrench className="w-4 h-4" /> },
    { id: 'projetos', label: 'Projetos', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'ia', label: 'MINDORA AI', icon: <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />, isAI: true },
    { id: 'conquistas', label: 'Conquistas', icon: <Trophy className="w-4 h-4" /> },
    { id: 'materias', label: 'Matérias', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'jogos', label: 'Jogos', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'quizzes', label: 'Quizzes', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'professores', label: 'Professores', icon: <GraduationCap className="w-4 h-4 text-sky-600" />, highlight: true },
    { id: 'perfil', label: 'Definições', icon: <User className="w-4 h-4" /> }
  ];

  if (state.role === 'professor' || state.role === 'administrador') {
    navItems.splice(5, 0, {
      id: 'painel-professor',
      label: 'Painel Docente',
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />
    });
  }

  if (state.role === 'administrador') {
    navItems.splice(6, 0, {
      id: 'admin',
      label: 'Administração',
      icon: <Sparkles className="w-4 h-4 text-rose-500" />
    });
  }

  const handleSelectTab = (tab: TabType) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle button */}
            <button
              onClick={() => {
                if (onOpenMobileSidebar) {
                  onOpenMobileSidebar();
                } else {
                  setMobileMenuOpen(!mobileMenuOpen);
                }
              }}
              className="lg:hidden p-2 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Abrir Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Logo onClick={() => handleSelectTab('inicio')} />
          </div>

          {/* Desktop Search Shortcut */}
          <div
            onClick={() => handleSelectTab('pesquisar')}
            className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-full text-slate-500 text-xs font-medium cursor-pointer transition w-56 lg:w-64"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Pesquisar matérias, cursos...</span>
          </div>

          {/* Right Status Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* XP and Level Pill */}
            <div
              onClick={() => handleSelectTab('conquistas')}
              className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 hover:bg-brand-100/70 border border-brand-200 rounded-full text-brand-700 text-xs font-extrabold cursor-pointer transition shadow-2xs"
              title="Ver o teu progresso detalhado e medalhas"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{state.xp} XP</span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-brand-600 text-white">
                Nv. {level}
              </span>
            </div>

            {/* Auth / Profile button */}
            {state.isAuthenticated ? (
              <button
                onClick={() => handleSelectTab('perfil')}
                className="hidden sm:flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-2xl border border-slate-200 hover:border-brand-400 transition cursor-pointer bg-white"
              >
                <span className="text-xs font-black text-slate-700 truncate max-w-[90px]">
                  {state.name.split(' ')[0]}
                </span>
                <span className="w-7 h-7 rounded-xl bg-brand-100 text-sm flex items-center justify-center">
                  {state.avatarEmoji}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition shadow-md shadow-brand-500/20 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" /> Entrar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fallback Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-3 transition ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-2xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Gestão de Conta & Autenticação
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
