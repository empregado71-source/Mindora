import React, { useState } from 'react';
import { MathTool } from '../components/tools/MathTool';
import { LanguagesTool } from '../components/tools/LanguagesTool';
import { CodeEditorTool } from '../components/tools/CodeEditorTool';
import { DrawingCanvasTool } from '../components/tools/DrawingCanvasTool';
import { ColorPaletteTool } from '../components/tools/ColorPaletteTool';
import { DesignPlaygroundTool } from '../components/tools/DesignPlaygroundTool';
import { PhysicsSimTool } from '../components/tools/PhysicsSimTool';
import { ChemistryTool } from '../components/tools/ChemistryTool';
import {
  Wrench,
  Calculator,
  Languages,
  Code2,
  Palette,
  Pipette,
  Layout,
  Zap,
  FlaskConical,
  Sparkles
} from 'lucide-react';

export type PracticalToolId = 'math' | 'languages' | 'code' | 'drawing' | 'colors' | 'design' | 'physics' | 'chemistry';

export const ToolsView: React.FC<{ initialTool?: PracticalToolId }> = ({ initialTool = 'math' }) => {
  const [activeTool, setActiveTool] = useState<PracticalToolId>(initialTool);

  const toolTabs: { id: PracticalToolId; title: string; category: string; icon: React.ReactNode; color: string }[] = [
    { id: 'math', title: 'Matemática', category: 'Calculadora & Solucionador', icon: <Calculator className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'languages', title: 'Idiomas', category: 'Flashcards & Pronúncia', icon: <Languages className="w-4 h-4" />, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { id: 'code', title: 'Programação', category: 'Editor Live HTML/JS', icon: <Code2 className="w-4 h-4" />, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'drawing', title: 'Desenho & Arte', category: 'Quadro Digital Canvas', icon: <Palette className="w-4 h-4" />, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'colors', title: 'Teoria das Cores', category: 'Harmonias & Misturador', icon: <Pipette className="w-4 h-4" />, color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200' },
    { id: 'design', title: 'Design & UI', category: 'Composição & Contraste', icon: <Layout className="w-4 h-4" />, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { id: 'physics', title: 'Física', category: 'Simulador de Gravidade', icon: <Zap className="w-4 h-4" />, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { id: 'chemistry', title: 'Química', category: 'Tabela Periódica & Reações', icon: <FlaskConical className="w-4 h-4" />, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Ferramentas Práticas de Aprendizagem Ativa
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Laboratório & Ferramentas Experimentais
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Espaços de prática real adequados a cada curso: resolve equações, ouve pronúncias, programa código, desenha e simula leis físicas.
          </p>
        </div>
      </div>

      {/* Tools Switcher Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {toolTabs.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                isActive
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md scale-102'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-slate-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                isActive ? 'bg-white/20 text-white' : tool.color
              }`}>
                {tool.icon}
              </div>
              <div>
                <span className="font-extrabold text-xs block leading-tight">{tool.title}</span>
                <span className={`text-[10px] block truncate ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                  {tool.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tool View */}
      <div className="pt-2">
        {activeTool === 'math' && <MathTool />}
        {activeTool === 'languages' && <LanguagesTool />}
        {activeTool === 'code' && <CodeEditorTool />}
        {activeTool === 'drawing' && <DrawingCanvasTool />}
        {activeTool === 'colors' && <ColorPaletteTool />}
        {activeTool === 'design' && <DesignPlaygroundTool />}
        {activeTool === 'physics' && <PhysicsSimTool />}
        {activeTool === 'chemistry' && <ChemistryTool />}
      </div>
    </div>
  );
};
