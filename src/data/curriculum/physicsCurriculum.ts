import { CurriculumModule, FinalSubjectAssessment } from '../../types';

export const PHYSICS_MODULES: CurriculumModule[] = [
  {
    id: "fis-mod-1",
    moduleNumber: 1,
    title: "Medição, Grandezas Físicas e Vetores",
    description: "Sistema Internacional de Unidades (SI), análise dimensional, notação científica, algarismos significativos e álgebra vetorial (soma vetorial, produto escalar e vetorial).",
    targetLevel: "Iniciante",
    estimatedHours: 14,
    units: [
      {
        id: "fis-u1-1",
        unitNumber: 1,
        title: "O Sistema Internacional e Análise Vetorial",
        description: "Grandezas fundamentais e derivadas, conversão de unidades e representação de vetores em componentes cartesianas.",
        lessons: [
          {
            id: "fis-l-1-1-1",
            title: "Grandezas Escalares vs. Vetoriais e Decomposição no Plano",
            durationMinutes: 55,
            explanation: "Na Física, uma grandeza escalar fica perfeitamente definida apenas com a sua magnitude e unidade (ex: massa de 5 kg, temperatura de 20°C, tempo de 12 s). Em contrapartida, uma grandeza vetorial necessita obrigatoriamente de três atributos: magnitude (intensidade/módulo), direção e sentido (ex: velocidade, aceleração, força). Um vetor V no plano cartesiano decompõe-se nas componentes ortogonais V_x = |V| · cos(θ) e V_y = |V| · sen(θ). O módulo é dado pelo Teorema de Pitágoras: |V| = √(V_x² + V_y²).",
            fundamentalConcepts: [
              "Grandezas fundamentais do SI: metro (m), quilograma (kg), segundo (s), ampere (A), kelvin (K), mol e candela (cd)",
              "Regra do paralelogramo e regra do polígono para adição vetorial",
              "Produto escalar A · B = |A||B|cos(θ) e produto vetorial |A × B| = |A||B|sen(θ)"
            ],
            practicalExamples: [
              "Um barco quer atravessar um rio para norte a 4 m/s, mas a corrente arrasta-o para leste a 3 m/s. A velocidade resultante é |V| = √(4² + 3²) = √(16 + 9) = √25 = 5 m/s na direção nordeste.",
              "Conversão de km/h para m/s: divide-se por 3.6 (ex: 72 km/h = 72 / 3.6 = 20 m/s)."
            ],
            realWorldApplications: [
              "Aeronáutica: correção da rota de aviões para compensar ventos laterais através de triângulos de velocidades vetoriais.",
              "Navegação marítima e orientação espacial de sondas interplanetárias."
            ],
            stepByStepExercises: [
              {
                problem: "Uma força F de 50 N é aplicada com um ângulo de 30° em relação à horizontal. Calcula as componentes horizontal (F_x) e vertical (F_y). (Dado: cos 30° = 0.866; sen 30° = 0.500).",
                steps: [
                  "Passo 1: Escrever as fórmulas de decomposição trigonométrica:",
                  "F_x = F · cos(θ) e F_y = F · sen(θ).",
                  "Passo 2: Substituir a intensidade F = 50 N e o ângulo θ = 30°:",
                  "F_x = 50 × cos(30°) = 50 × 0.866 = 43.3 N.",
                  "Passo 3: F_y = 50 × sen(30°) = 50 × 0.5 = 25.0 N."
                ],
                finalAnswer: "Componente horizontal F_x = 43.3 N e componente vertical F_y = 25.0 N."
              }
            ],
            practiceExercises: [
              {
                q: "Qual das seguintes grandezas físicas é puramente escalar?",
                options: ["Tempo", "Aceleração", "Força gravitacional", "Velocidade"],
                correct: 0,
                hint: "Não possui direção nem sentido espacial.",
                explanation: "O tempo não tem sentido para a esquerda ou para cima; fica totalmente descrito apenas por um número e unidade (segundos)."
              }
            ],
            summary: "A distinção entre escalares e vetores é o primeiro passo para compreender as leis do movimento e as forças na natureza.",
            reviewQuestions: [
              {
                q: "Qual é o módulo do vetor resultante da soma de dois vetores perpendiculares de 6 N e 8 N?",
                options: ["10 N", "14 N", "2 N", "48 N"],
                correct: 0,
                hint: "R² = 6² + 8² = 36 + 64 = 100.",
                explanation: "R = √100 = 10 N."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 1 — Medição e Vetores",
      instructions: "Resolve os problemas respeitando unidades SI e vetores.",
      passingScorePercentage: 70,
      questions: [
        {
          q: "Quantos metros por segundo (m/s) equivalem a uma velocidade de 108 km/h?",
          options: ["30 m/s", "300 m/s", "38.8 m/s", "25 m/s"],
          correct: 0,
          hint: "Divide por 3.6: 108 / 3.6.",
          explanation: "108 / 3.6 = 30 m/s."
        }
      ]
    }
  },
  {
    id: "fis-mod-2",
    moduleNumber: 2,
    title: "Cinemática Escalar e Vetorial",
    description: "Movimento Retilíneo Uniforme (MRU), Movimento Retilíneo Uniformemente Variado (MRUV), Equação de Torricelli, gráficos s(t), v(t) e a(t), e queda livre vertical sob aceleração gravitacional.",
    targetLevel: "Iniciante",
    estimatedHours: 16,
    units: [
      {
        id: "fis-u2-1",
        unitNumber: 1,
        title: "MRU, MRUV e Queda Livre",
        description: "Equação horária da posição s = s₀ + v₀t + (1/2)at² e velocidade v² = v₀² + 2aΔs.",
        lessons: [
          {
            id: "fis-l-2-1-1",
            title: "Equações Horárias do MRUV e Equação de Torricelli",
            durationMinutes: 60,
            explanation: "No MRUV, a aceleração escalar média e instantânea é constante e diferente de zero: a = dv/dt = const. A velocidade varia linearmente no tempo: v(t) = v₀ + at. A posição varia quadraticamente: s(t) = s₀ + v₀t + (1/2)at². Quando o tempo não é informado nem solicitado, utiliza-se a Equação de Torricelli: v² = v₀² + 2aΔs. Na queda livre nas proximidades da superfície terrestre (desprezando a resistência do ar), a aceleração é a gravidade g ≈ 9.8 m/s² (ou 10 m/s² para cálculos didáticos).",
            fundamentalConcepts: [
              "Velocidade média v_m = Δs / Δt vs. velocidade instantânea v = ds/dt",
              "Aceleração como taxa de variação da velocidade: a = Δv / Δt",
              "Equação de Torricelli: v² = v₀² + 2aΔs (independente do tempo)"
            ],
            practicalExamples: [
              "Um carro acelera de 0 a 100 km/h (27.8 m/s) em 5 segundos: a = (27.8 - 0)/5 = 5.56 m/s².",
              "Um objeto solto do repouso do cimo de um edifício cai durante 3 segundos (g = 10 m/s²): v = 0 + 10(3) = 30 m/s (108 km/h). Altura percorrida: h = (1/2)(10)(3)² = 5 × 9 = 45 metros."
            ],
            realWorldApplications: [
              "Engenharia automóvel: dimensionamento de distâncias de travagem de emergência para sistemas de segurança ABS.",
              "Cálculo de semáforos e tempo de transição em cruzamentos viários."
            ],
            stepByStepExercises: [
              {
                problem: "Um veículo desloca-se a 20 m/s e trava bruscamente com desaceleração constante de 4 m/s² até parar completamente. Que distância percorre durante a travagem?",
                steps: [
                  "Passo 1: Identificar os dados conhecidos: velocidade inicial v₀ = 20 m/s; velocidade final v = 0 m/s (paragem); aceleração a = -4 m/s² (desaceleração).",
                  "Passo 2: Como não temos o tempo, aplicar a Equação de Torricelli: v² = v₀² + 2aΔs.",
                  "Passo 3: Substituir os valores: 0² = 20² + 2(-4)Δs.",
                  "0 = 400 - 8Δs ➔ 8Δs = 400.",
                  "Passo 4: Isolar Δs: Δs = 400 / 8 = 50 metros."
                ],
                finalAnswer: "A distância de travagem é de exatamente 50 metros."
              }
            ],
            practiceExercises: [
              {
                q: "Se um corpo cai a partir do repouso durante 2 segundos sob g = 10 m/s², qual é a distância percorrida?",
                options: ["20 m", "10 m", "40 m", "5 m"],
                correct: 0,
                hint: "Δs = (1/2)gt² = (1/2) × 10 × 2².",
                explanation: "5 × 4 = 20 metros."
              }
            ],
            summary: "A cinemática descreve matematicamente as trajetórias e o tempo dos corpos sem se preocupar ainda com as forças que os geram.",
            reviewQuestions: [
              {
                q: "No gráfico de velocidade em função do tempo v(t), o que representa a área sob a curva?",
                options: ["O deslocamento escalar Δs", "A aceleração instantânea", "A energia potencial", "A força resultante"],
                correct: 0,
                hint: "Área = base (tempo) × altura (velocidade) = m/s × s = metros.",
                explanation: "A integral da velocidade no tempo é exatamente a variação de posição ou deslocamento Δs."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 2 — Cinemática",
      instructions: "Aplica as equações horárias e a equação de Torricelli.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é a velocidade atingida por uma pedra em queda livre solta do repouso após cair 5 metros (g = 10 m/s²)?",
          options: ["10 m/s", "50 m/s", "5 m/s", "20 m/s"],
          correct: 0,
          hint: "Torricelli: v² = v₀² + 2gΔs = 0 + 2(10)(5) = 100. v = √100.",
          explanation: "v = √100 = 10 m/s."
        }
      ]
    }
  },
  {
    id: "fis-mod-3",
    moduleNumber: 3,
    title: "Dinâmica e Leis de Newton",
    description: "1ª Lei (Inércia), 2ª Lei fundamental (F = m·a), 3ª Lei (Ação e Reação), força normal, forças de atrito estático e cinético, força elástica (Lei de Hooke) e planos inclinados.",
    targetLevel: "Intermédio",
    estimatedHours: 18,
    units: [
      {
        id: "fis-u3-1",
        unitNumber: 1,
        title: "As Três Leis de Newton e Forças de Atrito",
        description: "Princípio fundamental da dinâmica, diagrama de corpo livre e coeficientes de atrito μ_e e μ_c.",
        lessons: [
          {
            id: "fis-l-3-1-1",
            title: "As Três Leis de Newton e Diagrama de Corpo Livre",
            durationMinutes: 65,
            explanation: "As três leis publicadas por Isaac Newton em 1687 nos Principia regem a mecânica clássica: 1ª Lei (Inércia): Todo corpo permanece no seu estado de repouso ou de movimento retilíneo uniforme a menos que uma força resultante não nula atue sobre ele; 2ª Lei (Princípio Fundamental): A força resultante que atua sobre um corpo é igual à taxa de variação da sua quantidade de movimento, simplificada para F_res = m · a (em massa constante); 3ª Lei (Ação e Reação): A toda a ação corresponde uma reação de igual módulo, mesma direção e sentido oposto, atuando em corpos distintos (portanto, nunca se anulam mutuamente).",
            fundamentalConcepts: [
              "Força Peso: P = m · g (direção vertical apontando para o centro da Terra)",
              "Força Normal N: força de suporte perpendicular à superfície de contacto",
              "Força de atrito estático e cinético: F_at = μ · N",
              "Lei de Hooke para molas: F_el = -k · Δx"
            ],
            practicalExamples: [
              "Uso do cinto de segurança no carro: quando o veículo trava bruscamente, o passageiro tende a continuar em movimento retilíneo uniforme por inércia.",
              "Propulsão de foguetões: os gases expelidos em alta velocidade para baixo geram uma força de reação de igual intensidade que empurra o foguetão para cima."
            ],
            realWorldApplications: [
              "Segurança automóvel (zonas de deformação progressiva em colisões para reduzir a desaceleração sofrida pelos passageiros).",
              "Engenharia aeroespacial e dimensionamento de motores de lançamento de satélites."
            ],
            stepByStepExercises: [
              {
                problem: "Um bloco de massa m = 10 kg repousa sobre uma superfície horizontal com coeficiente de atrito cinético μ_c = 0.25. Uma força horizontal de 65 N é aplicada no bloco. Calcula a aceleração adquirida pelo bloco (adota g = 10 m/s²).",
                steps: [
                  "Passo 1: Calcular o Peso do bloco: P = m · g = 10 × 10 = 100 N.",
                  "Passo 2: Na direção vertical não há aceleração, logo a força Normal equilibra o Peso: N = P = 100 N.",
                  "Passo 3: Calcular a força de atrito cinético: F_at = μ_c · N = 0.25 × 100 = 25 N (em sentido contrário à força aplicada).",
                  "Passo 4: Calcular a força resultante horizontal: F_res = F_aplicada - F_at = 65 - 25 = 40 N.",
                  "Passo 5: Aplicar a 2ª Lei de Newton: F_res = m · a ➔ 40 = 10 · a ➔ a = 40 / 10 = 4 m/s²."
                ],
                finalAnswer: "A aceleração do bloco é de 4 m/s²."
              }
            ],
            practiceExercises: [
              {
                q: "Por que motivo as forças de ação e reação da 3ª Lei de Newton NUNCA se anulam?",
                options: [
                  "Porque atuam em corpos diferentes",
                  "Porque têm intensidades diferentes",
                  "Porque atuam em direções perpendiculares",
                  "Porque ocorrem em momentos de tempo diferentes"
                ],
                correct: 0,
                hint: "Se tu empurras uma parede, a força atua na parede e a reação atua na tua mão.",
                explanation: "Para duas forças se anularem, teriam de atuar sobre o mesmo corpo. Como atuam em corpos distintos, produzem efeitos em entidades separadas."
              }
            ],
            summary: "As leis de Newton explicam desde a queda de uma maçã até a órbita da Lua e dos planetas ao redor do Sol.",
            reviewQuestions: [
              {
                q: "Qual é a força resultante necessária para acelerar uma massa de 5 kg a 3 m/s²?",
                options: ["15 N", "8 N", "1.66 N", "0.6 N"],
                correct: 0,
                hint: "F = m · a = 5 × 3.",
                explanation: "15 Newtons."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 3 — Dinâmica e Leis de Newton",
      instructions: "Calcula forças de atrito, resultantes e acelerações.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Se um corpo está em movimento retilíneo uniforme (MRU), qual é o valor da força resultante sobre ele?",
          options: ["Zero", "Igual ao peso", "Constante e positiva", "Infinita"],
          correct: 0,
          hint: "Se a velocidade é constante, a aceleração é zero (a = 0), logo F = m · a = 0.",
          explanation: "De acordo com a 1ª Lei de Newton, velocidade vetorial constante implica força resultante nula."
        }
      ]
    }
  }
];

export const PHYSICS_FINAL_ASSESSMENTS: FinalSubjectAssessment[] = [
  {
    level: "Iniciante",
    title: "Exame Final de Física — Mecânica Fundamental",
    certificateBadgeId: "badge_fis_iniciante",
    questions: [
      {
        q: "Qual é o valor da energia cinética de um carro de 1000 kg a uma velocidade de 20 m/s?",
        options: ["200 000 J (200 kJ)", "10 000 J", "400 000 J", "20 000 J"],
        correct: 0,
        hint: "E_c = (1/2)mv² = (1/2) × 1000 × (20)².",
        explanation: "500 × 400 = 200 000 Joules = 200 kJ."
      }
    ]
  }
];
