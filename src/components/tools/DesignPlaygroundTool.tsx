import React, { useState } from 'react';
import { Layout, Check, Copy, Sparkles, Sliders } from 'lucide-react';

export const DesignPlaygroundTool: React.FC = () => {
  const [borderRadius, setBorderRadius] = useState(24);
  const [padding, setPadding] = useState(28);
  const [shadowLevel, setShadowLevel] = useState<'sm' | 'md' | 'xl' | '2xl'>('xl');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#0f172a');
  const [accentColor, setAccentColor] = useState('#0284c7');
  const [cardTitle, setCardTitle] = useState('Design com Identidade Visual');
  const [cardDesc, setCardDesc] = useState('Experimenta hierarquias visuais, espaçamentos consistentes e contraste legível.');
  const [copied, setCopied] = useState(false);

  // Approximate relative luminance for contrast ratio
  const getLuminance = (hex: string) => {
    const cleaned = hex.replace('#', '');
    const num = parseInt(cleaned, 16);
    const r = ((num >> 16) & 255) / 255;
    const g = ((num >> 8) & 255) / 255;
    const b = (num & 255) / 255;
    const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum1 = getLuminance(bgColor);
  const lum2 = getLuminance(textColor);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const contrastRatio = Math.round(((brightest + 0.05) / (darkest + 0.05)) * 10) / 10;
  const passesAA = contrastRatio >= 4.5;
  const passesAAA = contrastRatio >= 7.0;

  const shadowClass =
    shadowLevel === 'sm'
      ? 'shadow-sm'
      : shadowLevel === 'md'
      ? 'shadow-md'
      : shadowLevel === 'xl'
      ? 'shadow-xl shadow-slate-900/10'
      : 'shadow-2xl shadow-slate-900/15';

  const generatedCSS = `/* Especificações CSS */
.card-personalizado {
  background-color: ${bgColor};
  color: ${textColor};
  border-radius: ${borderRadius}px;
  padding: ${padding}px;
  box-shadow: ${shadowLevel};
}
.btn-destaque {
  background-color: ${accentColor};
}`;

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(generatedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shadow-xs">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Laboratório de Design & Composição</h3>
            <p className="text-xs text-slate-500">Área de Experimentação Visual, Tipografia & Verificador de Contraste WCAG</p>
          </div>
        </div>

        <button
          onClick={handleCopyCSS}
          className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'CSS Copiado!' : 'Copiar CSS'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Controls Column */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-xs uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-teal-600" /> Parâmetros de Design
          </div>

          {/* Border Radius */}
          <div className="space-y-1">
            <div className="flex justify-between font-bold text-slate-700 text-xs">
              <span>Arredondamento (Border Radius):</span>
              <span className="font-mono text-teal-700">{borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              value={borderRadius}
              onChange={(e) => setBorderRadius(parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Padding */}
          <div className="space-y-1">
            <div className="flex justify-between font-bold text-slate-700 text-xs">
              <span>Espaçamento Interno (Padding):</span>
              <span className="font-mono text-teal-700">{padding}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="48"
              value={padding}
              onChange={(e) => setPadding(parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Shadow Selector */}
          <div className="space-y-1">
            <span className="font-bold text-slate-700 text-xs block">Elevação & Sombra:</span>
            <div className="grid grid-cols-4 gap-1.5">
              {(['sm', 'md', 'xl', '2xl'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShadowLevel(s)}
                  className={`py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                    shadowLevel === s ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <span className="text-[11px] font-bold text-slate-600 block mb-1">Fundo</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-7 h-7 rounded-lg border cursor-pointer p-0"
                />
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{bgColor}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-600 block mb-1">Texto</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-7 h-7 rounded-lg border cursor-pointer p-0"
                />
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{textColor}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-600 block mb-1">Destaque</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-7 h-7 rounded-lg border cursor-pointer p-0"
                />
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{accentColor}</span>
              </div>
            </div>
          </div>

          {/* Contrast Check */}
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600">Taxa de Contraste:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-800">{contrastRatio}:1</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  passesAAA
                    ? 'bg-emerald-100 text-emerald-800'
                    : passesAA
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {passesAAA ? 'AAA Ótimo' : passesAA ? 'AA Aprovado' : 'Contraste Baixo'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Visual Canvas Preview */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 flex items-center justify-between">
            <span>Resultado Visual Renderizado:</span>
            <span className="text-[11px] text-teal-600 font-bold">Interativo</span>
          </div>

          <div className="p-8 rounded-3xl bg-slate-100/80 border border-slate-200 flex items-center justify-center min-h-[300px]">
            <div
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderRadius: `${borderRadius}px`,
                padding: `${padding}px`
              }}
              className={`w-full max-w-sm transition-all ${shadowClass} space-y-4`}
            >
              <div
                style={{ backgroundColor: accentColor }}
                className="w-10 h-1.5 rounded-full"
              />

              <h4 className="text-xl font-black leading-snug tracking-tight">
                {cardTitle}
              </h4>

              <p className="text-xs leading-relaxed opacity-90">
                {cardDesc}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  style={{ backgroundColor: accentColor }}
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs hover:opacity-95 transition cursor-pointer"
                >
                  Ação Principal
                </button>
                <span className="text-[11px] font-medium opacity-60">Design Token v1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
