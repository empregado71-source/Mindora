import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { TeacherService } from '../services/teacherService';
import { X, GraduationCap, CheckCircle2, AlertCircle, FileText, Send, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface TeacherApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const TeacherApplyModal: React.FC<TeacherApplyModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { state, applyForTeacher } = useUser();

  const existingApp = state.teacherApplication || TeacherService.getApplicationByUserId(state.id);

  const [specialty, setSpecialty] = useState(existingApp?.specialty || '');
  const [subjectsTaught, setSubjectsTaught] = useState<string[]>(existingApp?.subjectsTaught || ['Matemática']);
  const [bio, setBio] = useState(existingApp?.bio || '');
  const [experience, setExperience] = useState(existingApp?.experience || '');
  const [agreement, setAgreement] = useState(existingApp?.agreementAccepted || false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const availableSubjects = [
    'Matemática', 'Física', 'Química', 'Biologia', 'Ciências Naturais',
    'Português', 'Literatura', 'Inglês', 'Francês', 'Espanhol',
    'História', 'Geografia', 'Filosofia', 'Sociologia', 'Informática',
    'Programação', 'Inteligência Artificial', 'Economia', 'Educação Financeira',
    'Estatística', 'Lógica', 'Cultura Geral', 'Educação Ambiental', 'Astronomia', 'Empreendedorismo'
  ];

  const handleToggleSubject = (sub: string) => {
    if (subjectsTaught.includes(sub)) {
      setSubjectsTaught(subjectsTaught.filter((s) => s !== sub));
    } else {
      setSubjectsTaught([...subjectsTaught, sub]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!specialty.trim()) {
      setErrorMsg('Por favor especifica a tua área de especialização.');
      return;
    }
    if (subjectsTaught.length === 0) {
      setErrorMsg('Seleciona pelo menos uma matéria que pretendes ensinar.');
      return;
    }
    if (bio.trim().length < 20) {
      setErrorMsg('A tua biografia deve ter pelo menos 20 caracteres.');
      return;
    }
    if (!agreement) {
      setErrorMsg('Deves aceitar os termos de partilha e regras de publicação gratuita.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      applyForTeacher({
        specialty,
        subjectsTaught,
        bio,
        experience,
        avatarEmoji: '👨‍🏫',
        agreementAccepted: true
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white max-w-2xl w-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-700 to-sky-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black shadow-xs">
              👨‍🏫
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-100">
                MINDORA Teachers
              </span>
              <h3 className="text-xl sm:text-2xl font-black">Candidatura a Professor</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form or Application Status */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar text-xs sm:text-sm">
          {existingApp ? (
            <div className="space-y-4">
              <div
                className={`p-5 rounded-3xl border flex items-center gap-4 ${
                  existingApp.status === 'aprovado'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : existingApp.status === 'recusado'
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="text-3xl shrink-0">
                  {existingApp.status === 'aprovado' ? '✅' : existingApp.status === 'recusado' ? '❌' : '⏳'}
                </div>
                <div>
                  <h4 className="font-black text-sm">
                    {existingApp.status === 'aprovado'
                      ? 'Parabéns! A tua candidatura como Professor foi Aprovada!'
                      : existingApp.status === 'recusado'
                      ? 'Candidatura Recusada'
                      : 'Candidatura em Análise pela Administração'}
                  </h4>
                  <p className="text-xs mt-1 opacity-90">
                    {existingApp.status === 'aprovado'
                      ? 'Podes agora aceder ao Painel dos Professores para criar matérias e cursos gratuitos para os estudantes.'
                      : existingApp.status === 'recusado'
                      ? `Motivo: ${existingApp.adminNotes || 'Documentação incompleta.'}`
                      : 'A equipa da MINDORA está a rever o teu perfil pedagógico. Esta validação demora habitualmente menos de 24 horas.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Resumo da Candidatura
                </span>
                <div><strong>Especialidade:</strong> {existingApp.specialty}</div>
                <div><strong>Matérias:</strong> {existingApp.subjectsTaught.join(', ')}</div>
                <div><strong>Biografia:</strong> {existingApp.bio}</div>
                <div><strong>Data de Envio:</strong> {existingApp.submittedAt}</div>
              </div>

              {existingApp.status !== 'aprovado' && (
                <p className="text-xs text-slate-400 text-center">
                  Queres atualizar a tua candidatura? Podes preencher o formulário abaixo novamente.
                </p>
              )}
            </div>
          ) : null}

          {(!existingApp || existingApp.status !== 'aprovado') && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Área Principal de Especialização *
                </label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="Ex: Engenharia Informática & IA, Física Teórica, Língua Inglesa..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Matérias que Pretendes Ensinar (seleciona as aplicáveis) *
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200 custom-scrollbar">
                  {availableSubjects.map((sub) => {
                    const isSelected = subjectsTaught.includes(sub);
                    return (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => handleToggleSubject(sub)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                          isSelected
                            ? 'bg-brand-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Biografia Breve do Educador *
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Apresenta-te aos estudantes: a tua paixão pelo ensino, abordagem didática e objetivos..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Experiência ou Formação Académica (opcional)
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Ex: Licenciatura em Matemática, 5 anos de experiência docente..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              {/* Agreement checkbox */}
              <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreement}
                    onChange={(e) => setAgreement(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-700 font-semibold leading-relaxed">
                    Declaro que tenho autorização legal para partilhar todos os materiais educativos, que estes serão <strong>100% gratuitos para todos os estudantes</strong>, e comprometo-me a respeitar a política de proteção de menores e privacidade da MINDORA.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-md shadow-brand-500/20 transition cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'A enviar...' : 'Submeter Candidatura'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
