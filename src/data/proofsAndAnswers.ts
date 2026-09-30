import { CommercialProof, QuickAnswer } from '../types/script';

export const DEFAULT_PROOFS: CommercialProof[] = [
  {
    id: 'proof-1',
    title: 'Taxa de Sucesso Histórica',
    category: 'sucesso',
    statOrFact: 'Taxa de sucesso superior a 85%',
    disclaimer: 'Resultados históricos documentados pela empresa. Mercado financeiro envolve risco e rentabilidade passada não garante rentabilidade futura.',
    speechText: 'A Atlas possui uma taxa de sucesso histórica documentada superior a 85% nas operações acompanhadas pela nossa metodologia. Vale sempre ressaltar que se trata de histórico auditado da nossa estrutura, e não de uma garantia individual de ganhos.'
  },
  {
    id: 'proof-2',
    title: 'Retorno Médio Anualizado Histórico',
    category: 'rentabilidade',
    statOrFact: 'Entre 45% e 60% ao ano',
    disclaimer: 'Retorno médio anualizado histórico apresentado nos relatórios internos da empresa. Mercado de renda variável possui volatilidade inerente.',
    speechText: 'O retorno médio anualizado histórico apresentado nos relatórios da empresa ficou entre 45% e 60%. Nós fazemos questão de mostrar esse histórico para você ver o poder do método, mas sem nunca transformar histórico em promessa fixa.'
  },
  {
    id: 'proof-3',
    title: 'Base de Alunos e Investidores',
    category: 'clientes',
    statOrFact: 'Mais de 5.000 clientes/investidores',
    disclaimer: 'Dados consolidados da base da Atlas Academy desde sua fundação.',
    speechText: 'Hoje já são mais de 5.000 investidores e alunos que passaram pela estrutura da Atlas Academy e utilizam nossas ferramentas e acompanhamentos semanais.'
  },
  {
    id: 'proof-4',
    title: 'Índice de Satisfação',
    category: 'satisfacao',
    statOrFact: '98% de satisfação',
    disclaimer: 'Levantamento interno de satisfação realizado com membros ativos dos programas de acompanhamento.',
    speechText: 'No nosso último levantamento interno com os membros ativos, alcançamos 98% de satisfação com o acompanhamento e o suporte dos mentores.'
  },
  {
    id: 'proof-5',
    title: 'Garantia Incondicional de 7 Dias',
    category: 'garantia',
    statOrFact: '7 dias de garantia incondicional de satisfação',
    disclaimer: 'Conforme Código de Defesa do Consumidor e termos de serviço da Atlas Academy. Devolução integral do valor investido se solicitado no prazo.',
    speechText: 'Você conta com a nossa garantia de satisfação incondicional de 7 dias. Você entra, participa dos encontros ao vivo, acessa toda a estrutura e, se por qualquer motivo sentir que não é para você, basta nos mandar uma mensagem que devolvemos 100% do seu investimento sem burocracia.'
  }
];

export const DEFAULT_QUICK_ANSWERS: QuickAnswer[] = [
  {
    id: 'qa-empresa',
    category: 'Empresa',
    questionSnippet: 'Quem é a Atlas Academy e onde fica?',
    exactAnswerScript: 'A Atlas Academy é uma instituição de educação e acompanhamento financeiro voltada para capacitar investidores em mercados locais e internacionais. Nós unimos formação prática, encontros ao vivo e acesso a ferramentas profissionais de mercado para que você nunca opere sozinho.',
    tone: 'Seguro, institucional e tranquilo.'
  },
  {
    id: 'qa-investimentos',
    category: 'Investimentos',
    questionSnippet: 'Vocês ficam com o meu dinheiro ou eu invisto direto na minha conta?',
    exactAnswerScript: 'Seu dinheiro fica 100% sob a sua titularidade e no seu controle na sua própria conta em corretora regulamentada. A Atlas não tem custódia nem acesso ao seu capital; o que nós fornecemos é o método, o acompanhamento, as análises e a estrutura educacional.',
    tone: 'Firme, transparente e direto.'
  },
  {
    id: 'qa-copytrade',
    category: 'CopyTrade',
    questionSnippet: 'Como funciona o CopyTrade e é obrigatório?',
    exactAnswerScript: 'O CopyTrade é uma ferramenta tecnológica onde ordens de analistas profissionais podem ser replicadas na sua conta caso você deseje. Ele não é obrigatório: você pode aprender a operar manualmente nos nossos encontros ao vivo, usar o CopyTrade como auxílio ou conciliar ambos.',
    tone: 'Didático e neutro.'
  },
  {
    id: 'qa-corretora',
    category: 'Corretora',
    questionSnippet: 'Qual corretora vocês usam e é confiável?',
    exactAnswerScript: 'Orientamos nossos alunos a utilizarem corretoras internacionais de primeira linha, devidamente reguladas por órgãos competentes (como FCA, CySEC ou ASIC), com segregação de contas e liquidez imediata para saques. Você é livre para escolher ou usar uma das recomendadas pela nossa equipe técnica.',
    tone: 'Transparente e tranquilizador.'
  },
  {
    id: 'qa-resultado',
    category: 'Resultado',
    questionSnippet: 'Em quanto tempo eu começo a ter resultado?',
    exactAnswerScript: 'Isso varia de acordo com a sua dedicação e velocidade de absorção. Já nos primeiros encontros semanais você consegue acompanhar as operações ao vivo e entender a lógica. Nosso foco é construir consistência sustentável nas primeiras semanas, evitando que você cometa erros comuns de principiante.',
    tone: 'Realista, sem falsas promessas.'
  },
  {
    id: 'qa-risco',
    category: 'Risco',
    questionSnippet: 'Qual é o risco de eu perder meu dinheiro?',
    exactAnswerScript: 'Todo mercado de renda variável envolve risco. A grande diferença de estar na Atlas é que você aprende e aplica gestão de risco profissional: limites rígidos de perda por operação e dimensionamento de lote, para que nenhum dia ruim abale o seu patrimônio.',
    tone: 'Consciente e profissional.'
  },
  {
    id: 'qa-garantia',
    category: 'Garantia',
    questionSnippet: 'Vocês dão garantia de que vou ganhar dinheiro?',
    exactAnswerScript: 'Nós garantimos a excelência da nossa metodologia, a entrega dos encontros ao vivo e todo o acompanhamento da nossa equipe técnica, além da garantia de satisfação de 7 dias com devolução total do valor do programa. Garantir ganho financeiro futuro no mercado seria desonesto e ilegal, e nós prezamos pela máxima transparência.',
    tone: 'Íntegro, firme e transparente.'
  },
  {
    id: 'qa-tempo',
    category: 'Outra',
    questionSnippet: 'Quanto tempo por dia eu preciso me dedicar?',
    exactAnswerScript: 'Com cerca de 30 a 45 minutos nos dias de encontro você já consegue acompanhar os alinhamentos e tirar dúvidas. Todos os encontros ficam gravados na plataforma caso você não consiga assistir ao vivo.',
    tone: 'Prático e tranquilizador.'
  }
];
