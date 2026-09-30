import React, { useState } from 'react';
import { Plan, QuickAnswer, CallSession } from '../../types/script';
import { CheckCircle2, Calendar, XCircle, UserX, HelpCircle, ShieldAlert, X } from 'lucide-react';

interface FinishCallModalProps {
  plans: Plan[];
  recommendedPlanName?: string;
  onConfirmFinish: (outcome: NonNullable<CallSession['outcome']>) => void;
  onClose: () => void;
}

export const FinishCallModal: React.FC<FinishCallModalProps> = ({
  plans,
  recommendedPlanName,
  onConfirmFinish,
  onClose
}) => {
  const [result, setResult] = useState<'vendeu' | 'follow_up' | 'nao_vendeu' | 'sem_interesse'>('vendeu');
  const [selectedPlanId, setSelectedPlanId] = useState(
    plans.find(p => p.name === recommendedPlanName)?.id || plans[1]?.id || plans[0]?.id
  );
  const [followUpDate, setFollowUpDate] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const handleFinish = () => {
    const chosenPlan = plans.find(p => p.id === selectedPlanId);
    onConfirmFinish({
      result,
      planId: result === 'vendeu' ? selectedPlanId : undefined,
      planName: result === 'vendeu' ? chosenPlan?.name : undefined,
      value: result === 'vendeu' ? chosenPlan?.price : undefined,
      followUpDate: result === 'follow_up' ? followUpDate : undefined,
      lossReason: result !== 'vendeu' ? reason : undefined,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
          <h2 className="text-xl font-bold font-display text-white">Como terminou a ligação?</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Outcome Choices */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <button
            type="button"
            onClick={() => setResult('vendeu')}
            className={`p-3 rounded-xl border flex items-center gap-2.5 font-bold text-sm transition-all ${
              result === 'vendeu'
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-300" />
            <span>VENDEU</span>
          </button>

          <button
            type="button"
            onClick={() => setResult('follow_up')}
            className={`p-3 rounded-xl border flex items-center gap-2.5 font-bold text-sm transition-all ${
              result === 'follow_up'
                ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-950/50'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0 text-amber-300" />
            <span>FOLLOW-UP</span>
          </button>

          <button
            type="button"
            onClick={() => setResult('nao_vendeu')}
            className={`p-3 rounded-xl border flex items-center gap-2.5 font-bold text-sm transition-all ${
              result === 'nao_vendeu'
                ? 'bg-rose-700 text-white border-rose-400 shadow-lg shadow-rose-950/50'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <XCircle className="w-4 h-4 shrink-0 text-rose-300" />
            <span>NÃO VENDEU</span>
          </button>

          <button
            type="button"
            onClick={() => setResult('sem_interesse')}
            className={`p-3 rounded-xl border flex items-center gap-2.5 font-bold text-sm transition-all ${
              result === 'sem_interesse'
                ? 'bg-slate-700 text-white border-slate-400 shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <UserX className="w-4 h-4 shrink-0 text-slate-400" />
            <span>SEM INTERESSE</span>
          </button>
        </div>

        {/* Dynamic Fields */}
        {result === 'vendeu' && (
          <div className="mb-4 space-y-2">
            <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Qual plano foi vendido?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {plans.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlanId(p.id)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                    selectedPlanId === p.id
                      ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-white">{p.name}</div>
                  <div className="text-amber-400">{p.price}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {result === 'follow_up' && (
          <div className="mb-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-amber-400 mb-1">
                Data / Horário do Retorno
              </label>
              <input
                type="text"
                value={followUpDate}
                onChange={e => setFollowUpDate(e.target.value)}
                placeholder="Ex: Amanhã às 15:00 / Quinta-feira de manhã"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Motivo do Follow-up</label>
              <input
                type="text"
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Ex: Falar com cônjuge / Aguardar liberação de limite"
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {(result === 'nao_vendeu' || result === 'sem_interesse') && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Motivo principal da não conversão
            </label>
            <input
              type="text"
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Ex: Falta de dinheiro / Não confia em mercado / Priorizou outro gasto"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        )}

        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Notas finais da sessão</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Observações complementares..."
            rows={2}
            className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 focus:outline-none resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleFinish}
            className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/20 font-display uppercase tracking-wider"
          >
            FINALIZAR CALL
          </button>
        </div>
      </div>
    </div>
  );
};

// QUICK ANSWERS MODAL (Fez Uma Pergunta)
interface QuickAnswersModalProps {
  answers: QuickAnswer[];
  onSelectAndReturn: (scriptToSpeak: string) => void;
  onClose: () => void;
}

export const QuickAnswersModal: React.FC<QuickAnswersModalProps> = ({
  answers,
  onSelectAndReturn,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeAnswer, setActiveAnswer] = useState<QuickAnswer | null>(null);

  const categories = ['Todas', 'Empresa', 'Investimentos', 'CopyTrade', 'Corretora', 'Resultado', 'Risco', 'Garantia', 'Outra'];

  const filtered = selectedCategory === 'Todas'
    ? answers
    : answers.filter(a => a.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-2xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-violet-400" />
            <h3 className="text-lg font-bold text-white font-display">
              Biblioteca de Respostas Rápidas (Pergunta Inesperada)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-2 shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content / List of questions */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.map(qa => (
            <div
              key={qa.id}
              className={`p-3.5 rounded-xl border transition-all ${
                activeAnswer?.id === qa.id
                  ? 'bg-violet-950/40 border-violet-500'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white text-xs">{qa.questionSnippet}</span>
                <span className="text-[10px] uppercase font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-950 border border-violet-800/60">
                  {qa.category}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed mb-3">
                “{qa.exactAnswerScript}”
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                <span className="text-slate-400 italic">Tom: {qa.tone}</span>
                <button
                  type="button"
                  onClick={() => onSelectAndReturn(qa.exactAnswerScript)}
                  className="px-3 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs"
                >
                  Usar e Voltar à Conversa
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

// OBJECTION ENGINE PICKER MODAL
interface ObjectionPickerModalProps {
  onSelectObjectionNode: (nodeId: string, objectionLabel: string) => void;
  onClose: () => void;
}

export const ObjectionPickerModal: React.FC<ObjectionPickerModalProps> = ({
  onSelectObjectionNode,
  onClose
}) => {
  const objections = [
    { label: '“Está caro”', nodeId: 'node-obj-esta-caro', desc: 'Investigar se não tem dinheiro ou não viu valor suficiente.' },
    { label: '“Não tenho dinheiro”', nodeId: 'node-obj-nao-tenho-dinheiro', desc: 'Verificar se é real ou oferecer opção menor.' },
    { label: '“Preciso pensar”', nodeId: 'node-obj-preciso-pensar', desc: 'Descobrir se é preço, confiança, medo ou cônjuge.' },
    { label: '“Falar com meu marido/esposa”', nodeId: 'node-obj-conjuge', desc: 'Testar se o lead faria sozinho e preparar argumentos.' },
    { label: '“Tenho medo de perder dinheiro”', nodeId: 'node-obj-medo-perder', desc: 'Separar risco do mercado de falta de acompanhamento.' },
    { label: '“Já perdi dinheiro no passado”', nodeId: 'node-obj-ja-perdeu', desc: 'Acolher a dor e ancorar no acompanhamento.' },
    { label: '“Não confio em CopyTrade”', nodeId: 'node-obj-copytrade', desc: 'Enfatizar que o CopyTrade é 100% opcional.' },
    { label: '“Como sei que funciona?”', nodeId: 'node-obj-como-funciona', desc: 'Provas históricas documentadas (>85%, +5k clientes).' },
    { label: '“Vocês garantem resultado?”', nodeId: 'node-obj-garante-resultado', desc: 'Ética e transparência: mercado tem risco, sem promessas falsas.' },
    { label: '“Quero pesquisar mais”', nodeId: 'node-obj-pesquisar', desc: 'Sanar as dúvidas antes que ele saia da ligação.' },
    { label: '“Me manda no WhatsApp”', nodeId: 'node-obj-whatsapp', desc: 'Descobrir o que ele quer analisar antes de desligar.' },
    { label: '“Estou comparando com outra”', nodeId: 'node-obj-comparando', desc: 'Entender os critérios de decisão do lead.' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-orange-500/40 rounded-2xl w-full max-w-xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-white font-display">
              Motor de Objeções — Selecionar Objeção do Lead
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-3">
          Princípio: <span className="text-amber-400 font-bold">VALIDAR → INVESTIGAR → RESPONDER → CONFIRMAR → FECHAR NOVAMENTE.</span>
        </p>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {objections.map(obj => (
            <button
              key={obj.nodeId}
              onClick={() => {
                onSelectObjectionNode(obj.nodeId, obj.label);
                onClose();
              }}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/60 hover:bg-orange-950/20 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-sm font-bold text-orange-300 group-hover:text-orange-200">
                  {obj.label}
                </div>
                <div className="text-xs text-slate-400 line-clamp-1">{obj.desc}</div>
              </div>
              <span className="text-xs font-semibold text-orange-400 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 shrink-0 ml-3">
                Tratar
              </span>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
