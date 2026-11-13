import { Course } from '../types';

export const EXPANDED_COURSES: Course[] = [
  // =================== IDIOMAS ===================
  {
    id: "c-port",
    title: "Língua Portuguesa: Gramática, Expressão & Redação",
    cat: "Idiomas & Comunicação",
    type: "language",
    duration: "30 Horas",
    lessonsCount: 6,
    level: "Iniciante a Avançado",
    desc: "Domina as regras de sintaxe, concordância verbal e nominal, regência, pontuação expressiva e estrutura de textos argumentativos de excelência.",
    prerequisites: "Nenhum pré-requisito.",
    progress: 0,
    lessons: [
      {
        id: "c-port-1",
        title: "Sintaxe da Oração — Sujeito, Predicado e Complementos",
        duration: "35 min",
        content: "A oração organiza-se em torno de um verbo ou locução verbal. O sujeito é o termo sobre o qual se declara algo, enquanto o predicado contém a informação declarada. Compreender a transitividade verbal (direto, indireto, intransitivo) é a chave para uma pontuação impecável.",
        grammarTip: "Nunca se separa o sujeito do predicado por vírgula!",
        exercise: {
          question: "Na frase 'Os cientistas da Mindora descobriram novos dados.', qual é o sujeito?",
          options: ["Os cientistas da Mindora", "descobriram novos dados", "novos dados", "Mindora"],
          correct: 0,
          explanation: "Quem praticou a ação verbal foram 'Os cientistas da Mindora', constituindo o sujeito simples."
        }
      },
      {
        id: "c-port-2",
        title: "Concordância Verbal & Casos Especiais",
        duration: "40 min",
        content: "O verbo concorda em número e pessoa com o seu sujeito. Atenção aos verbos impessoais como 'haver' (no sentido de existir) e 'fazer' (indicando tempo decorrido), que permanecem invariavelmente na 3ª pessoa do singular.",
        grammarTip: "Diz-se 'Havia muitos alunos' e não 'Haviam muitos alunos'.",
        exercise: {
          question: "Qual das frases está gramaticalmente correta quanto à concordância?",
          options: [
            "Havia três soluções para o problema.",
            "Haviam três soluções para o problema.",
            "Fazem dois anos que estudo aqui.",
            "Devem haver muitas dúvidas."
          ],
          correct: 0,
          explanation: "'Haver' no sentido de existir é impessoal e fica na 3ª pessoa do singular."
        }
      }
    ]
  },
  {
    id: "c-deu",
    title: "Alemão Prático: Do Zero ao B1",
    cat: "Idiomas & Comunicação",
    type: "language",
    duration: "36 Horas",
    lessonsCount: 5,
    level: "A1 a B1",
    desc: "Aprende alemão com lógica: os três géneros gramaticais (der, die, das), os casos essenciais (Nominativ, Akkusativ, Dativ) e conversação do quotidiano.",
    prerequisites: "Nenhum.",
    progress: 0,
    lessons: [
      {
        id: "c-deu-1",
        title: "Begrüßungen & Artigos Definidos (Der, Die, Das)",
        duration: "30 min",
        content: "Em alemão, os substantivos escrevem-se SEMPRE com letra maiúscula! Cada substantivo possui um de três géneros: masculino (der), feminino (die) ou neutro (das).",
        vocabulary: [
          { word: "Guten Tag", translation: "Bom dia / Boa tarde", phonetic: "/ˈɡuːtn̩ ˈtaːk/" },
          { word: "Danke schön", translation: "Muito obrigado", phonetic: "/ˈdaŋkə ʃøːn/" },
          { word: "Das Buch", translation: "O livro", phonetic: "/das buːx/" }
        ],
        exercise: {
          question: "Qual é a saudação formal comum durante o dia em alemão?",
          options: ["Guten Tag", "Gute Nacht", "Tschüss", "Auf Wiedersehen"],
          correct: 0,
          explanation: "'Guten Tag' é a forma de saudação universal durante o dia."
        }
      }
    ]
  },

  // =================== PROGRAMAÇÃO E TECNOLOGIA ===================
  {
    id: "c-html-css",
    title: "HTML5 & CSS3: Fundamentos da Web Semântica",
    cat: "Programação e Tecnologia",
    type: "tech",
    duration: "25 Horas",
    lessonsCount: 6,
    level: "Iniciante",
    desc: "Estruturação semântica de páginas web modernas, tags HTML5, folha de estilos CSS, Flexbox, Grid Layout, responsividade mobile e acessibilidade.",
    prerequisites: "Conhecimento básico do computador.",
    progress: 30,
    lessons: [
      {
        id: "c-html-1",
        title: "Estrutura do Documento HTML5 & Acessibilidade",
        duration: "35 min",
        content: "Um documento HTML5 começa com <!DOCTYPE html> e organiza-se com <head> (metadados, título, links) e <body> (conteúdo visível). Utiliza tags semânticas como <header>, <nav>, <main>, <article>, <section> e <footer> em vez de apenas <div> genéricas.",
        grammarTip: "Usa sempre o atributo 'alt' nas imagens para acessibilidade e leitores de ecrã.",
        exercise: {
          question: "Qual tag HTML5 semântica deve ser utilizada para agrupar links de navegação do site?",
          options: ["<nav>", "<menu>", "<header>", "<div>"],
          correct: 0,
          explanation: "<nav> indica explicitamente uma secção de links para navegação no site."
        }
      },
      {
        id: "c-css-1",
        title: "CSS Moderno: O Box Model, Flexbox & Alinhamentos",
        duration: "40 min",
        content: "O Box Model é composto por Conteúdo, Padding (espaçamento interno), Border (borda) e Margin (espaçamento externo). Com 'display: flex', o alinhamento de itens com 'justify-content' e 'align-items' torna-se instantâneo e responsivo.",
        grammarTip: "box-sizing: border-box; evita que o padding aumente o tamanho total calculado do elemento.",
        exercise: {
          question: "Qual propriedade Flexbox alinha os elementos ao longo do eixo transversal (vertical por padrão)?",
          options: ["align-items", "justify-content", "flex-direction", "display"],
          correct: 0,
          explanation: "'align-items' alinha no eixo cruzado (transversal), enquanto 'justify-content' alinha no eixo principal."
        }
      }
    ]
  },
  {
    id: "c-js",
    title: "JavaScript Moderno: Do ES6+ às Aplicações Reativas",
    cat: "Programação e Tecnologia",
    type: "tech",
    duration: "35 Horas",
    lessonsCount: 8,
    level: "Iniciante a Intermédio",
    desc: "Variáveis const/let, arrow functions, desestruturação, métodos de arrays (map, filter, reduce), manipulação do DOM e requisições assíncronas com fetch e Promises.",
    prerequisites: "HTML e CSS recomendados.",
    progress: 10,
    lessons: [
      {
        id: "c-js-1",
        title: "Fundamentos do ES6+: Variáveis, Tipos e Imutabilidade",
        duration: "40 min",
        content: "JavaScript moderno favorece 'const' para declarações que não serão reatribuídas e 'let' para variáveis mutáveis. Tipos primitivos incluem string, number, boolean, null, undefined e symbol.",
        exercise: {
          question: "O que acontece ao tentar reatribuir uma variável declarada com 'const'?",
          options: [
            "O motor JavaScript lança um TypeError.",
            "O valor é atualizado silenciosamente.",
            "A variável transforma-se em 'var'.",
            "O computador reinicia."
          ],
          correct: 0,
          explanation: "'const' cria uma referência de leitura constante que impede novas atribuições de identificador."
        }
      }
    ]
  },
  {
    id: "c-db",
    title: "Bases de Dados & Modelação SQL Relacional",
    cat: "Programação e Tecnologia",
    type: "tech",
    duration: "28 Horas",
    lessonsCount: 6,
    level: "Iniciante a Intermédio",
    desc: "Conceção de diagramas entidade-relacionamento (DER), tabelas, chaves primárias e estrangeiras, consultas com SELECT, JOINs, agregações e índices.",
    prerequisites: "Lógica básica.",
    progress: 0,
    lessons: [
      {
        id: "c-db-1",
        title: "Introdução ao Modelo Relacional & Comandos SQL Básicos",
        duration: "35 min",
        content: "Uma base de dados relacional organiza informações em tabelas com colunas (atributos) e linhas (registos). Comandos DDL (CREATE TABLE) definem a estrutura, enquanto DML (SELECT, INSERT, UPDATE, DELETE) manipulam os dados.",
        exercise: {
          question: "Qual cláusula SQL filtra os registos retornados por uma consulta SELECT?",
          options: ["WHERE", "ORDER BY", "GROUP BY", "LIMIT"],
          correct: 0,
          explanation: "A cláusula WHERE especifica as condições booleanas que os registos devem satisfazer."
        }
      }
    ]
  },
  {
    id: "c-games",
    title: "Desenvolvimento de Jogos: Lógica 2D & Motores",
    cat: "Programação e Tecnologia",
    type: "tech",
    duration: "30 Horas",
    lessonsCount: 6,
    level: "Intermédio",
    desc: "Game loops, renderização em Canvas 2D, deteção de colisões por caixas delimitadoras (AABB), física de saltos, controlo de inputs e estados de jogo.",
    prerequisites: "Lógica de programação ou JavaScript.",
    progress: 0,
    lessons: [
      {
        id: "c-game-1",
        title: "A Arquitetura do Game Loop: Update e Render",
        duration: "30 min",
        content: "Todo o jogo em tempo real baseia-se num Game Loop contínuo: 1) Captar Inputs do utilizador; 2) Atualizar posições físicas e lógicas (Update com deltaTime); 3) Desenhar o ecrã (Render).",
        exercise: {
          question: "Porque é que os motores de jogo utilizam o 'deltaTime' nas atualizações de física?",
          options: [
            "Para garantir que o movimento dos objetos é constante independentemente da taxa de FPS.",
            "Para aumentar o consumo de bateria do telemóvel.",
            "Para impedir o jogo de abrir.",
            "Para trocar as cores das personagens."
          ],
          correct: 0,
          explanation: "Multiplicar a velocidade pelo deltaTime garante que um segundo no mundo do jogo dura exatamente um segundo real."
        }
      }
    ]
  },

  // =================== ARTE E CRIATIVIDADE ===================
  {
    id: "c-art-desenho",
    title: "Desenho Básico: Formas, Linhas & Sombras",
    cat: "Arte e Criatividade",
    type: "tech",
    duration: "24 Horas",
    lessonsCount: 6,
    level: "Iniciante",
    desc: "Aprende a desenhar com método: postura da mão, desconstrução de objetos em formas geométricas primitivas (esferas, cilindros, cubos), hachuras e valores tonais.",
    prerequisites: "Nenhum. Apenas papel ou o nosso quadro digital.",
    progress: 0,
    lessons: [
      {
        id: "c-art-1",
        title: "Desconstrução em Formas Geométricas Primitivas",
        duration: "30 min",
        content: "Qualquer objeto complexo no universo — desde uma maçã até um automóvel — pode ser simplificado em quatro formas tridimensionais fundamentais: a esfera, o cilindro, o cone e a caixa cúbica. Ao dominar estas formas, desenhas qualquer coisa com volume convincente.",
        exercise: {
          question: "Qual forma tridimensional é a melhor base geométrica para esboçar a cabeça humana?",
          options: ["Uma esfera combinada com um bloco mandíbular", "Um triângulo plano", "Uma pirâmide reta", "Uma linha reta"],
          correct: 0,
          explanation: "O método clássico (como o de Andrew Loomis) inicia o crânio através de uma esfera tridimensional cortada nas laterais."
        }
      },
      {
        id: "c-art-2",
        title: "A Escala de Valores Tonais & Luz e Sombra",
        duration: "35 min",
        content: "O valor tonal é a luminosidade ou escuridão relativa de uma cor. Uma iluminação convincente possui: Luz Direta, Meio-Tom, Sombra Própria (Core Shadow), Luz Refletida e Sombra Projetada (Cast Shadow).",
        exercise: {
          question: "O que é a 'Luz Refletida' num objeto esférico iluminado?",
          options: [
            "A luz que rebate do solo ou superfície próxima e clareia a zona de sombra do objeto.",
            "A luz do sol que queima o papel.",
            "Um erro de pintura.",
            "A sombra mais escura debaixo do objeto."
          ],
          correct: 0,
          explanation: "A luz refletida provém do ambiente adjacente e dá tridimensionalidade à zona de penumbra."
        }
      }
    ]
  },
  {
    id: "c-art-persp",
    title: "Perspetiva Linear e Proporção Espacial",
    cat: "Arte e Criatividade",
    type: "tech",
    duration: "20 Horas",
    lessonsCount: 5,
    level: "Iniciante a Intermédio",
    desc: "Linha do horizonte, ponto de fuga único, perspetiva com 2 e 3 pontos de fuga, escorço e ilusão de profundidade em cenários e arquitetura.",
    prerequisites: "Desenho básico.",
    progress: 0,
    lessons: [
      {
        id: "c-persp-1",
        title: "A Linha do Horizonte & Perspetiva com 1 Ponto de Fuga",
        duration: "30 min",
        content: "A linha do horizonte representa exatamente o nível dos olhos do observador. Todas as linhas de profundidade (linhas ortogonais) convergem para um único Ponto de Fuga situado nessa linha.",
        exercise: {
          question: "Se a linha do horizonte estiver situada muito alta na folha de desenho, qual é o ponto de vista?",
          options: [
            "Ponto de vista elevado (visão aérea ou olho de pássaro).",
            "Ponto de vista ao nível do chão (olho de formiga).",
            "Ponto de vista nulo.",
            "Visão subaquática."
          ],
          correct: 0,
          explanation: "Um horizonte alto mostra o observador num plano elevado olhando para baixo sobre o cenário."
        }
      }
    ]
  },
  {
    id: "c-art-cores",
    title: "Teoria das Cores & Pintura: Harmonia e Pigmentos",
    cat: "Arte e Criatividade",
    type: "tech",
    duration: "22 Horas",
    lessonsCount: 5,
    level: "Iniciante a Intermédio",
    desc: "Cores primárias, secundárias e terciárias, temperatura de cor (quente vs fria), saturação, valor, contraste cromático e misturas em aguarela e acrílico.",
    prerequisites: "Nenhum.",
    progress: 0,
    lessons: [
      {
        id: "c-cor-1",
        title: "A Roda das Cores & Temperatura Cromática",
        duration: "30 min",
        content: "Cores quentes (vermelhos, laranjas, amarelos) transmitem energia, calor e parecem avançar no espaço visual. Cores frias (azuis, verdes, violetas) transmitem serenidade, distância e parecem recuar.",
        exercise: {
          question: "Na roda de cores tradicional, qual é a cor complementar do Azul?",
          options: ["Laranja", "Amarelo", "Verde", "Roxo"],
          correct: 0,
          explanation: "O Laranja está exatamente oposto ao Azul na roda cromática, gerando contraste máximo."
        }
      }
    ]
  },

  // =================== DESIGN E MULTIMÉDIA ===================
  {
    id: "c-design-graf",
    title: "Design Gráfico & Princípios da Composição Visual",
    cat: "Design e Multimédia",
    type: "tech",
    duration: "26 Horas",
    lessonsCount: 6,
    level: "Iniciante a Intermédio",
    desc: "Hierarquia visual, tipografia, grelha (grid system), espaços em branco, alinhamento, consistência e criação de identidades visuais de impacto.",
    prerequisites: "Nenhum.",
    progress: 0,
    lessons: [
      {
        id: "c-des-1",
        title: "Os 4 Princípios de Robin Williams (C.R.A.P.)",
        duration: "35 min",
        content: "Contraste (Contrast), Repetição (Repetition), Alinhamento (Alignment) e Proximidade (Proximity). Aplicar estes quatro princípios transforma instantaneamente qualquer layout confuso numa peça profissional.",
        exercise: {
          question: "O princípio da 'Proximidade' no design gráfico estabelece que:",
          options: [
            "Itens relacionados entre si devem estar visualmente agrupados para formar uma unidade conceptual.",
            "Todos os elementos devem estar encostados aos cantos da folha.",
            "Não deve haver espaço em branco.",
            "Todas as letras devem ser vermelhas."
          ],
          correct: 0,
          explanation: "Agrupar elementos afins reduz a poluição visual e guia a ordem natural de leitura do olho humano."
        }
      }
    ]
  },
  {
    id: "c-video-foto",
    title: "Fotografia, Iluminação & Edição de Vídeo",
    cat: "Design e Multimédia",
    type: "tech",
    duration: "28 Horas",
    lessonsCount: 6,
    level: "Iniciante a Intermédio",
    desc: "O triângulo da exposição (Abertura, Velocidade do Obturador, ISO), enquadramento (regra dos terços), iluminação de 3 pontos e montagem rítmica de vídeo.",
    prerequisites: "Nenhum.",
    progress: 0,
    lessons: [
      {
        id: "c-foto-1",
        title: "O Triângulo da Exposição Fotográfica",
        duration: "35 min",
        content: "A exposição correta de uma imagem depende do equilíbrio harmónico entre: 1) Abertura do diafragma (f/stop - controla a profundidade de campo); 2) Velocidade do obturador (controla o congelamento do movimento); 3) Sensibilidade ISO (sensibilidade do sensor à luz).",
        exercise: {
          question: "Qual abertura de diafragma produz um fundo mais desfocado (efeito bokeh / pouca profundidade de campo)?",
          options: ["f/1.8", "f/16", "f/22", "f/11"],
          correct: 0,
          explanation: "Números f menores (como f/1.8) indicam uma abertura física maior, gerando profundidade de campo rasa e fundo desfocado."
        }
      }
    ]
  },

  // =================== CIÊNCIAS E CONHECIMENTOS GERAIS ===================
  {
    id: "c-geo",
    title: "Geografia Global: Climatologia, Relevo & Geopolítica",
    cat: "Ciências e Conhecimentos Gerais",
    type: "tech",
    duration: "25 Horas",
    lessonsCount: 5,
    level: "Iniciante a Intermédio",
    desc: "Fusos horários, tectónica de placas, relevo, correntes oceânicas, biomas mundiais, demografia, urbanização e transição energética sustentável.",
    prerequisites: "Nenhum.",
    progress: 0,
    lessons: [
      {
        id: "c-geo-1",
        title: "Cartografia, Coordenadas Geográficas & Fusos Horários",
        duration: "35 min",
        content: "A Terra divide-se em 360 graus de longitude. Como o dia tem 24 horas, cada fuso horário abrange 15 graus de longitude (360° / 24 = 15° por hora). A contagem parte do Meridiano de Greenwich (UTC 0).",
        exercise: {
          question: "Se em Londres (UTC 0) são 12:00, que horas são numa cidade no fuso UTC +4?",
          options: ["16:00", "08:00", "14:00", "20:00"],
          correct: 0,
          explanation: "A este de Greenwich soma-se o número de fusos: 12:00 + 4 horas = 16:00."
        }
      }
    ]
  },
  {
    id: "c-hist",
    title: "História Mundial: Das Primeiras Civilizações à Era Digital",
    cat: "Ciências e Conhecimentos Gerais",
    type: "tech",
    duration: "30 Horas",
    lessonsCount: 6,
    level: "Iniciante a Intermédio",
    desc: "Revolução Agrícola no Crescente Fértil, Grécia e Roma clássicas, Idade Média, Renascimento, Expansão Marítima, Revolução Industrial e o Século XX.",
    prerequisites: "Nenhum.",
    progress: 0,
    lessons: [
      {
        id: "c-hist-1",
        title: "A Revolução Agrícola e o Nascimento das Cidades",
        duration: "30 min",
        content: "No Neolítico, a transição de grupos nómadas recolectores para comunidades sedentárias agrícolas permitiu a domesticação de plantas e animais, a divisão social do trabalho e o surgimento das primeiras cidades na Mesopotâmia e Vale do Nilo.",
        exercise: {
          question: "Qual foi a consequência direta do excedente agrícola nas primeiras civilizações?",
          options: [
            "Permitiu a especialização do trabalho (artesãos, escribas, sacerdotes e governantes).",
            "O regresso ao nomadismo permanente.",
            "O desaparecimento das cidades.",
            "A proibição do comércio."
          ],
          correct: 0,
          explanation: "Com alimento suficiente produzido por parte da população, outros indivíduos puderam dedicar-se ao comércio, engenharia, leis e ciência."
        }
      }
    ]
  }
];
