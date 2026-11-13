import React, { useState } from 'react';
import { Code2, Play, RotateCcw, Copy, Check, Terminal, Eye, Sparkles } from 'lucide-react';

const STARTER_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 90vh;
      margin: 0;
      background: linear-gradient(135deg, #e0f2fe, #bae6fd);
    }
    .card {
      background: white;
      padding: 24px;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      max-width: 320px;
      text-align: center;
    }
    h2 { color: #0369a1; margin-top: 0; }
    p { color: #475569; font-size: 14px; line-height: 1.5; }
    button {
      background: #0284c7;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 12px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.1s;
    }
    button:active { transform: scale(0.96); }
  </style>
</head>
<body>
  <div class="card">
    <h2>MINDORA Code</h2>
    <p>Edita este código HTML e CSS para veres a magia acontecer em tempo real!</p>
    <button onclick="alert('Código a funcionar com sucesso!')">Clica aqui</button>
  </div>
</body>
</html>`;

const STARTER_JS = `// Experimenta lógica em JavaScript:
function calcularDesconto(precoOriginal, percentagem) {
  const desconto = (precoOriginal * percentagem) / 100;
  const precoFinal = precoOriginal - desconto;
  return { precoFinal, poupanca: desconto };
}

// Testes práticos:
const livro = calcularDesconto(25.00, 20);
console.log("Preço original: 25.00 €");
console.log("Preço com 20% de desconto: " + livro.precoFinal.toFixed(2) + " €");
console.log("Poupaste: " + livro.poupanca.toFixed(2) + " €");

// Cálculo de números pares:
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pares = numeros.filter(n => n % 2 === 0);
console.log("Números pares encontrados:", pares);
`;

export const CodeEditorTool: React.FC = () => {
  const [mode, setMode] = useState<'html' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState(STARTER_HTML);
  const [jsCode, setJsCode] = useState(STARTER_JS);
  const [jsConsoleOutput, setJsConsoleOutput] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleRunJS = () => {
    const logs: string[] = [];
    const originalLog = console.log;
    try {
      console.log = (...args: any[]) => {
        logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      };
      // eslint-disable-next-line no-new-func
      const runFn = new Function(jsCode);
      runFn();
      setJsConsoleOutput(logs.length > 0 ? logs : ['(Executado sem erros, nenhum console.log emitido)']);
    } catch (err: any) {
      setJsConsoleOutput([...logs, `❌ Erro de Execução: ${err.message}`]);
    } finally {
      console.log = originalLog;
    }
  };

  const handleCopyCode = () => {
    const code = mode === 'html' ? htmlCode : jsCode;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (mode === 'html') {
      setHtmlCode(STARTER_HTML);
    } else {
      setJsCode(STARTER_JS);
      setJsConsoleOutput([]);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-xs">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Editor de Código Interativo</h3>
            <p className="text-xs text-slate-500">Live Preview HTML/CSS & Consola JavaScript</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setMode('html')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                mode === 'html' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> HTML/CSS Live
            </button>
            <button
              onClick={() => setMode('js')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                mode === 'js' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> JavaScript Runner
            </button>
          </div>

          <button
            onClick={handleCopyCode}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
            title="Copiar código"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
            title="Repor código inicial"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HTML / CSS LIVE PREVIEW */}
      {mode === 'html' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Editor de Código HTML & CSS:</span>
              <span className="text-[11px] text-slate-400">Edita livremente</span>
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="w-full h-[360px] p-4 bg-slate-950 text-emerald-300 font-mono text-xs rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 custom-scrollbar resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Pré-Visualização em Tempo Real:
              </span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Ao Vivo
              </span>
            </div>
            <div className="w-full h-[360px] rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
              <iframe
                title="live-code-preview"
                srcDoc={htmlCode}
                className="w-full h-full border-none"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      )}

      {/* JAVASCRIPT CONSOLE RUNNER */}
      {mode === 'js' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Código JavaScript:</span>
              <button
                onClick={handleRunJS}
                className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Executar Código
              </button>
            </div>
            <textarea
              value={jsCode}
              onChange={(e) => setJsCode(e.target.value)}
              className="w-full h-[360px] p-4 bg-slate-950 text-indigo-200 font-mono text-xs rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 custom-scrollbar resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-700" /> Consola de Saída:
              </span>
              <button
                onClick={() => setJsConsoleOutput([])}
                className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Limpar Consola
              </button>
            </div>
            <div className="w-full h-[360px] p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 font-mono text-xs overflow-y-auto space-y-1.5 custom-scrollbar">
              {jsConsoleOutput.length === 0 ? (
                <div className="text-slate-500 italic">
                  Clica em "Executar Código" para veres o resultado das tuas funções e console.log()...
                </div>
              ) : (
                jsConsoleOutput.map((out, idx) => (
                  <div key={idx} className="flex items-start gap-2 border-b border-slate-800/60 pb-1">
                    <span className="text-slate-500 select-none">&gt;</span>
                    <span className={out.startsWith('❌') ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {out}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
