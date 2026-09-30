import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import { Flame, Play, RotateCcw, Wrench, BarChart2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

interface HomeStartViewProps {
  onOpenBuilder: () => void;
  onOpenAnalytics: () => void;
}

export const HomeStartView: React.FC<HomeStartViewProps> = ({ onOpenBuilder, onOpenAnalytics }) => {
  const { startCall, resumeLastCall, savedSessionExists } = useScript();

  const [leadName, setLeadName] = useState('');
  const [operatorName, setOperatorName] = useState('Eduardo Atlas');
  const [temperature, setTemperature] = useState<'frio' | 'morno' | 'quente'>('morno');

  const handleStart = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    startCall(leadName.trim() || 'Lead Interessado', temperature, operatorName.trim() || 'Atlas Academy');
  };

  // Quick Runners for the 4 Mandatory Test Calls requested by user
  const runTestCall = (testNumber: number) => {
    switch (testNumber) {
      case 1:
        startCall('João Silva (Teste 1)', 'morno', 'Operador Atlas');
        break;
      case 2:
        startCall('Carlos Mendes (Teste 2)', 'quente', 'Operador Atlas');
        break;
      case 3:
        startCall('Mariana Costa (Teste 3)', 'frio', 'Operador Atlas');
        break;
      case 4:
        startCall('Rodrigo Lima (Teste 4)', 'quente', 'Operador Atlas');
        break;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#070A10] text-slate-100 flex flex-col justify-between selection:bg-amber-500/30">
      {/* Top Bar Navigation */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-900 bg-[#0B0F17]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-amber-500/20">
            A
          </div>
          <div>
            <div className="text-xs font-black tracking-widest text-amber-400 font-display uppercase">
              ATLAS ACADEMY
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wide">
              DIAL & VOICE COPILOT
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-3 text-xs font-semibold">
          <button
            onClick={onOpenBuilder}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-amber-500/50 bg-slate-900 text-slate-300 hover:text-amber-300 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Script Builder (Admin)</span>
          </button>
          <button
            onClick={onOpenAnalytics}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Histórico & Métricas</span>
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          {/* Logo & Headline */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase font-display block mb-2">
              ATLAS ACADEMY
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display mb-3">
              CALL COPILOT
            </h1>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              O GPS conversacional em tempo real. Leia exatamente a frase na tela e conduza a ligação com precisão.
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleStart} className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c121d] border border-slate-800/90 p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-5">
            {/* Lead Name */}
            <div>
              <label htmlFor="lead-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Nome do Lead:
              </label>
              <input
                id="lead-name"
                type="text"
                value={leadName}
                onChange={e => setLeadName(e.target.value)}
                placeholder="Ex: João Silva"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-base focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-all font-medium placeholder:text-slate-600"
                autoFocus
              />
            </div>

            {/* Operator Name */}
            <div>
              <label htmlFor="operator-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Operador:
              </label>
              <input
                id="operator-name"
                type="text"
                value={operatorName}
                onChange={e => setOperatorName(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-all font-medium placeholder:text-slate-600"
              />
            </div>

            {/* Temperature Segmented Controls */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Temperatura:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTemperature('frio')}
                  className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    temperature === 'frio'
                      ? 'bg-sky-500/20 text-sky-300 border-sky-400 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  FRIO
                </button>
                <button
                  type="button"
                  onClick={() => setTemperature('morno')}
                  className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    temperature === 'morno'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-sm shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  MORNO
                </button>
                <button
                  type="button"
                  onClick={() => setTemperature('quente')}
                  className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    temperature === 'quente'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-sm shadow-rose-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  QUENTE
                </button>
              </div>
            </div>

            {/* GIANT START BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 text-base sm:text-lg font-black font-display tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 active:scale-[0.99] transition-all cursor-pointer"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>INICIAR CALL</span>
              </button>
            </div>

            {/* RESUME LAST CALL (IF SAVED) */}
            {savedSessionExists && (
              <button
                type="button"
                onClick={resumeLastCall}
                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/15 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400 animate-spin-reverse" />
                <span>RETOMAR ÚLTIMA CALL EM ANDAMENTO</span>
              </button>
            )}
          </form>

          {/* Test Scenarios Runner */}
          <div className="mt-8 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-display">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulações de Teste Obrigatórias:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => runTestCall(1)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/60 text-left text-slate-300 hover:text-white transition-all"
              >
                <span className="font-bold text-amber-400 block">CALL 1:</span>
                Iniciante · Medo de perder · Objeção de Preço · Fechamento
              </button>
              <button
                onClick={() => runTestCall(2)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/60 text-left text-slate-300 hover:text-white transition-all"
              >
                <span className="font-bold text-amber-400 block">CALL 2:</span>
                Já investe · Perdeu dinheiro · Dúvida de garantia & provas
              </button>
              <button
                onClick={() => runTestCall(3)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/60 text-left text-slate-300 hover:text-white transition-all"
              >
                <span className="font-bold text-amber-400 block">CALL 3:</span>
                Preço no início · Com pressa · Diagnóstico rápido · WhatsApp
              </button>
              <button
                onClick={() => runTestCall(4)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/60 text-left text-slate-300 hover:text-white transition-all"
              >
                <span className="font-bold text-amber-400 block">CALL 4:</span>
                Dúvida CopyTrade · Quer fechar antes do fim
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        ATLAS ACADEMY © {new Date().getFullYear()} · O operador NÃO deve precisar pensar no que falar.
      </footer>
    </div>
  );
};
