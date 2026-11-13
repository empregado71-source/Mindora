import React, { useState } from 'react';
import { Pipette, Copy, Check, Sparkles, RefreshCw, Layers } from 'lucide-react';

export const ColorPaletteTool: React.FC = () => {
  const [baseColor, setBaseColor] = useState('#0284c7');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Paint mixer states
  const [paint1, setPaint1] = useState('#eab308'); // Amarelo
  const [paint2, setPaint2] = useState('#0284c7'); // Azul

  // Convert hex to rgb
  const hexToRgb = (hex: string) => {
    const cleaned = hex.replace('#', '');
    const bigint = parseInt(cleaned, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = Math.round(x).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  };

  // Convert RGB to HSL and shift hue
  const shiftHue = (hex: string, degree: number) => {
    const { r, g, b } = hexToRgb(hex);
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / d + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / d + 4;
          break;
      }
      h /= 6;
    }

    // Shift
    let newH = (h * 360 + degree) % 360;
    if (newH < 0) newH += 360;

    // HSL to RGB
    const hNorm = newH / 360;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const newR = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
    const newG = Math.round(hue2rgb(p, q, hNorm) * 255);
    const newB = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);

    return rgbToHex(newR, newG, newB);
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Harmonies
  const complementary = shiftHue(baseColor, 180);
  const analogous1 = shiftHue(baseColor, -30);
  const analogous2 = shiftHue(baseColor, 30);
  const triadic1 = shiftHue(baseColor, 120);
  const triadic2 = shiftHue(baseColor, 240);

  // Mixed paint
  const p1Rgb = hexToRgb(paint1);
  const p2Rgb = hexToRgb(paint2);
  const mixedHex = rgbToHex(
    (p1Rgb.r + p2Rgb.r) / 2,
    (p1Rgb.g + p2Rgb.g) / 2,
    (p1Rgb.b + p2Rgb.b) / 2
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center font-bold shadow-xs">
            <Pipette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Laboratório de Cores & Pintura</h3>
            <p className="text-xs text-slate-500">Harmonias Cromáticas, Misturador de Pigmentos e Teoria das Cores</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Cor Base:</span>
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-8 h-8 rounded-xl border border-slate-300 cursor-pointer p-0"
          />
          <span className="text-xs font-mono font-bold text-slate-700 uppercase bg-slate-100 px-2 py-1 rounded-lg">
            {baseColor}
          </span>
        </div>
      </div>

      {/* HARMONY SCHEMES */}
      <div className="space-y-4">
        <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-fuchsia-600" /> Esquemas de Harmonia Cromática
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Complementary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Cores Complementares (180°)</span>
              <span className="text-[10px] text-slate-400 font-mono">Contraste máximo</span>
            </div>
            <div className="grid grid-cols-2 gap-2 h-16">
              {[baseColor, complementary].map((col, idx) => (
                <div
                  key={idx}
                  onClick={() => copyHex(col)}
                  style={{ backgroundColor: col }}
                  className="rounded-xl flex items-center justify-center text-white text-xs font-bold font-mono shadow-xs cursor-pointer hover:opacity-90 transition group relative"
                  title="Clica para copiar HEX"
                >
                  <span className="bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-xs text-[11px]">
                    {copiedHex === col ? 'Copiado!' : col}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Analogous */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Cores Análogas (±30°)</span>
              <span className="text-[10px] text-slate-400 font-mono">Suave & Harmónico</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 h-16">
              {[analogous1, baseColor, analogous2].map((col, idx) => (
                <div
                  key={idx}
                  onClick={() => copyHex(col)}
                  style={{ backgroundColor: col }}
                  className="rounded-xl flex items-center justify-center text-white text-[10px] font-bold font-mono shadow-xs cursor-pointer hover:opacity-90 transition"
                  title="Clica para copiar HEX"
                >
                  <span className="bg-black/30 px-1 py-0.5 rounded backdrop-blur-xs">
                    {copiedHex === col ? '✓' : col}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Triadic */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Tríade Cromática (120°)</span>
              <span className="text-[10px] text-slate-400 font-mono">Vibrante & Equilibrado</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 h-16">
              {[baseColor, triadic1, triadic2].map((col, idx) => (
                <div
                  key={idx}
                  onClick={() => copyHex(col)}
                  style={{ backgroundColor: col }}
                  className="rounded-xl flex items-center justify-center text-white text-[10px] font-bold font-mono shadow-xs cursor-pointer hover:opacity-90 transition"
                  title="Clica para copiar HEX"
                >
                  <span className="bg-black/30 px-1 py-0.5 rounded backdrop-blur-xs">
                    {copiedHex === col ? '✓' : col}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE PAINT MIXER */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-fuchsia-50/50 via-slate-50 to-amber-50/50 border border-slate-200 space-y-4">
        <h4 className="text-xs font-extrabold uppercase text-slate-700 tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-fuchsia-600" /> Misturador de Tintas (Pintura Tradicional)
        </h4>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Pigmento 1</span>
            <input
              type="color"
              value={paint1}
              onChange={(e) => setPaint1(e.target.value)}
              className="w-16 h-16 rounded-2xl border-2 border-white shadow-md cursor-pointer p-0"
            />
            <span className="text-[11px] font-mono font-bold text-slate-500">{paint1}</span>
          </div>

          <span className="text-2xl font-black text-slate-400">+</span>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Pigmento 2</span>
            <input
              type="color"
              value={paint2}
              onChange={(e) => setPaint2(e.target.value)}
              className="w-16 h-16 rounded-2xl border-2 border-white shadow-md cursor-pointer p-0"
            />
            <span className="text-[11px] font-mono font-bold text-slate-500">{paint2}</span>
          </div>

          <span className="text-2xl font-black text-slate-400">=</span>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-xs font-bold text-slate-800">Cor Resultante</span>
            <div
              style={{ backgroundColor: mixedHex }}
              onClick={() => copyHex(mixedHex)}
              className="w-20 h-20 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center text-white font-mono text-xs font-bold cursor-pointer hover:scale-105 transition"
              title="Clica para copiar"
            >
              <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] backdrop-blur-xs">
                {copiedHex === mixedHex ? 'Copiado!' : mixedHex}
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-700">{mixedHex}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
