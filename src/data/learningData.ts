import { Subject, Course, Badge } from '../types';
import { ALL_MATH_MODULES, MATH_FINAL_ASSESSMENTS } from './curriculum/mathFullCurriculum';
import { PHYSICS_MODULES, PHYSICS_FINAL_ASSESSMENTS } from './curriculum/physicsCurriculum';
import { CHEMISTRY_MODULES, BIOLOGY_MODULES } from './curriculum/sciencesCurriculum';
import { HUMANITIES_CURRICULUM } from './curriculum/humanitiesCurriculum';
import { TECH_MODULES, TECH_FINAL_ASSESSMENTS } from './curriculum/techCurriculum';
import { ENGLISH_A1_C2_CURRICULUM } from './curriculum/languagesCurriculum';
import { EXPANDED_COURSES } from './coursesData';

export const SUBJECTS: Subject[] = [
  {
    id: "mat",
    name: "Matemática",
    category: "Exatas",
    icon: "📐",
    level: "Iniciante",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    intro: "A Matemática desenvolve o raciocínio lógico dedutivo, o cálculo quantitativo e a capacidade de modelar qualquer fenómeno real ou abstrato através de fórmulas rigorosas.",
    objectives: [
      "Dominar operações com polinómios e resolução de equações de 1º e 2º graus",
      "Calcular perímetros, áreas planas e volumes no espaço tridimensional",
      "Compreender funções trigonométricas e aplicações práticas em ondas e física"
    ],
    topics: [
      { title: "Álgebra Linear e Equações", desc: "Incógnitas, expressões de 1º e 2º graus, fatorização e sistemas lineares." },
      { title: "Geometria Euclidiana e Espacial", desc: "Teorema de Pitágoras, áreas de polígonos, círculos e volumes de prismas e cones." },
      { title: "Trigonometria e Funções", desc: "Seno, cosseno, tangente no círculo trigonométrico e gráficos periódicos." }
    ],
    modules: ALL_MATH_MODULES,
    finalAssessments: MATH_FINAL_ASSESSMENTS,
    example: "Teorema de Pitágoras num triângulo retângulo com catetos a = 3 e b = 4:\n c² = a² + b²\n c² = 3² + 4² = 9 + 16 = 25\n c = √25 = 5.",
    exercise: {
      q: "Qual é o valor de x na equação de 1º grau: 2x + 8 = 20?",
      options: ["x = 4", "x = 6", "x = 8", "x = 12"],
      correct: 1,
      hint: "Subtrai 8 a 20 (obtendo 12) e depois divide 12 por 2.",
      explanation: "2x + 8 = 20 ➔ 2x = 20 - 8 ➔ 2x = 12 ➔ x = 6."
    },
    glossary: [
      { term: "Incógnita", definition: "Valor numérico desconhecido representado por uma letra numa equação." },
      { term: "Hipotenusa", definition: "O lado mais longo de um triângulo retângulo, oposto ao ângulo de 90°." }
    ],
    summary: "A álgebra e geometria fornecem as ferramentas elementares para quantificar relações espaciais e resolver problemas em todas as ciências exatas."
  },
  {
    id: "fis",
    name: "Física",
    category: "Exatas",
    icon: "⚡",
    level: "Intermédio",
    badgeColor: "bg-sky-100 text-sky-700 border-sky-200",
    intro: "A Física analisa a constituição da matéria, a conversão de energia, o espaço e o tempo através de modelos matemáticos e verificação empírica.",
    objectives: [
      "Aplicar as 3 Leis de Newton à dinâmica de corpos celestes e terrenos",
      "Compreender conservação de energia mecânica, cinética e potencial",
      "Analisar circuitos elétricos, voltagem, corrente e resistência (Lei de Ohm)"
    ],
    topics: [
      { title: "Mecânica Clássica & Cinemática", desc: "Velocidade média, aceleração, forças de atrito e gravitação universal." },
      { title: "Termodinâmica & Calor", desc: "Calorimetria, escalas de temperatura e as três leis da termodinâmica." },
      { title: "Eletromagnetismo", desc: "Cargas elétricas, Lei de Ohm (V = R × I) e indução de Faraday." }
    ],
    modules: PHYSICS_MODULES,
    finalAssessments: PHYSICS_FINAL_ASSESSMENTS,
    example: "Segunda Lei de Newton: F = m × a.\nPara uma massa m = 5 kg com aceleração a = 3 m/s²:\n F = 5 kg × 3 m/s² = 15 N (Newtons de força resultante).",
    exercise: {
      q: "Se um corpo tem massa de 5 kg e aceleração de 3 m/s², qual é a força resultante?",
      options: ["8 N", "15 N", "2 N", "0.6 N"],
      correct: 1,
      hint: "Aplica a fórmula F = m · a.",
      explanation: "F = 5 kg × 3 m/s² = 15 Newtons."
    },
    glossary: [
      { term: "Newton (N)", definition: "Unidade de força no Sistema Internacional equivalente a 1 kg·m/s²." },
      { term: "Energia Cinética", definition: "Energia que um corpo possui em virtude do seu movimento (Ec = 1/2 m v²)." }
    ]
  },
  {
    id: "qui",
    name: "Química",
    category: "Exatas",
    icon: "🧪",
    level: "Intermédio",
    badgeColor: "bg-teal-100 text-teal-700 border-teal-200",
    intro: "A Química estuda as transformações moleculares, átomos, ligações iónicas e covalentes, e reações entre substâncias.",
    objectives: [
      "Compreender a tabela periódica, eletronegatividade e raios atómicos",
      "Equacionar reações químicas e calcular estequiometria em moles",
      "Reconhecer funções orgânicas essenciais na bioquímica e farmacologia"
    ],
    topics: [
      { title: "Tabela Periódica & Ligações", desc: "Eletrões de valência, ligações iónicas, covalentes e metálicas." },
      { title: "Estequiometria & Soluções", desc: "Massa molar, constante de Avogadro (6.022 × 10²³) e concentração molar." },
      { title: "Química Orgânica", desc: "Hidrocarbonetos, álcoois, cetonas, aldeídos e ácidos carboxílicos." }
    ],
    modules: CHEMISTRY_MODULES,
    example: "Síntese da Água:\n 2H₂ (g) + O₂ (g) → 2H₂O (l)\n2 moles de gás hidrogénio reagem com 1 mole de oxigénio gerando 2 moles de água líquida.",
    exercise: {
      q: "Qual é o símbolo químico representativo do elemento Ouro?",
      options: ["Ag", "Fe", "Au", "Cu"],
      correct: 2,
      hint: "O símbolo deriva do étimo latino 'Aurum'.",
      explanation: "Au provém do latim 'Aurum' (brilho do sol). Ag é prata, Fe é ferro e Cu é cobre."
    }
  },
  {
    id: "bio",
    name: "Biologia",
    category: "Biológicas & Terra",
    icon: "🧬",
    level: "Iniciante",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    intro: "A Biologia investiga a vida, desde a estrutura molecular do DNA até às interações complexas dos ecossistemas planetários.",
    objectives: [
      "Distinguir células procarióticas e eucarióticas e funções dos organelos",
      "Compreender o código genético, transcrição de RNA e tradução proteica",
      "Analisar teias tróficas, ciclos de carbono e seleção natural"
    ],
    topics: [
      { title: "Citologia & Metabolismo Celular", desc: "Mitocôndrias, cloroplastos, ribossomas e respiração aeróbica." },
      { title: "Genética & Hereditariedade", desc: "Estrutura do DNA, genes, alelos dominantes/recessivos e mutações." },
      { title: "Ecologia & Evolução", desc: "Relações simbióticas, biomas e adaptações evolutivas darwinianas." }
    ],
    modules: BIOLOGY_MODULES,
    example: "Equação da Fotossíntese:\n 6CO₂ + 6H₂O + Luz Solar → C₆H₁₂O₆ (glicose) + 6O₂\nOcorre nos cloroplastos com a absorção de luz pela clorofila.",
    exercise: {
      q: "Qual organelo celular é conhecido como a central de energia da célula (produção de ATP)?",
      options: ["Ribossoma", "Complexo de Golgi", "Mitocôndria", "Lisossoma"],
      correct: 2,
      hint: "É o local da respiração celular aeróbica.",
      explanation: "A mitocôndria é responsável pela oxidação da glicose e geração de ATP."
    }
  },
  {
    id: "cien",
    name: "Ciências Naturais",
    category: "Biológicas & Terra",
    icon: "🌿",
    level: "Iniciante",
    badgeColor: "bg-green-100 text-green-700 border-green-200",
    intro: "Estudo integrado dos fenómenos físicos, geológicos e biológicos do planeta Terra e do meio ambiente sustentável.",
    objectives: [
      "Compreender o ciclo da água, das rochas e os recursos hídricos",
      "Identificar ecossistemas terrestres e marinhos e sua preservação",
      "Reconhecer fontes de energia renováveis e pegada ecológica"
    ],
    topics: [
      { title: "A Terra e os seus Sistemas", desc: "Litosfera, hidrosfera, atmosfera e biosfera." },
      { title: "Ciclos Naturais & Recursos", desc: "Evaporação, condensação, lençóis freáticos e conservação do solo." },
      { title: "Biodiversidade & Cadeias Alimentares", desc: "Produtores, consumidores, decompositores e equilíbrio dinâmico." }
    ],
    example: "Ciclo Hidrológico: A evaporação da água dos oceanos e transpiração vegetal formam nuvens que precipitam em chuva, reabastecendo rios e aquíferos.",
    exercise: {
      q: "Numa cadeia alimentar, qual organismo é considerado o produtor primário?",
      options: ["Leão", "Planta com fotossíntese", "Fungo decompositor", "Gafanhoto herbívoro"],
      correct: 1,
      hint: "Organismo autotrófico capaz de converter luz solar em biomassa.",
      explanation: "As plantas realizam fotossíntese e formam a base energética primária de toda a teia trófica."
    }
  },
  {
    id: "por",
    name: "Português",
    category: "Línguas",
    icon: "📚",
    level: "Iniciante",
    badgeColor: "bg-cyan-100 text-cyan-700 border-cyan-200",
    intro: "Domínio da norma culta da língua portuguesa: sintaxe da oração, regência verbal, coesão, coerência e produção textual.",
    objectives: [
      "Dominar o emprego correto da crase e regência verbal/nominal",
      "Analisar períodos compostos por coordenação e subordinação",
      "Escrever dissertações argumentativas estruturadas com clareza e elegância"
    ],
    topics: [
      { title: "Sintaxe & Regência", desc: "Sujeito, predicado, complementos diretos/indiretos e crase." },
      { title: "Morfologia & Concordância", desc: "Classes gramaticais, modos verbais (indicativo, conjuntivo) e concordância." },
      { title: "Coesão & Redação Argumentativa", desc: "Conectores lógicos, tese, desenvolvimento de argumentos e conclusão." }
    ],
    modules: HUMANITIES_CURRICULUM.pt,
    example: "Teste de crase com troca de género:\n 'Fui à biblioteca' (à = a preposição + a artigo feminino)\n Substituindo por masculino: 'Fui ao colégio' (o aparecimento de 'ao' confirma a crase).",
    exercise: {
      q: "Qual das frases apresenta o uso correto e obrigatório da crase?",
      options: [
        "Entreguei o documento à diretora.",
        "Chegamos à pé ao destino pretendido.",
        "Ele começou à chorar de emoção.",
        "Dei os parabéns à você."
      ],
      correct: 0,
      hint: "Não ocorre crase antes de verbos, palavras masculinas ou pronomes pessoais.",
      explanation: "'À diretora' exige crase (preposição 'a' exigida por 'entregar' + artigo feminino 'a')."
    }
  },
  {
    id: "lit",
    name: "Literatura",
    category: "Humanas",
    icon: "✒️",
    level: "Intermédio",
    badgeColor: "bg-rose-100 text-rose-700 border-rose-200",
    intro: "Viagem pelas grandes eras literárias, estéticas, poemas e romances clássicos em língua portuguesa e universal.",
    objectives: [
      "Reconhecer as características do Renascimento, Barroco, Romantismo e Realismo",
      "Analisar obras seminais de Camões, Fernando Pessoa, Machado de Assis e Saramago",
      "Identificar figuras de estilo e recursos poéticos como metáfora e metonímia"
    ],
    topics: [
      { title: "O Classicismo & Os Lusíadas", desc: "Luís Vaz de Camões, épica renascentista, decassílabos e mitologia greco-latina." },
      { title: "O Romantismo & Realismo", desc: "Idealismo romântico vs crítica social e psicologia realista de Eça de Queirós e Machado." },
      { title: "Modernismo & Heterónimos", desc: "Fernando Pessoa e os seus heterónimos (Álvaro de Campos, Ricardo Reis, Alberto Caeiro)." }
    ],
    example: "Verso de Camões em 'Amor é um fogo que arde sem se ver': Antíteses poéticas para expressar a natureza contraditória do sentimento humano.",
    exercise: {
      q: "Quem criou os heterónimos Alberto Caeiro, Álvaro de Campos e Ricardo Reis?",
      options: ["Luís de Camões", "Fernando Pessoa", "Eça de Queirós", "José Saramago"],
      correct: 1,
      hint: "O grande poeta modernista português nascido em Lisboa.",
      explanation: "Fernando Pessoa desdobrou a sua criação lírica em múltiplos heterónimos com biografias e estilos poéticos próprios."
    }
  },
  {
    id: "ing",
    name: "Inglês",
    category: "Línguas",
    icon: "🇬🇧",
    level: "Iniciante",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    intro: "A língua franca mundial: gramática prática, phrasal verbs, pronúncia fonética e comunicação para trabalho e viagens.",
    objectives: [
      "Diferenciar tempos verbais essenciais como Past Simple e Present Perfect",
      "Dominar vocabulário corporativo para emails e reuniões internacionais",
      "Praticar compreensão oral e escrita em situações do dia a dia"
    ],
    topics: [
      { title: "Verb Tenses in Action", desc: "Present Simple vs Continuous, Past Simple, Present Perfect e Future forms." },
      { title: "Phrasal Verbs & Idioms", desc: "Expressões idiomáticas vitais: 'carry out', 'look forward to', 'break down'." },
      { title: "Business English", desc: "Comunicação profissional, negociações, relatórios e apresentações formais." }
    ],
    example: "Present Perfect vs Past Simple:\n Past Simple: 'I visited Rome in 2021.' (momento específico passado)\n Present Perfect: 'I have visited Rome three times.' (experiência de vida).",
    exercise: {
      q: "Which sentence correctly uses the Present Perfect tense?",
      options: [
        "She is traveling to London right now.",
        "She has lived in London for two years.",
        "She lived in London yesterday.",
        "She will live in London next year."
      ],
      correct: 1,
      hint: "Has/Have + past participle connecting the past to present.",
      explanation: "'She has lived' is the Present Perfect structure indicating an action with relevance to the present."
    }
  },
  {
    id: "fra",
    name: "Francês",
    category: "Línguas",
    icon: "🇫🇷",
    level: "Iniciante",
    badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    intro: "Aprende a língua da cultura e diplomacia: fonética, conjugação com être e avoir, artigos partitivos e diálogos fluídos.",
    objectives: [
      "Conhecer as saudações e regras de cortesia formal (vous) e informal (tu)",
      "Formar o Passé Composé com os auxiliares corretos e concordância",
      "Construir vocabulário para restaurante, deslocações e ambiente de trabalho"
    ],
    topics: [
      { title: "Les Présentations & Salutations", desc: "Fórmulas de cortesia, números e artigos definidos e indefinidos." },
      { title: "Le Passé Composé & Imparfait", desc: "Construção do tempo passado com avoir e être." },
      { title: "Vocabulaire du Quotidien", desc: "Orientações espaciais, culinária e vocabulário prático." }
    ],
    example: "'Bonjour ! Je m'appelle Claire, je suis étudiante et j'habite à Paris depuis deux mois.'",
    exercise: {
      q: "Como se traduz a expressão 'Muito obrigado' para francês?",
      options: ["De rien", "Merci beaucoup", "S'il vous plaît", "À bientôt"],
      correct: 1,
      hint: "'Merci' é obrigado e 'beaucoup' significa muito.",
      explanation: "'Merci beaucoup' é a forma corrente de expressar grande gratidão em francês."
    }
  },
  {
    id: "esp",
    name: "Espanhol",
    category: "Línguas",
    icon: "🇪🇸",
    level: "Iniciante",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    intro: "Comunicação em língua espanhola: cuidado com falsos amigos (heterossemânticos), riqueza de pretéritos e modo subjuntivo.",
    objectives: [
      "Evitar os erros mais comuns causados pela proximidade com o português",
      "Diferenciar com precisão o emprego dos verbos Ser, Estar e Haber",
      "Expressar hipóteses e desejos utilizando o modo subjuntivo"
    ],
    topics: [
      { title: "Falsos Amigos (Heterosemánticos)", desc: "Palavras como apellido, embarazada, propina, largo e exquisito." },
      { title: "Ser, Estar y Haber", desc: "Estados permanentes, temporários e existência de coisas com 'hay'." },
      { title: "Tiempos del Pasado", desc: "Pretérito Indefinido vs Pretérito Perfecto." }
    ],
    example: "Cuidado com falsos amigos: 'Embarazada' significa grávida (e não envergonhada, que é 'avergonzada'). 'Apellido' é sobrenome (alcunha é 'apodo').",
    exercise: {
      q: "Em espanhol, o que significa concretamente a palavra 'Apellido'?",
      options: ["Alcunha carinhosa", "Primeiro nome de batismo", "Sobrenome de família", "Grau de parentesco"],
      correct: 2,
      hint: "Alcunha é 'apodo'; 'apellido' é o nome de família.",
      explanation: "'Apellido' designa o apelido de família / sobrenome do indivíduo."
    }
  },
  {
    id: "his",
    name: "História",
    category: "Humanas",
    icon: "🏛️",
    level: "Iniciante",
    badgeColor: "bg-orange-100 text-orange-700 border-orange-200",
    intro: "Análise crítica dos grandes marcos da humanidade: da democracia ateniense às revoluções industriais e à globalização contemporânea.",
    objectives: [
      "Compreender a evolução das instituições democráticas e repúblicas",
      "Analisar o impacto do Iluminismo e da Revolução Francesa nos direitos humanos",
      "Examinar as causas e desfechos das duas Guerras Mundiais e da Guerra Fria"
    ],
    topics: [
      { title: "Antiguidade Clássica", desc: "A pólis grega, o império romano e o nascimento da cidadania." },
      { title: "As Grandes Revoluções Modernas", desc: "Iluminismo, Revolução Americana e a Tomada da Bastilha em 1789." },
      { title: "O Século XX Contemporâneo", desc: "Primeira e Segunda Guerras Mundiais, descolonização e a queda do Muro de Berlim." }
    ],
    modules: HUMANITIES_CURRICULUM.his,
    example: "A Tomada da Bastilha em Paris (14 de julho de 1789) simbolizou a queda do absolutismo e o nascimento dos ideais de Liberdade, Igualdade e Fraternidade.",
    exercise: {
      q: "Em que ano teve início formal a Primeira Guerra Mundial na Europa?",
      options: ["1914", "1939", "1889", "1918"],
      correct: 0,
      hint: "Iniciou no verão de 1914 após o atentado de Sarajevo.",
      explanation: "A Primeira Guerra Mundial iniciou em 1914 e terminou com o armistício em novembro de 1918."
    }
  },
  {
    id: "geo",
    name: "Geografia",
    category: "Humanas",
    icon: "🌍",
    level: "Iniciante",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    intro: "Dinâmicas territoriais: placas tectónicas, climas planetários, pirâmides etárias, cartografia e geopolítica económica.",
    objectives: [
      "Calcular fusos horários e interpretar escalas e coordenadas geográficas",
      "Compreender os principais biomas e o impacto das correntes marítimas",
      "Analisar a transição demográfica, urbanização e blocos económicos continentais"
    ],
    topics: [
      { title: "Geografia Física & Climatologia", desc: "Tectónica de placas, tipos de relevo, circulação atmosférica e biomas." },
      { title: "Cartografia & Coordenadas", desc: "Latitude, longitude, projeções cartográficas e fusos GMT." },
      { title: "Geopolítica & População", desc: "Pirâmides etárias, fluxos migratórios e alianças económicas mundiais." }
    ],
    modules: HUMANITIES_CURRICULUM.geo,
    example: "A Linha do Equador corresponde ao paralelo de latitude 0°, dividindo a Terra nos hemisférios Norte e Sul.",
    exercise: {
      q: "Qual é o maior continente do planeta Terra tanto em extensão territorial quanto em população?",
      options: ["América", "África", "Ásia", "Europa"],
      correct: 2,
      hint: "Abrange países como China, Índia e Japão.",
      explanation: "A Ásia é o maior continente do planeta, cobrindo cerca de 30% da área terrestre e mais de 60% da população mundial."
    }
  },
  {
    id: "fil",
    name: "Filosofia",
    category: "Humanas",
    icon: "💭",
    level: "Intermédio",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    intro: "Investigação do pensamento, da ética, do conhecimento e do sentido da existência humana desde a Grécia Antiga.",
    objectives: [
      "Compreender o método socrático e a alegoria da caverna de Platão",
      "Analisar a ética aristotélica, o imperativo categórico kantiano e o utilitarismo",
      "Debater questões contemporâneas de bioética, inteligência artificial e liberdade"
    ],
    topics: [
      { title: "Filosofia Antiga", desc: "Sócrates ('Só sei que nada sei'), Platão e a metafísica de Aristóteles." },
      { title: "Epistemologia & Racionalismo", desc: "Descartes ('Penso, logo existo') vs Empirismo de John Locke e David Hume." },
      { title: "Ética & Filosofia Política", desc: "O contrato social (Hobbes, Locke, Rousseau) e o imperativo categórico de Kant." }
    ],
    example: "O 'Cogito, ergo sum' de Descartes: Ao duvidar de tudo, conclui que o próprio ato de duvidar prova indiscutivelmente a sua existência como ser pensante.",
    exercise: {
      q: "Qual filósofo formulou a máxima célebre 'Penso, logo existo' (Cogito, ergo sum)?",
      options: ["René Descartes", "Immanuel Kant", "Friedrich Nietzsche", "Sócrates"],
      correct: 0,
      hint: "Pai do racionalismo moderno francês no 'Discurso do Método'.",
      explanation: "Descartes utilizou a dúvida metódica radical para encontrar uma verdade indubitável: a existência do ser pensante."
    }
  },
  {
    id: "soc",
    name: "Sociologia",
    category: "Sociedade & Negócios",
    icon: "👥",
    level: "Intermédio",
    badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    intro: "Estudo científico das estruturas sociais, instituições, desigualdades, culturas e transformações coletivas da humanidade.",
    objectives: [
      "Conhecer as teorias clássicas de Karl Marx, Émile Durkheim e Max Weber",
      "Compreender conceitos de estratificação social, anomia e ação social",
      "Analisar a sociedade em rede, globalização e novas formas de trabalho"
    ],
    topics: [
      { title: "Os Clássicos da Sociologia", desc: "Fatos sociais de Durkheim, luta de classes de Marx e tipos de ação de Weber." },
      { title: "Instituições & Socialização", desc: "Família, escola, religião, estado e reprodução cultural." },
      { title: "A Sociedade Contemporânea", desc: "Modernidade líquida (Zygmunt Bauman) e a era da informação digital." }
    ],
    example: "Conceito de Fato Social de Durkheim: Maneiras de agir, pensar e sentir exteriores ao indivíduo e dotadas de um poder de coerção (ex: a língua, a moeda, as leis).",
    exercise: {
      q: "Quem cunhou o termo 'Modernidade Líquida' para caracterizar a fluidez das relações contemporâneas?",
      options: ["Émile Durkheim", "Zygmunt Bauman", "Max Weber", "Karl Marx"],
      correct: 1,
      hint: "Sociólogo polaco que analisou o individualismo e a fragilidade dos laços humanos.",
      explanation: "Zygmunt Bauman descreveu a modernidade líquida como uma época em que tudo é transitório e mutável."
    }
  },
  {
    id: "inf",
    name: "Informática",
    category: "Tecnologia",
    icon: "💻",
    level: "Iniciante",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    intro: "Arquitetura de sistemas informáticos, redes, hardware, protocolos da Internet e princípios de cibersegurança.",
    objectives: [
      "Compreender a diferença entre CPU, RAM volátil e discos SSD",
      "Entender como funciona o roteamento TCP/IP, DNS e HTTP/HTTPS",
      "Aplicar práticas essenciais de cibersegurança e proteção de dados pessoais"
    ],
    topics: [
      { title: "Hardware & Arquitetura", desc: "Placa-mãe, processadores multi-core, barramentos e memórias cache." },
      { title: "Redes & Protocolos", desc: "Modelo OSI, endereços IPv4 e IPv6, servidores Web e portas de rede." },
      { title: "Segurança Digital", desc: "Criptografia simétrica e assimétrica, phishing e autenticação de 2 fatores." }
    ],
    modules: TECH_MODULES,
    finalAssessments: TECH_FINAL_ASSESSMENTS,
    example: "Um endereço IPv4 é formado por 32 bits divididos em 4 octetos decimais (ex: 192.168.1.1), permitindo cerca de 4,3 mil milhões de endereços únicos.",
    exercise: {
      q: "Qual dos seguintes componentes é responsável pela execução direta das instruções de programas (CPU)?",
      options: ["Memória RAM", "Processador (CPU)", "Disco Rígido SSD", "Placa de Vídeo apenas"],
      correct: 1,
      hint: "Considerado o cérebro central do computador.",
      explanation: "A Unidade Central de Processamento (CPU) busca, decodifica e executa todas as instruções fundamentais."
    }
  },
  {
    id: "prog",
    name: "Programação",
    category: "Tecnologia",
    icon: "⌨️",
    level: "Avançado",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-200",
    intro: "Lógica algorítmica, estruturas de dados, programação orientada a objetos e desenvolvimento web reativo com TypeScript e Python.",
    objectives: [
      "Construir algoritmos com complexidade de tempo otimizada (notação Big-O)",
      "Aplicar princípios de orientação a objetos: encapsulamento, herança e polimorfismo",
      "Criar aplicações completas manipulando estado, chamadas assíncronas e APIs"
    ],
    topics: [
      { title: "Lógica & Estruturas de Dados", desc: "Arrays, pilhas, filas, tabelas hash, árvores e busca binária." },
      { title: "Programação Orientada a Objetos", desc: "Classes, instâncias, interfaces, métodos estáticos e padrões de desenho." },
      { title: "Desenvolvimento Fullstack", desc: "JavaScript moderno ES6+, TypeScript, assincronia com Promises e React." }
    ],
    example: "Função em TypeScript para filtrar e calcular o dobro de números pares:\n const processar = (nums: number[]): number[] => {\n   return nums.filter(n => n % 2 === 0).map(n => n * 2);\n };",
    exercise: {
      q: "Em JavaScript e TypeScript, qual operador verifica a igualdade estrita comparando tanto o valor quanto o tipo do dado?",
      options: ["==", "===", "=", "!=="],
      correct: 1,
      hint: "Três sinais de igual garantem que 5 !== '5'.",
      explanation: "O operador '===' não realiza coerção de tipos oculta, sendo a comparação recomendada em código profissional."
    }
  },
  {
    id: "ia",
    name: "Inteligência Artificial",
    category: "Tecnologia",
    icon: "🤖",
    level: "Avançado",
    badgeColor: "bg-sky-100 text-sky-700 border-sky-200",
    intro: "Conceitos de Machine Learning, redes neuronais profundas, visão computacional, processamento de linguagem natural e LLMs.",
    objectives: [
      "Diferenciar aprendizado supervisionado, não-supervisionado e por reforço",
      "Compreender a matemática por trás do gradiente descendente e retropropagação",
      "Entender a arquitetura Transformer e o mecanismo de auto-atenção dos LLMs"
    ],
    topics: [
      { title: "Machine Learning Fundamental", desc: "Regressão linear e logística, árvores de decisão e métricas ROC/AUC." },
      { title: "Redes Neuronais & Deep Learning", desc: "Camadas densas, convoluções (CNNs) e funções de ativação como ReLU." },
      { title: "Transformers & Modelos de Linguagem", desc: "Embeddings vetoriais, auto-atenção, prompts e alinhamento ético de IA." }
    ],
    example: "O mecanismo de Auto-Atenção (Self-Attention) permite que o modelo analise simultaneamente todos os tokens de uma frase e pondere o contexto semântico entre termos distantes.",
    exercise: {
      q: "O que caracteriza fundamentalmente o Aprendizado Supervisionado em Machine Learning?",
      options: [
        "Os dados de treino contêm as respostas ou etiquetas corretas conhecidas.",
        "O algoritmo aprende sem qualquer dado inicial.",
        "Dispensa qualquer cálculo matemático.",
        "Apenas aprende por tentativa e erro num simulador de jogo."
      ],
      correct: 0,
      hint: "Exemplo: fotos de raio-X já diagnosticadas previamente por especialistas.",
      explanation: "No aprendizado supervisionado, o modelo ajusta os seus pesos matemáticos comparando a sua previsão com o rótulo verdadeiro."
    }
  },
  {
    id: "eco",
    name: "Economia",
    category: "Sociedade & Negócios",
    icon: "📈",
    level: "Intermédio",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    intro: "Microeconomia e Macroeconomia: oferta e procura, taxas de juro, inflação, comércio exterior e crescimento sustentável.",
    objectives: [
      "Compreender a formação de preços de equilíbrio em concorrência perfeita",
      "Entender como os Bancos Centrais utilizam a taxa de juro para controlar a inflação",
      "Analisar o Produto Interno Bruto (PIB) e o impacto das políticas fiscais"
    ],
    topics: [
      { title: "Microeconomia & Leis de Mercado", desc: "Curvas de oferta e procura, elasticidade-preço e excedente do consumidor." },
      { title: "Macroeconomia & Moeda", desc: "PIB per capita, inflação (IPC), desemprego e taxas de juro de referência." },
      { title: "Comércio Internacional", desc: "Vantagens comparativas, balança comercial e taxas de câmbio." }
    ],
    example: "Lei da Oferta e Procura: Se a colheita de café cair drasticamente por seca (redução da oferta) e o consumo se mantiver, o preço sobe até equilibrar o mercado.",
    exercise: {
      q: "O que tende a acontecer com o preço de equilíbrio quando a oferta de um produto diminui e a procura continua alta?",
      options: [
        "O preço tende a subir consideravelmente devido à escassez.",
        "O preço cai automaticamente para zero.",
        "A moeda do país é desvalorizada de imediato.",
        "O mercado encerra definitivamente."
      ],
      correct: 0,
      hint: "Mais pessoas disputam menos produtos disponíveis no mercado.",
      explanation: "A escassez relativa faz com que os consumidores estejam dispostos a pagar mais, elevando o preço de equilíbrio."
    }
  },
  {
    id: "fin",
    name: "Educação Financeira",
    category: "Sociedade & Negócios",
    icon: "💰",
    level: "Iniciante",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    intro: "Gestão inteligente do dinheiro: orçamentos pessoais, o poder dos juros compostos, reserva de emergência e investimentos a longo prazo.",
    objectives: [
      "Montar uma planilha de orçamento com o método 50/30/20",
      "Compreender a fórmula matemática dos juros compostos ao longo do tempo",
      "Construir uma reserva de emergência e diversificar em renda fixa e variável"
    ],
    topics: [
      { title: "Orçamento & Poupança", desc: "Classificação de despesas essenciais, supérfluas e poupança metódica." },
      { title: "O Poder dos Juros Compostos", desc: "Fórmula M = C × (1 + i)^t e o efeito multiplicador exponencial dos reinvestimentos." },
      { title: "Tipos de Investimento", desc: "Certificados de aforro, fundos de índice (ETFs), ações e planeamento de reforma." }
    ],
    example: "Juros Compostos: 1.000 € investidos a 8% ao ano durante 20 anos transformam-se em cerca de 4.660 €, dos quais 3.660 € são juros puros acumulados.",
    exercise: {
      q: "Qual é a principal função de uma reserva de emergência financeira?",
      options: [
        "Gastar tudo em compras por impulso.",
        "Cobrir despesas imprevistas (saúde, reparações, desemprego) sem contrair dívidas.",
        "Comprar bilhetes de lotaria.",
        "Fazer apostas de alto risco."
      ],
      correct: 1,
      hint: "Garante segurança e estabilidade diante de imprevistos do quotidiano.",
      explanation: "A reserva de emergência garante que imprevistos sejam resolvidos sem necessidade de contrair empréstimos com juros altos."
    }
  },
  {
    id: "est",
    name: "Estatística",
    category: "Exatas",
    icon: "📊",
    level: "Intermédio",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    intro: "Ciência da recolha, análise, interpretação e apresentação de dados numéricos para tomada de decisões fundamentadas.",
    objectives: [
      "Calcular e interpretar média aritmética, mediana e moda",
      "Compreender desvio-padrão, variância e distribuição normal (curva de Gauss)",
      "Analisar probabilidade de eventos independentes e condicionais"
    ],
    topics: [
      { title: "Medidas de Tendência Central", desc: "Média aritmética ponderada, mediana e moda de conjuntos de dados." },
      { title: "Dispersão & Variabilidade", desc: "Amplitude, variância, desvio-padrão e intervalos interquartis." },
      { title: "Probabilidade & Distribuição Normal", desc: "Regra da soma, regra do produto e o teorema do limite central." }
    ],
    example: "Cálculo da mediana do conjunto [2, 5, 8, 12, 19]: Como há 5 elementos ordenados, a mediana é exatamente o valor central: 8.",
    exercise: {
      q: "Qual é a mediana da seguinte série ordenada de números: 3, 7, 9, 15, 21?",
      options: ["7", "9", "11", "15"],
      correct: 1,
      hint: "A mediana é o número que se encontra exatamente no meio da lista ordenada.",
      explanation: "Em 5 termos ímpares, o 3º elemento (9) divide o conjunto com 2 valores menores e 2 maiores."
    }
  },
  {
    id: "log",
    name: "Lógica",
    category: "Exatas",
    icon: "🧩",
    level: "Iniciante",
    badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    intro: "Raciocínio dedutivo e indutivo: tabelas de verdade, proposições lógicas, silogismos clássicos e identificação de falácias.",
    objectives: [
      "Construir e interpretar tabelas de verdade com conectivos E, OU, NÃO e SE... ENTÃO",
      "Reconhecer silogismos válidos e distinguir premissas de conclusões",
      "Identificar falácias argumentativas comuns no debate público (ad hominem, espantalho)"
    ],
    topics: [
      { title: "Proposições & Conectivos Lógicos", desc: "Conjunção (∧), disjunção (∨), negação (¬) e implicação (→)." },
      { title: "Silogismos & Raciocínio Dedutivo", desc: "Estrutura aristotélica clássica: premissa maior, premissa menor e conclusão." },
      { title: "Falácias Lógicas", desc: "Falso dilema, apelo à autoridade inadequada e petição de princípio." }
    ],
    example: "Tabela de verdade da implicação (P → Q): É falsa apenas quando a premissa P é verdadeira e a consequência Q é falsa. Em todos os outros casos é verdadeira.",
    exercise: {
      q: "Se todas as aves têm asas e todos os pinguins são aves, qual conclusão lógica é necessária?",
      options: [
        "Todos os pinguins têm asas.",
        "Nenhum pinguim sabe nadar.",
        "Algumas aves são répteis.",
        "Todos os pinguins voam muito alto."
      ],
      correct: 0,
      hint: "Silogismo dedutivo universal clássico.",
      explanation: "Se a classe Pinguins está contida na classe Aves, e todas as Aves têm asas, necessariamente todos os pinguins possuem asas."
    }
  },
  {
    id: "con",
    name: "Cultura Geral",
    category: "Sociedade & Negócios",
    icon: "🌐",
    level: "Iniciante",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    intro: "Conhecimento enciclopédico abrangente: artes universais, geografia planetária, prémios Nobel e patrimónios da humanidade.",
    objectives: [
      "Conhecer marcos da história da arte mundial (Mona Lisa, Guernica, Capela Sistina)",
      "Compreender a estrutura de organizações globais como ONU, UNESCO e OMS",
      "Identificar acontecimentos científicos e curiosidades planetárias fascinantes"
    ],
    topics: [
      { title: "Marcos das Artes Mundiais", desc: "Pintura, escultura, arquitetura clássica e contemporânea." },
      { title: "Organizações Internacionais", desc: "A fundação das Nações Unidas em 1945 e os Tratados de Genebra." },
      { title: "Grandes Descobertas Científicas", desc: "Penicilina de Fleming, estrutura da dupla hélice e exploração espacial." }
    ],
    example: "A Declaração Universal dos Direitos Humanos foi adotada pelas Nações Unidas em Paris a 10 de dezembro de 1948, estabelecendo direitos inalienáveis para toda a humanidade.",
    exercise: {
      q: "Qual tratado internacional foi assinado em 2015 na capital francesa com o objetivo de limitar o aquecimento global abaixo de 2°C?",
      options: ["Tratado de Versalhes", "Acordo de Paris", "Protocolo de Quioto apenas para comércio", "Pacto de Varsóvia"],
      correct: 1,
      hint: "Assinado no final de 2015 durante a COP21.",
      explanation: "O Acordo de Paris é o principal tratado climático global vinculativo para redução de gases com efeito de estufa."
    }
  },
  {
    id: "amb",
    name: "Educação Ambiental",
    category: "Biológicas & Terra",
    icon: "🌱",
    level: "Iniciante",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    intro: "Sustentabilidade ecológica: conservação da biodiversidade, transição para energias renováveis, reciclagem e economia circular.",
    objectives: [
      "Compreender os 5 R's da sustentabilidade: Repensar, Reduzir, Reutilizar, Reciclar e Recusar",
      "Entender o funcionamento de painéis solares, turbinas eólicas e hidrogénio verde",
      "Analisar o impacto do plástico nos ecossistemas marinhos e soluções sustentáveis"
    ],
    topics: [
      { title: "Economia Circular & Resíduos", desc: "Gestão sustentável de resíduos sólidos e reciclagem de materiais." },
      { title: "Energias Renováveis & Clima", desc: "Solar fotovoltaica, eólica, biomassa e descarbonização da matriz energética." },
      { title: "Preservação de Ecossistemas", desc: "Corais marinhos, florestas tropicais e proteção de bacias hidrográficas." }
    ],
    example: "Economia Circular vs Linear: Em vez do modelo tradicional 'extrair, produzir, descartar', a economia circular mantém materiais no ciclo económico através da reparação, reutilização e reciclagem.",
    exercise: {
      q: "Qual das seguintes fontes de energia é considerada 100% renovável e não emite gases de estufa na operação?",
      options: ["Carvão mineral", "Energia Solar Fotovoltaica", "Gás natural fóssil", "Petróleo bruto"],
      correct: 1,
      hint: "Converte a radiação do sol diretamente em corrente elétrica por efeito fotovoltaico.",
      explanation: "A energia solar aproveita a luz solar inesgotável sem gerar emissões de carbono durante a produção de eletricidade."
    }
  },
  {
    id: "ast",
    name: "Astronomia",
    category: "Exatas",
    icon: "🔭",
    level: "Iniciante",
    badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    intro: "Exploração do cosmos: o sistema solar, nascimento e morte de estrelas, galáxias, buracos negros e a teoria do Big Bang.",
    objectives: [
      "Reconhecer os planetas do Sistema Solar, planetas anões e cinturas de asteroides",
      "Compreender a fusão nuclear no núcleo do Sol e os estágios de vida estelar",
      "Entender a expansão do universo e a observação astronómica por telescópios espaciais"
    ],
    topics: [
      { title: "O Nosso Sistema Solar", desc: "Planetas rochosos (Mercúrio, Vénus, Terra, Marte) e gasosos (Júpiter, Saturno, Úrano, Neptuno)." },
      { title: "Evolução Estelar", desc: "Nebulosas, gigantes vermelhas, supernovas, estrelas de neutrões e buracos negros." },
      { title: "Cosmologia & O Big Bang", desc: "Radiação cósmica de fundo, telescópio James Webb e a matéria escura." }
    ],
    example: "Distância em Anos-Luz: 1 ano-luz é a distância percorrida pela luz no vácuo durante um ano terrestre: aproximadamente 9,46 biliões de quilómetros.",
    exercise: {
      q: "Qual é o maior planeta do nosso Sistema Solar em diâmetro e massa?",
      options: ["Saturno", "Júpiter", "Terra", "Neptuno"],
      correct: 1,
      hint: "Famoso pela sua Grande Mancha Vermelha e dezenas de luas como Europa e Ganimedes.",
      explanation: "Júpiter tem mais do que o dobro da massa de todos os outros planetas do sistema solar combinados."
    }
  },
  {
    id: "emp",
    name: "Empreendedorismo",
    category: "Sociedade & Negócios",
    icon: "🚀",
    level: "Intermédio",
    badgeColor: "bg-rose-100 text-rose-700 border-rose-200",
    intro: "Inovação e criação de valor: validação de ideias, modelo Business Model Canvas, MVPs, liderança e resolução de problemas reais.",
    objectives: [
      "Construir um Business Model Canvas completo para uma ideia inovadora",
      "Compreender a metodologia Lean Startup e o ciclo Construir-Medir-Aprender",
      "Dominar técnicas de pitch persuasivo e gestão ágil de projetos"
    ],
    topics: [
      { title: "Metodologia Lean & MVP", desc: "Criação de Produto Mínimo Viável, validação de hipóteses e feedback de utilizadores." },
      { title: "Business Model Canvas", desc: "Proposta de valor, segmentos de clientes, canais, fontes de receita e custos." },
      { title: "Liderança & Pitching", desc: "Comunicação de ideias para investidores e formação de equipas resilientes." }
    ],
    example: "Conceito de MVP (Produto Mínimo Viável): Versão mais simples de um novo produto que permite à equipa recolher o máximo de aprendizagens validadas com o menor esforço e custo.",
    exercise: {
      q: "O que representa a sigla MVP no contexto das startups e desenvolvimento de produtos?",
      options: [
        "Most Valuable Player apenas",
        "Minimum Viable Product (Produto Mínimo Viável)",
        "Maximum Value Program",
        "Main Venture Partnership"
      ],
      correct: 1,
      hint: "Versão preliminar para testar a proposta de valor no mercado real.",
      explanation: "O Produto Mínimo Viável (MVP) valida se a ideia resolve uma dor real de clientes com o menor dispêndio de recursos."
    }
  }
];

