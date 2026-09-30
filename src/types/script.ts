export type ScriptStage = 
  | 'ABERTURA'
  | 'DIAGNÓSTICO'
  | 'DOR'
  | 'IMPLICAÇÃO'
  | 'OBJETIVO'
  | 'ACOMPANHAMENTO'
  | 'TRANSIÇÃO'
  | 'APRESENTAÇÃO'
  | 'RECOMENDAÇÃO'
  | 'PREÇO'
  | 'OBJEÇÕES'
  | 'FECHAMENTO'
  | 'EMERGÊNCIA';

export interface ScriptResponse {
  id: string;
  label: string;
  variablesToSave?: Record<string, any>;
  nextNodeId: string;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'objection' | 'action';
  keyShortcut?: string;
}

export interface ScriptNode {
  id: string;
  stage: ScriptStage;
  title: string;
  exactOperatorScript: string;
  shortScript?: string;
  alternativeScript?: string;
  objective: string;
  tone: string;
  instruction?: string; // Internal instruction like "[PARE DE FALAR E ESPERE]"
  responses: ScriptResponse[];
  tags?: string[];
  isActive?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  billing: string;
  meetings: string;
  description: string;
  features: string[];
  reasons: string[];
  targetProfile: string;
  paymentInstructions?: string;
}

export interface CommercialProof {
  id: string;
  title: string;
  statOrFact: string;
  category: 'sucesso' | 'rentabilidade' | 'clientes' | 'satisfacao' | 'garantia' | 'metodologia';
  disclaimer: string;
  speechText: string;
}

export interface QuickAnswer {
  id: string;
  category: 'Empresa' | 'Investimentos' | 'Plano' | 'Preço' | 'CopyTrade' | 'Corretora' | 'Resultado' | 'Risco' | 'Garantia' | 'Outra';
  questionSnippet: string;
  exactAnswerScript: string;
  tone: string;
  instruction?: string;
}

export interface CallHistoryStep {
  nodeId: string;
  nodeTitle: string;
  stage: ScriptStage;
  timestamp: number;
  chosenResponseLabel?: string;
  speechSnippet: string;
}

export interface CallSession {
  id: string;
  leadName: string;
  operatorName: string;
  temperature: 'frio' | 'morno' | 'quente';
  startedAt: number;
  durationSeconds: number;
  currentNodeId: string;
  history: CallHistoryStep[];
  navigationStack: string[]; // For returning from interruptions
  interruptionReason?: string;
  variables: {
    lead_name?: string;
    operador?: string;
    temperature?: string;
    experience?: string;
    current_investor?: boolean | string;
    pain?: string;
    secondary_pain?: string;
    pain_deep?: string;
    goal?: string;
    international_interest?: boolean | string;
    support_need?: string;
    price_sensitivity?: string;
    trust_level?: string;
    main_objection?: string;
    recommended_plan?: string;
    recommended_plan_price?: string;
    recommended_reasons?: string[];
    buying_intent?: string;
    previous_loss?: boolean | string;
    loss_cause?: string;
    asset_types?: string;
    [key: string]: any;
  };
  status: 'active' | 'completed' | 'paused';
  notes?: string;
  outcome?: {
    result: 'vendeu' | 'follow_up' | 'nao_vendeu' | 'sem_interesse';
    planId?: string;
    planName?: string;
    value?: string;
    notes?: string;
    followUpDate?: string;
    lossReason?: string;
  };
}

export interface ScriptVersion {
  id: string;
  versionName: string;
  versionNumber: number;
  updatedAt: string;
  isPublished: boolean;
  nodes: Record<string, ScriptNode>;
  initialNodeId: string;
  plans: Plan[];
  proofs: CommercialProof[];
  quickAnswers: QuickAnswer[];
}
