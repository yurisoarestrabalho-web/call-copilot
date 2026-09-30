import React, { useState, useEffect, useCallback } from 'react';
import { useScript } from '../../context/ScriptContext';
import { CallHeader } from './CallHeader';
import { CallMainSpeech } from './CallMainSpeech';
import { CallResponseButtons } from './CallResponseButtons';
import { CallSidePanel } from './CallSidePanel';
import { FinishCallModal, QuickAnswersModal, ObjectionPickerModal } from './QuickModals';

export const CallCopilotView: React.FC = () => {
  const {
    currentSession,
    activeVersion,
    chooseResponse,
    jumpToNode,
    returnFromInterruption,
    goBack,
    finishCall,
    setNotes
  } = useScript();

  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showObjectionModal, setShowObjectionModal] = useState(false);
  const [showQuickAnswersModal, setShowQuickAnswersModal] = useState(false);

  // Active node from tree
  const currentNodeId = currentSession?.currentNodeId || activeVersion.initialNodeId;
  const currentNode = activeVersion.nodes[currentNodeId] || activeVersion.nodes['node-abertura-principal'];

  // Handle emergency triggers
  const handleTriggerEmergency = useCallback((type: 'preco' | 'objecao' | 'fechar' | 'whatsapp' | 'pressa' | 'pergunta' | 'nao_entendi' | 'sem_interesse') => {
    switch (type) {
      case 'preco':
        jumpToNode('node-emergencia-preco-inicial', true, 'Pergunta de Preço');
        break;
      case 'objecao':
        setShowObjectionModal(true);
        break;
      case 'fechar':
        jumpToNode('node-emergencia-quer-fechar', true, 'Quer Fechar Agora');
        break;
      case 'whatsapp':
        jumpToNode('node-obj-whatsapp', true, 'Pediu WhatsApp');
        break;
      case 'pressa':
        jumpToNode('node-emergencia-pressa', true, 'Lead com Pressa');
        break;
      case 'pergunta':
        setShowQuickAnswersModal(true);
        break;
      case 'nao_entendi':
        jumpToNode('node-emergencia-nao-entendi', true, 'Não Entendeu');
        break;
      case 'sem_interesse':
        jumpToNode('node-abertura-sem-interesse', true, 'Sem Interesse');
        break;
    }
  }, [jumpToNode]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        if (e.key === 'Escape') {
          target.blur();
        }
        return;
      }

      // Check number keys 1..9 for response buttons
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= 9 && currentNode.responses[num - 1]) {
        e.preventDefault();
        chooseResponse(currentNode.responses[num - 1]);
        return;
      }

      // Alphabet shortcuts
      const key = e.key.toLowerCase();
      if (key === 'p') {
        e.preventDefault();
        handleTriggerEmergency('preco');
      } else if (key === 'o') {
        e.preventDefault();
        setShowObjectionModal(true);
      } else if (key === 'f') {
        e.preventDefault();
        handleTriggerEmergency('fechar');
      } else if (key === 'q') {
        e.preventDefault();
        setShowQuickAnswersModal(true);
      } else if (key === 'w') {
        e.preventDefault();
        handleTriggerEmergency('whatsapp');
      } else if (key === 'b') {
        e.preventDefault();
        if (currentSession && currentSession.history.length > 1) {
          goBack();
        }
      } else if (key === 'escape') {
        setShowFinishModal(false);
        setShowObjectionModal(false);
        setShowQuickAnswersModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentNode, chooseResponse, handleTriggerEmergency, currentSession, goBack]);

  if (!currentSession) return null;

  const isInterrupted = currentSession.navigationStack.length > 0;
  const canGoBack = currentSession.history.length > 1;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#090D14] text-slate-100">
      {/* 1. Header (Top bar) */}
      <CallHeader
        leadName={currentSession.leadName}
        temperature={currentSession.temperature}
        durationSeconds={currentSession.durationSeconds}
        stage={currentNode.stage}
        operatorName={currentSession.operatorName}
        onGoBack={goBack}
        canGoBack={canGoBack}
        isInterrupted={isInterrupted}
        onReturnFromInterruption={returnFromInterruption}
        onOpenFinishModal={() => setShowFinishModal(true)}
      />

      {/* 2. Main Body: Center Stage + Side Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* CENTER VIEWPORT (The Copilot) */}
        <main className="flex-1 flex flex-col justify-between overflow-y-auto px-6 py-6 sm:py-8">
          <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
            {/* DOMINANT CENTER SPEECH */}
            <CallMainSpeech
              node={currentNode}
              context={currentSession.variables}
            />

            {/* RESPONSE BUTTONS */}
            <CallResponseButtons
              node={currentNode}
              allNodes={activeVersion.nodes}
              onSelectResponse={chooseResponse}
              onCustomResponseJump={(targetId) => jumpToNode(targetId, false, 'Outra Resposta')}
            />
          </div>
        </main>

        {/* 3. LATERAL DOCKED PANEL */}
        <CallSidePanel
          session={currentSession}
          plans={activeVersion.plans}
          proofs={activeVersion.proofs}
          onTriggerEmergency={handleTriggerEmergency}
          onGoBack={goBack}
          canGoBack={canGoBack}
          onUpdateNote={setNotes}
        />
      </div>

      {/* Modals */}
      {showFinishModal && (
        <FinishCallModal
          plans={activeVersion.plans}
          recommendedPlanName={currentSession.variables.recommended_plan}
          onConfirmFinish={(outcome) => {
            finishCall(outcome);
            setShowFinishModal(false);
          }}
          onClose={() => setShowFinishModal(false)}
        />
      )}

      {showObjectionModal && (
        <ObjectionPickerModal
          onSelectObjectionNode={(nodeId, label) => {
            jumpToNode(nodeId, true, `Objeção: ${label}`);
          }}
          onClose={() => setShowObjectionModal(false)}
        />
      )}

      {showQuickAnswersModal && (
        <QuickAnswersModal
          answers={activeVersion.quickAnswers}
          onSelectAndReturn={() => {
            setShowQuickAnswersModal(false);
          }}
          onClose={() => setShowQuickAnswersModal(false)}
        />
      )}
    </div>
  );
};
