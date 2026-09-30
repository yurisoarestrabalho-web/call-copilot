import React, { useState } from 'react';
import { 
  DollarSign, 
  ShieldAlert, 
  CheckCircle2, 
  Send, 
  Zap, 
  HelpCircle, 
  RotateCcw, 
  UserX, 
  ArrowLeft,
  Award,
  Layers,
  StickyNote
} from 'lucide-react';
import { CallSession, CommercialProof, Plan } from '../../types/script';
import { formatPainForSpeech, formatGoalForSpeech } from '../../utils/templateEngine';

interface CallSidePanelProps {
  session: CallSession;
  plans: Plan[];
  proofs: CommercialProof[];
  onTriggerEmergency: (type: 'preco' | 'objecao' | 'fechar' | 'whatsapp' | 'pressa' | 'pergunta' | 'nao_entendi' | 'sem_interesse') => void;
  onGoBack: () => void;
  canGoBack: boolean;
  onUpdateNote: (note: string) => void;
}

export const CallSidePanel: React.FC<CallSidePanelProps> = ({
  session,
  plans,
  proofs,
  onTriggerEmergency,
  onGoBack,
  canGoBack,
  onUpdateNote
}) => {
  const [activeTab, setActiveTab] = useState<'context' | 'proofs' | 'notes'>('context');
  const [notesText, setNotesText] = useState(session.notes || '');

  const vars = session.variables;
  const painText = formatPainForSpeech(vars.pain || vars.secondary_pain);
  const goalText = formatGoalForSpeech(vars.goal);

  const handleNotesChange = (text: string) => {
    setNotesText(text);
    onUpdateNote(text);
  };

  return (
    <aside className="w-80 sm:w-96 bg-[#0B0F17] border-l border-slate-800/80 flex flex-col h-full shrink-0 select-none overflow-hidden">
      {/* 1. FIXED EMERGENCY / SHORTCUT ACTION BUTTONS */}
      <div className="p-3.5 border-b border-slate-800/80 bg-slate-950/60">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 font-display flex items-center justify-between">
          <span>DESVIOS RÁPIDOS & EMERGÊNCIA</span>
          <span className="text-slate-400 font-mono text-[9px]">ATALHOS ATIVOS</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {/* PREÇO */}
          <button
            onClick={() => onTriggerEmergency('preco')}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 text-amber-200 text-xs font-bold transition-all text-left"
            title="Atalho: Tecla P"
          >
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              Preço
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-[10px] font-mono text-amber-300">P</kbd>
          </button>

          {/* OBJEÇÃO */}
          <button
            onClick={() => onTriggerEmergency('objecao')}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-400 text-orange-200 text-xs font-bold transition-all text-left"
            title="Atalho: Tecla O"
          >
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              Objeção
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-orange-950/80 border border-orange-500/40 text-[10px] font-mono text-orange-300">O</kbd>
          </button>

          {/* QUER FECHAR */}
          <button
            onClick={() => onTriggerEmergency('fechar')}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 hover:border-emerald-400 text-emerald-200 text-xs font-bold transition-all text-left"
            title="Atalho: Tecla F"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Quer Fechar
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">F</kbd>
          </button>

          {/* PEDIU WHATSAPP */}
          <button
            onClick={() => onTriggerEmergency('whatsapp')}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-600/30 text-emerald-100 text-xs font-bold transition-all text-left"
            title="Atalho: Tecla W"
          >
            <span className="flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/40 text-[10px] font-mono text-emerald-300">W</kbd>
          </button>

          {/* ESTÁ COM PRESSA */}
          <button
            onClick={() => onTriggerEmergency('pressa')}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-200 text-xs font-bold transition-all text-left"
          >
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              Está com Pressa
            </span>
          </button>

          {/* FEZ PERGUNTA */}
          <button
            onClick={() => onTriggerEmergency('pergunta')}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-200 text-xs font-bold transition-all text-left"
            title="Atalho: Tecla Q"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
              Fez Pergunta
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-violet-950/80 border border-violet-500/40 text-[10px] font-mono text-violet-300">Q</kbd>
          </button>

          {/* NÃO ENTENDI */}
          <button
            onClick={() => onTriggerEmergency('nao_entendi')}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-300 text-xs font-medium transition-all text-left"
          >
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              Não Entendi
            </span>
          </button>

          {/* NÃO TEM INTERESSE */}
          <button
            onClick={() => onTriggerEmergency('sem_interesse')}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-rose-950/20 hover:bg-rose-900/40 border border-rose-800/40 text-rose-300 text-xs font-medium transition-all text-left"
          >
            <span className="flex items-center gap-1.5">
              <UserX className="w-3.5 h-3.5 text-rose-400" />
              Sem Interesse
            </span>
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('context')}
          className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
            activeTab === 'context'
              ? 'border-amber-400 text-amber-400 bg-amber-400/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Contexto da Call
        </button>
        <button
          onClick={() => setActiveTab('proofs')}
          className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
            activeTab === 'proofs'
              ? 'border-amber-400 text-amber-400 bg-amber-400/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Provas & Planos
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
            activeTab === 'notes'
              ? 'border-amber-400 text-amber-400 bg-amber-400/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Anotações (N)
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {activeTab === 'context' && (
          <div className="space-y-4">
            {/* Context Variables List */}
            <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 space-y-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                MEMÓRIA DA CONVERSA
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Experiência:</span>
                <span className="text-slate-200 font-semibold">
                  {vars.experience === 'beginner' ? 'Iniciante (nunca investiu)' : vars.experience ? 'Já investe no mercado' : 'Ainda não identificada'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Dor principal:</span>
                <span className="text-amber-200 font-semibold">
                  {painText}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Objetivo declarado:</span>
                <span className="text-emerald-200 font-semibold">
                  {goalText}
                </span>
              </div>

              {vars.previous_loss && (
                <div className="p-2 rounded bg-rose-950/40 border border-rose-800/40 text-rose-200">
                  <span className="font-bold">Aviso:</span> Já perdeu dinheiro no passado ({vars.loss_cause || 'operando sozinho'}). Manter acolhimento e reforçar acompanhamento.
                </div>
              )}

              {vars.buying_intent && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Urgência / Timing:</span>
                  <span className="text-slate-200 font-semibold">
                    {vars.buying_intent === 'high' ? 'Quer começar agora' : vars.buying_intent === 'medium' ? 'Próximas semanas' : 'Pesquisando mercado'}
                  </span>
                </div>
              )}

              {vars.main_objection && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Objeção primária:</span>
                  <span className="text-orange-300 font-bold">
                    {vars.main_objection}
                  </span>
                </div>
              )}
            </div>

            {/* RECOMMENDED PLAN CARD */}
            <div className="bg-gradient-to-br from-amber-950/30 to-slate-900 rounded-xl p-3.5 border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-display">
                  RECOMENDAÇÃO INTERNA
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px]">
                  {vars.recommended_plan_price || 'USD 250'}
                </span>
              </div>

              <div className="text-base font-bold text-white tracking-wide">
                PLANO {vars.recommended_plan || 'PERFORMANCE'}
              </div>

              <div className="text-[11px] text-slate-300 space-y-1">
                <div className="font-semibold text-slate-400 text-[10px] uppercase">Por quê sugerir esse:</div>
                {vars.recommended_reasons?.map((reason: string, i: number) => (
                  <div key={i} className="flex items-start gap-1.5 text-slate-300">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>{reason}</span>
                  </div>
                )) || (
                  <div className="text-slate-400">Recomendado após etapa de acompanhamento.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proofs' && (
          <div className="space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
              PROVAS COMERCIAIS DOCUMENTADAS
            </div>

            {proofs.map(proof => (
              <div key={proof.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-xs">{proof.statOrFact}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{proof.category}</span>
                </div>
                <p className="text-[11px] text-slate-300 italic">
                  “{proof.speechText}”
                </p>
                <div className="text-[10px] text-slate-400 font-mono">
                  {proof.disclaimer}
                </div>
              </div>
            ))}

            <div className="pt-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display mb-2">
                PLANOS ATLAS ACADEMY
              </div>
              <div className="grid grid-cols-2 gap-2">
                {plans.map(p => (
                  <div key={p.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left">
                    <div className="font-bold text-white text-xs">{p.name}</div>
                    <div className="text-amber-400 font-semibold text-xs">{p.price}</div>
                    <div className="text-[10px] text-slate-400">{p.meetings}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-2 h-full flex flex-col">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <StickyNote className="w-4 h-4 text-amber-400" />
              <span>Notas rápidas durante a call:</span>
            </div>
            <textarea
              value={notesText}
              onChange={e => handleNotesChange(e.target.value)}
              placeholder="Digite observações importantes sobre o lead ou detalhes específicos..."
              className="w-full flex-1 min-h-[200px] p-3 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none resize-none"
            />
            <span className="text-[10px] text-slate-400">
              Salvo automaticamente na sessão desta call.
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
