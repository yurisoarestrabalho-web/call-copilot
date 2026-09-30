import { ScriptNode } from '../../types/script';

export const closingAndEmergencyNodes: Record<string, ScriptNode> = {
  // FECHAMENTO
  'node-fechamento-passos': {
    id: 'node-fechamento-passos',
    stage: 'FECHAMENTO',
    title: 'Fechamento — Próximos Passos',
    exactOperatorScript: 'Então perfeito. Vamos fazer assim: eu vou te orientar agora no próximo passo para você entrar no {{plano}} e já deixar seu acesso encaminhado.',
    shortScript: 'Perfeito! Vou te passar o link seguro para garantir seu acesso ao {{plano}} agora.',
    objective: 'Conduzir o lead com firmeza e naturalidade para a efetivação do pagamento.',
    tone: 'Entusiasmado, claro, diretivo e acolhedor.',
    instruction: 'NÃO VOLTE A VENDER. Apenas guie o pagamento e a liberação de acesso.',
    responses: [
      { id: 'fp-1', label: 'Pode seguir / Como pago?', nextNodeId: 'node-fechamento-como-paga', sentiment: 'positive', keyShortcut: '1' },
      { id: 'fp-2', label: 'Espera, surgiu uma dúvida', nextNodeId: 'node-emergencia-pergunta', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'fp-3', label: 'Me manda o link no WhatsApp', nextNodeId: 'node-fechamento-como-paga', sentiment: 'positive', keyShortcut: '3' },
      { id: 'fp-4', label: 'Nova objeção de preço', nextNodeId: 'node-obj-esta-caro', sentiment: 'objection', keyShortcut: '4' }
    ]
  },

  'node-fechamento-como-paga': {
    id: 'node-fechamento-como-paga',
    stage: 'FECHAMENTO',
    title: 'Fechamento — Instruções de Pagamento',
    exactOperatorScript: 'O pagamento do {{plano}} é de {{preco}} em pagamento único. Você pode realizar via Cartão de Crédito internacional em até 12x, Pix com cotação comercial ou Cripto (USDT). Eu já vou gerar seu link seguro e te enviar agora mesmo. Você prefere receber por WhatsApp ou e-mail?',
    shortScript: 'Investimento de {{preco}} via Cartão, Pix ou Cripto. Envio seu link por WhatsApp ou e-mail?',
    objective: 'Confirmar o método de pagamento preferido e enviar o link de checkout.',
    tone: 'Prático e prestativo.',
    instruction: 'COLE OU ENVIE O LINK DE PAGAMENTO DA EMPRESA. Aguarde a confirmação de recebimento.',
    responses: [
      { id: 'fcp-1', label: 'Vou pagar agora no Pix', nextNodeId: 'node-fechamento-concluido', variablesToSave: { payment_method: 'pix' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'fcp-2', label: 'Vou passar o Cartão', nextNodeId: 'node-fechamento-concluido', variablesToSave: { payment_method: 'cartao' }, sentiment: 'positive', keyShortcut: '2' },
      { id: 'fcp-3', label: 'Vou pagar em Cripto / USDT', nextNodeId: 'node-fechamento-concluido', variablesToSave: { payment_method: 'cripto' }, sentiment: 'positive', keyShortcut: '3' },
      { id: 'fcp-4', label: 'Vou pagar mais tarde hoje', nextNodeId: 'node-follow-up-agendado', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  'node-fechamento-concluido': {
    id: 'node-fechamento-concluido',
    stage: 'FECHAMENTO',
    title: 'Fechamento — Venda Realizada e Boas-Vindas',
    exactOperatorScript: 'Excelente, {{nome}}! Seja muito bem-vindo à Atlas Academy. Seu acesso à área de membros e à sala dos encontros ao vivo já está liberado. Nossa equipe de suporte já vai fazer contato de boas-vindas com você. Parabéns pela decisão!',
    shortScript: 'Seja muito bem-vindo à Atlas, {{nome}}! Acesso liberado e nos vemos no próximo encontro ao vivo!',
    objective: 'Dar as boas-vindas calorosas e consolidar a relação com o novo membro.',
    tone: 'Caloroso, profissional e congratulatório.',
    instruction: 'FINALIZAR A CALL NO BOTÃO "FINALIZAR CALL" E SELECIONAR STATUS "VENDEU".',
    responses: [
      { id: 'fco-1', label: 'Obrigado! / Finalizar Call', nextNodeId: 'node-fechamento-concluido', sentiment: 'positive', keyShortcut: '1' }
    ]
  },

  // LEAD QUER FECHAR ANTES DO FIM (Botão fixo "QUER FECHAR")
  'node-emergencia-quer-fechar': {
    id: 'node-emergencia-quer-fechar',
    stage: 'FECHAMENTO',
    title: 'Atalho — Lead Quer Fechar Agora',
    exactOperatorScript: 'Perfeito. Então eu não vou complicar uma decisão que já está clara para você. Só vou confirmar os dados do plano e te orientar no próximo passo para liberar seu acesso.',
    shortScript: 'Perfeito! Vamos direto ao que interessa para liberar seu acesso ao {{plano}}.',
    objective: 'Pular imediatamente etapas desnecessárias e fechar a venda sem enrolação.',
    tone: 'Direto, entusiasmado e resolutivo.',
    instruction: 'NÃO CONTINUE APRESENTANDO O PRODUTO. Vá direto para os dados de pagamento.',
    responses: [
      { id: 'eqf-1', label: 'Pode orientar o pagamento', nextNodeId: 'node-fechamento-como-paga', sentiment: 'positive', keyShortcut: '1' },
      { id: 'eqf-2', label: 'Confirmar os detalhes do {{plano}}', nextNodeId: 'node-apresentacao-preco', sentiment: 'neutral', keyShortcut: '2' }
    ]
  },

  // PREÇO NO INÍCIO DA CALL
  'node-emergencia-preco-inicial': {
    id: 'node-emergencia-preco-inicial',
    stage: 'EMERGÊNCIA',
    title: 'Emergência — Preço Perguntado no Início',
    exactOperatorScript: 'Com certeza, vou te passar todos os valores com total transparência. É que temos estruturas desde USD 100 até USD 1.000 dependendo do nível de acompanhamento. Só para eu te passar o valor do formato exato para o seu caso: hoje você já investe ou ainda está começando do zero?',
    shortScript: 'Temos formatos de USD 100 a USD 1.000. Para te passar o certo: hoje você já investe ou está começando?',
    objective: 'Responder a pergunta de preço sem perder o controle da ligação e redirecionar para o diagnóstico.',
    tone: 'Transparente, seguro e desarmado.',
    instruction: 'NUNCA ESCONDA O PREÇO NEM DIGA "DEPENDE" SEM VALORES. Dê o intervalo e retome a pergunta.',
    responses: [
      { id: 'epi-1', label: 'Nunca investi / Estou começando', nextNodeId: 'node-diag-nunca-investiu', variablesToSave: { experience: 'beginner', current_investor: false }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'epi-2', label: 'Já invisto', nextNodeId: 'node-diag-ja-investe', variablesToSave: { experience: 'intermediate', current_investor: true }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'epi-3', label: 'Já perdi dinheiro', nextNodeId: 'node-diag-perdeu-dinheiro', variablesToSave: { experience: 'intermediate', previous_loss: true }, sentiment: 'objection', keyShortcut: '3' },
      { id: 'epi-4', label: 'Retomar onde estávamos', nextNodeId: 'node-abertura-pode-falar', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  // ESTÁ COM PRESSA
  'node-emergencia-pressa': {
    id: 'node-emergencia-pressa',
    stage: 'EMERGÊNCIA',
    title: 'Emergência — Lead Está Com Pressa',
    exactOperatorScript: 'Entendido perfeitamente, serei ultrarrápido: em 60 segundos você já vai saber se faz sentido. Hoje você já investe ou está começando do zero?',
    shortScript: 'Perfeito, vou direto ao ponto em 60 segundos: hoje você já investe ou está começando?',
    objective: 'Acoplar diagnóstico reduzido em 2 perguntas rápidas para não perder o lead apressado.',
    tone: 'Ágil, dinâmico e focado.',
    responses: [
      { id: 'ep-1', label: 'Nunca investi', nextNodeId: 'node-pressa-pergunta-2', variablesToSave: { experience: 'beginner', current_investor: false }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'ep-2', label: 'Já invisto', nextNodeId: 'node-pressa-pergunta-2', variablesToSave: { experience: 'intermediate', current_investor: true }, sentiment: 'neutral', keyShortcut: '2' }
    ]
  },

  'node-pressa-pergunta-2': {
    id: 'node-pressa-pergunta-2',
    stage: 'EMERGÊNCIA',
    title: 'Pressa — Pergunta 2 Reduzida',
    exactOperatorScript: 'E o que você mais precisa hoje: aprender a metodologia ou ter analistas acompanhando suas decisões ao vivo nos encontros semanais?',
    objective: 'Qualificar a dor e ir direto para o plano recomendado.',
    tone: 'Rápido e cirúrgico.',
    responses: [
      { id: 'pp2-1', label: 'Acompanhamento ao vivo', nextNodeId: 'node-apresentacao-preco', variablesToSave: { recommended_plan: 'PERFORMANCE', recommended_plan_price: 'USD 250', support_need: 'frequent' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'pp2-2', label: 'Aprender básico', nextNodeId: 'node-apresentacao-preco', variablesToSave: { recommended_plan: 'ESSENCIAL', recommended_plan_price: 'USD 100', support_need: 'basic' }, sentiment: 'positive', keyShortcut: '2' }
    ]
  },

  // FEZ PERGUNTA
  'node-emergencia-pergunta': {
    id: 'node-emergencia-pergunta',
    stage: 'EMERGÊNCIA',
    title: 'Emergência — Lead Fez Uma Pergunta',
    exactOperatorScript: 'Excelente pergunta. Deixa eu te esclarecer isso com total precisão.',
    objective: 'Painel rápido para selecionar a resposta na biblioteca de Quick Answers.',
    tone: 'Atencioso e claro.',
    instruction: 'USE O PAINEL DE PERGUNTAS RÁPIDAS ABAIXO OU RESPONDA COM BASE NA BIBLIOTECA ATLAS.',
    responses: [
      { id: 'nep-1', label: 'Dúvida respondida — Retomar conversa', nextNodeId: 'node-transicao-resumo', sentiment: 'positive', keyShortcut: '1' },
      { id: 'nep-2', label: 'Ir para Apresentação dos Planos', nextNodeId: 'node-recomendacao-plano', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'nep-3', label: 'Ir para Valores e Pagamento', nextNodeId: 'node-apresentacao-preco', sentiment: 'positive', keyShortcut: '3' }
    ]
  },

  // NÃO ENTENDI
  'node-emergencia-nao-entendi': {
    id: 'node-emergencia-nao-entendi',
    stage: 'EMERGÊNCIA',
    title: 'Emergência — Não Entendi o Lead',
    exactOperatorScript: 'Desculpa, cortou um pedacinho da ligação. Você pode repetir a última frase?',
    shortScript: 'Perdão, cortou o áudio. Pode repetir?',
    objective: 'Pedir repetição com polidez e profissionalismo.',
    tone: 'Educado e atento.',
    responses: [
      { id: 'nen-1', label: 'Lead repetiu — Retomar', nextNodeId: 'node-diag-1', sentiment: 'neutral', keyShortcut: '1' }
    ]
  },

  // SEM INTERESSE FINAL
  'node-sem-interesse-final': {
    id: 'node-sem-interesse-final',
    stage: 'FECHAMENTO',
    title: 'Saída — Encerramento Elegante',
    exactOperatorScript: 'Sem problema algum, agradeço pelo seu tempo e atenção. Se futuramente fizer sentido para os seus investimentos, nossos canais continuam abertos. Tenha um ótimo dia!',
    shortScript: 'Perfeito, obrigado pela atenção e sucesso nos seus projetos!',
    objective: 'Encerrar com classe e elegância sem queimar pontes.',
    tone: 'Simpático, desapegado e nobre.',
    responses: [
      { id: 'sif-1', label: 'Finalizar Call', nextNodeId: 'node-sem-interesse-final', sentiment: 'neutral', keyShortcut: '1' }
    ]
  },

  // FOLLOW-UP
  'node-follow-up-agendado': {
    id: 'node-follow-up-agendado',
    stage: 'FECHAMENTO',
    title: 'Follow-Up — Agendamento de Retorno',
    exactOperatorScript: 'Combinado! Deixei anotado aqui para te chamar nesse horário. Te mando um "oi" no WhatsApp antes para confirmar. Um abraço e até lá!',
    objective: 'Formalizar o compromisso de retorno com simpatia.',
    tone: 'Confiante e organizado.',
    responses: [
      { id: 'fua-1', label: 'Finalizar e Registrar Follow-Up', nextNodeId: 'node-follow-up-agendado', sentiment: 'positive', keyShortcut: '1' }
    ]
  },

  'node-follow-up-gentil': {
    id: 'node-follow-up-gentil',
    stage: 'FECHAMENTO',
    title: 'Follow-Up — Contato via WhatsApp',
    exactOperatorScript: 'Perfeito. Vou te deixar uma mensagem no WhatsApp com o resumo do que falamos para você salvar meu contato. Fico à disposição!',
    objective: 'Finalizar cordialmente e canalizar para o WhatsApp.',
    tone: 'Educado e prestativo.',
    responses: [
      { id: 'fug-1', label: 'Finalizar Call', nextNodeId: 'node-follow-up-gentil', sentiment: 'neutral', keyShortcut: '1' }
    ]
  }
};
