import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-brand-500 text-white flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-brand-700 tracking-wide text-sm">MINDORA</span>
          <span className="text-slate-400">— Plataforma Inteligente de Aprendizagem</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> para aprender sem limites
          </span>
          <span>•</span>
          <span>100% em Português</span>
        </div>
      </div>
    </footer>
  );
};
