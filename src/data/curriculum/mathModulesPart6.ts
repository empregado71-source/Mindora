import { CurriculumModule } from '../../types';

export const MATH_MODULES_PART6: CurriculumModule[] = [
  {
    id: "mat-mod-16",
    moduleNumber: 16,
    title: "Polinómios",
    description: "Grau, valor numérico, operações com polinómios, divisão euclidiana (método da chave), dispositivo prático de Briot-Ruffini e Teorema do Resto de d'Alembert.",
    targetLevel: "Avançado",
    estimatedHours: 18,
    units: [
      {
        id: "mat-u16-1",
        unitNumber: 1,
        title: "Divisão de Polinómios e Algoritmo de Briot-Ruffini",
        description: "Teorema do Resto, divisão por binómios do tipo (x - a) e raízes de polinómios.",
        lessons: [
          {
            id: "mat-l-16-1-1",
            title: "Dispositivo de Briot-Ruffini e Teorema do Resto",
            durationMinutes: 60,
            explanation: "O Teorema do Resto estabelece que o resto da divisão de um polinómio P(x) por um binómio de 1º grau (x - a) é exatamente igual ao valor numérico do polinómio no ponto a: Resto = P(a). Se P(a) = 0, então 'a' é uma raiz de P(x) e P(x) é divisível por (x - a). O dispositivo de Briot-Ruffini é um algoritmo simplificado que permite determinar o quociente Q(x) e o resto R da divisão de P(x) por (x - a) operando apenas com os coeficientes numéricos.",
            fundamentalConcepts: [
              "Teorema do Resto: R = P(a)",
              "Teorema Fundamental da Álgebra: todo polinómio de grau n possui exatamente n raízes complexas",
              "Dispositivo prático de Briot-Ruffini para divisão rápida"
            ],
            practicalExamples: [
              "Calcular o resto de P(x) = x³ - 4x² + 5x - 2 por (x - 2): R = P(2) = 2³ - 4(2)² + 5(2) - 2 = 8 - 16 + 10 - 2 = 0. Como R = 0, x = 2 é raiz de P(x).",
              "Se P(x) tem raízes 1, 2 e 3 com coeficiente principal 1, então P(x) = (x - 1)(x - 2)(x - 3) = x³ - 6x² + 11x - 6."
            ],
            realWorldApplications: [
              "Engenharia de controle: análise de estabilidade de sistemas através dos polos (raízes) da equação característica.",
              "Computação gráfica: curvas de Bézier e interpolação polinomial de trajetórias 3D."
            ],
            stepByStepExercises: [
              {
                problem: "Determina o resto da divisão do polinómio P(x) = 2x⁴ - 3x² + 4x - 7 pelo binómio (x - 2).",
                steps: [
                  "Passo 1: Identificar a raiz do divisor (x - 2 = 0): a = 2.",
                  "Passo 2: Aplicar o Teorema do Resto: Resto = P(2).",
                  "Passo 3: Substituir x = 2 na expressão de P(x):",
                  "P(2) = 2(2)⁴ - 3(2)² + 4(2) - 7.",
                  "P(2) = 2(16) - 3(4) + 8 - 7 = 32 - 12 + 8 - 7.",
                  "Passo 4: Efetuar a soma: 32 - 12 = 20; 20 + 8 = 28; 28 - 7 = 21."
                ],
                finalAnswer: "O resto da divisão é R = 21."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o resto da divisão de P(x) = x³ - 7x + 6 por (x - 1)?",
                options: ["0 (é divisível)", "1", "6", "-2"],
                correct: 0,
                hint: "Calcula P(1) = 1³ - 7(1) + 6.",
                explanation: "1 - 7 + 6 = 0. Como o resto é zero, (x - 1) divide perfeitamente P(x)."
              }
            ],
            summary: "O Teorema do Resto e o método de Briot-Ruffini tornam a fatorização e análise de polinómios muito mais veloz.",
            reviewQuestions: [
              {
                q: "Se um número 'r' é raiz de um polinómio P(x), qual é o valor de P(r)?",
                options: ["0", "1", "-1", "r"],
                correct: 0,
                hint: "Definição de raiz ou zero de uma função polinomial.",
                explanation: "Por definição, a raiz anula o polinómio: P(r) = 0."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 16 — Polinómios",
      instructions: "Determina graus, quocientes e restos com exatidão.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é o grau do polinómio resultante do produto (x² + 3)(x³ - 2x + 1)?",
          options: ["5", "6", "3", "2"],
          correct: 0,
          hint: "O grau do produto é a soma dos graus dos polinómios fatores (2 + 3).",
          explanation: "Grau = 2 + 3 = 5."
        }
      ]
    }
  },
  {
    id: "mat-mod-17",
    moduleNumber: 17,
    title: "Fatorização e Frações Algébricas",
    description: "Fator comum em evidência, agrupamento, trinómio quadrado perfeito, diferença de quadrados, soma/diferença de cubos e simplificação de frações algébricas.",
    targetLevel: "Avançado",
    estimatedHours: 16,
    units: [
      {
        id: "mat-u17-1",
        unitNumber: 1,
        title: "Técnicas Avançadas de Fatorização",
        description: "Decomposição em fatores primos algébricos e simplificação de expressões racionais.",
        lessons: [
          {
            id: "mat-l-17-1-1",
            title: "Fator Comum, Agrupamento e Diferença de Quadrados",
            durationMinutes: 55,
            explanation: "Fatorizar uma expressão algébrica significa transformá-la num produto de fatores irredutíveis. As principais técnicas incluem: 1) Fator comum em evidência: ax + ay = a(x + y); 2) Agrupamento: ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y); 3) Diferença de dois quadrados: a² - b² = (a + b)(a - b); 4) Trinómio quadrado perfeito: a² ± 2ab + b² = (a ± b)²; 5) Soma e diferença de cubos: a³ + b³ = (a + b)(a² - ab + b²) e a³ - b³ = (a - b)(a² + ab + b²).",
            fundamentalConcepts: [
              "Condição de existência de frações algébricas: denominador diferente de zero",
              "Identificação de padrões notáveis inversos",
              "Cancelamento rigoroso de fatores multiplicativos comuns"
            ],
            practicalExamples: [
              "Fatorizar 4x² - 9y²: trata-se de (2x)² - (3y)², logo (2x + 3y)(2x - 3y).",
              "Simplificar a fração algébrica: (x² - 9) / (x² - 3x). Fatorizando o numerador: (x + 3)(x - 3); fatorizando o denominador: x(x - 3). Cancelando (x - 3): (x + 3) / x (para x ≠ 3 e x ≠ 0)."
            ],
            realWorldApplications: [
              "Cálculo diferencial e integral: eliminação de indeterminações 0/0 em limites através de fatorização prévia.",
              "Criptografia RSA e fatorização de números inteiros de centenas de dígitos."
            ],
            stepByStepExercises: [
              {
                problem: "Simplifica a fração algébrica: (x² - 5x + 6) / (x² - 4).",
                steps: [
                  "Passo 1: Fatorizar o numerador x² - 5x + 6. As raízes são x = 2 e x = 3. Logo, x² - 5x + 6 = (x - 2)(x - 3).",
                  "Passo 2: Fatorizar o denominador x² - 4 como diferença de quadrados: x² - 2² = (x - 2)(x + 2).",
                  "Passo 3: Escrever a fração com os fatores: [(x - 2)(x - 3)] / [(x - 2)(x + 2)].",
                  "Passo 4: Cancelar o fator comum (x - 2), sob a condição de que x ≠ 2 e x ≠ -2: (x - 3) / (x + 2)."
                ],
                finalAnswer: "(x - 3) / (x + 2) para x ≠ ±2."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é a forma fatorada do trinómio x² + 6x + 9?",
                options: ["(x + 3)²", "(x - 3)²", "(x + 9)(x + 1)", "(x + 3)(x - 3)"],
                correct: 0,
                hint: "É um trinómio quadrado perfeito: a² + 2ab + b² onde a = x e b = 3.",
                explanation: "(x + 3)² = x² + 2(3)(x) + 3² = x² + 6x + 9."
              }
            ],
            summary: "A fatorização transforma somas complexas em produtos fáceis de analisar e simplificar.",
            reviewQuestions: [
              {
                q: "Como se fatora a diferença de cubos a³ - b³?",
                options: [
                  "(a - b)(a² + ab + b²)",
                  "(a - b)³",
                  "(a + b)(a² - ab + b²)",
                  "(a - b)(a² - 2ab + b²)"
                ],
                correct: 0,
                hint: "O primeiro fator tem sinal negativo e o segundo tem todos os termos positivos.",
                explanation: "a³ - b³ = (a - b)(a² + ab + b²)."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 17 — Fatorização e Frações Algébricas",
      instructions: "Simplifica as expressões para a forma irredutível.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é a simplificação de (2x + 4) / (x² - 4)?",
          options: ["2 / (x - 2)", "2 / (x + 2)", "1 / (x - 2)", "2x / (x - 4)"],
          correct: 0,
          hint: "Fatoriza 2 no numerador: 2(x + 2). O denominador é (x + 2)(x - 2).",
          explanation: "2(x + 2) / [(x + 2)(x - 2)] = 2 / (x - 2)."
        }
      ]
    }
  },
  {
    id: "mat-mod-18",
    moduleNumber: 18,
    title: "Logaritmos e Exponenciais",
    description: "Definição de logaritmo, propriedades operatórias (produto, quociente, potência), mudança de base, função logarítmica e exponencial e equações transcendentais.",
    targetLevel: "Avançado",
    estimatedHours: 20,
    units: [
      {
        id: "mat-u18-1",
        unitNumber: 1,
        title: "Definição e Propriedades dos Logaritmos",
        description: "log_b(a) = c ⇔ bᶜ = a, logaritmo natural (ln) na base de Euler e logaritmo decimal.",
        lessons: [
          {
            id: "mat-l-18-1-1",
            title: "Propriedades Operatórias e Mudança de Base",
            durationMinutes: 65,
            explanation: "O logaritmo de um número positivo 'a' na base 'b' (com b > 0 e b ≠ 1) é o expoente 'c' ao qual 'b' deve ser elevado para resultar em 'a': log_b(a) = c ⇔ bᶜ = a. As propriedades operatórias fundamentais são: 1) log_b(x · y) = log_b(x) + log_b(y); 2) log_b(x / y) = log_b(x) - log_b(y); 3) log_b(xᵏ) = k · log_b(x); e a fórmula de Mudança de Base para base 'c': log_b(a) = log_c(a) / log_c(b). O logaritmo na base neperiana e ≈ 2.71828 chama-se logaritmo natural ou neperiano, escrito ln(x).",
            fundamentalConcepts: [
              "Condições de existência: logaritmando a > 0, base b > 0 e b ≠ 1",
              "Transformação de produtos em somas e divisões em subtrações",
              "A constante de Euler 'e' e a função ln(x)"
            ],
            practicalExamples: [
              "Calcular log₂(32): Como 2⁵ = 32, log₂(32) = 5.",
              "Se log(2) ≈ 0.301 e log(3) ≈ 0.477, então log(6) = log(2 × 3) = log(2) + log(3) ≈ 0.301 + 0.477 = 0.778.",
              "Calcular log(20) = log(2 × 10) = log(2) + log(10) = 0.301 + 1 = 1.301."
            ],
            realWorldApplications: [
              "Escalas logarítmicas de intensidade: Escala Richter para sismos, decibéis (dB) para pressão sonora e pH para acidez química.",
              "Datação por Carbono-14 em arqueologia através da equação de decaimento exponencial N(t) = N₀ · e^(-λt)."
            ],
            stepByStepExercises: [
              {
                problem: "Resolve a equação exponencial: 3^(x + 1) = 81.",
                steps: [
                  "Passo 1: Escrever ambos os membros na mesma base 3.",
                  "81 = 3 × 3 × 3 × 3 = 3⁴.",
                  "Passo 2: Igualar as potências de mesma base: 3^(x + 1) = 3⁴.",
                  "Passo 3: Igualar os expoentes: x + 1 = 4.",
                  "Passo 4: Isolar x: x = 4 - 1 = 3."
                ],
                finalAnswer: "x = 3"
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o valor de log₃(81) - log₅(25)?",
                options: ["2", "4", "1", "0"],
                correct: 0,
                hint: "3⁴ = 81 (logo log₃81 = 4) e 5² = 25 (logo log₅25 = 2).",
                explanation: "4 - 2 = 2."
              }
            ],
            summary: "Os logaritmos linearizam processos de crescimento ou decaimento exponencial rápido.",
            reviewQuestions: [
              {
                q: "A que é igual a expressão log_b(x³) de acordo com as propriedades dos logaritmos?",
                options: ["3 · log_b(x)", "[log_b(x)]³", "log_b(3x)", "3 + log_b(x)"],
                correct: 0,
                hint: "Regra do tombo / potência no logaritmo.",
                explanation: "O expoente do logaritmando passa a multiplicar o logaritmo: log_b(xᵏ) = k · log_b(x)."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 18 — Logaritmos e Exponenciais",
      instructions: "Resolve as equações logarítmicas respeitando as condições de existência.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Se log₂(x) = 5, qual é o valor de x?",
          options: ["32", "10", "25", "64"],
          correct: 0,
          hint: "Pela definição: x = 2⁵.",
          explanation: "2⁵ = 2 × 2 × 2 × 2 × 2 = 32."
        }
      ]
    }
  }
];
