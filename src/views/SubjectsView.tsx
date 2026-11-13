import React, { useState } from 'react';
import { Subject, SubjectLevel } from '../types';
import { SUBJECTS } from '../data/learningData';
import { ChevronRight, Filter, BookOpen, Layers } from 'lucide-react';

interface SubjectsViewProps {
  onOpenSubject: (subject: Subject) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({ onOpenSubject }) => {
  const [levelFilter, setLevelFilter] = useState<'todos' | SubjectLevel>('todos');
  const [categoryFilter, setCategoryFilter] = useState<'todos' | string>('todos');

  const categories = [
    'todos',
    'Exatas',
    'Humanas',
    'Línguas',
    'Tecnologia',
    'Biológicas & Terra',
    'Sociedade & Negócios'
  ];

  const filteredSubjects = SUBJECTS.filter((sub) => {
    const matchLevel = levelFilter === 'todos' || sub.level.toLowerCase() === levelFilter.toLowerCase();
    const matchCat = categoryFilter === 'todos' || sub.category === categoryFilter;
    return matchLevel && matchCat;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5 text-brand-600" /> 25 Áreas de Conhecimento Estruturadas
          </div>
          <h2 className="text-3xl font-black text-slate-800">Biblioteca de Matérias</h2>
          <p className="text-slate-500 text-sm mt-1">
            Da Matemática e Inteligência Artificial à Filosofia e Astronomia: lições profundas, exemplos resolvidos e exercícios interativos.
          </p>
        </div>

        {/* Level filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-500">Nível:</span>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as any)}
            className="bg-white border border-slate-200 text-slate-700 text-xs rounded-2xl px-3.5 py-2 font-bold focus:outline-none focus:border-brand-500 shadow-xs cursor-pointer"
          >
            <option value="todos">Todos os Níveis</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermédio">Intermédio</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat) => {
          const isSelected = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat === 'todos' ? `Todas as Matérias (${SUBJECTS.length})` : cat}
            </button>
          );
        })}
      </div>

      {/* Grid of 25 Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub) => (
          <div
            key={sub.id}
            onClick={() => onOpenSubject(sub)}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:border-brand-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {sub.icon}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {sub.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sub.badgeColor}`}>
                    {sub.level}
                  </span>
                </div>
              </div>

              <h3 className="font-black text-slate-800 text-lg group-hover:text-brand-600 transition-colors">
                {sub.name}
              </h3>
              <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                {sub.intro}
              </p>

              <div className="mt-4 space-y-1.5">
                {sub.topics.slice(0, 2).map((t, idx) => (
                  <div key={idx} className="text-[11px] text-slate-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>
                    <span className="font-semibold truncate">{t.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">
                {sub.topics.length} Módulos Teóricos
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSubject(sub);
                }}
                className="px-4 py-2 rounded-2xl bg-brand-50 text-brand-700 text-xs font-bold group-hover:bg-brand-600 group-hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Abrir Estudo <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
