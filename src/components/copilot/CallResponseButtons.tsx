import React, { useState } from 'react';
import { ScriptNode, ScriptResponse } from '../../types/script';
import { MessageSquare, ArrowRight, CornerDownLeft, Search, HelpCircle } from 'lucide-react';

interface CallResponseButtonsProps {
  node: ScriptNode;
  allNodes: Record<string, ScriptNode>;
  onSelectResponse: (response: ScriptResponse) => void;
  onCustomResponseJump: (targetNodeId: string, customText: string) => void;
}

export const CallResponseButtons: React.FC<CallResponseButtonsProps> = ({
  node,
  allNodes,
  onSelectResponse,
  onCustomResponseJump
}) => {
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  // Styles based on response sentiment
  const getButtonStyles = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-500/40 text-emerald-100 hover:border-emerald-400 hover:shadow-emerald-950/40';
      case 'objection':
        return 'bg-amber-950/40 hover:bg-amber-900/60 border-amber-500/40 text-amber-100 hover:border-amber-400 hover:shadow-amber-950/40';
      case 'negative':
        return 'bg-rose-950/30 hover:bg-rose-900/50 border-rose-500/40 text-rose-100 hover:border-rose-400 hover:shadow-rose-950/40';
      default:
        return 'bg-slate-800/80 hover:bg-slate-750 border-slate-700/80 text-slate-100 hover:border-amber-400/60 hover:shadow-slate-900/40';
    }
  };

  // Find candidate nodes in the current stage or all stages for "Outra Resposta"
  const stageCandidateNodes = Object.values(allNodes).filter(n => {
    if (searchFilter.trim()) {
      return (
        n.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        n.stage.toLowerCase().includes(searchFilter.toLowerCase()) ||
        n.exactOperatorScript.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    return n.stage === node.stage || n.stage === 'DIAGNÓSTICO' || n.stage === 'OBJEÇÕES' || n.stage === 'FECHAMENTO';
  });

  const handleConfirmOther = (targetNodeId: string) => {
    onCustomResponseJump(targetNodeId, otherText.trim() || 'Resposta não catalogada');
    setShowOtherModal(false);
    setOtherText('');
    setSearchFilter('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-amber-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-display">
            O QUE O LEAD RESPONDEU?
          </h2>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          Dica: Use os números do teclado (1 a {node.responses.length})
        </span>
      </div>

      {/* Grid of Large Response Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {node.responses.map((resp, idx) => {
          const shortcutKey = resp.keyShortcut || (idx + 1).toString();
          return (
            <button
              key={resp.id}
              onClick={() => onSelectResponse(resp)}
              className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left font-medium transition-all duration-150 active:scale-[0.99] shadow-md hover:shadow-lg cursor-pointer ${getButtonStyles(
                resp.sentiment
              )}`}
            >
              <div className="flex items-center gap-3 pr-2">
                <span className="w-6 h-6 rounded-md bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-xs font-mono font-bold text-amber-400 shrink-0 group-hover:border-amber-400 group-hover:scale-105 transition-all">
                  {shortcutKey}
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-white leading-snug">
                  {resp.label}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-amber-400 transition-all shrink-0" />
            </button>
          );
        })}

        {/* OUTRA RESPOSTA BUTTON (Always Present) */}
        <button
          onClick={() => setShowOtherModal(true)}
          className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-dashed border-slate-700 hover:border-amber-500/80 bg-slate-900/50 hover:bg-slate-800/80 text-left font-medium transition-all duration-150 cursor-pointer text-slate-400 hover:text-amber-200"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-400 shrink-0 group-hover:text-amber-400 group-hover:border-amber-400/50">
              ?
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-300 group-hover:text-amber-300">
              [ Outra resposta não catalogada ]
            </span>
          </div>
          <CornerDownLeft className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
        </button>
      </div>

      {/* OUTRA RESPOSTA MODAL */}
      {showOtherModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Classificar Outra Resposta do Lead
                </h3>
              </div>
              <button
                onClick={() => setShowOtherModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                ESC Fechar
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                O que o lead disse verbalmente? (opcional)
              </label>
              <input
                type="text"
                value={otherText}
                onChange={e => setOtherText(e.target.value)}
                placeholder="Ex: Falou que precisa pagar uma dívida antes..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                autoFocus
              />
            </div>

            <div className="mb-3">
              <label className="block text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">
                Qual destes caminhos mais se aproxima?
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder="Pesquisar nós da conversa..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* List of candidates */}
            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
              {stageCandidateNodes.slice(0, 8).map(cand => (
                <button
                  key={cand.id}
                  onClick={() => handleConfirmOther(cand.id)}
                  className="w-full p-2.5 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700/60 hover:border-amber-500/60 text-left transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-amber-300">{cand.stage} · {cand.title}</div>
                    <div className="text-xs text-slate-300 line-clamp-1 italic">
                      “{cand.exactOperatorScript.slice(0, 80)}...”
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-amber-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0 ml-2">
                    Ir para cá
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setShowOtherModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
