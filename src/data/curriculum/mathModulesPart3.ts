import { CurriculumModule } from '../../types';

export const MATH_MODULES_PART3: CurriculumModule[] = [
  {
    id: "mat-mod-7",
    moduleNumber: 7,
    title: "Equações e Inequações",
    description: "Equações lineares de 1º grau, equações de 2º grau (fórmula resolvente de Bhaskara, discriminante delta), inequações e representação em intervalos reais.",
    targetLevel: "Intermédio",
    estimatedHours: 18,
    units: [
      {
        id: "mat-u7-1",
        unitNumber: 1,
        title: "Equações de 2º Grau e a Fórmula Resolvente",
        description: "Forma canónica ax² + bx + c = 0, discriminante Δ = b² - 4ac e discussão do número de soluções reais.",
        lessons: [
          {
            id: "mat-l-7-1-1",
            title: "Dedução e Aplicação da Fórmula Resolvente de Bhaskara",
            durationMinutes: 60,
            explanation: "Uma equação quadrática ou de 2º grau tem a forma ax² + bx + c = 0 (com a ≠ 0). As soluções são dadas pela fórmula resolvente: x = (-b ± √Δ) / (2a), onde Δ = b² - 4ac é o discriminante. O valor de Δ dita a natureza das raízes: se Δ > 0, há duas raízes reais e distintas; se Δ = 0, há uma raiz real dupla (duas raízes coincidentes, x = -b/(2a)); se Δ < 0, não existem raízes reais (as raízes pertencem ao conjunto dos números complexos ℂ).",
            fundamentalConcepts: [
              "Identificação dos coeficientes a, b e c",
              "Cálculo do discriminante Δ = b² - 4ac",
              "Interpretação geométrica: as raízes correspondem às interseções da parábola y = ax² + bx + c com o eixo das abcissas (Ox)"
            ],
            practicalExamples: [
              "Resolver x² - 5x + 6 = 0: a = 1, b = -5, c = 6. Δ = (-5)² - 4(1)(6) = 25 - 24 = 1. Como Δ > 0, x = (5 ± √1) / 2 = (5 ± 1) / 2. Logo, x₁ = 3 e x₂ = 2.",
              "Equação incompleta 2x² - 8 = 0: 2x² = 8 ➔ x² = 4 ➔ x = ±2 (sem necessidade de fórmula resolvente)."
            ],
            realWorldApplications: [
              "Balística e desporto: cálculo do tempo de voo e alcance de uma bola lançada no ar sob gravidade.",
              "Arquitetura: dimensionamento de arcos parabólicos em pontes suspensas e túneis."
            ],
            stepByStepExercises: [
              {
                problem: "Resolve a equação de 2º grau: 2x² - 4x - 6 = 0.",
                steps: [
                  "Passo 1: Identificar coeficientes: a = 2, b = -4, c = -6.",
                  "Passo 2: Calcular o discriminante Δ: Δ = (-4)² - 4(2)(-6) = 16 + 48 = 64.",
                  "Passo 3: Como Δ = 64 > 0, calcular as raízes: x = [-(-4) ± √64] / [2(2)] = (4 ± 8) / 4.",
                  "Passo 4: Separar os dois casos: x₁ = (4 + 8) / 4 = 12 / 4 = 3; x₂ = (4 - 8) / 4 = -4 / 4 = -1."
                ],
                finalAnswer: "Conjunto-solução: S = {-1, 3}"
              }
            ],
            practiceExercises: [
              {
                q: "Quantas soluções reais tem a equação x² + 2x + 5 = 0?",
                options: ["Duas soluções reais distintas", "Uma solução real dupla", "Nenhuma solução real", "Três soluções reais"],
                correct: 2,
                hint: "Calcula o discriminante Δ = b² - 4ac.",
                explanation: "Δ = 2² - 4(1)(5) = 4 - 20 = -16. Como Δ < 0, a equação não admite raízes reais."
              }
            ],
            summary: "A fórmula resolvente resolve de modo universal qualquer equação polinomial do segundo grau.",
            reviewQuestions: [
              {
                q: "Qual é o valor do discriminante da equação x² - 6x + 9 = 0?",
                options: ["0 (uma raiz real dupla)", "9", "36", "-18"],
                correct: 0,
                hint: "Δ = (-6)² - 4(1)(9) = 36 - 36.",
                explanation: "Δ = 0 indica que a parábola tangencia o eixo Ox num único ponto (raiz dupla x = 3)."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 7 — Equações e Inequações",
      instructions: "Determina o conjunto-solução exato para cada problema.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é a solução da inequação de 1º grau: -3x + 9 ≤ 0?",
          options: ["x ≥ 3", "x ≤ 3", "x ≥ -3", "x ≤ -3"],
          correct: 0,
          hint: "Ao dividir ou multiplicar uma inequação por um número negativo (-3), o sentido da desigualdade inverte-se.",
          explanation: "-3x ≤ -9 ➔ x ≥ -9 / (-3) ➔ x ≥ 3."
        }
      ]
    }
  },
  {
    id: "mat-mod-8",
    moduleNumber: 8,
    title: "Sistemas de Equações",
    description: "Sistemas lineares 2x2 e 3x3, métodos de substituição, adição algébrica (eliminação), determinantes (Regra de Cramer) e classificação de sistemas.",
    targetLevel: "Intermédio",
    estimatedHours: 16,
    units: [
      {
        id: "mat-u8-1",
        unitNumber: 1,
        title: "Métodos de Resolução de Sistemas 2x2",
        description: "Substituição, eliminação e interpretação geométrica como interseção de retas.",
        lessons: [
          {
            id: "mat-l-8-1-1",
            title: "Método da Substituição e da Eliminação",
            durationMinutes: 55,
            explanation: "Um sistema de equações lineares procura valores simultâneos para as variáveis que satisfaçam todas as igualdades ao mesmo tempo. Geometricamente, a solução de um sistema 2x2 de duas retas no plano corresponde ao ponto de interseção P(x, y). Se as retas se intersetam num único ponto, o sistema é Possível e Determinado (SPD); se são paralelas distintas, é Impossível (SI, sem solução); se são coincidentes, é Possível e Indeterminado (SPI, infinitas soluções).",
            fundamentalConcepts: [
              "Método da substituição: isolar uma incógnita e substituir na outra equação",
              "Método da adição/eliminação: multiplicar equações por fatores para anular uma incógnita ao somar",
              "Classificação: SPD (1 solução), SPI (infinitas soluções) e SI (0 soluções)"
            ],
            practicalExamples: [
              "Sistema: { x + y = 10 ; x - y = 4 }. Somando as duas equações: 2x = 14 ➔ x = 7. Substituindo: 7 + y = 10 ➔ y = 3. Solução: (7, 3).",
              "Problema das moedas: 'Tenho 15 moedas de 1€ e 2€ totalizando 22€'. { x + y = 15 ; x + 2y = 22 }. Subtraindo: y = 7 (moedas de 2€) e x = 8 (moedas de 1€)."
            ],
            realWorldApplications: [
              "Ponto de equilíbrio (break-even point) em economia: interseção da função custo com a função receita.",
              "Planeamento de rotas e cruzamento de trajetórias de voo ou satélites."
            ],
            stepByStepExercises: [
              {
                problem: "Resolve o sistema de equações pelo método da adição: { 2x + 3y = 19 ; 3x - y = 1 }.",
                steps: [
                  "Passo 1: Multiplicar a segunda equação por 3 para igualar os coeficientes de y com sinais opostos: 3 × (3x - y = 1) ➔ 9x - 3y = 3.",
                  "Passo 2: Somar a primeira equação com a nova segunda equação: (2x + 3y) + (9x - 3y) = 19 + 3 ➔ 11x = 22.",
                  "Passo 3: Isolar x: x = 22 / 11 = 2.",
                  "Passo 4: Substituir x = 2 na equação 3x - y = 1: 3(2) - y = 1 ➔ 6 - y = 1 ➔ y = 5."
                ],
                finalAnswer: "O par ordenado solução é (x, y) = (2, 5)."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é a solução do sistema { x + 2y = 8 ; 2x + 4y = 10 }?",
                options: ["Sistema Possível Determinado (1 solução)", "Sistema Impossível (nenhuma solução)", "Sistema Possível Indeterminado", "(4, 2)"],
                correct: 1,
                hint: "Repara que a segunda equação tem o dobro dos coeficientes da primeira no membro esquerdo (2x + 4y = 16 ≠ 10).",
                explanation: "As retas são estritamente paralelas e nunca se cruzam. O sistema é Impossível (SI)."
              }
            ],
            summary: "Sistemas lineares modelam interações simultâneas em todas as engenharias e na ciência de dados.",
            reviewQuestions: [
              {
                q: "O que representa geometricamente a solução única de um sistema de 2 equações lineares a duas incógnitas?",
                options: ["O ponto de interseção entre duas retas", "A área entre duas curvas", "A inclinação da reta", "O ponto de corte no eixo vertical"],
                correct: 0,
                hint: "Ponto comum a ambas as trajetórias.",
                explanation: "As coordenadas (x, y) são exatamente as coordenadas do ponto onde as retas se cruzam."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 8 — Sistemas Lineares",
      instructions: "Encontra o par ou terno ordenado que satisfaz simultaneamente as equações.",
      passingScorePercentage: 70,
      questions: [
        {
          q: "No sistema { 4x - y = 9 ; x + y = 6 }, qual é o valor de x?",
          options: ["3", "4", "2", "5"],
          correct: 0,
          hint: "Soma diretamente as duas equações: 4x + x = 5x; 9 + 6 = 15.",
          explanation: "5x = 15 ➔ x = 3. Consequentemente y = 6 - 3 = 3."
        }
      ]
    }
  },
  {
    id: "mat-mod-9",
    moduleNumber: 9,
    title: "Funções e Gráficos",
    description: "Conceito de função, domínio, contradomínio, conjunto de imagem, função afim (1º grau), função quadrática (vértice da parábola), injetividade e sobrejetividade.",
    targetLevel: "Intermédio",
    estimatedHours: 20,
    units: [
      {
        id: "mat-u9-1",
        unitNumber: 1,
        title: "Funções Afins e Funções Quadráticas",
        description: "Taxa de variação (declive m), ordenada na origem b, concavidade e coordenadas do vértice da parábola.",
        lessons: [
          {
            id: "mat-l-9-1-1",
            title: "Função Afim: Declive, Interseções e Modelação Linear",
            durationMinutes: 55,
            explanation: "Uma função real de variável real f: D → ℝ é uma relação que associa a cada elemento x do domínio um único elemento f(x) na imagem. A função afim tem a expressão f(x) = mx + b, onde m é o declive ou coeficiente angular (m = (y₂ - y₁) / (x₂ - x₁)) e b é a ordenada na origem (ponto (0, b)). Se m > 0 a função é estritamente crescente; se m < 0 é decrescente; se m = 0 é constante.",
            fundamentalConcepts: [
              "Domínio D_f e Conjunto Imagem Im_f",
              "Declive m = Δy / Δx e taxa de variação constante",
              "Equação da reta que passa por dois pontos dados"
            ],
            practicalExamples: [
              "Tarifário de táxi: f(x) = 3.50 + 0.80x, onde 3.50€ é a bandeirada inicial fixa (b) e 0.80€ é o custo por cada km rodado (m). Para 10 km: f(10) = 3.50 + 8.00 = 11.50€.",
              "Conversão de temperatura: F = 1.8C + 32 é uma função afim com declive 1.8 e ordenada na origem 32."
            ],
            realWorldApplications: [
              "Economia: funções de oferta e procura e análise de elasticidade linear.",
              "Física: movimento retilíneo uniforme (MRU), s(t) = s₀ + vt."
            ],
            stepByStepExercises: [
              {
                problem: "Encontra a equação da reta afim que passa pelos pontos A(1, 5) e B(3, 11).",
                steps: [
                  "Passo 1: Calcular o declive m através da fórmula m = (y₂ - y₁) / (x₂ - x₁).",
                  "m = (11 - 5) / (3 - 1) = 6 / 2 = 3.",
                  "Passo 2: Utilizar a forma geral y = mx + b com m = 3: y = 3x + b.",
                  "Passo 3: Substituir as coordenadas do ponto A(1, 5) para determinar b: 5 = 3(1) + b ➔ b = 5 - 3 = 2.",
                  "Passo 4: Escrever a expressão analítica final: f(x) = 3x + 2."
                ],
                finalAnswer: "f(x) = 3x + 2"
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o declive da reta definida pela equação 2y - 6x = 8?",
                options: ["-6", "3", "6", "4"],
                correct: 1,
                hint: "Coloca a equação na forma explícita y = mx + b dividindo por 2.",
                explanation: "2y = 6x + 8 ➔ y = 3x + 4. O coeficiente de x é m = 3."
              }
            ],
            summary: "A função afim é o modelo fundamental para processos em que a taxa de variação permanece perfeitamente estável.",
            reviewQuestions: [
              {
                q: "Se uma função afim tem declive negativo (m < 0), qual é o seu comportamento gráfico?",
                options: ["Cresce da esquerda para a direita", "Decresce da esquerda para a direita", "Permanece horizontal", "É uma parábola"],
                correct: 1,
                hint: "Conforme x aumenta, o valor de y diminui.",
                explanation: "Declive negativo significa que a reta tem inclinação descendente."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 9 — Funções e Gráficos",
      instructions: "Interpreta domínios, raízes e pontos notáveis.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é a abcissa do vértice da parábola dada por f(x) = x² - 6x + 8?",
          options: ["x = 3", "x = -3", "x = 6", "x = 2"],
          correct: 0,
          hint: "A fórmula da abcissa do vértice é x_v = -b / (2a).",
          explanation: "x_v = -(-6) / (2 × 1) = 6 / 2 = 3."
        }
      ]
    }
  }
];
