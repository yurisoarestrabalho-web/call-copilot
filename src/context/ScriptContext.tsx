import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { 
  ScriptNode, 
  ScriptResponse, 
  CallSession, 
  ScriptVersion, 
  Plan, 
  CommercialProof, 
  QuickAnswer 
} from '../types/script';
import { INITIAL_SCRIPT_VERSION } from '../data/initialScript';
import { calculateRecommendedPlan } from '../utils/planRecommender';

interface ScriptContextType {
  activeVersion: ScriptVersion;
  currentSession: CallSession | null;
  savedSessionExists: boolean;
  callHistory: CallSession[];
  
  // Call actions
  startCall: (leadName: string, temperature: 'frio' | 'morno' | 'quente', operatorName?: string) => void;
  resumeLastCall: () => void;
  chooseResponse: (response: ScriptResponse) => void;
  jumpToNode: (nodeId: string, isInterruption?: boolean, reason?: string) => void;
  returnFromInterruption: () => void;
  goBack: () => void;
  updateVariables: (vars: Record<string, any>) => void;
  finishCall: (outcome: NonNullable<CallSession['outcome']>) => void;
  abandonCall: () => void;
  setNotes: (notes: string) => void;
  
  // Admin / Builder actions
  updateNode: (node: ScriptNode) => void;
  addNode: (node: ScriptNode) => void;
  deleteNode: (nodeId: string) => void;
  updatePlan: (plan: Plan) => void;
  updateProof: (proof: CommercialProof) => void;
  updateQuickAnswer: (qa: QuickAnswer) => void;
  publishNewVersion: (versionName: string) => void;
  exportScriptJson: () => string;
  importScriptJson: (json: string) => boolean;
  resetToDefaultScript: () => void;
}

const ScriptContext = createContext<ScriptContextType | null>(null);

const STORAGE_ACTIVE_VERSION = 'atlas_script_version';
const STORAGE_ACTIVE_CALL = 'atlas_active_call_session';
const STORAGE_CALL_HISTORY = 'atlas_call_history';

