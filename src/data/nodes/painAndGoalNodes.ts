import { ScriptNode } from '../../types/script';

export const painAndGoalNodes: Record<string, ScriptNode> = {
  // ETAPA 03 — DOR
  'node-dor-principal': {
    id: 'node-dor-principal',
    stage: 'DOR',
    title: 'Dor 01 — Maior Dificuldade Atual',
    exactOperatorScript: 'E hoje, qual é a maior dificuldade que você gostaria de resolver em relação aos seus investimentos?',
    shortScript: 'Qual a sua maior dificuldade hoje com investimentos?',
    objective: 'Fazer o lead identificar e verbalizar sua dor central.',
    tone: 'Curioso, empático e atento.',
    instruction: 'NUNCA ACEITE UMA RESPOSTA SUPERFICIAL SEM APROFUNDAR.',
    responses: [
      { id: 'dp-1', label: 'Não sei por onde começar', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'beginner_lost' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dp-2', label: 'Tenho medo de perder', nextNodeId: 'node-dor-medo-aprofundamento', variablesToSave: { pain: 'fear_of_losing' }, sentiment: 'objection', keyShortcut: '2' },
      { id: 'dp-3', label: 'Não consigo ter consistência', nextNodeId: 'node-dor-consistencia-aprofundamento', variablesToSave: { pain: 'lack_of_consistency' }, sentiment: 'neutral', keyShortcut: '3' },
      { id: 'dp-4', label: 'Não tenho conhecimento / estratégia', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'lack_of_strategy' }, sentiment: 'neutral', keyShortcut: '4' },
      { id: 'dp-5', label: 'Opero emocionalmente', nextNodeId: 'node-dor-consistencia-aprofundamento', variablesToSave: { pain: 'emotional' }, sentiment: 'neutral', keyShortcut: '5' },
      { id: 'dp-6', label: 'Não tenho tempo', nextNodeId: 'node-dor-tempo-aprofundamento', variablesToSave: { pain: 'lack_of_time' }, sentiment: 'neutral', keyShortcut: '6' },
      { id: 'dp-7', label: 'Quero acompanhamento próximo', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'lack_of_support', support_need: 'high' }, sentiment: 'positive', keyShortcut: '7' },
      { id: 'dp-8', label: 'Quero investir fora / diversificar', nextNodeId: 'node-implicacao', variablesToSave: { goal: 'invest_abroad', international_interest: true }, sentiment: 'positive', keyShortcut: '8' },
      { id: 'dp-9', label: 'Outra dificuldade', nextNodeId: 'node-implicacao', sentiment: 'neutral', keyShortcut: '9' }
    ]
  },

  // APROFUNDAMENTOS DE DOR
  'node-dor-medo-aprofundamento': {
    id: 'node-dor-medo-aprofundamento',
    stage: 'DOR',
    title: 'Aprofundamento — Medo de Perder',
    exactOperatorScript: 'Faz sentido. Esse medo vem mais de você ainda não conhecer bem o mercado ou de alguma experiência ruim que já teve?',
    objective: 'Descobrir se o medo é por falta de conhecimento técnico ou por trauma prévio.',
    tone: 'Empático. Diminua a velocidade da fala.',
    responses: [
      { id: 'dma-1', label: 'Falta de conhecimento', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'lack_of_knowledge', fear_root: 'ignorance' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dma-2', label: 'Experiência ruim passada', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'lack_of_support', previous_loss: true, fear_root: 'trauma' }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'dma-3', label: 'Os dois', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'fear_of_losing', previous_loss: true }, sentiment: 'neutral', keyShortcut: '3' },
      { id: 'dma-4', label: 'Outro motivo', nextNodeId: 'node-implicacao', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  'node-dor-tempo-aprofundamento': {
    id: 'node-dor-tempo-aprofundamento',
    stage: 'DOR',
    title: 'Aprofundamento — Falta de Tempo',
    exactOperatorScript: 'Quando você fala em falta de tempo, o problema é não conseguir estudar, não conseguir acompanhar o mercado durante o dia ou os dois?',
    objective: 'Identificar a restrição de rotina para ofertar encontros gravados e resumos executivos.',
    tone: 'Curioso e objetivo.',
    responses: [
      { id: 'dta-1', label: 'Não consigo estudar', nextNodeId: 'node-implicacao', variablesToSave: { time_barrier: 'study' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dta-2', label: 'Não consigo acompanhar mercado', nextNodeId: 'node-implicacao', variablesToSave: { time_barrier: 'market' }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'dta-3', label: 'Os dois', nextNodeId: 'node-implicacao', variablesToSave: { time_barrier: 'both' }, sentiment: 'neutral', keyShortcut: '3' }
    ]
  },

  'node-dor-consistencia-aprofundamento': {
    id: 'node-dor-consistencia-aprofundamento',
    stage: 'DOR',
    title: 'Aprofundamento — Falta de Consistência',
    exactOperatorScript: 'E quando você fala em falta de consistência, acontece mais porque você muda muito de estratégia, toma decisões emocionais ou porque sente que falta uma metodologia clara?',
    objective: 'Fazer o lead admitir a causa técnica/emocional da oscilação de resultados.',
    tone: 'Sério, analítico e compreensivo.',
    responses: [
      { id: 'dca-1', label: 'Mudo muito de estratégia', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'lack_of_strategy' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'dca-2', label: 'Decisões emocionais', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'emotional' }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'dca-3', label: 'Falta método claro', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'lack_of_strategy' }, sentiment: 'neutral', keyShortcut: '3' },
      { id: 'dca-4', label: 'Todos esses juntos', nextNodeId: 'node-implicacao', variablesToSave: { pain: 'lack_of_consistency', support_need: 'high' }, sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  // ETAPA 04 — IMPLICAÇÃO
  'node-implicacao': {
    id: 'node-implicacao',
    stage: 'IMPLICAÇÃO',
    title: 'Implicação — Consequência de não agir',
    exactOperatorScript: 'E se nada mudar e você continuar exatamente do jeito que está hoje pelos próximos seis ou doze meses, o que você acha que acontece?',
    shortScript: 'E se você continuar como está pelos próximos 6 ou 12 meses, o que acontece?',
    objective: 'Fazer o lead verbalizar a dor da inércia e o custo de não tomar uma decisão.',
    tone: 'Ponderado, pausado. Deixe o silêncio agir.',
    instruction: 'NÃO PRESSIONE. Deixe o lead sentir e verbalizar a consequência real.',
    responses: [
      { id: 'imp-1', label: 'Continuo parado', nextNodeId: 'node-objetivo', variablesToSave: { implication: 'stuck' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'imp-2', label: 'Continuo perdendo oportunidades', nextNodeId: 'node-objetivo', variablesToSave: { implication: 'missed_opps' }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'imp-3', label: 'Posso continuar perdendo dinheiro', nextNodeId: 'node-objetivo', variablesToSave: { implication: 'loss_risk', previous_loss: true }, sentiment: 'objection', keyShortcut: '3' },
      { id: 'imp-4', label: 'Meu dinheiro continua parado desvalorizando', nextNodeId: 'node-objetivo', variablesToSave: { implication: 'inflation' }, sentiment: 'neutral', keyShortcut: '4' },
      { id: 'imp-5', label: 'Não sei / Não me incomoda tanto', nextNodeId: 'node-objetivo', sentiment: 'neutral', keyShortcut: '5' }
    ]
  },

  // ETAPA 05 — OBJETIVO
  'node-objetivo': {
    id: 'node-objetivo',
    stage: 'OBJETIVO',
    title: 'Objetivo — Cenário Ideal',
    exactOperatorScript: 'E se a gente inverter isso: qual seria o cenário ideal para você?',
    shortScript: 'E invertendo isso: qual seria o seu cenário ideal?',
    objective: 'Fazer o lead projetar a visão de sucesso desejada.',
    tone: 'Inspirador, curioso e focado.',
    responses: [
      { id: 'obj-1', label: 'Aprender a investir com segurança', nextNodeId: 'node-objetivo-timing', variablesToSave: { goal: 'learn_and_invest' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'obj-2', label: 'Operar com mais segurança / confiança', nextNodeId: 'node-objetivo-timing', variablesToSave: { goal: 'confidence' }, sentiment: 'positive', keyShortcut: '2' },
      { id: 'obj-3', label: 'Ter acompanhamento de perto', nextNodeId: 'node-objetivo-timing', variablesToSave: { goal: 'learn_and_invest', support_need: 'high' }, sentiment: 'positive', keyShortcut: '3' },
      { id: 'obj-4', label: 'Investir no exterior e dolarizar', nextNodeId: 'node-objetivo-timing', variablesToSave: { goal: 'invest_abroad', international_interest: true }, sentiment: 'positive', keyShortcut: '4' },
      { id: 'obj-5', label: 'Construir patrimônio consistente', nextNodeId: 'node-objetivo-timing', variablesToSave: { goal: 'build_wealth' }, sentiment: 'positive', keyShortcut: '5' },
      { id: 'obj-6', label: 'Buscar melhores resultados / renda', nextNodeId: 'node-objetivo-timing', variablesToSave: { goal: 'make_money_grow' }, sentiment: 'positive', keyShortcut: '6' },
      { id: 'obj-7', label: 'Ter método e estratégia claros', nextNodeId: 'node-objetivo-timing', variablesToSave: { goal: 'consistency' }, sentiment: 'positive', keyShortcut: '7' }
    ]
  },

  'node-objetivo-timing': {
    id: 'node-objetivo-timing',
    stage: 'OBJETIVO',
    title: 'Objetivo — Intenção e Urgência',
    exactOperatorScript: 'E isso é algo que você realmente quer começar a resolver agora ou está mais pesquisando para talvez fazer no futuro?',
    objective: 'Medir o buying_intent (senso de urgência e prontidão para fechar).',
    tone: 'Direto, sem julgamento.',
    instruction: 'SALVAR BUYING_INTENT. Essa variável orienta o tom da oferta.',
    responses: [
      { id: 'ot-1', label: 'Quero começar agora', nextNodeId: 'node-nivel-acompanhamento', variablesToSave: { buying_intent: 'high' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'ot-2', label: 'Nas próximas semanas', nextNodeId: 'node-nivel-acompanhamento', variablesToSave: { buying_intent: 'medium' }, sentiment: 'positive', keyShortcut: '2' },
      { id: 'ot-3', label: 'Estou pesquisando', nextNodeId: 'node-nivel-acompanhamento', variablesToSave: { buying_intent: 'research' }, sentiment: 'neutral', keyShortcut: '3' },
      { id: 'ot-4', label: 'Talvez futuramente', nextNodeId: 'node-nivel-acompanhamento', variablesToSave: { buying_intent: 'low' }, sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  // ETAPA 06 — NÍVEL DE ACOMPANHAMENTO
  'node-nivel-acompanhamento': {
    id: 'node-nivel-acompanhamento',
    stage: 'ACOMPANHAMENTO',
    title: 'Qualificação — Nível de Acompanhamento',
    exactOperatorScript: 'Pelo que você está me contando, uma coisa vai fazer bastante diferença: o nível de acompanhamento que você quer. Você prefere aprender e ter orientação em alguns momentos da semana ou gostaria de um acompanhamento bem mais próximo?',
    objective: 'Ancorar o plano recomendado com base na frequência desejada de encontros.',
    tone: 'Consultivo e orientador.',
    responses: [
      { id: 'na-1', label: 'Básico (2x por semana)', nextNodeId: 'node-transicao-resumo', variablesToSave: { support_need: 'basic', recommended_plan: 'ESSENCIAL', recommended_plan_price: 'USD 100' }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'na-2', label: 'Algumas vezes por semana (3 a 4x)', nextNodeId: 'node-transicao-resumo', variablesToSave: { support_need: 'frequent', recommended_plan: 'PERFORMANCE', recommended_plan_price: 'USD 250' }, sentiment: 'positive', keyShortcut: '2' },
      { id: 'na-3', label: 'Quero acompanhamento frequente', nextNodeId: 'node-transicao-resumo', variablesToSave: { support_need: 'frequent', recommended_plan: 'PERFORMANCE', recommended_plan_price: 'USD 250' }, sentiment: 'positive', keyShortcut: '3' },
      { id: 'na-4', label: 'Quero o máximo de acompanhamento (diário)', nextNodeId: 'node-transicao-resumo', variablesToSave: { support_need: 'daily', recommended_plan: 'EXPANSÃO', recommended_plan_price: 'USD 1.000' }, sentiment: 'positive', keyShortcut: '4' },
      { id: 'na-5', label: 'Não sei ainda', nextNodeId: 'node-transicao-resumo', variablesToSave: { support_need: 'frequent', recommended_plan: 'PERFORMANCE', recommended_plan_price: 'USD 250' }, sentiment: 'neutral', keyShortcut: '5' }
    ]
  },

  // ETAPA 07 — TRANSIÇÃO PARA OFERTA
  'node-transicao-resumo': {
    id: 'node-transicao-resumo',
    stage: 'TRANSIÇÃO',
    title: 'Transição — Resumo Natural e Conexão',
    exactOperatorScript: 'Perfeito. Então deixa eu ver se eu entendi direito. Hoje você {{situação}}, sua maior dificuldade é {{dor}}, e o que você está buscando é {{objetivo}}. É isso mesmo?',
    shortScript: 'Hoje você {{situação}}, sua dor é {{dor}} e quer {{objetivo}}. Correto?',
    objective: 'Validar o alinhamento com o lead e receber o primeiro "sim" antes da apresentação.',
    tone: 'Seguro, atento e alinhado.',
    instruction: 'AGUARDE O LEAD CONFIRMAR O RESUMO. Se ele quiser corrigir, ajuste na conversa.',
    responses: [
      { id: 'tr-1', label: 'Exatamente / É isso', nextNodeId: 'node-apresentacao-atlas', sentiment: 'positive', keyShortcut: '1' },
      { id: 'tr-2', label: 'Mais ou menos', nextNodeId: 'node-transicao-ajuste', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'tr-3', label: 'Quero corrigir algo', nextNodeId: 'node-transicao-ajuste', sentiment: 'neutral', keyShortcut: '3' }
    ]
  },

  'node-transicao-ajuste': {
    id: 'node-transicao-ajuste',
    stage: 'TRANSIÇÃO',
    title: 'Transição — Ajuste de Diagnóstico',
    exactOperatorScript: 'Legal, me fala exatamente o que ficou faltando ou o que você gostaria de ajustar, para eu ter certeza absoluta de que estamos na mesma página.',
    objective: 'Ajustar o entendimento com precisão.',
    tone: 'Receptivo e humilde.',
    responses: [
      { id: 'ta-1', label: 'Ajustado / Agora sim', nextNodeId: 'node-apresentacao-atlas', sentiment: 'positive', keyShortcut: '1' },
      { id: 'ta-2', label: 'Pode continuar', nextNodeId: 'node-apresentacao-atlas', sentiment: 'positive', keyShortcut: '2' }
    ]
  }
};
