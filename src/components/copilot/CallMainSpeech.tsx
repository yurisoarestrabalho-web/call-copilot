import React, { useState } from 'react';
import { ScriptNode } from '../../types/script';
import { DynamicScriptContext, renderTemplate } from '../../utils/templateEngine';
import { Volume2, AlertTriangle, Compass, Sparkles, MessageSquareQuote } from 'lucide-react';

interface CallMainSpeechProps {
  node: ScriptNode;
  context: DynamicScriptContext;
}

export const CallMainSpeech: React.FC<CallMainSpeechProps> = ({ node, context }) => {
  const [speechVariant, setSpeechVariant] = useState<'normal' | 'short' | 'alt'>('normal');

  // Determine which script to show
  let rawScript = node.exactOperatorScript;
  if (speechVariant === 'short' && node.shortScript) {
    rawScript = node.shortScript;
  } else if (speechVariant === 'alt' && node.alternativeScript) {
    rawScript = node.alternativeScript;
  }

  const renderedScript = renderTemplate(rawScript, context);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center">
      {/* Internal Instruction / Pause Command Alert */}
      {node.instruction && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-200 flex items-center justify-between shadow-lg shadow-amber-950/20">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 mr-2 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                INSTRUÇÃO INTERNA
              </span>
              <span className="text-sm font-bold text-amber-100">{node.instruction}</span>
            </div>
          </div>
          <span className="text-[11px] font-medium text-amber-400/80 tracking-wide uppercase hidden sm:inline">
            NÃO leia em voz alta
          </span>
        </div>
      )}

      {/* Main Speech Container */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0d131f] border-2 border-slate-700/80 p-7 sm:p-9 shadow-2xl shadow-black/80">
        {/* Top Header of the Card */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest text-amber-400 font-display uppercase">
                FALE EXATAMENTE ISSO:
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {node.title}
              </div>
            </div>
          </div>

          {/* Speech Variants Switcher (Normal / Curta / Alternativa) */}
          {(node.shortScript || node.alternativeScript) && (
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setSpeechVariant('normal')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  speechVariant === 'normal'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Completa
              </button>
              {node.shortScript && (
                <button
                  type="button"
                  onClick={() => setSpeechVariant('short')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    speechVariant === 'short'
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Curta
                </button>
              )}
              {node.alternativeScript && (
                <button
                  type="button"
                  onClick={() => setSpeechVariant('alt')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    speechVariant === 'alt'
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Alternativa
                </button>
              )}
            </div>
          )}
        </div>

        {/* DOMINANT SPOKEN TEXT */}
        <div className="py-2">
          <p className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-white leading-relaxed tracking-normal font-sans select-text">
            “{renderedScript}”
          </p>
        </div>

        {/* Bottom Metadata: Objective & Tone */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Tone */}
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-slate-400">TOM:</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/90 text-amber-300 font-semibold border border-slate-700/60 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {node.tone}
            </span>
          </div>

          {/* Objective */}
          <div className="flex items-center gap-2 text-slate-400 max-w-md">
            <Compass className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-bold uppercase tracking-wider text-slate-400">OBJETIVO:</span>
            <span className="text-slate-300 truncate" title={node.objective}>
              {node.objective}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
