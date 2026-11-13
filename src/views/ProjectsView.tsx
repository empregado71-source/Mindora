import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { MindoraProject, ProjectCategory, ProjectPriority, ProjectTask } from '../types';
import {
  FolderKanban,
  Plus,
  Search,
  LayoutGrid,
  List as ListIcon,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  MoreVertical,
  Edit2,
  Trash2,
  CheckSquare,
  Square,
  Lightbulb,
  FileText,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const {
    state,
    createProject,
    updateProject,
    deleteProject,
    toggleProjectTask,
    addProjectTask,
    deleteProjectTask,
    completeProject
  } = useUser();

  const projects = state.projects || [];
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedPriority, setSelectedPriority] = useState<string>('todos');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<MindoraProject | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<MindoraProject | null>(null);
  const [activeProjectDetail, setActiveProjectDetail] = useState<MindoraProject | null>(null);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<ProjectCategory>('Programação');
  const [newPriority, setNewPriority] = useState<ProjectPriority>('media');
  const [newDeadline, setNewDeadline] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [initialTaskInput, setInitialTaskInput] = useState('');
  const [initialTasks, setInitialTasks] = useState<string[]>([]);

  // Task adder in detail modal
  const [quickTaskText, setQuickTaskText] = useState('');
  const [quickIdeaText, setQuickIdeaText] = useState('');

  const categories: ProjectCategory[] = [
    'Programação',
    'Design',
    'Arte',
    'Estudos',
    'Negócios',
    'Projetos Pessoais',
    'Outros'
  ];

  // Filtering
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesPri = selectedPriority === 'todos' || p.priority === selectedPriority;
    return matchesSearch && matchesCat && matchesPri;
  });

  const completedCount = projects.filter((p) => p.status === 'concluido').length;
  const inProgressCount = projects.filter((p) => p.status === 'em_andamento').length;
  const totalTasksCount = projects.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasksCount = projects.reduce(
    (acc, p) => acc + p.tasks.filter((t) => t.completed).length,
    0
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createProject({
      title: newTitle.trim(),
      description: newDesc.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'em_andamento',
      deadline: newDeadline || undefined,
      notes: newNotes.trim() || undefined,
      ideas: [],
      tasks: initialTasks.map((t, i) => ({
        id: `task_init_${i}_${Date.now()}`,
        title: t,
        completed: false
      }))
    });

    // Reset
    setNewTitle('');
    setNewDesc('');
    setNewCategory('Programação');
    setNewPriority('media');
    setNewDeadline('');
    setNewNotes('');
    setInitialTasks([]);
    setIsCreateModalOpen(false);
  };

  const handleAddInitialTask = () => {
    if (!initialTaskInput.trim()) return;
    setInitialTasks([...initialTasks, initialTaskInput.trim()]);
    setInitialTaskInput('');
  };

  const getPriorityBadge = (priority: ProjectPriority) => {
    switch (priority) {
      case 'urgente':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-800">Urgente</span>;
      case 'alta':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-800">Alta</span>;
      case 'media':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-800">Média</span>;
      case 'baixa':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-700">Baixa</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
            <FolderKanban className="w-3.5 h-3.5 text-brand-600" /> Organização de Projetos Pessoais & Profissionais
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            MINDORA Projects
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Planeia tarefas, define prazos, regista notas de aprendizagem e acompanha o teu progresso prático em tempo real.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-md shadow-brand-500/20 active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Novo Projeto
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block">Total de Projetos</span>
            <span className="text-2xl font-black text-slate-800 mt-1 block">{projects.length}</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block">Em Andamento</span>
            <span className="text-2xl font-black text-blue-600 mt-1 block">{inProgressCount}</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block">Projetos Concluídos</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">{completedCount}</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block">Tarefas Realizadas</span>
            <span className="text-2xl font-black text-indigo-600 mt-1 block">
              {completedTasksCount} / {totalTasksCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and View Toggle Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar projetos por título ou descrição..."
            className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
          />
        </div>

        {/* Categories scrollable chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
          <button
            onClick={() => setSelectedCategory('todos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              selectedCategory === 'todos'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas as Categorias
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedCategory === c
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl shrink-0 self-end md:self-auto">
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2 rounded-xl transition cursor-pointer ${
              viewMode === 'cards' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Visualização em Cartões"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl transition cursor-pointer ${
              viewMode === 'list' ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Visualização em Lista"
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Projects Display: CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <FolderKanban className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-extrabold text-slate-700 text-base">Nenhum projeto encontrado</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Não foram encontrados projetos com os filtros atuais. Cria o teu primeiro projeto ou altera a pesquisa!
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-2 px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700 transition"
              >
                + Criar Primeiro Projeto
              </button>
            </div>
          ) : (
            filteredProjects.map((p) => {
              const completedTasks = p.tasks.filter((t) => t.completed).length;
              const isDone = p.status === 'concluido';

              return (
                <div
                  key={p.id}
                  className={`bg-white rounded-3xl border transition-all shadow-xs hover:shadow-xl p-6 flex flex-col justify-between group cursor-pointer ${
                    isDone ? 'border-emerald-200 bg-emerald-50/15' : 'border-slate-100 hover:border-brand-200'
                  }`}
                  onClick={() => setActiveProjectDetail(p)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {p.category}
                      </span>
                      {getPriorityBadge(p.priority)}
                    </div>

                    <h3 className="font-extrabold text-slate-800 text-lg leading-snug group-hover:text-brand-600 transition-colors flex items-center gap-1.5">
                      <span>{p.title}</span>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {p.description || 'Sem descrição registada.'}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400">Tarefas: {completedTasks}/{p.tasks.length}</span>
                        <span className={isDone ? 'text-emerald-600' : 'text-brand-600'}>
                          {p.progressPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-500 to-sky-400'
                          }`}
                          style={{ width: `${p.progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Deadline & notes summary */}
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-medium">
                      {p.deadline ? (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-brand-500" /> Prazo: {p.deadline}
                        </span>
                      ) : (
                        <span>Sem prazo fixo</span>
                      )}
                      {p.ideas && p.ideas.length > 0 && (
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          <Lightbulb className="w-3 h-3" /> {p.ideas.length} ideias
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-brand-600 flex items-center gap-1 group-hover:underline">
                      Ver Detalhes e Tarefas <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectToDelete(p);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Eliminar projeto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Projects Display: LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredProjects.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">Nenhum projeto encontrado.</div>
            ) : (
              filteredProjects.map((p) => {
                const isDone = p.status === 'concluido';
                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveProjectDetail(p)}
                    className="p-4 sm:p-5 hover:bg-slate-50/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {p.category}
                        </span>
                        {getPriorityBadge(p.priority)}
                        <h4 className="font-extrabold text-slate-800 text-sm">{p.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 truncate max-w-lg">{p.description}</p>
                    </div>

                    <div className="flex items-center gap-6 shrink-0 text-xs">
                      <div className="w-28 text-right">
                        <div className="text-[11px] font-bold text-slate-600">{p.progressPercentage}% concluído</div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full ${isDone ? 'bg-emerald-500' : 'bg-brand-500'}`}
                            style={{ width: `${p.progressPercentage}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setProjectToDelete(p);
                        }}
                        className="p-2 text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 border border-slate-100 shadow-2xl custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-brand-600" /> Criar Novo Projeto
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Título do Projeto *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Aplicação Web de Inteligência Artificial"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Objetivo principal, público-alvo ou competências a desenvolver..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-500 text-xs sm:text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Prioridade</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none"
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Prazo de Conclusão</label>
                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Notas / Metodologia</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Anotações técnicas, referências bibliográficas ou links..."
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none text-xs resize-none"
                />
              </div>

              {/* Initial Tasks */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="font-bold text-slate-700 block text-xs">Tarefas Iniciais:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={initialTaskInput}
                    onChange={(e) => setInitialTaskInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddInitialTask();
                      }
                    }}
                    placeholder="Adicionar tarefa inicial..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddInitialTask}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Adicionar
                  </button>
                </div>

                {initialTasks.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs">
                    <span>{idx + 1}. {t}</span>
                    <button
                      type="button"
                      onClick={() => setInitialTasks(initialTasks.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-xs"
                >
                  Guardar Projeto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT DETAIL & TASK MANAGEMENT MODAL */}
      {activeProjectDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 border border-slate-100 shadow-2xl custom-scrollbar flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {activeProjectDetail.category}
                    </span>
                    {getPriorityBadge(activeProjectDetail.priority)}
                    {activeProjectDetail.status === 'concluido' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                        Concluído
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {activeProjectDetail.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {activeProjectDetail.description}
                  </p>
                </div>

                <button
                  onClick={() => setActiveProjectDetail(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress and Action Bar */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Progresso Geral do Projeto</span>
                    <span className="text-brand-600 font-black">{activeProjectDetail.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-brand-600 h-2 rounded-full transition-all"
                      style={{ width: `${activeProjectDetail.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {activeProjectDetail.status !== 'concluido' && (
                  <button
                    onClick={() => {
                      completeProject(activeProjectDetail.id);
                      setActiveProjectDetail({ ...activeProjectDetail, status: 'concluido', progressPercentage: 100 });
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Concluir Projeto (+100 XP)
                  </button>
                )}
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-brand-600" /> Tarefas ({activeProjectDetail.tasks.length})
                  </h4>
                </div>

                {/* Task Quick Adder */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!quickTaskText.trim()) return;
                    addProjectTask(activeProjectDetail.id, {
                      title: quickTaskText.trim(),
                      completed: false
                    });
                    // Local update for immediate feedback
                    setActiveProjectDetail({
                      ...activeProjectDetail,
                      tasks: [
                        ...activeProjectDetail.tasks,
                        { id: `t_${Date.now()}`, title: quickTaskText.trim(), completed: false }
                      ]
                    });
                    setQuickTaskText('');
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={quickTaskText}
                    onChange={(e) => setQuickTaskText(e.target.value)}
                    placeholder="Adicionar nova tarefa ao projeto..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-600 text-white rounded-xl font-bold text-xs hover:bg-brand-700 cursor-pointer"
                  >
                    Adicionar
                  </button>
                </form>

                <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                  {activeProjectDetail.tasks.length === 0 ? (
                    <div className="text-xs text-slate-400 italic py-2">Nenhuma tarefa registada ainda.</div>
                  ) : (
                    activeProjectDetail.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 transition"
                      >
                        <div
                          onClick={() => {
                            toggleProjectTask(activeProjectDetail.id, task.id);
                            // Local sync
                            setActiveProjectDetail({
                              ...activeProjectDetail,
                              tasks: activeProjectDetail.tasks.map((t) =>
                                t.id === task.id ? { ...t, completed: !t.completed } : t
                              )
                            });
                          }}
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          {task.completed ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-300 shrink-0" />
                          )}
                          <span
                            className={`text-xs font-semibold ${
                              task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            deleteProjectTask(activeProjectDetail.id, task.id);
                            setActiveProjectDetail({
                              ...activeProjectDetail,
                              tasks: activeProjectDetail.tasks.filter((t) => t.id !== task.id)
                            });
                          }}
                          className="text-slate-300 hover:text-rose-600 p-1 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Notes and Ideas section */}
              {activeProjectDetail.notes && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <FileText className="w-3.5 h-3.5 text-amber-600" /> Notas do Projeto:
                  </div>
                  <p className="text-xs text-amber-950 whitespace-pre-wrap leading-relaxed">
                    {activeProjectDetail.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveProjectDetail(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 border border-slate-200 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">Eliminar este projeto?</h4>
            <p className="text-xs text-slate-500">
              Tens a certeza de que desejas eliminar <strong>"{projectToDelete.title}"</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setProjectToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteProject(projectToDelete.id);
                  if (activeProjectDetail?.id === projectToDelete.id) {
                    setActiveProjectDetail(null);
                  }
                  setProjectToDelete(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Sim, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
