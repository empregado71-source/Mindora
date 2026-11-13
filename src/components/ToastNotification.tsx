import React from 'react';
import { useUser } from '../context/UserContext';
import { CheckCircle, Trophy, Zap, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useUser();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle className="w-5 h-5 text-brand-400 shrink-0" />;
        if (toast.type === 'xp') {
          icon = <Zap className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />;
        } else if (toast.type === 'badge') {
          icon = <Trophy className="w-5 h-5 text-yellow-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom-5 duration-200 border border-slate-800"
          >
            <div className="flex items-center gap-3">
              {icon}
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
