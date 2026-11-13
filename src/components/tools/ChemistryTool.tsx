import React, { useState } from 'react';
import { FlaskConical, Atom, Sparkles, CheckCircle2 } from 'lucide-react';

interface ElementInfo {
  num: number;
  sym: string;
  name: string;
  mass: number;
  category: 'Não-metal' | 'Gás Nobre' | 'Metal Alcalino' | 'Metal de Transição' | 'Halogénio' | 'Semimetal';
  valency: number;
  electrons: string;
  description: string;
}

const ELEMENTS: ElementInfo[] = [
  { num: 1, sym: 'H', name: 'Hidrogénio', mass: 1.008, category: 'Não-metal', valency: 1, electrons: '1s¹', description: 'O elemento mais abundante do universo, combustível das estrelas e constituinte vital da água.' },
  { num: 2, sym: 'He', name: 'Hélio', mass: 4.0026, category: 'Gás Nobre', valency: 0, electrons: '1s²', description: 'Gás inerte mais leve que o ar, utilizado em arrefecimento criogénico e ressonâncias magnéticas.' },
  { num: 6, sym: 'C', name: 'Carbono', mass: 12.011, category: 'Não-metal', valency: 4, electrons: '[He] 2s² 2p²', description: 'A base da vida e da química orgânica; forma desde grafite macio até diamantes ultrarresistentes.' },
  { num: 7, sym: 'N', name: 'Azoto / Nitrogénio', mass: 14.007, category: 'Não-metal', valency: 3, electrons: '[He] 2s² 2p³', description: 'Compõe 78% do ar que respiramos e é componente essencial dos aminoácidos e DNA.' },
  { num: 8, sym: 'O', name: 'Oxigénio', mass: 15.999, category: 'Não-metal', valency: 2, electrons: '[He] 2s² 2p⁴', description: 'Altamente reativo, indispensável à respiração celular aeróbia e à combustão.' },
  { num: 11, sym: 'Na', name: 'Sódio', mass: 22.990, category: 'Metal Alcalino', valency: 1, electrons: '[Ne] 3s¹', description: 'Metal macio altamente reativo com água; forma cloreto de sódio (sal de cozinha com cloro).' },
  { num: 12, sym: 'Mg', name: 'Magnésio', mass: 24.305, category: 'Metal Alcalino', valency: 2, electrons: '[Ne] 3s²', description: 'Átomo central da molécula de clorofila vegetal e mineral chave para a função muscular humana.' },
  { num: 17, sym: 'Cl', name: 'Cloro', mass: 35.45, category: 'Halogénio', valency: 1, electrons: '[Ne] 3s² 3p⁵', description: 'Halogénio potente com propriedades desinfetantes e bactericidas no tratamento de águas.' },
  { num: 26, sym: 'Fe', name: 'Ferro', mass: 55.845, category: 'Metal de Transição', valency: 2, electrons: '[Ar] 3d⁶ 4s²', description: 'Metal estrutural indispensável à indústria e componente central da hemoglobina no transporte de oxigénio.' },
  { num: 29, sym: 'Cu', name: 'Cobre', mass: 63.546, category: 'Metal de Transição', valency: 2, electrons: '[Ar] 3d¹⁰ 4s¹', description: 'Excecional condutor elétrico e térmico, utilizado em cablagem e telecomunicações mundiais.' },
  { num: 79, sym: 'Au', name: 'Ouro', mass: 196.97, category: 'Metal de Transição', valency: 1, electrons: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', description: 'Metal nobre incorruptível, excelente condutor não-oxidável e padrão monetário histórico.' }
];

export const ChemistryTool: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementInfo>(ELEMENTS[2]); // Carbon by default
  const [reactionStep, setReactionStep] = useState(0);

  const reactions = [
    {
      title: 'Síntese da Água',
      eq: '2 H₂ (g) + O₂ (g) ➔ 2 H₂O (l)',
      desc: 'Dois moles de gás hidrogénio reagem exotermicamente com um mole de gás oxigénio para formar duas moléculas de água.',
      reactants: '4 átomos de H + 2 átomos de O',
      products: '2 moléculas de água (H₂O)'
    },
    {
      title: 'Fotossíntese Vegetal',
      eq: '6 CO₂ + 6 H₂O + Luz Solar ➔ C₆H₁₂O₆ + 6 O₂',
      desc: 'Seis moléculas de dióxido de carbono reagem com seis moléculas de água nos cloroplastos produzindo glicose e oxigénio.',
      reactants: '6 Carbonos, 18 Oxigénios, 12 Hidrogénios',
      products: '1 molécula de Glicose + 6 de Oxigénio gasoso'
    },
    {
      title: 'Combustão Completa do Metano',
      eq: 'CH₄ + 2 O₂ ➔ CO₂ + 2 H₂O + Energia',
      desc: 'O gás natural queima em oxigénio abundante produzindo dióxido de carbono, vapor de água e grande libertação de calor.',
      reactants: '1 Metano + 2 Oxigénios',
      products: '1 Dióxido de Carbono + 2 Águas'
    }
  ];

  const currentReaction = reactions[reactionStep % reactions.length];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Laboratório de Química & Moléculas</h3>
            <p className="text-xs text-slate-500">Tabela Periódica Interativa & Reações Químicas Balanceadas</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Elements Grid */}
        <div className="lg:col-span-2 space-y-3">
          <span className="text-xs font-bold text-slate-600 block">
            Clica num elemento da Tabela Periódica para ver propriedades atómicas:
          </span>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {ELEMENTS.map((el) => {
              const isSelected = selectedElement.num === el.num;
              return (
                <button
                  key={el.num}
                  onClick={() => setSelectedElement(el)}
                  className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col justify-between aspect-square ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/50'
                  }`}
                >
                  <span className="text-[10px] font-mono text-left font-bold opacity-75">{el.num}</span>
                  <span className="text-xl font-black">{el.sym}</span>
                  <span className="text-[10px] truncate font-medium opacity-90">{el.name}</span>
                </button>
              );
            })}
          </div>

          {/* Chemical Reaction Simulator */}
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Balanço de Reações Químicas
              </span>
              <button
                onClick={() => setReactionStep((prev) => prev + 1)}
                className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Próxima Reação &rarr;
              </button>
            </div>
            <h5 className="font-extrabold text-slate-900 text-sm">{currentReaction.title}</h5>
            <div className="p-3 bg-white rounded-xl border border-emerald-100 font-mono text-xs sm:text-sm font-bold text-emerald-950 text-center">
              {currentReaction.eq}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{currentReaction.desc}</p>
          </div>
        </div>

        {/* Selected Element Detail Card */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold">Elemento #{selectedElement.num}</span>
              <h4 className="text-2xl font-black">{selectedElement.name}</h4>
              <span className="text-xs text-slate-400 font-semibold">{selectedElement.category}</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
              {selectedElement.sym}
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Massa Atómica:</span>
              <span className="font-mono font-bold">{selectedElement.mass} u</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Eletrões de Valência:</span>
              <span className="font-mono font-bold">{selectedElement.valency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Configuração Eletrónica:</span>
              <span className="font-mono font-bold text-emerald-300">{selectedElement.electrons}</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <span className="text-xs font-bold text-slate-400 block mb-1">Aplicação no Mundo Real:</span>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              {selectedElement.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
