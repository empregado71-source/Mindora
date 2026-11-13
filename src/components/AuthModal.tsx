import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Logo } from './Logo';
import { MascotRobot } from './MascotRobot';
import { X, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'welcome';
  onOpenLegal: (type: 'terms' | 'privacy') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onOpenLegal
}) => {
  const { login, register, loginAsDemo } = useUser();
  const [mode, setMode] = useState<'login' | 'register' | 'recover' | 'welcome'>(initialMode);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor insere o teu nome de apresentação.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Por favor insere um endereço de email válido.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('A palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('As palavras-passe não coincidem.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = register(name, email, password);
      setIsLoading(false);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor preenche o email e a palavra-passe.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.includes('@')) {
      setErrorMsg('Por favor insere um email válido.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Enviámos instruções de redefinição de palavra-passe para ${email}. Verifica a tua caixa de entrada!`);
    }, 500);
  };

  const handleDemoMode = () => {
    loginAsDemo();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-b from-brand-50/80 to-white border-b border-slate-100 flex items-center justify-between">
          <Logo size="sm" showSlogan={false} />
          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content based on Mode */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Welcome Screen */}
          {mode === 'welcome' && (
            <div className="text-center space-y-5 py-2">
              <MascotRobot size="lg" mood="celebrating" message="Bem-vindo à MINDORA!" />
              <div>
                <h3 className="text-2xl font-black text-slate-800">
                  Aprender. Jogar. Evoluir.
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Acede a 25 matérias aprofundadas, 10 jogos funcionais, cursos estruturados e tutoria com IA inteligente.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setMode('register')}
                  className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-md shadow-brand-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  Criar Conta Gratuita <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMode('login')}
                  className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-sm transition cursor-pointer"
                >
                  Já tenho uma conta
                </button>
                <div className="pt-2">
                  <button
                    onClick={handleDemoMode}
                    className="text-xs text-brand-600 hover:text-brand-800 font-bold underline cursor-pointer"
                  >
                    Entrar em Modo Demonstração Rápido
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-black text-slate-800">Iniciar Sessão</h3>
                <p className="text-xs text-slate-500">
                  Bem-vindo de volta! Insere os teus dados para continuar a aprender.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Endereço de Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="o.teu.email@exemplo.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-600">
                      Palavra-passe
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('recover')}
                      className="text-[11px] font-bold text-brand-600 hover:underline cursor-pointer"
                    >
                      Esqueceste-te?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-md shadow-brand-500/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? 'A autenticar...' : 'Entrar na MINDORA'}
              </button>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleDemoMode}
                className="w-full py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="font-black text-brand-600">G</span> Iniciar sessão com Google
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                Ainda não tens conta?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-brand-600 hover:underline cursor-pointer"
                >
                  Criar conta agora
                </button>
              </div>
            </form>
          )}

          {/* Registration Form */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-black text-slate-800">Registo de Aluno</h3>
                <p className="text-xs text-slate-500">
                  Cria a tua conta para guardar o teu progresso, pontos XP e medalhas.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Nome de Apresentação
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Joana Silva"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Endereço de Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="joana@exemplo.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Palavra-passe
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 carateres"
                      className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Confirmar Palavra-passe
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repetir senha"
                      className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 leading-normal">
                Ao registar-te, confirmas que concordas com os{' '}
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="font-bold text-brand-600 hover:underline cursor-pointer"
                >
                  Termos de Utilização
                </button>{' '}
                e a nossa{' '}
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="font-bold text-brand-600 hover:underline cursor-pointer"
                >
                  Política de Privacidade
                </button>
                .
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-md shadow-brand-500/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? 'A criar conta...' : 'Concluir Registo'}
              </button>

              <div className="text-center text-xs text-slate-500">
                Já possuis registo?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-brand-600 hover:underline cursor-pointer"
                >
                  Iniciar Sessão
                </button>
              </div>
            </form>
          )}

          {/* Password Recovery */}
          {mode === 'recover' && (
            <form onSubmit={handleRecover} className="space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-black text-slate-800">Recuperação de Acesso</h3>
                <p className="text-xs text-slate-500">
                  Insere o teu email registado para receberes o link de redefinição de palavra-passe.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Endereço de Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="o.teu.email@exemplo.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-md shadow-brand-500/20 transition cursor-pointer"
              >
                {isLoading ? 'A enviar...' : 'Enviar Link de Recuperação'}
              </button>

              <div className="text-center text-xs">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-slate-600 hover:text-brand-600 cursor-pointer"
                >
                  &larr; Voltar ao Início de Sessão
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
