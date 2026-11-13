import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export const MathTool: React.FC = () => {
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcFormula, setCalcFormula] = useState('');
  const [activeTab, setActiveTab] = useState<'calc' | 'solver'>('solver');

  // Guided Solver state
  const [problemType, setProblemType] = useState<'linear' | 'pythagoras' | 'percentage' | 'rule_of_three'>('linear');
  // Linear ax + b = c
  const [linearA, setLinearA] = useState('3');
  const [linearB, setLinearB] = useState('7');
  const [linearC, setLinearC] = useState('22');
  // Pythagoras
  const [pythA, setPythA] = useState('3');
  const [pythB, setPythB] = useState('4');
  // Percentage
  const [percRate, setPercRate] = useState('20');
  const [percValue, setPercValue] = useState('150');
  // Rule of three
  const [r3A, setR3A] = useState('4');
  const [r3B, setR3B] = useState('20');
  const [r3C, setR3C] = useState('10');

  // Calculator button click
  const handleCalcBtn = (val: string) => {
    if (val === 'C') {
      setCalcDisplay('0');
      setCalcFormula('');
      return;
    }
    if (val === '=') {
      try {
        // Safe evaluation of basic math expressions
        const cleanExpr = calcDisplay.replace(/×/g, '*').replace(/÷/g, '/');
        // Check for safe characters only: digits, operators, parens, decimal point
        if (!/^[0-9+\-*/.() ]+$/.test(cleanExpr)) {
          setCalcDisplay('Erro');
          return;
        }
        // eslint-disable-next-line no-eval
        const result = Function(`'use strict'; return (${cleanExpr})`)();
        const formatted = Number.isFinite(result) ? String(Math.round(result * 10000) / 10000) : 'Erro';
        setCalcFormula(`${calcDisplay} =`);
        setCalcDisplay(formatted);
      } catch {
        setCalcDisplay('Erro');
      }
      return;
    }
    if (val === '√') {
      try {
        const num = parseFloat(calcDisplay);
        if (num >= 0) {
          const res = String(Math.round(Math.sqrt(num) * 10000) / 10000);
          setCalcFormula(`√(${calcDisplay})`);
          setCalcDisplay(res);
        } else {
          setCalcDisplay('Erro');
        }
      } catch {
        setCalcDisplay('Erro');
      }
      return;
    }
    if (calcDisplay === '0' || calcDisplay === 'Erro') {
      setCalcDisplay(val);
    } else {
      setCalcDisplay(calcDisplay + val);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Laboratório de Matemática</h3>
            <p className="text-xs text-slate-500">Calculadora Científica & Solucionador Guiado Passo a Passo</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('solver')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'solver' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Solucionador Guiado
          </button>
          <button
            onClick={() => setActiveTab('calc')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'calc' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Calculadora
          </button>
        </div>
      </div>

      {activeTab === 'solver' && (
        <div className="space-y-6">
          {/* Problem Type Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'linear', label: 'Equações 1º Grau' },
              { id: 'pythagoras', label: 'Teorema de Pitágoras' },
              { id: 'percentage', label: 'Percentagens' },
              { id: 'rule_of_three', label: 'Regra de Três' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setProblemType(p.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  problemType === p.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Linear Equations Solver */}
          {problemType === 'linear' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                <span className="text-xs font-bold text-blue-900 block mb-2">Forma Geral: a · x + b = c</span>
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-800">
                  <input
                    type="number"
                    value={linearA}
                    onChange={(e) => setLinearA(e.target.value)}
                    className="w-16 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center focus:outline-none focus:border-blue-500"
                  />
                  <span>· x +</span>
                  <input
                    type="number"
                    value={linearB}
                    onChange={(e) => setLinearB(e.target.value)}
                    className="w-16 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center focus:outline-none focus:border-blue-500"
                  />
                  <span>=</span>
                  <input
                    type="number"
                    value={linearC}
                    onChange={(e) => setLinearC(e.target.value)}
                    className="w-16 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Step by Step Breakdown */}
              {(() => {
                const a = parseFloat(linearA) || 1;
                const b = parseFloat(linearB) || 0;
                const c = parseFloat(linearC) || 0;
                const step1 = c - b;
                const sol = a !== 0 ? Math.round((step1 / a) * 1000) / 1000 : null;

                return (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-blue-700">
                      <Sparkles className="w-4 h-4" /> Resolução Passo a Passo
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-start gap-2">
                        <span className="font-mono font-bold text-blue-600">Passo 1:</span>
                        <span>Isolar o termo com incógnita subtraindo {b} a ambos os lados: <code>{a}x = {c} - ({b}) ➔ {a}x = {step1}</code></span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-start gap-2">
                        <span className="font-mono font-bold text-blue-600">Passo 2:</span>
                        <span>Dividir ambos os membros pelo coeficiente {a}: <code>x = {step1} / {a}</code></span>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Solução Final:
                        </span>
                        <span className="text-base font-black font-mono text-emerald-700">
                          {sol !== null ? `x = ${sol}` : 'Indeterminado / Sem Solução'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Pythagoras Solver */}
          {problemType === 'pythagoras' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                <span className="text-xs font-bold text-blue-900 block mb-2">Fórmula: c² = a² + b² (Hipotenusa c)</span>
                <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span>Cateto a:</span>
                    <input
                      type="number"
                      value={pythA}
                      onChange={(e) => setPythA(e.target.value)}
                      className="w-20 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>Cateto b:</span>
                    <input
                      type="number"
                      value={pythB}
                      onChange={(e) => setPythB(e.target.value)}
                      className="w-20 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {(() => {
                const a = parseFloat(pythA) || 0;
                const b = parseFloat(pythB) || 0;
                const a2 = a * a;
                const b2 = b * b;
                const sum = a2 + b2;
                const c = Math.round(Math.sqrt(sum) * 1000) / 1000;

                return (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-blue-700">
                      <Sparkles className="w-4 h-4" /> Resolução Geométrica
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                        1. Quadrado dos catetos: <code>{a}² = {a2}</code> e <code>{b}² = {b2}</code>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                        2. Soma dos quadrados: <code>{a2} + {b2} = {sum}</code>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Hipotenusa c:
                        </span>
                        <span className="text-base font-black font-mono text-emerald-700">
                          c = √{sum} ≈ {c}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Percentage */}
          {problemType === 'percentage' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-wrap items-center gap-3 text-sm font-bold text-slate-800">
                <span>Calcular</span>
                <input
                  type="number"
                  value={percRate}
                  onChange={(e) => setPercRate(e.target.value)}
                  className="w-20 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center"
                />
                <span>% de</span>
                <input
                  type="number"
                  value={percValue}
                  onChange={(e) => setPercValue(e.target.value)}
                  className="w-24 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center"
                />
              </div>

              {(() => {
                const r = parseFloat(percRate) || 0;
                const v = parseFloat(percValue) || 0;
                const res = (r / 100) * v;

                return (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-sm flex items-center justify-between">
                    <span>Resultado ({r}% de {v}):</span>
                    <span className="text-lg font-black text-emerald-700">{res}</span>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Rule of Three */}
          {problemType === 'rule_of_three' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <span className="text-xs font-bold text-blue-900 block">Proporção: se A está para B, então C está para X</span>
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-800">
                  <input
                    type="number"
                    value={r3A}
                    onChange={(e) => setR3A(e.target.value)}
                    className="w-16 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center"
                  />
                  <span>➔</span>
                  <input
                    type="number"
                    value={r3B}
                    onChange={(e) => setR3B(e.target.value)}
                    className="w-16 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center"
                  />
                  <span className="mx-2">|</span>
                  <input
                    type="number"
                    value={r3C}
                    onChange={(e) => setR3C(e.target.value)}
                    className="w-16 px-3 py-2 bg-white border border-slate-300 rounded-xl text-center"
                  />
                  <span>➔ X</span>
                </div>
              </div>

              {(() => {
                const a = parseFloat(r3A) || 1;
                const b = parseFloat(r3B) || 0;
                const c = parseFloat(r3C) || 0;
                const x = a !== 0 ? Math.round(((b * c) / a) * 1000) / 1000 : 0;

                return (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-sm flex items-center justify-between">
                    <span>Valor de X: ({b} × {c}) ÷ {a} =</span>
                    <span className="text-lg font-black text-emerald-700 font-mono">X = {x}</span>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Scientific Calculator View */}
      {activeTab === 'calc' && (
        <div className="max-w-sm mx-auto bg-slate-900 text-white rounded-3xl p-5 shadow-xl space-y-4">
          <div className="bg-slate-950 p-4 rounded-2xl text-right font-mono space-y-1">
            <div className="text-[11px] text-slate-400 min-h-[16px]">{calcFormula}</div>
            <div className="text-2xl font-black text-white truncate tracking-wider">{calcDisplay}</div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-sm font-bold">
            {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '√', '='].map((btn) => {
              const isOperator = ['÷', '×', '-', '+', '='].includes(btn);
              const isClear = btn === 'C';
              return (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className={`p-3 rounded-xl transition cursor-pointer font-mono active:scale-95 ${
                    isClear
                      ? 'bg-rose-600 hover:bg-rose-500 text-white font-black'
                      : isOperator
                      ? 'bg-blue-600 hover:bg-blue-500 text-white font-black'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                  }`}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
