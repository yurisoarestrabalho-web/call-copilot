import { Plan } from '../types/script';

export interface DynamicScriptContext {
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
}

export function formatPainForSpeech(pain?: string): string {
  if (!pain) return 'tem dúvidas sobre por onde começar com segurança';
  const mapping: Record<string, string> = {
    'insecurity': 'tem receio de errar por falta de um caminho validado',
    'lack_of_support': 'teve que tomar decisões sozinho sem uma estrutura de acompanhamento',
    'lack_of_consistency': 'não consegue manter consistência nas operações e resultados',
    'lack_of_time': 'tem a rotina corrida e pouco tempo para ficar acompanhando mercado',
    'fear_of_losing': 'tem receio de perder dinheiro por não dominar o método',
    'lack_of_strategy': 'sente falta de uma metodologia clara e objetiva para operar',
    'emotional': 'acaba se deixando levar pela emoção na hora de tomar decisões',
    'beginner_lost': 'ainda não sabe exatamente qual o melhor primeiro passo',
  };
  return mapping[pain] || pain;
}

export function formatGoalForSpeech(goal?: string): string {
  if (!goal) return 'aprender a investir com segurança e método';
  const mapping: Record<string, string> = {
    'make_money_grow': 'fazer seu capital render com metodologia profissional',
    'build_wealth': 'construir patrimônio sólido no médio e longo prazo',
    'extra_income': 'gerar uma fonte de renda e aprender a operar com método',
    'learn_and_invest': 'aprender na prática com quem já está no mercado',
    'invest_abroad': 'ter acesso a investimentos internacionais em moeda forte',
    'confidence': 'ganhar confiança e parar de depender da sorte',
    'consistency': 'alcançar consistência e controle de risco',
  };
  return mapping[goal] || goal;
}

export function formatSituationForSpeech(context: DynamicScriptContext): string {
  if (context.previous_loss) {
    return 'já tentou investir anteriormente e teve uma experiência ruim operando sem suporte';
  }
  if (context.experience === 'beginner' || context.current_investor === false) {
    return 'está dando os primeiros passos e quer começar do jeito certo';
  }
  if (context.experience === 'intermediate' || context.current_investor === true) {
    return 'já realiza investimentos, mas sente que precisa de um método mais consistente';
  }
  return 'está buscando evoluir seus resultados no mercado financeiro';
}

export function formatMainBenefitForSpeech(context: DynamicScriptContext): string {
  if (context.previous_loss || context.pain === 'lack_of_support') {
    return 'o acompanhamento ao vivo e direto com nossos analistas';
  }
  if (context.pain === 'lack_of_time') {
    return 'a estrutura direta de encontros práticos e resumos executivos';
  }
  if (context.pain === 'lack_of_consistency' || context.pain === 'lack_of_strategy') {
    return 'a metodologia validada de gestão de risco e estratégias claras';
  }
  return 'o direcionamento passo a passo com suporte contínuo';
}

export function formatBenefitConnectionForSpeech(context: DynamicScriptContext): string {
  if (context.previous_loss || context.pain === 'lack_of_support') {
    return 'você nunca mais precisará tomar decisões sozinho no escuro';
  }
  if (context.pain === 'lack_of_time') {
    return 'você foca exatamente nas decisões que importam sem perder horas estudando teoria desnecessária';
  }
  if (context.pain === 'lack_of_consistency') {
    return 'você passa a ter regras de entrada, saída e proteção de capital blindadas';
  }
  return 'elimina a insegurança de não saber se está fazendo o movimento correto';
}

/**
 * Replace placeholders like {{nome}}, {{operador}}, {{dor}}, {{objetivo}}, {{plano}}, etc.
 */
export function renderTemplate(template: string, context: DynamicScriptContext, activePlan?: Plan): string {
  if (!template) return '';

  const leadName = context.lead_name || 'Amigo';
  const operatorName = context.operador || 'da equipe';
  const painText = formatPainForSpeech(context.pain || context.secondary_pain);
  const goalText = formatGoalForSpeech(context.goal);
  const situationText = formatSituationForSpeech(context);
  const benefitText = formatMainBenefitForSpeech(context);
  const connectionText = formatBenefitConnectionForSpeech(context);

  const planName = activePlan?.name || context.recommended_plan || 'PERFORMANCE';
  const planPrice = activePlan?.price || context.recommended_plan_price || 'USD 250';
  const planMeetings = activePlan?.meetings || '3 a 4 encontros por semana';
  
  const reasons = context.recommended_reasons && context.recommended_reasons.length >= 2
    ? context.recommended_reasons
    : ['quer acompanhamento frequente', 'precisa de segurança para não operar sozinho'];
  
  const motivo1 = reasons[0] || 'você busca acompanhamento próximo';
  const motivo2 = reasons[1] || 'precisa de segurança e consistência';

  let rendered = template;

  const replacements: Record<string, string> = {
    '{{nome}}': leadName,
    '{{lead_name}}': leadName,
    '{{operador}}': operatorName,
    '{{operator}}': operatorName,
    '{{dor}}': painText,
    '{{pain}}': painText,
    '{{objetivo}}': goalText,
    '{{goal}}': goalText,
    '{{situação}}': situationText,
    '{{situacao}}': situationText,
    '{{beneficio_principal}}': benefitText,
    '{{beneficio}}': benefitText,
    '{{benefícios_relevantes}}': `${planMeetings}, acesso à estrutura e acompanhamento direto da equipe`,
    '{{conexão}}': connectionText,
    '{{conexao}}': connectionText,
    '{{plano}}': planName,
    '{{preco}}': planPrice,
    '{{preço}}': planPrice,
    '{{motivo_1}}': motivo1,
    '{{motivo_2}}': motivo2,
    '{{experiencia}}': context.experience === 'beginner' ? 'iniciante' : 'já investe',
    '{{objecao}}': context.main_objection || 'custo benefício',
  };

  for (const [key, value] of Object.entries(replacements)) {
    // Global replacement for case sensitive & regex escaping
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    rendered = rendered.replace(regex, value);
  }

  return rendered;
}