export const ScriptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load Script Version from localStorage or fallback to default
  const [activeVersion, setActiveVersion] = useState<ScriptVersion>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACTIVE_VERSION);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.nodes && parsed?.initialNodeId) return parsed;
      }
    } catch (e) {
      console.error('Error loading script version from storage', e);
    }
    return INITIAL_SCRIPT_VERSION;
  });

  // Call session state
  const [currentSession, setCurrentSession] = useState<CallSession | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACTIVE_CALL);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.status === 'active' && parsed?.currentNodeId) return parsed;
      }
    } catch (e) {
      console.error('Error loading active call session', e);
    }
    return null;
  });

  const [savedSessionExists, setSavedSessionExists] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACTIVE_CALL);
      return !!saved;
    } catch {
      return false;
    }
  });

  // Call history
  const [callHistory, setCallHistory] = useState<CallSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CALL_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading call history', e);
    }
    return [];
  });

  // Timer interval reference
  const timerRef = useRef<any>(null);

  // Sync session to localStorage on changes
  useEffect(() => {
    if (currentSession && currentSession.status === 'active') {
      localStorage.setItem(STORAGE_ACTIVE_CALL, JSON.stringify(currentSession));
      setSavedSessionExists(true);
    }
  }, [currentSession]);

  // Sync version to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_ACTIVE_VERSION, JSON.stringify(activeVersion));
  }, [activeVersion]);

  // Sync call history to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_CALL_HISTORY, JSON.stringify(callHistory));
  }, [callHistory]);

  // Active call stopwatch timer
  useEffect(() => {
    if (currentSession && currentSession.status === 'active') {
      timerRef.current = setInterval(() => {
        setCurrentSession(prev => {
          if (!prev || prev.status !== 'active') return prev;
          return {
            ...prev,
            durationSeconds: prev.durationSeconds + 1
          };
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSession?.status]);

  // Start Call
  const startCall = useCallback((leadName: string, temperature: 'frio' | 'morno' | 'quente', operatorName = 'Atlas Academy') => {
    const initNode = activeVersion.initialNodeId || 'node-abertura-principal';
    const initNodeObj = activeVersion.nodes[initNode];
    
    // Default recommended plan calculation
    const initialVars: Record<string, any> = {
      lead_name: leadName.trim(),
      nome: leadName.trim(),
      operador: operatorName,
      temperature,
      recommended_plan: 'PERFORMANCE',
      recommended_plan_price: 'USD 250'
    };

    const session: CallSession = {
      id: `call-${Date.now()}`,
      leadName: leadName.trim() || 'Lead',
      operatorName,
      temperature,
      startedAt: Date.now(),
      durationSeconds: 0,
      currentNodeId: initNode,
      navigationStack: [],
      variables: initialVars,
      history: [
        {
          nodeId: initNode,
          nodeTitle: initNodeObj?.title || 'Abertura',
          stage: initNodeObj?.stage || 'ABERTURA',
          timestamp: Date.now(),
          speechSnippet: initNodeObj?.exactOperatorScript || ''
        }
      ],
      status: 'active',
      notes: ''
    };

    setCurrentSession(session);
    localStorage.setItem(STORAGE_ACTIVE_CALL, JSON.stringify(session));
    setSavedSessionExists(true);
  }, [activeVersion]);

  // Resume last call
  const resumeLastCall = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACTIVE_CALL);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) {
          setCurrentSession({
            ...parsed,
            status: 'active'
          });
        }
      }
    } catch (e) {
      console.error('Failed to resume call', e);
    }
  }, []);

  // Choose a response button during call
  const chooseResponse = useCallback((response: ScriptResponse) => {
    if (!currentSession) return;

    const nextId = response.nextNodeId;
    const nextNode = activeVersion.nodes[nextId];
    if (!nextNode) {
      console.warn(`Target node not found: ${nextId}`);
      return;
    }

    // Merge any new variables
    const updatedVars = { ...currentSession.variables };
    if (response.variablesToSave) {
      Object.assign(updatedVars, response.variablesToSave);
    }

    // Recalculate plan recommendation dynamically
    const recommendation = calculateRecommendedPlan(updatedVars, activeVersion.plans);
    updatedVars.recommended_plan = recommendation.recommendedPlan.name;
    updatedVars.recommended_plan_price = recommendation.recommendedPlan.price;
    updatedVars.recommended_reasons = recommendation.reasons;

    // Append to call history
    const historyStep = {
      nodeId: nextId,
      nodeTitle: nextNode.title,
      stage: nextNode.stage,
      timestamp: Date.now(),
      chosenResponseLabel: response.label,
      speechSnippet: nextNode.exactOperatorScript
    };

    setCurrentSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentNodeId: nextId,
        variables: updatedVars,
        history: [...prev.history, historyStep]
      };
    });
  }, [currentSession, activeVersion]);

  // Jump to arbitrary node (e.g. emergency buttons, question, objection)
  const jumpToNode = useCallback((nodeId: string, isInterruption = false, reason?: string) => {
    if (!currentSession) return;
    const targetNode = activeVersion.nodes[nodeId];
    if (!targetNode) return;

    setCurrentSession(prev => {
      if (!prev) return null;
      const stack = isInterruption 
        ? [...prev.navigationStack, prev.currentNodeId] 
        : prev.navigationStack;

      return {
        ...prev,
        currentNodeId: nodeId,
        navigationStack: stack,
        interruptionReason: reason || prev.interruptionReason,
        history: [
          ...prev.history,
          {
            nodeId,
            nodeTitle: targetNode.title,
            stage: targetNode.stage,
            timestamp: Date.now(),
            chosenResponseLabel: `[Desvio: ${reason || targetNode.title}]`,
            speechSnippet: targetNode.exactOperatorScript
          }
        ]
      };
    });
  }, [currentSession, activeVersion]);

  // Return from interruption (pop stack)
  const returnFromInterruption = useCallback(() => {
    if (!currentSession || currentSession.navigationStack.length === 0) return;
    
    setCurrentSession(prev => {
      if (!prev || prev.navigationStack.length === 0) return prev;
      const newStack = [...prev.navigationStack];
      const previousNodeId = newStack.pop()!;
      const prevNode = activeVersion.nodes[previousNodeId];

      return {
        ...prev,
        currentNodeId: previousNodeId,
        navigationStack: newStack,
        interruptionReason: undefined,
        history: prevNode ? [
          ...prev.history,
          {
            nodeId: previousNodeId,
            nodeTitle: prevNode.title,
            stage: prevNode.stage,
            timestamp: Date.now(),
            chosenResponseLabel: '[Retomou conversa]',
            speechSnippet: prevNode.exactOperatorScript
          }
        ] : prev.history
      };
    });
  }, [currentSession, activeVersion]);

  // Go back one step in history
  const goBack = useCallback(() => {
    if (!currentSession || currentSession.history.length <= 1) return;

    setCurrentSession(prev => {
      if (!prev || prev.history.length <= 1) return prev;
      const newHistory = [...prev.history];
      newHistory.pop(); // remove current
      const lastStep = newHistory[newHistory.length - 1];

      return {
        ...prev,
        currentNodeId: lastStep.nodeId,
        history: newHistory
      };
    });
  }, [currentSession]);

  // Update variables directly
  const updateVariables = useCallback((vars: Record<string, any>) => {
    setCurrentSession(prev => {
      if (!prev) return null;
      const merged = { ...prev.variables, ...vars };
      const rec = calculateRecommendedPlan(merged, activeVersion.plans);
      merged.recommended_plan = rec.recommendedPlan.name;
      merged.recommended_plan_price = rec.recommendedPlan.price;
      merged.recommended_reasons = rec.reasons;
      return {
        ...prev,
        variables: merged
      };
    });
  }, [activeVersion.plans]);

  // Set notes
  const setNotes = useCallback((notes: string) => {
    setCurrentSession(prev => prev ? { ...prev, notes } : null);
  }, []);

  // Finish call
  const finishCall = useCallback((outcome: NonNullable<CallSession['outcome']>) => {
    if (!currentSession) return;
    const completedSession: CallSession = {
      ...currentSession,
      status: 'completed',
      outcome
    };

    setCallHistory(prev => [completedSession, ...prev]);
    localStorage.removeItem(STORAGE_ACTIVE_CALL);
    setSavedSessionExists(false);
    setCurrentSession(null);
  }, [currentSession]);

  // Abandon call without saving to completed history
  const abandonCall = useCallback(() => {
    localStorage.removeItem(STORAGE_ACTIVE_CALL);
    setSavedSessionExists(false);
    setCurrentSession(null);
  }, []);

  // Admin / Builder Node Operations
  const updateNode = useCallback((node: ScriptNode) => {
    setActiveVersion(prev => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      nodes: {
        ...prev.nodes,
        [node.id]: node
      }
    }));
  }, []);

  const addNode = useCallback((node: ScriptNode) => {
    setActiveVersion(prev => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      nodes: {
        ...prev.nodes,
        [node.id]: node
      }
    }));
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setActiveVersion(prev => {
      const newNodes = { ...prev.nodes };
      delete newNodes[nodeId];
      return {
        ...prev,
        updatedAt: new Date().toISOString(),
        nodes: newNodes
      };
    });
  }, []);

  const updatePlan = useCallback((plan: Plan) => {
    setActiveVersion(prev => ({
      ...prev,
      plans: prev.plans.map(p => p.id === plan.id ? plan : p)
    }));
  }, []);

  const updateProof = useCallback((proof: CommercialProof) => {
    setActiveVersion(prev => ({
      ...prev,
      proofs: prev.proofs.map(p => p.id === proof.id ? proof : p)
    }));
  }, []);

  const updateQuickAnswer = useCallback((qa: QuickAnswer) => {
    setActiveVersion(prev => ({
      ...prev,
      quickAnswers: prev.quickAnswers.map(q => q.id === qa.id ? qa : q)
    }));
  }, []);

  const publishNewVersion = useCallback((versionName: string) => {
    setActiveVersion(prev => ({
      ...prev,
      versionName,
      versionNumber: prev.versionNumber + 1,
      updatedAt: new Date().toISOString(),
      isPublished: true
    }));
  }, []);

  const exportScriptJson = useCallback(() => {
    return JSON.stringify(activeVersion, null, 2);
  }, [activeVersion]);

  const importScriptJson = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (parsed?.nodes && parsed?.initialNodeId) {
        setActiveVersion(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import script JSON', e);
      return false;
    }
  }, []);

  const resetToDefaultScript = useCallback(() => {
    setActiveVersion(INITIAL_SCRIPT_VERSION);
  }, []);

  return (
    <ScriptContext.Provider
      value={{
        activeVersion,
        currentSession,
        savedSessionExists,
        callHistory,
        startCall,
        resumeLastCall,
        chooseResponse,
        jumpToNode,
        returnFromInterruption,
        goBack,
        updateVariables,
        finishCall,
        abandonCall,
        setNotes,
        updateNode,
        addNode,
        deleteNode,
        updatePlan,
        updateProof,
        updateQuickAnswer,
        publishNewVersion,
        exportScriptJson,
        importScriptJson,
        resetToDefaultScript
      }}
    >
      {children}
    </ScriptContext.Provider>
  );
};

export const useScript = () => {
  const context = useContext(ScriptContext);
  if (!context) {
    throw new Error('useScript must be used within a ScriptProvider');
  }
  return context;
};
