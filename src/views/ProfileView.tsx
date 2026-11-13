import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Camera, Save, RotateCcw, AlertTriangle, LogOut, UserCheck, ShieldCheck, BookOpen } from 'lucide-react';

const AVATAR_OPTIONS = ['🎓', '🚀', '💡', '🔬', '🤖', '🎨', '🦁', '⭐', '🧠', '🌟', '📐', '📚'];

interface ProfileViewProps {
  onOpenAuth: () => void;
  onOpenLegal: (type: 'terms' | 'privacy') => void;
  onOpenTeacherApply?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenAuth, onOpenLegal, onOpenTeacherApply }) => {
  const { state, updateProfile, resetAllData, logout, calculateLevel } = useUser();
  const { level } = calculateLevel(state.xp);

  const [name, setName] = useState(state.name);
  const [email, setEmail] = useState(state.email);
  const [interest, setInterest] = useState(state.interest);
  const [goal, setGoal] = useState(state.goal);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      interest,
      goal
    });
  };

  const handleSelectAvatar = (emoji: string) => {
    updateProfile({ avatarEmoji: emoji });
    setShowAvatarPicker(false);
  };

  const handleConfirmReset = () => {
    resetAllData();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      <div>
        <h2 className="text-3xl font-black text-slate-800">Perfil do Utilizador</h2>
        <p className="text-slate-500 text-sm mt-1">
          Gere as tuas preferências, dados de autenticação e objetivos diários de estudo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs text-center space-y-5 self-start">
          <div className="relative w-28 h-28 mx-auto">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-brand-600 via-brand-500 to-sky-300 text-white text-4xl font-black flex items-center justify-center border-4 border-white shadow-xl">
              {state.avatarEmoji}
            </div>
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="absolute bottom-0 right-0 p-2.5 bg-white rounded-full shadow-md border border-slate-200 text-slate-600 hover:text-brand-600 transition cursor-pointer"
              title="Trocar Avatar Emoji"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar selector popup */}
          {showAvatarPicker && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 animate-in zoom-in-95 duration-150">
              <span className="text-[11px] font-bold text-slate-500 block">Escolhe o teu Avatar:</span>
              <div className="grid grid-cols-4 gap-2">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSelectAvatar(emoji)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-brand-500 text-xl flex items-center justify-center cursor-pointer transition active:scale-95"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xl font-black text-slate-800">{state.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{state.email}</p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
              <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold">
                {state.interest}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                state.role === 'professor'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : state.role === 'administrador'
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : 'bg-blue-50 text-brand-700 border-blue-200'
              }`}>
                {state.role === 'professor' ? 'Docente / Professor' : state.role === 'administrador' ? 'Administrador' : 'Estudante'}
              </span>
            </div>
          </div>

          {/* Quick Persona Switcher for Immediate Testing */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
              Alternar Papel (Modo de Demonstração):
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => updateProfile({ role: 'estudante' })}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                  state.role === 'estudante'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Estudante
              </button>
              <button
                type="button"
                onClick={() => updateProfile({ role: 'professor' })}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                  state.role === 'professor'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Professor
              </button>
              <button
                type="button"
                onClick={() => updateProfile({ role: 'administrador' })}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                  state.role === 'administrador'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-around text-xs text-slate-500">
            <div>
              <span className="block font-black text-slate-800 text-lg">{state.xp}</span> XP Total
            </div>
            <div>
              <span className="block font-black text-slate-800 text-lg">{level}</span> Nível
            </div>
            <div>
              <span className="block font-black text-slate-800 text-lg">
                {state.unlockedBadges.length}
              </span> Medalhas
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {state.role === 'estudante' && onOpenTeacherApply && (
              <button
                onClick={onOpenTeacherApply}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-sky-600 text-white font-bold text-xs hover:from-brand-700 hover:to-sky-700 transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" /> Quero ser Professor
              </button>
            )}
            <button
              onClick={onOpenAuth}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-brand-600" /> Alternar ou Criar Conta
            </button>
            <button
              onClick={logout}
              className="w-full py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Terminar Sessão
            </button>
          </div>
        </div>

        {/* Profile Settings Form */}
        <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-slate-800">Definições Pessoais & Metas de Estudo</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Nome de Apresentação
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm font-semibold text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Endereço de Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm font-semibold text-slate-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Área Principal de Interesse
              </label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm font-semibold text-slate-800 bg-white"
              >
                <option value="Programação e IA">Programação e Inteligência Artificial</option>
                <option value="Ciências Exatas">Ciências Exatas (Matemática, Física, Química)</option>
                <option value="Idiomas">Idiomas (Inglês, Francês, Espanhol, Alemão)</option>
                <option value="Humanidades">Humanidades (História, Geografia, Filosofia, Sociologia)</option>
                <option value="Biológicas & Terra">Biológicas & Terra (Biologia, Ambiente, Astronomia)</option>
                <option value="Sociedade & Negócios">Sociedade & Negócios (Economia, Finanças, Empreendedorismo)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Meta Diária de Estudo
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm font-semibold text-slate-800 bg-white"
              >
                <option value="15">15 minutos por dia (Ritmo Leve)</option>
                <option value="30">30 minutos por dia (Recomendado)</option>
                <option value="60">1 hora por dia (Intensivo)</option>
              </select>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Redefinir Todos os Dados de Progresso
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition shadow-md shadow-brand-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Guardar Alterações
              </button>
            </div>
          </form>

          {/* Legal Links */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Dados Criptografados & Isolados
            </span>
            <div className="space-x-3">
              <button
                onClick={() => onOpenLegal('terms')}
                className="hover:underline hover:text-brand-600 cursor-pointer"
              >
                Termos
              </button>
              <span>•</span>
              <button
                onClick={() => onOpenLegal('privacy')}
                className="hover:underline hover:text-brand-600 cursor-pointer"
              >
                Privacidade
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-slate-800">
              Tens a certeza que queres reiniciar?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Esta ação apagará todo o teu XP ({state.xp} XP), as medalhas conquistadas e os recordes nos 10 jogos desta conta.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition shadow-md shadow-rose-600/20 cursor-pointer"
              >
                Sim, Redefinir Tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
