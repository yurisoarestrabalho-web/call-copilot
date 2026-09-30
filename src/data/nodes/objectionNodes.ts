import { ScriptNode } from '../../types/script';

export const objectionNodes: Record<string, ScriptNode> = {
  // ESTÁ CARO
  'node-obj-esta-caro': {
    id: 'node-obj-esta-caro',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Está Caro (Investigação)',
    exactOperatorScript: 'Entendi. Só para eu não presumir errado: quando você fala que está caro, é porque realmente não consegue colocar esse valor agora ou porque ainda não enxergou valor suficiente para justificar esse investimento?',
    objective: 'Descobrir se é falta de limite financeiro real ou falta de percepção de valor.',
    tone: 'Empático, curioso e desarmado.',
    instruction: 'NUNCA DISCUTA PREÇO. Isole se a questão é dinheiro real ou percepção de valor.',
    responses: [
      { id: 'oec-1', label: 'Não tenho o dinheiro agora', nextNodeId: 'node-obj-nao-tenho-dinheiro', sentiment: 'objection', keyShortcut: '1' },
      { id: 'oec-2', label: 'Tenho, mas achei caro', nextNodeId: 'node-obj-caro-tem-dinheiro', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'oec-3', label: 'Ainda não vi valor suficiente', nextNodeId: 'node-obj-caro-tem-dinheiro', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'oec-4', label: 'Estou comparando com outro', nextNodeId: 'node-obj-comparando', sentiment: 'neutral', keyShortcut: '4' },
      { id: 'oec-5', label: 'Quero gastar menos', nextNodeId: 'node-obj-caro-opcao-menor', sentiment: 'neutral', keyShortcut: '5' }
    ]
  },

  'node-obj-caro-tem-dinheiro': {
    id: 'node-obj-caro-tem-dinheiro',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Tem o dinheiro, mas achou caro',
    exactOperatorScript: 'Entendi. Então não é exatamente uma impossibilidade financeira. A questão é você ter certeza de que aquilo que está recebendo faz sentido pelo valor, correto?',
    objective: 'Fazer o lead confirmar que pagaria se tivesse certeza do retorno/solução.',
    tone: 'Compreensivo e firme.',
    responses: [
      { id: 'octd-1', label: 'Sim, exatamente', nextNodeId: 'node-obj-caro-reconstrucao', sentiment: 'positive', keyShortcut: '1' },
      { id: 'octd-2', label: 'Não, ainda pesa um pouco', nextNodeId: 'node-obj-caro-opcao-menor', sentiment: 'neutral', keyShortcut: '2' }
    ]
  },

  'node-obj-caro-reconstrucao': {
    id: 'node-obj-caro-reconstrucao',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Reconstrução de Valor e Conexão',
    exactOperatorScript: 'Então volta comigo numa coisa. Você me falou que hoje {{dor}} e que quer {{objetivo}}. O que eu estou te propondo não é simplesmente acesso a conteúdo; é uma estrutura pensada justamente para atacar esse problema com {{beneficio_principal}}. Se você tivesse segurança de que essa estrutura é realmente adequada para resolver aquilo que você me contou, o valor ainda seria o principal impedimento?',
    shortScript: 'Se você tivesse certeza de que resolve {{dor}}, o valor ainda seria o principal impedimento?',
    objective: 'Reancorar o investimento na dor real do lead e isolar a objeção.',
    tone: 'Sincero, olho no olho, firme.',
    responses: [
      { id: 'ocr-1', label: 'Não, nesse caso faria', nextNodeId: 'node-obj-resolvida', sentiment: 'positive', keyShortcut: '1' },
      { id: 'ocr-2', label: 'Sim, ainda acho alto', nextNodeId: 'node-obj-caro-opcao-menor', sentiment: 'objection', keyShortcut: '2' },
      { id: 'ocr-3', label: 'Ainda tenho dúvida sobre resultado', nextNodeId: 'node-obj-como-funciona', sentiment: 'neutral', keyShortcut: '3' }
    ]
  },

  'node-obj-caro-opcao-menor': {
    id: 'node-obj-caro-opcao-menor',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Apresentar Plano Menor',
    exactOperatorScript: 'Para você não ficar sem começar e não se comprometer além do que está confortável hoje, nós temos a estrutura ESSENCIAL por USD 100 em pagamento único, com 2 encontros por semana. O que acha de dar esse primeiro passo com a gente?',
    objective: 'Oferecer um degrau de entrada acessível mantendo o fechamento.',
    tone: 'Acolhedor e facilitador.',
    responses: [
      { id: 'com-1', label: 'Perfeito, esse cabe no bolso', nextNodeId: 'node-fechamento-passos', variablesToSave: { recommended_plan: 'ESSENCIAL', recommended_plan_price: 'USD 100' }, sentiment: 'positive', keyShortcut: '1' },
      { id: 'com-2', label: 'Ainda preciso pensar', nextNodeId: 'node-obj-preciso-pensar', sentiment: 'objection', keyShortcut: '2' }
    ]
  },

  // NÃO TENHO DINHEIRO
  'node-obj-nao-tenho-dinheiro': {
    id: 'node-obj-nao-tenho-dinheiro',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Não Tenho Dinheiro',
    exactOperatorScript: 'Entendi. E quando você diz que não tem o dinheiro, quer dizer que esse valor realmente não está disponível hoje ou que você tinha planejado investir um valor menor?',
    objective: 'Diferenciar falta de orçamento real de expectativa descalibrada.',
    tone: 'Respeitoso, sem pressão.',
    instruction: 'NÃO PRESSIONE ALGUÉM SEM CONDIÇÃO FINANCEIRA. Seja profissional e ético.',
    responses: [
      { id: 'ond-1', label: 'Realmente não está disponível', nextNodeId: 'node-obj-dinheiro-indisponivel', sentiment: 'negative', keyShortcut: '1' },
      { id: 'ond-2', label: 'Tenho menos disponível', nextNodeId: 'node-obj-caro-opcao-menor', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'ond-3', label: 'Tenho, mas não quero gastar', nextNodeId: 'node-obj-caro-tem-dinheiro', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'ond-4', label: 'Preciso esperar receber / data futura', nextNodeId: 'node-follow-up-agendado', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  'node-obj-dinheiro-indisponivel': {
    id: 'node-obj-dinheiro-indisponivel',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Saída Honrosa Sem Dinheiro',
    exactOperatorScript: 'Perfeito, então não faria sentido eu tentar te empurrar uma decisão agora. O melhor é entendermos se existe uma opção compatível com o que você consegue fazer ou se é melhor retomarmos quando estiver mais confortável.',
    objective: 'Preservar a dignidade do lead e manter a porta aberta.',
    tone: 'Empático, nobre e ético.',
    responses: [
      { id: 'odi-1', label: 'Me liga mês que vem', nextNodeId: 'node-follow-up-agendado', sentiment: 'neutral', keyShortcut: '1' },
      { id: 'odi-2', label: 'Vamos ver a opção menor (USD 100)', nextNodeId: 'node-obj-caro-opcao-menor', sentiment: 'positive', keyShortcut: '2' },
      { id: 'odi-3', label: 'Melhor encerrar por enquanto', nextNodeId: 'node-sem-interesse-final', sentiment: 'negative', keyShortcut: '3' }
    ]
  },

  // PRECISO PENSAR
  'node-obj-preciso-pensar': {
    id: 'node-obj-preciso-pensar',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Preciso Pensar (Investigação)',
    exactOperatorScript: 'Claro. Só me ajuda a entender uma coisa: quando você fala que precisa pensar, o que exatamente você sente que ainda precisa analisar antes de tomar uma decisão?',
    objective: 'Descobrir o que está oculto por trás do "preciso pensar".',
    tone: 'Compreensivo e investigativo.',
    responses: [
      { id: 'opp-1', label: 'Preço / Condição', nextNodeId: 'node-obj-esta-caro', sentiment: 'objection', keyShortcut: '1' },
      { id: 'opp-2', label: 'Confiança na Atlas / Resultados', nextNodeId: 'node-obj-como-funciona', sentiment: 'objection', keyShortcut: '2' },
      { id: 'opp-3', label: 'Medo de perder dinheiro', nextNodeId: 'node-obj-medo-perder', sentiment: 'objection', keyShortcut: '3' },
      { id: 'opp-4', label: 'Preciso falar com alguém (cônjuge)', nextNodeId: 'node-obj-conjuge', sentiment: 'neutral', keyShortcut: '4' },
      { id: 'opp-5', label: 'Não entendi totalmente como funciona', nextNodeId: 'node-apresentacao-atlas', sentiment: 'neutral', keyShortcut: '5' },
      { id: 'opp-6', label: 'Não gosto de decidir na hora / Não sei explicar', nextNodeId: 'node-obj-pensar-nao-sabe', sentiment: 'neutral', keyShortcut: '6' }
    ]
  },

  'node-obj-pensar-nao-sabe': {
    id: 'node-obj-pensar-nao-sabe',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Não sabe explicar o que pensar',
    exactOperatorScript: 'Sem problema. Normalmente quando alguém me fala isso existe uma de três coisas por trás: ainda não enxergou valor suficiente, ficou alguma dúvida ou simplesmente não se sente confortável para decidir agora. Qual desses chega mais perto?',
    objective: 'Fornecer alternativas concretas para destravar o diálogo.',
    tone: 'Calmo e acolhedor.',
    responses: [
      { id: 'opns-1', label: 'Ficou dúvida sobre como funciona', nextNodeId: 'node-apresentacao-atlas', sentiment: 'neutral', keyShortcut: '1' },
      { id: 'opns-2', label: 'Ainda não vi segurança no valor', nextNodeId: 'node-obj-caro-reconstrucao', sentiment: 'objection', keyShortcut: '2' },
      { id: 'opns-3', label: 'Não gosto de decidir na correria', nextNodeId: 'node-obj-garantia-alivio', sentiment: 'neutral', keyShortcut: '3' }
    ]
  },

  'node-obj-garantia-alivio': {
    id: 'node-obj-garantia-alivio',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Remoção de Risco com Garantia',
    exactOperatorScript: 'Totalmente compreensível. É justamente por isso que a Atlas oferece a garantia de satisfação de 7 dias: você garante a sua vaga agora, participa dos primeiros encontros e avalia a metodologia por dentro. Se não fizer sentido, você pede reembolso integral com um único clique. Faz sentido testar sem risco?',
    objective: 'Inverter o risco e incentivar a decisão agora.',
    tone: 'Tranquilizador e confiante.',
    responses: [
      { id: 'oga-1', label: 'Faz sentido, vamos entrar', nextNodeId: 'node-fechamento-passos', sentiment: 'positive', keyShortcut: '1' },
      { id: 'oga-2', label: 'Prefiro falar com cônjuge antes', nextNodeId: 'node-obj-conjuge', sentiment: 'neutral', keyShortcut: '2' }
    ]
  },

  // MARIDO / ESPOSA
  'node-obj-conjuge': {
    id: 'node-obj-conjuge',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Falar com Marido / Esposa',
    exactOperatorScript: 'Claro, faz sentido vocês conversarem se essa é uma decisão que tomam juntos. Só para eu te ajudar a ter essa conversa: você, pessoalmente, gostou da estrutura e faria se a decisão dependesse só de você?',
    objective: 'Testar se o lead está convencido ou usando o cônjuge como escudo.',
    tone: 'Amigável e interessado.',
    responses: [
      { id: 'ocj-1', label: 'Sim, eu faria', nextNodeId: 'node-obj-conjuge-ajuda', sentiment: 'positive', keyShortcut: '1' },
      { id: 'ocj-2', label: 'Ainda tenho algumas dúvidas', nextNodeId: 'node-apresentacao-atlas', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'ocj-3', label: 'Não tenho certeza', nextNodeId: 'node-obj-preciso-pensar', sentiment: 'objection', keyShortcut: '3' }
    ]
  },

  'node-obj-conjuge-ajuda': {
    id: 'node-obj-conjuge-ajuda',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Preparar o Argumento para o Cônjuge',
    exactOperatorScript: 'Perfeito. E qual você acha que seria a principal dúvida dele ou dela quando você explicar a proposta?',
    objective: 'Antecipar o ponto de atrito familiar e preparar os argumentos.',
    tone: 'Consultivo e colaborador.',
    responses: [
      { id: 'oca-1', label: 'Preço / Gastos', nextNodeId: 'node-obj-caro-reconstrucao', sentiment: 'neutral', keyShortcut: '1' },
      { id: 'oca-2', label: 'Confiança / Medo de golpe', nextNodeId: 'node-obj-como-funciona', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'oca-3', label: 'Risco de mercado', nextNodeId: 'node-obj-medo-perder', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'oca-4', label: 'Vou conversar hoje à noite', nextNodeId: 'node-follow-up-agendado', sentiment: 'positive', keyShortcut: '4' }
    ]
  },

  // MEDO DE PERDER DINHEIRO
  'node-obj-medo-perder': {
    id: 'node-obj-medo-perder',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Medo de Perder Dinheiro',
    exactOperatorScript: 'Esse receio é totalmente relevante quando estamos falando de mercado financeiro. O que eu não quero fazer é te vender a ideia de que risco não existe, porque existe. A pergunta é: o seu medo vem mais do risco natural do mercado ou de não saber o que está fazendo e acabar tomando decisões erradas?',
    objective: 'Separar o risco natural da falta de técnica e gestão de risco.',
    tone: 'Sério, íntegro e realista.',
    instruction: 'NÃO PROMETA AUSÊNCIA DE RISCO. Enfatize a gestão de risco e o método.',
    responses: [
      { id: 'omp-1', label: 'De não saber o que estou fazendo', nextNodeId: 'node-obj-medo-metodo', sentiment: 'positive', keyShortcut: '1' },
      { id: 'omp-2', label: 'Do risco do próprio mercado', nextNodeId: 'node-obj-medo-mercado', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'omp-3', label: 'Por experiência ruim passada', nextNodeId: 'node-obj-ja-perdeu', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'omp-4', label: 'Todos esses fatores', nextNodeId: 'node-obj-medo-metodo', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  'node-obj-medo-metodo': {
    id: 'node-obj-medo-metodo',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Gestão de Risco como Solução ao Medo',
    exactOperatorScript: 'E é exatamente aí que o acompanhamento da Atlas atua. Nós não deixamos você operar no escuro. Toda ordem tem stop loss programado, risco de capital controlado e acompanhamento ao vivo. Quando você tem regras blindadas, o medo deixa de paralisar. Faz sentido?',
    objective: 'Demonstrar como a técnica mitiga a insegurança do lead.',
    tone: 'Firme e tranquilizador.',
    responses: [
      { id: 'omm-1', label: 'Faz total sentido', nextNodeId: 'node-obj-resolvida', sentiment: 'positive', keyShortcut: '1' },
      { id: 'omm-2', label: 'Ainda tenho receio', nextNodeId: 'node-obj-como-funciona', sentiment: 'neutral', keyShortcut: '2' }
    ]
  },

  'node-obj-medo-mercado': {
    id: 'node-obj-medo-mercado',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Risco do Mercado',
    exactOperatorScript: 'Quem opera com método nunca coloca todo o patrimônio em risco: trabalha com parcelas calculadas, protegendo o capital principal. O risco de mercado sempre existirá, mas a técnica é o que separa um apostador de um investidor consistente.',
    objective: 'Reenquadrar o papel da técnica na mitigação de risco.',
    tone: 'Maduro e técnico.',
    responses: [
      { id: 'ommc-1', label: 'Entendi a diferença', nextNodeId: 'node-obj-resolvida', sentiment: 'positive', keyShortcut: '1' }
    ]
  },

  // JÁ PERDEU DINHEIRO
  'node-obj-ja-perdeu': {
    id: 'node-obj-ja-perdeu',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Já Perdeu Dinheiro no Passado',
    exactOperatorScript: 'Eu entendo. E justamente por você já ter vivido isso, eu não quero ignorar essa experiência. Como você comentou que já teve uma experiência ruim operando sozinho, um dos pontos mais importantes da Atlas é justamente você não precisar voltar a tomar todas essas decisões sem acompanhamento profissional.',
    objective: 'Acolher a dor passada e transformá-la no principal motivo para entrar acompanhado.',
    tone: 'Profundamente empático e seguro.',
    responses: [
      { id: 'ojp-1', label: 'Realmente, sozinho é muito difícil', nextNodeId: 'node-obj-resolvida', sentiment: 'positive', keyShortcut: '1' },
      { id: 'ojp-2', label: 'Como sei que dessa vez será diferente?', nextNodeId: 'node-obj-como-funciona', sentiment: 'neutral', keyShortcut: '2' }
    ]
  },

  // COMO SEI QUE FUNCIONA? / PROVAS
  'node-obj-como-funciona': {
    id: 'node-obj-como-funciona',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Como Sei Que Funciona?',
    exactOperatorScript: 'É uma pergunta justa. E eu separaria duas coisas: o histórico e a garantia de futuro. Nós podemos te mostrar os dados, resultados, estrutura e provas que a Atlas possui documentados com mais de 5.000 investidores e taxa superior a 85% no histórico, mas eu nunca vou te dizer que um resultado histórico garante exatamente o que você vai obter daqui para frente.',
    objective: 'Construir credibilidade através de provas documentadas mantendo a ética.',
    tone: 'Transparente, firme e documentado.',
    instruction: 'CITE PROVAS DOCUMENTADAS SEM PROMETER GANHO FUTURO FIXO.',
    responses: [
      { id: 'ocsf-1', label: 'Gostei da transparência', nextNodeId: 'node-obj-resolvida', sentiment: 'positive', keyShortcut: '1' },
      { id: 'ocsf-2', label: 'Vocês garantem resultado?', nextNodeId: 'node-obj-garante-resultado', sentiment: 'objection', keyShortcut: '2' },
      { id: 'ocsf-3', label: 'Quero pesquisar mais', nextNodeId: 'node-obj-pesquisar', sentiment: 'neutral', keyShortcut: '3' }
    ]
  },

  // GARANTE RESULTADO?
  'node-obj-garante-resultado': {
    id: 'node-obj-garante-resultado',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Vocês Garantem Resultado?',
    exactOperatorScript: 'Não. O que conseguimos apresentar são nossa estrutura, metodologia e resultados históricos documentados. Mercado financeiro envolve risco, então seria errado eu transformar histórico em promessa de resultado futuro. Dito isso, sua dúvida é mais sobre a credibilidade da estrutura ou sobre o risco do próprio mercado?',
    objective: 'Rejeitar categoricamente promessas ilegais e focar na raiz da insegurança.',
    tone: 'Íntegro, firme e transparente.',
    responses: [
      { id: 'ogr-1', label: 'Credibilidade da estrutura', nextNodeId: 'node-obj-como-funciona', sentiment: 'neutral', keyShortcut: '1' },
      { id: 'ogr-2', label: 'Risco do próprio mercado', nextNodeId: 'node-obj-medo-perder', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'ogr-3', label: 'Os dois', nextNodeId: 'node-obj-como-funciona', sentiment: 'neutral', keyShortcut: '3' }
    ]
  },

  // COPYTRADE
  'node-obj-copytrade': {
    id: 'node-obj-copytrade',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Não Confio em CopyTrade',
    exactOperatorScript: 'Faz sentido ter cuidado. Quando você fala que não confia, é porque já teve uma experiência ruim com CopyTrade ou porque ainda não entende exatamente como funciona?',
    objective: 'Mapear se a objeção a CopyTrade é trauma passado ou falta de conhecimento.',
    tone: 'Compreensivo e didático.',
    responses: [
      { id: 'oct-1', label: 'Experiência ruim anterior', nextNodeId: 'node-obj-copytrade-opcional', sentiment: 'neutral', keyShortcut: '1' },
      { id: 'oct-2', label: 'Não entendo como funciona', nextNodeId: 'node-apresentacao-copytrade', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'oct-3', label: 'Vi pessoas perderem dinheiro', nextNodeId: 'node-obj-copytrade-opcional', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'oct-4', label: 'Não gosto da ideia', nextNodeId: 'node-obj-copytrade-opcional', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  'node-obj-copytrade-opcional': {
    id: 'node-obj-copytrade-opcional',
    stage: 'OBJEÇÕES',
    title: 'Objeção — CopyTrade é 100% Opcional',
    exactOperatorScript: 'E isso é ótimo você falar, porque na Atlas o CopyTrade é 100% opcional. O nosso core é te ensinar a operar e tomar decisões nos encontros ao vivo com analistas. Você não precisa usar copy se não quiser. O foco é a sua evolução independente.',
    objective: 'Desarmar a objeção eliminando a obrigatoriedade do CopyTrade.',
    tone: 'Tranquilizador e objetivo.',
    responses: [
      { id: 'octo-1', label: 'Perfeito, prefiro aprender', nextNodeId: 'node-obj-resolvida', sentiment: 'positive', keyShortcut: '1' }
    ]
  },

  // QUERO PESQUISAR
  'node-obj-pesquisar': {
    id: 'node-obj-pesquisar',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Quero Pesquisar Antes',
    exactOperatorScript: 'Claro. Inclusive eu prefiro que você tome uma decisão entendendo onde está entrando. Antes de você pesquisar, existe alguma coisa específica que ainda te deixou com dúvida e que eu consigo esclarecer agora?',
    objective: 'Descobrir qual dúvida gerou o desejo de pesquisar e respondê-la na hora.',
    tone: 'Apoio sincero e descontraído.',
    responses: [
      { id: 'opq-1', label: 'Sobre a empresa / Reclamações', nextNodeId: 'node-obj-como-funciona', sentiment: 'neutral', keyShortcut: '1' },
      { id: 'opq-2', label: 'Sobre os resultados / Provas', nextNodeId: 'node-obj-como-funciona', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'opq-3', label: 'Sobre o preço e formas de pagamento', nextNodeId: 'node-fechamento-como-paga', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'opq-4', label: 'Nada específico, só quero olhar com calma', nextNodeId: 'node-obj-whatsapp', sentiment: 'neutral', keyShortcut: '4' }
    ]
  },

  // ME MANDA NO WHATSAPP
  'node-obj-whatsapp': {
    id: 'node-obj-whatsapp',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Me Manda no WhatsApp',
    exactOperatorScript: 'Te mando sim. Só quero evitar te jogar um monte de informação genérica. Pelo que a gente conversou, qual é a principal coisa que você quer analisar no material antes de decidir?',
    objective: 'Descobrir a dúvida prioritária do lead antes de enviar mensagem no WhatsApp.',
    tone: 'Prestativo e consultivo.',
    responses: [
      { id: 'ow-1', label: 'Preço e formas de pagamento', nextNodeId: 'node-fechamento-como-paga', sentiment: 'positive', keyShortcut: '1' },
      { id: 'ow-2', label: 'Como funciona a rotina dos encontros', nextNodeId: 'node-apresentacao-atlas', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'ow-3', label: 'Resultados e depoimentos', nextNodeId: 'node-obj-como-funciona', sentiment: 'neutral', keyShortcut: '3' },
      { id: 'ow-4', label: 'Só quero encerrar a ligação', nextNodeId: 'node-follow-up-gentil', sentiment: 'negative', keyShortcut: '4' }
    ]
  },

  // PEDIU DESCONTO
  'node-obj-pediu-desconto': {
    id: 'node-obj-pediu-desconto',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Pediu Desconto',
    exactOperatorScript: 'A Atlas mantém a mesma política de investimento tabelada para todos os membros justamente para assegurar a dedicação dos nossos analistas ao vivo. O que conseguimos fazer é viabilizar o plano ESSENCIAL por USD 100 se o valor atual estiver acima do seu orçamento.',
    objective: 'Defender o valor tabelado e oferecer a alternativa do plano de USD 100.',
    tone: 'Firme, polido e seguro.',
    responses: [
      { id: 'opd-1', label: 'Tudo bem, fico no {{plano}}', nextNodeId: 'node-fechamento-passos', sentiment: 'positive', keyShortcut: '1' },
      { id: 'opd-2', label: 'Vamos no ESSENCIAL de USD 100', nextNodeId: 'node-fechamento-passos', variablesToSave: { recommended_plan: 'ESSENCIAL', recommended_plan_price: 'USD 100' }, sentiment: 'positive', keyShortcut: '2' }
    ]
  },

  // COMPARANDO COM OUTRA EMPRESA
  'node-obj-comparando': {
    id: 'node-obj-comparando',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Comparando com Outra Empresa',
    exactOperatorScript: 'Perfeito, inclusive é saudável comparar. Quais são os principais pontos que você está usando para decidir entre uma e outra?',
    objective: 'Descobrir os critérios de decisão do lead.',
    tone: 'Seguro e consultivo.',
    responses: [
      { id: 'ocoe-1', label: 'Preço', nextNodeId: 'node-obj-esta-caro', sentiment: 'neutral', keyShortcut: '1' },
      { id: 'ocoe-2', label: 'Acompanhamento ao vivo', nextNodeId: 'node-apresentacao-conexao-dor', sentiment: 'positive', keyShortcut: '2' },
      { id: 'ocoe-3', label: 'Resultados e histórico', nextNodeId: 'node-obj-como-funciona', sentiment: 'positive', keyShortcut: '3' }
    ]
  },

  // QUANDO A OBJEÇÃO FOR RESOLVIDA
  'node-obj-resolvida': {
    id: 'node-obj-resolvida',
    stage: 'OBJEÇÕES',
    title: 'Objeção — Confirmação de Resolução',
    exactOperatorScript: 'Perfeito. Resolvida essa parte, existe alguma outra coisa que te impediria de começar hoje?',
    shortScript: 'Resolvida essa parte, tem mais algo que te impediria de começar hoje?',
    objective: 'Verificar se ainda resta alguma objeção oculta ou se o caminho está livre para fechar.',
    tone: 'Direto, tranquilo e conclusivo.',
    instruction: 'NUNCA CONTINUE ARGUMENTANDO. Se o caminho estiver livre, vá para o fechamento!',
    responses: [
      { id: 'or-1', label: 'Não, tudo resolvido', nextNodeId: 'node-fechamento-passos', sentiment: 'positive', keyShortcut: '1' },
      { id: 'or-2', label: 'Sim, ainda tenho outra dúvida', nextNodeId: 'node-emergencia-pergunta', sentiment: 'neutral', keyShortcut: '2' },
      { id: 'or-3', label: 'Ainda acho o preço alto', nextNodeId: 'node-obj-caro-opcao-menor', sentiment: 'objection', keyShortcut: '3' }
    ]
  }
};
