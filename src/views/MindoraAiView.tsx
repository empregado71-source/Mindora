import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { MascotRobot } from '../components/MascotRobot';
import { askMindoraAI, ChatMessage } from '../services/aiService';
import { MarkdownMessageRenderer } from '../components/MarkdownMessageRenderer';
import { Send, Bot, Sparkles, User as UserIcon, HelpCircle, GraduationCap, RefreshCw } from 'lucide-react';

export const MindoraAiView: React.FC = () => {
  const { state, addXP, calculateLevel } = useUser();
  const { title } = calculateLevel(state.xp);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `# Olá, ${state.name}! Eu sou a MINDORA AI 🎓

Sou a tua **professora virtual e tutora pedagógica pessoal**.

Aqui podes fazer qualquer pergunta educativa, pedir explicações aprofundadas, exemplos resolvidos passo a passo, exercícios para praticar ou apoio em qualquer matéria. 

### O que gostarias de aprender hoje?
Podes clicar numa das sugestões abaixo ou escrever qualquer dúvida no chat!`,
      timestamp: 'Agora'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'connected' | 'fallback'>('checking');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Check health endpoint on load
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data?.hasGeminiKey) {
          setServerStatus('connected');
        } else {
          setServerStatus('fallback');
        }
      })
      .catch(() => {
        setServerStatus('fallback');
      });
  }, []);

  // Six mandatory test prompts + popular study themes
  const pedagogicalPrompts = [
    { label: "O que é Matemática?", query: "O que é Matemática?" },
    { label: "Explica a fotossíntese", query: "Explica a fotossíntese." },
    { label: "Como funciona a eletricidade?", query: "Como funciona a eletricidade?" },
    { label: "Equações do 1º grau", query: "O que são equações do primeiro grau?" },
    { label: "Aprender Inglês do zero", query: "Ensina-me inglês desde o início." },
    { label: "5 Exercícios de Geografia", query: "Cria cinco exercícios de Geografia." },
    { label: "Teorema de Pitágoras", query: "Explica o Teorema de Pitágoras com exemplos" },
    { label: "As 3 Leis de Newton", query: "Quais são as 3 Leis de Newton na Física?" },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await askMindoraAI(query, messages, title);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
      addXP(10, "Consulta pedagógica à MINDORA AI");
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "Desculpa, ocorreu uma oscilação na ligação. Podes repetir a tua pergunta?",
        timestamp: 'Agora'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `# Olá de novo, ${state.name}! 🎓
A conversa foi reiniciada. Que matéria ou conceito gostarias de explorar agora?`,
        timestamp: 'Agora'
      }
    ]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-150">
      {/* Header with Mascot */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-sky-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />

        <div className="space-y-3 text-center sm:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Professora Virtual & Tutoria Pedagógica</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <span>MINDORA AI</span>
            <span className="text-sky-200 text-lg sm:text-xl font-normal">| Ensino Direto</span>
          </h2>

          <p className="text-brand-50 text-xs sm:text-sm max-w-lg leading-relaxed">
            Respostas pedagógicas completas, definições claras, exemplos do quotidiano, resolução passo a passo e desafios interativos adaptados ao teu ritmo.
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[11px] text-white/90 font-medium">
            <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-full backdrop-blur-xs">
              <span className={`w-2 h-2 rounded-full ${serverStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-sky-300'}`} />
              <span>{serverStatus === 'connected' ? 'Modelo Gemini 3.8 Ativo' : 'Motor Pedagógico Integrado'}</span>
            </div>
            <div className="flex items-center gap-1 text-sky-100">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Nível: {title}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 z-10 flex flex-col items-center">
          <MascotRobot size="lg" mood="teaching" />
        </div>
      </div>

      {/* Suggested Pedagogical Prompts */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
            <span>Perguntas para testar a profundidade pedagógica:</span>
          </span>
          <button
            onClick={handleClearChat}
            className="text-[11px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer transition"
            title="Limpar histórico da conversa"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Nova conversa</span>
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {pedagogicalPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.query)}
              disabled={isLoading}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 text-xs font-semibold border border-slate-200 hover:border-brand-300 transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
        <div className="overflow-y-auto space-y-5 pr-2 custom-scrollbar flex-1 max-h-[600px]">
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-sky-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-500/20 mt-1">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[82%] rounded-3xl p-4 sm:p-6 text-xs sm:text-sm leading-relaxed transition-all ${
                    isMe
                      ? 'bg-gradient-to-r from-brand-600 to-sky-600 text-white rounded-tr-xs shadow-md shadow-brand-500/20'
                      : 'bg-slate-50/90 border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs'
                  }`}
                >
                  <MarkdownMessageRenderer content={msg.text} isUser={isMe} />

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200/40 text-[10px]">
                    <span className={isMe ? 'text-brand-200 font-medium' : 'text-slate-400 font-medium'}>
                      {isMe ? 'Tu' : 'MINDORA AI'}
                    </span>
                    <span className={isMe ? 'text-brand-200' : 'text-slate-400'}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>

                {isMe && (
                  <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1 shadow-xs font-bold text-sm">
                    {state.name ? state.name[0].toUpperCase() : <UserIcon className="w-5 h-5" />}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 sm:gap-4 justify-start items-center animate-in fade-in">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-sky-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-500/20 animate-pulse">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping"></span>
                <span>A MINDORA AI está a redigir a tua explicação pedagógica estruturada...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faz uma pergunta pedagógica, pede exemplos ou envia a tua resposta ao desafio..."
            className="flex-1 px-4 sm:px-5 py-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500 focus:bg-white transition placeholder:text-slate-400 shadow-2xs"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3.5 sm:px-6 sm:py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-sky-600 hover:from-brand-700 hover:to-sky-700 text-white font-bold text-xs sm:text-sm transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-brand-500/20 cursor-pointer active:scale-95"
          >
            <span className="hidden sm:inline">Enviar</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
