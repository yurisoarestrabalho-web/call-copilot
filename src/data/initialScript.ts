import { ScriptNode, ScriptVersion } from '../types/script';
import { openingNodes } from './nodes/openingNodes';
import { diagnosisNodes } from './nodes/diagnosisNodes';
import { painAndGoalNodes } from './nodes/painAndGoalNodes';
import { presentationAndPriceNodes } from './nodes/presentationAndPriceNodes';
import { objectionNodes } from './nodes/objectionNodes';
import { closingAndEmergencyNodes } from './nodes/closingAndEmergencyNodes';
import { DEFAULT_PLANS } from '../utils/planRecommender';
import { DEFAULT_PROOFS, DEFAULT_QUICK_ANSWERS } from './proofsAndAnswers';

export const ALL_INITIAL_NODES: Record<string, ScriptNode> = {
  ...openingNodes,
  ...diagnosisNodes,
  ...painAndGoalNodes,
  ...presentationAndPriceNodes,
  ...objectionNodes,
  ...closingAndEmergencyNodes
};

export const INITIAL_SCRIPT_VERSION: ScriptVersion = {
  id: 'v1-oficial',
  versionName: 'Script Atlas Academy v1.0 (Produção)',
  versionNumber: 1,
  updatedAt: new Date().toISOString(),
  isPublished: true,
  nodes: ALL_INITIAL_NODES,
  initialNodeId: 'node-abertura-principal',
  plans: DEFAULT_PLANS,
  proofs: DEFAULT_PROOFS,
  quickAnswers: DEFAULT_QUICK_ANSWERS
};
