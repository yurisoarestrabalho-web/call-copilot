import React from 'react';
import { ScriptStage } from '../../types/script';
import { Phone, Clock, User, Flame, ArrowLeft, RotateCcw } from 'lucide-react';

interface CallHeaderProps {
  leadName: string;
  temperature: 'frio' | 'morno' | 'quente';
  durationSeconds: number;
  stage: ScriptStage;
  operatorName: string;
  onGoBack: () => void;
  canGoBack: boolean;
  isInterrupted: boolean;
  onReturnFromInterruption?: () => void;
  onOpenFinishModal: () => void;
}

export const CallHeader: React.FC<CallHeaderProps> = ({
  leadName,
  temperature,
  durationSeconds,
  stage,
  operatorName,
  onGoBack,
  canGoBack,
  isInterrupted,
  onReturnFromInterruption,
  onOpenFinishModal
}) => {
  // Format seconds to mm:ss
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTemperatureBadge = (temp: 'frio' | 'morno' | 'quente') => {
    switch (temp) {
      case 'quente':
        return <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400"><Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Quente</span>;
      case 'morno':
        return <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400"><Flame className="w-3.5 h-3.5 text-amber-400" /> Morno</span>;
      case 'frio':
      default:
        return <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400">Frio</span>;
    }
  };

  const getStageColor = (stg: ScriptStage) => {
    switch (stg) {
      case 'FECHAMENTO':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'PREÇO':
      case 'RECOMENDAÇÃO':
        return 'text-amber-300 bg-amber-950/50 border-amber-500/40';
      case 'OBJEÇÕES':
        return 'text-orange-400 bg-orange-950/50 border-orange-500/40';
      case 'EMERGÊNCIA':
        return 'text-sky-300 bg-sky-950/50 border-sky-500/40';
      default:
        return 'text-slate-300 bg-slate-800/80 border-slate-700/60';
    }
  };

  return (
    <header className="h-16 px-6 bg-[#0B0F17]/95 border-b border-slate-800/80 flex items-center justify-between shrink-0 select-none z-20 backdrop-blur-sm">
      {/* Left: Brand + Lead Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-base shadow-sm shadow-amber-500/20">
            A
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest text-amber-400 font-display uppercase leading-tight">
              ATLAS ACADEMY
            </div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide">
              CALL COPILOT
            </div>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-800" />

        {/* Lead and Temp */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 font-medium text-slate-200">
            <User className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 text-xs">Lead:</span>
            <span className="font-semibold text-white tracking-wide">{leadName || 'Lead'}</span>
          </div>

          <div className="text-xs text-slate-500">·</div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400">Temperatura:</span>
            {getTemperatureBadge(temperature)}
          </div>
        </div>
      </div>

      {/* Middle: Current Stage Indicator */}
      <div className="flex items-center gap-3">
        {isInterrupted && (
          <button
            onClick={onReturnFromInterruption}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md transition-all shadow-md shadow-amber-500/20 animate-pulse"
            title="Voltar para onde a conversa foi interrompida"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RETOMAR CONVERSA</span>
          </button>
        )}

        <div className="text-xs text-slate-400 font-medium">Etapa:</div>
        <div className={`px-3 py-1 rounded-md border text-xs font-bold tracking-wider uppercase ${getStageColor(stage)}`}>
          {stage}
        </div>
      </div>

      {/* Right: Timer + Actions */}
      <div className="flex items-center gap-4">
        {/* Stopwatch Timer */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-sm tabular-nums font-semibold text-slate-200 shadow-inner">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>{formatTimer(durationSeconds)}</span>
        </div>

        {/* Back button */}
        <button
          onClick={onGoBack}
          disabled={!canGoBack}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            canGoBack
              ? 'text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
              : 'text-slate-600 border-slate-800/40 cursor-not-allowed opacity-50'
          }`}
          title="Voltar ao nó anterior (Atalho: B)"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar (B)</span>
        </button>

        {/* Finalize Call Button */}
        <button
          onClick={onOpenFinishModal}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-rose-600/90 hover:bg-rose-500 text-white transition-colors shadow-sm shadow-rose-900/40"
        >
          <Phone className="w-3.5 h-3.5 rotate-[135deg]" />
          <span>Finalizar Call</span>
        </button>
      </div>
    </header>
  );
};
