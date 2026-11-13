import React, { useState, useMemo } from 'react';
import { TabType, GameType, Subject, SearchItem } from '../types';
import { SUBJECTS, COURSES } from '../data/learningData';
import { Search, X, ChevronRight, Layers, Book, Gamepad, Sparkles } from 'lucide-react';

interface SearchViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenSubject: (subject: Subject) => void;
  onOpenGame: (game: GameType) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  onNavigate,
  onOpenSubject,
  onOpenGame
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'matéria' | 'exercício' | 'curso' | 'jogo' | 'conceito'>('todos');

  // Build unified search index covering 25 subjects, lessons, courses, and 10 games
  const searchIndex: (SearchItem & { originalSub?: Subject })[] = useMemo(() => {
    const list: (SearchItem & { originalSub?: Subject })[] = [];

    // All 25 Subjects & their Topics & Exercises
    SUBJECTS.forEach((s) => {
      list.push({
        type: 'matéria',
        title: s.name,
        subtitle: `${s.category} • Nível: ${s.level}`,
        snippet: s.intro,
        badge: 'Matéria',
        actionType: 'open-subject',
        payload: s.id,
        originalSub: s
      });

      s.topics.forEach((t) => {
        list.push({
          type: 'matéria',
          title: `${s.name}: ${t.title}`,
          subtitle: `Tópico Curricular de ${s.name}`,
          snippet: t.desc,
          badge: 'Tópico Teórico',
          actionType: 'open-subject',
          payload: s.id,
          originalSub: s
        });
      });

      list.push({
        type: 'exercício',
        title: `Desafio Prático: ${s.name}`,
        subtitle: `Exercício com feedback (+15 XP)`,
        snippet: s.exercise.q,
        badge: 'Exercício',
        actionType: 'open-subject',
        payload: s.id,
        originalSub: s
      });

      if (s.glossary) {
        s.glossary.forEach((g) => {
          list.push({
            type: 'conceito',
            title: `${g.term} (${s.name})`,
            subtitle: 'Conceito do Glossário',
            snippet: g.definition,
            badge: 'Glossário',
            actionType: 'open-subject',
            payload: s.id,
            originalSub: s
          });
        });
      }
    });

    // Courses
    COURSES.forEach((c) => {
      list.push({
        type: 'curso',
        title: c.title,
        subtitle: `${c.cat} • ${c.duration}`,
        snippet: c.desc,
        badge: 'Curso',
        actionType: 'open-course',
        payload: c.id
      });
    });

    // All 10 Games
    const allGames = [
      { id: 'calc' as GameType, title: 'Cálculo Rápido', snippet: 'Operações aritméticas contra o tempo de 30 segundos.' },
      { id: 'memory' as GameType, title: 'Jogo da Memória Científico', snippet: 'Associa pares da tabela periódica entre elementos químicos e símbolos.' },
      { id: 'flash' as GameType, title: 'Quiz Relâmpago', snippet: 'Responde velozmente com apenas 5 segundos por questão.' },
      { id: 'words' as GameType, title: 'Caça às Palavras Interativo', snippet: 'Descobre os termos da ciência escondidos na matriz de letras.' },
      { id: 'vocab' as GameType, title: 'Desafio de Vocabulário', snippet: 'Conecta pares bilíngues de vocabulário e expressões comuns.' },
      { id: 'truefalse' as GameType, title: 'Verdadeiro ou Falso', snippet: 'Avalia afirmações científicas e factos mundiais.' },
      { id: 'chemistry' as GameType, title: 'Desafio de Química', snippet: 'Identifica fórmulas moleculares, números atómicos e soluções.' },
      { id: 'geography' as GameType, title: 'Desafio de Geografia', snippet: 'Capitais de países, continentes e acidentes geográficos.' },
      { id: 'history' as GameType, title: 'Desafio de História', snippet: 'Grandes eras da humanidade, líderes e marcos civilizacionais.' },
      { id: 'logic' as GameType, title: 'Desafio de Lógica', snippet: 'Sequências matemáticas, dedução temporal e enigmas analíticos.' }
    ];

    allGames.forEach((g) => {
      list.push({
        type: 'jogo',
        title: g.title,
        subtitle: 'Jogo Educativo Ativo',
        snippet: g.snippet,
        badge: 'Jogo',
        actionType: 'open-game',
        payload: g.id
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    return searchIndex.filter((item) => {
      const matchCategory = selectedCategory === 'todos' || item.type === selectedCategory;
      const matchText =
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q);
      return matchCategory && matchText;
    });
  }, [query, selectedCategory, searchIndex]);

  const handleAction = (item: (SearchItem & { originalSub?: Subject })) => {
    if (item.actionType === 'open-subject' && item.originalSub) {
      onOpenSubject(item.originalSub);
    } else if (item.actionType === 'open-game') {
      onNavigate('jogos');
      onOpenGame(item.payload as GameType);
    } else if (item.actionType === 'open-course') {
      onNavigate('cursos');
    }
  };

  const categories: { id: 'todos' | 'matéria' | 'exercício' | 'curso' | 'jogo' | 'conceito'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'matéria', label: 'Matérias' },
    { id: 'exercício', label: 'Exercícios' },
    { id: 'curso', label: 'Cursos' },
    { id: 'jogo', label: 'Jogos' },
    { id: 'conceito', label: 'Conceitos' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-150">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-black text-slate-800">Pesquisa Global Inteligente</h2>
        <p className="text-slate-500 text-sm">
          Pesquisa instantânea em 25 matérias, centenas de lições, cursos, 10 jogos e conceitos pedagógicos.
        </p>

        {/* Search Input Bar */}
        <div className="relative pt-3">
          <div className="absolute inset-y-0 left-0 pl-4 pt-3 flex items-center pointer-events-none text-brand-600">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por matéria, conceito, fórmula ou jogo (ex: Pitágoras, Python, Células, Newton)..."
            className="w-full pl-12 pr-12 py-4 bg-white border-2 border-brand-100 focus:border-brand-500 rounded-3xl text-slate-800 shadow-xs focus:outline-none transition font-medium text-sm"
          />
          {query.length > 0 && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-4 pt-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-brand-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results Container */}
      <div className="space-y-3 pt-2">
        {query.trim().length < 2 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
            <div className="text-4xl">🔍</div>
            <h4 className="font-bold text-slate-700 text-base">O que pretendes aprender agora?</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Digita pelo menos 2 caracteres para pesquisar instantaneamente em todas as 25 matérias e jogos da MINDORA.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
            <div className="text-4xl">🔎</div>
            <h4 className="font-bold text-slate-700 text-base">Nenhum resultado encontrado</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Tenta pesquisar palavras como &quot;Matemática&quot;, &quot;DNA&quot;, &quot;Equação&quot;, &quot;Inglês&quot;, &quot;Memória&quot; ou &quot;Python&quot;.
            </p>
          </div>
        ) : (
          results.map((item, index) => (
            <div
              key={index}
              onClick={() => handleAction(item)}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-brand-200"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-100">
                    {item.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.subtitle}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-base group-hover:text-brand-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed">
                  {item.snippet}
                </p>
              </div>

              <button className="shrink-0 px-4 py-2 rounded-xl bg-slate-50 text-brand-600 font-bold text-xs group-hover:bg-brand-600 group-hover:text-white transition flex items-center gap-1.5 self-start sm:self-center">
                Explorar <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