export const COURSES: Course[] = [
  {
    id: "c-ing",
    title: "Inglês Completo: Do A1 ao Domínio C2",
    cat: "Idiomas Internacionais",
    type: "language",
    duration: "45 Horas",
    lessonsCount: 12,
    level: "A1 a C2",
    desc: "Percurso completo com vocabulário prático, pronúncia fonética escrita, diálogos do quotidiano, explicações gramaticais e exercícios passo a passo.",
    prerequisites: "Nenhum pré-requisito necessário.",
    progress: 25,
    curriculumModules: ENGLISH_A1_C2_CURRICULUM,
    finalProject: {
      title: "Projeto Final de Mestria Linguística C2: Discurso & Ensaio Argumentativo",
      objective: "Desenvolver um artigo opinativo e apresentação formal de 10 minutos em inglês com registo C1/C2.",
      brief: "Elabora um ensaio crítico analisando o impacto ético e económico da Inteligência Artificial Generativa no mercado global de trabalho, integrando inversões enfáticas, vocabulário idiopático e conectores discursivos formais.",
      deliverables: [
        "Ensaio argumentativo de 1500 palavras estruturado com introdução, 3 argumentos antagónicos e conclusão",
        "Gravação de áudio de 5 minutos demonstrando pronúncia e entoação fluida sem hesitações",
        "Glossário temático com 30 expressões de nível C1/C2 contextualizadas"
      ]
    },
    lessons: [
      {
        id: "c-ing-1",
        title: "Unidade 1 — Primeiros Passos & Saudações",
        duration: "30 min",
        content: "Aprende as formas corretas de saudar em inglês, apresentar o teu nome e responder com cortesia em contextos formais e informais.",
        vocabulary: [
          { word: "Hello / Hi", translation: "Olá", phonetic: "/həˈloʊ/ /haɪ/" },
          { word: "Nice to meet you", translation: "Prazer em conhecer-te", phonetic: "/naɪs tuː miːt juː/" },
          { word: "Good morning", translation: "Bom dia", phonetic: "/ɡʊd ˈmɔːrnɪŋ/" },
          { word: "How are you?", translation: "Como estás?", phonetic: "/haʊ ɑːr juː/" }
        ],
        dialogue: [
          { speaker: "Sarah", text: "Hello! My name is Sarah. What is your name?", translation: "Olá! O meu nome é Sarah. Qual é o teu nome?" },
          { speaker: "Lucas", text: "Hi Sarah! I am Lucas. Nice to meet you!", translation: "Olá Sarah! Eu sou o Lucas. Prazer em conhecer-te!" }
        ],
        grammarTip: "Uso do verbo 'To Be' no presente: I am, You are, He/She/It is, We are, They are.",
        exercise: {
          question: "Qual é a resposta mais adequada para 'Nice to meet you'?",
          options: ["Good night", "Nice to meet you too!", "I have 20 years", "Thank you, yesterday"],
          correct: 1,
          explanation: "'Nice to meet you too!' retribui com elegância o prazer de conhecer alguém."
        }
      },
      {
        id: "c-ing-2",
        title: "Unidade 2 — Apresentações & Família",
        duration: "35 min",
        content: "Aprende a descrever os membros da família, nacionalidades, profissões e a fazer perguntas usando pronomes interrogativos (Who, What, Where).",
        vocabulary: [
          { word: "Family", translation: "Família", phonetic: "/ˈfæməli/" },
          { word: "Brother / Sister", translation: "Irmão / Irmã", phonetic: "/ˈbrʌðər/ /ˈsɪstər/" },
          { word: "Where are you from?", translation: "De onde és?", phonetic: "/wɛər ɑːr juː frʌm/" }
        ],
        exercise: {
          question: "Como se pergunta 'De onde és?' em inglês?",
          options: ["Where are you from?", "How old are you?", "What time is it?", "Who is your friend?"],
          correct: 0,
          explanation: "'Where are you from?' pergunta a origem geográfica ou nacionalidade."
        }
      }
    ]
  },
  {
    id: "c-fra",
    title: "Francês Essencial: A1 a B2",
    cat: "Idiomas Internacionais",
    type: "language",
    duration: "38 Horas",
    lessonsCount: 10,
    level: "A1 a B2",
    desc: "Da pronúncia das vogais nasais aos tempos verbais do Passé Composé e conversação elegante na cidade.",
    prerequisites: "Nenhum pré-requisito.",
    progress: 10,
    lessons: [
      {
        id: "c-fra-1",
        title: "Unidade 1 — Salutations et Présentations",
        duration: "25 min",
        content: "Cumprimentos em francês: a diferença crucial entre a forma polida 'Vous' e a familiar 'Tu'.",
        vocabulary: [
          { word: "Bonjour", translation: "Bom dia / Olá", phonetic: "/bɔ̃.ʒuʁ/" },
          { word: "Comment vous vous appelez ?", translation: "Como se chama?", phonetic: "/kɔ.mɑ̃ vu vu.za.pə.le/" },
          { word: "Enchanté(e)", translation: "Prazer / Encantado(a)", phonetic: "/ɑ̃.ʃɑ̃.te/" }
        ],
        exercise: {
          question: "Qual é a resposta formal correta para 'Comment vous vous appelez ?'?",
          options: ["Je m'appelle Thomas.", "Oui, merci.", "Très bien, et toi ?", "Au revoir."],
          correct: 0,
          explanation: "'Je m'appelle...' é a construção padrão para dizer o nome."
        }
      }
    ]
  },
  {
    id: "c-esp",
    title: "Espanhol para o Quotidiano e Negócios",
    cat: "Idiomas Internacionais",
    type: "language",
    duration: "32 Horas",
    lessonsCount: 10,
    level: "A1 a B2",
    desc: "Aprende espanhol comunicativo sem cair nos falsos amigos, dominando verbos no pretérito e vocabulário corporativo hispânico.",
    prerequisites: "Nenhum.",
    progress: 0,
    lessons: [
      {
        id: "c-esp-1",
        title: "Unidade 1 — Primeros Contactos y Saludos",
        duration: "20 min",
        content: "Saludos, despedidas, presentaciones y el uso de 'Tú' versus 'Usted'.",
        vocabulary: [
          { word: "Hola, ¿cómo estás?", translation: "Olá, como estás?", phonetic: "/ˈo.la ˈko.mo esˈtas/" },
          { word: "Mucho gusto", translation: "Muito prazer", phonetic: "/ˈmu.tʃo ˈɣus.to/" },
          { word: "Hasta luego", translation: "Até logo", phonetic: "/ˈas.ta ˈlwe.ɣo/" }
        ],
        exercise: {
          question: "Como se diz 'Muito prazer' ao conhecer alguém em espanhol?",
          options: ["Mucho gusto", "De nada", "Hasta mañana", "Por favor"],
          correct: 0,
          explanation: "'Mucho gusto' é a forma tradicional de cortesia nas apresentações."
        }
      }
    ]
  },
  {
    id: "c-web",
    title: "Desenvolvimento Web Fullstack Moderno",
    cat: "Tecnologia & Programação",
    type: "tech",
    duration: "40 Horas",
    lessonsCount: 12,
    level: "Iniciante a Avançado",
    desc: "Domina HTML5 semântico, estilização com Tailwind CSS, JavaScript assíncrono e arquitetura modular de componentes reativos.",
    prerequisites: "Conhecimentos básicos de utilização do computador.",
    progress: 40,
    lessons: [
      {
        id: "c-web-1",
        title: "Módulo 1 — Estrutura HTML5 Semântica e Tailwind",
        duration: "45 min",
        content: "Construção de layouts modernos com elementos semânticos (<header>, <main>, <nav>, <article>) e estilização responsiva utilitária.",
        grammarTip: "Dica de Código: Utiliza classes flex e grid para alinhar elementos com fluidez responsiva.",
        exercise: {
          question: "Qual tag HTML5 semântica é indicada para o conteúdo principal de uma página web?",
          options: ["<main>", "<div>", "<span>", "<header>"],
          correct: 0,
          explanation: "A tag <main> delimita o conteúdo central e exclusivo daquela vista, melhorando a acessibilidade e o SEO."
        }
      }
    ]
  },
  {
    id: "c-py",
    title: "Python Do Zero à Análise de Dados",
    cat: "Tecnologia & Programação",
    type: "tech",
    duration: "35 Horas",
    lessonsCount: 10,
    level: "Iniciante a Intermédio",
    desc: "Lógica de programação com Python: listas, dicionários, funções puras, automação de ficheiros e manipulação de dados com Pandas.",
    prerequisites: "Nenhum.",
    progress: 15,
    lessons: [
      {
        id: "c-py-1",
        title: "Módulo 1 — Variáveis, Tipos e Estruturas de Controlo",
        duration: "40 min",
        content: "Tipagem dinâmica em Python (int, float, str, bool), operadores lógicos e condicionais com if, elif e else.",
        exercise: {
          question: "Qual função embutida em Python imprime informação na consola do utilizador?",
          options: ["print()", "console.log()", "echo()", "write()"],
          correct: 0,
          explanation: "A função nativa print() exibe textos e variáveis na saída padrão do terminal Python."
        }
      }
    ]
  },
  {
    id: "c-ia",
    title: "Inteligência Artificial Prática & Engenharia de Prompts",
    cat: "Tecnologia do Futuro",
    type: "tech",
    duration: "20 Horas",
    lessonsCount: 8,
    level: "Intermédio",
    desc: "Como funcionam os LLMs, técnicas avançadas de Few-Shot prompting, embeddings semânticos e integração de IA generativa com Gemini.",
    prerequisites: "Noções básicas de lógica digital.",
    progress: 15,
    lessons: [
      {
        id: "c-ia-1",
        title: "Módulo 1 — A Revolução dos Transformers",
        duration: "30 min",
        content: "Entende o mecanismo de atenção que permitiu aos modelos de linguagem processar linguagem humana em escala global.",
        exercise: {
          question: "O que permitiu o avanço exponencial dos Modelos de Linguagem (LLMs) em relação às redes recorrentes antigas?",
          options: [
            "O mecanismo de Auto-Atenção (Transformers) que processa palavras em paralelo.",
            "A eliminação da eletricidade dos servidores.",
            "O abandono da matemática.",
            "A redução do vocabulário das línguas."
          ],
          correct: 0,
          explanation: "A arquitetura Transformer possibilitou paralelizar o treino de dados em larga escala com atenção contextual profunda."
        }
      }
    ]
  },
  {
    id: "c-fin",
    title: "Finanças Pessoais & Educação Económica",
    cat: "Sociedade & Negócios",
    type: "business",
    duration: "15 Horas",
    lessonsCount: 6,
    level: "Iniciante",
    desc: "Aprende a estruturar o teu orçamento mensal, calcula o impacto dos juros compostos ao longo de décadas e investe com segurança.",
    prerequisites: "Nenhum.",
    progress: 75,
    lessons: [
      {
        id: "c-fin-1",
        title: "Módulo 1 — A Regra 50/30/20 de Orçamento",
        duration: "25 min",
        content: "Distribuição financeira saudável: 50% para necessidades vitais, 30% para estilo de vida e 20% para poupança e investimentos.",
        exercise: {
          question: "Na regra 50/30/20, qual percentagem do rendimento líquido deve ser destinada a poupança e investimentos?",
          options: ["20%", "50%", "5%", "80%"],
          correct: 0,
          explanation: "Os 20% garantem a criação de reserva de emergência e acumulação patrimonial consistente."
        }
      }
    ]
  },
  {
    id: "c-emp",
    title: "Empreendedorismo & Criação de Startups",
    cat: "Sociedade & Negócios",
    type: "business",
    duration: "22 Horas",
    lessonsCount: 8,
    level: "Intermédio",
    desc: "Validação de hipóteses de negócio, Business Model Canvas, MVPs práticos, aquisição de clientes e captação de investimento inicial.",
    prerequisites: "Vontade de inovar.",
    progress: 0,
    lessons: [
      {
        id: "c-emp-1",
        title: "Módulo 1 — Da Ideia ao Problema Real",
        duration: "30 min",
        content: "Como validar se a tua ideia responde a uma necessidade autêntica do mercado antes de investir tempo e capital.",
        exercise: {
          question: "Qual é o primeiro passo recomendado pela metodologia Lean Startup?",
          options: [
            "Validar a dor e o problema com potenciais utilizadores reais.",
            "Alugar um escritório de luxo imediatamente.",
            "Gastar o orçamento todo em publicidade antes de ter um produto.",
            "Contratar dezenas de colaboradores sem validar a proposta."
          ],
          correct: 0,
          explanation: "Conversar com utilizadores reais e validar o problema evita criar produtos que ninguém deseja."
        }
      }
    ]
  },
  ...EXPANDED_COURSES
];

