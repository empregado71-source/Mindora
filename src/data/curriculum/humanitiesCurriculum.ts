import { CurriculumModule, FinalSubjectAssessment } from '../../types';

export const HUMANITIES_CURRICULUM: { [key: string]: CurriculumModule[] } = {
  // PORTUGUÊS
  pt: [
    {
      id: "pt-mod-1",
      moduleNumber: 1,
      title: "Morfologia e Classes de Palavras",
      description: "Estrutura e formação das palavras (derivação prefixal, sufixal, parassintética e composição), as 10 classes de palavras da língua portuguesa, flexão nominal e verbal, e emprego dos pronomes relativos e demonstrativos.",
      targetLevel: "Iniciante",
      estimatedHours: 16,
      units: [
        {
          id: "pt-u1-1",
          unitNumber: 1,
          title: "Estrutura dos Vocábulos e Processos de Formação",
          description: "Radical, afixos, vogal temática, desinências, derivação e composição por aglutinação e justaposição.",
          lessons: [
            {
              id: "pt-l-1-1-1",
              title: "Processos de Derivação e Composição",
              durationMinutes: 55,
              explanation: "A língua portuguesa expande o seu léxico através de dois grandes mecanismos: Derivação e Composição. Na derivação, anexam-se afixos a um radical primitivo: derivação prefixal (in-feliz), sufixal (feliz-mente), prefixal e sufixal (in-feliz-mente, onde os afixos são independentes), parassintética (en-tard-ecer, onde prefixo e sufixo são inseparáveis e obrigatórios em simultâneo), regressiva (combater ➔ o combate) e imprópria (mudança de classe gramatical sem alteração formal: 'o jantar'). Na composição, unem-se dois ou mais radicais: por justaposição (sem perda fonética: passatempo, guarda-chuva) ou por aglutinação (com supressão ou alteração fonética: planalto = plano + alto; embora = em + boa + hora).",
              fundamentalConcepts: [
                "Morfemas: radical, vogal temática, tema e desinências nominais e verbais",
                "Diferença entre derivação prefixal/sufixal e parassíntese",
                "Composição por justaposição vs. aglutinação"
              ],
              practicalExamples: [
                "A palavra 'desalmado' é parassintética: não existe 'desalmar' nem 'almado', ambos os afixos 'des-' e '-ado' foram adicionados em bloco simultâneo ao radical 'alm-'.",
                "'Girassol' é composta por justaposição: 'gira' + 'sol' mantiveram a sua integridade fonética (dobrou-se o 's' apenas por regra ortográfica de som consonantal)."
              ],
              realWorldApplications: [
                "Redação de textos jurídicos, jornalísticos e literários com vocabulário rico e preciso.",
                "Etimologia e aprendizagem de novos idiomas românicos ou terminologias científicas."
              ],
              stepByStepExercises: [
                {
                  problem: "Classifica o processo de formação das seguintes palavras: a) 'anoitecer'; b) 'lobisomem'; c) 'infidelidade'.",
                  steps: [
                    "Passo 1: 'anoitecer': radical 'noit-'. Recebeu prefixo 'a-' e sufixo '-ecer' em simultâneo. Como não existe 'anoite' nem 'noitecer', o processo é Derivação Parassintética.",
                    "Passo 2: 'lobisomem': união de 'lobo' + 'homem'. Houve perda e alteração fonética dos vocábulos originais. O processo é Composição por Aglutinação.",
                    "Passo 3: 'infidelidade': radical 'fidel-'. Recebeu prefixo 'in-' e sufixo '-idade'. Existe 'infiel' e existe 'fidelidade', logo os afixos foram adicionados sucessivamente. O processo é Derivação Prefixal e Sufixal."
                  ],
                  finalAnswer: "a) Parassíntese; b) Composição por Aglutinação; c) Derivação Prefixal e Sufixal."
                }
              ],
              practiceExercises: [
                {
                  q: "Qual das seguintes palavras é formada por composição por aglutinação?",
                  options: ["Pernalta (perna + alta)", "Pé de moleque", "Passatempo", "Submarino"],
                  correct: 0,
                  hint: "Ocorre alteração ou supressão de fonemas na junção das raízes.",
                  explanation: "'Pernalta' resulta da fusão de 'perna' com 'alta', com perda e contração vocálica."
                }
              ],
              summary: "Compreender a morfologia permite descodificar o significado de milhares de palavras complexas a partir das suas raízes.",
              reviewQuestions: [
                {
                  q: "O que distingue a derivação parassintética da derivação prefixal e sufixal?",
                  options: [
                    "Na parassíntese, o prefixo e o sufixo são adicionados simultaneamente e a palavra não existe sem um deles",
                    "A parassíntese só ocorre em adjetivos",
                    "A prefixal e sufixal altera a raiz do verbo",
                    "Não há qualquer diferença entre os processos"
                  ],
                  correct: 0,
                  hint: "Tenta retirar o prefixo ou o sufixo: se a palavra não existir, é parassíntese.",
                  explanation: "Na parassíntese, a retirada de qualquer um dos afixos gera uma palavra inexistente na língua (ex: en-louqu-ecer)."
                }
              ]
            }
          ]
        }
      ],
      moduleAssessment: {
        title: "Avaliação do Módulo 1 — Morfologia e Formação de Palavras",
        instructions: "Identifica processos de formação e flexões gramaticais.",
        passingScorePercentage: 75,
        questions: [
          {
            q: "A palavra 'pesca' derivada do verbo 'pescar' é um exemplo clássico de:",
            options: ["Derivação regressiva (deverbal)", "Derivação imprópria", "Derivação sufixal", "Composição"],
            correct: 0,
            hint: "O substantivo abstrato é formado pela redução da forma verbal infinitiva.",
            explanation: "Derivação regressiva forma substantivos que indicam ação a partir de verbos com diminuição de fonemas."
          }
        ]
      }
    }
  ],

  // HISTÓRIA
  his: [
    {
      id: "his-mod-1",
      moduleNumber: 1,
      title: "História de África e Reinos Pré-Coloniais",
      description: "Berço da humanidade (Vale do Rift), Revolução Neolítica em África, o Reino do Congo, Reino de Axum, Império do Mali, Songhai, Grande Zimbabué e a organização sociopolítica e comercial pré-colonial.",
      targetLevel: "Iniciante",
      estimatedHours: 16,
      units: [
        {
          id: "his-u1-1",
          unitNumber: 1,
          title: "O Reino do Congo e as Sociedades da África Central",
          description: "Fundação do Reino do Congo (Mani Congo), capital Mbanza Kongo, comércio transregional de zimbo e cobre, e a chegada portuguesa no século XV.",
          lessons: [
            {
              id: "his-l-1-1-1",
              title: "Estrutura Política, Economia e Cultura de Mbanza Kongo",
              durationMinutes: 60,
              explanation: "O Reino do Congo (Kongo dya Ntotila) floresceu a partir do século XIV na África Central e Ocidental, abrangendo vastos territórios de Angola, República Democrática do Congo, República do Congo e Gabão. A sua capital, Mbanza Kongo (declarada Património Mundial da UNESCO), era o centro nevrálgico do poder do Mani Congo (rei). A economia assentava na agricultura, na metalurgia do ferro e do cobre, na produção têxtil de ráfia e no comércio inter-regional que utilizava as conchas de zimbo (colhidas na Ilha de Luanda) como moeda padrão fiduciária. O reino possuía uma administração centralizada sofisticada dividida em províncias (Soyo, Mpemba, Mbata, Nsundi) geridas por governadores provinciais.",
              fundamentalConcepts: [
                "O Mani Congo e o Conselho Real de Anciãos",
                "O zimbo como moeda fiduciária pré-colonial na África Central",
                "A metalurgia do ferro como símbolo de prestígio, poder e autonomia produtiva",
                "A chegada de Diogo Cão em 1482 e as transformações diplomáticas e religiosas (reinado de Afonso I / Mvemba a Nzinga)"
              ],
              practicalExamples: [
                "A organização tributária de Mbanza Kongo: impostos recolhidos em marfim, cobre e sal que financiavam a segurança das rotas caravaneiras e o sustento de cortesãos e artesãos especializados.",
                "As cartas de protesto de D. Afonso I (Mvemba a Nzinga) ao rei D. João III de Portugal denunciando a devassidão e a captura ilegal de nobres livres pelo tráfico transatlântico de escravizados no século XVI."
              ],
              realWorldApplications: [
                "Compreensão das matrizes identitárias e culturais de Angola e da África contemporânea.",
                "Historiografia crítica que desmistifica o eurocentrismo e resgata as realizações civilizacionais africanas milenares."
              ],
              stepByStepExercises: [
                {
                  problem: "Analisa o papel económico do zimbo no Reino do Congo antes e depois da interferência colonial portuguesa.",
                  steps: [
                    "Passo 1 (Antes): O zimbo (pequena concha marinha colhida sob monopólio real na Ilha de Luanda) funcionava como moeda soberana estável, cujo fornecimento era rigorosamente controlado pelo Mani Congo para evitar inflação.",
                    "Passo 2 (Interferência): Com o avanço mercantilista e a fundação de Luanda em 1575 por Paulo Dias de Novais, os comerciantes europeus tomaram o controlo dos bancos de pesca de conchas.",
                    "Passo 3 (Consequência): A inundação do mercado com zimbo falsificado ou em abundância descontrolada desestabilizou o valor da moeda conguense, desestruturou a autoridade económica do Mani Congo e facilitou a imposição do tráfico negreiro."
                  ],
                  finalAnswer: "O controlo do zimbo era a chave da soberania económica do Reino do Congo; a sua desregulação provocou inflação e perda de autonomia política."
                }
              ],
              practiceExercises: [
                {
                  q: "Qual era a capital política e espiritual do Reino do Congo, hoje classificada como Património Mundial da UNESCO?",
                  options: ["Mbanza Kongo", "Luanda", "Uíge", "Cabinda"],
                  correct: 0,
                  hint: "Fica localizada na atual província do Zaire, no norte de Angola.",
                  explanation: "Mbanza Kongo foi a sede metropolitana do Mani Congo e do reino durante séculos."
                }
              ],
              summary: "O Reino do Congo possuía instituições complexas, jurisprudência e rotas mercantis avançadas muito antes de qualquer contacto europeu.",
              reviewQuestions: [
                {
                  q: "Que elemento marinho funcionava como moeda oficial fiduciária no Reino do Congo?",
                  options: ["Conchas de zimbo", "Pérolas negras", "Ouro em pó", "Barras de ferro"],
                  correct: 0,
                  hint: "Eram recolhidas sob supervisão do rei nas águas costeiras de Luanda.",
                  explanation: "O zimbo era a moeda que servia de unidade de conta e troca no reino."
                }
              ]
            }
          ]
        }
      ],
      moduleAssessment: {
        title: "Avaliação do Módulo 1 — História do Reino do Congo",
        instructions: "Responde demonstrando rigor historiográfico.",
        passingScorePercentage: 75,
        questions: [
          {
            q: "Quem governava o Reino do Congo com o apoio de um conselho de nobres?",
            options: ["O Mani Congo", "O Faraó", "O Oba de Benim", "O Shaka Zulu"],
            correct: 0,
            hint: "Título imperial supremo do soberano conguense.",
            explanation: "O Mani Congo era o monarca supremo do reino."
          }
        ]
      }
    }
  ],

  // GEOGRAFIA
  geo: [
    {
      id: "geo-mod-1",
      moduleNumber: 1,
      title: "Cartografia, Coordenadas e Climatologia",
      description: "Escala cartográfica (numérica e gráfica), projeções (Mercator, Peters), latitude, longitude, fusos horários, camadas da atmosfera, elementos do clima (temperatura, humidade, pressão) e fatores climáticos.",
      targetLevel: "Iniciante",
      estimatedHours: 16,
      units: [
        {
          id: "geo-u1-1",
          unitNumber: 1,
          title: "Leitura de Mapas, Escalas e Coordenadas Geográficas",
          description: "Paralelos e Meridianos (Equador e Greenwich), cálculo de escalas e distâncias reais.",
          lessons: [
            {
              id: "geo-l-1-1-1",
              title: "Escala Cartográfica e Cálculo de Distâncias Reais",
              durationMinutes: 55,
              explanation: "A escala cartográfica representa a proporção matemática rigorosa entre as dimensões lineares representadas no mapa (d) e as distâncias reais correspondentes no terreno (D): E = d / D (ou 1 : N). Por convenção universal, numerador e denominador devem estar expressos na mesma unidade de medida (geralmente centímetros, cm). As coordenadas geográficas formam uma grelha esférica: a Latitude mede a distância angular ao Equador (de 0° a 90° Norte ou Sul); a Longitude mede a distância angular ao Meridiano de Greenwich (de 0° a 180° Este ou Oeste).",
              fundamentalConcepts: [
                "Escala grande (detalhe elevado, ex: 1:10 000 para cidades) vs. escala pequena (pouco detalhe, ex: 1:50 000 000 para planisférios)",
                "Conversão métrica: 1 km = 1 000 m = 100 000 cm",
                "Fusos horários: a Terra gira 360° em 24h, logo cada fuso horário abrange 15° de longitude (1 hora de diferença)"
              ],
              practicalExamples: [
                "Num mapa de escala 1 : 250 000, dois pontos distam 4 cm no papel. A distância real é: D = d × N = 4 cm × 250 000 = 1 000 000 cm = 10 000 m = 10 km.",
                "Fusos horários: se em Londres (0° Greenwich) são 12:00, em Luanda (15° E, Fuso UTC+1) são 13:00."
              ],
              realWorldApplications: [
                "Sistemas de Posicionamento Global (GPS) e drones agrícolas de precisão.",
                "Ordenamento do território, planeamento urbano e cartografia de risco ambiental."
              ],
              stepByStepExercises: [
                {
                  problem: "Num mapa de escala 1 : 500 000, a distância medida com uma régua entre duas cidades é de 8 cm. Qual é a distância real em quilómetros?",
                  steps: [
                    "Passo 1: Identificar a relação de escala: 1 cm no mapa equivale a 500 000 cm no terreno.",
                    "Passo 2: Multiplicar a distância no mapa pelo fator da escala: D = 8 cm × 500 000 = 4 000 000 cm.",
                    "Passo 3: Converter de centímetros para metros (dividir por 100): 4 000 000 / 100 = 40 000 metros.",
                    "Passo 4: Converter de metros para quilómetros (dividir por 1 000): 40 000 / 1 000 = 40 km."
                  ],
                  finalAnswer: "A distância real é de 40 quilómetros."
                }
              ],
              practiceExercises: [
                {
                  q: "Se a distância real entre duas cidades é de 50 km e no mapa mede 5 cm, qual é a escala do mapa?",
                  options: ["1 : 1 000 000", "1 : 100 000", "1 : 500 000", "1 : 10 000 000"],
                  correct: 0,
                  hint: "Converte 50 km para cm: 50 km = 5 000 000 cm. Escala = 5 / 5 000 000 = 1 / 1 000 000.",
                  explanation: "1 cm no mapa representa 1 000 000 cm (10 km) na realidade."
                }
              ],
              summary: "A cartografia é o alfabeto do espaço geográfico, capacitando a humanidade a mapear e compreender o planeta.",
              reviewQuestions: [
                {
                  q: "Qual linha imaginária de referência marca a latitude zero graus (0°)?",
                  options: ["O Equador", "O Meridiano de Greenwich", "O Trópico de Câncer", "O Círculo Polar Ártico"],
                  correct: 0,
                  hint: "Divide a Terra nos hemisférios Norte e Sul.",
                  explanation: "A linha do Equador define a latitude 0°."
                }
              ]
            }
          ]
        }
      ],
      moduleAssessment: {
        title: "Avaliação do Módulo 1 — Cartografia e Coordenadas",
        instructions: "Resolve problemas de escalas e coordenadas.",
        passingScorePercentage: 75,
        questions: [
          {
            q: "Quantos graus de longitude equivalem à variação de 1 hora de fuso horário?",
            options: ["15°", "30°", "10°", "45°"],
            correct: 0,
            hint: "360° / 24 horas = 15° por hora.",
            explanation: "Cada fuso horário padrão abrange 15 graus de arco terrestre."
          }
        ]
      }
    }
  ]
};
