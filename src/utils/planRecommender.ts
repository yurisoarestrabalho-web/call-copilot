import { Plan } from '../types/script';
import { DynamicScriptContext } from './templateEngine';

export interface PlanRecommendationResult {
  recommendedPlan: Plan;
  reasons: [string, string];
  internalNote: string;
}

export const DEFAULT_PLANS: Plan[] = [
  {
    id: 'essencial',
    name: 'ESSENCIAL',
    price: 'USD 100',
    billing: 'Pagamento único',
    meetings: '2 encontros semanais ao vivo',
    description: 'Para quem está começando e quer orientação básica sem compromisso pesado.',
    features: [
      '2 encontros práticos por semana',
      'Acesso à comunidade de investidores',
      'Gravações de todos os encontros',
      'Material complementar de nivelamento',
      'Garantia de 7 dias Atlas Academy'
    ],
    reasons: ['Perfil mais conservador ou início com menor orçamento', 'Busca orientação essencial nos primeiros passos'],
    targetProfile: 'Iniciantes com orçamento enxuto ou que querem testar o formato com 2 encontros semanais.',
    paymentInstructions: 'Pagamento único via Cartão Internacional, Pix ou Cripto (USDT). Liberação imediata de acesso à sala dos encontros.'
  },
  {
    id: 'performance',
    name: 'PERFORMANCE',
    price: 'USD 250',
    billing: 'Pagamento único',
    meetings: '3 a 4 encontros semanais',
    description: 'O plano recomendado para a maioria: acompanhamento frequente para acelerar consistência e eliminar erros sozinho.',
    features: [
      '3 a 4 encontros semanais ao vivo com analistas',
      'Acompanhamento de mercado e setups práticos',
      'Canal de suporte e dúvidas direto com os mentores',
      'Acesso a ferramentas e estrutura de mercado da Atlas',
      'Garantia incondicional de 7 dias'
    ],
    reasons: ['Quer acompanhamento frequente (3 a 4x/semana)', 'Relatou falta de consistência ou medo de tomar decisões sozinho'],
    targetProfile: 'Investidores iniciantes ou intermediários que precisam de acompanhamento frequente para não operar sozinhos.',
    paymentInstructions: 'Pagamento único de USD 250 via Cartão de Crédito internacional (em até 12x), Pix com conversão comercial ou Cripto. Envio imediato do link de onboarding.'
  },
  {
    id: 'estrategico',
    name: 'ESTRATÉGICO',
    price: 'USD 500',
    billing: 'Pagamento único',
    meetings: '3 a 4 encontros por semana + estrutura avançada',
    description: 'Para investidores que buscam gestão profissional, ativos internacionais e suporte individualizado.',
    features: [
      '3 a 4 encontros técnicos avançados por semana',
      'Acesso à estrutura internacional completa da Atlas',
      'Análise de carteira personalizada e gestão de risco',
      'Plantão de dúvidas prioritário',
      'Garantia incondicional de 7 dias'
    ],
    reasons: ['Interesse em diversificação internacional e gestão de risco avançada', 'Busca estrutura correspondente mais robusta'],
    targetProfile: 'Investidores com capital moderado que buscam estrutura avançada e diversificação no exterior.',
    paymentInstructions: 'Pagamento único de USD 500. Link seguro enviado via WhatsApp ou e-mail, suporte dedicado ao faturamento.'
  },
  {
    id: 'expansao',
    name: 'EXPANSÃO',
    price: 'USD 1.000',
    billing: 'Pagamento único',
    meetings: 'Acompanhamento intensivo e encontros diários',
    description: 'Acompanhamento máximo de alto nível: encontros diários e canal direto com a liderança técnica da Atlas.',
    features: [
      'Encontros diários ao vivo de acompanhamento e mercado',
      'Canal VIP direto com a diretoria técnica',
      'Mentoria individual de alinhamento e plano de voo',
      'Acesso vitalício aos materiais da turma',
      'Garantia incondicional de 7 dias'
    ],
    reasons: ['Exigência de acompanhamento intensivo e contato diário', 'Perfil executivo com foco em aceleração máxima'],
    targetProfile: 'Grandes investidores e empresários que desejam o suporte diário mais exclusivo e intensivo.',
    paymentInstructions: 'Pagamento único de USD 1.000. Onboarding concierge direto com gestor de contas.'
  }
];

export function calculateRecommendedPlan(context: DynamicScriptContext, plans: Plan[] = DEFAULT_PLANS): PlanRecommendationResult {
  // If explicitly wants basic or low budget
  if (context.support_need === 'basic' || context.price_sensitivity === 'high' || context.support_need === 'low') {
    const plan = plans.find(p => p.id === 'essencial') || plans[0];
    return {
      recommendedPlan: plan,
      reasons: ['Prefere começar com estrutura essencial de 2 encontros semanais', 'Quer testar a metodologia com investimento inicial menor'],
      internalNote: 'Lead demonstrou sensibilidade a preço ou preferência por 2 encontros semanais.'
    };
  }

  // If wants daily / maximum support
  if (context.support_need === 'daily' || context.support_need === 'maximum' || context.support_need === 'maximo') {
    const plan = plans.find(p => p.id === 'expansao') || plans[3] || plans[0];
    return {
      recommendedPlan: plan,
      reasons: ['Solicitou o nível máximo de acompanhamento intensivo', 'Quer encontros diários para tomada de decisão'],
      internalNote: 'Lead solicitou explicitamente máxima proximidade e rotina diária.'
    };
  }

  // If international interest + advanced / higher capital
  if (context.international_interest && (context.experience === 'experienced' || context.experience === 'intermediate')) {
    const plan = plans.find(p => p.id === 'estrategico') || plans[2] || plans[0];
    return {
      recommendedPlan: plan,
      reasons: ['Interesse específico em mercados internacionais e diversificação', 'Já opera e precisa de estrutura técnica avançada'],
      internalNote: 'Lead tem experiência prévia e foco em ativos externos.'
    };
  }

  // Default: PERFORMANCE (USD 250) - Atlas flagship
  const performancePlan = plans.find(p => p.id === 'performance') || plans[1] || plans[0];
  
  let reason1 = 'Quer acompanhamento frequente (3 a 4 encontros semanais)';
  let reason2 = 'Evita tomar decisões sozinho e constrói consistência com apoio da equipe';

  if (context.previous_loss) {
    reason1 = 'Já teve prejuízo operando sozinho no passado';
    reason2 = 'A estrutura de 3 a 4 encontros semanais garante que você nunca mais ficará sem orientação';
  } else if (context.pain === 'lack_of_consistency') {
    reason1 = 'Busca consistência e regras claras de operação';
    reason2 = 'Os 3 a 4 encontros por semana corrigem os erros de execução em tempo real';
  } else if (context.pain === 'lack_of_time') {
    reason1 = 'Rotina dinâmica com encontros gravados e resumos executivos';
    reason2 = 'Acompanhamento frequente sem exigir que você estude dezenas de horas por conta própria';
  }

  return {
    recommendedPlan: performancePlan,
    reasons: [reason1, reason2],
    internalNote: 'Plano padrão com maior índice de aderência e satisfação para esse perfil.'
  };
}
