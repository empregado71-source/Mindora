import { CurriculumModule } from '../../types';

export const MATH_MODULES_PART5: CurriculumModule[] = [
  {
    id: "mat-mod-13",
    moduleNumber: 13,
    title: "Estatística Descritiva e Amostragem",
    description: "Média aritmética simples e ponderada, mediana, moda, desvio-padrão, variância, tabelas de frequências absolutas/relativas e diagramas estatísticos.",
    targetLevel: "Intermédio",
    estimatedHours: 16,
    units: [
      {
        id: "mat-u13-1",
        unitNumber: 1,
        title: "Medidas de Tendência Central e Dispersão",
        description: "Média, mediana, moda, amplitude, variância (σ²) e desvio-padrão (σ).",
        lessons: [
          {
            id: "mat-l-13-1-1",
            title: "Média, Mediana, Moda e Desvio-Padrão",
            durationMinutes: 55,
            explanation: "As medidas de tendência central resumem um conjunto de dados num único valor representativo: a Média (x̄ = Σx_i / n) soma todos os valores divididos pelo total de observações; a Mediana é o valor central que divide a amostra ordenada em duas metades com 50% dos dados cada; e a Moda é o valor de maior frequência. As medidas de dispersão indicam se os dados estão agrupados perto da média ou dispersos: a Variância é a média dos desvios quadráticos (s² = Σ(x_i - x̄)² / (n - 1)) e o Desvio-Padrão é a sua raiz quadrada (s = √s²), conservando a unidade original dos dados.",
            fundamentalConcepts: [
              "Sensibilidade da média a valores extremos (outliers)",
              "Robustez da mediana em distribuições assimétricas",
              "Interpretação do desvio-padrão: quanto menor, mais homogênea é a amostra"
            ],
            practicalExamples: [
              "Amostra de notas: [12, 14, 14, 16, 19]. Moda = 14 (repete-se 2 vezes). Mediana = 14 (valor central). Média = (12+14+14+16+19)/5 = 75/5 = 15.",
              "Se todos os alunos tirarem exatamente 15, o desvio-padrão é 0 (dispersão nula)."
            ],
            realWorldApplications: [
              "Controle de qualidade industrial (Six Sigma): tolerância de fabrico de peças micrométricas.",
              "Investimentos financeiros: o desvio-padrão dos retornos de uma ação mede diretamente a sua volatilidade e risco."
            ],
            stepByStepExercises: [
              {
                problem: "Calcula a média e a variância da amostra: [2, 4, 6, 8].",
                steps: [
                  "Passo 1: Calcular a média x̄: x̄ = (2 + 4 + 6 + 8) / 4 = 20 / 4 = 5.",
                  "Passo 2: Calcular os desvios de cada valor em relação à média (x_i - x̄):",
                  "(2 - 5) = -3; (4 - 5) = -1; (6 - 5) = +1; (8 - 5) = +3.",
                  "Passo 3: Elevar cada desvio ao quadrado: (-3)² = 9; (-1)² = 1; (1)² = 1; (3)² = 9.",
                  "Passo 4: Somar os quadrados dos desvios: 9 + 1 + 1 + 9 = 20.",
                  "Passo 5: Dividir pelo total n = 4 (variância populacional): 20 / 4 = 5."
                ],
                finalAnswer: "Média = 5 e Variância = 5 (Desvio-Padrão = √5 ≈ 2.24)."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é a mediana do conjunto de dados desordenado: [18, 5, 12, 9, 21, 14]?",
                options: ["12", "13", "14", "9"],
                correct: 1,
                hint: "Ordena primeiro os 6 valores: [5, 9, 12, 14, 18, 21]. Com número par de elementos, faz a média dos dois centrais.",
                explanation: "Os dois elementos centrais são 12 e 14. A mediana é (12 + 14) / 2 = 13."
              }
            ],
            summary: "A estatística descritiva transforma grandes massas de números brutos em informação acionável e rigorosa.",
            reviewQuestions: [
              {
                q: "Qual medida de tendência central é menos afetada por valores discrepantes extremos (outliers)?",
                options: ["Média aritmética", "Mediana", "Amplitude total", "Desvio-padrão"],
                correct: 1,
                hint: "Depende apenas da posição central dos dados ordenados.",
                explanation: "A mediana é uma medida robusta porque a sua determinação não depende da magnitude dos valores extremos."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 13 — Estatística Descritiva",
      instructions: "Determina medidas estatísticas com rigor decimal.",
      passingScorePercentage: 70,
      questions: [
        {
          q: "Se uma prova tem média 60 e desvio-padrão 5, o que significa um aluno obter nota 70?",
          options: [
            "Ficou 2 desvios-padrão acima da média da turma",
            "Ficou abaixo da média",
            "Acertou exatamente 70% das perguntas",
            "A sua nota foi a moda da turma"
          ],
          correct: 0,
          hint: "Z-score = (70 - 60) / 5 = 10 / 5 = +2.",
          explanation: "70 está 10 pontos acima de 60, o que equivale a 2 vezes o desvio-padrão de 5."
        }
      ]
    }
  },
  {
    id: "mat-mod-14",
    moduleNumber: 14,
    title: "Probabilidade e Análise Combinatória",
    description: "Princípio fundamental da contagem, permutações, arranjos, combinações, probabilidade de Laplace, eventos independentes e probabilidade condicional (Teorema de Bayes).",
    targetLevel: "Intermédio",
    estimatedHours: 18,
    units: [
      {
        id: "mat-u14-1",
        unitNumber: 1,
        title: "Combinatória e Probabilidade Clássica",
        description: "Fatorial n!, combinações C(n, p), espaço amostral equiprovável e regra de Laplace.",
        lessons: [
          {
            id: "mat-l-14-1-1",
            title: "Combinações e a Regra de Laplace",
            durationMinutes: 60,
            explanation: "A probabilidade clássica de um evento A num espaço amostral equiprovável S é dada pela Regra de Laplace: P(A) = (Número de casos favoráveis) / (Número de casos possíveis). A Análise Combinatória permite contar agrupamentos sem enumerá-los um a um: se a ordem dos elementos não importa, usamos Combinações: C(n, p) = n! / [p!(n - p)!]; se a ordem importa, usamos Arranjos ou Permutações (n!). A probabilidade de dois eventos independentes A e B ocorrerem simultaneamente é dada pelo produto: P(A ∩ B) = P(A) × P(B).",
            fundamentalConcepts: [
              "Fatorial: n! = n × (n - 1) × ... × 1 e 0! = 1",
              "Combinações simples C(n, p): agrupamentos onde a ordem não altera o conjunto",
              "Probabilidade do evento complementar: P(A') = 1 - P(A)"
            ],
            practicalExamples: [
              "Probabilidade de sair número primo ao lançar um dado justo de 6 faces: casos possíveis = {1, 2, 3, 4, 5, 6} (6); primos = {2, 3, 5} (3). Logo P = 3/6 = 1/2 (50%).",
              "Quantas comissões de 3 pessoas podem ser formadas a partir de um grupo de 8 voluntários? C(8, 3) = 8! / (3! · 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 56 comissões."
            ],
            realWorldApplications: [
              "Cálculo de prémios de seguros de vida e automóveis através de tabelas atuariais de sinistralidade.",
              "Genética mendeliana: cálculo da probabilidade de transmissão de alelos dominantes ou recessivos."
            ],
            stepByStepExercises: [
              {
                problem: "Num saco há 5 bolas vermelhas e 3 azuis. Retiram-se sucessivamente 2 bolas sem reposição. Qual é a probabilidade de ambas serem vermelhas?",
                steps: [
                  "Passo 1: Total inicial de bolas = 5 + 3 = 8.",
                  "Passo 2: Probabilidade de a 1ª bola ser vermelha: P(V₁) = 5 / 8.",
                  "Passo 3: Como não houve reposição, restam 7 bolas no saco, das quais 4 são vermelhas. Probabilidade de a 2ª ser vermelha: P(V₂ | V₁) = 4 / 7.",
                  "Passo 4: Multiplicar as probabilidades condicionadas: P(V₁ ∩ V₂) = (5 / 8) × (4 / 7) = 20 / 56.",
                  "Passo 5: Simplificar a fração por 4: 20 / 56 = 5 / 14."
                ],
                finalAnswer: "5 / 14 (aproximadamente 35.7%)."
              }
            ],
            practiceExercises: [
              {
                q: "Qual é o valor do número de combinações C(6, 2)?",
                options: ["12", "15", "30", "36"],
                correct: 1,
                hint: "C(6, 2) = (6 × 5) / (2 × 1).",
                explanation: "30 / 2 = 15 combinações possíveis."
              }
            ],
            summary: "O cálculo de probabilidades quantifica a incerteza e permite tomar decisões racionais sob risco.",
            reviewQuestions: [
              {
                q: "Se a probabilidade de chover amanhã é de 0.35, qual é a probabilidade de NÃO chover?",
                options: ["0.35", "0.65", "0.50", "1.35"],
                correct: 1,
                hint: "P(não A) = 1 - P(A).",
                explanation: "1 - 0.35 = 0.65 (ou 65%)."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 14 — Probabilidade e Combinatória",
      instructions: "Calcula as probabilidades e agrupamentos combinatórios.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Ao lançar duas moedas justas simultaneamente, qual é a probabilidade de obter pelo menos uma cara?",
          options: ["1/4 (25%)", "1/2 (50%)", "3/4 (75%)", "1 (100%)"],
          correct: 2,
          hint: "Espaço amostral: {CC, CK, KC, KK}. Apenas KK não tem cara.",
          explanation: "3 dos 4 resultados contêm pelo menos uma cara: {CC, CK, KC}. Logo P = 3/4 = 75%."
        }
      ]
    }
  },
  {
    id: "mat-mod-15",
    moduleNumber: 15,
    title: "Sequências e Progressões (PA e PG)",
    description: "Definição de sucessões, termo geral, razão, soma dos n primeiros termos de uma Progressão Aritmética (PA) e de uma Progressão Geométrica (PG finita e infinita).",
    targetLevel: "Intermédio",
    estimatedHours: 18,
    units: [
      {
        id: "mat-u15-1",
        unitNumber: 1,
        title: "Progressões Aritméticas e Geométricas",
        description: "Fórmulas do termo geral e da soma de termos em progressões numéricas.",
        lessons: [
          {
            id: "mat-l-15-1-1",
            title: "Termo Geral e Soma de Termos em PA e PG",
            durationMinutes: 60,
            explanation: "Uma Progressão Aritmética (PA) é uma sequência onde a diferença entre termos consecutivos é constante, chamada razão r: a_n = a₁ + (n - 1)r. A soma dos n primeiros termos de uma PA é dada pela célebre fórmula de Gauss: S_n = [(a₁ + a_n) × n] / 2. Numa Progressão Geométrica (PG), o quociente entre termos consecutivos é constante, chamado razão q: a_n = a₁ · qⁿ⁻¹. A soma finita é S_n = a₁(qⁿ - 1) / (q - 1). Para uma PG decrescente infinita com |q| < 1, a soma converge para S_∞ = a₁ / (1 - q).",
            fundamentalConcepts: [
              "Fórmula do termo geral da PA: a_n = a₁ + (n - 1)r",
              "Soma dos termos da PA: S_n = (a₁ + a_n)n / 2",
              "Fórmula do termo geral da PG: a_n = a₁ · qⁿ⁻¹ e soma infinita S_∞ = a₁ / (1 - q) para |q| < 1"
            ],
            practicalExamples: [
              "PA: 3, 7, 11, 15... Razão r = 4. O 10º termo é a₁₀ = 3 + (10 - 1) × 4 = 3 + 36 = 39.",
              "PG infinita: 1/2 + 1/4 + 1/8 + ... com a₁ = 1/2 e q = 1/2. S_∞ = (1/2) / (1 - 1/2) = (1/2) / (1/2) = 1."
            ],
            realWorldApplications: [
              "Economia e poupança: depósitos mensais fixos formam uma PA; juros compostos ao longo de anos formam uma PG.",
              "Dinâmica populacional de bactérias e decaimento radioativo com meia-vida."
            ],
            stepByStepExercises: [
              {
                problem: "Calcula a soma de todos os números inteiros de 1 até 100 usando a fórmula da PA.",
                steps: [
                  "Passo 1: Identificar os parâmetros da PA: primeiro termo a₁ = 1, último termo a₁₀₀ = 100 e número de termos n = 100.",
                  "Passo 2: A razão é r = 1.",
                  "Passo 3: Aplicar a fórmula de Gauss: S_n = [(a₁ + a_n) × n] / 2.",
                  "Passo 4: S₁₀₀ = [(1 + 100) × 100] / 2 = (101 × 100) / 2 = 10100 / 2 = 5050."
                ],
                finalAnswer: "5050"
              }
            ],
            practiceExercises: [
              {
                q: "Numa PG com primeiro termo a₁ = 3 e razão q = 2, qual é o valor do 5º termo?",
                options: ["24", "48", "96", "15"],
                correct: 1,
                hint: "a₅ = a₁ · q⁴ = 3 · 2⁴.",
                explanation: "2⁴ = 16. Logo a₅ = 3 × 16 = 48."
              }
            ],
            summary: "As progressões permitem prever padrões infinitos e calcular somas acumuladas instantaneamente.",
            reviewQuestions: [
              {
                q: "Qual é o valor da soma infinita da PG: 1 + 1/2 + 1/4 + 1/8 + ...?",
                options: ["1", "1.5", "2", "Infinito"],
                correct: 2,
                hint: "S_∞ = a₁ / (1 - q) onde a₁ = 1 e q = 1/2.",
                explanation: "1 / (1 - 1/2) = 1 / 0.5 = 2."
              }
            ]
          }
        ]
      }
    ],
    moduleAssessment: {
      title: "Avaliação do Módulo 15 — Progressões Aritméticas e Geométricas",
      instructions: "Aplica as fórmulas de termo geral e soma.",
      passingScorePercentage: 75,
      questions: [
        {
          q: "Numa PA com a₁ = 4 e r = 3, qual termo tem o valor 31?",
          options: ["O 8º termo", "O 9º termo", "O 10º termo", "O 12º termo"],
          correct: 2,
          hint: "31 = 4 + (n - 1) × 3 ➔ 27 = (n - 1) × 3 ➔ n - 1 = 9.",
          explanation: "n - 1 = 9 ➔ n = 10. Trata-se do décimo termo."
        }
      ]
    }
  }
];