export const BADGES_DATABASE: Badge[] = [
  { id: "b1", title: "Primeiros Passos", desc: "Iniciaste a tua jornada na MINDORA", icon: "🌱", req: 1 },
  { id: "b2", title: "Mente Brilhante", desc: "Acumulaste mais de 100 XP através do estudo", icon: "💡", req: 100 },
  { id: "b3", title: "Mestre da Matemática", desc: "Pontuaste alto nos Desafios de Cálculo", icon: "🔢", req: 200 },
  { id: "b4", title: "Poliglota Atento", desc: "Treinaste vocabulário e idiomas estrangeiros", icon: "🌍", req: 300 },
  { id: "b5", title: "Cientista Explorador", desc: "Completaste desafios de Física, Química e Biologia", icon: "🔬", req: 400 },
  { id: "b6", title: "Erudito Mindora", desc: "Alcançaste o Nível 5 de Conhecimento (+500 XP)", icon: "👑", req: 500 },
  { id: "b7", title: "Lenda Suprema", desc: "Ultrapassaste os 1.000 XP de sabedoria", icon: "⚡", req: 1000 }
];

export const QUIZ_BANK: Record<string, { q: string; ops: string[]; cor: number; explanation: string }[]> = {
  "Matemática": [
    {
      q: "Qual é o valor exato da expressão: 8² - 14?",
      ops: ["50", "48", "64", "52"],
      cor: 0,
      explanation: "8² = 64. Subtraindo 14, temos 64 - 14 = 50."
    },
    {
      q: "Qual dos seguintes números é um número primo?",
      ops: ["15", "21", "29", "33"],
      cor: 2,
      explanation: "29 é divisível apenas por 1 e por ele próprio, sendo um número primo."
    },
    {
      q: "Se 3 cadernos custam 12 €, quanto custam 7 cadernos pelo mesmo valor unitário?",
      ops: ["24 €", "28 €", "32 €", "21 €"],
      cor: 1,
      explanation: "Cada caderno custa 12 / 3 = 4 €. Logo, 7 cadernos custam 7 × 4 € = 28 €."
    },
    {
      q: "Qual é o valor da raiz quadrada de 144?",
      ops: ["11", "12", "14", "16"],
      cor: 1,
      explanation: "12 × 12 = 144, logo √144 = 12."
    }
  ],
  "Física & Química": [
    {
      q: "Qual é a unidade do Sistema Internacional usada para medir a força resultante?",
      ops: ["Joule (J)", "Pascal (Pa)", "Newton (N)", "Watt (W)"],
      cor: 2,
      explanation: "1 Newton (N) equivale à força necessária para acelerar 1 kg a 1 m/s²."
    },
    {
      q: "Qual é a velocidade aproximada da luz no vácuo?",
      ops: ["300.000 km/s", "150.000 km/s", "1.000 km/h", "30.000 km/s"],
      cor: 0,
      explanation: "A luz no vácuo propaga-se a cerca de 299.792 km/s (~300.000 km/s)."
    },
    {
      q: "Qual gás compõe aproximadamente 78% da atmosfera terrestre?",
      ops: ["Oxigénio", "Azoto (Nitrogénio)", "Dióxido de Carbono", "Árgon"],
      cor: 1,
      explanation: "O azoto molecular (N₂) constitui cerca de 78% do ar que respiramos."
    }
  ],
  "Programação & IA": [
    {
      q: "Qual estrutura repete um bloco de código enquanto uma determinada condição for verdadeira?",
      ops: ["while loop", "switch case", "return", "class definition"],
      cor: 0,
      explanation: "O ciclo 'while' avalia a condição antes de cada repetição."
    },
    {
      q: "Em JavaScript, qual método remove e retorna o último elemento de um array?",
      ops: ["push()", "pop()", "shift()", "slice()"],
      cor: 1,
      explanation: "O método .pop() extrai o último item do array mutável."
    },
    {
      q: "O que significa a sigla tecnológica API?",
      ops: [
        "Application Programming Interface",
        "Advanced Program Integration",
        "Applied Python Intelligence",
        "Automated Protocol Internet"
      ],
      cor: 0,
      explanation: "API é a Interface de Programação de Aplicações."
    }
  ],
  "História & Geografia": [
    {
      q: "Em que ano foi proclamada a Declaração Universal dos Direitos Humanos pela ONU?",
      ops: ["1918", "1945", "1948", "1968"],
      cor: 2,
      explanation: "Aprovada em Paris a 10 de dezembro de 1948 após a Segunda Guerra Mundial."
    },
    {
      q: "Qual é o rio considerado o mais extenso em comprimento e volume do mundo?",
      ops: ["Rio Nilo", "Rio Amazonas", "Rio Danúbio", "Rio Mississippi"],
      cor: 1,
      explanation: "O Rio Amazonas, na América do Sul, lidera em caudal hídrico e extensão."
    },
    {
      q: "Em que século ocorreu a Revolução Francesa com a Tomada da Bastilha (1789)?",
      ops: ["Século XVII", "Século XVIII", "Século XIX", "Século XVI"],
      cor: 1,
      explanation: "O ano de 1789 pertence à segunda metade do século XVIII."
    }
  ],
  "Cultura Geral & Idiomas": [
    {
      q: "Quem pintou a célebre obra 'Mona Lisa' (La Gioconda)?",
      ops: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      cor: 1,
      explanation: "Leonardo da Vinci criou a Mona Lisa no início do século XVI."
    },
    {
      q: "Em espanhol, como se traduz a expressão 'Sobrenome de família'?",
      ops: ["Apodo", "Apellido", "Nombre", "Apelativo"],
      cor: 1,
      explanation: "'Apellido' é o sobrenome familiar; 'apodo' é alcunha."
    },
    {
      q: "Qual tratado global estabeleceu metas para limitar o aquecimento do planeta abaixo de 2°C?",
      ops: ["Tratado de Versalhes", "Acordo de Paris", "Pacto de Varsóvia", "Convenção de Viena"],
      cor: 1,
      explanation: "O Acordo de Paris foi firmado em 2015 na cimeira COP21."
    }
  ]
};
