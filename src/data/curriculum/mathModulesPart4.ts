import { CurriculumModule } from '../../types';

export const MATH_MODULES_PART4: CurriculumModule[] = [
  {
    id: "mat-mod-10",
    moduleNumber: 10,
    title: "Geometria Plana",
    description: "Ângulos, polígonos, Teorema de Pitágoras, Teorema de Tales, semelhança de triângulos, círculos, perímetros e áreas planas deduzidas.",
    targetLevel: "Intermédio",
    estimatedHours: 20,
    units: [
      {
        id: "mat-u10-1",
        unitNumber: 1,
        title: "Triângulos, Semelhança e Teorema de Tales",
        description: "Critérios de semelhança (AA, LAL, LLL), feixes de retas paralelas e aplicações métricas no triângulo retângulo.",
        lessons: [
          {
            id: "mat-l-10-1-1",
            title: "Relações Métricas e Teorema de Pitágoras",
            durationMinutes: 60,
            explanation: "Num triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos: a² = b² + c². Adicionalmente, as relações métricas fundamentais obtidas por semelhança com a altura h relativa à hipotenusa a são: b² = a · m, c² = a · n, h² = m · n, e b · c = a · h (onde m e n são as projeções ortogonais dos catetos sobre a hipotenusa). O Teorema de Tales estabelece que um feixe de retas paralelas corta duas transversais em segmentos proporcionais.",
            fundamentalConcepts: [
              "Teorema de Pitágoras: a² = b² + c²",
              "Relações métricas no triângulo retângulo e projeções ortogonais",
              "Teorema de Tales e proporcionalidade geométrica"
            ],
            practicalExamples: [
              "Verificar se um triângulo de lados 9 cm, 12 cm e 15 cm é retângulo: 9² + 12² = 81 + 144 = 225. Como 15² = 225, o triângulo é exatamente retângulo.",
              "Determinar a diagonal de um quadrado de lado L: d² = L² + L² = 2L² ➔ d = L√2."
            ],
            realWorldApplications: [
              "Topografia e construção civil: método do triângulo 3-4-5 para verificar esquadrias perfeitas de 90° em fundações de edifícios.",
              "Sistemas de navegação por GPS e triangulação de antenas celulares."
            ],
            stepByStepExercises: [
              {
                problem: "Num triângulo retângulo, a hipotenusa mede 10 cm e um dos catetos mede 6 cm. Calcula a altura relativa à hipotenusa.",
                steps: [
                  "Passo 1: Calcular o segundo cateto c usando o Teorema de Pitágoras: a² = b² + c² ➔ 10² = 6² + c².",
                  "100 = 36 + c² ➔ c² = 64 ➔ c = 8 cm.",
                  "Passo 2: Usar a relação métrica fundamental: produto dos catetos = hipotenusa × altura (b · c = a · h).",
                  "6 × 8 = 10 × h ➔ 48 = 10h.",
                  "Passo 3: Isolar h: h = 48 / 10 = 4.8 cm."
                ],
                finalAnswer: "A altura mede 4.8 cm."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o comprimento da diagonal de um retângulo com comprimento 8 m e largura 6 m?",
                options: ["10 m", "14 m", "12 m", "9.5 m"],
                correct: 0,
                hint: "Aplica o Teorema de Pitágoras d² = 8² + 6².",
                explanation: "d² = 64 + 36 = 100 ➔ d = √100 = 10 m."
              }
            ],
            summary: "O Teorema de Pitágoras é a pedra angular da geometria euclidiana e a base de todo o cálculo de distâncias.",
            reviewQuestions: [
              {
                q: "Se um triângulo tem lados medindo 5, 12 e 13, qual é a sua classificação geométrica quanto aos ângulos?",
                options: ["Triângulo retângulo", "Triângulo acutângulo", "Triângulo obtusângulo", "Triângulo equilátero"],
                correct: 0,
                hint: "5² + 12² = 25 + 144 = 169 = 13².",
                explanation: "Como satisfaz perfeitamente o Teorema de Pitágoras, é um triângulo retângulo."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 10 — Geometria Plana",
      instructions: "Calcula perímetros, áreas e medidas métricas com exatidão.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é a área de um círculo com raio r = 7 cm (considerando π ≈ 22/7)?",
          options: ["154 cm²", "44 cm²", "49 cm²", "308 cm²"],
          correct: 0,
          hint: "Fórmula da área do círculo: A = πr².",
          explanation: "A = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm²."
        }
      ]
    }
  },
  {
    id: "mat-mod-11",
    moduleNumber: 11,
    title: "Geometria Espacial",
    description: "Poliedros (relação de Euler), prismas, cilindros, pirâmides, cones, esferas, áreas de superfície e volumes tridimensionais.",
    targetLevel: "Intermédio",
    estimatedHours: 20,
    units: [
      {
        id: "mat-u11-1",
        unitNumber: 1,
        title: "Prismas, Cilindros e Corpos Redondos",
        description: "Princípio de Cavalieri, volume do cilindro, cone e esfera, e áreas de desenvolvimento lateral.",
        lessons: [
          {
            id: "mat-l-11-1-1",
            title: "Cálculo de Volumes: Cilindros, Cones e Esferas",
            durationMinutes: 60,
            explanation: "O volume de qualquer sólido de secção transversal constante (prismas e cilindros) é dado pelo produto da área da base pela altura: V = A_base × h. Para um cilindro de raio r: V = πr²h. Para corpos afilados (pirâmides e cones), o volume é exatamente um terço do prisma correspondente: V = (1/3) × A_base × h; para o cone: V = (1/3)πr²h. Para a esfera de raio r, o volume deduzido por Arquimedes é V = (4/3)πr³ e a área da superfície é A = 4πr².",
            fundamentalConcepts: [
              "Fórmula de Euler para poliedros convexos: V - A + F = 2",
              "Volume de prismas/cilindros: V = A_b × h",
              "Volume de pirâmides/cones: V = (1/3)A_b × h e esfera: V = (4/3)πr³"
            ],
            practicalExamples: [
              "Volume de um reservatório cilíndrico com raio 2 m e altura 5 m: V = π(2)²(5) = 20π m³ ≈ 62.83 m³ (ou 62 830 litros).",
              "Poliedro com 8 vértices e 12 arestas: V - A + F = 2 ➔ 8 - 12 + F = 2 ➔ F = 6 faces (é um cubo ou paralelepípedo)."
            ],
            realWorldApplications: [
              "Armazenamento de gás e líquidos em silos cilíndricos e tanques esféricos sob pressão.",
              "Logística e embalamento: cálculo de cubagem para transporte marítimo em contentores."
            ],
            stepByStepExercises: [
              {
                problem: "Um cone reto tem raio da base r = 3 cm e altura h = 4 cm. Calcula a sua geratriz g e o seu volume.",
                steps: [
                  "Passo 1: A geratriz g forma um triângulo retângulo com o raio r e a altura h: g² = r² + h².",
                  "g² = 3² + 4² = 9 + 16 = 25 ➔ g = √25 = 5 cm.",
                  "Passo 2: Calcular a área da base: A_b = πr² = π(3)² = 9π cm².",
                  "Passo 3: Calcular o volume: V = (1/3) × A_b × h = (1/3) × 9π × 4 = 36π / 3 = 12π cm³."
                ],
                finalAnswer: "Geratriz g = 5 cm e Volume V = 12π cm³ (≈ 37.7 cm³)."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o volume de um cubo com aresta medindo 5 cm?",
                options: ["25 cm³", "125 cm³", "150 cm³", "75 cm³"],
                correct: 1,
                hint: "Volume do cubo: V = a³.",
                explanation: "V = 5 × 5 × 5 = 125 cm³."
              }
            ],
            summary: "A geometria espacial permite modelar e dimensionar a capacidade e superfícies de estruturas reais no espaço tridimensional.",
            reviewQuestions: [
              {
                q: "Qual é a relação de Euler para qualquer poliedro convexo com V vértices, A arestas e F faces?",
                options: ["V + A = F + 2", "V - A + F = 2", "V + F + A = 2", "V × F = A²"],
                correct: 1,
                hint: "Vértices menos arestas mais faces igual a dois.",
                explanation: "A fórmula de Leonhard Euler demonstra que V - A + F = 2 para todo poliedro convexo."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 11 — Geometria Espacial",
      instructions: "Aplica as fórmulas de volume e capacidade tridimensional.",
      passingScorePercentage: 70,
      questions: [
        {
          q: "Se duplicarmos o raio de um cilindro mantendo a sua altura constante, o que acontece ao seu volume?",
          options: ["Duplica", "Triplica", "Quadruplica (aumenta 4 vezes)", "Permanece o mesmo"],
          correct: 2,
          hint: "O raio na fórmula do volume está elevado ao quadrado: V = πr²h. (2r)² = 4r².",
          explanation: "Como o volume depende de r², duplicar o raio multiplica o volume por 2² = 4."
        }
      ]
    }
  },
  {
    id: "mat-mod-12",
    moduleNumber: 12,
    title: "Trigonometria",
    description: "Círculo trigonométrico, radianos, seno, cosseno, tangente, fórmulas de adição de arcos, equações trigonométricas e Teoremas dos Senos e Cossenos.",
    targetLevel: "Intermédio",
    estimatedHours: 22,
    units: [
      {
        id: "mat-u12-1",
        unitNumber: 1,
        title: "Círculo Trigonométrico e Relações Fundamentais",
        description: "Radianos e graus (π rad = 180°), sen²x + cos²x = 1, e redução ao primeiro quadrante.",
        lessons: [
          {
            id: "mat-l-12-1-1",
            title: "Relação Fundamental e Círculo Unitário",
            durationMinutes: 65,
            explanation: "No círculo trigonométrico de raio 1 centrado na origem, qualquer ponto P correspondente a um ângulo θ tem coordenadas (cos θ, sen θ). Pelo Teorema de Pitágoras no triângulo retângulo de catetos cos θ e sen θ e hipotenusa 1, deduz-se a Relação Fundamental da Trigonometria: sen²θ + cos²θ = 1. A tangente define-se por tg θ = sen θ / cos θ (para cos θ ≠ 0). A conversão angular universal é π radianos = 180 graus.",
            fundamentalConcepts: [
              "Conversão: 1 rad = 180° / π e 360° = 2π rad",
              "Relação Fundamental: sen²θ + cos²θ = 1",
              "Valores notáveis para 0°, 30° (π/6), 45° (π/4), 60° (π/3) e 90° (π/2)"
            ],
            practicalExamples: [
              "Se sen x = 3/5 num ângulo agudo do 1º quadrante: cos²x = 1 - (3/5)² = 1 - 9/25 = 16/25 ➔ cos x = 4/5. Tangente: tg x = (3/5)/(4/5) = 3/4.",
              "Converter 60° para radianos: 60° × (π / 180°) = π / 3 radianos."
            ],
            realWorldApplications: [
              "Engenharia eletrotécnica: análise de corrente alternada e tensão sinusoidal v(t) = V_max · sen(ωt + φ).",
              "Processamento de sinais digitais e compressão de áudio (transformadas de Fourier baseadas em senos e cossenos)."
            ],
            stepByStepExercises: [
              {
                problem: "Num triângulo qualquer com lados b = 5, c = 8 e ângulo entre eles A = 60°, calcula o lado oposto 'a' usando a Lei dos Cossenos.",
                steps: [
                  "Passo 1: Escrever a Lei dos Cossenos: a² = b² + c² - 2bc · cos(A).",
                  "Passo 2: Substituir os valores: b = 5, c = 8 e cos(60°) = 1/2.",
                  "a² = 5² + 8² - 2(5)(8)(1/2).",
                  "Passo 3: Efetuar os cálculos aritméticos: a² = 25 + 64 - 40 = 89 - 40 = 49.",
                  "Passo 4: Extrair a raiz quadrada positiva: a = √49 = 7."
                ],
                finalAnswer: "O lado oposto 'a' mede exatamente 7."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o valor exato de sen(30°) + cos(60°)?",
                options: ["1", "√3", "1/2", "0"],
                correct: 0,
                hint: "sen(30°) = 1/2 e cos(60°) = 1/2.",
                explanation: "1/2 + 1/2 = 1."
              }
            ],
            summary: "A trigonometria transforma problemas angulares e ondulatórios em relações algébricas diretas.",
            reviewQuestions: [
              {
                q: "Qual é a Relação Fundamental da Trigonometria?",
                options: ["sen x + cos x = 1", "sen²x + cos²x = 1", "sen²x - cos²x = 1", "tg x = sen x · cos x"],
                correct: 1,
                hint: "Derivação direta do Teorema de Pitágoras no círculo de raio 1.",
                explanation: "sen²x + cos²x = 1 é válida para qualquer número real x."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 12 — Trigonometria",
      instructions: "Utiliza os valores notáveis e a Lei dos Cossenos.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Quantos radianos equivalem a um ângulo reto de 90 graus?",
          options: ["π / 2 rad", "π rad", "2π rad", "π / 4 rad"],
          correct: 0,
          hint: "Como 180° = π rad, 90° é a metade.",
          explanation: "90° = 180° / 2 = π / 2 radianos."
        }
      ]
    }
  }
];
