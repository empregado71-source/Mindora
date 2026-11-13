import { CurriculumModule } from '../../types';

export const MATH_MODULES_PART7: CurriculumModule[] = [
  {
    id: "mat-mod-19",
    moduleNumber: 19,
    title: "Geometria Analítica",
    description: "Plano cartesiano ℝ², distância entre pontos, ponto médio, equações da reta (reduzida, geral e vetorial), posições relativas (paralelismo e perpendicularismo), e equações da circunferência e cônicas.",
    targetLevel: "Avançado",
    estimatedHours: 20,
    units: [
      {
        id: "mat-u19-1",
        unitNumber: 1,
        title: "Ponto, Reta e Circunferência no Plano Cartesiano",
        description: "Distância d = √[(x₂ - x₁)² + (y₂ - y₁)²], retas perpendiculares (m₁ · m₂ = -1) e equação reduzida da circunferência (x - a)² + (y - b)² = r².",
        lessons: [
          {
            id: "mat-l-19-1-1",
            title: "Distância entre Pontos, Declive e Perpendicularismo",
            durationMinutes: 60,
            explanation: "No plano cartesiano ortonormado, a distância entre dois pontos A(x₁, y₁) e B(x₂, y₂) é deduzida pelo Teorema de Pitágoras: d(A, B) = √[(x₂ - x₁)² + (y₂ - y₁)²]. O ponto médio do segmento AB é M = ((x₁ + x₂)/2, (y₁ + y₂)/2). Duas retas não verticais r e s com declives m_r e m_s são paralelas se e somente se têm o mesmo declive: m_r = m_s. São perpendiculares (formam ângulo de 90°) se e somente se o produto dos seus declives for igual a -1: m_r · m_s = -1 (ou seja, m_s = -1 / m_r).",
            fundamentalConcepts: [
              "Fórmula da distância euclidiana no plano",
              "Critério de perpendicularismo: m_r · m_s = -1",
              "Equação da circunferência de centro C(a, b) e raio r: (x - a)² + (y - b)² = r²"
            ],
            practicalExamples: [
              "Distância entre P(1, 2) e Q(4, 6): d = √[(4 - 1)² + (6 - 2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5.",
              "Se uma reta tem declive m = 2, qualquer reta perpendicular a ela terá declive m' = -1/2 = -0.5.",
              "A circunferência com centro na origem (0, 0) e raio 3 tem equação: x² + y² = 9."
            ],
            realWorldApplications: [
              "Robótica e visão computacional: mapeamento de obstáculos e trajetória de braços robóticos em coordenadas cartesianas.",
              "Sistemas de informação geográfica (SIG) para cálculo de distâncias geodésicas e rotas de entrega."
            ],
            stepByStepExercises: [
              {
                problem: "Encontra a equação da reta que passa pelo ponto P(2, 5) e é perpendicular à reta r: y = 3x - 1.",
                steps: [
                  "Passo 1: Identificar o declive da reta dada r: m_r = 3.",
                  "Passo 2: Determinar o declive da reta perpendicular s: m_s = -1 / m_r = -1/3.",
                  "Passo 3: Usar a equação da reta que passa por P(x₀, y₀): y - y₀ = m_s(x - x₀).",
                  "y - 5 = (-1/3)(x - 2).",
                  "Passo 4: Desenvolver a expressão: y - 5 = -x/3 + 2/3 ➔ y = -x/3 + 2/3 + 5 ➔ y = -x/3 + 17/3."
                ],
                finalAnswer: "y = -x/3 + 17/3 (ou x + 3y - 17 = 0 na forma geral)."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o centro e o raio da circunferência de equação (x - 3)² + (y + 4)² = 36?",
                options: ["Centro (3, -4) e raio 6", "Centro (-3, 4) e raio 6", "Centro (3, -4) e raio 36", "Centro (0, 0) e raio 6"],
                correct: 0,
                hint: "(x - a)² + (y - b)² = r². Repara no sinal de (y + 4) = (y - (-4)).",
                explanation: "O centro é (a, b) = (3, -4) e o raio é r = √36 = 6."
              }
            ],
            summary: "A geometria analítica unifica a álgebra e a geometria, permitindo resolver problemas geométricos através de equações precisas.",
            reviewQuestions: [
              {
                q: "Qual é a relação entre os declives de duas retas perpendiculares no plano cartesiano?",
                options: ["m₁ = m₂", "m₁ · m₂ = -1", "m₁ + m₂ = 0", "m₁ / m₂ = 1"],
                correct: 1,
                hint: "São opostos e inversos.",
                explanation: "Duas retas não verticais são perpendiculares se e só se o produto dos seus declives for -1."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 19 — Geometria Analítica",
      instructions: "Determina coordenadas, distâncias e equações de retas e circunferências.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é o ponto médio do segmento formado pelos pontos A(2, 8) e B(6, 2)?",
          options: ["(4, 5)", "(8, 10)", "(2, 3)", "(4, 6)"],
          correct: 0,
          hint: "M = ((x₁ + x₂)/2, (y₁ + y₂)/2) = ((2 + 6)/2, (8 + 2)/2).",
          explanation: "(8/2, 10/2) = (4, 5)."
        }
      ]
    }
  },
  {
    id: "mat-mod-20",
    moduleNumber: 20,
    title: "Matrizes e Determinantes",
    description: "Operações com matrizes (soma, transposição, multiplicação de matrizes), matriz identidade, determinantes 2x2 e 3x3 (Regra de Sarrus), Teorema de Laplace, matriz inversa e resolução de sistemas matriciais (A · X = B).",
    targetLevel: "Avançado",
    estimatedHours: 20,
    units: [
      {
        id: "mat-u20-1",
        unitNumber: 1,
        title: "Álgebra Matricial e Regra de Sarrus",
        description: "Multiplicação linha por coluna, determinantes e propriedades de invertibilidade.",
        lessons: [
          {
            id: "mat-l-20-1-1",
            title: "Multiplicação de Matrizes e Determinantes",
            durationMinutes: 65,
            explanation: "Uma matriz A de ordem m × n possui m linhas e n colunas. Para que o produto matricial A · B seja possível, o número de colunas de A deve ser rigorosamente igual ao número de linhas de B (se A é m × p e B é p × n, o produto C = A · B terá dimensão m × n). Cada elemento c_ij é obtido pelo produto escalar da linha i de A pela coluna j de B. O determinante de uma matriz 2x2 é dado por det(A) = ad - bc. Para matrizes 3x3, a Regra de Sarrus soma o produto das três diagonais principais e subtrai o das secundárias. Uma matriz é invertível se e somente se det(A) ≠ 0.",
            fundamentalConcepts: [
              "A multiplicação de matrizes NÃO é comutativa em geral (A · B ≠ B · A)",
              "Matriz identidade I_n e matriz transposta Aᵀ",
              "Condição de existência da matriz inversa A⁻¹: det(A) ≠ 0"
            ],
            practicalExamples: [
              "Determinante 2x2: | [3, 2] ; [1, 4] | = (3 × 4) - (2 × 1) = 12 - 2 = 10.",
              "Multiplicação por escalar: 2 × [ [1, 3] ; [4, 0] ] = [ [2, 6] ; [8, 0] ]."
            ],
            realWorldApplications: [
              "Renderização gráfica 3D e motores de jogos (OpenGL, DirectX, Three.js): matrizes 4x4 representam rotações, translações e projeções de perspetiva da câmara.",
              "Inteligência artificial e redes neuronais (Deep Learning): tensores e produtos matriciais em GPUs aceleram o treino de modelos de linguagem."
            ],
            stepByStepExercises: [
              {
                problem: "Calcula o produto matricial das matrizes A = [ [1, 2] ; [3, 4] ] e B = [ [2, 0] ; [1, 3] ].",
                steps: [
                  "Passo 1: Verificar dimensões: A é 2x2 e B é 2x2. O produto C = A · B é 2x2.",
                  "Passo 2: Calcular c₁₁ (linha 1 de A × coluna 1 de B): (1 × 2) + (2 × 1) = 2 + 2 = 4.",
                  "Passo 3: Calcular c₁₂ (linha 1 de A × coluna 2 de B): (1 × 0) + (2 × 3) = 0 + 6 = 6.",
                  "Passo 4: Calcular c₂₁ (linha 2 de A × coluna 1 de B): (3 × 2) + (4 × 1) = 6 + 4 = 10.",
                  "Passo 5: Calcular c₂₂ (linha 2 de A × coluna 2 de B): (3 × 0) + (4 × 3) = 0 + 12 = 12."
                ],
                finalAnswer: "C = [ [4, 6] ; [10, 12] ]"
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o determinante da matriz [ [5, 3] ; [2, 4] ]?",
                options: ["14", "26", "20", "6"],
                correct: 0,
                hint: "det = (5 × 4) - (3 × 2).",
                explanation: "20 - 6 = 14."
              }
            ],
            summary: "As matrizes organizam e processam transformações multidimensionais simultâneas em ciência da computação e física quântica.",
            reviewQuestions: [
              {
                q: "Qual é a condição necessária e suficiente para que uma matriz quadrada admita matriz inversa?",
                options: ["O seu determinante deve ser diferente de zero", "Todas as entradas devem ser positivas", "O seu determinante deve ser 1", "Deve ser uma matriz simétrica"],
                correct: 0,
                hint: "det(A) ≠ 0.",
                explanation: "Se det(A) = 0, a matriz diz-se singular e não possui inversa."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 20 — Matrizes e Determinantes",
      instructions: "Efetua operações matriciais e calcula determinantes com exatidão.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Se det(A) = 4, qual é o determinante da matriz inversa A⁻¹?",
          options: ["1/4 (0.25)", "-4", "16", "0"],
          correct: 0,
          hint: "Propriedade dos determinantes: det(A⁻¹) = 1 / det(A).",
          explanation: "det(A⁻¹) = 1 / 4."
        }
      ]
    }
  },
  {
    id: "mat-mod-21",
    moduleNumber: 21,
    title: "Limites e Continuidade",
    description: "Noção intuitiva e formal de limite (ε-δ de Cauchy), limites laterais, indeterminações (0/0, ∞/∞, ∞ - ∞, 1^∞), limites notáveis trigonométricos e exponenciais, e continuidade de funções.",
    targetLevel: "Avançado",
    estimatedHours: 22,
    units: [
      {
        id: "mat-u21-1",
        unitNumber: 1,
        title: "Cálculo de Limites e Resolução de Indeterminações",
        description: "Fatorização, limites no infinito e o limite fundamental lim(x→0) [sen(x)/x] = 1.",
        lessons: [
          {
            id: "mat-l-21-1-1",
            title: "Limites Laterais, Indeterminação 0/0 e Limite Notável",
            durationMinutes: 65,
            explanation: "O limite de uma função f(x) quando x tende para 'a' é o valor L para o qual f(x) se aproxima arbitrariamente quando x se aproxima de 'a' (sem nunca necessariamente atingir 'a'). Para que lim(x→a) f(x) exista, é obrigatório que os limites laterais à esquerda e à direita sejam finitos e coincidentes: lim(x→a⁻) f(x) = lim(x→a⁺) f(x) = L. Uma indeterminação do tipo 0/0 significa que numerador e denominador partilham o fator (x - a), devendo ser fatorizados para permitir o cancelamento.",
            fundamentalConcepts: [
              "Existência do limite através de limites laterais",
              "Resolução da indeterminação 0/0 por fatorização ou racionalização",
              "Limite trigonométrico fundamental: lim(x→0) [sen(x) / x] = 1 (com x em radianos)",
              "Definição de número de Euler: lim(x→∞) [1 + 1/x]ˣ = e"
            ],
            practicalExamples: [
              "Calcular lim(x→2) (x² - 4)/(x - 2): Substituindo x = 2 temos 0/0 (indeterminação). Fatorizando o numerador: (x - 2)(x + 2)/(x - 2) = x + 2. Aplicando o limite: 2 + 2 = 4.",
              "lim(x→∞) (3x² + 5)/(2x² - 7): Dividindo todos os termos pela maior potência x², o limite é a razão dos coeficientes dominantes: 3/2."
            ],
            realWorldApplications: [
              "Física: definição exata de velocidade instantânea como o limite da velocidade média quando o intervalo de tempo Δt tende a zero: v(t) = lim(Δt→0) [Δs / Δt].",
              "Finanças quantitativas: capitalização contínua de juros através da fórmula exponencial com o limite de Euler e^(rt)."
            ],
            stepByStepExercises: [
              {
                problem: "Calcula o limite com indeterminação 0/0: lim(x→3) [(x² - 9) / (2x - 6)].",
                steps: [
                  "Passo 1: Fazer a substituição direta x = 3: (3² - 9) / (2(3) - 6) = 0 / 0 (Indeterminação).",
                  "Passo 2: Fatorizar o numerador como diferença de quadrados: x² - 9 = (x - 3)(x + 3).",
                  "Passo 3: Fatorizar o denominador colocando o fator comum 2 em evidência: 2x - 6 = 2(x - 3).",
                  "Passo 4: Cancelar o fator nulo (x - 3): lim(x→3) [(x + 3) / 2].",
                  "Passo 5: Aplicar o limite: (3 + 3) / 2 = 6 / 2 = 3."
                ],
                finalAnswer: "3"
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o valor do limite fundamental lim(x→0) [sen(3x) / x]?",
                options: ["1", "3", "0", "1/3"],
                correct: 1,
                hint: "Multiplica e divide por 3 para obter 3 × [sen(3x) / 3x].",
                explanation: "Como lim(u→0) [sen(u)/u] = 1, temos 3 × 1 = 3."
              }
            ],
            summary: "O conceito de limite é a ponte conceitual que permitiu a Newton e Leibniz criar o Cálculo Infinitesimal.",
            reviewQuestions: [
              {
                q: "Quando é que uma função f(x) é dita contínua num ponto x = a?",
                options: [
                  "Quando f(a) está definida, o limite lim(x→a) f(x) existe e ambos são iguais",
                  "Quando f(a) é um número positivo",
                  "Quando a função é uma reta horizontal",
                  "Quando o limite no infinito é zero"
                ],
                correct: 0,
                hint: "Três condições simultâneas: existência do ponto, existência do limite e coincidência.",
                explanation: "f é contínua em 'a' se lim(x→a) f(x) = f(a)."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 21 — Limites e Continuidade",
      instructions: "Resolve as indeterminações utilizando fatorizações e limites fundamentais.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Qual é o valor de lim(x→∞) [(5x³ - 2x) / (10x³ + 4)]?",
          options: ["1/2 (0.5)", "5", "0", "Infinito"],
          correct: 0,
          hint: "Para limites no infinito de polinómios de mesmo grau, calcula a razão dos coeficientes principais: 5 / 10.",
          explanation: "5 / 10 = 1/2."
        }
      ]
    }
  }
];
