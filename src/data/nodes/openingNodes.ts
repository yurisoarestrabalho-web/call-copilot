import { ScriptNode } from '../../types/script';

export const openingNodes: Record<string, ScriptNode> = {
  'node-abertura-principal': {
    id: 'node-abertura-principal',
    stage: 'ABERTURA',
    title: 'Abertura — Lead Morno / Quente',
    exactOperatorScript: 'Oi, {{nome}}, tudo bem? Aqui é {{operador}} da Atlas Academy. Você deixou seu contato com a gente recentemente porque teve interesse em entender melhor nossa estrutura de investimentos. Peguei você num momento ruim ou consegue falar comigo por dois minutinhos?',
    shortScript: 'Oi, {{nome}}! {{operador}} da Atlas Academy. Te peguei num momento ruim ou consegue falar dois minutinhos sobre investimentos?',
    alternativeScript: 'Olá, {{nome}}, tudo bom? Aqui é o {{operador}} da Atlas. Vi que você buscou informações sobre nossa estrutura. Tem dois minutinhos rápidos para conversarmos?',
    objective: 'Estabelecer contato sem pressão, pedir permissão para falar e medir receptividade.',
    tone: 'Curioso, tranquilo e educado.',
    instruction: 'NÃO COMECE APRESENTANDO O PRODUTO. Apenas consiga a autorização para falar 2 minutos.',
    responses: [
      { id: 'ab-1', label: 'Pode falar', nextNodeId: 'node-abertura-pode-falar', sentiment: 'positive', keyShortcut: '1' },
      { id: 'ab-2', label: 'Estou ocupado', nextNodeId: 'node-abertura-ocupado', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'ab-3', label: 'Não lembro da Atlas', nextNodeId: 'node-abertura-nao-lembro', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'ab-4', label: 'Quero só saber o preço', nextNodeId: 'node-emergencia-preco-inicial', sentiment: 'objection', keyShortcut: '4' },
      { id: 'ab-5', label: 'Não tenho interesse', nextNodeId: 'node-abertura-sem-interesse', sentiment: 'negative', keyShortcut: '5' },
      { id: 'ab-6', label: 'Quem é você?', nextNodeId: 'node-abertura-quem-e', sentiment: 'neutral', keyShortcut: '6' },
      { id: 'ab-7', label: 'Outra resposta', nextNodeId: 'node-abertura-pode-falar', sentiment: 'neutral', keyShortcut: '7' }
    ]
  },

  'node-abertura-pode-falar': {
    id: 'node-abertura-pode-falar',
    stage: 'ABERTURA',
    title: 'Abertura — Enquadramento e Permissão',
    exactOperatorScript: 'Perfeito. E pode ficar tranquilo que eu não vou sair te apresentando um monte de coisa antes de entender seu momento. Primeiro eu quero fazer algumas perguntas rápidas para ver se o que a gente faz realmente combina com o que você procura. Pode ser?',
    shortScript: 'Perfeito. Quero só fazer 2 perguntas rápidas para ver se o que a gente faz combina com o seu momento. Pode ser?',
    objective: 'Desarmar a guarda comercial do lead e obter autorização para o diagnóstico.',
    tone: 'Tranquilo, consultivo e seguro.',
    instruction: 'NUNCA PULE O DIAGNÓSTICO. Estabeleça autoridade demonstrando que não vende sem entender.',
    responses: [
      { id: 'apf-1', label: 'Pode / Manda', nextNodeId: 'node-diag-1', sentiment: 'positive', keyShortcut: '1' },
      { id: 'apf-2', label: 'Prefiro que explique primeiro', nextNodeId: 'node-abertura-prefere-explicacao', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'apf-3', label: 'Estou com pouco tempo', nextNodeId: 'node-emergencia-pressa', sentiment: 'objection', keyShortcut: '3' },
      { id: 'apf-4', label: 'Outra resposta', nextNodeId: 'node-diag-1', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  'node-abertura-ocupado': {
    id: 'node-abertura-ocupado',
    stage: 'ABERTURA',
    title: 'Abertura — Lead Ocupado',
    exactOperatorScript: 'Tranquilo, sem problema nenhum. É melhor eu te pegar num momento em que você consiga conversar com calma. Você prefere que eu te ligue mais tarde hoje ou amanhã?',
    objective: 'Remarcar sem parecer invasivo e dar opções de horário.',
    tone: 'Empático e profissional.',
    responses: [
      { id: 'oc-1', label: 'Hoje mais tarde', nextNodeId: 'node-follow-up-agendado', sentiment: 'positive', keyShortcut: '1' },
      { id: 'oc-2', label: 'Amanhã', nextNodeId: 'node-follow-up-agendado', sentiment: 'positive', keyShortcut: '2' },
      { id: 'oc-3', label: 'Me chama no WhatsApp', nextNodeId: 'node-obj-whatsapp', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'oc-4', label: 'Eu entro em contato', nextNodeId: 'node-follow-up-gentil', sentiment: 'neutral', keyShortcut: '4' },
      { id: 'oc-5', label: 'Não quero retorno', nextNodeId: 'node-sem-interesse-final', sentiment: 'negative', keyShortcut: '5' }
    ]
  },

  'node-abertura-nao-lembro': {
    id: 'node-abertura-nao-lembro',
    stage: 'ABERTURA',
    title: 'Abertura — Não Lembra da Atlas',
    exactOperatorScript: 'Sem problema. A Atlas Academy trabalha com educação financeira, acompanhamento e acesso a uma estrutura voltada para mercados financeiros, inclusive internacionais. Provavelmente você viu algum dos nossos conteúdos ou anúncios e deixou seus dados para saber mais. Agora lembrou de alguma coisa?',
    objective: 'Reativar a memória do lead de forma leve sem discutir.',
    tone: 'Compreensivo e sereno.',
    responses: [
      { id: 'nl-1', label: 'Agora lembro', nextNodeId: 'node-abertura-pode-falar', sentiment: 'positive', keyShortcut: '1' },
      { id: 'nl-2', label: 'Ainda não / Pode explicar', nextNodeId: 'node-abertura-pode-falar', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'nl-3', label: 'Não tenho interesse', nextNodeId: 'node-abertura-sem-interesse', sentiment: 'negative', keyShortcut: '3' },
      { id: 'nl-4', label: 'Outra resposta', nextNodeId: 'node-abertura-pode-falar', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  'node-abertura-quem-e': {
    id: 'node-abertura-quem-e',
    stage: 'ABERTURA',
    title: 'Abertura — Quem é você?',
    exactOperatorScript: 'Eu sou {{operador}}, faço parte da equipe da Atlas Academy. Meu contato é justamente para entender o que você procura no mercado financeiro e, se fizer sentido, te explicar como funciona nossa estrutura.',
    objective: 'Apresentar-se com clareza e focar o próximo passo no diagnóstico.',
    tone: 'Seguro, firme e cordial.',
    responses: [
      { id: 'qe-1', label: 'Pode falar', nextNodeId: 'node-abertura-pode-falar', sentiment: 'positive', keyShortcut: '1' },
      { id: 'qe-2', label: 'Quero saber preço', nextNodeId: 'node-emergencia-preco-inicial', sentiment: 'objection', keyShortcut: '2' },
      { id: 'qe-3', label: 'Não tenho interesse', nextNodeId: 'node-abertura-sem-interesse', sentiment: 'negative', keyShortcut: '3' }
    ]
  },

  'node-abertura-prefere-explicacao': {
    id: 'node-abertura-prefere-explicacao',
    stage: 'ABERTURA',
    title: 'Abertura — Lead quer explicação antes',
    exactOperatorScript: 'Eu posso te explicar sim, com certeza! É que a Atlas tem estruturas bem diferentes dependendo se a pessoa nunca investiu ou se já opera no mercado. Só para eu não te falar coisas que não têm nada a ver com o seu caso: hoje você já investe ou ainda está começando?',
    objective: 'Contornar suavemente e redirecionar imediatamente para o diagnóstico sem atrito.',
    tone: 'Seguro e amigável.',
    responses: [
      { id: 'pe-1', label: 'Nunca investi', nextNodeId: 'node-diag-nunca-investiu', variablesToSave: { experience: 'beginner', current_investor: false }, sentiment: 'neutral', keyShortcut: '1' },
      { id: 'pe-2', label: 'Estou começando', nextNodeId: 'node-diag-nunca-investiu', variablesToSave: { experience: 'beginner', current_investor: false }, sentiment: 'neutral', keyShortcut: '2' },
      { id: 'pe-3', label: 'Já invisto', nextNodeId: 'node-diag-ja-investe', variablesToSave: { experience: 'intermediate', current_investor: true }, sentiment: 'neutral', keyShortcut: '3' }
    ]
  },

  'node-abertura-sem-interesse': {
    id: 'node-abertura-sem-interesse',
    stage: 'ABERTURA',
    title: 'Abertura — Lead sem interesse',
    exactOperatorScript: 'Tranquilo. Só para eu registrar corretamente e não ficar te incomodando à toa: é porque investimentos não são uma prioridade para você agora ou porque o que você viu da Atlas não chamou sua atenção?',
    objective: 'Descobrir o motivo real sem ser insistente ou desagradável.',
    tone: 'Desapegado, profissional e calmo.',
    responses: [
      { id: 'si-1', label: 'Não é prioridade', nextNodeId: 'node-sem-interesse-final', sentiment: 'negative', keyShortcut: '1' },
      { id: 'si-2', label: 'Não gostei / Não conheço', nextNodeId: 'node-abertura-nao-lembro', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'si-3', label: 'Não tenho dinheiro agora', nextNodeId: 'node-obj-nao-tenho-dinheiro', sentiment: 'objection', keyShortcut: '3' },
      { id: 'si-4', label: 'Não quero explicar', nextNodeId: 'node-sem-interesse-final', sentiment: 'negative', keyShortcut: '4' }
    ]
  }
};
