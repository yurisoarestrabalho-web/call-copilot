import React from 'react';
import { useScript } from '../../context/ScriptContext';
import { 
  ArrowLeft, 
  BarChart2, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  TrendingUp, 
  Calendar,
  UserX,
  FileSpreadsheet
} from 'lucide-react';

interface CallAnalyticsViewProps {
  onBackToHome: () => void;
}

export const CallAnalyticsView: React.FC<CallAnalyticsViewProps> = ({ onBackToHome }) => {
  const { callHistory } = useScript();

  const totalCalls = callHistory.length;
  const totalSales = callHistory.filter(c => c.outcome?.result === 'vendeu').length;
  const conversionRate = totalCalls > 0 ? Math.round((totalSales / totalCalls) * 100) : 0;
  
  const avgDurationSeconds = totalCalls > 0 
    ? Math.round(callHistory.reduce((acc, c) => acc + (c.durationSeconds || 0), 0) / totalCalls)
    : 0;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s}s`;
  };

  // Collect most common objections
  const objectionCounts: Record<string, number> = {};
  callHistory.forEach(c => {
    if (c.variables?.main_objection) {
      objectionCounts[c.variables.main_objection] = (objectionCounts[c.variables.main_objection] || 0) + 1;
    }
  });

  // Collect most clicked responses
  const responseCounts: Record<string, number> = {};
  callHistory.forEach(c => {
    c.history?.forEach(h => {
      if (h.chosenResponseLabel && !h.chosenResponseLabel.startsWith('[')) {
        responseCounts[h.chosenResponseLabel] = (responseCounts[h.chosenResponseLabel] || 0) + 1;
      }
    });
  });

  const sortedResponses = Object.entries(responseCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const sortedObjections = Object.entries(objectionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen w-screen bg-[#070A10] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="px-6 py-4 bg-[#0B0F17] border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Copilot</span>
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div>
            <h1 className="text-base font-bold text-white font-display">
              HISTÓRICO & MÉTRICAS DE SCRIPT
            </h1>
            <p className="text-[11px] text-slate-400">
              Métricas focadas no aprimoramento contínuo das falas e caminhos
            </p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Calls Realizadas</span>
              <PhoneCall className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">{totalCalls}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Vendas Concluídas</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">{totalSales}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Conversão de Venda</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">{conversionRate}%</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Duração Média</span>
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">{formatTime(avgDurationSeconds)}</div>
          </div>
        </div>

        {/* 2-Column Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Clicked Responses */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              <span>Respostas Mais Clicadas pelos Operadores</span>
            </h2>
            {sortedResponses.length > 0 ? (
              <div className="space-y-2">
                {sortedResponses.map(([label, count]) => (
                  <div key={label} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs">
                    <span className="text-slate-200 font-medium">{label}</span>
                    <span className="font-mono font-bold text-amber-400">{count}x</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic py-4 text-center">
                Realize ligações no Copilot para gerar dados de respostas.
              </div>
            )}
          </div>

          {/* Top Objections */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <span>Objeções Mais Frequentes</span>
            </h2>
            {sortedObjections.length > 0 ? (
              <div className="space-y-2">
                {sortedObjections.map(([obj, count]) => (
                  <div key={obj} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs">
                    <span className="text-orange-300 font-medium capitalize">{obj}</span>
                    <span className="font-mono font-bold text-orange-400">{count}x</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic py-4 text-center">
                Nenhuma objeção registrada nas calls recentes.
              </div>
            )}
          </div>
        </div>

        {/* History Table */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>Registro das Últimas Chamadas</span>
          </h2>

          {callHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="pb-2.5">Lead</th>
                    <th className="pb-2.5">Temperatura</th>
                    <th className="pb-2.5">Duração</th>
                    <th className="pb-2.5">Resultado</th>
                    <th className="pb-2.5">Plano / Motivo</th>
                    <th className="pb-2.5">Passos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {callHistory.map(call => (
                    <tr key={call.id} className="hover:bg-slate-950/40">
                      <td className="py-3 font-bold text-white">{call.leadName}</td>
                      <td className="py-3 capitalize text-slate-300">{call.temperature}</td>
                      <td className="py-3 font-mono tabular-nums text-slate-400">{formatTime(call.durationSeconds)}</td>
                      <td className="py-3">
                        {call.outcome?.result === 'vendeu' && (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                            VENDEU
                          </span>
                        )}
                        {call.outcome?.result === 'follow_up' && (
                          <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-bold border border-amber-800">
                            FOLLOW-UP
                          </span>
                        )}
                        {call.outcome?.result === 'nao_vendeu' && (
                          <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 font-bold border border-rose-800">
                            NÃO VENDEU
                          </span>
                        )}
                        {call.outcome?.result === 'sem_interesse' && (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                            SEM INTERESSE
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-slate-300">
                        {call.outcome?.planName ? `${call.outcome.planName} (${call.outcome.value})` : call.outcome?.lossReason || '—'}
                      </td>
                      <td className="py-3 font-mono text-slate-400">{call.history.length} nós percorridos</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-6 text-center">
              Nenhuma ligação finalizada ainda. Clique em INICIAR CALL na tela inicial para testar!
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
