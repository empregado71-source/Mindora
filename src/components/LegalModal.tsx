import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white max-w-2xl w-full max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              {type === 'terms' ? <FileText className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800">
                {type === 'terms' ? 'Termos de Utilização' : 'Política de Privacidade'}
              </h3>
              <span className="text-xs text-slate-400">MINDORA — Educação Tecnológica</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed custom-scrollbar">
          {type === 'terms' ? (
            <>
              <h4 className="font-extrabold text-slate-800 text-base">1. Aceitação dos Termos</h4>
              <p>Ao aceder à plataforma MINDORA, o utilizador concorda em respeitar estes Termos de Utilização e todas as leis aplicáveis à educação digital.</p>

              <h4 className="font-extrabold text-slate-800 text-base">2. Uso Educativo</h4>
              <p>A MINDORA concede uma licença pessoal e não exclusiva para fins de estudo, resolução de exercícios, participação em cursos e jogos educativos.</p>

              <h4 className="font-extrabold text-slate-800 text-base">3. Conduta da Comunidade</h4>
              <p>É estritamente proibido utilizar a plataforma para qualquer atividade ilícita, partilhar respostas fraudulentas ou tentar desrespeitar os dados de outros estudantes.</p>

              <h4 className="font-extrabold text-slate-800 text-base">4. Propriedade Intelectual</h4>
              <p>Todos os conteúdos curriculares, ilustrações, algoritmos de jogos e o robô mascote MINDORA são protegidos pelos direitos de autor e propriedade intelectual.</p>
            </>
          ) : (
            <>
              <h4 className="font-extrabold text-slate-800 text-base">1. Proteção de Dados e Privacidade</h4>
              <p>A MINDORA recolhe apenas os dados estritamente necessários para personalizar a experiência de aprendizagem: nome de apresentação, endereço de email e estatísticas de estudo (XP, medalhas e lições concluídas).</p>

              <h4 className="font-extrabold text-slate-800 text-base">2. Isolamento de Dados por Utilizador</h4>
              <p>Cada conta possui o seu próprio espaço criptografado e isolado. Nenhum utilizador tem acesso aos dados privados ou ao progresso individual de outro utilizador.</p>

              <h4 className="font-extrabold text-slate-800 text-base">3. Não Partilha com Terceiros</h4>
              <p>Não vendemos nem partilhamos dados pessoais com redes de publicidade de terceiros. A informação é utilizada exclusivamente para viabilizar as funcionalidades pedagógicas da plataforma.</p>

              <h4 className="font-extrabold text-slate-800 text-base">4. Direito de Eliminação</h4>
              <p>O utilizador pode redefinir o seu progresso ou apagar a sua conta a qualquer momento diretamente a partir do seu painel de Perfil.</p>
            </>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 cursor-pointer"
          >
            Compreendi e Concordo
          </button>
        </div>
      </div>
    </div>
  );
};
