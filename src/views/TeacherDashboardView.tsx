import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { TeacherService } from '../services/teacherService';
import {
  TeacherCourse,
  TeacherSubject,
  SubjectLevel,
  ContentStatus,
  Exercise,
  TeacherMaterialFile
} from '../types';
import {
  PlusCircle,
  BookOpen,
  GraduationCap,
  Users,
  Star,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Save,
  Send,
  Trash2,
  Eye,
  ExternalLink,
  Sparkles,
  Award
} from 'lucide-react';

interface TeacherDashboardViewProps {
  onOpenTeacherDiscovery: () => void;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ onOpenTeacherDiscovery }) => {
  const { state, addXP } = useUser();
  const [activeSubTab, setActiveSubTab] = useState<'visao_geral' | 'criar_materia' | 'criar_curso' | 'minhas_publicacoes' | 'alunos_inscritos'>('visao_geral');

  // Load teacher's own items
  const myCourses = TeacherService.getCoursesByTeacher(state.id);
  const mySubjects = TeacherService.getSubjectsByTeacher(state.id);
  const myEnrollments = TeacherService.getEnrollmentsByTeacher(state.id);

  // Statistics calculation (real, without mock numbers)
  const totalStudents = myEnrollments.length + myCourses.reduce((acc, c) => acc + (c.enrolledCount || 0), 0);
  const approvedCourses = myCourses.filter((c) => c.status === 'aprovado').length;
  const pendingItems = myCourses.filter((c) => c.status === 'em_analise').length + mySubjects.filter((s) => s.status === 'em_analise').length;
  const draftItems = myCourses.filter((c) => c.status === 'rascunho').length + mySubjects.filter((s) => s.status === 'rascunho').length;

  /* FORM STATE: CRIAR MATÉRIA */
  const [matTitle, setMatTitle] = useState('');
  const [matDiscipline, setMatDiscipline] = useState('Matemática');
  const [matLevel, setMatLevel] = useState<SubjectLevel>('Iniciante');
  const [matTheme, setMatTheme] = useState('');
  const [matObjectives, setMatObjectives] = useState('');
  const [matExplanation, setMatExplanation] = useState('');
  const [matExamples, setMatExamples] = useState('');
  const [matFormulas, setMatFormulas] = useState('');
  const [matSummary, setMatSummary] = useState('');
  const [matQuestion, setMatQuestion] = useState('');
  const [matOptA, setMatOptA] = useState('');
  const [matOptB, setMatOptB] = useState('');
  const [matOptC, setMatOptC] = useState('');
  const [matOptD, setMatOptD] = useState('');
  const [matCorrect, setMatCorrect] = useState(0);
  const [matHint, setMatHint] = useState('');
  const [matExplanationExercise, setMatExplanationExercise] = useState('');
  const [matFileTitle, setMatFileTitle] = useState('');
  const [matFileUrl, setMatFileUrl] = useState('');
  const [matFileType, setMatFileType] = useState<'pdf' | 'video' | 'link' | 'presentation'>('pdf');
  const [matFeedback, setMatFeedback] = useState('');

  /* FORM STATE: CRIAR CURSO */
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState('Tecnologia');
  const [courseLevel, setCourseLevel] = useState<SubjectLevel>('Iniciante');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseDuration, setCourseDuration] = useState('10 Horas');
  const [courseObjectives, setCourseObjectives] = useState('');
  const [coursePrereq, setCoursePrereq] = useState('Nenhum pré-requisito.');
  const [courseFinalProject, setCourseFinalProject] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDuration, setLessonDuration] = useState('20 min');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonVideo, setLessonVideo] = useState('');
  const [courseFeedback, setCourseFeedback] = useState('');

  const handleSaveSubject = (status: ContentStatus) => {
    if (!matTitle.trim() || !matExplanation.trim()) {
      setMatFeedback('Por favor preenche pelo menos o título e a explicação completa da matéria.');
      return;
    }

    const exercises: Exercise[] = [];
    if (matQuestion.trim() && matOptA.trim() && matOptB.trim()) {
      exercises.push({
        q: matQuestion,
        options: [matOptA, matOptB, matOptC || 'N.D.A.', matOptD || 'Outra'].filter(Boolean),
        correct: matCorrect,
        hint: matHint || 'Revê a explicação acima.',
        explanation: matExplanationExercise || 'Conceito abordado na lição.'
      });
    }

    const supplementary: TeacherMaterialFile[] = [];
    if (matFileTitle.trim() && matFileUrl.trim()) {
      supplementary.push({
        id: `mat_f_${Date.now()}`,
        title: matFileTitle,
        url: matFileUrl,
        type: matFileType
      });
    }

    TeacherService.saveSubject({
      teacherId: state.id,
      teacherName: state.name,
      teacherAvatar: state.avatarEmoji,
      title: matTitle,
      discipline: matDiscipline,
      educationLevel: matLevel,
      theme: matTheme || 'Tópico Didático',
      objectives: matObjectives.split('\n').filter(Boolean),
      fullExplanation: matExplanation,
      examples: matExamples,
      formulasOrCode: matFormulas,
      exercises,
      summary: matSummary,
      supplementaryResources: supplementary,
      status
    });

    addXP(15, `Matéria "${matTitle}" guardada`);
    setMatFeedback(`Matéria guardada com sucesso como "${status.toUpperCase()}"!`);

    // Reset fields
    setMatTitle('');
    setMatExplanation('');
    setMatExamples('');
    setMatFormulas('');
    setMatSummary('');
    setMatQuestion('');
  };

  const handleSaveCourse = (status: ContentStatus) => {
    if (!courseTitle.trim() || !courseDesc.trim()) {
      setCourseFeedback('Por favor preenche o título e a descrição do curso.');
      return;
    }

    const lessons = [];
    if (lessonTitle.trim()) {
      lessons.push({
        id: `les_${Date.now()}`,
        title: lessonTitle,
        duration: lessonDuration,
        content: lessonContent || 'Conteúdo introdutório da lição.',
        videoUrl: lessonVideo || undefined
      });
    }

    TeacherService.saveCourse({
      teacherId: state.id,
      teacherName: state.name,
      teacherAvatar: state.avatarEmoji,
      teacherBio: state.interest,
      title: courseTitle,
      category: courseCategory,
      level: courseLevel,
      description: courseDesc,
      estimatedDuration: courseDuration,
      objectives: courseObjectives.split('\n').filter(Boolean),
      prerequisites: coursePrereq,
      finalProject: courseFinalProject,
      status,
      modules: [
        {
          id: `mod_${Date.now()}`,
          title: 'Módulo 1 — Fundamentos & Conceitos Chave',
          description: 'Aulas estruturadas com materiais didáticos e exercícios.',
          lessons: lessons.length > 0 ? lessons : [
            {
              id: `les_def_${Date.now()}`,
              title: 'Aula 1: Introdução Geral',
              duration: '20 min',
              content: 'Bem-vindo ao curso! Aqui analisamos os pilares da matéria.'
            }
          ]
        }
      ]
    });

    addXP(30, `Curso "${courseTitle}" criado`);
    setCourseFeedback(`Curso guardado com sucesso como "${status.toUpperCase()}"!`);

    // Reset fields
    setCourseTitle('');
    setCourseDesc('');
    setLessonTitle('');
    setLessonContent('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-800 via-brand-700 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" /> MINDORA Teachers
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Painel do Educador — {state.name}
          </h2>
          <p className="text-brand-100 text-xs sm:text-sm max-w-xl">
            Cria matérias didáticas aprofundadas, publica cursos estruturados 100% gratuitos para os estudantes e acompanha as tuas métricas pedagógicas.
          </p>
        </div>

        <button
          onClick={onOpenTeacherDiscovery}
          className="px-5 py-3 rounded-2xl bg-white text-brand-800 font-extrabold text-xs sm:text-sm hover:bg-brand-50 transition shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Eye className="w-4 h-4 text-brand-600" /> Ver Área dos Estudantes
        </button>
      </div>

      {/* Teacher Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'visao_geral', label: 'Visão Geral', icon: <Award className="w-4 h-4" /> },
          { id: 'criar_materia', label: 'Criar Matéria', icon: <PlusCircle className="w-4 h-4" /> },
          { id: 'criar_curso', label: 'Criar Curso', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'minhas_publicacoes', label: `Minhas Publicações (${myCourses.length + mySubjects.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'alunos_inscritos', label: `Alunos Inscritos (${totalStudents})`, icon: <Users className="w-4 h-4" /> }
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. VISÃO GERAL */}
      {activeSubTab === 'visao_geral' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Cursos Criados</span>
                <div className="text-2xl font-black text-slate-800">{myCourses.length}</div>
                <span className="text-xs text-emerald-600 font-bold">{approvedCourses} Aprovados</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Matérias & Lições</span>
                <div className="text-2xl font-black text-slate-800">{mySubjects.length}</div>
                <span className="text-xs text-brand-600 font-bold">Conteúdos didáticos</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Alunos Inscritos</span>
                <div className="text-2xl font-black text-slate-800">{totalStudents}</div>
                <span className="text-xs text-emerald-600 font-bold">Inscrições 100% gratuitas</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Em Análise / Rascunhos</span>
                <div className="text-2xl font-black text-slate-800">{pendingItems + draftItems}</div>
                <span className="text-xs text-amber-600 font-bold">{pendingItems} na moderação</span>
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              onClick={() => setActiveSubTab('criar_materia')}
              className="p-6 bg-white rounded-3xl border border-slate-100 hover:border-brand-300 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-brand-600">Criar Novo Material</span>
                <h4 className="font-black text-slate-800 text-lg group-hover:text-brand-600">Criador de Matérias</h4>
                <p className="text-xs text-slate-500">Escreve lições com fórmulas, exercícios, resumo e anexos PDF/vídeo.</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition">
                <PlusCircle className="w-6 h-6" />
              </div>
            </div>

            <div
              onClick={() => setActiveSubTab('criar_curso')}
              className="p-6 bg-white rounded-3xl border border-slate-100 hover:border-brand-300 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-sky-600">Criar Novo Curso</span>
                <h4 className="font-black text-slate-800 text-lg group-hover:text-sky-600">Criador de Cursos</h4>
                <p className="text-xs text-slate-500">Desenvolve percursos completos com múltiplos módulos e projeto final.</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CRIAR MATÉRIA */}
      {activeSubTab === 'criar_materia' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-black text-slate-800">Criador de Matérias Educativas</h3>
            <p className="text-xs text-slate-500 mt-1">
              Publica uma lição detalhada com exemplos resolvidos, exercícios e recursos complementares.
            </p>
          </div>

          {matFeedback && (
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
              <span>{matFeedback}</span>
            </div>
          )}

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Título da Lição/Matéria *</label>
                <input
                  type="text"
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  placeholder="Ex: Teorema da Energia Cinética e Conservação"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Disciplina *</label>
                <select
                  value={matDiscipline}
                  onChange={(e) => setMatDiscipline(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
                >
                  <option value="Matemática">Matemática</option>
                  <option value="Física">Física</option>
                  <option value="Química">Química</option>
                  <option value="Biologia">Biologia</option>
                  <option value="Informática">Informática</option>
                  <option value="Programação">Programação</option>
                  <option value="Inteligência Artificial">Inteligência Artificial</option>
                  <option value="Inglês">Inglês</option>
                  <option value="História">História</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nível de Ensino</label>
                <select
                  value={matLevel}
                  onChange={(e) => setMatLevel(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermédio">Intermédio</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tema / Unidade</label>
                <input
                  type="text"
                  value={matTheme}
                  onChange={(e) => setMatTheme(e.target.value)}
                  placeholder="Ex: Mecânica e Dinâmica Newtoniana"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Objetivos de Aprendizagem (um por linha)</label>
              <textarea
                rows={2}
                value={matObjectives}
                onChange={(e) => setMatObjectives(e.target.value)}
                placeholder="Compreender a relação entre trabalho de forças e energia cinética&#10;Aplicar a conservação de energia a corpos em queda livre"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Explicação Completa e Teoria Didática *</label>
              <textarea
                rows={6}
                value={matExplanation}
                onChange={(e) => setMatExplanation(e.target.value)}
                placeholder="Escreve a lição pedagógica passo a passo para o estudante..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-medium focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Exemplo Prático Resolvido</label>
                <textarea
                  rows={3}
                  value={matExamples}
                  onChange={(e) => setMatExamples(e.target.value)}
                  placeholder="Exemplo numérico resolvido passo a passo..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-medium focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fórmulas Importantes ou Código</label>
                <textarea
                  rows={3}
                  value={matFormulas}
                  onChange={(e) => setMatFormulas(e.target.value)}
                  placeholder="Ec = 1/2 m v² ou def calcular():..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 text-brand-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-brand-400"
                />
              </div>
            </div>

            {/* In-lesson exercise */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="font-extrabold text-xs uppercase tracking-wider text-slate-500 block">
                Exercício de Fixação para o Estudante
              </span>

              <div>
                <input
                  type="text"
                  value={matQuestion}
                  onChange={(e) => setMatQuestion(e.target.value)}
                  placeholder="Pergunta do exercício..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 font-semibold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={matOptA}
                  onChange={(e) => setMatOptA(e.target.value)}
                  placeholder="Opção A"
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200"
                />
                <input
                  type="text"
                  value={matOptB}
                  onChange={(e) => setMatOptB(e.target.value)}
                  placeholder="Opção B"
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200"
                />
                <input
                  type="text"
                  value={matOptC}
                  onChange={(e) => setMatOptC(e.target.value)}
                  placeholder="Opção C"
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200"
                />
                <input
                  type="text"
                  value={matOptD}
                  onChange={(e) => setMatOptD(e.target.value)}
                  placeholder="Opção D"
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="font-bold text-slate-600">Opção Correta:</span>
                {[0, 1, 2, 3].map((num) => (
                  <label key={num} className="flex items-center gap-1 cursor-pointer font-bold">
                    <input
                      type="radio"
                      name="matCorrect"
                      checked={matCorrect === num}
                      onChange={() => setMatCorrect(num)}
                    />
                    <span>{['A', 'B', 'C', 'D'][num]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Supplementary resource */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título do Anexo/Material</label>
                <input
                  type="text"
                  value={matFileTitle}
                  onChange={(e) => setMatFileTitle(e.target.value)}
                  placeholder="Ex: Folha de Fórmulas PDF"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Link Seguro (URL)</label>
                <input
                  type="url"
                  value={matFileUrl}
                  onChange={(e) => setMatFileUrl(e.target.value)}
                  placeholder="https://exemplo.com/material.pdf"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Ficheiro</label>
                <select
                  value={matFileType}
                  onChange={(e) => setMatFileType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-xs"
                >
                  <option value="pdf">PDF Educativo</option>
                  <option value="video">Vídeo Explicativo</option>
                  <option value="presentation">Apresentação / Slides</option>
                  <option value="link">Link Externo</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleSaveSubject('rascunho')}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Guardar Rascunho
              </button>
              <button
                type="button"
                onClick={() => handleSaveSubject('em_analise')}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md shadow-brand-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Enviar para Aprovação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CRIAR CURSO */}
      {activeSubTab === 'criar_curso' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-black text-slate-800">Criador de Cursos Estruturados</h3>
            <p className="text-xs text-slate-500 mt-1">
              Desenvolve um percurso completo com múltiplos módulos, lições sequenciais e projeto final.
            </p>
          </div>

          {courseFeedback && (
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
              <span>{courseFeedback}</span>
            </div>
          )}

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Curso *</label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Ex: Introdução Prática a Machine Learning"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Categoria *</label>
                <select
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
                >
                  <option value="Tecnologia">Tecnologia & IA</option>
                  <option value="Ciências Exatas">Ciências Exatas</option>
                  <option value="Idiomas">Idiomas</option>
                  <option value="Humanidades">Humanidades</option>
                  <option value="Negócios">Negócios & Gestão</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nível de Dificuldade</label>
                <select
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermédio">Intermédio</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duração Estimada</label>
                <input
                  type="text"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                  placeholder="Ex: 12 Horas"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pré-requisitos</label>
                <input
                  type="text"
                  value={coursePrereq}
                  onChange={(e) => setCoursePrereq(e.target.value)}
                  placeholder="Ex: Noções básicas de Python"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Descrição Completa do Curso *</label>
              <textarea
                rows={3}
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                placeholder="Apresenta os objetivos do curso, o que o estudante será capaz de construir e competências adquiridas..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-medium focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* First Module Lesson Builder */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="font-extrabold text-xs uppercase tracking-wider text-slate-500 block">
                Módulo 1: Adicionar Primeira Aula Interativa
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="Título da Aula (ex: O que são Redes Neuronais)"
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 font-semibold text-xs"
                />
                <input
                  type="text"
                  value={lessonVideo}
                  onChange={(e) => setLessonVideo(e.target.value)}
                  placeholder="Link de Vídeo Educativo (YouTube/Vimeo)"
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 font-semibold text-xs"
                />
              </div>

              <textarea
                rows={3}
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                placeholder="Texto explicativo da aula e notas pedagógicas..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 font-medium text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Projeto Final Proposto (opcional)</label>
              <input
                type="text"
                value={courseFinalProject}
                onChange={(e) => setCourseFinalProject(e.target.value)}
                placeholder="Ex: Treinar um modelo classificador de imagens e publicar no GitHub"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleSaveCourse('rascunho')}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Guardar Rascunho
              </button>
              <button
                type="button"
                onClick={() => handleSaveCourse('em_analise')}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md shadow-brand-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Submeter para Aprovação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MINHAS PUBLICAÇÕES */}
      {activeSubTab === 'minhas_publicacoes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800">Materiais & Cursos do Educador</h3>
            <span className="text-xs text-slate-400 font-bold">Total: {myCourses.length + mySubjects.length} itens</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myCourses.map((c) => (
              <div key={c.id} className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Curso
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        c.status === 'aprovado'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : c.status === 'em_analise'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {c.status === 'aprovado' ? '✓ Aprovado' : c.status === 'em_analise' ? '⏳ Em Análise' : 'Rascunho'}
                    </span>
                  </div>
                  <h4 className="font-black text-slate-800 text-base">{c.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                  <span>{c.enrolledCount} Alunos Inscritos</span>
                  <span className="font-bold text-brand-600">{c.estimatedDuration}</span>
                </div>
              </div>
            ))}

            {mySubjects.map((s) => (
              <div key={s.id} className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                      Matéria ({s.discipline})
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        s.status === 'aprovado'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : s.status === 'em_analise'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {s.status === 'aprovado' ? '✓ Aprovado' : s.status === 'em_analise' ? '⏳ Em Análise' : 'Rascunho'}
                    </span>
                  </div>
                  <h4 className="font-black text-slate-800 text-base">{s.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.theme}</p>
                </div>

                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                  <span>{s.exercises.length} Exercícios</span>
                  <span className="font-bold text-slate-600">{s.educationLevel}</span>
                </div>
              </div>
            ))}
          </div>

          {myCourses.length + mySubjects.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
              <div className="text-4xl">📚</div>
              <h4 className="font-bold text-slate-700">Ainda não tens publicações criadas</h4>
              <p className="text-xs text-slate-400">Utiliza as abas acima para criar a tua primeira matéria ou curso gratuito!</p>
            </div>
          )}
        </div>
      )}

      {/* 5. ALUNOS INSCRITOS (CHILD SAFETY: ONLY CLEAN DISPLAY NAMES, NO EMAILS/PHONES) */}
      {activeSubTab === 'alunos_inscritos' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-800">Alunos Inscritos nos Teus Cursos</h3>
              <p className="text-xs text-slate-400">
                Respeito integral da privacidade: sem exposição de contactos pessoais ou canais diretos não moderados.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
              {totalStudents} Estudantes Ativos
            </span>
          </div>

          {myEnrollments.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {myEnrollments.map((enr) => (
                <div key={enr.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-sm">
                      🎓
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">{enr.studentName}</h5>
                      <span className="text-xs text-slate-400 font-medium">Inscrito em: {enr.courseTitle}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-brand-600 block">{enr.progress}% Progresso</span>
                    <span className="text-[10px] text-slate-400">{enr.enrolledAt}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Assim que os estudantes se inscreverem nos teus cursos aprovados, poderás acompanhar o progresso aqui.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
