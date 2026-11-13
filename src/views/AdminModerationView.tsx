import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { TeacherService } from '../services/teacherService';
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  FileText,
  BookOpen,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { ContentStatus, TeacherApplication, TeacherCourse, TeacherSubject, ContentReport } from '../types';

export const AdminModerationView: React.FC = () => {
  const { state, setUserRole } = useUser();
  const [activeTab, setActiveTab] = useState<'candidaturas' | 'cursos' | 'materias' | 'denuncias'>('candidaturas');
  
  // Feedback note states
  const [rejectModal, setRejectModal] = useState<{
    type: 'candidatura' | 'curso' | 'materia';
    id: string;
    titleOrName: string;
  } | null>(null);
  const [feedbackNotes, setFeedbackNotes] = useState('');

  // Local state refreshers
  const [updateKey, setUpdateKey] = useState(0);
  const triggerRefresh = () => setUpdateKey((k) => k + 1);

  // Data fetching
  const allApps: TeacherApplication[] = TeacherService.getApplications();
  const pendingApps = allApps.filter((a: TeacherApplication) => a.status === 'pendente');
  const allCourses: TeacherCourse[] = TeacherService.getCourses();
  const coursesInReview = allCourses.filter((c: TeacherCourse) => c.status === 'em_analise');
  const allSubjects: TeacherSubject[] = TeacherService.getSubjects();
  const subjectsInReview = allSubjects.filter((s: TeacherSubject) => s.status === 'em_analise');
  const allReports: ContentReport[] = TeacherService.getReports();
  const openReports = allReports.filter((r: ContentReport) => r.status === 'pendente');

  const handleApproveApplication = (appId: string) => {
    TeacherService.reviewApplication(appId, 'aprovado');
    triggerRefresh();
  };

  const handleRejectApplication = (appId: string, notes: string) => {
    TeacherService.reviewApplication(appId, 'recusado', notes);
    setRejectModal(null);
    setFeedbackNotes('');
    triggerRefresh();
  };

  const handleUpdateCourseStatus = (courseId: string, status: ContentStatus, notes?: string) => {
    TeacherService.reviewCourse(courseId, status, notes);
    setRejectModal(null);
    setFeedbackNotes('');
    triggerRefresh();
  };

  const handleUpdateSubjectStatus = (subjectId: string, status: ContentStatus, notes?: string) => {
    TeacherService.reviewSubject(subjectId, status, notes);
    setRejectModal(null);
    setFeedbackNotes('');
    triggerRefresh();
  };

  const handleResolveReport = (reportId: string, resolution: 'resolvido' | 'descartado') => {
    TeacherService.resolveReport(reportId, resolution);
    triggerRefresh();
  };

  return (
    <div key={updateKey} className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner / Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
            <ShieldAlert className="w-4 h-4" />
            Área de Administração & Moderação
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Painel de Controlo da Equipa Editorial
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Validação de candidaturas docentes, auditoria pedagógica de cursos e matérias, e resolução de denúncias para salvaguarda da comunidade estudantil.
          </p>
        </div>

        {/* Quick Testing Switcher */}
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col gap-2 w-full md:w-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Modo de Teste de Papéis (Persona):
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setUserRole('estudante')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                state.role === 'estudante'
                  ? 'bg-brand-500 text-white shadow'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Estudante
            </button>
            <button
              onClick={() => setUserRole('professor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                state.role === 'professor'
                  ? 'bg-emerald-500 text-white shadow'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Professor
            </button>
            <button
              onClick={() => setUserRole('administrador')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                state.role === 'administrador'
                  ? 'bg-rose-500 text-white shadow'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Administrador
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{pendingApps.length}</div>
            <div className="text-xs text-slate-500 font-medium">Candidaturas Pendentes</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{coursesInReview.length}</div>
            <div className="text-xs text-slate-500 font-medium">Cursos em Revisão</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{subjectsInReview.length}</div>
            <div className="text-xs text-slate-500 font-medium">Matérias em Revisão</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{openReports.length}</div>
            <div className="text-xs text-slate-500 font-medium">Denúncias Abertas</div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-100 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('candidaturas')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'candidaturas'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Candidaturas a Professor ({pendingApps.length})
        </button>
        <button
          onClick={() => setActiveTab('cursos')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'cursos'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Cursos Submetidos ({coursesInReview.length})
        </button>
        <button
          onClick={() => setActiveTab('materias')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'materias'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          Matérias Submetidas ({subjectsInReview.length})
        </button>
        <button
          onClick={() => setActiveTab('denuncias')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'denuncias'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Denúncias & Moderação ({openReports.length})
        </button>
      </div>

      {/* TAB 1: CANDIDATURAS */}
      {activeTab === 'candidaturas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Candidaturas de Docentes ({allApps.length} no total)
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Avaliação de idoneidade pedagógica
            </span>
          </div>

          {allApps.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm text-slate-500">
              Nenhuma candidatura submetida até ao momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {allApps.map((app: TeacherApplication) => (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 font-extrabold flex items-center justify-center text-lg">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-slate-900 text-base">
                            {app.name}
                          </h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              app.status === 'pendente'
                                ? 'bg-amber-100 text-amber-800'
                                : app.status === 'aprovado'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {app.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{app.email} • {app.specialty}</p>
                      </div>
                    </div>

                    {app.status === 'pendente' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveApplication(app.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Aprovar Docente
                        </button>
                        <button
                          onClick={() =>
                            setRejectModal({
                              type: 'candidatura',
                              id: app.id,
                              titleOrName: app.name
                            })
                          }
                          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          Recusar
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-bold text-slate-700">Biografia:</span>
                      <p className="text-slate-600 italic">"{app.bio}"</p>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-bold text-slate-700">Experiência & Formação:</span>
                      <p className="text-slate-600">{app.experience || 'Não indicada'}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="font-bold text-slate-500">Matérias a Ensinar:</span>
                    {app.subjectsTaught.map((s: string, idx: number) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                    <span className="ml-auto text-[11px] text-slate-400">
                      Submetida em: {new Date(app.submittedAt).toLocaleDateString('pt-PT')}
                    </span>
                  </div>

                  {app.adminNotes && (
                    <div className="p-3 bg-rose-50 rounded-xl text-xs text-rose-800">
                      <span className="font-bold">Nota de recusa da moderação:</span> {app.adminNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CURSOS */}
      {activeTab === 'cursos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Cursos na Plataforma ({allCourses.length} cursos)
            </h3>
            <span className="text-xs text-slate-500">
              {coursesInReview.length} a aguardar aprovação
            </span>
          </div>

          <div className="space-y-4">
            {allCourses.map((c: TeacherCourse) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base">{c.title}</h4>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'aprovado'
                            ? 'bg-emerald-100 text-emerald-800'
                            : c.status === 'em_analise'
                            ? 'bg-amber-100 text-amber-800'
                            : c.status === 'recusado'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {c.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Professor: <span className="font-semibold text-slate-700">{c.teacherName}</span> • Categoria: {c.category} • Nível: {c.level} • {c.modules.length} Módulos
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {c.status !== 'aprovado' && (
                      <button
                        onClick={() => handleUpdateCourseStatus(c.id, 'aprovado')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Aprovar para Alunos
                      </button>
                    )}
                    {c.status !== 'recusado' && (
                      <button
                        onClick={() =>
                          setRejectModal({
                            type: 'curso',
                            id: c.id,
                            titleOrName: c.title
                          })
                        }
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        Rejeitar / Solicitar Alteração
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-700 block mb-1">Descrição:</span>
                  {c.description}
                </div>

                {c.rejectionReason && (
                  <div className="p-3 bg-rose-50 rounded-xl text-xs text-rose-800">
                    <span className="font-bold">Observações do Moderador:</span> {c.rejectionReason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MATÉRIAS */}
      {activeTab === 'materias' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Matérias Submetidas ({allSubjects.length})
            </h3>
            <span className="text-xs text-slate-500">
              {subjectsInReview.length} a aguardar aprovação
            </span>
          </div>

          <div className="space-y-4">
            {allSubjects.map((s: TeacherSubject) => (
              <div
                key={s.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base">{s.title}</h4>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          s.status === 'aprovado'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.status === 'em_analise'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {s.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Docente: {s.teacherName} • Disciplina: {s.discipline} • Nível: {s.educationLevel}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {s.status !== 'aprovado' && (
                      <button
                        onClick={() => handleUpdateSubjectStatus(s.id, 'aprovado')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Aprovar
                      </button>
                    )}
                    {s.status !== 'recusado' && (
                      <button
                        onClick={() =>
                          setRejectModal({
                            type: 'materia',
                            id: s.id,
                            titleOrName: s.title
                          })
                        }
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        Rejeitar
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-wrap">
                  {s.fullExplanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DENÚNCIAS */}
      {activeTab === 'denuncias' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Denúncias da Comunidade ({allReports.length})
            </h3>
            <span className="text-xs text-slate-500">
              Salvaguarda de menores e rigor pedagógico
            </span>
          </div>

          {allReports.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm text-slate-500">
              Nenhuma denúncia aberta. A plataforma está segura!
            </div>
          ) : (
            <div className="space-y-4">
              {allReports.map((r: ContentReport) => (
                <div
                  key={r.id}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          {r.contentType.toUpperCase()}: {r.contentTitle}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            r.status === 'pendente'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {r.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                        Motivo: {r.reason}
                      </h4>
                    </div>

                    {r.status === 'pendente' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResolveReport(r.id, 'resolvido')}
                          className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                        >
                          Ação Tomada (Resolvido)
                        </button>
                        <button
                          onClick={() => handleResolveReport(r.id, 'descartado')}
                          className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                        >
                          Descartar
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{r.details}"
                  </p>
                  <div className="text-[11px] text-slate-400">
                    Reportado por: {r.reporterName} • Data: {new Date(r.reportedAt).toLocaleDateString('pt-PT')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FEEDBACK / REJECTION MODAL */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Indicar Motivo da Recusa / Alterações Pedidas
            </h3>
            <p className="text-xs text-slate-600">
              Item: <span className="font-bold">{rejectModal.titleOrName}</span>
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Feedback para o Docente:
              </label>
              <textarea
                required
                rows={4}
                value={feedbackNotes}
                onChange={(e) => setFeedbackNotes(e.target.value)}
                placeholder="Explica com clareza o que deve ser corrigido ou melhorado..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (rejectModal.type === 'candidatura') {
                    handleRejectApplication(rejectModal.id, feedbackNotes);
                  } else if (rejectModal.type === 'curso') {
                    handleUpdateCourseStatus(rejectModal.id, 'recusado', feedbackNotes);
                  } else if (rejectModal.type === 'materia') {
                    handleUpdateSubjectStatus(rejectModal.id, 'recusado', feedbackNotes);
                  }
                }}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Confirmar Recusa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
