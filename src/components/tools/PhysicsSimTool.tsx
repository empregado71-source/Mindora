import React, { useState, useEffect, useRef } from 'react';
import { Zap, Play, Pause, RotateCcw, Compass, Gauge } from 'lucide-react';

export const PhysicsSimTool: React.FC = () => {
  const [planet, setPlanet] = useState<'earth' | 'moon' | 'mars'>('earth');
  const [initialHeight, setInitialHeight] = useState(50); // meters
  const [mass, setMass] = useState(5); // kg
  const [currentHeight, setCurrentHeight] = useState(50);
  const [velocity, setVelocity] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const gravity = planet === 'earth' ? 9.81 : planet === 'moon' ? 1.62 : 3.72;
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      if (isRunning) {
        setTime((t) => {
          const nextT = t + dt;
          // Physics: v = g * t, h = h0 - 0.5 * g * t^2
          const nextH = Math.max(0, initialHeight - 0.5 * gravity * nextT * nextT);
          const nextV = gravity * nextT;

          setCurrentHeight(Math.round(nextH * 10) / 10);
          setVelocity(Math.round(nextV * 10) / 10);

          if (nextH <= 0) {
            setIsRunning(false);
            return nextT;
          }
          return nextT;
        });
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRunning, gravity, initialHeight]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setVelocity(0);
    setCurrentHeight(initialHeight);
  };

  const potentialEnergy = Math.round(mass * gravity * currentHeight);
  const kineticEnergy = Math.round(0.5 * mass * velocity * velocity);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold shadow-xs">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Simulador de Física & Cinemática</h3>
            <p className="text-xs text-slate-500">Queda Livre, Gravidade Planetária, Energia Mecânica & Velocidade</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
              isRunning ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-cyan-600 text-white hover:bg-cyan-700'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            <span>{isRunning ? 'Pausar' : 'Iniciar Queda'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
            title="Reiniciar Simulação"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Controls */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
          {/* Planet */}
          <div className="space-y-1.5">
            <span className="font-bold text-slate-700 text-xs block">Corpo Celeste / Gravidade:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'earth', label: '🌍 Terra', g: '9.81 m/s²' },
                { id: 'mars', label: '🔴 Marte', g: '3.72 m/s²' },
                { id: 'moon', label: '🌕 Lua', g: '1.62 m/s²' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPlanet(p.id as any);
                    handleReset();
                  }}
                  className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                    planet === p.id ? 'bg-cyan-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  <span>{p.label}</span>
                  <span className="text-[10px] opacity-80">{p.g}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Initial Height */}
          <div className="space-y-1">
            <div className="flex justify-between font-bold text-slate-700 text-xs">
              <span>Altura Inicial:</span>
              <span className="font-mono text-cyan-700">{initialHeight} metros</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={initialHeight}
              disabled={isRunning}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setInitialHeight(val);
                setCurrentHeight(val);
              }}
              className="w-full accent-cyan-600 cursor-pointer"
            />
          </div>

          {/* Mass */}
          <div className="space-y-1">
            <div className="flex justify-between font-bold text-slate-700 text-xs">
              <span>Massa do Objeto:</span>
              <span className="font-mono text-cyan-700">{mass} kg</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={mass}
              onChange={(e) => setMass(parseInt(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
          </div>

          {/* Physics Readouts */}
          <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Energia Potencial (Ep = m·g·h):</span>
              <span className="font-mono font-bold text-slate-800">{potentialEnergy} J</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Energia Cinética (Ec = ½ m·v²):</span>
              <span className="font-mono font-bold text-slate-800">{kineticEnergy} J</span>
            </div>
            <div className="flex items-center justify-between font-bold text-cyan-800 bg-cyan-50 p-2 rounded-xl">
              <span>Energia Mecânica Total:</span>
              <span className="font-mono">{potentialEnergy + kineticEnergy} Joules</span>
            </div>
          </div>
        </div>

        {/* Visual Drop Chamber */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 text-white min-h-[360px] flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 z-10">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-cyan-400">
                <Compass className="w-3.5 h-3.5" /> Altura: {currentHeight} m
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Gauge className="w-3.5 h-3.5" /> Velocidade: {velocity} m/s ({Math.round(velocity * 3.6)} km/h)
              </span>
            </div>
            <span>Tempo: {time.toFixed(2)}s</span>
          </div>

          {/* Height Meter Column and Sphere */}
          <div className="relative flex-1 my-4 flex items-center justify-center">
            {/* Height guide lines */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-800 flex flex-col justify-between text-[10px] font-mono text-slate-500">
              <span>{initialHeight}m</span>
              <span>{Math.round(initialHeight / 2)}m</span>
              <span>Solo (0m)</span>
            </div>

            {/* Falling sphere */}
            <div
              style={{
                bottom: `${(currentHeight / initialHeight) * 75}%`,
                transition: isRunning ? 'none' : 'bottom 0.2s ease-out'
              }}
              className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-sky-300 shadow-lg shadow-cyan-500/40 flex items-center justify-center font-bold text-xs text-slate-950 font-mono"
            >
              {mass}kg
            </div>

            {/* Impact zone indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-700 via-cyan-900 to-slate-700 rounded-full" />
          </div>

          <div className="text-[11px] text-slate-400 text-center font-medium">
            Princípio da Conservação de Energia: À medida que o objeto cai, a Energia Potencial converte-se em Energia Cinética!
          </div>
        </div>
      </div>
    </div>
  );
};
