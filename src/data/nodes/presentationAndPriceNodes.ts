import { ScriptNode } from '../../types/script';

export const presentationAndPriceNodes: Record<string, ScriptNode> = {
  // APRESENTAÇÃO DA ATLAS
  'node-apresentacao-atlas': {
    id: 'node-apresentacao-atlas',
    stage: 'APRESENTAÇÃO',
    title: 'Apresentação — Os 3 Pilares da Atlas',
    exactOperatorScript: 'A Atlas Academy foi estruturada justamente para unir três coisas que normalmente ficam separadas: conhecimento, acompanhamento e acesso a ferramentas e estruturas de mercado. Então, em vez de você simplesmente receber um curso e ficar sozinho depois, a ideia é que exista uma jornada de desenvolvimento acompanhada.',
    shortScript: 'A Atlas une três pilares: conhecimento prático, acompanhamento ao vivo e estrutura de mercado para você nunca operar sozinho.',
    objective: 'Apresentar a proposta de valor central da Atlas diferenciando de cursos isolados.',
    tone: 'Seguro, firme e entusiasmado.',
    instruction: 'NÃO DESPEJE DETALHES TÉCNICOS. Mantenha a clareza dos 3 pilares.',
    responses: [
      { id: 'apa-1', label: 'Entendi / Como funciona o acompanhamento?', nextNodeId: 'node-apresentacao-conexao-dor', sentiment: 'positive', keyShortcut: '1' },
      { id: 'apa-2', label: 'E o CopyTrade?', nextNodeId: 'node-apresentacao-copytrade', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'apa-3', label: 'E a corretora?', nextNodeId: 'node-apresentacao-corretora', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'apa-4', label: 'Quanto custa? (Direto ao ponto)', nextNodeId: 'node-recomendacao-plano', sentiment: 'objection', keyShortcut: '4' },
      { id: 'apa-5', label: 'Tenho uma dúvida', nextNodeId: 'node-emergencia-pergunta', sentiment: 'neutral', keyShortcut: '5' }
    ]
  },

  'node-apresentacao-copytrade': {
    id: 'node-apresentacao-copytrade',
    stage: 'APRESENTAÇÃO',
    title: 'Apresentação — Explicação CopyTrade',
    exactOperatorScript: 'O CopyTrade é uma ferramenta opcional que permite replicar operações da nossa equipe direto na sua corretora regulamentada. Só que o nosso grande diferencial é que você não fica cego: você acompanha os motivos de cada entrada nos encontros ao vivo.',
    objective: 'Esclarecer o papel do CopyTrade como ferramenta assistida.',
    tone: 'Didático e transparente.',
    responses: [
      { id: 'apc-1', label: 'Entendi, faz sentido', nextNodeId: 'node-apresentacao-conexao-dor', sentiment: 'positive', keyShortcut: '1' },
      { id: 'apc-2', label: 'Não confio muito nisso', nextNodeId: 'node-obj-copytrade', sentiment: 'objection', keyShortcut: '2' }
    ]
  },

  'node-apresentacao-corretora': {
    id: 'node-apresentacao-corretora',
    stage: 'APRESENTAÇÃO',
    title: 'Apresentação — Custódia e Corretora',
    exactOperatorScript: 'Seu dinheiro fica 100% na sua conta em corretora internacional regulamentada com segregação de patrimônio. A Atlas não encosta no seu dinheiro. O nosso trabalho é educacional e de mentoria estratégica.',
    objective: 'Dar segurança de custódia ao lead.',
    tone: 'Seguro e tranquilizador.',
    responses: [
      { id: 'apco-1', label: 'Perfeito, excelente', nextNodeId: 'node-apresentacao-conexao-dor', sentiment: 'positive', keyShortcut: '1' }
    ]
  },

  // CONEXÃO DA SOLUÇÃO À DOR
  'node-apresentacao-conexao-dor': {
    id: 'node-apresentacao-conexao-dor',
    stage: 'APRESENTAÇÃO',
    title: 'Apresentação — Conexão Solução e Dor',
    exactOperatorScript: 'Você me falou que {{dor}}. Por isso, para você, o ponto mais relevante da nossa estrutura provavelmente é {{beneficio_principal}}, porque {{conexao}}.',
    shortScript: 'Como você citou {{dor}}, o essencial para você é {{beneficio_principal}}, porque {{conexao}}.',
    objective: 'Hiperpersonalizar o valor da Atlas ancorando na dor exata dita pelo lead.',
    tone: 'Empático, convicto e direto.',
    instruction: 'CONECTE O BENEFÍCIO DIRETAMENTE À DOR DO LEAD.',
    responses: [
      { id: 'acd-1', label: 'Faz todo o sentido', nextNodeId: 'node-recomendacao-plano', sentiment: 'positive', keyShortcut: '1' },
      { id: 'acd-2', label: 'E como funciona na prática?', nextNodeId: 'node-recomendacao-plano', sentiment: 'positive', keyShortcut: '2' },
      { id: 'acd-3', label: 'Qual o valor disso?', nextNodeId: 'node-recomendacao-plano', sentiment: 'positive', keyShortcut: '3' }
    ]
  },

  // RECOMENDAÇÃO DO PLANO
  'node-recomendacao-plano': {
    id: 'node-recomendacao-plano',
    stage: 'RECOMENDAÇÃO',
    title: 'Recomendação — Plano Ideal para o Lead',
    exactOperatorScript: 'Pelo que você me contou, eu não começaria te indicando a maior estrutura. O que eu vejo fazendo mais sentido no seu caso é o {{plano}}, principalmente por causa de {{motivo_1}} e {{motivo_2}}.',
    shortScript: 'No seu caso recomendo o {{plano}}, focado em {{motivo_1}} e {{motivo_2}}.',
    objective: 'Apresentar a recomendação consultiva com autoridade (sem listar todos os planos como um cardápio).',
    tone: 'Autoridade consultiva, calmo e seguro.',
    instruction: 'NUNCA CITE TODOS OS PLANOS DE UMA VEZ. Recomende o plano cirúrgico para a necessidade dele.',
    responses: [
      { id: 'rp-1', label: 'Pode falar mais desse plano', nextNodeId: 'node-apresentacao-preco', sentiment: 'positive', keyShortcut: '1' },
      { id: 'rp-2', label: 'Quanto custa esse plano?', nextNodeId: 'node-apresentacao-preco', sentiment: 'positive', keyShortcut: '2' },
      { id: 'rp-3', label: 'Quero saber dos outros planos', nextNodeId: 'node-apresentacao-outros-planos', sentiment: 'neutral', keyShortcut: '3' }
    ]
  },

  'node-apresentacao-outros-planos': {
    id: 'node-apresentacao-outros-planos',
    stage: 'RECOMENDAÇÃO',
    title: 'Recomendação — Visão Geral dos Planos',
    exactOperatorScript: 'Temos desde a estrutura ESSENCIAL de 2 encontros semanais por USD 100, a PERFORMANCE de 3 a 4 encontros por USD 250, até a ESTRATÉGICO de USD 500 e EXPANSÃO com suporte diário de USD 1.000. Mas continuo recomendando o {{plano}} para o seu perfil.',
    objective: 'Dar contexto sem perder a âncora da recomendação ideal.',
    tone: 'Neutro e consultivo.',
    responses: [
      { id: 'aop-1', label: 'Vamos no recomendado ({{plano}})', nextNodeId: 'node-apresentacao-preco', sentiment: 'positive', keyShortcut: '1' },
      { id: 'aop-2', label: 'Prefiro o Essencial (USD 100)', nextNodeId: 'node-apresentacao-preco', variablesToSave: { recommended_plan: 'ESSENCIAL', recommended_plan_price: 'USD 100' }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'aop-3', label: 'Prefiro o Estratégico (USD 500)', nextNodeId: 'node-apresentacao-preco', variablesToSave: { recommended_plan: 'ESTRATÉGICO', recommended_plan_price: 'USD 500' }, sentiment: 'positive', keyShortcut: '3' }
    ]
  },

  // PREÇO
  'node-apresentacao-preco': {
    id: 'node-apresentacao-preco',
    stage: 'PREÇO',
    title: 'Preço — Apresentação da Oferta e Pausa',
    exactOperatorScript: 'Dentro dessa estrutura você tem {{benefícios_relevantes}}. O investimento para entrar no {{plano}} é de {{preco}}, em pagamento único.',
    shortScript: 'O investimento no {{plano}} é de {{preco}}, em pagamento único com acesso completo.',
    objective: 'Passar o preço de forma clara, contextualizada com benefícios, e aplicar o silêncio tático.',
    tone: 'Seguro, firme e natural. Sem pressa.',
    instruction: 'PARE DE FALAR E ESPERE. O primeiro a falar perde a negociação. Aguarde a reação do lead.',
    responses: [
      { id: 'app-1', label: 'Aceitou / Gostou', nextNodeId: 'node-fechamento-passos', sentiment: 'positive', keyShortcut: '1' },
      { id: 'app-2', label: 'Ficou em silêncio (pausa)', nextNodeId: 'node-preco-silencio', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'app-3', label: 'Está caro', nextNodeId: 'node-obj-esta-caro', variablesToSave: { main_objection: 'price' }, sentiment: 'objection', keyShortcut: '3' },
      { id: 'app-4', label: 'Preciso pensar', nextNodeId: 'node-obj-preciso-pensar', variablesToSave: { main_objection: 'need_to_think' }, sentiment: 'objection', keyShortcut: '4' },
      { id: 'app-5', label: 'Não tenho esse dinheiro', nextNodeId: 'node-obj-nao-tenho-dinheiro', variablesToSave: { main_objection: 'no_money' }, sentiment: 'objection', keyShortcut: '5' },
      { id: 'app-6', label: 'Perguntou como pagar', nextNodeId: 'node-fechamento-como-paga', sentiment: 'positive', keyShortcut: '6' },
      { id: 'app-7', label: 'Pediu desconto', nextNodeId: 'node-obj-pediu-desconto', sentiment: 'objection', keyShortcut: '7' },
      { id: 'app-8', label: 'Quer plano menor', nextNodeId: 'node-apresentacao-outros-planos', sentiment: 'neutral', keyShortcut: '8' },
      { id: 'app-9', label: 'Outra objeção', nextNodeId: 'node-obj-esta-caro', sentiment: 'objection', keyShortcut: '9' }
    ]
  },

  // SILÊNCIO APÓS PREÇO
  'node-preco-silencio': {
    id: 'node-preco-silencio',
    stage: 'PREÇO',
    title: 'Preço — Quebra Suave do Silêncio',
    exactOperatorScript: 'Como isso ficou para você?',
    shortScript: 'Como isso soa para você?',
    objective: 'Reabrir a conversa de forma desarmada e descobrir a reação real do lead sem pânico.',
    tone: 'Curioso, leve e tranquilo.',
    instruction: 'NÃO PEÇA DESCULPAS PELO PREÇO. Faça a pergunta e espere o retorno.',
    responses: [
      { id: 'ps-1', label: 'Gostei / Achei justo', nextNodeId: 'node-fechamento-passos', sentiment: 'positive', keyShortcut: '1' },
      { id: 'ps-2', label: 'Achei caro', nextNodeId: 'node-obj-esta-caro', variablesToSave: { main_objection: 'price' }, sentiment: 'objection', keyShortcut: '2' },
      { id: 'ps-3', label: 'Preciso pensar', nextNodeId: 'node-obj-preciso-pensar', variablesToSave: { main_objection: 'need_to_think' }, sentiment: 'objection', keyShortcut: '3' },
      { id: 'ps-4', label: 'Tenho uma dúvida', nextNodeId: 'node-emergencia-pergunta', sentiment: 'neutral', keyShortcut: '4' },
      { id: 'ps-5', label: 'Não sei...', nextNodeId: 'node-obj-preciso-pensar', sentiment: 'neutral', keyShortcut: '5' }
    ]
  }
};
