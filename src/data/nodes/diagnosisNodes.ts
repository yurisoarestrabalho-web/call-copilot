import { ScriptNode } from '../../types/script';

export const diagnosisNodes: Record<string, ScriptNode> = {
  'node-diag-1': {
    id: 'node-diag-1',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico 01 — Ponto de Partida',
    exactOperatorScript: 'Para eu entender seu ponto de partida: hoje você já investe ou ainda está começando?',
    shortScript: 'Hoje você já investe ou está começando do zero?',
    objective: 'Segmentar o lead entre iniciante, investidor ativo ou quem já teve traumas passados.',
    tone: 'Curioso e acolhedor.',
    instruction: 'OUÇA A RESPOSTA COM ATENÇÃO. Não antecipe explicações técnicas.',
    responses: [
      { id: 'd1-1', label: 'Nunca investi', nextNodeId: 'node-diag-nunca-investiu', variablesToSave: { experience: 'beginner', current_investor: false }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'd1-2', label: 'Estou começando', nextNodeId: 'node-diag-nunca-investiu', variablesToSave: { experience: 'beginner', current_investor: false }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'd1-3', label: 'Já invisto', nextNodeId: 'node-diag-ja-investe', variablesToSave: { experience: 'intermediate', current_investor: true }, sentiment: 'neutral', keyShortcut: '3' },
      { id: 'd1-4', label: 'Já invisto há bastante tempo', nextNodeId: 'node-diag-ja-investe', variablesToSave: { experience: 'experienced', current_investor: true }, sentiment: 'neutral', keyShortcut: '4' },
      { id: 'd1-5', label: 'Já investi, mas parei', nextNodeId: 'node-diag-parou', variablesToSave: { experience: 'intermediate', current_investor: false }, sentiment: 'neutral', keyShortcut: '5' },
      { id: 'd1-6', label: 'Já perdi dinheiro investindo', nextNodeId: 'node-diag-perdeu-dinheiro', variablesToSave: { experience: 'intermediate', previous_loss: true }, sentiment: 'objection', keyShortcut: '6' },
      { id: 'd1-7', label: 'Outra resposta', nextNodeId: 'node-diag-nunca-investiu', sentiment: 'neutral', keyShortcut: '7' }
    ]
  },

  // CAMINHO NUNCA INVESTIU
  'node-diag-nunca-investiu': {
    id: 'node-diag-nunca-investiu',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — Motivação Inicial',
    exactOperatorScript: 'Perfeito. E o que fez você começar a olhar para investimentos justamente agora?',
    objective: 'Identificar a faísca e a motivação primária de quem nunca investiu.',
    tone: 'Curioso e tranquilo.',
    responses: [
      { id: 'dni-1', label: 'Quero fazer meu dinheiro render', nextNodeId: 'node-diag-render', variablesToSave: { goal: 'make_money_grow' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'dni-2', label: 'Quero construir patrimônio', nextNodeId: 'node-diag-patrimonio', variablesToSave: { goal: 'build_wealth' }, sentiment: 'positive', keyShortcut: '2' },
      { id: 'dni-3', label: 'Quero renda extra', nextNodeId: 'node-diag-renda-extra', variablesToSave: { goal: 'extra_income' }, sentiment: 'positive', keyShortcut: '3' },
      { id: 'dni-4', label: 'Quero aprender', nextNodeId: 'node-dor-principal', variablesToSave: { goal: 'learn_and_invest' }, sentiment: 'positive', keyShortcut: '4' },
      { id: 'dni-5', label: 'Quero investir no exterior', nextNodeId: 'node-dor-principal', variablesToSave: { goal: 'invest_abroad', international_interest: true }, sentiment: 'positive', keyShortcut: '5' },
      { id: 'dni-6', label: 'Vi anúncio / Alguém indicou', nextNodeId: 'node-diag-render', variablesToSave: { goal: 'learn_and_invest' }, sentiment: 'neutral', keyShortcut: '6' },
      { id: 'dni-7', label: 'Não sei ainda', nextNodeId: 'node-diag-render', sentiment: 'neutral', keyShortcut: '7' }
    ]
  },

  'node-diag-render': {
    id: 'node-diag-render',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — O que impede de começar',
    exactOperatorScript: 'Entendi. E hoje o que mais te impede de começar: falta de conhecimento, medo de fazer algo errado, não saber onde colocar o dinheiro ou simplesmente nunca teve alguém te orientando?',
    objective: 'Descobrir o maior bloqueio inicial do lead sem investimento prévio.',
    tone: 'Empático e interessado.',
    responses: [
      { id: 'dr-1', label: 'Falta de conhecimento', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'lack_of_knowledge', support_need: 'high' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dr-2', label: 'Medo de fazer algo errado', nextNodeId: 'node-dor-medo-aprofundamento', variablesToSave: { pain: 'fear_of_losing', support_need: 'high' }, sentiment: 'objection', keyShortcut: '2' },
      { id: 'dr-3', label: 'Não sei por onde começar', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'beginner_lost', support_need: 'high' }, sentiment: 'neutral', keyShortcut: '3' },
      { id: 'dr-4', label: 'Falta de acompanhamento', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'lack_of_support', support_need: 'high' }, sentiment: 'positive', keyShortcut: '4' },
      { id: 'dr-5', label: 'Falta de dinheiro', nextNodeId: 'node-obj-nao-tenho-dinheiro', variablesToSave: { price_sensitivity: 'high' }, sentiment: 'objection', keyShortcut: '5' },
      { id: 'dr-6', label: 'Vários desses', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'insecurity', support_need: 'high' }, sentiment: 'neutral', keyShortcut: '6' }
    ]
  },

  'node-diag-patrimonio': {
    id: 'node-diag-patrimonio',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — Construir Patrimônio',
    exactOperatorScript: 'Legal. Quando você fala em construir patrimônio, está olhando mais para longo prazo ou também gostaria de aprender a aproveitar oportunidades de mercado no caminho?',
    objective: 'Qualificar horizonte temporal e apetite a operações de mercado.',
    tone: 'Profissional e ponderado.',
    responses: [
      { id: 'dp-1', label: 'Longo prazo', nextNodeId: 'node-dor-principal', variablesToSave: { asset_horizon: 'long_term' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dp-2', label: 'Oportunidades também', nextNodeId: 'node-dor-principal', variablesToSave: { asset_horizon: 'hybrid' }, sentiment: 'positive', keyShortcut: '2' },
      { id: 'dp-3', label: 'Os dois', nextNodeId: 'node-dor-principal', variablesToSave: { asset_horizon: 'both' }, sentiment: 'positive', keyShortcut: '3' },
      { id: 'dp-4', label: 'Não sei ainda', nextNodeId: 'node-dor-principal', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  'node-diag-renda-extra': {
    id: 'node-diag-renda-extra',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — Renda Extra',
    exactOperatorScript: 'Entendi. E hoje você enxerga o mercado financeiro como algo que quer aprender seriamente ou estava procurando alguma solução mais automática?',
    objective: 'Calibrar expectativas (desmistificar ilusão de ganho 100% automático sem entendimento).',
    tone: 'Direto, sóbrio e didático.',
    responses: [
      { id: 'dre-1', label: 'Quero aprender', nextNodeId: 'node-dor-principal', variablesToSave: { support_need: 'frequent', goal: 'learn_and_invest' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'dre-2', label: 'Quero acompanhamento', nextNodeId: 'node-dor-principal', variablesToSave: { support_need: 'high', goal: 'extra_income' }, sentiment: 'positive', keyShortcut: '2' },
      { id: 'dre-3', label: 'Quero algo automático', nextNodeId: 'node-diag-automatico-alinhamento', variablesToSave: { interest_copytrade: true }, sentiment: 'neutral', keyShortcut: '3' },
      { id: 'dre-4', label: 'Não sei ainda', nextNodeId: 'node-dor-principal', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  'node-diag-automatico-alinhamento': {
    id: 'node-diag-automatico-alinhamento',
    stage: 'DIAGNÓSTICO',
    title: 'Alinhamento — Soluções e Ferramentas',
    exactOperatorScript: 'Entendo perfeitamente a busca por praticidade. A Atlas disponibiliza tecnologia e estruturas como o CopyTrade, mas nosso foco é que você nunca coloque capital sem entender as regras do jogo e a gestão de risco. Ter essa segurança faz sentido para você?',
    objective: 'Alinhar expectativas com integridade, sem prometer milagres.',
    tone: 'Firme, íntegro e acolhedor.',
    responses: [
      { id: 'aa-1', label: 'Faz total sentido', nextNodeId: 'node-dor-principal', variablesToSave: { trust_level: 'high' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'aa-2', label: 'Prefiro 100% automático', nextNodeId: 'node-dor-principal', variablesToSave: { interest_copytrade: true }, sentiment: 'neutral', keyShortcut: '2' }
    ]
  },

  // CAMINHO JÁ INVESTE
  'node-diag-ja-investe': {
    id: 'node-diag-ja-investe',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — Onde Investe Hoje',
    exactOperatorScript: 'Legal. E hoje você investe mais em quê?',
    objective: 'Descobrir classes de ativos atuais e maturidade operacional.',
    tone: 'Interessado e técnico.',
    responses: [
      { id: 'dji-1', label: 'Renda fixa', nextNodeId: 'node-diag-o-que-falta', variablesToSave: { asset_types: 'renda_fixa' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dji-2', label: 'Ações', nextNodeId: 'node-diag-o-que-falta', variablesToSave: { asset_types: 'acoes' }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'dji-3', label: 'Fundos', nextNodeId: 'node-diag-o-que-falta', variablesToSave: { asset_types: 'fundos' }, sentiment: 'neutral', keyShortcut: '3' },
      { id: 'dji-4', label: 'Criptomoedas', nextNodeId: 'node-diag-o-que-falta', variablesToSave: { asset_types: 'crypto' }, sentiment: 'neutral', keyShortcut: '4' },
      { id: 'dji-5', label: 'Forex / Moedas', nextNodeId: 'node-diag-o-que-falta', variablesToSave: { asset_types: 'forex', international_interest: true }, sentiment: 'neutral', keyShortcut: '5' },
      { id: 'dji-6', label: 'Mercado exterior', nextNodeId: 'node-diag-o-que-falta', variablesToSave: { asset_types: 'exterior', international_interest: true }, sentiment: 'positive', keyShortcut: '6' },
      { id: 'dji-7', label: 'Um pouco de tudo / Outro', nextNodeId: 'node-diag-o-que-falta', variablesToSave: { asset_types: 'diversified' }, sentiment: 'neutral', keyShortcut: '7' }
    ]
  },

  'node-diag-o-que-falta': {
    id: 'node-diag-o-que-falta',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — O que falta para evoluir',
    exactOperatorScript: 'E sendo bem sincero, o que você sente que está faltando hoje para evoluir mais?',
    objective: 'Identificar a dor técnica ou comportamental do investidor ativo.',
    tone: 'Sincero, reflexivo e direto.',
    responses: [
      { id: 'dqf-1', label: 'Conhecimento / Estratégia', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'lack_of_strategy' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dqf-2', label: 'Disciplina / Emocional', nextNodeId: 'node-dor-consistencia-aprofundamento', variablesToSave: { pain: 'emotional' }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'dqf-3', label: 'Acompanhamento', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'lack_of_support', support_need: 'high' }, sentiment: 'positive', keyShortcut: '3' },
      { id: 'dqf-4', label: 'Resultados / Consistência', nextNodeId: 'node-dor-consistencia-aprofundamento', variablesToSave: { pain: 'lack_of_consistency' }, sentiment: 'objection', keyShortcut: '4' },
      { id: 'dqf-5', label: 'Gestão de risco', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'risk_management' }, sentiment: 'neutral', keyShortcut: '5' },
      { id: 'dqf-6', label: 'Acesso ao exterior', nextNodeId: 'node-dor-principal', variablesToSave: { goal: 'invest_abroad', international_interest: true }, sentiment: 'positive', keyShortcut: '6' },
      { id: 'dqf-7', label: 'Tempo', nextNodeId: 'node-dor-tempo-aprofundamento', variablesToSave: { pain: 'lack_of_time' }, sentiment: 'neutral', keyShortcut: '7' },
      { id: 'dqf-8', label: 'Não sei explicar', nextNodeId: 'node-dor-principal', sentiment: 'neutral', keyShortcut: '8' }
    ]
  },

  // CAMINHO JÁ PERDEU DINHEIRO
  'node-diag-perdeu-dinheiro': {
    id: 'node-diag-perdeu-dinheiro',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — Experiência Prévia com Perda',
    exactOperatorScript: 'Entendi. Isso é importante. Se você não se importar de me contar, o que aconteceu naquela experiência?',
    objective: 'Investigar o trauma passado com empatia profunda. NUNCA tente vender nesse momento.',
    tone: 'Empático, acolhedor e pausado.',
    instruction: 'NÃO VENDA AQUI. Ouça e respeite a dor do lead para criar forte confiança.',
    responses: [
      { id: 'dpd-1', label: 'Operei sozinho', nextNodeId: 'node-diag-perdeu-sozinho', variablesToSave: { loss_cause: 'sozinho', previous_loss: true }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dpd-2', label: 'Segui sinais / Grupos', nextNodeId: 'node-diag-perdeu-sinais', variablesToSave: { loss_cause: 'sinais', previous_loss: true }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'dpd-3', label: 'CopyTrade de terceiros', nextNodeId: 'node-diag-perdeu-sinais', variablesToSave: { loss_cause: 'copytrade_outro', previous_loss: true }, sentiment: 'neutral', keyShortcut: '3' },
      { id: 'dpd-4', label: 'Fiz operações arriscadas', nextNodeId: 'node-diag-perdeu-sozinho', variablesToSave: { loss_cause: 'alto_risco', previous_loss: true }, sentiment: 'neutral', keyShortcut: '4' },
      { id: 'dpd-5', label: 'Não entendia o que estava fazendo', nextNodeId: 'node-diag-perdeu-sozinho', variablesToSave: { loss_cause: 'falta_conhecimento', previous_loss: true }, sentiment: 'neutral', keyShortcut: '5' },
      { id: 'dpd-6', label: 'Corretora problemática', nextNodeId: 'node-dor-principal', variablesToSave: { loss_cause: 'corretora', previous_loss: true }, sentiment: 'neutral', keyShortcut: '6' },
      { id: 'dpd-7', label: 'Prefiro não falar', nextNodeId: 'node-dor-principal', variablesToSave: { previous_loss: true }, sentiment: 'neutral', keyShortcut: '7' }
    ]
  },

  'node-diag-perdeu-sozinho': {
    id: 'node-diag-perdeu-sozinho',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — Investigação de Perda Sozinho',
    exactOperatorScript: 'Entendi. Então uma parte do problema foi você ter que tomar as decisões sem ter uma estrutura ou alguém acompanhando de perto, certo?',
    objective: 'Levar o lead a verbalizar que a falta de suporte causou a perda.',
    tone: 'Compreensivo e reflexivo.',
    responses: [
      { id: 'dps-1', label: 'Sim, exatamente', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'lack_of_support', secondary_pain: 'previous_loss', support_need: 'high' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'dps-2', label: 'Mais ou menos', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'insecurity', secondary_pain: 'previous_loss' }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'dps-3', label: 'Não, foi outro motivo', nextNodeId: 'node-dor-principal', variablesToSave: { secondary_pain: 'previous_loss' }, sentiment: 'neutral', keyShortcut: '3' }
    ]
  },

  'node-diag-perdeu-sinais': {
    id: 'node-diag-perdeu-sinais',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — Sinais e Terceiros',
    exactOperatorScript: 'Faz todo sentido sua frustração. Infelizmente muita gente vende ilusão de que basta copiar sem critério ou gestão. Quando a coisa desandou, ninguém te deu suporte nem explicou o gerenciamento de risco, não é?',
    objective: 'Diferenciar a Atlas de promessas milagrosas e grupos amadores de sinais.',
    tone: 'Íntegro, firme e solidário.',
    responses: [
      { id: 'dpsi-1', label: 'Exatamente isso', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'lack_of_support', secondary_pain: 'bad_experience_signals', trust_level: 'needs_proof' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'dpsi-2', label: 'Foi bem isso', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'lack_of_support' }, sentiment: 'positive', keyShortcut: '2' }
    ]
  },

  'node-diag-parou': {
    id: 'node-diag-parou',
    stage: 'DIAGNÓSTICO',
    title: 'Diagnóstico — Já Investiu mas Parou',
    exactOperatorScript: 'Entendi. E o que fez você parar naquela época: falta de tempo, falta de resultados ou sentiu que estava sem direcionamento?',
    objective: 'Mapear o motivo do abandono para ancorar a solução.',
    tone: 'Curioso e receptivo.',
    responses: [
      { id: 'dp-1', label: 'Falta de tempo', nextNodeId: 'node-dor-tempo-aprofundamento', variablesToSave: { pain: 'lack_of_time' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dp-2', label: 'Falta de resultados', nextNodeId: 'node-dor-consistencia-aprofundamento', variablesToSave: { pain: 'lack_of_consistency' }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'dp-3', label: 'Sem direcionamento / Sem suporte', nextNodeId: 'node-dor-principal', variablesToSave: { pain: 'lack_of_support', support_need: 'high' }, sentiment: 'positive', keyShortcut: '3' }
    ]
  }
};
